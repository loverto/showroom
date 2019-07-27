import ShaderMaterialExtern from 'module/ShaderMaterialExtern';
var ColorMaterialProperty = function (name) {
  name = Object.assign({
    vertexShader: require('module/ColorMaterialPropertyvs'),
    fragmentShader: require('module/ColorMaterialPropertyfs'),
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
  ShaderMaterialExtern.call(this, name);
  Object.keys(this.uniforms).forEach(function (propertyName) {
    this.onPropertyChange(propertyName, function (initSBC) {
      this.uniforms[propertyName].value = initSBC;
    });
  }, this);
  this.depthWrite = false;
};
ColorMaterialProperty.inherit(ShaderMaterialExtern, {
  clone: function (params) {
    var data = params || new ColorMaterialProperty();
    return ShaderMaterialExtern.prototype.clone.call(this, data), data.name = this.name, data.transparent = this.transparent, _.each(this.uniforms, function (dom, name) {
      var value = dom.type;
      if ('v2' === value || 'm4' === value) {
        data.uniforms[name].value.copy(dom.value);
      } else {
        data.uniforms[name].value = dom.value;
      }
    }, this), data;
  }
});
export default ColorMaterialProperty;
