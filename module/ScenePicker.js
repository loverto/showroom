import * as THREE from 'three';

import Event from 'module/Event';
var ScenePicker = function (app) {
  app = app || {};
  this.objects = [];
  this.mouseCoords = {
    x: 0,
    y: 0
  };
  this.camera = app.camera;
  this.vr = app.vr;
  this.checkFlag = undefined !== app.checkFlag && app.checkFlag;
};
ScenePicker.prototype = {
  add: function (value) {
    if (!_.isArray(value)) {
      value = [value];
    }
    var self = this
    _.each(value, function (obj) {
      self.objects.push(obj);
      obj.pickable = true;
    }, this);
  },
  remove: function (value) {
    var i = 0;
    for (; i < this.objects.length; i++) {
      if (this.objects[i].id === value.id) {
        this.objects.splice(i, 1);
        break;
      }
    }
  },
  clear: function () {
    this.objects = [];
  },
  clearState: function () {
    if (this.currentObj) {
      this.trigger('leave', this.currentObj);
      this.currentObj = null;
    }
  },
  onTap: function () {
    if (this.currentObj) {
      this.trigger('pick', this.currentObj, this.point);
    }
  },
  hitTest: function () {
    var raycaster = new THREE.Raycaster();
    var camera = new THREE.Vector3();
    var node = new THREE.Vector3();
    new THREE.Vector3();
    return function (vr) {
      var name;
      this.camera.getWorldPosition(node);
      if (this.vr || vr) {
        this.camera.getWorldDirection(camera);
        raycaster.set(node, camera);
      } else {
        raycaster.setFromCamera(this.mouseCoords, this.camera);
      }
      var template = raycaster.intersectObjects(this.objects);
      if (template.length > 0) {
        var options = _.find(template, function (typeStatement) {
          return this.checkFlag ? undefined !== typeStatement.object.pickable && true === typeStatement.object.pickable : typeStatement.object;
        }, this);
        if (options) {
          this.point = options.point;
          name = options.object;
        }
      }
      return (name && this.currentObj && this.currentObj !== name || !name && this.currentObj) && (this.trigger('leave', this.currentObj), this.currentObj = null), name && !this.currentObj && (this.trigger('enter', name, this.point), this.currentObj = name), name;
    };
  }(),
  updateMouseCoords: function (e) {
    this.mouseCoords = e;
  },
  getPoint: function () {
    return this.point;
  }
};
ScenePicker.mixin(Event);
export default ScenePicker;
