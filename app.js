const translations = {
  es: {
    navAbout:"Quiénes Somos",navGames:"Nuestros Juegos",navCareers:"Trabaja Con Nosotros",navNews:"News",login:"Acceder",
    heroEyebrow:"UN UNIVERSO. INFINITAS FORMAS DE JUGAR.",heroTitle:'Tu próximo mundo<br><em>empieza aquí.</em>',heroText:"Descubre experiencias, conoce nuevas historias y encuentra tu próxima aventura en STARSHIP UNIVERSE LEAGUE.",exploreGames:"Explorar juegos",discoverMore:"Conócenos",heroFoot:"CREADO PARA QUIENES SIEMPRE QUIEREN JUGAR UN POCO MÁS.",scroll:"DESLIZA PARA DESCUBRIR",
    aboutKicker:"EL UNIVERSO",aboutTitle:'Más que juegos.<br><em>Un universo por descubrir.</em>',aboutText:"Somos UNIVERSE LEAGUE, un espacio creativo dedicado a imaginar, desarrollar y compartir experiencias interactivas. Cada juego abre una puerta a algo diferente.",
    gamesKicker:"ENCUENTRA TU MUNDO",gamesTitle:"Nuestros juegos",gamesNote:"DOS UNIVERSOS EN DESARROLLO",lifeCategory:"SIMULACIÓN DE VIDA",fightCategory:"PELEA",inDevelopment:"En desarrollo",
    joinKicker:"CREA CON NOSOTROS",joinTitle:'Las grandes ideas<br><em>necesitan un equipo.</em>',joinText:"¿Te apasionan los videojuegos, el diseño, la tecnología o contar historias? Hay un lugar para tu talento.",joinButton:"Trabaja con nosotros",
    updatesKicker:"MANTENTE AL DÍA",newsTitle:"Qué hay de nuevo",newsNote:"PRÓXIMAMENTE, MÁS NOTICIAS DEL UNIVERSO.",newsEmpty:"Las próximas novedades aparecerán aquí.",searchLabel:"¿Qué estás buscando?"
  },
  en: {
    navAbout:"About Us",navGames:"Our Games",navCareers:"Careers",navNews:"News",login:"Sign in",
    heroEyebrow:"ONE UNIVERSE. INFINITE WAYS TO PLAY.",heroTitle:'Your next world<br><em>starts here.</em>',heroText:"Discover new experiences, meet new stories and find your next adventure at STARSHIP UNIVERSE LEAGUE.",exploreGames:"Explore games",discoverMore:"Discover us",heroFoot:"MADE FOR THOSE WHO ALWAYS WANT TO PLAY A LITTLE MORE.",scroll:"SCROLL TO EXPLORE",
    aboutKicker:"THE UNIVERSE",aboutTitle:'More than games.<br><em>A universe to discover.</em>',aboutText:"We are UNIVERSE LEAGUE, a creative space dedicated to imagining, developing and sharing interactive experiences. Every game opens a door to something different.",
    gamesKicker:"FIND YOUR WORLD",gamesTitle:"Our games",gamesNote:"TWO WORLDS IN DEVELOPMENT",lifeCategory:"LIFE SIMULATION",fightCategory:"FIGHTING",inDevelopment:"In development",
    joinKicker:"CREATE WITH US",joinTitle:'Great ideas<br><em>need a team.</em>',joinText:"Are you passionate about games, design, technology or storytelling? There is a place for your talent.",joinButton:"Work with us",
    updatesKicker:"STAY UP TO DATE",newsTitle:"What's new",newsNote:"MORE NEWS FROM THE UNIVERSE COMING SOON.",newsEmpty:"The latest updates will appear here.",searchLabel:"What are you looking for?"
  },
  ko: {
    navAbout:"회사 소개",navGames:"게임",navCareers:"채용 정보",navNews:"뉴스",login:"로그인",
    heroEyebrow:"하나의 우주. 무한한 플레이.",heroTitle:'새로운 세계가<br><em>여기서 시작돼요.</em>',heroText:"STARSHIP UNIVERSE LEAGUE에서 새로운 경험과 이야기, 다음 모험을 만나보세요.",exploreGames:"게임 둘러보기",discoverMore:"더 알아보기",heroFoot:"언제나 조금 더 플레이하고 싶은 사람들을 위해.",scroll:"스크롤하여 둘러보기",
    aboutKicker:"우리의 우주",aboutTitle:'게임 그 이상.<br><em>발견할 세계.</em>',aboutText:"UNIVERSE LEAGUE는 인터랙티브 경험을 상상하고 개발하며 공유하는 크리에이티브 공간입니다. 모든 게임은 새로운 세계로 향하는 문입니다.",
    gamesKicker:"나만의 세계 찾기",gamesTitle:"우리의 게임",gamesNote:"두 개의 세계 개발 중",lifeCategory:"라이프 시뮬레이션",fightCategory:"격투",inDevelopment:"개발 중",
    joinKicker:"함께 만들어요",joinTitle:'멋진 아이디어에는<br><em>팀이 필요해요.</em>',joinText:"게임, 디자인, 기술 또는 스토리텔링을 좋아하시나요? 당신의 재능을 펼칠 자리가 있습니다.",joinButton:"함께하기",
    updatesKicker:"새로운 소식",newsTitle:"새로운 소식",newsNote:"더 많은 소식이 곧 공개됩니다.",newsEmpty:"새로운 소식이 여기에 업데이트됩니다.",searchLabel:"무엇을 찾고 있나요?"
  }
};
const root = document.documentElement;
const themeSelect = document.getElementById("themeSelect");
const languageSelect = document.getElementById("languageSelect");
const savedTheme = localStorage.getItem("universe-theme");
const savedLanguage = localStorage.getItem("universe-language");
if (savedTheme && ["light","dark","green","nature","neon","galaxy","autumn","winter","spring","summer"].includes(savedTheme)) root.dataset.theme = savedTheme;
if (savedLanguage && translations[savedLanguage]) languageSelect.value = savedLanguage;
function applyLanguage(language){
  const dictionary = translations[language] || translations.es;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach(node => {
    const key = node.dataset.i18n;
    if (dictionary[key]) node.innerHTML = dictionary[key];
  });
  localStorage.setItem("universe-language", language);
}
applyLanguage(languageSelect.value);
languageSelect.addEventListener("change", event => applyLanguage(event.target.value));
const themeOptions = document.getElementById("themeOptions");
const themeToggle = document.getElementById("themeToggle");
const themeNames = {light:"Claro",dark:"Oscuro",green:"Verde",nature:"Naturaleza",neon:"Neon",galaxy:"Galaxy",autumn:"Otoño",winter:"Invierno",spring:"Primavera",summer:"Verano"};
function setTheme(theme){
  if (!Object.hasOwn(themeNames,theme)) return;
  root.dataset.theme = theme;
  localStorage.setItem("universe-theme",theme);
  document.querySelectorAll("[data-theme-choice]").forEach(button => {
    button.setAttribute("aria-pressed",String(button.dataset.themeChoice===theme));
  });
  themeToggle.querySelector(".current-theme").textContent = themeNames[theme];
  themeOptions.hidden = true;
  themeToggle.setAttribute("aria-expanded","false");
}
themeToggle.addEventListener("click",()=>{
  const opening = themeOptions.hidden;
  themeOptions.hidden = !opening;
  themeToggle.setAttribute("aria-expanded",String(opening));
});
themeOptions.addEventListener("click",event=>{
  const option = event.target.closest("[data-theme-choice]");
  if(option) setTheme(option.dataset.themeChoice);
});
setTheme(root.dataset.theme || "light");
document.addEventListener("click",event=>{
  if(!event.target.closest(".theme-picker")){themeOptions.hidden=true;themeToggle.setAttribute("aria-expanded","false");}
});
const menuToggle=document.getElementById("menuToggle"),mainNav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{
  const open=mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
});
mainNav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
const overlay=document.getElementById("searchOverlay"),searchInput=document.getElementById("siteSearch"),feedback=document.getElementById("searchFeedback");
function closeSearch(){overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true");}
document.getElementById("searchToggle").addEventListener("click",()=>{overlay.classList.add("open");overlay.setAttribute("aria-hidden","false");searchInput.focus();});
document.getElementById("searchClose").addEventListener("click",closeSearch);
overlay.addEventListener("click",event=>{if(event.target===overlay)closeSearch();});
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeSearch();});
function searchSite(){
 const query=searchInput.value.trim().toLocaleLowerCase();
 if(!query){feedback.textContent="Escribe algo para buscar.";return;}
 const targets=[...document.querySelectorAll("main h1,main h2,main h3,main p")];
 const match=targets.find(node=>node.textContent.toLocaleLowerCase().includes(query));
 if(match){closeSearch();match.scrollIntoView({behavior:"smooth",block:"center"});feedback.textContent="";}
 else feedback.textContent="No encontramos resultados. Intenta con otro término.";
}
document.getElementById("searchGo").addEventListener("click",searchSite);
searchInput.addEventListener("keydown",event=>{if(event.key==="Enter")searchSite();});
document.getElementById("year").textContent=new Date().getFullYear();