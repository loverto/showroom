import bluebird from 'bluebird';
import require from 'module/parseUrl';
import ImageLoader from 'module/LoadSceneManager';
import Big from 'module/DataTextureLoaderExtern';
import List from 'module/CompressedTextureLoaderExtern';
import Type from 'module/FileLoaderUtils';
import Connection from 'module/FileLoaderExtern';

function normalize(tree, p) {
  return {
    _cache: p || {},
    load: function (f, m, key, options, path) {
      var cache = this._cache;
      if (_.has(cache, path)) {
        resolve(cache[path]);
      } else {
        tree.load(f, function (tmpl) {
          cache[path] = tmpl;
          m.apply(this, arguments);
        }, key, options);
      }
    },
    get: function (type) {
      return _.has(this._cache, type) || console.error('Resource not found: ' + type), this._cache[type];
    }
  };
}
function exec(nodes, val, dst, callback) {
  console.log(_);
  return _.isArray(nodes) || (nodes = [nodes]), bluebird.all(_.map(nodes, function (ext) {
    if (callback) {
      return callback(require(val, ext), ext, dst);
    }
  }));
}
function load(url, name, type) {
  return new bluebird(function (i, stepCallback) {
    type.load(url, function (t) {
      t.filename = name;
      i(arguments.length > 1 ? _.toArray(arguments) : t);
    }, function () {
    }, function () {
      stepCallback(new Error('Resource was not found: ' + url));
    }, name);
  });
}
function callback(e, b, a) {
  console.log(e, b, a);
  return e = e || [], exec(e, b, a, load);
}

var manager = new THREE.LoadingManager();
var loader = new ImageLoader(manager);
var v = {};
var res = normalize(new THREE.TextureLoader(manager), v);
var y = normalize(new Big(1024, false, manager), v);
var val = normalize(new List(256, false, manager), v);
var err = normalize(new THREE.ImageLoader());
var annotationStarts = {};
var scope = new Type(manager);
var p1 = {};
var c = normalize(new Connection(manager), p1);
var self = {
  environmentPath: 'assets/environments',
  geometryPath: 'assets/scenes/data/',
  manager: manager,
  sceneLoader: loader
};
var pathMatch = '';
Object.defineProperty(self, 'texturePath', {
  get: function () {
    return pathMatch;
  },
  set: function (p) {
    pathMatch = p;
    loader.setTexturePath(p);
  }
});
self.loadScene = function (url, key) {
  return load(url, key, loader);
};
self.loadOBJs = function (t, i) {
  return callback(t, i, objLoader);
};
self.loadTextures = function (selected, options) {
  return callback(selected, options || self.texturePath, res);
};
self.loadBRDFs = function (t, i) {
  return callback(t, i, brdfLoader);
};
self.loadPanoramas = function (id, port) {
  return callback(id, port || self.environmentPath, y);
};
self.loadSpecularCubemaps = function (id, port) {
  console.log(id, port);
  return callback(id, port || self.environmentPath, val);
};
self.loadSH = function (fn) {
  return bluebird.all(_.map(fn, function (name) {
    return new bluebird(function (e, stepCallback) {
      var r = require(self.environmentPath, name + '/irradiance.json');
      scope.load(r, function (n) {
        annotationStarts[name] = n;
        e(n);
      }, function () {
      }, function () {
        stepCallback(new Error('Resource was not found: ' + r));
      });
    });
  }));
};
self.loadGeometries = function (e, value) {
  return e = _.map(e, function (exports) {
    return exports + '.bin';
  }), callback(e, value || self.geometryPath, c);
};
self.loadImages = function (next, id) {
  return callback(next, id, err);
};
self.getTexture = function (key) {
  return res.get(key);
};
self.getBRDF = function (t) {
  return brdfLoader.get(t);
};
self.getPanorama = function (i) {
  return y.get(i + '/panorama.bin');
};
self.getCubemap = function (i) {
  return val.get(i + '/cubemap.bin');
};
self.getSH = function (name) {
  return annotationStarts[name];
};
self.getGeometry = function (name) {
  return c.get(name + '.bin');
};
export default self;
