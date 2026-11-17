(() => {
  "use strict";
  const dialog = document.getElementById("accountDialog");
  const menu = document.getElementById("accountSections");
  const panel = document.getElementById("accountPanel");
  const note = document.getElementById("accountSectionNote");
  const title = document.getElementById("accountPanelTitle");
  const content = document.getElementById("accountPanelContent");
  const back = document.getElementById("accountBack");
  const accountTitle = document.getElementById("accountTitle");
  const accountIntro = document.querySelector(".account-intro");
  const accountKicker = document.querySelector("#accountDialog .dialog-kicker");
  const signOut = document.getElementById("accountSignOut");
  const settingsMessage = document.getElementById("settingsMessage");
  const original = new Map();
  let payOpen = false;

  function setHidden(element, hidden) {
    if (!element) return;
    if (!original.has(element)) original.set(element, element.hidden);
    element.hidden = hidden;
  }

  function restoreAccountView() {
    for (const [element, hidden] of original) element.hidden = hidden;
    original.clear();
    if (accountTitle) accountTitle.textContent = "Configuración de Usuario";
    if (accountKicker) accountKicker.textContent = "UNIVERSE LEAGUE · ACCOUNT";
    if (title) title.textContent = "Configuración";
    if (content) content.replaceChildren();
    if (menu) menu.hidden = false;
    if (panel) panel.hidden = true;
    if (note) {
      note.hidden = false;
      note.textContent = "Selecciona una sección para administrar tu cuenta.";
    }
    payOpen = false;
  }

  function openPlans(event) {
    const trigger = event.target.closest("#universePayOpen,[data-open-universe-pay]");
    if (!trigger) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!dialog || !menu || !panel || !title || !content) {
      console.error("Universe Pay: faltan elementos del panel.");
      return;
    }
    if (!dialog.open) dialog.showModal();
    payOpen = true;

    setHidden(menu, true);
    setHidden(note, true);
    setHidden(back, true);
    setHidden(accountIntro, true);
    setHidden(signOut, true);
    setHidden(settingsMessage, true);

    if (accountTitle) accountTitle.textContent = "Universe Pay";
    if (accountKicker) accountKicker.textContent = "MEMBERSHIPS · UNIVERSE LEAGUE";
    panel.hidden = false;
    title.textContent = "Elige tu plan";
    content.innerHTML = `
      <div class="geffenland-grid">
        <article class="geffenland-card baby">
          <div class="geffenland-symbol">★</div><span class="geffenland-level">BASIC · MEMBER</span>
          <h4>Baby-Star</h4><div class="geffenland-prices"><strong>US$3 <small>/ mes</small></strong><span>US$36 / año</span></div>
          <ul><li>Insignia Baby-Star y personalización del perfil.</li><li>Emojis y elementos decorativos exclusivos.</li><li>Eventos y novedades especiales.</li><li>Acceso anticipado a estrenos seleccionados de Starship Plus.</li><li>Acceso incluido a Starship Plus Pro.</li><li>Descuentos en compras digitales oficiales elegibles.</li></ul>
        </article>
        <article class="geffenland-card moon">
          <div class="geffenland-symbol">☾</div><span class="geffenland-level">PRO · VIP</span>
          <h4>Young-Moon</h4><div class="geffenland-prices"><strong>US$6 <small>/ mes</small></strong><span>US$72 / año</span></div>
          <ul><li>Incluye todos los beneficios de Baby-Star.</li><li>Acceso a juegos y betas reservados para miembros VIP.</li><li>50 % de descuento en compras elegibles.</li><li>Acceso anticipado a estrenos de Starship Plus.</li><li>Acceso incluido a Starship Plus Pro.</li><li>Temas Stars & Moons y recursos digitales PRO.</li></ul>
        </article>
        <article class="geffenland-card planet">
          <div class="geffenland-symbol">♃</div><span class="geffenland-level">PREMIUM · VIP</span>
          <h4>Exoplanet</h4><div class="geffenland-prices"><strong>US$14 <small>/ mes</small></strong><span>US$168 / año</span></div>
          <ul><li>Incluye todos los beneficios Baby-Star y Young-Moon.</li><li>Acceso a juegos Premium y betas VIP.</li><li>50 % de descuento en compras elegibles.</li><li>Acceso anticipado prioritario a estrenos de Starship Plus.</li><li>Acceso incluido a Starship Plus Pro.</li><li>Multimedia y experiencias exclusivas de STARSHIP PLUS.</li></ul>
        </article>
      </div>
      <p class="settings-muted">Precios en USD. La contratación, renovación y cobro en línea todavía no están conectados; esta pantalla informa de los planes, pero no procesa pagos.</p>`;
  }

  document.addEventListener("click", openPlans, true);
  dialog?.addEventListener("close", () => {
    if (payOpen) restoreAccountView();
  });
})();