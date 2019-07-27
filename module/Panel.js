import * as THREE from 'three';

import CanvasElement from 'module/CanvasElement';
function setup(name) {
  var obj = new CanvasElement();
  var canvas = obj.canvas;
  switch (obj.resize(512, 512), name) {
  case 'name':
    obj.draw(arguments[1], '96px "AlternateGothic3"', 'white', 2);
    break;
  case 'dimensions':
    obj.draw(arguments[1], '24px "Work Sans"', 'white', 2);
    break;
  case 'material':
    obj.draw(arguments[1], '36px "Work Sans"', 'white', 2);
  }
  new THREE.Texture(canvas);
  return new THREE.Texture(canvas);
}
function init(options, f) {
  options.offset.copy(f.material.map.offset);
  options.repeat.copy(f.material.map.repeat);
  options.wrapS = options.WrapT = THREE.ClampToEdgeWrapping;
  options.minFilter = THREE.LinearFilter;
  options.needsUpdate = true;
  f.material.map = options;
  f.material.needsUpdate = true;
}

var Panel = function (options) {
  THREE.Object3D.call(this);
  var self = options.data;
  this.showGradient = options.showGradient;
  this.gradientMap = options.gradientMap;
  this.initLayout(options.referenceObject, options.hudSize);
  this.materialTextures = [];
  var config = setup('name', self.type);
  var values = setup('dimensions', self.dimensions);
  return self.materials.forEach(function (o) {
    var data = setup('material', o);
    this.materialTextures.push(data);
  }, this), init(config, this.nameObj), init(values, this.dimensionsObj), init(this.materialTextures[0], this.materialObj), this;
};
Panel.inherit(THREE.Object3D, {
  initLayout: function (element, options) {
    var loose = options.width > options.height;
    var r = loose ? 0.075 * options.height : 0.08 * options.width;
    var compRe = loose ? options.width / 1880 : options.height / 1400;
    var item = element.getObjectByName('name');
    var shape = element.getObjectByName('line');
    var el = element.getObjectByName('dimensions');
    var data = element.getObjectByName('material');
    this.innerContainer = new THREE.Object3D();
    this.innerContainer.position.set(-0.5 * options.width + r, 0.5 * options.height - r, 0);
    this.add(this.innerContainer);
    this.innerContainer.scale.setScalar(compRe);
    this.nameObj = this.addElement(item, 0, 0);
    this.lineObj = this.addElement(shape, -205, 100);
    this.dimensionsObj = this.addElement(el, 0, 125);
    this.materialObj = this.addElement(data, 0, 110);
    if (this.showGradient) {
      this.initGradient(r);
    }
    shape.children[0].material.polygonOffset = true;
    shape.children[0].material.polygonOffsetFactor = -0.1;
  },
  initGradient: function (personLookupResult) {
    debugger
    var white = new THREE.MeshBasicMaterial({
      transparent: true,
      map: this.gradientMap,
      opacity: 0
    });
    var a = new THREE.Mesh(new THREE.PlaneBufferGeometry(512, 512, 1, 1), white);
    this.innerContainer.add(a);
    a.scale.setScalar((512 + personLookupResult) / 512);
    a.position.set(256 - personLookupResult / 2, personLookupResult / 2 - 256, 0);
    a.renderOrder = 0;
    this.gradient = a;
    this.gradient.maxOpacity = window.isMobile ? 0.2 : 0.3;
    this.gradient.animation = {
      tween: new TWEEN.Tween(),
      opacity: 0
    };
  },
  resize: function (media) {
    var isIE = media.width > media.height;
    var offset = isIE ? 0.075 * media.height : 0.08 * media.width;
    var v = isIE ? media.width / 1880 : media.height / 1400;
    this.innerContainer.position.set(-0.5 * media.width + offset, 0.5 * media.height - offset, 0);
    this.innerContainer.scale.setScalar(v);
    this.gradient.scale.setScalar((512 + offset) / 512);
    this.gradient.position.set(256 - offset / 2, offset / 2 - 256, 0);
  },
  show: function (b) {
    b = undefined === b || b;
    this.visible = true;
    this.innerContainer.visible = true;
    if (b) {
      this.nameObj.visible = false;
      this.materialObj.visible = false;
      this.dimensionsObj.visible = false;
      this.animateLine();
      setTimeout(this.animateUpperElement.bind(this), 300);
      setTimeout(this.animateLowerElement.bind(this), 500);
    }
    if (this.showGradient) {
      this.fadeInGradient();
    }
  },
  fadeInGradient: function () {
    debugger
    this.gradient.material.opacity = 0;
    this.gradient.animation.opacity = 0;
    this.gradient.animation.tween.reset(this.gradient.animation).to({ opacity: this.gradient.maxOpacity }, 1000).onUpdate(function () {
      this.gradient.material.opacity = this.gradient.animation.opacity;
    }.bind(this)).start();
  },
  fadeOutGradient: function () {
    this.gradient.animation.tween.reset(this.gradient.animation).to({ opacity: 0 }, 350).onUpdate(function () {
      this.gradient.material.opacity = this.gradient.animation.opacity;
    }.bind(this)).start();
  },
  hide: function () {
    this.visible = false;
  },
  addElement: function (exports, isSlidingUp, n) {
    var box = new THREE.Box3();
    return function (entity, i, errorMargin) {
      this.add(entity);
      box.setFromObject(entity);
      this.innerContainer.add(entity);
      entity.height = box.max.y - box.min.y;
      entity.width = box.max.x - box.min.x;
      var min = -entity.height / this.scale.y / 2 - errorMargin;
      var o = entity.width / this.scale.x / 2 + i;
      return entity.position.set(o, min, 0), entity.material && (entity.material = entity.material.clone(), entity.material.depthTest = false), entity.traverse(function (a) {
        a.renderOrder = 1;
      }), entity;
    };
  }(),
  setMaterial: function () {
    var ichart = new TWEEN.Tween();
    var data = {
      offset: 0,
      progress: 0
    };
    return function (indexPos) {
      if (this.materialTween) {
        return void this.materialTween.onComplete(function () {
          data.offset = 0;
          data.progress = 0;
          this.innerContainer.remove(this.materialObj);
          this.materialObj = this.clone;
          this.materialTween = null;
          this.setMaterial(indexPos);
        }.bind(this));
      }
      var o = this.materialTextures[indexPos];
      var mesh = this.materialObj.clone();
      if (this.clone = mesh, this.innerContainer.add(mesh), mesh.position.copy(this.materialObj.position), mesh.position.x -= 200, mesh.material && (mesh.material = mesh.material.clone(), mesh.material.depthTest = false), mesh.traverse(function (a) {
          a.renderOrder = 1;
        }), !o) {
        return void console.warn('Missing material texture. Panel cannot display current material name.');
      }
      init(o, mesh);
      mesh.material.opacity = 0;
      var x = this.materialObj.position.x;
      var left = mesh.position.x;
      var render = function () {
        data.offset = 0;
        data.progress = 0;
        this.innerContainer.remove(this.materialObj);
        this.materialObj = mesh;
        this.materialObj.position.setX(x + data.offset);
        this.materialTween = null;
      };
      this.materialTween = ichart.reset(data).to({ offset: 200 }, 500).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function (i) {
        this.materialObj.position.setX(x + data.offset);
        mesh.position.setX(left + data.offset);
        this.materialObj.material.opacity = 1 - i;
        mesh.material.opacity = i;
      }.bind(this)).onComplete(render.bind(this)).onStop(render.bind(this)).start();
    };
  }(),
  animateLine: function () {
    var t = new TWEEN.Tween();
    var pos = { x: 0 };
    return function () {
      var mesh = this.lineObj;
      var cyPosX = mesh.scale.x;
      pos.y = mesh.scale.y;
      pos.z = mesh.scale.z;
      mesh.scale.setX(0.00001);
      t.reset(pos).to({ x: cyPosX }, 1000).easing(TWEEN.Easing.Quartic.InOut).onUpdate(function () {
        mesh.scale.set(pos.x, pos.y, pos.z);
      }).onComplete(function () {
        pos.x = 0.00001;
      }).start();
    };
  }(),
  animateUpperElement: function () {
    var t = new TWEEN.Tween();
    var params = {
      offset: 1,
      opacity: 0
    };
    return function () {
      var shader = this.nameObj;
      var texture = shader.material.map;
      var startPos = texture.offset.y;
      shader.visible = true;
      texture.offset.setY(params.offset);
      t.reset(params).to({
        offset: startPos,
        opacity: 1
      }, 1000).easing(TWEEN.Easing.Quartic.InOut).onUpdate(function () {
        texture.offset.setY(params.offset);
        shader.material.opacity = params.opacity;
      }).onComplete(function () {
        params.offset = 1;
        params.opacity = 0;
      }).start();
    };
  }(),
  animateLowerElement: function () {
    var t = new TWEEN.Tween();
    var params = {
      offset1: 0.73,
      offset2: 0.8,
      opacity: 0
    };
    return function () {
      var shader = this.materialObj;
      var texture = shader.material.map;
      var nodeTly = texture.offset.y;
      var panel = this.dimensionsObj;
      var map = panel.material.map;
      var tLeftDepth = map.offset.y;
      shader.visible = true;
      panel.visible = true;
      shader.material.opacity = 0;
      panel.material.opacity = 0;
      texture.offset.setY(params.offset1);
      map.offset.setY(params.offset2);
      t.reset(params).to({
        offset1: nodeTly,
        offset2: tLeftDepth,
        opacity: 1
      }, 1000).easing(TWEEN.Easing.Quartic.InOut).onUpdate(function () {
        texture.offset.setY(params.offset1);
        map.offset.setY(params.offset2);
        shader.material.opacity = params.opacity;
        panel.material.opacity = params.opacity;
      }).onComplete(function () {
        params.offset1 = 0.73;
        params.offset2 = 0.8;
        params.opacity = 0;
      }).start();
    };
  }(),
  fadeOut: function () {
    var concept = new TWEEN.Tween();
    var props = { opacity: 1 };
    return function (saveNotifs) {
      concept.reset(props).to({ opacity: 0 }, 350).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function (exports) {
        this.traverse(function (shader) {
          if (shader.material) {
            shader.material.opacity = props.opacity;
          }
        }.bind(this));
      }.bind(this)).onComplete(function () {
        props.opacity = 1;
        this.traverse(function (shader) {
          if (shader.material) {
            shader.material.opacity = props.opacity;
          }
        });
        this.hide();
        if (saveNotifs) {
          saveNotifs();
        }
      }.bind(this)).start();
      if (this.materialTween) {
        this.materialTween.stop();
      }
      if (this.showGradient) {
        this.fadeOutGradient();
      }
    };
  }()
});
export default Panel;
