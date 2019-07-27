import * as THREE from 'three';

import Event from 'module/Event';
import VrControl from 'module/VrControl';
import LookControl from 'module/LookControl';
import MobileLookControl from 'module/MobileLookControl';
import OrbitControl from 'module/OrbitControl';
import Config from 'module/Config';

var ctor = THREE.PerspectiveCamera;

var VRPerspectiveCamera = function (options) {
  ctor.call(this);
  this.fov = 50;
  this.near = 0.01;
  this.far = 1500;
  this.updateProjectionMatrix();
  this.moving = false;
  this.rotating = false;
  if (options.vr) {
    this.vr = true;
    this.vrControls = new VrControl(this);
    this.mode = VRPerspectiveCamera.VR_MODE;
    this.moveTo(0, 0);
  } else {
    if (window.isMobile) {
      this.lookControls = new MobileLookControl(this, options.canvasElement);
    } else {
      this.lookControls = new LookControl(this, options.$container);
      if (Config.ENABLE_DAMPING) {
        this.lookControls.enableDamping = true;
        this.lookControls.dampingFactor = 0.25;
      }
    }
    this.orbitControls = new OrbitControl(this, {
      autoSpeed: Config.ENABLE_DAMPING ? 0.1 : 1,
      autoDelay: 3000,
      domElement: document.getElementById('main_canvas')
    });
    this.orbitControls.enableZoom = !!Config.ENABLE_ZOOM;
    this.orbitControls.enablePan = !!Config.ENABLE_PAN;
    this.orbitControls.enabled = false;
    this.orbitControls.maxPolarAngle = Math.PI / 2;
    if (Config.ENABLE_DAMPING) {
      this.orbitControls.enableDamping = true;
      this.orbitControls.dampingFactor = 0.065;
      this.orbitControls.rotateSpeed = 0.05;
    }
    this._target = new THREE.Object3D();
    this._target.position.z = -1;
    this.add(this._target);
    this.mode = VRPerspectiveCamera.LOOK_MODE;
  }
  if (options.states) {
    this.initStates(options.states);
    if (this.states.start) {
      this.position.copy(this.states.start[0].position);
      this.quaternion.copy(this.states.start[0].quaternion);
      if (!this.vr) {
        this.lookControls.setOrientationFromCamera();
      }
    } else {
      this.moveTo(-3.5, 3);
    }
  }
};
VRPerspectiveCamera.inherit(ctor, {
  initStates: function (init) {
    this.states = {};
    init.forEach(function (parsed) {
      var name = parsed.name.replace('_camera', '');
      if (this.states[name]) {
        this.states[name].push(parsed);
      } else {
        this.states[name] = [parsed];
      }
      if (parsed.children.length > 0) {
        parsed.target = new THREE.Vector3();
        parsed.children[0].getWorldPosition(parsed.target);
      }
    }, this);
  },
  setState: function (index) {
    if (!this.vr) {
      if (undefined === index) {
        return void console.warn('setCameraState() requires an argument');
      }
      if (!this.states.hasOwnProperty(index)) {
        return void console.error('Camera state was not found:', index);
      }
      this.setMode(VRPerspectiveCamera.ORBIT_MODE);
      var spotLight1 = _.min(this.states[index], function (event) {
        return this.position.distanceTo(event.position);
      }.bind(this));
      return this.isTransitioning = true, this.tweenOrbitTargetTo(spotLight1.target, 1000).onComplete(function () {
        this.isTransitioning = false;
        this.orbitControls.startAutoOrbit(1000);
      }.bind(this)), this.tweenPositionTo(spotLight1.position, 1000);
    }
  },
  setMode: function (exports) {
    var x = new THREE.Vector3();
    return function (s) {
      switch (s) {
      case VRPerspectiveCamera.ORBIT_MODE:
        this._target.getWorldPosition(x);
        this.orbitControls.setTarget(x);
        this.orbitControls.enabled = true;
        break;
      case VRPerspectiveCamera.LOOK_MODE:
        this.lookControls.setOrientationFromCamera();
        this.orbitControls.enabled = false;
        this.orbitControls.stopAutoOrbit();
        break;
      case VRPerspectiveCamera.VR_MODE:
        this.orbitControls.enabled = false;
      }
      this.mode = s;
    };
  }(),
  moveTo: function () {
    var canvas = new THREE.Vector3();
    return function (e, text, duration) {
      duration = duration || 0;
      canvas.set(e, this.vr ? VRPerspectiveCamera.DEFAULT_HEIGHT_VR : VRPerspectiveCamera.DEFAULT_HEIGHT, text);
      if (duration > 0 && !this.vr) {
        this.trigger('startMove');
        this.moving = true;
        this.tweenPositionTo(canvas, duration).onComplete(function () {
          this.trigger('endMove');
          this.moving = false;
        }.bind(this));
      } else {
        this.position.copy(canvas);
        if (this.vr) {
          this.updateMatrixWorld(true);
          this.vrControls.setPosition(this);
        }
      }
      if (!this.firstMove) {
        this.trigger('firstMove');
        this.firstMove = true;
      }
      if (!this.vr) {
        this.setMode(VRPerspectiveCamera.LOOK_MODE);
      }
    };
  }(),
  tweenPositionTo: function () {
    var pos = {
      x: 0,
      y: 0,
      z: 0
    };
    var e = new TWEEN.Tween();
    return function (a, duration) {
      return pos.x = this.position.x, pos.y = this.position.y, pos.z = this.position.z, e.reset(pos).to({
        x: a.x,
        y: a.y,
        z: a.z
      }, duration).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
        this.position.set(pos.x, pos.y, pos.z);
      }.bind(this)).start();
    };
  }(),
  tweenOrbitTargetTo: function () {
    var pos = {
      x: 0,
      y: 0,
      z: 0
    };
    var e = new TWEEN.Tween();
    return function (a, duration) {
      if (!this.orbitControls) {
        throw new Error('Orbit controls required');
      }
      var position = this.orbitControls.getTarget();
      return pos.x = position.x, pos.y = position.y, pos.z = position.z, e.reset(pos).to({
        x: a.x,
        y: a.y,
        z: a.z
      }, duration).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
        this.orbitControls.target.set(pos.x, pos.y, pos.z);
      }.bind(this)).start();
    };
  }(),
  enableControls: function () {
    if (!this.vr) {
      this.lookControls.enabled = true;
    }
  },
  setOrbitDistances: function (minDistance, maxDistance) {
    this.orbitControls.minDistance = minDistance;
    this.orbitControls.maxDistance = maxDistance;
  },
  update: function () {
    if (this.mode === VRPerspectiveCamera.VR_MODE) {
      this.vrControls.update();
    } else {
      if (this.mode === VRPerspectiveCamera.ORBIT_MODE) {
        this.orbitControls.update();
        this.rotating = this.orbitControls.isRotating || this.isTransitioning;
      } else {
        this.lookControls.update();
        this.rotating = this.lookControls.isRotating;
      }
      if (this.rotating && !this.firstRotate) {
        this.trigger('firstRotate');
        this.firstRotate = true;
      }
    }
  }
});
VRPerspectiveCamera.LOOK_MODE = 0;
VRPerspectiveCamera.ORBIT_MODE = 1;
VRPerspectiveCamera.VR_MODE = 2;
VRPerspectiveCamera.DEFAULT_HEIGHT = 1.4;
VRPerspectiveCamera.DEFAULT_HEIGHT_VR = 1.55;
VRPerspectiveCamera.mixin(Event);
export default VRPerspectiveCamera;
