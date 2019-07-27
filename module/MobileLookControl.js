import TouchPanner from 'module/TouchPanner';

function MobileLookControl(name, options) {
  this.camera = name;
  this.touchPanner = new TouchPanner(options);
  this._enabled = true;
  Object.defineProperty(this, 'enabled', {
    get: function () {
      return this._enabled;
    },
    set: function (v) {
      this.touchPanner.enabled = v;
      this._enabled = v;
    }
  });
}

MobileLookControl.prototype = {};
MobileLookControl.prototype.update = function () {
  this.touchPanner.update();
  this.camera.quaternion.copy(this.touchPanner.getOrientation());
};
MobileLookControl.prototype.setOrientationFromCamera = function () {
  var euler = new THREE.Euler(0, 0, 0, 'YXZ');
  return function () {
    euler.setFromQuaternion(this.camera.quaternion);
    this.touchPanner.setState(euler.x, euler.y);
  };
}();
MobileLookControl.prototype.setRotationAngle = function (angle) {
  this.touchPanner.setRotationAngle(angle);
};
MobileLookControl.prototype.canMove = function () {
  return true;
};
export default MobileLookControl;
