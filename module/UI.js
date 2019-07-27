import * as THREE from 'three';

import LoaderUtils from 'module/LoaderUtils';
import TweenUtils from 'module/TweenUtils';
import Event from 'module/Events';
import StrokeMaterial from 'module/StrokeMaterial';

window.innerWidth
window.innerHeight

var UI = (function (options) {
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
  /**
   * init VR说明
   */
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
  /**
   * 初始化行程
   */
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
  /**
   * 初始化高亮对象
   * @param object
   */
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
  /**
   * 清空高亮
   */
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
  /**
   * 在对象上
   */
  onEnterObject: function () {
    this.$container.addClass('hovering');
  },
  /**
   * 离开对象
   */
  onLeaveObject: function () {
    this.$container.removeClass('hovering');
  },
  /**
   * 初始化水印
   */
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
  /**
   * 冻结标记
   */
  freezeMarker: function () {
    this.marker.frozen = true;
  },
  /**
   * 解冻标记
   */
  unfreezeMarker: function () {
    this.marker.frozen = false;
  },
  /**
   * 更新标记
   * @param data
   */
  updateMarker: function (data) {
    if (data) {
      this.marker.position.x = data.x;
      this.marker.position.z = data.z;
    }
    if (this.marker.visible && !this.$container.hasClass('hovering')) {
      this.$container.addClass('hovering');
    }
  },
  /**
   * 显示标记
   */
  showMarker: function () {
    this.marker.visible = true;
    this.$container.addClass('hovering');
    if (this.vr && this.VRMoveInstructions) {
      this.VRMoveInstructions.visible = true;
    }
  },
  /**
   * 隐藏标记
   */
  hideMarker: function () {
    this.marker.visible = false;
    this.$container.removeClass('hovering');
  },
  /**
   * 淡入标记
   */
  fadeInMarker: function () {
    this.tweens.marker.reset(this.values).to({ markerOpacity: 1 }, 500).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
      this.marker.material.opacity = this.values.markerOpacity;
    }.bind(this)).start();
  },
  /**
   * 淡出标记
   */
  fadeOutMarker: function () {
    this.tweens.marker.reset(this.values).to({ markerOpacity: 0 }, 300).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
      this.marker.material.opacity = this.values.markerOpacity;
    }.bind(this)).start();
  },
  /**
   * 激活标记
   */
  activateMarker: function () {
    TweenUtils.tween(500, TWEEN.Easing.Quadratic.Out).onUpdate(function (i) {
      this.marker.material.opacity = 0.5 + 0.5 * (1 - i);
      this.marker.ripple.material.opacity = 1 - i;
      this.marker.ripple.scale.set(1 + i / 2, 1 + i / 2, 1 + i / 2);
    }.bind(this));
  },
  /**
   * 显示材料说明
   */
  showMaterialInstructions: function () {
    this.$materialInstructions.addClass('visible');
  },
  /**
   * 隐藏材料说明
   */
  hideMaterialInstructions: function () {
    this.$materialInstructions.addClass('fadeout');
    setTimeout(function () {
      this.$materialInstructions.removeClass('fadeout visible');
      this.$materialInstructions.hide();
    }.bind(this), 500);
  },
  /**
   * 显示查看说明
   */
  showLookInstructions: function () {
    this.$lookInstructions.addClass('visible');
  },
  /**
   * 隐藏查看说明
   */
  hideLookInstructions: function () {
    this.$lookInstructions.addClass('fadeout');
    setTimeout(function () {
      this.$lookInstructions.removeClass('fadeout visible');
      this.$lookInstructions.hide();
    }.bind(this), 500);
  },
  /**
   * 隐藏配置说明
   */
  hideConfigureInstructions: function () {
    if (this.vr && this.VRConfigureInstructions) {
      this.camera.remove(this.VRConfigureInstructions);
      this.VRConfigureInstructions = null;
    }
  },
  /**
   * 显示移动说明
   */
  showMoveInstructions: function () {
    this.$moveInstructions.addClass('visible');
  },
  /**
   * 隐藏移动指令
   */
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
  /**
   * 更新
   * @param type
   */
  update: function (type) {
    if (!this.marker.frozen) {
      this.updateMarker(type);
    }
  }
};
UI.mixin(Event);
export default UI;
