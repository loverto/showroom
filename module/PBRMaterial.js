function defaultValue(value, defaultValue) {
  return void 0 !== value ? value : defaultValue;
}
import obj from 'module/RawShaderMaterialExtern';
import coin from 'module/LoaderUtils';
var options = {
  aoFactor: 'uAOPBRFactor',
  albedoFactor: 'uAlbedoPBRFactor',
  glossFactor: 'uGlossinessPBRFactor',
  metalFactor: 'uMetalnessPBRFactor',
  opacity: 'uOpacityFactor',
  normalMapFactor: 'uNormalMapFactor',
  f0Factor: 'uSpecularF0Factor',
  albedoMap: 'sTextureAlbedoMap',
  normalMap: 'sTextureNormalMap',
  normalMap2: 'sTextureNormalMap2',
  aoMap: 'sTextureAOMap',
  aoMap2: 'sTextureAOMap2',
  metalGlossMap: 'sTextureMetalGlossMap',
  packedMap: 'sTexturePackedMap',
  emissiveMap: 'sTextureEmissiveMap',
  lightMap: 'sTextureLightMap',
  lightMapM: 'sTextureLightMapM',
  lightMapDir: 'sTextureLightMapDir',
  cubemap: 'sSpecularPBR',
  panorama: 'sPanoramaPBR',
  sph: 'uDiffuseSPH',
  exposure: 'uEnvironmentExposure',
  transform: 'uEnvironmentTransform',
  occludeSpecular: 'uOccludeSpecular',
  alphaTest: 'uAlphaTest',
  color: 'uColor',
  contrast: 'uContrast'
};
var PBRMaterial = function (size) {
  size = Object.assign({
    uniforms: {
      uAOPBRFactor: {
        type: 'f',
        value: 1
      },
      uAlbedoPBRFactor: {
        type: 'f',
        value: 1
      },
      uGlossinessPBRFactor: {
        type: 'f',
        value: 1
      },
      uMetalnessPBRFactor: {
        type: 'f',
        value: 1
      },
      uNormalMapFactor: {
        type: 'f',
        value: 1
      },
      uSpecularF0Factor: {
        type: 'f',
        value: 1
      },
      uEnvironmentExposure: {
        type: 'f',
        value: 1
      },
      uOpacityFactor: {
        type: 'f',
        value: 1
      },
      sTextureAlbedoMap: {
        type: 't',
        value: null
      },
      sTextureAlbedoMap2: {
        type: 't',
        value: null
      },
      sTextureNormalMap: {
        type: 't',
        value: null
      },
      sTextureNormalMap2: {
        type: 't',
        value: null
      },
      sTextureAOMap: {
        type: 't',
        value: null
      },
      sTextureAOMap2: {
        type: 't',
        value: null
      },
      sTextureMetalGlossMap: {
        type: 't',
        value: null
      },
      sTexturePackedMap: {
        type: 't',
        value: null
      },
      sTextureEmissiveMap: {
        type: 't',
        value: null
      },
      sTextureLightMap: {
        type: 't',
        value: null
      },
      sTextureLightMapM: {
        type: 't',
        value: null
      },
      sTextureLightMapDir: {
        type: 't',
        value: null
      },
      sSpecularPBR: {
        type: 't',
        value: null
      },
      sPanoramaPBR: {
        type: 't',
        value: null
      },
      uTextureEnvironmentSpecularPBRLodRange: {
        type: 'v2',
        value: new THREE.Vector2(10, 5)
      },
      uTextureEnvironmentSpecularPBRTextureSize: {
        type: 'v2',
        value: new THREE.Vector2()
      },
      uDiffuseSPH: {
        type: '3fv',
        value: null
      },
      uFlipY: {
        type: 'i',
        value: 0
      },
      uOccludeSpecular: {
        type: 'i',
        value: 0
      },
      uOutputLinear: {
        type: 'i',
        value: 0
      },
      uEnvironmentTransform: {
        type: 'm4',
        value: new THREE.Matrix4()
      },
      uMode: {
        type: 'i',
        value: 0
      },
      uColor: {
        type: 'c',
        value: null
      },
      uAlphaTest: {
        type: 'f',
        value: 0
      },
      uContrast: {
        type: 'f',
        value: 1.1
      },
      offsetRepeat: {
        type: 'v4',
        value: new THREE.Vector4(0, 0, 1, 1)
      },
      offsetRepeatDetail: {
        type: 'v4',
        value: new THREE.Vector4(0, 0, 1, 1)
      },
      viewLightDir: {
        type: 'v3',
        value: new THREE.Vector3()
      },
      lightColor: {
        type: 'c',
        value: new THREE.Color()
      },
      highlights: {
        type: 'i',
        value: 1
      }
    }
  }, size);
  obj.call(this, size);
  Object.keys(this.uniforms).forEach(function (propertyName) {
    this.onPropertyChange(propertyName, function (initSBC) {
      this.uniforms[propertyName].value = initSBC;
    });
  }, this);
  _.each(options, function (javascriptName, prop) {
    this.onPropertyChange(prop, function (jsonName) {
      this[javascriptName] = jsonName;
    });
  }, this);
  this.extensions = {
    derivatives: true,
    shaderTextureLOD: null !== THREE.Extensions.get('EXT_shader_texture_lod')
  };
  this.pbr = true;
};
PBRMaterial.inherit(obj, {
  _clone: function (options) {
    var data = options || new PBRMaterial();
    return obj.prototype.clone.call(this, data), data.name = this.name, data.transparent = this.transparent, _.each(this.uniforms, function (dom, name) {
      var value = dom.type;
      if ('v2' === value || 'm4' === value) {
        data.uniforms[name].value.copy(dom.value);
      } else {
        data.uniforms[name].value = dom.value;
      }
    }, this), data;
  },
  clone: function () {
    var rvm3 = PBRMaterial.create(this.createOptions);
    return rvm3.uuid = THREE.Math.generateUUID(), rvm3;
  },
  updateEnvironmentTransform: function () {
    var elem = new THREE.Quaternion();
    return function (link) {
      link.getWorldQuaternion(elem).inverse();
      this.uniforms.uEnvironmentTransform.value.makeRotationFromQuaternion(elem);
    };
  }(),
  refreshOffsetRepeat: function () {
    var uvScaleMap;
    if (this.defines.USE_ALBEDOMAP ? uvScaleMap = this.sTextureAlbedoMap : this.defines.USE_NORMALMAP ? uvScaleMap = this.sTextureNormalMap : this.defines.USE_AOMAP && (uvScaleMap = this.sTextureAOMap), void 0 !== uvScaleMap) {
      var offset = uvScaleMap.offset;
      var repeat = uvScaleMap.repeat;
      this.uniforms.offsetRepeat.value.set(offset.x, offset.y, repeat.x, repeat.y);
    }
  },
  refreshOffsetRepeatDetail: function () {
    var uvScaleMap = this.sTextureNormalMap2;
    if (void 0 !== uvScaleMap) {
      var offset = uvScaleMap.offset;
      var repeat = uvScaleMap.repeat;
      this.uniforms.offsetRepeatDetail.value.set(offset.x, offset.y, repeat.x, repeat.y);
    }
  },
  refreshUniforms: function (mmCoreSplitViewBlock) {
    this.updateEnvironmentTransform(mmCoreSplitViewBlock);
  }
});
PBRMaterial.create = function (material) {
  var options = new PBRMaterial({
    vertexShader: material.vertexShader,
    fragmentShader: material.fragmentShader
  });
  options.createOptions = material;
  options.uuid = material.uuid;
  options.name = material.name;
  options.transparent = defaultValue(material.transparent, false);
  options.polygonOffset = defaultValue(material.polygonOffset, false);
  options.polygonOffsetUnits = defaultValue(material.polygonOffsetUnits, 0);
  options.polygonOffsetFactor = defaultValue(material.polygonOffsetFactor, 0);
  var app;
  var env;
  var none = coin.getTexture('textures/white.png');
  var inside = coin.getTexture('textures/normal.png');
  var color = material.albedoMap || none;
  var val = material.albedoMap2 || none;
  var type = material.normalMap || inside;
  var position = material.normalMap2 || inside;
  var moduleName = material.aoMap || none;
  var subject = material.aoMap2 || none;
  var easing = material.metalGlossMap || none;
  var attr = material.packedMap || none;
  var ext = material.emissiveMap || none;
  var align = material.lightMap || none;
  var style = material.lightMapM || none;
  var g = material.lightMapDir || none;
  var len = coin.getSH(material.environment);
  return options.extensions.shaderTextureLOD ? app = coin.getCubemap(material.environment) : env = coin.getPanorama(material.environment), material.albedoMap && (options.defines.USE_ALBEDOMAP = true), material.albedoMap2 && (options.defines.USE_ALBEDOMAP2 = true), material.normalMap && (options.defines.USE_NORMALMAP = true), material.normalMap2 && (options.defines.USE_NORMALMAP2 = true), material.aoMap && (options.defines.USE_AOMAP = true), material.aoMap2 && (options.defines.USE_AOMAP2 = true), material.metalGlossMap && (options.defines.USE_METALGLOSSMAP = true), material.packedMap && (options.defines.USE_PACKEDMAP = true), material.emissiveMap && (options.defines.USE_EMISSIVEMAP = true), material.lightMap && (options.defines.USE_LIGHTMAP = true), material.lightMapDir && (options.defines.USE_LIGHTMAP_DIR = true), options.uAlbedoPBRFactor = defaultValue(material.albedoFactor, 1), options.uNormalMapFactor = defaultValue(material.normalMapFactor, 1), options.uMetalnessPBRFactor = defaultValue(material.metalFactor, 1), options.uGlossinessPBRFactor = defaultValue(material.glossFactor, 1), options.uAOPBRFactor = defaultValue(material.aoFactor, 1), options.uSpecularF0Factor = defaultValue(material.f0Factor, 0.5), options.uEnvironmentExposure = defaultValue(material.exposure, 1), options.occludeSpecular = defaultValue(material.occludeSpecular ? 1 : 0, 1), options.uFlipY = defaultValue(material.flipNormals, 0), options.opacity = defaultValue(material.opacity, 1), options.color = new THREE.Color().setHex(void 0 !== material.color ? material.color : 16777215), options.side = defaultValue(material.side, THREE.FrontSide), color.needsUpdate = true, val.needsUpdate = true, type.needsUpdate = true, position.needsUpdate = true, moduleName.needsUpdate = true, subject.needsUpdate = true, easing.needsUpdate = true, attr.needsUpdate = true, ext.needsUpdate = true, align.needsUpdate = true, style.needsUpdate = true, g.needsUpdate = true, app && (app.needsUpdate = true), env && (env.needsUpdate = true), options.sTextureAlbedoMap = color, options.sTextureAlbedoMap2 = val, options.sTextureNormalMap = type, options.sTextureNormalMap2 = position, options.sTextureAOMap = moduleName, options.sTextureAOMap2 = subject, options.sTextureMetalGlossMap = easing, options.sTexturePackedMap = attr, options.sTextureEmissiveMap = ext, options.sTextureLightMap = align, options.sTextureLightMapM = style, options.sTextureLightMapDir = g, options.sSpecularPBR = app, options.sPanoramaPBR = env, len && (options.uDiffuseSPH = new Float32Array(len, 27)), options.uEnvironmentTransform = new THREE.Matrix4(), material.alphaTest && (options.alphaTest = material.alphaTest, options.defines.ALPHATEST = true), options.extensions.shaderTextureLOD ? (options.defines.CUBEMAP = true, options.uniforms.uTextureEnvironmentSpecularPBRTextureSize.value.set(256, 256)) : (options.defines.PANORAMA = true, options.uniforms.uTextureEnvironmentSpecularPBRTextureSize.value.set(1024, 1024)), options.refreshOffsetRepeat(), options.refreshOffsetRepeatDetail(), options;
};
export default PBRMaterial;
