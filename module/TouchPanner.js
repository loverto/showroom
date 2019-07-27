import Config from 'module/Config';
import 'module/Util';
var speed = (0.25);

function TouchPanner(size) {
  var target = void 0 !== size ? size : window;
  this.speed = window.innerHeight > window.innerWidth ? speed : 2 * speed;
  window.addEventListener('resize', function () {
    this.speed = window.innerHeight > window.innerWidth ? speed : 2 * speed;
  }.bind(this));
  target.addEventListener('touchstart', this.onTouchStart_.bind(this));
  target.addEventListener('touchmove', this.onTouchMove_.bind(this), { passive: false });
  target.addEventListener('touchend', this.onTouchEnd_.bind(this));
  this.isTouching = false;
  this.rotateStart = new THREE.Vector2();
  this.rotateEnd = new THREE.Vector2();
  this.rotateDelta = new THREE.Vector2();
  this._theta = 0;
  this._phi = 0;
  this.theta = 0;
  this.phi = 0;
  this.orientation = new THREE.Quaternion();
  this.enableDamping = true;
  this.dampingFactor = 0.25;
  this._enabled = true;
  Object.defineProperty(this, 'enabled', {
    get: function () {
      return this._enabled;
    },
    set: function (v) {
      this._enabled = v;
    }
  });
}
function normalize_angle_rad(a, b, s) {
  return (1 - s) * a + s * b;
}

TouchPanner.prototype.getOrientation = function () {
  var height = Config.ENABLE_GYRO ? 'XYZ' : 'YXZ';
  var e = new THREE.Euler(0, 0, 0, height);
  return function () {
    var i = Config.ENABLE_GYRO ? 0 : this.phi;
    return e.set(i, this.theta, 0), this.orientation.setFromEuler(e), this.orientation;
  };
}();
TouchPanner.prototype.resetSensor = function () {
  this._theta = 0;
  this._phi = 0;
  this.theta = 0;
  this.phi = 0;
};
TouchPanner.prototype.onTouchStart_ = function (event) {
  if (1 == event.touches.length && this._enabled) {
    this.rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
    this.isTouching = true;
  }
};
TouchPanner.prototype.onTouchMove_ = function (event) {
  if (this.isTouching && this._enabled) {
    this.rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
    this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);
    this.rotateStart.copy(this.rotateEnd);
    var e = document.body;
    this._theta += 2 * Math.PI * this.rotateDelta.x / e.clientWidth * this.speed;
    this._phi += 2 * Math.PI * this.rotateDelta.y / e.clientHeight * this.speed;
    this._phi = THREE.Math.clamp(this._phi, -Math.PI / 2, Math.PI / 2);
    event.preventDefault();
  }
};
TouchPanner.prototype.setRotationAngle = function (angle) {
  this.theta = this._theta = angle;
};
TouchPanner.prototype.onTouchEnd_ = function (e) {
  this.isTouching = false;
};
TouchPanner.prototype.setState = function (pointId, value) {
  this.phi = this._phi = pointId;
  this.theta = this._theta = value;
};
TouchPanner.prototype.update = function () {
  this.phi = normalize_angle_rad(this.phi, this._phi, this.dampingFactor);
  this.theta = normalize_angle_rad(this.theta, this._theta, this.dampingFactor);
};
export default TouchPanner;
