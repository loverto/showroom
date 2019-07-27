import * as THREE  from 'three';

import shaders from 'module/shaders';

import p from 'module/BaseShaderMaterial';
import 'module/TweenUtils';
import 'module/LoaderUtils';
var SeaMaterial = (function (i) {
  i = Object.assign({
    vertexShader: shaders['sea.vs'],
    fragmentShader: shaders['sea.fs'],
    uniforms: {
      diffuse: {
        type: 'c',
        value: new THREE.Color(16777215)
      },
      map: {
        type: 't',
        value: null
      },
      offsetRepeat: {
        type: 'v4',
        value: new THREE.Vector4(0, 0, 1, 1)
      },
      opacity: {
        type: 'f',
        value: 1
      },
      threshold: {
        type: 'f',
        value: 0
      },
      range: {
        type: 'f',
        value: 0.1
      },
      noiseMap: {
        type: 't',
        value: null
      }
    }
  }, i);
  p.call(this, i);
  Object.keys(this.uniforms).forEach(function (propertyName) {
    this.onPropertyChange(propertyName, function (initSBC) {
      this.uniforms[propertyName].value = initSBC;
    });
  }, this);
  this.threshold = 0;
  this.sign = 1;
  this.lastUpdate = 0;
});
SeaMaterial.inherit(p, {
  clone: function (params) {
    var data = params || new SeaMaterial();
    p.prototype.clone.call(this, data)
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
  },
  updateUniforms: function (readBuffer) {
    this.uniforms.threshold.value += 0.35 * readBuffer.delta;
  }
});
export default SeaMaterial;
