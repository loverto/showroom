import * as THREE  from 'three';

import BaseShaderMaterial from 'module/BaseShaderMaterial';
import 'module/TweenUtils';
var TransitionMaterial = (function (options) {
  options = Object.assign({
    vertexShader: require('module/TransitionMaterialvs'),
    fragmentShader: require('module/TransitionMaterialfs'),
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
      bias: {
        type: 'f',
        value: 0
      }
    }
  }, options);
  BaseShaderMaterial.call(this, options);
  Object.keys(this.uniforms).forEach(function (propertyName) {
    this.onPropertyChange(propertyName, function (initSBC) {
      this.uniforms[propertyName].value = initSBC;
    });
  }, this);
  this.transparent = options.transparent;
});
TransitionMaterial.inherit(BaseShaderMaterial);
export default TransitionMaterial;
