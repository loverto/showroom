function optionalParameter(value, defaultValue) {
  return void 0 !== value ? value : defaultValue;
}
import child from 'module/ShaderMaterialExtern';
import layer from 'module/LoaderUtils';
var a = {
  normalMapFactor: 'uNormalMapFactor',
  normalMap: 'sTextureNormalMap',
  matcapMap: 'sTextureAOMap'
};
var MatcapMaterial = function (args) {
  args = Object.assign({
    vertexShader: args.vertexShader,
    fragmentShader: args.fragmentShader,
    uniforms: {
      uNormalMapFactor: {
        type: 'f',
        value: 1
      },
      sTextureMatcapMap: {
        type: 't',
        value: null
      },
      sTextureNormalMap: {
        type: 't',
        value: null
      },
      uFlipY: {
        type: 'i',
        value: 0
      },
      uOutputLinear: {
        type: 'i',
        value: 0
      }
    }
  }, args);
  child.call(this, args);
  Object.keys(this.uniforms).forEach(function (propertyName) {
    this.onPropertyChange(propertyName, function (initSBC) {
      this.uniforms[propertyName].value = initSBC;
    });
  }, this);
  _.each(a, function (javascriptName, prop) {
    this.onPropertyChange(prop, function (jsonName) {
      this[javascriptName] = jsonName;
    });
  }, this);
  this.extensions = { derivatives: true };
};
MatcapMaterial.inherit(child, {
  clone: function (params) {
    var data = params || new MatcapMaterial();
    return child.prototype.clone.call(this, data), data.name = this.name, data.transparent = this.transparent, _.each(this.uniforms, function (dom, name) {
      var value = dom.type;
      if ('v2' === value || 'm4' === value) {
        data.uniforms[name].value.copy(dom.value);
      } else {
        data.uniforms[name].value = dom.value;
      }
    }, this), data;
  }
});
MatcapMaterial.create = function (material) {
  var source = new MatcapMaterial();
  source.uuid = material.uuid;
  source.name = material.name;
  source.transparent = optionalParameter(material.transparent, false);
  source.polygonOffset = optionalParameter(material.polygonOffset, false);
  source.polygonOffsetUnits = optionalParameter(material.polygonOffsetUnits, 0);
  source.polygonOffsetFactor = optionalParameter(material.polygonOffsetFactor, 0);
  var pm = (layer.getTexture('white.png'), material.normalMap);
  var color = material.matcapMap;
  return source.uNormalMapFactor = optionalParameter(material.normalMapFactor, 1), source.uFlipY = optionalParameter(material.flipNormals, 0), source.side = optionalParameter(material.side, THREE.FrontSide), pm.needsUpdate = true, color.needsUpdate = true, source.sTextureNormalMap = pm, source.sTextureMatcapMap = color, source;
};
export default MatcapMaterial;
