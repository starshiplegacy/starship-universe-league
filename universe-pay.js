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

  function restoreDialog() {
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

  function openUniversePay(event) {
    const trigger = event.target.closest("[data-open-universe-pay]");
    if (!trigger) return;
    event.preventDefault();
    event.stopImmediatePropagation();

    if (!dialog || !menu || !panel || !title || !content) return;
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
    title.textContent = "Planes y beneficios";

    content.innerHTML = [
      '<section class="geffenland-welcome" aria-labelledby="universePayWelcomeTitle">',
      '<span class="geffenland-welcome-kicker">UNIVERSE LEAGUE MEMBERSHIPS</span>',
      '<h3 id="universePayWelcomeTitle">¡Bienvenido a Universe Pay!</h3>',
      '<p>Encuentra la membresía que mejor acompaña tu experiencia. Cada nivel desbloquea beneficios y ventajas especiales dentro de nuestro universo.</p>',
      '</section>',
      '<div class="geffenland-grid">',
      '<article class="geffenland-card baby"><div class="geffenland-symbol">★</div><span class="geffenland-level">BASIC · MEMBER</span><h4>Baby-Star</h4><div class="geffenland-prices"><strong>US$3 <small>/ mes</small></strong><span>US$36 / año</span></div><ul><li>Insignia Baby-Star y personalización del perfil.</li><li>Emojis y elementos decorativos exclusivos.</li><li>Eventos y novedades especiales.</li><li>Acceso anticipado a estrenos seleccionados de Starship Plus.</li><li>Acceso incluido a Starship Plus Pro.</li><li>Descuentos en compras digitales oficiales elegibles.</li></ul></article>',
      '<article class="geffenland-card moon"><div class="geffenland-symbol">☾</div><span class="geffenland-level">PRO · VIP</span><h4>Young-Moon</h4><div class="geffenland-prices"><strong>US$6 <small>/ mes</small></strong><span>US$72 / año</span></div><ul><li>Incluye todos los beneficios de Baby-Star.</li><li>Acceso a juegos y betas reservados para miembros VIP.</li><li>50 % de descuento en compras elegibles.</li><li>Acceso anticipado a estrenos de Starship Plus.</li><li>Acceso incluido a Starship Plus Pro.</li><li>Temas Stars & Moons y recursos digitales PRO.</li></ul></article>',
      '<article class="geffenland-card planet"><div class="geffenland-symbol">♃</div><span class="geffenland-level">PREMIUM · VIP</span><h4>Exoplanet</h4><div class="geffenland-prices"><strong>US$14 <small>/ mes</small></strong><span>US$168 / año</span></div><ul><li>Incluye todos los beneficios Baby-Star y Young-Moon.</li><li>Acceso a juegos Premium y betas VIP.</li><li>50 % de descuento en compras elegibles.</li><li>Acceso anticipado prioritario a estrenos de Starship Plus.</li><li>Acceso incluido a Starship Plus Pro.</li><li>Multimedia y experiencias exclusivas de STARSHIP PLUS.</li></ul></article>',
      '</div>',
      '<div class="geffenland-select-plans" aria-label="Elegir una membresía">',
      '<button type="button" data-universe-pay-select="Baby-Star">Elegir <strong>Baby-Star</strong></button>',
      '<button type="button" data-universe-pay-select="Young-Moon">Elegir <strong>Young-Moon</strong></button>',
      '<button type="button" data-universe-pay-select="Exoplanet">Elegir <strong>Exoplanet</strong></button>',
      '</div>',
      '<p class="geffenland-selection-message" id="universePaySelectionMessage" role="status" aria-live="polite"></p>',
      '<p class="settings-muted geffenland-payment-note">Precios en USD. La contratación, renovación y cobro en línea todavía no están conectados. Elegir un plan aquí no activa una membresía ni realiza un pago.</p>'
    ].join("");
  }

  content?.addEventListener("click", event => {
    const button = event.target.closest("[data-universe-pay-select]");
    if (!button || !content.contains(button)) return;
    const selectedPlan = button.dataset.universePaySelect;
    const message = content.querySelector("#universePaySelectionMessage");
    if (message) {
      message.textContent = selectedPlan + " es tu plan seleccionado. La contratación estará disponible cuando se conecte el sistema de pagos.";
    }
    content.querySelectorAll("[data-universe-pay-select]").forEach(item => {
      const selected = item === button;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
  });

  document.addEventListener("click", openUniversePay, true);
  dialog?.addEventListener("close", () => {
    if (payOpen) restoreDialog();
  });
})();
