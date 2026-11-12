(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const dialog = $("accountDialog");
  const panel = $("accountPanel");
  const menu = $("accountSections");
  const note = $("accountSectionNote");
  const back = $("accountBack");
  const title = $("accountPanelTitle");
  const avatarButton = $("accountOpen");
  const themeNames = {light:"Claro",dark:"Oscuro",green:"Verde",nature:"Naturaleza",neon:"Neón",galaxy:"Galaxy",autumn:"Otoño",winter:"Invierno",spring:"Primavera",summer:"Verano"};
  const languages = {es:"Español",en:"English",ko:"한국어",ja:"日本語"};
  let client = null, session = null, profile = null, signedAvatarUrl = null, busy = false;
  const say = (message, type) => {
    const el = $("settingsMessage");
    if (!el) return;
    el.textContent = message || "";
    el.dataset.type = type || "";
  };
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const dateLabel = (value) => value ? new Intl.DateTimeFormat(document.documentElement.lang || "es",{dateStyle:"medium",timeStyle:"short"}).format(new Date(value)) : "—";
  function showMenu() {
    menu.hidden = false;
    panel.hidden = true;
    note.hidden = false;
    note.textContent = "Selecciona una sección para administrar tu cuenta.";
  }
  function showPanel(name, heading) {
    menu.hidden = true;
    note.hidden = true;
    panel.hidden = false;
    title.textContent = heading;
    say("");
    back.focus();
    if (name === "profile") renderProfile();
    if (name === "preferences") renderPreferences();
    if (name === "security") renderSecurity();
    if (name === "privacy") renderPrivacy();
    if (name === "activity") renderActivity();
    if (name === "feedback") renderFeedback();
  }
  function renderAvatar(url) {
    if (!avatarButton) return;
    if (url) {
      avatarButton.innerHTML = '<img class="account-avatar-image" src="' + escapeHtml(url) + '" alt="Foto de perfil">';
    } else {
      avatarButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>';
    }
  }
  async function loadProfile() {
    if (!client || !session?.user) return;
    const {data,error} = await client.from("profiles").select("*").eq("id",session.user.id).maybeSingle();
    if (error) throw error;
    profile = data || {id:session.user.id,first_name:session.user.user_metadata?.first_name || "",last_name:session.user.user_metadata?.last_name || ""};
    signedAvatarUrl = null;
    if (profile.avatar_path) {
      const {data: signed,error:signedError} = await client.storage.from("universe-avatars").createSignedUrl(profile.avatar_path,3600);
      if (!signedError) signedAvatarUrl = signed?.signedUrl || null;
    }
    renderAvatar(signedAvatarUrl);
  }
  async function saveProfile(fields) {
    const updates = {...fields, id:session.user.id, updated_at:new Date().toISOString()};
    const {error} = await client.from("profiles").upsert(updates,{onConflict:"id"});
    if (error) throw error;
    profile = {...profile,...updates};
  }
  function renderProfile() {
    const p = profile || {};
    $("accountPanelContent").innerHTML = [
      '<div class="settings-avatar-row"><div class="settings-avatar-preview">' + (signedAvatarUrl ? '<img src="' + escapeHtml(signedAvatarUrl) + '" alt="Foto de perfil">' : '<span>✦</span>') + '</div>',
      '<div class="settings-avatar-actions"><strong>Foto de perfil</strong><small>JPG, PNG o WEBP · Máximo 5 MB</small><label class="settings-button" for="profilePhoto">Subir foto</label><input id="profilePhoto" type="file" accept="image/jpeg,image/png,image/webp" hidden><button class="settings-text-button" id="removePhoto" type="button" ' + (p.avatar_path ? "" : "disabled") + '>Eliminar foto</button></div></div>',
      '<form id="profileForm" class="settings-form"><div class="settings-two-col"><label>Nombre<input name="first_name" maxlength="80" required value="' + escapeHtml(p.first_name) + '"></label><label>Apellido<input name="last_name" maxlength="80" required value="' + escapeHtml(p.last_name) + '"></label></div>',
      '<label>Biografía<textarea name="bio" maxlength="280" rows="3" placeholder="Cuéntanos algo sobre ti...">' + escapeHtml(p.bio) + '</textarea></label>',
      '<label>Sitio web<input name="website" type="url" maxlength="200" placeholder="https://..." value="' + escapeHtml(p.website) + '"></label>',
      '<div class="settings-two-col"><label>Instagram<input name="instagram" maxlength="100" placeholder="@usuario" value="' + escapeHtml(p.instagram) + '"></label><label>YouTube<input name="youtube" maxlength="200" placeholder="Canal o URL" value="' + escapeHtml(p.youtube) + '"></label></div>',
      '<label>X<input name="x_profile" maxlength="100" placeholder="@usuario" value="' + escapeHtml(p.x_profile) + '"></label>',
      '<label>Correo electrónico<input value="' + escapeHtml(session.user.email) + '" disabled></label>',
      '<label>ID de usuario <span class="settings-id-row"><input value="' + escapeHtml(p.public_id || "Asignando ID…") + '" readonly><button type="button" class="settings-copy-id" id="copyPublicId">Copiar</button></span><small class="settings-muted">Identificador único y permanente de tu cuenta STARSHIP UNIVERSE LEAGUE.</small></label>',
      '<button class="settings-primary" type="submit">Guardar perfil</button></form>'
    ].join("");
    $("profileForm").addEventListener("submit", async event => {
      event.preventDefault();
      const button = event.currentTarget.querySelector('[type="submit"]');
      button.disabled = true; say("Guardando perfil…");
      try {
        const data = Object.fromEntries(new FormData(event.currentTarget).entries());
        await saveProfile(data);
        say("Tu perfil se guardó correctamente.","success");
      } catch (error) { say(error.message || "No se pudo guardar el perfil.","error"); }
      finally { button.disabled = false; }
    });
    $("profilePhoto").addEventListener("change", uploadPhoto);
    $("removePhoto").addEventListener("click", removePhoto);
    $("copyPublicId")?.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(profile.public_id); say("ID copiado.","success"); }
      catch { say("No se pudo copiar el ID en este navegador.","error"); }
    });
  }
  async function uploadPhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg","image/png","image/webp"].includes(file.type)) { say("Elige una imagen JPG, PNG o WEBP.","error"); return; }
    if (file.size > 5 * 1024 * 1024) { say("La imagen supera el límite de 5 MB.","error"); return; }
    say("Subiendo tu foto…");
    try {
      const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
      const path = session.user.id + "/" + crypto.randomUUID() + "." + ext;
      const {error:uploadError} = await client.storage.from("universe-avatars").upload(path,file,{contentType:file.type,cacheControl:"3600",upsert:false});
      if (uploadError) throw uploadError;
      const oldPath = profile?.avatar_path;
      await saveProfile({avatar_path:path});
      if (oldPath) await client.storage.from("universe-avatars").remove([oldPath]);
      await loadProfile();
      renderProfile();
      say("Foto de perfil actualizada.","success");
    } catch (error) { say(error.message || "No se pudo subir la foto.","error"); }
    finally { event.target.value = ""; }
  }
  async function removePhoto() {
    if (!profile?.avatar_path) return;
    const button = $("removePhoto"); button.disabled = true; say("Eliminando foto…");
    try {
      const oldPath = profile.avatar_path;
      await saveProfile({avatar_path:null});
      const {error} = await client.storage.from("universe-avatars").remove([oldPath]);
      if (error) throw error;
      await loadProfile(); renderProfile(); say("Foto eliminada.","success");
    } catch (error) { say(error.message || "No se pudo eliminar la foto.","error"); }
    finally { const current = $("removePhoto"); if (current) current.disabled = !profile?.avatar_path; }
  }
  function renderPreferences() {
    const theme = profile?.theme || localStorage.getItem("universe-theme") || "light";
    const language = profile?.language || localStorage.getItem("universe-language") || "es";
    $("accountPanelContent").innerHTML = '<form id="preferencesForm" class="settings-form"><label>Apariencia<select name="theme">' + Object.entries(themeNames).map(([v,l])=>'<option value="'+v+'" '+(theme===v?'selected':'')+'>'+l+'</option>').join("") + '</select></label><label>Idioma<select name="language">' + Object.entries(languages).map(([v,l])=>'<option value="'+v+'" '+(language===v?'selected':'')+'>'+l+'</option>').join("") + '</select></label><button class="settings-primary" type="submit">Guardar preferencias</button></form>';
    $("preferencesForm").addEventListener("submit",async event=>{
      event.preventDefault(); const values=Object.fromEntries(new FormData(event.currentTarget).entries());
      try {
        await saveProfile(values);
        document.documentElement.dataset.theme=values.theme; localStorage.setItem("universe-theme",values.theme);
        const themeButton=document.querySelector("[data-theme-choice='"+values.theme+"']"); if(themeButton) themeButton.click();
        const languageSelect=$("languageSelect");
        if(languageSelect && languageSelect.value!==values.language){languageSelect.value=values.language;languageSelect.dispatchEvent(new Event("change"));}
        localStorage.setItem("universe-language",values.language);
        say("Preferencias guardadas.","success");
      } catch(error) { say(error.message || "No se pudieron guardar las preferencias.","error"); }
    });
  }
  function renderSecurity() {
    $("accountPanelContent").innerHTML = '<form id="passwordForm" class="settings-form"><p class="settings-muted">Actualiza la contraseña de acceso a tu cuenta. Usa al menos 8 caracteres.</p><label>Nueva contraseña<input name="password" type="password" minlength="8" autocomplete="new-password" required></label><label>Confirmar contraseña<input name="confirm" type="password" minlength="8" autocomplete="new-password" required></label><button class="settings-primary" type="submit">Actualizar contraseña</button></form>';
    $("passwordForm").addEventListener("submit",async event=>{
      event.preventDefault(); const values=Object.fromEntries(new FormData(event.currentTarget).entries());
      if(values.password!==values.confirm){say("Las contraseñas no coinciden.","error");return;}
      const button=event.currentTarget.querySelector("button"); button.disabled=true; say("Actualizando contraseña…");
      try { const {error}=await client.auth.updateUser({password:values.password}); if(error) throw error; event.currentTarget.reset(); say("Contraseña actualizada correctamente.","success"); }
      catch(error){say(error.message || "No se pudo actualizar la contraseña.","error");}
      finally{button.disabled=false;}
    });
  }
  function renderPrivacy() {
    $("accountPanelContent").innerHTML = '<form id="privacyForm" class="settings-form"><label class="settings-check"><input name="profile_public" type="checkbox" '+(profile?.profile_public?'checked':'')+'> <span><strong>Perfil público</strong><small>Permitir que tu perfil y los enlaces que compartas sean visibles en las funciones públicas de Universe League.</small></span></label><p class="settings-muted">Tu correo y tus datos de acceso nunca se muestran como parte del perfil público.</p><button class="settings-primary" type="submit">Guardar privacidad</button></form>';
    $("privacyForm").addEventListener("submit",async event=>{
      event.preventDefault(); const value=event.currentTarget.elements.profile_public.checked;
      try { await saveProfile({profile_public:value}); say("Preferencias de privacidad guardadas.","success"); }
      catch(error){say(error.message || "No se pudo guardar la privacidad.","error");}
    });
  }
  function renderActivity() {
    $("accountPanelContent").innerHTML = '<div class="settings-facts"><div><small>Cuenta creada</small><strong>'+escapeHtml(dateLabel(session.user.created_at))+'</strong></div><div><small>Último inicio de sesión</small><strong>'+escapeHtml(dateLabel(session.user.last_sign_in_at))+'</strong></div><div><small>Método de acceso</small><strong>'+escapeHtml((session.user.app_metadata?.provider || "email").toUpperCase())+'</strong></div><div><small>ID de usuario</small><strong class="settings-id">'+escapeHtml(profile?.public_id || "—")+'</strong></div></div><p class="settings-muted">Este panel muestra la información de actividad disponible actualmente para tu cuenta.</p>';
  }
  function renderFeedback() {
    $("accountPanelContent").innerHTML = '<form id="feedbackForm" class="settings-form"><label>Tipo de mensaje<select name="category"><option value="suggestion">Sugerencia</option><option value="bug">Reportar un problema</option><option value="question">Consulta</option><option value="other">Otro</option></select></label><label>Asunto<input name="subject" minlength="3" maxlength="120" required></label><label>Mensaje<textarea name="message" minlength="10" maxlength="3000" rows="5" required></textarea></label><button class="settings-primary" type="submit">Enviar mensaje</button></form>';
    $("feedbackForm").addEventListener("submit",async event=>{
      event.preventDefault(); const button=event.currentTarget.querySelector("button"); button.disabled=true;
      try { const values=Object.fromEntries(new FormData(event.currentTarget).entries()); const {error}=await client.from("user_feedback").insert({...values,user_id:session.user.id}); if(error) throw error; event.currentTarget.reset(); say("Gracias. Tu mensaje fue enviado.","success"); }
      catch(error){say(error.message || "No se pudo enviar el mensaje.","error");}
      finally{button.disabled=false;}
    });
  }
  const sectionTitles = {profile:"Perfil de Usuario",feedback:"Quejas y Sugerencias",security:"Seguridad",privacy:"Privacidad",preferences:"Preferencias",activity:"Mis Actividades"};
  document.querySelectorAll("[data-account-section]").forEach(button=>button.addEventListener("click",()=>showPanel(button.dataset.accountSection,sectionTitles[button.dataset.accountSection] || "Configuración")));
  back?.addEventListener("click",showMenu);
  dialog?.addEventListener("close",showMenu);
  window.addEventListener("universe-auth-change",async event=>{
    session=event.detail?.session || null;
    client=window.universeSupabase || client;
    if (!session?.user) {profile=null;renderAvatar(null);showMenu();return;}
    try {await loadProfile();} catch(error){console.warn("No se pudo cargar el perfil:",error);}
  });
  window.addEventListener("universe-supabase-ready",async()=>{client=window.universeSupabase; if(session?.user) try{await loadProfile();}catch(error){console.warn(error);}});
  client=window.universeSupabase || null;
  if (client) window.dispatchEvent(new Event("universe-supabase-ready"));
  document.addEventListener("DOMContentLoaded",()=>{if(!session)showMenu();});
})();