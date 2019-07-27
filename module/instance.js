import bluebird from 'bluebird';
import 'module/MaterialLoaderExtern';
import shape from 'module/LoaderUtils';
var instance = (require('module/PBRMaterial'), require('module/LoadSceneManager'), {});
instance.loadScene = function (value, name, options, data) {
  return new bluebird(function (generateBuildHash, a) {
    var addedRenderer = (options.renderer, shape.getGeometry(value));
    if (addedRenderer) {
      shape.sceneLoader.setBinaryGeometryBuffer(addedRenderer);
    }
    shape.loadScene(name + value + (data || '.json')).spread(function (self, exports) {
      var camera;
      self.materials = {};
      if (self.cameras && self.cameras.length > 0) {
        camera = self.cameras[0];
      }
      if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      } else {
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 2000);
        camera.position.set(-3.5, 2, 3);
      }
      self.traverse(function (object) {
        if (object.material) {
          if (object.material.materials) {
            object.material.materials.forEach(function (b) {
              self.materials[b.uuid] = b;
            });
          } else {
            self.materials[object.material.uuid] = object.material;
          }
        }
        if (object instanceof THREE.DirectionalLight) {
          object.position.set(0, 0, 1);
          object.quaternion.normalize();
          object.position.applyQuaternion(object.quaternion);
          object.quaternion.set(0, 0, 0, 0);
          object.scale.set(0, 0, 0);
        }
      });
      options.scene = self;
      options.scenes.push(self);
      options.camera = camera;
      generateBuildHash(self);
    });
  });
};
export default instance;
