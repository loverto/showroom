function update(allOrId) {
  var width = window.WIDTH = window.innerWidth;
  var height = window.HEIGHT = window.innerHeight;
  this.setSize(width, height);
}
function attachVisibilityEvent(t) {
  var propertyName;
  var visibilityChange;
  if (void 0 !== document.hidden) {
    propertyName = 'hidden';
    visibilityChange = 'visibilitychange';
  } else {
    if (void 0 !== document.mozHidden) {
      propertyName = 'mozHidden';
      visibilityChange = 'mozvisibilitychange';
    } else {
      if (void 0 !== document.msHidden) {
        propertyName = 'msHidden';
        visibilityChange = 'msvisibilitychange';
      } else {
        if (void 0 !== document.webkitHidden) {
          propertyName = 'webkitHidden';
          visibilityChange = 'webkitvisibilitychange';
        }
      }
    }
  }
  if (void 0 !== document.addEventListener) {
    document.addEventListener(visibilityChange, function () {
      if (document[propertyName]) {
        t.onLeaveTab();
      } else {
        setTimeout(t.onFocusTab.bind(t), 50);
      }
    }, false);
  }
}
function Slatebox(_options) {
}
import o from 'module/Event';
import that from 'module/timers';
import r from 'module/FpsCounter';
var BaseSceneManager = function (options) {
  if (options = void 0 !== options ? options : {}, this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: options.canvas || document.querySelector('canvas'),
      preserveDrawingBuffer: void 0 !== options.preserveDrawingBuffer ? options.preserveDrawingBuffer : void 0
    }), THREE.Extensions = this.renderer.extensions, this.config = {
      fps: void 0 !== options.fps && options.fps,
      profiling: void 0 !== options.profiling && options.profiling,
      logDrawCalls: void 0 !== options.logDrawCalls && options.logDrawCalls
    }, options && options.maxPixelRatio) {
    var ratio = window.devicePixelRatio > options.maxPixelRatio ? options.maxPixelRatio : window.devicePixelRatio;
  } else {
    ratio = window.devicePixelRatio;
  }
  if (window.isMobile) {
    ratio = ratio > 1.5 ? 1.5 : ratio;
  }
  this.renderer.setPixelRatio(ratio);
  this.setSize(options.width || window.innerWidth, options.height || window.innerHeight);
  if (void 0 !== options.autoClear) {
    this.renderer.autoClear = options.autoClear;
  }
  if (void 0 !== options.clearColor) {
    this.renderer.setClearColor(options.clearColor);
  }
  if (!(void 0 !== options.supportsTextureLod && true !== options.supportsTextureLod)) {
    THREE.Extensions.get('EXT_shader_texture_lod');
  }
  this.clock = new THREE.Clock();
  this.paused = false;
  this.scenes = [];
  this.scene = null;
  this._drawCalls = 0;
  window.onresize = update.bind(this);
  window.addEventListener('keyup', Slatebox.bind(this));
  this.renderer.domElement.addEventListener('mousemove', function (event) {
    window.mouseX = event.pageX / WIDTH * 2 - 1;
    window.mouseY = 1 - event.pageY / HEIGHT * 2;
  });
  if (this.config.fps) {
    this.fpsCounter = new r();
    this.counter = document.createElement('div');
    document.querySelectorAll('body')[0].appendChild(this.counter);
    this.counter.setAttribute('style', 'position:absolute;top:20px;left:200px;color:#ff00ff;display:block !important;z-index:999999;');
  }
  attachVisibilityEvent(this);
};
BaseSceneManager.prototype = {
  render: function (elem) {
    if (this.scene && this.camera) {
      this.renderScene(this.scene, this.camera);
    }
  },
  renderScene: function (scene, camera) {
    this.renderer.render(scene, camera);
    if (this.config.logDrawCalls) {
      this._drawCalls += this.renderer.info.render.calls;
    }
  },
  update: function (time) {
    if (this.camera) {
      this.camera.updateMatrixWorld(true);
      this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld);
    }
    _.each(this.scenes, function (child) {
      this.updateCustomMaterials(child);
      if (child.update) {
        child.updateMatrixWorld(true);
        child.update(this.renderer, time);
      }
    }, this);
  },
  updateCustomMaterials: function (scope, tagName) {
    _.each(scope.materials, function (parent) {
      if (parent.pbr && (tagName || this.camera)) {
        parent.refreshUniforms(tagName || this.camera);
      }
    }, this);
  },
  doUpdate: function () {
    var data = {
      delta: 0,
      elapsed: 0
    };
    return function () {
      if (data.delta = this.clock.getDelta(), data.elapsed = this.clock.getElapsedTime(), !this.paused) {
        this.requestAnimationFrame(this.doUpdate.bind(this));
        var time = void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now();
        TWEEN.update(time);
        that.updateTimers(data);
        if (this.config.logDrawCalls) {
          this._drawCalls = 0;
        }
        if (this.config.profiling) {
          console.time('update');
        }
        this.update(data);
        if (this.config.profiling) {
          console.timeEnd('update');
        }
        this.render(data);
        if (!this.started) {
          this.started = true;
        }
        if (this.config.fps) {
          this.fpsCounter.update(data, function (pctg) {
            this.counter.textContent = pctg + ' FPS';
          }.bind(this));
        }
        if (this.config.logDrawCalls) {
          this.logDrawCalls(this._drawCalls);
        }
      }
    };
  }(),
  start: function () {
    this.doUpdate();
  },
  pause: function () {
    if (!this.paused) {
      this.clock.stop();
      this.paused = true;
      if (this.config.fps) {
        this.counter.textContent += ' (paused)';
      }
    }
  },
  resume: function () {
    if (this.paused) {
      this.clock.start();
      this.paused = false;
      if (this.started) {
        this.doUpdate();
      }
    }
  },
  onLeaveTab: function () {
    if (!this.paused) {
      this.pause();
      this.shouldResume = true;
    }
  },
  onFocusTab: function () {
    if (this.shouldResume) {
      this.resume();
      this.shouldResume = false;
    }
  },
  setAspectRatio: function (aspect) {
    if (this.camera) {
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();
    }
  },
  setSize: function (width, height) {
    if (this.started) {
      this.setAspectRatio(width / height);
    }
    this.renderer.setSize(width, height);
  },
  requestAnimationFrame: function (callback) {
    requestAnimationFrame(callback);
  },
  logDrawCalls: function (contextReference) {
    console.log('Draw calls:', contextReference);
  }
};
BaseSceneManager.mixin(o);
export default BaseSceneManager;
