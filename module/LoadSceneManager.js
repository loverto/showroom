var LoadSceneManager = function (size) {
  this.manager = void 0 !== size ? size : THREE.DefaultLoadingManager;
  this.texturePath = '';
};
Object.assign(LoadSceneManager.prototype, {
  load: function (f, e, result, url) {
    if ('' === this.texturePath) {
      this.texturePath = f.substring(0, f.lastIndexOf('/') + 1);
    }
    var scope = this;
    new THREE.XHRLoader(scope.manager).load(f, function (response) {
      var value = JSON.parse(response);
      scope.parse(value, e);
    }, result, url);
  },
  setTexturePath: function (value) {
    this.texturePath = value;
  },
  setCrossOrigin: function (value) {
    this.crossOrigin = value;
  },
  parse: function (json, fn) {
    var geometries;
    geometries = json.binary ? this.parseBinaryGeometries(json.geometries) : this.parseGeometries(json.geometries);
    var images = this.parseImages(json.images, function () {
      if (void 0 !== fn) {
        fn(object, json);
      }
    });
    var textures = this.parseTextures(json.textures, images);
    var materials = this.parseMaterials(json.materials, textures);
    var object = this.parseObject(json.object, geometries, materials);
    return json.animations && (object.animations = this.parseAnimations(json.animations)), json.cameras && (object.cameras = this.parseCameras(object, json.cameras)), void 0 !== json.images && 0 !== json.images.length || void 0 !== fn && fn(object, json), object;
  },
  parseCameras: function (object, options) {
    var onSelectionCalls = [];
    var index = 0;
    for (; index < options.length; index++) {
      var e = object.getObjectByProperty('uuid', options[index]);
      if (e) {
        onSelectionCalls.push(e);
      }
    }
    return onSelectionCalls;
  },
  parseGeometries: function (json) {
    var geometries = {};
    if (void 0 !== json) {
      var geometryLoader = new THREE.JSONLoader();
      var primParser = new THREE.BufferGeometryLoader();
      var i = 0;
      var jsonLength = json.length;
      for (; i < jsonLength; i++) {
        var geometry;
        var data = json[i];
        switch (data.type) {
        case 'PlaneGeometry':
        case 'PlaneBufferGeometry':
          geometry = new THREE[data.type](data.width, data.height, data.widthSegments, data.heightSegments);
          break;
        case 'BoxGeometry':
        case 'BoxBufferGeometry':
        case 'CubeGeometry':
          geometry = new THREE[data.type](data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments);
          break;
        case 'CircleGeometry':
        case 'CircleBufferGeometry':
          geometry = new THREE[data.type](data.radius, data.segments, data.thetaStart, data.thetaLength);
          break;
        case 'CylinderGeometry':
        case 'CylinderBufferGeometry':
          geometry = new THREE[data.type](data.radiusTop, data.radiusBottom, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength);
          break;
        case 'ConeGeometry':
        case 'ConeBufferGeometry':
          geometry = new THREE[data.type](data.radius, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength);
          break;
        case 'SphereGeometry':
        case 'SphereBufferGeometry':
          geometry = new THREE[data.type](data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength);
          break;
        case 'DodecahedronGeometry':
        case 'IcosahedronGeometry':
        case 'OctahedronGeometry':
        case 'TetrahedronGeometry':
          geometry = new THREE[data.type](data.radius, data.detail);
          break;
        case 'RingGeometry':
        case 'RingBufferGeometry':
          geometry = new THREE[data.type](data.innerRadius, data.outerRadius, data.thetaSegments, data.phiSegments, data.thetaStart, data.thetaLength);
          break;
        case 'TorusGeometry':
        case 'TorusBufferGeometry':
          geometry = new THREE[data.type](data.radius, data.tube, data.radialSegments, data.tubularSegments, data.arc);
          break;
        case 'TorusKnotGeometry':
        case 'TorusKnotBufferGeometry':
          geometry = new THREE[data.type](data.radius, data.tube, data.tubularSegments, data.radialSegments, data.p, data.q);
          break;
        case 'LatheGeometry':
        case 'LatheBufferGeometry':
          geometry = new THREE[data.type](data.points, data.segments, data.phiStart, data.phiLength);
          break;
        case 'BufferGeometry':
          geometry = primParser.parse(data);
          break;
        case 'Geometry':
          geometry = geometryLoader.parse(data.data, this.texturePath).geometry;
          break;
        default:
          console.warn('THREE.ObjectLoader: Unsupported geometry type "' + data.type + '"');
          continue;
        }
        geometry.uuid = data.uuid;
        if (void 0 !== data.name) {
          geometry.name = data.name;
        }
        geometries[data.uuid] = geometry;
      }
    }
    return geometries;
  },
  setBinaryGeometryBuffer: function (addedRenderer) {
    this.geometryBuffer = addedRenderer;
  },
  parseBinaryGeometries: function (result) {
    var geometries = {};
    if (void 0 !== result) {
      var i = (new THREE.BufferGeometryLoader(), 0);
      var length = result.length;
      for (; i < length; i++) {
        var geometry = new THREE.BufferGeometry();
        var data = result[i];
        var key;
        for (key in data.offsets) {
          if (data.offsets.hasOwnProperty(key)) {
            var tex = data.offsets[key];
            var c = tex[0];
            var pivot = tex[1] + 1;
            var len = this.geometryBuffer.slice(c, pivot);
            if ('index' === key) {
              var indices = new Uint32Array(len);
              geometry.setIndex(new THREE.BufferAttribute(indices, 1));
            } else {
              var size;
              indices = new Float32Array(len);
              if ('uv' === key || 'uv2' === key) {
                size = 2;
              } else {
                if ('position' === key || 'normal' === key || 'color' === key) {
                  size = 3;
                } else {
                  if ('tangent' === key) {
                    size = 4;
                  }
                }
              }
              geometry.addAttribute(key, new THREE.BufferAttribute(indices, size));
            }
          }
        }
        geometry.uuid = data.uuid;
        if (void 0 !== data.name) {
          geometry.name = data.name;
        }
        geometries[data.uuid] = geometry;
      }
      this.setBinaryGeometryBuffer(null);
    }
    return geometries;
  },
  parseMaterials: function (json, textures) {
    var materials = {};
    if (void 0 !== json) {
      var loader = new THREE.MaterialLoader();
      loader.setTextures(textures);
      var i = 0;
      var jsonLength = json.length;
      for (; i < jsonLength; i++) {
        var material = loader.parse(json[i]);
        materials[material.uuid] = material;
      }
    }
    return materials;
  },
  parseAnimations: function (json) {
    var t_chksum = [];
    var i = 0;
    for (; i < json.length; i++) {
      var r = THREE.AnimationClip.parse(json[i]);
      t_chksum.push(r);
    }
    return t_chksum;
  },
  parseImages: function (json, onLoad) {
    var scope = this;
    var images = {};
    if (void 0 !== json && json.length > 0) {
      var manager = new THREE.LoadingManager(onLoad);
      var loader = new THREE.ImageLoader(manager);
      loader.setCrossOrigin(this.crossOrigin);
      var i = 0;
      var jsonLength = json.length;
      for (; i < jsonLength; i++) {
        var image = json[i];
        var url = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(image.url) ? image.url : scope.texturePath + image.url;
        images[image.uuid] = function (url) {
          return scope.manager.itemStart(url), loader.load(url, function () {
            scope.manager.itemEnd(url);
          });
        }(url);
      }
    }
    return images;
  },
  parseTextures: function (json, images) {
    function parseConstant(value) {
      return 'number' == typeof value ? value : (console.warn('THREE.ObjectLoader.parseTexture: Constant should be in numeric form.', value), THREE[value]);
    }
    var textures = {};
    if (void 0 !== json) {
      var i = 0;
      var jsonLength = json.length;
      for (; i < jsonLength; i++) {
        var texture;
        var data = json[i];
        if (data.images) {
          var c = [];
          var i = 0;
          var l = data.images.length;
          for (; i < l; i++) {
            if (void 0 === images[data.images[i]]) {
              console.warn('THREE.ObjectLoader: Undefined image', data.images[i]);
            }
            c.push(images[data.images[i]]);
          }
          texture = new THREE.CubeTexture(c);
        } else {
          if (void 0 === data.image) {
            console.warn('THREE.ObjectLoader: No "image" specified for', data.uuid);
          }
          if (void 0 === images[data.image]) {
            console.warn('THREE.ObjectLoader: Undefined image', data.image);
          }
          texture = new THREE.Texture(images[data.image]);
        }
        texture.needsUpdate = true;
        texture.uuid = data.uuid;
        if (void 0 !== data.name) {
          texture.name = data.name;
        }
        if (void 0 !== data.mapping) {
          texture.mapping = parseConstant(data.mapping);
        }
        if (void 0 !== data.offset) {
          texture.offset.fromArray(data.offset);
        }
        if (void 0 !== data.repeat) {
          texture.repeat.fromArray(data.repeat);
        }
        if (void 0 !== data.wrap) {
          texture.wrapS = parseConstant(data.wrap[0]);
          texture.wrapT = parseConstant(data.wrap[1]);
        }
        if (void 0 !== data.minFilter) {
          texture.minFilter = parseConstant(data.minFilter);
        }
        if (void 0 !== data.magFilter) {
          texture.magFilter = parseConstant(data.magFilter);
        }
        if (void 0 !== data.anisotropy) {
          texture.anisotropy = data.anisotropy;
        }
        if (void 0 !== data.flipY) {
          texture.flipY = data.flipY;
        }
        textures[data.uuid] = texture;
      }
    }
    return textures;
  },
  parseObject: function () {
    var matrix = new THREE.Matrix4();
    return function (data, geometries, materials) {
      function getGeometry(name) {
        return void 0 === geometries[name] && console.warn('THREE.ObjectLoader: Undefined geometry', name), geometries[name];
      }
      function getMaterial(name) {
        if (void 0 !== name) {
          return void 0 === materials[name] && console.warn('THREE.ObjectLoader: Undefined material', name), materials[name];
        }
      }
      var object;
      switch (data.type) {
      case 'Scene':
        object = new THREE.Scene();
        break;
      case 'PerspectiveCamera':
        object = new THREE.PerspectiveCamera(data.fov, data.aspect, data.near, data.far);
        if (void 0 !== data.focus) {
          object.focus = data.focus;
        }
        if (void 0 !== data.zoom) {
          object.zoom = data.zoom;
        }
        if (void 0 !== data.filmGauge) {
          object.filmGauge = data.filmGauge;
        }
        if (void 0 !== data.filmOffset) {
          object.filmOffset = data.filmOffset;
        }
        if (void 0 !== data.view) {
          object.view = Object.assign({}, data.view);
        }
        break;
      case 'OrthographicCamera':
        object = new THREE.OrthographicCamera(data.left, data.right, data.top, data.bottom, data.near, data.far);
        break;
      case 'AmbientLight':
        object = new THREE.AmbientLight(data.color, data.intensity);
        break;
      case 'DirectionalLight':
        object = new THREE.DirectionalLight(data.color, data.intensity);
        break;
      case 'PointLight':
        object = new THREE.PointLight(data.color, data.intensity, data.distance, data.decay);
        break;
      case 'SpotLight':
        object = new THREE.SpotLight(data.color, data.intensity, data.distance, data.angle, data.penumbra, data.decay);
        break;
      case 'HemisphereLight':
        object = new THREE.HemisphereLight(data.color, data.groundColor, data.intensity);
        break;
      case 'Mesh':
        var geometry = getGeometry(data.geometry);
        var material = getMaterial(data.material);
        object = geometry.bones && geometry.bones.length > 0 ? new THREE.SkinnedMesh(geometry, material) : new THREE.Mesh(geometry, material);
        break;
      case 'LOD':
        object = new THREE.LOD();
        break;
      case 'Line':
        object = new THREE.Line(getGeometry(data.geometry), getMaterial(data.material), data.mode);
        break;
      case 'LineSegments':
        object = new THREE.LineSegments(getGeometry(data.geometry), getMaterial(data.material));
        break;
      case 'PointCloud':
      case 'Points':
        object = new THREE.Points(getGeometry(data.geometry), getMaterial(data.material));
        break;
      case 'Sprite':
        object = new THREE.Sprite(getMaterial(data.material));
        break;
      case 'Group':
        object = new THREE.Group();
        break;
      default:
        object = new THREE.Object3D();
      }
      if (object.uuid = data.uuid, void 0 !== data.name && (object.name = data.name), void 0 !== data.matrix ? (matrix.fromArray(data.matrix), matrix.decompose(object.position, object.quaternion, object.scale)) : (void 0 !== data.position && object.position.fromArray(data.position), void 0 !== data.rotation && object.rotation.fromArray(data.rotation), void 0 !== data.scale && object.scale.fromArray(data.scale)), void 0 !== data.castShadow && (object.castShadow = data.castShadow), void 0 !== data.receiveShadow && (object.receiveShadow = data.receiveShadow), void 0 !== data.visible && (object.visible = data.visible), void 0 !== data.userData && (object.userData = data.userData), void 0 !== data.children) {
        var child;
        for (child in data.children) {
          object.add(this.parseObject(data.children[child], geometries, materials));
        }
      }
      if ('LOD' === data.type) {
        var levels = data.levels;
        var i = 0;
        for (; i < levels.length; i++) {
          var level = levels[i];
          child = object.getObjectByProperty('uuid', level.object);
          if (void 0 !== child) {
            object.addLevel(child, level.distance);
          }
        }
      }
      return void 0 !== data.layers && (object.layers.mask = data.layers), object;
    };
  }()
});
export default LoadSceneManager;
