import * as THREE from 'three';

import BaseRawShaderMaterial from 'module/BaseRawShaderMaterial';
import LoaderUtils from 'module/LoaderUtils';

function defaultValue(value, defaultValue) {
  return undefined !== value ? value : defaultValue;
}

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

/**
 * PBR材料
 * @param obj
 * @constructor
 */
var PBRMaterial = function (obj) {
  var self = this;
  obj = Object.assign({
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
  }, obj);
  BaseRawShaderMaterial.call(this, obj);
  Object.keys(this.uniforms).forEach(function(name) {
    this.onPropertyChange(name, function(initSBC) {
      this.uniforms[name].value = initSBC;
    });
  }, this);
  // 遍历属性
  _.each(options, function(value, key) {
    self.onPropertyChange(key, function(jsonName) {
      self[value] = jsonName;
    });
  });
  // 扩展信息
  this.extensions = {
    derivatives: true,
    shaderTextureLOD: null !== THREE.Extensions.get('EXT_shader_texture_lod')
  };
  // 设置pbr
  this.pbr = true;
};

PBRMaterial.inherit(BaseRawShaderMaterial, {
  _clone: function (options) {
    var data = options || new PBRMaterial;
    BaseRawShaderMaterial.prototype.clone.call(this, data)
    data.name = this.name
    data.transparent = this.transparent
    _.each(this.uniforms, function(value, key) {
      var type = value.type;
      if ('v2' === type || 'm4' === type) {
        data.uniforms[key].value.copy(value.value);
      } else {
        data.uniforms[key].value = value.value;
      }
    }, this)
    return data;
  },
  clone: function () {
    // 创建pbr材料
    var pbrMaterial = PBRMaterial.create(this.createOptions);
    // 创建uuid
    pbrMaterial.uuid = THREE.Math.generateUUID()
    return pbrMaterial;
  },
  /**
   * 更新环境转换
   */
  updateEnvironmentTransform: function () {
    // 四元
    var quaternion = new THREE.Quaternion;
    return function (camera) {
      camera.getWorldQuaternion(quaternion).inverse();
      this.uniforms.uEnvironmentTransform.value.makeRotationFromQuaternion(quaternion);
    };
  }(),
  /**
   * 刷新偏移重复
   */
  refreshOffsetRepeat: function () {
    var uvScaleMap;
    if (this.defines.USE_ALBEDOMAP){
      uvScaleMap = this.sTextureAlbedoMap
    } else if (this.defines.USE_NORMALMAP){
      uvScaleMap = this.sTextureNormalMap
    } else if (this.defines.USE_AOMAP){
      uvScaleMap = this.sTextureAOMap
    }
    if ( undefined !== uvScaleMap) {
      var offset = uvScaleMap.offset;
      var repeat = uvScaleMap.repeat;
      this.uniforms.offsetRepeat.value.set(offset.x, offset.y, repeat.x, repeat.y);
    }
  },
  /**
   * 刷新偏移重复细节
   */
  refreshOffsetRepeatDetail: function () {
    var textureNormalMap2 = this.sTextureNormalMap2;
    if (undefined !== textureNormalMap2) {
      var offset = textureNormalMap2.offset;
      var repeat = textureNormalMap2.repeat;
      this.uniforms.offsetRepeatDetail.value.set(offset.x, offset.y, repeat.x, repeat.y);
    }
  },
  /**
   * 刷新制服
   * @param camera
   */
  refreshUniforms: function (camera) {
    this.updateEnvironmentTransform(camera);
  }
});

/**
 * pbr材料创建
 * @param material
 */
PBRMaterial.create = function (material) {
  var pbrMaterial = new PBRMaterial({
    vertexShader: material.vertexShader,
    fragmentShader: material.fragmentShader
  });
  // 创建选项
  pbrMaterial.createOptions = material;
  // uuid
  pbrMaterial.uuid = material.uuid;
  // 名称
  pbrMaterial.name = material.name;
  // 设置透明度
  pbrMaterial.transparent = defaultValue(material.transparent, false);
  // 多边形偏移
  pbrMaterial.polygonOffset = defaultValue(material.polygonOffset, false);
  // 多边形偏移单位
  pbrMaterial.polygonOffsetUnits = defaultValue(material.polygonOffsetUnits, 0);
  // 多边形偏移系数
  pbrMaterial.polygonOffsetFactor = defaultValue(material.polygonOffsetFactor, 0);
  var app;
  var env;
  // 白色纹理
  var whiteTexture = LoaderUtils.getTexture('textures/white.png');
  // 正常纹理
  var normalTexture = LoaderUtils.getTexture('textures/normal.png');

  var color = material.albedoMap || whiteTexture;
  var val = material.albedoMap2 || whiteTexture;
  var type = material.normalMap || normalTexture;
  var position = material.normalMap2 || normalTexture;
  var moduleName = material.aoMap || whiteTexture;
  var subject = material.aoMap2 || whiteTexture;
  var easing = material.metalGlossMap || whiteTexture;
  var attr = material.packedMap || whiteTexture;
  var ext = material.emissiveMap || whiteTexture;
  var align = material.lightMap || whiteTexture;
  var style = material.lightMapM || whiteTexture;
  var g = material.lightMapDir || whiteTexture;

  // 获取辐照度
  var sh = LoaderUtils.getSH(material.environment);

  if (pbrMaterial.extensions.shaderTextureLOD) {
    app = LoaderUtils.getCubemap(material.environment)
  } else {
    env = LoaderUtils.getPanorama(material.environment)
  }

  if (material.albedoMap) {
    (pbrMaterial.defines.USE_ALBEDOMAP = true)
  }

  if (material.albedoMap2) {
    (pbrMaterial.defines.USE_ALBEDOMAP2 = true)
  }

  if (material.normalMap) {
    (pbrMaterial.defines.USE_NORMALMAP = true)
  }
  if (material.normalMap2) {
    (pbrMaterial.defines.USE_NORMALMAP2 = true)
  }
  if (material.aoMap) {
    (pbrMaterial.defines.USE_AOMAP = true)
  }
  if (material.aoMap2) {
    (pbrMaterial.defines.USE_AOMAP2 = true)
  }
  if (material.metalGlossMap) {
    (pbrMaterial.defines.USE_METALGLOSSMAP = true)
  }
  if (material.packedMap) {
    (pbrMaterial.defines.USE_PACKEDMAP = true)
  }
  if (material.emissiveMap) {
    (pbrMaterial.defines.USE_EMISSIVEMAP = true)
  }
  if (material.lightMap) {
    (pbrMaterial.defines.USE_LIGHTMAP = true)
  }
  if (material.lightMapDir) {
    (pbrMaterial.defines.USE_LIGHTMAP_DIR = true)
  }

  pbrMaterial.uAlbedoPBRFactor = defaultValue(material.albedoFactor, 1)
  pbrMaterial.uNormalMapFactor = defaultValue(material.normalMapFactor, 1)
  pbrMaterial.uMetalnessPBRFactor = defaultValue(material.metalFactor, 1)
  pbrMaterial.uGlossinessPBRFactor = defaultValue(material.glossFactor, 1)
  pbrMaterial.uAOPBRFactor = defaultValue(material.aoFactor, 1)
  pbrMaterial.uSpecularF0Factor = defaultValue(material.f0Factor, 0.5)
  pbrMaterial.uEnvironmentExposure = defaultValue(material.exposure, 1)
  pbrMaterial.occludeSpecular = defaultValue(material.occludeSpecular ? 1 : 0, 1)
  pbrMaterial.uFlipY = defaultValue(material.flipNormals, 0)
  pbrMaterial.opacity = defaultValue(material.opacity, 1)
  pbrMaterial.color = new THREE.Color().setHex(undefined !== material.color ? material.color : 16777215)
  pbrMaterial.side = defaultValue(material.side, THREE.FrontSide)
  color.needsUpdate = true
  val.needsUpdate = true
  type.needsUpdate = true
  position.needsUpdate = true
  moduleName.needsUpdate = true
  subject.needsUpdate = true
  easing.needsUpdate = true
  attr.needsUpdate = true
  ext.needsUpdate = true
  align.needsUpdate = true
  style.needsUpdate = true
  g.needsUpdate = true

  if (app) {
    (app.needsUpdate = true)
  }
  if (env) {
    (env.needsUpdate = true)
  }
  pbrMaterial.sTextureAlbedoMap = color
  pbrMaterial.sTextureAlbedoMap2 = val
  pbrMaterial.sTextureNormalMap = type
  pbrMaterial.sTextureNormalMap2 = position
  pbrMaterial.sTextureAOMap = moduleName
  pbrMaterial.sTextureAOMap2 = subject
  pbrMaterial.sTextureMetalGlossMap = easing
  pbrMaterial.sTexturePackedMap = attr
  pbrMaterial.sTextureEmissiveMap = ext
  pbrMaterial.sTextureLightMap = align
  pbrMaterial.sTextureLightMapM = style
  pbrMaterial.sTextureLightMapDir = g
  pbrMaterial.sSpecularPBR = app
  pbrMaterial.sPanoramaPBR = env
  if (sh) {
    (pbrMaterial.uDiffuseSPH = new Float32Array(sh, 27))
  }
  pbrMaterial.uEnvironmentTransform = new THREE.Matrix4()
  if (material.alphaTest) {
    pbrMaterial.alphaTest = material.alphaTest
    pbrMaterial.defines.ALPHATEST = true
  }

  if (pbrMaterial.extensions.shaderTextureLOD) {
    pbrMaterial.defines.CUBEMAP = true
    pbrMaterial.uniforms.uTextureEnvironmentSpecularPBRTextureSize.value.set(256, 256)
  } else {
    pbrMaterial.defines.PANORAMA = true
    pbrMaterial.uniforms.uTextureEnvironmentSpecularPBRTextureSize.value.set(1024, 1024)
  }
  pbrMaterial.refreshOffsetRepeat()
  pbrMaterial.refreshOffsetRepeatDetail()


  return pbrMaterial;
};
export default PBRMaterial;
