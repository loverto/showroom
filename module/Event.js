var Events = {
  on: function (name, callback, context) {
    return eventsApi(this, 'on', name, [
      callback,
      context
    ]) && callback ? (this._events || (this._events = {}), (this._events[name] || (this._events[name] = [])).push({
      callback: callback,
      context: context,
      ctx: context || this
    }), this) : this;
  },
  once: function (name, callback, context) {
    if (!eventsApi(this, 'once', name, [
        callback,
        context
      ]) || !callback) {
      return this;
    }
    var self = this;
    var onceListener = _.once(function () {
      self.off(name, onceListener);
      callback.apply(this, arguments);
    });
    return onceListener._callback = callback, this.on(name, onceListener, context);
  },
  off: function (name, callback, context) {
    var listeners;
    var handler;
    var _ref;
    var names;
    var j;
    var i;
    var index;
    var position;
    if (!this._events || !eventsApi(this, 'off', name, [
        callback,
        context
      ])) {
      return this;
    }
    if (!name && !callback && !context) {
      return this._events = void 0, this;
    }
    names = name ? [name] : _.keys(this._events);
    j = 0;
    i = names.length;
    for (; j < i; j++) {
      if (name = names[j], _ref = this._events[name]) {
        if (this._events[name] = listeners = [], callback || context) {
          index = 0;
          position = _ref.length;
          for (; index < position; index++) {
            handler = _ref[index];
            if (callback && callback !== handler.callback && callback !== handler.callback._callback || context && context !== handler.context) {
              listeners.push(handler);
            }
          }
        }
        if (!listeners.length) {
          delete this._events[name];
        }
      }
    }
    return this;
  },
  trigger: function (name) {
    if (!this._events) {
      return this;
    }
    var args = slice.call(arguments, 1);
    if (!eventsApi(this, 'trigger', name, args)) {
      return this;
    }
    var result = this._events[name];
    var fn = this._events.all;
    return result && callback(result, args), fn && callback(fn, arguments), this;
  },
  stopListening: function (obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo) {
      return this;
    }
    var i = !name && !callback;
    if (!(callback || 'object' != typeof name)) {
      callback = this;
    }
    if (obj) {
      (listeningTo = {})[obj._listenId] = obj;
    }
    var id;
    for (id in listeningTo) {
      obj = listeningTo[id];
      obj.off(name, callback, this);
      if (i || _.isEmpty(obj._events)) {
        delete this._listeningTo[id];
      }
    }
    return this;
  }
};
var r = /\s+/;
var prototypeOfArray = [];
var slice = prototypeOfArray.slice;
var eventsApi = function (obj, action, name, rest) {
  if (!name) {
    return true;
  }
  if ('object' == typeof name) {
    var template;
    for (template in name) {
      obj[action].apply(obj, [
        template,
        name[template]
      ].concat(rest));
    }
    return false;
  }
  if (r.test(name)) {
    var a = name.split(r);
    var j = 0;
    var startLen = a.length;
    for (; j < startLen; j++) {
      obj[action].apply(obj, [a[j]].concat(rest));
    }
    return false;
  }
  return true;
};
var callback = function (list, a) {
  var ev;
  var i = -1;
  var l = list.length;
  var ac = a[0];
  var ns = a[1];
  var c2 = a[2];
  switch (a.length) {
  case 0:
    for (; ++i < l;) {
      (ev = list[i]).callback.call(ev.ctx);
    }
    return;
  case 1:
    for (; ++i < l;) {
      (ev = list[i]).callback.call(ev.ctx, ac);
    }
    return;
  case 2:
    for (; ++i < l;) {
      (ev = list[i]).callback.call(ev.ctx, ac, ns);
    }
    return;
  case 3:
    for (; ++i < l;) {
      (ev = list[i]).callback.call(ev.ctx, ac, ns, c2);
    }
    return;
  default:
    for (; ++i < l;) {
      (ev = list[i]).callback.apply(ev.ctx, a);
    }
    return;
  }
};
var collection = {
  listenTo: 'on',
  listenToOnce: 'once'
};
_.each(collection, function (implementation, method) {
  Events[method] = function (obj, name, callback) {
    return (this._listeningTo || (this._listeningTo = {}))[obj._listenId || (obj._listenId = _.uniqueId('l'))] = obj, callback || 'object' != typeof name || (callback = this), obj[implementation](name, callback, this), this;
  };
});
export default Events;