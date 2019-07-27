var FileLoaderExtern = function (size) {
  THREE.XHRLoader.call(this);
  this.setResponseType('arraybuffer');
  this.manager = void 0 !== size ? size : THREE.DefaultLoadingManager;
};
FileLoaderExtern.prototype = Object.create(THREE.XHRLoader.prototype);
export default FileLoaderExtern;
