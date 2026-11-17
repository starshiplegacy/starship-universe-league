(() => {
  "use strict";
  const openPay = (event) => {
    const trigger = event.target.closest("#universePayOpen,[data-open-universe-pay]");
    if (!trigger) return;
    event.preventDefault();
    const dialog = document.getElementById("accountDialog");
    const menu = document.getElementById("accountSections");
    const panel = document.getElementById("accountPanel");
    const note = document.getElementById("accountSectionNote");
    const title = document.getElementById("accountPanelTitle");
    const content = document.getElementById("accountPanelContent");
    if (!dialog || !menu || !panel || !title || !content) {
      console.error("Universe Pay: faltan elementos del panel en index.html");
      return;
    }
    try {
      if (!dialog.open) dialog.showModal();
    } catch (error) {
      console.error("Universe Pay: no se pudo abrir el diálogo", error);
      return;
    }
    menu.hidden = true;
    panel.hidden = false;
    if (note) note.hidden = true;
    title.textContent = "Universe Pay";
    content.innerHTML = `
      <p class="geffenland-intro">Universe Pay reúne las membresías de STARSHIP UNIVERSE LEAGUE y sus beneficios.</p>
      <div class="universe-pay-benefits">
        <article><span>✦</span><b>Estrenos anticipados</b><p>Ve los estrenos de Starship Plus antes de que se publiquen en YouTube.</p></article>
        <article><span>🎮</span><b>Juegos VIP</b><p>Young-Moon y Exoplanet desbloquean juegos y betas reservados para miembros VIP.</p></article>
        <article><span>％</span><b>Descuentos VIP</b><p>50 % de descuento en compras elegibles. Un juego de US$10 queda en US$5.</p></article>
        <article><span>＋</span><b>Starship Plus Pro</b><p>Acceso incluido como beneficio de una membresía activa.</p></article>
      </div>
      <div class="geffenland-grid">
        <article class="geffenland-card baby"><div class="geffenland-symbol">★</div><span class="geffenland-level">BASIC · MEMBER</span><h4>Baby-Star</h4><div class="geffenland-prices"><strong>US$3 <small>/ mes</small></strong><span>US$36 / año</span></div><ul><li>Insignia y personalización del perfil.</li><li>Eventos y novedades especiales.</li><li>Estrenos anticipados seleccionados de Starship Plus.</li><li>Acceso incluido a Starship Plus Pro.</li></ul></article>
        <article class="geffenland-card moon"><div class="geffenland-symbol">☾</div><span class="geffenland-level">PRO · VIP</span><h4>Young-Moon</h4><div class="geffenland-prices"><strong>US$6 <small>/ mes</small></strong><span>US$72 / año</span></div><ul><li>Todos los beneficios Baby-Star.</li><li>Juegos y betas VIP.</li><li>50 % de descuento en compras elegibles.</li><li>Acceso anticipado a Starship Plus Pro.</li></ul></article>
        <article class="geffenland-card planet"><div class="geffenland-symbol">♃</div><span class="geffenland-level">PREMIUM · VIP</span><h4>Exoplanet</h4><div class="geffenland-prices"><strong>US$14 <small>/ mes</small></strong><span>US$168 / año</span></div><ul><li>Todos los beneficios Baby-Star y Young-Moon.</li><li>Juegos Premium y betas VIP.</li><li>50 % de descuento en compras elegibles.</li><li>Estrenos anticipados prioritarios y Starship Plus Pro.</li></ul></article>
      </div>
      <p class="settings-muted">Precios en USD. La contratación, renovación y cobro en línea todavía no están conectados; esta pantalla informa de los planes y beneficios, pero no procesa pagos.</p>`;
  };
  document.addEventListener("click", openPay, true);
})();