import TimeoutError from 'module/TimerUtils';
var self = { _timers: {} };
self.createTimer = function (timeout) {
  var i = _.uniqueId('timer_');
  var e = new TimeoutError(timeout);
  return e.id = i, self._timers[i] = e, e;
};
self.delay = function (dt, n, o) {
  return self.createTimer({
    duration: dt,
    onEnd: function () {
      n.call(o);
      delete self._timers[this.id];
    }
  }).start();
};
self.updateTimers = function (t) {
  _.each(self._timers, function (e) {
    e.update(t);
  });
};
self.clearTimers = function () {
  _.each(self._timers, function (options) {
    options.onEnd = null;
  });
  self._timers = {};
};
export default self;
