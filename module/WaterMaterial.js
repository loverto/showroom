import * as THREE from 'three';

import shaders from 'module/shaders';

import f from 'module/Mirror';
var mirrorShader = {
  uniforms: THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      color: { value: new THREE.Color(5592405) },
      mirrorSampler: { value: null },
      textureMatrix: { value: new THREE.Matrix4() },
      normalSampler: { value: null },
      alpha: { value: 1 },
      time: { value: 0 },
      distortionScale: { value: 20 },
      noiseScale: { value: 1 },
      sunColor: { value: new THREE.Color(8355711) },
      sunDirection: { value: new THREE.Vector3(0.70707, 0.70707, 0) },
      eye: { value: new THREE.Vector3() }
    }
  ]),
  vertexShader: shaders['water.vs'],
  fragmentShader: shaders['water.fs']
};
var WaterMaterial = function (message, config, options) {
  function optionalParameter(value, defaultValue) {
    return undefined !== value ? value : defaultValue;
  }
  this.clipBias = optionalParameter(options.clipBias, 0);
  this.alpha = optionalParameter(options.alpha, 1);
  this.time = optionalParameter(options.time, 0);
  this.normalSampler = optionalParameter(options.waterNormals, null);
  this.sunDirection = optionalParameter(options.sunDirection, new THREE.Vector3(0.70707, 0.70707, 0));
  this.sunColor = new THREE.Color(optionalParameter(options.sunColor, 16777215));
  this.eye = optionalParameter(options.eye, new THREE.Vector3(0, 0, 0));
  this.distortionScale = optionalParameter(options.distortionScale, 10);
  this.side = optionalParameter(options.side, THREE.DoubleSide);
  this.fog = optionalParameter(options.fog, false);
  f.apply(this, arguments);
  if (options.transparent) {
    this.material.transparent = options.transparent;
  }
  this.material.uniforms.alpha.value = this.alpha;
  this.material.uniforms.time.value = this.time;
  this.material.uniforms.normalSampler.value = this.normalSampler;
  this.material.uniforms.sunColor.value = this.sunColor;
  this.material.uniforms.sunDirection.value = this.sunDirection;
  this.material.uniforms.distortionScale.value = this.distortionScale;
  this.material.uniforms.eye.value = this.eye;
};
WaterMaterial.prototype = Object.create(f.prototype);
WaterMaterial.prototype.constructor = WaterMaterial;
WaterMaterial.prototype.initMaterial = function () {
  var uniforms = THREE.UniformsUtils.clone(mirrorShader.uniforms);
  this.material = new THREE.ShaderMaterial({
    fragmentShader: mirrorShader.fragmentShader,
    vertexShader: mirrorShader.vertexShader,
    uniforms: uniforms,
    side: this.side,
    fog: this.fog
  });
};
WaterMaterial.prototype.updateTextureMatrix = function () {
  f.prototype.updateTextureMatrix.call(this);
  var worldCoordinates = new THREE.Vector3();
  worldCoordinates.setFromMatrixPosition(this.camera.matrixWorld);
  this.eye = worldCoordinates;
  this.material.uniforms.eye.value = this.eye;
};
WaterMaterial.prototype.update = function () {
  var worldCoordinates = new THREE.Vector3();
  return function (data) {
    this.updateMatrixWorld();
    this.camera.updateMatrixWorld();
    worldCoordinates.setFromMatrixPosition(this.camera.matrixWorld);
    this.eye = worldCoordinates;
    this.material.uniforms.eye.value = this.eye;
  };
}();
export default WaterMaterial;
