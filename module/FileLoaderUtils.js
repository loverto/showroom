function empty(src) {
  var delta = src.slice(0, 27);
  var v = 1 / (2 * Math.sqrt(Math.PI));
  var test_6 = -0.5 * Math.sqrt(3 / Math.PI);
  var $animation = -test_6;
  var acquireKernelInfoEpic = test_6;
  var loadConfigEpic = 0.5 * Math.sqrt(15 / Math.PI);
  var currentRelations = -loadConfigEpic;
  var c = 0.25 * Math.sqrt(5 / Math.PI);
  var addedRelations = currentRelations;
  var l = 0.25 * Math.sqrt(15 / Math.PI);
  return [
    v,
    v,
    v,
    test_6,
    test_6,
    test_6,
    $animation,
    $animation,
    $animation,
    acquireKernelInfoEpic,
    acquireKernelInfoEpic,
    acquireKernelInfoEpic,
    loadConfigEpic,
    loadConfigEpic,
    loadConfigEpic,
    currentRelations,
    currentRelations,
    currentRelations,
    c,
    c,
    c,
    addedRelations,
    addedRelations,
    addedRelations,
    l,
    l,
    l
  ].map(function (position, i) {
    return position * delta[i];
  });
}
var FileLoaderUtils = function (size) {
  THREE.XHRLoader.call(this);
  this.manager = void 0 !== size ? size : THREE.DefaultLoadingManager;
};
FileLoaderUtils.prototype = Object.create(THREE.XHRLoader.prototype);
FileLoaderUtils.prototype.load = function (fileName, err, tree, url) {
  THREE.XHRLoader.prototype.load.call(this, fileName, function (manifest) {
    var list = JSON.parse(manifest);
    var result = empty(list);
    err(result);
  }, tree, url);
};
export default FileLoaderUtils;
