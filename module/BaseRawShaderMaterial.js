import * as THREE from 'three';

var keys = [
  'side',
  'alphaTest',
  'transparent',
  'depthWrite',
  'shading',
  'wireframe'
];
var BaseRawShaderMaterial = function (s) {
  s = s || {};
  THREE.RawShaderMaterial.call(this, s);
  var self = this;
  _.each(keys, function (i) {
    var entry = s[i];
    if (undefined !== entry) {
      self[i] = entry;
    }
  }, this);
};
BaseRawShaderMaterial.inherit(THREE.RawShaderMaterial, {
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
export default BaseRawShaderMaterial;
