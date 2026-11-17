(() => {
 const dialog=document.getElementById("miniGameDialog");if(!dialog)return;
 const $=id=>document.getElementById(id),board=$("miniGameBoard"),title=$("miniGameTitle"),status=$("miniGameStatus"),timer=$("miniGameTimer"),help=$("miniGameHelp"),controls=$("pixxyControls");
 let game="",mode="easy",seconds=null,interval=null,ended=false,chess=null,selected=null,legal=[],tiles=[],tilePick=null,score=0,history=[],hinted=[],botThinking=false;
 const symbols={w:{k:"♔",q:"♕",r:"♖",b:"♗",n:"♘",p:"♙"},b:{k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"}};
 const power={shuffle:{count:3,cooldown:0},hint:{count:3,cooldown:0},undo:{count:3,cooldown:0}};
 let powerTicker=null;
 function stopClock(){if(interval){clearInterval(interval);interval=null;}}
 function showClock(){timer.textContent=seconds===null?"∞":String(Math.floor(seconds/60)).padStart(2,"0")+":"+String(seconds%60).padStart(2,"0");}
 function startClock(value){stopClock();seconds=value;showClock();if(value!==null)interval=setInterval(()=>{seconds--;showClock();saveGameState();if(seconds<=0){stopClock();ended=true;botThinking=false;status.textContent="¡Se acabó el tiempo!";help.textContent="Inicia una nueva partida para volver a jugar.";renderBoard();saveGameState();}},1000);}
 function pauseClock(){stopClock();}
  function saveGameState(){
   if(!game||!window.starshipSave)return;
   const state={game,mode,seconds,customMinutes:Number($("miniGameMinutes").value)||10,ended,score,
    chessPgn:game==="chess"&&chess?chess.pgn():null,
    chessFen:game==="chess"&&chess?chess.fen():null,
    tiles:game==="pixxy"?tiles.map(t=>({...t})):null,
    history:game==="pixxy"?history.map(h=>({tiles:h.tiles.map(t=>({...t})),score:h.score})):[],
    power:game==="pixxy"?JSON.parse(JSON.stringify(power)):null};
   window.starshipSave.save(game==="chess"?"jaque-matte":"pinkie-star",state);
  }
  async function restoreGameState(){
   if(!window.starshipSave)return false;
   let state=await window.starshipSave.load(game==="chess"?"jaque-matte":"pinkie-star");
   if(!state&&game==="pixxy"){
    state=await window.starshipSave.load("pixxy-up");
    if(state)await window.starshipSave.save("pinkie-star",state);
   }
   if(!state||state.game!==game)return false;
   mode=state.mode||"easy";$("miniGameMinutes").value=state.customMinutes||10;
   document.querySelectorAll("[data-mini-mode]").forEach(b=>b.classList.toggle("active",b.dataset.miniMode===mode));
   $("miniGameCustomTime").hidden=mode!=="custom";
   if(game==="chess"&&chess){
    try{if(state.chessPgn)chess.loadPgn(state.chessPgn);else if(state.chessFen)chess.load(state.chessFen);}catch(e){console.warn("No se pudo recuperar la partida de ajedrez",e);return false;}
    ended=Boolean(state.ended);status.textContent=ended?"Partida recuperada · Terminada":chess.turn()==="w"?"Partida recuperada · Tu turno":"Partida recuperada · Turno del Bot";
    renderBoard();
   }else if(game==="pixxy"&&Array.isArray(state.tiles)){
    tiles=state.tiles.map(t=>({...t}));score=Number(state.score)||0;history=Array.isArray(state.history)?state.history:[];ended=Boolean(state.ended);
    if(state.power)Object.keys(power).forEach(k=>{if(state.power[k])Object.assign(power[k],state.power[k]);});
    renderBoard();status.textContent=ended?"Partida recuperada · Terminada":"Partida recuperada";
    updatePowerUI();startPowerTicker();
   }
   if(!ended&&state.seconds!==null&&Number.isFinite(state.seconds))startClock(Math.max(0,state.seconds));
   else if(state.seconds===null){seconds=null;showClock();}
   help.textContent="Tu progreso anterior fue recuperado automáticamente.";
   return true;
  }

 function chooseMode(which){mode=which;document.querySelectorAll("[data-mini-mode]").forEach(b=>b.classList.toggle("active",b.dataset.miniMode===which));$("miniGameCustomTime").hidden=which!=="custom";if(which==="custom")pauseClock();}
 function clockForMode(){return mode==="easy"?null:mode==="scary"?300:Math.max(1,Math.min(180,Number($("miniGameMinutes").value)||10))*60;}
 async function startGame(startTimer=true,restoreSaved=false){
  pauseClock();ended=false;botThinking=false;selected=null;legal=[];tilePick=null;hinted=[];score=0;history=[];
  if(game==="chess"){
   chess=null;status.textContent="Preparando tablero…";help.textContent="El tablero se mantiene fijo en 200 × 200 px.";
   board.innerHTML="<p class='mini-game-help'>Preparando tablero…</p>";
   try{if(!window.ChessEngine){const m=await import("https://cdn.jsdelivr.net/npm/chess.js@1.4.0/dist/esm/chess.js");window.ChessEngine=m.Chess;}chess=new window.ChessEngine();renderBoard();status.textContent="Tu turno · Blancas";help.textContent="Selecciona una pieza y después una casilla marcada para mover.";if(restoreSaved&&await restoreGameState())return;if(startTimer)startClock(clockForMode());saveGameState();}
   catch(e){board.innerHTML="<p class='mini-game-help'>No se pudo cargar el motor de ajedrez. Comprueba tu conexión e inténtalo de nuevo.</p>";status.textContent="Motor no disponible";}
  }else{
   controls.hidden=false;status.textContent="Encuentra todos los pares";help.textContent="Retira pares iguales que tengan libre el lateral izquierdo o el derecho.";
   resetPowers();makeTiles();if(restoreSaved&&await restoreGameState())return;if(startTimer)startClock(clockForMode());saveGameState();
  }
 }
 function resetPowers(){Object.keys(power).forEach(k=>{power[k].count=3;power[k].cooldown=0;});updatePowerUI();startPowerTicker();}
 function startPowerTicker(){if(powerTicker)clearInterval(powerTicker);powerTicker=setInterval(()=>{Object.keys(power).forEach(k=>{const p=power[k];if(p.count<3){p.cooldown--;if(p.cooldown<=0){p.count++;p.cooldown=p.count<3?60:0;}}});updatePowerUI();},1000);}
 function updatePowerUI(){for(const k of Object.keys(power)){const p=power[k],count=$(k==="shuffle"?"pixxyShuffleCount":k==="hint"?"pixxyHintCount":"pixxyUndoCount");if(count)count.textContent=p.count+"/3"+(p.count<3&&p.cooldown>0?" · "+p.cooldown+"s":"");const btn=document.querySelector('[data-pixxy-action="'+k+'"]');if(btn)btn.disabled=p.count<=0||ended||(k==="undo"&&!history.length);}}
 function spendPower(k){const p=power[k];if(!p||p.count<=0)return false;p.count--;if(p.cooldown===0)p.cooldown=60;updatePowerUI();return true;}
 function makeTiles(){const faces=["🍓","🌙","⭐","🍀","💎","🪐","🦋","🍒","🌈","🔮","🐚","☀️","🍉","🧸"];let deck=[];faces.forEach(v=>deck.push(v,v));let attempts=0;do{for(let i=deck.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}tiles=deck.map((v,i)=>({id:i,value:v,removed:false}));attempts++;}while(attempts<100&&!findPair(false));renderBoard();}
 function isFree(i){if(!tiles[i]||tiles[i].removed)return false;const row=Math.floor(i/7),col=i%7;return col===0||tiles[row*7+col-1].removed||col===6||tiles[row*7+col+1].removed;}
 function findPair(useCurrent=true){const arr=useCurrent?tiles:tiles;for(let i=0;i<arr.length;i++){if(arr[i].removed||!isFree(i))continue;for(let j=i+1;j<arr.length;j++){if(!arr[j].removed&&arr[i].value===arr[j].value&&isFree(j))return[i,j];}}return null;}
 function renderBoard(){
  if(game==="chess"&&chess){const grid=document.createElement("div");grid.className="chess-board";chess.board().forEach((row,r)=>row.forEach((p,c)=>{const sq=String.fromCharCode(97+c)+(8-r),b=document.createElement("button");b.type="button";b.className="chess-square "+((r+c)%2?"dark":"light");if(selected===sq)b.classList.add("selected");const dest=legal.filter(m=>m.to===sq);if(dest.length)b.classList.add(chess.get(sq)?"capture":"legal");if(p){b.textContent=symbols[p.color][p.type];b.classList.add(p.color==="w"?"chess-piece-white":"chess-piece-black");}b.setAttribute("aria-label",sq);b.addEventListener("click",()=>chessClick(sq));grid.appendChild(b);}));board.replaceChildren(grid);}
  if(game==="pixxy"){const grid=document.createElement("div");grid.className="pixxy-board";tiles.forEach((t,i)=>{const b=document.createElement("button");b.type="button";b.className="pixxy-tile"+(t.removed?" removed":"");const free=isFree(i);if(!free&&!t.removed)b.classList.add("blocked");if(tilePick===i)b.classList.add("selected");if(hinted.includes(i))b.classList.add("hinted");b.textContent=t.removed?"":t.value;b.disabled=t.removed||!free||ended;b.addEventListener("click",()=>pickTile(i));grid.appendChild(b);});board.replaceChildren(grid);status.textContent="Pares retirados: "+score+" / 14";updatePowerUI();if(tiles.every(t=>t.removed)){ended=true;pauseClock();status.textContent="¡Tablero despejado!";help.textContent="¡Excelente trabajo, astronauta!";updatePowerUI();}}
 }
 function chessClick(sq){if(ended||botThinking||!chess||chess.turn()!=="w")return;const p=chess.get(sq);if(selected&&legal.some(m=>m.to===sq)){try{chess.move({from:selected,to:sq,promotion:"q"});selected=null;legal=[];renderBoard();saveGameState();if(chess.isGameOver()){finishChess(true);return;}status.textContent="El Bot está analizando…";botThinking=true;setTimeout(botMove,350);}catch(e){selected=null;legal=[];renderBoard();}}else if(p&&p.color==="w"){selected=sq;legal=chess.moves({square:sq,verbose:true});renderBoard();}else{selected=null;legal=[];renderBoard();}}
 function finishChess(userWon){ended=true;botThinking=false;pauseClock();status.textContent=chess.isCheckmate()?(userWon?"¡Jaque mate! ¡Ganaste!":"El Bot ganó por jaque mate."):"Partida terminada";help.textContent="Pulsa Nueva partida para volver a jugar.";saveGameState();}
 function botMove(){
  if(ended||!chess||chess.turn()!=="b")return;
  const moves=chess.moves({verbose:true});if(!moves.length){finishChess(false);return;}
  const value={p:100,n:320,b:335,r:500,q:900,k:20000};
  let best=null,bestScore=-Infinity;
  for(const m of moves){
   chess.move({from:m.from,to:m.to,promotion:"q"});
   let score=(m.captured?value[m.captured]:0)+(m.promotion?value[m.promotion]-100:0)+(chess.isCheck()?45:0)+(chess.isCheckmate()?100000:0);
   const toFile=m.to.charCodeAt(0)-97,toRank=Number(m.to[1])-1;
   score+=(3.5-Math.abs(3.5-toFile)+3.5-Math.abs(3.5-toRank))*2;
   if(chess.isCheckmate())score+=100000;
   chess.undo();
   score+=Math.random()*4;
   if(score>bestScore){bestScore=score;best=m;}
  }
  if(best)chess.move({from:best.from,to:best.to,promotion:"q"});
  botThinking=false;
  if(chess.isGameOver()){finishChess(false);return;}
  status.textContent="Tu turno · Blancas";renderBoard();saveGameState();
 }
 function pickTile(i){if(ended||!isFree(i))return;if(tilePick===null){tilePick=i;renderBoard();return;}if(tilePick===i){tilePick=null;renderBoard();return;}if(tiles[tilePick].value===tiles[i].value){history.push({tiles:tiles.map(t=>({...t})),score});tiles[tilePick].removed=true;tiles[i].removed=true;score++;tilePick=null;hinted=[];help.textContent="¡Buen par! Sigue buscando.";}else{tilePick=i;help.textContent="No coinciden. Busca otra ficha igual.";}renderBoard();if(!ended&&tiles.every(t=>t.removed)){ended=true;pauseClock();status.textContent="¡Ganaste!";help.textContent="Has despejado todas las fichas.";}else if(!ended&&!findPair()){status.textContent="Sin pares disponibles";help.textContent="¡Usa 🔁 Barajar para reorganizar las fichas y seguir jugando!";}updatePowerUI();saveGameState();}
 function shuffleTiles(){if(game!=="pixxy"||ended||!spendPower("shuffle"))return;const remaining=tiles.filter(t=>!t.removed),values=remaining.map(t=>t.value);for(let i=values.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[values[i],values[j]]=[values[j],values[i]];}let n=0;tiles.forEach(t=>{if(!t.removed)t.value=values[n++];});tilePick=null;hinted=[];ended=false;help.textContent="¡Fichas barajadas! Busca nuevos pares.";renderBoard();saveGameState();}
 function hintPair(){if(game!=="pixxy"||ended)return;const pair=findPair();if(!pair){help.textContent="No hay pares libres. Prueba Barajar.";return;}if(!spendPower("hint"))return;hinted=pair;help.textContent="¡Aquí tienes un par igual disponible!";renderBoard();setTimeout(()=>{hinted=[];if(game==="pixxy")renderBoard();},2500);saveGameState();}
 function undoMove(){if(game!=="pixxy"||ended||!history.length||!spendPower("undo"))return;const last=history.pop();tiles=last.tiles.map(t=>({...t}));score=last.score;tilePick=null;hinted=[];ended=false;help.textContent="Se devolvió el último par retirado.";renderBoard();saveGameState();}
 document.querySelectorAll("[data-launch-mini-game]").forEach(b=>b.addEventListener("click",async()=>{const client=window.universeSupabase;const {data}=client?await client.auth.getSession():{data:{session:null}};if(!data?.session?.user){document.getElementById("accessDialog")?.showModal();return;}game=b.dataset.launchMiniGame;title.textContent=game==="chess"?"Jaque Matte":"Pinkie Star";$("miniGameSubtitle").textContent=game==="chess"?"Tú contra el Bot · Gratis para Astronautas":"Mahjong Solitaire · Gratis para Astronautas";controls.hidden=game!=="pixxy";dialog.showModal();chooseMode("easy");await startGame(true,true);}));
 document.querySelectorAll("[data-mini-mode]").forEach(b=>b.addEventListener("click",()=>{chooseMode(b.dataset.miniMode);if(mode!=="custom")startGame(true,false);else{help.textContent="Indica los minutos y pulsa Comenzar. El reloj empezará al cargar el tablero.";}}));
 $("miniGameStartCustom").addEventListener("click",()=>{const n=Math.max(1,Math.min(180,Number($("miniGameMinutes").value)||10));$("miniGameMinutes").value=n;startGame(false,false).then(()=>{if(!ended&&(chess||game==="pixxy"))startClock(n*60);saveGameState();});});
 $("miniGameRestart").addEventListener("click",()=>startGame(true,false));
 $("miniGameHint").addEventListener("click",()=>{help.textContent=game==="chess"?"Protege a tu rey, desarrolla tus piezas y busca capturar piezas del Bot.":"Usa 🔦 Buscar pares para revelar un par disponible.";});
 document.querySelectorAll("[data-pixxy-action]").forEach(b=>b.addEventListener("click",()=>{if(b.dataset.pixxyAction==="shuffle")shuffleTiles();if(b.dataset.pixxyAction==="hint")hintPair();if(b.dataset.pixxyAction==="undo")undoMove();}));
 $("miniGameClose").addEventListener("click",()=>{saveGameState();pauseClock();saveGameState();dialog.close();});dialog.addEventListener("click",e=>{if(e.target===dialog){saveGameState();pauseClock();saveGameState();dialog.close();}});
 dialog.addEventListener("close",()=>{pauseClock();if(powerTicker){clearInterval(powerTicker);powerTicker=null;}});
})();