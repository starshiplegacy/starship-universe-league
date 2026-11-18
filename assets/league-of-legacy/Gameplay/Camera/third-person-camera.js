import * as THREE from "three";

export class ThirdPersonCamera {
  constructor(camera, canvas, target) {
    this.camera = camera;
    this.canvas = canvas;
    this.target = target;
    this.yaw = 0;
    this.pitch = 0.22;
    this.distance = 7.5;
    this.minDistance = 3.5;
    this.maxDistance = 12;
    this.dragging = false;
    this.lookTarget = new THREE.Vector3();
    this.desiredPosition = new THREE.Vector3();
    this._onMouseMove = event => {
      if (document.pointerLockElement !== this.canvas) return;
      this.yaw -= event.movementX * 0.0025;
      this.pitch = THREE.MathUtils.clamp(this.pitch - event.movementY * 0.0018, -0.15, 0.8);
    };
    this._onWheel = event => {
      this.distance = THREE.MathUtils.clamp(this.distance + Math.sign(event.deltaY) * 0.7, this.minDistance, this.maxDistance);
    };
    this._onContext = event => event.preventDefault();
    window.addEventListener("mousemove", this._onMouseMove);
    this.canvas.addEventListener("wheel", this._onWheel, {passive:true});
    this.canvas.addEventListener("contextmenu", this._onContext);
  }

  async lock() {
    if (this.canvas.requestPointerLock) {
      try { await this.canvas.requestPointerLock(); } catch {}
    }
  }

  update(delta) {
    const p = this.target.position;
    this.lookTarget.set(p.x, p.y + 1.15, p.z);
    const horizontal = Math.cos(this.pitch) * this.distance;
    this.desiredPosition.set(
      p.x + Math.sin(this.yaw) * horizontal,
      p.y + 1.15 + Math.sin(this.pitch) * this.distance,
      p.z + Math.cos(this.yaw) * horizontal
    );
    this.camera.position.lerp(this.desiredPosition, 1 - Math.exp(-8 * delta));
    this.camera.lookAt(this.lookTarget);
  }

  dispose() {
    window.removeEventListener("mousemove", this._onMouseMove);
    this.canvas.removeEventListener("wheel", this._onWheel);
    this.canvas.removeEventListener("contextmenu", this._onContext);
  }
}