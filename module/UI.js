import * as THREE from 'three';

import LoaderUtils from 'module/LoaderUtils';
import TweenUtils from 'module/TweenUtils';
import Event from 'module/Event';
import StrokeMaterial from 'module/StrokeMaterial';
var UI = (window.innerWidth, window.innerHeight, function (options) {
  this.scene = options.scene;
  this.camera = options.camera;
  this.configurables = options.configurables;
  this.$container = options.container;
  this.vr = options.vr;
  this.$lookInstructions = $('[data-ref="look_instructions"]');
  this.$materialInstructions = $('[data-ref="material_instructions"]');
  this.$moveInstructions = $('[data-ref="move_instructions"]');
  this.tweens = { marker: new TWEEN.Tween() };
  this.values = { markerOpacity: 1 };
  this.initStrokes();
  this.initMarker();
  if (this.vr) {
    this.initVRInstructions();
  }
});
UI.prototype = {
  initVRInstructions: function () {
    this.VRMoveInstructions = this.scene.getObjectByName('move_instructions');
    if (this.VRMoveInstructions) {
      this.VRMoveInstructions.position.z = -0.75;
      this.VRMoveInstructions.position.y = -0.25;
      this.camera.add(this.VRMoveInstructions);
    }
    this.VRConfigureInstructions = this.scene.getObjectByName('configure_instructions');
    if (this.VRConfigureInstructions) {
      this.VRConfigureInstructions.position.z = -0.75;
      this.VRConfigureInstructions.position.y = -0.25;
      this.camera.add(this.VRConfigureInstructions);
    }
  },
  initStrokes: function () {
    this.configurables.forEach(function (_ref33) {
      var name = _ref33.name;
      var node = this.scene.getObjectByName(name);
      var source = this.scene.getObjectByName(node.name + '_stroke');
      var g = this.scene.getObjectByName('hovergroup_' + name);
      if (undefined === source) {
        return void console.warn('Missing stroke mesh for ' + name);
      }
      source.renderOrder = 1;
      if (g) {
        g.traverse(function (a) {
          a.renderOrder = 2;
        });
        node.group = g;
      } else {
        node.traverse(function (a) {
          a.renderOrder = 2;
        });
      }
      node.add(source);
      source.position.set(0, 0, 0);
      source.rotation.set(0, 0, 0);
      source.scale.set(1, 1, 1);
      source.material = new StrokeMaterial();
      source.material.objectScale = node.scale.x;
      node.stroke = source;
    }, this);
  },
  highlightObject: function (object) {
    object.stroke.visible = true;
    this.currentHighlighted = object;
    this.onEnterObject();
    if (this.vr) {
      if (this.VRConfigureInstructions) {
        this.VRConfigureInstructions.visible = true;
      }
      if (this.VRMoveInstructions) {
        this.VRMoveInstructions.visible = false;
      }
    }
  },
  clearHighlight: function () {
    if (this.currentHighlighted) {
      this.currentHighlighted.stroke.visible = false;
      this.currentHighlighted = null;
    }
    this.onLeaveObject();
    if (this.vr && this.VRConfigureInstructions) {
      this.VRConfigureInstructions.visible = false;
    }
  },
  onEnterObject: function () {
    this.$container.addClass('hovering');
  },
  onLeaveObject: function () {
    this.$container.removeClass('hovering');
  },
  initMarker: function () {
    this.marker = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4, 1, 1), new THREE.MeshBasicMaterial({
      color: 16777215,
      map: LoaderUtils.getTexture('textures/marker.png'),
      transparent: true,
      opacity: 0.5,
      depthWrite: false
    }));
    this.marker.material.map.anisotropy = 16;
    this.scene.add(this.marker);
    var h = this.marker.clone();
    h.material = new THREE.MeshBasicMaterial({
      transparent: true,
      map: LoaderUtils.getTexture('textures/circle.png'),
      depthWrite: false,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    this.marker.add(h);
    this.marker.ripple = h;
    this.marker.rotation.x = -Math.PI / 2;
    this.marker.position.setY(0.05);
    this.marker.visible = true;
    this.hideMarker();
  },
  freezeMarker: function () {
    this.marker.frozen = true;
  },
  unfreezeMarker: function () {
    this.marker.frozen = false;
  },
  updateMarker: function (data) {
    if (data) {
      this.marker.position.x = data.x;
      this.marker.position.z = data.z;
    }
    if (this.marker.visible && !this.$container.hasClass('hovering')) {
      this.$container.addClass('hovering');
    }
  },
  showMarker: function () {
    this.marker.visible = true;
    this.$container.addClass('hovering');
    if (this.vr && this.VRMoveInstructions) {
      this.VRMoveInstructions.visible = true;
    }
  },
  hideMarker: function () {
    this.marker.visible = false;
    this.$container.removeClass('hovering');
  },
  fadeInMarker: function () {
    this.tweens.marker.reset(this.values).to({ markerOpacity: 1 }, 500).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
      this.marker.material.opacity = this.values.markerOpacity;
    }.bind(this)).start();
  },
  fadeOutMarker: function () {
    this.tweens.marker.reset(this.values).to({ markerOpacity: 0 }, 300).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
      this.marker.material.opacity = this.values.markerOpacity;
    }.bind(this)).start();
  },
  activateMarker: function () {
    TweenUtils.tween(500, TWEEN.Easing.Quadratic.Out).onUpdate(function (i) {
      this.marker.material.opacity = 0.5 + 0.5 * (1 - i);
      this.marker.ripple.material.opacity = 1 - i;
      this.marker.ripple.scale.set(1 + i / 2, 1 + i / 2, 1 + i / 2);
    }.bind(this));
  },
  showMaterialInstructions: function () {
    this.$materialInstructions.addClass('visible');
  },
  hideMaterialInstructions: function () {
    this.$materialInstructions.addClass('fadeout');
    setTimeout(function () {
      this.$materialInstructions.removeClass('fadeout visible');
      this.$materialInstructions.hide();
    }.bind(this), 500);
  },
  showLookInstructions: function () {
    this.$lookInstructions.addClass('visible');
  },
  hideLookInstructions: function () {
    this.$lookInstructions.addClass('fadeout');
    setTimeout(function () {
      this.$lookInstructions.removeClass('fadeout visible');
      this.$lookInstructions.hide();
    }.bind(this), 500);
  },
  hideConfigureInstructions: function () {
    if (this.vr && this.VRConfigureInstructions) {
      this.camera.remove(this.VRConfigureInstructions);
      this.VRConfigureInstructions = null;
    }
  },
  showMoveInstructions: function () {
    this.$moveInstructions.addClass('visible');
  },
  hideMoveInstructions: function () {
    this.$moveInstructions.addClass('fadeout');
    setTimeout(function () {
      this.$moveInstructions.removeClass('fadeout visible');
      this.$moveInstructions.hide();
    }.bind(this), 500);
    if (this.vr && this.VRMoveInstructions) {
      this.camera.remove(this.VRMoveInstructions);
      this.VRMoveInstructions = null;
    }
  },
  update: function (type) {
    if (!this.marker.frozen) {
      this.updateMarker(type);
    }
  }
};
UI.mixin(Event);
export default UI;
