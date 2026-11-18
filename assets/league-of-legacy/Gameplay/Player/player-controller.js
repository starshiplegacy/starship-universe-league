import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const MODEL_URL = "../characters/Charlotte.glb";
const WALK_SPEED = 6.5;
const RUN_SPEED = 10.5;
const JUMP_SPEED = 7.2;
const GRAVITY = 22;
const ARENA_LIMIT = 27;
const TURN_SPEED = 2.4;

export class PlayerController {
  constructor(scene) {
    this.scene = scene;
    this.root = new THREE.Group();
    this.root.position.set(0, 0, 8);
    this.scene.add(this.root);
    this.model = null;
    this.mixer = null;
    this.animationActions = new Map();
    this.activeAction = null;
    this.locomotionAction = null;
    this.animationClips = {
      idle: "idle1_base1",
      walk: "Run_Haste",
      run: "Run",
      jump: "Spell2",
      passive: "Attack1",
      hybrid: "Channel",
      aggressive: "Idle_Spell4_loop",
      tiny: "Spell2",
      damage: "Death",
      victory: "Dance_Loop"
    };
    this.velocityY = 0;
    this.grounded = true;
    this.heading = 0;
    this.ready = false;
    this.keys = new Set();
    this.touchKeys = new Set();
    this.forward = new THREE.Vector3();
    this.right = new THREE.Vector3();
    this.move = new THREE.Vector3();
    this._onKeyDown = event => {
      const key = event.key.toLowerCase();
      if (["arrowup","arrowdown","arrowleft","arrowright"," ","shift","r","q","w","e","h","z","x","1","3",",","."].includes(key)) event.preventDefault();
      this.keys.add(key);
    };
    this._onKeyUp = event => this.keys.delete(event.key.toLowerCase());
    window.addEventListener("keydown", this._onKeyDown);
    window.addEventListener("keyup", this._onKeyUp);
  }

  async load() {
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    const gltf = await loader.loadAsync(MODEL_URL);
    const model = gltf.scene;
    const initialBounds = new THREE.Box3().setFromObject(model);
    const size = initialBounds.getSize(new THREE.Vector3());
    if (!Number.isFinite(size.y) || size.y < 0.001) throw new Error("El modelo de Charlotte no tiene una altura válida.");
    model.scale.setScalar(1.8 / size.y);
    const bounds = new THREE.Box3().setFromObject(model);
    const center = bounds.getCenter(new THREE.Vector3());
    const min = bounds.min;
    model.position.set(-center.x, -min.y, -center.z);
    model.traverse(node => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    this.root.add(model);
    this.model = model;
    this.mixer = new THREE.AnimationMixer(model);
    for (const clip of (gltf.animations || [])) {
      this.animationActions.set(clip.name, this.mixer.clipAction(clip));
    }
    this.mixer.addEventListener("finished", event => {
      if (this.activeAction === event.action) this.activeAction = null;
    });
    this.ready = true;
    return gltf.animations || [];
  }

  playAnimation(name, { loop = false, fade = 0.16 } = {}) {
    const action = this.animationActions.get(name);
    if (!action) {
      console.warn(`Animación no encontrada en Charlotte.glb: ${name}`);
      return false;
    }
    if (this.activeAction && this.activeAction !== action) {
      this.activeAction.fadeOut(fade);
    }
    if (this.locomotionAction && this.locomotionAction !== action) {
      this.locomotionAction.fadeOut(fade);
      this.locomotionAction = null;
    }
    action.reset();
    action.enabled = true;
    action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
    action.clampWhenFinished = !loop;
    action.fadeIn(fade).play();
    this.activeAction = action;
    return true;
  }

  updateLocomotion(name) {
    if (this.activeAction) return;
    const clipName = this.animationClips[name];
    const next = this.animationActions.get(clipName);
    if (!next || this.locomotionAction === next) return;
    if (this.locomotionAction) this.locomotionAction.fadeOut(0.18);
    next.reset().setLoop(THREE.LoopRepeat, Infinity);
    next.fadeIn(0.18).play();
    this.locomotionAction = next;
  }

  playDamage() {
    return this.playAnimation(this.animationClips.damage);
  }

  playVictory() {
    return this.playAnimation(this.animationClips.victory, { loop: true });
  }

  setTouchKey(key, pressed) {
    if (pressed) this.touchKeys.add(key);
    else this.touchKeys.delete(key);
  }

  isDown(...keys) {
    return keys.some(key => this.keys.has(key) || this.touchKeys.has(key));
  }

  update(delta, cameraYaw) {
    if (!this.ready) return;
    const forwardInput = Number(this.isDown("arrowup","forward")) - Number(this.isDown("arrowdown","back"));
    const sideInput = Number(this.isDown("arrowright","right")) - Number(this.isDown("arrowleft","left"));
    this.forward.set(-Math.sin(cameraYaw), 0, -Math.cos(cameraYaw));
    this.right.set(Math.cos(cameraYaw), 0, -Math.sin(cameraYaw));
    this.move.set(0,0,0).addScaledVector(this.forward, forwardInput).addScaledVector(this.right, sideInput);
    if (this.move.lengthSq() > 1) this.move.normalize();
    const speed = this.isDown("shift") ? RUN_SPEED : WALK_SPEED;
    this.root.position.addScaledVector(this.move, speed * delta);
    this.root.position.x = THREE.MathUtils.clamp(this.root.position.x, -ARENA_LIMIT, ARENA_LIMIT);
    this.root.position.z = THREE.MathUtils.clamp(this.root.position.z, -ARENA_LIMIT, ARENA_LIMIT);

    const turnInput = Number(this.isDown(".")) - Number(this.isDown(","));
    if (turnInput !== 0) {
      this.root.rotation.y += turnInput * TURN_SPEED * delta;
      this.heading = this.root.rotation.y;
    } else if (this.move.lengthSq() > 0.0001) {
      const target = Math.atan2(this.move.x, this.move.z);
      this.heading = target;
      this.root.rotation.y = THREE.MathUtils.damp(this.root.rotation.y, target, 12, delta);
    }
    if (this.isDown(" ","jump") && this.grounded) {
      this.velocityY = JUMP_SPEED;
      this.grounded = false;
      this.playAnimation(this.animationClips.jump);
    }
    this.velocityY -= GRAVITY * delta;
    this.root.position.y += this.velocityY * delta;
    if (this.root.position.y <= 0) {
      this.root.position.y = 0;
      this.velocityY = 0;
      this.grounded = true;
    }
    if (!this.activeAction) {
      const moving = this.move.lengthSq() > 0.0001;
      this.updateLocomotion(moving ? (this.isDown("shift") ? "run" : "walk") : "idle");
    }
    this.mixer?.update(delta);
  }

  reset() {
    this.root.position.set(0,0,8);
    this.root.rotation.set(0,0,0);
    this.velocityY = 0;
    this.grounded = true;
  }

  dispose() {
    window.removeEventListener("keydown", this._onKeyDown);
    window.removeEventListener("keyup", this._onKeyUp);
    this.scene.remove(this.root);
  }
}