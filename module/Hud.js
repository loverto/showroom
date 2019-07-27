import * as THREE  from 'three';

import Event from 'module/Events';
import Panel from 'module/Panel';
import Palette from 'module/Palette';
import LoaderUtils from 'module/LoaderUtils';

/**
 * 皮肤
 * @param configOption
 * @constructor
 */
var Hud = function (configOption) {
  // 场景
  this.scene = new THREE.Scene();
  // 正交相机
  this.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -10000, 10000);
  // 宽
  this.width = this.camera.right - this.camera.left;
  // 高
  this.height = this.camera.top - this.camera.bottom;
  // 大小
  this.size = {
    width: this.width,
    height: this.height
  };
  // 最大比例
  this.maxScale = 0.05 * this.width;
  // 添加相机
  this.scene.add(this.camera);
  //设定相机位置
  this.camera.position.set(0, 0, 1000);
  // 相机查看的位置
  this.camera.lookAt(this.scene.position);
  // 调色板
  this.palettes = {};
  // 可挑选的
  this.pickables = [];
  // 创建调色板
  this.createPalettes(configOption.scene, configOption.configurables, configOption.vr);
  // 隐藏调色板
  this.hideAllPalettes();
  // 创建板子
  this.createPanels(configOption.scene, configOption.configurables, configOption.vr);
  // 是否可见
  this.visible = false;
};
Hud.prototype = {
  /**
   * 创建板子
   * @param scene
   * @param configurations
   * @param isVR
   */
  createPanels: function (scene, configurations, isVR) {
    // 角落渐变
    var cornerGradient = LoaderUtils.getTexture('textures/corner-gradient.png');
    this.panels = {};
    var self = this;
    _.each(configurations, function (configure) {
      var uiPanel = scene.getObjectByName('ui_panel').clone();
      var panel = new Panel({
        referenceObject: uiPanel,
        data: configure.panel_data,
        hudSize: {
          width: self.width,
          height: self.height
        },
        gradientMap: cornerGradient,
        showGradient: !isVR
      });
      self.scene.add(panel);
      panel.visible = false;
      self.panels[configure.name] = panel;
    });
  },
  /**
   * 创建调色板
   * @param scene
   * @param configurations
   * @param isVR
   */
  createPalettes: function (scene, configurations, isVR) {
    configurations.forEach(function (configure) {
      var name = configure.name;
      var level = scene.getObjectByName(name);
      var adjustedLevel = this.getMaterialsForObject(level);
      var palette = new Palette({
        hudSize: this.size,
        maxScale: this.maxScale,
        materials: adjustedLevel,
        exposureBoost: !isVR
      });
      this.palettes[name] = palette;
      this.scene.add(palette);
      palette.children.forEach(function (t) {
        this.pickables.push(t);
      }, this);
      palette.name = name + '_palette';
    }, this);
  },
  getMaterialsForObject: function (child) {
    if (child) {
      var e = child.getObjectByName('materials');
      if (e) {
        return _.map(e.children, function (keypair) {
          return keypair.material;
        });
      }
    }
  },
  showAllPalettes: function (t) {
    _.each(this.palettes, function (e) {
      e.show(t);
    }, this);
  },
  hideAllPalettes: function () {
    _.each(this.palettes, function (EmptyContentCollectionOverlay) {
      EmptyContentCollectionOverlay.hide();
    }, this);
    this.currentPalette = null;
  },
  showAllPanels: function () {
    _.each(this.panels, function (commonModal) {
      commonModal.show(false);
    }, this);
  },
  hideAllPanels: function () {
    _.each(this.panels, function (EmptyContentCollectionOverlay) {
      EmptyContentCollectionOverlay.hide();
    }, this);
  },
  setPanel: function (panel, e) {
    if (this.currentPanel) {
      this.currentPanel.fadeOut();
    }
    this.currentPanel = this.panels[panel];
    this.currentPanel.show(e);
  },
  setPalette: function (name, v) {
    var tryParseQRCode = function () {
      if (this.currentPalette) {
        this.currentPalette.show();
      }
    }.bind(this);
    if (this.currentPalette) {
      this.currentPalette.fadeOut();
    } else {
      this.hideAllPalettes();
    }
    this.currentPalette = this.palettes[name];
    if (v) {
      setTimeout(tryParseQRCode, v);
    } else {
      tryParseQRCode();
    }
  },
  getPickables: function () {
    return this.pickables;
  },
  show: function () {
    this.visible = true;
  },
  hide: function () {
    this.currentPalette.fadeOut(function () {
      this.visible = false;
      this.currentPalette = null;
    }.bind(this));
    this.currentPanel.fadeOut(function () {
      this.currentPanel = null;
    }.bind(this));
  },
  enter: function (obj) {
    var e = obj.tweenValue;
    obj.tween.reset(e).to({ scale: 1.2 * this.maxScale }, 250).easing(TWEEN.Easing.Quartic.Out).onUpdate(function () {
      obj.scale.set(e.scale, e.scale, e.scale);
    }).start();
    this.hoveredObject = obj;
  },
  leave: function (obj) {
    var e = obj.tweenValue;
    obj.tween.reset(e).to({ scale: this.maxScale }, 250).easing(TWEEN.Easing.Quartic.Out).onUpdate(function () {
      obj.scale.setScalar(e.scale);
    }).start();
    this.hoveredObject = null;
  },
  select: function () {
    var oRoster = new TWEEN.Tween();
    var from = {
      scale: 1,
      opacity: 0.35
    };
    return function (options) {
      if (!options.current) {
        if (_.includes(this.currentPalette.children, options)) {
          this.trigger('selectMaterial', this.currentPalette.children.indexOf(options));
        }
        oRoster.reset(from).to({
          scale: 1.3,
          opacity: 0
        }, 400).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
          options.ripple.scale.set(from.scale, from.scale, from.scale);
          options.ripple.material.opacity = from.opacity;
        }).onComplete(function () {
          from.scale = 1.05;
          from.opacity = 0.35;
        }).start();
      }
    };
  }(),
  render: function (renderer) {
    if (this.visible) {
      renderer.render(this.scene, this.camera);
    }
  },
  update: function (val) {
    if (this.hoveredObject) {
      this.hoveredObject.rotation.y += val.delta;
    }
  },
  setCurrent: function (name) {
    var change = this.currentPalette.children[name];
    this.currentPalette.children.forEach(function (change) {
      change.current = false;
      change.stroke.visible = false;
    });
    change.current = true;
    change.stroke.visible = true;
    this.currentPanel.setMaterial(name);
  },
  resize: function () {
    this.camera.left = window.innerWidth / -2;
    this.camera.right = window.innerWidth / 2;
    this.camera.top = window.innerHeight / 2;
    this.camera.bottom = window.innerHeight / -2;
    this.camera.updateProjectionMatrix();
    this.size.width = this.camera.right - this.camera.left;
    this.size.height = this.camera.top - this.camera.bottom;
    this.maxScale = this.size.width > this.size.height ? 0.05 * this.size.width : 0.05 * this.size.height;
    _.invoke(this.panels, 'resize', this.size);
    _.invoke(this.palettes, 'resize', this.size, this.maxScale);
  }
};
Hud.mixin(Event);
export default Hud;
