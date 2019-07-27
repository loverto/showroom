import * as THREE from 'three';

var renderer = [
  'brown_leather',
  'fine_touch_leather 1',
  'yellow_leather'
];
/**
 * 材料管理
 * @param opts
 * @constructor
 */
var MaterialManager = function (opts) {
  // 设置场景为室内场景
  this.scene = opts.scenes[2];
  // 所有场景
  this.scenes = opts.scenes;
  // 配置信息
  this.configurables = opts.configurables;
  // 初始化材料
  this.initMaterials();
  // 初始化对象
  this.initObjects();
  // 初始化特殊属性
  this.initSpecialProperties();
};
MaterialManager.prototype = {
  /**
   * 初始化特殊材料
   */
  initSpecialProperties: function () {
    // 植物
    var plantALB = this.getMaterial('Plant_ALB');
    if (plantALB) {
      plantALB.side = THREE.DoubleSide;
    }
    //玻璃
    var glass = this.getMaterial('glass');
    if (glass) {
      glass.side = THREE.DoubleSide;
      glass.f0Factor = 1;
      glass.depthWrite = false;
    }
    //棕榈树叶
    var palmLeaves = this.getMaterial('palm_leaves');
    if (palmLeaves) {
      palmLeaves.side = THREE.DoubleSide;
      palmLeaves.depthWrite = true;
      palmLeaves.f0Factor = 1;
    }
    // 标签木
    var tabwood = this.getMaterial('tabwood');
    if (tabwood) {
      tabwood.f0Factor = 1;
    }
    _.each(this.scene.materials, function (material) {
      if (material.pbr) {
        material.f0Factor = 1;
      }
    });
    // 虎尾兰
    var sansevieria = this.getMaterial('sansevieria');
    if (sansevieria) {
      sansevieria.side = THREE.DoubleSide;
    }
    // 三脚架灯
    var tripodLamp = this.getMaterial('tripod_lamp');
    if (tripodLamp) {
      tripodLamp.side = THREE.DoubleSide;
    }
    var a = [
      'coffee_table_feet',
      'chair_feet',
      'door_handle'
    ];
    _.each(this.scenes, function (scene) {
      _.each(scene.materials, function (material) {
        if (!(!material.pbr || a.indexOf(material.name) > -1)) {
          material.defines.OCCLUDE_SPECULAR = true;
        }
      });
    });
    // 游泳池内部
    var poolInterior = this.getMaterial('pool_interior');
    if (poolInterior) {
      poolInterior.exposure = 1.25;
    }
    // 遍历外部场景
    _.each(this.scenes[1].materials, function (material) {
      if (material.pbr) {
        // 设置曝光为1.2
        material.exposure = 1.2;
      }
    }, this);
  },
  /**
   * 初始化材料
   */
  initMaterials: function () {
    // 材料
    this.materials = {};
    // 配置信息
    this.configurables.forEach(function (config) {
      // 获取配置的对象名称
      var name = config.name;
      // 在场景中根据对象名称获取元素
      var child = this.scene.getObjectByName(name);
      // 获取获得对象的材料
      var objectMaterial = this.getMaterialsForObject(child);
      var linkedObjectMaterial = child.getObjectByName(config.linkedObjects[0]).material;
      var sTextureLightMapValue = linkedObjectMaterial.uniforms.sTextureLightMap.value;
      var sTextureLightMapMValue = linkedObjectMaterial.uniforms.sTextureLightMapM.value;
      var sTextureAOMap2Value = linkedObjectMaterial.uniforms.sTextureAOMap2.value;
      var sTextureNormalMap2Value = linkedObjectMaterial.uniforms.sTextureNormalMap2.value;
      var materials = child.getObjectByName('materials');
      this.materials[name] = objectMaterial;
      objectMaterial.forEach(function (options) {
        this.scene.materials[options.uuid] = options;
        if (sTextureLightMapValue) {
          options.lightMap = sTextureLightMapValue;
          options.lightMapM = sTextureLightMapMValue;
          options.defines.USE_LIGHTMAP = true;
        }
        if (sTextureAOMap2Value) {
          options.uniforms.sTextureAOMap2.value = sTextureAOMap2Value;
          options.defines.USE_AOMAP2 = true;
        }
        if (sTextureNormalMap2Value) {
          options.uniforms.sTextureNormalMap2.value = sTextureNormalMap2Value;
          options.defines.USE_NORMALMAP2 = true;
        }
        options.needsUpdate = true;
        if (renderer.indexOf(options.name) < 0) {
          options.ignoreDirLight = true;
        }
      }, this);
      if (renderer.indexOf(linkedObjectMaterial.name) < 0) {
        linkedObjectMaterial.ignoreDirLight = true;
      }
      materials.traverse(function (material) {
        material.visible = false;
      });
    }, this);
  },
  /**
   * 初始化对象
   */
  initObjects: function () {
    this.objects = {};
    this.configurables.forEach(function (config) {
      this.objects[config.name] = [];
      config.linkedObjects.forEach(function (linkedObject) {
        var value = this.getChildByName(this.scene.getObjectByName(config.name), linkedObject);
        this.objects[config.name] = this.objects[config.name].concat(value);
      }, this);
    }, this);
  },
  setObjectMaterial: function (type, i) {
    var unloadedImgElement = this.materials[type.name][i];
    this.crossFadeMaterial(this.objects[type.name], unloadedImgElement);
  },
  /**
   * 交叉淡化材料
   */
  crossFadeMaterial: function () {
    // 补间动画
    var tween = new TWEEN.Tween();
    var data = { opacity: 0 };
    return function (n, m) {
      //交叉淡入淡出
      if (this.crossFade) {

        return void this.crossFade.onComplete(function () {
          n.forEach(function (panel) {
            panel.material = this.currentFadingMaterial;
            panel.parent.remove(panel.materialClone);
            panel.materialClone = null;
          }, this);
          this.currentFadingMaterial.transparent = false;
          this.currentFadingMaterial.depthWrite = true;
          data.opacity = 0;
          this.crossFade = null;
          if (m !== this.currentFadingMaterial) {
            this.crossFadeMaterial(n, m);
          }
        }.bind(this));
      }
      this.currentFadingMaterial = m;
      n.forEach(function (output) {
        var a = output.clone();
        output.parent.add(a);
        output.materialClone = a;
        output.targetMaterial = m;
        a.material = m;
      });
      m.transparent = true;
      m.depthWrite = false;
      m.opacity = 0;
      var init = function () {
        n.forEach(function (object) {
          object.material = m;
          object.parent.remove(object.materialClone);
          object.materialClone = null;
        });
        data.opacity = 0;
        m.transparent = false;
        m.depthWrite = true;
        this.crossFade = null;
      };
      this.crossFade = tween.reset(data).to({ opacity: 1 }, 300).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
        m.opacity = data.opacity;
      }).onComplete(init.bind(this)).onStop(init.bind(this)).start();
    };
  }(),
  /**
   * 获得材料
   * @param name
   * @returns {*}
   */
  getMaterial: function (name) {
    var material;
    var i = 0;
    for (; i < this.scenes.length && !(material = _.find(this.scenes[i].materials, function (material) {
        return material.name === name;
      })); i++) {
    }
    return material;
  },
  /**
   * 获取对象的材料
   * @param child
   * @returns {Array}
   */
  getMaterialsForObject: function (child) {
    if (child) {
      var materials = child.getObjectByName('materials');
      if (materials) {
        return _.map(materials.children, function (material) {
          return material.children.length > 0 ? material.children[0].material.clone() : material.material.clone();
        });
      }
    }
  },
  /**
   * 获取自己点
   * @param node
   * @param name
   */
  getChildByName: function (node, name) {
    var folderPathClone = [];
    node.traverse(function (key) {
      if (key.name === name) {
        folderPathClone.push(key);
      }
    })
    return folderPathClone;
  },
  getObjectsByName: function (keyword, name) {
    var folderPathClone = [];
    keyword.traverse(function (key) {
      if (key.name === name) {
        folderPathClone.push(key);
      }
    })
    return folderPathClone;
  }
};
export default MaterialManager;
