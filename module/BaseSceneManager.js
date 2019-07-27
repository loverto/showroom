import * as THREE  from 'three';

import o from 'module/Event';
import that from 'module/timers';
import r from 'module/FpsCounter';

function update(allOrId) {
  var width = window.WIDTH = window.innerWidth;
  var height = window.HEIGHT = window.innerHeight;
  this.setSize(width, height);
}
function attachVisibilityEvent(t) {
  var propertyName;
  var visibilityChange;
  if (undefined !== document.hidden) {
    propertyName = 'hidden';
    visibilityChange = 'visibilitychange';
  } else {
    if (undefined !== document.mozHidden) {
      propertyName = 'mozHidden';
      visibilityChange = 'mozvisibilitychange';
    } else {
      if (undefined !== document.msHidden) {
        propertyName = 'msHidden';
        visibilityChange = 'msvisibilitychange';
      } else {
        if (undefined !== document.webkitHidden) {
          propertyName = 'webkitHidden';
          visibilityChange = 'webkitvisibilitychange';
        }
      }
    }
  }
  if (undefined !== document.addEventListener) {
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

var BaseSceneManager = function (options) {
  if (options = undefined !== options ? options : {}, this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: options.canvas || document.querySelector('canvas'),
      preserveDrawingBuffer: undefined !== options.preserveDrawingBuffer ? options.preserveDrawingBuffer : undefined
    }), THREE.Extensions = this.renderer.extensions, this.config = {
      fps: undefined !== options.fps && options.fps,
      profiling: undefined !== options.profiling && options.profiling,
      logDrawCalls: undefined !== options.logDrawCalls && options.logDrawCalls
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
  if (undefined !== options.autoClear) {
    this.renderer.autoClear = options.autoClear;
  }
  if (undefined !== options.clearColor) {
    this.renderer.setClearColor(options.clearColor);
  }
  if (!(undefined !== options.supportsTextureLod && true !== options.supportsTextureLod)) {
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
    var self = this;
    _.each(this.scenes, function (child) {
      this.updateCustomMaterials(child);
      if (child.update) {
        child.updateMatrixWorld(true);
        child.update(self.renderer, time);
      }
    });
  },
  updateCustomMaterials: function (scope, tagName) {
    var self = this
    _.each(scope.materials, function (parent) {
      if (parent.pbr && (tagName || self.camera)) {
        parent.refreshUniforms(tagName || self.camera);
      }
    });
  },
  doUpdate: function () {
    var data = {
      delta: 0,
      elapsed: 0
    };
    return function () {
      if (data.delta = this.clock.getDelta(), data.elapsed = this.clock.getElapsedTime(), !this.paused) {
        this.requestAnimationFrame(this.doUpdate.bind(this));
        var time = undefined !== window.performance && undefined !== window.performance.now ? window.performance.now() : Date.now();
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
