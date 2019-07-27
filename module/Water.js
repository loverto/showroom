import WaterMaterial from 'module/WaterMaterial';
import LoaderUtils from 'module/LoaderUtils';
function Water(options) {
  var waterNormals = LoaderUtils.getTexture('textures/waternormals.jpg');
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  var trail = new THREE.Vector3();
  if (options.light && options.light instanceof THREE.Light) {
    trail.copy(options.light.position);
  } else {
    trail.set(-0.2, 0.3, -0.5);
  }
  this.effect = new WaterMaterial(options.renderer, options.camera, {
    color: 16777215,
    waterNormals: waterNormals,
    transparent: void 0 !== options.transparent && options.transparent,
    sunDirection: trail,
    sunColor: 16777215,
    shininess: 500,
    alpha: 0.35
  });
  if (options.object) {
    THREE.Mesh.call(this, options.object.geometry, this.effect.material);
    this.position.copy(options.object.position);
    this.rotation.copy(options.object.rotation);
    this.scale.copy(options.object.scale);
  } else {
    THREE.Mesh.call(this, new THREE.PlaneBufferGeometry(2000, 2000, 10, 10), this.effect.material);
    this.rotation.x = 0.5 * -Math.PI;
    this.position.y -= 20;
  }
  this.add(this.effect);
}

Water.inherit(THREE.Mesh, {
  update: function (time) {
    if (this.effect.material.uniforms.time) {
      this.effect.material.uniforms.time.value += 0.25 * time.delta;
    }
    this.effect.update();
  },
  render: function () {
    this.effect.render(this.effect.renderer, this.effect.camera);
  }
});
export default Water;
