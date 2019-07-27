var Util = window.Util || {};
Util.MIN_TIMESTEP = 0.001;
Util.MAX_TIMESTEP = 1;
Util.isIOS = function () {
  var t = /iPad|iPhone|iPod/.test(navigator.platform);
  return function () {
    return t;
  };
}();
Util.isSafari = function () {
  var t = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  return function () {
    return t;
  };
}();
Util.isFirefoxAndroid = function () {
  var t = -1 !== navigator.userAgent.indexOf('Firefox') && -1 !== navigator.userAgent.indexOf('Android');
  return function () {
    return t;
  };
}();
Util.isLandscapeMode = function () {
  return 90 == window.orientation || -90 == window.orientation;
};
Util.isTimestampDeltaValid = function (timestampDeltaS) {
  return !isNaN(timestampDeltaS) && (!(timestampDeltaS <= Util.MIN_TIMESTEP) && !(timestampDeltaS > Util.MAX_TIMESTEP));
};
export default Util;