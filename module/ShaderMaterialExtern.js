var keys = [
  'side',
  'alphaTest',
  'transparent',
  'depthWrite',
  'shading',
  'wireframe'
];
var ShaderMaterialExtern = function (type) {
  type = type || {};
  THREE.ShaderMaterial.call(this, type);
  _.each(keys, function (l) {
    var idx = type[l];
    if (void 0 !== idx) {
      this[l] = idx;
    }
  }, this);
};
ShaderMaterialExtern.inherit(THREE.ShaderMaterial, {
  onPropertyChange: function (prop, e) {
    Object.defineProperty(this, prop, {
      get: function () {
        return this['_' + prop];
      },
      set: function (v) {
        this['_' + prop] = v;
        e.call(this, v);
      }
    });
  },
  clone: function (to) {
    var material = to || new ShaderMaterialExtern();
    return THREE.Material.prototype.clone.call(this, material), material.shading = this.shading, material.wireframe = this.wireframe, material.wireframeLinewidth = this.wireframeLinewidth, material.fog = this.fog, material.lights = this.lights, material.vertexColors = this.vertexColors, material.skinning = this.skinning, material.morphTargets = this.morphTargets, material.morphNormals = this.morphNormals, material;
  }
});
export default ShaderMaterialExtern;
