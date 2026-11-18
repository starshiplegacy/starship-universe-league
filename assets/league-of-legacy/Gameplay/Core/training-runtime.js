import * as THREE from "three";
import { PlayerController } from "../Player/player-controller.js";
import { ThirdPersonCamera } from "../Camera/third-person-camera.js";

const host = document.getElementById("game");
const stateLabel = document.getElementById("state");
const loadStatus = document.getElementById("load-status");
const startOverlay = document.getElementById("start");
const beginButton = document.getElementById("begin");
const pauseButton = document.getElementById("pause");
const exitButton = document.getElementById("exit");
const messageLabel = document.getElementById("message");
const attackEffects = [];

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x91a9bd);
scene.fog = new THREE.Fog(0x91a9bd, 45, 115);
const camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, 0.1, 250);
const renderer = new THREE.WebGLRenderer({ antialias:true, powerPreference:"high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
host.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xe6f2ff, 0x39434a, 2.1));
const sun = new THREE.DirectionalLight(0xffe4bd, 2.5);
sun.position.set(-18, 35, 12);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -35; sun.shadow.camera.right = 35;
sun.shadow.camera.top = 35; sun.shadow.camera.bottom = -35;
scene.add(sun);

function material(color, roughness=0.9) {
  return new THREE.MeshStandardMaterial({color, roughness});
}
function box(name, x, y, z, sx, sy, sz, color) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz), material(color));
  mesh.name = name;
  mesh.position.set(x,y,z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

// Original greybox arena: it does not load the unverified Training GLB.
const floor = new THREE.Mesh(new THREE.PlaneGeometry(60,60), material(0x52665c));
floor.rotation.x = -Math.PI/2;
floor.receiveShadow = true;
scene.add(floor);
const grid = new THREE.GridHelper(60, 30, 0xd2bd8b, 0x77877d);
grid.position.y = 0.012;
scene.add(grid);
const wallMaterial = 0x344b4d;
box("north-wall",0,2,-30,60,4,1,wallMaterial);
box("south-wall",0,2,30,60,4,1,wallMaterial);
box("west-wall",-30,2,0,1,4,60,wallMaterial);
box("east-wall",30,2,0,1,4,60,wallMaterial);

// Simple obstacle lane and practice targets.
box("low-platform",-7,0.45,-5,5,0.9,3,0x8b795d);
box("step-one",1,0.25,-8,3,0.5,3,0x8b795d);
box("step-two",5,0.55,-8,3,1.1,3,0x8b795d);
for (let i=0;i<3;i++) {
  const target = new THREE.Mesh(new THREE.CylinderGeometry(0.65,0.65,2.4,16), material([0xb68c54,0x9e6255,0x668b9d][i]));
  target.position.set(-9+i*9,1.2,-17);
  target.castShadow = true;
  scene.add(target);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.7,16,12), material(0xd8c49a));
  cap.position.set(-9+i*9,2.5,-17);
  cap.castShadow = true;
  scene.add(cap);
}
const spawnMarker = new THREE.Mesh(new THREE.RingGeometry(0.8,1.05,48), new THREE.MeshBasicMaterial({color:0xe3c98d,side:THREE.DoubleSide}));
spawnMarker.rotation.x = -Math.PI/2;
spawnMarker.position.set(0,0.025,8);
scene.add(spawnMarker);

const player = new PlayerController(scene);
const followCamera = new ThirdPersonCamera(camera, renderer.domElement, player.root);
let paused = false;
let loaded = false;
let lastTime = performance.now();

function setPaused(value) {
  paused = value;
  pauseButton.textContent = paused ? "CONTINUAR" : "PAUSAR";
  stateLabel.textContent = paused ? "Pausado" : "En entrenamiento";
  if (paused && document.pointerLockElement) document.exitPointerLock();
}
pauseButton.addEventListener("click",()=>setPaused(!paused));
exitButton.addEventListener("click",()=>{ location.href = "../../../game-modes.html"; });
beginButton.addEventListener("click",async()=>{
  if (!loaded) return;
  startOverlay.hidden = true;
  setPaused(false);
  await followCamera.lock();
});
function triggerAttack(kind) {
  if (!loaded || paused || !startOverlay.hidden) return;
  const settings = {
    passive: { label:"Ataque pasivo · Q", color:0x83d9d0, radius:0.85, duration:0.48, forward:0.7 },
    hybrid: { label:"Ataque pasivo-agresivo · W", color:0x9b8bdf, radius:1.45, duration:0.58, forward:1.15 },
    aggressive: { label:"Ataque agresivo · E", color:0xff9b63, radius:2.15, duration:0.68, forward:1.8 },
    tiny: { label:"Ataque diminuto · H", color:0xf6e6a5, radius:0.42, duration:0.22, forward:0.55 }
  };
  const config = settings[kind];
  if (!config) return;
  messageLabel.textContent = config.label + " · efecto visual de prueba";
  const direction = new THREE.Vector3(-Math.sin(followCamera.yaw),0,-Math.cos(followCamera.yaw));
  const position = player.root.position.clone().addScaledVector(direction,config.forward);
  position.y += 1.05;
  const geometry = new THREE.SphereGeometry(config.radius,20,14);
  const material = new THREE.MeshBasicMaterial({color:config.color,transparent:true,opacity:0.58,wireframe:true,depthWrite:false});
  const effect = new THREE.Mesh(geometry,material);
  effect.position.copy(position);
  scene.add(effect);
  attackEffects.push({mesh:effect,material,duration:config.duration,elapsed:0});
}
window.addEventListener("keydown",event=>{
  const key=event.key.toLowerCase();
  if (key==="r") player.reset();
  if (key==="q" && !event.repeat) triggerAttack("passive");
  if (key==="w" && !event.repeat) triggerAttack("hybrid");
  if (key==="e" && !event.repeat) triggerAttack("aggressive");
  if (key==="h" && !event.repeat) triggerAttack("tiny");
  if (key==="escape" && !startOverlay.hidden) return;
  if (key==="escape" && loaded) setPaused(true);
});
document.querySelectorAll("[data-move]").forEach(button=>{
  const key=button.dataset.move;
  const down=event=>{event.preventDefault();player.setTouchKey(key,true)};
  const up=event=>{event.preventDefault();player.setTouchKey(key,false)};
  button.addEventListener("pointerdown",down);
  button.addEventListener("pointerup",up);
  button.addEventListener("pointerleave",up);
  button.addEventListener("pointercancel",up);
});

try {
  await player.load();
  loaded = true;
  loadStatus.textContent = "Charlotte está lista. El escenario es una arena de prueba original; el mapa Training existente sigue pendiente de revisión de licencia.";
  beginButton.disabled = false;
  stateLabel.textContent = "Lista para entrenar";
} catch (error) {
  console.error(error);
  loadStatus.textContent = "No se pudo cargar Charlotte: " + (error?.message || "error desconocido") + ". Comprueba que el archivo GLB esté disponible y que la página se sirva por HTTP/HTTPS.";
  beginButton.disabled = true;
  stateLabel.textContent = "Error al cargar el personaje";
}
beginButton.disabled = !loaded;

function animate(now) {
  requestAnimationFrame(animate);
  const delta = Math.min((now-lastTime)/1000,0.05);
  lastTime = now;
  if (!paused && loaded && startOverlay.hidden) player.update(delta,followCamera.yaw);
  for (let i=attackEffects.length-1;i>=0;i--) {
    const effect=attackEffects[i];
    effect.elapsed+=delta;
    const progress=Math.min(effect.elapsed/effect.duration,1);
    effect.mesh.scale.setScalar(0.55+progress*1.1);
    effect.material.opacity=0.58*(1-progress);
    if(progress>=1){
      scene.remove(effect.mesh);
      effect.mesh.geometry.dispose();
      effect.material.dispose();
      attackEffects.splice(i,1);
    }
  }
  followCamera.update(delta);
  renderer.render(scene,camera);
}
requestAnimationFrame(animate);

window.addEventListener("resize",()=>{
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});
