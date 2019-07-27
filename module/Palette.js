import * as THREE from 'three';

import LoaderUtils from 'module/LoaderUtils';
var Palette = function (obj) {
  return THREE.Object3D.call(this), this.strokeMaterial = new THREE.MeshBasicMaterial({
    color: 16777215,
    side: THREE.BackSide,
    transparent: true
  }), this.rippleMaterial = this.strokeMaterial.clone(), this.rippleMaterial.opacity = 0, this.materials = obj.materials, this.itemCount = this.materials.length, this.maxScale = obj.maxScale, this.exposureBoost = obj.exposureBoost, this.initLayout(obj.hudSize), this;
};
Palette.inherit(THREE.Object3D, {
  initLayout: function (options) {
    if (this.materials) {
      var beanDel = options.width > options.height;
      var target = beanDel ? options.width * (0.125 * this.itemCount) : options.width * (0.16 * this.itemCount);
      var radius = 0.3 * -options.height;
      this.materials.forEach(function (x2, index) {
        var atom = -target / 2 + target / (this.itemCount - 1) * index;
        var m = this.createSphere(atom, radius, x2, 1);
        this.add(m);
        m.name = 'material_' + index;
      }, this);
      this.children[0].current = true;
      this.children[0].stroke.visible = true;
    }
  },
  resize: function (media, fn) {
    var loose = media.width > media.height;
    var r = loose ? media.width * (0.125 * this.itemCount) : media.width * (0.16 * this.itemCount);
    var compRe = loose ? 0.3 * -media.height : 0.35 * -media.height;
    this.maxScale = fn;
    this.children.forEach(function (mesh, value) {
      var handle = -r / 2 + r / (this.itemCount - 1) * value;
      mesh.position.setX(handle);
      mesh.position.setY(compRe);
      mesh.scale.setScalar(this.maxScale);
      mesh.tweenValue.scale = this.maxScale;
    }, this);
  },
  createSphere: function (x, y, r, v) {
    var object = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), r.clone());
    object.scale.setScalar(v);
    var c = object.clone();
    var s = c.clone();
    object.rotation.x = 0.25;
    object.position.setX(x);
    object.position.setY(y);
    c.scale.setScalar(1.05);
    c.material = this.strokeMaterial;
    object.add(c);
    object.stroke = c;
    c.visible = false;
    object.ripple = s;
    s.material = this.rippleMaterial;
    c.add(s);
    object.material.transparent = true;
    object.material.defines.USE_DIR_LIGHT = true;
    var aryVert = LoaderUtils.getSH('studio');
    return object.material.uDiffuseSPH = new Float32Array(aryVert, 27), this.exposureBoost && (object.material.uEnvironmentExposure = 1.5), object.tween = new TWEEN.Tween(), object.tweenValue = { scale: this.maxScale }, object.material.defines.USE_AOMAP2 = false, object.material.defines.USE_NORMALMAP2 = false, object;
  },
  hide: function () {
    this.visible = false;
    this.children.forEach(function (elem) {
      elem.pickable = false;
    });
  },
  show: function () {
    return function (value) {
      value = undefined === value || value;
      this.children.forEach(function (object) {
        object.material.opacity = 1;
        object.stroke.material.opacity = 1;
      });
      if (value) {
        this.visible = true;
        this.children.forEach(function (obj, delayedBy) {
          var e = { scale: 0.00001 };
          obj.scale.set(0.00001, 0.00001, 0.00001);
          obj.pickable = true;
          setTimeout(function () {
            obj.tween.reset(e).to({ scale: obj.tweenValue.scale }, 1000).easing(TWEEN.Easing.Elastic.Out).onUpdate(function () {
              if (this.hoveredObject !== obj) {
                obj.scale.setScalar(e.scale);
              }
            }.bind(this)).start();
          }.bind(this), 125 * delayedBy);
        }.bind(this));
      } else {
        this.visible = true;
        this.children.forEach(function (halo) {
          halo.pickable = true;
          halo.scale.setScalar(this.maxScale);
        }, this);
      }
    };
  }(),
  fadeOut: function () {
    var concept = new TWEEN.Tween();
    var props = { opacity: 1 };
    return function (saveNotifs) {
      concept.reset(props).to({ opacity: 0 }, 350).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function (exports) {
        this.children.forEach(function (object) {
          object.material.opacity = props.opacity;
          object.stroke.material.opacity = props.opacity;
        });
      }.bind(this)).onComplete(function () {
        props.opacity = 1;
        this.children.forEach(function (object) {
          object.material.opacity = props.opacity;
          object.stroke.material.opacity = props.opacity;
        });
        this.hide();
        if (saveNotifs) {
          saveNotifs();
        }
      }.bind(this)).start();
    };
  }()
});
export default Palette;
