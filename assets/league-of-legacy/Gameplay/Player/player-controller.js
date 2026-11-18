import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const MODEL_URL = "../../characters/Charlotte.glb";
const WALK_SPEED = 6.5;
const RUN_SPEED = 10.5;
const JUMP_SPEED = 7.2;
const GRAVITY = 22;
const ARENA_LIMIT = 27;

export class PlayerController {
  constructor(scene) {
    this.scene = scene;
    this.root = new THREE.Group();
    this.root.position.set(0, 0, 8);
    this.scene.add(this.root);
    this.model = null;
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
      if (["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"," ","shift","r"].includes(key)) event.preventDefault();
      this.keys.add(key);
    };
    this._onKeyUp = event => this.keys.delete(event.key.toLowerCase());
    window.addEventListener("keydown", this._onKeyDown);
    window.addEventListener("keyup", this._onKeyUp);
  }

  async load() {
    const gltf = await new GLTFLoader().loadAsync(MODEL_URL);
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
    this.ready = true;
    return gltf.animations || [];
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
    const forwardInput = Number(this.isDown("w","arrowup","forward")) - Number(this.isDown("s","arrowdown","back"));
    const sideInput = Number(this.isDown("d","arrowright","right")) - Number(this.isDown("a","arrowleft","left"));
    this.forward.set(-Math.sin(cameraYaw), 0, -Math.cos(cameraYaw));
    this.right.set(Math.cos(cameraYaw), 0, -Math.sin(cameraYaw));
    this.move.set(0,0,0).addScaledVector(this.forward, forwardInput).addScaledVector(this.right, sideInput);
    if (this.move.lengthSq() > 1) this.move.normalize();
    const speed = this.isDown("shift") ? RUN_SPEED : WALK_SPEED;
    this.root.position.addScaledVector(this.move, speed * delta);
    this.root.position.x = THREE.MathUtils.clamp(this.root.position.x, -ARENA_LIMIT, ARENA_LIMIT);
    this.root.position.z = THREE.MathUtils.clamp(this.root.position.z, -ARENA_LIMIT, ARENA_LIMIT);

    if (this.move.lengthSq() > 0.0001) {
      const target = Math.atan2(this.move.x, this.move.z);
      this.heading = target;
      this.root.rotation.y = THREE.MathUtils.damp(this.root.rotation.y, target, 12, delta);
    }
    if (this.isDown(" ","jump") && this.grounded) {
      this.velocityY = JUMP_SPEED;
      this.grounded = false;
    }
    this.velocityY -= GRAVITY * delta;
    this.root.position.y += this.velocityY * delta;
    if (this.root.position.y <= 0) {
      this.root.position.y = 0;
      this.velocityY = 0;
      this.grounded = true;
    }
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