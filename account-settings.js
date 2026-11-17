(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const dialog = $("accountDialog");
  const panel = $("accountPanel");
  const menu = $("accountSections");
  const note = $("accountSectionNote");
  const back = $("accountBack");
  const title = $("accountPanelTitle");
  const dialogTitle = $("accountTitle");
  const dialogIntro = $("accountIntro");
  const signOutButton = $("accountSignOut");
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
    dialog.dataset.view = "settings";
    if (dialogTitle) dialogTitle.textContent = "Configuración de Usuario";
    if (dialogIntro) dialogIntro.textContent = "Administra tu perfil, apariencia, seguridad y preferencias de cuenta.";
    if (signOutButton) signOutButton.hidden = false;
    if (back) back.hidden = false;
    menu.hidden = false;
    panel.hidden = true;
    note.hidden = false;
    note.textContent = "Selecciona una sección para administrar tu cuenta.";
  }
  function openConfiguration() {
    if (!dialog?.open) dialog?.showModal();
    showMenu();
  }
  function showPanel(name, heading) {
    menu.hidden = true;
    note.hidden = true;
    panel.hidden = false;
    title.textContent = heading;
    say("");
    if (!back.hidden) back.focus();
    if (name === "profile") renderProfile();
    if (name === "personal-profile") renderPersonalProfile();
    if (name === "preferences") renderPreferences();
    if (name === "security") renderSecurity();
    if (name === "privacy") renderPrivacy();
    if (name === "activity") renderActivity();
    if (name === "feedback") renderFeedback();
    if (name === "verification") renderVerification();
    if (name === "plans") renderPlans();
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
    if (profile.theme && typeof window.applyUniverseTheme === "function") window.applyUniverseTheme(profile.theme);
    if (profile.language && typeof window.applyUniverseLanguage === "function") window.applyUniverseLanguage(profile.language);
    signedAvatarUrl = null;
    if (profile.avatar_path) {
      const {data: signed,error:signedError} = await client.storage.from("universe-avatars").createSignedUrl(profile.avatar_path,3600);
      if (!signedError) signedAvatarUrl = signed?.signedUrl || null;
    }
    renderAvatar(signedAvatarUrl);
  }
  async function saveProfile(fields) {
    const updates = {...fields, id:session.user.id, updated_at:new Date().toISOString()};
    if (typeof updates.public_id === "string") updates.public_id = updates.public_id.trim();
    const {error} = await client.from("profiles").upsert(updates,{onConflict:"id"});
    if (error?.code === "23505") throw new Error("Ese ID ya está en uso. Prueba con otro.");
    if (error?.code === "23514") throw new Error("El ID debe tener entre 3 y 24 caracteres y usar solo letras, números, punto, guion o guion bajo.");
    if (error) throw error;
    profile = {...profile,...updates};
  }
  async function renderPersonalProfile() {
    const content = $("accountPanelContent");
    const personalUserId = "a22969c5-4660-487b-9b26-010a6fdada9c";
    if (!session?.user || session.user.id !== personalUserId) {
      content.innerHTML = '<p class="settings-muted">Esta sección no está disponible para esta cuenta.</p>';
      return;
    }
    let badges = [];
    try {
      const {data,error} = await client.from("user_badges").select("badge_key,status,expires_at,assigned_at").eq("user_id",personalUserId).eq("status","active");
      if (error) throw error;
      badges = (data || []).filter(item => !item.expires_at || new Date(item.expires_at) > new Date());
    } catch(error) {
      console.warn("No se pudieron consultar los beneficios personales:",error);
    }
    const serverAccess = window.starshipEntitlements?.state;
    const hasExoplanet = Boolean(serverAccess?.loaded && window.starshipEntitlements?.has("exoplanet")) || badges.some(item=>item.badge_key==="exoplanet");
    const hasCreator = Boolean(serverAccess?.loaded && window.starshipEntitlements?.has("creator_verified")) || badges.some(item=>item.badge_key==="creator_verified");
    content.innerHTML =
      '<section class="personal-benefits-panel"><span class="personal-benefits-kicker">PRIVATE ACCOUNT · INTERNAL WHITELIST</span><h3>Perfil personal</h3><p>Este perfil personal está separado de la identidad de trabajo y tiene beneficios especiales asignados por la administración.</p>' +
      '<dl><div><dt>Correo personal</dt><dd>'+escapeHtml(session.user.email || "kimheewonoff@gmail.com")+'</dd></div><div><dt>ID público</dt><dd>JENNIE</dd></div></dl>' +
      '<h4>Beneficios habilitados</h4><div class="personal-benefit-tags"><span class="'+(hasExoplanet?"active":"")+'">♃ Exoplanet '+(hasExoplanet?"· Activo":"· Pendiente")+'</span><span class="'+(hasCreator?"active":"")+'">✓ Creator Verified '+(hasCreator?"· Activo":"· Pendiente")+'</span></div>' +
      (hasExoplanet?'<div class="personal-entitlement-list"><h4>Temas Exoplanet desbloqueados</h4><p>Jupiter · Sum · Ruby · Astroblue · Neonblue · Green Blue · Orbit Green</p></div>':'') +
      (hasCreator?'<div class="personal-entitlement-list"><h4>Temas Creator desbloqueados</h4><p>Neon Moon · Neon Blue Aura · Neon Reimbow · Green Light · Blue Light · Grey Sky · Blue Sky</p><p class="settings-muted">El espacio de creación de CC y Mods se habilitará cuando se publique su módulo.</p></div>':'') +
      '<p class="settings-muted">Los beneficios están asociados a tu cuenta y no dependen de una compra. La lista blanca es interna y no se muestra en tu perfil público.</p></section>';
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
      '<label>Tu ID público <span class="settings-id-row"><input name="public_id" value="' + escapeHtml(p.public_id || "") + '" minlength="3" maxlength="24" pattern="[A-Za-z0-9][A-Za-z0-9._-]{2,23}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ej. StarHee_01" required><button type="button" class="settings-copy-id" id="copyPublicId">Copiar</button></span><small class="settings-muted">Personalízalo con 3–24 caracteres: letras, números, punto, guion o guion bajo. Debe ser único.</small></label>',
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
      try { await navigator.clipboard.writeText($("profileForm").elements.public_id.value.trim()); say("ID copiado.","success"); }
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
        if (typeof window.applyUniverseTheme === "function") window.applyUniverseTheme(values.theme);
        if (typeof window.applyUniverseLanguage === "function") window.applyUniverseLanguage(values.language);
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

  function renderPlans() {
    const plans = [
      {key:"baby",name:"Baby-Star",level:"BASIC · MEMBER",monthly:"US$3",annual:"US$36",symbol:"★",themes:["Stellar Sum"],benefits:["Insignia Baby-Star junto al nombre y al ID público.","Personalización del perfil con detalles de estrellas.","Emojis y elementos decorativos exclusivos.","Eventos y novedades especiales de la comunidad.","Acceso anticipado a estrenos seleccionados de Starship Plus antes de YouTube.","Acceso incluido a Starship Plus Pro.","Descuentos en compras digitales oficiales elegibles."]},
      {key:"moon",name:"Young-Moon",level:"PRO · VIP",monthly:"US$6",annual:"US$72",symbol:"☾",themes:["Neptuno","Moon","Orbit"],benefits:["Incluye todos los beneficios de Baby-Star.","Acceso a juegos y betas reservados para miembros VIP.","50 % de descuento en compras elegibles de juegos y productos digitales oficiales.","Acceso anticipado a estrenos de Starship Plus antes de YouTube.","Acceso incluido a Starship Plus Pro.","Temas Stars & Moons, eventos privados y recursos digitales PRO."]},
      {key:"planet",name:"Exoplanet",level:"PREMIUM · VIP",monthly:"US$14",annual:"US$168",symbol:"♃",themes:["Jupiter","Sum","Ruby","Astroblue","Neonblue","Green Blue","Orbit Green"],benefits:["Incluye todos los beneficios Baby-Star y Young-Moon.","Acceso a juegos Premium y betas VIP.","50 % de descuento en compras elegibles de juegos y productos digitales oficiales.","Acceso anticipado prioritario a estrenos de Starship Plus antes de YouTube.","Acceso incluido a Starship Plus Pro.","Multimedia y experiencias exclusivas de STARSHIP PLUS."]}
    ];
    $("accountPanelContent").innerHTML =
      '<p class="geffenland-intro">Elige el nivel de membresía que mejor encaje contigo y consulta sus precios, temas y beneficios.</p>' +
      '<div class="universe-pay-benefits"><article><span>✦</span><b>Estrenos anticipados</b><p>Ve los estrenos de Starship Plus antes de que se publiquen en YouTube.</p></article><article><span>🎮</span><b>Juegos VIP</b><p>Young-Moon y Exoplanet desbloquean juegos y betas reservados para miembros VIP.</p></article><article><span>％</span><b>Descuentos VIP</b><p>50 % de descuento en compras elegibles. Un juego de US$10 queda en US$5.</p></article><article><span>＋</span><b>Starship Plus Pro</b><p>Acceso incluido como beneficio de una membresía activa.</p></article></div>' +
      '<div class="geffenland-grid">' + plans.map(plan =>
        '<article class="geffenland-card '+plan.key+'"><div class="geffenland-symbol">'+plan.symbol+'</div><span class="geffenland-level">'+plan.level+'</span><h4>'+plan.name+'</h4><div class="geffenland-prices"><strong>'+plan.monthly+' <small>/ mes</small></strong><span>'+plan.annual+' / año</span></div><div class="geffenland-themes"><b>Temas incluidos</b><div>'+plan.themes.map(theme=>'<span>'+escapeHtml(theme)+'</span>').join("")+'</div></div><ul>'+plan.benefits.map(item=>'<li>'+escapeHtml(item)+'</li>').join("")+'</ul></article>'
      ).join("") + '</div><p class="settings-muted">Precios mostrados en USD, conservados del catálogo actual. El descuento del 50 % se aplica únicamente a compras elegibles y a los niveles VIP Young-Moon y Exoplanet; no se debe interpretar como descuento universal. La contratación, renovación y cobro en línea aún no están conectados, por lo que esta pantalla informa de los beneficios y no procesa pagos.</p>';
  }

  async function renderVerification() {
    const content = $("accountPanelContent");
    content.innerHTML = '<div class="verification-tier-grid">' +
      '<article class="verification-tier baby"><span class="verification-symbol">★</span><h4>Baby-Star</h4><p>Estrella amarilla</p><small>Insignia de apoyo · Próximamente</small></article>' +
      '<article class="verification-tier moon"><span class="verification-symbol">☾</span><h4>Young-Moon</h4><p>Media luna</p><small>Insignia de apoyo · Próximamente</small></article>' +
      '<article class="verification-tier planet"><span class="verification-symbol">♃</span><h4>Exoplanet</h4><p>Júpiter</p><small>Insignia de apoyo · Próximamente</small></article>' +
      '</div><p class="settings-muted">Puedes combinar la insignia de tu Stellar-Llave con Creator Verified. Las dos verificaciones pueden aparecer juntas en tu nombre y perfil cuando ambas hayan sido concedidas.</p>' +
      '<div class="creator-verified-panel"><span class="creator-verified-mark">✓</span><div><h4>Creator Verified</h4><p>Verificación para creadores de contenido. No se compra: requiere cumplir los criterios y pasar una revisión.</p></div></div>' +
      '<ul class="creator-requirements"><li>25,000 seguidores como mínimo.</li><li>Icono y banner públicos en el perfil.</li><li>Al menos seis meses creando contenido sobre juegos oficiales y de terceros.</li></ul>' +
      '<p class="settings-muted"><strong>Beneficio confirmado:</strong> acceso a una plataforma para crear CC y mods para juegos de simulación de vida.</p><div class="creator-theme-list"><strong>Temas exclusivos Creator</strong><div><span>Neon Moon</span><span>Neon Blue Aura</span><span>Neon Reimbow</span><span>Green Light</span><span>Blue Light</span><span>Grey Sky</span><span>Blue Sky</span></div></div>' +
      '<div id="creatorApplicationStatus" class="verification-status">Consultando tus solicitudes…</div>' +
      '<form id="creatorApplicationForm" class="settings-form creator-application-form">' +
      '<h4>Solicitar Creator Verified</h4>' +
      '<label>Seguidores<input name="follower_count" type="number" min="25000" step="1" required placeholder="25000"></label>' +
      '<label>Enlace público de tu icono<input name="icon_url" type="url" required placeholder="https://…"></label>' +
      '<label>Enlace público de tu banner<input name="banner_url" type="url" required placeholder="https://…"></label>' +
      '<label class="settings-check"><input name="icon_is_public" type="checkbox" required><span>Confirmo que mi icono es público.</span></label>' +
      '<label class="settings-check"><input name="banner_is_public" type="checkbox" required><span>Confirmo que mi banner es público.</span></label>' +
      '<label>¿Desde cuándo creas contenido?<input name="creator_since" type="date" required></label>' +
      '<label>Enlaces a tus canales y ejemplos de contenido<textarea name="portfolio_links" rows="4" required placeholder="Un enlace por línea"></textarea></label>' +
      '<label>Información adicional (opcional)<textarea name="notes" maxlength="2000" rows="3"></textarea></label>' +
      '<button class="settings-primary" type="submit">Enviar solicitud</button>' +
      '</form>';
    const statusEl = $("creatorApplicationStatus");
    const form = $("creatorApplicationForm");
    const minDate = new Date(); minDate.setMonth(minDate.getMonth()-6);
    form.elements.creator_since.max = minDate.toISOString().slice(0,10);
    try {
      const {data,error} = await client.from("creator_verification_applications").select("status,reviewer_note,created_at").eq("user_id",session.user.id).order("created_at",{ascending:false}).limit(1).maybeSingle();
      if (error) throw error;
      if (data) {
        const labels = {pending:"Tu solicitud está pendiente de revisión.",approved:"Tu solicitud fue aprobada. ¡Felicidades!",rejected:"Tu solicitud fue rechazada.",needs_changes:"El equipo necesita que realices algunos cambios."};
        statusEl.textContent = (labels[data.status] || "Solicitud registrada.") + (data.reviewer_note ? " Nota del equipo: " + data.reviewer_note : "");
        statusEl.dataset.status = data.status;
        if (data.status === "pending" || data.status === "approved") form.hidden = true;
      } else {
        statusEl.textContent = "Aún no has enviado una solicitud.";
      }
    } catch (error) {
      statusEl.textContent = "No pudimos consultar tus solicitudes. " + (error.message || "");
    }
    form.addEventListener("submit",async event=>{
      event.preventDefault();
      const button=form.querySelector('[type="submit"]');
      const values=Object.fromEntries(new FormData(form).entries());
      const creatorSince = values.creator_since;
      const cutoff = new Date(); cutoff.setMonth(cutoff.getMonth()-6);
      if(new Date(creatorSince+"T00:00:00")>cutoff){say("Necesitas al menos seis meses creando contenido.","error");return;}
      const links=String(values.portfolio_links||"").split(/\r?\n/).map(v=>v.trim()).filter(Boolean);
      if(!links.length || links.some(v=>!/^https?:\/\//i.test(v))){say("Añade al menos un enlace público válido (https://…).","error");return;}
      button.disabled=true; say("Enviando solicitud…");
      try {
        const payload={
          user_id:session.user.id,
          follower_count:Number(values.follower_count),
          icon_url:values.icon_url.trim(),
          banner_url:values.banner_url.trim(),
          icon_is_public:form.elements.icon_is_public.checked,
          banner_is_public:form.elements.banner_is_public.checked,
          creator_since:creatorSince,
          portfolio_links:links,
          notes:String(values.notes||"").trim()||null,
          status:"pending"
        };
        const {error}=await client.from("creator_verification_applications").insert(payload);
        if(error) throw error;
        statusEl.textContent="Solicitud recibida. El equipo revisará los datos y los enlaces que compartiste.";
        statusEl.dataset.status="pending";
        form.hidden=true;
        say("Tu solicitud fue enviada correctamente.","success");
      } catch(error) { say(error.message || "No se pudo enviar la solicitud.","error"); }
      finally { button.disabled=false; }
    });
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
  const sectionTitles = {profile:"Perfil de Usuario","personal-profile":"Perfil personal",verification:"Verificaciones",feedback:"Quejas y Sugerencias",security:"Seguridad",privacy:"Privacidad",preferences:"Preferencias",activity:"Mis Actividades"};
  document.querySelectorAll("[data-account-section]").forEach(button=>button.addEventListener("click",()=>showPanel(button.dataset.accountSection,sectionTitles[button.dataset.accountSection] || "Configuración")));

  avatarButton?.addEventListener("click",openConfiguration);
  document.querySelectorAll("[data-open-account-settings]").forEach(button=>button.addEventListener("click",event=>{
    event.preventDefault();
    event.stopPropagation();
    openConfiguration();
  }));
  back?.addEventListener("click",showMenu);
  dialog?.addEventListener("close",showMenu);
  const personalProfileSection = $("personalProfileSection");
  function syncPersonalProfileVisibility() {
    if (personalProfileSection) personalProfileSection.hidden = session?.user?.id !== "a22969c5-4660-487b-9b26-010a6fdada9c";
  }
  syncPersonalProfileVisibility();
  window.addEventListener("universe-entitlements-change",()=>{
    if (!panel.hidden && title.textContent === "Perfil personal" && session?.user) renderPersonalProfile();
    if (!panel.hidden && dialog.dataset.view === "plans") renderPlans();
  });
  window.addEventListener("universe-auth-change",async event=>{
    session=event.detail?.session || null;
    syncPersonalProfileVisibility();
    client=window.universeSupabase || client;
    if (!session?.user) {profile=null;renderAvatar(null);showMenu();return;}
    try {await loadProfile();} catch(error){console.warn("No se pudo cargar el perfil:",error);}
  });
  window.addEventListener("universe-supabase-ready",async()=>{client=window.universeSupabase; if(session?.user) try{await loadProfile();}catch(error){console.warn(error);}});
  client=window.universeSupabase || null;
  if (client) window.dispatchEvent(new Event("universe-supabase-ready"));
  document.addEventListener("DOMContentLoaded",()=>{if(!session)showMenu();});
})();