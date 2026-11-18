(() => {
  "use strict";
  const root=document.getElementById("privateHome");
  if(!root)return;
  const $=(id)=>document.getElementById(id);
  let userId=null,openPanel=null;
  const panelWrap=$("ulhActionPanels");
  const key=(kind)=>"universe-play-"+kind+":"+(userId||"guest");
  const read=(kind,fallback=[])=>{try{return JSON.parse(localStorage.getItem(key(kind))||"null")||fallback;}catch{return fallback;}};
  const write=(kind,value)=>{try{localStorage.setItem(key(kind),JSON.stringify(value));}catch(error){console.warn("Universe Play storage:",error);}};
  const safe=(value)=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const stamp=()=>new Date().toISOString();
  function notify(title,message,type="info"){
    if(!userId)return;
    const list=read("notifications");
    list.unshift({id:"n-"+Date.now()+"-"+Math.random().toString(36).slice(2,7),title,message,type,date:stamp(),read:false});
    write("notifications",list.slice(0,80));renderNotifications();
  }
  function renderNotifications(){
    const list=read("notifications"),host=$("ulhNotificationsList");
    if(host)host.innerHTML=list.length?list.map(n=>'<article class="ulh-panel-item '+(n.read?"is-read":"is-unread")+'"><span class="ulh-panel-symbol">'+(n.type==="purchase"?"✦":n.type==="series"?"▣":"✧")+'</span><div><strong>'+safe(n.title)+'</strong><p>'+safe(n.message)+'</p><small>'+new Date(n.date).toLocaleString()+'</small></div></article>').join(""):'<p class="ulh-panel-empty">Todavía no tienes notificaciones.</p>';
    const unread=list.filter(n=>!n.read).length,dot=document.querySelector(".ulh-action-dot");
    if(dot)dot.hidden=!unread;
  }
  function renderCart(){
    const list=read("cart"),host=$("ulhCartList"),summary=$("ulhCartSummary");
    if(host)host.innerHTML=list.length?list.map(item=>'<article class="ulh-panel-item ulh-cart-item"><span class="ulh-panel-symbol">🛍</span><div><strong>'+safe(item.name)+'</strong><p>'+(item.price?safe(item.price):"Pendiente de pago")+'</p></div><button type="button" data-cart-remove="'+safe(item.id)+'" aria-label="Quitar '+safe(item.name)+' del carrito">×</button></article>').join(""):'<p class="ulh-panel-empty">Tu carrito está vacío. Los productos que añadas y aún no pagues aparecerán aquí.</p>';
    if(summary)summary.textContent=list.length+" "+(list.length===1?"producto pendiente":"productos pendientes");
    updateCount("cart",list.length);
  }
  function renderFavorites(){
    const list=read("favorites"),host=$("ulhFavoritesList");
    if(host)host.innerHTML=list.length?list.map(item=>'<article class="ulh-panel-item"><span class="ulh-panel-symbol">♡</span><div><strong>'+safe(item.name)+'</strong><small>Juego guardado en favoritos</small></div><button type="button" data-favorite-remove="'+safe(item.id)+'" aria-label="Quitar '+safe(item.name)+' de favoritos">×</button></article>').join(""):'<p class="ulh-panel-empty">Aún no has guardado juegos favoritos. Pulsa ♡ en cualquier juego para añadirlo.</p>';
    updateCount("favorites",list.length);
    root.querySelectorAll("[data-play-favorite]").forEach(button=>{const saved=list.some(item=>item.id===button.dataset.playFavorite);button.classList.toggle("is-favorite",saved);button.setAttribute("aria-pressed",String(saved));button.textContent=saved?"♥":"♡";});
  }
  function updateCount(kind,count){
    const button=root.querySelector('[data-play-panel="'+kind+'"]'),badge=button?.querySelector(".ulh-action-count");
    if(badge){badge.textContent=count>99?"99+":String(count);badge.hidden=!count;}
  }
  function renderAll(){renderNotifications();renderCart();renderFavorites();}
  function closePanels(){
    openPanel=null;panelWrap?.querySelectorAll("[data-play-panel-content]").forEach(panel=>panel.hidden=true);
    root.querySelectorAll("[data-play-panel]").forEach(button=>{button.setAttribute("aria-expanded","false");});
  }
  function togglePanel(name,button){
    const next=openPanel===name?null:name;closePanels();if(!next)return;
    openPanel=next;const panel=panelWrap?.querySelector('[data-play-panel-content="'+name+'"]');if(panel)panel.hidden=false;
    button?.setAttribute("aria-expanded","true");
    if(name==="notifications")renderNotifications();if(name==="cart")renderCart();if(name==="favorites")renderFavorites();
  }
  root.querySelectorAll("[data-play-panel]").forEach(button=>button.addEventListener("click",event=>{event.stopPropagation();togglePanel(button.dataset.playPanel,button);}));
  panelWrap?.addEventListener("click",event=>{
    const close=event.target.closest("[data-panel-close]");if(close){closePanels();return;}
    const removeCart=event.target.closest("[data-cart-remove]");if(removeCart){write("cart",read("cart").filter(item=>item.id!==removeCart.dataset.cartRemove));renderCart();return;}
    const removeFavorite=event.target.closest("[data-favorite-remove]");if(removeFavorite){write("favorites",read("favorites").filter(item=>item.id!==removeFavorite.dataset.favoriteRemove));renderFavorites();return;}
    if(event.target.closest("[data-notifications-read]")){write("notifications",read("notifications").map(item=>({...item,read:true})));renderNotifications();}
  });
  document.addEventListener("click",event=>{if(openPanel&&!event.target.closest("#ulhActionPanels")&&!event.target.closest("[data-play-panel]"))closePanels();});
  document.addEventListener("keydown",event=>{if(event.key==="Escape")closePanels();});
  function favoriteToggle(id,name){
    if(!userId){return;}
    let list=read("favorites");const found=list.some(item=>item.id===id);
    list=found?list.filter(item=>item.id!==id):[{id,name},...list];
    write("favorites",list);renderFavorites();
  }
  function decorateFavorites(){
    root.querySelectorAll(".ulx-game,.ulh-catalog-card,.ulh-library-card").forEach(card=>{
      if(card.querySelector("[data-play-favorite]"))return;
      const title=card.querySelector(".ulx-info strong,.ulh-catalog-copy h3,.ulh-library-copy h3")?.textContent?.trim();
      if(!title)return;
      const id=card.dataset.openGame||card.dataset.installGame||title.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
      const button=document.createElement("button");button.type="button";button.className="ulh-card-favorite";button.dataset.playFavorite=id;button.setAttribute("aria-label","Añadir "+title+" a favoritos");button.setAttribute("aria-pressed","false");button.textContent="♡";
      button.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();favoriteToggle(id,title);});
      card.appendChild(button);
    });
    renderFavorites();
  }
  const observer=new MutationObserver(decorateFavorites);observer.observe(root,{childList:true,subtree:true});decorateFavorites();
  function addToCart(item){
    if(!userId||!item||!item.id||!item.name)return false;
    const list=read("cart");if(!list.some(entry=>entry.id===String(item.id)))list.push({id:String(item.id),name:String(item.name),price:item.price?String(item.price):""});
    write("cart",list);renderCart();return true;
  }
  root.addEventListener("click",event=>{
    const button=event.target.closest("[data-add-to-cart]");if(!button)return;
    event.preventDefault();event.stopPropagation();
    const card=button.closest("article"),name=button.dataset.productName||card?.querySelector("h3")?.textContent?.trim();
    addToCart({id:button.dataset.addToCart,name,price:button.dataset.productPrice});
  });
  window.universePlayStore={
    addToCart,
    removeFromCart(id){write("cart",read("cart").filter(item=>item.id!==String(id)));renderCart();},
    toggleFavorite(id,name){favoriteToggle(String(id),String(name));},
    notifyNewSeries(name){notify("Nueva serie añadida",name+" ya está disponible en el catálogo de Universe Play.","series");},
    purchaseResult(success,productName,reference){notify(success?"Compra procesada":"No se pudo procesar la compra",success?"Tu compra de "+productName+" se ha procesado correctamente."+(reference?" Referencia: "+reference:""):"No se completó el pago de "+productName+". Puedes volver a intentarlo desde la tienda.","purchase");},
    addNotification(title,message){notify(title,message);}
  };
  window.addEventListener("universe-account-created",event=>{
    const id=event.detail?.user?.id;if(!id)return;
    const storageKey="universe-play-welcome:"+id;
    if(localStorage.getItem(storageKey))return;
    const previous=userId;userId=id;notify("¡Bienvenido a Universe Play!", "Tu cuenta se ha creado correctamente. ¡Prepárate para descubrir nuevos mundos!");
    localStorage.setItem(storageKey,"1");userId=previous;
  });
  window.addEventListener("universe-auth-change",event=>{
    userId=event.detail?.session?.user?.id||null;
    closePanels();renderAll();decorateFavorites();
  });
  renderAll();
})();