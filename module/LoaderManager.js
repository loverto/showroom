import bluebird from 'bluebird';
import $ from 'module/LoaderUtils';
var Renderer = function (obj) {
  if (obj.manager) {
    this.manager = obj.manager;
  }
  if (obj.cubemaps) {
    this.cubemaps = obj.cubemaps;
  }
  if (obj.sh) {
    this.sh = obj.sh;
  }
  if (obj.textures) {
    this.textures = obj.textures;
  }
  if (obj.panoramas) {
    this.panoramas = obj.panoramas;
  }
  if (obj.geometries) {
    this.geometries = obj.geometries;
  }
};
Renderer.prototype.load = function () {
  var params = {};
  return this.cubemaps && (params.cubemap = $.loadSpecularCubemaps(this.cubemaps)), this.panoramas && (params.panorama = $.loadPanoramas(this.panoramas)), this.sh && (params.sh = $.loadSH(this.sh)), this.textures && (params.texture = $.loadTextures(this.textures)), this.geometries && (params.geometry = $.loadGeometries(this.geometries)), bluebird.props(params);
};
export default Renderer;
