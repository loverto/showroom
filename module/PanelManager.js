import Event from 'module/Event';
import Panel from 'module/Panel';
import Palette from 'module/Palette';
import LoaderUtils from 'module/LoaderUtils';
var PanelManager = function (app) {
  this.scene = new THREE.Scene();
  this.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -10000, 10000);
  this.width = this.camera.right - this.camera.left;
  this.height = this.camera.top - this.camera.bottom;
  this.size = {
    width: this.width,
    height: this.height
  };
  this.maxScale = 0.05 * this.width;
  this.scene.add(this.camera);
  this.camera.position.set(0, 0, 1000);
  this.camera.lookAt(this.scene.position);
  this.palettes = {};
  this.pickables = [];
  this.createPalettes(app.scene, app.configurables, app.vr);
  this.hideAllPalettes();
  this.createPanels(app.scene, app.configurables, app.vr);
  this.visible = false;
};
PanelManager.prototype = {
  createPanels: function (scene, count, cmp) {
    var r = LoaderUtils.getTexture('textures/corner-gradient.png');
    this.panels = {};
    _.each(count, function (p) {
      var objTemplate = scene.getObjectByName('ui_panel').clone();
      var panel = new Panel({
        referenceObject: objTemplate,
        data: p.panel_data,
        hudSize: {
          width: this.width,
          height: this.height
        },
        gradientMap: r,
        showGradient: !cmp
      });
      this.scene.add(panel);
      panel.visible = false;
      this.panels[p.name] = panel;
    }, this);
  },
  createPalettes: function (g, e, islongclick) {
    e.forEach(function (_ref33) {
      var name = _ref33.name;
      var level = g.getObjectByName(name);
      var adjustedLevel = this.getMaterialsForObject(level);
      var palette = new Palette({
        hudSize: this.size,
        maxScale: this.maxScale,
        materials: adjustedLevel,
        exposureBoost: !islongclick
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
        if (_.contains(this.currentPalette.children, options)) {
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
PanelManager.mixin(Event);
export default PanelManager;
