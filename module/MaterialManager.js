import * as THREE from 'three';

var renderer = [
  'brown_leather',
  'fine_touch_leather 1',
  'yellow_leather'
];
var MaterialManager = function (opts) {
  this.scene = opts.scenes[2];
  this.scenes = opts.scenes;
  this.configurables = opts.configurables;
  this.initMaterials();
  this.initObjects();
  this.initSpecialProperties();
};
MaterialManager.prototype = {
  initSpecialProperties: function () {
    var _copied_material = this.getMaterial('Plant_ALB');
    if (_copied_material) {
      _copied_material.side = THREE.DoubleSide;
    }
    var material = this.getMaterial('glass');
    if (material) {
      material.side = THREE.DoubleSide;
      material.f0Factor = 1;
      material.depthWrite = false;
    }
    var mpars = this.getMaterial('palm_leaves');
    if (mpars) {
      mpars.side = THREE.DoubleSide;
      mpars.depthWrite = true;
      mpars.f0Factor = 1;
    }
    var size = this.getMaterial('tabwood');
    if (size) {
      size.f0Factor = 1;
    }
    _.each(this.scene.materials, function (material) {
      if (material.pbr) {
        material.f0Factor = 1;
      }
    });
    var materialParams = this.getMaterial('sansevieria');
    if (materialParams) {
      materialParams.side = THREE.DoubleSide;
    }
    var json = this.getMaterial('tripod_lamp');
    if (json) {
      json.side = THREE.DoubleSide;
    }
    var a = [
      'coffee_table_feet',
      'chair_feet',
      'door_handle'
    ];
    _.each(this.scenes, function (data) {
      _.each(data.materials, function (params) {
        if (!(!params.pbr || a.indexOf(params.name) > -1)) {
          params.defines.OCCLUDE_SPECULAR = true;
        }
      });
    });
    var info = this.getMaterial('pool_interior');
    if (info) {
      info.exposure = 1.25;
    }
    _.each(this.scenes[1].materials, function (options) {
      if (options.pbr) {
        options.exposure = 1.2;
      }
    }, this);
  },
  initMaterials: function () {
    this.materials = {};
    this.configurables.forEach(function (_ref33) {
      var name = _ref33.name;
      var child = this.scene.getObjectByName(name);
      var mat = this.getMaterialsForObject(child);
      var material = child.getObjectByName(_ref33.linkedObjects[0]).material;
      var a = material.uniforms.sTextureLightMap.value;
      var s = material.uniforms.sTextureLightMapM.value;
      var playEditorURL = material.uniforms.sTextureAOMap2.value;
      var floatColor = material.uniforms.sTextureNormalMap2.value;
      var partial_tree = child.getObjectByName('materials');
      this.materials[name] = mat;
      mat.forEach(function (options) {
        this.scene.materials[options.uuid] = options;
        if (a) {
          options.lightMap = a;
          options.lightMapM = s;
          options.defines.USE_LIGHTMAP = true;
        }
        if (playEditorURL) {
          options.uniforms.sTextureAOMap2.value = playEditorURL;
          options.defines.USE_AOMAP2 = true;
        }
        if (floatColor) {
          options.uniforms.sTextureNormalMap2.value = floatColor;
          options.defines.USE_NORMALMAP2 = true;
        }
        options.needsUpdate = true;
        if (renderer.indexOf(options.name) < 0) {
          options.ignoreDirLight = true;
        }
      }, this);
      if (renderer.indexOf(material.name) < 0) {
        material.ignoreDirLight = true;
      }
      partial_tree.traverse(function (oPresentationNode) {
        oPresentationNode.visible = false;
      });
    }, this);
  },
  initObjects: function () {
    this.objects = {};
    this.configurables.forEach(function (obj) {
      this.objects[obj.name] = [];
      obj.linkedObjects.forEach(function (storageName) {
        var value = this.getChildByName(this.scene.getObjectByName(obj.name), storageName);
        this.objects[obj.name] = this.objects[obj.name].concat(value);
      }, this);
    }, this);
  },
  setObjectMaterial: function (type, i) {
    var unloadedImgElement = this.materials[type.name][i];
    this.crossFadeMaterial(this.objects[type.name], unloadedImgElement);
  },
  crossFadeMaterial: function () {
    var ichart = new TWEEN.Tween();
    var data = { opacity: 0 };
    return function (n, m) {
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
      this.crossFade = ichart.reset(data).to({ opacity: 1 }, 300).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
        m.opacity = data.opacity;
      }).onComplete(init.bind(this)).onStop(init.bind(this)).start();
    };
  }(),
  getMaterial: function (name) {
    var material;
    var i = 0;
    for (; i < this.scenes.length && !(material = _.find(this.scenes[i].materials, function (pkgObject) {
        return pkgObject.name === name;
      })); i++) {
    }
    return material;
  },
  getMaterialsForObject: function (child) {
    if (child) {
      var e = child.getObjectByName('materials');
      if (e) {
        return _.map(e.children, function (panel) {
          return panel.children.length > 0 ? panel.children[0].material.clone() : panel.material.clone();
        });
      }
    }
  },
  getChildByName: function (node, name) {
    var folderPathClone = [];
    return node.traverse(function (key) {
      if (key.name === name) {
        folderPathClone.push(key);
      }
    }), folderPathClone;
  },
  getObjectsByName: function (keyword, name) {
    var folderPathClone = [];
    return keyword.traverse(function (key) {
      if (key.name === name) {
        folderPathClone.push(key);
      }
    }), folderPathClone;
  }
};
export default MaterialManager;
