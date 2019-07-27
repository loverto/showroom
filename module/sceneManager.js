import * as THREE from 'three';

import BaseSceneManager from 'module/BaseSceneManager';
import Event from 'module/Event';
import LoaderUtils from 'module/LoaderUtils';
import BaseSphereGeometry from 'module/BaseSphereGeometry';
import 'module/WebVRUtils';
import WebVRManager from 'module/WebVRManager';
import TweenUtils from 'module/TweenUtils';
import UI from 'module/UI';
import PanelManager from 'module/PanelManager';
import PerspectiveCamera from 'module/VRPerspectiveCamera';
import Water from 'module/Water';
import InputManager from 'module/InputManager';
import ScenePicker from 'module/ScenePicker';
import MaterialManager from 'module/MaterialManager';
import SeaMaterial from 'module/SeaMaterial';
import SeaNoise from 'module/SeaNoise';
import TransitionMaterial from 'module/TransitionMaterial';
import Configurables from 'module/Configurables';
import Config from 'module/Config';

function r(context, f) {
  var folderPathClone = [];
  context.traverse(function (key) {
    if (key.name === f) {
      folderPathClone.push(key);
    }
  })
  return folderPathClone;
}
function isString(object) {
  return _.contains(_.map(Configurables, function (engineDiscovery) {
    return engineDiscovery.name;
  }), object.name);
}
function negate(c, a, p, e) {
  return {
    x: (c.pageX - a.x) / p * 2 - 1,
    y: 1 - (c.pageY - a.y) / e * 2
  };
}

var sceneManager = function (data) {
  BaseSceneManager.call(this, data);
  this.mode = data.vr ? sceneManager.VR_MODE : sceneManager.DEFAULT_MODE;
  this.vrDisplay = data.vrDisplay;
};
sceneManager.inherit(BaseSceneManager, {
  init: function () {
    var self = this;
    if (this.mode === sceneManager.VR_MODE) {
      this.initWebVR(this.vrDisplay);
    }
    this.$container = $(document.body);
    this.updateContainerInfo();
    $(window).on('resize', function () {
      this.updateContainerInfo();
      if (this.mode === sceneManager.DEFAULT_MODE) {
        this.hud.resize();
      }
    }.bind(this));
    this.startScene = this.scenes[0];
    this.exteriorScene = this.scenes[1];
    this.interiorScene = this.scenes[2];
    this.enteredRoom = false;
    this.renderer.autoClear = false;
    this.scene.updateMatrixWorld(true);
    this.initMaterialManager();
    this.initCamera();
    this.initUI();
    this.initObjectPickers();
    this.initObjectsRenderOrder();
    this.initMaterialsExposure();
    this.initPool();
    this.initSeaHighlights();
    this.initFlares();
    this.initDirLight();
    this.initHoverScene();
    this.initCameraScene();
    if (Config.DEBUG_KEYS) {
      this.initDebugKeyEvents();
    }
    if (this.mode === sceneManager.VR_MODE) {
      this.initInstructions();
      this.initInputManager();
      this.handleVREvents();
      this.initCrosshair();
      this.initTransitionScene();
    } else {
      if (this.mode === sceneManager.DEFAULT_MODE) {
        this.handleNonVREvents();
      }
    }
    if (this.config.fps) {
      this.initFPSCounter();
    }
    if (this.config.logCalls) {
      this.initDrawCallsCounter();
    }
    this.handleHudEvents();
    this.handleCameraEvents();
    $(window).trigger('resize');
    _.defer(this.preRenderHUD.bind(this));
  },
  initInstructions: function () {
    this.startInstructions = this.startScene.getObjectByName('instructions');
    if (this.startInstructions) {
      this.startInstructions.position.z = -0.75;
      this.camera.add(this.startInstructions);
    }
  },
  updateInstructions: function (a) {
    var notAvailableOpacity = 0.25 + 0.75 * Math.abs(Math.sin(3 * a.elapsed));
    if (!this.startInstructionsCTA) {
      this.startInstructionsCTA = this.startInstructions.getObjectByName('cta');
    }
    this.startInstructionsCTA.material.opacity = notAvailableOpacity;
  },
  initDirLight: function () {
    this.dirLight = this.interiorScene.getObjectByName('Directional Light');
    _.each([
      this.interiorScene,
      this.exteriorScene
    ], function (data) {
      _.each(data.materials, function (material) {
        if (material.pbr && !material.ignoreDirLight) {
          material.defines.USE_DIR_LIGHT = true;
          material.uniforms.lightColor.value.setRGB(1, 1, 1);
          material.needsUpdate = true;
        }
      });
    });
  },
  initHoverScene: function () {
    this.hoverScene = new THREE.Scene();
  },
  initCameraScene: function () {
    this.cameraScene = new THREE.Scene();
    this.cameraScene.add(this.camera);
  },
  initDebugKeyEvents: function () {
    var gotoNewOfflinePage = function (saveNotifs) {
      _.each(this.scenes, function (data) {
        _.each(data.materials, function (loadingAnimationService) {
          if (loadingAnimationService.pbr) {
            saveNotifs(loadingAnimationService.uniforms.uMode);
          }
        });
      });
      _.each(this.hud.palettes, function (e) {
        e.children.forEach(function (proxy) {
          saveNotifs(proxy.material.uniforms.uMode);
        }, this);
      }, this);
    }.bind(this);
    $(document).on('keypress', function (event) {
      if (99 == event.keyCode) {
        gotoNewOfflinePage(function (select_ele) {
          if (6 == select_ele.value) {
            select_ele.value = 1;
          } else {
            select_ele.value++;
          }
        });
      } else {
        if (109 == event.keyCode) {
          gotoNewOfflinePage(function (select_ele) {
            select_ele.value = 0;
          });
        } else {
          if (116 == event.keyCode) {
            if (this.ratio) {
              this.ratio += 1;
              if (this.ratio > 2) {
                this.ratio = 1;
              }
            } else {
              this.ratio = 1;
            }
            this.renderer.setPixelRatio(this.ratio);
          } else {
            if (110 == event.keyCode) {
              gotoNewOfflinePage(function (select_ele) {
                if (select_ele.value >= 0) {
                  select_ele.value = -1;
                } else {
                  select_ele.value = 0;
                }
              });
            } else {
              if (104 == event.keyCode) {
                _.each([
                  this.interiorScene,
                  this.exteriorScene
                ], function (data) {
                  _.each(data.materials, function (model) {
                    if (model.pbr) {
                      if (0 == model.uniforms.highlights.value) {
                        model.uniforms.highlights.value = 1;
                      } else {
                        model.uniforms.highlights.value = 0;
                      }
                    }
                  });
                });
              } else {
                if (80 === event.keyCode) {
                  this.captureFrame(5000, 2000);
                } else {
                  if (115 === event.keyCode) {
                    $(this.counter).toggle();
                    $(this.dcCounter).toggle();
                  }
                }
              }
            }
          }
        }
      }
    }.bind(this));
  },
  initFPSCounter: function () {
    var element = $(this.counter);
    element.css('left', '20px');
    element.css('padding', '3px');
    element.css('font-size', '2em');
    element.css('background-color', 'black');
  },
  initDrawCallsCounter: function () {
    var $panzoom = $('<div id=\'dc\'></div>');
    $('body').append($panzoom);
    $panzoom.css('position', 'absolute').css('display', 'block !important').css('color', 'yellow').css('top', '60px').css('left', '20px').css('padding', '3px').css('font-size', '2em').css('background-color', 'black').css('z-index', '999999');
    this.dcCounter = $panzoom[0];
  },
  initInputManager: function () {
    this.inputManager = new InputManager();
  },
  start: function () {
    this.camera.enableControls();
    if (this.mode !== sceneManager.DEFAULT_MODE || window.isMobile) {
      if (this.mode === sceneManager.DEFAULT_MODE && window.isMobile) {
        this.ui.showMoveInstructions();
      }
    } else {
      this.ui.showLookInstructions();
    }
    BaseSceneManager.prototype.start.call(this);
  },
  enterVR: function () {
    if (this.camera.vrControls.hasInput()) {
      this.effect.requestPresent();
    }
  },
  handleVREvents: function () {
    this.inputManager.on('press', function () {
      if (this.enteredRoom) {
        if (this.hud.visible && this.hudPicker.hitTest()) {
          this.hudPicker.onTap();
        } else {
          if (this.scenePicker.hitTest()) {
            this.scenePicker.onTap();
          }
        }
      } else {
        this.fadeOut(750).onComplete(function () {
          this.camera.moveTo(0, 0);
          this.enteredRoom = true;
          this.fadeIn(2000);
          this.camera.remove(this.startInstructions);
        }.bind(this));
      }
    }.bind(this));
  },
  handleNonVREvents: function () {
    var _takingTooLongTimeout = null;
    return function () {
      if (!window.isMobile) {
        $('canvas').on('mousemove', function (expr) {
          var value = negate(expr, this.containerOffset, this.containerWidth, this.containerHeight);
          this.scenePicker.updateMouseCoords(value);
          this.hudPicker.updateMouseCoords(value);
        }.bind(this));
      }
      $('canvas').on('tap', function (left) {
        if (window.isMobile) {
          var n = negate(left, this.containerOffset, this.containerWidth, this.containerHeight);
          this.scenePicker.updateMouseCoords(n);
          this.hudPicker.updateMouseCoords(n);
        }
        var moved = null;
        var allBox = null;
        if (!(this.camera.moving || this.camera.rotating || !this.camera.enabled)) {
          moved = this.hud.visible && this.hudPicker.hitTest();
          allBox = this.scenePicker.hitTest();
        }
        if (window.isMobile && !moved && allBox && 'floor' === allBox.name) {
          this.ui.updateMarker(this.scenePicker.getPoint());
          this.ui.showMarker();
          if (_takingTooLongTimeout) {
            clearTimeout(_takingTooLongTimeout);
          }
          _takingTooLongTimeout = setTimeout(function () {
            this.ui.hideMarker();
            _takingTooLongTimeout = null;
          }.bind(this), 2000);
        }
        if (moved) {
          this.hudPicker.onTap();
        } else {
          if (allBox) {
            this.scenePicker.onTap();
          }
        }
      }.bind(this));
    };
  }(),
  handleHudEvents: function () {
    this.hud.on('selectMaterial', function (module) {
      this.materialManager.setObjectMaterial(this.currentSelected, module);
      this.hud.setCurrent(module);
      if (this.materialInstructionsVisible) {
        this.ui.hideMaterialInstructions();
        this.materialInstructionsVisible = false;
      }
    }, this);
  },
  handleCameraEvents: function () {
    this.camera.on('startMove', function () {
      this.ui.freezeMarker();
    }, this);
    this.camera.on('endMove', function () {
      this.ui.unfreezeMarker();
    }, this);
    this.camera.on('firstMove', function () {
      this.ui.hideMoveInstructions();
    }, this);
    this.camera.on('firstRotate', function () {
      this.ui.hideLookInstructions();
    }, this);
  },
  updateContainerInfo: function () {
    this.containerOffset = {
      x: this.$container.offset().left,
      y: this.$container.offset().top
    };
    this.containerWidth = this.$container.width();
    this.containerHeight = this.$container.height();
  },
  initMaterialManager: function () {
    this.materialManager = new MaterialManager({
      scenes: this.scenes,
      configurables: Configurables
    });
  },
  initCamera: function () {
    var modifier = this.camera = new PerspectiveCamera({
      vr: this.mode === sceneManager.VR_MODE,
      states: this.scene.getObjectByName('cameras').children,
      $container: this.$container
    });
    this.scene.add(modifier);
    modifier.enabled = true;
    if (this.mode === sceneManager.VR_MODE) {
      this.camera.vrControls.setVRDisplay(this.vrDisplay);
    }
  },
  initTransitionScene: function () {
    var object = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new TransitionMaterial());
    object.material.uniforms.diffuse.value = new THREE.Color(0);
    object.material.uniforms.opacity.value = 0;
    object.material.transparent = true;
    object.frustumCulled = false;
    var highlightEffect = new THREE.Scene();
    highlightEffect.add(object);
    this.transitionQuad = object;
    this.transitionScene = highlightEffect;
  },
  fadeOut: function (t) {
    return TweenUtils.tween(t || 500).onUpdate(function (ieOpacity) {
      this.transitionQuad.material.opacity = ieOpacity;
    }.bind(this));
  },
  fadeIn: function (t) {
    return TweenUtils.tween(t || 500).onUpdate(function (i) {
      this.transitionQuad.material.opacity = 1 - i;
    }.bind(this));
  },
  /**
   * init对象选择器
   */
  initObjectPickers: function () {
    var t = [
      'floor',
      'walls',
      'armchairs',
      'colliders'
    ];
    var e = [];
    Configurables.forEach(function (e) {
      t.push(e.name);
    });
    var self =this ;
    _.each(t, function (o) {
      var options = r(self.scene, o);
      _.each(options, function (spUtils) {
        spUtils.traverse(function (t) {
          e.push(t);
        }.bind(self));
      }, this);
    }, this);
    _.each(this.scene.getObjectByName('colliders').children, function (object) {
      object.visible = true;
      object.material.visible = false;
    });
    this.scenePicker = new ScenePicker({
      camera: this.camera,
      checkFlag: true,
      vr: this.mode === sceneManager.VR_MODE
    });
    this.scenePicker.add(e);
    this.hudPicker = new ScenePicker({
      camera: this.hud.camera,
      checkFlag: true,
      vr: this.mode === sceneManager.VR_MODE
    });
    if (this.mode === sceneManager.VR_MODE) {
      this.hudPicker.camera = this.camera;
    }
    this.hudPicker.add(this.hud.getPickables());
    this.handlePickerEvents();
  },
  handlePickerEvents: function () {
    this.scenePicker.on('pick', function (obj, pos) {
      var node;
      if ('floor' === obj.name) {
        if (this.VREnabled && !this.warping) {
          this.warping = true;
          this.fadeOut(200).onComplete(function () {
            this.camera.moveTo(pos.x, pos.z, 1000);
            this.fadeIn(200).onComplete(function () {
              this.warping = false;
            }.bind(this));
          }.bind(this));
          this.ui.hideMoveInstructions();
        } else {
          if (!this.VREnabled) {
            this.camera.moveTo(pos.x, pos.z, 1000);
          }
        }
        this.$container.removeClass('hovering');
        this.ui.activateMarker();
        if (this.currentSelected) {
          this.deselectObject(this.currentSelected);
        }
      } else {
        if (isString(obj)) {
          node = obj;
        } else {
          if (isString(obj.parent)) {
            node = obj.parent;
          }
        }
      }
      if (node && node !== this.currentSelected) {
        this.selectObject(node);
      }
    }, this);
    this.scenePicker.on('enter', function (node) {
      if (!(this.VREnabled && !this.enteredRoom)) {
        if (!('floor' !== node.name || window.isMobile)) {
          this.ui.showMarker();
        }
        if (isString(node) && node !== this.currentSelected) {
          this.highlightObject(node);
        } else {
          if (isString(node.parent) && node.parent !== this.currentSelected) {
            this.highlightObject(node.parent);
          }
        }
      }
    }, this);
    this.scenePicker.on('leave', function (value) {
      if (!(this.VREnabled && !this.enteredRoom)) {
        if (!('floor' !== value.name || window.isMobile)) {
          this.ui.hideMarker();
        }
        if (isString(value) && value !== this.currentSelected) {
          this.clearHighlight(value);
        } else {
          if (isString(value.parent) && value.parent !== this.currentSelected) {
            this.clearHighlight(value.parent);
          }
        }
      }
    }, this);
    this.hudPicker.on('pick', function (name) {
      this.hud.select(name);
    }, this);
    this.hudPicker.on('enter', function (name) {
      if (!window.isMobile) {
        this.hud.enter(name);
        this.ui.onEnterObject();
        this.ui.hideMarker();
      }
    }, this);
    this.hudPicker.on('leave', function (name) {
      if (!window.isMobile) {
        this.hud.leave(name);
        this.ui.onLeaveObject();
      }
    }, this);
  },
  initUI: function () {
    this.ui = new UI({
      container: this.$container,
      scene: this.scene,
      camera: this.camera,
      configurables: Configurables,
      vr: this.mode === sceneManager.VR_MODE
    });
    this.hud = new PanelManager({
      scene: this.scene,
      configurables: Configurables,
      vr: this.mode === sceneManager.VR_MODE
    });
  },
  initWebVR: function (i) {
    this.effect = new WebVRManager(this.renderer);
    this.effect.autoSubmitFrame = false;
    this.VREnabled = false;
    this.effect.setVRDisplay(i);
  },
  selectObject: function (event) {
    var id = event.name;
    var eventHandler = function (index) {
      return _.find(Configurables, function (a) {
        return a.name === index;
      });
    };
    if (!(window.isMobile && this.isSelecting)) {
      this.isSelecting = true;
      setTimeout(function () {
        this.isSelecting = false;
      }.bind(this), 1500);
      this.clearHighlight(event);
      this.currentSelected = event;
      this.hud.show();
      this.hud.setPanel(id);
      if (window.isMobile) {
        this.selectObjectMobile(id);
      } else {
        if (this.VREnabled) {
          this.selectObjectVR(id);
        } else {
          this.camera.setOrbitDistances(0, 1 / 0);
          this.camera.setState(id).onComplete(function () {
            this.hud.setPalette(id);
            this.camera.setOrbitDistances(eventHandler(id).minDistance, eventHandler(id).maxDistance);
            if (this.materialHelpDisplayed) {
              if (this.materialInstructionsVisible) {
                this.ui.hideMaterialInstructions();
                this.materialInstructionsVisible = false;
              }
            } else {
              this.materialHelpDisplayed = true;
              this.ui.showMaterialInstructions();
              this.materialInstructionsVisible = true;
            }
          }.bind(this));
        }
      }
      if (this.mode !== sceneManager.VR_MODE && !window.isMobile && this.hud.currentPalette) {
        this.hud.currentPalette.fadeOut();
      }
    }
  },
  selectObjectMobile: function (name) {
    this.hud.setPalette(name, 1000);
    setTimeout(function () {
      if (this.materialHelpDisplayed) {
        if (this.materialInstructionsVisible) {
          this.ui.hideMaterialInstructions();
          this.materialInstructionsVisible = false;
        }
      } else {
        this.materialHelpDisplayed = true;
        this.ui.showMaterialInstructions();
        this.materialInstructionsVisible = true;
      }
    }.bind(this), 1000);
    this.ui.hideMoveInstructions();
  },
  selectObjectVR: function (name) {
    var node = this.hud.palettes[name];
    var readersLength = node.children.length;
    var x = -0.2 * (readersLength - 1) / 2;
    this.hud.maxScale = 0.07;
    this.hud.setPalette(name, 1000);
    var self = this;
    _.each(node.children, function (target, tile_size) {
      target.position.set(0.2 * tile_size + x, 0, 0);
      target.scale.set(0, 0, 0);
      target.tweenValue.scale = self.hud.maxScale;
      target.rotation.set(0, 0, 0);
      self.scene.materials[target.material.uuid] = target.material;
    }, this);
    node.position.set(0, -0.25, -0.6);
    node.rotation.set(0, 0, 0);
    node.scale.set(1, 1, 1);
    this.camera.add(node);
    this.camera.updateMatrixWorld(true);
    node.getWorldPosition(node.position);
    node.getWorldQuaternion(node.quaternion);
    this.camera.remove(node);
    var q = node.quaternion;
    var _eye = new THREE.Vector3(0, 1, 0);
    var rotateStart = _eye.clone().applyQuaternion(q).normalize();
    var correctionAngle = _eye.angleTo(rotateStart);
    var axis = new THREE.Vector3();
    axis.crossVectors(rotateStart, _eye).normalize();
    var quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(axis, correctionAngle).normalize();
    node.quaternion.multiplyQuaternions(quaternion, q);
    this.hoverScene.add(node);
    var camera = this.hud.panels[name];
    camera.position.set(0.25, -0.1, -0.55);
    camera.rotation.set(0, 0, 0);
    camera.scale.set(0.00085, 0.00085, 0.00085);
    this.camera.add(camera);
    this.camera.updateMatrixWorld(true);
    camera.getWorldPosition(camera.position);
    camera.getWorldQuaternion(camera.quaternion);
    this.camera.remove(camera);
    this.hoverScene.add(camera);
    q = camera.quaternion;
    var moveDirection = _eye.clone().applyQuaternion(q).normalize();
    correctionAngle = _eye.angleTo(moveDirection);
    axis = new THREE.Vector3();
    axis.crossVectors(moveDirection, _eye).normalize();
    quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(axis, correctionAngle).normalize();
    camera.quaternion.multiplyQuaternions(quaternion, q);
    this.ui.hideConfigureInstructions();
  },
  deselectObject: function (object) {
    this.hud.hide();
    this.currentSelected = null;
    if (this.materialInstructionsVisible) {
      this.ui.hideMaterialInstructions();
      this.materialInstructionsVisible = false;
    }
  },
  highlightObject: function (options) {
    var p = options.group ? options.group : options;
    if (!p.worldPosition) {
      p.worldPosition = new THREE.Vector3();
    }
    if (!p.previousPosition) {
      p.previousPosition = new THREE.Vector3();
    }
    this.ui.highlightObject(options);
    p.getWorldPosition(p.worldPosition);
    p.previousPosition.copy(p.position);
    p.previousParent = p.parent;
    this.hoverScene.add(p);
    p.position.copy(p.worldPosition);
  },
  clearHighlight: function (options) {
    var option = options.group ? options.group : options;
    this.ui.clearHighlight();
    option.previousParent.add(option);
    option.position.copy(option.previousPosition);
  },
  initObjectsRenderOrder: function () {
    var _object = this.interiorScene.getObjectByName('glassrail');
    if (_object) {
      _object.renderOrder = 50;
    }
    var _line = this.interiorScene.getObjectByName('glasses');
    if (_line) {
      _line.renderOrder = 100;
    }
    var _face = this.interiorScene.getObjectByName('sea');
    if (_face) {
      _face.renderOrder = 100;
    }
    var mesh = this.interiorScene.getObjectByName('sky');
    if (mesh) {
      mesh.renderOrder = 95;
      mesh.visible = true;
    }
    var partial_tree = this.interiorScene.getObjectByName('clouds');
    if (partial_tree) {
      partial_tree.traverse(function (a) {
        a.renderOrder = 98;
      });
    }
    var node_res = this.interiorScene.getObjectByName('sun');
    if (node_res) {
      node_res.traverse(function (a) {
        a.renderOrder = 97;
      });
    }
    var a = this.interiorScene.getObjectByName('sun_and_clouds_merged');
    if (a) {
      a.renderOrder = 97;
    }
    var object = this.interiorScene.getObjectByName('sea_highlight');
    if (object) {
      object.renderOrder = 101;
    }
    var exTree = this.interiorScene.getObjectByName('islands');
    if (exTree) {
      exTree.traverse(function (a) {
        a.renderOrder = 102;
      });
    }
    var b = this.interiorScene.getObjectByName('islands_merged');
    if (b) {
      b.renderOrder = 102;
    }
    var _sprite = this.interiorScene.getObjectByName('sea_highlights2');
    if (_sprite) {
      _sprite.renderOrder = 103;
    }
  },
  initCrosshair: function () {
    this.crosshair = new BaseSphereGeometry();
    this.crosshair.fadeOut();
    this.camera.add(this.crosshair);
  },
  initMaterialsExposure: function () {
    this.scene.getObjectByName('feet').material.exposure = 0.3;
  },
  initFlares: function () {
    this.flares = [];
    var spots = this.interiorScene.getObjectByName('spots');
    var flareTexture = LoaderUtils.getTexture('textures/flare.png');
    if (spots) {
      spots.children.forEach(function (camera) {
        var material = new THREE.PointsMaterial({
          size: 1.5,
          map: flareTexture,
          transparent: true,
          depthWrite: false,
          depthTest: false,
          blending: THREE.AdditiveBlending,
          opacity: 0.35
        });
        let geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3());
        geometry.morphAttributes = {};
        var mesh = new THREE.Points(geometry, material);
        camera.getWorldPosition(mesh.position);
        this.flares.push(mesh);
        this.interiorScene.add(mesh);
      }, this);
    }
  },
  initPool: function () {
    this.water = new Water({
      light: this.scene.getObjectByName('ocean light'),
      camera: this.camera,
      renderer: this.renderer,
      object: this.exteriorScene.getObjectByName('pool_water'),
      transparent: true,
      opacity: 0.6
    });
    this.exteriorScene.getObjectByName('pool_water').visible = false;
    this.exteriorScene.add(this.water);
  },
  initSeaHighlights: function () {
    var self = this.interiorScene.getObjectByName('sea_highlights2');
    var m = self.material;
    var map = m.map;
    this.noise = new SeaNoise();
    self.material = new SeaMaterial();
    self.material.map = map;
    self.material.uniforms.offsetRepeat.value.set(map.offset.x, map.offset.y, map.repeat.x, map.repeat.y);
    self.material.transparent = m.transparent;
    self.material.noiseMap = this.noise.target.texture;
    this.seaHighlights = self;
  },
  updateSeaHighlights: function (writeBuffer) {
    this.seaHighlights.material.updateUniforms(writeBuffer);
  },
  updateDirLight: function () {
    var tempVS = new THREE.Vector3();
    var directionVS = new THREE.Vector3();
    return function () {
      directionVS.setFromMatrixPosition(this.dirLight.matrixWorld);
      tempVS.setFromMatrixPosition(this.dirLight.target.matrixWorld);
      directionVS.sub(tempVS);
      directionVS.transformDirection(this.camera.matrixWorldInverse);
      _.each([
        this.interiorScene,
        this.exteriorScene
      ], function (data) {
        _.each(data.materials, function (loadingAnimationService) {
          if (loadingAnimationService.pbr) {
            loadingAnimationService.uniforms.viewLightDir.value.copy(directionVS);
          }
        });
      });
    };
  }(),
  updateCrosshair: function () {
    var p = new THREE.Vector3();
    var vector = new THREE.Vector3();
    var matrix = new THREE.Vector2();
    var q = new THREE.Vector2();
    return function () {
      if (this.VREnabled) {
        var i = this.hud.currentPalette;
        if (this.camera.updateMatrixWorld(true), this.crosshair.getWorldPosition(vector), vector.project(this.camera), matrix.set(vector.x, vector.y), i) {
          var bMin = 1 / 0;
          i.children.forEach(function (object) {
            object.getWorldPosition(p);
            p.project(this.camera);
            q.set(p.x, p.y);
            var b = matrix.distanceTo(q);
            if (b < bMin) {
              bMin = b;
            }
          }, this);
          if (bMin > 0.5) {
            this.crosshair.fadeOut();
            this.ui.fadeInMarker();
          } else {
            this.crosshair.fadeIn();
            this.ui.fadeOutMarker();
          }
        }
      }
    };
  }(),
  updateUI: function () {
    if (window.isMobile) {
      return void this.scenePicker.hitTest(true);
    }
    if (!(this.camera.moving || this.camera.rotating || !this.camera.enabled)) {
      if (this.hud.visible) {
        if (this.hudPicker.hitTest()) {
          this.scenePicker.clearState();
          this.ui.onEnterObject();
          if (!this.camera.vr) {
            this.camera.orbitControls.enabled = false;
          }
        } else {
          this.scenePicker.hitTest();
          if (this.camera.mode === PerspectiveCamera.ORBIT_MODE) {
            this.camera.orbitControls.enabled = true;
          }
        }
      } else {
        this.scenePicker.hitTest();
      }
    }
    if (this.camera.rotating) {
      this.scenePicker.clearState();
      this.hudPicker.clearState();
      if (this.ui.currentHighlighted) {
        this.clearHighlight(this.ui.currentHighlighted);
      }
    }
    this.ui.update(this.scenePicker.getPoint());
  },
  updateFlares: function () {
    var ray = new THREE.Raycaster();
    var t = new THREE.Vector3();
    var point = new THREE.Vector3();
    var pipelets = [
      'walls',
      'sofa_main',
      'laptop',
      'suspended_lamp',
      'table_objects_merged',
      'bottle',
      'seat_main_left'
    ];
    var targets = [];
    return function () {
      if (0 === targets.length) {
        pipelets.forEach(function (name) {
          var username = this.interiorScene.getObjectByName(name);
          if (username) {
            targets.push(username);
          }
        }, this);
      }
      this.camera.getWorldPosition(point);
      this.flares.forEach(function (p, exports) {
        t.subVectors(p.position, point).normalize();
        ray.set(point, t);
        if (ray.intersectObjects(targets).length > 1) {
          p.visible = false;
        } else {
          p.visible = true;
        }
      }, this);
    };
  }(),
  update: function (time) {
    if (!(this.VREnabled || this.mode !== sceneManager.VR_MODE)) {
      this.effect.requestPresent();
      this.VREnabled = true;
    }
    if (this.camera.enabled) {
      this.camera.update();
    }
    if (this.startInstructions && !this.enteredRoom) {
      this.updateInstructions(time);
    }
    if (this.flares) {
      this.updateFlares();
    }
    this.updateUI();
    this.hud.update(time);
    this.water.update(time);
    this.updateSeaHighlights(time);
    this.updateDirLight();
    this.updateCrosshair();
    if (this.inputManager) {
      this.inputManager.update();
    }
    BaseSceneManager.prototype.update.call(this, time);
  },
  preRenderHUD: function () {
    this.renderer.clear();
    this.hud.visible = true;
    this.hud.showAllPalettes(false);
    this.hud.showAllPanels();
    this.hud.render(this.renderer);
    this.hud.visible = false;
    this.hud.hideAllPalettes();
    this.hud.hideAllPanels();
  },
  preRenderAll: function () {
    this.renderer.clear();
    this.scene.traverse(function (object) {
      object.frustumCulled = false;
      object.wasVisible = object.visible;
      object.visible = true;
    });
    this.hud.visible = true;
    this.hud.showAllPalettes(false);
    this.hud.showAllPanels();
    this.water.render();
    this.renderScene(this.scene, this.camera);
    this.hud.render(this.renderer);
    this.hud.visible = false;
    this.hud.hideAllPalettes();
    this.hud.hideAllPanels();
    this.scene.traverse(function (object) {
      object.frustumCulled = true;
      object.visible = object.wasVisible;
      delete object.wasVisible;
    });
  },
  render: function () {
    var totalPlayers = 0;
    var mapFragmentAndProps = function () {
      if (this.config.logCalls) {
        totalPlayers = totalPlayers + this.renderer.info.render.calls;
      }
    }.bind(this);
    this.renderer.clear();
    this.noise.render(this.renderer);
    if (this.mode === sceneManager.VR_MODE) {
      if (this.enteredRoom) {
        this.effect.render(this.exteriorScene, this.camera);
        this.effect.render(this.interiorScene, this.camera);
        if (this.hoverScene.children.length > 0) {
          this.effect.render(this.hoverScene, this.camera);
        }
      } else {
        this.effect.render(this.startScene, this.camera);
      }
      this.effect.render(this.cameraScene, this.camera);
      this.effect.render(this.transitionScene, this.camera);
      this.effect.submitFrame();
    } else {
      if (this.mode === sceneManager.DEFAULT_MODE) {
        this.renderScene(this.interiorScene, this.camera);
        mapFragmentAndProps();
        this.renderScene(this.exteriorScene, this.camera);
        mapFragmentAndProps();
        if (this.hoverScene.children.length > 0) {
          this.renderScene(this.hoverScene, this.camera);
          mapFragmentAndProps();
        }
        this.hud.render(this.renderer);
        mapFragmentAndProps();
        this.renderScene(this.cameraScene, this.camera);
        mapFragmentAndProps();
        if (this.config.logCalls) {
          this.dcCounter.textContent = totalPlayers + ' DC';
        }
      }
    }
  },
  requestAnimationFrame: function (callback) {
    if (this.effect) {
      this.effect.requestAnimationFrame(callback);
    } else {
      requestAnimationFrame(callback);
    }
  },
  captureFrame: function (size, height) {
    this.setSize(size, height);
    this.render();
    var canvasDrawBG = document.querySelector('canvas');
    window.open(canvasDrawBG.toDataURL());
  }
});
sceneManager.mixin(Event);
sceneManager.DEFAULT_MODE = 0;
sceneManager.VR_MODE = 1;
export default sceneManager;
