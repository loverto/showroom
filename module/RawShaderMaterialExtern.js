var keys = [
  'side',
  'alphaTest',
  'transparent',
  'depthWrite',
  'shading',
  'wireframe'
];
var RawShaderMaterialExtern = function (s) {
  s = s || {};
  THREE.RawShaderMaterial.call(this, s);
  _.each(keys, function (i) {
    var entry = s[i];
    if (void 0 !== entry) {
      this[i] = entry;
    }
  }, this);
};
RawShaderMaterialExtern.inherit(THREE.RawShaderMaterial, {
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
  clone: function (dataAndEvents) {
    var material = dataAndEvents || new Material();
    return THREE.RawShaderMaterial.prototype.clone.call(this, material), material.shading = this.shading, material.wireframe = this.wireframe, material.wireframeLinewidth = this.wireframeLinewidth, material.fog = this.fog, material.lights = this.lights, material.vertexColors = this.vertexColors, material.skinning = this.skinning, material.morphTargets = this.morphTargets, material.morphNormals = this.morphNormals, material;
  }
});
export default RawShaderMaterialExtern;
