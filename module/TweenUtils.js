const TweenUtils = {};
TweenUtils.tween = function (duration, position) {
  var that = new TWEEN.Tween({ progress: 0 });
  return that.to({ progress: 1 }, duration).easing(undefined !== position ? position : TWEEN.Easing.Linear.None).start(), that;
};
export default TweenUtils;
