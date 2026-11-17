(() => {
  "use strict";

  const MEMBERSHIPS_URL = "./assets/universe-pay/starship_memberships.html";

  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-open-universe-pay]");
    if (!trigger) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(MEMBERSHIPS_URL);
  }, true);
})();
