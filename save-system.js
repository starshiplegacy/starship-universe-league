(() => {
  const DB_NAME = "starship-universe-save-system";
  const STORE = "game-saves";
  const ALLOWED = new Set(["jaque-matte", "pixxy-up", "the-lyrielife"]);
  let client = null;
  let userId = null;
  const pending = new Map();
  const timers = new Map();

  function openDb() {
    return new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) return reject(new Error("IndexedDB no disponible"));
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "key" });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async function localPut(game, state) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put({ key: (userId || "unbound") + ":" + game, userId, game, state, savedAt: new Date().toISOString() });
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    });
  }
  async function localGetRow(game) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get((userId || "unbound") + ":" + game);
      req.onsuccess = () => { const row = req.result; db.close(); resolve(row || null); };
      req.onerror = () => { db.close(); reject(req.error); };
    });
  }
  async function localGet(game) {
    const row = await localGetRow(game);
    return row?.state || null;
  }
  function showStatus(message, state = "saved") {
    const el = document.getElementById("saveSystemStatus");
    if (!el) return;
    el.textContent = message;
    el.dataset.state = state;
  }
  async function flush(game) {
    const state = pending.get(game);
    if (!state || !client || !userId) return;
    pending.delete(game);
    try {
      const { error } = await client.from("game_saves").upsert({
        user_id: userId, game_key: game, save_slot: "autosave", state,
        updated_at: new Date().toISOString()
      }, { onConflict: "user_id,game_key,save_slot" });
      if (error) throw error;
      showStatus("☁️ Progreso sincronizado", "synced");
    } catch (error) {
      pending.set(game, state);
      showStatus("⚠️ Respaldo local · pendiente de sincronizar", "offline");
      console.warn("STARSHIP SAVE SYSTEM:", error);
    }
  }
  async function save(game, state) {
    if (!ALLOWED.has(game) || !state || typeof state !== "object") return false;
    try {
      await localPut(game, state);
      showStatus("Guardado automáticamente…", "saving");
    } catch (error) {
      console.warn("STARSHIP SAVE SYSTEM local:", error);
      showStatus("⚠️ No se pudo crear el respaldo local", "offline");
    }
    pending.set(game, state);
    clearTimeout(timers.get(game));
    timers.set(game, setTimeout(() => flush(game), 650));
    return true;
  }
  async function load(game) {
    if (!ALLOWED.has(game)) return null;
    if (client && userId) {
      try {
        const { data, error } = await client.from("game_saves").select("state").eq("user_id", userId).eq("game_key", game).eq("save_slot", "autosave").maybeSingle();
        if (error) throw error;
        if (data?.state) {
          await localPut(game, data.state);
          showStatus("☁️ Partida recuperada de la nube", "synced");
          return data.state;
        }
      } catch (error) {
        console.warn("STARSHIP SAVE SYSTEM cloud load:", error);
      }
    }
    try {
      const local = await localGet(game);
      if (local) showStatus("💾 Partida recuperada del dispositivo", "saved");
      return local;
    } catch (error) {
      console.warn("STARSHIP SAVE SYSTEM local load:", error);
      return null;
    }
  }
  async function bindSession(session) {
    client = window.universeSupabase || client;
    userId = session?.user?.id || null;
    if (!userId) { showStatus("Inicia sesión para guardar tu progreso", "offline"); return; }
    for (const game of ALLOWED) {
      try {
        const localRow = await localGetRow(game);
        if (localRow?.state) {
          const { data, error } = await client.from("game_saves").select("updated_at").eq("user_id", userId).eq("game_key", game).eq("save_slot", "autosave").maybeSingle();
          if (error) throw error;
          const localTime = Date.parse(localRow.savedAt || 0);
          const cloudTime = Date.parse(data?.updated_at || 0);
          if (!data || localTime > cloudTime) {
            pending.set(game, localRow.state);
            await flush(game);
          }
        }
      } catch (error) {
        console.warn("STARSHIP SAVE SYSTEM session sync:", error);
      }
    }
  }
  window.addEventListener("universe-auth-change", event => { bindSession(event.detail?.session || null); });
  window.addEventListener("online", () => { for (const game of ALLOWED) flush(game); });
  window.starshipSave = { save, load, flush, status: showStatus };
  if (window.universeSupabase) {
    window.universeSupabase.auth.getSession().then(({ data }) => bindSession(data?.session || null));
  } else {
    window.addEventListener("universe-supabase-ready", () => {
      window.universeSupabase?.auth.getSession().then(({ data }) => bindSession(data?.session || null));
    }, { once: true });
  }
})();