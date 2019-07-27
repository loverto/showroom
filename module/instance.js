import * as THREE from 'three';

import bluebird from 'bluebird';
import 'module/BaseMaterialLoader';
import loaderUtils from 'module/LoaderUtils';
import 'module/PBRMaterial'
import 'module/LoadSceneManager'
var instance = {};

/**
 * 加载场景
 * @param name
 * @param data 数据或资源路径
 * @param scene
 * @param callback
 * @returns {Promise}
 */
instance.loadScene = function(name, data, scene, callback) {
    return new bluebird(function(resolve, reject) {
        // options.renderer
        var binaryGeometryBuffer = loaderUtils.getGeometry(name);
        // 设置二进制几何Buffer
        if (binaryGeometryBuffer) {
            console.log("设置二进制几何Buffer")
            loaderUtils.sceneLoader.setBinaryGeometryBuffer(binaryGeometryBuffer);
        }
        // 加载场景
        loaderUtils.loadScene(data + name + (callback || '.json')).spread(function(sceneParm, json) {
            // 声明相机
            var camera;
            // 置空物料信息
            sceneParm.materials = {};
            // 如果有相机，则获取相机
            if (sceneParm.cameras && sceneParm.cameras.length > 0) {
                camera = sceneParm.cameras[0];
            }
            // 设置相机的面为当前计算机可视区域的宽/除以可视区域的高
            if (camera) {
                camera.aspect = window.innerWidth / window.innerHeight;
                // 更新投影矩阵
                camera.updateProjectionMatrix();
            } else {
                // 如果没有创建相机的话，新创建一个透视相机，设置相应的参数，和相机的位置
                camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .01, 2E3);
                camera.position.set(-3.5, 2, 3);
            }
            // 横过
            sceneParm.traverse(function(camera) {
                if (camera instanceof THREE.DirectionalLight) {
                    camera.position.set(0, 0, 1);
                    camera.quaternion.normalize();
                    camera.position.applyQuaternion(camera.quaternion);
                    camera.quaternion.set(0, 0, 0, 0);
                    camera.scale.set(0, 0, 0);
                }
                if (camera.material) {
                    if (camera.material.materials) {
                        camera.material.materials.forEach(function (material) {
                            sceneParm.materials[material.uuid] = material;
                        });
                    } else {
                        sceneParm.materials[camera.material.uuid] = camera.material;
                    }
                }
            });
            scene.scene = sceneParm;
            scene.scenes.push(sceneParm);
            scene.camera = camera;
            resolve(sceneParm);
        });
    });
};
export default instance;
