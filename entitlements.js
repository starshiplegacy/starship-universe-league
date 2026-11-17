(() => {
  "use strict";
  const state = { loaded:false, userId:null, entitlements:[], plan:"astronaut", error:null };
  const has = key => state.entitlements.includes(key);
  const memberPlans = new Set(["baby","baby_star","moon","young_moon","planet","exoplanet"]);
  const vipPlans = new Set(["moon","young_moon","planet","exoplanet"]);
  function applyGates() {
    const plan = String(state.plan || "").toLowerCase().replace(/-/g,"_");
    const memberAccess = state.entitlements.some(key => ["baby","baby_star","baby-star","young_moon","young-moon","exoplanet"].includes(String(key).toLowerCase())) || memberPlans.has(plan);
    const geffeniteAccess = has("young_moon") || has("young-moon") || has("exoplanet") ||
      vipPlans.has(plan);
    document.querySelectorAll("[data-requires-membership]").forEach(node => {
      node.hidden = !memberAccess;
      node.setAttribute("aria-hidden", String(!memberAccess));
    });
    document.querySelectorAll("[data-membership-fallback]").forEach(node => {
      node.hidden = memberAccess;
      node.setAttribute("aria-hidden", String(memberAccess));
    });
    document.querySelectorAll("[data-requires-entitlement]").forEach(node => {
      const requirement = node.dataset.requiresEntitlement;
      const allowed = requirement === "geffenite_beta" ? geffeniteAccess : has(requirement);
      node.hidden = !allowed;
      node.setAttribute("aria-hidden", String(!allowed));
    });
    document.querySelectorAll("[data-entitlement-fallback]").forEach(node => {
      node.hidden = geffeniteAccess;
    });
    const restrictedThemes = new Set(["jupiter","sum","ruby","astroblue","neonblue","green-blue","orbit-green"]);
    const creatorThemes = new Set(["neon-moon","neon-blue-aura","neon-reimbow","green-light","blue-light","grey-sky","blue-sky"]);
    const currentTheme = document.documentElement.dataset.theme;
    if ((restrictedThemes.has(currentTheme) && !has("exoplanet")) ||
        (creatorThemes.has(currentTheme) && !has("creator_verified"))) {
      if (typeof window.applyUniverseTheme === "function") window.applyUniverseTheme("light");
    }
  }
  async function refresh(session) {
    const user = session?.user;
    if (!user) {
      state.loaded = true; state.userId = null; state.entitlements = [];
      state.plan = "astronaut"; state.error = null; applyGates();
      window.dispatchEvent(new CustomEvent("universe-entitlements-change",{detail:{...state}}));
      return state;
    }
    if (state.loaded && state.userId === user.id && !state.error) return state;
    state.loaded = false; state.userId = user.id; state.entitlements = []; state.error = null;
    try {
      const client = window.universeSupabase;
      if (!client) throw new Error("Supabase client unavailable");
      const { data, error } = await client.functions.invoke("starship-entitlements", { body:{} });
      if (error) throw error;
      state.entitlements = Array.isArray(data?.entitlements) ? data.entitlements : [];
      state.plan = data?.plan || "astronaut";
    } catch (error) {
      state.error = error?.message || "No se pudieron consultar los beneficios.";
      console.warn("STARSHIP entitlements:", state.error);
    }
    state.loaded = true;
    applyGates();
    window.dispatchEvent(new CustomEvent("universe-entitlements-change",{detail:{...state}}));
    return state;
  }
  window.starshipEntitlements = {
    has, refresh,
    get state(){ return {...state}; },
    get isMember(){ const plan=String(state.plan||"").toLowerCase().replace(/-/g,"_"); return state.loaded && (memberPlans.has(plan) || state.entitlements.some(key=>["baby","baby_star","baby-star","young_moon","young-moon","exoplanet"].includes(String(key).toLowerCase()))); },
    get isVip(){ const plan=String(state.plan||"").toLowerCase().replace(/-/g,"_"); return state.loaded && (vipPlans.has(plan) || has("young_moon") || has("young-moon") || has("exoplanet")); }
  };
  window.addEventListener("universe-auth-change", event => { refresh(event.detail?.session || null); });
  window.addEventListener("universe-supabase-ready", async () => {
    const client = window.universeSupabase;
    if (client) {
      const { data } = await client.auth.getSession();
      refresh(data?.session || null);
    }
  });
  if (window.universeSupabase) {
    window.universeSupabase.auth.getSession().then(({data}) => refresh(data?.session || null));
  }
})();