import * as THREE from 'three';

var BaseSphereGeometry = function () {
  THREE.Mesh.call(this, new THREE.SphereGeometry(0.005, 25, 25), new THREE.MeshBasicMaterial({
    color: 16777215,
    opacity: 1,
    transparent: true,
    depthTest: false
  }));
  this.position.z = -0.5;
  this.tween = new TWEEN.Tween();
  this.values = {
    opacity: 1,
    scale: 1
  };
};
BaseSphereGeometry.inherit(THREE.Mesh, {
  fadeIn: function () {
    if (this.faded) {
      var x = this.values;
      this.tween.reset(x).to({
        opacity: 1,
        scale: 1
      }, 750).easing(TWEEN.Easing.Cubic.InOut).onUpdate(function () {
        this.material.opacity = x.opacity;
        this.scale.set(x.scale, x.scale, x.scale);
      }.bind(this)).start();
      this.faded = false;
    }
  },
  fadeOut: function () {
    if (!this.faded) {
      var x = this.values;
      this.tween.reset(x).to({
        opacity: 0,
        scale: 0.7
      }, 400).easing(TWEEN.Easing.Cubic.InOut).onUpdate(function () {
        this.material.opacity = x.opacity;
        this.scale.set(x.scale, x.scale, x.scale);
      }.bind(this)).start();
      this.faded = true;
    }
  }
});
export default BaseSphereGeometry;
