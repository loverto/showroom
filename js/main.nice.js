//'use strict';
!function(m) {
    /**
     * @param {number} i
     * @return {?}
     */
    function t(i) {
        if (n[i]) {
            return n[i].exports;
        }
        var module = n[i] = {
            i : i,
            l : false,
            exports : {}
        };
        return m[i].call(module.exports, module, module.exports, t), module.l = true, module.exports;
    }
    var n = {};
    /** @type {!Array} */
    t.m = m;
    t.c = n;
    /**
     * @param {string} e
     * @param {string} name
     * @param {!Function} n
     * @return {undefined}
     */
    t.d = function(e, name, n) {
        if (!t.o(e, name)) {
            Object.defineProperty(e, name, {
                configurable : false,
                enumerable : true,
                get : n
            });
        }
    };
    /**
     * @param {!Object} module
     * @return {?}
     */
    t.n = function(module) {
        /** @type {function(): ?} */
        var n = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return t.d(n, "a", n), n;
    };
    /**
     * @param {string} e
     * @param {string} input
     * @return {?}
     */
    t.o = function(e, input) {
        return Object.prototype.hasOwnProperty.call(e, input);
    };
    /** @type {string} */
    t.p = "";
    t(t.s = 13);
}([function(module, canCreateDiscussions, _dereq_) {
    /**
     * @param {!Object} tree
     * @param {!Object} p
     * @return {?}
     */
    function normalize(tree, p) {
        return {
            _cache : p || {},
            load : function(f, m, key, options, path) {
                var cache = this._cache;
                if (_.has(cache, path)) {
                    resolve(cache[path]);
                } else {
                    tree.load(f, function(tmpl) {
                        cache[path] = tmpl;
                        m.apply(this, arguments);
                    }, key, options);
                }
            },
            get : function(type) {
                return _.has(this._cache, type) || console.error("Resource not found: " + type), this._cache[type];
            }
        };
    }
    /**
     * @param {!Array} nodes
     * @param {?} val
     * @param {?} dst
     * @param {!Function} callback
     * @return {?}
     */
    function exec(nodes, val, dst, callback) {
        console.log(_)
        return _.isArray(nodes) || (nodes = [nodes]), Promise.all(_.map(nodes, function(ext) {
            if (callback) {
                return callback(require(val, ext), ext, dst);
            }
        }));
    }
    /**
     * @param {string} url
     * @param {string} name
     * @param {!Object} type
     * @return {?}
     */
    function load(url, name, type) {
        return new Promise(function(i, stepCallback) {
            type.load(url, function(t) {
                /** @type {string} */
                t.filename = name;
                i(arguments.length > 1 ? _.toArray(arguments) : t);
            }, function() {
            }, function() {
                stepCallback(new Error("Resource was not found: " + url));
            }, name);
        });
    }
    /**
     * @param {!Array} e
     * @param {?} b
     * @param {?} a
     * @return {?}
     */
    function callback(e, b, a) {
        console.log(e,b,a)
        return e = e || [], exec(e, b, a, load);
    }
    var Promise = _dereq_(6);
    var require = _dereq_(21);
    var ImageLoader = _dereq_(9);
    var Big = _dereq_(26);
    var List = _dereq_(27);
    var Type = _dereq_(28);
    var Connection = _dereq_(29);
    var manager = new THREE.LoadingManager;
    var loader = new ImageLoader(manager);
    var v = {};
    var res = normalize(new THREE.TextureLoader(manager), v);
    var y = normalize(new Big(1024, false, manager), v);
    var val = normalize(new List(256, false, manager), v);
    var err = normalize(new THREE.ImageLoader);
    var annotationStarts = {};
    var scope = new Type(manager);
    var p1 = {};
    var c = normalize(new Connection(manager), p1);
    var self = {
        environmentPath : "assets/environments",
        geometryPath : "assets/scenes/data/",
        manager : manager,
        sceneLoader : loader
    };
    /** @type {string} */
    var pathMatch = "";
    Object.defineProperty(self, "texturePath", {
        get : function() {
            return pathMatch;
        },
        set : function(p) {
            pathMatch = p;
            loader.setTexturePath(p);
        }
    });
    /**
     * @param {string} url
     * @param {string} key
     * @return {?}
     */
    self.loadScene = function(url, key) {
        return load(url, key, loader);
    };
    /**
     * @param {!Array} t
     * @param {?} i
     * @return {?}
     */
    self.loadOBJs = function(t, i) {
        return callback(t, i, objLoader);
    };
    /**
     * @param {!Array} selected
     * @param {(Object|string)} options
     * @return {?}
     */
    self.loadTextures = function(selected, options) {
        return callback(selected, options || self.texturePath, res);
    };
    /**
     * @param {!Array} t
     * @param {?} i
     * @return {?}
     */
    self.loadBRDFs = function(t, i) {
        return callback(t, i, brdfLoader);
    };
    /**
     * @param {!Array} id
     * @param {string} port
     * @return {?}
     */
    self.loadPanoramas = function(id, port) {
        return callback(id, port || self.environmentPath, y);
    };
    /**
     * @param {!Array} id
     * @param {string} port
     * @return {?}
     */
    self.loadSpecularCubemaps = function(id, port) {
        console.log(id,port)
        return callback(id, port || self.environmentPath, val);
    };
    /**
     * @param {!Function} fn
     * @return {?}
     */
    self.loadSH = function(fn) {
        return Promise.all(_.map(fn, function(name) {
            return new Promise(function(e, stepCallback) {
                var r = require(self.environmentPath, name + "/irradiance.json");
                scope.load(r, function(n) {
                    annotationStarts[name] = n;
                    e(n);
                }, function() {
                }, function() {
                    stepCallback(new Error("Resource was not found: " + r));
                });
            });
        }));
    };
    /**
     * @param {!Array} e
     * @param {string} value
     * @return {?}
     */
    self.loadGeometries = function(e, value) {
        return e = _.map(e, function(canCreateDiscussions) {
            return canCreateDiscussions + ".bin";
        }), callback(e, value || self.geometryPath, c);
    };
    /**
     * @param {!Array} next
     * @param {?} id
     * @return {?}
     */
    self.loadImages = function(next, id) {
        return callback(next, id, err);
    };
    /**
     * @param {string} key
     * @return {?}
     */
    self.getTexture = function(key) {
        return res.get(key);
    };
    /**
     * @param {string} t
     * @return {?}
     */
    self.getBRDF = function(t) {
        return brdfLoader.get(t);
    };
    /**
     * @param {string} i
     * @return {?}
     */
    self.getPanorama = function(i) {
        return y.get(i + "/panorama.bin");
    };
    /**
     * @param {string} i
     * @return {?}
     */
    self.getCubemap = function(i) {
        return val.get(i + "/cubemap.bin");
    };
    /**
     * @param {string} name
     * @return {?}
     */
    self.getSH = function(name) {
        return annotationStarts[name];
    };
    /**
     * @param {string} name
     * @return {?}
     */
    self.getGeometry = function(name) {
        return c.get(name + ".bin");
    };
    module.exports = self;
}, function(module, canCreateDiscussions) {
    var Events = {
        on : function(name, callback, context) {
            return eventsApi(this, "on", name, [callback, context]) && callback ? (this._events || (this._events = {}), (this._events[name] || (this._events[name] = [])).push({
                callback : callback,
                context : context,
                ctx : context || this
            }), this) : this;
        },
        once : function(name, callback, context) {
            if (!eventsApi(this, "once", name, [callback, context]) || !callback) {
                return this;
            }
            var self = this;
            var onceListener = _.once(function() {
                self.off(name, onceListener);
                callback.apply(this, arguments);
            });
            return onceListener._callback = callback, this.on(name, onceListener, context);
        },
        off : function(name, callback, context) {
            var listeners;
            var handler;
            var _ref;
            var names;
            var j;
            var i;
            var index;
            var position;
            if (!this._events || !eventsApi(this, "off", name, [callback, context])) {
                return this;
            }
            if (!name && !callback && !context) {
                return this._events = void 0, this;
            }
            names = name ? [name] : _.keys(this._events);
            /** @type {number} */
            j = 0;
            i = names.length;
            for (; j < i; j++) {
                if (name = names[j], _ref = this._events[name]) {
                    if (this._events[name] = listeners = [], callback || context) {
                        /** @type {number} */
                        index = 0;
                        position = _ref.length;
                        for (; index < position; index++) {
                            handler = _ref[index];
                            if (callback && callback !== handler.callback && callback !== handler.callback._callback || context && context !== handler.context) {
                                listeners.push(handler);
                            }
                        }
                    }
                    if (!listeners.length) {
                        delete this._events[name];
                    }
                }
            }
            return this;
        },
        trigger : function(name) {
            if (!this._events) {
                return this;
            }
            /** @type {!Array<?>} */
            var args = slice.call(arguments, 1);
            if (!eventsApi(this, "trigger", name, args)) {
                return this;
            }
            var result = this._events[name];
            var fn = this._events.all;
            return result && callback(result, args), fn && callback(fn, arguments), this;
        },
        stopListening : function(obj, name, callback) {
            var listeningTo = this._listeningTo;
            if (!listeningTo) {
                return this;
            }
            /** @type {boolean} */
            var i = !name && !callback;
            if (!(callback || "object" != typeof name)) {
                callback = this;
            }
            if (obj) {
                /** @type {!Object} */
                (listeningTo = {})[obj._listenId] = obj;
            }
            var id;
            for (id in listeningTo) {
                obj = listeningTo[id];
                obj.off(name, callback, this);
                if (i || _.isEmpty(obj._events)) {
                    delete this._listeningTo[id];
                }
            }
            return this;
        }
    };
    /** @type {!RegExp} */
    var r = /\s+/;
    /** @type {!Array} */
    var prototypeOfArray = [];
    /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
    var slice = prototypeOfArray.slice;
    /**
     * @param {!Object} obj
     * @param {string} action
     * @param {string} name
     * @param {!Array} rest
     * @return {?}
     */
    var eventsApi = function(obj, action, name, rest) {
        if (!name) {
            return true;
        }
        if ("object" == typeof name) {
            var template;
            for (template in name) {
                obj[action].apply(obj, [template, name[template]].concat(rest));
            }
            return false;
        }
        if (r.test(name)) {
            var a = name.split(r);
            /** @type {number} */
            var j = 0;
            var startLen = a.length;
            for (; j < startLen; j++) {
                obj[action].apply(obj, [a[j]].concat(rest));
            }
            return false;
        }
        return true;
    };
    /**
     * @param {!NodeList} list
     * @param {!Array} a
     * @return {undefined}
     */
    var callback = function(list, a) {
        var ev;
        /** @type {number} */
        var i = -1;
        var l = list.length;
        var ac = a[0];
        var ns = a[1];
        var c2 = a[2];
        switch(a.length) {
            case 0:
                for (; ++i < l;) {
                    (ev = list[i]).callback.call(ev.ctx);
                }
                return;
            case 1:
                for (; ++i < l;) {
                    (ev = list[i]).callback.call(ev.ctx, ac);
                }
                return;
            case 2:
                for (; ++i < l;) {
                    (ev = list[i]).callback.call(ev.ctx, ac, ns);
                }
                return;
            case 3:
                for (; ++i < l;) {
                    (ev = list[i]).callback.call(ev.ctx, ac, ns, c2);
                }
                return;
            default:
                for (; ++i < l;) {
                    (ev = list[i]).callback.apply(ev.ctx, a);
                }
                return;
        }
    };
    var collection = {
        listenTo : "on",
        listenToOnce : "once"
    };
    _.each(collection, function(implementation, method) {
        /**
         * @param {!NodeList} obj
         * @param {?} name
         * @param {!Object} callback
         * @return {?}
         */
        Events[method] = function(obj, name, callback) {
            return (this._listeningTo || (this._listeningTo = {}))[obj._listenId || (obj._listenId = _.uniqueId("l"))] = obj, callback || "object" != typeof name || (callback = this), obj[implementation](name, callback, this), this;
        };
    });
    module.exports = Events;
}, function(module, canCreateDiscussions) {
    /** @type {!Array} */
    var keys = ["side", "alphaTest", "transparent", "depthWrite", "shading", "wireframe"];
    /**
     * @param {!Array} type
     * @return {undefined}
     */
    var Set = function(type) {
        type = type || {};
        THREE.ShaderMaterial.call(this, type);
        _.each(keys, function(l) {
            var idx = type[l];
            if (void 0 !== idx) {
                this[l] = idx;
            }
        }, this);
    };
    Set.inherit(THREE.ShaderMaterial, {
        onPropertyChange : function(prop, e) {
            Object.defineProperty(this, prop, {
                get : function() {
                    return this["_" + prop];
                },
                set : function(v) {
                    /** @type {number} */
                    this["_" + prop] = v;
                    e.call(this, v);
                }
            });
        },
        clone : function(to) {
            var material = to || new Set;
            return THREE.Material.prototype.clone.call(this, material), material.shading = this.shading, material.wireframe = this.wireframe, material.wireframeLinewidth = this.wireframeLinewidth, material.fog = this.fog, material.lights = this.lights, material.vertexColors = this.vertexColors, material.skinning = this.skinning, material.morphTargets = this.morphTargets, material.morphNormals = this.morphNormals, material;
        }
    });
    /** @type {function(!Array): undefined} */
    module.exports = Set;
}, function(module, canCreateDiscussions) {
    var g;
    g = function() {
        return this;
    }();
    try {
        g = g || Function("return this")() || (0, eval)("this");
    } catch (t) {
        if ("object" == typeof window) {
            /** @type {!Window} */
            g = window;
        }
    }
    module.exports = g;
}, function(mixin, canCreateDiscussions) {
    TweenUtils = {};
    /**
     * @param {number} duration
     * @param {number} position
     * @return {?}
     */
    TweenUtils.tween = function(duration, position) {
        var that = new TWEEN.Tween({
            progress : 0
        });
        return that.to({
            progress : 1
        }, duration).easing(void 0 !== position ? position : TWEEN.Easing.Linear.None).start(), that;
    };
    mixin.exports = TweenUtils;
}, function(module, canCreateDiscussions) {
    Config = {
        ASSET_COUNT : 140,
        DEBUG_KEYS : false,
        AUTOSTART : false,
        ENABLE_ZOOM : true,
        ENABLE_PAN : false,
        ENABLE_DAMPING : true
    };
    module.exports = Config;
}, function(module, e, __webpack_require__) {
    (function(options, global, number) {
        !function (factory) {
            module.exports = factory()
        }(function () {
            var t, i, o;
            return function boot(modules, config, bootModule) {
                function mainExport(moduleName, s) {
                    if (!config[moduleName]) {
                        if (!modules[moduleName]) {
                            var innerFunctionName = "function" == typeof _dereq_ && _dereq_;
                            if (!s && innerFunctionName) return innerFunctionName(moduleName, !0);
                            if (functionName) return functionName(moduleName, !0);
                            var moduleException = new Error("Cannot find module '" + moduleName + "'");
                            throw moduleException.code = "MODULE_NOT_FOUND", moduleException
                        }
                        var configExport = config[moduleName] = {exports: {}};
                        modules[moduleName][0].call(configExport.exports, function (itemName) {
                            var innerModuleName = modules[moduleName][1][itemName];
                            return mainExport(innerModuleName || itemName)
                        }, configExport, configExport.exports, boot, modules, config, bootModule)
                    }
                    return config[moduleName].exports
                }

                for (var functionName = "function" == typeof _dereq_ && _dereq_, index = 0; index < bootModule.length; index++) mainExport(bootModule[index]);
                return mainExport
            }({
                1 : [function(canCreateDiscussions, mixin, n) {
                    /**
                     * @param {!Object} Promise
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise) {
                        /**
                         * @param {?} promises
                         * @return {?}
                         */
                        function any(promises) {
                            var ret = new SomePromiseArray(promises);
                            var r = ret.promise();
                            return ret.setHowMany(1), ret.setUnwrap(), ret.init(), r;
                        }
                        var SomePromiseArray = Promise._SomePromiseArray;
                        /**
                         * @param {?} promises
                         * @return {?}
                         */
                        Promise.any = function(promises) {
                            return any(promises);
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype.any = function() {
                            return any(this);
                        };
                    };
                }, {}],
                2 : [function(require, module, canCreateDiscussions) {
                    /**
                     * @return {undefined}
                     */
                    function Async() {
                        /** @type {boolean} */
                        this._customScheduler = false;
                        /** @type {boolean} */
                        this._isTickUsed = false;
                        this._lateQueue = new Queue(16);
                        this._normalQueue = new Queue(16);
                        /** @type {boolean} */
                        this._haveDrainedQueues = false;
                        /** @type {boolean} */
                        this._trampolineEnabled = true;
                        var self = this;
                        /**
                         * @return {undefined}
                         */
                        this.drainQueues = function() {
                            self._drainQueues();
                        };
                        this._schedule = fn;
                    }
                    /**
                     * @param {string} fn
                     * @param {string} receiver
                     * @param {string} arg
                     * @return {undefined}
                     */
                    function AsyncInvokeLater(fn, receiver, arg) {
                        this._lateQueue.push(fn, receiver, arg);
                        this._queueTick();
                    }
                    /**
                     * @param {string} fn
                     * @param {string} receiver
                     * @param {string} arg
                     * @return {undefined}
                     */
                    function AsyncInvoke(fn, receiver, arg) {
                        this._normalQueue.push(fn, receiver, arg);
                        this._queueTick();
                    }
                    /**
                     * @param {string} promise
                     * @return {undefined}
                     */
                    function AsyncSettlePromises(promise) {
                        this._normalQueue._pushOne(promise);
                        this._queueTick();
                    }
                    /**
                     * @param {!Object} number
                     * @return {undefined}
                     */
                    function endHeist(number) {
                        for (; number.length() > 0;) {
                            push(number);
                        }
                    }
                    /**
                     * @param {!Object} type
                     * @return {undefined}
                     */
                    function push(type) {
                        var fn = type.shift();
                        if ("function" != typeof fn) {
                            fn._settlePromises();
                        } else {
                            var promise = type.shift();
                            var event = type.shift();
                            fn.call(promise, event);
                        }
                    }
                    var firstLineError;
                    try {
                        throw new Error;
                    } catch (e) {
                        firstLineError = e;
                    }
                    var fn = require("./schedule");
                    var Queue = require("./queue");
                    var util = require("./util");
                    /**
                     * @param {string} fn
                     * @return {?}
                     */
                    Async.prototype.setScheduler = function(fn) {
                        var prev = this._schedule;
                        return this._schedule = fn, this._customScheduler = true, prev;
                    };
                    /**
                     * @return {?}
                     */
                    Async.prototype.hasCustomScheduler = function() {
                        return this._customScheduler;
                    };
                    /**
                     * @return {undefined}
                     */
                    Async.prototype.enableTrampoline = function() {
                        /** @type {boolean} */
                        this._trampolineEnabled = true;
                    };
                    /**
                     * @return {undefined}
                     */
                    Async.prototype.disableTrampolineIfNecessary = function() {
                        if (util.hasDevTools) {
                            /** @type {boolean} */
                            this._trampolineEnabled = false;
                        }
                    };
                    /**
                     * @return {?}
                     */
                    Async.prototype.haveItemsQueued = function() {
                        return this._isTickUsed || this._haveDrainedQueues;
                    };
                    /**
                     * @param {string} e
                     * @param {?} isNode
                     * @return {undefined}
                     */
                    Async.prototype.fatalError = function(e, isNode) {
                        if (isNode) {
                            options.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) + "\n");
                            options.exit(2);
                        } else {
                            this.throwLater(e);
                        }
                    };
                    /**
                     * @param {!Object} fn
                     * @param {!Function} error
                     * @return {undefined}
                     */
                    Async.prototype.throwLater = function(fn, error) {
                        if (1 === arguments.length && (error = fn, fn = function() {
                            throw error;
                        }), "undefined" != typeof setTimeout) {
                            setTimeout(function() {
                                fn(error);
                            }, 0);
                        } else {
                            try {
                                this._schedule(function() {
                                    fn(error);
                                });
                            } catch (t) {
                                throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
                            }
                        }
                    };
                    if (util.hasDevTools) {
                        /**
                         * @param {!Function} fn
                         * @param {?} receiver
                         * @param {?} arg
                         * @return {undefined}
                         */
                        Async.prototype.invokeLater = function(fn, receiver, arg) {
                            if (this._trampolineEnabled) {
                                AsyncInvokeLater.call(this, fn, receiver, arg);
                            } else {
                                this._schedule(function() {
                                    setTimeout(function() {
                                        fn.call(receiver, arg);
                                    }, 100);
                                });
                            }
                        };
                        /**
                         * @param {!Function} fn
                         * @param {string} context
                         * @param {!Object} arg
                         * @return {undefined}
                         */
                        Async.prototype.invoke = function(fn, context, arg) {
                            if (this._trampolineEnabled) {
                                AsyncInvoke.call(this, fn, context, arg);
                            } else {
                                this._schedule(function() {
                                    fn.call(context, arg);
                                });
                            }
                        };
                        /**
                         * @param {?} promise
                         * @return {undefined}
                         */
                        Async.prototype.settlePromises = function(promise) {
                            if (this._trampolineEnabled) {
                                AsyncSettlePromises.call(this, promise);
                            } else {
                                this._schedule(function() {
                                    promise._settlePromises();
                                });
                            }
                        };
                    } else {
                        /** @type {function(string, string, string): undefined} */
                        Async.prototype.invokeLater = AsyncInvokeLater;
                        /** @type {function(string, string, string): undefined} */
                        Async.prototype.invoke = AsyncInvoke;
                        /** @type {function(string): undefined} */
                        Async.prototype.settlePromises = AsyncSettlePromises;
                    }
                    /**
                     * @return {undefined}
                     */
                    Async.prototype._drainQueues = function() {
                        endHeist(this._normalQueue);
                        this._reset();
                        /** @type {boolean} */
                        this._haveDrainedQueues = true;
                        endHeist(this._lateQueue);
                    };
                    /**
                     * @return {undefined}
                     */
                    Async.prototype._queueTick = function() {
                        if (!this._isTickUsed) {
                            /** @type {boolean} */
                            this._isTickUsed = true;
                            this._schedule(this.drainQueues);
                        }
                    };
                    /**
                     * @return {undefined}
                     */
                    Async.prototype._reset = function() {
                        /** @type {boolean} */
                        this._isTickUsed = false;
                    };
                    /** @type {function(): undefined} */
                    module.exports = Async;
                    module.exports.firstLineError = firstLineError;
                }, {
                    "./queue" : 26,
                    "./schedule" : 29,
                    "./util" : 36
                }],
                3 : [function(canCreateDiscussions, mixin, n) {
                    /**
                     * @param {!Function} Promise
                     * @param {!Object} INTERNAL
                     * @param {!Object} tryConvertToPromise
                     * @param {?} debug
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
                        /** @type {boolean} */
                        var i = false;
                        /**
                         * @param {?} array
                         * @param {!Object} e
                         * @return {undefined}
                         */
                        var completed = function(array, e) {
                            this._reject(e);
                        };
                        /**
                         * @param {undefined} e
                         * @param {?} context
                         * @return {undefined}
                         */
                        var targetRejected = function(e, context) {
                            /** @type {boolean} */
                            context.promiseRejectionQueued = true;
                            context.bindingPromise._then(completed, completed, null, this, e);
                        };
                        /**
                         * @param {?} thisArg
                         * @param {!Event} context
                         * @return {undefined}
                         */
                        var bindingResolved = function(thisArg, context) {
                            if (0 == (50397184 & this._bitField)) {
                                this._resolveCallback(context.target);
                            }
                        };
                        /**
                         * @param {!Object} e
                         * @param {?} context
                         * @return {undefined}
                         */
                        var bindingRejected = function(e, context) {
                            if (!context.promiseRejectionQueued) {
                                this._reject(e);
                            }
                        };
                        /**
                         * @param {string} value
                         * @return {?}
                         */
                        Promise.prototype.bind = function(value) {
                            if (!i) {
                                /** @type {boolean} */
                                i = true;
                                Promise.prototype._propagateFrom = debug.propagateFromFunction();
                                Promise.prototype._boundValue = debug.boundValueFunction();
                            }
                            var maybePromise = tryConvertToPromise(value);
                            var ret = new Promise(INTERNAL);
                            ret._propagateFrom(this, 1);
                            var target = this._target();
                            if (ret._setBoundTo(maybePromise), maybePromise instanceof Promise) {
                                var context = {
                                    promiseRejectionQueued : false,
                                    promise : ret,
                                    target : target,
                                    bindingPromise : maybePromise
                                };
                                target._then(INTERNAL, targetRejected, void 0, ret, context);
                                maybePromise._then(bindingResolved, bindingRejected, void 0, ret, context);
                                ret._setOnCancel(maybePromise);
                            } else {
                                ret._resolveCallback(target);
                            }
                            return ret;
                        };
                        /**
                         * @param {number} obj
                         * @return {undefined}
                         */
                        Promise.prototype._setBoundTo = function(obj) {
                            if (void 0 !== obj) {
                                /** @type {number} */
                                this._bitField = 2097152 | this._bitField;
                                /** @type {number} */
                                this._boundTo = obj;
                            } else {
                                /** @type {number} */
                                this._bitField = -2097153 & this._bitField;
                            }
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype._isBound = function() {
                            return 2097152 == (2097152 & this._bitField);
                        };
                        /**
                         * @param {string} func
                         * @param {!Object} n
                         * @return {?}
                         */
                        Promise.bind = function(func, n) {
                            return Promise.resolve(n).bind(func);
                        };
                    };
                }, {}],
                4 : [function(saveNotifs, module, n) {
                    /**
                     * @return {?}
                     */
                    function noConflict() {
                        try {
                            if (Promise === bluebird) {
                                Promise = globalPromise;
                            }
                        } catch (t) {
                        }
                        return bluebird;
                    }
                    var globalPromise;
                    if ("undefined" != typeof Promise) {
                        /** @type {function(new:Promise, function(function((IThenable<TYPE>|TYPE|Thenable|null)=): ?, function(*=): ?): ?): ?} */
                        globalPromise = Promise;
                    }
                    var bluebird = saveNotifs("./promise")();
                    /** @type {function(): ?} */
                    bluebird.noConflict = noConflict;
                    module.exports = bluebird;
                }, {
                    "./promise" : 22
                }],
                5 : [function(require, mixin, n) {
                    /** @type {function((Object|null), (Object|null)=): !Object} */
                    var nativeCreate = Object.create;
                    if (nativeCreate) {
                        /** @type {!Object} */
                        var erodeNoise = nativeCreate(null);
                        /** @type {!Object} */
                        var ruggedNoise = nativeCreate(null);
                        /** @type {number} */
                        erodeNoise[" size"] = ruggedNoise[" size"] = 0;
                    }
                    /**
                     * @param {!Function} Promise
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise) {
                        /**
                         * @param {?} obj
                         * @param {(Object|string)} key
                         * @return {?}
                         */
                        function ensureMethod(obj, key) {
                            var fn;
                            if (null != obj && (fn = obj[key]), "function" != typeof fn) {
                                /** @type {string} */
                                var message = "Object " + util.classString(obj) + " has no method '" + util.toString(key) + "'";
                                throw new Promise.TypeError(message);
                            }
                            return fn;
                        }
                        /**
                         * @param {?} obj
                         * @return {?}
                         */
                        function caller(obj) {
                            return ensureMethod(obj, this.pop()).apply(obj, this);
                        }
                        /**
                         * @param {!Window} b
                         * @return {?}
                         */
                        function R(b) {
                            return b[this];
                        }
                        /**
                         * @param {!NodeList} array
                         * @return {?}
                         */
                        function first(array) {
                            /** @type {number} */
                            var i = +this;
                            return i < 0 && (i = Math.max(0, i + array.length)), array[i];
                        }
                        var checkAndAddDescendantIfModel;
                        var util = require("./util");
                        var canEvaluate = util.canEvaluate;
                        util.isIdentifier;
                        /**
                         * @param {?} obj
                         * @return {?}
                         */
                        Promise.prototype.call = function(obj) {
                            /** @type {!Array<?>} */
                            var args = [].slice.call(arguments, 1);
                            return args.push(obj), this._then(caller, void 0, void 0, args, void 0);
                        };
                        /**
                         * @param {string} value
                         * @return {?}
                         */
                        Promise.prototype.get = function(value) {
                            var r;
                            /** @type {boolean} */
                            var hasDefault = "number" == typeof value;
                            if (hasDefault) {
                                /** @type {function(!NodeList): ?} */
                                r = first;
                            } else {
                                if (canEvaluate) {
                                    var c = checkAndAddDescendantIfModel(value);
                                    r = null !== c ? c : R;
                                } else {
                                    /** @type {function(!Window): ?} */
                                    r = R;
                                }
                            }
                            return this._then(r, void 0, void 0, value, void 0);
                        };
                    };
                }, {
                    "./util" : 36
                }],
                6 : [function(require, mixin, n) {
                    /**
                     * @param {!Function} Promise
                     * @param {!Object} json
                     * @param {!Object} route
                     * @param {?} config
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, json, route, config) {
                        var util = require("./util");
                        var tryCatch = util.tryCatch;
                        var errorObj = util.errorObj;
                        var async = Promise._async;
                        /** @type {function(): ?} */
                        Promise.prototype.break = Promise.prototype.cancel = function() {
                            if (!config.cancellation()) {
                                return this._warn("cancellation is disabled");
                            }
                            var promise = this;
                            var child = promise;
                            for (; promise._isCancellable();) {
                                if (!promise._cancelBy(child)) {
                                    if (child._isFollowing()) {
                                        child._followee().cancel();
                                    } else {
                                        child._cancelBranched();
                                    }
                                    break;
                                }
                                var parent = promise._cancellationParent;
                                if (null == parent || !parent._isCancellable()) {
                                    if (promise._isFollowing()) {
                                        promise._followee().cancel();
                                    } else {
                                        promise._cancelBranched();
                                    }
                                    break;
                                }
                                if (promise._isFollowing()) {
                                    promise._followee().cancel();
                                }
                                promise._setWillBeCancelled();
                                child = promise;
                                promise = parent;
                            }
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._branchHasCancelled = function() {
                            this._branchesRemainingToCancel--;
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype._enoughBranchesHaveCancelled = function() {
                            return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0;
                        };
                        /**
                         * @param {?} canceller
                         * @return {?}
                         */
                        Promise.prototype._cancelBy = function(canceller) {
                            return canceller === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), true) : (this._branchHasCancelled(), !!this._enoughBranchesHaveCancelled() && (this._invokeOnCancel(), true));
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._cancelBranched = function() {
                            if (this._enoughBranchesHaveCancelled()) {
                                this._cancel();
                            }
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._cancel = function() {
                            if (this._isCancellable()) {
                                this._setCancelled();
                                async.invoke(this._cancelPromises, this, void 0);
                            }
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._cancelPromises = function() {
                            if (this._length() > 0) {
                                this._settlePromises();
                            }
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._unsetOnCancel = function() {
                            this._onCancelField = void 0;
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype._isCancellable = function() {
                            return this.isPending() && !this._isCancelled();
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype.isCancellable = function() {
                            return this.isPending() && !this.isCancelled();
                        };
                        /**
                         * @param {?} onCancelCallback
                         * @param {string} internalOnly
                         * @return {undefined}
                         */
                        Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
                            if (util.isArray(onCancelCallback)) {
                                /** @type {number} */
                                var i = 0;
                                for (; i < onCancelCallback.length; ++i) {
                                    this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
                                }
                            } else {
                                if (void 0 !== onCancelCallback) {
                                    if ("function" == typeof onCancelCallback) {
                                        if (!internalOnly) {
                                            var e = tryCatch(onCancelCallback).call(this._boundValue());
                                            if (e === errorObj) {
                                                this._attachExtraTrace(e.e);
                                                async.throwLater(e.e);
                                            }
                                        }
                                    } else {
                                        onCancelCallback._resultCancelled(this);
                                    }
                                }
                            }
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._invokeOnCancel = function() {
                            var onCancelCallback = this._onCancel();
                            this._unsetOnCancel();
                            async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._invokeInternalOnCancel = function() {
                            if (this._isCancellable()) {
                                this._doInvokeOnCancel(this._onCancel(), true);
                                this._unsetOnCancel();
                            }
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._resultCancelled = function() {
                            this.cancel();
                        };
                    };
                }, {
                    "./util" : 36
                }],
                7 : [function(_dereq_, mixin, n) {
                    /**
                     * @param {!Function} paramName
                     * @return {?}
                     */
                    mixin.exports = function(paramName) {
                        /**
                         * @param {!NodeList} instances
                         * @param {!Function} cb
                         * @param {?} promise
                         * @return {?}
                         */
                        function catchFilter(instances, cb, promise) {
                            return function(e) {
                                var boundTo = promise._boundValue();
                                /** @type {number} */
                                var i = 0;
                                t: for (; i < instances.length; ++i) {
                                    var item = instances[i];
                                    if (item === Error || null != item && item.prototype instanceof Error) {
                                        if (e instanceof item) {
                                            return tryCatch(cb).call(boundTo, e);
                                        }
                                    } else {
                                        if ("function" == typeof item) {
                                            var matchesPredicate = tryCatch(item).call(boundTo, e);
                                            if (matchesPredicate === errorObj) {
                                                return matchesPredicate;
                                            }
                                            if (matchesPredicate) {
                                                return tryCatch(cb).call(boundTo, e);
                                            }
                                        } else {
                                            if (util.isObject(e)) {
                                                var obj = isObject(item);
                                                /** @type {number} */
                                                var i = 0;
                                                for (; i < obj.length; ++i) {
                                                    var key = obj[i];
                                                    if (item[key] != e[key]) {
                                                        continue t;
                                                    }
                                                }
                                                return tryCatch(cb).call(boundTo, e);
                                            }
                                        }
                                    }
                                }
                                return paramName;
                            };
                        }
                        var util = _dereq_("./util");
                        var isObject = _dereq_("./es5").keys;
                        var tryCatch = util.tryCatch;
                        var errorObj = util.errorObj;
                        return catchFilter;
                    };
                }, {
                    "./es5" : 13,
                    "./util" : 36
                }],
                8 : [function(canCreateDiscussions, mixin, n) {
                    /**
                     * @param {!Function} Promise
                     * @return {?}
                     */
                    mixin.exports = function(Promise) {
                        /**
                         * @return {undefined}
                         */
                        function Context() {
                            this._trace = new Context.CapturedTrace(peekContext());
                        }
                        /**
                         * @return {?}
                         */
                        function createContext() {
                            if (i) {
                                return new Context;
                            }
                        }
                        /**
                         * @return {?}
                         */
                        function peekContext() {
                            /** @type {number} */
                            var i = contextStack.length - 1;
                            if (i >= 0) {
                                return contextStack[i];
                            }
                        }
                        /** @type {boolean} */
                        var i = false;
                        /** @type {!Array} */
                        var contextStack = [];
                        return Promise.prototype._promiseCreated = function() {
                        }, Promise.prototype._pushContext = function() {
                        }, Promise.prototype._popContext = function() {
                            return null;
                        }, Promise._peekContext = Promise.prototype._peekContext = function() {
                        }, Context.prototype._pushContext = function() {
                            if (void 0 !== this._trace) {
                                /** @type {null} */
                                this._trace._promiseCreated = null;
                                contextStack.push(this._trace);
                            }
                        }, Context.prototype._popContext = function() {
                            if (void 0 !== this._trace) {
                                var trace = contextStack.pop();
                                var ret = trace._promiseCreated;
                                return trace._promiseCreated = null, ret;
                            }
                            return null;
                        }, Context.CapturedTrace = null, Context.create = createContext, Context.deactivateLongStackTraces = function() {
                        }, Context.activateLongStackTraces = function() {
                            var Promise_pushContext = Promise.prototype._pushContext;
                            var Promise_popContext = Promise.prototype._popContext;
                            var Promise_PeekContext = Promise._peekContext;
                            var Promise_peekContext = Promise.prototype._peekContext;
                            /** @type {function(): undefined} */
                            var Promise_promiseCreated = Promise.prototype._promiseCreated;
                            /**
                             * @return {undefined}
                             */
                            Context.deactivateLongStackTraces = function() {
                                Promise.prototype._pushContext = Promise_pushContext;
                                Promise.prototype._popContext = Promise_popContext;
                                Promise._peekContext = Promise_PeekContext;
                                Promise.prototype._peekContext = Promise_peekContext;
                                /** @type {function(): undefined} */
                                Promise.prototype._promiseCreated = Promise_promiseCreated;
                                /** @type {boolean} */
                                i = false;
                            };
                            /** @type {boolean} */
                            i = true;
                            /** @type {function(): undefined} */
                            Promise.prototype._pushContext = Context.prototype._pushContext;
                            /** @type {function(): ?} */
                            Promise.prototype._popContext = Context.prototype._popContext;
                            /** @type {function(): ?} */
                            Promise._peekContext = Promise.prototype._peekContext = peekContext;
                            /**
                             * @return {undefined}
                             */
                            Promise.prototype._promiseCreated = function() {
                                var ctx = this._peekContext();
                                if (ctx && null == ctx._promiseCreated) {
                                    ctx._promiseCreated = this;
                                }
                            };
                        }, Context;
                    };
                }, {}],
                9 : [function(_dereq_, mixin, canCreateDiscussions) {
                    /**
                     * @param {!Object} Promise
                     * @param {!Object} Context
                     * @return {?}
                     */
                    mixin.exports = function(Promise, Context) {
                        /**
                         * @param {?} name
                         * @param {!Function} promise
                         * @return {?}
                         */
                        function generatePromiseLifecycleEventObject(name, promise) {
                            return {
                                promise : promise
                            };
                        }
                        /**
                         * @return {?}
                         */
                        function defaultFireEvent() {
                            return false;
                        }
                        /**
                         * @param {!Function} executor
                         * @param {!Function} resolve
                         * @param {!Function} reject
                         * @return {?}
                         */
                        function cancellationExecute(executor, resolve, reject) {
                            var promise = this;
                            try {
                                executor(resolve, reject, function(onCancel) {
                                    if ("function" != typeof onCancel) {
                                        throw new TypeError("onCancel must be a function, got: " + util.toString(onCancel));
                                    }
                                    promise._attachCancellationCallback(onCancel);
                                });
                            } catch (e) {
                                return e;
                            }
                        }
                        /**
                         * @param {!Array} onCancel
                         * @return {?}
                         */
                        function cancellationAttachCancellationCallback(onCancel) {
                            if (!this._isCancellable()) {
                                return this;
                            }
                            var previousOnCancel = this._onCancel();
                            if (void 0 !== previousOnCancel) {
                                if (util.isArray(previousOnCancel)) {
                                    previousOnCancel.push(onCancel);
                                } else {
                                    this._setOnCancel([previousOnCancel, onCancel]);
                                }
                            } else {
                                this._setOnCancel(onCancel);
                            }
                        }
                        /**
                         * @return {?}
                         */
                        function cancellationOnCancel() {
                            return this._onCancelField;
                        }
                        /**
                         * @param {!Object} obj
                         * @return {undefined}
                         */
                        function cancellationSetOnCancel(obj) {
                            /** @type {!Object} */
                            this._onCancelField = obj;
                        }
                        /**
                         * @return {undefined}
                         */
                        function cancellationClearCancellationData() {
                            this._cancellationParent = void 0;
                            this._onCancelField = void 0;
                        }
                        /**
                         * @param {!Object} parent
                         * @param {number} flags
                         * @return {undefined}
                         */
                        function cancellationPropagateFrom(parent, flags) {
                            if (0 != (1 & flags)) {
                                /** @type {!Object} */
                                this._cancellationParent = parent;
                                var branchesRemainingToCancel = parent._branchesRemainingToCancel;
                                if (void 0 === branchesRemainingToCancel) {
                                    /** @type {number} */
                                    branchesRemainingToCancel = 0;
                                }
                                parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
                            }
                            if (0 != (2 & flags) && parent._isBound()) {
                                this._setBoundTo(parent._boundTo);
                            }
                        }
                        /**
                         * @param {!Object} parent
                         * @param {number} flags
                         * @return {undefined}
                         */
                        function bindingPropagateFrom(parent, flags) {
                            if (0 != (2 & flags) && parent._isBound()) {
                                this._setBoundTo(parent._boundTo);
                            }
                        }
                        /**
                         * @return {?}
                         */
                        function boundValueFunction() {
                            var ret = this._boundTo;
                            return void 0 !== ret && ret instanceof Promise ? ret.isFulfilled() ? ret.value() : void 0 : ret;
                        }
                        /**
                         * @return {undefined}
                         */
                        function longStackTracesCaptureStackTrace() {
                            this._trace = new CapturedTrace(this._peekContext());
                        }
                        /**
                         * @param {(Object|string)} error
                         * @param {boolean} ignoreSelf
                         * @return {undefined}
                         */
                        function longStackTracesAttachExtraTrace(error, ignoreSelf) {
                            if (canAttachTrace(error)) {
                                var trace = this._trace;
                                if (void 0 !== trace && ignoreSelf && (trace = trace._parent), void 0 !== trace) {
                                    trace.attachExtraTrace(error);
                                } else {
                                    if (!error.__stackCleaned__) {
                                        var parsed = parseStackAndMessage(error);
                                        util.notEnumerableProp(error, "stack", parsed.message + "\n" + parsed.stack.join("\n"));
                                        util.notEnumerableProp(error, "__stackCleaned__", true);
                                    }
                                }
                            }
                        }
                        /**
                         * @return {undefined}
                         */
                        function Promise$_attachExtraTrace() {
                            this._trace = void 0;
                        }
                        /**
                         * @param {number} returnValue
                         * @param {number} promiseCreated
                         * @param {string} name
                         * @param {!Function} promise
                         * @param {number} parent
                         * @return {undefined}
                         */
                        function checkForgottenReturns(returnValue, promiseCreated, name, promise, parent) {
                            if (void 0 === returnValue && null !== promiseCreated && wForgottenReturn) {
                                if (void 0 !== parent && parent._returnedNonUndefined()) {
                                    return;
                                }
                                if (0 == (65535 & promise._bitField)) {
                                    return;
                                }
                                if (name) {
                                    /** @type {string} */
                                    name = name + " ";
                                }
                                /** @type {string} */
                                var th_field = "";
                                /** @type {string} */
                                var creatorLine = "";
                                if (promiseCreated._trace) {
                                    var traceLines = promiseCreated._trace.stack.split("\n");
                                    var stack = cleanStack(traceLines);
                                    /** @type {number} */
                                    var i = stack.length - 1;
                                    for (; i >= 0; --i) {
                                        var line = stack[i];
                                        if (!MULTI_LINE_COMMENT_REGEX.test(line)) {
                                            var scheduledStuff = line.match(scheduledRE);
                                            if (scheduledStuff) {
                                                /** @type {string} */
                                                th_field = "at " + scheduledStuff[1] + ":" + scheduledStuff[2] + ":" + scheduledStuff[3] + " ";
                                            }
                                            break;
                                        }
                                    }
                                    if (stack.length > 0) {
                                        var firstUserLine = stack[0];
                                        /** @type {number} */
                                        i = 0;
                                        for (; i < traceLines.length; ++i) {
                                            if (traceLines[i] === firstUserLine) {
                                                if (i > 0) {
                                                    creatorLine = "\n" + traceLines[i - 1];
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                                /** @type {string} */
                                var msg = "a promise was created in a " + name + "handler " + th_field + "but was not returned from it, see http://goo.gl/rRqMUw" + creatorLine;
                                promise._warn(msg, true, promiseCreated);
                            }
                        }
                        /**
                         * @param {string} name
                         * @param {string} res
                         * @return {?}
                         */
                        function deprecated(name, res) {
                            /** @type {string} */
                            var message = name + " is deprecated and will be removed in a future version.";
                            return res && (message = message + (" Use " + res + " instead.")), warn(message);
                        }
                        /**
                         * @param {string} text
                         * @param {!Object} type
                         * @param {?} promise
                         * @return {undefined}
                         */
                        function warn(text, type, promise) {
                            if (config.warnings) {
                                var ctx;
                                var warning = new Warning(text);
                                if (type) {
                                    promise._attachExtraTrace(warning);
                                } else {
                                    if (config.longStackTraces && (ctx = Promise._peekContext())) {
                                        ctx.attachExtraTrace(warning);
                                    } else {
                                        var parsed = parseStackAndMessage(warning);
                                        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
                                    }
                                }
                                if (!activeFireEvent("warning", warning)) {
                                    formatAndLogError(warning, "", true);
                                }
                            }
                        }
                        /**
                         * @param {string} message
                         * @param {!Array} stacks
                         * @return {?}
                         */
                        function reconstructStack(message, stacks) {
                            /** @type {number} */
                            var i = 0;
                            for (; i < stacks.length - 1; ++i) {
                                stacks[i].push("From previous event:");
                                stacks[i] = stacks[i].join("\n");
                            }
                            return i < stacks.length && (stacks[i] = stacks[i].join("\n")), message + "\n" + stacks.join("\n");
                        }
                        /**
                         * @param {!Array} stacks
                         * @return {undefined}
                         */
                        function removeDuplicateOrEmptyJumps(stacks) {
                            /** @type {number} */
                            var i = 0;
                            for (; i < stacks.length; ++i) {
                                if (0 === stacks[i].length || i + 1 < stacks.length && stacks[i][0] === stacks[i + 1][0]) {
                                    stacks.splice(i, 1);
                                    i--;
                                }
                            }
                        }
                        /**
                         * @param {!Array} stacks
                         * @return {undefined}
                         */
                        function removeCommonRoots(stacks) {
                            var current = stacks[0];
                            /** @type {number} */
                            var i = 1;
                            for (; i < stacks.length; ++i) {
                                var prev = stacks[i];
                                /** @type {number} */
                                var currentLastIndex = current.length - 1;
                                var currentLastLine = current[currentLastIndex];
                                /** @type {number} */
                                var aWeightIndex = -1;
                                /** @type {number} */
                                var j = prev.length - 1;
                                for (; j >= 0; --j) {
                                    if (prev[j] === currentLastLine) {
                                        /** @type {number} */
                                        aWeightIndex = j;
                                        break;
                                    }
                                }
                                /** @type {number} */
                                j = aWeightIndex;
                                for (; j >= 0; --j) {
                                    var line = prev[j];
                                    if (current[currentLastIndex] !== line) {
                                        break;
                                    }
                                    current.pop();
                                    currentLastIndex--;
                                }
                                current = prev;
                            }
                        }
                        /**
                         * @param {!NodeList} stack
                         * @return {?}
                         */
                        function cleanStack(stack) {
                            /** @type {!Array} */
                            var ret = [];
                            /** @type {number} */
                            var i = 0;
                            for (; i < stack.length; ++i) {
                                var line = stack[i];
                                var isTraceLine = "    (No stack trace)" === line || name.test(line);
                                var isInternalFrame = isTraceLine && shouldIgnore(line);
                                if (isTraceLine && !isInternalFrame) {
                                    if (Y && " " !== line.charAt(0)) {
                                        /** @type {string} */
                                        line = "    " + line;
                                    }
                                    ret.push(line);
                                }
                            }
                            return ret;
                        }
                        /**
                         * @param {!Object} error
                         * @return {?}
                         */
                        function stackFramesAsArray(error) {
                            var rgb = error.stack.replace(/\s+$/g, "").split("\n");
                            /** @type {number} */
                            var i = 0;
                            for (; i < rgb.length; ++i) {
                                var r = rgb[i];
                                if ("    (No stack trace)" === r || name.test(r)) {
                                    break;
                                }
                            }
                            return i > 0 && "SyntaxError" != error.name && (rgb = rgb.slice(i)), rgb;
                        }
                        /**
                         * @param {!Object} error
                         * @return {?}
                         */
                        function parseStackAndMessage(error) {
                            var stack = error.stack;
                            var msg_obj = error.toString();
                            return stack = "string" == typeof stack && stack.length > 0 ? stackFramesAsArray(error) : ["    (No stack trace)"], {
                                message : msg_obj,
                                stack : "SyntaxError" == error.name ? stack : cleanStack(stack)
                            };
                        }
                        /**
                         * @param {!Object} error
                         * @param {string} title
                         * @param {string} isSoft
                         * @return {undefined}
                         */
                        function formatAndLogError(error, title, isSoft) {
                            if ("undefined" != typeof console) {
                                var message;
                                if (util.isObject(error)) {
                                    var stack = error.stack;
                                    message = title + log(stack, error);
                                } else {
                                    /** @type {string} */
                                    message = title + String(error);
                                }
                                if ("function" == typeof printWarning) {
                                    printWarning(message, isSoft);
                                } else {
                                    if (!("function" != typeof console.log && "object" != typeof console.log)) {
                                        console.log(message);
                                    }
                                }
                            }
                        }
                        /**
                         * @param {string} name
                         * @param {?} localHandler
                         * @param {!Object} reason
                         * @param {?} promise
                         * @return {undefined}
                         */
                        function fireRejectionEvent(name, localHandler, reason, promise) {
                            /** @type {boolean} */
                            var defaultType = false;
                            try {
                                if ("function" == typeof localHandler) {
                                    /** @type {boolean} */
                                    defaultType = true;
                                    if ("rejectionHandled" === name) {
                                        localHandler(promise);
                                    } else {
                                        localHandler(reason, promise);
                                    }
                                }
                            } catch (e) {
                                async.throwLater(e);
                            }
                            if ("unhandledRejection" === name) {
                                if (!(activeFireEvent(name, reason, promise) || defaultType)) {
                                    formatAndLogError(reason, "Unhandled rejection ");
                                }
                            } else {
                                activeFireEvent(name, promise);
                            }
                        }
                        /**
                         * @param {!Object} obj
                         * @return {?}
                         */
                        function toString(obj) {
                            var flag;
                            if ("function" == typeof obj) {
                                /** @type {string} */
                                flag = "[function " + (obj.name || "anonymous") + "]";
                            } else {
                                flag = obj && "function" == typeof obj.toString ? obj.toString() : util.toString(obj);
                                if (/\[object [a-zA-Z0-9$_]+\]/.test(flag)) {
                                    try {
                                        /** @type {string} */
                                        flag = JSON.stringify(obj);
                                    } catch (t) {
                                    }
                                }
                                if (0 === flag.length) {
                                    /** @type {string} */
                                    flag = "(empty array)";
                                }
                            }
                            return "(<" + S(flag) + ">, no stack trace)";
                        }
                        /**
                         * @param {string} b
                         * @return {?}
                         */
                        function S(b) {
                            return b.length < 41 ? b : b.substr(0, 38) + "...";
                        }
                        /**
                         * @return {?}
                         */
                        function longStackTracesIsSupported() {
                            return "function" == typeof captureStackTrace;
                        }
                        /**
                         * @param {string} line
                         * @return {?}
                         */
                        function parseLineInfo(line) {
                            var matches = line.match(moduleRe);
                            if (matches) {
                                return {
                                    fileName : matches[1],
                                    line : parseInt(matches[2], 10)
                                };
                            }
                        }
                        /**
                         * @param {!Error} firstLineError
                         * @param {!Error} lastLineError
                         * @return {undefined}
                         */
                        function setBounds(firstLineError, lastLineError) {
                            if (longStackTracesIsSupported()) {
                                var firstFileName;
                                var lastFileName;
                                var firstStackLines = firstLineError.stack.split("\n");
                                var lastStackLines = lastLineError.stack.split("\n");
                                /** @type {number} */
                                var firstIndex = -1;
                                /** @type {number} */
                                var lastIndex = -1;
                                /** @type {number} */
                                var i = 0;
                                for (; i < firstStackLines.length; ++i) {
                                    var result = parseLineInfo(firstStackLines[i]);
                                    if (result) {
                                        firstFileName = result.fileName;
                                        firstIndex = result.line;
                                        break;
                                    }
                                }
                                /** @type {number} */
                                i = 0;
                                for (; i < lastStackLines.length; ++i) {
                                    result = parseLineInfo(lastStackLines[i]);
                                    if (result) {
                                        lastFileName = result.fileName;
                                        lastIndex = result.line;
                                        break;
                                    }
                                }
                                if (!(firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName || firstFileName !== lastFileName || firstIndex >= lastIndex)) {
                                    /**
                                     * @param {string} line
                                     * @return {?}
                                     */
                                    shouldIgnore = function(line) {
                                        if (nullRe.test(line)) {
                                            return true;
                                        }
                                        var info = parseLineInfo(line);
                                        return !!(info && info.fileName === firstFileName && firstIndex <= info.line && info.line <= lastIndex);
                                    };
                                }
                            }
                        }
                        /**
                         * @param {number} parent
                         * @return {undefined}
                         */
                        function CapturedTrace(parent) {
                            /** @type {number} */
                            this._parent = parent;
                            /** @type {number} */
                            this._promisesCreated = 0;
                            var length = this._length = 1 + (void 0 === parent ? 0 : parent._length);
                            captureStackTrace(this, CapturedTrace);
                            if (length > 32) {
                                this.uncycle();
                            }
                        }
                        var possiblyUnhandledRejection;
                        var unhandledRejectionHandled;
                        var printWarning;
                        var getDomain = Promise._getDomain;
                        var async = Promise._async;
                        var Warning = _dereq_("./errors").Warning;
                        var util = _dereq_("./util");
                        var utils = _dereq_("./es5");
                        var canAttachTrace = util.canAttachTrace;
                        /** @type {!RegExp} */
                        var nullRe = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
                        /** @type {!RegExp} */
                        var MULTI_LINE_COMMENT_REGEX = /\((?:timers\.js):\d+:\d+\)/;
                        /** @type {!RegExp} */
                        var scheduledRE = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
                        /** @type {null} */
                        var name = null;
                        /** @type {null} */
                        var log = null;
                        /** @type {boolean} */
                        var Y = false;
                        /** @type {boolean} */
                        var X = !(0 == util.env("BLUEBIRD_DEBUG"));
                        /** @type {boolean} */
                        var warnings = !(0 == util.env("BLUEBIRD_WARNINGS") || !X && !util.env("BLUEBIRD_WARNINGS"));
                        /** @type {boolean} */
                        var Z = !(0 == util.env("BLUEBIRD_LONG_STACK_TRACES") || !X && !util.env("BLUEBIRD_LONG_STACK_TRACES"));
                        /** @type {boolean} */
                        var wForgottenReturn = 0 != util.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype.suppressUnhandledRejections = function() {
                            var target = this._target();
                            /** @type {number} */
                            target._bitField = -1048577 & target._bitField | 524288;
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._ensurePossibleRejectionHandled = function() {
                            if (0 == (524288 & this._bitField)) {
                                this._setRejectionIsUnhandled();
                                var method = this;
                                setTimeout(function() {
                                    method._notifyUnhandledRejection();
                                }, 1);
                            }
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._notifyUnhandledRejectionIsHandled = function() {
                            fireRejectionEvent("rejectionHandled", possiblyUnhandledRejection, void 0, this);
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._setReturnedNonUndefined = function() {
                            /** @type {number} */
                            this._bitField = 268435456 | this._bitField;
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype._returnedNonUndefined = function() {
                            return 0 != (268435456 & this._bitField);
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._notifyUnhandledRejection = function() {
                            if (this._isRejectionUnhandled()) {
                                var reason = this._settledValue();
                                this._setUnhandledRejectionIsNotified();
                                fireRejectionEvent("unhandledRejection", unhandledRejectionHandled, reason, this);
                            }
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._setUnhandledRejectionIsNotified = function() {
                            /** @type {number} */
                            this._bitField = 262144 | this._bitField;
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._unsetUnhandledRejectionIsNotified = function() {
                            /** @type {number} */
                            this._bitField = -262145 & this._bitField;
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype._isUnhandledRejectionNotified = function() {
                            return (262144 & this._bitField) > 0;
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._setRejectionIsUnhandled = function() {
                            /** @type {number} */
                            this._bitField = 1048576 | this._bitField;
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._unsetRejectionIsUnhandled = function() {
                            /** @type {number} */
                            this._bitField = -1048577 & this._bitField;
                            if (this._isUnhandledRejectionNotified()) {
                                this._unsetUnhandledRejectionIsNotified();
                                this._notifyUnhandledRejectionIsHandled();
                            }
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype._isRejectionUnhandled = function() {
                            return (1048576 & this._bitField) > 0;
                        };
                        /**
                         * @param {string} file
                         * @param {string} msg
                         * @param {number} promise
                         * @return {?}
                         */
                        Promise.prototype._warn = function(file, msg, promise) {
                            return warn(file, msg, promise || this);
                        };
                        /**
                         * @param {string} fn
                         * @return {undefined}
                         */
                        Promise.onPossiblyUnhandledRejection = function(fn) {
                            var string = getDomain();
                            unhandledRejectionHandled = "function" == typeof fn ? null === string ? fn : util.domainBind(string, fn) : void 0;
                        };
                        /**
                         * @param {string} fn
                         * @return {undefined}
                         */
                        Promise.onUnhandledRejectionHandled = function(fn) {
                            var string = getDomain();
                            possiblyUnhandledRejection = "function" == typeof fn ? null === string ? fn : util.domainBind(string, fn) : void 0;
                        };
                        /**
                         * @return {undefined}
                         */
                        var disableLongStackTraces = function() {
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.longStackTraces = function() {
                            if (async.haveItemsQueued() && !config.longStackTraces) {
                                throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                            }
                            if (!config.longStackTraces && longStackTracesIsSupported()) {
                                var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
                                var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
                                var i = Promise.prototype._dereferenceTrace;
                                /** @type {boolean} */
                                config.longStackTraces = true;
                                /**
                                 * @return {undefined}
                                 */
                                disableLongStackTraces = function() {
                                    if (async.haveItemsQueued() && !config.longStackTraces) {
                                        throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                                    }
                                    Promise.prototype._captureStackTrace = Promise_captureStackTrace;
                                    Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
                                    Promise.prototype._dereferenceTrace = i;
                                    Context.deactivateLongStackTraces();
                                    async.enableTrampoline();
                                    /** @type {boolean} */
                                    config.longStackTraces = false;
                                };
                                /** @type {function(): undefined} */
                                Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
                                /** @type {function((Object|string), boolean): undefined} */
                                Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
                                /** @type {function(): undefined} */
                                Promise.prototype._dereferenceTrace = Promise$_attachExtraTrace;
                                Context.activateLongStackTraces();
                                async.disableTrampolineIfNecessary();
                            }
                        };
                        /**
                         * @return {?}
                         */
                        Promise.hasLongStackTraces = function() {
                            return config.longStackTraces && longStackTracesIsSupported();
                        };
                        var fireDomEvent = function() {
                            try {
                                if ("function" == typeof CustomEvent) {
                                    /** @type {!CustomEvent} */
                                    var event = new CustomEvent("CustomEvent");
                                    return util.global.dispatchEvent(event), function(p_Interval, data) {
                                        var props = {
                                            detail : data,
                                            cancelable : true
                                        };
                                        utils.defineProperty(props, "promise", {
                                            value : data.promise
                                        });
                                        utils.defineProperty(props, "reason", {
                                            value : data.reason
                                        });
                                        /** @type {!CustomEvent} */
                                        var e = new CustomEvent(p_Interval.toLowerCase(), props);
                                        return !util.global.dispatchEvent(e);
                                    };
                                }
                                if ("function" == typeof Event) {
                                    /** @type {!Event} */
                                    event = new Event("CustomEvent");
                                    return util.global.dispatchEvent(event), function(p_Interval, eventData) {
                                        /** @type {!Event} */
                                        var event = new Event(p_Interval.toLowerCase(), {
                                            cancelable : true
                                        });
                                        return event.detail = eventData, utils.defineProperty(event, "promise", {
                                            value : eventData.promise
                                        }), utils.defineProperty(event, "reason", {
                                            value : eventData.reason
                                        }), !util.global.dispatchEvent(event);
                                    };
                                }
                                /** @type {(Event|null)} */
                                event = document.createEvent("CustomEvent");
                                return event.initCustomEvent("testingtheevent", false, true, {}), util.global.dispatchEvent(event), function(p_Interval, data) {
                                    /** @type {(Event|null)} */
                                    var event = document.createEvent("CustomEvent");
                                    return event.initCustomEvent(p_Interval.toLowerCase(), false, true, data), !util.global.dispatchEvent(event);
                                };
                            } catch (t) {
                            }
                            return function() {
                                return false;
                            };
                        }();
                        var fireGlobalEvent = function() {
                            return util.isNode ? function() {
                                return options.emit.apply(options, arguments);
                            } : util.global ? function(p_Interval) {
                                var methodName = "on" + p_Interval.toLowerCase();
                                var method = util.global[methodName];
                                return !!method && (method.apply(util.global, [].slice.call(arguments, 1)), true);
                            } : function() {
                                return false;
                            };
                        }();
                        var eventToObjectGenerator = {
                            promiseCreated : generatePromiseLifecycleEventObject,
                            promiseFulfilled : generatePromiseLifecycleEventObject,
                            promiseRejected : generatePromiseLifecycleEventObject,
                            promiseResolved : generatePromiseLifecycleEventObject,
                            promiseCancelled : generatePromiseLifecycleEventObject,
                            promiseChained : function(name, promise, child) {
                                return {
                                    promise : promise,
                                    child : child
                                };
                            },
                            warning : function(name, warning) {
                                return {
                                    warning : warning
                                };
                            },
                            unhandledRejection : function(name, reason, promise) {
                                return {
                                    reason : reason,
                                    promise : promise
                                };
                            },
                            rejectionHandled : generatePromiseLifecycleEventObject
                        };
                        /**
                         * @param {string} name
                         * @return {?}
                         */
                        var activeFireEvent = function(name) {
                            /** @type {boolean} */
                            var globalEventFired = false;
                            try {
                                globalEventFired = fireGlobalEvent.apply(null, arguments);
                            } catch (e) {
                                async.throwLater(e);
                                /** @type {boolean} */
                                globalEventFired = true;
                            }
                            /** @type {boolean} */
                            var domEventFired = false;
                            try {
                                domEventFired = fireDomEvent(name, eventToObjectGenerator[name].apply(null, arguments));
                            } catch (e) {
                                async.throwLater(e);
                                /** @type {boolean} */
                                domEventFired = true;
                            }
                            return domEventFired || globalEventFired;
                        };
                        /**
                         * @param {!Object} opts
                         * @return {?}
                         */
                        Promise.config = function(opts) {
                            if (opts = Object(opts), "longStackTraces" in opts && (opts.longStackTraces ? Promise.longStackTraces() : !opts.longStackTraces && Promise.hasLongStackTraces() && disableLongStackTraces()), "warnings" in opts) {
                                var warningsOption = opts.warnings;
                                /** @type {boolean} */
                                config.warnings = !!warningsOption;
                                /** @type {boolean} */
                                wForgottenReturn = config.warnings;
                                if (util.isObject(warningsOption) && "wForgottenReturn" in warningsOption) {
                                    /** @type {boolean} */
                                    wForgottenReturn = !!warningsOption.wForgottenReturn;
                                }
                            }
                            if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
                                if (async.haveItemsQueued()) {
                                    throw new Error("cannot enable cancellation after promises are in use");
                                }
                                /** @type {function(): undefined} */
                                Promise.prototype._clearCancellationData = cancellationClearCancellationData;
                                /** @type {function(!Object, number): undefined} */
                                Promise.prototype._propagateFrom = cancellationPropagateFrom;
                                /** @type {function(): ?} */
                                Promise.prototype._onCancel = cancellationOnCancel;
                                /** @type {function(!Object): undefined} */
                                Promise.prototype._setOnCancel = cancellationSetOnCancel;
                                /** @type {function(!Array): ?} */
                                Promise.prototype._attachCancellationCallback = cancellationAttachCancellationCallback;
                                /** @type {function(!Function, !Function, !Function): ?} */
                                Promise.prototype._execute = cancellationExecute;
                                /** @type {function(!Object, number): undefined} */
                                propagateFromFunction = cancellationPropagateFrom;
                                /** @type {boolean} */
                                config.cancellation = true;
                            }
                            return "monitoring" in opts && (opts.monitoring && !config.monitoring ? (config.monitoring = true, Promise.prototype._fireEvent = activeFireEvent) : !opts.monitoring && config.monitoring && (config.monitoring = false, Promise.prototype._fireEvent = defaultFireEvent)), Promise;
                        };
                        /** @type {function(): ?} */
                        Promise.prototype._fireEvent = defaultFireEvent;
                        /**
                         * @param {!Function} executor
                         * @param {!Function} resolve
                         * @param {!Function} reject
                         * @return {?}
                         */
                        Promise.prototype._execute = function(executor, resolve, reject) {
                            try {
                                executor(resolve, reject);
                            } catch (e) {
                                return e;
                            }
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._onCancel = function() {
                        };
                        /**
                         * @param {!Array} handler
                         * @return {undefined}
                         */
                        Promise.prototype._setOnCancel = function(handler) {
                        };
                        /**
                         * @param {!Object} onCancel
                         * @return {undefined}
                         */
                        Promise.prototype._attachCancellationCallback = function(onCancel) {
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._captureStackTrace = function() {
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._attachExtraTrace = function() {
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._dereferenceTrace = function() {
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._clearCancellationData = function() {
                        };
                        /**
                         * @param {!Object} parent
                         * @param {number} flags
                         * @return {undefined}
                         */
                        Promise.prototype._propagateFrom = function(parent, flags) {
                        };
                        /** @type {function(!Object, number): undefined} */
                        var propagateFromFunction = bindingPropagateFrom;
                        /**
                         * @return {?}
                         */
                        var shouldIgnore = function() {
                            return false;
                        };
                        /** @type {!RegExp} */
                        var moduleRe = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
                        util.inherits(CapturedTrace, Error);
                        /** @type {function(number): undefined} */
                        Context.CapturedTrace = CapturedTrace;
                        /**
                         * @return {undefined}
                         */
                        CapturedTrace.prototype.uncycle = function() {
                            var length = this._length;
                            if (!(length < 2)) {
                                /** @type {!Array} */
                                var nodes = [];
                                var stackToIndex = {};
                                /** @type {number} */
                                var i = 0;
                                var cur = this;
                                for (; void 0 !== cur; ++i) {
                                    nodes.push(cur);
                                    cur = cur._parent;
                                }
                                /** @type {number} */
                                length = this._length = i;
                                /** @type {number} */
                                i = length - 1;
                                for (; i >= 0; --i) {
                                    var stack = nodes[i].stack;
                                    if (void 0 === stackToIndex[stack]) {
                                        /** @type {number} */
                                        stackToIndex[stack] = i;
                                    }
                                }
                                /** @type {number} */
                                i = 0;
                                for (; i < length; ++i) {
                                    var currentStack = nodes[i].stack;
                                    var index = stackToIndex[currentStack];
                                    if (void 0 !== index && index !== i) {
                                        if (index > 0) {
                                            nodes[index - 1]._parent = void 0;
                                            /** @type {number} */
                                            nodes[index - 1]._length = 1;
                                        }
                                        nodes[i]._parent = void 0;
                                        /** @type {number} */
                                        nodes[i]._length = 1;
                                        var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;
                                        if (index < length - 1) {
                                            cycleEdgeNode._parent = nodes[index + 1];
                                            cycleEdgeNode._parent.uncycle();
                                            cycleEdgeNode._length = cycleEdgeNode._parent._length + 1;
                                        } else {
                                            cycleEdgeNode._parent = void 0;
                                            /** @type {number} */
                                            cycleEdgeNode._length = 1;
                                        }
                                        var currentChildLength = cycleEdgeNode._length + 1;
                                        /** @type {number} */
                                        var j = i - 2;
                                        for (; j >= 0; --j) {
                                            nodes[j]._length = currentChildLength;
                                            currentChildLength++;
                                        }
                                        return;
                                    }
                                }
                            }
                        };
                        /**
                         * @param {(Object|string)} error
                         * @return {undefined}
                         */
                        CapturedTrace.prototype.attachExtraTrace = function(error) {
                            if (!error.__stackCleaned__) {
                                this.uncycle();
                                var parsed = parseStackAndMessage(error);
                                var message = parsed.message;
                                /** @type {!Array} */
                                var stacks = [parsed.stack];
                                var trace = this;
                                for (; void 0 !== trace;) {
                                    stacks.push(cleanStack(trace.stack.split("\n")));
                                    trace = trace._parent;
                                }
                                removeCommonRoots(stacks);
                                removeDuplicateOrEmptyJumps(stacks);
                                util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
                                util.notEnumerableProp(error, "__stackCleaned__", true);
                            }
                        };
                        var captureStackTrace = function() {
                            /** @type {!RegExp} */
                            var __anonymous_function__ = /^\s*at\s*/;
                            /**
                             * @param {string} type
                             * @param {!Object} value
                             * @return {?}
                             */
                            var listener = function(type, value) {
                                return "string" == typeof type ? type : void 0 !== value.name && void 0 !== value.message ? value.toString() : toString(value);
                            };
                            if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                                Error.stackTraceLimit += 6;
                                /** @type {!RegExp} */
                                name = __anonymous_function__;
                                /** @type {function(string, !Object): ?} */
                                log = listener;
                                /** @type {function((Object|null), (!Function|null)=): undefined} */
                                var captureStackTrace = Error.captureStackTrace;
                                return shouldIgnore = function(line) {
                                    return nullRe.test(line);
                                }, function(receiver, ignoreUntil) {
                                    Error.stackTraceLimit += 6;
                                    captureStackTrace(receiver, ignoreUntil);
                                    Error.stackTraceLimit -= 6;
                                };
                            }
                            /** @type {!Error} */
                            var err = new Error;
                            if ("string" == typeof err.stack && err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
                                return name = /@/, log = listener, Y = true, function(to) {
                                    /** @type {string} */
                                    to.stack = (new Error).stack;
                                };
                            }
                            var hasStackAfterThrow;
                            try {
                                throw new Error;
                            } catch (e) {
                                /** @type {boolean} */
                                hasStackAfterThrow = "stack" in e;
                            }
                            return "stack" in err || !hasStackAfterThrow || "number" != typeof Error.stackTraceLimit ? (log = function(type, a) {
                                return "string" == typeof type ? type : "object" != typeof a && "function" != typeof a || void 0 === a.name || void 0 === a.message ? toString(a) : a.toString();
                            }, null) : (name = __anonymous_function__, log = listener, function(err2) {
                                Error.stackTraceLimit += 6;
                                try {
                                    throw new Error;
                                } catch (err) {
                                    err2.stack = err.stack;
                                }
                                Error.stackTraceLimit -= 6;
                            });
                        }();
                        if ("undefined" != typeof console && void 0 !== console.warn) {
                            /**
                             * @param {string} message
                             * @return {undefined}
                             */
                            printWarning = function(message) {
                                console.warn(message);
                            };
                            if (util.isNode && options.stderr.isTTY) {
                                /**
                                 * @param {string} message
                                 * @param {string} isSoft
                                 * @return {undefined}
                                 */
                                printWarning = function(message, isSoft) {
                                    /** @type {string} */
                                    var color = isSoft ? "\u001b[33m" : "\u001b[31m";
                                    console.warn(color + message + "\u001b[0m\n");
                                };
                            } else {
                                if (!(util.isNode || "string" != typeof(new Error).stack)) {
                                    /**
                                     * @param {string} message
                                     * @param {string} isSoft
                                     * @return {undefined}
                                     */
                                    printWarning = function(message, isSoft) {
                                        console.warn("%c" + message, isSoft ? "color: darkorange" : "color: red");
                                    };
                                }
                            }
                        }
                        var config = {
                            warnings : warnings,
                            longStackTraces : false,
                            cancellation : false,
                            monitoring : false
                        };
                        return Z && Promise.longStackTraces(), {
                            longStackTraces : function() {
                                return config.longStackTraces;
                            },
                            warnings : function() {
                                return config.warnings;
                            },
                            cancellation : function() {
                                return config.cancellation;
                            },
                            monitoring : function() {
                                return config.monitoring;
                            },
                            propagateFromFunction : function() {
                                return propagateFromFunction;
                            },
                            boundValueFunction : function() {
                                return boundValueFunction;
                            },
                            checkForgottenReturns : checkForgottenReturns,
                            setBounds : setBounds,
                            warn : warn,
                            deprecated : deprecated,
                            CapturedTrace : CapturedTrace,
                            fireDomEvent : fireDomEvent,
                            fireGlobalEvent : fireGlobalEvent
                        };
                    };
                }, {
                    "./errors" : 12,
                    "./es5" : 13,
                    "./util" : 36
                }],
                10 : [function(canCreateDiscussions, mixin, n) {
                    /**
                     * @param {!Function} Promise
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise) {
                        /**
                         * @return {?}
                         */
                        function returner() {
                            return this.value;
                        }
                        /**
                         * @return {?}
                         */
                        function thrower() {
                            throw this.reason;
                        }
                        /** @type {function(!Object): ?} */
                        Promise.prototype.return = Promise.prototype.thenReturn = function(value) {
                            return value instanceof Promise && value.suppressUnhandledRejections(), this._then(returner, void 0, void 0, {
                                value : value
                            }, void 0);
                        };
                        /** @type {function(string): ?} */
                        Promise.prototype.throw = Promise.prototype.thenThrow = function(reason) {
                            return this._then(thrower, void 0, void 0, {
                                reason : reason
                            }, void 0);
                        };
                        /**
                         * @param {string} reason
                         * @return {?}
                         */
                        Promise.prototype.catchThrow = function(reason) {
                            if (arguments.length <= 1) {
                                return this._then(void 0, thrower, void 0, {
                                    reason : reason
                                }, void 0);
                            }
                            var matched_check = arguments[1];
                            /**
                             * @return {?}
                             */
                            var handler = function() {
                                throw matched_check;
                            };
                            return this.caught(reason, handler);
                        };
                        /**
                         * @param {!Object} value
                         * @return {?}
                         */
                        Promise.prototype.catchReturn = function(value) {
                            if (arguments.length <= 1) {
                                return value instanceof Promise && value.suppressUnhandledRejections(), this._then(void 0, returner, void 0, {
                                    value : value
                                }, void 0);
                            }
                            var _value = arguments[1];
                            if (_value instanceof Promise) {
                                _value.suppressUnhandledRejections();
                            }
                            /**
                             * @return {?}
                             */
                            var handler = function() {
                                return _value;
                            };
                            return this.caught(value, handler);
                        };
                    };
                }, {}],
                11 : [function(canCreateDiscussions, mixin, n) {
                    /**
                     * @param {!Object} Promise
                     * @param {number} INTERNAL
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, INTERNAL) {
                        /**
                         * @return {?}
                         */
                        function mapper() {
                            return all(this);
                        }
                        /**
                         * @param {!Function} promises
                         * @param {!Function} fn
                         * @return {?}
                         */
                        function PromiseMapSeries(promises, fn) {
                            return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
                        }
                        var PromiseReduce = Promise.reduce;
                        var all = Promise.all;
                        /**
                         * @param {!Function} fn
                         * @return {?}
                         */
                        Promise.prototype.each = function(fn) {
                            return PromiseReduce(this, fn, INTERNAL, 0)._then(mapper, void 0, void 0, this, void 0);
                        };
                        /**
                         * @param {!Function} fn
                         * @return {?}
                         */
                        Promise.prototype.mapSeries = function(fn) {
                            return PromiseReduce(this, fn, INTERNAL, INTERNAL);
                        };
                        /**
                         * @param {!Function} value
                         * @param {!Function} fn
                         * @return {?}
                         */
                        Promise.each = function(value, fn) {
                            return PromiseReduce(value, fn, INTERNAL, 0)._then(mapper, void 0, void 0, value, void 0);
                        };
                        /** @type {function(!Function, !Function): ?} */
                        Promise.mapSeries = PromiseMapSeries;
                    };
                }, {}],
                12 : [function(require, module, n) {
                    /**
                     * @param {string} nameProperty
                     * @param {string} defaultMessage
                     * @return {?}
                     */
                    function subError(nameProperty, defaultMessage) {
                        /**
                         * @param {string} message
                         * @return {?}
                         */
                        function SubError(message) {
                            if (!(this instanceof SubError)) {
                                return new SubError(message);
                            }
                            notEnumerableProp(this, "message", "string" == typeof message ? message : defaultMessage);
                            notEnumerableProp(this, "name", nameProperty);
                            if (Error.captureStackTrace) {
                                Error.captureStackTrace(this, this.constructor);
                            } else {
                                Error.call(this);
                            }
                        }
                        return inherits(SubError, Error), SubError;
                    }
                    /**
                     * @param {?} message
                     * @return {?}
                     */
                    function OperationalError(message) {
                        if (!(this instanceof OperationalError)) {
                            return new OperationalError(message);
                        }
                        notEnumerableProp(this, "name", "OperationalError");
                        notEnumerableProp(this, "message", message);
                        this.cause = message;
                        /** @type {boolean} */
                        this.isOperational = true;
                        if (message instanceof Error) {
                            notEnumerableProp(this, "message", message.message);
                            notEnumerableProp(this, "stack", message.stack);
                        } else {
                            if (Error.captureStackTrace) {
                                Error.captureStackTrace(this, this.constructor);
                            }
                        }
                    }
                    var _TypeError;
                    var _RangeError;
                    var es5 = require("./es5");
                    var Objectfreeze = es5.freeze;
                    var util = require("./util");
                    var inherits = util.inherits;
                    var notEnumerableProp = util.notEnumerableProp;
                    var Warning = subError("Warning", "warning");
                    var CancellationError = subError("CancellationError", "cancellation error");
                    var TimeoutError = subError("TimeoutError", "timeout error");
                    var AggregateError = subError("AggregateError", "aggregate error");
                    try {
                        /** @type {function(new:TypeError, *=, *=, *=): !TypeError} */
                        _TypeError = TypeError;
                        /** @type {function(new:RangeError, *=, *=, *=): !RangeError} */
                        _RangeError = RangeError;
                    } catch (t) {
                        _TypeError = subError("TypeError", "type error");
                        _RangeError = subError("RangeError", "range error");
                    }
                    /** @type {!Array<string>} */
                    var methods = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" ");
                    /** @type {number} */
                    var i = 0;
                    for (; i < methods.length; ++i) {
                        if ("function" == typeof Array.prototype[methods[i]]) {
                            AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
                        }
                    }
                    es5.defineProperty(AggregateError.prototype, "length", {
                        value : 0,
                        configurable : false,
                        writable : true,
                        enumerable : true
                    });
                    /** @type {boolean} */
                    AggregateError.prototype.isOperational = true;
                    /** @type {number} */
                    var length = 0;
                    /**
                     * @return {?}
                     */
                    AggregateError.prototype.toString = function() {
                        /** @type {string} */
                        var strStart = Array(4 * length + 1).join(" ");
                        /** @type {string} */
                        var seed_to_use_for_salt = "\n" + strStart + "AggregateError of:\n";
                        length++;
                        /** @type {string} */
                        strStart = Array(4 * length + 1).join(" ");
                        /** @type {number} */
                        var i = 0;
                        for (; i < this.length; ++i) {
                            var _ = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
                            var dataA = _.split("\n");
                            /** @type {number} */
                            var b = 0;
                            for (; b < dataA.length; ++b) {
                                dataA[b] = strStart + dataA[b];
                            }
                            _ = dataA.join("\n");
                            /** @type {string} */
                            seed_to_use_for_salt = seed_to_use_for_salt + (_ + "\n");
                        }
                        return length--, seed_to_use_for_salt;
                    };
                    inherits(OperationalError, Error);
                    var errorTypes = Error.__BluebirdErrorTypes__;
                    if (!errorTypes) {
                        errorTypes = Objectfreeze({
                            CancellationError : CancellationError,
                            TimeoutError : TimeoutError,
                            OperationalError : OperationalError,
                            RejectionError : OperationalError,
                            AggregateError : AggregateError
                        });
                        es5.defineProperty(Error, "__BluebirdErrorTypes__", {
                            value : errorTypes,
                            writable : false,
                            enumerable : false,
                            configurable : false
                        });
                    }
                    module.exports = {
                        Error : Error,
                        TypeError : _TypeError,
                        RangeError : _RangeError,
                        CancellationError : errorTypes.CancellationError,
                        OperationalError : errorTypes.OperationalError,
                        TimeoutError : errorTypes.TimeoutError,
                        AggregateError : errorTypes.AggregateError,
                        Warning : Warning
                    };
                }, {
                    "./es5" : 13,
                    "./util" : 36
                }],
                13 : [function(canCreateDiscussions, module, n) {
                    var isES5 = function() {
                        return void 0 === this;
                    }();
                    if (isES5) {
                        module.exports = {
                            freeze : Object.freeze,
                            defineProperty : Object.defineProperty,
                            getDescriptor : Object.getOwnPropertyDescriptor,
                            keys : Object.keys,
                            names : Object.getOwnPropertyNames,
                            getPrototypeOf : Object.getPrototypeOf,
                            isArray : Array.isArray,
                            isES5 : isES5,
                            propertyIsWritable : function(obj, prop) {
                                /** @type {(ObjectPropertyDescriptor<?>|undefined)} */
                                var desc = Object.getOwnPropertyDescriptor(obj, prop);
                                return !(desc && !desc.writable && !desc.set);
                            }
                        };
                    } else {
                        /** @type {function(this:Object, *): boolean} */
                        var hasOwnProperty = {}.hasOwnProperty;
                        /** @type {function(this:*): string} */
                        var objToString = {}.toString;
                        var prototypeOfObject = {}.constructor.prototype;
                        /**
                         * @param {?} o
                         * @return {?}
                         */
                        var ObjectKeys = function(o) {
                            /** @type {!Array} */
                            var ret = [];
                            var key;
                            for (key in o) {
                                if (hasOwnProperty.call(o, key)) {
                                    ret.push(key);
                                }
                            }
                            return ret;
                        };
                        /**
                         * @param {!Object} date
                         * @param {string} name
                         * @return {?}
                         */
                        var c = function(date, name) {
                            return {
                                value : date[name]
                            };
                        };
                        /**
                         * @param {!Object} obj
                         * @param {string} key
                         * @param {!Object} desc
                         * @return {?}
                         */
                        var ObjectDefineProperty = function(obj, key, desc) {
                            return obj[key] = desc.value, obj;
                        };
                        /**
                         * @param {?} s
                         * @return {?}
                         */
                        var bv_trim = function(s) {
                            return s;
                        };
                        /**
                         * @param {!Function} object
                         * @return {?}
                         */
                        var getPrototypeOf = function(object) {
                            try {
                                return Object(object).constructor.prototype;
                            } catch (t) {
                                return prototypeOfObject;
                            }
                        };
                        /**
                         * @param {!Object} obj
                         * @return {?}
                         */
                        var _isArray = function(obj) {
                            try {
                                return "[object Array]" === objToString.call(obj);
                            } catch (t) {
                                return false;
                            }
                        };
                        module.exports = {
                            isArray : _isArray,
                            keys : ObjectKeys,
                            names : ObjectKeys,
                            defineProperty : ObjectDefineProperty,
                            getDescriptor : c,
                            freeze : bv_trim,
                            getPrototypeOf : getPrototypeOf,
                            isES5 : isES5,
                            propertyIsWritable : function() {
                                return true;
                            }
                        };
                    }
                }, {}],
                14 : [function(canCreateDiscussions, mixin, n) {
                    /**
                     * @param {string} Promise
                     * @param {!Object} obj
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, obj) {
                        var resolve = Promise.map;
                        /**
                         * @param {!Function} callback
                         * @param {(Object|string)} name
                         * @return {?}
                         */
                        Promise.prototype.filter = function(callback, name) {
                            return resolve(this, callback, name, obj);
                        };
                        /**
                         * @param {!Function} name
                         * @param {!Function} fn
                         * @param {(Object|string)} callback
                         * @return {?}
                         */
                        Promise.filter = function(name, fn, callback) {
                            return resolve(name, fn, callback, obj);
                        };
                    };
                }, {}],
                15 : [function(require, mixin, n) {
                    /**
                     * @param {string} Promise
                     * @param {!Object} tryConvertToPromise
                     * @param {!Object} NEXT_FILTER
                     * @return {?}
                     */
                    mixin.exports = function(Promise, tryConvertToPromise, NEXT_FILTER) {
                        /**
                         * @param {!Function} promise
                         * @param {string} type
                         * @param {!Function} handler
                         * @return {undefined}
                         */
                        function PassThroughHandlerContext(promise, type, handler) {
                            /** @type {!Function} */
                            this.promise = promise;
                            /** @type {string} */
                            this.type = type;
                            /** @type {!Function} */
                            this.handler = handler;
                            /** @type {boolean} */
                            this.called = false;
                            /** @type {null} */
                            this.cancelPromise = null;
                        }
                        /**
                         * @param {?} finallyHandler
                         * @return {undefined}
                         */
                        function FinallyHandlerCancelReaction(finallyHandler) {
                            this.finallyHandler = finallyHandler;
                        }
                        /**
                         * @param {?} ctx
                         * @param {!Object} reason
                         * @return {?}
                         */
                        function checkCancel(ctx, reason) {
                            return null != ctx.cancelPromise && (arguments.length > 1 ? ctx.cancelPromise._reject(reason) : ctx.cancelPromise._cancel(), ctx.cancelPromise = null, true);
                        }
                        /**
                         * @return {?}
                         */
                        function succeed() {
                            return finallyHandler.call(this, this.promise._target()._settledValue());
                        }
                        /**
                         * @param {string} reason
                         * @return {?}
                         */
                        function fail(reason) {
                            if (!checkCancel(this, reason)) {
                                return errorObj.e = reason, errorObj;
                            }
                        }
                        /**
                         * @param {!Function} reasonOrValue
                         * @return {?}
                         */
                        function finallyHandler(reasonOrValue) {
                            var promise = this.promise;
                            var handler = this.handler;
                            if (!this.called) {
                                /** @type {boolean} */
                                this.called = true;
                                var ret = this.isFinallyHandler() ? handler.call(promise._boundValue()) : handler.call(promise._boundValue(), reasonOrValue);
                                if (ret === NEXT_FILTER) {
                                    return ret;
                                }
                                if (void 0 !== ret) {
                                    promise._setReturnedNonUndefined();
                                    var maybePromise = tryConvertToPromise(ret, promise);
                                    if (maybePromise instanceof Promise) {
                                        if (null != this.cancelPromise) {
                                            if (maybePromise._isCancelled()) {
                                                var reason = new CancellationError("late cancellation observer");
                                                return promise._attachExtraTrace(reason), errorObj.e = reason, errorObj;
                                            }
                                            if (maybePromise.isPending()) {
                                                maybePromise._attachCancellationCallback(new FinallyHandlerCancelReaction(this));
                                            }
                                        }
                                        return maybePromise._then(succeed, fail, void 0, this, void 0);
                                    }
                                }
                            }
                            return promise.isRejected() ? (checkCancel(this), errorObj.e = reasonOrValue, errorObj) : (checkCancel(this), reasonOrValue);
                        }
                        var util = require("./util");
                        var CancellationError = Promise.CancellationError;
                        var errorObj = util.errorObj;
                        var catchFilter = require("./catch_filter")(NEXT_FILTER);
                        return PassThroughHandlerContext.prototype.isFinallyHandler = function() {
                            return 0 === this.type;
                        }, FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
                            checkCancel(this.finallyHandler);
                        }, Promise.prototype._passThrough = function(handler, type, success, fail) {
                            return "function" != typeof handler ? this.then() : this._then(success, fail, void 0, new PassThroughHandlerContext(this, type, handler), void 0);
                        }, Promise.prototype.lastly = Promise.prototype.finally = function(handler) {
                            return this._passThrough(handler, 0, finallyHandler, finallyHandler);
                        }, Promise.prototype.tap = function(handler) {
                            return this._passThrough(handler, 1, finallyHandler);
                        }, Promise.prototype.tapCatch = function(handlerOrPredicate) {
                            /** @type {number} */
                            var l = arguments.length;
                            if (1 === l) {
                                return this._passThrough(handlerOrPredicate, 1, void 0, finallyHandler);
                            }
                            var i;
                            /** @type {!Array} */
                            var catchInstances = new Array(l - 1);
                            /** @type {number} */
                            var j = 0;
                            /** @type {number} */
                            i = 0;
                            for (; i < l - 1; ++i) {
                                var item = arguments[i];
                                if (!util.isObject(item)) {
                                    return Promise.reject(new TypeError("tapCatch statement predicate: expecting an object but got " + util.classString(item)));
                                }
                                catchInstances[j++] = item;
                            }
                            /** @type {number} */
                            catchInstances.length = j;
                            var handler = arguments[i];
                            return this._passThrough(catchFilter(catchInstances, handler, this), 1, void 0, finallyHandler);
                        }, PassThroughHandlerContext;
                    };
                }, {
                    "./catch_filter" : 7,
                    "./util" : 36
                }],
                16 : [function(require, mixin, n) {
                    /**
                     * @param {!Object} Promise
                     * @param {!Object} fn
                     * @param {!Object} INTERNAL
                     * @param {?} tryConvertToPromise
                     * @param {!Function} Proxyable
                     * @param {!Object} debug
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, fn, INTERNAL, tryConvertToPromise, Proxyable, debug) {
                        /**
                         * @param {?} value
                         * @param {!NodeList} yieldHandlers
                         * @param {?} traceParent
                         * @return {?}
                         */
                        function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
                            /** @type {number} */
                            var i = 0;
                            for (; i < yieldHandlers.length; ++i) {
                                traceParent._pushContext();
                                var ret = tryCatch(yieldHandlers[i])(value);
                                if (traceParent._popContext(), ret === errorObj) {
                                    traceParent._pushContext();
                                    var s = Promise.reject(errorObj.e);
                                    return traceParent._popContext(), s;
                                }
                                var maybePromise = tryConvertToPromise(ret, traceParent);
                                if (maybePromise instanceof Promise) {
                                    return maybePromise;
                                }
                            }
                            return null;
                        }
                        /**
                         * @param {string} generatorFunction
                         * @param {!Function} receiver
                         * @param {?} yieldHandler
                         * @param {string} stack
                         * @return {undefined}
                         */
                        function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
                            if (debug.cancellation()) {
                                var promise = new Promise(INTERNAL);
                                var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
                                this._promise = promise.lastly(function() {
                                    return _finallyPromise;
                                });
                                promise._captureStackTrace();
                                promise._setOnCancel(this);
                            } else {
                                (this._promise = new Promise(INTERNAL))._captureStackTrace();
                            }
                            /** @type {string} */
                            this._stack = stack;
                            /** @type {string} */
                            this._generatorFunction = generatorFunction;
                            /** @type {!Function} */
                            this._receiver = receiver;
                            this._generator = void 0;
                            /** @type {!Array<?>} */
                            this._yieldHandlers = "function" == typeof yieldHandler ? [yieldHandler].concat(s) : s;
                            /** @type {null} */
                            this._yieldedPromise = null;
                            /** @type {boolean} */
                            this._cancellationPhase = false;
                        }
                        var errors = require("./errors");
                        var TypeError = errors.TypeError;
                        var util = require("./util");
                        var errorObj = util.errorObj;
                        var tryCatch = util.tryCatch;
                        /** @type {!Array} */
                        var s = [];
                        util.inherits(PromiseSpawn, Proxyable);
                        /**
                         * @return {?}
                         */
                        PromiseSpawn.prototype._isResolved = function() {
                            return null === this._promise;
                        };
                        /**
                         * @return {undefined}
                         */
                        PromiseSpawn.prototype._cleanup = function() {
                            /** @type {null} */
                            this._promise = this._generator = null;
                            if (debug.cancellation() && null !== this._finallyPromise) {
                                this._finallyPromise._fulfill();
                                /** @type {null} */
                                this._finallyPromise = null;
                            }
                        };
                        /**
                         * @return {undefined}
                         */
                        PromiseSpawn.prototype._promiseCancelled = function() {
                            if (!this._isResolved()) {
                                var result;
                                /** @type {boolean} */
                                var n = void 0 !== this._generator.return;
                                if (n) {
                                    this._promise._pushContext();
                                    result = tryCatch(this._generator.return).call(this._generator, void 0);
                                    this._promise._popContext();
                                } else {
                                    var reason = new Promise.CancellationError("generator .return() sentinel");
                                    Promise.coroutine.returnSentinel = reason;
                                    this._promise._attachExtraTrace(reason);
                                    this._promise._pushContext();
                                    result = tryCatch(this._generator.throw).call(this._generator, reason);
                                    this._promise._popContext();
                                }
                                /** @type {boolean} */
                                this._cancellationPhase = true;
                                /** @type {null} */
                                this._yieldedPromise = null;
                                this._continue(result);
                            }
                        };
                        /**
                         * @param {!Object} value
                         * @return {undefined}
                         */
                        PromiseSpawn.prototype._promiseFulfilled = function(value) {
                            /** @type {null} */
                            this._yieldedPromise = null;
                            this._promise._pushContext();
                            var result = tryCatch(this._generator.next).call(this._generator, value);
                            this._promise._popContext();
                            this._continue(result);
                        };
                        /**
                         * @param {!Object} reason
                         * @return {undefined}
                         */
                        PromiseSpawn.prototype._promiseRejected = function(reason) {
                            /** @type {null} */
                            this._yieldedPromise = null;
                            this._promise._attachExtraTrace(reason);
                            this._promise._pushContext();
                            var result = tryCatch(this._generator.throw).call(this._generator, reason);
                            this._promise._popContext();
                            this._continue(result);
                        };
                        /**
                         * @return {undefined}
                         */
                        PromiseSpawn.prototype._resultCancelled = function() {
                            if (this._yieldedPromise instanceof Promise) {
                                var promise = this._yieldedPromise;
                                /** @type {null} */
                                this._yieldedPromise = null;
                                promise.cancel();
                            }
                        };
                        /**
                         * @return {?}
                         */
                        PromiseSpawn.prototype.promise = function() {
                            return this._promise;
                        };
                        /**
                         * @return {undefined}
                         */
                        PromiseSpawn.prototype._run = function() {
                            this._generator = this._generatorFunction.call(this._receiver);
                            this._receiver = this._generatorFunction = void 0;
                            this._promiseFulfilled(void 0);
                        };
                        /**
                         * @param {!Object} result
                         * @return {?}
                         */
                        PromiseSpawn.prototype._continue = function(result) {
                            var promise = this._promise;
                            if (result === errorObj) {
                                return this._cleanup(), this._cancellationPhase ? promise.cancel() : promise._rejectCallback(result.e, false);
                            }
                            var value = result.value;
                            if (true === result.done) {
                                return this._cleanup(), this._cancellationPhase ? promise.cancel() : promise._resolveCallback(value);
                            }
                            var maybePromise = tryConvertToPromise(value, this._promise);
                            if (!(maybePromise instanceof Promise) && null === (maybePromise = promiseFromYieldHandler(maybePromise, this._yieldHandlers, this._promise))) {
                                return void this._promiseRejected(new TypeError("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(value)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
                            }
                            maybePromise = maybePromise._target();
                            var bitField = maybePromise._bitField;
                            if (0 == (50397184 & bitField)) {
                                this._yieldedPromise = maybePromise;
                                maybePromise._proxy(this, null);
                            } else {
                                if (0 != (33554432 & bitField)) {
                                    Promise._async.invoke(this._promiseFulfilled, this, maybePromise._value());
                                } else {
                                    if (0 != (16777216 & bitField)) {
                                        Promise._async.invoke(this._promiseRejected, this, maybePromise._reason());
                                    } else {
                                        this._promiseCancelled();
                                    }
                                }
                            }
                        };
                        /**
                         * @param {!Function} value
                         * @param {?} options
                         * @return {?}
                         */
                        Promise.coroutine = function(value, options) {
                            if ("function" != typeof value) {
                                throw new TypeError("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                            }
                            var yieldHandler = Object(options).yieldHandler;
                            /** @type {function(string, !Function, ?, string): undefined} */
                            var PromiseSpawn$ = PromiseSpawn;
                            /** @type {string} */
                            var stack = (new Error).stack;
                            return function() {
                                var generator = value.apply(this, arguments);
                                var spawn = new PromiseSpawn$(void 0, void 0, yieldHandler, stack);
                                var a = spawn.promise();
                                return spawn._generator = generator, spawn._promiseFulfilled(void 0), a;
                            };
                        };
                        /**
                         * @param {undefined} fn
                         * @return {undefined}
                         */
                        Promise.coroutine.addYieldHandler = function(fn) {
                            if ("function" != typeof fn) {
                                throw new TypeError("expecting a function but got " + util.classString(fn));
                            }
                            s.push(fn);
                        };
                        /**
                         * @param {string} generatorFunction
                         * @return {?}
                         */
                        Promise.spawn = function(generatorFunction) {
                            if (debug.deprecated("Promise.spawn()", "Promise.coroutine()"), "function" != typeof generatorFunction) {
                                return fn("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                            }
                            var spawn = new PromiseSpawn(generatorFunction, this);
                            var i = spawn.promise();
                            return spawn._run(Promise.spawn), i;
                        };
                    };
                }, {
                    "./errors" : 12,
                    "./util" : 36
                }],
                17 : [function(require, mixin, n) {
                    /**
                     * @param {!Array} Promise
                     * @param {!Object} PromiseArray
                     * @param {!Object} INTERNAL
                     * @param {?} apiRejection
                     * @param {?} tryConvertToPromise
                     * @param {?} NEXT_FILTER
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, PromiseArray, INTERNAL, apiRejection, tryConvertToPromise, NEXT_FILTER) {
                        var util = require("./util");
                        util.canEvaluate;
                        util.tryCatch;
                        util.errorObj;
                        /**
                         * @return {?}
                         */
                        Promise.join = function() {
                            var fn;
                            /** @type {number} */
                            var length = arguments.length - 1;
                            if (length > 0 && "function" == typeof arguments[length]) {
                                fn = arguments[length];
                                var exports;
                            }
                            /** @type {!Array<?>} */
                            var args = [].slice.call(arguments);
                            if (fn) {
                                args.pop();
                            }
                            exports = (new PromiseArray(args)).promise();
                            return void 0 !== fn ? exports.spread(fn) : exports;
                        };
                    };
                }, {
                    "./util" : 36
                }],
                18 : [function(require, mixin, n) {
                    /**
                     * @param {string} Promise
                     * @param {!Object} PromiseArray
                     * @param {!Object} apiRejection
                     * @param {?} tryConvertToPromise
                     * @param {?} INTERNAL
                     * @param {?} debug
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
                        /**
                         * @param {?} promises
                         * @param {!Function} fn
                         * @param {number} limit
                         * @param {?} _filter
                         * @return {undefined}
                         */
                        function MappingPromiseArray(promises, fn, limit, _filter) {
                            this.constructor$(promises);
                            this._promise._captureStackTrace();
                            var string = getDomain();
                            this._callback = null === string ? fn : util.domainBind(string, fn);
                            /** @type {(Array|null)} */
                            this._preservedValues = _filter === INTERNAL ? new Array(this.length()) : null;
                            /** @type {number} */
                            this._limit = limit;
                            /** @type {number} */
                            this._inFlight = 0;
                            /** @type {!Array} */
                            this._queue = [];
                            async.invoke(this._asyncInit, this, void 0);
                        }
                        /**
                         * @param {!Array} promises
                         * @param {!Function} fn
                         * @param {!Object} options
                         * @param {!Function} _filter
                         * @return {?}
                         */
                        function map(promises, fn, options, _filter) {
                            if ("function" != typeof fn) {
                                return apiRejection("expecting a function but got " + util.classString(fn));
                            }
                            /** @type {number} */
                            var limit = 0;
                            if (void 0 !== options) {
                                if ("object" != typeof options || null === options) {
                                    return Promise.reject(new TypeError("options argument must be an object but it is " + util.classString(options)));
                                }
                                if ("number" != typeof options.concurrency) {
                                    return Promise.reject(new TypeError("'concurrency' must be a number but it is " + util.classString(options.concurrency)));
                                }
                                /** @type {number} */
                                limit = options.concurrency;
                            }
                            return limit = "number" == typeof limit && isFinite(limit) && limit >= 1 ? limit : 0, (new MappingPromiseArray(promises, fn, limit, _filter)).promise();
                        }
                        var getDomain = Promise._getDomain;
                        var util = require("./util");
                        var tryCatch = util.tryCatch;
                        var errorObj = util.errorObj;
                        var async = Promise._async;
                        util.inherits(MappingPromiseArray, PromiseArray);
                        /**
                         * @return {undefined}
                         */
                        MappingPromiseArray.prototype._asyncInit = function() {
                            this._init$(void 0, -2);
                        };
                        /**
                         * @return {undefined}
                         */
                        MappingPromiseArray.prototype._init = function() {
                        };
                        /**
                         * @param {!Object} value
                         * @param {number} index
                         * @return {?}
                         */
                        MappingPromiseArray.prototype._promiseFulfilled = function(value, index) {
                            var values = this._values;
                            var length = this.length();
                            var preservedValues = this._preservedValues;
                            var limit = this._limit;
                            if (index < 0) {
                                if (index = -1 * index - 1, values[index] = value, limit >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved())) {
                                    return true;
                                }
                            } else {
                                if (limit >= 1 && this._inFlight >= limit) {
                                    return values[index] = value, this._queue.push(index), false;
                                }
                                if (null !== preservedValues) {
                                    /** @type {!Object} */
                                    preservedValues[index] = value;
                                }
                                var promise = this._promise;
                                var fn = this._callback;
                                var p = promise._boundValue();
                                promise._pushContext();
                                var ret = tryCatch(fn).call(p, value, index, length);
                                var promiseCreated = promise._popContext();
                                if (debug.checkForgottenReturns(ret, promiseCreated, null !== preservedValues ? "Promise.filter" : "Promise.map", promise), ret === errorObj) {
                                    return this._reject(ret.e), true;
                                }
                                var maybePromise = tryConvertToPromise(ret, this._promise);
                                if (maybePromise instanceof Promise) {
                                    maybePromise = maybePromise._target();
                                    var bitField = maybePromise._bitField;
                                    if (0 == (50397184 & bitField)) {
                                        return limit >= 1 && this._inFlight++, values[index] = maybePromise, maybePromise._proxy(this, -1 * (index + 1)), false;
                                    }
                                    if (0 == (33554432 & bitField)) {
                                        return 0 != (16777216 & bitField) ? (this._reject(maybePromise._reason()), true) : (this._cancel(), true);
                                    }
                                    ret = maybePromise._value();
                                }
                                values[index] = ret;
                            }
                            return ++this._totalResolved >= length && (null !== preservedValues ? this._filter(values, preservedValues) : this._resolve(values), true);
                        };
                        /**
                         * @return {undefined}
                         */
                        MappingPromiseArray.prototype._drainQueue = function() {
                            var queue = this._queue;
                            var limit = this._limit;
                            var values = this._values;
                            for (; queue.length > 0 && this._inFlight < limit;) {
                                if (this._isResolved()) {
                                    return;
                                }
                                var index = queue.pop();
                                this._promiseFulfilled(values[index], index);
                            }
                        };
                        /**
                         * @param {!NodeList} array
                         * @param {!NodeList} values
                         * @return {undefined}
                         */
                        MappingPromiseArray.prototype._filter = function(array, values) {
                            var length = values.length;
                            /** @type {!Array} */
                            var value = new Array(length);
                            /** @type {number} */
                            var key = 0;
                            /** @type {number} */
                            var i = 0;
                            for (; i < length; ++i) {
                                if (array[i]) {
                                    value[key++] = values[i];
                                }
                            }
                            /** @type {number} */
                            value.length = key;
                            this._resolve(value);
                        };
                        /**
                         * @return {?}
                         */
                        MappingPromiseArray.prototype.preservedValues = function() {
                            return this._preservedValues;
                        };
                        /**
                         * @param {(!Function|string)} key
                         * @param {!Function} callback
                         * @return {?}
                         */
                        Promise.prototype.map = function(key, callback) {
                            return map(this, key, callback, null);
                        };
                        /**
                         * @param {(!Function|string)} key
                         * @param {!Function} obj
                         * @param {(Object|string)} options
                         * @param {!Object} _filter
                         * @return {?}
                         */
                        Promise.map = function(key, obj, options, _filter) {
                            return map(key, obj, options, _filter);
                        };
                    };
                }, {
                    "./util" : 36
                }],
                19 : [function(require, mixin, n) {
                    /**
                     * @param {!Object} Promise
                     * @param {!Object} val
                     * @param {!Object} key
                     * @param {?} size
                     * @param {!Object} debug
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, val, key, size, debug) {
                        var util = require("./util");
                        var tryCatch = util.tryCatch;
                        /**
                         * @param {undefined} fn
                         * @return {?}
                         */
                        Promise.method = function(fn) {
                            if ("function" != typeof fn) {
                                throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
                            }
                            return function() {
                                var ret = new Promise(val);
                                ret._captureStackTrace();
                                ret._pushContext();
                                var value = tryCatch(fn).apply(this, arguments);
                                var promiseCreated = ret._popContext();
                                return debug.checkForgottenReturns(value, promiseCreated, "Promise.method", ret), ret._resolveFromSyncValue(value), ret;
                            };
                        };
                        /** @type {function(undefined): ?} */
                        Promise.attempt = Promise.try = function(fn) {
                            if ("function" != typeof fn) {
                                return size("expecting a function but got " + util.classString(fn));
                            }
                            var ret = new Promise(val);
                            ret._captureStackTrace();
                            ret._pushContext();
                            var value;
                            if (arguments.length > 1) {
                                debug.deprecated("calling Promise.try with more than 1 argument");
                                var b = arguments[1];
                                var a = arguments[2];
                                value = util.isArray(b) ? tryCatch(fn).apply(a, b) : tryCatch(fn).call(a, b);
                            } else {
                                value = tryCatch(fn)();
                            }
                            var promiseCreated = ret._popContext();
                            return debug.checkForgottenReturns(value, promiseCreated, "Promise.try", ret), ret._resolveFromSyncValue(value), ret;
                        };
                        /**
                         * @param {!Object} value
                         * @return {undefined}
                         */
                        Promise.prototype._resolveFromSyncValue = function(value) {
                            if (value === util.errorObj) {
                                this._rejectCallback(value.e, false);
                            } else {
                                this._resolveCallback(value, true);
                            }
                        };
                    };
                }, {
                    "./util" : 36
                }],
                20 : [function(require, module, n) {
                    /**
                     * @param {!Object} obj
                     * @return {?}
                     */
                    function isUntypedError(obj) {
                        return obj instanceof Error && es5.getPrototypeOf(obj) === Error.prototype;
                    }
                    /**
                     * @param {?} obj
                     * @return {?}
                     */
                    function wrapAsOperationalError(obj) {
                        var ret;
                        if (isUntypedError(obj)) {
                            ret = new OperationalError(obj);
                            ret.name = obj.name;
                            ret.message = obj.message;
                            ret.stack = obj.stack;
                            var props = es5.keys(obj);
                            /** @type {number} */
                            var i = 0;
                            for (; i < props.length; ++i) {
                                var prop = props[i];
                                if (!DEFERRED_PREFIX.test(prop)) {
                                    ret[prop] = obj[prop];
                                }
                            }
                            return ret;
                        }
                        return util.markAsOriginatingFromRejection(obj), obj;
                    }
                    /**
                     * @param {!Function} method
                     * @param {!Object} promise
                     * @return {?}
                     */
                    function nodebackForPromise(method, promise) {
                        return function(err, result) {
                            if (null !== method) {
                                if (err) {
                                    var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
                                    method._attachExtraTrace(wrapped);
                                    method._reject(wrapped);
                                } else {
                                    if (promise) {
                                        /** @type {!Array<?>} */
                                        var result = [].slice.call(arguments, 1);
                                        method._fulfill(result);
                                    } else {
                                        method._fulfill(result);
                                    }
                                }
                                /** @type {null} */
                                method = null;
                            }
                        };
                    }
                    var util = require("./util");
                    var maybeWrapAsError = util.maybeWrapAsError;
                    var errors = require("./errors");
                    var OperationalError = errors.OperationalError;
                    var es5 = require("./es5");
                    /** @type {!RegExp} */
                    var DEFERRED_PREFIX = /^(?:name|message|stack|cause)$/;
                    /** @type {function(!Function, !Object): ?} */
                    module.exports = nodebackForPromise;
                }, {
                    "./errors" : 12,
                    "./es5" : 13,
                    "./util" : 36
                }],
                21 : [function(require, mixin, n) {
                    /**
                     * @param {!Function} Promise
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise) {
                        /**
                         * @param {!Object} val
                         * @param {!Function} nodeback
                         * @return {?}
                         */
                        function spreadAdapter(val, nodeback) {
                            var promise = this;
                            if (!util.isArray(val)) {
                                return successAdapter.call(promise, val, nodeback);
                            }
                            var ret = tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
                            if (ret === errorObj) {
                                async.throwLater(ret.e);
                            }
                        }
                        /**
                         * @param {!Array} val
                         * @param {!Function} nodeback
                         * @return {undefined}
                         */
                        function successAdapter(val, nodeback) {
                            var promise = this;
                            var separateCaches = promise._boundValue();
                            var ret = void 0 === val ? tryCatch(nodeback).call(separateCaches, null) : tryCatch(nodeback).call(separateCaches, null, val);
                            if (ret === errorObj) {
                                async.throwLater(ret.e);
                            }
                        }
                        /**
                         * @param {number} reason
                         * @param {!Function} nodeback
                         * @return {undefined}
                         */
                        function errorAdapter(reason, nodeback) {
                            var promise = this;
                            if (!reason) {
                                /** @type {!Error} */
                                var newReason = new Error(reason + "");
                                /** @type {number} */
                                newReason.cause = reason;
                                /** @type {!Error} */
                                reason = newReason;
                            }
                            var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
                            if (ret === errorObj) {
                                async.throwLater(ret.e);
                            }
                        }
                        var util = require("./util");
                        var async = Promise._async;
                        var tryCatch = util.tryCatch;
                        var errorObj = util.errorObj;
                        /** @type {function(undefined, number): ?} */
                        Promise.prototype.asCallback = Promise.prototype.nodeify = function(nodeback, options) {
                            if ("function" == typeof nodeback) {
                                /** @type {function(!Array, !Function): undefined} */
                                var adapter = successAdapter;
                                if (void 0 !== options && Object(options).spread) {
                                    /** @type {function(!Object, !Function): ?} */
                                    adapter = spreadAdapter;
                                }
                                this._then(adapter, errorAdapter, void 0, this, nodeback);
                            }
                            return this;
                        };
                    };
                }, {
                    "./util" : 36
                }],
                22 : [function(require, module, canCreateDiscussions) {
                    /**
                     * @return {?}
                     */
                    module.exports = function() {
                        /**
                         * @return {undefined}
                         */
                        function Proxyable() {
                        }
                        /**
                         * @param {!Object} self
                         * @param {!Array} fn
                         * @return {undefined}
                         */
                        function check(self, fn) {
                            if (null == self || self.constructor !== Promise) {
                                throw new TypeError("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
                            }
                            if ("function" != typeof fn) {
                                throw new TypeError("expecting a function but got " + util.classString(fn));
                            }
                        }
                        /**
                         * @param {undefined} executor
                         * @return {undefined}
                         */
                        function Promise(executor) {
                            if (executor !== INTERNAL) {
                                check(this, executor);
                            }
                            /** @type {number} */
                            this._bitField = 0;
                            this._fulfillmentHandler0 = void 0;
                            this._rejectionHandler0 = void 0;
                            this._promise0 = void 0;
                            this._receiver0 = void 0;
                            this._resolveFromExecutor(executor);
                            this._promiseCreated();
                            this._fireEvent("promiseCreated", this);
                        }
                        /**
                         * @param {!Object} value
                         * @return {undefined}
                         */
                        function resolve(value) {
                            this.promise._resolveCallback(value);
                        }
                        /**
                         * @param {!Error} reason
                         * @return {undefined}
                         */
                        function reject(reason) {
                            this.promise._rejectCallback(reason, false);
                        }
                        /**
                         * @param {!Function} value
                         * @return {undefined}
                         */
                        function fillTypes(value) {
                            var p = new Promise(INTERNAL);
                            /** @type {!Function} */
                            p._fulfillmentHandler0 = value;
                            /** @type {!Function} */
                            p._rejectionHandler0 = value;
                            /** @type {!Function} */
                            p._promise0 = value;
                            /** @type {!Function} */
                            p._receiver0 = value;
                        }
                        var getDomain;
                        /**
                         * @return {?}
                         */
                        var makeSelfResolutionError = function() {
                            return new TypeError("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
                        };
                        /**
                         * @return {?}
                         */
                        var reflectHandler = function() {
                            return new Promise.PromiseInspection(this._target());
                        };
                        /**
                         * @param {?} msg
                         * @return {?}
                         */
                        var apiRejection = function(msg) {
                            return Promise.reject(new TypeError(msg));
                        };
                        var undefined = {};
                        var util = require("./util");
                        /** @type {function(): ?} */
                        getDomain = util.isNode ? function() {
                            var domain = options.domain;
                            return void 0 === domain && (domain = null), domain;
                        } : function() {
                            return null;
                        };
                        util.notEnumerableProp(Promise, "_getDomain", getDomain);
                        var es5 = require("./es5");
                        var Async = require("./async");
                        var async = new Async;
                        es5.defineProperty(Promise, "_async", {
                            value : async
                        });
                        var errors = require("./errors");
                        var TypeError = Promise.TypeError = errors.TypeError;
                        Promise.RangeError = errors.RangeError;
                        var CancellationError = Promise.CancellationError = errors.CancellationError;
                        Promise.TimeoutError = errors.TimeoutError;
                        Promise.OperationalError = errors.OperationalError;
                        Promise.RejectionError = errors.OperationalError;
                        Promise.AggregateError = errors.AggregateError;
                        /**
                         * @return {undefined}
                         */
                        var INTERNAL = function() {
                        };
                        var APPLY = {};
                        var NEXT_FILTER = {};
                        var tryConvertToPromise = require("./thenables")(Promise, INTERNAL);
                        var PromiseArray = require("./promise_array")(Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable);
                        var Context = require("./context")(Promise);
                        var createContext = Context.create;
                        var debug = require("./debuggability")(Promise, Context);
                        var RpcProxy = (debug.CapturedTrace, require("./finally")(Promise, tryConvertToPromise, NEXT_FILTER));
                        var catchFilter = require("./catch_filter")(NEXT_FILTER);
                        var nodebackForPromise = require("./nodeback");
                        var errorObj = util.errorObj;
                        var tryCatch = util.tryCatch;
                        return Promise.prototype.toString = function() {
                            return "[object Promise]";
                        }, Promise.prototype.caught = Promise.prototype.catch = function(fn) {
                            /** @type {number} */
                            var l = arguments.length;
                            if (l > 1) {
                                var i;
                                /** @type {!Array} */
                                var catchInstances = new Array(l - 1);
                                /** @type {number} */
                                var j = 0;
                                /** @type {number} */
                                i = 0;
                                for (; i < l - 1; ++i) {
                                    var item = arguments[i];
                                    if (!util.isObject(item)) {
                                        return apiRejection("Catch statement predicate: expecting an object but got " + util.classString(item));
                                    }
                                    catchInstances[j++] = item;
                                }
                                return catchInstances.length = j, fn = arguments[i], this.then(void 0, catchFilter(catchInstances, fn, this));
                            }
                            return this.then(void 0, fn);
                        }, Promise.prototype.reflect = function() {
                            return this._then(reflectHandler, reflectHandler, void 0, this, void 0);
                        }, Promise.prototype.then = function(fn, didReject) {
                            if (debug.warnings() && arguments.length > 0 && "function" != typeof fn && "function" != typeof didReject) {
                                var msg = ".then() only accepts functions but was passed: " + util.classString(fn);
                                if (arguments.length > 1) {
                                    msg = msg + (", " + util.classString(didReject));
                                }
                                this._warn(msg);
                            }
                            return this._then(fn, didReject, void 0, void 0, void 0);
                        }, Promise.prototype.done = function(didFulfill, didReject) {
                            this._then(didFulfill, didReject, void 0, void 0, void 0)._setIsFinal();
                        }, Promise.prototype.spread = function(fn) {
                            return "function" != typeof fn ? apiRejection("expecting a function but got " + util.classString(fn)) : this.all()._then(fn, void 0, void 0, APPLY, void 0);
                        }, Promise.prototype.toJSON = function() {
                            var ret = {
                                isFulfilled : false,
                                isRejected : false,
                                fulfillmentValue : void 0,
                                rejectionReason : void 0
                            };
                            return this.isFulfilled() ? (ret.fulfillmentValue = this.value(), ret.isFulfilled = true) : this.isRejected() && (ret.rejectionReason = this.reason(), ret.isRejected = true), ret;
                        }, Promise.prototype.all = function() {
                            return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), (new PromiseArray(this)).promise();
                        }, Promise.prototype.error = function(fn) {
                            return this.caught(util.originatesFromRejection, fn);
                        }, Promise.getNewLibraryCopy = module.exports, Promise.is = function(type) {
                            return type instanceof Promise;
                        }, Promise.fromNode = Promise.fromCallback = function(fn) {
                            var ret = new Promise(INTERNAL);
                            ret._captureStackTrace();
                            /** @type {boolean} */
                            var multiArgs = arguments.length > 1 && !!Object(arguments[1]).multiArgs;
                            var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
                            return result === errorObj && ret._rejectCallback(result.e, true), ret._isFateSealed() || ret._setAsyncGuaranteed(), ret;
                        }, Promise.all = function(args) {
                            return (new PromiseArray(args)).promise();
                        }, Promise.cast = function(obj) {
                            var ret = tryConvertToPromise(obj);
                            return ret instanceof Promise || (ret = new Promise(INTERNAL), ret._captureStackTrace(), ret._setFulfilled(), ret._rejectionHandler0 = obj), ret;
                        }, Promise.resolve = Promise.fulfilled = Promise.cast, Promise.reject = Promise.rejected = function(reason) {
                            var promise = new Promise(INTERNAL);
                            return promise._captureStackTrace(), promise._rejectCallback(reason, true), promise;
                        }, Promise.setScheduler = function(fn) {
                            if ("function" != typeof fn) {
                                throw new TypeError("expecting a function but got " + util.classString(fn));
                            }
                            return async.setScheduler(fn);
                        }, Promise.prototype._then = function(didFulfill, didReject, _, receiver, internalData) {
                            /** @type {boolean} */
                            var haveInternalData = void 0 !== internalData;
                            var promise = haveInternalData ? internalData : new Promise(INTERNAL);
                            var target = this._target();
                            var bitField = target._bitField;
                            if (!haveInternalData) {
                                promise._propagateFrom(this, 3);
                                promise._captureStackTrace();
                                if (void 0 === receiver && 0 != (2097152 & this._bitField)) {
                                    receiver = 0 != (50397184 & bitField) ? this._boundValue() : target === this ? void 0 : this._boundTo;
                                }
                                this._fireEvent("promiseChained", this, promise);
                            }
                            var domain = getDomain();
                            if (0 != (50397184 & bitField)) {
                                var handler;
                                var value;
                                var settler = target._settlePromiseCtx;
                                if (0 != (33554432 & bitField)) {
                                    value = target._rejectionHandler0;
                                    /** @type {!Function} */
                                    handler = didFulfill;
                                } else {
                                    if (0 != (16777216 & bitField)) {
                                        value = target._fulfillmentHandler0;
                                        /** @type {!Function} */
                                        handler = didReject;
                                        target._unsetRejectionIsUnhandled();
                                    } else {
                                        settler = target._settlePromiseLateCancellationObserver;
                                        value = new CancellationError("late cancellation observer");
                                        target._attachExtraTrace(value);
                                        /** @type {!Function} */
                                        handler = didReject;
                                    }
                                }
                                async.invoke(settler, target, {
                                    handler : null === domain ? handler : "function" == typeof handler && util.domainBind(domain, handler),
                                    promise : promise,
                                    receiver : receiver,
                                    value : value
                                });
                            } else {
                                target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
                            }
                            return promise;
                        }, Promise.prototype._length = function() {
                            return 65535 & this._bitField;
                        }, Promise.prototype._isFateSealed = function() {
                            return 0 != (117506048 & this._bitField);
                        }, Promise.prototype._isFollowing = function() {
                            return 67108864 == (67108864 & this._bitField);
                        }, Promise.prototype._setLength = function(v) {
                            /** @type {number} */
                            this._bitField = -65536 & this._bitField | 65535 & v;
                        }, Promise.prototype._setFulfilled = function() {
                            /** @type {number} */
                            this._bitField = 33554432 | this._bitField;
                            this._fireEvent("promiseFulfilled", this);
                        }, Promise.prototype._setRejected = function() {
                            /** @type {number} */
                            this._bitField = 16777216 | this._bitField;
                            this._fireEvent("promiseRejected", this);
                        }, Promise.prototype._setFollowing = function() {
                            /** @type {number} */
                            this._bitField = 67108864 | this._bitField;
                            this._fireEvent("promiseResolved", this);
                        }, Promise.prototype._setIsFinal = function() {
                            /** @type {number} */
                            this._bitField = 4194304 | this._bitField;
                        }, Promise.prototype._isFinal = function() {
                            return (4194304 & this._bitField) > 0;
                        }, Promise.prototype._unsetCancelled = function() {
                            /** @type {number} */
                            this._bitField = -65537 & this._bitField;
                        }, Promise.prototype._setCancelled = function() {
                            /** @type {number} */
                            this._bitField = 65536 | this._bitField;
                            this._fireEvent("promiseCancelled", this);
                        }, Promise.prototype._setWillBeCancelled = function() {
                            /** @type {number} */
                            this._bitField = 8388608 | this._bitField;
                        }, Promise.prototype._setAsyncGuaranteed = function() {
                            if (!async.hasCustomScheduler()) {
                                /** @type {number} */
                                this._bitField = 134217728 | this._bitField;
                            }
                        }, Promise.prototype._receiverAt = function(index) {
                            var ret = 0 === index ? this._receiver0 : this[4 * index - 4 + 3];
                            if (ret !== undefined) {
                                return void 0 === ret && this._isBound() ? this._boundValue() : ret;
                            }
                        }, Promise.prototype._promiseAt = function(index) {
                            return this[4 * index - 4 + 2];
                        }, Promise.prototype._fulfillmentHandlerAt = function(index) {
                            return this[4 * index - 4 + 0];
                        }, Promise.prototype._rejectionHandlerAt = function(index) {
                            return this[4 * index - 4 + 1];
                        }, Promise.prototype._boundValue = function() {
                        }, Promise.prototype._migrateCallback0 = function(follower) {
                            var fulfill = (follower._bitField, follower._fulfillmentHandler0);
                            var reject = follower._rejectionHandler0;
                            var promise = follower._promise0;
                            var receiver = follower._receiverAt(0);
                            if (void 0 === receiver) {
                                receiver = undefined;
                            }
                            this._addCallbacks(fulfill, reject, promise, receiver, null);
                        }, Promise.prototype._migrateCallbackAt = function(follower, index) {
                            var fulfill = follower._fulfillmentHandlerAt(index);
                            var reject = follower._rejectionHandlerAt(index);
                            var promise = follower._promiseAt(index);
                            var receiver = follower._receiverAt(index);
                            if (void 0 === receiver) {
                                receiver = undefined;
                            }
                            this._addCallbacks(fulfill, reject, promise, receiver, null);
                        }, Promise.prototype._addCallbacks = function(fulfill, reject, promise, receiver, domain) {
                            var index = this._length();
                            if (index >= 65531 && (index = 0, this._setLength(0)), 0 === index) {
                                /** @type {number} */
                                this._promise0 = promise;
                                /** @type {string} */
                                this._receiver0 = receiver;
                                if ("function" == typeof fulfill) {
                                    this._fulfillmentHandler0 = null === domain ? fulfill : util.domainBind(domain, fulfill);
                                }
                                if ("function" == typeof reject) {
                                    this._rejectionHandler0 = null === domain ? reject : util.domainBind(domain, reject);
                                }
                            } else {
                                /** @type {number} */
                                var a = 4 * index - 4;
                                /** @type {number} */
                                this[a + 2] = promise;
                                /** @type {string} */
                                this[a + 3] = receiver;
                                if ("function" == typeof fulfill) {
                                    this[a + 0] = null === domain ? fulfill : util.domainBind(domain, fulfill);
                                }
                                if ("function" == typeof reject) {
                                    this[a + 1] = null === domain ? reject : util.domainBind(domain, reject);
                                }
                            }
                            return this._setLength(index + 1), index;
                        }, Promise.prototype._proxy = function(proxyable, arg) {
                            this._addCallbacks(void 0, void 0, arg, proxyable, null);
                        }, Promise.prototype._resolveCallback = function(value, shouldBind) {
                            if (0 == (117506048 & this._bitField)) {
                                if (value === this) {
                                    return this._rejectCallback(makeSelfResolutionError(), false);
                                }
                                var maybePromise = tryConvertToPromise(value, this);
                                if (!(maybePromise instanceof Promise)) {
                                    return this._fulfill(value);
                                }
                                if (shouldBind) {
                                    this._propagateFrom(maybePromise, 2);
                                }
                                var promise = maybePromise._target();
                                if (promise === this) {
                                    return void this._reject(makeSelfResolutionError());
                                }
                                var bitField = promise._bitField;
                                if (0 == (50397184 & bitField)) {
                                    var len = this._length();
                                    if (len > 0) {
                                        promise._migrateCallback0(this);
                                    }
                                    /** @type {number} */
                                    var i = 1;
                                    for (; i < len; ++i) {
                                        promise._migrateCallbackAt(this, i);
                                    }
                                    this._setFollowing();
                                    this._setLength(0);
                                    this._setFollowee(promise);
                                } else {
                                    if (0 != (33554432 & bitField)) {
                                        this._fulfill(promise._value());
                                    } else {
                                        if (0 != (16777216 & bitField)) {
                                            this._reject(promise._reason());
                                        } else {
                                            var reason = new CancellationError("late cancellation observer");
                                            promise._attachExtraTrace(reason);
                                            this._reject(reason);
                                        }
                                    }
                                }
                            }
                        }, Promise.prototype._rejectCallback = function(reason, synchronous, ignoreNonErrorWarnings) {
                            var trace = util.ensureErrorObject(reason);
                            /** @type {boolean} */
                            var hasStack = trace === reason;
                            if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
                                var msg = "a promise was rejected with a non-error: " + util.classString(reason);
                                this._warn(msg, true);
                            }
                            this._attachExtraTrace(trace, !!synchronous && hasStack);
                            this._reject(reason);
                        }, Promise.prototype._resolveFromExecutor = function(executor) {
                            if (executor !== INTERNAL) {
                                var promise = this;
                                this._captureStackTrace();
                                this._pushContext();
                                /** @type {boolean} */
                                var synchronous = true;
                                var r = this._execute(executor, function(value) {
                                    promise._resolveCallback(value);
                                }, function(reason) {
                                    promise._rejectCallback(reason, synchronous);
                                });
                                /** @type {boolean} */
                                synchronous = false;
                                this._popContext();
                                if (void 0 !== r) {
                                    promise._rejectCallback(r, true);
                                }
                            }
                        }, Promise.prototype._settlePromiseFromHandler = function(handler, receiver, value, promise) {
                            var bitField = promise._bitField;
                            if (0 == (65536 & bitField)) {
                                promise._pushContext();
                                var x;
                                if (receiver === APPLY) {
                                    if (value && "number" == typeof value.length) {
                                        x = tryCatch(handler).apply(this._boundValue(), value);
                                    } else {
                                        x = errorObj;
                                        x.e = new TypeError("cannot .spread() a non-array: " + util.classString(value));
                                    }
                                } else {
                                    x = tryCatch(handler).call(receiver, value);
                                }
                                var promiseCreated = promise._popContext();
                                bitField = promise._bitField;
                                if (0 == (65536 & bitField)) {
                                    if (x === NEXT_FILTER) {
                                        promise._reject(value);
                                    } else {
                                        if (x === errorObj) {
                                            promise._rejectCallback(x.e, false);
                                        } else {
                                            debug.checkForgottenReturns(x, promiseCreated, "", promise, this);
                                            promise._resolveCallback(x);
                                        }
                                    }
                                }
                            }
                        }, Promise.prototype._target = function() {
                            var ret = this;
                            for (; ret._isFollowing();) {
                                ret = ret._followee();
                            }
                            return ret;
                        }, Promise.prototype._followee = function() {
                            return this._rejectionHandler0;
                        }, Promise.prototype._setFollowee = function(promise) {
                            this._rejectionHandler0 = promise;
                        }, Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
                            /** @type {boolean} */
                            var isPromise = promise instanceof Promise;
                            var bitField = this._bitField;
                            /** @type {boolean} */
                            var c = 0 != (134217728 & bitField);
                            if (0 != (65536 & bitField)) {
                                if (isPromise) {
                                    promise._invokeInternalOnCancel();
                                }
                                if (receiver instanceof RpcProxy && receiver.isFinallyHandler()) {
                                    /** @type {!Function} */
                                    receiver.cancelPromise = promise;
                                    if (tryCatch(handler).call(receiver, value) === errorObj) {
                                        promise._reject(errorObj.e);
                                    }
                                } else {
                                    if (handler === reflectHandler) {
                                        promise._fulfill(reflectHandler.call(receiver));
                                    } else {
                                        if (receiver instanceof Proxyable) {
                                            receiver._promiseCancelled(promise);
                                        } else {
                                            if (isPromise || promise instanceof PromiseArray) {
                                                promise._cancel();
                                            } else {
                                                receiver.cancel();
                                            }
                                        }
                                    }
                                }
                            } else {
                                if ("function" == typeof handler) {
                                    if (isPromise) {
                                        if (c) {
                                            promise._setAsyncGuaranteed();
                                        }
                                        this._settlePromiseFromHandler(handler, receiver, value, promise);
                                    } else {
                                        handler.call(receiver, value, promise);
                                    }
                                } else {
                                    if (receiver instanceof Proxyable) {
                                        if (!receiver._isResolved()) {
                                            if (0 != (33554432 & bitField)) {
                                                receiver._promiseFulfilled(value, promise);
                                            } else {
                                                receiver._promiseRejected(value, promise);
                                            }
                                        }
                                    } else {
                                        if (isPromise) {
                                            if (c) {
                                                promise._setAsyncGuaranteed();
                                            }
                                            if (0 != (33554432 & bitField)) {
                                                promise._fulfill(value);
                                            } else {
                                                promise._reject(value);
                                            }
                                        }
                                    }
                                }
                            }
                        }, Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
                            var handler = ctx.handler;
                            var promise = ctx.promise;
                            var receiver = ctx.receiver;
                            var value = ctx.value;
                            if ("function" == typeof handler) {
                                if (promise instanceof Promise) {
                                    this._settlePromiseFromHandler(handler, receiver, value, promise);
                                } else {
                                    handler.call(receiver, value, promise);
                                }
                            } else {
                                if (promise instanceof Promise) {
                                    promise._reject(value);
                                }
                            }
                        }, Promise.prototype._settlePromiseCtx = function(ctx) {
                            this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
                        }, Promise.prototype._settlePromise0 = function(handler, value, bitField) {
                            var promise = this._promise0;
                            var receiver = this._receiverAt(0);
                            this._promise0 = void 0;
                            this._receiver0 = void 0;
                            this._settlePromise(promise, handler, receiver, value);
                        }, Promise.prototype._clearCallbackDataAtIndex = function(index) {
                            /** @type {number} */
                            var e = 4 * index - 4;
                            this[e + 2] = this[e + 3] = this[e + 0] = this[e + 1] = void 0;
                        }, Promise.prototype._fulfill = function(value) {
                            var bitField = this._bitField;
                            if (!((117506048 & bitField) >>> 16)) {
                                if (value === this) {
                                    var err = makeSelfResolutionError();
                                    return this._attachExtraTrace(err), this._reject(err);
                                }
                                this._setFulfilled();
                                /** @type {!Object} */
                                this._rejectionHandler0 = value;
                                if ((65535 & bitField) > 0) {
                                    if (0 != (134217728 & bitField)) {
                                        this._settlePromises();
                                    } else {
                                        async.settlePromises(this);
                                    }
                                    this._dereferenceTrace();
                                }
                            }
                        }, Promise.prototype._reject = function(reason) {
                            var bitField = this._bitField;
                            if (!((117506048 & bitField) >>> 16)) {
                                if (this._setRejected(), this._fulfillmentHandler0 = reason, this._isFinal()) {
                                    return async.fatalError(reason, util.isNode);
                                }
                                if ((65535 & bitField) > 0) {
                                    async.settlePromises(this);
                                } else {
                                    this._ensurePossibleRejectionHandled();
                                }
                            }
                        }, Promise.prototype._fulfillPromises = function(len, value) {
                            /** @type {number} */
                            var i = 1;
                            for (; i < len; i++) {
                                var handler = this._fulfillmentHandlerAt(i);
                                var promise = this._promiseAt(i);
                                var receiver = this._receiverAt(i);
                                this._clearCallbackDataAtIndex(i);
                                this._settlePromise(promise, handler, receiver, value);
                            }
                        }, Promise.prototype._rejectPromises = function(len, reason) {
                            /** @type {number} */
                            var i = 1;
                            for (; i < len; i++) {
                                var handler = this._rejectionHandlerAt(i);
                                var promise = this._promiseAt(i);
                                var receiver = this._receiverAt(i);
                                this._clearCallbackDataAtIndex(i);
                                this._settlePromise(promise, handler, receiver, reason);
                            }
                        }, Promise.prototype._settlePromises = function() {
                            var bitField = this._bitField;
                            /** @type {number} */
                            var len = 65535 & bitField;
                            if (len > 0) {
                                if (0 != (16842752 & bitField)) {
                                    var reason = this._fulfillmentHandler0;
                                    this._settlePromise0(this._rejectionHandler0, reason, bitField);
                                    this._rejectPromises(len, reason);
                                } else {
                                    var value = this._rejectionHandler0;
                                    this._settlePromise0(this._fulfillmentHandler0, value, bitField);
                                    this._fulfillPromises(len, value);
                                }
                                this._setLength(0);
                            }
                            this._clearCancellationData();
                        }, Promise.prototype._settledValue = function() {
                            var bitField = this._bitField;
                            return 0 != (33554432 & bitField) ? this._rejectionHandler0 : 0 != (16777216 & bitField) ? this._fulfillmentHandler0 : void 0;
                        }, Promise.defer = Promise.pending = function() {
                            return debug.deprecated("Promise.defer", "new Promise"), {
                                promise : new Promise(INTERNAL),
                                resolve : resolve,
                                reject : reject
                            };
                        }, util.notEnumerableProp(Promise, "_makeSelfResolutionError", makeSelfResolutionError), require("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug), require("./bind")(Promise, INTERNAL, tryConvertToPromise, debug), require("./cancel")(Promise, PromiseArray, apiRejection, debug), require("./direct_resolve")(Promise), require("./synchronous_inspection")(Promise), require("./join")(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain), Promise.Promise =
                            Promise, Promise.version = "3.5.4", require("./map.js")(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug), require("./call_get.js")(Promise), require("./using.js")(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug), require("./timers.js")(Promise, INTERNAL, debug), require("./generators.js")(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug), require("./nodeify.js")(Promise), require("./promisify.js")(Promise, INTERNAL),
                            require("./props.js")(Promise, PromiseArray, tryConvertToPromise, apiRejection), require("./race.js")(Promise, INTERNAL, tryConvertToPromise, apiRejection), require("./reduce.js")(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug), require("./settle.js")(Promise, PromiseArray, debug), require("./some.js")(Promise, PromiseArray, apiRejection), require("./filter.js")(Promise, INTERNAL), require("./each.js")(Promise, INTERNAL), require("./any.js")(Promise), util.toFastProperties(Promise),
                            util.toFastProperties(Promise.prototype), fillTypes({
                            a : 1
                        }), fillTypes({
                            b : 2
                        }), fillTypes({
                            c : 3
                        }), fillTypes(1), fillTypes(function() {
                        }), fillTypes(void 0), fillTypes(false), fillTypes(new Promise(INTERNAL)), debug.setBounds(Async.firstLineError, util.lastLineError), Promise;
                    };
                }, {
                    "./any.js" : 1,
                    "./async" : 2,
                    "./bind" : 3,
                    "./call_get.js" : 5,
                    "./cancel" : 6,
                    "./catch_filter" : 7,
                    "./context" : 8,
                    "./debuggability" : 9,
                    "./direct_resolve" : 10,
                    "./each.js" : 11,
                    "./errors" : 12,
                    "./es5" : 13,
                    "./filter.js" : 14,
                    "./finally" : 15,
                    "./generators.js" : 16,
                    "./join" : 17,
                    "./map.js" : 18,
                    "./method" : 19,
                    "./nodeback" : 20,
                    "./nodeify.js" : 21,
                    "./promise_array" : 23,
                    "./promisify.js" : 24,
                    "./props.js" : 25,
                    "./race.js" : 27,
                    "./reduce.js" : 28,
                    "./settle.js" : 30,
                    "./some.js" : 31,
                    "./synchronous_inspection" : 32,
                    "./thenables" : 33,
                    "./timers.js" : 34,
                    "./using.js" : 35,
                    "./util" : 36
                }],
                23 : [function(require, mixin, n) {
                    /**
                     * @param {!Function} Promise
                     * @param {!Object} INTERNAL
                     * @param {!Object} tryConvertToPromise
                     * @param {?} apiRejection
                     * @param {!Function} Proxyable
                     * @return {?}
                     */
                    mixin.exports = function(Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable) {
                        /**
                         * @param {number} val
                         * @return {?}
                         */
                        function toResolutionValue(val) {
                            switch(val) {
                                case -2:
                                    return [];
                                case -3:
                                    return {};
                                case -6:
                                    return new Map;
                            }
                        }
                        /**
                         * @param {!Object} values
                         * @return {undefined}
                         */
                        function PromiseArray(values) {
                            var promise = this._promise = new Promise(INTERNAL);
                            if (values instanceof Promise) {
                                promise._propagateFrom(values, 3);
                            }
                            promise._setOnCancel(this);
                            /** @type {!Object} */
                            this._values = values;
                            /** @type {number} */
                            this._length = 0;
                            /** @type {number} */
                            this._totalResolved = 0;
                            this._init(void 0, -2);
                        }
                        var util = require("./util");
                        util.isArray;
                        return util.inherits(PromiseArray, Proxyable), PromiseArray.prototype.length = function() {
                            return this._length;
                        }, PromiseArray.prototype.promise = function() {
                            return this._promise;
                        }, PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
                            var values = tryConvertToPromise(this._values, this._promise);
                            if (values instanceof Promise) {
                                values = values._target();
                                var bitField = values._bitField;
                                if (this._values = values, 0 == (50397184 & bitField)) {
                                    return this._promise._setAsyncGuaranteed(), values._then(init, this._reject, void 0, this, resolveValueIfEmpty);
                                }
                                if (0 == (33554432 & bitField)) {
                                    return 0 != (16777216 & bitField) ? this._reject(values._reason()) : this._cancel();
                                }
                                values = values._value();
                            }
                            if (null === (values = util.asArray(values))) {
                                var reason = apiRejection("expecting an array or an iterable object but got " + util.classString(values)).reason();
                                return void this._promise._rejectCallback(reason, false);
                            }
                            if (0 === values.length) {
                                return void(-5 === resolveValueIfEmpty ? this._resolveEmptyArray() : this._resolve(toResolutionValue(resolveValueIfEmpty)));
                            }
                            this._iterate(values);
                        }, PromiseArray.prototype._iterate = function(values) {
                            var len = this.getActualLength(values.length);
                            this._length = len;
                            this._values = this.shouldCopyValues() ? new Array(len) : this._values;
                            var result = this._promise;
                            /** @type {boolean} */
                            var isResolved = false;
                            /** @type {null} */
                            var bitField = null;
                            /** @type {number} */
                            var i = 0;
                            for (; i < len; ++i) {
                                var maybePromise = tryConvertToPromise(values[i], result);
                                if (maybePromise instanceof Promise) {
                                    maybePromise = maybePromise._target();
                                    bitField = maybePromise._bitField;
                                } else {
                                    /** @type {null} */
                                    bitField = null;
                                }
                                if (isResolved) {
                                    if (null !== bitField) {
                                        maybePromise.suppressUnhandledRejections();
                                    }
                                } else {
                                    if (null !== bitField) {
                                        if (0 == (50397184 & bitField)) {
                                            maybePromise._proxy(this, i);
                                            this._values[i] = maybePromise;
                                        } else {
                                            isResolved = 0 != (33554432 & bitField) ? this._promiseFulfilled(maybePromise._value(), i) : 0 != (16777216 & bitField) ? this._promiseRejected(maybePromise._reason(), i) : this._promiseCancelled(i);
                                        }
                                    } else {
                                        isResolved = this._promiseFulfilled(maybePromise, i);
                                    }
                                }
                            }
                            if (!isResolved) {
                                result._setAsyncGuaranteed();
                            }
                        }, PromiseArray.prototype._isResolved = function() {
                            return null === this._values;
                        }, PromiseArray.prototype._resolve = function(value) {
                            /** @type {null} */
                            this._values = null;
                            this._promise._fulfill(value);
                        }, PromiseArray.prototype._cancel = function() {
                            if (!this._isResolved() && this._promise._isCancellable()) {
                                /** @type {null} */
                                this._values = null;
                                this._promise._cancel();
                            }
                        }, PromiseArray.prototype._reject = function(reason) {
                            /** @type {null} */
                            this._values = null;
                            this._promise._rejectCallback(reason, false);
                        }, PromiseArray.prototype._promiseFulfilled = function(value, index) {
                            return this._values[index] = value, ++this._totalResolved >= this._length && (this._resolve(this._values), true);
                        }, PromiseArray.prototype._promiseCancelled = function() {
                            return this._cancel(), true;
                        }, PromiseArray.prototype._promiseRejected = function(reason) {
                            return this._totalResolved++, this._reject(reason), true;
                        }, PromiseArray.prototype._resultCancelled = function() {
                            if (!this._isResolved()) {
                                var values = this._values;
                                if (this._cancel(), values instanceof Promise) {
                                    values.cancel();
                                } else {
                                    /** @type {number} */
                                    var i = 0;
                                    for (; i < values.length; ++i) {
                                        if (values[i] instanceof Promise) {
                                            values[i].cancel();
                                        }
                                    }
                                }
                            }
                        }, PromiseArray.prototype.shouldCopyValues = function() {
                            return true;
                        }, PromiseArray.prototype.getActualLength = function(len) {
                            return len;
                        }, PromiseArray;
                    };
                }, {
                    "./util" : 36
                }],
                24 : [function(_dereq_, mixin, n) {
                    /**
                     * @param {!Function} Promise
                     * @param {!Object} handler
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, handler) {
                        /**
                         * @param {?} key
                         * @return {?}
                         */
                        function propsFilter(key) {
                            return !negativeRegex.test(key);
                        }
                        /**
                         * @param {?} fn
                         * @return {?}
                         */
                        function isPromisified(fn) {
                            try {
                                return true === fn.__isPromisified__;
                            } catch (t) {
                                return false;
                            }
                        }
                        /**
                         * @param {?} obj
                         * @param {(Object|number)} key
                         * @param {!Object} suffix
                         * @return {?}
                         */
                        function hasPromisified(obj, key, suffix) {
                            var val = util.getDataPropertyOrDefault(obj, key + suffix, defaultPromisified);
                            return !!val && isPromisified(val);
                        }
                        /**
                         * @param {!Array} val
                         * @param {!Object} suffix
                         * @param {!RegExp} data
                         * @return {undefined}
                         */
                        function checkValid(val, suffix, data) {
                            /** @type {number} */
                            var i = 0;
                            for (; i < val.length; i = i + 2) {
                                var note = val[i];
                                if (data.test(note)) {
                                    var value = note.replace(data, "");
                                    /** @type {number} */
                                    var i = 0;
                                    for (; i < val.length; i = i + 2) {
                                        if (val[i] === value) {
                                            throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", suffix));
                                        }
                                    }
                                }
                            }
                        }
                        /**
                         * @param {(Object|string)} obj
                         * @param {!Object} suffix
                         * @param {!RegExp} suffixRegexp
                         * @param {!Function} filter
                         * @return {?}
                         */
                        function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
                            var existingKeys = util.inheritedDataKeys(obj);
                            /** @type {!Array} */
                            var t = [];
                            /** @type {number} */
                            var i = 0;
                            for (; i < existingKeys.length; ++i) {
                                var key = existingKeys[i];
                                var fn = obj[key];
                                var curLoop = filter === defaultFilter || defaultFilter(key, fn, obj);
                                if (!("function" != typeof fn || isPromisified(fn) || hasPromisified(obj, key, suffix) || !filter(key, fn, obj, curLoop))) {
                                    t.push(key, fn);
                                }
                            }
                            return checkValid(t, suffix, suffixRegexp), t;
                        }
                        /**
                         * @param {string} end
                         * @param {?} receiver
                         * @param {!Object} _
                         * @param {string} callback
                         * @param {!Object} __
                         * @param {boolean} multiArgs
                         * @return {?}
                         */
                        function makeNodePromisifiedClosure(end, receiver, _, callback, __, multiArgs) {
                            /**
                             * @return {?}
                             */
                            function promisified() {
                                var _receiver = receiver;
                                if (receiver === THIS) {
                                    _receiver = this;
                                }
                                var promise = new Promise(handler);
                                promise._captureStackTrace();
                                var callback = "string" == typeof method && this !== u ? this[method] : end;
                                var fn = nodebackForPromise(promise, multiArgs);
                                try {
                                    callback.apply(_receiver, withAppended(arguments, fn));
                                } catch (e) {
                                    promise._rejectCallback(maybeWrapAsError(e), true, true);
                                }
                                return promise._isFateSealed() || promise._setAsyncGuaranteed(), promise;
                            }
                            var u = function() {
                                return this;
                            }();
                            /** @type {string} */
                            var method = end;
                            return "string" == typeof method && (end = callback), util.notEnumerableProp(promisified, "__isPromisified__", true), promisified;
                        }
                        /**
                         * @param {!Object} obj
                         * @param {undefined} suffix
                         * @param {!Function} filter
                         * @param {?} promisifier
                         * @param {boolean} multiArgs
                         * @return {?}
                         */
                        function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
                            /** @type {!RegExp} */
                            var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
                            var methods = promisifiableMethods(obj, suffix, suffixRegexp, filter);
                            /** @type {number} */
                            var i = 0;
                            var l = methods.length;
                            for (; i < l; i = i + 2) {
                                var key = methods[i];
                                var fn = methods[i + 1];
                                var promisifiedKey = key + suffix;
                                if (promisifier === makeNodePromisified) {
                                    obj[promisifiedKey] = makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
                                } else {
                                    var promisified = promisifier(fn, function() {
                                        return makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
                                    });
                                    util.notEnumerableProp(promisified, "__isPromisified__", true);
                                    obj[promisifiedKey] = promisified;
                                }
                            }
                            return util.toFastProperties(obj), obj;
                        }
                        /**
                         * @param {boolean} callback
                         * @param {?} receiver
                         * @param {boolean} multiArgs
                         * @return {?}
                         */
                        function promisify(callback, receiver, multiArgs) {
                            return makeNodePromisified(callback, receiver, void 0, callback, null, multiArgs);
                        }
                        var makeNodePromisifiedEval;
                        var THIS = {};
                        var util = _dereq_("./util");
                        var nodebackForPromise = _dereq_("./nodeback");
                        var withAppended = util.withAppended;
                        var maybeWrapAsError = util.maybeWrapAsError;
                        var canEvaluate = util.canEvaluate;
                        var TypeError = _dereq_("./errors").TypeError;
                        var defaultPromisified = {
                            __isPromisified__ : true
                        };
                        /** @type {!Array} */
                        var noCopyProps = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"];
                        /** @type {!RegExp} */
                        var negativeRegex = new RegExp("^(?:" + noCopyProps.join("|") + ")$");
                        /**
                         * @param {string} name
                         * @return {?}
                         */
                        var defaultFilter = function(name) {
                            return util.isIdentifier(name) && "_" !== name.charAt(0) && "constructor" !== name;
                        };
                        /**
                         * @param {string} str
                         * @return {?}
                         */
                        var escapeIdentRegex = function(str) {
                            return str.replace(/([$])/, "\\$");
                        };
                        /** @type {(function(string, ?, !Object, string, !Object, boolean): ?|undefined)} */
                        var makeNodePromisified = canEvaluate ? makeNodePromisifiedEval : makeNodePromisifiedClosure;
                        /**
                         * @param {?} fn
                         * @param {!Object} obj
                         * @return {?}
                         */
                        Promise.promisify = function(fn, obj) {
                            if ("function" != typeof fn) {
                                throw new TypeError("expecting a function but got " + util.classString(fn));
                            }
                            if (isPromisified(fn)) {
                                return fn;
                            }
                            /** @type {!Object} */
                            obj = Object(obj);
                            var receiver = void 0 === obj.context ? THIS : obj.context;
                            /** @type {boolean} */
                            var multiArgs = !!obj.multiArgs;
                            var ret = promisify(fn, receiver, multiArgs);
                            return util.copyDescriptors(fn, ret, propsFilter), ret;
                        };
                        /**
                         * @param {!Object} obj
                         * @param {!Object} options
                         * @return {?}
                         */
                        Promise.promisifyAll = function(obj, options) {
                            if ("function" != typeof obj && "object" != typeof obj) {
                                throw new TypeError("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
                            }
                            /** @type {!Object} */
                            options = Object(options);
                            /** @type {boolean} */
                            var multiArgs = !!options.multiArgs;
                            var suffix = options.suffix;
                            if ("string" != typeof suffix) {
                                /** @type {string} */
                                suffix = "Async";
                            }
                            var filter = options.filter;
                            if ("function" != typeof filter) {
                                /** @type {function(string): ?} */
                                filter = defaultFilter;
                            }
                            var promisifier = options.promisifier;
                            if ("function" != typeof promisifier && (promisifier = makeNodePromisified), !util.isIdentifier(suffix)) {
                                throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
                            }
                            var props = util.inheritedDataKeys(obj);
                            /** @type {number} */
                            var i = 0;
                            for (; i < props.length; ++i) {
                                var value = obj[props[i]];
                                if ("constructor" !== props[i] && util.isClass(value)) {
                                    promisifyAll(value.prototype, suffix, filter, promisifier, multiArgs);
                                    promisifyAll(value, suffix, filter, promisifier, multiArgs);
                                }
                            }
                            return promisifyAll(obj, suffix, filter, promisifier, multiArgs);
                        };
                    };
                }, {
                    "./errors" : 12,
                    "./nodeback" : 20,
                    "./util" : 36
                }],
                25 : [function(require, mixin, n) {
                    /**
                     * @param {!Object} Promise
                     * @param {!Object} PromiseArray
                     * @param {!Object} tryConvertToPromise
                     * @param {?} apiRejection
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, PromiseArray, tryConvertToPromise, apiRejection) {
                        /**
                         * @param {?} obj
                         * @return {undefined}
                         */
                        function PropertiesPromiseArray(obj) {
                            var entries;
                            /** @type {boolean} */
                            var isMap = false;
                            if (void 0 !== Es6Map && obj instanceof Es6Map) {
                                entries = mapToEntries(obj);
                                /** @type {boolean} */
                                isMap = true;
                            } else {
                                var r = objct.keys(obj);
                                var n = r.length;
                                /** @type {!Array} */
                                entries = new Array(2 * n);
                                /** @type {number} */
                                var i = 0;
                                for (; i < n; ++i) {
                                    var key = r[i];
                                    entries[i] = obj[key];
                                    entries[i + n] = key;
                                }
                            }
                            this.constructor$(entries);
                            /** @type {boolean} */
                            this._isMap = isMap;
                            this._init$(void 0, isMap ? -6 : -3);
                        }
                        /**
                         * @param {?} promises
                         * @return {?}
                         */
                        function props(promises) {
                            var promise;
                            var castValue = tryConvertToPromise(promises);
                            return isObject(castValue) ? (promise = castValue instanceof Promise ? castValue._then(Promise.props, void 0, void 0, void 0, void 0) : (new PropertiesPromiseArray(castValue)).promise(), castValue instanceof Promise && promise._propagateFrom(castValue, 2), promise) : apiRejection("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
                        }
                        var Es6Map;
                        var util = require("./util");
                        var isObject = util.isObject;
                        var objct = require("./es5");
                        if ("function" == typeof Map) {
                            /** @type {function(new:Map, (Array<Array<(KEY|VALUE)>>|Iterable<Array<(KEY|VALUE)>>|null)=): ?} */
                            Es6Map = Map;
                        }
                        var mapToEntries = function() {
                            /**
                             * @param {?} callback
                             * @param {?} initialHash
                             * @return {undefined}
                             */
                            function hash(callback, initialHash) {
                                this[message] = callback;
                                this[message + num] = initialHash;
                                message++;
                            }
                            /** @type {number} */
                            var message = 0;
                            /** @type {number} */
                            var num = 0;
                            return function(res) {
                                num = res.size;
                                /** @type {number} */
                                message = 0;
                                /** @type {!Array} */
                                var value = new Array(2 * res.size);
                                return res.forEach(hash, value), value;
                            };
                        }();
                        /**
                         * @param {!Array} entries
                         * @return {?}
                         */
                        var entriesToMap = function(entries) {
                            var ret = new Es6Map;
                            /** @type {number} */
                            var cache_ = entries.length / 2 | 0;
                            /** @type {number} */
                            var id = 0;
                            for (; id < cache_; ++id) {
                                var name = entries[cache_ + id];
                                var value = entries[id];
                                ret.set(name, value);
                            }
                            return ret;
                        };
                        util.inherits(PropertiesPromiseArray, PromiseArray);
                        /**
                         * @return {undefined}
                         */
                        PropertiesPromiseArray.prototype._init = function() {
                        };
                        /**
                         * @param {!Object} value
                         * @param {!Function} index
                         * @return {?}
                         */
                        PropertiesPromiseArray.prototype._promiseFulfilled = function(value, index) {
                            if (this._values[index] = value, ++this._totalResolved >= this._length) {
                                var val;
                                if (this._isMap) {
                                    val = entriesToMap(this._values);
                                } else {
                                    val = {};
                                    var keyOffset = this.length();
                                    /** @type {number} */
                                    var i = 0;
                                    var length = this.length();
                                    for (; i < length; ++i) {
                                        val[this._values[i + keyOffset]] = this._values[i];
                                    }
                                }
                                return this._resolve(val), true;
                            }
                            return false;
                        };
                        /**
                         * @return {?}
                         */
                        PropertiesPromiseArray.prototype.shouldCopyValues = function() {
                            return false;
                        };
                        /**
                         * @param {number} len
                         * @return {?}
                         */
                        PropertiesPromiseArray.prototype.getActualLength = function(len) {
                            return len >> 1;
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype.props = function() {
                            return props(this);
                        };
                        /**
                         * @param {?} promises
                         * @return {?}
                         */
                        Promise.props = function(promises) {
                            return props(promises);
                        };
                    };
                }, {
                    "./es5" : 13,
                    "./util" : 36
                }],
                26 : [function(canCreateDiscussions, module, n) {
                    /**
                     * @param {?} array
                     * @param {number} i
                     * @param {?} data
                     * @param {number} len
                     * @param {number} from
                     * @return {undefined}
                     */
                    function arrayMove(array, i, data, len, from) {
                        /** @type {number} */
                        var to = 0;
                        for (; to < from; ++to) {
                            data[to + len] = array[to + i];
                            array[to + i] = void 0;
                        }
                    }
                    /**
                     * @param {number} name
                     * @return {undefined}
                     */
                    function Queue(name) {
                        /** @type {number} */
                        this._capacity = name;
                        /** @type {number} */
                        this._length = 0;
                        /** @type {number} */
                        this._front = 0;
                    }
                    /**
                     * @param {?} size
                     * @return {?}
                     */
                    Queue.prototype._willBeOverCapacity = function(size) {
                        return this._capacity < size;
                    };
                    /**
                     * @param {string} arg
                     * @return {undefined}
                     */
                    Queue.prototype._pushOne = function(arg) {
                        var length = this.length();
                        this._checkCapacity(length + 1);
                        /** @type {string} */
                        this[this._front + length & this._capacity - 1] = arg;
                        this._length = length + 1;
                    };
                    /**
                     * @param {string} value
                     * @param {string} receiver
                     * @param {string} arg
                     * @return {?}
                     */
                    Queue.prototype.push = function(value, receiver, arg) {
                        var length = this.length() + 3;
                        if (this._willBeOverCapacity(length)) {
                            return this._pushOne(value), this._pushOne(receiver), void this._pushOne(arg);
                        }
                        /** @type {number} */
                        var j = this._front + length - 3;
                        this._checkCapacity(length);
                        /** @type {number} */
                        var wrapMask = this._capacity - 1;
                        /** @type {string} */
                        this[j + 0 & wrapMask] = value;
                        /** @type {string} */
                        this[j + 1 & wrapMask] = receiver;
                        /** @type {string} */
                        this[j + 2 & wrapMask] = arg;
                        this._length = length;
                    };
                    /**
                     * @return {?}
                     */
                    Queue.prototype.shift = function() {
                        var front = this._front;
                        var ret = this[front];
                        return this[front] = void 0, this._front = front + 1 & this._capacity - 1, this._length--, ret;
                    };
                    /**
                     * @return {?}
                     */
                    Queue.prototype.length = function() {
                        return this._length;
                    };
                    /**
                     * @param {?} size
                     * @return {undefined}
                     */
                    Queue.prototype._checkCapacity = function(size) {
                        if (this._capacity < size) {
                            this._resizeTo(this._capacity << 1);
                        }
                    };
                    /**
                     * @param {number} capacity
                     * @return {undefined}
                     */
                    Queue.prototype._resizeTo = function(capacity) {
                        var oldCapacity = this._capacity;
                        /** @type {number} */
                        this._capacity = capacity;
                        arrayMove(this, 0, this, oldCapacity, this._front + this._length & oldCapacity - 1);
                    };
                    /** @type {function(number): undefined} */
                    module.exports = Queue;
                }, {}],
                27 : [function(require, mixin, n) {
                    /**
                     * @param {!Function} Promise
                     * @param {!Object} INTERNAL
                     * @param {!Object} tryConvertToPromise
                     * @param {?} apiRejection
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, INTERNAL, tryConvertToPromise, apiRejection) {
                        /**
                         * @param {!Array} promises
                         * @param {?} parent
                         * @return {?}
                         */
                        function race(promises, parent) {
                            var maybePromise = tryConvertToPromise(promises);
                            if (maybePromise instanceof Promise) {
                                return raceLater(maybePromise);
                            }
                            if (null === (promises = util.asArray(promises))) {
                                return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
                            }
                            var ret = new Promise(INTERNAL);
                            if (void 0 !== parent) {
                                ret._propagateFrom(parent, 3);
                            }
                            var fn = ret._fulfill;
                            var reject = ret._reject;
                            /** @type {number} */
                            var i = 0;
                            var remaining = promises.length;
                            for (; i < remaining; ++i) {
                                var val = promises[i];
                                if (void 0 !== val || i in promises) {
                                    Promise.cast(val)._then(fn, reject, void 0, ret, null);
                                }
                            }
                            return ret;
                        }
                        var util = require("./util");
                        /**
                         * @param {?} promise
                         * @return {?}
                         */
                        var raceLater = function(promise) {
                            return promise.then(function(promises) {
                                return race(promises, promise);
                            });
                        };
                        /**
                         * @param {!Array} promises
                         * @return {?}
                         */
                        Promise.race = function(promises) {
                            return race(promises, void 0);
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype.race = function() {
                            return race(this, void 0);
                        };
                    };
                }, {
                    "./util" : 36
                }],
                28 : [function(require, mixin, n) {
                    /**
                     * @param {!Object} Promise
                     * @param {!Object} PromiseArray
                     * @param {!Object} apiRejection
                     * @param {?} tryConvertToPromise
                     * @param {undefined} INTERNAL
                     * @param {?} debug
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
                        /**
                         * @param {?} promises
                         * @param {!Function} fn
                         * @param {string} initialValue
                         * @param {number} _each
                         * @return {undefined}
                         */
                        function ReductionPromiseArray(promises, fn, initialValue, _each) {
                            this.constructor$(promises);
                            var string = getDomain();
                            this._fn = null === string ? fn : util.domainBind(string, fn);
                            if (void 0 !== initialValue) {
                                initialValue = Promise.resolve(initialValue);
                                initialValue._attachCancellationCallback(this);
                            }
                            /** @type {string} */
                            this._initialValue = initialValue;
                            /** @type {null} */
                            this._currentCancellable = null;
                            /** @type {(Array|null|undefined)} */
                            this._eachValues = _each === INTERNAL ? Array(this._length) : 0 === _each ? null : void 0;
                            this._promise._captureStackTrace();
                            this._init$(void 0, -5);
                        }
                        /**
                         * @param {!Object} value
                         * @param {?} array
                         * @return {undefined}
                         */
                        function completed(value, array) {
                            if (this.isFulfilled()) {
                                array._resolve(value);
                            } else {
                                array._reject(value);
                            }
                        }
                        /**
                         * @param {!Function} promises
                         * @param {!Function} fn
                         * @param {!Function} initialValue
                         * @param {!Function} _each
                         * @return {?}
                         */
                        function reduce(promises, fn, initialValue, _each) {
                            return "function" != typeof fn ? apiRejection("expecting a function but got " + util.classString(fn)) : (new ReductionPromiseArray(promises, fn, initialValue, _each)).promise();
                        }
                        /**
                         * @param {!Array} accum
                         * @return {?}
                         */
                        function gotAccum(accum) {
                            /** @type {!Array} */
                            this.accum = accum;
                            this.array._gotAccum(accum);
                            var value = tryConvertToPromise(this.value, this.array._promise);
                            return value instanceof Promise ? (this.array._currentCancellable = value, value._then(gotValue, void 0, void 0, this, void 0)) : gotValue.call(this, value);
                        }
                        /**
                         * @param {?} context
                         * @return {?}
                         */
                        function gotValue(context) {
                            var array = this.array;
                            var promise = array._promise;
                            var fn = tryCatch(array._fn);
                            promise._pushContext();
                            var value;
                            if ((value = void 0 !== array._eachValues ? fn.call(promise._boundValue(), context, this.index, this.length) : fn.call(promise._boundValue(), this.accum, context, this.index, this.length)) instanceof Promise) {
                                array._currentCancellable = value;
                            }
                            var promiseCreated = promise._popContext();
                            return debug.checkForgottenReturns(value, promiseCreated, void 0 !== array._eachValues ? "Promise.each" : "Promise.reduce", promise), value;
                        }
                        var getDomain = Promise._getDomain;
                        var util = require("./util");
                        var tryCatch = util.tryCatch;
                        util.inherits(ReductionPromiseArray, PromiseArray);
                        /**
                         * @param {boolean} accum
                         * @return {undefined}
                         */
                        ReductionPromiseArray.prototype._gotAccum = function(accum) {
                            if (void 0 !== this._eachValues && null !== this._eachValues && accum !== INTERNAL) {
                                this._eachValues.push(accum);
                            }
                        };
                        /**
                         * @param {string} value
                         * @return {?}
                         */
                        ReductionPromiseArray.prototype._eachComplete = function(value) {
                            return null !== this._eachValues && this._eachValues.push(value), this._eachValues;
                        };
                        /**
                         * @return {undefined}
                         */
                        ReductionPromiseArray.prototype._init = function() {
                        };
                        /**
                         * @return {undefined}
                         */
                        ReductionPromiseArray.prototype._resolveEmptyArray = function() {
                            this._resolve(void 0 !== this._eachValues ? this._eachValues : this._initialValue);
                        };
                        /**
                         * @return {?}
                         */
                        ReductionPromiseArray.prototype.shouldCopyValues = function() {
                            return false;
                        };
                        /**
                         * @param {!Object} value
                         * @return {undefined}
                         */
                        ReductionPromiseArray.prototype._resolve = function(value) {
                            this._promise._resolveCallback(value);
                            /** @type {null} */
                            this._values = null;
                        };
                        /**
                         * @param {string} sender
                         * @return {?}
                         */
                        ReductionPromiseArray.prototype._resultCancelled = function(sender) {
                            if (sender === this._initialValue) {
                                return this._cancel();
                            }
                            if (!this._isResolved()) {
                                this._resultCancelled$();
                                if (this._currentCancellable instanceof Promise) {
                                    this._currentCancellable.cancel();
                                }
                                if (this._initialValue instanceof Promise) {
                                    this._initialValue.cancel();
                                }
                            }
                        };
                        /**
                         * @param {!Object} values
                         * @return {undefined}
                         */
                        ReductionPromiseArray.prototype._iterate = function(values) {
                            /** @type {!Object} */
                            this._values = values;
                            var value;
                            var j;
                            var i = values.length;
                            if (void 0 !== this._initialValue ? (value = this._initialValue, j = 0) : (value = Promise.resolve(values[0]), j = 1), this._currentCancellable = value, !value.isRejected()) {
                                for (; j < i; ++j) {
                                    var ctx = {
                                        accum : null,
                                        value : values[j],
                                        index : j,
                                        length : i,
                                        array : this
                                    };
                                    value = value._then(gotAccum, void 0, void 0, ctx, void 0);
                                }
                            }
                            if (void 0 !== this._eachValues) {
                                value = value._then(this._eachComplete, void 0, void 0, this, void 0);
                            }
                            value._then(completed, completed, void 0, value, this);
                        };
                        /**
                         * @param {!Function} array
                         * @param {!Function} value
                         * @return {?}
                         */
                        Promise.prototype.reduce = function(array, value) {
                            return reduce(this, array, value, null);
                        };
                        /**
                         * @param {!Function} array
                         * @param {!Function} fn
                         * @param {number} initialValue
                         * @param {number} _each
                         * @return {?}
                         */
                        Promise.reduce = function(array, fn, initialValue, _each) {
                            return reduce(array, fn, initialValue, _each);
                        };
                    };
                }, {
                    "./util" : 36
                }],
                29 : [function(require, module, canCreateDiscussions) {
                    var api;
                    var util = require("./util");
                    /**
                     * @return {?}
                     */
                    var end = function() {
                        throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
                    };
                    var field = util.getNativePromise();
                    if (util.isNode && "undefined" == typeof MutationObserver) {
                        var GlobalSetImmediate = global.setImmediate;
                        var original = options.nextTick;
                        /** @type {function(!Function): undefined} */
                        api = util.isRecentNode ? function(fn) {
                            GlobalSetImmediate.call(global, fn);
                        } : function(k) {
                            original.call(options, k);
                        };
                    } else {
                        if ("function" == typeof field && "function" == typeof field.resolve) {
                            var lastRegex = field.resolve();
                            /**
                             * @param {!Function} req
                             * @return {undefined}
                             */
                            api = function(req) {
                                lastRegex.then(req);
                            };
                        } else {
                            api = "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && (window.navigator.standalone || window.cordova) ? void 0 !== number ? function(s) {
                                number(s);
                            } : "undefined" != typeof setTimeout ? function(call) {
                                setTimeout(call, 0);
                            } : end : function() {
                                /** @type {!UI} */
                                var div = document.createElement("div");
                                var observerConfig = {
                                    attributes : true
                                };
                                /** @type {boolean} */
                                var n = false;
                                /** @type {!UI} */
                                var r = document.createElement("div");
                                (new MutationObserver(function() {
                                    div.classList.toggle("foo");
                                    /** @type {boolean} */
                                    n = false;
                                })).observe(r, observerConfig);
                                /**
                                 * @return {undefined}
                                 */
                                var handleToggledOrCodeOnly = function() {
                                    if (!n) {
                                        /** @type {boolean} */
                                        n = true;
                                        r.classList.toggle("foo");
                                    }
                                };
                                return function(saveNotifs) {
                                    /** @type {!MutationObserver} */
                                    var observer = new MutationObserver(function() {
                                        observer.disconnect();
                                        saveNotifs();
                                    });
                                    observer.observe(div, observerConfig);
                                    handleToggledOrCodeOnly();
                                };
                            }();
                        }
                    }
                    module.exports = api;
                }, {
                    "./util" : 36
                }],
                30 : [function(__webpack_require__, mixin, n) {
                    /**
                     * @param {!Function} Promise
                     * @param {!Object} name
                     * @param {!Object} data
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, name, data) {
                        /**
                         * @param {?} values
                         * @return {undefined}
                         */
                        function SettledPromiseArray(values) {
                            this.constructor$(values);
                        }
                        var PromiseInspection = Promise.PromiseInspection;
                        __webpack_require__("./util").inherits(SettledPromiseArray, name);
                        /**
                         * @param {!Function} index
                         * @param {number} inspection
                         * @return {?}
                         */
                        SettledPromiseArray.prototype._promiseResolved = function(index, inspection) {
                            return this._values[index] = inspection, ++this._totalResolved >= this._length && (this._resolve(this._values), true);
                        };
                        /**
                         * @param {!Object} value
                         * @param {!Function} index
                         * @return {?}
                         */
                        SettledPromiseArray.prototype._promiseFulfilled = function(value, index) {
                            var ret = new PromiseInspection;
                            return ret._bitField = 33554432, ret._settledValueField = value, this._promiseResolved(index, ret);
                        };
                        /**
                         * @param {!Object} reason
                         * @param {!Function} index
                         * @return {?}
                         */
                        SettledPromiseArray.prototype._promiseRejected = function(reason, index) {
                            var ret = new PromiseInspection;
                            return ret._bitField = 16777216, ret._settledValueField = reason, this._promiseResolved(index, ret);
                        };
                        /**
                         * @param {?} promises
                         * @return {?}
                         */
                        Promise.settle = function(promises) {
                            return data.deprecated(".settle()", ".reflect()"), (new SettledPromiseArray(promises)).promise();
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype.settle = function() {
                            return Promise.settle(this);
                        };
                    };
                }, {
                    "./util" : 36
                }],
                31 : [function(require, mixin, n) {
                    /**
                     * @param {string} Promise
                     * @param {!Object} name
                     * @param {!Object} func
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, name, func) {
                        /**
                         * @param {?} values
                         * @return {undefined}
                         */
                        function SomePromiseArray(values) {
                            this.constructor$(values);
                            /** @type {number} */
                            this._howMany = 0;
                            /** @type {boolean} */
                            this._unwrap = false;
                            /** @type {boolean} */
                            this._initialized = false;
                        }
                        /**
                         * @param {?} promises
                         * @param {number} howMany
                         * @return {?}
                         */
                        function some(promises, howMany) {
                            if ((0 | howMany) !== howMany || howMany < 0) {
                                return func("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
                            }
                            var ret = new SomePromiseArray(promises);
                            var o = ret.promise();
                            return ret.setHowMany(howMany), ret.init(), o;
                        }
                        var util = require("./util");
                        var RangeError = require("./errors").RangeError;
                        var AggregateError = require("./errors").AggregateError;
                        var isArray = util.isArray;
                        var CANCELLATION = {};
                        util.inherits(SomePromiseArray, name);
                        /**
                         * @return {?}
                         */
                        SomePromiseArray.prototype._init = function() {
                            if (this._initialized) {
                                if (0 === this._howMany) {
                                    return void this._resolve([]);
                                }
                                this._init$(void 0, -5);
                                var isArrayResolved = isArray(this._values);
                                if (!this._isResolved() && isArrayResolved && this._howMany > this._canPossiblyFulfill()) {
                                    this._reject(this._getRangeError(this.length()));
                                }
                            }
                        };
                        /**
                         * @return {undefined}
                         */
                        SomePromiseArray.prototype.init = function() {
                            /** @type {boolean} */
                            this._initialized = true;
                            this._init();
                        };
                        /**
                         * @return {undefined}
                         */
                        SomePromiseArray.prototype.setUnwrap = function() {
                            /** @type {boolean} */
                            this._unwrap = true;
                        };
                        /**
                         * @return {?}
                         */
                        SomePromiseArray.prototype.howMany = function() {
                            return this._howMany;
                        };
                        /**
                         * @param {number} count
                         * @return {undefined}
                         */
                        SomePromiseArray.prototype.setHowMany = function(count) {
                            /** @type {number} */
                            this._howMany = count;
                        };
                        /**
                         * @param {!Object} value
                         * @return {?}
                         */
                        SomePromiseArray.prototype._promiseFulfilled = function(value) {
                            return this._addFulfilled(value), this._fulfilled() === this.howMany() && (this._values.length = this.howMany(), 1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), true);
                        };
                        /**
                         * @param {?} reason
                         * @return {?}
                         */
                        SomePromiseArray.prototype._promiseRejected = function(reason) {
                            return this._addRejected(reason), this._checkOutcome();
                        };
                        /**
                         * @return {?}
                         */
                        SomePromiseArray.prototype._promiseCancelled = function() {
                            return this._values instanceof Promise || null == this._values ? this._cancel() : (this._addRejected(CANCELLATION), this._checkOutcome());
                        };
                        /**
                         * @return {?}
                         */
                        SomePromiseArray.prototype._checkOutcome = function() {
                            if (this.howMany() > this._canPossiblyFulfill()) {
                                var e = new AggregateError;
                                var i = this.length();
                                for (; i < this._values.length; ++i) {
                                    if (this._values[i] !== CANCELLATION) {
                                        e.push(this._values[i]);
                                    }
                                }
                                return e.length > 0 ? this._reject(e) : this._cancel(), true;
                            }
                            return false;
                        };
                        /**
                         * @return {?}
                         */
                        SomePromiseArray.prototype._fulfilled = function() {
                            return this._totalResolved;
                        };
                        /**
                         * @return {?}
                         */
                        SomePromiseArray.prototype._rejected = function() {
                            return this._values.length - this.length();
                        };
                        /**
                         * @param {boolean} reason
                         * @return {undefined}
                         */
                        SomePromiseArray.prototype._addRejected = function(reason) {
                            this._values.push(reason);
                        };
                        /**
                         * @param {!Object} value
                         * @return {undefined}
                         */
                        SomePromiseArray.prototype._addFulfilled = function(value) {
                            /** @type {!Object} */
                            this._values[this._totalResolved++] = value;
                        };
                        /**
                         * @return {?}
                         */
                        SomePromiseArray.prototype._canPossiblyFulfill = function() {
                            return this.length() - this._rejected();
                        };
                        /**
                         * @param {number} count
                         * @return {?}
                         */
                        SomePromiseArray.prototype._getRangeError = function(count) {
                            /** @type {string} */
                            var errorMessage = "Input array must contain at least " + this._howMany + " items but contains only " + count + " items";
                            return new RangeError(errorMessage);
                        };
                        /**
                         * @return {undefined}
                         */
                        SomePromiseArray.prototype._resolveEmptyArray = function() {
                            this._reject(this._getRangeError(0));
                        };
                        /**
                         * @param {?} promises
                         * @param {undefined} howMany
                         * @return {?}
                         */
                        Promise.some = function(promises, howMany) {
                            return some(promises, howMany);
                        };
                        /**
                         * @param {undefined} howMany
                         * @return {?}
                         */
                        Promise.prototype.some = function(howMany) {
                            return some(this, howMany);
                        };
                        /** @type {function(?): undefined} */
                        Promise._SomePromiseArray = SomePromiseArray;
                    };
                }, {
                    "./errors" : 12,
                    "./util" : 36
                }],
                32 : [function(canCreateDiscussions, mixin, n) {
                    /**
                     * @param {!Function} Promise
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise) {
                        /**
                         * @param {number} promise
                         * @return {undefined}
                         */
                        function PromiseInspection(promise) {
                            if (void 0 !== promise) {
                                promise = promise._target();
                                this._bitField = promise._bitField;
                                this._settledValueField = promise._isFateSealed() ? promise._settledValue() : void 0;
                            } else {
                                /** @type {number} */
                                this._bitField = 0;
                                this._settledValueField = void 0;
                            }
                        }
                        /**
                         * @return {?}
                         */
                        PromiseInspection.prototype._settledValue = function() {
                            return this._settledValueField;
                        };
                        /** @type {function(): ?} */
                        var value = PromiseInspection.prototype.value = function() {
                            if (!this.isFulfilled()) {
                                throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
                            }
                            return this._settledValue();
                        };
                        /** @type {function(): ?} */
                        var originalElementQuerySelector = PromiseInspection.prototype.error = PromiseInspection.prototype.reason = function() {
                            if (!this.isRejected()) {
                                throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
                            }
                            return this._settledValue();
                        };
                        /** @type {function(): ?} */
                        var isResolved = PromiseInspection.prototype.isFulfilled = function() {
                            return 0 != (33554432 & this._bitField);
                        };
                        /** @type {function(): ?} */
                        var isFulfilled = PromiseInspection.prototype.isRejected = function() {
                            return 0 != (16777216 & this._bitField);
                        };
                        /** @type {function(): ?} */
                        var isRejected = PromiseInspection.prototype.isPending = function() {
                            return 0 == (50397184 & this._bitField);
                        };
                        /** @type {function(): ?} */
                        var isPending = PromiseInspection.prototype.isResolved = function() {
                            return 0 != (50331648 & this._bitField);
                        };
                        /**
                         * @return {?}
                         */
                        PromiseInspection.prototype.isCancelled = function() {
                            return 0 != (8454144 & this._bitField);
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype.__isCancelled = function() {
                            return 65536 == (65536 & this._bitField);
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype._isCancelled = function() {
                            return this._target().__isCancelled();
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype.isCancelled = function() {
                            return 0 != (8454144 & this._target()._bitField);
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype.isPending = function() {
                            return isRejected.call(this._target());
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype.isRejected = function() {
                            return isFulfilled.call(this._target());
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype.isFulfilled = function() {
                            return isResolved.call(this._target());
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype.isResolved = function() {
                            return isPending.call(this._target());
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype.value = function() {
                            return value.call(this._target());
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype.reason = function() {
                            var target = this._target();
                            return target._unsetRejectionIsUnhandled(), originalElementQuerySelector.call(target);
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype._value = function() {
                            return this._settledValue();
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype._reason = function() {
                            return this._unsetRejectionIsUnhandled(), this._settledValue();
                        };
                        /** @type {function(number): undefined} */
                        Promise.PromiseInspection = PromiseInspection;
                    };
                }, {}],
                33 : [function(require, mixin, n) {
                    /**
                     * @param {!Object} Promise
                     * @param {!Object} fn
                     * @return {?}
                     */
                    mixin.exports = function(Promise, fn) {
                        /**
                         * @param {!Object} obj
                         * @param {?} context
                         * @return {?}
                         */
                        function tryConvertToPromise(obj, context) {
                            if (isObject(obj)) {
                                if (obj instanceof Promise) {
                                    return obj;
                                }
                                var then = getThen(obj);
                                if (then === errorObj) {
                                    if (context) {
                                        context._pushContext();
                                    }
                                    var ret = Promise.reject(then.e);
                                    return context && context._popContext(), ret;
                                }
                                if ("function" == typeof then) {
                                    if (isAnyBluebirdPromise(obj)) {
                                        ret = new Promise(fn);
                                        return obj._then(ret._fulfill, ret._reject, void 0, ret, null), ret;
                                    }
                                    return doThenable(obj, then, context);
                                }
                            }
                            return obj;
                        }
                        /**
                         * @param {?} obj
                         * @return {?}
                         */
                        function doGetThen(obj) {
                            return obj.then;
                        }
                        /**
                         * @param {(Object|string)} obj
                         * @return {?}
                         */
                        function getThen(obj) {
                            try {
                                return doGetThen(obj);
                            } catch (reason) {
                                return errorObj.e = reason, errorObj;
                            }
                        }
                        /**
                         * @param {(Object|string)} obj
                         * @return {?}
                         */
                        function isAnyBluebirdPromise(obj) {
                            try {
                                return hasProp.call(obj, "_promise0");
                            } catch (t) {
                                return false;
                            }
                        }
                        /**
                         * @param {(Object|string)} x
                         * @param {!Function} then
                         * @param {?} context
                         * @return {?}
                         */
                        function doThenable(x, then, context) {
                            /**
                             * @param {!Object} value
                             * @return {undefined}
                             */
                            function resolve(value) {
                                if (promise) {
                                    promise._resolveCallback(value);
                                    /** @type {null} */
                                    promise = null;
                                }
                            }
                            /**
                             * @param {!Object} reason
                             * @return {undefined}
                             */
                            function reject(reason) {
                                if (promise) {
                                    promise._rejectCallback(reason, synchronous, true);
                                    /** @type {null} */
                                    promise = null;
                                }
                            }
                            var promise = new Promise(fn);
                            var p = promise;
                            if (context) {
                                context._pushContext();
                            }
                            promise._captureStackTrace();
                            if (context) {
                                context._popContext();
                            }
                            /** @type {boolean} */
                            var synchronous = true;
                            var result = util.tryCatch(then).call(x, resolve, reject);
                            return synchronous = false, promise && result === errorObj && (promise._rejectCallback(result.e, true, true), promise = null), p;
                        }
                        var util = require("./util");
                        var errorObj = util.errorObj;
                        var isObject = util.isObject;
                        /** @type {function(this:Object, *): boolean} */
                        var hasProp = {}.hasOwnProperty;
                        return tryConvertToPromise;
                    };
                }, {
                    "./util" : 36
                }],
                34 : [function(require, mixin, n) {
                    /**
                     * @param {!Function} Promise
                     * @param {!Object} val
                     * @param {!Object} config
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, val, config) {
                        /**
                         * @param {!Object} handle
                         * @return {undefined}
                         */
                        function HandleWrapper(handle) {
                            /** @type {!Object} */
                            this.handle = handle;
                        }
                        /**
                         * @param {?} value
                         * @return {?}
                         */
                        function successClear(value) {
                            return clearTimeout(this.handle), value;
                        }
                        /**
                         * @param {?} errtype
                         * @return {?}
                         */
                        function fail(errtype) {
                            throw clearTimeout(this.handle), errtype;
                        }
                        var util = require("./util");
                        var TimeoutError = Promise.TimeoutError;
                        /**
                         * @return {undefined}
                         */
                        HandleWrapper.prototype._resultCancelled = function() {
                            clearTimeout(this.handle);
                        };
                        /**
                         * @param {!Object} value
                         * @return {?}
                         */
                        var afterValue = function(value) {
                            return delay(+this).thenReturn(value);
                        };
                        /** @type {function(!Function, ?): ?} */
                        var delay = Promise.delay = function(ms, value) {
                            var ret;
                            var handle;
                            return void 0 !== value ? (ret = Promise.resolve(value)._then(afterValue, null, null, ms, void 0), config.cancellation() && value instanceof Promise && ret._setOnCancel(value)) : (ret = new Promise(val), handle = setTimeout(function() {
                                ret._fulfill();
                            }, +ms), config.cancellation() && ret._setOnCancel(new HandleWrapper(handle)), ret._captureStackTrace()), ret._setAsyncGuaranteed(), ret;
                        };
                        /**
                         * @param {!Function} val
                         * @return {?}
                         */
                        Promise.prototype.delay = function(val) {
                            return delay(val, this);
                        };
                        /**
                         * @param {!Object} promise
                         * @param {string} message
                         * @param {!Object} parent
                         * @return {undefined}
                         */
                        var afterTimeout = function(promise, message, parent) {
                            var reason;
                            reason = "string" != typeof message ? message instanceof Error ? message : new TimeoutError("operation timed out") : new TimeoutError(message);
                            util.markAsOriginatingFromRejection(reason);
                            promise._attachExtraTrace(reason);
                            promise._reject(reason);
                            if (null != parent) {
                                parent.cancel();
                            }
                        };
                        /**
                         * @param {number} ms
                         * @param {string} message
                         * @return {?}
                         */
                        Promise.prototype.timeout = function(ms, message) {
                            /** @type {number} */
                            ms = +ms;
                            var ret;
                            var parent;
                            var value = new HandleWrapper(setTimeout(function() {
                                if (ret.isPending()) {
                                    afterTimeout(ret, message, parent);
                                }
                            }, ms));
                            return config.cancellation() ? (parent = this.then(), ret = parent._then(successClear, fail, void 0, value, void 0), ret._setOnCancel(value)) : ret = this._then(successClear, fail, void 0, value, void 0), ret;
                        };
                    };
                }, {
                    "./util" : 36
                }],
                35 : [function(_dereq_, mixin, n) {
                    /**
                     * @param {!Function} Promise
                     * @param {!Object} apiRejection
                     * @param {!Object} tryConvertToPromise
                     * @param {?} createContext
                     * @param {?} INTERNAL
                     * @param {?} debug
                     * @return {undefined}
                     */
                    mixin.exports = function(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug) {
                        /**
                         * @param {?} name
                         * @return {undefined}
                         */
                        function thrower(name) {
                            setTimeout(function() {
                                throw name;
                            }, 0);
                        }
                        /**
                         * @param {?} thenable
                         * @return {?}
                         */
                        function castPreservingDisposable(thenable) {
                            var maybePromise = tryConvertToPromise(thenable);
                            return maybePromise !== thenable && "function" == typeof thenable._isDisposable && "function" == typeof thenable._getDisposer && thenable._isDisposable() && maybePromise._setDisposable(thenable._getDisposer()), maybePromise;
                        }
                        /**
                         * @param {!Object} resources
                         * @param {?} inspection
                         * @return {?}
                         */
                        function dispose(resources, inspection) {
                            /**
                             * @return {?}
                             */
                            function iterator() {
                                if (siteVersion >= versionNumber) {
                                    return promise._fulfill();
                                }
                                var maybePromise = castPreservingDisposable(resources[siteVersion++]);
                                if (maybePromise instanceof Promise && maybePromise._isDisposable()) {
                                    try {
                                        maybePromise = tryConvertToPromise(maybePromise._getDisposer().tryDispose(inspection), resources.promise);
                                    } catch (fetchCollection) {
                                        return thrower(fetchCollection);
                                    }
                                    if (maybePromise instanceof Promise) {
                                        return maybePromise._then(iterator, thrower, null, null, null);
                                    }
                                }
                                iterator();
                            }
                            /** @type {number} */
                            var siteVersion = 0;
                            var versionNumber = resources.length;
                            var promise = new Promise(INTERNAL);
                            return iterator(), promise;
                        }
                        /**
                         * @param {string} data
                         * @param {string} promise
                         * @param {string} context
                         * @return {undefined}
                         */
                        function Disposer(data, promise, context) {
                            /** @type {string} */
                            this._data = data;
                            /** @type {string} */
                            this._promise = promise;
                            /** @type {string} */
                            this._context = context;
                        }
                        /**
                         * @param {?} fn
                         * @param {?} promise
                         * @param {?} context
                         * @return {undefined}
                         */
                        function FunctionDisposer(fn, promise, context) {
                            this.constructor$(fn, promise, context);
                        }
                        /**
                         * @param {!Object} value
                         * @return {?}
                         */
                        function maybeUnwrapDisposer(value) {
                            return Disposer.isDisposer(value) ? (this.resources[this.index]._setDisposable(value), value.promise()) : value;
                        }
                        /**
                         * @param {number} length
                         * @return {undefined}
                         */
                        function ResourceList(length) {
                            /** @type {number} */
                            this.length = length;
                            /** @type {null} */
                            this.promise = null;
                            /** @type {null} */
                            this[length - 1] = null;
                        }
                        var util = _dereq_("./util");
                        var TypeError = _dereq_("./errors").TypeError;
                        var inherits = _dereq_("./util").inherits;
                        var errorObj = util.errorObj;
                        var tryCatch = util.tryCatch;
                        var NULL = {};
                        /**
                         * @return {?}
                         */
                        Disposer.prototype.data = function() {
                            return this._data;
                        };
                        /**
                         * @return {?}
                         */
                        Disposer.prototype.promise = function() {
                            return this._promise;
                        };
                        /**
                         * @return {?}
                         */
                        Disposer.prototype.resource = function() {
                            return this.promise().isFulfilled() ? this.promise().value() : NULL;
                        };
                        /**
                         * @param {?} inspection
                         * @return {?}
                         */
                        Disposer.prototype.tryDispose = function(inspection) {
                            var resource = this.resource();
                            var context = this._context;
                            if (void 0 !== context) {
                                context._pushContext();
                            }
                            var r = resource !== NULL ? this.doDispose(resource, inspection) : null;
                            return void 0 !== context && context._popContext(), this._promise._unsetDisposable(), this._data = null, r;
                        };
                        /**
                         * @param {!Object} d
                         * @return {?}
                         */
                        Disposer.isDisposer = function(d) {
                            return null != d && "function" == typeof d.resource && "function" == typeof d.tryDispose;
                        };
                        inherits(FunctionDisposer, Disposer);
                        /**
                         * @param {?} resource
                         * @param {?} inspection
                         * @return {?}
                         */
                        FunctionDisposer.prototype.doDispose = function(resource, inspection) {
                            return this.data().call(resource, resource, inspection);
                        };
                        /**
                         * @return {undefined}
                         */
                        ResourceList.prototype._resultCancelled = function() {
                            var i = this.length;
                            /** @type {number} */
                            var j = 0;
                            for (; j < i; ++j) {
                                var values = this[j];
                                if (values instanceof Promise) {
                                    values.cancel();
                                }
                            }
                        };
                        /**
                         * @return {?}
                         */
                        Promise.using = function() {
                            /** @type {number} */
                            var len = arguments.length;
                            if (len < 2) {
                                return apiRejection("you must pass at least 2 arguments to Promise.using");
                            }
                            var fn = arguments[len - 1];
                            if ("function" != typeof fn) {
                                return apiRejection("expecting a function but got " + util.classString(fn));
                            }
                            var args;
                            /** @type {boolean} */
                            var context = true;
                            if (2 === len && Array.isArray(arguments[0])) {
                                args = arguments[0];
                                len = args.length;
                                /** @type {boolean} */
                                context = false;
                            } else {
                                /** @type {!Arguments} */
                                args = arguments;
                                len--;
                            }
                            var resources = new ResourceList(len);
                            /** @type {number} */
                            var i = 0;
                            for (; i < len; ++i) {
                                var resource = args[i];
                                if (Disposer.isDisposer(resource)) {
                                    var disposer = resource;
                                    resource = resource.promise();
                                    resource._setDisposable(disposer);
                                } else {
                                    var maybePromise = tryConvertToPromise(resource);
                                    if (maybePromise instanceof Promise) {
                                        resource = maybePromise._then(maybeUnwrapDisposer, null, null, {
                                            resources : resources,
                                            index : i
                                        }, void 0);
                                    }
                                }
                                resources[i] = resource;
                            }
                            /** @type {!Array} */
                            var p = new Array(resources.length);
                            /** @type {number} */
                            i = 0;
                            for (; i < p.length; ++i) {
                                p[i] = Promise.resolve(resources[i]).reflect();
                            }
                            var resultPromise = Promise.all(p).then(function(arr) {
                                /** @type {number} */
                                var i = 0;
                                for (; i < arr.length; ++i) {
                                    var ret = arr[i];
                                    if (ret.isRejected()) {
                                        return errorObj.e = ret.error(), errorObj;
                                    }
                                    if (!ret.isFulfilled()) {
                                        return void resultPromise.cancel();
                                    }
                                    arr[i] = ret.value();
                                }
                                promise._pushContext();
                                fn = tryCatch(fn);
                                var value = context ? fn.apply(void 0, arr) : fn(arr);
                                var promiseCreated = promise._popContext();
                                return debug.checkForgottenReturns(value, promiseCreated, "Promise.using", promise), value;
                            });
                            var promise = resultPromise.lastly(function() {
                                var inspection = new Promise.PromiseInspection(resultPromise);
                                return dispose(resources, inspection);
                            });
                            return resources.promise = promise, promise._setOnCancel(resources), promise;
                        };
                        /**
                         * @param {!Object} disposer
                         * @return {undefined}
                         */
                        Promise.prototype._setDisposable = function(disposer) {
                            /** @type {number} */
                            this._bitField = 131072 | this._bitField;
                            /** @type {!Object} */
                            this._disposer = disposer;
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype._isDisposable = function() {
                            return (131072 & this._bitField) > 0;
                        };
                        /**
                         * @return {?}
                         */
                        Promise.prototype._getDisposer = function() {
                            return this._disposer;
                        };
                        /**
                         * @return {undefined}
                         */
                        Promise.prototype._unsetDisposable = function() {
                            /** @type {number} */
                            this._bitField = -131073 & this._bitField;
                            this._disposer = void 0;
                        };
                        /**
                         * @param {string} fn
                         * @return {?}
                         */
                        Promise.prototype.disposer = function(fn) {
                            if ("function" == typeof fn) {
                                return new FunctionDisposer(fn, this, createContext());
                            }
                            throw new TypeError;
                        };
                    };
                }, {
                    "./errors" : 12,
                    "./util" : 36
                }],
                36 : [function(require, m, i) {
                    /**
                     * @return {?}
                     */
                    function $() {
                        try {
                            var complete = done;
                            return done = null, complete.apply(this, arguments);
                        } catch (reason) {
                            return errorObj.e = reason, errorObj;
                        }
                    }
                    /**
                     * @param {!Function} fn
                     * @return {?}
                     */
                    function tryCatch(fn) {
                        return done = fn, $;
                    }
                    /**
                     * @param {?} val
                     * @return {?}
                     */
                    function isPrimitive(val) {
                        return null == val || true === val || false === val || "string" == typeof val || "number" == typeof val;
                    }
                    /**
                     * @param {!Object} obj
                     * @return {?}
                     */
                    function isObject(obj) {
                        return "function" == typeof obj || "object" == typeof obj && null !== obj;
                    }
                    /**
                     * @param {(Error|string)} maybeError
                     * @return {?}
                     */
                    function maybeWrapAsError(maybeError) {
                        return isPrimitive(maybeError) ? new Error(safeToString(maybeError)) : maybeError;
                    }
                    /**
                     * @param {!Array} target
                     * @param {?} value
                     * @return {?}
                     */
                    function withAppended(target, value) {
                        var k;
                        var width = target.length;
                        /** @type {!Array} */
                        var result = new Array(width + 1);
                        /** @type {number} */
                        k = 0;
                        for (; k < width; ++k) {
                            result[k] = target[k];
                        }
                        return result[k] = value, result;
                    }
                    /**
                     * @param {?} obj
                     * @param {boolean} key
                     * @param {string} defaultValue
                     * @return {?}
                     */
                    function getDataPropertyOrDefault(obj, key, defaultValue) {
                        if (!es5.isES5) {
                            return {}.hasOwnProperty.call(obj, key) ? obj[key] : void 0;
                        }
                        /** @type {(ObjectPropertyDescriptor<?>|undefined)} */
                        var r = Object.getOwnPropertyDescriptor(obj, key);
                        return null != r ? null == r.get && null == r.set ? r.value : defaultValue : void 0;
                    }
                    /**
                     * @param {string} obj
                     * @param {string} name
                     * @param {string} value
                     * @return {?}
                     */
                    function notEnumerableProp(obj, name, value) {
                        if (isPrimitive(obj)) {
                            return obj;
                        }
                        var descriptor = {
                            value : value,
                            configurable : true,
                            enumerable : false,
                            writable : true
                        };
                        return es5.defineProperty(obj, name, descriptor), obj;
                    }
                    /**
                     * @param {?} errorConstructor
                     * @return {?}
                     */
                    function thrower(errorConstructor) {
                        throw errorConstructor;
                    }
                    /**
                     * @param {string} fn
                     * @return {?}
                     */
                    function isClass(fn) {
                        try {
                            if ("function" == typeof fn) {
                                var expRecords = es5.names(fn.prototype);
                                var canViewMyFiles = es5.isES5 && expRecords.length > 1;
                                /** @type {boolean} */
                                var canViewSiteFiles = expRecords.length > 0 && !(1 === expRecords.length && "constructor" === expRecords[0]);
                                /** @type {boolean} */
                                var canUploadFiles = rnative.test(fn + "") && es5.names(fn).length > 0;
                                if (canViewMyFiles || canViewSiteFiles || canUploadFiles) {
                                    return true;
                                }
                            }
                            return false;
                        } catch (t) {
                            return false;
                        }
                    }
                    /**
                     * @param {!Object} obj
                     * @return {?}
                     */
                    function toFastProperties(obj) {
                        /**
                         * @return {undefined}
                         */
                        function FakeConstructor() {
                        }
                        /**
                         * @return {?}
                         */
                        function f() {
                            return typeof clustererCtorOptions.foo;
                        }
                        /** @type {!Object} */
                        FakeConstructor.prototype = obj;
                        var clustererCtorOptions = new FakeConstructor;
                        return f(), f(), obj;
                    }
                    /**
                     * @param {string} str
                     * @return {?}
                     */
                    function isIdentifier(str) {
                        return partten.test(str);
                    }
                    /**
                     * @param {number} count
                     * @param {number} prefix
                     * @param {?} suffix
                     * @return {?}
                     */
                    function filledRange(count, prefix, suffix) {
                        /** @type {!Array} */
                        var ret = new Array(count);
                        /** @type {number} */
                        var i = 0;
                        for (; i < count; ++i) {
                            ret[i] = prefix + i + suffix;
                        }
                        return ret;
                    }
                    /**
                     * @param {(Object|string)} obj
                     * @return {?}
                     */
                    function safeToString(obj) {
                        try {
                            return obj + "";
                        } catch (t) {
                            return "[no string representation]";
                        }
                    }
                    /**
                     * @param {!Object} obj
                     * @return {?}
                     */
                    function isError(obj) {
                        return obj instanceof Error || null !== obj && "object" == typeof obj && "string" == typeof obj.message && "string" == typeof obj.name;
                    }
                    /**
                     * @param {boolean} e
                     * @return {undefined}
                     */
                    function markAsOriginatingFromRejection(e) {
                        try {
                            notEnumerableProp(e, "isOperational", true);
                        } catch (t) {
                        }
                    }
                    /**
                     * @param {?} e
                     * @return {?}
                     */
                    function isOperationalError(e) {
                        return null != e && (e instanceof Error.__BluebirdErrorTypes__.OperationalError || true === e.isOperational);
                    }
                    /**
                     * @param {(Object|string)} obj
                     * @return {?}
                     */
                    function canAttachTrace(obj) {
                        return isError(obj) && es5.propertyIsWritable(obj, "stack");
                    }
                    /**
                     * @param {!Array} obj
                     * @return {?}
                     */
                    function classString(obj) {
                        return {}.toString.call(obj);
                    }
                    /**
                     * @param {?} from
                     * @param {!Object} to
                     * @param {!Function} filter
                     * @return {undefined}
                     */
                    function copyDescriptors(from, to, filter) {
                        var privateKeys = es5.names(from);
                        /** @type {number} */
                        var i = 0;
                        for (; i < privateKeys.length; ++i) {
                            var key = privateKeys[i];
                            if (filter(key)) {
                                try {
                                    es5.defineProperty(to, key, es5.getDescriptor(from, key));
                                } catch (t) {
                                }
                            }
                        }
                    }
                    /**
                     * @param {string} key
                     * @return {?}
                     */
                    function env(key) {
                        return pallette ? options.env[key] : void 0;
                    }
                    /**
                     * @return {?}
                     */
                    function generate() {
                        if ("function" == typeof Promise) {
                            try {
                                /** @type {!Promise} */
                                var separateCaches = new Promise(function() {
                                });
                                if ("[object Promise]" === {}.toString.call(separateCaches)) {
                                    return Promise;
                                }
                            } catch (t) {
                            }
                        }
                    }
                    /**
                     * @param {!Object} array
                     * @param {string} cb
                     * @return {?}
                     */
                    function cbCommon(array, cb) {
                        return array.bind(cb);
                    }
                    var es5 = require("./es5");
                    /** @type {boolean} */
                    var canEvaluate = "undefined" == typeof navigator;
                    var errorObj = {
                        e : {}
                    };
                    var done;
                    var globals = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== global ? global : void 0 !== this ? this : null;
                    /**
                     * @param {!Function} Child
                     * @param {!Function} Parent
                     * @return {?}
                     */
                    var inherits = function(Child, Parent) {
                        /**
                         * @return {undefined}
                         */
                        function T() {
                            /** @type {!Function} */
                            this.constructor = Child;
                            /** @type {!Function} */
                            this.constructor$ = Parent;
                            var propertyName;
                            for (propertyName in Parent.prototype) {
                                if (hasProp.call(Parent.prototype, propertyName) && "$" !== propertyName.charAt(propertyName.length - 1)) {
                                    this[propertyName + "$"] = Parent.prototype[propertyName];
                                }
                            }
                        }
                        /** @type {function(this:Object, *): boolean} */
                        var hasProp = {}.hasOwnProperty;
                        return T.prototype = Parent.prototype, Child.prototype = new T, Child.prototype;
                    };
                    var inheritedDataKeys = function() {
                        /** @type {!Array} */
                        var d = [Array.prototype, Object.prototype, Function.prototype];
                        /**
                         * @param {?} a
                         * @return {?}
                         */
                        var e = function(a) {
                            /** @type {number} */
                            var i = 0;
                            for (; i < d.length; ++i) {
                                if (d[i] === a) {
                                    return true;
                                }
                            }
                            return false;
                        };
                        if (es5.isES5) {
                            /** @type {function(!Object): !Array<string>} */
                            var getKeys = Object.getOwnPropertyNames;
                            return function(obj) {
                                /** @type {!Array} */
                                var folderPathClone = [];
                                /** @type {!Object} */
                                var closedFrames = Object.create(null);
                                for (; null != obj && !e(obj);) {
                                    var keys;
                                    try {
                                        /** @type {!Array<string>} */
                                        keys = getKeys(obj);
                                    } catch (t) {
                                        return folderPathClone;
                                    }
                                    /** @type {number} */
                                    var i = 0;
                                    for (; i < keys.length; ++i) {
                                        /** @type {string} */
                                        var key = keys[i];
                                        if (!closedFrames[key]) {
                                            /** @type {boolean} */
                                            closedFrames[key] = true;
                                            /** @type {(ObjectPropertyDescriptor<?>|undefined)} */
                                            var c = Object.getOwnPropertyDescriptor(obj, key);
                                            if (null != c && null == c.get && null == c.set) {
                                                folderPathClone.push(key);
                                            }
                                        }
                                    }
                                    obj = es5.getPrototypeOf(obj);
                                }
                                return folderPathClone;
                            };
                        }
                        /** @type {function(this:Object, *): boolean} */
                        var b = {}.hasOwnProperty;
                        return function(url) {
                            if (e(url)) {
                                return [];
                            }
                            /** @type {!Array} */
                            var delete_units = [];
                            var u;
                            t: for (u in url) {
                                if (b.call(url, u)) {
                                    delete_units.push(u);
                                } else {
                                    /** @type {number} */
                                    var i = 0;
                                    for (; i < d.length; ++i) {
                                        if (b.call(d[i], u)) {
                                            continue t;
                                        }
                                    }
                                    delete_units.push(u);
                                }
                            }
                            return delete_units;
                        };
                    }();
                    /** @type {!RegExp} */
                    var rnative = /this\s*\.\s*\S+\s*=/;
                    /** @type {!RegExp} */
                    var partten = /^[a-z$_][a-z$_0-9]*$/i;
                    var ensureErrorObject = function() {
                        return "stack" in new Error ? function(value) {
                            return canAttachTrace(value) ? value : new Error(safeToString(value));
                        } : function(value) {
                            if (canAttachTrace(value)) {
                                return value;
                            }
                            try {
                                throw new Error(safeToString(value));
                            } catch (t) {
                                return t;
                            }
                        };
                    }();
                    /**
                     * @param {!Object} obj
                     * @return {?}
                     */
                    var asArray = function(obj) {
                        return es5.isArray(obj) ? obj : null;
                    };
                    if ("undefined" != typeof Symbol && Symbol.iterator) {
                        /** @type {function(string): ?} */
                        var isArray = "function" == typeof Array.from ? function(target) {
                            return Array.from(target);
                        } : function(newValues) {
                            var _s;
                            /** @type {!Array} */
                            var _arr = [];
                            var deletedChar = newValues[Symbol.iterator]();
                            for (; !(_s = deletedChar.next()).done;) {
                                _arr.push(_s.value);
                            }
                            return _arr;
                        };
                        /**
                         * @param {string} obj
                         * @return {?}
                         */
                        asArray = function(obj) {
                            return es5.isArray(obj) ? obj : null != obj && "function" == typeof obj[Symbol.iterator] ? isArray(obj) : null;
                        };
                    }
                    /** @type {boolean} */
                    var isNode = void 0 !== options && "[object process]" === classString(options).toLowerCase();
                    /** @type {boolean} */
                    var pallette = void 0 !== options && void 0 !== options.env;
                    var ret = {
                        isClass : isClass,
                        isIdentifier : isIdentifier,
                        inheritedDataKeys : inheritedDataKeys,
                        getDataPropertyOrDefault : getDataPropertyOrDefault,
                        thrower : thrower,
                        isArray : es5.isArray,
                        asArray : asArray,
                        notEnumerableProp : notEnumerableProp,
                        isPrimitive : isPrimitive,
                        isObject : isObject,
                        isError : isError,
                        canEvaluate : canEvaluate,
                        errorObj : errorObj,
                        tryCatch : tryCatch,
                        inherits : inherits,
                        withAppended : withAppended,
                        maybeWrapAsError : maybeWrapAsError,
                        toFastProperties : toFastProperties,
                        filledRange : filledRange,
                        toString : safeToString,
                        canAttachTrace : canAttachTrace,
                        ensureErrorObject : ensureErrorObject,
                        originatesFromRejection : isOperationalError,
                        markAsOriginatingFromRejection : markAsOriginatingFromRejection,
                        classString : classString,
                        copyDescriptors : copyDescriptors,
                        hasDevTools : "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes,
                        isNode : isNode,
                        hasEnvVariables : pallette,
                        env : env,
                        global : globals,
                        getNativePromise : generate,
                        domainBind : cbCommon
                    };
                    ret.isRecentNode = ret.isNode && function() {
                        var cache;
                        return options.versions && options.versions.node ? cache = options.versions.node.split(".").map(Number) : options.version && (cache = options.version.split(".").map(Number)), 0 === cache[0] && cache[1] > 10 || cache[0] > 0;
                    }();
                    if (ret.isNode) {
                        ret.toFastProperties(options);
                    }
                    try {
                        throw new Error;
                    } catch (e) {
                        ret.lastLineError = e;
                    }
                    m.exports = ret;
                }, {
                    "./es5" : 13
                }]
            }, {}, [4])(4);
        });
        if ("undefined" != typeof window && null !== window) {
            window.P = window.Promise;
        } else {
            if ("undefined" != typeof self && null !== self) {
                self.P = self.Promise;
            }
        }
    }).call(e, __webpack_require__(7), __webpack_require__(3), __webpack_require__(19).setImmediate);
}, function(mixin, canCreateDiscussions) {
    /**
     * @return {?}
     */
    function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
    }
    /**
     * @return {?}
     */
    function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
    }
    /**
     * @param {!Function} fun
     * @return {?}
     */
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            return cachedSetTimeout = setTimeout, setTimeout(fun, 0);
        }
        try {
            return cachedSetTimeout(fun, 0);
        } catch (e) {
            try {
                return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    }
    /**
     * @param {?} marker
     * @return {?}
     */
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker);
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            return cachedClearTimeout = clearTimeout, clearTimeout(marker);
        }
        try {
            return cachedClearTimeout(marker);
        } catch (e) {
            try {
                return cachedClearTimeout.call(null, marker);
            } catch (e) {
                return cachedClearTimeout.call(this, marker);
            }
        }
    }
    /**
     * @return {undefined}
     */
    function cleanUpNextTick() {
        if (m && currentQueue) {
            /** @type {boolean} */
            m = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                /** @type {number} */
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }
    }
    /**
     * @return {undefined}
     */
    function drainQueue() {
        if (!m) {
            var timeout = runTimeout(cleanUpNextTick);
            /** @type {boolean} */
            m = true;
            var len = queue.length;
            for (; len;) {
                currentQueue = queue;
                /** @type {!Array} */
                queue = [];
                for (; ++queueIndex < len;) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                /** @type {number} */
                queueIndex = -1;
                /** @type {number} */
                len = queue.length;
            }
            /** @type {null} */
            currentQueue = null;
            /** @type {boolean} */
            m = false;
            runClearTimeout(timeout);
        }
    }
    /**
     * @param {(Object|string)} fun
     * @param {!Array} array
     * @return {undefined}
     */
    function Item(fun, array) {
        /** @type {(Object|string)} */
        this.fun = fun;
        /** @type {!Array} */
        this.array = array;
    }
    /**
     * @return {undefined}
     */
    function noop() {
    }
    var cachedSetTimeout;
    var cachedClearTimeout;
    var process = mixin.exports = {};
    !function() {
        try {
            /** @type {!Function} */
            cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
        } catch (t) {
            /** @type {function(): ?} */
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            /** @type {!Function} */
            cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
        } catch (t) {
            /** @type {function(): ?} */
            cachedClearTimeout = defaultClearTimeout;
        }
    }();
    var currentQueue;
    /** @type {!Array} */
    var queue = [];
    /** @type {boolean} */
    var m = false;
    /** @type {number} */
    var queueIndex = -1;
    /**
     * @param {!Function} fun
     * @return {undefined}
     */
    process.nextTick = function(fun) {
        /** @type {!Array} */
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            /** @type {number} */
            var i = 1;
            for (; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (!(1 !== queue.length || m)) {
            runTimeout(drainQueue);
        }
    };
    /**
     * @return {undefined}
     */
    Item.prototype.run = function() {
        this.fun.apply(null, this.array);
    };
    /** @type {string} */
    process.title = "browser";
    /** @type {boolean} */
    process.browser = true;
    process.env = {};
    /** @type {!Array} */
    process.argv = [];
    /** @type {string} */
    process.version = "";
    process.versions = {};
    /** @type {function(): undefined} */
    process.on = noop;
    /** @type {function(): undefined} */
    process.addListener = noop;
    /** @type {function(): undefined} */
    process.once = noop;
    /** @type {function(): undefined} */
    process.off = noop;
    /** @type {function(): undefined} */
    process.removeListener = noop;
    /** @type {function(): undefined} */
    process.removeAllListeners = noop;
    /** @type {function(): undefined} */
    process.emit = noop;
    /** @type {function(): undefined} */
    process.prependListener = noop;
    /** @type {function(): undefined} */
    process.prependOnceListener = noop;
    /**
     * @param {?} type
     * @return {?}
     */
    process.listeners = function(type) {
        return [];
    };
    /**
     * @param {?} name
     * @return {?}
     */
    process.binding = function(name) {
        throw new Error("process.binding is not supported");
    };
    /**
     * @return {?}
     */
    process.cwd = function() {
        return "/";
    };
    /**
     * @param {?} dir
     * @return {?}
     */
    process.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
    };
    /**
     * @return {?}
     */
    process.umask = function() {
        return 0;
    };
}, function(mixin, canCreateDiscussions) {
    /**
     * @param {!Object} module
     * @return {?}
     */
    mixin.exports = function(module) {
        return module.webpackPolyfill || (module.deprecate = function() {
        }, module.paths = [], module.children || (module.children = []), Object.defineProperty(module, "loaded", {
            enumerable : true,
            get : function() {
                return module.l;
            }
        }), Object.defineProperty(module, "id", {
            enumerable : true,
            get : function() {
                return module.i;
            }
        }), module.webpackPolyfill = 1), module;
    };
}, function(module, canCreateDiscussions) {
    /**
     * @param {string} size
     * @return {undefined}
     */
    var MTLLoader = function(size) {
        this.manager = void 0 !== size ? size : THREE.DefaultLoadingManager;
        /** @type {string} */
        this.texturePath = "";
    };
    Object.assign(MTLLoader.prototype, {
        load : function(f, e, result, url) {
            if ("" === this.texturePath) {
                this.texturePath = f.substring(0, f.lastIndexOf("/") + 1);
            }
            var scope = this;
            (new THREE.XHRLoader(scope.manager)).load(f, function(response) {
                /** @type {*} */
                var value = JSON.parse(response);
                scope.parse(value, e);
            }, result, url);
        },
        setTexturePath : function(value) {
            /** @type {string} */
            this.texturePath = value;
        },
        setCrossOrigin : function(value) {
            /** @type {!Object} */
            this.crossOrigin = value;
        },
        parse : function(json, fn) {
            var geometries;
            geometries = json.binary ? this.parseBinaryGeometries(json.geometries) : this.parseGeometries(json.geometries);
            var images = this.parseImages(json.images, function() {
                if (void 0 !== fn) {
                    fn(object, json);
                }
            });
            var textures = this.parseTextures(json.textures, images);
            var materials = this.parseMaterials(json.materials, textures);
            var object = this.parseObject(json.object, geometries, materials);
            return json.animations && (object.animations = this.parseAnimations(json.animations)), json.cameras && (object.cameras = this.parseCameras(object, json.cameras)), void 0 !== json.images && 0 !== json.images.length || void 0 !== fn && fn(object, json), object;
        },
        parseCameras : function(object, options) {
            /** @type {!Array} */
            var onSelectionCalls = [];
            /** @type {number} */
            var index = 0;
            for (; index < options.length; index++) {
                var e = object.getObjectByProperty("uuid", options[index]);
                if (e) {
                    onSelectionCalls.push(e);
                }
            }
            return onSelectionCalls;
        },
        parseGeometries : function(json) {
            var geometries = {};
            if (void 0 !== json) {
                var geometryLoader = new THREE.JSONLoader;
                var primParser = new THREE.BufferGeometryLoader;
                /** @type {number} */
                var i = 0;
                var jsonLength = json.length;
                for (; i < jsonLength; i++) {
                    var geometry;
                    var data = json[i];
                    switch(data.type) {
                        case "PlaneGeometry":
                        case "PlaneBufferGeometry":
                            geometry = new THREE[data.type](data.width, data.height, data.widthSegments, data.heightSegments);
                            break;
                        case "BoxGeometry":
                        case "BoxBufferGeometry":
                        case "CubeGeometry":
                            geometry = new THREE[data.type](data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments);
                            break;
                        case "CircleGeometry":
                        case "CircleBufferGeometry":
                            geometry = new THREE[data.type](data.radius, data.segments, data.thetaStart, data.thetaLength);
                            break;
                        case "CylinderGeometry":
                        case "CylinderBufferGeometry":
                            geometry = new THREE[data.type](data.radiusTop, data.radiusBottom, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength);
                            break;
                        case "ConeGeometry":
                        case "ConeBufferGeometry":
                            geometry = new THREE[data.type](data.radius, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength);
                            break;
                        case "SphereGeometry":
                        case "SphereBufferGeometry":
                            geometry = new THREE[data.type](data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength);
                            break;
                        case "DodecahedronGeometry":
                        case "IcosahedronGeometry":
                        case "OctahedronGeometry":
                        case "TetrahedronGeometry":
                            geometry = new THREE[data.type](data.radius, data.detail);
                            break;
                        case "RingGeometry":
                        case "RingBufferGeometry":
                            geometry = new THREE[data.type](data.innerRadius, data.outerRadius, data.thetaSegments, data.phiSegments, data.thetaStart, data.thetaLength);
                            break;
                        case "TorusGeometry":
                        case "TorusBufferGeometry":
                            geometry = new THREE[data.type](data.radius, data.tube, data.radialSegments, data.tubularSegments, data.arc);
                            break;
                        case "TorusKnotGeometry":
                        case "TorusKnotBufferGeometry":
                            geometry = new THREE[data.type](data.radius, data.tube, data.tubularSegments, data.radialSegments, data.p, data.q);
                            break;
                        case "LatheGeometry":
                        case "LatheBufferGeometry":
                            geometry = new THREE[data.type](data.points, data.segments, data.phiStart, data.phiLength);
                            break;
                        case "BufferGeometry":
                            geometry = primParser.parse(data);
                            break;
                        case "Geometry":
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
        setBinaryGeometryBuffer : function(addedRenderer) {
            /** @type {!Object} */
            this.geometryBuffer = addedRenderer;
        },
        parseBinaryGeometries : function(result) {
            var geometries = {};
            if (void 0 !== result) {
                /** @type {number} */
                var i = (new THREE.BufferGeometryLoader, 0);
                var length = result.length;
                for (; i < length; i++) {
                    var geometry = new THREE.BufferGeometry;
                    var data = result[i];
                    var key;
                    for (key in data.offsets) {
                        if (data.offsets.hasOwnProperty(key)) {
                            var tex = data.offsets[key];
                            var c = tex[0];
                            var pivot = tex[1] + 1;
                            var len = this.geometryBuffer.slice(c, pivot);
                            if ("index" === key) {
                                /** @type {!Uint32Array} */
                                var indices = new Uint32Array(len);
                                geometry.setIndex(new THREE.BufferAttribute(indices, 1));
                            } else {
                                var size;
                                /** @type {!Float32Array} */
                                indices = new Float32Array(len);
                                if ("uv" === key || "uv2" === key) {
                                    /** @type {number} */
                                    size = 2;
                                } else {
                                    if ("position" === key || "normal" === key || "color" === key) {
                                        /** @type {number} */
                                        size = 3;
                                    } else {
                                        if ("tangent" === key) {
                                            /** @type {number} */
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
        parseMaterials : function(json, textures) {
            var materials = {};
            if (void 0 !== json) {
                var loader = new THREE.MaterialLoader;
                loader.setTextures(textures);
                /** @type {number} */
                var i = 0;
                var jsonLength = json.length;
                for (; i < jsonLength; i++) {
                    var material = loader.parse(json[i]);
                    materials[material.uuid] = material;
                }
            }
            return materials;
        },
        parseAnimations : function(json) {
            /** @type {!Array} */
            var t_chksum = [];
            /** @type {number} */
            var i = 0;
            for (; i < json.length; i++) {
                var r = THREE.AnimationClip.parse(json[i]);
                t_chksum.push(r);
            }
            return t_chksum;
        },
        parseImages : function(json, onLoad) {
            var scope = this;
            var images = {};
            if (void 0 !== json && json.length > 0) {
                var manager = new THREE.LoadingManager(onLoad);
                var loader = new THREE.ImageLoader(manager);
                loader.setCrossOrigin(this.crossOrigin);
                /** @type {number} */
                var i = 0;
                var jsonLength = json.length;
                for (; i < jsonLength; i++) {
                    var image = json[i];
                    var url = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(image.url) ? image.url : scope.texturePath + image.url;
                    images[image.uuid] = function(url) {
                        return scope.manager.itemStart(url), loader.load(url, function() {
                            scope.manager.itemEnd(url);
                        });
                    }(url);
                }
            }
            return images;
        },
        parseTextures : function(json, images) {
            /**
             * @param {(Object|string)} value
             * @return {?}
             */
            function parseConstant(value) {
                return "number" == typeof value ? value : (console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", value), THREE[value]);
            }
            var textures = {};
            if (void 0 !== json) {
                /** @type {number} */
                var i = 0;
                var jsonLength = json.length;
                for (; i < jsonLength; i++) {
                    var texture;
                    var data = json[i];
                    if (data.images) {
                        /** @type {!Array} */
                        var c = [];
                        /** @type {number} */
                        var i = 0;
                        var l = data.images.length;
                        for (; i < l; i++) {
                            if (void 0 === images[data.images[i]]) {
                                console.warn("THREE.ObjectLoader: Undefined image", data.images[i]);
                            }
                            c.push(images[data.images[i]]);
                        }
                        texture = new THREE.CubeTexture(c);
                    } else {
                        if (void 0 === data.image) {
                            console.warn('THREE.ObjectLoader: No "image" specified for', data.uuid);
                        }
                        if (void 0 === images[data.image]) {
                            console.warn("THREE.ObjectLoader: Undefined image", data.image);
                        }
                        texture = new THREE.Texture(images[data.image]);
                    }
                    /** @type {boolean} */
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
        parseObject : function() {
            var matrix = new THREE.Matrix4;
            return function(data, geometries, materials) {
                /**
                 * @param {undefined} name
                 * @return {?}
                 */
                function getGeometry(name) {
                    return void 0 === geometries[name] && console.warn("THREE.ObjectLoader: Undefined geometry", name), geometries[name];
                }
                /**
                 * @param {?} name
                 * @return {?}
                 */
                function getMaterial(name) {
                    if (void 0 !== name) {
                        return void 0 === materials[name] && console.warn("THREE.ObjectLoader: Undefined material", name), materials[name];
                    }
                }
                var object;
                switch(data.type) {
                    case "Scene":
                        object = new THREE.Scene;
                        break;
                    case "PerspectiveCamera":
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
                            /** @type {!Object} */
                            object.view = Object.assign({}, data.view);
                        }
                        break;
                    case "OrthographicCamera":
                        object = new THREE.OrthographicCamera(data.left, data.right, data.top, data.bottom, data.near, data.far);
                        break;
                    case "AmbientLight":
                        object = new THREE.AmbientLight(data.color, data.intensity);
                        break;
                    case "DirectionalLight":
                        object = new THREE.DirectionalLight(data.color, data.intensity);
                        break;
                    case "PointLight":
                        object = new THREE.PointLight(data.color, data.intensity, data.distance, data.decay);
                        break;
                    case "SpotLight":
                        object = new THREE.SpotLight(data.color, data.intensity, data.distance, data.angle, data.penumbra, data.decay);
                        break;
                    case "HemisphereLight":
                        object = new THREE.HemisphereLight(data.color, data.groundColor, data.intensity);
                        break;
                    case "Mesh":
                        var geometry = getGeometry(data.geometry);
                        var material = getMaterial(data.material);
                        object = geometry.bones && geometry.bones.length > 0 ? new THREE.SkinnedMesh(geometry, material) : new THREE.Mesh(geometry, material);
                        break;
                    case "LOD":
                        object = new THREE.LOD;
                        break;
                    case "Line":
                        object = new THREE.Line(getGeometry(data.geometry), getMaterial(data.material), data.mode);
                        break;
                    case "LineSegments":
                        object = new THREE.LineSegments(getGeometry(data.geometry), getMaterial(data.material));
                        break;
                    case "PointCloud":
                    case "Points":
                        object = new THREE.Points(getGeometry(data.geometry), getMaterial(data.material));
                        break;
                    case "Sprite":
                        object = new THREE.Sprite(getMaterial(data.material));
                        break;
                    case "Group":
                        object = new THREE.Group;
                        break;
                    default:
                        object = new THREE.Object3D;
                }
                if (object.uuid = data.uuid, void 0 !== data.name && (object.name = data.name), void 0 !== data.matrix ? (matrix.fromArray(data.matrix), matrix.decompose(object.position, object.quaternion, object.scale)) : (void 0 !== data.position && object.position.fromArray(data.position), void 0 !== data.rotation && object.rotation.fromArray(data.rotation), void 0 !== data.scale && object.scale.fromArray(data.scale)), void 0 !== data.castShadow && (object.castShadow = data.castShadow), void 0 !== data.receiveShadow &&
                (object.receiveShadow = data.receiveShadow), void 0 !== data.visible && (object.visible = data.visible), void 0 !== data.userData && (object.userData = data.userData), void 0 !== data.children) {
                    var child;
                    for (child in data.children) {
                        object.add(this.parseObject(data.children[child], geometries, materials));
                    }
                }
                if ("LOD" === data.type) {
                    var levels = data.levels;
                    /** @type {number} */
                    var i = 0;
                    for (; i < levels.length; i++) {
                        var level = levels[i];
                        child = object.getObjectByProperty("uuid", level.object);
                        if (void 0 !== child) {
                            object.addLevel(child, level.distance);
                        }
                    }
                }
                return void 0 !== data.layers && (object.layers.mask = data.layers), object;
            };
        }()
    });
    /** @type {function(string): undefined} */
    module.exports = MTLLoader;
}, function(context, canCreateDiscussions, $) {
    /**
     * @param {?} value
     * @param {string} defaultValue
     * @return {?}
     */
    function defaultValue(value, defaultValue) {
        return void 0 !== value ? value : defaultValue;
    }
    var obj = $(32);
    var coin = $(0);
    var options = {
        aoFactor : "uAOPBRFactor",
        albedoFactor : "uAlbedoPBRFactor",
        glossFactor : "uGlossinessPBRFactor",
        metalFactor : "uMetalnessPBRFactor",
        opacity : "uOpacityFactor",
        normalMapFactor : "uNormalMapFactor",
        f0Factor : "uSpecularF0Factor",
        albedoMap : "sTextureAlbedoMap",
        normalMap : "sTextureNormalMap",
        normalMap2 : "sTextureNormalMap2",
        aoMap : "sTextureAOMap",
        aoMap2 : "sTextureAOMap2",
        metalGlossMap : "sTextureMetalGlossMap",
        packedMap : "sTexturePackedMap",
        emissiveMap : "sTextureEmissiveMap",
        lightMap : "sTextureLightMap",
        lightMapM : "sTextureLightMapM",
        lightMapDir : "sTextureLightMapDir",
        cubemap : "sSpecularPBR",
        panorama : "sPanoramaPBR",
        sph : "uDiffuseSPH",
        exposure : "uEnvironmentExposure",
        transform : "uEnvironmentTransform",
        occludeSpecular : "uOccludeSpecular",
        alphaTest : "uAlphaTest",
        color : "uColor",
        contrast : "uContrast"
    };
    /**
     * @param {!Function} size
     * @return {undefined}
     */
    var init = function(size) {
        /** @type {!Object} */
        size = Object.assign({
            uniforms : {
                uAOPBRFactor : {
                    type : "f",
                    value : 1
                },
                uAlbedoPBRFactor : {
                    type : "f",
                    value : 1
                },
                uGlossinessPBRFactor : {
                    type : "f",
                    value : 1
                },
                uMetalnessPBRFactor : {
                    type : "f",
                    value : 1
                },
                uNormalMapFactor : {
                    type : "f",
                    value : 1
                },
                uSpecularF0Factor : {
                    type : "f",
                    value : 1
                },
                uEnvironmentExposure : {
                    type : "f",
                    value : 1
                },
                uOpacityFactor : {
                    type : "f",
                    value : 1
                },
                sTextureAlbedoMap : {
                    type : "t",
                    value : null
                },
                sTextureAlbedoMap2 : {
                    type : "t",
                    value : null
                },
                sTextureNormalMap : {
                    type : "t",
                    value : null
                },
                sTextureNormalMap2 : {
                    type : "t",
                    value : null
                },
                sTextureAOMap : {
                    type : "t",
                    value : null
                },
                sTextureAOMap2 : {
                    type : "t",
                    value : null
                },
                sTextureMetalGlossMap : {
                    type : "t",
                    value : null
                },
                sTexturePackedMap : {
                    type : "t",
                    value : null
                },
                sTextureEmissiveMap : {
                    type : "t",
                    value : null
                },
                sTextureLightMap : {
                    type : "t",
                    value : null
                },
                sTextureLightMapM : {
                    type : "t",
                    value : null
                },
                sTextureLightMapDir : {
                    type : "t",
                    value : null
                },
                sSpecularPBR : {
                    type : "t",
                    value : null
                },
                sPanoramaPBR : {
                    type : "t",
                    value : null
                },
                uTextureEnvironmentSpecularPBRLodRange : {
                    type : "v2",
                    value : new THREE.Vector2(10, 5)
                },
                uTextureEnvironmentSpecularPBRTextureSize : {
                    type : "v2",
                    value : new THREE.Vector2
                },
                uDiffuseSPH : {
                    type : "3fv",
                    value : null
                },
                uFlipY : {
                    type : "i",
                    value : 0
                },
                uOccludeSpecular : {
                    type : "i",
                    value : 0
                },
                uOutputLinear : {
                    type : "i",
                    value : 0
                },
                uEnvironmentTransform : {
                    type : "m4",
                    value : new THREE.Matrix4
                },
                uMode : {
                    type : "i",
                    value : 0
                },
                uColor : {
                    type : "c",
                    value : null
                },
                uAlphaTest : {
                    type : "f",
                    value : 0
                },
                uContrast : {
                    type : "f",
                    value : 1.1
                },
                offsetRepeat : {
                    type : "v4",
                    value : new THREE.Vector4(0, 0, 1, 1)
                },
                offsetRepeatDetail : {
                    type : "v4",
                    value : new THREE.Vector4(0, 0, 1, 1)
                },
                viewLightDir : {
                    type : "v3",
                    value : new THREE.Vector3
                },
                lightColor : {
                    type : "c",
                    value : new THREE.Color
                },
                highlights : {
                    type : "i",
                    value : 1
                }
            }
        }, size);
        obj.call(this, size);
        Object.keys(this.uniforms).forEach(function(propertyName) {
            this.onPropertyChange(propertyName, function(initSBC) {
                /** @type {!Object} */
                this.uniforms[propertyName].value = initSBC;
            });
        }, this);
        _.each(options, function(javascriptName, prop) {
            this.onPropertyChange(prop, function(jsonName) {
                this[javascriptName] = jsonName;
            });
        }, this);
        this.extensions = {
            derivatives : true,
            shaderTextureLOD : null !== THREE.Extensions.get("EXT_shader_texture_lod")
        };
        /** @type {boolean} */
        this.pbr = true;
    };
    init.inherit(obj, {
        _clone : function(options) {
            var data = options || new init;
            return obj.prototype.clone.call(this, data), data.name = this.name, data.transparent = this.transparent, _.each(this.uniforms, function(dom, name) {
                var value = dom.type;
                if ("v2" === value || "m4" === value) {
                    data.uniforms[name].value.copy(dom.value);
                } else {
                    data.uniforms[name].value = dom.value;
                }
            }, this), data;
        },
        clone : function() {
            var rvm3 = init.create(this.createOptions);
            return rvm3.uuid = THREE.Math.generateUUID(), rvm3;
        },
        updateEnvironmentTransform : function() {
            var elem = new THREE.Quaternion;
            return function(link) {
                link.getWorldQuaternion(elem).inverse();
                this.uniforms.uEnvironmentTransform.value.makeRotationFromQuaternion(elem);
            };
        }(),
        refreshOffsetRepeat : function() {
            var uvScaleMap;
            if (this.defines.USE_ALBEDOMAP ? uvScaleMap = this.sTextureAlbedoMap : this.defines.USE_NORMALMAP ? uvScaleMap = this.sTextureNormalMap : this.defines.USE_AOMAP && (uvScaleMap = this.sTextureAOMap), void 0 !== uvScaleMap) {
                var offset = uvScaleMap.offset;
                var repeat = uvScaleMap.repeat;
                this.uniforms.offsetRepeat.value.set(offset.x, offset.y, repeat.x, repeat.y);
            }
        },
        refreshOffsetRepeatDetail : function() {
            var uvScaleMap = this.sTextureNormalMap2;
            if (void 0 !== uvScaleMap) {
                var offset = uvScaleMap.offset;
                var repeat = uvScaleMap.repeat;
                this.uniforms.offsetRepeatDetail.value.set(offset.x, offset.y, repeat.x, repeat.y);
            }
        },
        refreshUniforms : function(mmCoreSplitViewBlock) {
            this.updateEnvironmentTransform(mmCoreSplitViewBlock);
        }
    });
    /**
     * @param {!Object} material
     * @return {?}
     */
    init.create = function(material) {
        var options = new init({
            vertexShader : material.vertexShader,
            fragmentShader : material.fragmentShader
        });
        /** @type {!Object} */
        options.createOptions = material;
        options.uuid = material.uuid;
        options.name = material.name;
        options.transparent = defaultValue(material.transparent, false);
        options.polygonOffset = defaultValue(material.polygonOffset, false);
        options.polygonOffsetUnits = defaultValue(material.polygonOffsetUnits, 0);
        options.polygonOffsetFactor = defaultValue(material.polygonOffsetFactor, 0);
        var app;
        var env;
        var none = coin.getTexture("textures/white.png");
        var inside = coin.getTexture("textures/normal.png");
        var color = material.albedoMap || none;
        var val = material.albedoMap2 || none;
        var type = material.normalMap || inside;
        var position = material.normalMap2 || inside;
        var moduleName = material.aoMap || none;
        var subject = material.aoMap2 || none;
        var easing = material.metalGlossMap || none;
        var attr = material.packedMap || none;
        var ext = material.emissiveMap || none;
        var align = material.lightMap || none;
        var style = material.lightMapM || none;
        var g = material.lightMapDir || none;
        var len = coin.getSH(material.environment);
        return options.extensions.shaderTextureLOD ? app = coin.getCubemap(material.environment) : env = coin.getPanorama(material.environment), material.albedoMap && (options.defines.USE_ALBEDOMAP = true), material.albedoMap2 && (options.defines.USE_ALBEDOMAP2 = true), material.normalMap && (options.defines.USE_NORMALMAP = true), material.normalMap2 && (options.defines.USE_NORMALMAP2 = true), material.aoMap && (options.defines.USE_AOMAP = true), material.aoMap2 && (options.defines.USE_AOMAP2 = true),
        material.metalGlossMap && (options.defines.USE_METALGLOSSMAP = true), material.packedMap && (options.defines.USE_PACKEDMAP = true), material.emissiveMap && (options.defines.USE_EMISSIVEMAP = true), material.lightMap && (options.defines.USE_LIGHTMAP = true), material.lightMapDir && (options.defines.USE_LIGHTMAP_DIR = true), options.uAlbedoPBRFactor = defaultValue(material.albedoFactor, 1), options.uNormalMapFactor = defaultValue(material.normalMapFactor, 1), options.uMetalnessPBRFactor = defaultValue(material.metalFactor,
            1), options.uGlossinessPBRFactor = defaultValue(material.glossFactor, 1), options.uAOPBRFactor = defaultValue(material.aoFactor, 1), options.uSpecularF0Factor = defaultValue(material.f0Factor, .5), options.uEnvironmentExposure = defaultValue(material.exposure, 1), options.occludeSpecular = defaultValue(material.occludeSpecular ? 1 : 0, 1), options.uFlipY = defaultValue(material.flipNormals, 0), options.opacity = defaultValue(material.opacity, 1), options.color = (new THREE.Color).setHex(void 0 !==
        material.color ? material.color : 16777215), options.side = defaultValue(material.side, THREE.FrontSide), color.needsUpdate = true, val.needsUpdate = true, type.needsUpdate = true, position.needsUpdate = true, moduleName.needsUpdate = true, subject.needsUpdate = true, easing.needsUpdate = true, attr.needsUpdate = true, ext.needsUpdate = true, align.needsUpdate = true, style.needsUpdate = true, g.needsUpdate = true, app && (app.needsUpdate = true), env && (env.needsUpdate = true), options.sTextureAlbedoMap =
            color, options.sTextureAlbedoMap2 = val, options.sTextureNormalMap = type, options.sTextureNormalMap2 = position, options.sTextureAOMap = moduleName, options.sTextureAOMap2 = subject, options.sTextureMetalGlossMap = easing, options.sTexturePackedMap = attr, options.sTextureEmissiveMap = ext, options.sTextureLightMap = align, options.sTextureLightMapM = style, options.sTextureLightMapDir = g, options.sSpecularPBR = app, options.sPanoramaPBR = env, len && (options.uDiffuseSPH = new Float32Array(len,
            27)), options.uEnvironmentTransform = new THREE.Matrix4, material.alphaTest && (options.alphaTest = material.alphaTest, options.defines.ALPHATEST = true), options.extensions.shaderTextureLOD ? (options.defines.CUBEMAP = true, options.uniforms.uTextureEnvironmentSpecularPBRTextureSize.value.set(256, 256)) : (options.defines.PANORAMA = true, options.uniforms.uTextureEnvironmentSpecularPBRTextureSize.value.set(1024, 1024)), options.refreshOffsetRepeat(), options.refreshOffsetRepeatDetail(), options;
    };
    /** @type {function(!Function): undefined} */
    context.exports = init;
}, function(module, canCreateDiscussions, require) {
    var TimeoutError = require(40);
    var self = {
        _timers : {}
    };
    /**
     * @param {?} timeout
     * @return {?}
     */
    self.createTimer = function(timeout) {
        var i = _.uniqueId("timer_");
        var e = new TimeoutError(timeout);
        return e.id = i, self._timers[i] = e, e;
    };
    /**
     * @param {!Function} dt
     * @param {!Function} n
     * @param {?} o
     * @return {?}
     */
    self.delay = function(dt, n, o) {
        return self.createTimer({
            duration : dt,
            onEnd : function() {
                n.call(o);
                delete self._timers[this.id];
            }
        }).start();
    };
    /**
     * @param {undefined} t
     * @return {undefined}
     */
    self.updateTimers = function(t) {
        _.each(self._timers, function(e) {
            e.update(t);
        });
    };
    /**
     * @return {undefined}
     */
    self.clearTimers = function() {
        _.each(self._timers, function(options) {
            /** @type {null} */
            options.onEnd = null;
        });
        self._timers = {};
    };
    module.exports = self;
}, function(m, canCreateDiscussions) {
    var ret = {
        isLatestAvailable : function() {
            return void 0 !== navigator.getVRDisplays;
        },
        isAvailable : function() {
            return void 0 !== navigator.getVRDisplays || void 0 !== navigator.getVRDevices;
        },
        getMessage : function() {
            var arrTime;
            if (navigator.getVRDisplays ? navigator.getVRDisplays().then(function(inRevIdx) {
                if (0 === inRevIdx.length) {
                    /** @type {string} */
                    arrTime = "WebVR supported, but no VRDisplays found.";
                }
            }) : arrTime = navigator.getVRDevices ? 'Your browser supports WebVR but not the latest version. See <a href="http://webvr.info">webvr.info</a> for more info.' : 'Your browser does not support WebVR. See <a href="http://webvr.info">webvr.info</a> for assistance.', void 0 !== arrTime) {
                /** @type {!UI} */
                var div = document.createElement("div");
                /** @type {string} */
                div.style.position = "absolute";
                /** @type {string} */
                div.style.left = "0";
                /** @type {string} */
                div.style.top = "0";
                /** @type {string} */
                div.style.right = "0";
                /** @type {string} */
                div.style.zIndex = "999";
                /** @type {string} */
                div.align = "center";
                /** @type {!UI} */
                var el = document.createElement("div");
                return el.style.fontFamily = "sans-serif", el.style.fontSize = "16px", el.style.fontStyle = "normal", el.style.lineHeight = "26px", el.style.backgroundColor = "#fff", el.style.color = "#000", el.style.padding = "10px 20px", el.style.margin = "50px", el.style.display = "inline-block", el.innerHTML = arrTime, div.appendChild(el), div;
            }
        },
        getButton : function(effect) {
            /** @type {!UI} */
            var el = document.createElement("button");
            return el.style.position = "absolute", el.style.left = "calc(50% - 50px)", el.style.bottom = "20px", el.style.width = "100px", el.style.border = "0", el.style.padding = "8px", el.style.cursor = "pointer", el.style.backgroundColor = "#000", el.style.color = "#fff", el.style.fontFamily = "sans-serif", el.style.fontSize = "13px", el.style.fontStyle = "normal", el.style.textAlign = "center", el.style.zIndex = "999", el.textContent = "ENTER VR", el.onclick = function() {
                if (effect.isPresenting) {
                    effect.exitPresent();
                } else {
                    effect.requestPresent();
                }
            }, window.addEventListener("vrdisplaypresentchange", function(n) {
                /** @type {string} */
                el.textContent = effect.isPresenting ? "EXIT VR" : "ENTER VR";
            }, false), el;
        }
    };
    m.exports = ret;
}, function(canCreateDiscussions, isSlidingUp, require) {
    /**
     * @return {undefined}
     */
    function toggleCart() {
        me.removeClass("visible");
        setTimeout(function() {
            $el.addClass("visible");
        }, 400);
    }
    /**
     * @param {?} url
     * @param {string} crossOrigin
     * @param {string} deferred
     * @return {?}
     */
    function loadImage(url, crossOrigin, deferred) {
        /** @type {number} */
        var r = ($(window).width() - crossOrigin) / 2;
        /** @type {number} */
        var i = ($(window).height() - deferred) / 2;
        /** @type {string} */
        var link_options = "status=1,width=" + crossOrigin + ",height=" + deferred + ",top=" + i + ",left=" + r;
        return window.open(url, "share", link_options), false;
    }
    /**
     * @return {undefined}
     */
    function open() {
        if (window.isMobile) {
            _.defer(function() {
                /** @type {number} */
                var winh = $hero.outerHeight(true) - footer.height();
                var scroll = $scrollToEl.outerHeight();
                var sub_bottom = window.innerHeight ? window.innerHeight : $(window).height();
                /** @type {number} */
                var footerTransition = sub_bottom - (winh + scroll);
                footer.css("height", footerTransition);
            });
        }
    }
    /**
     * @param {number} flightPhase
     * @return {undefined}
     */
    function init(flightPhase) {
        app = new Apps({
            vr : void 0 !== flightPhase,
            vrDisplay : flightPhase,
            preserveDrawingBuffer : void 0 !== flightPhase,
            maxPixelRatio : 1.5,
            fps : false,
            logCalls : false
        });
        app.renderer.setClearColor(16777215);
        initialize();
    }
    /**
     * @param {string} name
     * @return {?}
     */
    function render(name) {
        return scope.texturePath = id + name + "/", self.loadScene(name, id + "scenes/", app, message);
    }
    /**
     * @return {undefined}
     */
    function initialize() {
        searchContactPanel.show();
        open();
        var options = {
            geometries : [a, b, i],
            sh : ["room", "studio"],
            textures : ["textures/white.png", "textures/normal.png", "textures/waternormals.jpg", "textures/marker.png", "textures/circle.png", "textures/corner-gradient.png", "textures/flare.png"]
        };
        if (THREE.Extensions.get("EXT_shader_texture_lod")) {
            /** @type {!Array} */
            options.cubemaps = ["room/cubemap.bin"];
        } else {
            /** @type {!Array} */
            options.panoramas = ["room/panorama.bin"];
        }
        /** @type {string} */
        scope.environmentPath = id + "environments";
        /** @type {string} */
        scope.geometryPath = id + "scenes/data/";
        (new Animation(options)).load().then(function(canCreateDiscussions) {
            render(i).then(function() {
                render(b).then(function() {
                    render(a).then(function() {
                        app.init();
                        _.defer(function() {
                            $menuContainer.show();
                            searchContactPanel.hide();
                        });
                        if (pattern.AUTOSTART && !VRenabled) {
                            /** @type {boolean} */
                            N = true;
                            start();
                            $el.addClass("visible");
                        }
                    });
                });
            });
        });
    }
    /**
     * @return {undefined}
     */
    function start() {
        if (B) {
            app.enterVR();
        }
        app.start();
        browser_message.hide();
        forms.addClass("started");
        $allPanels.addClass("state-about in-app");
        me.removeClass("hidden");
        if (!window.isMobile) {
            me.show();
        }
        $(window).trigger("resize");
        $el.addClass("visible");
        setTimeout(function() {
            gitHtml.remove();
        }, 200);
    }
    require(14);
    require(15);
    var app;
    var pattern = require(5);
    var Animation = require(18);
    var scope = require(0);
    var self = require(30);
    var Apps = require(38);
    var gmUtils = require(12);
    var message = require(76);
    /** @type {string} */
    var a = "interior2";
    /** @type {string} */
    var b = "exterior2";
    /** @type {string} */
    var i = "start";
    /** @type {string} */
    var id = window.isMobile ? "assets_mobile/" : "assets/";
    var $navContainer = $('[data-ref="sharing"]');
    var $allPanels = $('[data-ref="panel_container"]');
    var $doc = $('[data-ref="about_link"]');
    var $openPanel = $('[data-ref="close_about"]');
    var me = $('[data-ref="panel"]');
    var browser_message = $('[data-ref="border"]');
    var searchContactPanel = $('[data-ref="progress"]');
    var $menuContainer = $('[data-ref="start"]');
    var forms = $(".loading");
    var gitHtml = $(".loading .background");
    var subtitles_selector = $(".percentage");
    var jQHeader = $(".warning");
    var $el = $('[data-ref="about_button"]');
    var $hero = $('[data-ref="titlescreen_main"]');
    var footer = $('[data-ref="titlescreen_illustration"]');
    var $scrollToEl = $('[data-ref="titlescreen_footer"]');
    /** @type {boolean} */
    var N = false;
    /** @type {boolean} */
    var B = false;
    /**
     * @param {?} status
     * @param {?} e
     * @param {?} i
     * @return {undefined}
     */
    scope.manager.onProgress = function(status, e, i) {
        subtitles_selector.html(Math.round(e / pattern.ASSET_COUNT * 100));
        open();
    };
    window.VRenabled = gmUtils.isAvailable();
    var U = gmUtils.isLatestAvailable();
    if (VRenabled) {
        if (!U) {
            jQHeader.html("<img src='img/missing-headset.png'>Your version of WebVR is out of date. <a href='http://webvr.info'>Fix this</a>");
        }
    } else {
        jQHeader.html("<img src='img/missing-headset.png'>You browser does not support WebVR. <br/>Falling back to non-VR mode.");
    }
    if (VRenabled && navigator.getVRDisplays) {
        navigator.getVRDisplays().then(function(props) {
            if (props.length > 0) {
                init(props[0]);
                /** @type {boolean} */
                B = true;
            } else {
                console.error("No VR display");
                jQHeader.html("<img src='img/missing-headset.png'>Your browser supports WebVR, but we couldn'boot find your headset. Falling back to non-VR mode.");
                init();
            }
        }.bind(this)).catch(function() {
            console.error("No VR display");
        });
    } else {
        init();
    }
    $("document").ready(function() {
        open();
        if (window.isMobile) {
            $("body").addClass("mobile");
        }
        $navContainer.on("tap", function() {
            loadImage($(this).data("href"), $(this).data("width"), $(this).data("height"));
        });
        $doc.on("tap", function() {
            $allPanels.addClass("state-about");
        });
        $openPanel.on("tap", function() {
            if (N) {
                toggleCart();
            } else {
                $allPanels.removeClass("state-about");
            }
        });
        $menuContainer.on("tap", function() {
            if (!N) {
                /** @type {boolean} */
                N = true;
                if (VRenabled || window.isMobile) {
                    me.hide();
                    start();
                } else {
                    me.addClass("hidden");
                    setTimeout(function() {
                        me.hide();
                        browser_message.addClass("hidden");
                        setTimeout(function() {
                            start();
                        }, 400);
                    }, 700);
                }
            }
        });
        $el.on("tap", function(canCreateDiscussions) {
            $el.removeClass("visible");
            me.addClass("visible");
        });
        app.on("closeAbout", function() {
            toggleCart();
        });
        me.on("mouseenter", function() {
            $("body").removeClass("hovering");
        });
        $(window).on("resize", open);
    });
}, function(canCreateDiscussions, isSlidingUp) {
}, function(canCreateDiscussions, isSlidingUp, fn) {
    fn(16);
    window._ = fn(17);
    /**
     * @param {number} minIn
     * @param {number} maxIn
     * @return {?}
     * @this {!Number}
     */
    Number.prototype.lerp = function(minIn, maxIn) {
        return this + (minIn - this) * maxIn;
    };
    if (!String.prototype.endsWith) {
        /**
         * @param {string} prefix
         * @param {number=} i
         * @return {boolean}
         * @this {!String}
         */
        String.prototype.endsWith = function(prefix, i) {
            /** @type {string} */
            var result = this.toString();
            if ("number" != typeof i || !isFinite(i) || Math.floor(i) !== i || i > result.length) {
                /** @type {number} */
                i = result.length;
            }
            /** @type {number} */
            i = i - prefix.length;
            /** @type {number} */
            var src = result.indexOf(prefix, i);
            return -1 !== src && src === i;
        };
    }
    /**
     * @param {!Function} parent
     * @param {?} obj
     * @return {undefined}
     */
    Function.prototype.inherit = function(parent, obj) {
        if (!parent || !_.isFunction(parent)) {
            throw "parent argument must be a function";
        }
        this.prototype = _.extend(Object.create(parent.prototype), obj);
    };
    /**
     * @param {!Function} obj
     * @return {undefined}
     */
    Function.prototype.mixin = function(obj) {
        _.each(obj, function(fn, methodName) {
            if (void 0 === this.prototype[methodName]) {
                /** @type {!Function} */
                this.prototype[methodName] = fn;
            }
        }, this);
    };
    /** @type {number} */
    window.WIDTH = window.innerWidth;
    /** @type {number} */
    window.HEIGHT = window.innerHeight;
    /** @type {number} */
    window.mouseX = 0;
    /** @type {number} */
    window.mouseY = 0;
    /** @type {boolean} */
    window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    /** @type {boolean} */
    window.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}, function(mixin, canCreateDiscussions) {
    if (void 0 === Date.now) {
        /**
         * @return {number}
         */
        Date.now = function() {
            return (new Date).valueOf();
        };
    }
    window.TWEEN = function() {
        /** @type {!Array} */
        var cache = [];
        /** @type {!Array} */
        var e = [];
        /** @type {!Array} */
        var arrUrls = [];
        return {
            REVISION : "14",
            getAll : function() {
                return cache;
            },
            removeAll : function() {
                /** @type {!Array} */
                cache = [];
            },
            add : function(value) {
                e.push(value);
            },
            remove : function(url) {
                arrUrls.push(url);
            },
            update : function(value) {
                /** @type {number} */
                var i = 0;
                value = void 0 !== value ? value : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now();
                for (; i < cache.length;) {
                    if (cache[i].update(value)) {
                        i++;
                    } else {
                        cache.splice(i, 1);
                    }
                }
                return arrUrls.length > 0 && (arrUrls.forEach(function(elem) {
                    var size = cache.indexOf(elem);
                    if (-1 !== size) {
                        cache.splice(size, 1);
                    }
                }), arrUrls = []), e.length > 0 && (e.forEach(function(e) {
                    cache.push(e);
                }), e = []), true;
            }
        };
    }();
    /**
     * @param {number} value
     * @return {undefined}
     */
    TWEEN.Tween = function(value) {
        var a;
        var percentage;
        var a1;
        var vertices;
        var nonDuplicateIds;
        var extent;
        var autoReview;
        var modeswitches;
        var u;
        var l;
        var abs;
        var min;
        var ease;
        var type;
        var color;
        var List;
        var g;
        var b;
        var constraint;
        var now;
        /**
         * @param {number} value
         * @return {?}
         */
        this.reset = function(value) {
            return a = value, percentage = 0, a1 = {}, vertices = {}, nonDuplicateIds = {}, extent = 1E3, autoReview = 0, modeswitches = false, u = false, l = false, abs = 0, min = null, ease = TWEEN.Easing.Linear.None, type = TWEEN.Interpolation.Linear, color = [], List = null, g = false, b = null, constraint = null, now = null, this;
        };
        /**
         * @param {!Array} n
         * @param {number} val
         * @return {?}
         */
        this.to = function(n, val) {
            return void 0 !== val && (extent = val), vertices = n, this;
        };
        /**
         * @param {number} max
         * @return {?}
         */
        this.start = function(max) {
            TWEEN.add(this);
            /** @type {boolean} */
            u = true;
            /** @type {boolean} */
            g = false;
            min = void 0 !== max ? max : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now();
            min = min + abs;
            var j;
            for (j in vertices) {
                a1[j] = a[j];
                nonDuplicateIds[j] = a1[j] || 0;
            }
            return this;
        };
        /**
         * @return {?}
         */
        this.stop = function() {
            return u ? (TWEEN.remove(this), u = false, null !== now && now.call(a), this.stopChainedTweens(), this) : this;
        };
        /**
         * @return {undefined}
         */
        this.stopChainedTweens = function() {
            /** @type {number} */
            var i = 0;
            var colorLength = color.length;
            for (; i < colorLength; i++) {
                color[i].stop();
            }
        };
        /**
         * @param {string} f
         * @return {?}
         */
        this.delay = function(f) {
            return abs = f, this;
        };
        /**
         * @param {string} data
         * @return {?}
         */
        this.repeat = function(data) {
            return autoReview = data, this;
        };
        /**
         * @param {boolean} value
         * @return {?}
         */
        this.yoyo = function(value) {
            return modeswitches = value, this;
        };
        /**
         * @param {number} p
         * @return {?}
         */
        this.easing = function(p) {
            return ease = p, this;
        };
        /**
         * @param {?} method
         * @return {?}
         */
        this.interpolation = function(method) {
            return type = method, this;
        };
        /**
         * @return {?}
         */
        this.chain = function() {
            return color = arguments, this;
        };
        /**
         * @param {?} ref
         * @return {?}
         */
        this.onStart = function(ref) {
            return List = ref, this;
        };
        /**
         * @param {string} data
         * @return {?}
         */
        this.onUpdate = function(data) {
            return b = data, this;
        };
        /**
         * @param {string} width
         * @return {?}
         */
        this.onComplete = function(width) {
            return constraint = width, this;
        };
        /**
         * @param {string} to
         * @return {?}
         */
        this.onStop = function(to) {
            return now = to, this;
        };
        /**
         * @param {number} value
         * @return {?}
         */
        this.update = function(value) {
            var i;
            if (value < min) {
                return true;
            }
            if (!u) {
                return false;
            }
            if (false === g) {
                if (null !== List) {
                    List.call(a);
                }
                /** @type {boolean} */
                g = true;
            }
            /** @type {number} */
            var p = (value - min) / extent;
            /** @type {number} */
            p = p > 1 ? 1 : p;
            /** @type {number} */
            percentage = p;
            var t = ease(p);
            for (i in vertices) {
                var x1 = a1[i] || 0;
                var x2 = vertices[i];
                a[i] = x1 + (x2 - x1) * t;
            }
            if (null !== b && b.call(a, t), 1 == p) {
                if (null !== constraint) {
                    constraint.call(a);
                }
                /** @type {number} */
                var i = 0;
                var colorLength = color.length;
                for (; i < colorLength; i++) {
                    color[i].start(value);
                }
                return false;
            }
            return true;
        };
        /**
         * @return {?}
         */
        this.getProgress = function() {
            return percentage;
        };
        if (void 0 !== value) {
            this.reset(value);
        }
    };
    TWEEN.Easing = {
        Linear : {
            None : function(to) {
                return to;
            }
        },
        Quadratic : {
            In : function(b) {
                return b * b;
            },
            Out : function(d) {
                return d * (2 - d);
            },
            InOut : function(t) {
                return (t = t * 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
            }
        },
        Cubic : {
            In : function(t) {
                return t * t * t;
            },
            Out : function(t) {
                return --t * t * t + 1;
            },
            InOut : function(t) {
                return (t = t * 2) < 1 ? .5 * t * t * t : .5 * ((t = t - 2) * t * t + 2);
            }
        },
        Quartic : {
            In : function(t) {
                return t * t * t * t;
            },
            Out : function(t) {
                return 1 - --t * t * t * t;
            },
            InOut : function(t) {
                return (t = t * 2) < 1 ? .5 * t * t * t * t : -.5 * ((t = t - 2) * t * t * t - 2);
            }
        },
        Quintic : {
            In : function(t) {
                return t * t * t * t * t;
            },
            Out : function(t) {
                return --t * t * t * t * t + 1;
            },
            InOut : function(t) {
                return (t = t * 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t = t - 2) * t * t * t * t + 2);
            }
        },
        Sinusoidal : {
            In : function(t) {
                return 1 - Math.cos(t * Math.PI / 2);
            },
            Out : function(t) {
                return Math.sin(t * Math.PI / 2);
            },
            InOut : function(t) {
                return .5 * (1 - Math.cos(Math.PI * t));
            }
        },
        Exponential : {
            In : function(b) {
                return 0 === b ? 0 : Math.pow(1024, b - 1);
            },
            Out : function(t) {
                return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
            },
            InOut : function(t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t = t * 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
            }
        },
        Circular : {
            In : function(b) {
                return 1 - Math.sqrt(1 - b * b);
            },
            Out : function(t) {
                return Math.sqrt(1 - --t * t);
            },
            InOut : function(t) {
                return (t = t * 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t = t - 2) * t) + 1);
            }
        },
        Elastic : {
            In : function(t) {
                var p;
                /** @type {number} */
                var h = .1;
                return 0 === t ? 0 : 1 === t ? 1 : (!h || h < 1 ? (h = 1, p = .1) : p = .4 * Math.asin(1 / h) / (2 * Math.PI), -h * Math.pow(2, 10 * (t = t - 1)) * Math.sin((t - p) * (2 * Math.PI) / .4));
            },
            Out : function(t) {
                var p;
                /** @type {number} */
                var h = .1;
                return 0 === t ? 0 : 1 === t ? 1 : (!h || h < 1 ? (h = 1, p = .1) : p = .4 * Math.asin(1 / h) / (2 * Math.PI), h * Math.pow(2, -10 * t) * Math.sin((t - p) * (2 * Math.PI) / .4) + 1);
            },
            InOut : function(t) {
                var p;
                /** @type {number} */
                var h = .1;
                return 0 === t ? 0 : 1 === t ? 1 : (!h || h < 1 ? (h = 1, p = .1) : p = .4 * Math.asin(1 / h) / (2 * Math.PI), (t = t * 2) < 1 ? h * Math.pow(2, 10 * (t = t - 1)) * Math.sin((t - p) * (2 * Math.PI) / .4) * -.5 : h * Math.pow(2, -10 * (t = t - 1)) * Math.sin((t - p) * (2 * Math.PI) / .4) * .5 + 1);
            }
        },
        Back : {
            In : function(t) {
                /** @type {number} */
                var s = 1.70158;
                return t * t * ((s + 1) * t - s);
            },
            Out : function(t) {
                /** @type {number} */
                var s = 1.70158;
                return --t * t * ((s + 1) * t + s) + 1;
            },
            InOut : function(t) {
                /** @type {number} */
                var s = 2.5949095;
                return (t = t * 2) < 1 ? t * t * ((s + 1) * t - s) * .5 : .5 * ((t = t - 2) * t * ((s + 1) * t + s) + 2);
            }
        },
        Bounce : {
            In : function(a) {
                return 1 - TWEEN.Easing.Bounce.Out(1 - a);
            },
            Out : function(t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t = t - 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t = t - 2.25 / 2.75) * t + .9375 : 7.5625 * (t = t - 2.625 / 2.75) * t + .984375;
            },
            InOut : function(a) {
                return a < .5 ? .5 * TWEEN.Easing.Bounce.In(2 * a) : .5 * TWEEN.Easing.Bounce.Out(2 * a - 1) + .5;
            }
        }
    };
    TWEEN.Interpolation = {
        Linear : function(a, b) {
            /** @type {number} */
            var i = a.length - 1;
            /** @type {number} */
            var n = i * b;
            /** @type {number} */
            var s = Math.floor(n);
            var g = TWEEN.Interpolation.Utils.Linear;
            return b < 0 ? g(a[0], a[1], n) : b > 1 ? g(a[i], a[i - 1], i - n) : g(a[s], a[s + 1 > i ? i : s + 1], n - s);
        },
        Bezier : function(a, k) {
            var i;
            /** @type {number} */
            var b = 0;
            /** @type {number} */
            var n = a.length - 1;
            /** @type {function(?, ?): number} */
            var pw = Math.pow;
            var bn = TWEEN.Interpolation.Utils.Bernstein;
            /** @type {number} */
            i = 0;
            for (; i <= n; i++) {
                /** @type {number} */
                b = b + pw(1 - k, n - i) * pw(k, i) * a[i] * bn(n, i);
            }
            return b;
        },
        CatmullRom : function(v, k) {
            /** @type {number} */
            var m = v.length - 1;
            /** @type {number} */
            var f = m * k;
            /** @type {number} */
            var i = Math.floor(f);
            var fn = TWEEN.Interpolation.Utils.CatmullRom;
            return v[0] === v[m] ? (k < 0 && (i = Math.floor(f = m * (1 + k))), fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i)) : k < 0 ? v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]) : k > 1 ? v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]) : fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        },
        Utils : {
            Linear : function(b, c, x) {
                return (c - b) * x + b;
            },
            Bernstein : function(a, c) {
                var b = TWEEN.Interpolation.Utils.Factorial;
                return b(a) / b(c) / b(a - c);
            },
            Factorial : function() {
                /** @type {!Array} */
                var subwikiListsCache = [1];
                return function(wikiId) {
                    var HeaderContentBonusMultiplier;
                    /** @type {number} */
                    var headerScore = 1;
                    if (subwikiListsCache[wikiId]) {
                        return subwikiListsCache[wikiId];
                    }
                    /** @type {number} */
                    HeaderContentBonusMultiplier = wikiId;
                    for (; HeaderContentBonusMultiplier > 1; HeaderContentBonusMultiplier--) {
                        /** @type {number} */
                        headerScore = headerScore * HeaderContentBonusMultiplier;
                    }
                    return subwikiListsCache[wikiId] = headerScore;
                };
            }(),
            CatmullRom : function(p0, p1, p2, p3, t) {
                /** @type {number} */
                var height = .5 * (p2 - p0);
                /** @type {number} */
                var yy = .5 * (p3 - p1);
                /** @type {number} */
                var c = t * t;
                return (2 * p1 - 2 * p2 + height + yy) * (t * c) + (-3 * p1 + 3 * p2 - 2 * height - yy) * c + height * t + p1;
            }
        }
    };
    if (void 0 !== mixin && mixin.exports) {
        mixin.exports = TWEEN;
    }
}, function(module, exports, __webpack_require__) {
    (function(module, value) {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        (function() {
            /**
             * @param {!Object} value
             * @param {!Object} other
             * @return {?}
             */
            function compareAscending(value, other) {
                if (value !== other) {
                    /** @type {boolean} */
                    var valIsNull = null === value;
                    /** @type {boolean} */
                    var valIsUndef = value === undefined;
                    /** @type {boolean} */
                    var valIsReflexive = value === value;
                    /** @type {boolean} */
                    var othIsNull = null === other;
                    /** @type {boolean} */
                    var othIsUndef = other === undefined;
                    /** @type {boolean} */
                    var othIsReflexive = other === other;
                    if (value > other && !othIsNull || !valIsReflexive || valIsNull && !othIsUndef && othIsReflexive || valIsUndef && othIsReflexive) {
                        return 1;
                    }
                    if (value < other && !valIsNull || !othIsReflexive || othIsNull && !valIsUndef && valIsReflexive || othIsUndef && valIsReflexive) {
                        return -1;
                    }
                }
                return 0;
            }
            /**
             * @param {!Object} array
             * @param {string} fn
             * @param {string} reverse
             * @return {?}
             */
            function get(array, fn, reverse) {
                var index = array.length;
                var i = reverse ? index : -1;
                for (; reverse ? i-- : ++i < index;) {
                    if (fn(array[i], i, array)) {
                        return i;
                    }
                }
                return -1;
            }
            /**
             * @param {!Object} array
             * @param {number} value
             * @param {number} fromIndex
             * @return {?}
             */
            function baseIndexOf(array, value, fromIndex) {
                if (value !== value) {
                    return indexOfNaN(array, fromIndex);
                }
                /** @type {number} */
                var index = fromIndex - 1;
                var length = array.length;
                for (; ++index < length;) {
                    if (array[index] === value) {
                        return index;
                    }
                }
                return -1;
            }
            /**
             * @param {?} value
             * @return {?}
             */
            function error(value) {
                return "function" == typeof value || false;
            }
            /**
             * @param {string} value
             * @return {?}
             */
            function toString(value) {
                return null == value ? "" : value + "";
            }
            /**
             * @param {string} d
             * @param {string} page
             * @return {?}
             */
            function $(d, page) {
                /** @type {number} */
                var a = -1;
                var len = d.length;
                for (; ++a < len && page.indexOf(d.charAt(a)) > -1;) {
                }
                return a;
            }
            /**
             * @param {string} input
             * @param {string} x
             * @return {?}
             */
            function join(input, x) {
                var p = input.length;
                for (; p-- && x.indexOf(input.charAt(p)) > -1;) {
                }
                return p;
            }
            /**
             * @param {!Object} object
             * @param {!Object} other
             * @return {?}
             */
            function compare(object, other) {
                return compareAscending(object.criteria, other.criteria) || object.index - other.index;
            }
            /**
             * @param {!Object} object
             * @param {!Object} other
             * @param {!Object} n
             * @return {?}
             */
            function remove(object, other, n) {
                /** @type {number} */
                var index = -1;
                var objCriteria = object.criteria;
                var othCriteria = other.criteria;
                var length = objCriteria.length;
                var count = n.length;
                for (; ++index < length;) {
                    var result = compareAscending(objCriteria[index], othCriteria[index]);
                    if (result) {
                        if (index >= count) {
                            return result;
                        }
                        var next = n[index];
                        return result * ("asc" === next || true === next ? 1 : -1);
                    }
                }
                return object.index - other.index;
            }
            /**
             * @param {?} event
             * @return {?}
             */
            function page(event) {
                return animationConfigs[event];
            }
            /**
             * @param {?} match
             * @return {?}
             */
            function escapeHtmlChar(match) {
                return htmlEntitiesMap[match];
            }
            /**
             * @param {string} k
             * @param {!Function} m
             * @param {string} n
             * @return {?}
             */
            function unescapeHtmlChar(k, m, n) {
                return m ? k = CHAR_MAP[k] : n && (k = out[k]), "\\" + k;
            }
            /**
             * @param {?} s
             * @return {?}
             */
            function val(s) {
                return "\\" + out[s];
            }
            /**
             * @param {!Object} array
             * @param {number} fromIndex
             * @param {boolean} fromRight
             * @return {?}
             */
            function indexOfNaN(array, fromIndex, fromRight) {
                var length = array.length;
                var index = fromIndex + (fromRight ? 0 : -1);
                for (; fromRight ? index-- : ++index < length;) {
                    var item = array[index];
                    if (item !== item) {
                        return index;
                    }
                }
                return -1;
            }
            /**
             * @param {!Object} value
             * @return {?}
             */
            function isObjectLike(value) {
                return !!value && "object" == typeof value;
            }
            /**
             * @param {number} destVal
             * @return {?}
             */
            function callback(destVal) {
                return destVal <= 160 && destVal >= 9 && destVal <= 13 || 32 == destVal || 160 == destVal || 5760 == destVal || 6158 == destVal || destVal >= 8192 && (destVal <= 8202 || 8232 == destVal || 8233 == destVal || 8239 == destVal || 8287 == destVal || 12288 == destVal || 65279 == destVal);
            }
            /**
             * @param {number} array
             * @param {string} value
             * @return {?}
             */
            function concat(array, value) {
                /** @type {number} */
                var i = -1;
                var length = array.length;
                /** @type {number} */
                var bufIdx = -1;
                /** @type {!Array} */
                var buf = [];
                for (; ++i < length;) {
                    if (array[i] === value) {
                        /** @type {string} */
                        array[i] = o;
                        /** @type {number} */
                        buf[++bufIdx] = i;
                    }
                }
                return buf;
            }
            /**
             * @param {number} arr
             * @param {!Object} map
             * @return {?}
             */
            function register(arr, map) {
                var temp_field;
                /** @type {number} */
                var y = -1;
                var loadNum = arr.length;
                /** @type {number} */
                var pfont_row = -1;
                /** @type {!Array} */
                var vga_charmap = [];
                for (; ++y < loadNum;) {
                    var data = arr[y];
                    var topic = map ? map(data, y, arr) : data;
                    if (!(y && temp_field === topic)) {
                        temp_field = topic;
                        vga_charmap[++pfont_row] = data;
                    }
                }
                return vga_charmap;
            }
            /**
             * @param {string} body
             * @return {?}
             */
            function next(body) {
                /** @type {number} */
                var index = -1;
                var length = body.length;
                for (; ++index < length && callback(body.charCodeAt(index));) {
                }
                return index;
            }
            /**
             * @param {string} data
             * @return {?}
             */
            function on(data) {
                var index = data.length;
                for (; index-- && callback(data.charCodeAt(index));) {
                }
                return index;
            }
            /**
             * @param {?} trait
             * @return {?}
             */
            function from(trait) {
                return bonusTraitModifiers[trait];
            }
            /**
             * @param {!Object} global
             * @return {?}
             */
            function runInContext(global) {
                /**
                 * @param {?} value
                 * @return {?}
                 */
                function exports(value) {
                    if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
                        if (value instanceof LodashWrapper) {
                            return value;
                        }
                        if (self.call(value, "__chain__") && self.call(value, "__wrapped__")) {
                            return wrapperClone(value);
                        }
                    }
                    return new LodashWrapper(value);
                }
                /**
                 * @return {undefined}
                 */
                function lodash() {
                }
                /**
                 * @param {?} value
                 * @param {!Object} chainAll
                 * @param {number} actions
                 * @return {undefined}
                 */
                function LodashWrapper(value, chainAll, actions) {
                    this.__wrapped__ = value;
                    this.__actions__ = actions || [];
                    /** @type {boolean} */
                    this.__chain__ = !!chainAll;
                }
                /**
                 * @param {?} value
                 * @return {undefined}
                 */
                function LazyWrapper(value) {
                    this.__wrapped__ = value;
                    /** @type {!Array} */
                    this.__actions__ = [];
                    /** @type {number} */
                    this.__dir__ = 1;
                    /** @type {boolean} */
                    this.__filtered__ = false;
                    /** @type {!Array} */
                    this.__iteratees__ = [];
                    this.__takeCount__ = count;
                    /** @type {!Array} */
                    this.__views__ = [];
                }
                /**
                 * @return {?}
                 */
                function lazyClone() {
                    var result = new LazyWrapper(this.__wrapped__);
                    return result.__actions__ = copyArray(this.__actions__), result.__dir__ = this.__dir__, result.__filtered__ = this.__filtered__, result.__iteratees__ = copyArray(this.__iteratees__), result.__takeCount__ = this.__takeCount__, result.__views__ = copyArray(this.__views__), result;
                }
                /**
                 * @return {?}
                 */
                function lazyReverse() {
                    if (this.__filtered__) {
                        var result = new LazyWrapper(this);
                        /** @type {number} */
                        result.__dir__ = -1;
                        /** @type {boolean} */
                        result.__filtered__ = true;
                    } else {
                        result = this.clone();
                        result.__dir__ *= -1;
                    }
                    return result;
                }
                /**
                 * @return {?}
                 */
                function lazyValue() {
                    var array = this.__wrapped__.value();
                    var dir = this.__dir__;
                    var isArr = isArray(array);
                    /** @type {boolean} */
                    var isRight = dir < 0;
                    var arrLength = isArr ? array.length : 0;
                    var view = getView(0, arrLength, this.__views__);
                    var start = view.start;
                    var end = view.end;
                    /** @type {number} */
                    var length = end - start;
                    var index = isRight ? end : start - 1;
                    var iteratees = this.__iteratees__;
                    var iterLength = iteratees.length;
                    /** @type {number} */
                    var resIndex = 0;
                    var takeCount = nativeMin(length, this.__takeCount__);
                    if (!isArr || arrLength < LARGE_ARRAY_SIZE || arrLength == length && takeCount == length) {
                        return baseWrapperValue(isRight && isArr ? array.reverse() : array, this.__actions__);
                    }
                    /** @type {!Array} */
                    var result = [];
                    t: for (; length-- && resIndex < takeCount;) {
                        index = index + dir;
                        /** @type {number} */
                        var iterIndex = -1;
                        var v = array[index];
                        for (; ++iterIndex < iterLength;) {
                            var data = iteratees[iterIndex];
                            var iteratee = data.iteratee;
                            var type = data.type;
                            var value = iteratee(v);
                            if (type == pid) {
                                v = value;
                            } else {
                                if (!value) {
                                    if (type == metabolite) {
                                        continue t;
                                    }
                                    break t;
                                }
                            }
                        }
                        result[resIndex++] = v;
                    }
                    return result;
                }
                /**
                 * @return {undefined}
                 */
                function Stack() {
                    this.__data__ = {};
                }
                /**
                 * @param {undefined} key
                 * @return {?}
                 */
                function hashSet$1(key) {
                    return this.has(key) && delete this.__data__[key];
                }
                /**
                 * @param {string} key
                 * @return {?}
                 */
                function listCacheGet(key) {
                    return "__proto__" == key ? undefined : this.__data__[key];
                }
                /**
                 * @param {string} object
                 * @return {?}
                 */
                function groupBy(object) {
                    return "__proto__" != object && self.call(this.__data__, object);
                }
                /**
                 * @param {number} key
                 * @param {?} value
                 * @return {?}
                 */
                function listCacheSet(key, value) {
                    return "__proto__" != key && (this.__data__[key] = value), this;
                }
                /**
                 * @param {!Object} values
                 * @return {undefined}
                 */
                function SetCache(values) {
                    var value = values ? values.length : 0;
                    this.data = {
                        hash : nativeCreate(null),
                        set : new Set
                    };
                    for (; value--;) {
                        this.push(values[value]);
                    }
                }
                /**
                 * @param {!Object} data
                 * @param {undefined} value
                 * @return {?}
                 */
                function cacheIndexOf(data, value) {
                    var cache = data.data;
                    return ("string" == typeof value || isObject(value) ? cache.set.has(value) : cache.hash[value]) ? 0 : -1;
                }
                /**
                 * @param {string} value
                 * @return {undefined}
                 */
                function cachePush(value) {
                    var user = this.data;
                    if ("string" == typeof value || isObject(value)) {
                        user.set.add(value);
                    } else {
                        /** @type {boolean} */
                        user.hash[value] = true;
                    }
                }
                /**
                 * @param {!NodeList} options
                 * @param {number} from
                 * @return {?}
                 */
                function byName(options, from) {
                    /** @type {number} */
                    var k = -1;
                    var len = options.length;
                    /** @type {number} */
                    var i = -1;
                    var n = from.length;
                    var ret = Array(len + n);
                    for (; ++k < len;) {
                        ret[k] = options[k];
                    }
                    for (; ++i < n;) {
                        ret[k++] = from[i];
                    }
                    return ret;
                }
                /**
                 * @param {!Object} result
                 * @param {number} array
                 * @return {?}
                 */
                function copyArray(result, array) {
                    /** @type {number} */
                    var i = -1;
                    var length = result.length;
                    if (!array) {
                        array = Array(length);
                    }
                    for (; ++i < length;) {
                        array[i] = result[i];
                    }
                    return array;
                }
                /**
                 * @param {!Array} object
                 * @param {!Function} f
                 * @return {?}
                 */
                function forEach(object, f) {
                    /** @type {number} */
                    var i = -1;
                    var length = object.length;
                    for (; ++i < length && false !== f(object[i], i, object);) {
                    }
                    return object;
                }
                /**
                 * @param {!Object} arr
                 * @param {?} fn
                 * @return {?}
                 */
                function invoke(arr, fn) {
                    var i = arr.length;
                    for (; i-- && false !== fn(arr[i], i, arr);) {
                    }
                    return arr;
                }
                /**
                 * @param {!Array} val
                 * @param {!Function} cb
                 * @return {?}
                 */
                function ok(val, cb) {
                    /** @type {number} */
                    var i = -1;
                    var l = val.length;
                    for (; ++i < l;) {
                        if (!cb(val[i], i, val)) {
                            return false;
                        }
                    }
                    return true;
                }
                /**
                 * @param {!Array} params
                 * @param {string} data
                 * @param {!Function} cb
                 * @param {!Object} n
                 * @return {?}
                 */
                function update(params, data, cb, n) {
                    /** @type {number} */
                    var i = -1;
                    var length = params.length;
                    /** @type {!Object} */
                    var height = n;
                    var label = height;
                    for (; ++i < length;) {
                        var id = params[i];
                        /** @type {number} */
                        var line = +data(id);
                        if (cb(line, height)) {
                            /** @type {number} */
                            height = line;
                            label = id;
                        }
                    }
                    return label;
                }
                /**
                 * @param {?} d
                 * @param {string} o
                 * @return {?}
                 */
                function s(d, o) {
                    /** @type {number} */
                    var n = -1;
                    var l = d.length;
                    /** @type {number} */
                    var bi = -1;
                    /** @type {!Array} */
                    var b = [];
                    for (; ++n < l;) {
                        var i = d[n];
                        if (o(i, n, d)) {
                            b[++bi] = i;
                        }
                    }
                    return b;
                }
                /**
                 * @param {string} obj
                 * @param {!Function} fn
                 * @return {?}
                 */
                function copy(obj, fn) {
                    /** @type {number} */
                    var i = -1;
                    var length = obj.length;
                    var results = Array(length);
                    for (; ++i < length;) {
                        results[i] = fn(obj[i], i, obj);
                    }
                    return results;
                }
                /**
                 * @param {!Object} data
                 * @param {?} params
                 * @return {?}
                 */
                function merge(data, params) {
                    /** @type {number} */
                    var p = -1;
                    var q = params.length;
                    var y = data.length;
                    for (; ++p < q;) {
                        data[y + p] = params[p];
                    }
                    return data;
                }
                /**
                 * @param {!Array} array
                 * @param {!Object} iteratee
                 * @param {?} accumulator
                 * @param {boolean} initAccum
                 * @return {?}
                 */
                function arrayReduce(array, iteratee, accumulator, initAccum) {
                    /** @type {number} */
                    var index = -1;
                    var length = array.length;
                    if (initAccum && length) {
                        accumulator = array[++index];
                    }
                    for (; ++index < length;) {
                        accumulator = iteratee(accumulator, array[index], index, array);
                    }
                    return accumulator;
                }
                /**
                 * @param {!Object} m
                 * @param {?} cb
                 * @param {?} c
                 * @param {(HTMLDocument|boolean)} r
                 * @return {?}
                 */
                function c(m, cb, c, r) {
                    var a = m.length;
                    if (r && a) {
                        c = m[--a];
                    }
                    for (; a--;) {
                        c = cb(c, m[a], a, m);
                    }
                    return c;
                }
                /**
                 * @param {string} data
                 * @param {!Function} render
                 * @return {?}
                 */
                function equal(data, render) {
                    /** @type {number} */
                    var i = -1;
                    var index = data.length;
                    for (; ++i < index;) {
                        if (render(data[i], i, data)) {
                            return true;
                        }
                    }
                    return false;
                }
                /**
                 * @param {!Object} a
                 * @param {string} fn
                 * @return {?}
                 */
                function trigger(a, fn) {
                    var i = a.length;
                    /** @type {number} */
                    var val = 0;
                    for (; i--;) {
                        /** @type {number} */
                        val = val + (+fn(a[i]) || 0);
                    }
                    return val;
                }
                /**
                 * @param {?} value
                 * @param {string} type
                 * @return {?}
                 */
                function arr(value, type) {
                    return value === undefined ? type : value;
                }
                /**
                 * @param {boolean} value
                 * @param {boolean} options
                 * @param {?} context
                 * @param {?} name
                 * @return {?}
                 */
                function properties(value, options, context, name) {
                    return value !== undefined && self.call(name, context) ? value : options;
                }
                /**
                 * @param {string} object
                 * @param {?} context
                 * @param {!Function} callback
                 * @return {?}
                 */
                function debug(object, context, callback) {
                    /** @type {number} */
                    var i = -1;
                    var result = keys(context);
                    var index = result.length;
                    for (; ++i < index;) {
                        var key = result[i];
                        var other = object[key];
                        var value = callback(other, context[key], key, object, context);
                        if (!((value === value ? value === other : other !== other) && (other !== undefined || key in object))) {
                            object[key] = value;
                        }
                    }
                    return object;
                }
                /**
                 * @param {string} target
                 * @param {?} value
                 * @return {?}
                 */
                function assign(target, value) {
                    return null == value ? target : pick(value, keys(value), target);
                }
                /**
                 * @param {!Object} collection
                 * @param {!Array} array
                 * @return {?}
                 */
                function getValue(collection, array) {
                    /** @type {number} */
                    var i = -1;
                    /** @type {boolean} */
                    var isNil = null == collection;
                    var value = !isNil && isArrayLike(collection);
                    var length = value ? collection.length : 0;
                    var n = array.length;
                    var result = Array(n);
                    for (; ++i < n;) {
                        var key = array[i];
                        result[i] = value ? isIndex(key, length) ? collection[key] : undefined : isNil ? undefined : collection[key];
                    }
                    return result;
                }
                /**
                 * @param {?} v
                 * @param {!NodeList} data
                 * @param {!Object} result
                 * @return {?}
                 */
                function pick(v, data, result) {
                    if (!result) {
                        result = {};
                    }
                    /** @type {number} */
                    var j = -1;
                    var ccData = data.length;
                    for (; ++j < ccData;) {
                        var tag = data[j];
                        result[tag] = v[tag];
                    }
                    return result;
                }
                /**
                 * @param {!Function} value
                 * @param {?} key
                 * @param {!Array} body
                 * @return {?}
                 */
                function done(value, key, body) {
                    /** @type {string} */
                    var s = typeof value;
                    return "function" == s ? key === undefined ? value : $(value, key, body) : null == value ? data : "object" == s ? process(value) : key === undefined ? select(value) : format(value, key);
                }
                /**
                 * @param {!Object} value
                 * @param {boolean} isDeep
                 * @param {?} customizer
                 * @param {?} key
                 * @param {!Object} object
                 * @param {!Array} stackA
                 * @param {!Array} stackB
                 * @return {?}
                 */
                function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
                    var result;
                    if (customizer && (result = object ? customizer(value, key, object) : customizer(value)), result !== undefined) {
                        return result;
                    }
                    if (!isObject(value)) {
                        return value;
                    }
                    var isArr = isArray(value);
                    if (isArr) {
                        if (result = initCloneArray(value), !isDeep) {
                            return copyArray(value, result);
                        }
                    } else {
                        var tag = hasOwnProperty.call(value);
                        /** @type {boolean} */
                        var isFunc = tag == funcTag;
                        if (tag != a && tag != hr && (!isFunc || object)) {
                            return cloneableTags[tag] ? initCloneByTag(value, tag, isDeep) : object ? value : {};
                        }
                        if (result = initCloneObject(isFunc ? {} : value), !isDeep) {
                            return assign(result, value);
                        }
                    }
                    if (!stackA) {
                        /** @type {!Array} */
                        stackA = [];
                    }
                    if (!stackB) {
                        /** @type {!Array} */
                        stackB = [];
                    }
                    var length = stackA.length;
                    for (; length--;) {
                        if (stackA[length] == value) {
                            return stackB[length];
                        }
                    }
                    return stackA.push(value), stackB.push(result), (isArr ? forEach : forOwn)(value, function(objValue, key) {
                        result[key] = baseClone(objValue, isDeep, customizer, key, value, stackA, stackB);
                    }), result;
                }
                /**
                 * @param {!Function} callback
                 * @param {number} options
                 * @param {?} name
                 * @return {?}
                 */
                function baseConvert(callback, options, name) {
                    if ("function" != typeof callback) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    return setTimeout(function() {
                        callback.apply(undefined, name);
                    }, options);
                }
                /**
                 * @param {number} obj
                 * @param {!Object} values
                 * @return {?}
                 */
                function fn(obj, values) {
                    var l = obj ? obj.length : 0;
                    /** @type {!Array} */
                    var result = [];
                    if (!l) {
                        return result;
                    }
                    /** @type {number} */
                    var i = -1;
                    var indexOf = exec();
                    /** @type {boolean} */
                    var isCommon = indexOf == baseIndexOf;
                    var inputValues = isCommon && values.length >= LARGE_ARRAY_SIZE ? createCache(values) : null;
                    var start = values.length;
                    if (inputValues) {
                        /** @type {function(!Object, undefined): ?} */
                        indexOf = cacheIndexOf;
                        /** @type {boolean} */
                        isCommon = false;
                        values = inputValues;
                    }
                    t: for (; ++i < l;) {
                        var value = obj[i];
                        if (isCommon && value === value) {
                            var i = start;
                            for (; i--;) {
                                if (values[i] === value) {
                                    continue t;
                                }
                            }
                            result.push(value);
                        } else {
                            if (indexOf(values, value, 0) < 0) {
                                result.push(value);
                            }
                        }
                    }
                    return result;
                }
                /**
                 * @param {!Array} d
                 * @param {!Function} e
                 * @return {?}
                 */
                function f(d, e) {
                    /** @type {boolean} */
                    var path1 = true;
                    return val(d, function(context, n, sectE) {
                        return path1 = !!e(context, n, sectE);
                    }), path1;
                }
                /**
                 * @param {!Array} index
                 * @param {string} callback
                 * @param {!Function} start
                 * @param {number} end
                 * @return {?}
                 */
                function start(index, callback, start, end) {
                    /** @type {number} */
                    var i = end;
                    var down = i;
                    return val(index, function(right, webhookMsg, privateContent) {
                        /** @type {number} */
                        var direction = +callback(right, webhookMsg, privateContent);
                        if (start(direction, i) || direction === end && direction === down) {
                            i = direction;
                            /** @type {number} */
                            down = right;
                        }
                    }), down;
                }
                /**
                 * @param {number} a
                 * @param {?} v
                 * @param {number} start
                 * @param {number} end
                 * @return {?}
                 */
                function run(a, v, start, end) {
                    var length = a.length;
                    /** @type {number} */
                    start = null == start ? 0 : +start || 0;
                    if (start < 0) {
                        start = -start > length ? 0 : length + start;
                    }
                    end = end === undefined || end > length ? length : +end || 0;
                    if (end < 0) {
                        end = end + length;
                    }
                    /** @type {number} */
                    length = start > end ? 0 : end >>> 0;
                    /** @type {number} */
                    start = start >>> 0;
                    for (; start < length;) {
                        a[start++] = v;
                    }
                    return a;
                }
                /**
                 * @param {?} a
                 * @param {string} fn
                 * @return {?}
                 */
                function x(a, fn) {
                    /** @type {!Array} */
                    var x = [];
                    return val(a, function(e, previousAnimation, callback) {
                        if (fn(e, previousAnimation, callback)) {
                            x.push(e);
                        }
                    }), x;
                }
                /**
                 * @param {!Object} src
                 * @param {string} resolve
                 * @param {!Function} data
                 * @param {boolean} n
                 * @return {?}
                 */
                function parse(src, resolve, data, n) {
                    var a;
                    return data(src, function(e, global, http) {
                        if (resolve(e, global, http)) {
                            return a = n ? global : e, false;
                        }
                    }), a;
                }
                /**
                 * @param {number} obj
                 * @param {boolean} params
                 * @param {string} isStrict
                 * @param {!Object} context
                 * @return {?}
                 */
                function get(obj, params, isStrict, context) {
                    if (!context) {
                        /** @type {!Array} */
                        context = [];
                    }
                    /** @type {number} */
                    var i = -1;
                    var length = obj.length;
                    for (; ++i < length;) {
                        var value = obj[i];
                        if (isObjectLike(value) && isArrayLike(value) && (isStrict || isArray(value) || isArguments(value))) {
                            if (params) {
                                get(value, params, isStrict, context);
                            } else {
                                merge(context, value);
                            }
                        } else {
                            if (!isStrict) {
                                context[context.length] = value;
                            }
                        }
                    }
                    return context;
                }
                /**
                 * @param {?} name
                 * @param {!Function} obj
                 * @return {?}
                 */
                function toString(name, obj) {
                    return iterator(name, obj, keysIn);
                }
                /**
                 * @param {!Array} object
                 * @param {!Function} callback
                 * @return {?}
                 */
                function forOwn(object, callback) {
                    return iterator(object, callback, keys);
                }
                /**
                 * @param {?} name
                 * @param {?} data
                 * @return {?}
                 */
                function file(name, data) {
                    return path(name, data, keys);
                }
                /**
                 * @param {!Object} options
                 * @param {!NodeList} obj
                 * @return {?}
                 */
                function copyObject(options, obj) {
                    /** @type {number} */
                    var i = -1;
                    var length = obj.length;
                    /** @type {number} */
                    var j = -1;
                    /** @type {!Array} */
                    var out = [];
                    for (; ++i < length;) {
                        var type = obj[i];
                        if (isFunction(options[type])) {
                            out[++j] = type;
                        }
                    }
                    return out;
                }
                /**
                 * @param {!Object} object
                 * @param {string} path
                 * @param {string} key
                 * @return {?}
                 */
                function apply(object, path, key) {
                    if (null != object) {
                        if (key !== undefined && key in resolve(object)) {
                            /** @type {!Array} */
                            path = [key];
                        }
                        /** @type {number} */
                        var index = 0;
                        var length = path.length;
                        for (; null != object && index < length;) {
                            object = object[path[index++]];
                        }
                        return index && index == length ? object : undefined;
                    }
                }
                /**
                 * @param {string} value
                 * @param {string} other
                 * @param {string} customizer
                 * @param {boolean} isLoose
                 * @param {!Array} stackA
                 * @param {!Array} stackB
                 * @return {?}
                 */
                function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
                    return value === other || (null == value || null == other || !isObject(value) && !isObjectLike(other) ? value !== value && other !== other : baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB));
                }
                /**
                 * @param {string} object
                 * @param {string} other
                 * @param {!Function} equalFunc
                 * @param {!Object} customizer
                 * @param {boolean} isLoose
                 * @param {!Array} stackA
                 * @param {!Array} stackB
                 * @return {?}
                 */
                function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
                    var objIsArr = isArray(object);
                    var othIsArr = isArray(other);
                    /** @type {string} */
                    var nodeName = funcTag$2;
                    /** @type {string} */
                    var tag = funcTag$2;
                    if (!objIsArr) {
                        nodeName = hasOwnProperty.call(object);
                        if (nodeName == hr) {
                            /** @type {string} */
                            nodeName = a;
                        } else {
                            if (nodeName != a) {
                                objIsArr = isTypedArray(object);
                            }
                        }
                    }
                    if (!othIsArr) {
                        tag = hasOwnProperty.call(other);
                        if (tag == hr) {
                            /** @type {string} */
                            tag = a;
                        } else {
                            if (tag != a) {
                                othIsArr = isTypedArray(other);
                            }
                        }
                    }
                    /** @type {boolean} */
                    var objIsObj = nodeName == a;
                    /** @type {boolean} */
                    var othIsObj = tag == a;
                    /** @type {boolean} */
                    var isTemplateElement = nodeName == tag;
                    if (isTemplateElement && !objIsArr && !objIsObj) {
                        return equalByTag(object, other, nodeName);
                    }
                    if (!isLoose) {
                        var objIsWrapped = objIsObj && self.call(object, "__wrapped__");
                        var othIsWrapped = othIsObj && self.call(other, "__wrapped__");
                        if (objIsWrapped || othIsWrapped) {
                            return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
                        }
                    }
                    if (!isTemplateElement) {
                        return false;
                    }
                    if (!stackA) {
                        /** @type {!Array} */
                        stackA = [];
                    }
                    if (!stackB) {
                        /** @type {!Array} */
                        stackB = [];
                    }
                    var length = stackA.length;
                    for (; length--;) {
                        if (stackA[length] == object) {
                            return stackB[length] == other;
                        }
                    }
                    stackA.push(object);
                    stackB.push(other);
                    var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
                    return stackA.pop(), stackB.pop(), result;
                }
                /**
                 * @param {!Object} p
                 * @param {!Object} queue
                 * @param {!Function} value
                 * @return {?}
                 */
                function search(p, queue, value) {
                    var i = queue.length;
                    var olen = i;
                    /** @type {boolean} */
                    var hasHookups = !value;
                    if (null == p) {
                        return !olen;
                    }
                    p = resolve(p);
                    for (; i--;) {
                        var args = queue[i];
                        if (hasHookups && args[2] ? args[1] !== p[args[0]] : !(args[0] in p)) {
                            return false;
                        }
                    }
                    for (; ++i < olen;) {
                        args = queue[i];
                        var data = args[0];
                        var other = p[data];
                        var name = args[1];
                        if (hasHookups && args[2]) {
                            if (other === undefined && !(data in p)) {
                                return false;
                            }
                        } else {
                            var result = value ? value(other, name, data) : undefined;
                            if (!(result === undefined ? baseIsEqual(name, other, value, true) : result)) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
                /**
                 * @param {string} obj
                 * @param {!Function} e
                 * @return {?}
                 */
                function del(obj, e) {
                    /** @type {number} */
                    var index = -1;
                    var values = isArrayLike(obj) ? Array(obj.length) : [];
                    return val(obj, function(val, data, attr) {
                        values[++index] = e(val, data, attr);
                    }), values;
                }
                /**
                 * @param {!Function} value
                 * @return {?}
                 */
                function process(value) {
                    var args = equals(value);
                    if (1 == args.length && args[0][2]) {
                        var key = args[0][0];
                        var srcValue = args[0][1];
                        return function(object) {
                            return null != object && (object[key] === srcValue && (srcValue !== undefined || key in resolve(object)));
                        };
                    }
                    return function(type) {
                        return search(type, args);
                    };
                }
                /**
                 * @param {string} b
                 * @param {(Object|string)} value
                 * @return {?}
                 */
                function format(b, value) {
                    var bIsArray = isArray(b);
                    var rewrite = isString(b) && isEqual(value);
                    /** @type {string} */
                    var v = b + "";
                    return b = match(b), function(object) {
                        if (null == object) {
                            return false;
                        }
                        /** @type {string} */
                        var key = v;
                        if (object = resolve(object), (bIsArray || !rewrite) && !(key in object)) {
                            if (null == (object = 1 == b.length ? object : apply(object, slice(b, 0, -1)))) {
                                return false;
                            }
                            key = parseInt(b);
                            object = resolve(object);
                        }
                        return object[key] === value ? value !== undefined || key in object : baseIsEqual(value, object[key], undefined, true);
                    };
                }
                /**
                 * @param {!Window} object
                 * @param {undefined} source
                 * @param {!Function} customizer
                 * @param {!Array} stackA
                 * @param {!Object} stackB
                 * @return {?}
                 */
                function baseMerge(object, source, customizer, stackA, stackB) {
                    if (!isObject(object)) {
                        return object;
                    }
                    var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source));
                    var props = isSrcArr ? undefined : keys(source);
                    return forEach(props || source, function(value, key) {
                        if (props && (key = value, value = source[key]), isObjectLike(value)) {
                            if (!stackA) {
                                /** @type {!Array} */
                                stackA = [];
                            }
                            if (!stackB) {
                                /** @type {!Array} */
                                stackB = [];
                            }
                            baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
                        } else {
                            var a = object[key];
                            var b = customizer ? customizer(a, value, key, object, source) : undefined;
                            /** @type {boolean} */
                            var first = b === undefined;
                            if (first) {
                                b = value;
                            }
                            if (!(b === undefined && (!isSrcArr || key in object) || !first && (b === b ? b === a : a !== a))) {
                                object[key] = b;
                            }
                        }
                    }), object;
                }
                /**
                 * @param {!Window} object
                 * @param {!Object} source
                 * @param {!Object} key
                 * @param {!Function} mergeFunc
                 * @param {!Function} customizer
                 * @param {!Array} stackA
                 * @param {!Object} stackB
                 * @return {?}
                 */
                function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
                    var length = stackA.length;
                    var srcValue = source[key];
                    for (; length--;) {
                        if (stackA[length] == srcValue) {
                            return void(object[key] = stackB[length]);
                        }
                    }
                    var value = object[key];
                    var result = customizer ? customizer(value, srcValue, key, object, source) : undefined;
                    /** @type {boolean} */
                    var isCommon = result === undefined;
                    if (isCommon) {
                        result = srcValue;
                        if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
                            result = isArray(value) ? value : isArrayLike(value) ? copyArray(value) : [];
                        } else {
                            if (isPlainObject(srcValue) || isArguments(srcValue)) {
                                result = isArguments(value) ? toPlainObject(value) : isPlainObject(value) ? value : {};
                            } else {
                                /** @type {boolean} */
                                isCommon = false;
                            }
                        }
                    }
                    stackA.push(srcValue);
                    stackB.push(result);
                    if (isCommon) {
                        object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
                    } else {
                        if (result === result ? result !== value : value === value) {
                            object[key] = result;
                        }
                    }
                }
                /**
                 * @param {string} key
                 * @return {?}
                 */
                function baseProperty(key) {
                    return function(name) {
                        return null == name ? undefined : name[key];
                    };
                }
                /**
                 * @param {string} a
                 * @return {?}
                 */
                function stringify(a) {
                    /** @type {string} */
                    var res = a + "";
                    return a = match(a), function(feature) {
                        return apply(feature, a, res);
                    };
                }
                /**
                 * @param {string} obj
                 * @param {!Object} keys
                 * @return {?}
                 */
                function getPath(obj, keys) {
                    var name = obj ? keys.length : 0;
                    for (; name--;) {
                        var index = keys[name];
                        if (index != previous && isIndex(index)) {
                            var previous = index;
                            splice.call(obj, index, 1);
                        }
                    }
                    return obj;
                }
                /**
                 * @param {number} min
                 * @param {number} max
                 * @return {?}
                 */
                function baseRandom(min, max) {
                    return min + floor(nativeRandom() * (max - min + 1));
                }
                /**
                 * @param {!Object} name
                 * @param {?} require
                 * @param {?} value
                 * @param {boolean} html
                 * @param {?} callback
                 * @return {?}
                 */
                function init(name, require, value, html, callback) {
                    return callback(name, function(deps, factory, params) {
                        value = html ? (html = false, deps) : require(value, deps, factory, params);
                    }), value;
                }
                /**
                 * @param {?} arr
                 * @param {number} start
                 * @param {number} end
                 * @return {?}
                 */
                function slice(arr, start, end) {
                    /** @type {number} */
                    var i = -1;
                    var length = arr.length;
                    /** @type {number} */
                    start = null == start ? 0 : +start || 0;
                    if (start < 0) {
                        start = -start > length ? 0 : length + start;
                    }
                    end = end === undefined || end > length ? length : +end || 0;
                    if (end < 0) {
                        end = end + length;
                    }
                    /** @type {number} */
                    length = start > end ? 0 : end - start >>> 0;
                    /** @type {number} */
                    start = start >>> 0;
                    var result = Array(length);
                    for (; ++i < length;) {
                        result[i] = arr[i + start];
                    }
                    return result;
                }
                /**
                 * @param {string} arg
                 * @param {!Function} fn
                 * @return {?}
                 */
                function query(arg, fn) {
                    var rval;
                    return val(arg, function(query, obj, i) {
                        return !(rval = fn(query, obj, i));
                    }), !!rval;
                }
                /**
                 * @param {!Object} input
                 * @param {!Function} prop
                 * @return {?}
                 */
                function sort(input, prop) {
                    var i = input.length;
                    input.sort(prop);
                    for (; i--;) {
                        input[i] = input[i].value;
                    }
                    return input;
                }
                /**
                 * @param {string} data
                 * @param {boolean} value
                 * @param {!Object} index
                 * @return {?}
                 */
                function cleanup(data, value, index) {
                    var done = next();
                    /** @type {number} */
                    var index = -1;
                    return value = copy(value, function(signupErr) {
                        return done(signupErr);
                    }), sort(del(data, function(val) {
                        return {
                            criteria : copy(value, function(obtainGETData) {
                                return obtainGETData(val);
                            }),
                            index : ++index,
                            value : val
                        };
                    }), function(p, a) {
                        return remove(p, a, index);
                    });
                }
                /**
                 * @param {?} context
                 * @param {string} cb
                 * @return {?}
                 */
                function log(context, cb) {
                    /** @type {number} */
                    var value = 0;
                    return val(context, function(errReadDir, appRet, data) {
                        value = value + (+cb(errReadDir, appRet, data) || 0);
                    }), value;
                }
                /**
                 * @param {number} array
                 * @param {boolean} callback
                 * @return {?}
                 */
                function each(array, callback) {
                    /** @type {number} */
                    var index = -1;
                    var test = exec();
                    var length = array.length;
                    /** @type {boolean} */
                    var isCommon = test == baseIndexOf;
                    /** @type {boolean} */
                    var isLarge = isCommon && length >= LARGE_ARRAY_SIZE;
                    var data = isLarge ? createCache() : null;
                    /** @type {!Array} */
                    var result = [];
                    if (data) {
                        /** @type {function(!Object, undefined): ?} */
                        test = cacheIndexOf;
                        /** @type {boolean} */
                        isCommon = false;
                    } else {
                        /** @type {boolean} */
                        isLarge = false;
                        /** @type {!Array} */
                        data = callback ? [] : result;
                    }
                    t: for (; ++index < length;) {
                        var value = array[index];
                        var name = callback ? callback(value, index, array) : value;
                        if (isCommon && value === value) {
                            var i = data.length;
                            for (; i--;) {
                                if (data[i] === name) {
                                    continue t;
                                }
                            }
                            if (callback) {
                                data.push(name);
                            }
                            result.push(value);
                        } else {
                            if (test(data, name, 0) < 0) {
                                if (callback || isLarge) {
                                    data.push(name);
                                }
                                result.push(value);
                            }
                        }
                    }
                    return result;
                }
                /**
                 * @param {?} index
                 * @param {!NodeList} object
                 * @return {?}
                 */
                function baseValues(index, object) {
                    /** @type {number} */
                    var j = -1;
                    var n = object.length;
                    var result = Array(n);
                    for (; ++j < n;) {
                        result[j] = index[object[j]];
                    }
                    return result;
                }
                /**
                 * @param {!Array} obj
                 * @param {?} predicate
                 * @param {boolean} isDrop
                 * @param {string} fromRight
                 * @return {?}
                 */
                function assert(obj, predicate, isDrop, fromRight) {
                    var length = obj.length;
                    var index = fromRight ? length : -1;
                    for (; (fromRight ? index-- : ++index < length) && predicate(obj[index], index, obj);) {
                    }
                    return isDrop ? slice(obj, fromRight ? 0 : index, fromRight ? index + 1 : length) : slice(obj, fromRight ? index + 1 : 0, fromRight ? length : index);
                }
                /**
                 * @param {string} value
                 * @param {!NodeList} current
                 * @return {?}
                 */
                function baseWrapperValue(value, current) {
                    /** @type {string} */
                    var result = value;
                    if (result instanceof LazyWrapper) {
                        result = result.value();
                    }
                    /** @type {number} */
                    var i = -1;
                    var index = current.length;
                    for (; ++i < index;) {
                        var child = current[i];
                        result = child.func.apply(child.thisArg, merge([result], child.args));
                    }
                    return result;
                }
                /**
                 * @param {!Array} array
                 * @param {?} value
                 * @param {boolean} retHighest
                 * @return {?}
                 */
                function binaryIndex(array, value, retHighest) {
                    /** @type {number} */
                    var low = 0;
                    var high = array ? array.length : low;
                    if ("number" == typeof value && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
                        for (; low < high;) {
                            /** @type {number} */
                            var mid = low + high >>> 1;
                            var computed = array[mid];
                            if ((retHighest ? computed <= value : computed < value) && null !== computed) {
                                /** @type {number} */
                                low = mid + 1;
                            } else {
                                /** @type {number} */
                                high = mid;
                            }
                        }
                        return high;
                    }
                    return binaryIndexBy(array, value, data, retHighest);
                }
                /**
                 * @param {!Object} array
                 * @param {!Object} value
                 * @param {!Function} iteratee
                 * @param {boolean} retHighest
                 * @return {?}
                 */
                function binaryIndexBy(array, value, iteratee, retHighest) {
                    value = iteratee(value);
                    /** @type {number} */
                    var low = 0;
                    var high = array ? array.length : 0;
                    /** @type {boolean} */
                    var valIsNaN = value !== value;
                    /** @type {boolean} */
                    var isTranslucent = null === value;
                    /** @type {boolean} */
                    var valIsUndefined = value === undefined;
                    for (; low < high;) {
                        var mid = floor((low + high) / 2);
                        var computed = iteratee(array[mid]);
                        /** @type {boolean} */
                        var isDef = computed !== undefined;
                        /** @type {boolean} */
                        var isReflexive = computed === computed;
                        if (valIsNaN) {
                            var setLow = isReflexive || retHighest;
                        } else {
                            setLow = isTranslucent ? isReflexive && isDef && (retHighest || null != computed) : valIsUndefined ? isReflexive && (retHighest || isDef) : null != computed && (retHighest ? computed <= value : computed < value);
                        }
                        if (setLow) {
                            low = mid + 1;
                        } else {
                            high = mid;
                        }
                    }
                    return nativeMin(high, MAX_ARRAY_INDEX);
                }
                /**
                 * @param {!Function} callback
                 * @param {?} obj
                 * @param {number} id
                 * @return {?}
                 */
                function $(callback, obj, id) {
                    if ("function" != typeof callback) {
                        return data;
                    }
                    if (obj === undefined) {
                        return callback;
                    }
                    switch(id) {
                        case 1:
                            return function(localMediaStream) {
                                return callback.call(obj, localMediaStream);
                            };
                        case 3:
                            return function(localMediaStream, num_relations, arr_) {
                                return callback.call(obj, localMediaStream, num_relations, arr_);
                            };
                        case 4:
                            return function(localMediaStream, num_relations, arr_, oldValue) {
                                return callback.call(obj, localMediaStream, num_relations, arr_, oldValue);
                            };
                        case 5:
                            return function(localMediaStream, num_relations, arr_, oldValue, _param4) {
                                return callback.call(obj, localMediaStream, num_relations, arr_, oldValue, _param4);
                            };
                    }
                    return function() {
                        return callback.apply(obj, arguments);
                    };
                }
                /**
                 * @param {!Object} buf
                 * @return {?}
                 */
                function bufferClone(buf) {
                    var data = new ArrayBuffer(buf.byteLength);
                    return (new Uint8Array(data)).set(new Uint8Array(buf)), data;
                }
                /**
                 * @param {!Array} object
                 * @param {!NodeList} args
                 * @param {!NodeList} properties
                 * @return {?}
                 */
                function composeArgs(object, args, properties) {
                    var length = properties.length;
                    /** @type {number} */
                    var i = -1;
                    var rangeLength = nativeMax(object.length - length, 0);
                    /** @type {number} */
                    var index = -1;
                    var start = args.length;
                    var result = Array(start + rangeLength);
                    for (; ++index < start;) {
                        result[index] = args[index];
                    }
                    for (; ++i < length;) {
                        result[properties[i]] = object[i];
                    }
                    for (; rangeLength--;) {
                        result[index++] = object[i++];
                    }
                    return result;
                }
                /**
                 * @param {!Array} obj
                 * @param {!NodeList} params
                 * @param {!NodeList} args
                 * @return {?}
                 */
                function composeArgsRight(obj, params, args) {
                    /** @type {number} */
                    var index = -1;
                    var start = args.length;
                    /** @type {number} */
                    var i = -1;
                    var length = nativeMax(obj.length - start, 0);
                    /** @type {number} */
                    var prop = -1;
                    var offset = params.length;
                    var result = Array(length + offset);
                    for (; ++i < length;) {
                        result[i] = obj[i];
                    }
                    /** @type {number} */
                    var s = i;
                    for (; ++prop < offset;) {
                        result[s + prop] = params[prop];
                    }
                    for (; ++index < start;) {
                        result[s + args[index]] = obj[i++];
                    }
                    return result;
                }
                /**
                 * @param {!Function} on
                 * @param {!Function} cb
                 * @return {?}
                 */
                function clone(on, cb) {
                    return function(data, callback, response) {
                        var channel = cb ? cb() : {};
                        if (callback = next(callback, response, 3), isArray(data)) {
                            /** @type {number} */
                            var i = -1;
                            var index = data.length;
                            for (; ++i < index;) {
                                var event = data[i];
                                on(channel, event, callback(event, i, data), data);
                            }
                        } else {
                            val(data, function(event, exisObj, i) {
                                on(channel, event, callback(event, exisObj, i), i);
                            });
                        }
                        return channel;
                    };
                }
                /**
                 * @param {!Function} t
                 * @return {?}
                 */
                function save(t) {
                    return rest(function(o, nodes) {
                        /** @type {number} */
                        var j = -1;
                        var i = null == o ? 0 : nodes.length;
                        var v = i > 2 ? nodes[i - 2] : undefined;
                        var parent = i > 2 ? nodes[2] : undefined;
                        var r = i > 1 ? nodes[i - 1] : undefined;
                        if ("function" == typeof v) {
                            v = $(v, r, 5);
                            /** @type {number} */
                            i = i - 2;
                        } else {
                            v = "function" == typeof r ? r : undefined;
                            /** @type {number} */
                            i = i - (v ? 1 : 0);
                        }
                        if (parent && cb(nodes[0], nodes[1], parent)) {
                            v = i < 3 ? undefined : v;
                            /** @type {number} */
                            i = 1;
                        }
                        for (; ++j < i;) {
                            var type = nodes[j];
                            if (type) {
                                t(o, type, v);
                            }
                        }
                        return o;
                    });
                }
                /**
                 * @param {!Function} eachFunc
                 * @param {boolean} fromRight
                 * @return {?}
                 */
                function createBaseEach(eachFunc, fromRight) {
                    return function(collection, iteratee) {
                        var length = collection ? getLength(collection) : 0;
                        if (!isLength(length)) {
                            return eachFunc(collection, iteratee);
                        }
                        var index = fromRight ? length : -1;
                        var array = resolve(collection);
                        for (; (fromRight ? index-- : ++index < length) && false !== iteratee(array[index], index, array);) {
                        }
                        return collection;
                    };
                }
                /**
                 * @param {string} fromRight
                 * @return {?}
                 */
                function req(fromRight) {
                    return function(items, callback, reject) {
                        var values = resolve(items);
                        var result = reject(items);
                        var length = result.length;
                        var index = fromRight ? length : -1;
                        for (; fromRight ? index-- : ++index < length;) {
                            var i = result[index];
                            if (false === callback(values[i], i, values)) {
                                break;
                            }
                        }
                        return items;
                    };
                }
                /**
                 * @param {!Function} value
                 * @param {?} spec
                 * @return {?}
                 */
                function create(value, spec) {
                    /**
                     * @return {?}
                     */
                    function overloaded() {
                        return (this && this !== root && this instanceof overloaded ? f : value).apply(spec, arguments);
                    }
                    var f = extend(value);
                    return overloaded;
                }
                /**
                 * @param {!Object} values
                 * @return {?}
                 */
                function createCache(values) {
                    return nativeCreate && Set ? new SetCache(values) : null;
                }
                /**
                 * @param {!Function} cb
                 * @return {?}
                 */
                function build(cb) {
                    return function(a) {
                        /** @type {number} */
                        var n = -1;
                        var obj = result(reject(a));
                        var max = obj.length;
                        /** @type {string} */
                        var ret = "";
                        for (; ++n < max;) {
                            ret = cb(ret, obj[n], n);
                        }
                        return ret;
                    };
                }
                /**
                 * @param {!Function} Ctor
                 * @return {?}
                 */
                function extend(Ctor) {
                    return function() {
                        /** @type {!Arguments} */
                        var args = arguments;
                        switch(args.length) {
                            case 0:
                                return new Ctor;
                            case 1:
                                return new Ctor(args[0]);
                            case 2:
                                return new Ctor(args[0], args[1]);
                            case 3:
                                return new Ctor(args[0], args[1], args[2]);
                            case 4:
                                return new Ctor(args[0], args[1], args[2], args[3]);
                            case 5:
                                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                            case 6:
                                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                            case 7:
                                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
                        }
                        var thisBinding = baseCreate(Ctor.prototype);
                        var result = Ctor.apply(thisBinding, args);
                        return isObject(result) ? result : thisBinding;
                    };
                }
                /**
                 * @param {number} type
                 * @return {?}
                 */
                function createField(type) {
                    /**
                     * @param {undefined} node
                     * @param {undefined} id
                     * @param {!Object} parent
                     * @return {?}
                     */
                    function field(node, id, parent) {
                        if (parent && cb(node, id, parent)) {
                            id = undefined;
                        }
                        var result = callback(node, type, undefined, undefined, undefined, undefined, undefined, id);
                        return result.placeholder = field.placeholder, result;
                    }
                    return field;
                }
                /**
                 * @param {!Function} input
                 * @param {string} key
                 * @return {?}
                 */
                function uniq(input, key) {
                    return rest(function(chars) {
                        var ch = chars[0];
                        return null == ch ? ch : (chars.push(key), input.apply(undefined, chars));
                    });
                }
                /**
                 * @param {!Function} val
                 * @param {undefined} length
                 * @return {?}
                 */
                function test(val, length) {
                    return function(item, key, data) {
                        if (data && cb(item, key, data) && (key = undefined), key = next(key, data, 3), 1 == key.length) {
                            item = isArray(item) ? item : find(item);
                            var res = update(item, key, val, length);
                            if (!item.length || res !== length) {
                                return res;
                            }
                        }
                        return start(item, key, val, length);
                    };
                }
                /**
                 * @param {!Function} callback
                 * @param {string} id
                 * @return {?}
                 */
                function require(callback, id) {
                    return function(values, value, ctx) {
                        if (value = next(value, ctx, 3), isArray(values)) {
                            var index = get(values, value, id);
                            return index > -1 ? values[index] : undefined;
                        }
                        return parse(values, value, callback);
                    };
                }
                /**
                 * @param {string} i
                 * @return {?}
                 */
                function has(i) {
                    return function(tab, e, props) {
                        return tab && tab.length ? (e = next(e, props, 3), get(tab, e, i)) : -1;
                    };
                }
                /**
                 * @param {!Function} value
                 * @return {?}
                 */
                function defaults(value) {
                    return function(expectedSrc, res, ctx) {
                        return res = next(res, ctx, 3), parse(expectedSrc, res, value, true);
                    };
                }
                /**
                 * @param {string} fromRight
                 * @return {?}
                 */
                function createFlow(fromRight) {
                    return function() {
                        var wrapper;
                        /** @type {number} */
                        var length = arguments.length;
                        /** @type {number} */
                        var index = fromRight ? length : -1;
                        /** @type {number} */
                        var item = 0;
                        var array = Array(length);
                        for (; fromRight ? index-- : ++index < length;) {
                            var req = array[item++] = arguments[index];
                            if ("function" != typeof req) {
                                throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                            }
                            if (!wrapper && LodashWrapper.prototype.thru && "wrapper" == getFuncName(req)) {
                                wrapper = new LodashWrapper([], true);
                            }
                        }
                        /** @type {number} */
                        index = wrapper ? -1 : length;
                        for (; ++index < length;) {
                            req = array[index];
                            var key = getFuncName(req);
                            var data = "wrapper" == key ? getData(req) : undefined;
                            wrapper = data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | left | REARG_FLAG) && !data[4].length && 1 == data[9] ? wrapper[getFuncName(data[0])].apply(wrapper, data[3]) : 1 == req.length && isLaziable(req) ? wrapper[key]() : wrapper.thru(req);
                        }
                        return function() {
                            /** @type {!Arguments} */
                            var args = arguments;
                            var value = args[0];
                            if (wrapper && 1 == args.length && isArray(value) && value.length >= LARGE_ARRAY_SIZE) {
                                return wrapper.plant(value).value();
                            }
                            /** @type {number} */
                            var i = 0;
                            var width = length ? array[i].apply(this, args) : value;
                            for (; ++i < length;) {
                                width = array[i].call(this, width);
                            }
                            return width;
                        };
                    };
                }
                /**
                 * @param {!Function} fn
                 * @param {?} f
                 * @return {?}
                 */
                function render(fn, f) {
                    return function(n, b, p) {
                        return "function" == typeof b && p === undefined && isArray(n) ? fn(n, b) : f(n, $(b, p, 3));
                    };
                }
                /**
                 * @param {?} cb
                 * @return {?}
                 */
                function wrapper(cb) {
                    return function(fallbackReleases, s, r) {
                        return "function" == typeof s && r === undefined || (s = $(s, r, 3)), cb(fallbackReleases, s, keysIn);
                    };
                }
                /**
                 * @param {!Function} done
                 * @return {?}
                 */
                function replace(done) {
                    return function(projectsGetErr, s, r) {
                        return "function" == typeof s && r === undefined || (s = $(s, r, 3)), done(projectsGetErr, s);
                    };
                }
                /**
                 * @param {boolean} c
                 * @return {?}
                 */
                function runTask(c) {
                    return function(object, callback, response) {
                        var ret = {};
                        return callback = next(callback, response, 3), forOwn(object, function(e, i, y) {
                            var b = callback(e, i, y);
                            i = c ? b : i;
                            e = c ? e : b;
                            /** @type {string} */
                            ret[i] = e;
                        }), ret;
                    };
                }
                /**
                 * @param {number} fromRight
                 * @return {?}
                 */
                function bindLogger(fromRight) {
                    return function(string, length, chars) {
                        return string = toString(string), (fromRight ? string : "") + repeat(string, length, chars) + (fromRight ? "" : string);
                    };
                }
                /**
                 * @param {number} name
                 * @return {?}
                 */
                function createElement(name) {
                    var scope = rest(function(x, i) {
                        var value = concat(i, scope.placeholder);
                        return callback(x, name, undefined, i, value);
                    });
                    return scope;
                }
                /**
                 * @param {!Function} cb
                 * @param {?} e
                 * @return {?}
                 */
                function convert(cb, e) {
                    return function(n, s, c, o) {
                        /** @type {boolean} */
                        var resource = arguments.length < 3;
                        return "function" == typeof s && o === undefined && isArray(n) ? cb(n, s, c, resource) : init(n, next(s, o, 4), c, resource, e);
                    };
                }
                /**
                 * @param {!Object} res
                 * @param {number} bitmask
                 * @param {?} color
                 * @param {(Node|NodeList|string)} value
                 * @param {(Node|NodeList|string)} type
                 * @param {(Node|NodeList|string)} url
                 * @param {(Node|NodeList|string)} options
                 * @param {number} values
                 * @param {number} index
                 * @param {number} height
                 * @return {?}
                 */
                function check(res, bitmask, color, value, type, url, options, values, index, height) {
                    /**
                     * @return {?}
                     */
                    function wrapper() {
                        /** @type {number} */
                        var length = arguments.length;
                        /** @type {number} */
                        var i = length;
                        var args = Array(length);
                        for (; i--;) {
                            args[i] = arguments[i];
                        }
                        if (value && (args = composeArgs(args, value, type)), url && (args = composeArgsRight(args, url, options)), parent || pkg) {
                            var placeholder = wrapper.placeholder;
                            var name = concat(args, placeholder);
                            if ((length = length - name.length) < height) {
                                var title = values ? copyArray(values) : undefined;
                                var argsLength = nativeMax(height - length, 0);
                                var className = parent ? name : undefined;
                                var id = parent ? undefined : name;
                                var parentColor = parent ? args : undefined;
                                var url = parent ? undefined : args;
                                /** @type {number} */
                                bitmask = bitmask | (parent ? left : mask);
                                /** @type {number} */
                                bitmask = bitmask & ~(parent ? mask : left);
                                if (!isCurryBound) {
                                    /** @type {number} */
                                    bitmask = bitmask & ~(key | BIND_KEY_FLAG);
                                }
                                /** @type {!Array} */
                                var ret = [res, bitmask, color, parentColor, className, url, id, title, index, argsLength];
                                var result = check.apply(undefined, ret);
                                return isLaziable(res) && send(result, ret), result.placeholder = placeholder, result;
                            }
                        }
                        var col = isHex ? color : this;
                        var result = err ? col[res] : res;
                        return values && (args = reorder(args, values)), isAry && index < args.length && (args.length = index), this && this !== root && this instanceof wrapper && (result = config || extend(res)), result.apply(col, args);
                    }
                    /** @type {number} */
                    var isAry = bitmask & ARY_FLAG;
                    /** @type {number} */
                    var isHex = bitmask & key;
                    /** @type {number} */
                    var err = bitmask & BIND_KEY_FLAG;
                    /** @type {number} */
                    var parent = bitmask & CURRY_FLAG;
                    /** @type {number} */
                    var isCurryBound = bitmask & CURRY_BOUND_FLAG;
                    /** @type {number} */
                    var pkg = bitmask & name;
                    var config = err ? undefined : extend(res);
                    return wrapper;
                }
                /**
                 * @param {string} array
                 * @param {number} length
                 * @param {string} data
                 * @return {?}
                 */
                function repeat(array, length, data) {
                    var i = array.length;
                    if (length = +length, i >= length || !isNaN(length)) {
                        return "";
                    }
                    /** @type {number} */
                    var count = length - i;
                    return data = null == data ? " " : data + "", value(data, nativeCeil(count / data.length)).slice(0, count);
                }
                /**
                 * @param {!Function} module
                 * @param {number} op
                 * @param {?} context
                 * @param {!NodeList} options
                 * @return {?}
                 */
                function func(module, op, context, options) {
                    /**
                     * @return {?}
                     */
                    function value() {
                        /** @type {number} */
                        var index = -1;
                        /** @type {number} */
                        var argsLength = arguments.length;
                        /** @type {number} */
                        var i = -1;
                        var length = options.length;
                        var params = Array(length + argsLength);
                        for (; ++i < length;) {
                            params[i] = options[i];
                        }
                        for (; argsLength--;) {
                            params[i++] = arguments[++index];
                        }
                        return (this && this !== root && this instanceof value ? f : module).apply(Cconst ? context : this, params);
                    }
                    /** @type {number} */
                    var Cconst = op & key;
                    var f = extend(module);
                    return value;
                }
                /**
                 * @param {string} type
                 * @return {?}
                 */
                function decimalAdjust(type) {
                    var method = Math[type];
                    return function(path, progress) {
                        return progress = progress === undefined ? 0 : +progress || 0, progress ? (progress = $pow(10, progress), method(path * progress) / progress) : method(path);
                    };
                }
                /**
                 * @param {boolean} retHighest
                 * @return {?}
                 */
                function createSortedIndex(retHighest) {
                    return function(array, value, a, oldVal) {
                        var type = next(a);
                        return null == a && type === done ? binaryIndex(array, value, retHighest) : binaryIndexBy(array, value, type(a, oldVal, 1), retHighest);
                    };
                }
                /**
                 * @param {string} func
                 * @param {number} val
                 * @param {?} source
                 * @param {number} data
                 * @param {string} value
                 * @param {?} address
                 * @param {string} callback
                 * @param {number} index
                 * @return {?}
                 */
                function callback(func, val, source, data, value, address, callback, index) {
                    /** @type {number} */
                    var isBindKey = val & BIND_KEY_FLAG;
                    if (!isBindKey && "function" != typeof func) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    var length = data ? data.length : 0;
                    if (length || (val = val & ~(left | mask), data = value = undefined), length = length - (value ? value.length : 0), val & mask) {
                        /** @type {number} */
                        var name = data;
                        /** @type {string} */
                        var target = value;
                        data = value = undefined;
                    }
                    var type = isBindKey ? undefined : getData(func);
                    /** @type {!Array} */
                    var args = [func, val, source, data, value, name, target, address, callback, index];
                    if (type && (mergeData(args, type), val = args[1], index = args[9]), args[9] = null == index ? isBindKey ? 0 : func.length : nativeMax(index - length, 0) || 0, val == key) {
                        var element = create(args[0], args[2]);
                    } else {
                        element = val != left && val != (key | left) || args[4].length ? check.apply(undefined, args) : func.apply(undefined, args);
                    }
                    return (type ? add : send)(element, args);
                }
                /**
                 * @param {string} array
                 * @param {string} a
                 * @param {!Function} equalFunc
                 * @param {!Function} customizer
                 * @param {boolean} isLoose
                 * @param {!Array} stackA
                 * @param {!Array} stackB
                 * @return {?}
                 */
                function equalArrays(array, a, equalFunc, customizer, isLoose, stackA, stackB) {
                    /** @type {number} */
                    var index = -1;
                    var x = array.length;
                    var y = a.length;
                    if (x != y && !(isLoose && y > x)) {
                        return false;
                    }
                    for (; ++index < x;) {
                        var arrValue = array[index];
                        var othValue = a[index];
                        var newValue = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;
                        if (newValue !== undefined) {
                            if (newValue) {
                                continue;
                            }
                            return false;
                        }
                        if (isLoose) {
                            if (!equal(a, function(othValue) {
                                return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
                            })) {
                                return false;
                            }
                        } else {
                            if (arrValue !== othValue && !equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB)) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
                /**
                 * @param {?} object
                 * @param {string} other
                 * @param {string} tag
                 * @return {?}
                 */
                function equalByTag(object, other, tag) {
                    switch(tag) {
                        case arrayBufferTag:
                        case boolTag:
                            return +object == +other;
                        case errorTag:
                            return object.name == other.name && object.message == other.message;
                        case dateTag:
                            return object != +object ? other != +other : object == +other;
                        case regexpTag:
                        case numberTag:
                            return object == other + "";
                    }
                    return false;
                }
                /**
                 * @param {?} object
                 * @param {?} other
                 * @param {!Function} equalFunc
                 * @param {!Function} customizer
                 * @param {boolean} isLoose
                 * @param {!Array} stackA
                 * @param {!Array} stackB
                 * @return {?}
                 */
                function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
                    var props = keys(object);
                    var len = props.length;
                    if (len != keys(other).length && !isLoose) {
                        return false;
                    }
                    var i = len;
                    for (; i--;) {
                        var key = props[i];
                        if (!(isLoose ? key in other : self.call(other, key))) {
                            return false;
                        }
                    }
                    /** @type {boolean} */
                    var skipCtor = isLoose;
                    for (; ++i < len;) {
                        key = props[i];
                        var objValue = object[key];
                        var othValue = other[key];
                        var result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;
                        if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
                            return false;
                        }
                        if (!skipCtor) {
                            /** @type {boolean} */
                            skipCtor = "constructor" == key;
                        }
                    }
                    if (!skipCtor) {
                        var objCtor = object.constructor;
                        var othCtor = other.constructor;
                        if (objCtor != othCtor && "constructor" in object && "constructor" in other && !("function" == typeof objCtor && objCtor instanceof objCtor && "function" == typeof othCtor && othCtor instanceof othCtor)) {
                            return false;
                        }
                    }
                    return true;
                }
                /**
                 * @param {string} key
                 * @param {?} options
                 * @param {!Function} value
                 * @return {?}
                 */
                function next(key, options, value) {
                    /** @type {function(!Object, !Array, string): ?} */
                    var callback = exports.callback || noop;
                    return callback = callback === noop ? done : callback, value ? callback(key, options, value) : callback;
                }
                /**
                 * @param {!Object} name
                 * @return {?}
                 */
                function getFuncName(name) {
                    var funcName = name.name;
                    var m = o[funcName];
                    var t = m ? m.length : 0;
                    for (; t--;) {
                        var i = m[t];
                        var x = i.func;
                        if (null == x || x == name) {
                            return i.name;
                        }
                    }
                    return funcName;
                }
                /**
                 * @param {string} p
                 * @param {number} x
                 * @param {number} i
                 * @return {?}
                 */
                function exec(p, x, i) {
                    /** @type {function(!Object, number, number): ?} */
                    var f = exports.indexOf || indexOf;
                    return f = f === indexOf ? baseIndexOf : f, p ? f(p, x, i) : f;
                }
                /**
                 * @param {(!Function|string)} value
                 * @return {?}
                 */
                function equals(value) {
                    var result = pairs(value);
                    var n = result.length;
                    for (; n--;) {
                        result[n][2] = isEqual(result[n][1]);
                    }
                    return result;
                }
                /**
                 * @param {!Object} object
                 * @param {string} key
                 * @return {?}
                 */
                function getNative(object, key) {
                    var value = null == object ? undefined : object[key];
                    return isNative(value) ? value : undefined;
                }
                /**
                 * @param {string} start
                 * @param {number} end
                 * @param {!NodeList} step
                 * @return {?}
                 */
                function getView(start, end, step) {
                    /** @type {number} */
                    var j = -1;
                    var i = step.length;
                    for (; ++j < i;) {
                        var data = step[j];
                        var size = data.size;
                        switch(data.type) {
                            case "drop":
                                start = start + size;
                                break;
                            case "dropRight":
                                /** @type {number} */
                                end = end - size;
                                break;
                            case "take":
                                end = nativeMin(end, start + size);
                                break;
                            case "takeRight":
                                start = nativeMax(start, end - size);
                        }
                    }
                    return {
                        start : start,
                        end : end
                    };
                }
                /**
                 * @param {!Object} array
                 * @return {?}
                 */
                function initCloneArray(array) {
                    var length = array.length;
                    var result = new array.constructor(length);
                    return length && "string" == typeof array[0] && self.call(array, "index") && (result.index = array.index, result.input = array.input), result;
                }
                /**
                 * @param {!Node} object
                 * @return {?}
                 */
                function initCloneObject(object) {
                    var Ctor = object.constructor;
                    return "function" == typeof Ctor && Ctor instanceof Ctor || (Ctor = Object), new Ctor;
                }
                /**
                 * @param {!Object} object
                 * @param {?} tag
                 * @param {boolean} isDeep
                 * @return {?}
                 */
                function initCloneByTag(object, tag, isDeep) {
                    var Ctor = object.constructor;
                    switch(tag) {
                        case dataViewTag:
                            return bufferClone(object);
                        case arrayBufferTag:
                        case boolTag:
                            return new Ctor(+object);
                        case float32Tag:
                        case float32Tag$1:
                        case float64Tag:
                        case int8Tag:
                        case int32Tag:
                        case uint8Tag:
                        case uint8ClampedTag:
                        case uint16Tag:
                        case uint32Tag:
                            var buffer = object.buffer;
                            return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);
                        case dateTag:
                        case numberTag:
                            return new Ctor(object);
                        case regexpTag:
                            var result = new Ctor(object.source, reFlags.exec(object));
                            result.lastIndex = object.lastIndex;
                    }
                    return result;
                }
                /**
                 * @param {?} t
                 * @param {?} a
                 * @param {?} val
                 * @return {?}
                 */
                function P(t, a, val) {
                    if (!(null == t || isString(a, t))) {
                        a = match(a);
                        t = 1 == a.length ? t : apply(t, slice(a, 0, -1));
                        a = parseInt(a);
                    }
                    var target = null == t ? t : t[a];
                    return null == target ? undefined : target.apply(t, val);
                }
                /**
                 * @param {!Object} value
                 * @return {?}
                 */
                function isArrayLike(value) {
                    return null != value && isLength(getLength(value));
                }
                /**
                 * @param {?} s
                 * @param {number} i
                 * @return {?}
                 */
                function isIndex(s, i) {
                    return s = "number" == typeof s || regCls.test(s) ? +s : -1, i = null == i ? index : i, s > -1 && s % 1 == 0 && s < i;
                }
                /**
                 * @param {?} value
                 * @param {?} key
                 * @param {!Object} object
                 * @return {?}
                 */
                function cb(value, key, object) {
                    if (!isObject(object)) {
                        return false;
                    }
                    /** @type {string} */
                    var type = typeof key;
                    if ("number" == type ? isArrayLike(object) && isIndex(key, object.length) : "string" == type && key in object) {
                        var other = object[key];
                        return value === value ? value === other : other !== other;
                    }
                    return false;
                }
                /**
                 * @param {!Object} arg
                 * @param {?} str
                 * @return {?}
                 */
                function isString(arg, str) {
                    /** @type {string} */
                    var type = typeof arg;
                    return !!("string" == type && matchYearMonth.test(arg) || "number" == type) || !isArray(arg) && (!matchYearMonthDay.test(arg) || null != str && arg in resolve(str));
                }
                /**
                 * @param {!Object} func
                 * @return {?}
                 */
                function isLaziable(func) {
                    var funcName = getFuncName(func);
                    if (!(funcName in LazyWrapper.prototype)) {
                        return false;
                    }
                    var other = exports[funcName];
                    if (func === other) {
                        return true;
                    }
                    var data = getData(other);
                    return !!data && func === data[0];
                }
                /**
                 * @param {number} length
                 * @return {?}
                 */
                function isLength(length) {
                    return "number" == typeof length && length > -1 && length % 1 == 0 && length <= index;
                }
                /**
                 * @param {!Object} data
                 * @return {?}
                 */
                function isEqual(data) {
                    return data === data && !isObject(data);
                }
                /**
                 * @param {!Array} data
                 * @param {!Array} source
                 * @return {?}
                 */
                function mergeData(data, source) {
                    var bitmask = data[1];
                    var srcBitmask = source[1];
                    /** @type {number} */
                    var newBitmask = bitmask | srcBitmask;
                    /** @type {boolean} */
                    var isCommon = newBitmask < ARY_FLAG;
                    /** @type {boolean} */
                    var isReplayingSong = srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG || srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8] || srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG;
                    if (!isCommon && !isReplayingSong) {
                        return data;
                    }
                    if (srcBitmask & key) {
                        data[2] = source[2];
                        /** @type {number} */
                        newBitmask = newBitmask | (bitmask & key ? 0 : CURRY_BOUND_FLAG);
                    }
                    var value = source[3];
                    if (value) {
                        var partials = data[3];
                        data[3] = partials ? composeArgs(partials, value, source[4]) : copyArray(value);
                        data[4] = partials ? concat(data[3], o) : copyArray(source[4]);
                    }
                    return value = source[5], value && (partials = data[5], data[5] = partials ? composeArgsRight(partials, value, source[6]) : copyArray(value), data[6] = partials ? concat(data[5], o) : copyArray(source[6])), value = source[7], value && (data[7] = copyArray(value)), srcBitmask & ARY_FLAG && (data[8] = null == data[8] ? source[8] : nativeMin(data[8], source[8])), null == data[9] && (data[9] = source[9]), data[0] = source[0], data[1] = newBitmask, data;
                }
                /**
                 * @param {?} res
                 * @param {(UI|!Function)} v
                 * @return {?}
                 */
                function item(res, v) {
                    return res === undefined ? v : list(res, v, item);
                }
                /**
                 * @param {number} object
                 * @param {!NodeList} keys
                 * @return {?}
                 */
                function set(object, keys) {
                    object = resolve(object);
                    /** @type {number} */
                    var i = -1;
                    var length = keys.length;
                    var out = {};
                    for (; ++i < length;) {
                        var key = keys[i];
                        if (key in object) {
                            out[key] = object[key];
                        }
                    }
                    return out;
                }
                /**
                 * @param {number} string
                 * @param {!Function} fn
                 * @return {?}
                 */
                function expect(string, fn) {
                    var status = {};
                    return toString(string, function(part, item, callback) {
                        if (fn(part, item, callback)) {
                            status[item] = part;
                        }
                    }), status;
                }
                /**
                 * @param {!Object} values
                 * @param {number} array
                 * @return {?}
                 */
                function reorder(values, array) {
                    var length = values.length;
                    var index = nativeMin(array.length, length);
                    var collection = copyArray(values);
                    for (; index--;) {
                        var key = array[index];
                        values[index] = isIndex(key, length) ? collection[key] : undefined;
                    }
                    return values;
                }
                /**
                 * @param {?} object
                 * @return {?}
                 */
                function shimKeys(object) {
                    var props = keysIn(object);
                    var propsLength = props.length;
                    var length = propsLength && object.length;
                    var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));
                    /** @type {number} */
                    var index = -1;
                    /** @type {!Array} */
                    var result = [];
                    for (; ++index < propsLength;) {
                        var key = props[index];
                        if (allowIndexes && isIndex(key, length) || self.call(object, key)) {
                            result.push(key);
                        }
                    }
                    return result;
                }
                /**
                 * @param {?} req
                 * @return {?}
                 */
                function find(req) {
                    return null == req ? [] : isArrayLike(req) ? isObject(req) ? req : Object(req) : values(req);
                }
                /**
                 * @param {!Object} req
                 * @return {?}
                 */
                function resolve(req) {
                    return isObject(req) ? req : Object(req);
                }
                /**
                 * @param {!Object} a
                 * @return {?}
                 */
                function match(a) {
                    if (isArray(a)) {
                        return a;
                    }
                    /** @type {!Array} */
                    var pathArray = [];
                    return toString(a).replace(reNewLines, function(match, number, quote, string) {
                        pathArray.push(quote ? string.replace(reEscapeChar, "$1") : number || match);
                    }), pathArray;
                }
                /**
                 * @param {?} wrapper
                 * @return {?}
                 */
                function wrapperClone(wrapper) {
                    return wrapper instanceof LazyWrapper ? wrapper.clone() : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, copyArray(wrapper.__actions__));
                }
                /**
                 * @param {number} a
                 * @param {number} m
                 * @param {!Object} args
                 * @return {?}
                 */
                function range(a, m, args) {
                    m = (args ? cb(a, m, args) : null == m) ? 1 : nativeMax(floor(m) || 1, 1);
                    /** @type {number} */
                    var i = 0;
                    var l = a ? a.length : 0;
                    /** @type {number} */
                    var j = -1;
                    var result = Array(nativeCeil(l / m));
                    for (; i < l;) {
                        result[++j] = slice(a, i, i = i + m);
                    }
                    return result;
                }
                /**
                 * @param {number} refs
                 * @return {?}
                 */
                function compact(refs) {
                    /** @type {number} */
                    var i = -1;
                    var length = refs ? refs.length : 0;
                    /** @type {number} */
                    var ri = -1;
                    /** @type {!Array} */
                    var res = [];
                    for (; ++i < length;) {
                        var name = refs[i];
                        if (name) {
                            res[++ri] = name;
                        }
                    }
                    return res;
                }
                /**
                 * @param {number} data
                 * @param {number} e
                 * @param {!Object} fn
                 * @return {?}
                 */
                function drop(data, e, fn) {
                    return (data ? data.length : 0) ? ((fn ? cb(data, e, fn) : null == e) && (e = 1), slice(data, e < 0 ? 0 : e)) : [];
                }
                /**
                 * @param {number} data
                 * @param {number} index
                 * @param {!Object} callback
                 * @return {?}
                 */
                function raise(data, index, callback) {
                    var val = data ? data.length : 0;
                    return val ? ((callback ? cb(data, index, callback) : null == index) && (index = 1), index = val - (+index || 0), slice(data, 0, index < 0 ? 0 : index)) : [];
                }
                /**
                 * @param {!Array} err
                 * @param {string} response
                 * @param {?} id
                 * @return {?}
                 */
                function error(err, response, id) {
                    return err && err.length ? assert(err, next(response, id, 3), true, true) : [];
                }
                /**
                 * @param {!Array} array
                 * @param {string} f
                 * @param {?} data
                 * @return {?}
                 */
                function dropWhile(array, f, data) {
                    return array && array.length ? assert(array, next(f, data, 3), true) : [];
                }
                /**
                 * @param {number} path
                 * @param {?} name
                 * @param {number} options
                 * @param {undefined} value
                 * @return {?}
                 */
                function change(path, name, options, value) {
                    var dscr = path ? path.length : 0;
                    return dscr ? (options && "number" != typeof options && cb(path, name, options) && (options = 0, value = dscr), run(path, name, options, value)) : [];
                }
                /**
                 * @param {number} headers
                 * @return {?}
                 */
                function head(headers) {
                    return headers ? headers[0] : undefined;
                }
                /**
                 * @param {number} value
                 * @param {boolean} index
                 * @param {!Object} element
                 * @return {?}
                 */
                function flatten(value, index, element) {
                    var func = value ? value.length : 0;
                    return element && cb(value, index, element) && (index = false), func ? get(value, index) : [];
                }
                /**
                 * @param {number} array
                 * @return {?}
                 */
                function shuffle(array) {
                    return (array ? array.length : 0) ? get(array, true) : [];
                }
                /**
                 * @param {!Object} array
                 * @param {number} value
                 * @param {number} fromIndex
                 * @return {?}
                 */
                function indexOf(array, value, fromIndex) {
                    var length = array ? array.length : 0;
                    if (!length) {
                        return -1;
                    }
                    if ("number" == typeof fromIndex) {
                        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
                    } else {
                        if (fromIndex) {
                            var index = binaryIndex(array, value);
                            return index < length && (value === value ? value === array[index] : array[index] !== array[index]) ? index : -1;
                        }
                    }
                    return baseIndexOf(array, value, fromIndex || 0);
                }
                /**
                 * @param {undefined} result
                 * @return {?}
                 */
                function lex(result) {
                    return raise(result, 1);
                }
                /**
                 * @param {!Object} value
                 * @return {?}
                 */
                function parseInt(value) {
                    var method = value ? value.length : 0;
                    return method ? value[method - 1] : undefined;
                }
                /**
                 * @param {!Object} array
                 * @param {number} value
                 * @param {number} fromIndex
                 * @return {?}
                 */
                function lastIndexOf(array, value, fromIndex) {
                    var length = array ? array.length : 0;
                    if (!length) {
                        return -1;
                    }
                    var index = length;
                    if ("number" == typeof fromIndex) {
                        index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
                    } else {
                        if (fromIndex) {
                            /** @type {number} */
                            index = binaryIndex(array, value, true) - 1;
                            var other = array[index];
                            return (value === value ? value === other : other !== other) ? index : -1;
                        }
                    }
                    if (value !== value) {
                        return indexOfNaN(array, index, true);
                    }
                    for (; index--;) {
                        if (array[index] === value) {
                            return index;
                        }
                    }
                    return -1;
                }
                /**
                 * @return {?}
                 */
                function forIn() {
                    /** @type {!Arguments} */
                    var data = arguments;
                    var obj = data[0];
                    if (!obj || !obj.length) {
                        return obj;
                    }
                    /** @type {number} */
                    var jsonGraphEnvelopeIndex = 0;
                    var fn = exec();
                    /** @type {number} */
                    var jsonGraphEnvelopeCount = data.length;
                    for (; ++jsonGraphEnvelopeIndex < jsonGraphEnvelopeCount;) {
                        /** @type {number} */
                        var args = 0;
                        var partials = data[jsonGraphEnvelopeIndex];
                        for (; (args = fn(obj, partials, args)) > -1;) {
                            splice.call(obj, args, 1);
                        }
                    }
                    return obj;
                }
                /**
                 * @param {string} value
                 * @param {string} fn
                 * @param {?} process
                 * @return {?}
                 */
                function remove(value, fn, process) {
                    /** @type {!Array} */
                    var result = [];
                    if (!value || !value.length) {
                        return result;
                    }
                    /** @type {number} */
                    var i = -1;
                    /** @type {!Array} */
                    var array = [];
                    var l = value.length;
                    fn = next(fn, process, 3);
                    for (; ++i < l;) {
                        var tag = value[i];
                        if (fn(tag, i, value)) {
                            result.push(tag);
                            array.push(i);
                        }
                    }
                    return getPath(value, array), result;
                }
                /**
                 * @param {undefined} array
                 * @return {?}
                 */
                function tail(array) {
                    return drop(array, 1);
                }
                /**
                 * @param {number} data
                 * @param {number} b
                 * @param {!Array} n
                 * @return {?}
                 */
                function compare(data, b, n) {
                    var map = data ? data.length : 0;
                    return map ? (n && "number" != typeof n && cb(data, b, n) && (b = 0, n = map), slice(data, b, n)) : [];
                }
                /**
                 * @param {number} arr
                 * @param {number} value
                 * @param {!Object} fn
                 * @return {?}
                 */
                function take(arr, value, fn) {
                    return (arr ? arr.length : 0) ? ((fn ? cb(arr, value, fn) : null == value) && (value = 1), slice(arr, 0, value < 0 ? 0 : value)) : [];
                }
                /**
                 * @param {number} data
                 * @param {number} value
                 * @param {!Object} fn
                 * @return {?}
                 */
                function compute(data, value, fn) {
                    var size = data ? data.length : 0;
                    return size ? ((fn ? cb(data, value, fn) : null == value) && (value = 1), value = size - (+value || 0), slice(data, value < 0 ? 0 : value)) : [];
                }
                /**
                 * @param {!Array} db
                 * @param {string} name
                 * @param {?} result
                 * @return {?}
                 */
                function wrap(db, name, result) {
                    return db && db.length ? assert(db, next(name, result, 3), false, true) : [];
                }
                /**
                 * @param {!Array} a
                 * @param {string} name
                 * @param {?} b
                 * @return {?}
                 */
                function Event(a, name, b) {
                    return a && a.length ? assert(a, next(name, b, 3)) : [];
                }
                /**
                 * @param {number} obj
                 * @param {!Object} key
                 * @param {!Object} name
                 * @param {!Array} list
                 * @return {?}
                 */
                function join(obj, key, name, list) {
                    if (!(obj ? obj.length : 0)) {
                        return [];
                    }
                    if (null != key && "boolean" != typeof key) {
                        /** @type {!Object} */
                        list = name;
                        name = cb(obj, key, list) ? undefined : key;
                        /** @type {boolean} */
                        key = false;
                    }
                    var quote = next();
                    return null == name && quote === done || (name = quote(name, list, 3)), key && exec() == baseIndexOf ? register(obj, name) : each(obj, name);
                }
                /**
                 * @param {string} value
                 * @return {?}
                 */
                function unzip(value) {
                    if (!value || !value.length) {
                        return [];
                    }
                    /** @type {number} */
                    var index = -1;
                    /** @type {number} */
                    var length = 0;
                    value = s(value, function(group) {
                        if (isArrayLike(group)) {
                            return length = nativeMax(group.length, length), true;
                        }
                    });
                    var result = Array(length);
                    for (; ++index < length;) {
                        result[index] = copy(value, baseProperty(index));
                    }
                    return result;
                }
                /**
                 * @param {number} array
                 * @param {!Object} iteratee
                 * @param {?} thisArg
                 * @return {?}
                 */
                function unzipWith(array, iteratee, thisArg) {
                    if (!(array ? array.length : 0)) {
                        return [];
                    }
                    var path = unzip(array);
                    return null == iteratee ? path : (iteratee = $(iteratee, thisArg, 4), copy(path, function(array) {
                        return arrayReduce(array, iteratee, undefined, true);
                    }));
                }
                /**
                 * @return {?}
                 */
                function any() {
                    /** @type {number} */
                    var i = -1;
                    /** @type {number} */
                    var length = arguments.length;
                    for (; ++i < length;) {
                        var obj = arguments[i];
                        if (isArrayLike(obj)) {
                            var key = key ? merge(fn(key, obj), fn(obj, key)) : obj;
                        }
                    }
                    return key ? each(key) : [];
                }
                /**
                 * @param {number} keys
                 * @param {number} vals
                 * @return {?}
                 */
                function zipObject(keys, vals) {
                    /** @type {number} */
                    var i = -1;
                    var len = keys ? keys.length : 0;
                    var result = {};
                    if (!(!len || vals || isArray(keys[0]))) {
                        /** @type {!Array} */
                        vals = [];
                    }
                    for (; ++i < len;) {
                        var key = keys[i];
                        if (vals) {
                            result[key] = vals[i];
                        } else {
                            if (key) {
                                result[key[0]] = key[1];
                            }
                        }
                    }
                    return result;
                }
                /**
                 * @param {?} selector
                 * @return {?}
                 */
                function chain(selector) {
                    var result = exports(selector);
                    return result.__chain__ = true, result;
                }
                /**
                 * @param {?} t
                 * @param {!Function} button
                 * @param {?} callback
                 * @return {?}
                 */
                function tap(t, button, callback) {
                    return button.call(callback, t), t;
                }
                /**
                 * @param {!Function} name
                 * @param {!Function} fn
                 * @param {!Array} value
                 * @return {?}
                 */
                function progress(name, fn, value) {
                    return fn.call(value, name);
                }
                /**
                 * @return {?}
                 */
                function wrapperChain() {
                    return chain(this);
                }
                /**
                 * @return {?}
                 */
                function lodashWrapper() {
                    return new LodashWrapper(this.value(), this.__chain__);
                }
                /**
                 * @param {?} value
                 * @return {?}
                 */
                function wrapperPlant(value) {
                    var result;
                    var parent = this;
                    for (; parent instanceof lodash;) {
                        var clone = wrapperClone(parent);
                        if (result) {
                            previous.__wrapped__ = clone;
                        } else {
                            result = clone;
                        }
                        var previous = clone;
                        parent = parent.__wrapped__;
                    }
                    return previous.__wrapped__ = value, result;
                }
                /**
                 * @return {?}
                 */
                function wrapperReverse() {
                    var value = this.__wrapped__;
                    /**
                     * @param {(Object|string)} value
                     * @return {?}
                     */
                    var req = function(value) {
                        return wrapped && wrapped.__dir__ < 0 ? value : value.reverse();
                    };
                    if (value instanceof LazyWrapper) {
                        var wrapped = value;
                        return this.__actions__.length && (wrapped = new LazyWrapper(this)), wrapped = wrapped.reverse(), wrapped.__actions__.push({
                            func : progress,
                            args : [req],
                            thisArg : undefined
                        }), new LodashWrapper(wrapped, this.__chain__);
                    }
                    return this.thru(req);
                }
                /**
                 * @return {?}
                 */
                function toStringBench() {
                    return this.value() + "";
                }
                /**
                 * @return {?}
                 */
                function wrapperValue() {
                    return baseWrapperValue(this.__wrapped__, this.__actions__);
                }
                /**
                 * @param {!Array} t
                 * @param {undefined} id
                 * @param {?} n
                 * @return {?}
                 */
                function every(t, id, n) {
                    /** @type {function(!Array, !Function): ?} */
                    var r = isArray(t) ? ok : f;
                    return n && cb(t, id, n) && (id = undefined), "function" == typeof id && n === undefined || (id = next(id, n, 3)), r(t, id);
                }
                /**
                 * @param {!Array} data
                 * @param {string} key
                 * @param {?} o
                 * @return {?}
                 */
                function filter(data, key, o) {
                    /** @type {function(?, string): ?} */
                    var append = isArray(data) ? s : x;
                    return key = next(key, o, 3), append(data, key);
                }
                /**
                 * @param {?} o
                 * @param {undefined} value
                 * @return {?}
                 */
                function isUndefined(o, value) {
                    return detect(o, process(value));
                }
                /**
                 * @param {string} value
                 * @param {!Array} id
                 * @param {number} index
                 * @param {?} data
                 * @return {?}
                 */
                function contains(value, id, index, data) {
                    var length = value ? getLength(value) : 0;
                    return isLength(length) || (value = values(value), length = value.length), index = "number" != typeof index || data && cb(id, index, data) ? 0 : index < 0 ? nativeMax(length + index, 0) : index || 0, "string" == typeof value || !isArray(value) && isNumber(value) ? index <= length && value.indexOf(id, index) > -1 : !!length && exec(value, id, index) > -1;
                }
                /**
                 * @param {string} key
                 * @param {!Function} e
                 * @param {(Object|string)} element
                 * @return {?}
                 */
                function map(key, e, element) {
                    /** @type {function(string, !Function): ?} */
                    var action = isArray(key) ? copy : del;
                    return e = next(e, element, 3), action(key, e);
                }
                /**
                 * @param {!Function} obj
                 * @param {undefined} key
                 * @return {?}
                 */
                function pluck(obj, key) {
                    return map(obj, select(key));
                }
                /**
                 * @param {!Error} t
                 * @param {string} o
                 * @param {?} n
                 * @return {?}
                 */
                function r(t, o, n) {
                    /** @type {function(?, string): ?} */
                    var p = isArray(t) ? s : x;
                    return o = next(o, n, 3), p(t, function(t, context, data) {
                        return !o(t, context, data);
                    });
                }
                /**
                 * @param {!Array} array
                 * @param {number} n
                 * @param {!Object} guard
                 * @return {?}
                 */
                function setValue(array, n, guard) {
                    if (guard ? cb(array, n, guard) : null == n) {
                        array = find(array);
                        var length = array.length;
                        return length > 0 ? array[baseRandom(0, length - 1)] : undefined;
                    }
                    /** @type {number} */
                    var index = -1;
                    var result = toArray(array);
                    length = result.length;
                    /** @type {number} */
                    var max = length - 1;
                    n = nativeMin(n < 0 ? 0 : +n || 0, length);
                    for (; ++index < n;) {
                        var rand = baseRandom(index, max);
                        var tmp = result[rand];
                        result[rand] = result[index];
                        result[index] = tmp;
                    }
                    return result.length = n, result;
                }
                /**
                 * @param {undefined} value
                 * @return {?}
                 */
                function formatNumber(value) {
                    return setValue(value, count);
                }
                /**
                 * @param {number} value
                 * @return {?}
                 */
                function size(value) {
                    var length = value ? getLength(value) : 0;
                    return isLength(length) ? length : keys(value).length;
                }
                /**
                 * @param {undefined} callback
                 * @param {undefined} id
                 * @param {?} obj
                 * @return {?}
                 */
                function some(callback, id, obj) {
                    /** @type {function(string, !Function): ?} */
                    var init = isArray(callback) ? equal : query;
                    return obj && cb(callback, id, obj) && (id = undefined), "function" == typeof id && obj === undefined || (id = next(id, obj, 3)), init(callback, id);
                }
                /**
                 * @param {string} data
                 * @param {undefined} callback
                 * @param {?} context
                 * @return {?}
                 */
                function sortBy(data, callback, context) {
                    if (null == data) {
                        return [];
                    }
                    if (context && cb(data, callback, context)) {
                        callback = undefined;
                    }
                    /** @type {number} */
                    var index = -1;
                    return callback = next(callback, context, 3), sort(del(data, function(req, value, data) {
                        return {
                            criteria : callback(req, value, data),
                            index : ++index,
                            value : req
                        };
                    }), compare);
                }
                /**
                 * @param {string} err
                 * @param {?} e
                 * @param {!Object} index
                 * @param {!Object} context
                 * @return {?}
                 */
                function abort(err, e, index, context) {
                    return null == err ? [] : (context && cb(e, index, context) && (index = undefined), isArray(e) || (e = null == e ? [] : [e]), isArray(index) || (index = null == index ? [] : [index]), cleanup(err, e, index));
                }
                /**
                 * @param {undefined} array
                 * @param {undefined} value
                 * @return {?}
                 */
                function where(array, value) {
                    return filter(array, process(value));
                }
                /**
                 * @param {string} n
                 * @param {string} callback
                 * @return {?}
                 */
                function after(n, callback) {
                    if ("function" != typeof callback) {
                        if ("function" != typeof n) {
                            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                        }
                        var namespace = n;
                        /** @type {string} */
                        n = callback;
                        callback = namespace;
                    }
                    return n = isNaN(n = +n) ? n : 0, function() {
                        if (--n < 1) {
                            return callback.apply(this, arguments);
                        }
                    };
                }
                /**
                 * @param {string} array
                 * @param {string} options
                 * @param {!Object} guard
                 * @return {?}
                 */
                function initial(array, options, guard) {
                    return guard && cb(array, options, guard) && (options = undefined), options = array && null == options ? array.length : nativeMax(+options || 0, 0), callback(array, ARY_FLAG, undefined, undefined, undefined, undefined, options);
                }
                /**
                 * @param {!Object} callback
                 * @param {string} fn
                 * @return {?}
                 */
                function on(callback, fn) {
                    var _ref12;
                    if ("function" != typeof fn) {
                        if ("function" != typeof callback) {
                            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                        }
                        var prop = callback;
                        callback = fn;
                        fn = prop;
                    }
                    return function() {
                        return --callback > 0 && (_ref12 = fn.apply(this, arguments)), callback <= 1 && (fn = undefined), _ref12;
                    };
                }
                /**
                 * @param {!Function} fn
                 * @param {number} wait
                 * @param {!Object} options
                 * @return {?}
                 */
                function debounce(fn, wait, options) {
                    /**
                     * @return {undefined}
                     */
                    function cancel() {
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }
                        if (maxTimeoutId) {
                            clearTimeout(maxTimeoutId);
                        }
                        /** @type {number} */
                        lastCalled = 0;
                        maxTimeoutId = timeoutId = trailingCall = undefined;
                    }
                    /**
                     * @param {boolean} isCalled
                     * @param {?} id
                     * @return {undefined}
                     */
                    function complete(isCalled, id) {
                        if (id) {
                            clearTimeout(id);
                        }
                        maxTimeoutId = timeoutId = trailingCall = undefined;
                        if (isCalled) {
                            lastCalled = now();
                            func = fn.apply(context, args);
                            if (!(timeoutId || maxTimeoutId)) {
                                args = context = undefined;
                            }
                        }
                    }
                    /**
                     * @return {undefined}
                     */
                    function delayed() {
                        /** @type {number} */
                        var remaining = wait - (now() - stamp);
                        if (remaining <= 0 || remaining > wait) {
                            complete(trailingCall, maxTimeoutId);
                        } else {
                            timeoutId = setTimeout(delayed, remaining);
                        }
                    }
                    /**
                     * @return {undefined}
                     */
                    function maxDelayed() {
                        complete(trailing, timeoutId);
                    }
                    /**
                     * @return {?}
                     */
                    function debounced() {
                        if (args = arguments, stamp = now(), context = this, trailingCall = trailing && (timeoutId || !leading), false === maxWait) {
                            var leadingCall = leading && !timeoutId;
                        } else {
                            if (!(maxTimeoutId || leading)) {
                                lastCalled = stamp;
                            }
                            /** @type {number} */
                            var remaining = maxWait - (stamp - lastCalled);
                            /** @type {boolean} */
                            var okval = remaining <= 0 || remaining > maxWait;
                            if (okval) {
                                if (maxTimeoutId) {
                                    maxTimeoutId = clearTimeout(maxTimeoutId);
                                }
                                lastCalled = stamp;
                                func = fn.apply(context, args);
                            } else {
                                if (!maxTimeoutId) {
                                    maxTimeoutId = setTimeout(maxDelayed, remaining);
                                }
                            }
                        }
                        return okval && timeoutId ? timeoutId = clearTimeout(timeoutId) : timeoutId || wait === maxWait || (timeoutId = setTimeout(delayed, wait)), leadingCall && (okval = true, func = fn.apply(context, args)), !okval || timeoutId || maxTimeoutId || (args = context = undefined), func;
                    }
                    var args;
                    var maxTimeoutId;
                    var func;
                    var stamp;
                    var context;
                    var timeoutId;
                    var trailingCall;
                    /** @type {number} */
                    var lastCalled = 0;
                    /** @type {boolean} */
                    var maxWait = false;
                    /** @type {boolean} */
                    var trailing = true;
                    if ("function" != typeof fn) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    if (wait = wait < 0 ? 0 : +wait || 0, true === options) {
                        /** @type {boolean} */
                        var leading = true;
                        /** @type {boolean} */
                        trailing = false;
                    } else {
                        if (isObject(options)) {
                            /** @type {boolean} */
                            leading = !!options.leading;
                            maxWait = "maxWait" in options && nativeMax(+options.maxWait || 0, wait);
                            /** @type {boolean} */
                            trailing = "trailing" in options ? !!options.trailing : trailing;
                        }
                    }
                    return debounced.cancel = cancel, debounced;
                }
                /**
                 * @param {!Function} callback
                 * @param {!Function} fn
                 * @return {?}
                 */
                function memoize(callback, fn) {
                    if ("function" != typeof callback || fn && "function" != typeof fn) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    /**
                     * @return {?}
                     */
                    var memoized = function() {
                        /** @type {!Arguments} */
                        var value = arguments;
                        var key = fn ? fn.apply(this, value) : value[0];
                        var cache = memoized.cache;
                        if (cache.has(key)) {
                            return cache.get(key);
                        }
                        var result = callback.apply(this, value);
                        return memoized.cache = cache.set(key, result), result;
                    };
                    return memoized.cache = new memoize.Cache, memoized;
                }
                /**
                 * @param {!Function} fn
                 * @return {?}
                 */
                function negate(fn) {
                    if ("function" != typeof fn) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    return function() {
                        return !fn.apply(this, arguments);
                    };
                }
                /**
                 * @param {string} type
                 * @return {?}
                 */
                function once(type) {
                    return on(2, type);
                }
                /**
                 * @param {!Function} callback
                 * @param {string} start
                 * @return {?}
                 */
                function rest(callback, start) {
                    if ("function" != typeof callback) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    return start = nativeMax(start === undefined ? callback.length - 1 : +start || 0, 0), function() {
                        /** @type {!Arguments} */
                        var items = arguments;
                        /** @type {number} */
                        var index = -1;
                        var length = nativeMax(items.length - start, 0);
                        var data = Array(length);
                        for (; ++index < length;) {
                            data[index] = items[start + index];
                        }
                        switch(start) {
                            case 0:
                                return callback.call(this, data);
                            case 1:
                                return callback.call(this, items[0], data);
                            case 2:
                                return callback.call(this, items[0], items[1], data);
                        }
                        var params = Array(start + 1);
                        /** @type {number} */
                        index = -1;
                        for (; ++index < start;) {
                            params[index] = items[index];
                        }
                        return params[start] = data, callback.apply(this, params);
                    };
                }
                /**
                 * @param {!Function} fn
                 * @return {?}
                 */
                function spread(fn) {
                    if ("function" != typeof fn) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    return function(extraInputs) {
                        return fn.apply(this, extraInputs);
                    };
                }
                /**
                 * @param {!Function} fn
                 * @param {undefined} wait
                 * @param {!Object} options
                 * @return {?}
                 */
                function throttle(fn, wait, options) {
                    /** @type {boolean} */
                    var leading = true;
                    /** @type {boolean} */
                    var trailing = true;
                    if ("function" != typeof fn) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    return false === options ? leading = false : isObject(options) && (leading = "leading" in options ? !!options.leading : leading, trailing = "trailing" in options ? !!options.trailing : trailing), debounce(fn, wait, {
                        leading : leading,
                        maxWait : +wait,
                        trailing : trailing
                    });
                }
                /**
                 * @param {?} i
                 * @param {!Function} name
                 * @return {?}
                 */
                function last(i, name) {
                    return name = null == name ? data : name, callback(name, left, undefined, [i], []);
                }
                /**
                 * @param {(Object|string)} err
                 * @param {!Object} data
                 * @param {!Object} r
                 * @param {!Object} n
                 * @return {?}
                 */
                function walk(err, data, r, n) {
                    return data && "boolean" != typeof data && cb(err, data, r) ? data = false : "function" == typeof data && (n = r, r = data, data = false), "function" == typeof r ? baseClone(err, data, $(r, n, 1)) : baseClone(err, data);
                }
                /**
                 * @param {!Object} fn
                 * @param {!Function} handler
                 * @param {?} value
                 * @return {?}
                 */
                function cloneDeep(fn, handler, value) {
                    return "function" == typeof handler ? baseClone(fn, true, $(handler, value, 1)) : baseClone(fn, true);
                }
                /**
                 * @param {(Date|number)} s
                 * @param {!Date} num
                 * @return {?}
                 */
                function gt(s, num) {
                    return s > num;
                }
                /**
                 * @param {(boolean|number|string)} p
                 * @param {(boolean|number|string)} v
                 * @return {?}
                 */
                function prefix(p, v) {
                    return p >= v;
                }
                /**
                 * @param {?} value
                 * @return {?}
                 */
                function isArguments(value) {
                    return isObjectLike(value) && isArrayLike(value) && self.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
                }
                /**
                 * @param {?} value
                 * @return {?}
                 */
                function isBoolean(value) {
                    return true === value || false === value || isObjectLike(value) && hasOwnProperty.call(value) == arrayBufferTag;
                }
                /**
                 * @param {(Object|string)} value
                 * @return {?}
                 */
                function isDate(value) {
                    return isObjectLike(value) && hasOwnProperty.call(value) == boolTag;
                }
                /**
                 * @param {?} value
                 * @return {?}
                 */
                function isElement(value) {
                    return !!value && 1 === value.nodeType && isObjectLike(value) && !isPlainObject(value);
                }
                /**
                 * @param {?} value
                 * @return {?}
                 */
                function isEmpty(value) {
                    return null == value || (isArrayLike(value) && (isArray(value) || isNumber(value) || isArguments(value) || isObjectLike(value) && isFunction(value.splice)) ? !value.length : !keys(value).length);
                }
                /**
                 * @param {undefined} req
                 * @param {undefined} data
                 * @param {undefined} callback
                 * @param {?} e
                 * @return {?}
                 */
                function min(req, data, callback, e) {
                    callback = "function" == typeof callback ? $(callback, e, 3) : undefined;
                    var result = callback ? callback(req, data) : undefined;
                    return result === undefined ? baseIsEqual(req, data, callback) : !!result;
                }
                /**
                 * @param {?} value
                 * @return {?}
                 */
                function isError(value) {
                    return isObjectLike(value) && "string" == typeof value.message && hasOwnProperty.call(value) == errorTag;
                }
                /**
                 * @param {number} val
                 * @return {?}
                 */
                function isFinite(val) {
                    return "number" == typeof val && isNaN(val);
                }
                /**
                 * @param {!Array} value
                 * @return {?}
                 */
                function isFunction(value) {
                    return isObject(value) && hasOwnProperty.call(value) == funcTag;
                }
                /**
                 * @param {!Object} obj
                 * @return {?}
                 */
                function isObject(obj) {
                    /** @type {string} */
                    var type = typeof obj;
                    return !!obj && ("object" == type || "function" == type);
                }
                /**
                 * @param {undefined} type
                 * @param {!Arguments} key
                 * @param {undefined} callback
                 * @param {?} e
                 * @return {?}
                 */
                function isMatch(type, key, callback, e) {
                    return callback = "function" == typeof callback ? $(callback, e, 3) : undefined, search(type, equals(key), callback);
                }
                /**
                 * @param {?} a
                 * @return {?}
                 */
                function eq(a) {
                    return normalize(a) && a != +a;
                }
                /**
                 * @param {?} value
                 * @return {?}
                 */
                function isNative(value) {
                    return null != value && (isFunction(value) ? reIsNative.test(opts.call(value)) : isObjectLike(value) && trueRE.test(value));
                }
                /**
                 * @param {!Object} val
                 * @return {?}
                 */
                function isNull(val) {
                    return null === val;
                }
                /**
                 * @param {?} value
                 * @return {?}
                 */
                function normalize(value) {
                    return "number" == typeof value || isObjectLike(value) && hasOwnProperty.call(value) == dateTag;
                }
                /**
                 * @param {?} value
                 * @return {?}
                 */
                function isPlainObject(value) {
                    var ctor;
                    if (!isObjectLike(value) || hasOwnProperty.call(value) != a || isArguments(value) || !self.call(value, "constructor") && "function" == typeof(ctor = value.constructor) && !(ctor instanceof ctor)) {
                        return false;
                    }
                    var result;
                    return toString(value, function(canCreateDiscussions, textCode) {
                        result = textCode;
                    }), result === undefined || self.call(value, result);
                }
                /**
                 * @param {(Object|string)} value
                 * @return {?}
                 */
                function isRegExp(value) {
                    return isObject(value) && hasOwnProperty.call(value) == regexpTag;
                }
                /**
                 * @param {?} value
                 * @return {?}
                 */
                function isNumber(value) {
                    return "string" == typeof value || isObjectLike(value) && hasOwnProperty.call(value) == numberTag;
                }
                /**
                 * @param {!Object} value
                 * @return {?}
                 */
                function isTypedArray(value) {
                    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[hasOwnProperty.call(value)];
                }
                /**
                 * @param {?} length
                 * @return {?}
                 */
                function toPaddedString(length) {
                    return length === undefined;
                }
                /**
                 * @param {(boolean|number|string)} b
                 * @param {(boolean|number|string)} a
                 * @return {?}
                 */
                function max(b, a) {
                    return b < a;
                }
                /**
                 * @param {(boolean|number|string)} b
                 * @param {(boolean|number|string)} a
                 * @return {?}
                 */
                function lte(b, a) {
                    return b <= a;
                }
                /**
                 * @param {!Array} value
                 * @return {?}
                 */
                function toArray(value) {
                    var length = value ? getLength(value) : 0;
                    return isLength(length) ? length ? copyArray(value) : [] : values(value);
                }
                /**
                 * @param {?} obj
                 * @return {?}
                 */
                function toPlainObject(obj) {
                    return pick(obj, keysIn(obj));
                }
                /**
                 * @param {?} id
                 * @param {!Array} properties
                 * @param {!Object} data
                 * @return {?}
                 */
                function createContext(id, properties, data) {
                    var result = baseCreate(id);
                    return data && cb(id, properties, data) && (properties = undefined), properties ? assign(result, properties) : result;
                }
                /**
                 * @param {?} object
                 * @return {?}
                 */
                function functions(object) {
                    return copyObject(object, keysIn(object));
                }
                /**
                 * @param {string} name
                 * @param {string} f
                 * @param {(Object|string)} data
                 * @return {?}
                 */
                function action(name, f, data) {
                    var result = null == name ? undefined : apply(name, match(f), f + "");
                    return result === undefined ? data : result;
                }
                /**
                 * @param {?} object
                 * @param {!Object} a
                 * @return {?}
                 */
                function validate(object, a) {
                    if (null == object) {
                        return false;
                    }
                    var actual = self.call(object, a);
                    if (!actual && !isString(a)) {
                        if (a = match(a), null == (object = 1 == a.length ? object : apply(object, slice(a, 0, -1)))) {
                            return false;
                        }
                        a = parseInt(a);
                        actual = self.call(object, a);
                    }
                    return actual || isLength(object.length) && isIndex(a, object.length) && (isArray(object) || isArguments(object));
                }
                /**
                 * @param {?} val
                 * @param {!Array} node
                 * @param {!Object} value
                 * @return {?}
                 */
                function invert(val, node, value) {
                    if (value && cb(val, node, value)) {
                        node = undefined;
                    }
                    /** @type {number} */
                    var i = -1;
                    var ks = keys(val);
                    var length = ks.length;
                    var result = {};
                    for (; ++i < length;) {
                        var key = ks[i];
                        var value = val[key];
                        if (node) {
                            if (self.call(result, value)) {
                                result[value].push(key);
                            } else {
                                /** @type {!Array} */
                                result[value] = [key];
                            }
                        } else {
                            result[value] = key;
                        }
                    }
                    return result;
                }
                /**
                 * @param {?} req
                 * @return {?}
                 */
                function keysIn(req) {
                    if (null == req) {
                        return [];
                    }
                    if (!isObject(req)) {
                        req = Object(req);
                    }
                    var length = req.length;
                    length = length && isLength(length) && (isArray(req) || isArguments(req)) && length || 0;
                    var ctx = req.constructor;
                    /** @type {number} */
                    var i = -1;
                    /** @type {boolean} */
                    var index = "function" == typeof ctx && ctx.prototype === req;
                    var result = Array(length);
                    /** @type {boolean} */
                    var skipIndexes = length > 0;
                    for (; ++i < length;) {
                        /** @type {string} */
                        result[i] = i + "";
                    }
                    var key;
                    for (key in req) {
                        if (!(skipIndexes && isIndex(key, length) || "constructor" == key && (index || !self.call(req, key)))) {
                            result.push(key);
                        }
                    }
                    return result;
                }
                /**
                 * @param {?} object
                 * @return {?}
                 */
                function pairs(object) {
                    object = resolve(object);
                    /** @type {number} */
                    var i = -1;
                    var props = keys(object);
                    var length = props.length;
                    var result = Array(length);
                    for (; ++i < length;) {
                        var key = props[i];
                        /** @type {!Array} */
                        result[i] = [key, object[key]];
                    }
                    return result;
                }
                /**
                 * @param {?} obj
                 * @param {?} f
                 * @param {(Object|string)} type
                 * @return {?}
                 */
                function reset(obj, f, type) {
                    var value = null == obj ? undefined : obj[f];
                    return value === undefined && (null == obj || isString(f, obj) || (f = match(f), obj = 1 == f.length ? obj : apply(obj, slice(f, 0, -1)), value = null == obj ? undefined : obj[parseInt(f)]), value = value === undefined ? type : value), isFunction(value) ? value.call(obj) : value;
                }
                /**
                 * @param {?} v
                 * @param {number} obj
                 * @param {number} data
                 * @return {?}
                 */
                function _set(v, obj, data) {
                    if (null == v) {
                        return v;
                    }
                    /** @type {string} */
                    var id = obj + "";
                    obj = null != v[id] || isString(obj, v) ? [id] : match(obj);
                    /** @type {number} */
                    var j = -1;
                    var i = obj.length;
                    /** @type {number} */
                    var position = i - 1;
                    var result = v;
                    for (; null != result && ++j < i;) {
                        var type = obj[j];
                        if (isObject(result)) {
                            if (j == position) {
                                /** @type {number} */
                                result[type] = data;
                            } else {
                                if (null == result[type]) {
                                    /** @type {(Array|{})} */
                                    result[type] = isIndex(obj[j + 1]) ? [] : {};
                                }
                            }
                        }
                        result = result[type];
                    }
                    return v;
                }
                /**
                 * @param {?} object
                 * @param {string} f
                 * @param {!Object} result
                 * @param {?} data
                 * @return {?}
                 */
                function transform(object, f, result, data) {
                    var isArr = isArray(object) || isTypedArray(object);
                    if (f = next(f, data, 4), null == result) {
                        if (isArr || isObject(object)) {
                            var Ctor = object.constructor;
                            result = isArr ? isArray(object) ? new Ctor : [] : baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
                        } else {
                            result = {};
                        }
                    }
                    return (isArr ? forEach : forOwn)(object, function(wholeDoc, was_new, e) {
                        return f(result, wholeDoc, was_new, e);
                    }), result;
                }
                /**
                 * @param {?} object
                 * @return {?}
                 */
                function values(object) {
                    return baseValues(object, keys(object));
                }
                /**
                 * @param {?} object
                 * @return {?}
                 */
                function toPairsIn(object) {
                    return baseValues(object, keysIn(object));
                }
                /**
                 * @param {?} value
                 * @param {number} start
                 * @param {number} end
                 * @return {?}
                 */
                function inRange(value, start, end) {
                    return start = +start || 0, end === undefined ? (end = start, start = 0) : end = +end || 0, value >= nativeMin(start, end) && value < nativeMax(start, end);
                }
                /**
                 * @param {number} min
                 * @param {number} max
                 * @param {!Object} floating
                 * @return {?}
                 */
                function random(min, max, floating) {
                    if (floating && cb(min, max, floating)) {
                        max = floating = undefined;
                    }
                    /** @type {boolean} */
                    var reverseIsSingle = null == min;
                    /** @type {boolean} */
                    var reverseValue = null == max;
                    if (null == floating && (reverseValue && "boolean" == typeof min ? (floating = min, min = 1) : "boolean" == typeof max && (floating = max, reverseValue = true)), reverseIsSingle && reverseValue && (max = 1, reverseValue = false), min = +min || 0, reverseValue ? (max = min, min = 0) : max = +max || 0, floating || min % 1 || max % 1) {
                        var rand = nativeRandom();
                        return nativeMin(min + rand * (max - min + parseFloat("1e-" + ((rand + "").length - 1))), max);
                    }
                    return baseRandom(min, max);
                }
                /**
                 * @param {string} string
                 * @return {?}
                 */
                function capitalize(string) {
                    return (string = toString(string)) && string.charAt(0).toUpperCase() + string.slice(1);
                }
                /**
                 * @param {string} value
                 * @return {?}
                 */
                function reject(value) {
                    return (value = toString(value)) && value.replace(rbreakright, page).replace(reTabs, "");
                }
                /**
                 * @param {string} target
                 * @param {string} string
                 * @param {number} position
                 * @return {?}
                 */
                function endsWith(target, string, position) {
                    target = toString(target);
                    /** @type {string} */
                    string = string + "";
                    var length = target.length;
                    return position = position === undefined ? length : nativeMin(position < 0 ? 0 : +position || 0, length), (position = position - string.length) >= 0 && target.indexOf(string, position) == position;
                }
                /**
                 * @param {string} str
                 * @return {?}
                 */
                function escape(str) {
                    return str = toString(str), str && r.test(str) ? str.replace(reUnescapedHtml, escapeHtmlChar) : str;
                }
                /**
                 * @param {string} string
                 * @return {?}
                 */
                function escapeRegExp(string) {
                    return string = toString(string), string && reHasEscapedHtml.test(string) ? string.replace(reRegExpChars, unescapeHtmlChar) : string || "(?:)";
                }
                /**
                 * @param {string} text
                 * @param {number} value
                 * @param {string} line
                 * @return {?}
                 */
                function pad(text, value, line) {
                    text = toString(text);
                    /** @type {number} */
                    value = +value;
                    var to = text.length;
                    if (to >= value || !isNaN(value)) {
                        return text;
                    }
                    /** @type {number} */
                    var mid = (value - to) / 2;
                    var index = floor(mid);
                    return line = repeat("", nativeCeil(mid), line), line.slice(0, index) + text + line;
                }
                /**
                 * @param {boolean} string
                 * @param {number} id
                 * @param {!Object} type
                 * @return {?}
                 */
                function serialize(string, id, type) {
                    return (type ? cb(string, id, type) : null == id) ? id = 0 : id && (id = +id), string = trim(string), $parseInt(string, id || (existingSpanRegExp.test(string) ? 16 : 10));
                }
                /**
                 * @param {string} value
                 * @param {number} delta
                 * @return {?}
                 */
                function value(value, delta) {
                    /** @type {string} */
                    var buffer = "";
                    if (value = toString(value), (delta = +delta) < 1 || !value || !isNaN(delta)) {
                        return buffer;
                    }
                    do {
                        if (delta % 2) {
                            /** @type {string} */
                            buffer = buffer + value;
                        }
                        delta = floor(delta / 2);
                        value = value + value;
                    } while (delta);
                    return buffer;
                }
                /**
                 * @param {string} string
                 * @param {!Object} key
                 * @param {number} value
                 * @return {?}
                 */
                function startsWith(string, key, value) {
                    return string = toString(string), value = null == value ? 0 : nativeMin(value < 0 ? 0 : +value || 0, string.length), string.lastIndexOf(key, value) == value;
                }
                /**
                 * @param {string} value
                 * @param {!Object} options
                 * @param {undefined} otherOptions
                 * @return {?}
                 */
                function template(value, options, otherOptions) {
                    var settings = exports.templateSettings;
                    if (otherOptions && cb(value, options, otherOptions)) {
                        options = otherOptions = undefined;
                    }
                    value = toString(value);
                    options = debug(assign({}, otherOptions || options), settings, properties);
                    var enable_keys;
                    var rootIsItemUrl;
                    var object = debug(assign({}, options.imports), settings.imports, properties);
                    var importsKeys = keys(object);
                    var importsValues = baseValues(object, importsKeys);
                    /** @type {number} */
                    var i = 0;
                    var interpolate = options.interpolate || reNoMatch;
                    /** @type {string} */
                    var url = "__p += '";
                    var matcher = RegExp((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
                    /** @type {string} */
                    var embeddedJavaScriptFrom = "//# sourceURL=" + ("sourceURL" in options ? options.sourceURL : "lodash.templateSources[" + ++Bt + "]") + "\n";
                    value.replace(matcher, function(dialog, n, interpolateValue, esTemplateValue, canCreateDiscussions, left) {
                        return interpolateValue || (interpolateValue = esTemplateValue), url = url + value.slice(i, left).replace(param, val), n && (enable_keys = true, url = url + ("' +\n__e(" + n + ") +\n'")), canCreateDiscussions && (rootIsItemUrl = true, url = url + ("';\n" + canCreateDiscussions + ";\n__p += '")), interpolateValue && (url = url + ("' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'")), i = left + dialog.length, dialog;
                    });
                    url = url + "';\n";
                    var variable = options.variable;
                    if (!variable) {
                        /** @type {string} */
                        url = "with (obj) {\n" + url + "\n}\n";
                    }
                    url = (rootIsItemUrl ? url.replace(regRelative, "") : url).replace(formattingRemoveEscapes, "$1").replace(_RE_DOT, "$1;");
                    /** @type {string} */
                    url = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (enable_keys ? ", __e = _.escape" : "") + (rootIsItemUrl ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + url + "return __p\n}";
                    var result = attempt(function() {
                        return h(importsKeys, embeddedJavaScriptFrom + "return " + url).apply(undefined, importsValues);
                    });
                    if (result.source = url, isError(result)) {
                        throw result;
                    }
                    return result;
                }
                /**
                 * @param {string} node
                 * @param {string} value
                 * @param {!Object} key
                 * @return {?}
                 */
                function trim(node, value, key) {
                    /** @type {string} */
                    var child = node;
                    return (node = toString(node)) ? (key ? cb(child, value, key) : null == value) ? node.slice(next(node), on(node) + 1) : (value = value + "", node.slice($(node, value), join(node, value) + 1)) : node;
                }
                /**
                 * @param {string} str
                 * @param {string} m
                 * @param {!Object} n
                 * @return {?}
                 */
                function first(str, m, n) {
                    /** @type {string} */
                    var expected = str;
                    return str = toString(str), str ? (n ? cb(expected, m, n) : null == m) ? str.slice(next(str)) : str.slice($(str, m + "")) : str;
                }
                /**
                 * @param {string} name
                 * @param {string} path
                 * @param {!Object} parent
                 * @return {?}
                 */
                function push(name, path, parent) {
                    /** @type {string} */
                    var state = name;
                    return name = toString(name), name ? (parent ? cb(state, path, parent) : null == path) ? name.slice(0, on(name) + 1) : name.slice(0, join(name, path + "") + 1) : name;
                }
                /**
                 * @param {string} string
                 * @param {!Object} options
                 * @param {!Object} guard
                 * @return {?}
                 */
                function truncate(string, options, guard) {
                    if (guard && cb(string, options, guard)) {
                        options = undefined;
                    }
                    /** @type {number} */
                    var length = groupSize;
                    /** @type {string} */
                    var omission = DEFAULT_TRUNC_OMISSION;
                    if (null != options) {
                        if (isObject(options)) {
                            var separator = "separator" in options ? options.separator : separator;
                            /** @type {number} */
                            length = "length" in options ? +options.length || 0 : length;
                            omission = "omission" in options ? toString(options.omission) : omission;
                        } else {
                            /** @type {number} */
                            length = +options || 0;
                        }
                    }
                    if (string = toString(string), length >= string.length) {
                        return string;
                    }
                    /** @type {number} */
                    var end = length - omission.length;
                    if (end < 1) {
                        return omission;
                    }
                    var result = string.slice(0, end);
                    if (null == separator) {
                        return result + omission;
                    }
                    if (isRegExp(separator)) {
                        if (string.slice(end).search(separator)) {
                            var markup;
                            var start;
                            var value = string.slice(0, end);
                            if (!separator.global) {
                                separator = RegExp(separator.source, (reFlags.exec(separator) || "") + "g");
                            }
                            /** @type {number} */
                            separator.lastIndex = 0;
                            for (; markup = separator.exec(value);) {
                                start = markup.index;
                            }
                            result = result.slice(0, null == start ? end : start);
                        }
                    } else {
                        if (string.indexOf(separator, end) != end) {
                            var pos = result.lastIndexOf(separator);
                            if (pos > -1) {
                                result = result.slice(0, pos);
                            }
                        }
                    }
                    return result + omission;
                }
                /**
                 * @param {string} str
                 * @return {?}
                 */
                function unescape(str) {
                    return str = toString(str), str && rex.test(str) ? str.replace(brackets, from) : str;
                }
                /**
                 * @param {string} name
                 * @param {(Object|string)} match
                 * @param {!Object} element
                 * @return {?}
                 */
                function result(name, match, element) {
                    return element && cb(name, match, element) && (match = undefined), name = toString(name), name.match(match || pattern) || [];
                }
                /**
                 * @param {!Object} func
                 * @param {!Array} args
                 * @param {string} data
                 * @return {?}
                 */
                function noop(func, args, data) {
                    return data && cb(func, args, data) && (args = undefined), isObjectLike(func) ? matches(func) : done(func, args);
                }
                /**
                 * @param {?} value
                 * @return {?}
                 */
                function constant(value) {
                    return function() {
                        return value;
                    };
                }
                /**
                 * @param {!Object} data
                 * @return {?}
                 */
                function data(data) {
                    return data;
                }
                /**
                 * @param {!Object} value
                 * @return {?}
                 */
                function matches(value) {
                    return process(baseClone(value, true));
                }
                /**
                 * @param {string} key
                 * @param {!Object} value
                 * @return {?}
                 */
                function setKey(key, value) {
                    return format(key, baseClone(value, true));
                }
                /**
                 * @param {!Function} object
                 * @param {!Object} value
                 * @param {!Object} options
                 * @return {?}
                 */
                function mixin(object, value, options) {
                    if (null == options) {
                        var format = isObject(value);
                        var options = format ? keys(value) : undefined;
                        var data = options && options.length ? copyObject(value, options) : undefined;
                        if (!(data ? data.length : format)) {
                            /** @type {boolean} */
                            data = false;
                            /** @type {!Object} */
                            options = value;
                            /** @type {!Function} */
                            value = object;
                            object = this;
                        }
                    }
                    if (!data) {
                        data = copyObject(value, keys(value));
                    }
                    /** @type {boolean} */
                    var chain = true;
                    /** @type {number} */
                    var a = -1;
                    var isFunc = isFunction(object);
                    var len = data.length;
                    if (false === options) {
                        /** @type {boolean} */
                        chain = false;
                    } else {
                        if (isObject(options) && "chain" in options) {
                            chain = options.chain;
                        }
                    }
                    for (; ++a < len;) {
                        var i = data[a];
                        var v = value[i];
                        object[i] = v;
                        if (isFunc) {
                            object.prototype[i] = function(fn) {
                                return function() {
                                    var chainAll = this.__chain__;
                                    if (chain || chainAll) {
                                        var result = object(this.__wrapped__);
                                        return (result.__actions__ = copyArray(this.__actions__)).push({
                                            func : fn,
                                            args : arguments,
                                            thisArg : object
                                        }), result.__chain__ = chainAll, result;
                                    }
                                    return fn.apply(object, merge([this.value()], arguments));
                                };
                            }(v);
                        }
                    }
                    return object;
                }
                /**
                 * @return {?}
                 */
                function noConflict() {
                    return root._ = previousUnderscore, this;
                }
                /**
                 * @return {undefined}
                 */
                function identity() {
                }
                /**
                 * @param {string} value
                 * @return {?}
                 */
                function select(value) {
                    return isString(value) ? baseProperty(value) : stringify(value);
                }
                /**
                 * @param {undefined} f
                 * @return {?}
                 */
                function compose(f) {
                    return function(a) {
                        return apply(f, match(a), a + "");
                    };
                }
                /**
                 * @param {!Object} start
                 * @param {!Object} end
                 * @param {!Object} step
                 * @return {?}
                 */
                function baseRange(start, end, step) {
                    if (step && cb(start, end, step)) {
                        end = step = undefined;
                    }
                    /** @type {number} */
                    start = +start || 0;
                    /** @type {number} */
                    step = null == step ? 1 : +step || 0;
                    if (null == end) {
                        /** @type {!Object} */
                        end = start;
                        /** @type {number} */
                        start = 0;
                    } else {
                        /** @type {number} */
                        end = +end || 0;
                    }
                    /** @type {number} */
                    var index = -1;
                    var length = nativeMax(nativeCeil((end - start) / (step || 1)), 0);
                    var result = Array(length);
                    for (; ++index < length;) {
                        /** @type {!Object} */
                        result[index] = start;
                        /** @type {number} */
                        start = start + step;
                    }
                    return result;
                }
                /**
                 * @param {number} n
                 * @param {!Function} f
                 * @param {?} a
                 * @return {?}
                 */
                function times(n, f, a) {
                    if ((n = floor(n)) < 1 || !isNaN(n)) {
                        return [];
                    }
                    /** @type {number} */
                    var index = -1;
                    var result = Array(nativeMin(n, MAX_ARRAY_LENGTH));
                    f = $(f, a, 1);
                    for (; ++index < n;) {
                        if (index < MAX_ARRAY_LENGTH) {
                            result[index] = f(index);
                        } else {
                            f(index);
                        }
                    }
                    return result;
                }
                /**
                 * @param {string} prefix
                 * @return {?}
                 */
                function uniqueId(prefix) {
                    /** @type {number} */
                    var id = ++nextKey;
                    return toString(prefix) + id;
                }
                /**
                 * @param {!Object} value
                 * @param {?} add
                 * @return {?}
                 */
                function fun(value, add) {
                    return (+value || 0) + (+add || 0);
                }
                /**
                 * @param {?} items
                 * @param {string} key
                 * @param {?} data
                 * @return {?}
                 */
                function enter(items, key, data) {
                    return data && cb(items, key, data) && (key = undefined), key = next(key, data, 3), 1 == key.length ? trigger(isArray(items) ? items : find(items), key) : log(items, key);
                }
                global = global ? _.defaults(root.Object(), global, _.pick(root, contextProps)) : root;
                var Array = global.Array;
                var Date = global.Date;
                var Error = global.Error;
                var h = global.Function;
                var Math = global.Math;
                var config = global.Number;
                var Object = global.Object;
                var RegExp = global.RegExp;
                var n = global.String;
                var TypeError = global.TypeError;
                var arrayProto = Array.prototype;
                var ObjProto = Object.prototype;
                var p = n.prototype;
                var opts = h.prototype.toString;
                var self = ObjProto.hasOwnProperty;
                /** @type {number} */
                var nextKey = 0;
                var hasOwnProperty = ObjProto.toString;
                var previousUnderscore = root._;
                var reIsNative = RegExp("^" + opts.call(self).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
                var ArrayBuffer = global.ArrayBuffer;
                var clearTimeout = global.clearTimeout;
                var parseFloat = global.parseFloat;
                var $pow = Math.pow;
                var propertyIsEnumerable = ObjProto.propertyIsEnumerable;
                var Set = getNative(global, "Set");
                var setTimeout = global.setTimeout;
                var splice = arrayProto.splice;
                var Uint8Array = global.Uint8Array;
                var WeakMap = getNative(global, "WeakMap");
                var nativeCeil = Math.ceil;
                var nativeCreate = getNative(Object, "create");
                var floor = Math.floor;
                var nativeIsArray = getNative(Array, "isArray");
                var isNaN = global.isFinite;
                var nativeKeys = getNative(Object, "keys");
                var nativeMax = Math.max;
                var nativeMin = Math.min;
                var nativeNow = getNative(Date, "now");
                var $parseInt = global.parseInt;
                var nativeRandom = Math.random;
                var d = config.NEGATIVE_INFINITY;
                var count = config.POSITIVE_INFINITY;
                /** @type {number} */
                var MAX_ARRAY_LENGTH = 4294967295;
                /** @type {number} */
                var MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;
                /** @type {number} */
                var HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
                /** @type {number} */
                var index = 9007199254740991;
                var type = WeakMap && new WeakMap;
                var o = {};
                exports.support = {};
                exports.templateSettings = {
                    escape : _digitExpr,
                    evaluate : evaluate,
                    interpolate : reInterpolate,
                    variable : "",
                    imports : {
                        _ : exports
                    }
                };
                var baseCreate = function() {
                    /**
                     * @return {undefined}
                     */
                    function r() {
                    }
                    return function(o) {
                        if (isObject(o)) {
                            /** @type {!Object} */
                            r.prototype = o;
                            var p = new r;
                            r.prototype = undefined;
                        }
                        return p || {};
                    };
                }();
                var val = createBaseEach(forOwn);
                var options = createBaseEach(file, true);
                var iterator = req();
                var path = req(true);
                /** @type {!Function} */
                var add = type ? function(e, n) {
                    return type.set(e, n), e;
                } : data;
                /** @type {!Function} */
                var getData = type ? function(name) {
                    return type.get(name);
                } : identity;
                var getLength = baseProperty("length");
                var send = function() {
                    /** @type {number} */
                    var num_summed = 0;
                    /** @type {number} */
                    var prevT = 0;
                    return function(value, right) {
                        var currT = now();
                        /** @type {number} */
                        var nagasaki = U - (currT - prevT);
                        if (prevT = currT, nagasaki > 0) {
                            if (++num_summed >= summands) {
                                return value;
                            }
                        } else {
                            /** @type {number} */
                            num_summed = 0;
                        }
                        return add(value, right);
                    };
                }();
                var difference = rest(function(value, b) {
                    return isObjectLike(value) && isArrayLike(value) ? fn(value, get(b, false, true)) : [];
                });
                var supported = has();
                var schedule = has(true);
                var intersection = rest(function(arrays) {
                    var othLength = arrays.length;
                    var othIndex = othLength;
                    var caches = Array(length);
                    var indexOf = exec();
                    /** @type {boolean} */
                    var isCommon = indexOf == baseIndexOf;
                    /** @type {!Array} */
                    var seen = [];
                    for (; othIndex--;) {
                        var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
                        caches[othIndex] = isCommon && value.length >= 120 ? createCache(othIndex && value) : null;
                    }
                    var array = arrays[0];
                    /** @type {number} */
                    var i = -1;
                    var length = array ? array.length : 0;
                    var cache = caches[0];
                    t: for (; ++i < length;) {
                        if (value = array[i], (cache ? cacheIndexOf(cache, value) : indexOf(seen, value, 0)) < 0) {
                            othIndex = othLength;
                            for (; --othIndex;) {
                                var cache = caches[othIndex];
                                if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
                                    continue t;
                                }
                            }
                            if (cache) {
                                cache.push(value);
                            }
                            seen.push(value);
                        }
                    }
                    return seen;
                });
                var setImmediate$1 = rest(function(value, x) {
                    x = get(x);
                    var result = getValue(value, x);
                    return getPath(value, x.sort(compareAscending)), result;
                });
                var sortedIndex = createSortedIndex();
                var ReactMeteorData = createSortedIndex(true);
                var union = rest(function(obj) {
                    return each(get(obj, false, true));
                });
                var without = rest(function(array, values) {
                    return isArrayLike(array) ? fn(array, values) : [];
                });
                var zip = rest(unzip);
                var partial = rest(function(arrays) {
                    var length = arrays.length;
                    var iteratee = length > 2 ? arrays[length - 2] : undefined;
                    var thisArg = length > 1 ? arrays[length - 1] : undefined;
                    return length > 2 && "function" == typeof iteratee ? length = length - 2 : (iteratee = length > 1 && "function" == typeof thisArg ? (--length, thisArg) : undefined, thisArg = undefined), arrays.length = length, unzipWith(arrays, iteratee, thisArg);
                });
                var concat = rest(function(data) {
                    return data = get(data), this.thru(function(items) {
                        return byName(isArray(items) ? items : [resolve(items)], data);
                    });
                });
                var xor = rest(function(value, attr) {
                    return getValue(value, get(attr));
                });
                var rs = clone(function(val, canCreateDiscussions, term) {
                    if (self.call(val, term)) {
                        ++val[term];
                    } else {
                        /** @type {number} */
                        val[term] = 1;
                    }
                });
                var detect = require(val);
                var os = require(options, true);
                var node = render(forEach, val);
                var svg = render(invoke, options);
                var args = clone(function(groups, i, name) {
                    if (self.call(groups, name)) {
                        groups[name].push(i);
                    } else {
                        /** @type {!Array} */
                        groups[name] = [i];
                    }
                });
                var currentLineStylesCloned = clone(function(args, withoutSuffix, callbackArgumentIndex) {
                    args[callbackArgumentIndex] = withoutSuffix;
                });
                var invokeClientMethod = rest(function(collection, path, args) {
                    /** @type {number} */
                    var j = -1;
                    /** @type {boolean} */
                    var isFunc = "function" == typeof path;
                    var isProp = isString(path);
                    var result = isArrayLike(collection) ? Array(collection.length) : [];
                    return val(collection, function(value) {
                        var func = isFunc ? path : isProp && null != value ? value[path] : undefined;
                        result[++j] = func ? func.apply(value, args) : P(value, path, args);
                    }), result;
                });
                var partition = clone(function(t, e, toMark) {
                    t[toMark ? 0 : 1].push(e);
                }, function() {
                    return [[], []];
                });
                var reduce = convert(arrayReduce, val);
                var b = convert(c, options);
                var restValues = rest(function(data, results) {
                    if (null == data) {
                        return [];
                    }
                    var element = results[2];
                    return element && cb(results[0], results[1], element) && (results.length = 1), cleanup(data, get(results), []);
                });
                var now = nativeNow || function() {
                    return (new Date).getTime();
                };
                var bind = rest(function(t, processedSource, i) {
                    /** @type {number} */
                    var tmp = key;
                    if (i.length) {
                        var value = concat(i, bind.placeholder);
                        /** @type {number} */
                        tmp = tmp | left;
                    }
                    return callback(t, tmp, processedSource, i, value);
                });
                var bindAll = rest(function(obj, options) {
                    options = options.length ? get(options) : functions(obj);
                    /** @type {number} */
                    var index = -1;
                    var length = options.length;
                    for (; ++index < length;) {
                        var i = options[index];
                        obj[i] = callback(obj[i], key, obj);
                    }
                    return obj;
                });
                var bindKey = rest(function(processedSource, e, i) {
                    /** @type {number} */
                    var r = key | BIND_KEY_FLAG;
                    if (i.length) {
                        var value = concat(i, bindKey.placeholder);
                        /** @type {number} */
                        r = r | left;
                    }
                    return callback(e, r, processedSource, i, value);
                });
                var curry = createField(CURRY_FLAG);
                var field = createField(name);
                var defer = rest(function(func, options) {
                    return baseConvert(func, 1, options);
                });
                var delay = rest(function(func, realName, options) {
                    return baseConvert(func, realName, options);
                });
                var flow = createFlow();
                var dePairParenthesise = createFlow(true);
                var BetterInterface = rest(function(callback, data) {
                    if (data = get(data), "function" != typeof callback || !ok(data, error)) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    var length = data.length;
                    return rest(function(args) {
                        var index = nativeMin(args.length, length);
                        for (; index--;) {
                            args[index] = data[index](args[index]);
                        }
                        return callback.apply(this, args);
                    });
                });
                var leftPosition = createElement(left);
                var partialRight = createElement(mask);
                var apply$1 = rest(function(t, status) {
                    return callback(t, REARG_FLAG, undefined, undefined, undefined, get(status));
                });
                var isArray = nativeIsArray || function(obj) {
                    return isObjectLike(obj) && isLength(obj.length) && hasOwnProperty.call(obj) == funcTag$2;
                };
                var list = save(baseMerge);
                var entries = save(function(x, m, n) {
                    return n ? debug(x, m, n) : assign(x, m);
                });
                var errors = uniq(entries, arr);
                var id = uniq(list, item);
                var ext = defaults(forOwn);
                var _config = defaults(file);
                var g = wrapper(iterator);
                var suite = wrapper(path);
                var tree = replace(forOwn);
                var stream = replace(file);
                /** @type {function(?): ?} */
                var keys = nativeKeys ? function(object) {
                    var data = null == object ? undefined : object.constructor;
                    return "function" == typeof data && data.prototype === object || "function" != typeof object && isArrayLike(object) ? shimKeys(object) : isObject(object) ? nativeKeys(object) : [];
                } : shimKeys;
                var mapKeys = runTask(true);
                var mapValues = runTask();
                var omit = rest(function(obj, value) {
                    if (null == obj) {
                        return {};
                    }
                    if ("function" != typeof value[0]) {
                        value = copy(get(value), n);
                        return set(obj, fn(keysIn(obj), value));
                    }
                    var res = $(value[0], value[1], 3);
                    return expect(obj, function(shortURL, args, body) {
                        return !res(shortURL, args, body);
                    });
                });
                var view = rest(function(a, fields) {
                    return null == a ? {} : "function" == typeof fields[0] ? expect(a, $(fields[0], fields[1], 3)) : set(a, get(fields));
                });
                var camelize = build(function(result, word, index) {
                    return word = word.toLowerCase(), result + (index ? word.charAt(0).toUpperCase() + word.slice(1) : word);
                });
                var kebabCase = build(function(yuiModule, p_Interval, leadingHyphen) {
                    return yuiModule + (leadingHyphen ? "-" : "") + p_Interval.toLowerCase();
                });
                var logger = bindLogger();
                var padRight = bindLogger(true);
                var snakeCase = build(function(yuiModule, p_Interval, leadingHyphen) {
                    return yuiModule + (leadingHyphen ? "_" : "") + p_Interval.toLowerCase();
                });
                var element = build(function(res, e, after) {
                    return res + (after ? " " : "") + (e.charAt(0).toUpperCase() + e.slice(1));
                });
                var attempt = rest(function(t, e) {
                    try {
                        return t.apply(undefined, e);
                    } catch (e) {
                        return isError(e) ? e : new Error(e);
                    }
                });
                var method = rest(function(base, f) {
                    return function(n) {
                        return P(n, base, f);
                    };
                });
                var unionWith = rest(function(n, f) {
                    return function(base) {
                        return P(n, base, f);
                    };
                });
                var ceil = decimalAdjust("ceil");
                var local = decimalAdjust("floor");
                var t = test(gt, d);
                var request = test(max, count);
                var round = decimalAdjust("round");
                return exports.prototype = lodash.prototype, LodashWrapper.prototype = baseCreate(lodash.prototype), LodashWrapper.prototype.constructor = LodashWrapper, LazyWrapper.prototype = baseCreate(lodash.prototype), LazyWrapper.prototype.constructor = LazyWrapper, Stack.prototype.delete = hashSet$1, Stack.prototype.get = listCacheGet, Stack.prototype.has = groupBy, Stack.prototype.set = listCacheSet, SetCache.prototype.push = cachePush, memoize.Cache = Stack, exports.after = after, exports.ary =
                    initial, exports.assign = entries, exports.at = xor, exports.before = on, exports.bind = bind, exports.bindAll = bindAll, exports.bindKey = bindKey, exports.callback = noop, exports.chain = chain, exports.chunk = range, exports.compact = compact, exports.constant = constant, exports.countBy = rs, exports.create = createContext, exports.curry = curry, exports.curryRight = field, exports.debounce = debounce, exports.defaults = errors, exports.defaultsDeep = id, exports.defer = defer, exports.delay =
                    delay, exports.difference = difference, exports.drop = drop, exports.dropRight = raise, exports.dropRightWhile = error, exports.dropWhile = dropWhile, exports.fill = change, exports.filter = filter, exports.flatten = flatten, exports.flattenDeep = shuffle, exports.flow = flow, exports.flowRight = dePairParenthesise, exports.forEach = node, exports.forEachRight = svg, exports.forIn = g, exports.forInRight = suite, exports.forOwn = tree, exports.forOwnRight = stream, exports.functions = functions,
                    exports.groupBy = args, exports.indexBy = currentLineStylesCloned, exports.initial = lex, exports.intersection = intersection, exports.invert = invert, exports.invoke = invokeClientMethod, exports.keys = keys, exports.keysIn = keysIn, exports.map = map, exports.mapKeys = mapKeys, exports.mapValues = mapValues, exports.matches = matches, exports.matchesProperty = setKey, exports.memoize = memoize, exports.merge = list, exports.method = method, exports.methodOf = unionWith, exports.mixin =
                    mixin, exports.modArgs = BetterInterface, exports.negate = negate, exports.omit = omit, exports.once = once, exports.pairs = pairs, exports.partial = leftPosition, exports.partialRight = partialRight, exports.partition = partition, exports.pick = view, exports.pluck = pluck, exports.property = select, exports.propertyOf = compose, exports.pull = forIn, exports.pullAt = setImmediate$1, exports.range = baseRange, exports.rearg = apply$1, exports.reject = r, exports.remove = remove, exports.rest =
                    tail, exports.restParam = rest, exports.set = _set, exports.shuffle = formatNumber, exports.slice = compare, exports.sortBy = sortBy, exports.sortByAll = restValues, exports.sortByOrder = abort, exports.spread = spread, exports.take = take, exports.takeRight = compute, exports.takeRightWhile = wrap, exports.takeWhile = Event, exports.tap = tap, exports.throttle = throttle, exports.thru = progress, exports.times = times, exports.toArray = toArray, exports.toPlainObject = toPlainObject, exports.transform =
                    transform, exports.union = union, exports.uniq = join, exports.unzip = unzip, exports.unzipWith = unzipWith, exports.values = values, exports.valuesIn = toPairsIn, exports.where = where, exports.without = without, exports.wrap = last, exports.xor = any, exports.zip = zip, exports.zipObject = zipObject, exports.zipWith = partial, exports.backflow = dePairParenthesise, exports.collect = map, exports.compose = dePairParenthesise, exports.each = node, exports.eachRight = svg, exports.extend =
                    entries, exports.iteratee = noop, exports.methods = functions, exports.object = zipObject, exports.select = filter, exports.tail = tail, exports.unique = join, mixin(exports, exports), exports.add = fun, exports.attempt = attempt, exports.camelCase = camelize, exports.capitalize = capitalize, exports.ceil = ceil, exports.clone = walk, exports.cloneDeep = cloneDeep, exports.deburr = reject, exports.endsWith = endsWith, exports.escape = escape, exports.escapeRegExp = escapeRegExp, exports.every =
                    every, exports.find = detect, exports.findIndex = supported, exports.findKey = ext, exports.findLast = os, exports.findLastIndex = schedule, exports.findLastKey = _config, exports.findWhere = isUndefined, exports.first = head, exports.floor = local, exports.get = action, exports.gt = gt, exports.gte = prefix, exports.has = validate, exports.identity = data, exports.includes = contains, exports.indexOf = indexOf, exports.inRange = inRange, exports.isArguments = isArguments, exports.isArray =
                    isArray, exports.isBoolean = isBoolean, exports.isDate = isDate, exports.isElement = isElement, exports.isEmpty = isEmpty, exports.isEqual = min, exports.isError = isError, exports.isFinite = isFinite, exports.isFunction = isFunction, exports.isMatch = isMatch, exports.isNaN = eq, exports.isNative = isNative, exports.isNull = isNull, exports.isNumber = normalize, exports.isObject = isObject, exports.isPlainObject = isPlainObject, exports.isRegExp = isRegExp, exports.isString = isNumber, exports.isTypedArray =
                    isTypedArray, exports.isUndefined = toPaddedString, exports.kebabCase = kebabCase, exports.last = parseInt, exports.lastIndexOf = lastIndexOf, exports.lt = max, exports.lte = lte, exports.max = t, exports.min = request, exports.noConflict = noConflict, exports.noop = identity, exports.now = now, exports.pad = pad, exports.padLeft = logger, exports.padRight = padRight, exports.parseInt = serialize, exports.random = random, exports.reduce = reduce, exports.reduceRight = b, exports.repeat =
                    value, exports.result = reset, exports.round = round, exports.runInContext = runInContext, exports.size = size, exports.snakeCase = snakeCase, exports.some = some, exports.sortedIndex = sortedIndex, exports.sortedLastIndex = ReactMeteorData, exports.startCase = element, exports.startsWith = startsWith, exports.sum = enter, exports.template = template, exports.trim = trim, exports.trimLeft = first, exports.trimRight = push, exports.trunc = truncate, exports.unescape = unescape, exports.uniqueId =
                    uniqueId, exports.words = result, exports.all = every, exports.any = some, exports.contains = contains, exports.eq = min, exports.detect = detect, exports.foldl = reduce, exports.foldr = b, exports.head = head, exports.include = contains, exports.inject = reduce, mixin(exports, function() {
                    var result = {};
                    return forOwn(exports, function(asString, tag) {
                        if (!exports.prototype[tag]) {
                            result[tag] = asString;
                        }
                    }), result;
                }(), false), exports.sample = setValue, exports.prototype.sample = function(s) {
                    return this.__chain__ || null != s ? this.thru(function(undefined) {
                        return setValue(undefined, s);
                    }) : setValue(this.value());
                }, exports.VERSION = VERSION, forEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(name) {
                    /** @type {function(?): ?} */
                    exports[name].placeholder = exports;
                }), forEach(["drop", "take"], function(methodName, no_secondary) {
                    /**
                     * @param {number} n
                     * @return {?}
                     */
                    LazyWrapper.prototype[methodName] = function(n) {
                        var inputData = this.__filtered__;
                        if (inputData && !no_secondary) {
                            return new LazyWrapper(this);
                        }
                        n = null == n ? 1 : nativeMax(floor(n) || 0, 0);
                        var result = this.clone();
                        return inputData ? result.__takeCount__ = nativeMin(result.__takeCount__, n) : result.__views__.push({
                            size : n,
                            type : methodName + (result.__dir__ < 0 ? "Right" : "")
                        }), result;
                    };
                    /**
                     * @param {?} args
                     * @return {?}
                     */
                    LazyWrapper.prototype[methodName + "Right"] = function(args) {
                        return this.reverse()[methodName](args).reverse();
                    };
                }), forEach(["filter", "map", "takeWhile"], function(methodName, angulo) {
                    var anguloFix = angulo + 1;
                    /** @type {boolean} */
                    var isFilter = anguloFix != pid;
                    /**
                     * @param {string} iteratee
                     * @param {?} totals
                     * @return {?}
                     */
                    LazyWrapper.prototype[methodName] = function(iteratee, totals) {
                        var result = this.clone();
                        return result.__iteratees__.push({
                            iteratee : next(iteratee, totals, 1),
                            type : anguloFix
                        }), result.__filtered__ = result.__filtered__ || isFilter, result;
                    };
                }), forEach(["first", "last"], function(methodName, index) {
                    /** @type {string} */
                    var takeName = "take" + (index ? "Right" : "");
                    /**
                     * @return {?}
                     */
                    LazyWrapper.prototype[methodName] = function() {
                        return this[takeName](1).value()[0];
                    };
                }), forEach(["initial", "rest"], function(methodName, index) {
                    /** @type {string} */
                    var dropName = "drop" + (index ? "" : "Right");
                    /**
                     * @return {?}
                     */
                    LazyWrapper.prototype[methodName] = function() {
                        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
                    };
                }), forEach(["pluck", "where"], function(methodName, readOnly) {
                    /** @type {string} */
                    var template = readOnly ? "filter" : "map";
                    /** @type {function(!Function): ?} */
                    var _process = readOnly ? process : select;
                    /**
                     * @param {undefined} s
                     * @return {?}
                     */
                    LazyWrapper.prototype[methodName] = function(s) {
                        return this[template](_process(s));
                    };
                }), LazyWrapper.prototype.compact = function() {
                    return this.filter(data);
                }, LazyWrapper.prototype.reject = function(callback, scope) {
                    return callback = next(callback, scope, 1), this.filter(function(identifierPositions) {
                        return !callback(identifierPositions);
                    });
                }, LazyWrapper.prototype.slice = function(start, end) {
                    /** @type {number} */
                    start = null == start ? 0 : +start || 0;
                    var result = this;
                    return result.__filtered__ && (start > 0 || end < 0) ? new LazyWrapper(result) : (start < 0 ? result = result.takeRight(-start) : start && (result = result.drop(start)), end !== undefined && (end = +end || 0, result = end < 0 ? result.dropRight(-end) : result.take(end - start)), result);
                }, LazyWrapper.prototype.takeRightWhile = function(array, n) {
                    return this.reverse().takeWhile(array, n).reverse();
                }, LazyWrapper.prototype.toArray = function() {
                    return this.take(count);
                }, forOwn(LazyWrapper.prototype, function(t, name) {
                    /** @type {boolean} */
                    var tmpl = /^(?:filter|map|reject)|While$/.test(name);
                    /** @type {boolean} */
                    var isTaker = /^(?:first|last)$/.test(name);
                    var method = exports[isTaker ? "take" + ("last" == name ? "Right" : "") : name];
                    if (method) {
                        /**
                         * @return {?}
                         */
                        exports.prototype[name] = function() {
                            /** @type {(Arguments|Array)} */
                            var args = isTaker ? [1] : arguments;
                            var chainAll = this.__chain__;
                            var value = this.__wrapped__;
                            /** @type {boolean} */
                            var isJSRequested = !!this.__actions__.length;
                            /** @type {boolean} */
                            var isLazy = value instanceof LazyWrapper;
                            var url = args[0];
                            var useLazy = isLazy || isArray(value);
                            if (useLazy && tmpl && "function" == typeof url && 1 != url.length) {
                                /** @type {boolean} */
                                isLazy = useLazy = false;
                            }
                            /**
                             * @param {?} url
                             * @return {?}
                             */
                            var req = function(url) {
                                return isTaker && chainAll ? method(url, 1)[0] : method.apply(undefined, merge([url], args));
                            };
                            var event = {
                                func : progress,
                                args : [req],
                                thisArg : undefined
                            };
                            /** @type {boolean} */
                            var onlyLazy = isLazy && !isJSRequested;
                            if (isTaker && !chainAll) {
                                return onlyLazy ? (value = value.clone(), value.__actions__.push(event), t.call(value)) : method.call(undefined, this.value())[0];
                            }
                            if (!isTaker && useLazy) {
                                value = onlyLazy ? value : new LazyWrapper(this);
                                var result = t.apply(value, args);
                                return result.__actions__.push(event), new LodashWrapper(result, chainAll);
                            }
                            return this.thru(req);
                        };
                    }
                }), forEach(["join", "pop", "push", "replace", "shift", "sort", "splice", "split", "unshift"], function(methodName) {
                    var func = (/^(?:replace|split)$/.test(methodName) ? p : arrayProto)[methodName];
                    /** @type {string} */
                    var chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru";
                    /** @type {boolean} */
                    var retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);
                    /**
                     * @return {?}
                     */
                    exports.prototype[methodName] = function() {
                        /** @type {!Arguments} */
                        var arg = arguments;
                        return retUnwrapped && !this.__chain__ ? func.apply(this.value(), arg) : this[chainName](function(context) {
                            return func.apply(context, arg);
                        });
                    };
                }), forOwn(LazyWrapper.prototype, function(canCreateDiscussions, methodName) {
                    var method = exports[methodName];
                    if (method) {
                        var name = method.name;
                        (o[name] || (o[name] = [])).push({
                            name : methodName,
                            func : method
                        });
                    }
                }), o[check(undefined, BIND_KEY_FLAG).name] = [{
                    name : "wrapper",
                    func : undefined
                }], LazyWrapper.prototype.clone = lazyClone, LazyWrapper.prototype.reverse = lazyReverse, LazyWrapper.prototype.value = lazyValue, exports.prototype.chain = wrapperChain, exports.prototype.commit = lodashWrapper, exports.prototype.concat = concat, exports.prototype.plant = wrapperPlant, exports.prototype.reverse = wrapperReverse, exports.prototype.toString = toStringBench, exports.prototype.run = exports.prototype.toJSON = exports.prototype.valueOf = exports.prototype.value = wrapperValue,
                    exports.prototype.collect = exports.prototype.map, exports.prototype.head = exports.prototype.first, exports.prototype.select = exports.prototype.filter, exports.prototype.tail = exports.prototype.rest, exports;
            }
            var undefined;
            /** @type {string} */
            var VERSION = "3.10.1";
            /** @type {number} */
            var key = 1;
            /** @type {number} */
            var BIND_KEY_FLAG = 2;
            /** @type {number} */
            var CURRY_BOUND_FLAG = 4;
            /** @type {number} */
            var CURRY_FLAG = 8;
            /** @type {number} */
            var name = 16;
            /** @type {number} */
            var left = 32;
            /** @type {number} */
            var mask = 64;
            /** @type {number} */
            var ARY_FLAG = 128;
            /** @type {number} */
            var REARG_FLAG = 256;
            /** @type {number} */
            var groupSize = 30;
            /** @type {string} */
            var DEFAULT_TRUNC_OMISSION = "...";
            /** @type {number} */
            var summands = 150;
            /** @type {number} */
            var U = 16;
            /** @type {number} */
            var LARGE_ARRAY_SIZE = 200;
            /** @type {number} */
            var metabolite = 1;
            /** @type {number} */
            var pid = 2;
            /** @type {string} */
            var ERR_ACCESSORS_NOT_SUPPORTED = "Expected a function";
            /** @type {string} */
            var o = "__lodash_placeholder__";
            /** @type {string} */
            var hr = "[object Arguments]";
            /** @type {string} */
            var funcTag$2 = "[object Array]";
            /** @type {string} */
            var arrayBufferTag = "[object Boolean]";
            /** @type {string} */
            var boolTag = "[object Date]";
            /** @type {string} */
            var errorTag = "[object Error]";
            /** @type {string} */
            var funcTag = "[object Function]";
            /** @type {string} */
            var dateTag = "[object Number]";
            /** @type {string} */
            var a = "[object Object]";
            /** @type {string} */
            var regexpTag = "[object RegExp]";
            /** @type {string} */
            var numberTag = "[object String]";
            /** @type {string} */
            var dataViewTag = "[object ArrayBuffer]";
            /** @type {string} */
            var float32Tag = "[object Float32Array]";
            /** @type {string} */
            var float32Tag$1 = "[object Float64Array]";
            /** @type {string} */
            var float64Tag = "[object Int8Array]";
            /** @type {string} */
            var int8Tag = "[object Int16Array]";
            /** @type {string} */
            var int32Tag = "[object Int32Array]";
            /** @type {string} */
            var uint8Tag = "[object Uint8Array]";
            /** @type {string} */
            var uint8ClampedTag = "[object Uint8ClampedArray]";
            /** @type {string} */
            var uint16Tag = "[object Uint16Array]";
            /** @type {string} */
            var uint32Tag = "[object Uint32Array]";
            /** @type {!RegExp} */
            var regRelative = /\b__p \+= '';/g;
            /** @type {!RegExp} */
            var formattingRemoveEscapes = /\b(__p \+=) '' \+/g;
            /** @type {!RegExp} */
            var _RE_DOT = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
            /** @type {!RegExp} */
            var brackets = /&(?:amp|lt|gt|quot|#39|#96);/g;
            /** @type {!RegExp} */
            var reUnescapedHtml = /[&<>"'`]/g;
            /** @type {!RegExp} */
            var rex = RegExp(brackets.source);
            /** @type {!RegExp} */
            var r = RegExp(reUnescapedHtml.source);
            /** @type {!RegExp} */
            var _digitExpr = /<%-([\s\S]+?)%>/g;
            /** @type {!RegExp} */
            var evaluate = /<%([\s\S]+?)%>/g;
            /** @type {!RegExp} */
            var reInterpolate = /<%=([\s\S]+?)%>/g;
            /** @type {!RegExp} */
            var matchYearMonthDay = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/;
            /** @type {!RegExp} */
            var matchYearMonth = /^\w*$/;
            /** @type {!RegExp} */
            var reNewLines = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
            /** @type {!RegExp} */
            var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g;
            /** @type {!RegExp} */
            var reHasEscapedHtml = RegExp(reRegExpChars.source);
            /** @type {!RegExp} */
            var reTabs = /[\u0300-\u036f\ufe20-\ufe23]/g;
            /** @type {!RegExp} */
            var reEscapeChar = /\\(\\)?/g;
            /** @type {!RegExp} */
            var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
            /** @type {!RegExp} */
            var reFlags = /\w*$/;
            /** @type {!RegExp} */
            var existingSpanRegExp = /^0[xX]/;
            /** @type {!RegExp} */
            var trueRE = /^\[object .+?Constructor\]$/;
            /** @type {!RegExp} */
            var regCls = /^\d+$/;
            /** @type {!RegExp} */
            var rbreakright = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;
            /** @type {!RegExp} */
            var reNoMatch = /($^)/;
            /** @type {!RegExp} */
            var param = /['\n\r\u2028\u2029\\]/g;
            var pattern = function() {
                /** @type {string} */
                var f = "[A-Z\\xc0-\\xd6\\xd8-\\xde]";
                /** @type {string} */
                var e = "[a-z\\xdf-\\xf6\\xf8-\\xff]+";
                return RegExp(f + "+(?=" + f + e + ")|" + f + "?" + e + "|" + f + "+|[0-9]+", "g");
            }();
            /** @type {!Array} */
            var contextProps = ["Array", "ArrayBuffer", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Math", "Number", "Object", "RegExp", "Set", "String", "_", "clearTimeout", "isFinite", "parseFloat", "parseInt", "setTimeout", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap"];
            /** @type {number} */
            var Bt = -1;
            var typedArrayTags = {};
            /** @type {boolean} */
            typedArrayTags[float32Tag] = typedArrayTags[float32Tag$1] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
            /** @type {boolean} */
            typedArrayTags[hr] = typedArrayTags[funcTag$2] = typedArrayTags[dataViewTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags["[object Map]"] = typedArrayTags[dateTag] = typedArrayTags[a] = typedArrayTags[regexpTag] = typedArrayTags["[object Set]"] = typedArrayTags[numberTag] = typedArrayTags["[object WeakMap]"] = false;
            var cloneableTags = {};
            /** @type {boolean} */
            cloneableTags[hr] = cloneableTags[funcTag$2] = cloneableTags[dataViewTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[float32Tag] = cloneableTags[float32Tag$1] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int32Tag] = cloneableTags[dateTag] = cloneableTags[a] = cloneableTags[regexpTag] = cloneableTags[numberTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
            /** @type {boolean} */
            cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags["[object Map]"] = cloneableTags["[object Set]"] = cloneableTags["[object WeakMap]"] = false;
            var animationConfigs = {
                "\u00c0" : "A",
                "\u00c1" : "A",
                "\u00c2" : "A",
                "\u00c3" : "A",
                "\u00c4" : "A",
                "\u00c5" : "A",
                "\u00e0" : "a",
                "\u00e1" : "a",
                "\u00e2" : "a",
                "\u00e3" : "a",
                "\u00e4" : "a",
                "\u00e5" : "a",
                "\u00c7" : "C",
                "\u00e7" : "c",
                "\u00d0" : "D",
                "\u00f0" : "d",
                "\u00c8" : "E",
                "\u00c9" : "E",
                "\u00ca" : "E",
                "\u00cb" : "E",
                "\u00e8" : "e",
                "\u00e9" : "e",
                "\u00ea" : "e",
                "\u00eb" : "e",
                "\u00cc" : "I",
                "\u00cd" : "I",
                "\u00ce" : "I",
                "\u00cf" : "I",
                "\u00ec" : "i",
                "\u00ed" : "i",
                "\u00ee" : "i",
                "\u00ef" : "i",
                "\u00d1" : "N",
                "\u00f1" : "n",
                "\u00d2" : "O",
                "\u00d3" : "O",
                "\u00d4" : "O",
                "\u00d5" : "O",
                "\u00d6" : "O",
                "\u00d8" : "O",
                "\u00f2" : "o",
                "\u00f3" : "o",
                "\u00f4" : "o",
                "\u00f5" : "o",
                "\u00f6" : "o",
                "\u00f8" : "o",
                "\u00d9" : "U",
                "\u00da" : "U",
                "\u00db" : "U",
                "\u00dc" : "U",
                "\u00f9" : "u",
                "\u00fa" : "u",
                "\u00fb" : "u",
                "\u00fc" : "u",
                "\u00dd" : "Y",
                "\u00fd" : "y",
                "\u00ff" : "y",
                "\u00c6" : "Ae",
                "\u00e6" : "ae",
                "\u00de" : "Th",
                "\u00fe" : "th",
                "\u00df" : "ss"
            };
            var htmlEntitiesMap = {
                "&" : "&amp;",
                "<" : "&lt;",
                ">" : "&gt;",
                '"' : "&quot;",
                "'" : "&#39;",
                "`" : "&#96;"
            };
            var bonusTraitModifiers = {
                "&amp;" : "&",
                "&lt;" : "<",
                "&gt;" : ">",
                "&quot;" : '"',
                "&#39;" : "'",
                "&#96;" : "`"
            };
            var objectTypes = {
                function : true,
                object : true
            };
            var CHAR_MAP = {
                0 : "x30",
                1 : "x31",
                2 : "x32",
                3 : "x33",
                4 : "x34",
                5 : "x35",
                6 : "x36",
                7 : "x37",
                8 : "x38",
                9 : "x39",
                A : "x41",
                B : "x42",
                C : "x43",
                D : "x44",
                E : "x45",
                F : "x46",
                a : "x61",
                b : "x62",
                c : "x63",
                d : "x64",
                e : "x65",
                f : "x66",
                n : "x6e",
                r : "x72",
                t : "x74",
                u : "x75",
                v : "x76",
                x : "x78"
            };
            var out = {
                "\\" : "\\",
                "'" : "'",
                "\n" : "n",
                "\r" : "r",
                "\u2028" : "u2028",
                "\u2029" : "u2029"
            };
            var protocols = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
            var moduleMeta = objectTypes[typeof module] && module && !module.nodeType && module;
            var freeGlobal = protocols && moduleMeta && "object" == typeof value && value && value.Object && value;
            var freeSelf = objectTypes[typeof self] && self && self.Object && self;
            var freeWindow = objectTypes[typeof window] && window && window.Object && window;
            var root = (moduleMeta && moduleMeta.exports, freeGlobal || freeWindow !== (this && this.window) && freeWindow || freeSelf || this);
            var _ = runInContext();
            root._ = _;
            if ((__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                return _;
            }.call(exports, __webpack_require__, exports, module)) !== undefined) {
                module.exports = __WEBPACK_AMD_DEFINE_RESULT__;
            }
        }).call(this);
    }).call(exports, __webpack_require__(8)(module), __webpack_require__(3));
}, function(module, canCreateDiscussions, require) {
    var r = require(6);
    var $ = require(0);
    /**
     * @param {!Object} obj
     * @return {undefined}
     */
    var Renderer = function(obj) {
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
    /**
     * @return {?}
     */
    Renderer.prototype.load = function() {
        var params = {};
        return this.cubemaps && (params.cubemap = $.loadSpecularCubemaps(this.cubemaps)), this.panoramas && (params.panorama = $.loadPanoramas(this.panoramas)), this.sh && (params.sh = $.loadSH(this.sh)), this.textures && (params.texture = $.loadTextures(this.textures)), this.geometries && (params.geometry = $.loadGeometries(this.geometries)), r.props(params);
    };
    /** @type {function(!Object): undefined} */
    module.exports = Renderer;
}, function(canCreateDiscussions, exports, moment) {
    (function(root) {
        /**
         * @param {string} id
         * @param {!Function} clearFn
         * @return {undefined}
         */
        function Timeout(id, clearFn) {
            /** @type {string} */
            this._id = id;
            /** @type {!Function} */
            this._clearFn = clearFn;
        }
        var target = void 0 !== root && root || "undefined" != typeof self && self || window;
        /** @type {function(this:!Function, ...*): *} */
        var apply = Function.prototype.apply;
        /**
         * @return {?}
         */
        exports.setTimeout = function() {
            return new Timeout(apply.call(setTimeout, target, arguments), clearTimeout);
        };
        /**
         * @return {?}
         */
        exports.setInterval = function() {
            return new Timeout(apply.call(setInterval, target, arguments), clearInterval);
        };
        /** @type {function(!Object): undefined} */
        exports.clearTimeout = exports.clearInterval = function(n) {
            if (n) {
                n.close();
            }
        };
        /** @type {function(): undefined} */
        Timeout.prototype.unref = Timeout.prototype.ref = function() {
        };
        /**
         * @return {undefined}
         */
        Timeout.prototype.close = function() {
            this._clearFn.call(target, this._id);
        };
        /**
         * @param {?} item
         * @param {number} msecs
         * @return {undefined}
         */
        exports.enroll = function(item, msecs) {
            clearTimeout(item._idleTimeoutId);
            /** @type {number} */
            item._idleTimeout = msecs;
        };
        /**
         * @param {?} item
         * @return {undefined}
         */
        exports.unenroll = function(item) {
            clearTimeout(item._idleTimeoutId);
            /** @type {number} */
            item._idleTimeout = -1;
        };
        /** @type {function(!Object): undefined} */
        exports._unrefActive = exports.active = function(item) {
            clearTimeout(item._idleTimeoutId);
            var msecs = item._idleTimeout;
            if (msecs >= 0) {
                /** @type {number} */
                item._idleTimeoutId = setTimeout(function() {
                    if (item._onTimeout) {
                        item._onTimeout();
                    }
                }, msecs);
            }
        };
        moment(20);
        exports.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== root && root.setImmediate || this && this.setImmediate;
        exports.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== root && root.clearImmediate || this && this.clearImmediate;
    }).call(exports, moment(3));
}, function(canCreateDiscussions, e, __webpack_require__) {
    (function(b, $process) {
        !function(global, elem) {
            /**
             * @param {string} callback
             * @return {?}
             */
            function setImmediate(callback) {
                if ("function" != typeof callback) {
                    /** @type {!Function} */
                    callback = new Function("" + callback);
                }
                /** @type {!Array} */
                var args = new Array(arguments.length - 1);
                /** @type {number} */
                var i = 0;
                for (; i < args.length; i++) {
                    args[i] = arguments[i + 1];
                }
                var handler = {
                    callback : callback,
                    args : args
                };
                return obj[id] = handler, registerImmediate(id), id++;
            }
            /**
             * @param {!Function} pkg
             * @return {undefined}
             */
            function clear(pkg) {
                delete obj[pkg];
            }
            /**
             * @param {!Object} options
             * @return {undefined}
             */
            function func(options) {
                var callback = options.callback;
                var args = options.args;
                switch(args.length) {
                    case 0:
                        callback();
                        break;
                    case 1:
                        callback(args[0]);
                        break;
                    case 2:
                        callback(args[0], args[1]);
                        break;
                    case 3:
                        callback(args[0], args[1], args[2]);
                        break;
                    default:
                        callback.apply(elem, args);
                }
            }
            /**
             * @param {?} req
             * @return {undefined}
             */
            function callback(req) {
                if (l) {
                    setTimeout(callback, 0, req);
                } else {
                    var id = obj[req];
                    if (id) {
                        /** @type {boolean} */
                        l = true;
                        try {
                            func(id);
                        } finally {
                            clear(req);
                            /** @type {boolean} */
                            l = false;
                        }
                    }
                }
            }
            if (!global.setImmediate) {
                var registerImmediate;
                /** @type {number} */
                var id = 1;
                var obj = {};
                /** @type {boolean} */
                var l = false;
                var document = global.document;
                /** @type {(Object|null)} */
                var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
                attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
                if ("[object process]" === {}.toString.call(global.process)) {
                    (function() {
                        /**
                         * @param {number} shape
                         * @return {undefined}
                         */
                        registerImmediate = function(shape) {
                            $process.nextTick(function() {
                                callback(shape);
                            });
                        };
                    })();
                } else {
                    if (function() {
                        if (global.postMessage && !global.importScripts) {
                            /** @type {boolean} */
                            var e = true;
                            var oldOnMessage = global.onmessage;
                            return global.onmessage = function() {
                                /** @type {boolean} */
                                e = false;
                            }, global.postMessage("", "*"), global.onmessage = oldOnMessage, e;
                        }
                    }()) {
                        (function() {
                            /** @type {string} */
                            var prefix = "setImmediate$" + Math.random() + "$";
                            /**
                             * @param {!Object} event
                             * @return {undefined}
                             */
                            var onGlobalMessage = function(event) {
                                if (event.source === global && "string" == typeof event.data && 0 === event.data.indexOf(prefix)) {
                                    callback(+event.data.slice(prefix.length));
                                }
                            };
                            if (global.addEventListener) {
                                global.addEventListener("message", onGlobalMessage, false);
                            } else {
                                global.attachEvent("onmessage", onGlobalMessage);
                            }
                            /**
                             * @param {number} text
                             * @return {undefined}
                             */
                            registerImmediate = function(text) {
                                global.postMessage(prefix + text, "*");
                            };
                        })();
                    } else {
                        if (global.MessageChannel) {
                            (function() {
                                /** @type {!MessageChannel} */
                                var channel = new MessageChannel;
                                /**
                                 * @param {!Object} event
                                 * @return {undefined}
                                 */
                                channel.port1.onmessage = function(event) {
                                    callback(event.data);
                                };
                                /**
                                 * @param {number} handle
                                 * @return {undefined}
                                 */
                                registerImmediate = function(handle) {
                                    channel.port2.postMessage(handle);
                                };
                            })();
                        } else {
                            if (document && "onreadystatechange" in document.createElement("script")) {
                                (function() {
                                    var documentFragment = document.documentElement;
                                    /**
                                     * @param {number} shape
                                     * @return {undefined}
                                     */
                                    registerImmediate = function(shape) {
                                        var element = document.createElement("script");
                                        /**
                                         * @return {undefined}
                                         */
                                        element.onreadystatechange = function() {
                                            callback(shape);
                                            /** @type {null} */
                                            element.onreadystatechange = null;
                                            documentFragment.removeChild(element);
                                            /** @type {null} */
                                            element = null;
                                        };
                                        documentFragment.appendChild(element);
                                    };
                                })();
                            } else {
                                (function() {
                                    /**
                                     * @param {number} handle
                                     * @return {undefined}
                                     */
                                    registerImmediate = function(handle) {
                                        setTimeout(callback, 0, handle);
                                    };
                                })();
                            }
                        }
                    }
                }
                /** @type {function(string): ?} */
                attachTo.setImmediate = setImmediate;
                /** @type {function(!Function): undefined} */
                attachTo.clearImmediate = clear;
            }
        }("undefined" == typeof self ? void 0 === b ? this : b : self);
    }).call(e, __webpack_require__(3), __webpack_require__(7));
}, function(mixin, utils, require) {
    var paths = require(22);
    var assert = require(23);
    var h = require(24);
    var self = require(25);
    /** @type {function(): ?} */
    utils = mixin.exports = function() {
        var uris = h(arguments).map(path);
        return self.isUri(uris[0]) ? assert.apply(assert, uris) : paths.join.apply(paths, uris);
    };
    /** @type {function(!Object, ?, !Object): ?} */
    var path = (utils.isUrl = function(value) {
        return self.isUri(value) || "http://" === value || "https://" === value || "ftp://" === value;
    }, utils.replaceUndefined = function(t, value, key) {
        return void 0 === t || null === t ? self.isUri(key[0]) ? "/" : paths.sep : t;
    });
}, function(canCreateDiscussions, exports, moment) {
    (function(extra) {
        /**
         * @param {!Array} res
         * @param {boolean} parts
         * @return {?}
         */
        function normalizeArray(res, parts) {
            /** @type {number} */
            var n = 0;
            /** @type {number} */
            var level = res.length - 1;
            for (; level >= 0; level--) {
                var code = res[level];
                if ("." === code) {
                    res.splice(level, 1);
                } else {
                    if (".." === code) {
                        res.splice(level, 1);
                        n++;
                    } else {
                        if (n) {
                            res.splice(level, 1);
                            n--;
                        }
                    }
                }
            }
            if (parts) {
                for (; n--; n) {
                    res.unshift("..");
                }
            }
            return res;
        }
        /**
         * @param {!Array} m
         * @param {!Function} cb
         * @return {?}
         */
        function filter(m, cb) {
            if (m.filter) {
                return m.filter(cb);
            }
            /** @type {!Array} */
            var ret = [];
            /** @type {number} */
            var i = 0;
            for (; i < m.length; i++) {
                if (cb(m[i], i, m)) {
                    ret.push(m[i]);
                }
            }
            return ret;
        }
        /** @type {!RegExp} */
        var testFileRegex = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        /**
         * @param {?} filename
         * @return {?}
         */
        var splitPath = function(filename) {
            return testFileRegex.exec(filename).slice(1);
        };
        /**
         * @return {?}
         */
        exports.resolve = function() {
            /** @type {string} */
            var resolvedPath = "";
            /** @type {boolean} */
            var resolvedAbsolute = false;
            /** @type {number} */
            var i = arguments.length - 1;
            for (; i >= -1 && !resolvedAbsolute; i--) {
                var path = i >= 0 ? arguments[i] : extra.cwd();
                if ("string" != typeof path) {
                    throw new TypeError("Arguments to path.resolve must be strings");
                }
                if (path) {
                    /** @type {string} */
                    resolvedPath = path + "/" + resolvedPath;
                    /** @type {boolean} */
                    resolvedAbsolute = "/" === path.charAt(0);
                }
            }
            return resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(canCreateDiscussions) {
                return !!canCreateDiscussions;
            }), !resolvedAbsolute).join("/"), (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
        };
        /**
         * @param {string} path
         * @return {?}
         */
        exports.normalize = function(path) {
            var isAbsolute = exports.isAbsolute(path);
            /** @type {boolean} */
            var synthetic = "/" === getInfoBoxData(path, -1);
            return path = normalizeArray(filter(path.split("/"), function(canCreateDiscussions) {
                return !!canCreateDiscussions;
            }), !isAbsolute).join("/"), path || isAbsolute || (path = "."), path && synthetic && (path = path + "/"), (isAbsolute ? "/" : "") + path;
        };
        /**
         * @param {string} pathname
         * @return {?}
         */
        exports.isAbsolute = function(pathname) {
            return "/" === pathname.charAt(0);
        };
        /**
         * @return {?}
         */
        exports.join = function() {
            /** @type {!Array<?>} */
            var t = Array.prototype.slice.call(arguments, 0);
            return exports.normalize(filter(t, function(v, canCreateDiscussions) {
                if ("string" != typeof v) {
                    throw new TypeError("Arguments to path.join must be strings");
                }
                return v;
            }).join("/"));
        };
        /**
         * @param {string} text
         * @param {string} from
         * @return {?}
         */
        exports.relative = function(text, from) {
            /**
             * @param {!Array} s
             * @return {?}
             */
            function trim(s) {
                /** @type {number} */
                var i = 0;
                for (; i < s.length && "" === s[i]; i++) {
                }
                /** @type {number} */
                var k = s.length - 1;
                for (; k >= 0 && "" === s[k]; k--) {
                }
                return i > k ? [] : s.slice(i, k - i + 1);
            }
            text = exports.resolve(text).substr(1);
            from = exports.resolve(from).substr(1);
            var fromParts = trim(text.split("/"));
            var toParts = trim(from.split("/"));
            /** @type {number} */
            var number = Math.min(fromParts.length, toParts.length);
            /** @type {number} */
            var b = number;
            /** @type {number} */
            var i = 0;
            for (; i < number; i++) {
                if (fromParts[i] !== toParts[i]) {
                    /** @type {number} */
                    b = i;
                    break;
                }
            }
            /** @type {!Array} */
            var hex = [];
            /** @type {number} */
            i = b;
            for (; i < fromParts.length; i++) {
                hex.push("..");
            }
            return hex = hex.concat(toParts.slice(b)), hex.join("/");
        };
        /** @type {string} */
        exports.sep = "/";
        /** @type {string} */
        exports.delimiter = ":";
        /**
         * @param {?} path
         * @return {?}
         */
        exports.dirname = function(path) {
            var result = splitPath(path);
            var type = result[0];
            var i = result[1];
            return type || i ? (i && (i = i.substr(0, i.length - 1)), type + i) : ".";
        };
        /**
         * @param {?} path
         * @param {string} ext
         * @return {?}
         */
        exports.basename = function(path, ext) {
            var font = splitPath(path)[2];
            return ext && font.substr(-1 * ext.length) === ext && (font = font.substr(0, font.length - ext.length)), font;
        };
        /**
         * @param {?} path
         * @return {?}
         */
        exports.extname = function(path) {
            return splitPath(path)[3];
        };
        /** @type {function(string, number, ?): ?} */
        var getInfoBoxData = "b" === "ab".substr(-1) ? function(t, e, n) {
            return t.substr(e, n);
        } : function(p, i, n) {
            return i < 0 && (i = p.length + i), p.substr(i, n);
        };
    }).call(exports, moment(7));
}, function(mixin, canCreateDiscussions) {
    /**
     * @param {string} phone
     * @return {?}
     */
    function normalize(phone) {
        return phone.replace(/[\/]+/g, "/").replace(/\/\?/g, "?").replace(/\/#/g, "#").replace(/:\//g, "://");
    }
    /**
     * @return {?}
     */
    mixin.exports = function() {
        return normalize([].slice.call(arguments, 0).join("/"));
    };
}, function(mixin, canCreateDiscussions) {
    /**
     * @param {!Array} value
     * @return {?}
     */
    function getStringTag(value) {
        return "[object Object]" === Object.prototype.toString.call(value);
    }
    /**
     * @param {!Array} value
     * @return {?}
     */
    function validateBaseArgs(value) {
        return "[object Arguments]" === Object.prototype.toString.call(value);
    }
    /**
     * @param {!Array} val
     * @return {?}
     */
    function makeStyleLoaders(val) {
        return Object.keys(val).map(function(attrPropertyName) {
            return val[attrPropertyName];
        });
    }
    /**
     * @param {!Array} value
     * @param {!Object} type
     * @return {?}
     */
    mixin.exports = function(value, type) {
        return value || (value = []), validateBaseArgs(value) && (value = [].splice.call(value, 0)), getStringTag(value) && type && (value = makeStyleLoaders(value)), Array.isArray(value) ? value : [value];
    };
}, function(req, e, throttle) {
    (function(moduleTransport) {
        !function(module) {
            /**
             * @param {string} value
             * @return {?}
             */
            function is_iri(value) {
                if (value && !/[^a-z0-9:\/\?#\[\]@!\$&'\(\)\*\+,;=\.\-_~%]/i.test(value) && !/%[^0-9a-f]/i.test(value) && !/%[0-9a-f](:?[^0-9a-f]|$)/i.test(value)) {
                    /** @type {!Array} */
                    var result = [];
                    /** @type {string} */
                    var n = "";
                    /** @type {string} */
                    var lang = "";
                    /** @type {string} */
                    var expression = "";
                    /** @type {string} */
                    var body = "";
                    /** @type {string} */
                    var prefix = "";
                    /** @type {string} */
                    var s = "";
                    if (result = test(value), n = result[1], lang = result[2], expression = result[3], body = result[4], prefix = result[5], n && n.length && expression.length >= 0) {
                        if (lang && lang.length) {
                            if (0 !== expression.length && !/^\//.test(expression)) {
                                return;
                            }
                        } else {
                            if (/^\/\//.test(expression)) {
                                return;
                            }
                        }
                        if (/^[a-z][a-z0-9\+\-\.]*$/.test(n.toLowerCase())) {
                            return s = s + (n + ":"), lang && lang.length && (s = s + ("//" + lang)), s = s + expression, body && body.length && (s = s + ("?" + body)), prefix && prefix.length && (s = s + ("#" + prefix)), s;
                        }
                    }
                }
            }
            /**
             * @param {string} el
             * @param {boolean} value
             * @return {?}
             */
            function is_http_iri(el, value) {
                if (is_iri(el)) {
                    /** @type {!Array} */
                    var pos = [];
                    /** @type {string} */
                    var i = "";
                    /** @type {string} */
                    var p = "";
                    /** @type {string} */
                    var value = "";
                    /** @type {string} */
                    var c = "";
                    /** @type {string} */
                    var v = "";
                    /** @type {string} */
                    var x = "";
                    /** @type {string} */
                    var str = "";
                    if (pos = test(el), i = pos[1], p = pos[2], value = pos[3], v = pos[4], x = pos[5], i) {
                        if (value) {
                            if ("https" != i.toLowerCase()) {
                                return;
                            }
                        } else {
                            if ("http" != i.toLowerCase()) {
                                return;
                            }
                        }
                        if (p) {
                            return /:(\d+)$/.test(p) && (c = p.match(/:(\d+)$/)[0], p = p.replace(/:\d+$/, "")), str = str + (i + ":"), str = str + ("//" + p), c && (str = str + c), str = str + value, v && v.length && (str = str + ("?" + v)), x && x.length && (str = str + ("#" + x)), str;
                        }
                    }
                }
            }
            /**
             * @param {string} value
             * @return {?}
             */
            function is_https_iri(value) {
                return is_http_iri(value, true);
            }
            /**
             * @param {string} value
             * @return {?}
             */
            function is_web_iri(value) {
                return is_http_iri(value) || is_https_iri(value);
            }
            /** @type {function(string): ?} */
            module.exports.is_uri = is_iri;
            /** @type {function(string, boolean): ?} */
            module.exports.is_http_uri = is_http_iri;
            /** @type {function(string): ?} */
            module.exports.is_https_uri = is_https_iri;
            /** @type {function(string): ?} */
            module.exports.is_web_uri = is_web_iri;
            /** @type {function(string): ?} */
            module.exports.isUri = is_iri;
            /** @type {function(string, boolean): ?} */
            module.exports.isHttpUri = is_http_iri;
            /** @type {function(string): ?} */
            module.exports.isHttpsUri = is_https_iri;
            /** @type {function(string): ?} */
            module.exports.isWebUri = is_web_iri;
            /**
             * @param {string} regex
             * @return {?}
             */
            var test = function(regex) {
                return regex.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
            };
        }(moduleTransport);
    }).call(e, throttle(8)(req));
}, function(module, canCreateDiscussions) {
    /**
     * @param {number} y
     * @param {?} d
     * @param {!Object} p
     * @return {undefined}
     */
    function c(y, d, p) {
        /** @type {number} */
        var i = y * y;
        /** @type {number} */
        var j = 2 * y * y;
        /** @type {number} */
        var name = 3 * y * y;
        /** @type {number} */
        var n = 0;
        /** @type {number} */
        var k = 0;
        for (; k < i; k++) {
            p[n++] = d[k];
            p[n++] = d[k + i];
            p[n++] = d[k + j];
            p[n++] = d[k + name];
        }
    }
    /**
     * @param {number} size
     * @param {!Object} options
     * @param {string} manager
     * @return {undefined}
     */
    var MTLLoader = function(size, options, manager) {
        this.manager = void 0 !== manager ? manager : THREE.DefaultLoadingManager;
        /** @type {number} */
        this._size = size;
        /** @type {!Object} */
        this._interleaving = options;
    };
    /** @type {!Object} */
    MTLLoader.prototype = Object.create(THREE.BinaryTextureLoader.prototype);
    /**
     * @param {?} res
     * @return {?}
     */
    MTLLoader.prototype._parser = function(res) {
        var v;
        var r = this._size;
        if (this._interleaving) {
            /** @type {number} */
            var b1 = r * r * 4;
            /** @type {!Uint8Array} */
            var data = new Uint8Array(res);
            /** @type {!Uint8Array} */
            v = new Uint8Array(b1);
            c(r, data, v);
        } else {
            /** @type {!Uint8Array} */
            v = new Uint8Array(res);
        }
        return {
            width : r,
            height : r,
            data : v,
            format : THREE.RGBAFormat,
            minFilter : THREE.LinearFilter,
            magFilter : THREE.LinearFilter,
            wrapS : THREE.ClampToEdgeWrapping,
            wrapT : THREE.ClampToEdgeWrapping,
            type : THREE.UnsignedByteType
        };
    };
    /** @type {function(number, !Object, string): undefined} */
    module.exports = MTLLoader;
}, function(module, canCreateDiscussions) {
    /**
     * @param {number} t
     * @param {?} data
     * @param {?} array
     * @return {undefined}
     */
    function findErrorByList(t, data, array) {
        /** @type {number} */
        var d = t * t;
        /** @type {number} */
        var x = 2 * t * t;
        /** @type {number} */
        var index = 3 * t * t;
        /** @type {number} */
        var item = 0;
        /** @type {number} */
        var i = 0;
        for (; i < d; i++) {
            array[item++] = data[i];
            array[item++] = data[i + d];
            array[item++] = data[i + x];
            array[item++] = data[i + index];
        }
    }
    /**
     * @param {number} size
     * @param {boolean} options
     * @param {string} manager
     * @return {undefined}
     */
    var MTLLoader = function(size, options, manager) {
        this.manager = void 0 !== manager ? manager : THREE.DefaultLoadingManager;
        /** @type {number} */
        this._size = size;
        /** @type {boolean} */
        this._interleaved = options;
    };
    /** @type {!Object} */
    MTLLoader.prototype = Object.create(THREE.CompressedTextureLoader.prototype);
    /**
     * @param {!ArrayBuffer} buffer
     * @return {?}
     */
    MTLLoader.prototype._parser = function(buffer) {
        /** @type {!Array} */
        var e = [];
        /** @type {number} */
        var order = Math.log2(this._size);
        /** @type {number} */
        var dataOffset = 0;
        /** @type {number} */
        var i = 0;
        for (; i <= order; i++) {
            /** @type {number} */
            var r = Math.pow(2, order - i);
            /** @type {number} */
            var dataLength = r * r * 4;
            if (dataOffset >= buffer.byteLength) {
                break;
            }
            /** @type {number} */
            var startKey = 0;
            for (; startKey < 6; startKey++) {
                if (e[startKey] || (e[startKey] = []), this._interleaved) {
                    /** @type {!Uint8Array} */
                    var srcBuffer = new Uint8Array(buffer, dataOffset, dataLength);
                    /** @type {!Uint8Array} */
                    var byteArray = new Uint8Array(dataLength);
                    findErrorByList(r, srcBuffer, byteArray);
                } else {
                    /** @type {!Uint8Array} */
                    byteArray = new Uint8Array(buffer, dataOffset, dataLength);
                }
                e[startKey].push({
                    data : byteArray,
                    width : r,
                    height : r
                });
                /** @type {number} */
                dataOffset = dataOffset + dataLength;
            }
        }
        return {
            isCubemap : true,
            mipmaps : _.flatten(e),
            mipmapCount : order + 1,
            width : this._size,
            height : this._size,
            format : THREE.RGBAFormat,
            minFilter : THREE.LinearMipMapLinearFilter,
            magFilter : THREE.LinearFilter,
            wrapS : THREE.ClampToEdgeWrapping,
            wrapT : THREE.ClampToEdgeWrapping,
            type : THREE.UnsignedByteType
        };
    };
    /** @type {function(number): number} */
    Math.log2 = Math.log2 || function(score) {
        return Math.log(score) * Math.LOG2E;
    };
    /** @type {function(number, boolean, string): undefined} */
    module.exports = MTLLoader;
}, function(module, canCreateDiscussions) {
    /**
     * @param {!Array} src
     * @return {?}
     */
    function empty(src) {
        var delta = src.slice(0, 27);
        /** @type {number} */
        var v = 1 / (2 * Math.sqrt(Math.PI));
        /** @type {number} */
        var test_6 = -.5 * Math.sqrt(3 / Math.PI);
        /** @type {number} */
        var $animation = -test_6;
        /** @type {number} */
        var acquireKernelInfoEpic = test_6;
        /** @type {number} */
        var loadConfigEpic = .5 * Math.sqrt(15 / Math.PI);
        /** @type {number} */
        var currentRelations = -loadConfigEpic;
        /** @type {number} */
        var c = .25 * Math.sqrt(5 / Math.PI);
        /** @type {number} */
        var addedRelations = currentRelations;
        /** @type {number} */
        var l = .25 * Math.sqrt(15 / Math.PI);
        return [v, v, v, test_6, test_6, test_6, $animation, $animation, $animation, acquireKernelInfoEpic, acquireKernelInfoEpic, acquireKernelInfoEpic, loadConfigEpic, loadConfigEpic, loadConfigEpic, currentRelations, currentRelations, currentRelations, c, c, c, addedRelations, addedRelations, addedRelations, l, l, l].map(function(position, i) {
            return position * delta[i];
        });
    }
    /**
     * @param {string} size
     * @return {undefined}
     */
    var DataFrameReader = function(size) {
        THREE.XHRLoader.call(this);
        this.manager = void 0 !== size ? size : THREE.DefaultLoadingManager;
    };
    /** @type {!Object} */
    DataFrameReader.prototype = Object.create(THREE.XHRLoader.prototype);
    /**
     * @param {string} fileName
     * @param {!Function} err
     * @param {!Function} tree
     * @param {!Function} url
     * @return {undefined}
     */
    DataFrameReader.prototype.load = function(fileName, err, tree, url) {
        THREE.XHRLoader.prototype.load.call(this, fileName, function(manifest) {
            /** @type {*} */
            var list = JSON.parse(manifest);
            var result = empty(list);
            err(result);
        }, tree, url);
    };
    /** @type {function(string): undefined} */
    module.exports = DataFrameReader;
}, function(m, canCreateDiscussions) {
    /**
     * @param {string} size
     * @return {undefined}
     */
    var load = function(size) {
        THREE.XHRLoader.call(this);
        this.setResponseType("arraybuffer");
        this.manager = void 0 !== size ? size : THREE.DefaultLoadingManager;
    };
    /** @type {!Object} */
    load.prototype = Object.create(THREE.XHRLoader.prototype);
    /** @type {function(string): undefined} */
    m.exports = load;
}, function(module, canCreateDiscussions, create) {
    var _getServer = create(6);
    create(31);
    var shape = create(0);
    var instance = (create(10), create(9), {});
    /**
     * @param {string} value
     * @param {string} name
     * @param {!Object} options
     * @param {string} data
     * @return {?}
     */
    instance.loadScene = function(value, name, options, data) {
        return new _getServer(function(generateBuildHash, a) {
            var addedRenderer = (options.renderer, shape.getGeometry(value));
            if (addedRenderer) {
                shape.sceneLoader.setBinaryGeometryBuffer(addedRenderer);
            }
            shape.loadScene(name + value + (data || ".json")).spread(function(self, canCreateDiscussions) {
                var camera;
                self.materials = {};
                if (self.cameras && self.cameras.length > 0) {
                    camera = self.cameras[0];
                }
                if (camera) {
                    /** @type {number} */
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                } else {
                    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .01, 2E3);
                    camera.position.set(-3.5, 2, 3);
                }
                self.traverse(function(object) {
                    if (object.material) {
                        if (object.material.materials) {
                            object.material.materials.forEach(function(b) {
                                /** @type {number} */
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
                /** @type {string} */
                options.scene = self;
                options.scenes.push(self);
                options.camera = camera;
                generateBuildHash(self);
            });
        });
    };
    module.exports = instance;
}, function(canCreateDiscussions, isSlidingUp, fn) {
    var data = (fn(2), fn(10));
    var res = fn(33);
    /** @type {function(!Object): ?} */
    var RandomBaseTimeSeriesDataModel = (fn(0), THREE.MaterialLoader.prototype.parse);
    /**
     * @param {!Object} options
     * @return {?}
     */
    THREE.MaterialLoader.prototype.parse = function(options) {
        var json = RandomBaseTimeSeriesDataModel.call(this, options);
        if (options.customType && "MatcapMaterial" === options.customType) {
            return res.create({
                uuid : options.uuid,
                name : options.name,
                normalMap : json.normalMap,
                matcapMap : THREE.ImageUtils.loadTexture("textures/matcap.jpg"),
                normalMapFactor : 1
            });
        }
        if (options.customType && "PBRMaterial" === options.customType) {
            var a = options.metalGlossMap ? this.getTexture(options.metalGlossMap) : null;
            var s = options.map2 ? this.getTexture(options.map2) : null;
            var c = options.normalMap2 ? this.getTexture(options.normalMap2) : null;
            var u = options.aoMap2 ? this.getTexture(options.aoMap2) : null;
            var l = options.lightMapM ? this.getTexture(options.lightMapM) : null;
            var h = options.lightMapDir ? this.getTexture(options.lightMapDir) : null;
            var materialEmissiveMapRow = options.emissiveMap ? this.getTexture(options.emissiveMap) : null;
            var p = options.packedPBRMap ? this.getTexture(options.packedPBRMap) : null;
            return data.create({
                vertexShader : fn(34),
                fragmentShader : fn(35),
                uuid : options.uuid,
                name : options.name,
                color : options.color,
                opacity : json.opacity,
                transparent : json.transparent,
                alphaTest : json.alphaTest,
                environment : options.environment,
                exposure : options.exposure,
                albedoMap : json.map,
                albedoMap2 : s,
                metalGlossMap : a,
                packedMap : p,
                metalFactor : options.metalFactor,
                glossFactor : options.glossFactor,
                normalMapFactor : options.normalFactor,
                normalMap : json.normalMap,
                normalMap2 : c,
                lightMap : json.lightMap,
                lightMapM : l,
                lightMapDir : h,
                aoMap : json.aoMap,
                aoMap2 : u,
                aoFactor : options.aoFactor,
                occludeSpecular : options.occludeSpecular,
                emissiveMap : materialEmissiveMapRow
            });
        }
        if ("SkyboxMaterial" === options.customType) {
            var shader = THREE.ShaderLib.cube;
            json.vertexShader = fn(36);
            json.fragmentShader = fn(37);
            json.uniforms = THREE.UniformsUtils.clone(shader.uniforms);
            json.uniforms.tCube.value = this.getTexture(options.cubemap);
        }
        return json;
    };
}, function(module, canCreateDiscussions) {
    /** @type {!Array} */
    var keys = ["side", "alphaTest", "transparent", "depthWrite", "shading", "wireframe"];
    /**
     * @param {!Array} s
     * @return {undefined}
     */
    var Link = function(s) {
        s = s || {};
        THREE.RawShaderMaterial.call(this, s);
        _.each(keys, function(i) {
            var entry = s[i];
            if (void 0 !== entry) {
                this[i] = entry;
            }
        }, this);
    };
    Link.inherit(THREE.RawShaderMaterial, {
        onPropertyChange : function(prop, e) {
            Object.defineProperty(this, prop, {
                get : function() {
                    return this["_" + prop];
                },
                set : function(v) {
                    /** @type {number} */
                    this["_" + prop] = v;
                    e.call(this, v);
                }
            });
        },
        clone : function(dataAndEvents) {
            var material = dataAndEvents || new Material;
            return THREE.RawShaderMaterial.prototype.clone.call(this, material), material.shading = this.shading, material.wireframe = this.wireframe, material.wireframeLinewidth = this.wireframeLinewidth, material.fog = this.fog, material.lights = this.lights, material.vertexColors = this.vertexColors, material.skinning = this.skinning, material.morphTargets = this.morphTargets, material.morphNormals = this.morphNormals, material;
        }
    });
    /** @type {function(!Array): undefined} */
    module.exports = Link;
}, function(module, canCreateDiscussions, require) {
    /**
     * @param {?} value
     * @param {string} defaultValue
     * @return {?}
     */
    function optionalParameter(value, defaultValue) {
        return void 0 !== value ? value : defaultValue;
    }
    var child = require(2);
    var layer = require(0);
    var a = {
        normalMapFactor : "uNormalMapFactor",
        normalMap : "sTextureNormalMap",
        matcapMap : "sTextureAOMap"
    };
    /**
     * @param {!Function} args
     * @return {undefined}
     */
    var update = function(args) {
        /** @type {!Object} */
        args = Object.assign({
            vertexShader : args.vertexShader,
            fragmentShader : args.fragmentShader,
            uniforms : {
                uNormalMapFactor : {
                    type : "f",
                    value : 1
                },
                sTextureMatcapMap : {
                    type : "t",
                    value : null
                },
                sTextureNormalMap : {
                    type : "t",
                    value : null
                },
                uFlipY : {
                    type : "i",
                    value : 0
                },
                uOutputLinear : {
                    type : "i",
                    value : 0
                }
            }
        }, args);
        child.call(this, args);
        Object.keys(this.uniforms).forEach(function(propertyName) {
            this.onPropertyChange(propertyName, function(initSBC) {
                /** @type {!Object} */
                this.uniforms[propertyName].value = initSBC;
            });
        }, this);
        _.each(a, function(javascriptName, prop) {
            this.onPropertyChange(prop, function(jsonName) {
                this[javascriptName] = jsonName;
            });
        }, this);
        this.extensions = {
            derivatives : true
        };
    };
    update.inherit(child, {
        clone : function(params) {
            var data = params || new update;
            return child.prototype.clone.call(this, data), data.name = this.name, data.transparent = this.transparent, _.each(this.uniforms, function(dom, name) {
                var value = dom.type;
                if ("v2" === value || "m4" === value) {
                    data.uniforms[name].value.copy(dom.value);
                } else {
                    data.uniforms[name].value = dom.value;
                }
            }, this), data;
        }
    });
    /**
     * @param {!Object} material
     * @return {?}
     */
    update.create = function(material) {
        var source = new update;
        source.uuid = material.uuid;
        source.name = material.name;
        source.transparent = optionalParameter(material.transparent, false);
        source.polygonOffset = optionalParameter(material.polygonOffset, false);
        source.polygonOffsetUnits = optionalParameter(material.polygonOffsetUnits, 0);
        source.polygonOffsetFactor = optionalParameter(material.polygonOffsetFactor, 0);
        var pm = (layer.getTexture("white.png"), material.normalMap);
        var color = material.matcapMap;
        return source.uNormalMapFactor = optionalParameter(material.normalMapFactor, 1), source.uFlipY = optionalParameter(material.flipNormals, 0), source.side = optionalParameter(material.side, THREE.FrontSide), pm.needsUpdate = true, color.needsUpdate = true, source.sTextureNormalMap = pm, source.sTextureMatcapMap = color, source;
    };
    /** @type {function(!Function): undefined} */
    module.exports = update;
}, function(mixin, canCreateDiscussions) {
    /** @type {string} */
    mixin.exports = "attribute vec3 position;\nattribute vec3 normal;\nattribute vec4 tangent;\nattribute vec2 uv;\nattribute vec2 uv2;\n\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\n\nuniform vec4 offsetRepeat;\nuniform vec4 offsetRepeatDetail;\n\nvarying vec3 FragNormal;\nvarying vec4 FragTangent;\nvarying vec4 FragEyeVector;\nvarying vec2 vUv;\n\n#if defined(USE_ALBEDO2) || defined(USE_NORMALMAP2) || defined(USE_AOMAP2)\nvarying vec2 vUvDetail;\n#endif\n\n#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif\n\nvoid main() {\n  vec4 worldPosition = modelMatrix * vec4(position, 1.0);\n\n  FragEyeVector = viewMatrix * worldPosition;\n\n  gl_Position = projectionMatrix * FragEyeVector;\n\n  vUv = uv.xy * offsetRepeat.zw + offsetRepeat.xy;\n\n  #if defined(USE_ALBEDO2) || defined(USE_NORMALMAP2) || defined(USE_AOMAP2)\n  vUvDetail = uv.xy * offsetRepeatDetail.zw + offsetRepeatDetail.xy;\n  #endif\n\n  FragNormal = normalMatrix * normal;\n  FragTangent.xyz = normalMatrix * tangent.xyz;\n  FragTangent.w = tangent.w;\n\n  #ifdef USE_LIGHTMAP\n  vUv2 = uv2.xy;\n  #endif\n}\n";
}, function(mixin, canCreateDiscussions) {
    /** @type {string} */
    mixin.exports = "#define MOBILE\n#define LUV\n\nuniform float uAOPBRFactor;\nuniform float uAlbedoPBRFactor;\nuniform float uEnvironmentExposure;\nuniform float uGlossinessPBRFactor;\nuniform float uMetalnessPBRFactor;\nuniform float uNormalMapFactor;\nuniform float uOpacityFactor;\nuniform float uSpecularF0Factor;\n\nuniform int uMode;\nuniform vec3 uColor;\nuniform float uAlphaTest;\n\nuniform int uFlipY;\nuniform int uOccludeSpecular;\nuniform int uOutputLinear;\n\nuniform samplerCube sSpecularPBR;\nuniform sampler2D sPanoramaPBR;\n\nuniform sampler2D sTextureAlbedoMap;\nuniform sampler2D sTextureAlbedoMap2;\nuniform sampler2D sTextureNormalMap;\nuniform sampler2D sTextureNormalMap2;\n#ifdef USE_PACKEDMAP\nuniform sampler2D sTexturePackedMap;\n#else\nuniform sampler2D sTextureAOMap;\nuniform sampler2D sTextureMetalGlossMap;\n#endif\nuniform sampler2D sTextureAOMap2;\nuniform sampler2D sTextureEmissiveMap;\n\nuniform vec2 uTextureEnvironmentSpecularPBRLodRange;\nuniform vec2 uTextureEnvironmentSpecularPBRTextureSize;\nuniform vec3 uDiffuseSPH[9];\nuniform mat4 uEnvironmentTransform;\n\nvarying vec3 FragNormal;\nvarying vec4 FragTangent;\nvarying vec4 FragEyeVector;\nvarying vec2 vUv;\n\n#if defined(USE_ALBEDO2) || defined(USE_NORMALMAP2) || defined(USE_AOMAP2)\nvarying vec2 vUvDetail;\n#endif\n\n#ifdef USE_LIGHTMAP\n  uniform sampler2D sTextureLightMap;\n  uniform sampler2D sTextureLightMapM;\n  varying vec2 vUv2;\n#endif\n\n#ifdef USE_DIR_LIGHT\nuniform vec3 viewLightDir;\nuniform vec3 lightColor;\nuniform int highlights;\n#endif\n\nvec3 DecodeLightmapRGBM(vec4 data, vec2 decodeInstructions) {\n  return (decodeInstructions.x * pow(abs(data.a), decodeInstructions.y)) * data.rgb;\n}\n\nfloat linearTosRGB(const in float c) {\n  if (c >= 1.0) return 1.0;\n  float S1 = sqrt(c);\n  float S2 = sqrt(S1);\n  float S3 = sqrt(S2);\n  return 0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * c;\n}\n\nvec3 linearTosRGB(const in vec3 c) {\n  vec3 cm = c;\n  vec3 S1 = sqrt(cm);\n  vec3 S2 = sqrt(S1);\n  vec3 S3 = sqrt(S2);\n  return 0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * cm;\n}\n\nvec4 linearTosRGB(const in vec4 c) {\n  vec3 cm = min(c.rgb, 1.0);\n  vec3 S1 = sqrt(cm);\n  vec3 S2 = sqrt(S1);\n  vec3 S3 = sqrt(S2);\n  return vec4(0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * cm, c.a);\n}\n\nfloat sRGBToLinear(const in float c) {\n  return c * (c * (c * 0.305306011 + 0.682171111) + 0.012522878);\n}\n\nvec3 sRGBToLinear(const in vec3 c) {\n  return c * (c * (c * 0.305306011 + 0.682171111) + 0.012522878);\n}\n\nvec4 sRGBToLinear(const in vec4 c) {\n  return vec4(c.rgb * (c.rgb * (c.rgb * 0.305306011 + 0.682171111) + 0.012522878), c.a);\n}\n\nvec3 RGBMToRGB(const in vec4 rgba) {\n  const float maxRange = 8.0;\n  return rgba.rgb * maxRange * rgba.a;\n}\n\nconst mat3 LUVInverse = mat3(6.0013,    -2.700,   -1.7995,\n                -1.332,    3.1029,   -5.7720,\n                0.3007,    -1.088,    5.6268);\n\nvec3 LUVToRGB(const in vec4 vLogLuv) {\n  float Le = vLogLuv.z * 255.0 + vLogLuv.w;\n  vec3 Xp_Y_XYZp;\n  Xp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n  Xp_Y_XYZp.z = Xp_Y_XYZp.y / vLogLuv.y;\n  Xp_Y_XYZp.x = vLogLuv.x * Xp_Y_XYZp.z;\n  vec3 vRGB = LUVInverse * Xp_Y_XYZp;\n  return max(vRGB, 0.0);\n}\n\nvec4 encodeRGBM(const in vec3 col, const in float range) {\n  if(range <= 0.0)\n    return vec4(col, 1.0);\n  vec4 rgbm;\n  vec3 color = col / range;\n  rgbm.a = clamp(max(max(color.r, color.g), max(color.b, 1e-6)), 0.0, 1.0);\n  rgbm.a = ceil(rgbm.a * 255.0) / 255.0;\n  rgbm.rgb = color / rgbm.a;\n  return rgbm;\n}\n\nvec3 decodeRGBM(const in vec4 col, const in float range) {\n  if(range <= 0.0)\n    return col.rgb;\n  return range * col.rgb * col.a;\n}\n\nvec3 textureRGB(const in sampler2D texture, const in vec2 uv) {\n  return texture2D(texture, uv.xy).rgb;\n}\n\nvec4 textureRGBA(const in sampler2D texture, const in vec2 uv) {\n  return texture2D(texture, uv.xy).rgba;\n}\n\nfloat textureIntensity(const in sampler2D texture, const in vec2 uv) {\n  return texture2D(texture, uv).r;\n}\n\nfloat textureAlpha(const in sampler2D texture, const in vec2 uv) {\n  return texture2D(texture, uv.xy).a;\n}\n\nfloat adjustSpecular(const in float specular, const in vec3 normal) {\n  float normalLen = length(normal);\n  if (normalLen < 1.0) {\n    float normalLen2 = normalLen * normalLen;\n    float kappa = (3.0 * normalLen -  normalLen2 * normalLen)/(1.0 - normalLen2);\n    return 1.0-min(1.0, sqrt((1.0-specular) * (1.0-specular) + 1.0/kappa));\n  }\n  return specular;\n}\n\nvec3 mtexNspaceTangent(const in vec4 tangent, const in vec3 normal, const in vec3 texnormal) {\n  vec3 tang = vec3(0.0,1.0,0.0);\n  float l = length(tangent.xyz);\n  if (l != 0.0) {\n    tang =  tangent.xyz / l;\n  }\n  vec3 B = tangent.w * normalize(cross(normal, tang));\n  return normalize(texnormal.x*tang + texnormal.y*B + texnormal.z*normal);\n}\n\nvec2 normalMatcap(const in vec3 normal, const in vec3 nm_z) {\n  vec3 nm_x = vec3(-nm_z.z, 0.0, nm_z.x);\n  vec3 nm_y = cross(nm_x, nm_z);\n  return vec2(dot(normal.xz, nm_x.xz), dot(normal, nm_y)) * vec2(0.5)  + vec2(0.5) ;\n}\n\nvec3 rgbToNormal(const in vec3 texel, const in int flipNormalY) {\n  vec3 rgb = texel * vec3(2.0) + vec3(-1.0);\n  rgb[1] = flipNormalY == 1 ? -rgb[1] : rgb[1];\n  return rgb;\n}\n\nvec3 bumpMap(const in vec4 tangent, const in vec3 normal, const in vec2 gradient) {\n  vec3 outnormal;\n  float l = length(tangent.xyz);\n  if (l != 0.0) {\n    vec3 tang =  tangent.xyz / l;\n    vec3 binormal = tangent.w * normalize(cross(normal, tang));\n    outnormal = normal + gradient.x * tang + gradient.y * binormal;\n  }\n  else {\n     outnormal = vec3(normal.x + gradient.x, normal.y + gradient.y, normal.z);\n  }\n  return normalize(outnormal);\n}\n\nfloat specularOcclusion(const in int occlude, const in float ao, const in vec3 N, const in vec3 V) {\n  if(occlude == 0)\n    return 1.0;\n  float d = dot(N, V) + ao;\n  return clamp((d * d) - 1.0 + ao, 0.0, 1.0);\n}\n\nfloat adjustRoughnessNormalMap(const in float roughness, const in vec3 normal) {\n  float normalLen = length(normal);\n  if (normalLen < 1.0) {\n    float normalLen2 = normalLen * normalLen;\n    float kappa = (3.0 * normalLen -  normalLen2 * normalLen)/(1.0 - normalLen2);\n    return min(1.0, sqrt(roughness * roughness + 1.0/kappa));\n  }\n  return roughness;\n}\n\nfloat adjustRoughnessGeometry(const in float roughness, const in vec3 normal) {\n  return roughness;\n}\n\nmat3 environmentTransformPBR(const in mat4 tr) {\n  vec3 x = vec3(tr[0][0], tr[1][0], tr[2][0]);\n  vec3 y = vec3(tr[0][1], tr[1][1], tr[2][1]);\n  vec3 z = vec3(tr[0][2], tr[1][2], tr[2][2]);\n  mat3 m = mat3(x, y, z);\n  return m;\n}\n\nvec3 evaluateDiffuseSphericalHarmonics(const in vec3 s[9], const in mat3 envTrans, const in vec3 N) {\n  vec3 n = envTrans * N;\n  vec3 result = (s[0]+s[1]*n.y+s[2]*n.z+s[3]*n.x+s[4]*n.y*n.x+s[5]*n.y*n.z+s[6]*(3.0*n.z*n.z-1.0)+s[7]*(n.z*n.x)+s[8]*(n.x*n.x-n.y*n.y));\n  return max(result, vec3(0.0));\n}\n\nfloat linRoughnessToMipmap(const in float roughnessLinear) {\n  return sqrt(roughnessLinear);\n}\n\nvec3 integrateBRDF(const in vec3 specular, const in float r, const in float NoV, const in sampler2D tex) {\n  vec4 rgba = texture2D(tex, vec2(NoV, r));\n  float b = (rgba[3] * 65280.0 + rgba[2] * 255.0);\n  float a = (rgba[1] * 65280.0 + rgba[0] * 255.0);\n  const float div = 1.0/65535.0;\n  return (specular * a + b) * div;\n}\n\nvec3 integrateBRDFApprox(const in vec3 specular, const in float roughness, const in float NoV) {\n  const vec4 c0 = vec4(-1, -0.0275, -0.572, 0.022);\n  const vec4 c1 = vec4(1, 0.0425, 1.04, -0.04);\n  vec4 r = roughness * c0 + c1;\n  float a004 = min(r.x * r.x, exp2(-9.28 * NoV)) * r.x + r.y;\n  vec2 AB = vec2(-1.04, 1.04) * a004 + r.zw;\n  return specular * AB.x + AB.y;\n}\n\nvec3 computeIBLDiffuseUE4(const in vec3 normal, const in vec3 albedo, const in mat3 envTrans, const in vec3 sphHarm[9]) {\n  return evaluateDiffuseSphericalHarmonics(sphHarm, envTrans, normal);\n}\n\n\n#ifdef CUBEMAP\nvec3 textureCubemapLod(const in samplerCube texture, const in vec3 dir, const in float lod) {\n  vec4 rgba = textureCubeLodEXT(texture, dir, lod);\n#ifdef FLOAT\n  return rgba.rgb;\n#endif\n#ifdef RGBM\n  return RGBMToRGB(rgba);\n#endif\n#ifdef LUV\n  return LUVToRGB(rgba);\n#endif\n}\n\nvec3 textureCubeLodEXTFixed(const in samplerCube texture, const in vec2 size, const in vec3 direction, const in float lodInput, const in float maxLod) {\n  vec3 dir = direction;\n  float lod = min(maxLod, lodInput);\n\n  float scale = 1.0 - exp2(lod) / size.x;\n  vec3 absDir = abs(dir);\n  float M = max(max(absDir.x, absDir.y), absDir.z);\n\n  if (absDir.x != M) dir.x *= scale;\n  if (absDir.y != M) dir.y *= scale;\n  if (absDir.z != M) dir.z *= scale;\n\n  return textureCubemapLod(texture, dir, lod);\n}\n\nvec3 prefilterEnvMapCube(const in float rLinear, const in vec3 R, const in samplerCube tex, const in vec2 lodRange, const in vec2 size){\n  float lod = linRoughnessToMipmap(rLinear) * lodRange[1];\n  return textureCubeLodEXTFixed(tex, size, R, lod, lodRange[0]);\n}\n\n#define samplerEnv samplerCube\n#define prefilterEnvMap prefilterEnvMapCube\n\n#else\n#ifdef PANORAMA\nvec2 computeUVForMipmap(const in float level, const in vec2 uvBase, const in float size, const in float maxLOD) {\n  vec2 uv = uvBase;\n  float widthForLevel = exp2(maxLOD - level);\n  float heightForLevel = widthForLevel * 0.5;\n  float widthFactor = pow(0.5, level);\n  float heightFactor = widthFactor * 0.5;\n  float texelSize = 1.0 / size;\n\n  uv.y = 1.0 - uv.y;\n\n  float resizeX = (widthForLevel - 2.0) * texelSize;\n  float resizeY = (heightForLevel - 2.0) * texelSize;\n\n  float uvSpaceLocalX = texelSize + uv.x * resizeX;\n  float uvSpaceLocalY = texelSize + uv.y * resizeY;\n\n  uvSpaceLocalY += heightFactor;\n\n  return vec2(uvSpaceLocalX, uvSpaceLocalY);\n}\n\nvec2 normalToPanoramaUVY(const in vec3 dir) {\n  float n = length(dir.xz);\n\n  vec2 pos = vec2((n > 0.0000001) ? max(-1.0, dir.x / n) : 0.0, dir.y);\n\n  if (pos.x > 0.0) pos.x = min(0.999999, pos.x);\n\n  pos = acos(pos) * 0.3183098861837907;\n\n  pos.x = (dir.z > 0.0) ? pos.x * 0.5 : 1.0 - (pos.x * 0.5);\n\n  pos.x = mod(pos.x - 0.25 + 1.0, 1.0);\n  pos.y = 1.0 - pos.y;\n  return pos;\n}\n\nvec3 texturePanorama(const in sampler2D texture, const in vec2 uv) {\n  vec4 rgba = texture2D(texture, uv);\n#ifdef FLOAT\n  return rgba.rgb;\n#endif\n#ifdef RGBM\n  return RGBMToRGB(rgba);\n#endif\n#ifdef LUV\n  return LUVToRGB(rgba);\n#endif\n}\n\nvec3 texturePanoramaLod(const in sampler2D texture, const in vec2 size, const in vec3 direction, const in float lodInput, const in float maxLOD) {\n  float lod = min(maxLOD, lodInput);\n  vec2 uvBase = normalToPanoramaUVY(direction);\n\n  float lod0 = floor(lod);\n  vec2 uv0 = computeUVForMipmap(lod0, uvBase, size.x, maxLOD);\n  vec3 texel0 = texturePanorama(texture, uv0.xy);\n\n  float lod1 = ceil(lod);\n  vec2 uv1 = computeUVForMipmap(lod1, uvBase, size.x, maxLOD);\n  vec3 texel1 = texturePanorama(texture, uv1.xy);\n\n  return mix(texel0, texel1, fract(lod));\n}\n\nvec3 prefilterEnvMapPanorama(const in float rLinear, const in vec3 R, const in sampler2D tex, const in vec2 lodRange, const in vec2 size) {\n  float lod = linRoughnessToMipmap(rLinear) * lodRange[1];\n  return texturePanoramaLod(tex, size, R, lod, lodRange[0]);\n}\n\n#define samplerEnv sampler2D\n#define prefilterEnvMap prefilterEnvMapPanorama\n\n#else\nvec3 prefilterEnvMap(const in float rLinear, const in vec3 R, const in sampler2D tex, const in vec2 lodRange, const in vec2 size) {\n  return vec3(0.0);\n}\n#define samplerEnv sampler2D\n#endif\n\n#endif\n\nvec3 getSpecularDominantDir(const in vec3 N, const in vec3 R, const in float realRoughness) {\n  float smoothness = 1.0 - realRoughness;\n  float lerpFactor = smoothness * (sqrt(smoothness) + realRoughness);\n  return mix(N, R, lerpFactor);\n}\n\nvec3 computeIBLSpecularUE4(\n  const in vec3 N,\n  const in vec3 V,\n  const in float rLinear,\n  const in vec3 specular,\n  const in mat3 envTrans,\n  const in samplerEnv texEnv,\n  const in vec2 lodRange,\n  const in vec2 size,\n  const in vec3 frontNormal\n  #ifdef MOBILE\n){\n  #else\n  ,const in sampler2D texBRDF) {\n  #endif\n\n  float rough = max(rLinear, 0.0);\n\n  float NoV = clamp(dot(N, V), 0.0, 1.0);\n  vec3 R = normalize(NoV * 2.0 * N - V);\n\n  R = getSpecularDominantDir(N, R, rLinear);\n\n  vec3 dir = envTrans * R;\n  dir.xz *= -1.0;\n\n  vec3 prefilteredColor = prefilterEnvMap(rough, dir, texEnv, lodRange, size);\n  float factor = clamp(1.0 + 1.3 * dot(R, frontNormal), 0.1, 1.0);\n  prefilteredColor *= factor * factor;\n  #ifdef MOBILE\n  return prefilteredColor * integrateBRDFApprox(specular, rough, NoV);\n  #else\n  return prefilteredColor * integrateBRDF(specular, rough, NoV, texBRDF);\n  #endif\n}\n\nfloat luma(vec3 color) {\n  return dot(color, vec3(0.299, 0.587, 0.114));\n}\n\n#ifdef USE_DIR_LIGHT\n\n#define PI 3.141593\n#define G1V(dotNV, k) (1.0 / (dotNV * (1.0 - k) + k))\n#define saturate(_x) clamp(_x, 0.0, 1.0)\n\nvec4 LightingFuncPrep(const in vec3 N,\n                      const in vec3 V,\n                      const in float roughness)\n{\n\n    float dotNV = saturate(dot(N,V));\n    float alpha = roughness * roughness;\n    float k = alpha * .5;\n    float visNV = G1V(dotNV,k);\n\n    vec4 prepSpec;\n\n    prepSpec.x = alpha;\n    prepSpec.y = alpha * alpha;\n    prepSpec.z = k;\n    prepSpec.w = visNV;\n\n    return prepSpec;\n\n}\n\nvec3 LightingFuncUsePrepGGX(const vec4 prepSpec,\n              const vec3 N,\n              const vec3 V,\n              const vec3 L,\n              const vec3 F0,\n              const float dotNL)\n{\n  vec3 H = normalize(V + L);\n  float dotNH = saturate(dot(N, H));\n  float alphaSqr = prepSpec.y;\n  float denom = dotNH * dotNH * (alphaSqr - 1.0) + 1.0;\n  float D = alphaSqr / (PI * denom * denom);\n  float dotLH = saturate(dot(L, H));\n  float dotLH5 = pow(1.0 - dotLH, 5.0);\n  vec3 F = vec3(F0) + (vec3(1.0) - F0) * (dotLH5);\n  float visNL = G1V(dotNL, prepSpec.z);\n  vec3 specular = D * F * visNL * prepSpec.w;\n\n  return specular;\n}\n\nvec3 computeLight(const in vec3 lightColor,\n          const in vec3 albedoColor,\n          const in vec3 normal,\n          const in vec3 viewDir,\n          const in vec3 lightDir,\n          const in vec3 specular,\n          const in vec4 prepSpec,\n          const in float dotNL)\n{\n  vec3 cSpec = LightingFuncUsePrepGGX(prepSpec, normal, viewDir, lightDir, specular, dotNL);\n  return lightColor * dotNL * cSpec;\n}\n\nvec3 computeSunLightPBRShading(\n  const in vec3 normal,\n  const in vec3 eyeVector,\n\n  const in vec3 albedo,\n  const in vec4 prepSpec,\n  const in vec3 specular,\n\n  const in vec3 lightColor,\n  const in vec3 lightEyeDir)\n{\n  bool lighted = false;\n  float NdotL = dot(lightEyeDir, normal);\n  if (NdotL > 0.0)\n  {\n    lighted = true;\n    return computeLight(lightColor, albedo, normal, eyeVector, lightEyeDir, specular, prepSpec,  NdotL);\n  }\n  return vec3(0.0);\n}\n#endif\n\n\nvoid main() {\n  vec3 eyeVector = normalize(-FragEyeVector.rgb);\n  mat3 transform = environmentTransformPBR(uEnvironmentTransform);\n\n  vec4 frontTangent = gl_FrontFacing ? FragTangent : -FragTangent;\n  vec3 frontNormal = gl_FrontFacing ? FragNormal : -FragNormal;\n\n  vec3 normal = normalize(frontNormal);\n\n  #ifdef USE_NORMALMAP\n    vec3 nmTexel = rgbToNormal(textureRGB(sTextureNormalMap, vUv.xy), uFlipY);\n    vec3 normalMap = vec3(uNormalMapFactor * nmTexel.xy, nmTexel.z);\n    vec3 geoNormal = mtexNspaceTangent(frontTangent, normal, normalMap);\n  #else\n    vec3 geoNormal = normal;\n  #endif\n\n  #ifdef USE_NORMALMAP2\n    vec3 nm2Texel = rgbToNormal(textureRGB(sTextureNormalMap2, vUvDetail.xy), uFlipY);\n    vec3 normalMap2 = vec3(uNormalMapFactor * nm2Texel.xy, nm2Texel.z);\n    vec3 geoNormal2 = mtexNspaceTangent(frontTangent, normal, normalMap2);\n\n    geoNormal = mix(geoNormal, geoNormal2, 0.5);\n  #endif\n\n  #if defined(USE_PACKEDMAP)\n  vec3 combinedTexel = textureRGB(sTexturePackedMap, vUv.xy);\n  #elif defined(USE_METALGLOSSMAP)\n  vec3 combinedTexel = textureRGB(sTextureMetalGlossMap, vUv.xy);\n  #else\n  vec3 combinedTexel = vec3(1.0, 1.0, 1.0);\n  #endif\n  float metalness = combinedTexel.r;\n  float glossiness = combinedTexel.b;\n  float channelMetalnessPBR = metalness * uMetalnessPBRFactor;\n  float channelGlossinessPBR = glossiness * uGlossinessPBRFactor;\n  float roughness = 1.0 - channelGlossinessPBR;\n  float tmp_51 = max(1.e-4, roughness);\n  #ifdef USE_NORMALMAP\n    float tmp_52 = adjustRoughnessNormalMap(tmp_51, normalMap);\n    float materialRoughness = adjustRoughnessGeometry(tmp_52, normal);\n  #else\n    float materialRoughness = tmp_51;\n  #endif\n\n  vec4 albedoMap = vec4(uColor, 1.0);\n  #ifdef USE_ALBEDOMAP\n    albedoMap *= textureRGBA(sTextureAlbedoMap, vUv.xy);\n  #endif\n\n  #ifdef USE_ALBEDOMAP2\n    albedoMap *= textureRGBA(sTextureAlbedoMap2, vUvDetail.xy);\n  #endif\n\n  vec3 channelAlbedoPBR = sRGBToLinear(albedoMap.rgb) * uAlbedoPBRFactor;\n  vec3 materialDiffusePBR = channelAlbedoPBR * (1.0 - channelMetalnessPBR);\n\n  #if defined(USE_PACKEDMAP)\n  float ao = combinedTexel.g;\n  #elif defined(USE_AOMAP)\n  float ao = textureIntensity(sTextureAOMap, vUv.xy);\n  #else\n  float ao = 1.0;\n  #endif\n\n  #ifdef USE_AOMAP2\n    ao *= textureIntensity(sTextureAOMap2, vUvDetail.xy);\n  #endif\n  float channelAOPBR = mix(1.0, ao, uAOPBRFactor);\n\n  float luminance = 1.0;\n  #ifdef USE_LIGHTMAP\n    #ifdef USE_NORMALMAP\n      luminance = luma(computeIBLDiffuseUE4(geoNormal, materialDiffusePBR, transform, uDiffuseSPH));\n      luminance = mix(luminance, 1.0, abs(dot(geoNormal, normal)));\n      if (uMode == -1) {\n        luminance = 1.0;\n      }\n\n      vec3 diffuse = materialDiffusePBR * luminance;\n    #else\n      vec3 diffuse = materialDiffusePBR;\n    #endif\n  #else\n  vec3 diffuse = materialDiffusePBR * computeIBLDiffuseUE4(geoNormal, materialDiffusePBR, transform, uDiffuseSPH);\n  #endif\n\n  diffuse *= channelAOPBR;\n\n  #ifdef USE_LIGHTMAP\n    vec3 lightmapTexel = textureRGB(sTextureLightMap, vUv2);\n    float lightmapM = textureIntensity(sTextureLightMapM, vUv2);\n    vec3 lightmap = DecodeLightmapRGBM(sRGBToLinear(vec4(lightmapTexel, lightmapM)), vec2(34.0, 2.2));\n\n    diffuse *= lightmap;\n  #endif\n\n  float materialSpecularf0 = mix(0.0, 0.08, uSpecularF0Factor);\n  vec3 materialSpecularPBR = mix(vec3(materialSpecularf0), channelAlbedoPBR, channelMetalnessPBR);\n  #ifdef CUBEMAP\n  vec3 specular = computeIBLSpecularUE4(geoNormal, eyeVector, materialRoughness, materialSpecularPBR, transform, sSpecularPBR, uTextureEnvironmentSpecularPBRLodRange, uTextureEnvironmentSpecularPBRTextureSize, normal);\n  #else\n  #ifdef PANORAMA\n  vec3 specular = computeIBLSpecularUE4(geoNormal, eyeVector, materialRoughness, materialSpecularPBR, transform, sPanoramaPBR, uTextureEnvironmentSpecularPBRLodRange, uTextureEnvironmentSpecularPBRTextureSize, normal);\n  #endif\n  #endif\n\n  #if defined(OCCLUDE_SPECULAR) && defined(USE_LIGHTMAP)\n    float factor = 3.;\n    specular = mix(specular * 0.0, specular, clamp(min(lightmap, vec3(channelAOPBR)) * (factor * channelGlossinessPBR), 0.0, 1.0));\n  #endif\n\n  #ifdef USE_EMISSIVEMAP\n  vec3 emissive = textureRGB(sTextureEmissiveMap, vUv.xy);\n  #endif\n\n  vec3 color = diffuse + specular;\n\n  color *= uEnvironmentExposure;\n\n  #ifdef USE_DIR_LIGHT\n  vec4 prepSpec = LightingFuncPrep(geoNormal, eyeVector, materialRoughness);\n  vec3 lightEyeDir = viewLightDir;\n  float lightIntensity = 0.4;\n  vec3 lightDiffuse = lightColor * lightIntensity;\n  vec3 lightSpecular = computeSunLightPBRShading(geoNormal, eyeVector, materialDiffusePBR, prepSpec, materialSpecularPBR, lightDiffuse, lightEyeDir);\n\n  float lmf = 1.0;\n\n    #ifdef USE_LIGHTMAP\n      lmf = clamp(pow(abs(luma(lightmap)), 4.0), 0.0, 1.0);\n      lightSpecular = mix(vec3(0.0), lightSpecular, lmf);\n    #endif\n\n  if (highlights == 1) {\n    color += lightSpecular;\n  }\n  #endif\n\n  float channelOpacity = mix(albedoMap.a * uOpacityFactor, 1.0, luma(specular) * 2.0);\n\n  #ifdef USE_EMISSIVEMAP\n    color += sRGBToLinear(emissive);\n  #endif\n\n  if (uMode <= 0) {\n    gl_FragColor = vec4(linearTosRGB(color), channelOpacity);\n  } else if (uMode == 1) {\n    gl_FragColor = vec4(linearTosRGB(geoNormal), 1.0);\n  } else if (uMode == 2) {\n    #ifdef USE_LIGHTMAP\n    gl_FragColor = vec4(linearTosRGB(lightmap), 1.0);\n    #else\n    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);\n    #endif\n  } else if (uMode == 3) {\n    gl_FragColor = vec4(linearTosRGB(vec3(channelAOPBR)), 1.0);\n  } else if (uMode == 4) {\n    gl_FragColor = vec4(linearTosRGB(vec3(channelMetalnessPBR)), 1.0);\n  } else if (uMode == 5) {\n    gl_FragColor = vec4(linearTosRGB(vec3(channelGlossinessPBR)), 1.0);\n  } else if (uMode == 6) {\n    gl_FragColor = vec4(linearTosRGB(channelAlbedoPBR), 1.0);\n  } else if (uMode == 7) {\n    gl_FragColor = vec4(linearTosRGB(vec3(luminance)), 1.0);\n  }\n\n  #ifdef ALPHATEST\n    if (gl_FragColor.a < uAlphaTest) {\n      discard;\n    } else {\n      gl_FragColor.a = 1.0;\n    }\n  #endif\n}";
}, function(mixin, canCreateDiscussions) {
    /** @type {string} */
    mixin.exports = "varying vec3 vWorldPosition;\n\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\n\nvoid main() {\n  vWorldPosition = transformDirection( position, modelMatrix );\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";
}, function(mixin, canCreateDiscussions) {
    /** @type {string} */
    mixin.exports = "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\n\nvoid main() {\n  vec3 dir = vWorldPosition;\n  dir.z *= -1.0;\n\n  vec4 texel = textureCube(tCube, dir);\n\n  gl_FragColor = vec4(texel.rgb, 1.0);\n}";
}, function(module, canCreateDiscussions, require) {
    /**
     * @param {!Entity} context
     * @param {?} f
     * @return {?}
     */
    function r(context, f) {
        /** @type {!Array} */
        var folderPathClone = [];
        return context.traverse(function(key) {
            if (key.name === f) {
                folderPathClone.push(key);
            }
        }), folderPathClone;
    }
    /**
     * @param {!Object} object
     * @return {?}
     */
    function isString(object) {
        return _.contains(_.map(attributes, function(engineDiscovery) {
            return engineDiscovery.name;
        }), object.name);
    }
    /**
     * @param {!MouseEvent} c
     * @param {!Object} a
     * @param {number} p
     * @param {number} e
     * @return {?}
     */
    function negate(c, a, p, e) {
        return {
            x : (c.pageX - a.x) / p * 2 - 1,
            y : 1 - (c.pageY - a.y) / e * 2
        };
    }
    var obj = require(39);
    var query = require(1);
    var layer = require(0);
    var CheckDailyStat = require(42);
    var WebVRManager = (require(12), require(43));
    var Token = require(4);
    var Geocoder = require(44);
    var HudView = require(48);
    var PerspectiveCamera = require(52);
    var Tool = require(60);
    var InputManager = require(63);
    var CameraDolly = require(64);
    var TagHourlyStat = require(65);
    var WSHandler = require(66);
    var EffectChain = require(69);
    var GizmoMaterial = require(72);
    var attributes = require(75);
    /**
     * @param {!Function} app
     * @return {undefined}
     */
    var Collection = function(app) {
        obj.call(this, app);
        /** @type {number} */
        this.mode = app.vr ? Collection.VR_MODE : Collection.DEFAULT_MODE;
        this.vrDisplay = app.vrDisplay;
    };
    Collection.inherit(obj, {
        init : function() {
            if (this.mode === Collection.VR_MODE) {
                this.initWebVR(this.vrDisplay);
            }
            this.$container = $(document.body);
            this.updateContainerInfo();
            $(window).on("resize", function() {
                this.updateContainerInfo();
                if (this.mode === Collection.DEFAULT_MODE) {
                    this.hud.resize();
                }
            }.bind(this));
            this.startScene = this.scenes[0];
            this.exteriorScene = this.scenes[1];
            this.interiorScene = this.scenes[2];
            /** @type {boolean} */
            this.enteredRoom = false;
            /** @type {boolean} */
            this.renderer.autoClear = false;
            this.scene.updateMatrixWorld(true);
            this.initMaterialManager();
            this.initCamera();
            this.initUI();
            this.initObjectPickers();
            this.initObjectsRenderOrder();
            this.initMaterialsExposure();
            this.initPool();
            this.initSeaHighlights();
            this.initFlares();
            this.initDirLight();
            this.initHoverScene();
            this.initCameraScene();
            if (Config.DEBUG_KEYS) {
                this.initDebugKeyEvents();
            }
            if (this.mode === Collection.VR_MODE) {
                this.initInstructions();
                this.initInputManager();
                this.handleVREvents();
                this.initCrosshair();
                this.initTransitionScene();
            } else {
                if (this.mode === Collection.DEFAULT_MODE) {
                    this.handleNonVREvents();
                }
            }
            if (this.config.fps) {
                this.initFPSCounter();
            }
            if (this.config.logCalls) {
                this.initDrawCallsCounter();
            }
            this.handleHudEvents();
            this.handleCameraEvents();
            $(window).trigger("resize");
            _.defer(this.preRenderHUD.bind(this));
        },
        initInstructions : function() {
            this.startInstructions = this.startScene.getObjectByName("instructions");
            if (this.startInstructions) {
                /** @type {number} */
                this.startInstructions.position.z = -.75;
                this.camera.add(this.startInstructions);
            }
        },
        updateInstructions : function(a) {
            /** @type {number} */
            var notAvailableOpacity = .25 + .75 * Math.abs(Math.sin(3 * a.elapsed));
            if (!this.startInstructionsCTA) {
                this.startInstructionsCTA = this.startInstructions.getObjectByName("cta");
            }
            /** @type {number} */
            this.startInstructionsCTA.material.opacity = notAvailableOpacity;
        },
        initDirLight : function() {
            this.dirLight = this.interiorScene.getObjectByName("Directional Light");
            _.each([this.interiorScene, this.exteriorScene], function(data) {
                _.each(data.materials, function(material) {
                    if (material.pbr && !material.ignoreDirLight) {
                        /** @type {boolean} */
                        material.defines.USE_DIR_LIGHT = true;
                        material.uniforms.lightColor.value.setRGB(1, 1, 1);
                        /** @type {boolean} */
                        material.needsUpdate = true;
                    }
                });
            });
        },
        initHoverScene : function() {
            this.hoverScene = new THREE.Scene;
        },
        initCameraScene : function() {
            this.cameraScene = new THREE.Scene;
            this.cameraScene.add(this.camera);
        },
        initDebugKeyEvents : function() {
            var gotoNewOfflinePage = function(saveNotifs) {
                _.each(this.scenes, function(data) {
                    _.each(data.materials, function(loadingAnimationService) {
                        if (loadingAnimationService.pbr) {
                            saveNotifs(loadingAnimationService.uniforms.uMode);
                        }
                    });
                });
                _.each(this.hud.palettes, function(e) {
                    e.children.forEach(function(proxy) {
                        saveNotifs(proxy.material.uniforms.uMode);
                    }, this);
                }, this);
            }.bind(this);
            $(document).on("keypress", function(event) {
                if (99 == event.keyCode) {
                    gotoNewOfflinePage(function(select_ele) {
                        if (6 == select_ele.value) {
                            /** @type {number} */
                            select_ele.value = 1;
                        } else {
                            select_ele.value++;
                        }
                    });
                } else {
                    if (109 == event.keyCode) {
                        gotoNewOfflinePage(function(select_ele) {
                            /** @type {number} */
                            select_ele.value = 0;
                        });
                    } else {
                        if (116 == event.keyCode) {
                            if (this.ratio) {
                                this.ratio += 1;
                                if (this.ratio > 2) {
                                    /** @type {number} */
                                    this.ratio = 1;
                                }
                            } else {
                                /** @type {number} */
                                this.ratio = 1;
                            }
                            this.renderer.setPixelRatio(this.ratio);
                        } else {
                            if (110 == event.keyCode) {
                                gotoNewOfflinePage(function(select_ele) {
                                    if (select_ele.value >= 0) {
                                        /** @type {number} */
                                        select_ele.value = -1;
                                    } else {
                                        /** @type {number} */
                                        select_ele.value = 0;
                                    }
                                });
                            } else {
                                if (104 == event.keyCode) {
                                    _.each([this.interiorScene, this.exteriorScene], function(data) {
                                        _.each(data.materials, function(model) {
                                            if (model.pbr) {
                                                if (0 == model.uniforms.highlights.value) {
                                                    /** @type {number} */
                                                    model.uniforms.highlights.value = 1;
                                                } else {
                                                    /** @type {number} */
                                                    model.uniforms.highlights.value = 0;
                                                }
                                            }
                                        });
                                    });
                                } else {
                                    if (80 === event.keyCode) {
                                        this.captureFrame(5E3, 2E3);
                                    } else {
                                        if (115 === event.keyCode) {
                                            $(this.counter).toggle();
                                            $(this.dcCounter).toggle();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }.bind(this));
        },
        initFPSCounter : function() {
            var element = $(this.counter);
            element.css("left", "20px");
            element.css("padding", "3px");
            element.css("font-size", "2em");
            element.css("background-color", "black");
        },
        initDrawCallsCounter : function() {
            var $panzoom = $("<div id='dc'></div>");
            $("body").append($panzoom);
            $panzoom.css("position", "absolute").css("display", "block !important").css("color", "yellow").css("top", "60px").css("left", "20px").css("padding", "3px").css("font-size", "2em").css("background-color", "black").css("z-index", "999999");
            this.dcCounter = $panzoom[0];
        },
        initInputManager : function() {
            this.inputManager = new InputManager;
        },
        start : function() {
            this.camera.enableControls();
            if (this.mode !== Collection.DEFAULT_MODE || window.isMobile) {
                if (this.mode === Collection.DEFAULT_MODE && window.isMobile) {
                    this.ui.showMoveInstructions();
                }
            } else {
                this.ui.showLookInstructions();
            }
            obj.prototype.start.call(this);
        },
        enterVR : function() {
            if (this.camera.vrControls.hasInput()) {
                this.effect.requestPresent();
            }
        },
        handleVREvents : function() {
            this.inputManager.on("press", function() {
                if (this.enteredRoom) {
                    if (this.hud.visible && this.hudPicker.hitTest()) {
                        this.hudPicker.onTap();
                    } else {
                        if (this.scenePicker.hitTest()) {
                            this.scenePicker.onTap();
                        }
                    }
                } else {
                    this.fadeOut(750).onComplete(function() {
                        this.camera.moveTo(0, 0);
                        /** @type {boolean} */
                        this.enteredRoom = true;
                        this.fadeIn(2E3);
                        this.camera.remove(this.startInstructions);
                    }.bind(this));
                }
            }.bind(this));
        },
        handleNonVREvents : function() {
            /** @type {null} */
            var _takingTooLongTimeout = null;
            return function() {
                if (!window.isMobile) {
                    $("canvas").on("mousemove", function(expr) {
                        var value = negate(expr, this.containerOffset, this.containerWidth, this.containerHeight);
                        this.scenePicker.updateMouseCoords(value);
                        this.hudPicker.updateMouseCoords(value);
                    }.bind(this));
                }
                $("canvas").on("tap", function(left) {
                    if (window.isMobile) {
                        var n = negate(left, this.containerOffset, this.containerWidth, this.containerHeight);
                        this.scenePicker.updateMouseCoords(n);
                        this.hudPicker.updateMouseCoords(n);
                    }
                    /** @type {null} */
                    var moved = null;
                    /** @type {null} */
                    var allBox = null;
                    if (!(this.camera.moving || this.camera.rotating || !this.camera.enabled)) {
                        moved = this.hud.visible && this.hudPicker.hitTest();
                        allBox = this.scenePicker.hitTest();
                    }
                    if (window.isMobile && !moved && allBox && "floor" === allBox.name) {
                        this.ui.updateMarker(this.scenePicker.getPoint());
                        this.ui.showMarker();
                        if (_takingTooLongTimeout) {
                            clearTimeout(_takingTooLongTimeout);
                        }
                        /** @type {number} */
                        _takingTooLongTimeout = setTimeout(function() {
                            this.ui.hideMarker();
                            /** @type {null} */
                            _takingTooLongTimeout = null;
                        }.bind(this), 2E3);
                    }
                    if (moved) {
                        this.hudPicker.onTap();
                    } else {
                        if (allBox) {
                            this.scenePicker.onTap();
                        }
                    }
                }.bind(this));
            };
        }(),
        handleHudEvents : function() {
            this.hud.on("selectMaterial", function(module) {
                this.materialManager.setObjectMaterial(this.currentSelected, module);
                this.hud.setCurrent(module);
                if (this.materialInstructionsVisible) {
                    this.ui.hideMaterialInstructions();
                    /** @type {boolean} */
                    this.materialInstructionsVisible = false;
                }
            }, this);
        },
        handleCameraEvents : function() {
            this.camera.on("startMove", function() {
                this.ui.freezeMarker();
            }, this);
            this.camera.on("endMove", function() {
                this.ui.unfreezeMarker();
            }, this);
            this.camera.on("firstMove", function() {
                this.ui.hideMoveInstructions();
            }, this);
            this.camera.on("firstRotate", function() {
                this.ui.hideLookInstructions();
            }, this);
        },
        updateContainerInfo : function() {
            this.containerOffset = {
                x : this.$container.offset().left,
                y : this.$container.offset().top
            };
            this.containerWidth = this.$container.width();
            this.containerHeight = this.$container.height();
        },
        initMaterialManager : function() {
            this.materialManager = new TagHourlyStat({
                scenes : this.scenes,
                configurables : attributes
            });
        },
        initCamera : function() {
            var modifier = this.camera = new PerspectiveCamera({
                vr : this.mode === Collection.VR_MODE,
                states : this.scene.getObjectByName("cameras").children,
                $container : this.$container
            });
            this.scene.add(modifier);
            /** @type {boolean} */
            modifier.enabled = true;
            if (this.mode === Collection.VR_MODE) {
                this.camera.vrControls.setVRDisplay(this.vrDisplay);
            }
        },
        initTransitionScene : function() {
            var object = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new GizmoMaterial);
            object.material.uniforms.diffuse.value = new THREE.Color(0);
            /** @type {number} */
            object.material.uniforms.opacity.value = 0;
            /** @type {boolean} */
            object.material.transparent = true;
            /** @type {boolean} */
            object.frustumCulled = false;
            var highlightEffect = new THREE.Scene;
            highlightEffect.add(object);
            this.transitionQuad = object;
            this.transitionScene = highlightEffect;
        },
        fadeOut : function(t) {
            return Token.tween(t || 500).onUpdate(function(ieOpacity) {
                /** @type {number} */
                this.transitionQuad.material.opacity = ieOpacity;
            }.bind(this));
        },
        fadeIn : function(t) {
            return Token.tween(t || 500).onUpdate(function(i) {
                /** @type {number} */
                this.transitionQuad.material.opacity = 1 - i;
            }.bind(this));
        },
        initObjectPickers : function() {
            /** @type {!Array} */
            var t = ["floor", "walls", "armchairs", "colliders"];
            /** @type {!Array} */
            var e = [];
            attributes.forEach(function(e) {
                t.push(e.name);
            });
            _.each(t, function(o) {
                var options = r(this.scene, o);
                _.each(options, function(spUtils) {
                    spUtils.traverse(function(t) {
                        e.push(t);
                    }.bind(this));
                }, this);
            }, this);
            _.each(this.scene.getObjectByName("colliders").children, function(object) {
                /** @type {boolean} */
                object.visible = true;
                /** @type {boolean} */
                object.material.visible = false;
            });
            this.scenePicker = new CameraDolly({
                camera : this.camera,
                checkFlag : true,
                vr : this.mode === Collection.VR_MODE
            });
            this.scenePicker.add(e);
            this.hudPicker = new CameraDolly({
                camera : this.hud.camera,
                checkFlag : true,
                vr : this.mode === Collection.VR_MODE
            });
            if (this.mode === Collection.VR_MODE) {
                this.hudPicker.camera = this.camera;
            }
            this.hudPicker.add(this.hud.getPickables());
            this.handlePickerEvents();
        },
        handlePickerEvents : function() {
            this.scenePicker.on("pick", function(obj, pos) {
                var node;
                if ("floor" === obj.name) {
                    if (this.VREnabled && !this.warping) {
                        /** @type {boolean} */
                        this.warping = true;
                        this.fadeOut(200).onComplete(function() {
                            this.camera.moveTo(pos.x, pos.z, 1E3);
                            this.fadeIn(200).onComplete(function() {
                                /** @type {boolean} */
                                this.warping = false;
                            }.bind(this));
                        }.bind(this));
                        this.ui.hideMoveInstructions();
                    } else {
                        if (!this.VREnabled) {
                            this.camera.moveTo(pos.x, pos.z, 1E3);
                        }
                    }
                    this.$container.removeClass("hovering");
                    this.ui.activateMarker();
                    if (this.currentSelected) {
                        this.deselectObject(this.currentSelected);
                    }
                } else {
                    if (isString(obj)) {
                        /** @type {!Object} */
                        node = obj;
                    } else {
                        if (isString(obj.parent)) {
                            node = obj.parent;
                        }
                    }
                }
                if (node && node !== this.currentSelected) {
                    this.selectObject(node);
                }
            }, this);
            this.scenePicker.on("enter", function(node) {
                if (!(this.VREnabled && !this.enteredRoom)) {
                    if (!("floor" !== node.name || window.isMobile)) {
                        this.ui.showMarker();
                    }
                    if (isString(node) && node !== this.currentSelected) {
                        this.highlightObject(node);
                    } else {
                        if (isString(node.parent) && node.parent !== this.currentSelected) {
                            this.highlightObject(node.parent);
                        }
                    }
                }
            }, this);
            this.scenePicker.on("leave", function(value) {
                if (!(this.VREnabled && !this.enteredRoom)) {
                    if (!("floor" !== value.name || window.isMobile)) {
                        this.ui.hideMarker();
                    }
                    if (isString(value) && value !== this.currentSelected) {
                        this.clearHighlight(value);
                    } else {
                        if (isString(value.parent) && value.parent !== this.currentSelected) {
                            this.clearHighlight(value.parent);
                        }
                    }
                }
            }, this);
            this.hudPicker.on("pick", function(name) {
                this.hud.select(name);
            }, this);
            this.hudPicker.on("enter", function(name) {
                if (!window.isMobile) {
                    this.hud.enter(name);
                    this.ui.onEnterObject();
                    this.ui.hideMarker();
                }
            }, this);
            this.hudPicker.on("leave", function(name) {
                if (!window.isMobile) {
                    this.hud.leave(name);
                    this.ui.onLeaveObject();
                }
            }, this);
        },
        initUI : function() {
            this.ui = new Geocoder({
                container : this.$container,
                scene : this.scene,
                camera : this.camera,
                configurables : attributes,
                vr : this.mode === Collection.VR_MODE
            });
            this.hud = new HudView({
                scene : this.scene,
                configurables : attributes,
                vr : this.mode === Collection.VR_MODE
            });
        },
        initWebVR : function(i) {
            this.effect = new WebVRManager(this.renderer);
            /** @type {boolean} */
            this.effect.autoSubmitFrame = false;
            /** @type {boolean} */
            this.VREnabled = false;
            this.effect.setVRDisplay(i);
        },
        selectObject : function(event) {
            var id = event.name;
            /**
             * @param {?} index
             * @return {?}
             */
            var eventHandler = function(index) {
                return _.find(attributes, function(a) {
                    return a.name === index;
                });
            };
            if (!(window.isMobile && this.isSelecting)) {
                /** @type {boolean} */
                this.isSelecting = true;
                setTimeout(function() {
                    /** @type {boolean} */
                    this.isSelecting = false;
                }.bind(this), 1500);
                this.clearHighlight(event);
                /** @type {!Object} */
                this.currentSelected = event;
                this.hud.show();
                this.hud.setPanel(id);
                if (window.isMobile) {
                    this.selectObjectMobile(id);
                } else {
                    if (this.VREnabled) {
                        this.selectObjectVR(id);
                    } else {
                        this.camera.setOrbitDistances(0, 1 / 0);
                        this.camera.setState(id).onComplete(function() {
                            this.hud.setPalette(id);
                            this.camera.setOrbitDistances(eventHandler(id).minDistance, eventHandler(id).maxDistance);
                            if (this.materialHelpDisplayed) {
                                if (this.materialInstructionsVisible) {
                                    this.ui.hideMaterialInstructions();
                                    /** @type {boolean} */
                                    this.materialInstructionsVisible = false;
                                }
                            } else {
                                /** @type {boolean} */
                                this.materialHelpDisplayed = true;
                                this.ui.showMaterialInstructions();
                                /** @type {boolean} */
                                this.materialInstructionsVisible = true;
                            }
                        }.bind(this));
                    }
                }
                if (this.mode !== Collection.VR_MODE && !window.isMobile && this.hud.currentPalette) {
                    this.hud.currentPalette.fadeOut();
                }
            }
        },
        selectObjectMobile : function(name) {
            this.hud.setPalette(name, 1E3);
            setTimeout(function() {
                if (this.materialHelpDisplayed) {
                    if (this.materialInstructionsVisible) {
                        this.ui.hideMaterialInstructions();
                        /** @type {boolean} */
                        this.materialInstructionsVisible = false;
                    }
                } else {
                    /** @type {boolean} */
                    this.materialHelpDisplayed = true;
                    this.ui.showMaterialInstructions();
                    /** @type {boolean} */
                    this.materialInstructionsVisible = true;
                }
            }.bind(this), 1E3);
            this.ui.hideMoveInstructions();
        },
        selectObjectVR : function(name) {
            var node = this.hud.palettes[name];
            var readersLength = node.children.length;
            /** @type {number} */
            var x = -.2 * (readersLength - 1) / 2;
            /** @type {number} */
            this.hud.maxScale = .07;
            this.hud.setPalette(name, 1E3);
            _.each(node.children, function(target, tile_size) {
                target.position.set(.2 * tile_size + x, 0, 0);
                target.scale.set(0, 0, 0);
                target.tweenValue.scale = this.hud.maxScale;
                target.rotation.set(0, 0, 0);
                this.scene.materials[target.material.uuid] = target.material;
            }, this);
            node.position.set(0, -.25, -.6);
            node.rotation.set(0, 0, 0);
            node.scale.set(1, 1, 1);
            this.camera.add(node);
            this.camera.updateMatrixWorld(true);
            node.getWorldPosition(node.position);
            node.getWorldQuaternion(node.quaternion);
            this.camera.remove(node);
            var q = node.quaternion;
            var _eye = new THREE.Vector3(0, 1, 0);
            var rotateStart = _eye.clone().applyQuaternion(q).normalize();
            var correctionAngle = _eye.angleTo(rotateStart);
            var axis = new THREE.Vector3;
            axis.crossVectors(rotateStart, _eye).normalize();
            var quaternion = new THREE.Quaternion;
            quaternion.setFromAxisAngle(axis, correctionAngle).normalize();
            node.quaternion.multiplyQuaternions(quaternion, q);
            this.hoverScene.add(node);
            var camera = this.hud.panels[name];
            camera.position.set(.25, -.1, -.55);
            camera.rotation.set(0, 0, 0);
            camera.scale.set(8.5E-4, 8.5E-4, 8.5E-4);
            this.camera.add(camera);
            this.camera.updateMatrixWorld(true);
            camera.getWorldPosition(camera.position);
            camera.getWorldQuaternion(camera.quaternion);
            this.camera.remove(camera);
            this.hoverScene.add(camera);
            q = camera.quaternion;
            var moveDirection = _eye.clone().applyQuaternion(q).normalize();
            correctionAngle = _eye.angleTo(moveDirection);
            axis = new THREE.Vector3;
            axis.crossVectors(moveDirection, _eye).normalize();
            quaternion = new THREE.Quaternion;
            quaternion.setFromAxisAngle(axis, correctionAngle).normalize();
            camera.quaternion.multiplyQuaternions(quaternion, q);
            this.ui.hideConfigureInstructions();
        },
        deselectObject : function(object) {
            this.hud.hide();
            /** @type {null} */
            this.currentSelected = null;
            if (this.materialInstructionsVisible) {
                this.ui.hideMaterialInstructions();
                /** @type {boolean} */
                this.materialInstructionsVisible = false;
            }
        },
        highlightObject : function(options) {
            var p = options.group ? options.group : options;
            if (!p.worldPosition) {
                p.worldPosition = new THREE.Vector3;
            }
            if (!p.previousPosition) {
                p.previousPosition = new THREE.Vector3;
            }
            this.ui.highlightObject(options);
            p.getWorldPosition(p.worldPosition);
            p.previousPosition.copy(p.position);
            p.previousParent = p.parent;
            this.hoverScene.add(p);
            p.position.copy(p.worldPosition);
        },
        clearHighlight : function(options) {
            var option = options.group ? options.group : options;
            this.ui.clearHighlight();
            option.previousParent.add(option);
            option.position.copy(option.previousPosition);
        },
        initObjectsRenderOrder : function() {
            var _object = this.interiorScene.getObjectByName("glassrail");
            if (_object) {
                /** @type {number} */
                _object.renderOrder = 50;
            }
            var _line = this.interiorScene.getObjectByName("glasses");
            if (_line) {
                /** @type {number} */
                _line.renderOrder = 100;
            }
            var _face = this.interiorScene.getObjectByName("sea");
            if (_face) {
                /** @type {number} */
                _face.renderOrder = 100;
            }
            var mesh = this.interiorScene.getObjectByName("sky");
            if (mesh) {
                /** @type {number} */
                mesh.renderOrder = 95;
                /** @type {boolean} */
                mesh.visible = true;
            }
            var partial_tree = this.interiorScene.getObjectByName("clouds");
            if (partial_tree) {
                partial_tree.traverse(function(a) {
                    /** @type {number} */
                    a.renderOrder = 98;
                });
            }
            var node_res = this.interiorScene.getObjectByName("sun");
            if (node_res) {
                node_res.traverse(function(a) {
                    /** @type {number} */
                    a.renderOrder = 97;
                });
            }
            var a = this.interiorScene.getObjectByName("sun_and_clouds_merged");
            if (a) {
                /** @type {number} */
                a.renderOrder = 97;
            }
            var object = this.interiorScene.getObjectByName("sea_highlight");
            if (object) {
                /** @type {number} */
                object.renderOrder = 101;
            }
            var exTree = this.interiorScene.getObjectByName("islands");
            if (exTree) {
                exTree.traverse(function(a) {
                    /** @type {number} */
                    a.renderOrder = 102;
                });
            }
            var b = this.interiorScene.getObjectByName("islands_merged");
            if (b) {
                /** @type {number} */
                b.renderOrder = 102;
            }
            var _sprite = this.interiorScene.getObjectByName("sea_highlights2");
            if (_sprite) {
                /** @type {number} */
                _sprite.renderOrder = 103;
            }
        },
        initCrosshair : function() {
            this.crosshair = new CheckDailyStat;
            this.crosshair.fadeOut();
            this.camera.add(this.crosshair);
        },
        initMaterialsExposure : function() {
            /** @type {number} */
            this.scene.getObjectByName("feet").material.exposure = .3;
        },
        initFlares : function() {
            /** @type {!Array} */
            this.flares = [];
            var t = this.interiorScene.getObjectByName("spots");
            var PL$93 = layer.getTexture("textures/flare.png");
            if (t) {
                t.children.forEach(function(camera) {
                    var material = new THREE.PointsMaterial({
                        size : 1.5,
                        map : PL$93,
                        transparent : true,
                        depthWrite : false,
                        depthTest : false,
                        blending : THREE.AdditiveBlending,
                        opacity : .35
                    });
                    var geometry = new THREE.Geometry;
                    geometry.vertices.push(new THREE.Vector3);
                    var mesh = new THREE.Points(geometry, material);
                    camera.getWorldPosition(mesh.position);
                    this.flares.push(mesh);
                    this.interiorScene.add(mesh);
                }, this);
            }
        },
        initPool : function() {
            this.water = new Tool({
                light : this.scene.getObjectByName("ocean light"),
                camera : this.camera,
                renderer : this.renderer,
                object : this.exteriorScene.getObjectByName("pool_water"),
                transparent : true,
                opacity : .6
            });
            /** @type {boolean} */
            this.exteriorScene.getObjectByName("pool_water").visible = false;
            this.exteriorScene.add(this.water);
        },
        initSeaHighlights : function() {
            var self = this.interiorScene.getObjectByName("sea_highlights2");
            var m = self.material;
            var map = m.map;
            this.noise = new EffectChain;
            self.material = new WSHandler;
            self.material.map = map;
            self.material.uniforms.offsetRepeat.value.set(map.offset.x, map.offset.y, map.repeat.x, map.repeat.y);
            self.material.transparent = m.transparent;
            self.material.noiseMap = this.noise.target.texture;
            this.seaHighlights = self;
        },
        updateSeaHighlights : function(writeBuffer) {
            this.seaHighlights.material.updateUniforms(writeBuffer);
        },
        updateDirLight : function() {
            var tempVS = new THREE.Vector3;
            var directionVS = new THREE.Vector3;
            return function() {
                directionVS.setFromMatrixPosition(this.dirLight.matrixWorld);
                tempVS.setFromMatrixPosition(this.dirLight.target.matrixWorld);
                directionVS.sub(tempVS);
                directionVS.transformDirection(this.camera.matrixWorldInverse);
                _.each([this.interiorScene, this.exteriorScene], function(data) {
                    _.each(data.materials, function(loadingAnimationService) {
                        if (loadingAnimationService.pbr) {
                            loadingAnimationService.uniforms.viewLightDir.value.copy(directionVS);
                        }
                    });
                });
            };
        }(),
        updateCrosshair : function() {
            var p = new THREE.Vector3;
            var vector = new THREE.Vector3;
            var matrix = new THREE.Vector2;
            var q = new THREE.Vector2;
            return function() {
                if (this.VREnabled) {
                    var i = this.hud.currentPalette;
                    if (this.camera.updateMatrixWorld(true), this.crosshair.getWorldPosition(vector), vector.project(this.camera), matrix.set(vector.x, vector.y), i) {
                        /** @type {number} */
                        var bMin = 1 / 0;
                        i.children.forEach(function(object) {
                            object.getWorldPosition(p);
                            p.project(this.camera);
                            q.set(p.x, p.y);
                            var b = matrix.distanceTo(q);
                            if (b < bMin) {
                                bMin = b;
                            }
                        }, this);
                        if (bMin > .5) {
                            this.crosshair.fadeOut();
                            this.ui.fadeInMarker();
                        } else {
                            this.crosshair.fadeIn();
                            this.ui.fadeOutMarker();
                        }
                    }
                }
            };
        }(),
        updateUI : function() {
            if (window.isMobile) {
                return void this.scenePicker.hitTest(true);
            }
            if (!(this.camera.moving || this.camera.rotating || !this.camera.enabled)) {
                if (this.hud.visible) {
                    if (this.hudPicker.hitTest()) {
                        this.scenePicker.clearState();
                        this.ui.onEnterObject();
                        if (!this.camera.vr) {
                            /** @type {boolean} */
                            this.camera.orbitControls.enabled = false;
                        }
                    } else {
                        this.scenePicker.hitTest();
                        if (this.camera.mode === PerspectiveCamera.ORBIT_MODE) {
                            /** @type {boolean} */
                            this.camera.orbitControls.enabled = true;
                        }
                    }
                } else {
                    this.scenePicker.hitTest();
                }
            }
            if (this.camera.rotating) {
                this.scenePicker.clearState();
                this.hudPicker.clearState();
                if (this.ui.currentHighlighted) {
                    this.clearHighlight(this.ui.currentHighlighted);
                }
            }
            this.ui.update(this.scenePicker.getPoint());
        },
        updateFlares : function() {
            var ray = new THREE.Raycaster;
            var t = new THREE.Vector3;
            var point = new THREE.Vector3;
            /** @type {!Array} */
            var pipelets = ["walls", "sofa_main", "laptop", "suspended_lamp", "table_objects_merged", "bottle", "seat_main_left"];
            /** @type {!Array} */
            var targets = [];
            return function() {
                if (0 === targets.length) {
                    pipelets.forEach(function(name) {
                        var username = this.interiorScene.getObjectByName(name);
                        if (username) {
                            targets.push(username);
                        }
                    }, this);
                }
                this.camera.getWorldPosition(point);
                this.flares.forEach(function(p, canCreateDiscussions) {
                    t.subVectors(p.position, point).normalize();
                    ray.set(point, t);
                    if (ray.intersectObjects(targets).length > 1) {
                        /** @type {boolean} */
                        p.visible = false;
                    } else {
                        /** @type {boolean} */
                        p.visible = true;
                    }
                }, this);
            };
        }(),
        update : function(time) {
            if (!(this.VREnabled || this.mode !== Collection.VR_MODE)) {
                this.effect.requestPresent();
                /** @type {boolean} */
                this.VREnabled = true;
            }
            if (this.camera.enabled) {
                this.camera.update();
            }
            if (this.startInstructions && !this.enteredRoom) {
                this.updateInstructions(time);
            }
            if (this.flares) {
                this.updateFlares();
            }
            this.updateUI();
            this.hud.update(time);
            this.water.update(time);
            this.updateSeaHighlights(time);
            this.updateDirLight();
            this.updateCrosshair();
            if (this.inputManager) {
                this.inputManager.update();
            }
            obj.prototype.update.call(this, time);
        },
        preRenderHUD : function() {
            this.renderer.clear();
            /** @type {boolean} */
            this.hud.visible = true;
            this.hud.showAllPalettes(false);
            this.hud.showAllPanels();
            this.hud.render(this.renderer);
            /** @type {boolean} */
            this.hud.visible = false;
            this.hud.hideAllPalettes();
            this.hud.hideAllPanels();
        },
        preRenderAll : function() {
            this.renderer.clear();
            this.scene.traverse(function(object) {
                /** @type {boolean} */
                object.frustumCulled = false;
                object.wasVisible = object.visible;
                /** @type {boolean} */
                object.visible = true;
            });
            /** @type {boolean} */
            this.hud.visible = true;
            this.hud.showAllPalettes(false);
            this.hud.showAllPanels();
            this.water.render();
            this.renderScene(this.scene, this.camera);
            this.hud.render(this.renderer);
            /** @type {boolean} */
            this.hud.visible = false;
            this.hud.hideAllPalettes();
            this.hud.hideAllPanels();
            this.scene.traverse(function(object) {
                /** @type {boolean} */
                object.frustumCulled = true;
                object.visible = object.wasVisible;
                delete object.wasVisible;
            });
        },
        render : function() {
            /** @type {number} */
            var totalPlayers = 0;
            var mapFragmentAndProps = function() {
                if (this.config.logCalls) {
                    totalPlayers = totalPlayers + this.renderer.info.render.calls;
                }
            }.bind(this);
            this.renderer.clear();
            this.noise.render(this.renderer);
            if (this.mode === Collection.VR_MODE) {
                if (this.enteredRoom) {
                    this.effect.render(this.exteriorScene, this.camera);
                    this.effect.render(this.interiorScene, this.camera);
                    if (this.hoverScene.children.length > 0) {
                        this.effect.render(this.hoverScene, this.camera);
                    }
                } else {
                    this.effect.render(this.startScene, this.camera);
                }
                this.effect.render(this.cameraScene, this.camera);
                this.effect.render(this.transitionScene, this.camera);
                this.effect.submitFrame();
            } else {
                if (this.mode === Collection.DEFAULT_MODE) {
                    this.renderScene(this.interiorScene, this.camera);
                    mapFragmentAndProps();
                    this.renderScene(this.exteriorScene, this.camera);
                    mapFragmentAndProps();
                    if (this.hoverScene.children.length > 0) {
                        this.renderScene(this.hoverScene, this.camera);
                        mapFragmentAndProps();
                    }
                    this.hud.render(this.renderer);
                    mapFragmentAndProps();
                    this.renderScene(this.cameraScene, this.camera);
                    mapFragmentAndProps();
                    if (this.config.logCalls) {
                        this.dcCounter.textContent = totalPlayers + " DC";
                    }
                }
            }
        },
        requestAnimationFrame : function(callback) {
            if (this.effect) {
                this.effect.requestAnimationFrame(callback);
            } else {
                requestAnimationFrame(callback);
            }
        },
        captureFrame : function(size, height) {
            this.setSize(size, height);
            this.render();
            /** @type {(UI|null)} */
            var canvasDrawBG = document.querySelector("canvas");
            window.open(canvasDrawBG.toDataURL());
        }
    });
    Collection.mixin(query);
    /** @type {number} */
    Collection.DEFAULT_MODE = 0;
    /** @type {number} */
    Collection.VR_MODE = 1;
    /** @type {function(!Function): undefined} */
    module.exports = Collection;
}, function(context, canCreateDiscussions, $) {
    /**
     * @param {?} allOrId
     * @return {undefined}
     */
    function update(allOrId) {
        /** @type {number} */
        var width = window.WIDTH = window.innerWidth;
        /** @type {number} */
        var height = window.HEIGHT = window.innerHeight;
        this.setSize(width, height);
    }
    /**
     * @param {string} t
     * @return {undefined}
     */
    function attachVisibilityEvent(t) {
        var propertyName;
        var visibilityChange;
        if (void 0 !== document.hidden) {
            /** @type {string} */
            propertyName = "hidden";
            /** @type {string} */
            visibilityChange = "visibilitychange";
        } else {
            if (void 0 !== document.mozHidden) {
                /** @type {string} */
                propertyName = "mozHidden";
                /** @type {string} */
                visibilityChange = "mozvisibilitychange";
            } else {
                if (void 0 !== document.msHidden) {
                    /** @type {string} */
                    propertyName = "msHidden";
                    /** @type {string} */
                    visibilityChange = "msvisibilitychange";
                } else {
                    if (void 0 !== document.webkitHidden) {
                        /** @type {string} */
                        propertyName = "webkitHidden";
                        /** @type {string} */
                        visibilityChange = "webkitvisibilitychange";
                    }
                }
            }
        }
        if (void 0 !== document.addEventListener) {
            document.addEventListener(visibilityChange, function() {
                if (document[propertyName]) {
                    t.onLeaveTab();
                } else {
                    setTimeout(t.onFocusTab.bind(t), 50);
                }
            }, false);
        }
    }
    /**
     * @param {?} _options
     * @return {undefined}
     */
    function Slatebox(_options) {
    }
    var o = $(1);
    var that = $(11);
    var r = $(41);
    /**
     * @param {!Object} options
     * @return {undefined}
     */
    var init = function(options) {
        if (options = void 0 !== options ? options : {}, this.renderer = new THREE.WebGLRenderer({
            alpha : true,
            antialias : true,
            canvas : options.canvas || document.querySelector("canvas"),
            preserveDrawingBuffer : void 0 !== options.preserveDrawingBuffer ? options.preserveDrawingBuffer : void 0
        }), THREE.Extensions = this.renderer.extensions, this.config = {
            fps : void 0 !== options.fps && options.fps,
            profiling : void 0 !== options.profiling && options.profiling,
            logDrawCalls : void 0 !== options.logDrawCalls && options.logDrawCalls
        }, options && options.maxPixelRatio) {
            var ratio = window.devicePixelRatio > options.maxPixelRatio ? options.maxPixelRatio : window.devicePixelRatio;
        } else {
            /** @type {number} */
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
            THREE.Extensions.get("EXT_shader_texture_lod");
        }
        this.clock = new THREE.Clock;
        /** @type {boolean} */
        this.paused = false;
        /** @type {!Array} */
        this.scenes = [];
        /** @type {null} */
        this.scene = null;
        /** @type {number} */
        this._drawCalls = 0;
        window.onresize = update.bind(this);
        window.addEventListener("keyup", Slatebox.bind(this));
        this.renderer.domElement.addEventListener("mousemove", function(event) {
            /** @type {number} */
            window.mouseX = event.pageX / WIDTH * 2 - 1;
            /** @type {number} */
            window.mouseY = 1 - event.pageY / HEIGHT * 2;
        });
        if (this.config.fps) {
            this.fpsCounter = new r;
            /** @type {!UI} */
            this.counter = document.createElement("div");
            document.querySelectorAll("body")[0].appendChild(this.counter);
            this.counter.setAttribute("style", "position:absolute;top:20px;left:200px;color:#ff00ff;display:block !important;z-index:999999;");
        }
        attachVisibilityEvent(this);
    };
    init.prototype = {
        render : function(elem) {
            if (this.scene && this.camera) {
                this.renderScene(this.scene, this.camera);
            }
        },
        renderScene : function(scene, camera) {
            this.renderer.render(scene, camera);
            if (this.config.logDrawCalls) {
                this._drawCalls += this.renderer.info.render.calls;
            }
        },
        update : function(time) {
            if (this.camera) {
                this.camera.updateMatrixWorld(true);
                this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld);
            }
            _.each(this.scenes, function(child) {
                this.updateCustomMaterials(child);
                if (child.update) {
                    child.updateMatrixWorld(true);
                    child.update(this.renderer, time);
                }
            }, this);
        },
        updateCustomMaterials : function(scope, tagName) {
            _.each(scope.materials, function(parent) {
                if (parent.pbr && (tagName || this.camera)) {
                    parent.refreshUniforms(tagName || this.camera);
                }
            }, this);
        },
        doUpdate : function() {
            var data = {
                delta : 0,
                elapsed : 0
            };
            return function() {
                if (data.delta = this.clock.getDelta(), data.elapsed = this.clock.getElapsedTime(), !this.paused) {
                    this.requestAnimationFrame(this.doUpdate.bind(this));
                    /** @type {number} */
                    var time = void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now();
                    TWEEN.update(time);
                    that.updateTimers(data);
                    if (this.config.logDrawCalls) {
                        /** @type {number} */
                        this._drawCalls = 0;
                    }
                    if (this.config.profiling) {
                        console.time("update");
                    }
                    this.update(data);
                    if (this.config.profiling) {
                        console.timeEnd("update");
                    }
                    this.render(data);
                    if (!this.started) {
                        /** @type {boolean} */
                        this.started = true;
                    }
                    if (this.config.fps) {
                        this.fpsCounter.update(data, function(pctg) {
                            /** @type {string} */
                            this.counter.textContent = pctg + " FPS";
                        }.bind(this));
                    }
                    if (this.config.logDrawCalls) {
                        this.logDrawCalls(this._drawCalls);
                    }
                }
            };
        }(),
        start : function() {
            this.doUpdate();
        },
        pause : function() {
            if (!this.paused) {
                this.clock.stop();
                /** @type {boolean} */
                this.paused = true;
                if (this.config.fps) {
                    this.counter.textContent += " (paused)";
                }
            }
        },
        resume : function() {
            if (this.paused) {
                this.clock.start();
                /** @type {boolean} */
                this.paused = false;
                if (this.started) {
                    this.doUpdate();
                }
            }
        },
        onLeaveTab : function() {
            if (!this.paused) {
                this.pause();
                /** @type {boolean} */
                this.shouldResume = true;
            }
        },
        onFocusTab : function() {
            if (this.shouldResume) {
                this.resume();
                /** @type {boolean} */
                this.shouldResume = false;
            }
        },
        setAspectRatio : function(aspect) {
            if (this.camera) {
                /** @type {number} */
                this.camera.aspect = aspect;
                this.camera.updateProjectionMatrix();
            }
        },
        setSize : function(width, height) {
            if (this.started) {
                this.setAspectRatio(width / height);
            }
            this.renderer.setSize(width, height);
        },
        requestAnimationFrame : function(callback) {
            requestAnimationFrame(callback);
        },
        logDrawCalls : function(contextReference) {
            console.log("Draw calls:", contextReference);
        }
    };
    init.mixin(o);
    /** @type {function(!Object): undefined} */
    context.exports = init;
}, function(module, canCreateDiscussions) {
    /**
     * @param {!Object} options
     * @return {undefined}
     */
    var $ = function(options) {
        options = _.extend({}, {
            duration : 1E3,
            repeat : false,
            onStart : function() {
            },
            onEnd : function() {
            }
        }, options);
        this.duration = options.duration;
        this.repeat = options.repeat;
        this.startCallback = options.onStart;
        this.endCallback = options.onEnd;
        this.reset();
    };
    $.inherit(Object, {
        reset : function() {
            return this.started = false, this.paused = false, this.ended = false, this.elapsedTime = 0, this;
        },
        start : function() {
            return this.started || this.ended ? this : (this.started = true, this.startCallback(), this);
        },
        stop : function() {
            return this.started ? this.reset() : this;
        },
        pause : function() {
            return this.paused = true, this;
        },
        resume : function() {
            return this.paused = false, this;
        },
        update : function(time) {
            return !this.started || this.paused || this.ended ? this : (this.elapsedTime += 1E3 * time.delta, this.elapsedTime > this.duration && (this.endCallback(), this.ended = true), this);
        }
    });
    /** @type {function(!Object): undefined} */
    module.exports = $;
}, function(module, canCreateDiscussions) {
    /**
     * @return {undefined}
     */
    var Stats = function() {
        /** @type {number} */
        this.frames = 0;
        /** @type {number} */
        this.fps = 0;
        /** @type {number} */
        this.lastTime = 0;
    };
    Stats.prototype = {
        update : function(time, transform) {
            /** @type {number} */
            time = 1E3 * time.elapsed;
            this.frames++;
            if (time > this.lastTime + 1E3) {
                /** @type {number} */
                this.fps = Math.round(1E3 * this.frames / (time - this.lastTime));
                transform(this.fps);
                /** @type {number} */
                this.lastTime = time;
                /** @type {number} */
                this.frames = 0;
            }
        }
    };
    /** @type {function(): undefined} */
    module.exports = Stats;
}, function(context, canCreateDiscussions) {
    /**
     * @return {undefined}
     */
    var init = function() {
        THREE.Mesh.call(this, new THREE.SphereGeometry(.005, 25, 25), new THREE.MeshBasicMaterial({
            color : 16777215,
            opacity : 1,
            transparent : true,
            depthTest : false
        }));
        /** @type {number} */
        this.position.z = -.5;
        this.tween = new TWEEN.Tween;
        this.values = {
            opacity : 1,
            scale : 1
        };
    };
    init.inherit(THREE.Mesh, {
        fadeIn : function() {
            if (this.faded) {
                var x = this.values;
                this.tween.reset(x).to({
                    opacity : 1,
                    scale : 1
                }, 750).easing(TWEEN.Easing.Cubic.InOut).onUpdate(function() {
                    this.material.opacity = x.opacity;
                    this.scale.set(x.scale, x.scale, x.scale);
                }.bind(this)).start();
                /** @type {boolean} */
                this.faded = false;
            }
        },
        fadeOut : function() {
            if (!this.faded) {
                var x = this.values;
                this.tween.reset(x).to({
                    opacity : 0,
                    scale : .7
                }, 400).easing(TWEEN.Easing.Cubic.InOut).onUpdate(function() {
                    this.material.opacity = x.opacity;
                    this.scale.set(x.scale, x.scale, x.scale);
                }.bind(this)).start();
                /** @type {boolean} */
                this.faded = true;
            }
        }
    });
    /** @type {function(): undefined} */
    context.exports = init;
}, function(context, canCreateDiscussions) {
    /**
     * @param {!Object} renderer
     * @param {!Object} e
     * @return {undefined}
     */
    var init = function(renderer, e) {
        /**
         * @param {!Object} displays
         * @return {undefined}
         */
        function callback(displays) {
            /** @type {!Object} */
            vrDisplays = displays;
            if (displays.length > 0) {
                vrDisplay = displays[0];
            } else {
                if (e) {
                    e("HMD not available");
                }
            }
        }
        /**
         * @return {undefined}
         */
        function onVRDisplayPresentChange() {
            var wasPresenting = scope.isPresenting;
            if (scope.isPresenting = void 0 !== vrDisplay && vrDisplay.isPresenting, scope.isPresenting) {
                var eyeParamsL = vrDisplay.getEyeParameters("left");
                var eyeWidth = eyeParamsL.renderWidth;
                var eyeHeight = eyeParamsL.renderHeight;
                if (!wasPresenting) {
                    rendererPixelRatio = renderer.getPixelRatio();
                    viewer_size = renderer.getSize();
                    renderer.setPixelRatio(1);
                    renderer.setSize(2 * eyeWidth, eyeHeight, false);
                }
            } else {
                if (wasPresenting) {
                    renderer.setPixelRatio(rendererPixelRatio);
                    renderer.setSize(viewer_size.width, viewer_size.height, large);
                }
            }
        }
        /**
         * @param {!Object} data
         * @return {undefined}
         */
        function update(data) {
            if (data.pose.orientation) {
                globalQuat.fromArray(data.pose.orientation);
                globalMtx.makeRotationFromQuaternion(globalQuat);
            } else {
                globalMtx.identity();
            }
            if (data.pose.position) {
                vector.fromArray(data.pose.position);
                globalMtx.setPosition(vector);
            }
            m.fromArray(data.leftViewMatrix);
            m.multiply(globalMtx);
            matrix.fromArray(data.rightViewMatrix);
            matrix.multiply(globalMtx);
            m.getInverse(m);
            matrix.getInverse(matrix);
        }
        /**
         * @param {?} fov
         * @return {?}
         */
        function fovToNDCScaleOffset(fov) {
            /** @type {number} */
            var s = 2 / (fov.leftTan + fov.rightTan);
            /** @type {number} */
            var pxoffset = (fov.leftTan - fov.rightTan) * s * .5;
            /** @type {number} */
            var pyscale = 2 / (fov.upTan + fov.downTan);
            return {
                scale : [s, pyscale],
                offset : [pxoffset, (fov.upTan - fov.downTan) * pyscale * .5]
            };
        }
        /**
         * @param {?} fov
         * @param {number} rightHanded
         * @param {number} zNear
         * @param {number} zFar
         * @return {?}
         */
        function fovPortToProjection(fov, rightHanded, zNear, zFar) {
            rightHanded = void 0 === rightHanded || rightHanded;
            zNear = void 0 === zNear ? .01 : zNear;
            zFar = void 0 === zFar ? 1E4 : zFar;
            /** @type {number} */
            var handednessScale = rightHanded ? -1 : 1;
            var matrix = new THREE.Matrix4;
            var m = matrix.elements;
            var scaleAndOffset = fovToNDCScaleOffset(fov);
            return m[0] = scaleAndOffset.scale[0], m[1] = 0, m[2] = scaleAndOffset.offset[0] * handednessScale, m[3] = 0, m[4] = 0, m[5] = scaleAndOffset.scale[1], m[6] = -scaleAndOffset.offset[1] * handednessScale, m[7] = 0, m[8] = 0, m[9] = 0, m[10] = zFar / (zNear - zFar) * -handednessScale, m[11] = zFar * zNear / (zNear - zFar), m[12] = 0, m[13] = 0, m[14] = handednessScale, m[15] = 0, matrix.transpose(), matrix;
        }
        /**
         * @param {!Object} fov
         * @param {boolean} rightHanded
         * @param {undefined} zNear
         * @param {undefined} zFar
         * @return {?}
         */
        function fovToProjection(fov, rightHanded, zNear, zFar) {
            /** @type {number} */
            var DEG2RAD = Math.PI / 180;
            return fovPortToProjection({
                upTan : Math.tan(fov.upDegrees * DEG2RAD),
                downTan : Math.tan(fov.downDegrees * DEG2RAD),
                leftTan : Math.tan(fov.leftDegrees * DEG2RAD),
                rightTan : Math.tan(fov.rightDegrees * DEG2RAD)
            }, rightHanded, zNear, zFar);
        }
        var vrDisplay;
        var vrDisplays;
        var renderRectL;
        var renderRectR;
        var eyeTranslationR = new THREE.Vector3;
        var eyeTranslationL = new THREE.Vector3;
        var globalMtx = new THREE.Matrix4;
        var m = new THREE.Matrix4;
        var matrix = new THREE.Matrix4;
        /** @type {null} */
        var frameData = null;
        if ("VRFrameData" in window) {
            frameData = new window.VRFrameData;
        }
        if (navigator.getVRDisplays) {
            navigator.getVRDisplays().then(callback).catch(function() {
                console.warn("THREE.VREffect: Unable to get VR Displays");
            });
        }
        /** @type {boolean} */
        this.isPresenting = false;
        var scope = this;
        var viewer_size = renderer.getSize();
        /** @type {boolean} */
        var large = false;
        var rendererPixelRatio = renderer.getPixelRatio();
        /**
         * @return {?}
         */
        this.getVRDisplay = function() {
            return vrDisplay;
        };
        /**
         * @param {!Array} value
         * @return {undefined}
         */
        this.setVRDisplay = function(value) {
            /** @type {!Array} */
            vrDisplay = value;
        };
        /**
         * @return {?}
         */
        this.getVRDisplays = function() {
            return console.warn("THREE.VREffect: getVRDisplays() is being deprecated."), vrDisplays;
        };
        /**
         * @param {number} width
         * @param {number} height
         * @param {boolean} type
         * @return {undefined}
         */
        this.setSize = function(width, height, type) {
            if (viewer_size = {
                width : width,
                height : height
            }, large = type, scope.isPresenting) {
                var eyeParamsL = vrDisplay.getEyeParameters("left");
                renderer.setPixelRatio(1);
                renderer.setSize(2 * eyeParamsL.renderWidth, eyeParamsL.renderHeight, false);
            } else {
                renderer.setPixelRatio(rendererPixelRatio);
                renderer.setSize(width, height, type);
            }
        };
        var d = renderer.domElement;
        /** @type {!Array} */
        var a = [0, 0, .5, 1];
        /** @type {!Array} */
        var defaultRightBounds = [.5, 0, .5, 1];
        window.addEventListener("vrdisplaypresentchange", onVRDisplayPresentChange, false);
        /**
         * @param {boolean} boolean
         * @return {?}
         */
        this.setFullScreen = function(boolean) {
            return new Promise(function(resolve, reject) {
                return void 0 === vrDisplay ? void reject(new Error("No VR hardware found.")) : scope.isPresenting === boolean ? void resolve() : void resolve(boolean ? vrDisplay.requestPresent([{
                    source : d
                }]) : vrDisplay.exitPresent());
            });
        };
        /**
         * @return {?}
         */
        this.requestPresent = function() {
            return this.setFullScreen(true);
        };
        /**
         * @return {?}
         */
        this.exitPresent = function() {
            return this.setFullScreen(false);
        };
        /**
         * @param {?} cb
         * @return {?}
         */
        this.requestAnimationFrame = function(cb) {
            return void 0 !== vrDisplay ? vrDisplay.requestAnimationFrame(cb) : window.requestAnimationFrame(cb);
        };
        /**
         * @param {?} h
         * @return {undefined}
         */
        this.cancelAnimationFrame = function(h) {
            if (void 0 !== vrDisplay) {
                vrDisplay.cancelAnimationFrame(h);
            } else {
                window.cancelAnimationFrame(h);
            }
        };
        /**
         * @return {undefined}
         */
        this.submitFrame = function() {
            if (void 0 !== vrDisplay && scope.isPresenting) {
                vrDisplay.submitFrame();
            }
        };
        /** @type {boolean} */
        this.autoSubmitFrame = true;
        var cameraR = new THREE.PerspectiveCamera;
        cameraR.layers.enable(1);
        var obj = new THREE.PerspectiveCamera;
        obj.layers.enable(2);
        /**
         * @param {!Object} scene
         * @param {!Object} camera
         * @param {!WebGLRenderingContext} renderTarget
         * @param {string} forceClear
         * @return {?}
         */
        this.render = function(scene, camera, renderTarget, forceClear) {
            if (vrDisplay && scope.isPresenting) {
                var currentSceneAutoUpdate = scene.autoUpdate;
                if (currentSceneAutoUpdate) {
                    scene.updateMatrixWorld();
                    /** @type {boolean} */
                    scene.autoUpdate = false;
                }
                if (Array.isArray(scene)) {
                    console.warn("THREE.VREffect.render() no longer supports arrays. Use object.layers instead.");
                    scene = scene[0];
                }
                var s;
                var rightBounds;
                var size = renderer.getSize();
                var tempLayers = vrDisplay.getLayers();
                if (tempLayers.length) {
                    var layer = tempLayers[0];
                    s = null !== layer.leftBounds && 4 === layer.leftBounds.length ? layer.leftBounds : a;
                    rightBounds = null !== layer.rightBounds && 4 === layer.rightBounds.length ? layer.rightBounds : defaultRightBounds;
                } else {
                    /** @type {!Array} */
                    s = a;
                    /** @type {!Array} */
                    rightBounds = defaultRightBounds;
                }
                if (renderRectL = {
                    x : Math.round(size.width * s[0]),
                    y : Math.round(size.height * s[1]),
                    width : Math.round(size.width * s[2]),
                    height : Math.round(size.height * s[3])
                }, renderRectR = {
                    x : Math.round(size.width * rightBounds[0]),
                    y : Math.round(size.height * rightBounds[1]),
                    width : Math.round(size.width * rightBounds[2]),
                    height : Math.round(size.height * rightBounds[3])
                }, renderTarget ? (renderer.setRenderTarget(renderTarget), renderTarget.scissorTest = true) : (renderer.setRenderTarget(null), renderer.setScissorTest(true)), (renderer.autoClear || forceClear) && renderer.clear(), null === camera.parent && camera.updateMatrixWorld(), camera.matrixWorld.decompose(cameraR.position, cameraR.quaternion, cameraR.scale), obj.position.copy(cameraR.position), obj.quaternion.copy(cameraR.quaternion), obj.scale.copy(cameraR.scale), vrDisplay.getFrameData) {
                    vrDisplay.depthNear = camera.near;
                    vrDisplay.depthFar = camera.far;
                    vrDisplay.getFrameData(frameData);
                    cameraR.projectionMatrix.elements = frameData.leftProjectionMatrix;
                    obj.projectionMatrix.elements = frameData.rightProjectionMatrix;
                    update(frameData);
                    cameraR.updateMatrix();
                    cameraR.matrix.multiply(m);
                    cameraR.matrix.decompose(cameraR.position, cameraR.quaternion, cameraR.scale);
                    obj.updateMatrix();
                    obj.matrix.multiply(matrix);
                    obj.matrix.decompose(obj.position, obj.quaternion, obj.scale);
                } else {
                    var eyeParamsR = vrDisplay.getEyeParameters("left");
                    var eyeParamsL = vrDisplay.getEyeParameters("right");
                    cameraR.projectionMatrix = fovToProjection(eyeParamsR.fieldOfView, true, camera.near, camera.far);
                    obj.projectionMatrix = fovToProjection(eyeParamsL.fieldOfView, true, camera.near, camera.far);
                    eyeTranslationR.fromArray(eyeParamsR.offset);
                    eyeTranslationL.fromArray(eyeParamsL.offset);
                    cameraR.translateOnAxis(eyeTranslationR, cameraR.scale.x);
                    obj.translateOnAxis(eyeTranslationL, obj.scale.x);
                }
                return renderTarget ? (renderTarget.viewport.set(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height), renderTarget.scissor.set(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height)) : (renderer.setViewport(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height), renderer.setScissor(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height)), renderer.render(scene, cameraR, renderTarget, forceClear), renderTarget ? (renderTarget.viewport.set(renderRectR.x,
                    renderRectR.y, renderRectR.width, renderRectR.height), renderTarget.scissor.set(renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height)) : (renderer.setViewport(renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height), renderer.setScissor(renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height)), renderer.render(scene, obj, renderTarget, forceClear), renderTarget ? (renderTarget.viewport.set(0, 0, size.width, size.height), renderTarget.scissor.set(0, 0,
                    size.width, size.height), renderTarget.scissorTest = false, renderer.setRenderTarget(null)) : (renderer.setViewport(0, 0, size.width, size.height), renderer.setScissorTest(false)), currentSceneAutoUpdate && (scene.autoUpdate = true), void(scope.autoSubmitFrame && scope.submitFrame());
            }
            renderer.render(scene, camera, renderTarget, forceClear);
        };
        /**
         * @return {undefined}
         */
        this.dispose = function() {
            window.removeEventListener("vrdisplaypresentchange", onVRDisplayPresentChange, false);
        };
        var globalQuat = new THREE.Quaternion;
        var vector = new THREE.Vector3;
    };
    /** @type {function(!Object, !Object): undefined} */
    context.exports = init;
}, function(module, canCreateDiscussions, prompt) {
    var p = prompt(0);
    var c = prompt(4);
    var target = prompt(1);
    var ColorMaterialProperty = prompt(45);
    /** @type {function(!Object): undefined} */
    var Element = (window.innerWidth, window.innerHeight, function(options) {
        this.scene = options.scene;
        this.camera = options.camera;
        this.configurables = options.configurables;
        this.$container = options.container;
        this.vr = options.vr;
        this.$lookInstructions = $('[data-ref="look_instructions"]');
        this.$materialInstructions = $('[data-ref="material_instructions"]');
        this.$moveInstructions = $('[data-ref="move_instructions"]');
        this.tweens = {
            marker : new TWEEN.Tween
        };
        this.values = {
            markerOpacity : 1
        };
        this.initStrokes();
        this.initMarker();
        if (this.vr) {
            this.initVRInstructions();
        }
    });
    Element.prototype = {
        initVRInstructions : function() {
            this.VRMoveInstructions = this.scene.getObjectByName("move_instructions");
            if (this.VRMoveInstructions) {
                /** @type {number} */
                this.VRMoveInstructions.position.z = -.75;
                /** @type {number} */
                this.VRMoveInstructions.position.y = -.25;
                this.camera.add(this.VRMoveInstructions);
            }
            this.VRConfigureInstructions = this.scene.getObjectByName("configure_instructions");
            if (this.VRConfigureInstructions) {
                /** @type {number} */
                this.VRConfigureInstructions.position.z = -.75;
                /** @type {number} */
                this.VRConfigureInstructions.position.y = -.25;
                this.camera.add(this.VRConfigureInstructions);
            }
        },
        initStrokes : function() {
            this.configurables.forEach(function(_ref33) {
                var name = _ref33.name;
                var node = this.scene.getObjectByName(name);
                var source = this.scene.getObjectByName(node.name + "_stroke");
                var g = this.scene.getObjectByName("hovergroup_" + name);
                if (void 0 === source) {
                    return void console.warn("Missing stroke mesh for " + name);
                }
                /** @type {number} */
                source.renderOrder = 1;
                if (g) {
                    g.traverse(function(a) {
                        /** @type {number} */
                        a.renderOrder = 2;
                    });
                    node.group = g;
                } else {
                    node.traverse(function(a) {
                        /** @type {number} */
                        a.renderOrder = 2;
                    });
                }
                node.add(source);
                source.position.set(0, 0, 0);
                source.rotation.set(0, 0, 0);
                source.scale.set(1, 1, 1);
                source.material = new ColorMaterialProperty;
                source.material.objectScale = node.scale.x;
                node.stroke = source;
            }, this);
        },
        highlightObject : function(object) {
            /** @type {boolean} */
            object.stroke.visible = true;
            /** @type {!Object} */
            this.currentHighlighted = object;
            this.onEnterObject();
            if (this.vr) {
                if (this.VRConfigureInstructions) {
                    /** @type {boolean} */
                    this.VRConfigureInstructions.visible = true;
                }
                if (this.VRMoveInstructions) {
                    /** @type {boolean} */
                    this.VRMoveInstructions.visible = false;
                }
            }
        },
        clearHighlight : function() {
            if (this.currentHighlighted) {
                /** @type {boolean} */
                this.currentHighlighted.stroke.visible = false;
                /** @type {null} */
                this.currentHighlighted = null;
            }
            this.onLeaveObject();
            if (this.vr && this.VRConfigureInstructions) {
                /** @type {boolean} */
                this.VRConfigureInstructions.visible = false;
            }
        },
        onEnterObject : function() {
            this.$container.addClass("hovering");
        },
        onLeaveObject : function() {
            this.$container.removeClass("hovering");
        },
        initMarker : function() {
            this.marker = new THREE.Mesh(new THREE.PlaneGeometry(.4, .4, 1, 1), new THREE.MeshBasicMaterial({
                color : 16777215,
                map : p.getTexture("textures/marker.png"),
                transparent : true,
                opacity : .5,
                depthWrite : false
            }));
            /** @type {number} */
            this.marker.material.map.anisotropy = 16;
            this.scene.add(this.marker);
            var h = this.marker.clone();
            h.material = new THREE.MeshBasicMaterial({
                transparent : true,
                map : p.getTexture("textures/circle.png"),
                depthWrite : false,
                opacity : 0,
                blending : THREE.AdditiveBlending
            });
            this.marker.add(h);
            this.marker.ripple = h;
            /** @type {number} */
            this.marker.rotation.x = -Math.PI / 2;
            this.marker.position.setY(.05);
            /** @type {boolean} */
            this.marker.visible = true;
            this.hideMarker();
        },
        freezeMarker : function() {
            /** @type {boolean} */
            this.marker.frozen = true;
        },
        unfreezeMarker : function() {
            /** @type {boolean} */
            this.marker.frozen = false;
        },
        updateMarker : function(data) {
            if (data) {
                this.marker.position.x = data.x;
                this.marker.position.z = data.z;
            }
            if (this.marker.visible && !this.$container.hasClass("hovering")) {
                this.$container.addClass("hovering");
            }
        },
        showMarker : function() {
            /** @type {boolean} */
            this.marker.visible = true;
            this.$container.addClass("hovering");
            if (this.vr && this.VRMoveInstructions) {
                /** @type {boolean} */
                this.VRMoveInstructions.visible = true;
            }
        },
        hideMarker : function() {
            /** @type {boolean} */
            this.marker.visible = false;
            this.$container.removeClass("hovering");
        },
        fadeInMarker : function() {
            this.tweens.marker.reset(this.values).to({
                markerOpacity : 1
            }, 500).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function() {
                this.marker.material.opacity = this.values.markerOpacity;
            }.bind(this)).start();
        },
        fadeOutMarker : function() {
            this.tweens.marker.reset(this.values).to({
                markerOpacity : 0
            }, 300).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function() {
                this.marker.material.opacity = this.values.markerOpacity;
            }.bind(this)).start();
        },
        activateMarker : function() {
            c.tween(500, TWEEN.Easing.Quadratic.Out).onUpdate(function(i) {
                /** @type {number} */
                this.marker.material.opacity = .5 + .5 * (1 - i);
                /** @type {number} */
                this.marker.ripple.material.opacity = 1 - i;
                this.marker.ripple.scale.set(1 + i / 2, 1 + i / 2, 1 + i / 2);
            }.bind(this));
        },
        showMaterialInstructions : function() {
            this.$materialInstructions.addClass("visible");
        },
        hideMaterialInstructions : function() {
            this.$materialInstructions.addClass("fadeout");
            setTimeout(function() {
                this.$materialInstructions.removeClass("fadeout visible");
                this.$materialInstructions.hide();
            }.bind(this), 500);
        },
        showLookInstructions : function() {
            this.$lookInstructions.addClass("visible");
        },
        hideLookInstructions : function() {
            this.$lookInstructions.addClass("fadeout");
            setTimeout(function() {
                this.$lookInstructions.removeClass("fadeout visible");
                this.$lookInstructions.hide();
            }.bind(this), 500);
        },
        hideConfigureInstructions : function() {
            if (this.vr && this.VRConfigureInstructions) {
                this.camera.remove(this.VRConfigureInstructions);
                /** @type {null} */
                this.VRConfigureInstructions = null;
            }
        },
        showMoveInstructions : function() {
            this.$moveInstructions.addClass("visible");
        },
        hideMoveInstructions : function() {
            this.$moveInstructions.addClass("fadeout");
            setTimeout(function() {
                this.$moveInstructions.removeClass("fadeout visible");
                this.$moveInstructions.hide();
            }.bind(this), 500);
            if (this.vr && this.VRMoveInstructions) {
                this.camera.remove(this.VRMoveInstructions);
                /** @type {null} */
                this.VRMoveInstructions = null;
            }
        },
        update : function(type) {
            if (!this.marker.frozen) {
                this.updateMarker(type);
            }
        }
    };
    Element.mixin(target);
    /** @type {function(!Object): undefined} */
    module.exports = Element;
}, function(context, canCreateDiscussions, glslify) {
    var p = glslify(2);
    /**
     * @param {!Function} name
     * @return {undefined}
     */
    var init = function(name) {
        /** @type {!Object} */
        name = Object.assign({
            vertexShader : glslify(46),
            fragmentShader : glslify(47),
            uniforms : {
                diffuse : {
                    type : "c",
                    value : new THREE.Color(16777215)
                },
                opacity : {
                    type : "f",
                    value : 1
                },
                objectScale : {
                    type : "f",
                    value : 1
                }
            }
        }, name);
        p.call(this, name);
        Object.keys(this.uniforms).forEach(function(propertyName) {
            this.onPropertyChange(propertyName, function(initSBC) {
                /** @type {!Object} */
                this.uniforms[propertyName].value = initSBC;
            });
        }, this);
        /** @type {boolean} */
        this.depthWrite = false;
    };
    init.inherit(p, {
        clone : function(params) {
            var data = params || new init;
            return p.prototype.clone.call(this, data), data.name = this.name, data.transparent = this.transparent, _.each(this.uniforms, function(dom, name) {
                var value = dom.type;
                if ("v2" === value || "m4" === value) {
                    data.uniforms[name].value.copy(dom.value);
                } else {
                    data.uniforms[name].value = dom.value;
                }
            }, this), data;
        }
    });
    /** @type {function(!Function): undefined} */
    context.exports = init;
}, function(mixin, canCreateDiscussions) {
    /** @type {string} */
    mixin.exports = "uniform float objectScale;\n\nvoid main() {\n  float thickness = 0.015 / objectScale;\n  vec4 worldPos = modelMatrix * vec4(position, 1.0);\n  vec4 worldNormal = modelMatrix * vec4(normal, 0.0);\n \n  worldPos += worldNormal * thickness;\n  gl_Position = projectionMatrix * viewMatrix * worldPos;\n}";
}, function(mixin, canCreateDiscussions) {
    /** @type {string} */
    mixin.exports = "uniform vec3 diffuse;\nuniform float opacity;\n\nvoid main() {\n  gl_FragColor = vec4(diffuse, opacity);\n}";
}, function(context, canCreateDiscussions, require) {
    var props = require(1);
    var Path = require(49);
    var LogItemLogsItem = require(51);
    var layer = require(0);
    /**
     * @param {!Object} app
     * @return {undefined}
     */
    var init = function(app) {
        this.scene = new THREE.Scene;
        this.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -1E4, 1E4);
        /** @type {number} */
        this.width = this.camera.right - this.camera.left;
        /** @type {number} */
        this.height = this.camera.top - this.camera.bottom;
        this.size = {
            width : this.width,
            height : this.height
        };
        /** @type {number} */
        this.maxScale = .05 * this.width;
        this.scene.add(this.camera);
        this.camera.position.set(0, 0, 1E3);
        this.camera.lookAt(this.scene.position);
        this.palettes = {};
        /** @type {!Array} */
        this.pickables = [];
        this.createPalettes(app.scene, app.configurables, app.vr);
        this.hideAllPalettes();
        this.createPanels(app.scene, app.configurables, app.vr);
        /** @type {boolean} */
        this.visible = false;
    };
    init.prototype = {
        createPanels : function(scene, count, cmp) {
            var r = layer.getTexture("textures/corner-gradient.png");
            this.panels = {};
            _.each(count, function(p) {
                var objTemplate = scene.getObjectByName("ui_panel").clone();
                var light = new Path({
                    referenceObject : objTemplate,
                    data : p.panel_data,
                    hudSize : {
                        width : this.width,
                        height : this.height
                    },
                    gradientMap : r,
                    showGradient : !cmp
                });
                this.scene.add(light);
                /** @type {boolean} */
                light.visible = false;
                this.panels[p.name] = light;
            }, this);
        },
        createPalettes : function(g, e, islongclick) {
            e.forEach(function(_ref33) {
                var name = _ref33.name;
                var level = g.getObjectByName(name);
                var adjustedLevel = this.getMaterialsForObject(level);
                var item = new LogItemLogsItem({
                    hudSize : this.size,
                    maxScale : this.maxScale,
                    materials : adjustedLevel,
                    exposureBoost : !islongclick
                });
                this.palettes[name] = item;
                this.scene.add(item);
                item.children.forEach(function(t) {
                    this.pickables.push(t);
                }, this);
                /** @type {string} */
                item.name = name + "_palette";
            }, this);
        },
        getMaterialsForObject : function(child) {
            if (child) {
                var e = child.getObjectByName("materials");
                if (e) {
                    return _.map(e.children, function(keypair) {
                        return keypair.material;
                    });
                }
            }
        },
        showAllPalettes : function(t) {
            _.each(this.palettes, function(e) {
                e.show(t);
            }, this);
        },
        hideAllPalettes : function() {
            _.each(this.palettes, function(EmptyContentCollectionOverlay) {
                EmptyContentCollectionOverlay.hide();
            }, this);
            /** @type {null} */
            this.currentPalette = null;
        },
        showAllPanels : function() {
            _.each(this.panels, function(commonModal) {
                commonModal.show(false);
            }, this);
        },
        hideAllPanels : function() {
            _.each(this.panels, function(EmptyContentCollectionOverlay) {
                EmptyContentCollectionOverlay.hide();
            }, this);
        },
        setPanel : function(panel, e) {
            if (this.currentPanel) {
                this.currentPanel.fadeOut();
            }
            this.currentPanel = this.panels[panel];
            this.currentPanel.show(e);
        },
        setPalette : function(name, v) {
            var tryParseQRCode = function() {
                if (this.currentPalette) {
                    this.currentPalette.show();
                }
            }.bind(this);
            if (this.currentPalette) {
                this.currentPalette.fadeOut();
            } else {
                this.hideAllPalettes();
            }
            this.currentPalette = this.palettes[name];
            if (v) {
                setTimeout(tryParseQRCode, v);
            } else {
                tryParseQRCode();
            }
        },
        getPickables : function() {
            return this.pickables;
        },
        show : function() {
            /** @type {boolean} */
            this.visible = true;
        },
        hide : function() {
            this.currentPalette.fadeOut(function() {
                /** @type {boolean} */
                this.visible = false;
                /** @type {null} */
                this.currentPalette = null;
            }.bind(this));
            this.currentPanel.fadeOut(function() {
                /** @type {null} */
                this.currentPanel = null;
            }.bind(this));
        },
        enter : function(obj) {
            var e = obj.tweenValue;
            obj.tween.reset(e).to({
                scale : 1.2 * this.maxScale
            }, 250).easing(TWEEN.Easing.Quartic.Out).onUpdate(function() {
                obj.scale.set(e.scale, e.scale, e.scale);
            }).start();
            /** @type {!Object} */
            this.hoveredObject = obj;
        },
        leave : function(obj) {
            var e = obj.tweenValue;
            obj.tween.reset(e).to({
                scale : this.maxScale
            }, 250).easing(TWEEN.Easing.Quartic.Out).onUpdate(function() {
                obj.scale.setScalar(e.scale);
            }).start();
            /** @type {null} */
            this.hoveredObject = null;
        },
        select : function() {
            var oRoster = new TWEEN.Tween;
            var from = {
                scale : 1,
                opacity : .35
            };
            return function(options) {
                if (!options.current) {
                    if (_.contains(this.currentPalette.children, options)) {
                        this.trigger("selectMaterial", this.currentPalette.children.indexOf(options));
                    }
                    oRoster.reset(from).to({
                        scale : 1.3,
                        opacity : 0
                    }, 400).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function() {
                        options.ripple.scale.set(from.scale, from.scale, from.scale);
                        /** @type {number} */
                        options.ripple.material.opacity = from.opacity;
                    }).onComplete(function() {
                        /** @type {number} */
                        from.scale = 1.05;
                        /** @type {number} */
                        from.opacity = .35;
                    }).start();
                }
            };
        }(),
        render : function(renderer) {
            if (this.visible) {
                renderer.render(this.scene, this.camera);
            }
        },
        update : function(val) {
            if (this.hoveredObject) {
                this.hoveredObject.rotation.y += val.delta;
            }
        },
        setCurrent : function(name) {
            var change = this.currentPalette.children[name];
            this.currentPalette.children.forEach(function(change) {
                /** @type {boolean} */
                change.current = false;
                /** @type {boolean} */
                change.stroke.visible = false;
            });
            /** @type {boolean} */
            change.current = true;
            /** @type {boolean} */
            change.stroke.visible = true;
            this.currentPanel.setMaterial(name);
        },
        resize : function() {
            /** @type {number} */
            this.camera.left = window.innerWidth / -2;
            /** @type {number} */
            this.camera.right = window.innerWidth / 2;
            /** @type {number} */
            this.camera.top = window.innerHeight / 2;
            /** @type {number} */
            this.camera.bottom = window.innerHeight / -2;
            this.camera.updateProjectionMatrix();
            /** @type {number} */
            this.size.width = this.camera.right - this.camera.left;
            /** @type {number} */
            this.size.height = this.camera.top - this.camera.bottom;
            /** @type {number} */
            this.maxScale = this.size.width > this.size.height ? .05 * this.size.width : .05 * this.size.height;
            _.invoke(this.panels, "resize", this.size);
            _.invoke(this.palettes, "resize", this.size, this.maxScale);
        }
    };
    init.mixin(props);
    /** @type {function(!Object): undefined} */
    context.exports = init;
}, function(module, canCreateDiscussions, $resource) {
    /**
     * @param {string} name
     * @return {?}
     */
    function setup(name) {
        var obj = new Person;
        var canvas = obj.canvas;
        switch(obj.resize(512, 512), name) {
            case "name":
                obj.draw(arguments[1], '96px "AlternateGothic3"', "white", 2);
                break;
            case "dimensions":
                obj.draw(arguments[1], '24px "Work Sans"', "white", 2);
                break;
            case "material":
                obj.draw(arguments[1], '36px "Work Sans"', "white", 2);
        }
        new THREE.Texture(canvas);
        return new THREE.Texture(canvas);
    }
    /**
     * @param {!Object} options
     * @param {!Object} f
     * @return {undefined}
     */
    function init(options, f) {
        options.offset.copy(f.material.map.offset);
        options.repeat.copy(f.material.map.repeat);
        options.wrapS = options.WrapT = THREE.ClampToEdgeWrapping;
        options.minFilter = THREE.LinearFilter;
        /** @type {boolean} */
        options.needsUpdate = true;
        /** @type {!Object} */
        f.material.map = options;
        /** @type {boolean} */
        f.material.needsUpdate = true;
    }
    var Person = $resource(50);
    /**
     * @param {!Array} options
     * @return {?}
     */
    var run = function(options) {
        THREE.Object3D.call(this);
        var self = options.data;
        this.showGradient = options.showGradient;
        this.gradientMap = options.gradientMap;
        this.initLayout(options.referenceObject, options.hudSize);
        /** @type {!Array} */
        this.materialTextures = [];
        var config = setup("name", self.type);
        var values = setup("dimensions", self.dimensions);
        return self.materials.forEach(function(o) {
            var data = setup("material", o);
            this.materialTextures.push(data);
        }, this), init(config, this.nameObj), init(values, this.dimensionsObj), init(this.materialTextures[0], this.materialObj), this;
    };
    run.inherit(THREE.Object3D, {
        initLayout : function(element, options) {
            /** @type {boolean} */
            var loose = options.width > options.height;
            /** @type {number} */
            var r = loose ? .075 * options.height : .08 * options.width;
            /** @type {number} */
            var compRe = loose ? options.width / 1880 : options.height / 1400;
            var item = element.getObjectByName("name");
            var shape = element.getObjectByName("line");
            var el = element.getObjectByName("dimensions");
            var data = element.getObjectByName("material");
            this.innerContainer = new THREE.Object3D;
            this.innerContainer.position.set(-.5 * options.width + r, .5 * options.height - r, 0);
            this.add(this.innerContainer);
            this.innerContainer.scale.setScalar(compRe);
            this.nameObj = this.addElement(item, 0, 0);
            this.lineObj = this.addElement(shape, -205, 100);
            this.dimensionsObj = this.addElement(el, 0, 125);
            this.materialObj = this.addElement(data, 0, 110);
            if (this.showGradient) {
                this.initGradient(r);
            }
            /** @type {boolean} */
            shape.children[0].material.polygonOffset = true;
            /** @type {number} */
            shape.children[0].material.polygonOffsetFactor = -.1;
        },
        initGradient : function(personLookupResult) {
            var white = new THREE.MeshBasicMaterial({
                transparent : true,
                map : this.gradientMap,
                opacity : 0
            });
            var a = new THREE.Mesh(new THREE.PlaneBufferGeometry(512, 512, 1, 1), white);
            this.innerContainer.add(a);
            a.scale.setScalar((512 + personLookupResult) / 512);
            a.position.set(256 - personLookupResult / 2, personLookupResult / 2 - 256, 0);
            /** @type {number} */
            a.renderOrder = 0;
            this.gradient = a;
            /** @type {number} */
            this.gradient.maxOpacity = window.isMobile ? .2 : .3;
            this.gradient.animation = {
                tween : new TWEEN.Tween,
                opacity : 0
            };
        },
        resize : function(media) {
            /** @type {boolean} */
            var isIE = media.width > media.height;
            /** @type {number} */
            var offset = isIE ? .075 * media.height : .08 * media.width;
            /** @type {number} */
            var v = isIE ? media.width / 1880 : media.height / 1400;
            this.innerContainer.position.set(-.5 * media.width + offset, .5 * media.height - offset, 0);
            this.innerContainer.scale.setScalar(v);
            this.gradient.scale.setScalar((512 + offset) / 512);
            this.gradient.position.set(256 - offset / 2, offset / 2 - 256, 0);
        },
        show : function(b) {
            b = void 0 === b || b;
            /** @type {boolean} */
            this.visible = true;
            /** @type {boolean} */
            this.innerContainer.visible = true;
            if (b) {
                /** @type {boolean} */
                this.nameObj.visible = false;
                /** @type {boolean} */
                this.materialObj.visible = false;
                /** @type {boolean} */
                this.dimensionsObj.visible = false;
                this.animateLine();
                setTimeout(this.animateUpperElement.bind(this), 300);
                setTimeout(this.animateLowerElement.bind(this), 500);
            }
            if (this.showGradient) {
                this.fadeInGradient();
            }
        },
        fadeInGradient : function() {
            /** @type {number} */
            this.gradient.material.opacity = 0;
            /** @type {number} */
            this.gradient.animation.opacity = 0;
            this.gradient.animation.tween.reset(this.gradient.animation).to({
                opacity : this.gradient.maxOpacity
            }, 1E3).onUpdate(function() {
                this.gradient.material.opacity = this.gradient.animation.opacity;
            }.bind(this)).start();
        },
        fadeOutGradient : function() {
            this.gradient.animation.tween.reset(this.gradient.animation).to({
                opacity : 0
            }, 350).onUpdate(function() {
                this.gradient.material.opacity = this.gradient.animation.opacity;
            }.bind(this)).start();
        },
        hide : function() {
            /** @type {boolean} */
            this.visible = false;
        },
        addElement : function(canCreateDiscussions, isSlidingUp, n) {
            var box = new THREE.Box3;
            return function(entity, i, errorMargin) {
                this.add(entity);
                box.setFromObject(entity);
                this.innerContainer.add(entity);
                /** @type {number} */
                entity.height = box.max.y - box.min.y;
                /** @type {number} */
                entity.width = box.max.x - box.min.x;
                /** @type {number} */
                var min = -entity.height / this.scale.y / 2 - errorMargin;
                var o = entity.width / this.scale.x / 2 + i;
                return entity.position.set(o, min, 0), entity.material && (entity.material = entity.material.clone(), entity.material.depthTest = false), entity.traverse(function(a) {
                    /** @type {number} */
                    a.renderOrder = 1;
                }), entity;
            };
        }(),
        setMaterial : function() {
            var ichart = new TWEEN.Tween;
            var data = {
                offset : 0,
                progress : 0
            };
            return function(indexPos) {
                if (this.materialTween) {
                    return void this.materialTween.onComplete(function() {
                        /** @type {number} */
                        data.offset = 0;
                        /** @type {number} */
                        data.progress = 0;
                        this.innerContainer.remove(this.materialObj);
                        this.materialObj = this.clone;
                        /** @type {null} */
                        this.materialTween = null;
                        this.setMaterial(indexPos);
                    }.bind(this));
                }
                var o = this.materialTextures[indexPos];
                var mesh = this.materialObj.clone();
                if (this.clone = mesh, this.innerContainer.add(mesh), mesh.position.copy(this.materialObj.position), mesh.position.x -= 200, mesh.material && (mesh.material = mesh.material.clone(), mesh.material.depthTest = false), mesh.traverse(function(a) {
                    /** @type {number} */
                    a.renderOrder = 1;
                }), !o) {
                    return void console.warn("Missing material texture. Panel cannot display current material name.");
                }
                init(o, mesh);
                /** @type {number} */
                mesh.material.opacity = 0;
                var x = this.materialObj.position.x;
                var left = mesh.position.x;
                /**
                 * @return {undefined}
                 */
                var render = function() {
                    /** @type {number} */
                    data.offset = 0;
                    /** @type {number} */
                    data.progress = 0;
                    this.innerContainer.remove(this.materialObj);
                    this.materialObj = mesh;
                    this.materialObj.position.setX(x + data.offset);
                    /** @type {null} */
                    this.materialTween = null;
                };
                this.materialTween = ichart.reset(data).to({
                    offset : 200
                }, 500).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function(i) {
                    this.materialObj.position.setX(x + data.offset);
                    mesh.position.setX(left + data.offset);
                    /** @type {number} */
                    this.materialObj.material.opacity = 1 - i;
                    /** @type {number} */
                    mesh.material.opacity = i;
                }.bind(this)).onComplete(render.bind(this)).onStop(render.bind(this)).start();
            };
        }(),
        animateLine : function() {
            var t = new TWEEN.Tween;
            var pos = {
                x : 0
            };
            return function() {
                var mesh = this.lineObj;
                var cyPosX = mesh.scale.x;
                pos.y = mesh.scale.y;
                pos.z = mesh.scale.z;
                mesh.scale.setX(1E-5);
                t.reset(pos).to({
                    x : cyPosX
                }, 1E3).easing(TWEEN.Easing.Quartic.InOut).onUpdate(function() {
                    mesh.scale.set(pos.x, pos.y, pos.z);
                }).onComplete(function() {
                    /** @type {number} */
                    pos.x = 1E-5;
                }).start();
            };
        }(),
        animateUpperElement : function() {
            var t = new TWEEN.Tween;
            var params = {
                offset : 1,
                opacity : 0
            };
            return function() {
                var shader = this.nameObj;
                var texture = shader.material.map;
                var startPos = texture.offset.y;
                /** @type {boolean} */
                shader.visible = true;
                texture.offset.setY(params.offset);
                t.reset(params).to({
                    offset : startPos,
                    opacity : 1
                }, 1E3).easing(TWEEN.Easing.Quartic.InOut).onUpdate(function() {
                    texture.offset.setY(params.offset);
                    /** @type {number} */
                    shader.material.opacity = params.opacity;
                }).onComplete(function() {
                    /** @type {number} */
                    params.offset = 1;
                    /** @type {number} */
                    params.opacity = 0;
                }).start();
            };
        }(),
        animateLowerElement : function() {
            var t = new TWEEN.Tween;
            var params = {
                offset1 : .73,
                offset2 : .8,
                opacity : 0
            };
            return function() {
                var shader = this.materialObj;
                var texture = shader.material.map;
                var nodeTly = texture.offset.y;
                var panel = this.dimensionsObj;
                var map = panel.material.map;
                var tLeftDepth = map.offset.y;
                /** @type {boolean} */
                shader.visible = true;
                /** @type {boolean} */
                panel.visible = true;
                /** @type {number} */
                shader.material.opacity = 0;
                /** @type {number} */
                panel.material.opacity = 0;
                texture.offset.setY(params.offset1);
                map.offset.setY(params.offset2);
                t.reset(params).to({
                    offset1 : nodeTly,
                    offset2 : tLeftDepth,
                    opacity : 1
                }, 1E3).easing(TWEEN.Easing.Quartic.InOut).onUpdate(function() {
                    texture.offset.setY(params.offset1);
                    map.offset.setY(params.offset2);
                    /** @type {number} */
                    shader.material.opacity = params.opacity;
                    /** @type {number} */
                    panel.material.opacity = params.opacity;
                }).onComplete(function() {
                    /** @type {number} */
                    params.offset1 = .73;
                    /** @type {number} */
                    params.offset2 = .8;
                    /** @type {number} */
                    params.opacity = 0;
                }).start();
            };
        }(),
        fadeOut : function() {
            var concept = new TWEEN.Tween;
            var props = {
                opacity : 1
            };
            return function(saveNotifs) {
                concept.reset(props).to({
                    opacity : 0
                }, 350).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(canCreateDiscussions) {
                    this.traverse(function(shader) {
                        if (shader.material) {
                            /** @type {number} */
                            shader.material.opacity = props.opacity;
                        }
                    }.bind(this));
                }.bind(this)).onComplete(function() {
                    /** @type {number} */
                    props.opacity = 1;
                    this.traverse(function(shader) {
                        if (shader.material) {
                            /** @type {number} */
                            shader.material.opacity = props.opacity;
                        }
                    });
                    this.hide();
                    if (saveNotifs) {
                        saveNotifs();
                    }
                }.bind(this)).start();
                if (this.materialTween) {
                    this.materialTween.stop();
                }
                if (this.showGradient) {
                    this.fadeOutGradient();
                }
            };
        }()
    });
    /** @type {function(!Array): ?} */
    module.exports = run;
}, function(mixin, canCreateDiscussions) {
    /**
     * @return {undefined}
     */
    function a() {
        /** @type {!UI} */
        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
    }
    /**
     * @param {number} img
     * @param {number} width
     * @return {undefined}
     */
    function refreshpage(img, width) {
        /** @type {number} */
        canvas.width = img;
        /** @type {number} */
        canvas.height = width;
        render();
    }
    /**
     * @return {undefined}
     */
    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        /** @type {string} */
        context.fillStyle = "rgba(255, 255, 255, 0.001)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    /**
     * @param {(Array|NodeList)} page
     * @param {string} k
     * @param {string} e
     * @param {number} r
     * @return {undefined}
     */
    function update(page, k, e, r) {
        /** @type {string} */
        context.font = k;
        /** @type {string} */
        context.fillStyle = e;
        /** @type {string} */
        context.textBaseline = "hanging";
        context.fillText(page, 0, pos + r);
    }
    var context;
    var canvas;
    /** @type {number} */
    var pos = 1;
    /**
     * @return {undefined}
     */
    var m = function() {
        a();
        this.canvas = canvas;
    };
    /**
     * @param {!NodeList} prev
     * @param {string} user
     * @param {string} color
     * @param {number} context
     * @return {undefined}
     */
    m.prototype.draw = function(prev, user, color, context) {
        if (prev.length > 0) {
            update(prev, user, color, context);
        }
    };
    /**
     * @param {number} t
     * @param {number} e
     * @return {undefined}
     */
    m.prototype.resize = function(t, e) {
        refreshpage(t, e);
    };
    /**
     * @return {undefined}
     */
    m.prototype.reset = function() {
        render();
    };
    /** @type {function(): undefined} */
    mixin.exports = m;
}, function(context, canCreateDiscussions, getAppState) {
    var $state = getAppState(0);
    /**
     * @param {string} obj
     * @return {?}
     */
    var init = function(obj) {
        return THREE.Object3D.call(this), this.strokeMaterial = new THREE.MeshBasicMaterial({
            color : 16777215,
            side : THREE.BackSide,
            transparent : true
        }), this.rippleMaterial = this.strokeMaterial.clone(), this.rippleMaterial.opacity = 0, this.materials = obj.materials, this.itemCount = this.materials.length, this.maxScale = obj.maxScale, this.exposureBoost = obj.exposureBoost, this.initLayout(obj.hudSize), this;
    };
    init.inherit(THREE.Object3D, {
        initLayout : function(options) {
            if (this.materials) {
                /** @type {boolean} */
                var beanDel = options.width > options.height;
                /** @type {number} */
                var target = beanDel ? options.width * (.125 * this.itemCount) : options.width * (.16 * this.itemCount);
                /** @type {number} */
                var radius = .3 * -options.height;
                this.materials.forEach(function(x2, index) {
                    /** @type {number} */
                    var atom = -target / 2 + target / (this.itemCount - 1) * index;
                    var m = this.createSphere(atom, radius, x2, 1);
                    this.add(m);
                    /** @type {string} */
                    m.name = "material_" + index;
                }, this);
                /** @type {boolean} */
                this.children[0].current = true;
                /** @type {boolean} */
                this.children[0].stroke.visible = true;
            }
        },
        resize : function(media, fn) {
            /** @type {boolean} */
            var loose = media.width > media.height;
            /** @type {number} */
            var r = loose ? media.width * (.125 * this.itemCount) : media.width * (.16 * this.itemCount);
            /** @type {number} */
            var compRe = loose ? .3 * -media.height : .35 * -media.height;
            /** @type {number} */
            this.maxScale = fn;
            this.children.forEach(function(mesh, value) {
                /** @type {number} */
                var handle = -r / 2 + r / (this.itemCount - 1) * value;
                mesh.position.setX(handle);
                mesh.position.setY(compRe);
                mesh.scale.setScalar(this.maxScale);
                mesh.tweenValue.scale = this.maxScale;
            }, this);
        },
        createSphere : function(x, y, r, v) {
            var object = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), r.clone());
            object.scale.setScalar(v);
            var c = object.clone();
            var s = c.clone();
            /** @type {number} */
            object.rotation.x = .25;
            object.position.setX(x);
            object.position.setY(y);
            c.scale.setScalar(1.05);
            c.material = this.strokeMaterial;
            object.add(c);
            object.stroke = c;
            /** @type {boolean} */
            c.visible = false;
            object.ripple = s;
            s.material = this.rippleMaterial;
            c.add(s);
            /** @type {boolean} */
            object.material.transparent = true;
            /** @type {boolean} */
            object.material.defines.USE_DIR_LIGHT = true;
            var aryVert = $state.getSH("studio");
            return object.material.uDiffuseSPH = new Float32Array(aryVert, 27), this.exposureBoost && (object.material.uEnvironmentExposure = 1.5), object.tween = new TWEEN.Tween, object.tweenValue = {
                scale : this.maxScale
            }, object.material.defines.USE_AOMAP2 = false, object.material.defines.USE_NORMALMAP2 = false, object;
        },
        hide : function() {
            /** @type {boolean} */
            this.visible = false;
            this.children.forEach(function(elem) {
                /** @type {boolean} */
                elem.pickable = false;
            });
        },
        show : function() {
            return function(value) {
                value = void 0 === value || value;
                this.children.forEach(function(object) {
                    /** @type {number} */
                    object.material.opacity = 1;
                    /** @type {number} */
                    object.stroke.material.opacity = 1;
                });
                if (value) {
                    /** @type {boolean} */
                    this.visible = true;
                    this.children.forEach(function(obj, delayedBy) {
                        var e = {
                            scale : 1E-5
                        };
                        obj.scale.set(1E-5, 1E-5, 1E-5);
                        /** @type {boolean} */
                        obj.pickable = true;
                        setTimeout(function() {
                            obj.tween.reset(e).to({
                                scale : obj.tweenValue.scale
                            }, 1E3).easing(TWEEN.Easing.Elastic.Out).onUpdate(function() {
                                if (this.hoveredObject !== obj) {
                                    obj.scale.setScalar(e.scale);
                                }
                            }.bind(this)).start();
                        }.bind(this), 125 * delayedBy);
                    }.bind(this));
                } else {
                    /** @type {boolean} */
                    this.visible = true;
                    this.children.forEach(function(halo) {
                        /** @type {boolean} */
                        halo.pickable = true;
                        halo.scale.setScalar(this.maxScale);
                    }, this);
                }
            };
        }(),
        fadeOut : function() {
            var concept = new TWEEN.Tween;
            var props = {
                opacity : 1
            };
            return function(saveNotifs) {
                concept.reset(props).to({
                    opacity : 0
                }, 350).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(canCreateDiscussions) {
                    this.children.forEach(function(object) {
                        /** @type {number} */
                        object.material.opacity = props.opacity;
                        /** @type {number} */
                        object.stroke.material.opacity = props.opacity;
                    });
                }.bind(this)).onComplete(function() {
                    /** @type {number} */
                    props.opacity = 1;
                    this.children.forEach(function(object) {
                        /** @type {number} */
                        object.material.opacity = props.opacity;
                        /** @type {number} */
                        object.stroke.material.opacity = props.opacity;
                    });
                    this.hide();
                    if (saveNotifs) {
                        saveNotifs();
                    }
                }.bind(this)).start();
            };
        }()
    });
    /** @type {function(string): ?} */
    context.exports = init;
}, function(context, canCreateDiscussions, floor) {
    var ctor = THREE.PerspectiveCamera;
    var a = floor(1);
    var r = floor(53);
    var MapControls = floor(54);
    var FontInstall = floor(55);
    var startYNew = floor(58);
    var startXNew = floor(5);
    /**
     * @param {!Object} options
     * @return {undefined}
     */
    var init = function(options) {
        ctor.call(this);
        /** @type {number} */
        this.fov = 50;
        /** @type {number} */
        this.near = .01;
        /** @type {number} */
        this.far = 1500;
        this.updateProjectionMatrix();
        /** @type {boolean} */
        this.moving = false;
        /** @type {boolean} */
        this.rotating = false;
        if (options.vr) {
            /** @type {boolean} */
            this.vr = true;
            this.vrControls = new r(this);
            /** @type {number} */
            this.mode = init.VR_MODE;
            this.moveTo(0, 0);
        } else {
            if (window.isMobile) {
                this.lookControls = new FontInstall(this, options.canvasElement);
            } else {
                this.lookControls = new MapControls(this, options.$container);
                if (startXNew.ENABLE_DAMPING) {
                    /** @type {boolean} */
                    this.lookControls.enableDamping = true;
                    /** @type {number} */
                    this.lookControls.dampingFactor = .25;
                }
            }
            this.orbitControls = new startYNew(this, {
                autoSpeed : startXNew.ENABLE_DAMPING ? .1 : 1,
                autoDelay : 3E3,
                domElement : document.getElementById("main_canvas")
            });
            /** @type {boolean} */
            this.orbitControls.enableZoom = !!startXNew.ENABLE_ZOOM;
            /** @type {boolean} */
            this.orbitControls.enablePan = !!startXNew.ENABLE_PAN;
            /** @type {boolean} */
            this.orbitControls.enabled = false;
            /** @type {number} */
            this.orbitControls.maxPolarAngle = Math.PI / 2;
            if (startXNew.ENABLE_DAMPING) {
                /** @type {boolean} */
                this.orbitControls.enableDamping = true;
                /** @type {number} */
                this.orbitControls.dampingFactor = .065;
                /** @type {number} */
                this.orbitControls.rotateSpeed = .05;
            }
            this._target = new THREE.Object3D;
            /** @type {number} */
            this._target.position.z = -1;
            this.add(this._target);
            /** @type {number} */
            this.mode = init.LOOK_MODE;
        }
        if (options.states) {
            this.initStates(options.states);
            if (this.states.start) {
                this.position.copy(this.states.start[0].position);
                this.quaternion.copy(this.states.start[0].quaternion);
                if (!this.vr) {
                    this.lookControls.setOrientationFromCamera();
                }
            } else {
                this.moveTo(-3.5, 3);
            }
        }
    };
    init.inherit(ctor, {
        initStates : function(init) {
            this.states = {};
            init.forEach(function(parsed) {
                var name = parsed.name.replace("_camera", "");
                if (this.states[name]) {
                    this.states[name].push(parsed);
                } else {
                    /** @type {!Array} */
                    this.states[name] = [parsed];
                }
                if (parsed.children.length > 0) {
                    parsed.target = new THREE.Vector3;
                    parsed.children[0].getWorldPosition(parsed.target);
                }
            }, this);
        },
        setState : function(index) {
            if (!this.vr) {
                if (void 0 === index) {
                    return void console.warn("setCameraState() requires an argument");
                }
                if (!this.states.hasOwnProperty(index)) {
                    return void console.error("Camera state was not found:", index);
                }
                this.setMode(init.ORBIT_MODE);
                var spotLight1 = _.min(this.states[index], function(event) {
                    return this.position.distanceTo(event.position);
                }.bind(this));
                return this.isTransitioning = true, this.tweenOrbitTargetTo(spotLight1.target, 1E3).onComplete(function() {
                    /** @type {boolean} */
                    this.isTransitioning = false;
                    this.orbitControls.startAutoOrbit(1E3);
                }.bind(this)), this.tweenPositionTo(spotLight1.position, 1E3);
            }
        },
        setMode : function(canCreateDiscussions) {
            var x = new THREE.Vector3;
            return function(s) {
                switch(s) {
                    case init.ORBIT_MODE:
                        this._target.getWorldPosition(x);
                        this.orbitControls.setTarget(x);
                        /** @type {boolean} */
                        this.orbitControls.enabled = true;
                        break;
                    case init.LOOK_MODE:
                        this.lookControls.setOrientationFromCamera();
                        /** @type {boolean} */
                        this.orbitControls.enabled = false;
                        this.orbitControls.stopAutoOrbit();
                        break;
                    case init.VR_MODE:
                        /** @type {boolean} */
                        this.orbitControls.enabled = false;
                }
                /** @type {number} */
                this.mode = s;
            };
        }(),
        moveTo : function() {
            var canvas = new THREE.Vector3;
            return function(e, text, duration) {
                duration = duration || 0;
                canvas.set(e, this.vr ? init.DEFAULT_HEIGHT_VR : init.DEFAULT_HEIGHT, text);
                if (duration > 0 && !this.vr) {
                    this.trigger("startMove");
                    /** @type {boolean} */
                    this.moving = true;
                    this.tweenPositionTo(canvas, duration).onComplete(function() {
                        this.trigger("endMove");
                        /** @type {boolean} */
                        this.moving = false;
                    }.bind(this));
                } else {
                    this.position.copy(canvas);
                    if (this.vr) {
                        this.updateMatrixWorld(true);
                        this.vrControls.setPosition(this);
                    }
                }
                if (!this.firstMove) {
                    this.trigger("firstMove");
                    /** @type {boolean} */
                    this.firstMove = true;
                }
                if (!this.vr) {
                    this.setMode(init.LOOK_MODE);
                }
            };
        }(),
        tweenPositionTo : function() {
            var pos = {
                x : 0,
                y : 0,
                z : 0
            };
            var e = new TWEEN.Tween;
            return function(a, duration) {
                return pos.x = this.position.x, pos.y = this.position.y, pos.z = this.position.z, e.reset(pos).to({
                    x : a.x,
                    y : a.y,
                    z : a.z
                }, duration).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function() {
                    this.position.set(pos.x, pos.y, pos.z);
                }.bind(this)).start();
            };
        }(),
        tweenOrbitTargetTo : function() {
            var pos = {
                x : 0,
                y : 0,
                z : 0
            };
            var e = new TWEEN.Tween;
            return function(a, duration) {
                if (!this.orbitControls) {
                    throw new Error("Orbit controls required");
                }
                var position = this.orbitControls.getTarget();
                return pos.x = position.x, pos.y = position.y, pos.z = position.z, e.reset(pos).to({
                    x : a.x,
                    y : a.y,
                    z : a.z
                }, duration).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function() {
                    this.orbitControls.target.set(pos.x, pos.y, pos.z);
                }.bind(this)).start();
            };
        }(),
        enableControls : function() {
            if (!this.vr) {
                /** @type {boolean} */
                this.lookControls.enabled = true;
            }
        },
        setOrbitDistances : function(minDistance, maxDistance) {
            /** @type {number} */
            this.orbitControls.minDistance = minDistance;
            /** @type {number} */
            this.orbitControls.maxDistance = maxDistance;
        },
        update : function() {
            if (this.mode === init.VR_MODE) {
                this.vrControls.update();
            } else {
                if (this.mode === init.ORBIT_MODE) {
                    this.orbitControls.update();
                    this.rotating = this.orbitControls.isRotating || this.isTransitioning;
                } else {
                    this.lookControls.update();
                    this.rotating = this.lookControls.isRotating;
                }
                if (this.rotating && !this.firstRotate) {
                    this.trigger("firstRotate");
                    /** @type {boolean} */
                    this.firstRotate = true;
                }
            }
        }
    });
    /** @type {number} */
    init.LOOK_MODE = 0;
    /** @type {number} */
    init.ORBIT_MODE = 1;
    /** @type {number} */
    init.VR_MODE = 2;
    /** @type {number} */
    init.DEFAULT_HEIGHT = 1.4;
    /** @type {number} */
    init.DEFAULT_HEIGHT_VR = 1.55;
    init.mixin(a);
    /** @type {function(!Object): undefined} */
    context.exports = init;
}, function(context, canCreateDiscussions) {
    /**
     * @param {!Object} object
     * @param {!Object} onError
     * @return {undefined}
     */
    var init = function(object, onError) {
        /**
         * @param {!Object} displays
         * @return {undefined}
         */
        function callback(displays) {
            /** @type {!Object} */
            vrDisplays = displays;
            if (displays.length > 0) {
                vrDisplay = displays[0];
            } else {
                if (onError) {
                    onError("VR input not available.");
                }
            }
        }
        var vrDisplay;
        var vrDisplays;
        var info = this;
        var standingMatrix = new THREE.Matrix4;
        /** @type {null} */
        var frameData = null;
        var vector = (new THREE.Vector3).setFromMatrixPosition(object.matrixWorld);
        var q = object.quaternion.clone();
        var position = new THREE.Vector3;
        var orientation = new THREE.Quaternion;
        var p2 = new THREE.Vector3;
        if ("VRFrameData" in window) {
            frameData = new VRFrameData;
        }
        if (navigator.getVRDisplays) {
            navigator.getVRDisplays().then(callback).catch(function() {
                console.warn("THREE.VRControls: Unable to get VR Displays");
            });
        }
        /** @type {number} */
        this.scale = 1;
        /** @type {boolean} */
        this.standing = false;
        /** @type {number} */
        this.userHeight = 1.6;
        /**
         * @return {?}
         */
        this.getVRDisplay = function() {
            return vrDisplay;
        };
        /**
         * @param {!Object} value
         * @return {undefined}
         */
        this.setVRDisplay = function(value) {
            /** @type {!Object} */
            vrDisplay = value;
        };
        /**
         * @return {?}
         */
        this.getVRDisplays = function() {
            return console.warn("THREE.VRControls: getVRDisplays() is being deprecated."), vrDisplays;
        };
        /**
         * @return {?}
         */
        this.getStandingMatrix = function() {
            return standingMatrix;
        };
        /**
         * @param {?} object
         * @return {undefined}
         */
        this.setPosition = function(object) {
            vector.setFromMatrixPosition(object.matrixWorld);
            if (frameData.pose.position) {
                p2.set(frameData.pose.position[0], frameData.pose.position[1], frameData.pose.position[2]);
                vector.sub(p2);
            }
        };
        /**
         * @return {?}
         */
        this.getPosition = function() {
            return vector;
        };
        /**
         * @param {!Object} o
         * @return {undefined}
         */
        this.setOrientation = function(o) {
            q.copy(o.quaternion);
        };
        /**
         * @param {?} options
         * @return {?}
         */
        this.getOrientation = function(options) {
            return q;
        };
        /**
         * @return {?}
         */
        this.hasInput = function() {
            return null !== frameData;
        };
        /**
         * @return {undefined}
         */
        this.update = function() {
            if (vrDisplay) {
                var pose;
                if (vrDisplay.getFrameData) {
                    vrDisplay.getFrameData(frameData);
                    pose = frameData.pose;
                } else {
                    if (vrDisplay.getPose) {
                        pose = vrDisplay.getPose();
                    }
                }
                if (null !== pose.orientation) {
                    orientation.fromArray(pose.orientation);
                    object.quaternion.multiplyQuaternions(q, orientation).normalize();
                }
                if (null !== pose.position) {
                    position.fromArray(pose.position);
                    position.applyQuaternion(q);
                    object.position.addVectors(vector, position);
                } else {
                    object.position.set(0, 0, 0);
                }
                if (this.standing) {
                    if (vrDisplay.stageParameters) {
                        object.updateMatrix();
                        standingMatrix.fromArray(vrDisplay.stageParameters.sittingToStandingTransform);
                        object.applyMatrix(standingMatrix);
                    } else {
                        object.position.setY(object.position.y + this.userHeight);
                    }
                }
                object.position.multiplyScalar(info.scale);
            }
        };
        /**
         * @return {undefined}
         */
        this.resetPose = function() {
            if (vrDisplay) {
                vrDisplay.resetPose();
            }
        };
        /**
         * @return {undefined}
         */
        this.resetSensor = function() {
            console.warn("THREE.VRControls: .resetSensor() is now .resetPose().");
            this.resetPose();
        };
        /**
         * @return {undefined}
         */
        this.zeroSensor = function() {
            console.warn("THREE.VRControls: .zeroSensor() is now .resetPose().");
            this.resetPose();
        };
        /**
         * @return {undefined}
         */
        this.dispose = function() {
            /** @type {null} */
            vrDisplay = null;
        };
    };
    /** @type {function(!Object, !Object): undefined} */
    context.exports = init;
}, function(context, canCreateDiscussions) {
    /**
     * @param {!Object} data
     * @param {!Object} container
     * @return {undefined}
     */
    function init(data, container) {
        /** @type {(UI|null)} */
        var context = document.getElementById("main_canvas");
        context.addEventListener("mousemove", this.onMouseMove.bind(this));
        context.addEventListener("mousedown", this.onMouseDown.bind(this));
        context.addEventListener("mouseup", this.onMouseUp.bind(this));
        /** @type {!Object} */
        this.camera = data;
        /** @type {number} */
        this.phi = 0;
        /** @type {number} */
        this.theta = 0;
        this.rotateStart = new THREE.Vector2;
        this.rotateEnd = new THREE.Vector2;
        this.rotateDelta = new THREE.Vector2;
        /** @type {boolean} */
        this.isDragging = false;
        /** @type {boolean} */
        this.isRotating = false;
        /** @type {boolean} */
        this.enableDamping = false;
        /** @type {number} */
        this.dampingFactor = .25;
        /** @type {!Object} */
        this.$container = container;
    }
    /**
     * @param {!MouseEvent} e
     * @return {?}
     */
    function positionWithE(e) {
        /** @type {boolean} */
        var t = e.clientX == x && e.clientY == y;
        return x = e.clientX, y = e.clientY, t;
    }
    var x;
    var y;
    init.prototype = {
        update : function() {
            var euler = new THREE.Euler(0, 0, 0, "YXZ");
            var quaternion = new THREE.Quaternion;
            return function() {
                return euler.set(this.phi, this.theta, 0), quaternion.setFromEuler(euler), this.enableDamping ? this.camera.quaternion.slerp(quaternion, this.dampingFactor) : this.camera.quaternion.copy(quaternion), this;
            };
        }(),
        setOrientationFromCamera : function() {
            var euler = new THREE.Euler(0, 0, 0, "YXZ");
            return function() {
                return euler.setFromQuaternion(this.camera.quaternion), this.phi = euler.x, this.theta = euler.y, this;
            };
        }(),
        reset : function() {
            return this.phi = 0, this.theta = 0, this.update(), this;
        },
        onMouseDown : function(e) {
            this.rotateStart.set(e.clientX, e.clientY);
            /** @type {boolean} */
            this.isMouseDown = true;
            x = e.clientX;
            y = e.clientY;
        },
        onMouseMove : function(e) {
            if (!positionWithE(e) && (this.isMouseDown || this.isPointerLocked()) && this.enabled) {
                if (this.isRotating = true, this.$container.hasClass("rotating") || this.$container.addClass("rotating"), this.isPointerLocked()) {
                    var movementX = e.movementX || e.mozMovementX || 0;
                    var movementY = e.movementY || e.mozMovementY || 0;
                    this.rotateEnd.set(this.rotateStart.x - movementX, this.rotateStart.y - movementY);
                } else {
                    this.rotateEnd.set(e.clientX, e.clientY);
                }
                this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);
                this.rotateStart.copy(this.rotateEnd);
                this.phi += 2 * Math.PI * this.rotateDelta.y / screen.height * .3;
                this.theta += 2 * Math.PI * this.rotateDelta.x / screen.width * .5;
                this.phi = THREE.Math.clamp(this.phi, -Math.PI / 2, Math.PI / 2);
            }
        },
        onMouseUp : function(event) {
            /** @type {boolean} */
            this.isMouseDown = false;
            /** @type {boolean} */
            this.isRotating = false;
            this.$container.removeClass("rotating");
        },
        isPointerLocked : function() {
            return void 0 !== (document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement);
        }
    };
    /** @type {function(!Object, !Object): undefined} */
    context.exports = init;
}, function(module, canCreateDiscussions, _$$mdAnimate_) {
    /**
     * @param {!Object} name
     * @param {!Object} options
     * @return {undefined}
     */
    function Emitter(name, options) {
        /** @type {!Object} */
        this.camera = name;
        this.touchPanner = new CollectorStream(options);
        /** @type {boolean} */
        this._enabled = true;
        Object.defineProperty(this, "enabled", {
            get : function() {
                return this._enabled;
            },
            set : function(v) {
                /** @type {boolean} */
                this.touchPanner.enabled = v;
                /** @type {boolean} */
                this._enabled = v;
            }
        });
    }
    var CollectorStream = _$$mdAnimate_(56);
    Emitter.prototype = {};
    /**
     * @return {undefined}
     */
    Emitter.prototype.update = function() {
        this.touchPanner.update();
        this.camera.quaternion.copy(this.touchPanner.getOrientation());
    };
    Emitter.prototype.setOrientationFromCamera = function() {
        var euler = new THREE.Euler(0, 0, 0, "YXZ");
        return function() {
            euler.setFromQuaternion(this.camera.quaternion);
            this.touchPanner.setState(euler.x, euler.y);
        };
    }();
    /**
     * @param {number} angle
     * @return {undefined}
     */
    Emitter.prototype.setRotationAngle = function(angle) {
        this.touchPanner.setRotationAngle(angle);
    };
    /**
     * @return {?}
     */
    Emitter.prototype.canMove = function() {
        return true;
    };
    /** @type {function(!Object, !Object): undefined} */
    module.exports = Emitter;
}, function(context, canCreateDiscussions, floor) {
    /**
     * @param {!Object} size
     * @return {undefined}
     */
    function init(size) {
        var target = void 0 !== size ? size : window;
        /** @type {number} */
        this.speed = window.innerHeight > window.innerWidth ? speed : 2 * speed;
        window.addEventListener("resize", function() {
            /** @type {number} */
            this.speed = window.innerHeight > window.innerWidth ? speed : 2 * speed;
        }.bind(this));
        target.addEventListener("touchstart", this.onTouchStart_.bind(this));
        target.addEventListener("touchmove", this.onTouchMove_.bind(this), {
            passive : false
        });
        target.addEventListener("touchend", this.onTouchEnd_.bind(this));
        /** @type {boolean} */
        this.isTouching = false;
        this.rotateStart = new THREE.Vector2;
        this.rotateEnd = new THREE.Vector2;
        this.rotateDelta = new THREE.Vector2;
        /** @type {number} */
        this._theta = 0;
        /** @type {number} */
        this._phi = 0;
        /** @type {number} */
        this.theta = 0;
        /** @type {number} */
        this.phi = 0;
        this.orientation = new THREE.Quaternion;
        /** @type {boolean} */
        this.enableDamping = true;
        /** @type {number} */
        this.dampingFactor = .25;
        /** @type {boolean} */
        this._enabled = true;
        Object.defineProperty(this, "enabled", {
            get : function() {
                return this._enabled;
            },
            set : function(v) {
                /** @type {boolean} */
                this._enabled = v;
            }
        });
    }
    /**
     * @param {number} a
     * @param {number} b
     * @param {number} s
     * @return {?}
     */
    function normalize_angle_rad(a, b, s) {
        return (1 - s) * a + s * b;
    }
    var startYNew = floor(5);
    /** @type {number} */
    var speed = (floor(57), .25);
    init.prototype.getOrientation = function() {
        /** @type {string} */
        var height = startYNew.ENABLE_GYRO ? "XYZ" : "YXZ";
        var e = new THREE.Euler(0, 0, 0, height);
        return function() {
            var i = startYNew.ENABLE_GYRO ? 0 : this.phi;
            return e.set(i, this.theta, 0), this.orientation.setFromEuler(e), this.orientation;
        };
    }();
    /**
     * @return {undefined}
     */
    init.prototype.resetSensor = function() {
        /** @type {number} */
        this._theta = 0;
        /** @type {number} */
        this._phi = 0;
        /** @type {number} */
        this.theta = 0;
        /** @type {number} */
        this.phi = 0;
    };
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    init.prototype.onTouchStart_ = function(event) {
        if (1 == event.touches.length && this._enabled) {
            this.rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
            /** @type {boolean} */
            this.isTouching = true;
        }
    };
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    init.prototype.onTouchMove_ = function(event) {
        if (this.isTouching && this._enabled) {
            this.rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
            this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);
            this.rotateStart.copy(this.rotateEnd);
            /** @type {!HTMLBodyElement} */
            var e = document.body;
            this._theta += 2 * Math.PI * this.rotateDelta.x / e.clientWidth * this.speed;
            this._phi += 2 * Math.PI * this.rotateDelta.y / e.clientHeight * this.speed;
            this._phi = THREE.Math.clamp(this._phi, -Math.PI / 2, Math.PI / 2);
            event.preventDefault();
        }
    };
    /**
     * @param {number} angle
     * @return {undefined}
     */
    init.prototype.setRotationAngle = function(angle) {
        this.theta = this._theta = angle;
    };
    /**
     * @param {?} e
     * @return {undefined}
     */
    init.prototype.onTouchEnd_ = function(e) {
        /** @type {boolean} */
        this.isTouching = false;
    };
    /**
     * @param {number} pointId
     * @param {number} value
     * @return {undefined}
     */
    init.prototype.setState = function(pointId, value) {
        this.phi = this._phi = pointId;
        this.theta = this._theta = value;
    };
    /**
     * @return {undefined}
     */
    init.prototype.update = function() {
        this.phi = normalize_angle_rad(this.phi, this._phi, this.dampingFactor);
        this.theta = normalize_angle_rad(this.theta, this._theta, this.dampingFactor);
    };
    /** @type {function(!Object): undefined} */
    context.exports = init;
}, function(module, canCreateDiscussions) {
    var Util = window.Util || {};
    /** @type {number} */
    Util.MIN_TIMESTEP = .001;
    /** @type {number} */
    Util.MAX_TIMESTEP = 1;
    Util.isIOS = function() {
        /** @type {boolean} */
        var t = /iPad|iPhone|iPod/.test(navigator.platform);
        return function() {
            return t;
        };
    }();
    Util.isSafari = function() {
        /** @type {boolean} */
        var t = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        return function() {
            return t;
        };
    }();
    Util.isFirefoxAndroid = function() {
        /** @type {boolean} */
        var t = -1 !== navigator.userAgent.indexOf("Firefox") && -1 !== navigator.userAgent.indexOf("Android");
        return function() {
            return t;
        };
    }();
    /**
     * @return {?}
     */
    Util.isLandscapeMode = function() {
        return 90 == window.orientation || -90 == window.orientation;
    };
    /**
     * @param {?} timestampDeltaS
     * @return {?}
     */
    Util.isTimestampDeltaValid = function(timestampDeltaS) {
        return !isNaN(timestampDeltaS) && (!(timestampDeltaS <= Util.MIN_TIMESTEP) && !(timestampDeltaS > Util.MAX_TIMESTEP));
    };
    module.exports = Util;
}, function(module, canCreateDiscussions, require) {
    /**
     * @param {!Function} val
     * @param {!Object} options
     * @return {undefined}
     */
    function _(val, options) {
        h.call(this, val, options.domElement);
        this.autoSpeed = options.autoSpeed;
        this.autoDelay = options.autoDelay;
        this.autoOrbitTimer = lang.createTimer({
            duration : this.autoDelay,
            onEnd : function() {
                this.startAutoOrbit();
            }.bind(this)
        });
    }
    var h = require(59);
    var lang = require(11);
    _.inherit(h, {
        setTarget : function(e) {
            this.constraint.target.copy(e);
        },
        getTarget : function(simulcast) {
            return this.constraint.target;
        },
        startAutoOrbit : function(timeToFadeIn) {
            var tryParseQRCode = function() {
                this.autoRotateSpeed = this.autoSpeed;
                /** @type {boolean} */
                this.autoRotate = true;
                /** @type {null} */
                this.startTimeout = null;
            }.bind(this);
            this.stopAutoOrbit();
            if (void 0 !== timeToFadeIn) {
                /** @type {number} */
                this.startTimeout = setTimeout(tryParseQRCode, timeToFadeIn);
            } else {
                tryParseQRCode();
            }
        },
        stopAutoOrbit : function() {
            /** @type {boolean} */
            this.autoRotate = false;
            this.autoOrbitTimer.reset();
        },
        onMouseMove : function() {
            this.stopAutoOrbit();
            this.autoOrbitTimer.start();
            if (this.startTimeout) {
                clearTimeout(this.startTimeout);
            }
        }
    });
    /** @type {function(!Function, !Object): undefined} */
    module.exports = _;
}, function(mixin, canCreateDiscussions) {
    !function() {
        /**
         * @param {!Object} object
         * @return {undefined}
         */
        function OrbitConstraint(object) {
            /** @type {!Object} */
            this.object = object;
            this.target = new THREE.Vector3;
            /** @type {number} */
            this.minDistance = 0;
            /** @type {number} */
            this.maxDistance = 1 / 0;
            /** @type {number} */
            this.minZoom = 0;
            /** @type {number} */
            this.maxZoom = 1 / 0;
            /** @type {number} */
            this.minPolarAngle = 0;
            /** @type {number} */
            this.maxPolarAngle = Math.PI;
            /** @type {number} */
            this.minAzimuthAngle = -1 / 0;
            /** @type {number} */
            this.maxAzimuthAngle = 1 / 0;
            /** @type {boolean} */
            this.enableDamping = false;
            /** @type {number} */
            this.dampingFactor = .25;
            var theta;
            var phi;
            var scope = this;
            /** @type {number} */
            var phiDelta = 0;
            /** @type {number} */
            var thetaDelta = 0;
            /** @type {number} */
            var scale = 1;
            var a = new THREE.Vector3;
            /** @type {boolean} */
            var c = false;
            /**
             * @return {?}
             */
            this.getPolarAngle = function() {
                return phi;
            };
            /**
             * @return {?}
             */
            this.getAzimuthalAngle = function() {
                return theta;
            };
            /**
             * @param {number} angle
             * @return {undefined}
             */
            this.rotateLeft = function(angle) {
                /** @type {number} */
                thetaDelta = thetaDelta - angle;
            };
            /**
             * @param {number} angle
             * @return {undefined}
             */
            this.rotateUp = function(angle) {
                /** @type {number} */
                phiDelta = phiDelta - angle;
            };
            this.panLeft = function() {
                var t = new THREE.Vector3;
                return function(size) {
                    var values = this.object.matrix.elements;
                    t.set(values[0], values[1], values[2]);
                    t.multiplyScalar(-size);
                    a.add(t);
                };
            }();
            this.panUp = function() {
                var t = new THREE.Vector3;
                return function(u) {
                    var values = this.object.matrix.elements;
                    t.set(values[4], values[5], values[6]);
                    t.multiplyScalar(u);
                    a.add(t);
                };
            }();
            /**
             * @param {number} deltaX
             * @param {number} deltaY
             * @param {number} screenWidth
             * @param {number} screenHeight
             * @return {undefined}
             */
            this.pan = function(deltaX, deltaY, screenWidth, screenHeight) {
                if (scope.object instanceof THREE.PerspectiveCamera) {
                    var oldPosition = scope.object.position;
                    var expRecords = oldPosition.clone().sub(scope.target);
                    var targetDistance = expRecords.length();
                    /** @type {number} */
                    targetDistance = targetDistance * Math.tan(scope.object.fov / 2 * Math.PI / 180);
                    scope.panLeft(2 * deltaX * targetDistance / screenHeight);
                    scope.panUp(2 * deltaY * targetDistance / screenHeight);
                } else {
                    if (scope.object instanceof THREE.OrthographicCamera) {
                        scope.panLeft(deltaX * (scope.object.right - scope.object.left) / screenWidth);
                        scope.panUp(deltaY * (scope.object.top - scope.object.bottom) / screenHeight);
                    } else {
                        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
                    }
                }
            };
            /**
             * @param {?} dollyScale
             * @return {undefined}
             */
            this.dollyIn = function(dollyScale) {
                if (scope.object instanceof THREE.PerspectiveCamera) {
                    /** @type {number} */
                    scale = scale / dollyScale;
                } else {
                    if (scope.object instanceof THREE.OrthographicCamera) {
                        /** @type {number} */
                        scope.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * dollyScale));
                        scope.object.updateProjectionMatrix();
                        /** @type {boolean} */
                        c = true;
                    } else {
                        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
                    }
                }
            };
            /**
             * @param {?} dollyScale
             * @return {undefined}
             */
            this.dollyOut = function(dollyScale) {
                if (scope.object instanceof THREE.PerspectiveCamera) {
                    /** @type {number} */
                    scale = scale * dollyScale;
                } else {
                    if (scope.object instanceof THREE.OrthographicCamera) {
                        /** @type {number} */
                        scope.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / dollyScale));
                        scope.object.updateProjectionMatrix();
                        /** @type {boolean} */
                        c = true;
                    } else {
                        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
                    }
                }
            };
            this.update = function() {
                var offset = new THREE.Vector3;
                var quat = (new THREE.Quaternion).setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
                var quatInverse = quat.clone().inverse();
                var lastPosition = new THREE.Vector3;
                var lastQuaternion = new THREE.Quaternion;
                return function() {
                    var position = this.object.position;
                    offset.copy(position).sub(this.target);
                    offset.applyQuaternion(quat);
                    /** @type {number} */
                    theta = Math.atan2(offset.x, offset.z);
                    /** @type {number} */
                    phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);
                    theta = theta + thetaDelta;
                    phi = phi + phiDelta;
                    /** @type {number} */
                    this.object.theta = theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, theta));
                    /** @type {number} */
                    phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi));
                    /** @type {number} */
                    this.object.phi = phi = Math.max(1E-6, Math.min(Math.PI - 1E-6, phi));
                    /** @type {number} */
                    var radius = offset.length() * scale;
                    return radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius)), this.target.add(a), offset.x = radius * Math.sin(phi) * Math.sin(theta), offset.y = radius * Math.cos(phi), offset.z = radius * Math.sin(phi) * Math.cos(theta), offset.applyQuaternion(quatInverse), position.copy(this.target).add(offset), this.object.lookAt(this.target), true === this.enableDamping ? (thetaDelta = thetaDelta * (1 - this.dampingFactor), phiDelta = phiDelta * (1 - this.dampingFactor)) : (thetaDelta =
                        0, phiDelta = 0), scale = 1, a.set(0, 0, 0), !!(c || lastPosition.distanceToSquared(this.object.position) > 1E-6 || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > 1E-6) && (lastPosition.copy(this.object.position), lastQuaternion.copy(this.object.quaternion), c = false, true);
                };
            }();
        }
        /**
         * @param {!Event} event
         * @return {?}
         */
        function withinClickDistance(event) {
            /** @type {boolean} */
            var e = event.clientX == end && event.clientY == begin;
            return end = event.clientX, begin = event.clientY, e;
        }
        var end;
        var begin;
        /**
         * @param {!Function} object
         * @param {!Object} properties
         * @return {undefined}
         */
        var OrbitControls = function(object, properties) {
            /**
             * @param {number} deltaX
             * @param {number} deltaY
             * @return {undefined}
             */
            function pan(deltaX, deltaY) {
                var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
                constraint.pan(deltaX, deltaY, element.clientWidth, element.clientHeight);
            }
            /**
             * @return {?}
             */
            function getAutoRotationAngle() {
                return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
            }
            /**
             * @return {?}
             */
            function getZoomScale() {
                return Math.pow(.95, scope.zoomSpeed);
            }
            /**
             * @param {!Event} event
             * @return {undefined}
             */
            function onMouseDown(event) {
                if (false !== scope.enabled) {
                    if (end = event.clientX, begin = event.clientY, event.preventDefault(), event.button === scope.mouseButtons.ORBIT) {
                        if (false === scope.enableRotate) {
                            return;
                        }
                        /** @type {number} */
                        state = STATE.ROTATE;
                        rotateStart.set(event.clientX, event.clientY);
                    } else {
                        if (event.button === scope.mouseButtons.ZOOM) {
                            if (false === scope.enableZoom) {
                                return;
                            }
                            /** @type {number} */
                            state = STATE.DOLLY;
                            b.set(event.clientX, event.clientY);
                        } else {
                            if (event.button === scope.mouseButtons.PAN) {
                                if (false === scope.enablePan) {
                                    return;
                                }
                                /** @type {number} */
                                state = STATE.PAN;
                                panStart.set(event.clientX, event.clientY);
                            }
                        }
                    }
                    if (state !== STATE.NONE) {
                        document.addEventListener("mousemove", onMouseMove, false);
                        document.addEventListener("mouseup", onMouseUp, false);
                        scope.dispatchEvent(objectChangeEvent);
                    }
                    scope.onMouseDown();
                }
            }
            /**
             * @param {!Event} event
             * @return {undefined}
             */
            function onMouseMove(event) {
                if (false !== scope.enabled && !withinClickDistance(event)) {
                    event.preventDefault();
                    var htmlElt = scope.domElement === document ? scope.domElement.body : scope.domElement;
                    if (state === STATE.ROTATE) {
                        if (false === scope.enableRotate) {
                            return;
                        }
                        /** @type {boolean} */
                        scope.isRotating = true;
                        rotateEnd.set(event.clientX, event.clientY);
                        rotateDelta.subVectors(rotateEnd, rotateStart);
                        constraint.rotateLeft(2 * Math.PI * rotateDelta.x / htmlElt.clientWidth * scope.rotateSpeed);
                        constraint.rotateUp(2 * Math.PI * rotateDelta.y / htmlElt.clientHeight * scope.rotateSpeed);
                        rotateStart.copy(rotateEnd);
                    } else {
                        if (state === STATE.DOLLY) {
                            if (false === scope.enableZoom) {
                                return;
                            }
                            target.set(event.clientX, event.clientY);
                            result.subVectors(target, b);
                            if (result.y > 0) {
                                constraint.dollyIn(getZoomScale());
                            } else {
                                if (result.y < 0) {
                                    constraint.dollyOut(getZoomScale());
                                }
                            }
                            b.copy(target);
                        } else {
                            if (state === STATE.PAN) {
                                if (false === scope.enablePan) {
                                    return;
                                }
                                panEnd.set(event.clientX, event.clientY);
                                panDelta.subVectors(panEnd, panStart);
                                pan(panDelta.x, panDelta.y);
                                panStart.copy(panEnd);
                            }
                        }
                    }
                    if (state !== STATE.NONE) {
                        scope.update();
                    }
                    scope.onMouseMove();
                }
            }
            /**
             * @return {undefined}
             */
            function onMouseUp() {
                if (false !== scope.enabled) {
                    document.removeEventListener("mousemove", onMouseMove, false);
                    document.removeEventListener("mouseup", onMouseUp, false);
                    scope.dispatchEvent(fooEvent);
                    /** @type {number} */
                    state = STATE.NONE;
                    /** @type {boolean} */
                    scope.isRotating = false;
                    scope.onMouseUp();
                }
            }
            /**
             * @param {!Event} event
             * @return {undefined}
             */
            function onMouseWheel(event) {
                if (false !== scope.enabled && false !== scope.enableZoom && state === STATE.NONE) {
                    event.preventDefault();
                    event.stopPropagation();
                    /** @type {number} */
                    var delta = 0;
                    if (void 0 !== event.wheelDelta) {
                        delta = event.wheelDelta;
                    } else {
                        if (void 0 !== event.detail) {
                            /** @type {number} */
                            delta = -event.detail;
                        }
                    }
                    if (delta > 0) {
                        constraint.dollyOut(getZoomScale());
                    } else {
                        if (delta < 0) {
                            constraint.dollyIn(getZoomScale());
                        }
                    }
                    scope.update();
                    scope.dispatchEvent(objectChangeEvent);
                    scope.dispatchEvent(fooEvent);
                }
            }
            /**
             * @param {!Event} event
             * @return {undefined}
             */
            function onKeyDown(event) {
                if (false !== scope.enabled && false !== scope.enableKeys && false !== scope.enablePan) {
                    switch(event.keyCode) {
                        case scope.keys.UP:
                            pan(0, scope.keyPanSpeed);
                            scope.update();
                            break;
                        case scope.keys.BOTTOM:
                            pan(0, -scope.keyPanSpeed);
                            scope.update();
                            break;
                        case scope.keys.LEFT:
                            pan(scope.keyPanSpeed, 0);
                            scope.update();
                            break;
                        case scope.keys.RIGHT:
                            pan(-scope.keyPanSpeed, 0);
                            scope.update();
                    }
                }
            }
            /**
             * @param {!Event} event
             * @return {undefined}
             */
            function touchstart(event) {
                if (false !== scope.enabled) {
                    switch(event.touches.length) {
                        case 1:
                            if (false === scope.enableRotate) {
                                return;
                            }
                            /** @type {number} */
                            state = STATE.TOUCH_ROTATE;
                            rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
                            break;
                        case 2:
                            if (false === scope.enableZoom) {
                                return;
                            }
                            /** @type {number} */
                            state = STATE.TOUCH_DOLLY;
                            /** @type {number} */
                            var lightI = event.touches[0].pageX - event.touches[1].pageX;
                            /** @type {number} */
                            var lightJ = event.touches[0].pageY - event.touches[1].pageY;
                            /** @type {number} */
                            var variable = Math.sqrt(lightI * lightI + lightJ * lightJ);
                            b.set(0, variable);
                            break;
                        case 3:
                            if (false === scope.enablePan) {
                                return;
                            }
                            /** @type {number} */
                            state = STATE.TOUCH_PAN;
                            panStart.set(event.touches[0].pageX, event.touches[0].pageY);
                            break;
                        default:
                            /** @type {number} */
                            state = STATE.NONE;
                    }
                    if (state !== STATE.NONE) {
                        scope.dispatchEvent(objectChangeEvent);
                    }
                }
            }
            /**
             * @param {!Event} event
             * @return {undefined}
             */
            function touchmove(event) {
                if (false !== scope.enabled) {
                    event.preventDefault();
                    event.stopPropagation();
                    var htmlElt = scope.domElement === document ? scope.domElement.body : scope.domElement;
                    switch(event.touches.length) {
                        case 1:
                            if (false === scope.enableRotate) {
                                return;
                            }
                            if (state !== STATE.TOUCH_ROTATE) {
                                return;
                            }
                            /** @type {boolean} */
                            scope.isRotating = true;
                            rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                            rotateDelta.subVectors(rotateEnd, rotateStart);
                            constraint.rotateLeft(2 * Math.PI * rotateDelta.x / htmlElt.clientWidth * scope.rotateSpeed);
                            constraint.rotateUp(2 * Math.PI * rotateDelta.y / htmlElt.clientHeight * scope.rotateSpeed);
                            rotateStart.copy(rotateEnd);
                            scope.update();
                            break;
                        case 2:
                            if (false === scope.enableZoom) {
                                return;
                            }
                            if (state !== STATE.TOUCH_DOLLY) {
                                return;
                            }
                            /** @type {number} */
                            var lightI = event.touches[0].pageX - event.touches[1].pageX;
                            /** @type {number} */
                            var lightJ = event.touches[0].pageY - event.touches[1].pageY;
                            /** @type {number} */
                            var y = Math.sqrt(lightI * lightI + lightJ * lightJ);
                            target.set(0, y);
                            result.subVectors(target, b);
                            if (result.y > 0) {
                                constraint.dollyOut(getZoomScale());
                            } else {
                                if (result.y < 0) {
                                    constraint.dollyIn(getZoomScale());
                                }
                            }
                            b.copy(target);
                            scope.update();
                            break;
                        case 3:
                            if (false === scope.enablePan) {
                                return;
                            }
                            if (state !== STATE.TOUCH_PAN) {
                                return;
                            }
                            panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                            panDelta.subVectors(panEnd, panStart);
                            pan(panDelta.x, panDelta.y);
                            panStart.copy(panEnd);
                            scope.update();
                            break;
                        default:
                            /** @type {number} */
                            state = STATE.NONE;
                    }
                }
            }
            /**
             * @return {undefined}
             */
            function touchend() {
                if (false !== scope.enabled) {
                    scope.dispatchEvent(fooEvent);
                    /** @type {number} */
                    state = STATE.NONE;
                    /** @type {boolean} */
                    scope.isRotating = false;
                }
            }
            /**
             * @param {!Event} event
             * @return {undefined}
             */
            function contextmenu(event) {
                event.preventDefault();
            }
            var constraint = new OrbitConstraint(object);
            this.domElement = void 0 !== properties ? properties : document;
            Object.defineProperty(this, "constraint", {
                get : function() {
                    return constraint;
                }
            });
            /**
             * @return {?}
             */
            this.getPolarAngle = function() {
                return constraint.getPolarAngle();
            };
            /**
             * @return {?}
             */
            this.getAzimuthalAngle = function() {
                return constraint.getAzimuthalAngle();
            };
            /** @type {boolean} */
            this.enabled = true;
            this.center = this.target;
            /** @type {boolean} */
            this.enableZoom = true;
            /** @type {number} */
            this.zoomSpeed = 1;
            /** @type {boolean} */
            this.enableRotate = true;
            /** @type {number} */
            this.rotateSpeed = 1;
            /** @type {boolean} */
            this.enablePan = true;
            /** @type {number} */
            this.keyPanSpeed = 7;
            /** @type {boolean} */
            this.autoRotate = false;
            /** @type {number} */
            this.autoRotateSpeed = 2;
            /** @type {boolean} */
            this.enableKeys = true;
            this.keys = {
                LEFT : 37,
                UP : 38,
                RIGHT : 39,
                BOTTOM : 40
            };
            this.mouseButtons = {
                ORBIT : THREE.MOUSE.LEFT,
                ZOOM : THREE.MOUSE.MIDDLE,
                PAN : THREE.MOUSE.RIGHT
            };
            var scope = this;
            var rotateStart = new THREE.Vector2;
            var rotateEnd = new THREE.Vector2;
            var rotateDelta = new THREE.Vector2;
            var panStart = new THREE.Vector2;
            var panEnd = new THREE.Vector2;
            var panDelta = new THREE.Vector2;
            var b = new THREE.Vector2;
            var target = new THREE.Vector2;
            var result = new THREE.Vector2;
            var STATE = {
                NONE : -1,
                ROTATE : 0,
                DOLLY : 1,
                PAN : 2,
                TOUCH_ROTATE : 3,
                TOUCH_DOLLY : 4,
                TOUCH_PAN : 5
            };
            /** @type {number} */
            var state = STATE.NONE;
            this.target0 = this.target.clone();
            this.position0 = this.object.position.clone();
            this.zoom0 = this.object.zoom;
            var modelChangedEvent = {
                type : "change"
            };
            var objectChangeEvent = {
                type : "start"
            };
            var fooEvent = {
                type : "end"
            };
            /**
             * @return {undefined}
             */
            this.update = function() {
                if (this.autoRotate && state === STATE.NONE) {
                    constraint.rotateLeft(getAutoRotationAngle());
                }
                if (true === constraint.update()) {
                    this.dispatchEvent(modelChangedEvent);
                }
            };
            /**
             * @return {undefined}
             */
            this.reset = function() {
                /** @type {number} */
                state = STATE.NONE;
                this.target.copy(this.target0);
                this.object.position.copy(this.position0);
                this.object.zoom = this.zoom0;
                this.object.updateProjectionMatrix();
                this.dispatchEvent(modelChangedEvent);
                this.update();
            };
            /**
             * @return {undefined}
             */
            this.dispose = function() {
                this.domElement.removeEventListener("contextmenu", contextmenu, false);
                this.domElement.removeEventListener("mousedown", onMouseDown, false);
                this.domElement.removeEventListener("mousewheel", onMouseWheel, false);
                this.domElement.removeEventListener("MozMousePixelScroll", onMouseWheel, false);
                this.domElement.removeEventListener("touchstart", touchstart, false);
                this.domElement.removeEventListener("touchend", touchend, false);
                this.domElement.removeEventListener("touchmove", touchmove, false);
                document.removeEventListener("mousemove", onMouseMove, false);
                document.removeEventListener("mouseup", onMouseUp, false);
                window.removeEventListener("keydown", onKeyDown, false);
            };
            this.domElement.addEventListener("contextmenu", contextmenu, false);
            this.domElement.addEventListener("mousedown", onMouseDown, false);
            this.domElement.addEventListener("mousewheel", onMouseWheel, false);
            this.domElement.addEventListener("MozMousePixelScroll", onMouseWheel, false);
            this.domElement.addEventListener("touchstart", touchstart, false);
            this.domElement.addEventListener("touchend", touchend, false);
            this.domElement.addEventListener("touchmove", touchmove, false);
            window.addEventListener("keydown", onKeyDown, false);
            this.update();
        };
        /** @type {!Object} */
        OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
        /** @type {function(!Function, !Object): undefined} */
        OrbitControls.prototype.constructor = OrbitControls;
        /**
         * @return {undefined}
         */
        OrbitControls.prototype.onMouseDown = function() {
        };
        /**
         * @return {undefined}
         */
        OrbitControls.prototype.onMouseMove = function() {
        };
        /**
         * @return {undefined}
         */
        OrbitControls.prototype.onMouseUp = function() {
        };
        Object.defineProperties(OrbitControls.prototype, {
            object : {
                get : function() {
                    return this.constraint.object;
                }
            },
            target : {
                get : function() {
                    return this.constraint.target;
                },
                set : function(v) {
                    console.warn("OrbitControls: target is now immutable. Use target.set() instead.");
                    this.constraint.target.copy(v);
                }
            },
            minDistance : {
                get : function() {
                    return this.constraint.minDistance;
                },
                set : function(value) {
                    /** @type {number} */
                    this.constraint.minDistance = value;
                }
            },
            maxDistance : {
                get : function() {
                    return this.constraint.maxDistance;
                },
                set : function(value) {
                    /** @type {number} */
                    this.constraint.maxDistance = value;
                }
            },
            minZoom : {
                get : function() {
                    return this.constraint.minZoom;
                },
                set : function(value) {
                    /** @type {number} */
                    this.constraint.minZoom = value;
                }
            },
            maxZoom : {
                get : function() {
                    return this.constraint.maxZoom;
                },
                set : function(value) {
                    /** @type {number} */
                    this.constraint.maxZoom = value;
                }
            },
            minPolarAngle : {
                get : function() {
                    return this.constraint.minPolarAngle;
                },
                set : function(value) {
                    /** @type {number} */
                    this.constraint.minPolarAngle = value;
                }
            },
            maxPolarAngle : {
                get : function() {
                    return this.constraint.maxPolarAngle;
                },
                set : function(value) {
                    /** @type {number} */
                    this.constraint.maxPolarAngle = value;
                }
            },
            minAzimuthAngle : {
                get : function() {
                    return this.constraint.minAzimuthAngle;
                },
                set : function(value) {
                    /** @type {number} */
                    this.constraint.minAzimuthAngle = value;
                }
            },
            maxAzimuthAngle : {
                get : function() {
                    return this.constraint.maxAzimuthAngle;
                },
                set : function(value) {
                    /** @type {number} */
                    this.constraint.maxAzimuthAngle = value;
                }
            },
            enableDamping : {
                get : function() {
                    return this.constraint.enableDamping;
                },
                set : function(value) {
                    /** @type {number} */
                    this.constraint.enableDamping = value;
                }
            },
            dampingFactor : {
                get : function() {
                    return this.constraint.dampingFactor;
                },
                set : function(value) {
                    /** @type {number} */
                    this.constraint.dampingFactor = value;
                }
            },
            noZoom : {
                get : function() {
                    return console.warn("OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), !this.enableZoom;
                },
                set : function(value) {
                    console.warn("OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.");
                    /** @type {boolean} */
                    this.enableZoom = !value;
                }
            },
            noRotate : {
                get : function() {
                    return console.warn("OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), !this.enableRotate;
                },
                set : function(value) {
                    console.warn("OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.");
                    /** @type {boolean} */
                    this.enableRotate = !value;
                }
            },
            noPan : {
                get : function() {
                    return console.warn("OrbitControls: .noPan has been deprecated. Use .enablePan instead."), !this.enablePan;
                },
                set : function(value) {
                    console.warn("OrbitControls: .noPan has been deprecated. Use .enablePan instead.");
                    /** @type {boolean} */
                    this.enablePan = !value;
                }
            },
            noKeys : {
                get : function() {
                    return console.warn("OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), !this.enableKeys;
                },
                set : function(value) {
                    console.warn("OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.");
                    /** @type {boolean} */
                    this.enableKeys = !value;
                }
            },
            staticMoving : {
                get : function() {
                    return console.warn("OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), !this.constraint.enableDamping;
                },
                set : function(value) {
                    console.warn("OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.");
                    /** @type {boolean} */
                    this.constraint.enableDamping = !value;
                }
            },
            dynamicDampingFactor : {
                get : function() {
                    return console.warn("OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.constraint.dampingFactor;
                },
                set : function(value) {
                    console.warn("OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.");
                    /** @type {number} */
                    this.constraint.dampingFactor = value;
                }
            }
        });
        /** @type {function(!Function, !Object): undefined} */
        mixin.exports = OrbitControls;
    }();
}, function(context, canCreateDiscussions, require) {
    /**
     * @param {!Object} options
     * @return {undefined}
     */
    function init(options) {
        var waterNormals = layer.getTexture("textures/waternormals.jpg");
        waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
        var trail = new THREE.Vector3;
        if (options.light && options.light instanceof THREE.Light) {
            trail.copy(options.light.position);
        } else {
            trail.set(-.2, .3, -.5);
        }
        this.effect = new EffectComposer(options.renderer, options.camera, {
            color : 16777215,
            waterNormals : waterNormals,
            transparent : void 0 !== options.transparent && options.transparent,
            sunDirection : trail,
            sunColor : 16777215,
            shininess : 500,
            alpha : .35
        });
        if (options.object) {
            THREE.Mesh.call(this, options.object.geometry, this.effect.material);
            this.position.copy(options.object.position);
            this.rotation.copy(options.object.rotation);
            this.scale.copy(options.object.scale);
        } else {
            THREE.Mesh.call(this, new THREE.PlaneBufferGeometry(2E3, 2E3, 10, 10), this.effect.material);
            /** @type {number} */
            this.rotation.x = .5 * -Math.PI;
            this.position.y -= 20;
        }
        this.add(this.effect);
    }
    var EffectComposer = require(61);
    var layer = require(0);
    init.inherit(THREE.Mesh, {
        update : function(time) {
            if (this.effect.material.uniforms.time) {
                this.effect.material.uniforms.time.value += .25 * time.delta;
            }
            this.effect.update();
        },
        render : function() {
            this.effect.render(this.effect.renderer, this.effect.camera);
        }
    });
    /** @type {function(!Object): undefined} */
    context.exports = init;
}, function(mixin, canCreateDiscussions, n) {
    var f = n(62);
    var mirrorShader = {
        uniforms : THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
            color : {
                value : new THREE.Color(5592405)
            },
            mirrorSampler : {
                value : null
            },
            textureMatrix : {
                value : new THREE.Matrix4
            },
            normalSampler : {
                value : null
            },
            alpha : {
                value : 1
            },
            time : {
                value : 0
            },
            distortionScale : {
                value : 20
            },
            noiseScale : {
                value : 1
            },
            sunColor : {
                value : new THREE.Color(8355711)
            },
            sunDirection : {
                value : new THREE.Vector3(.70707, .70707, 0)
            },
            eye : {
                value : new THREE.Vector3
            }
        }]),
        vertexShader : ["uniform mat4 textureMatrix;", "varying vec4 mirrorCoord;", "varying vec3 worldPosition;", "void main() {", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "vec4 worldPos = modelMatrix * vec4( position, 1.0 );", "mirrorCoord = textureMatrix * worldPos;", "worldPosition = worldPos.xyz;", "gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"),
        fragmentShader : ["precision highp float;", "uniform sampler2D mirrorSampler;", "uniform float alpha;", "uniform float time;", "uniform float distortionScale;", "uniform sampler2D normalSampler;", "uniform vec3 sunColor;", "uniform vec3 sunDirection;", "uniform vec3 eye;", "uniform vec3 color;", "varying vec4 mirrorCoord;", "varying vec3 worldPosition;", "vec4 getNoise( vec2 uv )", "{", "float uvScale = 0.5;", "float boot = time * uvScale;", "\tvec2 uv0 = ( uv / 20.0 ) + vec2(boot / 17.0, boot / 29.0);",
            "\tvec2 uv1 = (uv / 30.0) - vec2( boot / -19.0, boot / 31.0 );", "\tvec2 uv2 = uv / vec2( 9.0, 18.0 ) + vec2( boot / 101.0, boot / 97.0 );", "\tvec2 uv3 = uv / vec2( 13.0, 20.0 ) - vec2( boot / 109.0, boot / -113.0 );", "uv0 /= uvScale;", "uv1 /= uvScale;", "uv2 /= uvScale;", "uv3 /= uvScale;", "\tvec4 noise = texture2D( normalSampler, uv0 ) + texture2D( normalSampler, uv1 ) + texture2D(normalSampler, uv2) + texture2D(normalSampler, uv3);", "\treturn noise * 0.5 - 1.0;", "}", "void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor )",
            "{", "\tvec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );", "\tfloat direction = max( 0.0, dot( eyeDirection, reflection ) );", "\tspecularColor += pow( direction, shiny ) * sunColor * spec;", "\tdiffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;", "}", THREE.ShaderChunk.common, THREE.ShaderChunk.fog_pars_fragment, "float blendOverlay(float base, float blend) {", "return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );",
            "}", "void main()", "{", "\tvec4 noise = getNoise( worldPosition.xz );", "\tvec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );", "\tvec3 diffuseLight = vec3(0.0);", "\tvec3 specularLight = vec3(0.0);", "\tvec3 worldToEye = eye - worldPosition;", "\tvec3 eyeDirection = normalize( worldToEye );", "\tsunLight( surfaceNormal, eyeDirection, 200.0, 1.5, 0.5, diffuseLight, specularLight );", "\tfloat distance = length(worldToEye);", "\tvec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;",
            " vec4 mirrorDistord = mirrorCoord;", " mirrorDistord.x += distortion.x;", " mirrorDistord.w += distortion.y;", "\tvec3 reflectionSample = texture2DProj( mirrorSampler, mirrorDistord ).rgb;", "reflectionSample = vec3(0.565, 0.714, 0.831);", "\tfloat theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );", "\tfloat rf0 = 0.3;", " float d = 1.0 - clamp(distance / 1500.0, 0.0, 1.0);", "\tfloat reflectance = d * clamp(rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 ), 0.0, 1.0);", " reflectance = 1.0;",
            "\tvec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * color;", "\tvec3 albedo = mix( sunColor * diffuseLight * 0.3 + scatter, ( mix(scatter, reflectionSample, 0.75) + reflectionSample * specularLight ), reflectance );", "\tvec3 outgoingLight = albedo;", THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, max(alpha, specularLight.r) );", "}"].join("\n")
    };
    /**
     * @param {!Function} message
     * @param {!Object} config
     * @param {!Object} options
     * @return {undefined}
     */
    var Water = function(message, config, options) {
        /**
         * @param {?} value
         * @param {string} defaultValue
         * @return {?}
         */
        function optionalParameter(value, defaultValue) {
            return void 0 !== value ? value : defaultValue;
        }
        this.clipBias = optionalParameter(options.clipBias, 0);
        this.alpha = optionalParameter(options.alpha, 1);
        this.time = optionalParameter(options.time, 0);
        this.normalSampler = optionalParameter(options.waterNormals, null);
        this.sunDirection = optionalParameter(options.sunDirection, new THREE.Vector3(.70707, .70707, 0));
        this.sunColor = new THREE.Color(optionalParameter(options.sunColor, 16777215));
        this.eye = optionalParameter(options.eye, new THREE.Vector3(0, 0, 0));
        this.distortionScale = optionalParameter(options.distortionScale, 10);
        this.side = optionalParameter(options.side, THREE.DoubleSide);
        this.fog = optionalParameter(options.fog, false);
        f.apply(this, arguments);
        if (options.transparent) {
            this.material.transparent = options.transparent;
        }
        this.material.uniforms.alpha.value = this.alpha;
        this.material.uniforms.time.value = this.time;
        this.material.uniforms.normalSampler.value = this.normalSampler;
        this.material.uniforms.sunColor.value = this.sunColor;
        this.material.uniforms.sunDirection.value = this.sunDirection;
        this.material.uniforms.distortionScale.value = this.distortionScale;
        this.material.uniforms.eye.value = this.eye;
    };
    /** @type {!Object} */
    Water.prototype = Object.create(f.prototype);
    /** @type {function(!Function, !Object, !Object): undefined} */
    Water.prototype.constructor = Water;
    /**
     * @return {undefined}
     */
    Water.prototype.initMaterial = function() {
        var uniforms = THREE.UniformsUtils.clone(mirrorShader.uniforms);
        this.material = new THREE.ShaderMaterial({
            fragmentShader : mirrorShader.fragmentShader,
            vertexShader : mirrorShader.vertexShader,
            uniforms : uniforms,
            side : this.side,
            fog : this.fog
        });
    };
    /**
     * @return {undefined}
     */
    Water.prototype.updateTextureMatrix = function() {
        f.prototype.updateTextureMatrix.call(this);
        var worldCoordinates = new THREE.Vector3;
        worldCoordinates.setFromMatrixPosition(this.camera.matrixWorld);
        this.eye = worldCoordinates;
        this.material.uniforms.eye.value = this.eye;
    };
    Water.prototype.update = function() {
        var worldCoordinates = new THREE.Vector3;
        return function(canCreateDiscussions) {
            this.updateMatrixWorld();
            this.camera.updateMatrixWorld();
            worldCoordinates.setFromMatrixPosition(this.camera.matrixWorld);
            this.eye = worldCoordinates;
            this.material.uniforms.eye.value = this.eye;
        };
    }();
    /** @type {function(!Function, !Object, !Object): undefined} */
    mixin.exports = Water;
}, function(mixin, canCreateDiscussions) {
    var mirrorShader = {
        uniforms : {
            color : {
                value : new THREE.Color(8355711)
            },
            mirrorSampler : {
                value : null
            },
            textureMatrix : {
                value : new THREE.Matrix4
            }
        },
        vertexShader : ["uniform mat4 textureMatrix;", "varying vec4 mirrorCoord;", "void main() {", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );", "mirrorCoord = textureMatrix * worldPosition;", "gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"),
        fragmentShader : ["uniform vec3 color;", "uniform sampler2D mirrorSampler;", "varying vec4 mirrorCoord;", "float blendOverlay(float base, float blend) {", "return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );", "}", "void main() {", "vec4 c = texture2DProj(mirrorSampler, mirrorCoord);", "c = vec4(blendOverlay(color.r, c.r), blendOverlay(color.g, c.g), blendOverlay(color.b, c.b), 1.0);", "gl_FragColor = c;", "}"].join("\n")
    };
    /**
     * @param {!Object} obj
     * @param {!Object} camera
     * @param {!Object} options
     * @return {undefined}
     */
    var Mirror = function(obj, camera, options) {
        THREE.Object3D.call(this);
        /** @type {string} */
        this.name = "mirror_" + this.id;
        options = options || {};
        /** @type {boolean} */
        this.matrixNeedsUpdate = true;
        var width = void 0 !== options.textureWidth ? options.textureWidth : 512;
        var height = void 0 !== options.textureHeight ? options.textureHeight : 512;
        this.clipBias = void 0 !== options.clipBias ? options.clipBias : 0;
        var _startingFret = void 0 !== options.color ? new THREE.Color(options.color) : new THREE.Color(8355711);
        if (this.renderer = obj, this.mirrorPlane = new THREE.Plane, this.normal = new THREE.Vector3(0, 0, 1), this.mirrorWorldPosition = new THREE.Vector3, this.cameraWorldPosition = new THREE.Vector3, this.rotationMatrix = new THREE.Matrix4, this.lookAtPosition = new THREE.Vector3(0, 0, -1), this.clipPlane = new THREE.Vector4, void 0 !== options.debugMode && options.debugMode) {
            var leader = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 10, 16777088);
            var geometry = new THREE.Geometry;
            geometry.vertices.push(new THREE.Vector3(-10, -10, 0));
            geometry.vertices.push(new THREE.Vector3(10, -10, 0));
            geometry.vertices.push(new THREE.Vector3(10, 10, 0));
            geometry.vertices.push(new THREE.Vector3(-10, 10, 0));
            geometry.vertices.push(geometry.vertices[0]);
            var ball = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color : 16777088
            }));
            this.add(leader);
            this.add(ball);
        }
        if (camera instanceof THREE.PerspectiveCamera) {
            /** @type {!Object} */
            this.camera = camera;
        } else {
            this.camera = new THREE.PerspectiveCamera;
            console.log(this.name + ": camera is not a Perspective Camera!");
        }
        this.textureMatrix = new THREE.Matrix4;
        this.mirrorCamera = this.camera.clone();
        /** @type {boolean} */
        this.mirrorCamera.matrixAutoUpdate = true;
        var parameters = {
            minFilter : THREE.LinearFilter,
            magFilter : THREE.LinearFilter,
            format : THREE.RGBFormat,
            stencilBuffer : false
        };
        this.renderTarget = new THREE.WebGLRenderTarget(width, height, parameters);
        this.renderTarget2 = new THREE.WebGLRenderTarget(width, height, parameters);
        this.initMaterial();
        this.material.uniforms.mirrorSampler.value = this.renderTarget.texture;
        this.material.uniforms.color.value = _startingFret;
        this.material.uniforms.textureMatrix.value = this.textureMatrix;
        if (!(THREE.Math.isPowerOfTwo(width) && THREE.Math.isPowerOfTwo(height))) {
            /** @type {boolean} */
            this.renderTarget.texture.generateMipmaps = false;
            /** @type {boolean} */
            this.renderTarget2.texture.generateMipmaps = false;
        }
        this.updateTextureMatrix();
        this.render();
    };
    /** @type {!Object} */
    Mirror.prototype = Object.create(THREE.Object3D.prototype);
    /** @type {function(!Object, !Object, !Object): undefined} */
    Mirror.prototype.constructor = Mirror;
    /**
     * @return {undefined}
     */
    Mirror.prototype.initMaterial = function() {
        var uniforms = THREE.UniformsUtils.clone(mirrorShader.uniforms);
        this.material = new THREE.ShaderMaterial({
            fragmentShader : mirrorShader.fragmentShader,
            vertexShader : mirrorShader.vertexShader,
            uniforms : uniforms
        });
    };
    /**
     * @param {!Object} otherMirror
     * @return {undefined}
     */
    Mirror.prototype.renderWithMirror = function(otherMirror) {
        this.updateTextureMatrix();
        /** @type {boolean} */
        this.matrixNeedsUpdate = false;
        var tempCamera = otherMirror.camera;
        otherMirror.camera = this.mirrorCamera;
        otherMirror.renderTemp();
        otherMirror.material.uniforms.mirrorSampler.value = otherMirror.renderTarget2.texture;
        this.render();
        /** @type {boolean} */
        this.matrixNeedsUpdate = true;
        otherMirror.material.uniforms.mirrorSampler.value = otherMirror.renderTarget.texture;
        otherMirror.camera = tempCamera;
        otherMirror.updateTextureMatrix();
    };
    /**
     * @return {undefined}
     */
    Mirror.prototype.updateTextureMatrix = function() {
        this.updateMatrixWorld();
        this.camera.updateMatrixWorld();
        this.mirrorWorldPosition.setFromMatrixPosition(this.matrixWorld);
        this.cameraWorldPosition.setFromMatrixPosition(this.camera.matrixWorld);
        this.rotationMatrix.extractRotation(this.matrixWorld);
        this.normal.set(0, 0, 1);
        this.normal.applyMatrix4(this.rotationMatrix);
        var view = this.mirrorWorldPosition.clone().sub(this.cameraWorldPosition);
        view.reflect(this.normal).negate();
        view.add(this.mirrorWorldPosition);
        this.rotationMatrix.extractRotation(this.camera.matrixWorld);
        this.lookAtPosition.set(0, 0, -1);
        this.lookAtPosition.applyMatrix4(this.rotationMatrix);
        this.lookAtPosition.add(this.cameraWorldPosition);
        var target = this.mirrorWorldPosition.clone().sub(this.lookAtPosition);
        target.reflect(this.normal).negate();
        target.add(this.mirrorWorldPosition);
        this.up.set(0, -1, 0);
        this.up.applyMatrix4(this.rotationMatrix);
        this.up.reflect(this.normal).negate();
        this.mirrorCamera.position.copy(view);
        this.mirrorCamera.up = this.up;
        this.mirrorCamera.lookAt(target);
        this.mirrorCamera.updateProjectionMatrix();
        this.mirrorCamera.updateMatrixWorld();
        this.mirrorCamera.matrixWorldInverse.getInverse(this.mirrorCamera.matrixWorld);
        this.textureMatrix.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1);
        this.textureMatrix.multiply(this.mirrorCamera.projectionMatrix);
        this.textureMatrix.multiply(this.mirrorCamera.matrixWorldInverse);
        this.mirrorPlane.setFromNormalAndCoplanarPoint(this.normal, this.mirrorWorldPosition);
        this.mirrorPlane.applyMatrix4(this.mirrorCamera.matrixWorldInverse);
        this.clipPlane.set(this.mirrorPlane.normal.x, this.mirrorPlane.normal.y, this.mirrorPlane.normal.z, this.mirrorPlane.constant);
        var q = new THREE.Vector4;
        var projectionMatrix = this.mirrorCamera.projectionMatrix;
        /** @type {number} */
        q.x = (Math.sign(this.clipPlane.x) + projectionMatrix.elements[8]) / projectionMatrix.elements[0];
        /** @type {number} */
        q.y = (Math.sign(this.clipPlane.y) + projectionMatrix.elements[9]) / projectionMatrix.elements[5];
        /** @type {number} */
        q.z = -1;
        /** @type {number} */
        q.w = (1 + projectionMatrix.elements[10]) / projectionMatrix.elements[14];
        var xors = new THREE.Vector4;
        xors = this.clipPlane.multiplyScalar(2 / this.clipPlane.dot(q));
        projectionMatrix.elements[2] = xors.x;
        projectionMatrix.elements[6] = xors.y;
        /** @type {number} */
        projectionMatrix.elements[10] = xors.z + 1 - this.clipBias;
        projectionMatrix.elements[14] = xors.w;
    };
    /**
     * @return {undefined}
     */
    Mirror.prototype.render = function() {
        if (this.matrixNeedsUpdate) {
            this.updateTextureMatrix();
        }
        /** @type {boolean} */
        this.matrixNeedsUpdate = true;
        var scene = this;
        for (; null !== scene.parent;) {
            scene = scene.parent;
        }
        if (void 0 !== scene && scene instanceof THREE.Scene) {
            var visible = this.material.visible;
            /** @type {boolean} */
            this.material.visible = false;
            this.renderer.render(scene, this.mirrorCamera, this.renderTarget, true);
            this.material.visible = visible;
        }
    };
    /**
     * @return {undefined}
     */
    Mirror.prototype.renderTemp = function() {
        if (this.matrixNeedsUpdate) {
            this.updateTextureMatrix();
        }
        /** @type {boolean} */
        this.matrixNeedsUpdate = true;
        var scene = this;
        for (; null !== scene.parent;) {
            scene = scene.parent;
        }
        if (void 0 !== scene && scene instanceof THREE.Scene) {
            this.renderer.render(scene, this.mirrorCamera, this.renderTarget2, true);
        }
    };
    /** @type {function(!Object, !Object, !Object): undefined} */
    mixin.exports = Mirror;
}, function(module, canCreateDiscussions, n) {
    var f = n(1);
    /**
     * @return {undefined}
     */
    var Button = function() {
        /** @type {boolean} */
        this.shouldPoll = true;
        /** @type {null} */
        this.buttonPressed = null;
        $(document).on("keypress", function(event) {
            if (32 == event.keyCode) {
                this.trigger("press");
            }
        }.bind(this));
    };
    Button.prototype = {
        poll : function() {
            if (this.shouldPoll) {
                /** @type {!Array<Gamepad>} */
                this.gamepads = navigator.getGamepads();
            }
        },
        update : function() {
            this.poll();
            _.each(this.gamepads, function(sectionInfo) {
                if (sectionInfo) {
                    /** @type {number} */
                    var k = 0;
                    for (; k < sectionInfo.buttons.length; k++) {
                        var input = sectionInfo.buttons[k];
                        if (input.pressed) {
                            /** @type {number} */
                            this.buttonPressed = k;
                        } else {
                            if (null != this.buttonPressed && this.buttonPressed === k) {
                                this.trigger("press");
                                /** @type {null} */
                                this.buttonPressed = null;
                            }
                        }
                    }
                }
            }, this);
        }
    };
    Button.mixin(f);
    /** @type {function(): undefined} */
    module.exports = Button;
}, function(module, canCreateDiscussions, groupingFunction) {
    var data = groupingFunction(1);
    /**
     * @param {!Object} app
     * @return {undefined}
     */
    var Scene = function(app) {
        app = app || {};
        /** @type {!Array} */
        this.objects = [];
        this.mouseCoords = {
            x : 0,
            y : 0
        };
        this.camera = app.camera;
        this.vr = app.vr;
        this.checkFlag = void 0 !== app.checkFlag && app.checkFlag;
    };
    Scene.prototype = {
        add : function(value) {
            if (!_.isArray(value)) {
                /** @type {!Array} */
                value = [value];
            }
            _.each(value, function(obj) {
                this.objects.push(obj);
                /** @type {boolean} */
                obj.pickable = true;
            }, this);
        },
        remove : function(value) {
            /** @type {number} */
            var i = 0;
            for (; i < this.objects.length; i++) {
                if (this.objects[i].id === value.id) {
                    this.objects.splice(i, 1);
                    break;
                }
            }
        },
        clear : function() {
            /** @type {!Array} */
            this.objects = [];
        },
        clearState : function() {
            if (this.currentObj) {
                this.trigger("leave", this.currentObj);
                /** @type {null} */
                this.currentObj = null;
            }
        },
        onTap : function() {
            if (this.currentObj) {
                this.trigger("pick", this.currentObj, this.point);
            }
        },
        hitTest : function() {
            var raycaster = new THREE.Raycaster;
            var camera = new THREE.Vector3;
            var node = new THREE.Vector3;
            new THREE.Vector3;
            return function(canCreateDiscussions) {
                var name;
                this.camera.getWorldPosition(node);
                if (this.vr || canCreateDiscussions) {
                    this.camera.getWorldDirection(camera);
                    raycaster.set(node, camera);
                } else {
                    raycaster.setFromCamera(this.mouseCoords, this.camera);
                }
                var template = raycaster.intersectObjects(this.objects);
                if (template.length > 0) {
                    var options = _.find(template, function(typeStatement) {
                        return this.checkFlag ? void 0 !== typeStatement.object.pickable && true === typeStatement.object.pickable : typeStatement.object;
                    }, this);
                    if (options) {
                        this.point = options.point;
                        name = options.object;
                    }
                }
                return (name && this.currentObj && this.currentObj !== name || !name && this.currentObj) && (this.trigger("leave", this.currentObj), this.currentObj = null), name && !this.currentObj && (this.trigger("enter", name, this.point), this.currentObj = name), name;
            };
        }(),
        updateMouseCoords : function(e) {
            /** @type {!Array} */
            this.mouseCoords = e;
        },
        getPoint : function() {
            return this.point;
        }
    };
    Scene.mixin(data);
    /** @type {function(!Object): undefined} */
    module.exports = Scene;
}, function(module, canCreateDiscussions) {
    /** @type {!Array} */
    var renderer = ["brown_leather", "fine_touch_leather 1", "yellow_leather"];
    /**
     * @param {!Object} opts
     * @return {undefined}
     */
    var Scene = function(opts) {
        this.scene = opts.scenes[2];
        this.scenes = opts.scenes;
        this.configurables = opts.configurables;
        this.initMaterials();
        this.initObjects();
        this.initSpecialProperties();
    };
    Scene.prototype = {
        initSpecialProperties : function() {
            var _copied_material = this.getMaterial("Plant_ALB");
            if (_copied_material) {
                _copied_material.side = THREE.DoubleSide;
            }
            var material = this.getMaterial("glass");
            if (material) {
                material.side = THREE.DoubleSide;
                /** @type {number} */
                material.f0Factor = 1;
                /** @type {boolean} */
                material.depthWrite = false;
            }
            var mpars = this.getMaterial("palm_leaves");
            if (mpars) {
                mpars.side = THREE.DoubleSide;
                /** @type {boolean} */
                mpars.depthWrite = true;
                /** @type {number} */
                mpars.f0Factor = 1;
            }
            var size = this.getMaterial("tabwood");
            if (size) {
                /** @type {number} */
                size.f0Factor = 1;
            }
            _.each(this.scene.materials, function(canCreateDiscussions) {
                if (canCreateDiscussions.pbr) {
                    /** @type {number} */
                    canCreateDiscussions.f0Factor = 1;
                }
            });
            var materialParams = this.getMaterial("sansevieria");
            if (materialParams) {
                materialParams.side = THREE.DoubleSide;
            }
            var json = this.getMaterial("tripod_lamp");
            if (json) {
                json.side = THREE.DoubleSide;
            }
            /** @type {!Array} */
            var a = ["coffee_table_feet", "chair_feet", "door_handle"];
            _.each(this.scenes, function(data) {
                _.each(data.materials, function(params) {
                    if (!(!params.pbr || a.indexOf(params.name) > -1)) {
                        /** @type {boolean} */
                        params.defines.OCCLUDE_SPECULAR = true;
                    }
                });
            });
            var info = this.getMaterial("pool_interior");
            if (info) {
                /** @type {number} */
                info.exposure = 1.25;
            }
            _.each(this.scenes[1].materials, function(options) {
                if (options.pbr) {
                    /** @type {number} */
                    options.exposure = 1.2;
                }
            }, this);
        },
        initMaterials : function() {
            this.materials = {};
            this.configurables.forEach(function(_ref33) {
                var name = _ref33.name;
                var child = this.scene.getObjectByName(name);
                var mat = this.getMaterialsForObject(child);
                var material = child.getObjectByName(_ref33.linkedObjects[0]).material;
                var a = material.uniforms.sTextureLightMap.value;
                var s = material.uniforms.sTextureLightMapM.value;
                var playEditorURL = material.uniforms.sTextureAOMap2.value;
                var floatColor = material.uniforms.sTextureNormalMap2.value;
                var partial_tree = child.getObjectByName("materials");
                this.materials[name] = mat;
                mat.forEach(function(options) {
                    /** @type {!Object} */
                    this.scene.materials[options.uuid] = options;
                    if (a) {
                        options.lightMap = a;
                        options.lightMapM = s;
                        /** @type {boolean} */
                        options.defines.USE_LIGHTMAP = true;
                    }
                    if (playEditorURL) {
                        options.uniforms.sTextureAOMap2.value = playEditorURL;
                        /** @type {boolean} */
                        options.defines.USE_AOMAP2 = true;
                    }
                    if (floatColor) {
                        options.uniforms.sTextureNormalMap2.value = floatColor;
                        /** @type {boolean} */
                        options.defines.USE_NORMALMAP2 = true;
                    }
                    /** @type {boolean} */
                    options.needsUpdate = true;
                    if (renderer.indexOf(options.name) < 0) {
                        /** @type {boolean} */
                        options.ignoreDirLight = true;
                    }
                }, this);
                if (renderer.indexOf(material.name) < 0) {
                    /** @type {boolean} */
                    material.ignoreDirLight = true;
                }
                partial_tree.traverse(function(oPresentationNode) {
                    /** @type {boolean} */
                    oPresentationNode.visible = false;
                });
            }, this);
        },
        initObjects : function() {
            this.objects = {};
            this.configurables.forEach(function(obj) {
                /** @type {!Array} */
                this.objects[obj.name] = [];
                obj.linkedObjects.forEach(function(storageName) {
                    var value = this.getChildByName(this.scene.getObjectByName(obj.name), storageName);
                    this.objects[obj.name] = this.objects[obj.name].concat(value);
                }, this);
            }, this);
        },
        setObjectMaterial : function(type, i) {
            var unloadedImgElement = this.materials[type.name][i];
            this.crossFadeMaterial(this.objects[type.name], unloadedImgElement);
        },
        crossFadeMaterial : function() {
            var ichart = new TWEEN.Tween;
            var data = {
                opacity : 0
            };
            return function(n, m) {
                if (this.crossFade) {
                    return void this.crossFade.onComplete(function() {
                        n.forEach(function(panel) {
                            panel.material = this.currentFadingMaterial;
                            panel.parent.remove(panel.materialClone);
                            /** @type {null} */
                            panel.materialClone = null;
                        }, this);
                        /** @type {boolean} */
                        this.currentFadingMaterial.transparent = false;
                        /** @type {boolean} */
                        this.currentFadingMaterial.depthWrite = true;
                        /** @type {number} */
                        data.opacity = 0;
                        /** @type {null} */
                        this.crossFade = null;
                        if (m !== this.currentFadingMaterial) {
                            this.crossFadeMaterial(n, m);
                        }
                    }.bind(this));
                }
                /** @type {!Object} */
                this.currentFadingMaterial = m;
                n.forEach(function(output) {
                    var a = output.clone();
                    output.parent.add(a);
                    output.materialClone = a;
                    /** @type {!Object} */
                    output.targetMaterial = m;
                    /** @type {!Object} */
                    a.material = m;
                });
                /** @type {boolean} */
                m.transparent = true;
                /** @type {boolean} */
                m.depthWrite = false;
                /** @type {number} */
                m.opacity = 0;
                /**
                 * @return {undefined}
                 */
                var init = function() {
                    n.forEach(function(object) {
                        /** @type {!Object} */
                        object.material = m;
                        object.parent.remove(object.materialClone);
                        /** @type {null} */
                        object.materialClone = null;
                    });
                    /** @type {number} */
                    data.opacity = 0;
                    /** @type {boolean} */
                    m.transparent = false;
                    /** @type {boolean} */
                    m.depthWrite = true;
                    /** @type {null} */
                    this.crossFade = null;
                };
                this.crossFade = ichart.reset(data).to({
                    opacity : 1
                }, 300).easing(TWEEN.Easing.Linear.None).onUpdate(function() {
                    /** @type {number} */
                    m.opacity = data.opacity;
                }).onComplete(init.bind(this)).onStop(init.bind(this)).start();
            };
        }(),
        getMaterial : function(name) {
            var material;
            /** @type {number} */
            var i = 0;
            for (; i < this.scenes.length && !(material = _.find(this.scenes[i].materials, function(pkgObject) {
                return pkgObject.name === name;
            })); i++) {
            }
            return material;
        },
        getMaterialsForObject : function(child) {
            if (child) {
                var e = child.getObjectByName("materials");
                if (e) {
                    return _.map(e.children, function(panel) {
                        return panel.children.length > 0 ? panel.children[0].material.clone() : panel.material.clone();
                    });
                }
            }
        },
        getChildByName : function(node, name) {
            /** @type {!Array} */
            var folderPathClone = [];
            return node.traverse(function(key) {
                if (key.name === name) {
                    folderPathClone.push(key);
                }
            }), folderPathClone;
        },
        getObjectsByName : function(keyword, name) {
            /** @type {!Array} */
            var folderPathClone = [];
            return keyword.traverse(function(key) {
                if (key.name === name) {
                    folderPathClone.push(key);
                }
            }), folderPathClone;
        }
    };
    /** @type {function(!Object): undefined} */
    module.exports = Scene;
}, function(module, canCreateDiscussions, glslify) {
    var p = glslify(2);
    /** @type {function(!Object): undefined} */
    var $ = (glslify(4), glslify(0), function(i) {
        /** @type {!Object} */
        i = Object.assign({
            vertexShader : glslify(67),
            fragmentShader : glslify(68),
            uniforms : {
                diffuse : {
                    type : "c",
                    value : new THREE.Color(16777215)
                },
                map : {
                    type : "t",
                    value : null
                },
                offsetRepeat : {
                    type : "v4",
                    value : new THREE.Vector4(0, 0, 1, 1)
                },
                opacity : {
                    type : "f",
                    value : 1
                },
                threshold : {
                    type : "f",
                    value : 0
                },
                range : {
                    type : "f",
                    value : .1
                },
                noiseMap : {
                    type : "t",
                    value : null
                }
            }
        }, i);
        p.call(this, i);
        Object.keys(this.uniforms).forEach(function(propertyName) {
            this.onPropertyChange(propertyName, function(initSBC) {
                /** @type {!Object} */
                this.uniforms[propertyName].value = initSBC;
            });
        }, this);
        /** @type {number} */
        this.threshold = 0;
        /** @type {number} */
        this.sign = 1;
        /** @type {number} */
        this.lastUpdate = 0;
    });
    $.inherit(p, {
        clone : function(params) {
            var data = params || new $;
            return p.prototype.clone.call(this, data), data.name = this.name, data.transparent = this.transparent, _.each(this.uniforms, function(dom, name) {
                var value = dom.type;
                if ("v2" === value || "m4" === value) {
                    data.uniforms[name].value.copy(dom.value);
                } else {
                    data.uniforms[name].value = dom.value;
                }
            }, this), data;
        },
        updateUniforms : function(readBuffer) {
            this.uniforms.threshold.value += .35 * readBuffer.delta;
        }
    });
    /** @type {function(!Object): undefined} */
    module.exports = $;
}, function(mixin, canCreateDiscussions) {
    /** @type {string} */
    mixin.exports = "#ifdef USE_MAP\n  varying vec2 vUv;\n  uniform vec4 offsetRepeat;\n#endif\n\nvoid main() {\n  #ifdef USE_MAP\n    vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n  #endif\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";
}, function(mixin, canCreateDiscussions) {
    /** @type {string} */
    mixin.exports = "#ifdef USE_MAP\n  varying vec2 vUv;\n\n  uniform sampler2D map;\n#endif\n\nuniform sampler2D noiseMap;\n\nuniform vec3 diffuse;\nuniform float opacity;\nuniform float threshold;\nuniform float range;\n\nconst vec3 white = vec3(1.0);\n\nvoid main() {\n  gl_FragColor = vec4(diffuse, opacity);\n\n  #ifdef USE_MAP\n    vec4 mapTexel = texture2D(map, vUv);\n  #endif\n\n  vec3 noise = texture2D(noiseMap, vUv).rgb;\n\n  float v = fract(noise.r + threshold * 0.75);\n  v = step(0.9, v);\n\n  float alpha = step(0.5, (v * mapTexel.a));\n\n  gl_FragColor = vec4(white, alpha);\n}\n";
}, function(context, canCreateDiscussions, glslify) {
    /**
     * @return {undefined}
     */
    var init = function() {
        this.target = new THREE.WebGLRenderTarget(512, 512, {
            minFilter : THREE.NearestFilter,
            magFilter : THREE.NearestFilter,
            format : THREE.RGBFormat
        });
        /** @type {boolean} */
        this.target.texture.generateMipmaps = false;
        this.material = new THREE.ShaderMaterial({
            vertexShader : glslify(70),
            fragmentShader : glslify(71)
        });
        this.scene = new THREE.Scene;
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        var quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
        this.scene.add(quad);
    };
    init.prototype = {
        render : function(renderer) {
            renderer.render(this.scene, this.camera, this.target);
        }
    };
    /** @type {function(): undefined} */
    context.exports = init;
}, function(mixin, canCreateDiscussions) {
    /** @type {string} */
    mixin.exports = "varying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";
}, function(mixin, canCreateDiscussions) {
    /** @type {string} */
    mixin.exports = "varying vec2 vUv;\n\nfloat rand(vec2 co) {\n  return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n  gl_FragColor = vec4(vec3(rand(vUv)), 1.0);\n}";
}, function(module, canCreateDiscussions, glslify) {
    var p = glslify(2);
    /** @type {function(!Object): undefined} */
    var hash = (glslify(4), function(options) {
        /** @type {!Object} */
        options = Object.assign({
            vertexShader : glslify(73),
            fragmentShader : glslify(74),
            uniforms : {
                diffuse : {
                    type : "c",
                    value : new THREE.Color(16777215)
                },
                map : {
                    type : "t",
                    value : null
                },
                offsetRepeat : {
                    type : "v4",
                    value : new THREE.Vector4(0, 0, 1, 1)
                },
                opacity : {
                    type : "f",
                    value : 1
                },
                bias : {
                    type : "f",
                    value : 0
                }
            }
        }, options);
        p.call(this, options);
        Object.keys(this.uniforms).forEach(function(propertyName) {
            this.onPropertyChange(propertyName, function(initSBC) {
                /** @type {!Object} */
                this.uniforms[propertyName].value = initSBC;
            });
        }, this);
        this.transparent = options.transparent;
    });
    hash.inherit(p);
    /** @type {function(!Object): undefined} */
    module.exports = hash;
}, function(mixin, canCreateDiscussions) {
    /** @type {string} */
    mixin.exports = "#ifdef USE_MAP\n  varying vec2 vUv;\n  uniform vec4 offsetRepeat;\n#endif\n\nvoid main() {\n  #ifdef USE_MAP\n    vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n  #endif\n\n  gl_Position = vec4(position.x, position.y, 0.0, 1.0);\n}";
}, function(mixin, canCreateDiscussions) {
    /** @type {string} */
    mixin.exports = "#ifdef USE_MAP\n  varying vec2 vUv;\n\n  uniform sampler2D map;\n#endif\n\nuniform vec3 diffuse;\nuniform float opacity;\nuniform float bias;\n\nvoid main() {\n  gl_FragColor = vec4(diffuse, opacity);\n\n  #ifdef USE_MAP\n    vec4 mapTexel = texture2D(map, vUv, bias);\n\n    gl_FragColor *= mapTexel;\n  #endif\n}";
}, function(mixin, canCreateDiscussions) {
    /** @type {!Array} */
    mixin.exports = [{
        name : "fauteuil",
        linkedObjects : ["seat_main"],
        panel_data : {
            name : "OSCAR",
            type : "LOUNGE SEAT",
            dimensions : "100 x 94 x 97 cm",
            materials : ["Blue Leather", "Grey Knit Fabric", "Blue Knit Fabric", "Dark Grey Cotton"]
        },
        minDistance : 1,
        maxDistance : 2
    }, {
        name : "fauteuil2",
        linkedObjects : ["seat_main"],
        panel_data : {
            name : "OSCAR",
            type : "LOUNGE SEAT",
            dimensions : "100 x 94 x 97 cm",
            materials : ["Blue Leather", "Grey Knit Fabric", "Blue Knit Fabric", "Dark Grey Cotton"]
        },
        minDistance : 1,
        maxDistance : 2
    }, {
        name : "table",
        linkedObjects : ["table_top"],
        panel_data : {
            name : "CHLOE",
            type : "DINING TABLE",
            dimensions : "180 x 90 x 75 cm",
            materials : ["Ash Wood", "Walnut", "Grey Blue Granite", "Painted Metal"]
        },
        minDistance : 1.65,
        maxDistance : 2.55
    }, {
        name : "coffee_table",
        linkedObjects : ["board"],
        panel_data : {
            name : "ELENA",
            type : "COFFEE TABLE",
            dimensions : "120 x 120 x 35 cm",
            materials : ["Natural Beech Wood", "Vintage Plastic", "Glossy White", "Polished Copper"]
        },
        minDistance : .95,
        maxDistance : 1.6
    }, {
        name : "canape",
        linkedObjects : ["sofa_main"],
        panel_data : {
            name : "BARNEY",
            type : "LOUNGE SOFA",
            dimensions : "274 x 95 x 83 cm",
            materials : ["White Bull Leather", "Brown Leather", "Grey Fabric", "Dark Grey Cotton"]
        },
        minDistance : 2,
        maxDistance : 3
    }, {
        name : "suspended_lamp",
        linkedObjects : ["suspended_lamp"],
        panel_data : {
            name : "SARAH",
            type : "PENDANT LAMP",
            dimensions : "35 x 35 x 30 cm",
            materials : ["Black & Gold", "Glossy White", "Glossy Blue", "Yellow Rubber"]
        },
        minDistance : 1,
        maxDistance : 2
    }];
}, function(mixin, canCreateDiscussions) {
    /** @type {string} */
    mixin.exports = ".js";
}]);
