import * as THREE  from 'three';

/**
 * 查看控制
 * @param camera
 * @param container
 * @constructor
 */
function LookControl(camera, container) {
  var module = document.getElementById('main_canvas');
  module.addEventListener('mousemove', this.onMouseMove.bind(this));
  module.addEventListener('mousedown', this.onMouseDown.bind(this));
  module.addEventListener('mouseup', this.onMouseUp.bind(this));
  // 设定相机
  this.camera = camera;
  this.phi = 0;
  this.theta = 0;
  this.rotateStart = new THREE.Vector2();
  this.rotateEnd = new THREE.Vector2();
  this.rotateDelta = new THREE.Vector2();
  this.isDragging = false;
  this.isRotating = false;
  this.enableDamping = false;
  this.dampingFactor = 0.25;
  this.$container = container;
}
function positionWithE(e) {
  var t = e.clientX == x && e.clientY == y;
  return x = e.clientX, y = e.clientY, t;
}
var x;
var y;
LookControl.prototype = {
  update: function () {
    // 欧拉
    var euler = new THREE.Euler(0, 0, 0, 'YXZ');
    // 四元
    var quaternion = new THREE.Quaternion();
    return function () {
      euler.set(this.phi, this.theta, 0)
      quaternion.setFromEuler(euler)
      if ( this.enableDamping){
            this.camera.quaternion.slerp(quaternion, this.dampingFactor)
      } else {
         this.camera.quaternion.copy(quaternion)
      }
      return this;
    };
  }(),
  setOrientationFromCamera: function () {
    var euler = new THREE.Euler(0, 0, 0, 'YXZ');
    return function () {
      euler.setFromQuaternion(this.camera.quaternion)
      this.phi = euler.x
      this.theta = euler.y
      return  this;
    };
  }(),
  reset: function () {
    this.phi = 0
    this.theta = 0
    this.update()
    return this;
  },
  onMouseDown: function (e) {
    this.rotateStart.set(e.clientX, e.clientY);
    this.isMouseDown = true;
    x = e.clientX;
    y = e.clientY;
  },
  onMouseMove: function (e) {
    if (!positionWithE(e) && (this.isMouseDown || this.isPointerLocked()) && this.enabled) {
      if (this.isRotating = true, this.$container.hasClass('rotating') || this.$container.addClass('rotating'), this.isPointerLocked()) {
        var movementX = e.movementX || e.mozMovementX || 0;
        var movementY = e.movementY || e.mozMovementY || 0;
        this.rotateEnd.set(this.rotateStart.x - movementX, this.rotateStart.y - movementY);
      } else {
        this.rotateEnd.set(e.clientX, e.clientY);
      }
      this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);
      this.rotateStart.copy(this.rotateEnd);
      this.phi += 2 * Math.PI * this.rotateDelta.y / screen.height * 0.3;
      this.theta += 2 * Math.PI * this.rotateDelta.x / screen.width * 0.5;
      this.phi = THREE.Math.clamp(this.phi, -Math.PI / 2, Math.PI / 2);
    }
  },
  onMouseUp: function (event) {
    this.isMouseDown = false;
    this.isRotating = false;
    this.$container.removeClass('rotating');
  },
  isPointerLocked: function () {
    return undefined !== (document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement);
  }
};
export default LookControl;
