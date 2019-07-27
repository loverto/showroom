function c(y, d, p) {
  var i = y * y;
  var j = 2 * y * y;
  var name = 3 * y * y;
  var n = 0;
  var k = 0;
  for (; k < i; k++) {
    p[n++] = d[k];
    p[n++] = d[k + i];
    p[n++] = d[k + j];
    p[n++] = d[k + name];
  }
}
var DataTextureLoaderExtern = function (size, options, manager) {
  this.manager = void 0 !== manager ? manager : THREE.DefaultLoadingManager;
  this._size = size;
  this._interleaving = options;
};
DataTextureLoaderExtern.prototype = Object.create(THREE.BinaryTextureLoader.prototype);
DataTextureLoaderExtern.prototype._parser = function (res) {
  var v;
  var r = this._size;
  if (this._interleaving) {
    var b1 = r * r * 4;
    var data = new Uint8Array(res);
    v = new Uint8Array(b1);
    c(r, data, v);
  } else {
    v = new Uint8Array(res);
  }
  return {
    width: r,
    height: r,
    data: v,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    type: THREE.UnsignedByteType
  };
};
export default DataTextureLoaderExtern;
