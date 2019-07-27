var WebVRManager = function (renderer, e) {
  function callback(displays) {
    vrDisplays = displays;
    if (displays.length > 0) {
      vrDisplay = displays[0];
    } else {
      if (e) {
        e('HMD not available');
      }
    }
  }
  function onVRDisplayPresentChange() {
    var wasPresenting = scope.isPresenting;
    if (scope.isPresenting = void 0 !== vrDisplay && vrDisplay.isPresenting, scope.isPresenting) {
      var eyeParamsL = vrDisplay.getEyeParameters('left');
      var eyeWidth = eyeParamsL.renderWidth;
      var eyeHeight = eyeParamsL.renderHeight;
      if (!wasPresenting) {
        rendererPixelRatio = renderer.getPixelRatio();
        viewer_size = renderer.getSize();
        renderer.setPixelRatio(1);
        renderer.setSize(2 * eyeWidth, eyeHeight, false);
      }
    } else {
      if (wasPresenting) {
        renderer.setPixelRatio(rendererPixelRatio);
        renderer.setSize(viewer_size.width, viewer_size.height, large);
      }
    }
  }
  function update(data) {
    if (data.pose.orientation) {
      globalQuat.fromArray(data.pose.orientation);
      globalMtx.makeRotationFromQuaternion(globalQuat);
    } else {
      globalMtx.identity();
    }
    if (data.pose.position) {
      vector.fromArray(data.pose.position);
      globalMtx.setPosition(vector);
    }
    m.fromArray(data.leftViewMatrix);
    m.multiply(globalMtx);
    matrix.fromArray(data.rightViewMatrix);
    matrix.multiply(globalMtx);
    m.getInverse(m);
    matrix.getInverse(matrix);
  }
  function fovToNDCScaleOffset(fov) {
    var s = 2 / (fov.leftTan + fov.rightTan);
    var pxoffset = (fov.leftTan - fov.rightTan) * s * 0.5;
    var pyscale = 2 / (fov.upTan + fov.downTan);
    return {
      scale: [
        s,
        pyscale
      ],
      offset: [
        pxoffset,
        (fov.upTan - fov.downTan) * pyscale * 0.5
      ]
    };
  }

  /**
   * fov端口映射
   * @param fov
   * @param rightHanded
   * @param zNear
   * @param zFar
   */
  function fovPortToProjection(fov, rightHanded, zNear, zFar) {
    rightHanded = void 0 === rightHanded || rightHanded;
    zNear = void 0 === zNear ? 0.01 : zNear;
    zFar = void 0 === zFar ? 10000 : zFar;
    var handednessScale = rightHanded ? -1 : 1;
    var matrix = new THREE.Matrix4();
    var m = matrix.elements;
    var scaleAndOffset = fovToNDCScaleOffset(fov);
    return m[0] = scaleAndOffset.scale[0], m[1] = 0, m[2] = scaleAndOffset.offset[0] * handednessScale, m[3] = 0, m[4] = 0, m[5] = scaleAndOffset.scale[1], m[6] = -scaleAndOffset.offset[1] * handednessScale, m[7] = 0, m[8] = 0, m[9] = 0, m[10] = zFar / (zNear - zFar) * -handednessScale, m[11] = zFar * zNear / (zNear - zFar), m[12] = 0, m[13] = 0, m[14] = handednessScale, m[15] = 0, matrix.transpose(), matrix;
  }

  /**
   * fov投影
   * @param fov
   * @param rightHanded
   * @param zNear
   * @param zFar
   * @returns {*}
   */
  function fovToProjection(fov, rightHanded, zNear, zFar) {
    var DEG2RAD = Math.PI / 180;
    return fovPortToProjection({
      upTan: Math.tan(fov.upDegrees * DEG2RAD),
      downTan: Math.tan(fov.downDegrees * DEG2RAD),
      leftTan: Math.tan(fov.leftDegrees * DEG2RAD),
      rightTan: Math.tan(fov.rightDegrees * DEG2RAD)
    }, rightHanded, zNear, zFar);
  }
  var vrDisplay;
  var vrDisplays;
  var renderRectL;
  var renderRectR;
  var eyeTranslationR = new THREE.Vector3();
  var eyeTranslationL = new THREE.Vector3();
  var globalMtx = new THREE.Matrix4();
  var m = new THREE.Matrix4();
  var matrix = new THREE.Matrix4();
  var frameData = null;
  if ('VRFrameData' in window) {
    frameData = new window.VRFrameData();
  }
  if (navigator.getVRDisplays) {
    navigator.getVRDisplays().then(callback).catch(function () {
      console.warn('THREE.VREffect: Unable to get VR Displays');
    });
  }
  this.isPresenting = false;
  var scope = this;
  var viewer_size = renderer.getSize();
  var large = false;
  var rendererPixelRatio = renderer.getPixelRatio();
  this.getVRDisplay = function () {
    return vrDisplay;
  };
  this.setVRDisplay = function (value) {
    vrDisplay = value;
  };
  this.getVRDisplays = function () {
    return console.warn('THREE.VREffect: getVRDisplays() is being deprecated.'), vrDisplays;
  };
  this.setSize = function (width, height, type) {
    if (viewer_size = {
        width: width,
        height: height
      }, large = type, scope.isPresenting) {
      var eyeParamsL = vrDisplay.getEyeParameters('left');
      renderer.setPixelRatio(1);
      renderer.setSize(2 * eyeParamsL.renderWidth, eyeParamsL.renderHeight, false);
    } else {
      renderer.setPixelRatio(rendererPixelRatio);
      renderer.setSize(width, height, type);
    }
  };
  var d = renderer.domElement;
  var a = [
    0,
    0,
    0.5,
    1
  ];
  var defaultRightBounds = [
    0.5,
    0,
    0.5,
    1
  ];
  window.addEventListener('vrdisplaypresentchange', onVRDisplayPresentChange, false);
  this.setFullScreen = function (boolean) {
    return new Promise(function (resolve, reject) {
      return void 0 === vrDisplay ? void reject(new Error('No VR hardware found.')) : scope.isPresenting === boolean ? void resolve() : void resolve(boolean ? vrDisplay.requestPresent([{ source: d }]) : vrDisplay.exitPresent());
    });
  };
  this.requestPresent = function () {
    return this.setFullScreen(true);
  };
  this.exitPresent = function () {
    return this.setFullScreen(false);
  };
  this.requestAnimationFrame = function (cb) {
    return void 0 !== vrDisplay ? vrDisplay.requestAnimationFrame(cb) : window.requestAnimationFrame(cb);
  };
  this.cancelAnimationFrame = function (h) {
    if (void 0 !== vrDisplay) {
      vrDisplay.cancelAnimationFrame(h);
    } else {
      window.cancelAnimationFrame(h);
    }
  };
  this.submitFrame = function () {
    if (void 0 !== vrDisplay && scope.isPresenting) {
      vrDisplay.submitFrame();
    }
  };
  this.autoSubmitFrame = true;
  var cameraR = new THREE.PerspectiveCamera();
  cameraR.layers.enable(1);
  var obj = new THREE.PerspectiveCamera();
  obj.layers.enable(2);
  this.render = function (scene, camera, renderTarget, forceClear) {
    if (vrDisplay && scope.isPresenting) {
      var currentSceneAutoUpdate = scene.autoUpdate;
      if (currentSceneAutoUpdate) {
        scene.updateMatrixWorld();
        scene.autoUpdate = false;
      }
      if (Array.isArray(scene)) {
        console.warn('THREE.VREffect.render() no longer supports arrays. Use object.layers instead.');
        scene = scene[0];
      }
      var s;
      var rightBounds;
      var size = renderer.getSize();
      var tempLayers = vrDisplay.getLayers();
      if (tempLayers.length) {
        var layer = tempLayers[0];
        s = null !== layer.leftBounds && 4 === layer.leftBounds.length ? layer.leftBounds : a;
        rightBounds = null !== layer.rightBounds && 4 === layer.rightBounds.length ? layer.rightBounds : defaultRightBounds;
      } else {
        s = a;
        rightBounds = defaultRightBounds;
      }
      if (renderRectL = {
          x: Math.round(size.width * s[0]),
          y: Math.round(size.height * s[1]),
          width: Math.round(size.width * s[2]),
          height: Math.round(size.height * s[3])
        }, renderRectR = {
          x: Math.round(size.width * rightBounds[0]),
          y: Math.round(size.height * rightBounds[1]),
          width: Math.round(size.width * rightBounds[2]),
          height: Math.round(size.height * rightBounds[3])
        }, renderTarget ? (renderer.setRenderTarget(renderTarget), renderTarget.scissorTest = true) : (renderer.setRenderTarget(null), renderer.setScissorTest(true)), (renderer.autoClear || forceClear) && renderer.clear(), null === camera.parent && camera.updateMatrixWorld(), camera.matrixWorld.decompose(cameraR.position, cameraR.quaternion, cameraR.scale), obj.position.copy(cameraR.position), obj.quaternion.copy(cameraR.quaternion), obj.scale.copy(cameraR.scale), vrDisplay.getFrameData) {
        vrDisplay.depthNear = camera.near;
        vrDisplay.depthFar = camera.far;
        vrDisplay.getFrameData(frameData);
        cameraR.projectionMatrix.elements = frameData.leftProjectionMatrix;
        obj.projectionMatrix.elements = frameData.rightProjectionMatrix;
        update(frameData);
        cameraR.updateMatrix();
        cameraR.matrix.multiply(m);
        cameraR.matrix.decompose(cameraR.position, cameraR.quaternion, cameraR.scale);
        obj.updateMatrix();
        obj.matrix.multiply(matrix);
        obj.matrix.decompose(obj.position, obj.quaternion, obj.scale);
      } else {
        var eyeParamsR = vrDisplay.getEyeParameters('left');
        var eyeParamsL = vrDisplay.getEyeParameters('right');
        cameraR.projectionMatrix = fovToProjection(eyeParamsR.fieldOfView, true, camera.near, camera.far);
        obj.projectionMatrix = fovToProjection(eyeParamsL.fieldOfView, true, camera.near, camera.far);
        eyeTranslationR.fromArray(eyeParamsR.offset);
        eyeTranslationL.fromArray(eyeParamsL.offset);
        cameraR.translateOnAxis(eyeTranslationR, cameraR.scale.x);
        obj.translateOnAxis(eyeTranslationL, obj.scale.x);
      }
      return renderTarget ? (renderTarget.viewport.set(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height), renderTarget.scissor.set(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height)) : (renderer.setViewport(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height), renderer.setScissor(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height)), renderer.render(scene, cameraR, renderTarget, forceClear), renderTarget ? (renderTarget.viewport.set(renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height), renderTarget.scissor.set(renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height)) : (renderer.setViewport(renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height), renderer.setScissor(renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height)), renderer.render(scene, obj, renderTarget, forceClear), renderTarget ? (renderTarget.viewport.set(0, 0, size.width, size.height), renderTarget.scissor.set(0, 0, size.width, size.height), renderTarget.scissorTest = false, renderer.setRenderTarget(null)) : (renderer.setViewport(0, 0, size.width, size.height), renderer.setScissorTest(false)), currentSceneAutoUpdate && (scene.autoUpdate = true), void (scope.autoSubmitFrame && scope.submitFrame());
    }
    renderer.render(scene, camera, renderTarget, forceClear);
  };
  this.dispose = function () {
    window.removeEventListener('vrdisplaypresentchange', onVRDisplayPresentChange, false);
  };
  var globalQuat = new THREE.Quaternion();
  var vector = new THREE.Vector3();
};
export default WebVRManager;
