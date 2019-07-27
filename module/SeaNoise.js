import * as THREE  from 'three';

import shaders from 'module/shaders';

var SeaNoise = function () {
  this.target = new THREE.WebGLRenderTarget(512, 512, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBFormat
  });
  this.target.texture.generateMipmaps = false;
  this.material = new THREE.ShaderMaterial({
    vertexShader: shaders['seanoise.vs'],
    fragmentShader: shaders['seanoise.fs']
  });
  this.scene = new THREE.Scene();
  this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  var quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
  this.scene.add(quad);
};
SeaNoise.prototype = {
  render: function (renderer) {
    renderer.render(this.scene, this.camera, this.target);
  }
};
export default SeaNoise;
