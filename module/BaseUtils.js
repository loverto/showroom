import '@tweenjs/tween.js';
window._ = require('lodash');
Number.prototype.lerp = function (minIn, maxIn) {
  return this + (minIn - this) * maxIn;
};
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (prefix, i) {
    var result = this.toString();
    if ('number' != typeof i || !isFinite(i) || Math.floor(i) !== i || i > result.length) {
      i = result.length;
    }
    i = i - prefix.length;
    var src = result.indexOf(prefix, i);
    return -1 !== src && src === i;
  };
}
Function.prototype.inherit = function (parent, obj) {
  if (!parent || !_.isFunction(parent)) {
    throw 'parent argument must be a function';
  }
  this.prototype = _.extend(Object.create(parent.prototype), obj);
};
Function.prototype.mixin = function (obj) {
  _.each(obj, function (require, methodName) {
    if (void 0 === this.prototype[methodName]) {
      this.prototype[methodName] = require;
    }
  }, this);
};
window.WIDTH = window.innerWidth;
window.HEIGHT = window.innerHeight;
window.mouseX = 0;
window.mouseY = 0;
window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
window.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
