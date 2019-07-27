import * as THREE  from 'three';
import 'three/examples/js/controls/OrbitControls';
import timers from 'module/timers';

function OrbitControl(val, options) {
  THREE.OrbitControls.call(this, val, options.domElement);
  this.autoSpeed = options.autoSpeed;
  this.autoDelay = options.autoDelay;
  this.autoOrbitTimer = timers.createTimer({
    duration: this.autoDelay,
    onEnd: function () {
      this.startAutoOrbit();
    }.bind(this)
  });
}

OrbitControl.inherit(THREE.OrbitControls, {
  setTarget: function (e) {
    this.constraint.target.copy(e);
  },
  getTarget: function (simulcast) {
    return this.constraint.target;
  },
  startAutoOrbit: function (timeToFadeIn) {
    var tryParseQRCode = function () {
      this.autoRotateSpeed = this.autoSpeed;
      this.autoRotate = true;
      this.startTimeout = null;
    }.bind(this);
    this.stopAutoOrbit();
    if (undefined !== timeToFadeIn) {
      this.startTimeout = setTimeout(tryParseQRCode, timeToFadeIn);
    } else {
      tryParseQRCode();
    }
  },
  stopAutoOrbit: function () {
    this.autoRotate = false;
    this.autoOrbitTimer.reset();
  },
  onMouseMove: function () {
    this.stopAutoOrbit();
    this.autoOrbitTimer.start();
    if (this.startTimeout) {
      clearTimeout(this.startTimeout);
    }
  }
});
export default OrbitControl;
