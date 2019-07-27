import * as THREE  from 'three';

import shaders from 'module/shaders';

import BaseShaderMaterial from 'module/BaseShaderMaterial';
var StrokeMaterial = function (name) {
  name = Object.assign({
    vertexShader: shaders['stroke.vs'],
    fragmentShader: shaders['stroke.fs'],
    uniforms: {
      diffuse: {
        type: 'c',
        value: new THREE.Color(16777215)
      },
      opacity: {
        type: 'f',
        value: 1
      },
      objectScale: {
        type: 'f',
        value: 1
      }
    }
  }, name);
  BaseShaderMaterial.call(this, name);
  Object.keys(this.uniforms).forEach(function (propertyName) {
    this.onPropertyChange(propertyName, function (initSBC) {
      this.uniforms[propertyName].value = initSBC;
    });
  }, this);
  this.depthWrite = false;
};
StrokeMaterial.inherit(BaseShaderMaterial, {
  clone: function (params) {
    var data = params || new StrokeMaterial();
    BaseShaderMaterial.prototype.clone.call(this, data)
    data.name = this.name
    data.transparent = this.transparent
    _.each(this.uniforms, function (dom, name) {
      var value = dom.type;
      if ('v2' === value || 'm4' === value) {
        data.uniforms[name].value.copy(dom.value);
      } else {
        data.uniforms[name].value = dom.value;
      }
    }, this)
    return data;
  }
});
export default StrokeMaterial;
