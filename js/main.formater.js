!function (t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {i: r, l: !1, exports: {}};
        return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports
    }

    var n = {};
    e.m = t, e.c = n, e.d = function (t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, {configurable: !1, enumerable: !0, get: r})
    }, e.n = function (t) {
        var n = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 13)
}([function (t, e, _dereq_) {
    function r(t, e) {
        return {
            _cache: e || {}, load: function (e, n, r, i, o) {
                var a = this._cache;
                _.has(a, o) ? resolve(a[o]) : t.load(e, function (t) {
                    a[o] = t, n.apply(this, arguments)
                }, r, i)
            }, get: function (t) {
                return _.has(this._cache, t) || console.error("Resource not found: " + t), this._cache[t]
            }
        }
    }

    function exec(nodes, val, dst, callback) {
        console.log(_)
        return _.isArray(nodes) || (nodes = [nodes]), Promise.all(_.map(nodes, function (ext) {
            if (callback) return callback(c(val, ext), ext, dst)
        }))
    }

    function o(t, e, n) {
        return new Promise(function (r, i) {
            n.load(t, function (t) {
                t.filename = e, r(arguments.length > 1 ? _.toArray(arguments) : t)
            }, function () {
            }, function () {
                i(new Error("Resource was not found: " + t))
            }, e)
        })
    }

    function callback(t, e, n) {
        console.log(t,e,n)
        return t = t || [], exec(t, e, n, o)
    }

    var Promise = _dereq_(6), c = _dereq_(21), u = _dereq_(9), l = _dereq_(26), h = _dereq_(27), f = _dereq_(28), p = _dereq_(29), d = new THREE.LoadingManager,
        m = new u(d), v = {}, g = r(new THREE.TextureLoader(d), v), y = r(new l(1024, !1, d), v),
        b = r(new h(256, !1, d), v), E = r(new THREE.ImageLoader), w = {}, x = new f(d), T = {}, R = r(new p(d), T),
        M = {environmentPath: "assets/environments", geometryPath: "assets/scenes/data/", manager: d, sceneLoader: m},
        P = "";
    Object.defineProperty(M, "texturePath", {
        get: function () {
            return P
        }, set: function (t) {
            P = t, m.setTexturePath(t)
        }
    }), M.loadScene = function (t, e) {
        return o(t, e, m)
    }, M.loadOBJs = function (t, e) {
        return callback(t, e, objLoader)
    }, M.loadTextures = function (t, e) {
        return callback(t, e || M.texturePath, g)
    }, M.loadBRDFs = function (t, e) {
        return callback(t, e, brdfLoader)
    }, M.loadPanoramas = function (t, e) {
        return callback(t, e || M.environmentPath, y)
    }, M.loadSpecularCubemaps = function (t, e) {
        return callback(t, e || M.environmentPath, b)
    }, M.loadSH = function (t) {
        return Promise.all(_.map(t, function (t) {
            return new Promise(function (e, n) {
                var r = c(M.environmentPath, t + "/irradiance.json");
                x.load(r, function (n) {
                    w[t] = n, e(n)
                }, function () {
                }, function () {
                    n(new Error("Resource was not found: " + r))
                })
            })
        }))
    }, M.loadGeometries = function (t, e) {
        return t = _.map(t, function (t) {
            return t + ".bin"
        }), callback(t, e || M.geometryPath, R)
    }, M.loadImages = function (t, e) {
        return callback(t, e, E)
    }, M.getTexture = function (t) {
        return g.get(t)
    }, M.getBRDF = function (t) {
        return brdfLoader.get(t)
    }, M.getPanorama = function (t) {
        return y.get(t + "/panorama.bin")
    }, M.getCubemap = function (t) {
        return b.get(t + "/cubemap.bin")
    }, M.getSH = function (t) {
        return w[t]
    }, M.getGeometry = function (t) {
        return R.get(t + ".bin")
    }, t.exports = M
}, function (t, e) {
    var n = {
        on: function (t, e, n) {
            return a(this, "on", t, [e, n]) && e ? (this._events || (this._events = {}), (this._events[t] || (this._events[t] = [])).push({
                callback: e,
                context: n,
                ctx: n || this
            }), this) : this
        }, once: function (t, e, n) {
            if (!a(this, "once", t, [e, n]) || !e) return this;
            var r = this, i = _.once(function () {
                r.off(t, i), e.apply(this, arguments)
            });
            return i._callback = e, this.on(t, i, n)
        }, off: function (t, e, n) {
            var r, i, o, s, c, u, l, h;
            if (!this._events || !a(this, "off", t, [e, n])) return this;
            if (!t && !e && !n) return this._events = void 0, this;
            for (s = t ? [t] : _.keys(this._events), c = 0, u = s.length; c < u; c++) if (t = s[c], o = this._events[t]) {
                if (this._events[t] = r = [], e || n) for (l = 0, h = o.length; l < h; l++) i = o[l], (e && e !== i.callback && e !== i.callback._callback || n && n !== i.context) && r.push(i);
                r.length || delete this._events[t]
            }
            return this
        }, trigger: function (t) {
            if (!this._events) return this;
            var e = o.call(arguments, 1);
            if (!a(this, "trigger", t, e)) return this;
            var n = this._events[t], r = this._events.all;
            return n && s(n, e), r && s(r, arguments), this
        }, stopListening: function (t, e, n) {
            var r = this._listeningTo;
            if (!r) return this;
            var i = !e && !n;
            n || "object" != typeof e || (n = this), t && ((r = {})[t._listenId] = t);
            for (var o in r) t = r[o], t.off(e, n, this), (i || _.isEmpty(t._events)) && delete this._listeningTo[o];
            return this
        }
    }, r = /\s+/, i = [], o = i.slice, a = function (t, e, n, i) {
        if (!n) return !0;
        if ("object" == typeof n) {
            for (var o in n) t[e].apply(t, [o, n[o]].concat(i));
            return !1
        }
        if (r.test(n)) {
            for (var a = n.split(r), s = 0, c = a.length; s < c; s++) t[e].apply(t, [a[s]].concat(i));
            return !1
        }
        return !0
    }, s = function (t, e) {
        var n, r = -1, i = t.length, o = e[0], a = e[1], s = e[2];
        switch (e.length) {
            case 0:
                for (; ++r < i;) (n = t[r]).callback.call(n.ctx);
                return;
            case 1:
                for (; ++r < i;) (n = t[r]).callback.call(n.ctx, o);
                return;
            case 2:
                for (; ++r < i;) (n = t[r]).callback.call(n.ctx, o, a);
                return;
            case 3:
                for (; ++r < i;) (n = t[r]).callback.call(n.ctx, o, a, s);
                return;
            default:
                for (; ++r < i;) (n = t[r]).callback.apply(n.ctx, e);
                return
        }
    }, c = {listenTo: "on", listenToOnce: "once"};
    _.each(c, function (t, e) {
        n[e] = function (e, n, r) {
            return (this._listeningTo || (this._listeningTo = {}))[e._listenId || (e._listenId = _.uniqueId("l"))] = e, r || "object" != typeof n || (r = this), e[t](n, r, this), this
        }
    }), t.exports = n
}, function (t, e) {
    var n = ["side", "alphaTest", "transparent", "depthWrite", "shading", "wireframe"], r = function (t) {
        t = t || {}, THREE.ShaderMaterial.call(this, t), _.each(n, function (e) {
            var n = t[e];
            void 0 !== n && (this[e] = n)
        }, this)
    };
    r.inherit(THREE.ShaderMaterial, {
        onPropertyChange: function (t, e) {
            Object.defineProperty(this, t, {
                get: function () {
                    return this["_" + t]
                }, set: function (n) {
                    this["_" + t] = n, e.call(this, n)
                }
            })
        }, clone: function (t) {
            var e = t || new r;
            return THREE.Material.prototype.clone.call(this, e), e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.fog = this.fog, e.lights = this.lights, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
        }
    }), t.exports = r
}, function (t, e) {
    var n;
    n = function () {
        return this
    }();
    try {
        n = n || Function("return this")() || (0, eval)("this")
    } catch (t) {
        "object" == typeof window && (n = window)
    }
    t.exports = n
}, function (t, e) {
    TweenUtils = {}, TweenUtils.tween = function (t, e) {
        var n = new TWEEN.Tween({progress: 0});
        return n.to({progress: 1}, t).easing(void 0 !== e ? e : TWEEN.Easing.Linear.None).start(), n
    }, t.exports = TweenUtils
}, function (t, e) {
    Config = {
        ASSET_COUNT: 140,
        DEBUG_KEYS: !1,
        AUTOSTART: !1,
        ENABLE_ZOOM: !0,
        ENABLE_PAN: !1,
        ENABLE_DAMPING: !0
    }, t.exports = Config
}, function (module, e, n) {
    (function (e, n, r) {/* @preserve
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2018 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
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
                1: [function (t, e, n) {
                    "use strict";
                    e.exports = function (t) {
                        function e(t) {
                            var e = new n(t), r = e.promise();
                            return e.setHowMany(1), e.setUnwrap(), e.init(), r
                        }

                        var n = t._SomePromiseArray;
                        t.any = function (t) {
                            return e(t)
                        }, t.prototype.any = function () {
                            return e(this)
                        }
                    }
                }, {}], 2: [function (t, n, r) {
                    "use strict";

                    function i() {
                        this._customScheduler = !1, this._isTickUsed = !1, this._lateQueue = new f(16), this._normalQueue = new f(16), this._haveDrainedQueues = !1, this._trampolineEnabled = !0;
                        var t = this;
                        this.drainQueues = function () {
                            t._drainQueues()
                        }, this._schedule = h
                    }

                    function o(t, e, n) {
                        this._lateQueue.push(t, e, n), this._queueTick()
                    }

                    function a(t, e, n) {
                        this._normalQueue.push(t, e, n), this._queueTick()
                    }

                    function s(t) {
                        this._normalQueue._pushOne(t), this._queueTick()
                    }

                    function c(t) {
                        for (; t.length() > 0;) u(t)
                    }

                    function u(t) {
                        var e = t.shift();
                        if ("function" != typeof e) e._settlePromises(); else {
                            var n = t.shift(), r = t.shift();
                            e.call(n, r)
                        }
                    }

                    var l;
                    try {
                        throw new Error
                    } catch (t) {
                        l = t
                    }
                    var h = t("./schedule"), f = t("./queue"), p = t("./util");
                    i.prototype.setScheduler = function (t) {
                        var e = this._schedule;
                        return this._schedule = t, this._customScheduler = !0, e
                    }, i.prototype.hasCustomScheduler = function () {
                        return this._customScheduler
                    }, i.prototype.enableTrampoline = function () {
                        this._trampolineEnabled = !0
                    }, i.prototype.disableTrampolineIfNecessary = function () {
                        p.hasDevTools && (this._trampolineEnabled = !1)
                    }, i.prototype.haveItemsQueued = function () {
                        return this._isTickUsed || this._haveDrainedQueues
                    }, i.prototype.fatalError = function (t, n) {
                        n ? (e.stderr.write("Fatal " + (t instanceof Error ? t.stack : t) + "\n"), e.exit(2)) : this.throwLater(t)
                    }, i.prototype.throwLater = function (t, e) {
                        if (1 === arguments.length && (e = t, t = function () {
                            throw e
                        }), "undefined" != typeof setTimeout) setTimeout(function () {
                            t(e)
                        }, 0); else try {
                            this._schedule(function () {
                                t(e)
                            })
                        } catch (t) {
                            throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")
                        }
                    }, p.hasDevTools ? (i.prototype.invokeLater = function (t, e, n) {
                        this._trampolineEnabled ? o.call(this, t, e, n) : this._schedule(function () {
                            setTimeout(function () {
                                t.call(e, n)
                            }, 100)
                        })
                    }, i.prototype.invoke = function (t, e, n) {
                        this._trampolineEnabled ? a.call(this, t, e, n) : this._schedule(function () {
                            t.call(e, n)
                        })
                    }, i.prototype.settlePromises = function (t) {
                        this._trampolineEnabled ? s.call(this, t) : this._schedule(function () {
                            t._settlePromises()
                        })
                    }) : (i.prototype.invokeLater = o, i.prototype.invoke = a, i.prototype.settlePromises = s), i.prototype._drainQueues = function () {
                        c(this._normalQueue), this._reset(), this._haveDrainedQueues = !0, c(this._lateQueue)
                    }, i.prototype._queueTick = function () {
                        this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues))
                    }, i.prototype._reset = function () {
                        this._isTickUsed = !1
                    }, n.exports = i, n.exports.firstLineError = l
                }, {"./queue": 26, "./schedule": 29, "./util": 36}], 3: [function (t, e, n) {
                    "use strict";
                    e.exports = function (t, e, n, r) {
                        var i = !1, o = function (t, e) {
                            this._reject(e)
                        }, a = function (t, e) {
                            e.promiseRejectionQueued = !0, e.bindingPromise._then(o, o, null, this, t)
                        }, s = function (t, e) {
                            0 == (50397184 & this._bitField) && this._resolveCallback(e.target)
                        }, c = function (t, e) {
                            e.promiseRejectionQueued || this._reject(t)
                        };
                        t.prototype.bind = function (o) {
                            i || (i = !0, t.prototype._propagateFrom = r.propagateFromFunction(), t.prototype._boundValue = r.boundValueFunction());
                            var u = n(o), l = new t(e);
                            l._propagateFrom(this, 1);
                            var h = this._target();
                            if (l._setBoundTo(u), u instanceof t) {
                                var f = {promiseRejectionQueued: !1, promise: l, target: h, bindingPromise: u};
                                h._then(e, a, void 0, l, f), u._then(s, c, void 0, l, f), l._setOnCancel(u)
                            } else l._resolveCallback(h);
                            return l
                        }, t.prototype._setBoundTo = function (t) {
                            void 0 !== t ? (this._bitField = 2097152 | this._bitField, this._boundTo = t) : this._bitField = -2097153 & this._bitField
                        }, t.prototype._isBound = function () {
                            return 2097152 == (2097152 & this._bitField)
                        }, t.bind = function (e, n) {
                            return t.resolve(n).bind(e)
                        }
                    }
                }, {}], 4: [function (t, e, n) {
                    "use strict";

                    function r() {
                        try {
                            Promise === o && (Promise = i)
                        } catch (t) {
                        }
                        return o
                    }

                    var i;
                    "undefined" != typeof Promise && (i = Promise);
                    var o = t("./promise")();
                    o.noConflict = r, e.exports = o
                }, {"./promise": 22}], 5: [function (t, e, n) {
                    "use strict";
                    var r = Object.create;
                    if (r) {
                        var i = r(null), o = r(null);
                        i[" size"] = o[" size"] = 0
                    }
                    e.exports = function (e) {
                        function n(t, n) {
                            var r;
                            if (null != t && (r = t[n]), "function" != typeof r) {
                                var i = "Object " + s.classString(t) + " has no method '" + s.toString(n) + "'";
                                throw new e.TypeError(i)
                            }
                            return r
                        }

                        function r(t) {
                            return n(t, this.pop()).apply(t, this)
                        }

                        function i(t) {
                            return t[this]
                        }

                        function o(t) {
                            var e = +this;
                            return e < 0 && (e = Math.max(0, e + t.length)), t[e]
                        }

                        var a, s = t("./util"), c = s.canEvaluate;
                        s.isIdentifier;
                        e.prototype.call = function (t) {
                            var e = [].slice.call(arguments, 1);
                            return e.push(t), this._then(r, void 0, void 0, e, void 0)
                        }, e.prototype.get = function (t) {
                            var e, n = "number" == typeof t;
                            if (n) e = o; else if (c) {
                                var r = a(t);
                                e = null !== r ? r : i
                            } else e = i;
                            return this._then(e, void 0, void 0, t, void 0)
                        }
                    }
                }, {"./util": 36}], 6: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r, i) {
                        var o = t("./util"), a = o.tryCatch, s = o.errorObj, c = e._async;
                        e.prototype.break = e.prototype.cancel = function () {
                            if (!i.cancellation()) return this._warn("cancellation is disabled");
                            for (var t = this, e = t; t._isCancellable();) {
                                if (!t._cancelBy(e)) {
                                    e._isFollowing() ? e._followee().cancel() : e._cancelBranched();
                                    break
                                }
                                var n = t._cancellationParent;
                                if (null == n || !n._isCancellable()) {
                                    t._isFollowing() ? t._followee().cancel() : t._cancelBranched();
                                    break
                                }
                                t._isFollowing() && t._followee().cancel(), t._setWillBeCancelled(), e = t, t = n
                            }
                        }, e.prototype._branchHasCancelled = function () {
                            this._branchesRemainingToCancel--
                        }, e.prototype._enoughBranchesHaveCancelled = function () {
                            return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0
                        }, e.prototype._cancelBy = function (t) {
                            return t === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), !0) : (this._branchHasCancelled(), !!this._enoughBranchesHaveCancelled() && (this._invokeOnCancel(), !0))
                        }, e.prototype._cancelBranched = function () {
                            this._enoughBranchesHaveCancelled() && this._cancel()
                        }, e.prototype._cancel = function () {
                            this._isCancellable() && (this._setCancelled(), c.invoke(this._cancelPromises, this, void 0))
                        }, e.prototype._cancelPromises = function () {
                            this._length() > 0 && this._settlePromises()
                        }, e.prototype._unsetOnCancel = function () {
                            this._onCancelField = void 0
                        }, e.prototype._isCancellable = function () {
                            return this.isPending() && !this._isCancelled()
                        }, e.prototype.isCancellable = function () {
                            return this.isPending() && !this.isCancelled()
                        }, e.prototype._doInvokeOnCancel = function (t, e) {
                            if (o.isArray(t)) for (var n = 0; n < t.length; ++n) this._doInvokeOnCancel(t[n], e); else if (void 0 !== t) if ("function" == typeof t) {
                                if (!e) {
                                    var r = a(t).call(this._boundValue());
                                    r === s && (this._attachExtraTrace(r.e), c.throwLater(r.e))
                                }
                            } else t._resultCancelled(this)
                        }, e.prototype._invokeOnCancel = function () {
                            var t = this._onCancel();
                            this._unsetOnCancel(), c.invoke(this._doInvokeOnCancel, this, t)
                        }, e.prototype._invokeInternalOnCancel = function () {
                            this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel())
                        }, e.prototype._resultCancelled = function () {
                            this.cancel()
                        }
                    }
                }, {"./util": 36}], 7: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e) {
                        function n(t, n, s) {
                            return function (c) {
                                var u = s._boundValue();
                                t:for (var l = 0; l < t.length; ++l) {
                                    var h = t[l];
                                    if (h === Error || null != h && h.prototype instanceof Error) {
                                        if (c instanceof h) return o(n).call(u, c)
                                    } else if ("function" == typeof h) {
                                        var f = o(h).call(u, c);
                                        if (f === a) return f;
                                        if (f) return o(n).call(u, c)
                                    } else if (r.isObject(c)) {
                                        for (var p = i(h), d = 0; d < p.length; ++d) {
                                            var m = p[d];
                                            if (h[m] != c[m]) continue t
                                        }
                                        return o(n).call(u, c)
                                    }
                                }
                                return e
                            }
                        }

                        var r = t("./util"), i = t("./es5").keys, o = r.tryCatch, a = r.errorObj;
                        return n
                    }
                }, {"./es5": 13, "./util": 36}], 8: [function (t, e, n) {
                    "use strict";
                    e.exports = function (t) {
                        function e() {
                            this._trace = new e.CapturedTrace(r())
                        }

                        function n() {
                            if (i) return new e
                        }

                        function r() {
                            var t = o.length - 1;
                            if (t >= 0) return o[t]
                        }

                        var i = !1, o = [];
                        return t.prototype._promiseCreated = function () {
                        }, t.prototype._pushContext = function () {
                        }, t.prototype._popContext = function () {
                            return null
                        }, t._peekContext = t.prototype._peekContext = function () {
                        }, e.prototype._pushContext = function () {
                            void 0 !== this._trace && (this._trace._promiseCreated = null, o.push(this._trace))
                        }, e.prototype._popContext = function () {
                            if (void 0 !== this._trace) {
                                var t = o.pop(), e = t._promiseCreated;
                                return t._promiseCreated = null, e
                            }
                            return null
                        }, e.CapturedTrace = null, e.create = n, e.deactivateLongStackTraces = function () {
                        }, e.activateLongStackTraces = function () {
                            var n = t.prototype._pushContext, o = t.prototype._popContext, a = t._peekContext,
                                s = t.prototype._peekContext, c = t.prototype._promiseCreated;
                            e.deactivateLongStackTraces = function () {
                                t.prototype._pushContext = n, t.prototype._popContext = o, t._peekContext = a, t.prototype._peekContext = s, t.prototype._promiseCreated = c, i = !1
                            }, i = !0, t.prototype._pushContext = e.prototype._pushContext, t.prototype._popContext = e.prototype._popContext, t._peekContext = t.prototype._peekContext = r, t.prototype._promiseCreated = function () {
                                var t = this._peekContext();
                                t && null == t._promiseCreated && (t._promiseCreated = this)
                            }
                        }, e
                    }
                }, {}], 9: [function (t, n, r) {
                    "use strict";
                    n.exports = function (n, r) {
                        function i(t, e) {
                            return {promise: e}
                        }

                        function o() {
                            return !1
                        }

                        function a(t, e, n) {
                            var r = this;
                            try {
                                t(e, n, function (t) {
                                    if ("function" != typeof t) throw new TypeError("onCancel must be a function, got: " + B.toString(t));
                                    r._attachCancellationCallback(t)
                                })
                            } catch (t) {
                                return t
                            }
                        }

                        function s(t) {
                            if (!this._isCancellable()) return this;
                            var e = this._onCancel();
                            void 0 !== e ? B.isArray(e) ? e.push(t) : this._setOnCancel([e, t]) : this._setOnCancel(t)
                        }

                        function c() {
                            return this._onCancelField
                        }

                        function u(t) {
                            this._onCancelField = t
                        }

                        function l() {
                            this._cancellationParent = void 0, this._onCancelField = void 0
                        }

                        function h(t, e) {
                            if (0 != (1 & e)) {
                                this._cancellationParent = t;
                                var n = t._branchesRemainingToCancel;
                                void 0 === n && (n = 0), t._branchesRemainingToCancel = n + 1
                            }
                            0 != (2 & e) && t._isBound() && this._setBoundTo(t._boundTo)
                        }

                        function f(t, e) {
                            0 != (2 & e) && t._isBound() && this._setBoundTo(t._boundTo)
                        }

                        function p() {
                            var t = this._boundTo;
                            return void 0 !== t && t instanceof n ? t.isFulfilled() ? t.value() : void 0 : t
                        }

                        function d() {
                            this._trace = new A(this._peekContext())
                        }

                        function m(t, e) {
                            if (V(t)) {
                                var n = this._trace;
                                if (void 0 !== n && e && (n = n._parent), void 0 !== n) n.attachExtraTrace(t); else if (!t.__stackCleaned__) {
                                    var r = R(t);
                                    B.notEnumerableProp(t, "stack", r.message + "\n" + r.stack.join("\n")), B.notEnumerableProp(t, "__stackCleaned__", !0)
                                }
                            }
                        }

                        function v() {
                            this._trace = void 0
                        }

                        function g(t, e, n, r, i) {
                            if (void 0 === t && null !== e && K) {
                                if (void 0 !== i && i._returnedNonUndefined()) return;
                                if (0 == (65535 & r._bitField)) return;
                                n && (n += " ");
                                var o = "", a = "";
                                if (e._trace) {
                                    for (var s = e._trace.stack.split("\n"), c = x(s), u = c.length - 1; u >= 0; --u) {
                                        var l = c[u];
                                        if (!G.test(l)) {
                                            var h = l.match(W);
                                            h && (o = "at " + h[1] + ":" + h[2] + ":" + h[3] + " ");
                                            break
                                        }
                                    }
                                    if (c.length > 0) for (var f = c[0], u = 0; u < s.length; ++u) if (s[u] === f) {
                                        u > 0 && (a = "\n" + s[u - 1]);
                                        break
                                    }
                                }
                                var p = "a promise was created in a " + n + "handler " + o + "but was not returned from it, see http://goo.gl/rRqMUw" + a;
                                r._warn(p, !0, e)
                            }
                        }

                        function y(t, e) {
                            var n = t + " is deprecated and will be removed in a future version.";
                            return e && (n += " Use " + e + " instead."), _(n)
                        }

                        function _(t, e, r) {
                            if (ct.warnings) {
                                var i, o = new N(t);
                                if (e) r._attachExtraTrace(o); else if (ct.longStackTraces && (i = n._peekContext())) i.attachExtraTrace(o); else {
                                    var a = R(o);
                                    o.stack = a.message + "\n" + a.stack.join("\n")
                                }
                                rt("warning", o) || M(o, "", !0)
                            }
                        }

                        function b(t, e) {
                            for (var n = 0; n < e.length - 1; ++n) e[n].push("From previous event:"), e[n] = e[n].join("\n");
                            return n < e.length && (e[n] = e[n].join("\n")), t + "\n" + e.join("\n")
                        }

                        function E(t) {
                            for (var e = 0; e < t.length; ++e) (0 === t[e].length || e + 1 < t.length && t[e][0] === t[e + 1][0]) && (t.splice(e, 1), e--)
                        }

                        function w(t) {
                            for (var e = t[0], n = 1; n < t.length; ++n) {
                                for (var r = t[n], i = e.length - 1, o = e[i], a = -1, s = r.length - 1; s >= 0; --s) if (r[s] === o) {
                                    a = s;
                                    break
                                }
                                for (var s = a; s >= 0; --s) {
                                    var c = r[s];
                                    if (e[i] !== c) break;
                                    e.pop(), i--
                                }
                                e = r
                            }
                        }

                        function x(t) {
                            for (var e = [], n = 0; n < t.length; ++n) {
                                var r = t[n], i = "    (No stack trace)" === r || $.test(r), o = i && ot(r);
                                i && !o && (Y && " " !== r.charAt(0) && (r = "    " + r), e.push(r))
                            }
                            return e
                        }

                        function T(t) {
                            for (var e = t.stack.replace(/\s+$/g, "").split("\n"), n = 0; n < e.length; ++n) {
                                var r = e[n];
                                if ("    (No stack trace)" === r || $.test(r)) break
                            }
                            return n > 0 && "SyntaxError" != t.name && (e = e.slice(n)), e
                        }

                        function R(t) {
                            var e = t.stack, n = t.toString();
                            return e = "string" == typeof e && e.length > 0 ? T(t) : ["    (No stack trace)"], {
                                message: n,
                                stack: "SyntaxError" == t.name ? e : x(e)
                            }
                        }

                        function M(t, e, n) {
                            if ("undefined" != typeof console) {
                                var r;
                                if (B.isObject(t)) {
                                    var i = t.stack;
                                    r = e + q(i, t)
                                } else r = e + String(t);
                                "function" == typeof L ? L(r, n) : "function" != typeof console.log && "object" != typeof console.log || console.log(r)
                            }
                        }

                        function P(t, e, n, r) {
                            var i = !1;
                            try {
                                "function" == typeof e && (i = !0, "rejectionHandled" === t ? e(r) : e(n, r))
                            } catch (t) {
                                I.throwLater(t)
                            }
                            "unhandledRejection" === t ? rt(t, n, r) || i || M(n, "Unhandled rejection ") : rt(t, r)
                        }

                        function C(t) {
                            var e;
                            if ("function" == typeof t) e = "[function " + (t.name || "anonymous") + "]"; else {
                                e = t && "function" == typeof t.toString ? t.toString() : B.toString(t);
                                if (/\[object [a-zA-Z0-9$_]+\]/.test(e)) try {
                                    e = JSON.stringify(t)
                                } catch (t) {
                                }
                                0 === e.length && (e = "(empty array)")
                            }
                            return "(<" + S(e) + ">, no stack trace)"
                        }

                        function S(t) {
                            return t.length < 41 ? t : t.substr(0, 38) + "..."
                        }

                        function O() {
                            return "function" == typeof st
                        }

                        function j(t) {
                            var e = t.match(at);
                            if (e) return {fileName: e[1], line: parseInt(e[2], 10)}
                        }

                        function k(t, e) {
                            if (O()) {
                                for (var n, r, i = t.stack.split("\n"), o = e.stack.split("\n"), a = -1, s = -1, c = 0; c < i.length; ++c) {
                                    var u = j(i[c]);
                                    if (u) {
                                        n = u.fileName, a = u.line;
                                        break
                                    }
                                }
                                for (var c = 0; c < o.length; ++c) {
                                    var u = j(o[c]);
                                    if (u) {
                                        r = u.fileName, s = u.line;
                                        break
                                    }
                                }
                                a < 0 || s < 0 || !n || !r || n !== r || a >= s || (ot = function (t) {
                                    if (z.test(t)) return !0;
                                    var e = j(t);
                                    return !!(e && e.fileName === n && a <= e.line && e.line <= s)
                                })
                            }
                        }

                        function A(t) {
                            this._parent = t, this._promisesCreated = 0;
                            var e = this._length = 1 + (void 0 === t ? 0 : t._length);
                            st(this, A), e > 32 && this.uncycle()
                        }

                        var F, H, L, D = n._getDomain, I = n._async, N = t("./errors").Warning, B = t("./util"),
                            U = t("./es5"), V = B.canAttachTrace,
                            z = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,
                            G = /\((?:timers\.js):\d+:\d+\)/, W = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/, $ = null, q = null,
                            Y = !1, X = !(0 == B.env("BLUEBIRD_DEBUG")),
                            Q = !(0 == B.env("BLUEBIRD_WARNINGS") || !X && !B.env("BLUEBIRD_WARNINGS")),
                            Z = !(0 == B.env("BLUEBIRD_LONG_STACK_TRACES") || !X && !B.env("BLUEBIRD_LONG_STACK_TRACES")),
                            K = 0 != B.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (Q || !!B.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
                        n.prototype.suppressUnhandledRejections = function () {
                            var t = this._target();
                            t._bitField = -1048577 & t._bitField | 524288
                        }, n.prototype._ensurePossibleRejectionHandled = function () {
                            if (0 == (524288 & this._bitField)) {
                                this._setRejectionIsUnhandled();
                                var t = this;
                                setTimeout(function () {
                                    t._notifyUnhandledRejection()
                                }, 1)
                            }
                        }, n.prototype._notifyUnhandledRejectionIsHandled = function () {
                            P("rejectionHandled", F, void 0, this)
                        }, n.prototype._setReturnedNonUndefined = function () {
                            this._bitField = 268435456 | this._bitField
                        }, n.prototype._returnedNonUndefined = function () {
                            return 0 != (268435456 & this._bitField)
                        }, n.prototype._notifyUnhandledRejection = function () {
                            if (this._isRejectionUnhandled()) {
                                var t = this._settledValue();
                                this._setUnhandledRejectionIsNotified(), P("unhandledRejection", H, t, this)
                            }
                        }, n.prototype._setUnhandledRejectionIsNotified = function () {
                            this._bitField = 262144 | this._bitField
                        }, n.prototype._unsetUnhandledRejectionIsNotified = function () {
                            this._bitField = -262145 & this._bitField
                        }, n.prototype._isUnhandledRejectionNotified = function () {
                            return (262144 & this._bitField) > 0
                        }, n.prototype._setRejectionIsUnhandled = function () {
                            this._bitField = 1048576 | this._bitField
                        }, n.prototype._unsetRejectionIsUnhandled = function () {
                            this._bitField = -1048577 & this._bitField, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled())
                        }, n.prototype._isRejectionUnhandled = function () {
                            return (1048576 & this._bitField) > 0
                        }, n.prototype._warn = function (t, e, n) {
                            return _(t, e, n || this)
                        }, n.onPossiblyUnhandledRejection = function (t) {
                            var e = D();
                            H = "function" == typeof t ? null === e ? t : B.domainBind(e, t) : void 0
                        }, n.onUnhandledRejectionHandled = function (t) {
                            var e = D();
                            F = "function" == typeof t ? null === e ? t : B.domainBind(e, t) : void 0
                        };
                        var J = function () {
                        };
                        n.longStackTraces = function () {
                            if (I.haveItemsQueued() && !ct.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                            if (!ct.longStackTraces && O()) {
                                var t = n.prototype._captureStackTrace, e = n.prototype._attachExtraTrace,
                                    i = n.prototype._dereferenceTrace;
                                ct.longStackTraces = !0, J = function () {
                                    if (I.haveItemsQueued() && !ct.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                                    n.prototype._captureStackTrace = t, n.prototype._attachExtraTrace = e, n.prototype._dereferenceTrace = i, r.deactivateLongStackTraces(), I.enableTrampoline(), ct.longStackTraces = !1
                                }, n.prototype._captureStackTrace = d, n.prototype._attachExtraTrace = m, n.prototype._dereferenceTrace = v, r.activateLongStackTraces(), I.disableTrampolineIfNecessary()
                            }
                        }, n.hasLongStackTraces = function () {
                            return ct.longStackTraces && O()
                        };
                        var tt = function () {
                            try {
                                if ("function" == typeof CustomEvent) {
                                    var t = new CustomEvent("CustomEvent");
                                    return B.global.dispatchEvent(t), function (t, e) {
                                        var n = {detail: e, cancelable: !0};
                                        U.defineProperty(n, "promise", {value: e.promise}), U.defineProperty(n, "reason", {value: e.reason});
                                        var r = new CustomEvent(t.toLowerCase(), n);
                                        return !B.global.dispatchEvent(r)
                                    }
                                }
                                if ("function" == typeof Event) {
                                    var t = new Event("CustomEvent");
                                    return B.global.dispatchEvent(t), function (t, e) {
                                        var n = new Event(t.toLowerCase(), {cancelable: !0});
                                        return n.detail = e, U.defineProperty(n, "promise", {value: e.promise}), U.defineProperty(n, "reason", {value: e.reason}), !B.global.dispatchEvent(n)
                                    }
                                }
                                var t = document.createEvent("CustomEvent");
                                return t.initCustomEvent("testingtheevent", !1, !0, {}), B.global.dispatchEvent(t), function (t, e) {
                                    var n = document.createEvent("CustomEvent");
                                    return n.initCustomEvent(t.toLowerCase(), !1, !0, e), !B.global.dispatchEvent(n)
                                }
                            } catch (t) {
                            }
                            return function () {
                                return !1
                            }
                        }(), et = function () {
                            return B.isNode ? function () {
                                return e.emit.apply(e, arguments)
                            } : B.global ? function (t) {
                                var e = "on" + t.toLowerCase(), n = B.global[e];
                                return !!n && (n.apply(B.global, [].slice.call(arguments, 1)), !0)
                            } : function () {
                                return !1
                            }
                        }(), nt = {
                            promiseCreated: i,
                            promiseFulfilled: i,
                            promiseRejected: i,
                            promiseResolved: i,
                            promiseCancelled: i,
                            promiseChained: function (t, e, n) {
                                return {promise: e, child: n}
                            },
                            warning: function (t, e) {
                                return {warning: e}
                            },
                            unhandledRejection: function (t, e, n) {
                                return {reason: e, promise: n}
                            },
                            rejectionHandled: i
                        }, rt = function (t) {
                            var e = !1;
                            try {
                                e = et.apply(null, arguments)
                            } catch (t) {
                                I.throwLater(t), e = !0
                            }
                            var n = !1;
                            try {
                                n = tt(t, nt[t].apply(null, arguments))
                            } catch (t) {
                                I.throwLater(t), n = !0
                            }
                            return n || e
                        };
                        n.config = function (t) {
                            if (t = Object(t), "longStackTraces" in t && (t.longStackTraces ? n.longStackTraces() : !t.longStackTraces && n.hasLongStackTraces() && J()), "warnings" in t) {
                                var e = t.warnings;
                                ct.warnings = !!e, K = ct.warnings, B.isObject(e) && "wForgottenReturn" in e && (K = !!e.wForgottenReturn)
                            }
                            if ("cancellation" in t && t.cancellation && !ct.cancellation) {
                                if (I.haveItemsQueued()) throw new Error("cannot enable cancellation after promises are in use");
                                n.prototype._clearCancellationData = l, n.prototype._propagateFrom = h, n.prototype._onCancel = c, n.prototype._setOnCancel = u, n.prototype._attachCancellationCallback = s, n.prototype._execute = a, it = h, ct.cancellation = !0
                            }
                            return "monitoring" in t && (t.monitoring && !ct.monitoring ? (ct.monitoring = !0, n.prototype._fireEvent = rt) : !t.monitoring && ct.monitoring && (ct.monitoring = !1, n.prototype._fireEvent = o)), n
                        }, n.prototype._fireEvent = o, n.prototype._execute = function (t, e, n) {
                            try {
                                t(e, n)
                            } catch (t) {
                                return t
                            }
                        }, n.prototype._onCancel = function () {
                        }, n.prototype._setOnCancel = function (t) {
                        }, n.prototype._attachCancellationCallback = function (t) {
                        }, n.prototype._captureStackTrace = function () {
                        }, n.prototype._attachExtraTrace = function () {
                        }, n.prototype._dereferenceTrace = function () {
                        }, n.prototype._clearCancellationData = function () {
                        }, n.prototype._propagateFrom = function (t, e) {
                        };
                        var it = f, ot = function () {
                            return !1
                        }, at = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
                        B.inherits(A, Error), r.CapturedTrace = A, A.prototype.uncycle = function () {
                            var t = this._length;
                            if (!(t < 2)) {
                                for (var e = [], n = {}, r = 0, i = this; void 0 !== i; ++r) e.push(i), i = i._parent;
                                t = this._length = r;
                                for (var r = t - 1; r >= 0; --r) {
                                    var o = e[r].stack;
                                    void 0 === n[o] && (n[o] = r)
                                }
                                for (var r = 0; r < t; ++r) {
                                    var a = e[r].stack, s = n[a];
                                    if (void 0 !== s && s !== r) {
                                        s > 0 && (e[s - 1]._parent = void 0, e[s - 1]._length = 1), e[r]._parent = void 0, e[r]._length = 1;
                                        var c = r > 0 ? e[r - 1] : this;
                                        s < t - 1 ? (c._parent = e[s + 1], c._parent.uncycle(), c._length = c._parent._length + 1) : (c._parent = void 0, c._length = 1);
                                        for (var u = c._length + 1, l = r - 2; l >= 0; --l) e[l]._length = u, u++;
                                        return
                                    }
                                }
                            }
                        }, A.prototype.attachExtraTrace = function (t) {
                            if (!t.__stackCleaned__) {
                                this.uncycle();
                                for (var e = R(t), n = e.message, r = [e.stack], i = this; void 0 !== i;) r.push(x(i.stack.split("\n"))), i = i._parent;
                                w(r), E(r), B.notEnumerableProp(t, "stack", b(n, r)), B.notEnumerableProp(t, "__stackCleaned__", !0)
                            }
                        };
                        var st = function () {
                            var t = /^\s*at\s*/, e = function (t, e) {
                                return "string" == typeof t ? t : void 0 !== e.name && void 0 !== e.message ? e.toString() : C(e)
                            };
                            if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                                Error.stackTraceLimit += 6, $ = t, q = e;
                                var n = Error.captureStackTrace;
                                return ot = function (t) {
                                    return z.test(t)
                                }, function (t, e) {
                                    Error.stackTraceLimit += 6, n(t, e), Error.stackTraceLimit -= 6
                                }
                            }
                            var r = new Error;
                            if ("string" == typeof r.stack && r.stack.split("\n")[0].indexOf("stackDetection@") >= 0) return $ = /@/, q = e, Y = !0, function (t) {
                                t.stack = (new Error).stack
                            };
                            var i;
                            try {
                                throw new Error
                            } catch (t) {
                                i = "stack" in t
                            }
                            return "stack" in r || !i || "number" != typeof Error.stackTraceLimit ? (q = function (t, e) {
                                return "string" == typeof t ? t : "object" != typeof e && "function" != typeof e || void 0 === e.name || void 0 === e.message ? C(e) : e.toString()
                            }, null) : ($ = t, q = e, function (t) {
                                Error.stackTraceLimit += 6;
                                try {
                                    throw new Error
                                } catch (e) {
                                    t.stack = e.stack
                                }
                                Error.stackTraceLimit -= 6
                            })
                        }();
                        "undefined" != typeof console && void 0 !== console.warn && (L = function (t) {
                            console.warn(t)
                        }, B.isNode && e.stderr.isTTY ? L = function (t, e) {
                            var n = e ? "[33m" : "[31m";
                            console.warn(n + t + "[0m\n")
                        } : B.isNode || "string" != typeof (new Error).stack || (L = function (t, e) {
                            console.warn("%c" + t, e ? "color: darkorange" : "color: red")
                        }));
                        var ct = {warnings: Q, longStackTraces: !1, cancellation: !1, monitoring: !1};
                        return Z && n.longStackTraces(), {
                            longStackTraces: function () {
                                return ct.longStackTraces
                            },
                            warnings: function () {
                                return ct.warnings
                            },
                            cancellation: function () {
                                return ct.cancellation
                            },
                            monitoring: function () {
                                return ct.monitoring
                            },
                            propagateFromFunction: function () {
                                return it
                            },
                            boundValueFunction: function () {
                                return p
                            },
                            checkForgottenReturns: g,
                            setBounds: k,
                            warn: _,
                            deprecated: y,
                            CapturedTrace: A,
                            fireDomEvent: tt,
                            fireGlobalEvent: et
                        }
                    }
                }, {"./errors": 12, "./es5": 13, "./util": 36}], 10: [function (t, e, n) {
                    "use strict";
                    e.exports = function (t) {
                        function e() {
                            return this.value
                        }

                        function n() {
                            throw this.reason
                        }

                        t.prototype.return = t.prototype.thenReturn = function (n) {
                            return n instanceof t && n.suppressUnhandledRejections(), this._then(e, void 0, void 0, {value: n}, void 0)
                        }, t.prototype.throw = t.prototype.thenThrow = function (t) {
                            return this._then(n, void 0, void 0, {reason: t}, void 0)
                        }, t.prototype.catchThrow = function (t) {
                            if (arguments.length <= 1) return this._then(void 0, n, void 0, {reason: t}, void 0);
                            var e = arguments[1], r = function () {
                                throw e
                            };
                            return this.caught(t, r)
                        }, t.prototype.catchReturn = function (n) {
                            if (arguments.length <= 1) return n instanceof t && n.suppressUnhandledRejections(), this._then(void 0, e, void 0, {value: n}, void 0);
                            var r = arguments[1];
                            r instanceof t && r.suppressUnhandledRejections();
                            var i = function () {
                                return r
                            };
                            return this.caught(n, i)
                        }
                    }
                }, {}], 11: [function (t, e, n) {
                    "use strict";
                    e.exports = function (t, e) {
                        function n() {
                            return o(this)
                        }

                        function r(t, n) {
                            return i(t, n, e, e)
                        }

                        var i = t.reduce, o = t.all;
                        t.prototype.each = function (t) {
                            return i(this, t, e, 0)._then(n, void 0, void 0, this, void 0)
                        }, t.prototype.mapSeries = function (t) {
                            return i(this, t, e, e)
                        }, t.each = function (t, r) {
                            return i(t, r, e, 0)._then(n, void 0, void 0, t, void 0)
                        }, t.mapSeries = r
                    }
                }, {}], 12: [function (t, e, n) {
                    "use strict";

                    function r(t, e) {
                        function n(r) {
                            if (!(this instanceof n)) return new n(r);
                            h(this, "message", "string" == typeof r ? r : e), h(this, "name", t), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this)
                        }

                        return l(n, Error), n
                    }

                    function i(t) {
                        if (!(this instanceof i)) return new i(t);
                        h(this, "name", "OperationalError"), h(this, "message", t), this.cause = t, this.isOperational = !0, t instanceof Error ? (h(this, "message", t.message), h(this, "stack", t.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
                    }

                    var o, a, s = t("./es5"), c = s.freeze, u = t("./util"), l = u.inherits, h = u.notEnumerableProp,
                        f = r("Warning", "warning"), p = r("CancellationError", "cancellation error"),
                        d = r("TimeoutError", "timeout error"), m = r("AggregateError", "aggregate error");
                    try {
                        o = TypeError, a = RangeError
                    } catch (t) {
                        o = r("TypeError", "type error"), a = r("RangeError", "range error")
                    }
                    for (var v = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), g = 0; g < v.length; ++g) "function" == typeof Array.prototype[v[g]] && (m.prototype[v[g]] = Array.prototype[v[g]]);
                    s.defineProperty(m.prototype, "length", {
                        value: 0,
                        configurable: !1,
                        writable: !0,
                        enumerable: !0
                    }), m.prototype.isOperational = !0;
                    var y = 0;
                    m.prototype.toString = function () {
                        var t = Array(4 * y + 1).join(" "), e = "\n" + t + "AggregateError of:\n";
                        y++, t = Array(4 * y + 1).join(" ");
                        for (var n = 0; n < this.length; ++n) {
                            for (var r = this[n] === this ? "[Circular AggregateError]" : this[n] + "", i = r.split("\n"), o = 0; o < i.length; ++o) i[o] = t + i[o];
                            r = i.join("\n"), e += r + "\n"
                        }
                        return y--, e
                    }, l(i, Error);
                    var _ = Error.__BluebirdErrorTypes__;
                    _ || (_ = c({
                        CancellationError: p,
                        TimeoutError: d,
                        OperationalError: i,
                        RejectionError: i,
                        AggregateError: m
                    }), s.defineProperty(Error, "__BluebirdErrorTypes__", {
                        value: _,
                        writable: !1,
                        enumerable: !1,
                        configurable: !1
                    })), e.exports = {
                        Error: Error,
                        TypeError: o,
                        RangeError: a,
                        CancellationError: _.CancellationError,
                        OperationalError: _.OperationalError,
                        TimeoutError: _.TimeoutError,
                        AggregateError: _.AggregateError,
                        Warning: f
                    }
                }, {"./es5": 13, "./util": 36}], 13: [function (t, e, n) {
                    var r = function () {
                        "use strict";
                        return void 0 === this
                    }();
                    if (r) e.exports = {
                        freeze: Object.freeze,
                        defineProperty: Object.defineProperty,
                        getDescriptor: Object.getOwnPropertyDescriptor,
                        keys: Object.keys,
                        names: Object.getOwnPropertyNames,
                        getPrototypeOf: Object.getPrototypeOf,
                        isArray: Array.isArray,
                        isES5: r,
                        propertyIsWritable: function (t, e) {
                            var n = Object.getOwnPropertyDescriptor(t, e);
                            return !(n && !n.writable && !n.set)
                        }
                    }; else {
                        var i = {}.hasOwnProperty, o = {}.toString, a = {}.constructor.prototype, s = function (t) {
                            var e = [];
                            for (var n in t) i.call(t, n) && e.push(n);
                            return e
                        }, c = function (t, e) {
                            return {value: t[e]}
                        }, u = function (t, e, n) {
                            return t[e] = n.value, t
                        }, l = function (t) {
                            return t
                        }, h = function (t) {
                            try {
                                return Object(t).constructor.prototype
                            } catch (t) {
                                return a
                            }
                        }, f = function (t) {
                            try {
                                return "[object Array]" === o.call(t)
                            } catch (t) {
                                return !1
                            }
                        };
                        e.exports = {
                            isArray: f,
                            keys: s,
                            names: s,
                            defineProperty: u,
                            getDescriptor: c,
                            freeze: l,
                            getPrototypeOf: h,
                            isES5: r,
                            propertyIsWritable: function () {
                                return !0
                            }
                        }
                    }
                }, {}], 14: [function (t, e, n) {
                    "use strict";
                    e.exports = function (t, e) {
                        var n = t.map;
                        t.prototype.filter = function (t, r) {
                            return n(this, t, r, e)
                        }, t.filter = function (t, r, i) {
                            return n(t, r, i, e)
                        }
                    }
                }, {}], 15: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r) {
                        function i(t, e, n) {
                            this.promise = t, this.type = e, this.handler = n, this.called = !1, this.cancelPromise = null
                        }

                        function o(t) {
                            this.finallyHandler = t
                        }

                        function a(t, e) {
                            return null != t.cancelPromise && (arguments.length > 1 ? t.cancelPromise._reject(e) : t.cancelPromise._cancel(), t.cancelPromise = null, !0)
                        }

                        function s() {
                            return u.call(this, this.promise._target()._settledValue())
                        }

                        function c(t) {
                            if (!a(this, t)) return f.e = t, f
                        }

                        function u(t) {
                            var i = this.promise, u = this.handler;
                            if (!this.called) {
                                this.called = !0;
                                var l = this.isFinallyHandler() ? u.call(i._boundValue()) : u.call(i._boundValue(), t);
                                if (l === r) return l;
                                if (void 0 !== l) {
                                    i._setReturnedNonUndefined();
                                    var p = n(l, i);
                                    if (p instanceof e) {
                                        if (null != this.cancelPromise) {
                                            if (p._isCancelled()) {
                                                var d = new h("late cancellation observer");
                                                return i._attachExtraTrace(d), f.e = d, f
                                            }
                                            p.isPending() && p._attachCancellationCallback(new o(this))
                                        }
                                        return p._then(s, c, void 0, this, void 0)
                                    }
                                }
                            }
                            return i.isRejected() ? (a(this), f.e = t, f) : (a(this), t)
                        }

                        var l = t("./util"), h = e.CancellationError, f = l.errorObj, p = t("./catch_filter")(r);
                        return i.prototype.isFinallyHandler = function () {
                            return 0 === this.type
                        }, o.prototype._resultCancelled = function () {
                            a(this.finallyHandler)
                        }, e.prototype._passThrough = function (t, e, n, r) {
                            return "function" != typeof t ? this.then() : this._then(n, r, void 0, new i(this, e, t), void 0)
                        }, e.prototype.lastly = e.prototype.finally = function (t) {
                            return this._passThrough(t, 0, u, u)
                        }, e.prototype.tap = function (t) {
                            return this._passThrough(t, 1, u)
                        }, e.prototype.tapCatch = function (t) {
                            var n = arguments.length;
                            if (1 === n) return this._passThrough(t, 1, void 0, u);
                            var r, i = new Array(n - 1), o = 0;
                            for (r = 0; r < n - 1; ++r) {
                                var a = arguments[r];
                                if (!l.isObject(a)) return e.reject(new TypeError("tapCatch statement predicate: expecting an object but got " + l.classString(a)));
                                i[o++] = a
                            }
                            i.length = o;
                            var s = arguments[r];
                            return this._passThrough(p(i, s, this), 1, void 0, u)
                        }, i
                    }
                }, {"./catch_filter": 7, "./util": 36}], 16: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r, i, o, a) {
                        function s(t, n, r) {
                            for (var o = 0; o < n.length; ++o) {
                                r._pushContext();
                                var a = p(n[o])(t);
                                if (r._popContext(), a === f) {
                                    r._pushContext();
                                    var s = e.reject(f.e);
                                    return r._popContext(), s
                                }
                                var c = i(a, r);
                                if (c instanceof e) return c
                            }
                            return null
                        }

                        function c(t, n, i, o) {
                            if (a.cancellation()) {
                                var s = new e(r), c = this._finallyPromise = new e(r);
                                this._promise = s.lastly(function () {
                                    return c
                                }), s._captureStackTrace(), s._setOnCancel(this)
                            } else {
                                (this._promise = new e(r))._captureStackTrace()
                            }
                            this._stack = o, this._generatorFunction = t, this._receiver = n, this._generator = void 0, this._yieldHandlers = "function" == typeof i ? [i].concat(d) : d, this._yieldedPromise = null, this._cancellationPhase = !1
                        }

                        var u = t("./errors"), l = u.TypeError, h = t("./util"), f = h.errorObj, p = h.tryCatch, d = [];
                        h.inherits(c, o), c.prototype._isResolved = function () {
                            return null === this._promise
                        }, c.prototype._cleanup = function () {
                            this._promise = this._generator = null, a.cancellation() && null !== this._finallyPromise && (this._finallyPromise._fulfill(), this._finallyPromise = null)
                        }, c.prototype._promiseCancelled = function () {
                            if (!this._isResolved()) {
                                var t, n = void 0 !== this._generator.return;
                                if (n) this._promise._pushContext(), t = p(this._generator.return).call(this._generator, void 0), this._promise._popContext(); else {
                                    var r = new e.CancellationError("generator .return() sentinel");
                                    e.coroutine.returnSentinel = r, this._promise._attachExtraTrace(r), this._promise._pushContext(), t = p(this._generator.throw).call(this._generator, r), this._promise._popContext()
                                }
                                this._cancellationPhase = !0, this._yieldedPromise = null, this._continue(t)
                            }
                        }, c.prototype._promiseFulfilled = function (t) {
                            this._yieldedPromise = null, this._promise._pushContext();
                            var e = p(this._generator.next).call(this._generator, t);
                            this._promise._popContext(), this._continue(e)
                        }, c.prototype._promiseRejected = function (t) {
                            this._yieldedPromise = null, this._promise._attachExtraTrace(t), this._promise._pushContext();
                            var e = p(this._generator.throw).call(this._generator, t);
                            this._promise._popContext(), this._continue(e)
                        }, c.prototype._resultCancelled = function () {
                            if (this._yieldedPromise instanceof e) {
                                var t = this._yieldedPromise;
                                this._yieldedPromise = null, t.cancel()
                            }
                        }, c.prototype.promise = function () {
                            return this._promise
                        }, c.prototype._run = function () {
                            this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._promiseFulfilled(void 0)
                        }, c.prototype._continue = function (t) {
                            var n = this._promise;
                            if (t === f) return this._cleanup(), this._cancellationPhase ? n.cancel() : n._rejectCallback(t.e, !1);
                            var r = t.value;
                            if (!0 === t.done) return this._cleanup(), this._cancellationPhase ? n.cancel() : n._resolveCallback(r);
                            var o = i(r, this._promise);
                            if (!(o instanceof e) && null === (o = s(o, this._yieldHandlers, this._promise))) return void this._promiseRejected(new l("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(r)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
                            o = o._target();
                            var a = o._bitField;
                            0 == (50397184 & a) ? (this._yieldedPromise = o, o._proxy(this, null)) : 0 != (33554432 & a) ? e._async.invoke(this._promiseFulfilled, this, o._value()) : 0 != (16777216 & a) ? e._async.invoke(this._promiseRejected, this, o._reason()) : this._promiseCancelled()
                        }, e.coroutine = function (t, e) {
                            if ("function" != typeof t) throw new l("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                            var n = Object(e).yieldHandler, r = c, i = (new Error).stack;
                            return function () {
                                var e = t.apply(this, arguments), o = new r(void 0, void 0, n, i), a = o.promise();
                                return o._generator = e, o._promiseFulfilled(void 0), a
                            }
                        }, e.coroutine.addYieldHandler = function (t) {
                            if ("function" != typeof t) throw new l("expecting a function but got " + h.classString(t));
                            d.push(t)
                        }, e.spawn = function (t) {
                            if (a.deprecated("Promise.spawn()", "Promise.coroutine()"), "function" != typeof t) return n("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                            var r = new c(t, this), i = r.promise();
                            return r._run(e.spawn), i
                        }
                    }
                }, {"./errors": 12, "./util": 36}], 17: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r, i, o, a) {
                        var s = t("./util");
                        s.canEvaluate, s.tryCatch, s.errorObj;
                        e.join = function () {
                            var t, e = arguments.length - 1;
                            if (e > 0 && "function" == typeof arguments[e]) {
                                t = arguments[e];
                                var r
                            }
                            var i = [].slice.call(arguments);
                            t && i.pop();
                            var r = new n(i).promise();
                            return void 0 !== t ? r.spread(t) : r
                        }
                    }
                }, {"./util": 36}], 18: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r, i, o, a) {
                        function s(t, e, n, r) {
                            this.constructor$(t), this._promise._captureStackTrace();
                            var i = u();
                            this._callback = null === i ? e : l.domainBind(i, e), this._preservedValues = r === o ? new Array(this.length()) : null, this._limit = n, this._inFlight = 0, this._queue = [], p.invoke(this._asyncInit, this, void 0)
                        }

                        function c(t, n, i, o) {
                            if ("function" != typeof n) return r("expecting a function but got " + l.classString(n));
                            var a = 0;
                            if (void 0 !== i) {
                                if ("object" != typeof i || null === i) return e.reject(new TypeError("options argument must be an object but it is " + l.classString(i)));
                                if ("number" != typeof i.concurrency) return e.reject(new TypeError("'concurrency' must be a number but it is " + l.classString(i.concurrency)));
                                a = i.concurrency
                            }
                            return a = "number" == typeof a && isFinite(a) && a >= 1 ? a : 0, new s(t, n, a, o).promise()
                        }

                        var u = e._getDomain, l = t("./util"), h = l.tryCatch, f = l.errorObj, p = e._async;
                        l.inherits(s, n), s.prototype._asyncInit = function () {
                            this._init$(void 0, -2)
                        }, s.prototype._init = function () {
                        }, s.prototype._promiseFulfilled = function (t, n) {
                            var r = this._values, o = this.length(), s = this._preservedValues, c = this._limit;
                            if (n < 0) {
                                if (n = -1 * n - 1, r[n] = t, c >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved())) return !0
                            } else {
                                if (c >= 1 && this._inFlight >= c) return r[n] = t, this._queue.push(n), !1;
                                null !== s && (s[n] = t);
                                var u = this._promise, l = this._callback, p = u._boundValue();
                                u._pushContext();
                                var d = h(l).call(p, t, n, o), m = u._popContext();
                                if (a.checkForgottenReturns(d, m, null !== s ? "Promise.filter" : "Promise.map", u), d === f) return this._reject(d.e), !0;
                                var v = i(d, this._promise);
                                if (v instanceof e) {
                                    v = v._target();
                                    var g = v._bitField;
                                    if (0 == (50397184 & g)) return c >= 1 && this._inFlight++, r[n] = v, v._proxy(this, -1 * (n + 1)), !1;
                                    if (0 == (33554432 & g)) return 0 != (16777216 & g) ? (this._reject(v._reason()), !0) : (this._cancel(), !0);
                                    d = v._value()
                                }
                                r[n] = d
                            }
                            return ++this._totalResolved >= o && (null !== s ? this._filter(r, s) : this._resolve(r), !0)
                        }, s.prototype._drainQueue = function () {
                            for (var t = this._queue, e = this._limit, n = this._values; t.length > 0 && this._inFlight < e;) {
                                if (this._isResolved()) return;
                                var r = t.pop();
                                this._promiseFulfilled(n[r], r)
                            }
                        }, s.prototype._filter = function (t, e) {
                            for (var n = e.length, r = new Array(n), i = 0, o = 0; o < n; ++o) t[o] && (r[i++] = e[o]);
                            r.length = i, this._resolve(r)
                        }, s.prototype.preservedValues = function () {
                            return this._preservedValues
                        }, e.prototype.map = function (t, e) {
                            return c(this, t, e, null)
                        }, e.map = function (t, e, n, r) {
                            return c(t, e, n, r)
                        }
                    }
                }, {"./util": 36}], 19: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r, i, o) {
                        var a = t("./util"), s = a.tryCatch;
                        e.method = function (t) {
                            if ("function" != typeof t) throw new e.TypeError("expecting a function but got " + a.classString(t));
                            return function () {
                                var r = new e(n);
                                r._captureStackTrace(), r._pushContext();
                                var i = s(t).apply(this, arguments), a = r._popContext();
                                return o.checkForgottenReturns(i, a, "Promise.method", r), r._resolveFromSyncValue(i), r
                            }
                        }, e.attempt = e.try = function (t) {
                            if ("function" != typeof t) return i("expecting a function but got " + a.classString(t));
                            var r = new e(n);
                            r._captureStackTrace(), r._pushContext();
                            var c;
                            if (arguments.length > 1) {
                                o.deprecated("calling Promise.try with more than 1 argument");
                                var u = arguments[1], l = arguments[2];
                                c = a.isArray(u) ? s(t).apply(l, u) : s(t).call(l, u)
                            } else c = s(t)();
                            var h = r._popContext();
                            return o.checkForgottenReturns(c, h, "Promise.try", r), r._resolveFromSyncValue(c), r
                        }, e.prototype._resolveFromSyncValue = function (t) {
                            t === a.errorObj ? this._rejectCallback(t.e, !1) : this._resolveCallback(t, !0)
                        }
                    }
                }, {"./util": 36}], 20: [function (t, e, n) {
                    "use strict";

                    function r(t) {
                        return t instanceof Error && l.getPrototypeOf(t) === Error.prototype
                    }

                    function i(t) {
                        var e;
                        if (r(t)) {
                            e = new u(t), e.name = t.name, e.message = t.message, e.stack = t.stack;
                            for (var n = l.keys(t), i = 0; i < n.length; ++i) {
                                var o = n[i];
                                h.test(o) || (e[o] = t[o])
                            }
                            return e
                        }
                        return a.markAsOriginatingFromRejection(t), t
                    }

                    function o(t, e) {
                        return function (n, r) {
                            if (null !== t) {
                                if (n) {
                                    var o = i(s(n));
                                    t._attachExtraTrace(o), t._reject(o)
                                } else if (e) {
                                    var a = [].slice.call(arguments, 1);
                                    t._fulfill(a)
                                } else t._fulfill(r);
                                t = null
                            }
                        }
                    }

                    var a = t("./util"), s = a.maybeWrapAsError, c = t("./errors"), u = c.OperationalError,
                        l = t("./es5"), h = /^(?:name|message|stack|cause)$/;
                    e.exports = o
                }, {"./errors": 12, "./es5": 13, "./util": 36}], 21: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e) {
                        function n(t, e) {
                            var n = this;
                            if (!o.isArray(t)) return r.call(n, t, e);
                            var i = s(e).apply(n._boundValue(), [null].concat(t));
                            i === c && a.throwLater(i.e)
                        }

                        function r(t, e) {
                            var n = this, r = n._boundValue(),
                                i = void 0 === t ? s(e).call(r, null) : s(e).call(r, null, t);
                            i === c && a.throwLater(i.e)
                        }

                        function i(t, e) {
                            var n = this;
                            if (!t) {
                                var r = new Error(t + "");
                                r.cause = t, t = r
                            }
                            var i = s(e).call(n._boundValue(), t);
                            i === c && a.throwLater(i.e)
                        }

                        var o = t("./util"), a = e._async, s = o.tryCatch, c = o.errorObj;
                        e.prototype.asCallback = e.prototype.nodeify = function (t, e) {
                            if ("function" == typeof t) {
                                var o = r;
                                void 0 !== e && Object(e).spread && (o = n), this._then(o, i, void 0, this, t)
                            }
                            return this
                        }
                    }
                }, {"./util": 36}], 22: [function (t, n, r) {
                    "use strict";
                    n.exports = function () {
                        function r() {
                        }

                        function i(t, e) {
                            if (null == t || t.constructor !== o) throw new _("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
                            if ("function" != typeof e) throw new _("expecting a function but got " + d.classString(e))
                        }

                        function o(t) {
                            t !== E && i(this, t), this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, this._resolveFromExecutor(t), this._promiseCreated(), this._fireEvent("promiseCreated", this)
                        }

                        function a(t) {
                            this.promise._resolveCallback(t)
                        }

                        function s(t) {
                            this.promise._rejectCallback(t, !1)
                        }

                        function c(t) {
                            var e = new o(E);
                            e._fulfillmentHandler0 = t, e._rejectionHandler0 = t, e._promise0 = t, e._receiver0 = t
                        }

                        var u, l = function () {
                            return new _("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n")
                        }, h = function () {
                            return new o.PromiseInspection(this._target())
                        }, f = function (t) {
                            return o.reject(new _(t))
                        }, p = {}, d = t("./util");
                        u = d.isNode ? function () {
                            var t = e.domain;
                            return void 0 === t && (t = null), t
                        } : function () {
                            return null
                        }, d.notEnumerableProp(o, "_getDomain", u);
                        var m = t("./es5"), v = t("./async"), g = new v;
                        m.defineProperty(o, "_async", {value: g});
                        var y = t("./errors"), _ = o.TypeError = y.TypeError;
                        o.RangeError = y.RangeError;
                        var b = o.CancellationError = y.CancellationError;
                        o.TimeoutError = y.TimeoutError, o.OperationalError = y.OperationalError, o.RejectionError = y.OperationalError, o.AggregateError = y.AggregateError;
                        var E = function () {
                            }, w = {}, x = {}, T = t("./thenables")(o, E), R = t("./promise_array")(o, E, T, f, r),
                            M = t("./context")(o), P = M.create, C = t("./debuggability")(o, M),
                            S = (C.CapturedTrace, t("./finally")(o, T, x)), O = t("./catch_filter")(x),
                            j = t("./nodeback"), k = d.errorObj, A = d.tryCatch;
                        return o.prototype.toString = function () {
                            return "[object Promise]"
                        }, o.prototype.caught = o.prototype.catch = function (t) {
                            var e = arguments.length;
                            if (e > 1) {
                                var n, r = new Array(e - 1), i = 0;
                                for (n = 0; n < e - 1; ++n) {
                                    var o = arguments[n];
                                    if (!d.isObject(o)) return f("Catch statement predicate: expecting an object but got " + d.classString(o));
                                    r[i++] = o
                                }
                                return r.length = i, t = arguments[n], this.then(void 0, O(r, t, this))
                            }
                            return this.then(void 0, t)
                        }, o.prototype.reflect = function () {
                            return this._then(h, h, void 0, this, void 0)
                        }, o.prototype.then = function (t, e) {
                            if (C.warnings() && arguments.length > 0 && "function" != typeof t && "function" != typeof e) {
                                var n = ".then() only accepts functions but was passed: " + d.classString(t);
                                arguments.length > 1 && (n += ", " + d.classString(e)), this._warn(n)
                            }
                            return this._then(t, e, void 0, void 0, void 0)
                        }, o.prototype.done = function (t, e) {
                            this._then(t, e, void 0, void 0, void 0)._setIsFinal()
                        }, o.prototype.spread = function (t) {
                            return "function" != typeof t ? f("expecting a function but got " + d.classString(t)) : this.all()._then(t, void 0, void 0, w, void 0)
                        }, o.prototype.toJSON = function () {
                            var t = {
                                isFulfilled: !1,
                                isRejected: !1,
                                fulfillmentValue: void 0,
                                rejectionReason: void 0
                            };
                            return this.isFulfilled() ? (t.fulfillmentValue = this.value(), t.isFulfilled = !0) : this.isRejected() && (t.rejectionReason = this.reason(), t.isRejected = !0), t
                        }, o.prototype.all = function () {
                            return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), new R(this).promise()
                        }, o.prototype.error = function (t) {
                            return this.caught(d.originatesFromRejection, t)
                        }, o.getNewLibraryCopy = n.exports, o.is = function (t) {
                            return t instanceof o
                        }, o.fromNode = o.fromCallback = function (t) {
                            var e = new o(E);
                            e._captureStackTrace();
                            var n = arguments.length > 1 && !!Object(arguments[1]).multiArgs, r = A(t)(j(e, n));
                            return r === k && e._rejectCallback(r.e, !0), e._isFateSealed() || e._setAsyncGuaranteed(), e
                        }, o.all = function (t) {
                            return new R(t).promise()
                        }, o.cast = function (t) {
                            var e = T(t);
                            return e instanceof o || (e = new o(E), e._captureStackTrace(), e._setFulfilled(), e._rejectionHandler0 = t), e
                        }, o.resolve = o.fulfilled = o.cast, o.reject = o.rejected = function (t) {
                            var e = new o(E);
                            return e._captureStackTrace(), e._rejectCallback(t, !0), e
                        }, o.setScheduler = function (t) {
                            if ("function" != typeof t) throw new _("expecting a function but got " + d.classString(t));
                            return g.setScheduler(t)
                        }, o.prototype._then = function (t, e, n, r, i) {
                            var a = void 0 !== i, s = a ? i : new o(E), c = this._target(), l = c._bitField;
                            a || (s._propagateFrom(this, 3), s._captureStackTrace(), void 0 === r && 0 != (2097152 & this._bitField) && (r = 0 != (50397184 & l) ? this._boundValue() : c === this ? void 0 : this._boundTo), this._fireEvent("promiseChained", this, s));
                            var h = u();
                            if (0 != (50397184 & l)) {
                                var f, p, m = c._settlePromiseCtx;
                                0 != (33554432 & l) ? (p = c._rejectionHandler0, f = t) : 0 != (16777216 & l) ? (p = c._fulfillmentHandler0, f = e, c._unsetRejectionIsUnhandled()) : (m = c._settlePromiseLateCancellationObserver, p = new b("late cancellation observer"), c._attachExtraTrace(p), f = e), g.invoke(m, c, {
                                    handler: null === h ? f : "function" == typeof f && d.domainBind(h, f),
                                    promise: s,
                                    receiver: r,
                                    value: p
                                })
                            } else c._addCallbacks(t, e, s, r, h);
                            return s
                        }, o.prototype._length = function () {
                            return 65535 & this._bitField
                        }, o.prototype._isFateSealed = function () {
                            return 0 != (117506048 & this._bitField)
                        }, o.prototype._isFollowing = function () {
                            return 67108864 == (67108864 & this._bitField)
                        }, o.prototype._setLength = function (t) {
                            this._bitField = -65536 & this._bitField | 65535 & t
                        }, o.prototype._setFulfilled = function () {
                            this._bitField = 33554432 | this._bitField, this._fireEvent("promiseFulfilled", this)
                        }, o.prototype._setRejected = function () {
                            this._bitField = 16777216 | this._bitField, this._fireEvent("promiseRejected", this)
                        }, o.prototype._setFollowing = function () {
                            this._bitField = 67108864 | this._bitField, this._fireEvent("promiseResolved", this)
                        }, o.prototype._setIsFinal = function () {
                            this._bitField = 4194304 | this._bitField
                        }, o.prototype._isFinal = function () {
                            return (4194304 & this._bitField) > 0
                        }, o.prototype._unsetCancelled = function () {
                            this._bitField = -65537 & this._bitField
                        }, o.prototype._setCancelled = function () {
                            this._bitField = 65536 | this._bitField, this._fireEvent("promiseCancelled", this)
                        }, o.prototype._setWillBeCancelled = function () {
                            this._bitField = 8388608 | this._bitField
                        }, o.prototype._setAsyncGuaranteed = function () {
                            g.hasCustomScheduler() || (this._bitField = 134217728 | this._bitField)
                        }, o.prototype._receiverAt = function (t) {
                            var e = 0 === t ? this._receiver0 : this[4 * t - 4 + 3];
                            if (e !== p) return void 0 === e && this._isBound() ? this._boundValue() : e
                        }, o.prototype._promiseAt = function (t) {
                            return this[4 * t - 4 + 2]
                        }, o.prototype._fulfillmentHandlerAt = function (t) {
                            return this[4 * t - 4 + 0]
                        }, o.prototype._rejectionHandlerAt = function (t) {
                            return this[4 * t - 4 + 1]
                        }, o.prototype._boundValue = function () {
                        }, o.prototype._migrateCallback0 = function (t) {
                            var e = (t._bitField, t._fulfillmentHandler0), n = t._rejectionHandler0, r = t._promise0,
                                i = t._receiverAt(0);
                            void 0 === i && (i = p), this._addCallbacks(e, n, r, i, null)
                        }, o.prototype._migrateCallbackAt = function (t, e) {
                            var n = t._fulfillmentHandlerAt(e), r = t._rejectionHandlerAt(e), i = t._promiseAt(e),
                                o = t._receiverAt(e);
                            void 0 === o && (o = p), this._addCallbacks(n, r, i, o, null)
                        }, o.prototype._addCallbacks = function (t, e, n, r, i) {
                            var o = this._length();
                            if (o >= 65531 && (o = 0, this._setLength(0)), 0 === o) this._promise0 = n, this._receiver0 = r, "function" == typeof t && (this._fulfillmentHandler0 = null === i ? t : d.domainBind(i, t)), "function" == typeof e && (this._rejectionHandler0 = null === i ? e : d.domainBind(i, e)); else {
                                var a = 4 * o - 4;
                                this[a + 2] = n, this[a + 3] = r, "function" == typeof t && (this[a + 0] = null === i ? t : d.domainBind(i, t)), "function" == typeof e && (this[a + 1] = null === i ? e : d.domainBind(i, e))
                            }
                            return this._setLength(o + 1), o
                        }, o.prototype._proxy = function (t, e) {
                            this._addCallbacks(void 0, void 0, e, t, null)
                        }, o.prototype._resolveCallback = function (t, e) {
                            if (0 == (117506048 & this._bitField)) {
                                if (t === this) return this._rejectCallback(l(), !1);
                                var n = T(t, this);
                                if (!(n instanceof o)) return this._fulfill(t);
                                e && this._propagateFrom(n, 2);
                                var r = n._target();
                                if (r === this) return void this._reject(l());
                                var i = r._bitField;
                                if (0 == (50397184 & i)) {
                                    var a = this._length();
                                    a > 0 && r._migrateCallback0(this);
                                    for (var s = 1; s < a; ++s) r._migrateCallbackAt(this, s);
                                    this._setFollowing(), this._setLength(0), this._setFollowee(r)
                                } else if (0 != (33554432 & i)) this._fulfill(r._value()); else if (0 != (16777216 & i)) this._reject(r._reason()); else {
                                    var c = new b("late cancellation observer");
                                    r._attachExtraTrace(c), this._reject(c)
                                }
                            }
                        }, o.prototype._rejectCallback = function (t, e, n) {
                            var r = d.ensureErrorObject(t), i = r === t;
                            if (!i && !n && C.warnings()) {
                                var o = "a promise was rejected with a non-error: " + d.classString(t);
                                this._warn(o, !0)
                            }
                            this._attachExtraTrace(r, !!e && i), this._reject(t)
                        }, o.prototype._resolveFromExecutor = function (t) {
                            if (t !== E) {
                                var e = this;
                                this._captureStackTrace(), this._pushContext();
                                var n = !0, r = this._execute(t, function (t) {
                                    e._resolveCallback(t)
                                }, function (t) {
                                    e._rejectCallback(t, n)
                                });
                                n = !1, this._popContext(), void 0 !== r && e._rejectCallback(r, !0)
                            }
                        }, o.prototype._settlePromiseFromHandler = function (t, e, n, r) {
                            var i = r._bitField;
                            if (0 == (65536 & i)) {
                                r._pushContext();
                                var o;
                                e === w ? n && "number" == typeof n.length ? o = A(t).apply(this._boundValue(), n) : (o = k, o.e = new _("cannot .spread() a non-array: " + d.classString(n))) : o = A(t).call(e, n);
                                var a = r._popContext();
                                i = r._bitField, 0 == (65536 & i) && (o === x ? r._reject(n) : o === k ? r._rejectCallback(o.e, !1) : (C.checkForgottenReturns(o, a, "", r, this), r._resolveCallback(o)))
                            }
                        }, o.prototype._target = function () {
                            for (var t = this; t._isFollowing();) t = t._followee();
                            return t
                        }, o.prototype._followee = function () {
                            return this._rejectionHandler0
                        }, o.prototype._setFollowee = function (t) {
                            this._rejectionHandler0 = t
                        }, o.prototype._settlePromise = function (t, e, n, i) {
                            var a = t instanceof o, s = this._bitField, c = 0 != (134217728 & s);
                            0 != (65536 & s) ? (a && t._invokeInternalOnCancel(), n instanceof S && n.isFinallyHandler() ? (n.cancelPromise = t, A(e).call(n, i) === k && t._reject(k.e)) : e === h ? t._fulfill(h.call(n)) : n instanceof r ? n._promiseCancelled(t) : a || t instanceof R ? t._cancel() : n.cancel()) : "function" == typeof e ? a ? (c && t._setAsyncGuaranteed(), this._settlePromiseFromHandler(e, n, i, t)) : e.call(n, i, t) : n instanceof r ? n._isResolved() || (0 != (33554432 & s) ? n._promiseFulfilled(i, t) : n._promiseRejected(i, t)) : a && (c && t._setAsyncGuaranteed(), 0 != (33554432 & s) ? t._fulfill(i) : t._reject(i))
                        }, o.prototype._settlePromiseLateCancellationObserver = function (t) {
                            var e = t.handler, n = t.promise, r = t.receiver, i = t.value;
                            "function" == typeof e ? n instanceof o ? this._settlePromiseFromHandler(e, r, i, n) : e.call(r, i, n) : n instanceof o && n._reject(i)
                        }, o.prototype._settlePromiseCtx = function (t) {
                            this._settlePromise(t.promise, t.handler, t.receiver, t.value)
                        }, o.prototype._settlePromise0 = function (t, e, n) {
                            var r = this._promise0, i = this._receiverAt(0);
                            this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(r, t, i, e)
                        }, o.prototype._clearCallbackDataAtIndex = function (t) {
                            var e = 4 * t - 4;
                            this[e + 2] = this[e + 3] = this[e + 0] = this[e + 1] = void 0
                        }, o.prototype._fulfill = function (t) {
                            var e = this._bitField;
                            if (!((117506048 & e) >>> 16)) {
                                if (t === this) {
                                    var n = l();
                                    return this._attachExtraTrace(n), this._reject(n)
                                }
                                this._setFulfilled(), this._rejectionHandler0 = t, (65535 & e) > 0 && (0 != (134217728 & e) ? this._settlePromises() : g.settlePromises(this), this._dereferenceTrace())
                            }
                        }, o.prototype._reject = function (t) {
                            var e = this._bitField;
                            if (!((117506048 & e) >>> 16)) {
                                if (this._setRejected(), this._fulfillmentHandler0 = t, this._isFinal()) return g.fatalError(t, d.isNode);
                                (65535 & e) > 0 ? g.settlePromises(this) : this._ensurePossibleRejectionHandled()
                            }
                        }, o.prototype._fulfillPromises = function (t, e) {
                            for (var n = 1; n < t; n++) {
                                var r = this._fulfillmentHandlerAt(n), i = this._promiseAt(n), o = this._receiverAt(n);
                                this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e)
                            }
                        }, o.prototype._rejectPromises = function (t, e) {
                            for (var n = 1; n < t; n++) {
                                var r = this._rejectionHandlerAt(n), i = this._promiseAt(n), o = this._receiverAt(n);
                                this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e)
                            }
                        }, o.prototype._settlePromises = function () {
                            var t = this._bitField, e = 65535 & t;
                            if (e > 0) {
                                if (0 != (16842752 & t)) {
                                    var n = this._fulfillmentHandler0;
                                    this._settlePromise0(this._rejectionHandler0, n, t), this._rejectPromises(e, n)
                                } else {
                                    var r = this._rejectionHandler0;
                                    this._settlePromise0(this._fulfillmentHandler0, r, t), this._fulfillPromises(e, r)
                                }
                                this._setLength(0)
                            }
                            this._clearCancellationData()
                        }, o.prototype._settledValue = function () {
                            var t = this._bitField;
                            return 0 != (33554432 & t) ? this._rejectionHandler0 : 0 != (16777216 & t) ? this._fulfillmentHandler0 : void 0
                        }, o.defer = o.pending = function () {
                            return C.deprecated("Promise.defer", "new Promise"), {
                                promise: new o(E),
                                resolve: a,
                                reject: s
                            }
                        }, d.notEnumerableProp(o, "_makeSelfResolutionError", l), t("./method")(o, E, T, f, C), t("./bind")(o, E, T, C), t("./cancel")(o, R, f, C), t("./direct_resolve")(o), t("./synchronous_inspection")(o), t("./join")(o, R, T, E, g, u), o.Promise = o, o.version = "3.5.4", t("./map.js")(o, R, f, T, E, C), t("./call_get.js")(o), t("./using.js")(o, f, T, P, E, C), t("./timers.js")(o, E, C), t("./generators.js")(o, f, E, T, r, C), t("./nodeify.js")(o), t("./promisify.js")(o, E), t("./props.js")(o, R, T, f), t("./race.js")(o, E, T, f), t("./reduce.js")(o, R, f, T, E, C), t("./settle.js")(o, R, C), t("./some.js")(o, R, f), t("./filter.js")(o, E), t("./each.js")(o, E), t("./any.js")(o), d.toFastProperties(o), d.toFastProperties(o.prototype), c({a: 1}), c({b: 2}), c({c: 3}), c(1), c(function () {
                        }), c(void 0), c(!1), c(new o(E)), C.setBounds(v.firstLineError, d.lastLineError), o
                    }
                }, {
                    "./any.js": 1,
                    "./async": 2,
                    "./bind": 3,
                    "./call_get.js": 5,
                    "./cancel": 6,
                    "./catch_filter": 7,
                    "./context": 8,
                    "./debuggability": 9,
                    "./direct_resolve": 10,
                    "./each.js": 11,
                    "./errors": 12,
                    "./es5": 13,
                    "./filter.js": 14,
                    "./finally": 15,
                    "./generators.js": 16,
                    "./join": 17,
                    "./map.js": 18,
                    "./method": 19,
                    "./nodeback": 20,
                    "./nodeify.js": 21,
                    "./promise_array": 23,
                    "./promisify.js": 24,
                    "./props.js": 25,
                    "./race.js": 27,
                    "./reduce.js": 28,
                    "./settle.js": 30,
                    "./some.js": 31,
                    "./synchronous_inspection": 32,
                    "./thenables": 33,
                    "./timers.js": 34,
                    "./using.js": 35,
                    "./util": 36
                }], 23: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r, i, o) {
                        function a(t) {
                            switch (t) {
                                case-2:
                                    return [];
                                case-3:
                                    return {};
                                case-6:
                                    return new Map
                            }
                        }

                        function s(t) {
                            var r = this._promise = new e(n);
                            t instanceof e && r._propagateFrom(t, 3), r._setOnCancel(this), this._values = t, this._length = 0, this._totalResolved = 0, this._init(void 0, -2)
                        }

                        var c = t("./util");
                        c.isArray;
                        return c.inherits(s, o), s.prototype.length = function () {
                            return this._length
                        }, s.prototype.promise = function () {
                            return this._promise
                        }, s.prototype._init = function t(n, o) {
                            var s = r(this._values, this._promise);
                            if (s instanceof e) {
                                s = s._target();
                                var u = s._bitField;
                                if (this._values = s, 0 == (50397184 & u)) return this._promise._setAsyncGuaranteed(), s._then(t, this._reject, void 0, this, o);
                                if (0 == (33554432 & u)) return 0 != (16777216 & u) ? this._reject(s._reason()) : this._cancel();
                                s = s._value()
                            }
                            if (null === (s = c.asArray(s))) {
                                var l = i("expecting an array or an iterable object but got " + c.classString(s)).reason();
                                return void this._promise._rejectCallback(l, !1)
                            }
                            if (0 === s.length) return void (-5 === o ? this._resolveEmptyArray() : this._resolve(a(o)));
                            this._iterate(s)
                        }, s.prototype._iterate = function (t) {
                            var n = this.getActualLength(t.length);
                            this._length = n, this._values = this.shouldCopyValues() ? new Array(n) : this._values;
                            for (var i = this._promise, o = !1, a = null, s = 0; s < n; ++s) {
                                var c = r(t[s], i);
                                c instanceof e ? (c = c._target(), a = c._bitField) : a = null, o ? null !== a && c.suppressUnhandledRejections() : null !== a ? 0 == (50397184 & a) ? (c._proxy(this, s), this._values[s] = c) : o = 0 != (33554432 & a) ? this._promiseFulfilled(c._value(), s) : 0 != (16777216 & a) ? this._promiseRejected(c._reason(), s) : this._promiseCancelled(s) : o = this._promiseFulfilled(c, s)
                            }
                            o || i._setAsyncGuaranteed()
                        }, s.prototype._isResolved = function () {
                            return null === this._values
                        }, s.prototype._resolve = function (t) {
                            this._values = null, this._promise._fulfill(t)
                        }, s.prototype._cancel = function () {
                            !this._isResolved() && this._promise._isCancellable() && (this._values = null, this._promise._cancel())
                        }, s.prototype._reject = function (t) {
                            this._values = null, this._promise._rejectCallback(t, !1)
                        }, s.prototype._promiseFulfilled = function (t, e) {
                            return this._values[e] = t, ++this._totalResolved >= this._length && (this._resolve(this._values), !0)
                        }, s.prototype._promiseCancelled = function () {
                            return this._cancel(), !0
                        }, s.prototype._promiseRejected = function (t) {
                            return this._totalResolved++, this._reject(t), !0
                        }, s.prototype._resultCancelled = function () {
                            if (!this._isResolved()) {
                                var t = this._values;
                                if (this._cancel(), t instanceof e) t.cancel(); else for (var n = 0; n < t.length; ++n) t[n] instanceof e && t[n].cancel()
                            }
                        }, s.prototype.shouldCopyValues = function () {
                            return !0
                        }, s.prototype.getActualLength = function (t) {
                            return t
                        }, s
                    }
                }, {"./util": 36}], 24: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n) {
                        function r(t) {
                            return !E.test(t)
                        }

                        function i(t) {
                            try {
                                return !0 === t.__isPromisified__
                            } catch (t) {
                                return !1
                            }
                        }

                        function o(t, e, n) {
                            var r = p.getDataPropertyOrDefault(t, e + n, _);
                            return !!r && i(r)
                        }

                        function a(t, e, n) {
                            for (var r = 0; r < t.length; r += 2) {
                                var i = t[r];
                                if (n.test(i)) for (var o = i.replace(n, ""), a = 0; a < t.length; a += 2) if (t[a] === o) throw new y("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", e))
                            }
                        }

                        function s(t, e, n, r) {
                            for (var s = p.inheritedDataKeys(t), c = [], u = 0; u < s.length; ++u) {
                                var l = s[u], h = t[l], f = r === w || w(l, h, t);
                                "function" != typeof h || i(h) || o(t, l, e) || !r(l, h, t, f) || c.push(l, h)
                            }
                            return a(c, e, n), c
                        }

                        function c(t, r, i, o, a, s) {
                            function c() {
                                var i = r;
                                r === f && (i = this);
                                var o = new e(n);
                                o._captureStackTrace();
                                var a = "string" == typeof l && this !== u ? this[l] : t, c = d(o, s);
                                try {
                                    a.apply(i, m(arguments, c))
                                } catch (t) {
                                    o._rejectCallback(v(t), !0, !0)
                                }
                                return o._isFateSealed() || o._setAsyncGuaranteed(), o
                            }

                            var u = function () {
                                return this
                            }(), l = t;
                            return "string" == typeof l && (t = o), p.notEnumerableProp(c, "__isPromisified__", !0), c
                        }

                        function u(t, e, n, r, i) {
                            for (var o = new RegExp(x(e) + "$"), a = s(t, e, o, n), c = 0, u = a.length; c < u; c += 2) {
                                var l = a[c], h = a[c + 1], d = l + e;
                                if (r === T) t[d] = T(l, f, l, h, e, i); else {
                                    var m = r(h, function () {
                                        return T(l, f, l, h, e, i)
                                    });
                                    p.notEnumerableProp(m, "__isPromisified__", !0), t[d] = m
                                }
                            }
                            return p.toFastProperties(t), t
                        }

                        function l(t, e, n) {
                            return T(t, e, void 0, t, null, n)
                        }

                        var h, f = {}, p = t("./util"), d = t("./nodeback"), m = p.withAppended, v = p.maybeWrapAsError,
                            g = p.canEvaluate, y = t("./errors").TypeError, _ = {__isPromisified__: !0},
                            b = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"],
                            E = new RegExp("^(?:" + b.join("|") + ")$"), w = function (t) {
                                return p.isIdentifier(t) && "_" !== t.charAt(0) && "constructor" !== t
                            }, x = function (t) {
                                return t.replace(/([$])/, "\\$")
                            }, T = g ? h : c;
                        e.promisify = function (t, e) {
                            if ("function" != typeof t) throw new y("expecting a function but got " + p.classString(t));
                            if (i(t)) return t;
                            e = Object(e);
                            var n = void 0 === e.context ? f : e.context, o = !!e.multiArgs, a = l(t, n, o);
                            return p.copyDescriptors(t, a, r), a
                        }, e.promisifyAll = function (t, e) {
                            if ("function" != typeof t && "object" != typeof t) throw new y("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
                            e = Object(e);
                            var n = !!e.multiArgs, r = e.suffix;
                            "string" != typeof r && (r = "Async");
                            var i = e.filter;
                            "function" != typeof i && (i = w);
                            var o = e.promisifier;
                            if ("function" != typeof o && (o = T), !p.isIdentifier(r)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
                            for (var a = p.inheritedDataKeys(t), s = 0; s < a.length; ++s) {
                                var c = t[a[s]];
                                "constructor" !== a[s] && p.isClass(c) && (u(c.prototype, r, i, o, n), u(c, r, i, o, n))
                            }
                            return u(t, r, i, o, n)
                        }
                    }
                }, {"./errors": 12, "./nodeback": 20, "./util": 36}], 25: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r, i) {
                        function o(t) {
                            var e, n = !1;
                            if (void 0 !== s && t instanceof s) e = h(t), n = !0; else {
                                var r = l.keys(t), i = r.length;
                                e = new Array(2 * i);
                                for (var o = 0; o < i; ++o) {
                                    var a = r[o];
                                    e[o] = t[a], e[o + i] = a
                                }
                            }
                            this.constructor$(e), this._isMap = n, this._init$(void 0, n ? -6 : -3)
                        }

                        function a(t) {
                            var n, a = r(t);
                            return u(a) ? (n = a instanceof e ? a._then(e.props, void 0, void 0, void 0, void 0) : new o(a).promise(), a instanceof e && n._propagateFrom(a, 2), n) : i("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n")
                        }

                        var s, c = t("./util"), u = c.isObject, l = t("./es5");
                        "function" == typeof Map && (s = Map);
                        var h = function () {
                            function t(t, r) {
                                this[e] = t, this[e + n] = r, e++
                            }

                            var e = 0, n = 0;
                            return function (r) {
                                n = r.size, e = 0;
                                var i = new Array(2 * r.size);
                                return r.forEach(t, i), i
                            }
                        }(), f = function (t) {
                            for (var e = new s, n = t.length / 2 | 0, r = 0; r < n; ++r) {
                                var i = t[n + r], o = t[r];
                                e.set(i, o)
                            }
                            return e
                        };
                        c.inherits(o, n), o.prototype._init = function () {
                        }, o.prototype._promiseFulfilled = function (t, e) {
                            if (this._values[e] = t, ++this._totalResolved >= this._length) {
                                var n;
                                if (this._isMap) n = f(this._values); else {
                                    n = {};
                                    for (var r = this.length(), i = 0, o = this.length(); i < o; ++i) n[this._values[i + r]] = this._values[i]
                                }
                                return this._resolve(n), !0
                            }
                            return !1
                        }, o.prototype.shouldCopyValues = function () {
                            return !1
                        }, o.prototype.getActualLength = function (t) {
                            return t >> 1
                        }, e.prototype.props = function () {
                            return a(this)
                        }, e.props = function (t) {
                            return a(t)
                        }
                    }
                }, {"./es5": 13, "./util": 36}], 26: [function (t, e, n) {
                    "use strict";

                    function r(t, e, n, r, i) {
                        for (var o = 0; o < i; ++o) n[o + r] = t[o + e], t[o + e] = void 0
                    }

                    function i(t) {
                        this._capacity = t, this._length = 0, this._front = 0
                    }

                    i.prototype._willBeOverCapacity = function (t) {
                        return this._capacity < t
                    }, i.prototype._pushOne = function (t) {
                        var e = this.length();
                        this._checkCapacity(e + 1), this[this._front + e & this._capacity - 1] = t, this._length = e + 1
                    }, i.prototype.push = function (t, e, n) {
                        var r = this.length() + 3;
                        if (this._willBeOverCapacity(r)) return this._pushOne(t), this._pushOne(e), void this._pushOne(n);
                        var i = this._front + r - 3;
                        this._checkCapacity(r);
                        var o = this._capacity - 1;
                        this[i + 0 & o] = t, this[i + 1 & o] = e, this[i + 2 & o] = n, this._length = r
                    }, i.prototype.shift = function () {
                        var t = this._front, e = this[t];
                        return this[t] = void 0, this._front = t + 1 & this._capacity - 1, this._length--, e
                    }, i.prototype.length = function () {
                        return this._length
                    }, i.prototype._checkCapacity = function (t) {
                        this._capacity < t && this._resizeTo(this._capacity << 1)
                    }, i.prototype._resizeTo = function (t) {
                        var e = this._capacity;
                        this._capacity = t, r(this, 0, this, e, this._front + this._length & e - 1)
                    }, e.exports = i
                }, {}], 27: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r, i) {
                        function o(t, o) {
                            var c = r(t);
                            if (c instanceof e) return s(c);
                            if (null === (t = a.asArray(t))) return i("expecting an array or an iterable object but got " + a.classString(t));
                            var u = new e(n);
                            void 0 !== o && u._propagateFrom(o, 3);
                            for (var l = u._fulfill, h = u._reject, f = 0, p = t.length; f < p; ++f) {
                                var d = t[f];
                                (void 0 !== d || f in t) && e.cast(d)._then(l, h, void 0, u, null)
                            }
                            return u
                        }

                        var a = t("./util"), s = function (t) {
                            return t.then(function (e) {
                                return o(e, t)
                            })
                        };
                        e.race = function (t) {
                            return o(t, void 0)
                        }, e.prototype.race = function () {
                            return o(this, void 0)
                        }
                    }
                }, {"./util": 36}], 28: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r, i, o, a) {
                        function s(t, n, r, i) {
                            this.constructor$(t);
                            var a = f();
                            this._fn = null === a ? n : p.domainBind(a, n), void 0 !== r && (r = e.resolve(r), r._attachCancellationCallback(this)), this._initialValue = r, this._currentCancellable = null, this._eachValues = i === o ? Array(this._length) : 0 === i ? null : void 0, this._promise._captureStackTrace(), this._init$(void 0, -5)
                        }

                        function c(t, e) {
                            this.isFulfilled() ? e._resolve(t) : e._reject(t)
                        }

                        function u(t, e, n, i) {
                            return "function" != typeof e ? r("expecting a function but got " + p.classString(e)) : new s(t, e, n, i).promise()
                        }

                        function l(t) {
                            this.accum = t, this.array._gotAccum(t);
                            var n = i(this.value, this.array._promise);
                            return n instanceof e ? (this.array._currentCancellable = n, n._then(h, void 0, void 0, this, void 0)) : h.call(this, n)
                        }

                        function h(t) {
                            var n = this.array, r = n._promise, i = d(n._fn);
                            r._pushContext();
                            var o;
                            (o = void 0 !== n._eachValues ? i.call(r._boundValue(), t, this.index, this.length) : i.call(r._boundValue(), this.accum, t, this.index, this.length)) instanceof e && (n._currentCancellable = o);
                            var s = r._popContext();
                            return a.checkForgottenReturns(o, s, void 0 !== n._eachValues ? "Promise.each" : "Promise.reduce", r), o
                        }

                        var f = e._getDomain, p = t("./util"), d = p.tryCatch;
                        p.inherits(s, n), s.prototype._gotAccum = function (t) {
                            void 0 !== this._eachValues && null !== this._eachValues && t !== o && this._eachValues.push(t)
                        }, s.prototype._eachComplete = function (t) {
                            return null !== this._eachValues && this._eachValues.push(t), this._eachValues
                        }, s.prototype._init = function () {
                        }, s.prototype._resolveEmptyArray = function () {
                            this._resolve(void 0 !== this._eachValues ? this._eachValues : this._initialValue)
                        }, s.prototype.shouldCopyValues = function () {
                            return !1
                        }, s.prototype._resolve = function (t) {
                            this._promise._resolveCallback(t), this._values = null
                        }, s.prototype._resultCancelled = function (t) {
                            if (t === this._initialValue) return this._cancel();
                            this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof e && this._currentCancellable.cancel(), this._initialValue instanceof e && this._initialValue.cancel())
                        }, s.prototype._iterate = function (t) {
                            this._values = t;
                            var n, r, i = t.length;
                            if (void 0 !== this._initialValue ? (n = this._initialValue, r = 0) : (n = e.resolve(t[0]), r = 1), this._currentCancellable = n, !n.isRejected()) for (; r < i; ++r) {
                                var o = {accum: null, value: t[r], index: r, length: i, array: this};
                                n = n._then(l, void 0, void 0, o, void 0)
                            }
                            void 0 !== this._eachValues && (n = n._then(this._eachComplete, void 0, void 0, this, void 0)), n._then(c, c, void 0, n, this)
                        }, e.prototype.reduce = function (t, e) {
                            return u(this, t, e, null)
                        }, e.reduce = function (t, e, n, r) {
                            return u(t, e, n, r)
                        }
                    }
                }, {"./util": 36}], 29: [function (t, i, o) {
                    "use strict";
                    var a, s = t("./util"), c = function () {
                        throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")
                    }, u = s.getNativePromise();
                    if (s.isNode && "undefined" == typeof MutationObserver) {
                        var l = n.setImmediate, h = e.nextTick;
                        a = s.isRecentNode ? function (t) {
                            l.call(n, t)
                        } : function (t) {
                            h.call(e, t)
                        }
                    } else if ("function" == typeof u && "function" == typeof u.resolve) {
                        var f = u.resolve();
                        a = function (t) {
                            f.then(t)
                        }
                    } else a = "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && (window.navigator.standalone || window.cordova) ? void 0 !== r ? function (t) {
                        r(t)
                    } : "undefined" != typeof setTimeout ? function (t) {
                        setTimeout(t, 0)
                    } : c : function () {
                        var t = document.createElement("div"), e = {attributes: !0}, n = !1,
                            r = document.createElement("div");
                        new MutationObserver(function () {
                            t.classList.toggle("foo"), n = !1
                        }).observe(r, e);
                        var i = function () {
                            n || (n = !0, r.classList.toggle("foo"))
                        };
                        return function (n) {
                            var r = new MutationObserver(function () {
                                r.disconnect(), n()
                            });
                            r.observe(t, e), i()
                        }
                    }();
                    i.exports = a
                }, {"./util": 36}], 30: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r) {
                        function i(t) {
                            this.constructor$(t)
                        }

                        var o = e.PromiseInspection;
                        t("./util").inherits(i, n), i.prototype._promiseResolved = function (t, e) {
                            return this._values[t] = e, ++this._totalResolved >= this._length && (this._resolve(this._values), !0)
                        }, i.prototype._promiseFulfilled = function (t, e) {
                            var n = new o;
                            return n._bitField = 33554432, n._settledValueField = t, this._promiseResolved(e, n)
                        }, i.prototype._promiseRejected = function (t, e) {
                            var n = new o;
                            return n._bitField = 16777216, n._settledValueField = t, this._promiseResolved(e, n)
                        }, e.settle = function (t) {
                            return r.deprecated(".settle()", ".reflect()"), new i(t).promise()
                        }, e.prototype.settle = function () {
                            return e.settle(this)
                        }
                    }
                }, {"./util": 36}], 31: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r) {
                        function i(t) {
                            this.constructor$(t), this._howMany = 0, this._unwrap = !1, this._initialized = !1
                        }

                        function o(t, e) {
                            if ((0 | e) !== e || e < 0) return r("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
                            var n = new i(t), o = n.promise();
                            return n.setHowMany(e), n.init(), o
                        }

                        var a = t("./util"), s = t("./errors").RangeError, c = t("./errors").AggregateError,
                            u = a.isArray, l = {};
                        a.inherits(i, n), i.prototype._init = function () {
                            if (this._initialized) {
                                if (0 === this._howMany) return void this._resolve([]);
                                this._init$(void 0, -5);
                                var t = u(this._values);
                                !this._isResolved() && t && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()))
                            }
                        }, i.prototype.init = function () {
                            this._initialized = !0, this._init()
                        }, i.prototype.setUnwrap = function () {
                            this._unwrap = !0
                        }, i.prototype.howMany = function () {
                            return this._howMany
                        }, i.prototype.setHowMany = function (t) {
                            this._howMany = t
                        }, i.prototype._promiseFulfilled = function (t) {
                            return this._addFulfilled(t), this._fulfilled() === this.howMany() && (this._values.length = this.howMany(), 1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), !0)
                        }, i.prototype._promiseRejected = function (t) {
                            return this._addRejected(t), this._checkOutcome()
                        }, i.prototype._promiseCancelled = function () {
                            return this._values instanceof e || null == this._values ? this._cancel() : (this._addRejected(l), this._checkOutcome())
                        }, i.prototype._checkOutcome = function () {
                            if (this.howMany() > this._canPossiblyFulfill()) {
                                for (var t = new c, e = this.length(); e < this._values.length; ++e) this._values[e] !== l && t.push(this._values[e]);
                                return t.length > 0 ? this._reject(t) : this._cancel(), !0
                            }
                            return !1
                        }, i.prototype._fulfilled = function () {
                            return this._totalResolved
                        }, i.prototype._rejected = function () {
                            return this._values.length - this.length()
                        }, i.prototype._addRejected = function (t) {
                            this._values.push(t)
                        }, i.prototype._addFulfilled = function (t) {
                            this._values[this._totalResolved++] = t
                        }, i.prototype._canPossiblyFulfill = function () {
                            return this.length() - this._rejected()
                        }, i.prototype._getRangeError = function (t) {
                            var e = "Input array must contain at least " + this._howMany + " items but contains only " + t + " items";
                            return new s(e)
                        }, i.prototype._resolveEmptyArray = function () {
                            this._reject(this._getRangeError(0))
                        }, e.some = function (t, e) {
                            return o(t, e)
                        }, e.prototype.some = function (t) {
                            return o(this, t)
                        }, e._SomePromiseArray = i
                    }
                }, {"./errors": 12, "./util": 36}], 32: [function (t, e, n) {
                    "use strict";
                    e.exports = function (t) {
                        function e(t) {
                            void 0 !== t ? (t = t._target(), this._bitField = t._bitField, this._settledValueField = t._isFateSealed() ? t._settledValue() : void 0) : (this._bitField = 0, this._settledValueField = void 0)
                        }

                        e.prototype._settledValue = function () {
                            return this._settledValueField
                        };
                        var n = e.prototype.value = function () {
                            if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
                            return this._settledValue()
                        }, r = e.prototype.error = e.prototype.reason = function () {
                            if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
                            return this._settledValue()
                        }, i = e.prototype.isFulfilled = function () {
                            return 0 != (33554432 & this._bitField)
                        }, o = e.prototype.isRejected = function () {
                            return 0 != (16777216 & this._bitField)
                        }, a = e.prototype.isPending = function () {
                            return 0 == (50397184 & this._bitField)
                        }, s = e.prototype.isResolved = function () {
                            return 0 != (50331648 & this._bitField)
                        };
                        e.prototype.isCancelled = function () {
                            return 0 != (8454144 & this._bitField)
                        }, t.prototype.__isCancelled = function () {
                            return 65536 == (65536 & this._bitField)
                        }, t.prototype._isCancelled = function () {
                            return this._target().__isCancelled()
                        }, t.prototype.isCancelled = function () {
                            return 0 != (8454144 & this._target()._bitField)
                        }, t.prototype.isPending = function () {
                            return a.call(this._target())
                        }, t.prototype.isRejected = function () {
                            return o.call(this._target())
                        }, t.prototype.isFulfilled = function () {
                            return i.call(this._target())
                        }, t.prototype.isResolved = function () {
                            return s.call(this._target())
                        }, t.prototype.value = function () {
                            return n.call(this._target())
                        }, t.prototype.reason = function () {
                            var t = this._target();
                            return t._unsetRejectionIsUnhandled(), r.call(t)
                        }, t.prototype._value = function () {
                            return this._settledValue()
                        }, t.prototype._reason = function () {
                            return this._unsetRejectionIsUnhandled(), this._settledValue()
                        }, t.PromiseInspection = e
                    }
                }, {}], 33: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n) {
                        function r(t, r) {
                            if (l(t)) {
                                if (t instanceof e) return t;
                                var i = o(t);
                                if (i === u) {
                                    r && r._pushContext();
                                    var c = e.reject(i.e);
                                    return r && r._popContext(), c
                                }
                                if ("function" == typeof i) {
                                    if (a(t)) {
                                        var c = new e(n);
                                        return t._then(c._fulfill, c._reject, void 0, c, null), c
                                    }
                                    return s(t, i, r)
                                }
                            }
                            return t
                        }

                        function i(t) {
                            return t.then
                        }

                        function o(t) {
                            try {
                                return i(t)
                            } catch (t) {
                                return u.e = t, u
                            }
                        }

                        function a(t) {
                            try {
                                return h.call(t, "_promise0")
                            } catch (t) {
                                return !1
                            }
                        }

                        function s(t, r, i) {
                            function o(t) {
                                s && (s._resolveCallback(t), s = null)
                            }

                            function a(t) {
                                s && (s._rejectCallback(t, h, !0), s = null)
                            }

                            var s = new e(n), l = s;
                            i && i._pushContext(), s._captureStackTrace(), i && i._popContext();
                            var h = !0, f = c.tryCatch(r).call(t, o, a);
                            return h = !1, s && f === u && (s._rejectCallback(f.e, !0, !0), s = null), l
                        }

                        var c = t("./util"), u = c.errorObj, l = c.isObject, h = {}.hasOwnProperty;
                        return r
                    }
                }, {"./util": 36}], 34: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r) {
                        function i(t) {
                            this.handle = t
                        }

                        function o(t) {
                            return clearTimeout(this.handle), t
                        }

                        function a(t) {
                            throw clearTimeout(this.handle), t
                        }

                        var s = t("./util"), c = e.TimeoutError;
                        i.prototype._resultCancelled = function () {
                            clearTimeout(this.handle)
                        };
                        var u = function (t) {
                            return l(+this).thenReturn(t)
                        }, l = e.delay = function (t, o) {
                            var a, s;
                            return void 0 !== o ? (a = e.resolve(o)._then(u, null, null, t, void 0), r.cancellation() && o instanceof e && a._setOnCancel(o)) : (a = new e(n), s = setTimeout(function () {
                                a._fulfill()
                            }, +t), r.cancellation() && a._setOnCancel(new i(s)), a._captureStackTrace()), a._setAsyncGuaranteed(), a
                        };
                        e.prototype.delay = function (t) {
                            return l(t, this)
                        };
                        var h = function (t, e, n) {
                            var r;
                            r = "string" != typeof e ? e instanceof Error ? e : new c("operation timed out") : new c(e), s.markAsOriginatingFromRejection(r), t._attachExtraTrace(r), t._reject(r), null != n && n.cancel()
                        };
                        e.prototype.timeout = function (t, e) {
                            t = +t;
                            var n, s, c = new i(setTimeout(function () {
                                n.isPending() && h(n, e, s)
                            }, t));
                            return r.cancellation() ? (s = this.then(), n = s._then(o, a, void 0, c, void 0), n._setOnCancel(c)) : n = this._then(o, a, void 0, c, void 0), n
                        }
                    }
                }, {"./util": 36}], 35: [function (t, e, n) {
                    "use strict";
                    e.exports = function (e, n, r, i, o, a) {
                        function s(t) {
                            setTimeout(function () {
                                throw t
                            }, 0)
                        }

                        function c(t) {
                            var e = r(t);
                            return e !== t && "function" == typeof t._isDisposable && "function" == typeof t._getDisposer && t._isDisposable() && e._setDisposable(t._getDisposer()), e
                        }

                        function u(t, n) {
                            function i() {
                                if (a >= u) return l._fulfill();
                                var o = c(t[a++]);
                                if (o instanceof e && o._isDisposable()) {
                                    try {
                                        o = r(o._getDisposer().tryDispose(n), t.promise)
                                    } catch (t) {
                                        return s(t)
                                    }
                                    if (o instanceof e) return o._then(i, s, null, null, null)
                                }
                                i()
                            }

                            var a = 0, u = t.length, l = new e(o);
                            return i(), l
                        }

                        function l(t, e, n) {
                            this._data = t, this._promise = e, this._context = n
                        }

                        function h(t, e, n) {
                            this.constructor$(t, e, n)
                        }

                        function f(t) {
                            return l.isDisposer(t) ? (this.resources[this.index]._setDisposable(t), t.promise()) : t
                        }

                        function p(t) {
                            this.length = t, this.promise = null, this[t - 1] = null
                        }

                        var d = t("./util"), m = t("./errors").TypeError, v = t("./util").inherits, g = d.errorObj,
                            y = d.tryCatch, _ = {};
                        l.prototype.data = function () {
                            return this._data
                        }, l.prototype.promise = function () {
                            return this._promise
                        }, l.prototype.resource = function () {
                            return this.promise().isFulfilled() ? this.promise().value() : _
                        }, l.prototype.tryDispose = function (t) {
                            var e = this.resource(), n = this._context;
                            void 0 !== n && n._pushContext();
                            var r = e !== _ ? this.doDispose(e, t) : null;
                            return void 0 !== n && n._popContext(), this._promise._unsetDisposable(), this._data = null, r
                        }, l.isDisposer = function (t) {
                            return null != t && "function" == typeof t.resource && "function" == typeof t.tryDispose
                        }, v(h, l), h.prototype.doDispose = function (t, e) {
                            return this.data().call(t, t, e)
                        }, p.prototype._resultCancelled = function () {
                            for (var t = this.length, n = 0; n < t; ++n) {
                                var r = this[n];
                                r instanceof e && r.cancel()
                            }
                        }, e.using = function () {
                            var t = arguments.length;
                            if (t < 2) return n("you must pass at least 2 arguments to Promise.using");
                            var i = arguments[t - 1];
                            if ("function" != typeof i) return n("expecting a function but got " + d.classString(i));
                            var o, s = !0;
                            2 === t && Array.isArray(arguments[0]) ? (o = arguments[0], t = o.length, s = !1) : (o = arguments, t--);
                            for (var c = new p(t), h = 0; h < t; ++h) {
                                var m = o[h];
                                if (l.isDisposer(m)) {
                                    var v = m;
                                    m = m.promise(), m._setDisposable(v)
                                } else {
                                    var _ = r(m);
                                    _ instanceof e && (m = _._then(f, null, null, {resources: c, index: h}, void 0))
                                }
                                c[h] = m
                            }
                            for (var b = new Array(c.length), h = 0; h < b.length; ++h) b[h] = e.resolve(c[h]).reflect();
                            var E = e.all(b).then(function (t) {
                                for (var e = 0; e < t.length; ++e) {
                                    var n = t[e];
                                    if (n.isRejected()) return g.e = n.error(), g;
                                    if (!n.isFulfilled()) return void E.cancel();
                                    t[e] = n.value()
                                }
                                w._pushContext(), i = y(i);
                                var r = s ? i.apply(void 0, t) : i(t), o = w._popContext();
                                return a.checkForgottenReturns(r, o, "Promise.using", w), r
                            }), w = E.lastly(function () {
                                var t = new e.PromiseInspection(E);
                                return u(c, t)
                            });
                            return c.promise = w, w._setOnCancel(c), w
                        }, e.prototype._setDisposable = function (t) {
                            this._bitField = 131072 | this._bitField, this._disposer = t
                        }, e.prototype._isDisposable = function () {
                            return (131072 & this._bitField) > 0
                        }, e.prototype._getDisposer = function () {
                            return this._disposer
                        }, e.prototype._unsetDisposable = function () {
                            this._bitField = -131073 & this._bitField, this._disposer = void 0
                        }, e.prototype.disposer = function (t) {
                            if ("function" == typeof t) return new h(t, this, i());
                            throw new m
                        }
                    }
                }, {"./errors": 12, "./util": 36}], 36: [function (t, r, i) {
                    "use strict";

                    function o() {
                        try {
                            var t = j;
                            return j = null, t.apply(this, arguments)
                        } catch (t) {
                            return O.e = t, O
                        }
                    }

                    function a(t) {
                        return j = t, o
                    }

                    function s(t) {
                        return null == t || !0 === t || !1 === t || "string" == typeof t || "number" == typeof t
                    }

                    function c(t) {
                        return "function" == typeof t || "object" == typeof t && null !== t
                    }

                    function u(t) {
                        return s(t) ? new Error(y(t)) : t
                    }

                    function l(t, e) {
                        var n, r = t.length, i = new Array(r + 1);
                        for (n = 0; n < r; ++n) i[n] = t[n];
                        return i[n] = e, i
                    }

                    function h(t, e, n) {
                        if (!C.isES5) return {}.hasOwnProperty.call(t, e) ? t[e] : void 0;
                        var r = Object.getOwnPropertyDescriptor(t, e);
                        return null != r ? null == r.get && null == r.set ? r.value : n : void 0
                    }

                    function f(t, e, n) {
                        if (s(t)) return t;
                        var r = {value: n, configurable: !0, enumerable: !1, writable: !0};
                        return C.defineProperty(t, e, r), t
                    }

                    function p(t) {
                        throw t
                    }

                    function d(t) {
                        try {
                            if ("function" == typeof t) {
                                var e = C.names(t.prototype), n = C.isES5 && e.length > 1,
                                    r = e.length > 0 && !(1 === e.length && "constructor" === e[0]),
                                    i = H.test(t + "") && C.names(t).length > 0;
                                if (n || r || i) return !0
                            }
                            return !1
                        } catch (t) {
                            return !1
                        }
                    }

                    function m(t) {
                        function e() {
                        }

                        function n() {
                            return typeof r.foo
                        }

                        e.prototype = t;
                        var r = new e;
                        return n(), n(), t
                    }

                    function v(t) {
                        return L.test(t)
                    }

                    function g(t, e, n) {
                        for (var r = new Array(t), i = 0; i < t; ++i) r[i] = e + i + n;
                        return r
                    }

                    function y(t) {
                        try {
                            return t + ""
                        } catch (t) {
                            return "[no string representation]"
                        }
                    }

                    function _(t) {
                        return t instanceof Error || null !== t && "object" == typeof t && "string" == typeof t.message && "string" == typeof t.name
                    }

                    function b(t) {
                        try {
                            f(t, "isOperational", !0)
                        } catch (t) {
                        }
                    }

                    function E(t) {
                        return null != t && (t instanceof Error.__BluebirdErrorTypes__.OperationalError || !0 === t.isOperational)
                    }

                    function w(t) {
                        return _(t) && C.propertyIsWritable(t, "stack")
                    }

                    function x(t) {
                        return {}.toString.call(t)
                    }

                    function T(t, e, n) {
                        for (var r = C.names(t), i = 0; i < r.length; ++i) {
                            var o = r[i];
                            if (n(o)) try {
                                C.defineProperty(e, o, C.getDescriptor(t, o))
                            } catch (t) {
                            }
                        }
                    }

                    function R(t) {
                        return U ? e.env[t] : void 0
                    }

                    function M() {
                        if ("function" == typeof Promise) try {
                            var t = new Promise(function () {
                            });
                            if ("[object Promise]" === {}.toString.call(t)) return Promise
                        } catch (t) {
                        }
                    }

                    function P(t, e) {
                        return t.bind(e)
                    }

                    var C = t("./es5"), S = "undefined" == typeof navigator, O = {e: {}}, j,
                        k = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : void 0 !== this ? this : null,
                        A = function (t, e) {
                            function n() {
                                this.constructor = t, this.constructor$ = e;
                                for (var n in e.prototype) r.call(e.prototype, n) && "$" !== n.charAt(n.length - 1) && (this[n + "$"] = e.prototype[n])
                            }

                            var r = {}.hasOwnProperty;
                            return n.prototype = e.prototype, t.prototype = new n, t.prototype
                        }, F = function () {
                            var t = [Array.prototype, Object.prototype, Function.prototype], e = function (e) {
                                for (var n = 0; n < t.length; ++n) if (t[n] === e) return !0;
                                return !1
                            };
                            if (C.isES5) {
                                var n = Object.getOwnPropertyNames;
                                return function (t) {
                                    for (var r = [], i = Object.create(null); null != t && !e(t);) {
                                        var o;
                                        try {
                                            o = n(t)
                                        } catch (t) {
                                            return r
                                        }
                                        for (var a = 0; a < o.length; ++a) {
                                            var s = o[a];
                                            if (!i[s]) {
                                                i[s] = !0;
                                                var c = Object.getOwnPropertyDescriptor(t, s);
                                                null != c && null == c.get && null == c.set && r.push(s)
                                            }
                                        }
                                        t = C.getPrototypeOf(t)
                                    }
                                    return r
                                }
                            }
                            var r = {}.hasOwnProperty;
                            return function (n) {
                                if (e(n)) return [];
                                var i = [];
                                t:for (var o in n) if (r.call(n, o)) i.push(o); else {
                                    for (var a = 0; a < t.length; ++a) if (r.call(t[a], o)) continue t;
                                    i.push(o)
                                }
                                return i
                            }
                        }(), H = /this\s*\.\s*\S+\s*=/, L = /^[a-z$_][a-z$_0-9]*$/i, D = function () {
                            return "stack" in new Error ? function (t) {
                                return w(t) ? t : new Error(y(t))
                            } : function (t) {
                                if (w(t)) return t;
                                try {
                                    throw new Error(y(t))
                                } catch (t) {
                                    return t
                                }
                            }
                        }(), I = function (t) {
                            return C.isArray(t) ? t : null
                        };
                    if ("undefined" != typeof Symbol && Symbol.iterator) {
                        var N = "function" == typeof Array.from ? function (t) {
                            return Array.from(t)
                        } : function (t) {
                            for (var e, n = [], r = t[Symbol.iterator](); !(e = r.next()).done;) n.push(e.value);
                            return n
                        };
                        I = function (t) {
                            return C.isArray(t) ? t : null != t && "function" == typeof t[Symbol.iterator] ? N(t) : null
                        }
                    }
                    var B = void 0 !== e && "[object process]" === x(e).toLowerCase(),
                        U = void 0 !== e && void 0 !== e.env, V = {
                            isClass: d,
                            isIdentifier: v,
                            inheritedDataKeys: F,
                            getDataPropertyOrDefault: h,
                            thrower: p,
                            isArray: C.isArray,
                            asArray: I,
                            notEnumerableProp: f,
                            isPrimitive: s,
                            isObject: c,
                            isError: _,
                            canEvaluate: S,
                            errorObj: O,
                            tryCatch: a,
                            inherits: A,
                            withAppended: l,
                            maybeWrapAsError: u,
                            toFastProperties: m,
                            filledRange: g,
                            toString: y,
                            canAttachTrace: w,
                            ensureErrorObject: D,
                            originatesFromRejection: E,
                            markAsOriginatingFromRejection: b,
                            classString: x,
                            copyDescriptors: T,
                            hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes,
                            isNode: B,
                            hasEnvVariables: U,
                            env: R,
                            global: k,
                            getNativePromise: M,
                            domainBind: P
                        };
                    V.isRecentNode = V.isNode && function () {
                        var t;
                        return e.versions && e.versions.node ? t = e.versions.node.split(".").map(Number) : e.version && (t = e.version.split(".").map(Number)), 0 === t[0] && t[1] > 10 || t[0] > 0
                    }(), V.isNode && V.toFastProperties(e);
                    try {
                        throw new Error
                    } catch (t) {
                        V.lastLineError = t
                    }
                    r.exports = V
                }, {"./es5": 13}]
            }, {}, [4])(4)
        }), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise)
    }).call(e, n(7), n(3), n(19).setImmediate)
}, function (t, e) {
    function n() {
        throw new Error("setTimeout has not been defined")
    }

    function r() {
        throw new Error("clearTimeout has not been defined")
    }

    function i(t) {
        if (l === setTimeout) return setTimeout(t, 0);
        if ((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(t, 0);
        try {
            return l(t, 0)
        } catch (e) {
            try {
                return l.call(null, t, 0)
            } catch (e) {
                return l.call(this, t, 0)
            }
        }
    }

    function o(t) {
        if (h === clearTimeout) return clearTimeout(t);
        if ((h === r || !h) && clearTimeout) return h = clearTimeout, clearTimeout(t);
        try {
            return h(t)
        } catch (e) {
            try {
                return h.call(null, t)
            } catch (e) {
                return h.call(this, t)
            }
        }
    }

    function a() {
        m && p && (m = !1, p.length ? d = p.concat(d) : v = -1, d.length && s())
    }

    function s() {
        if (!m) {
            var t = i(a);
            m = !0;
            for (var e = d.length; e;) {
                for (p = d, d = []; ++v < e;) p && p[v].run();
                v = -1, e = d.length
            }
            p = null, m = !1, o(t)
        }
    }

    function c(t, e) {
        this.fun = t, this.array = e
    }

    function u() {
    }

    var l, h, f = t.exports = {};
    !function () {
        try {
            l = "function" == typeof setTimeout ? setTimeout : n
        } catch (t) {
            l = n
        }
        try {
            h = "function" == typeof clearTimeout ? clearTimeout : r
        } catch (t) {
            h = r
        }
    }();
    var p, d = [], m = !1, v = -1;
    f.nextTick = function (t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        d.push(new c(t, e)), 1 !== d.length || m || i(s)
    }, c.prototype.run = function () {
        this.fun.apply(null, this.array)
    }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", f.versions = {}, f.on = u, f.addListener = u, f.once = u, f.off = u, f.removeListener = u, f.removeAllListeners = u, f.emit = u, f.prependListener = u, f.prependOnceListener = u, f.listeners = function (t) {
        return []
    }, f.binding = function (t) {
        throw new Error("process.binding is not supported")
    }, f.cwd = function () {
        return "/"
    }, f.chdir = function (t) {
        throw new Error("process.chdir is not supported")
    }, f.umask = function () {
        return 0
    }
}, function (t, e) {
    t.exports = function (t) {
        return t.webpackPolyfill || (t.deprecate = function () {
        }, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
            enumerable: !0,
            get: function () {
                return t.l
            }
        }), Object.defineProperty(t, "id", {
            enumerable: !0, get: function () {
                return t.i
            }
        }), t.webpackPolyfill = 1), t
    }
}, function (t, e) {
    var n = function (t) {
        this.manager = void 0 !== t ? t : THREE.DefaultLoadingManager, this.texturePath = ""
    };
    Object.assign(n.prototype, {
        load: function (t, e, n, r) {
            "" === this.texturePath && (this.texturePath = t.substring(0, t.lastIndexOf("/") + 1));
            var i = this;
            new THREE.XHRLoader(i.manager).load(t, function (t) {
                var n = JSON.parse(t);
                i.parse(n, e)
            }, n, r)
        }, setTexturePath: function (t) {
            this.texturePath = t
        }, setCrossOrigin: function (t) {
            this.crossOrigin = t
        }, parse: function (t, e) {
            var n;
            n = t.binary ? this.parseBinaryGeometries(t.geometries) : this.parseGeometries(t.geometries);
            var r = this.parseImages(t.images, function () {
                    void 0 !== e && e(a, t)
                }), i = this.parseTextures(t.textures, r), o = this.parseMaterials(t.materials, i),
                a = this.parseObject(t.object, n, o);
            return t.animations && (a.animations = this.parseAnimations(t.animations)), t.cameras && (a.cameras = this.parseCameras(a, t.cameras)), void 0 !== t.images && 0 !== t.images.length || void 0 !== e && e(a, t), a
        }, parseCameras: function (t, e) {
            for (var n = [], r = 0; r < e.length; r++) {
                var i = t.getObjectByProperty("uuid", e[r]);
                i && n.push(i)
            }
            return n
        }, parseGeometries: function (t) {
            var e = {};
            if (void 0 !== t) for (var n = new THREE.JSONLoader, r = new THREE.BufferGeometryLoader, i = 0, o = t.length; i < o; i++) {
                var a, s = t[i];
                switch (s.type) {
                    case"PlaneGeometry":
                    case"PlaneBufferGeometry":
                        a = new THREE[s.type](s.width, s.height, s.widthSegments, s.heightSegments);
                        break;
                    case"BoxGeometry":
                    case"BoxBufferGeometry":
                    case"CubeGeometry":
                        a = new THREE[s.type](s.width, s.height, s.depth, s.widthSegments, s.heightSegments, s.depthSegments);
                        break;
                    case"CircleGeometry":
                    case"CircleBufferGeometry":
                        a = new THREE[s.type](s.radius, s.segments, s.thetaStart, s.thetaLength);
                        break;
                    case"CylinderGeometry":
                    case"CylinderBufferGeometry":
                        a = new THREE[s.type](s.radiusTop, s.radiusBottom, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
                        break;
                    case"ConeGeometry":
                    case"ConeBufferGeometry":
                        a = new THREE[s.type](s.radius, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
                        break;
                    case"SphereGeometry":
                    case"SphereBufferGeometry":
                        a = new THREE[s.type](s.radius, s.widthSegments, s.heightSegments, s.phiStart, s.phiLength, s.thetaStart, s.thetaLength);
                        break;
                    case"DodecahedronGeometry":
                    case"IcosahedronGeometry":
                    case"OctahedronGeometry":
                    case"TetrahedronGeometry":
                        a = new THREE[s.type](s.radius, s.detail);
                        break;
                    case"RingGeometry":
                    case"RingBufferGeometry":
                        a = new THREE[s.type](s.innerRadius, s.outerRadius, s.thetaSegments, s.phiSegments, s.thetaStart, s.thetaLength);
                        break;
                    case"TorusGeometry":
                    case"TorusBufferGeometry":
                        a = new THREE[s.type](s.radius, s.tube, s.radialSegments, s.tubularSegments, s.arc);
                        break;
                    case"TorusKnotGeometry":
                    case"TorusKnotBufferGeometry":
                        a = new THREE[s.type](s.radius, s.tube, s.tubularSegments, s.radialSegments, s.p, s.q);
                        break;
                    case"LatheGeometry":
                    case"LatheBufferGeometry":
                        a = new THREE[s.type](s.points, s.segments, s.phiStart, s.phiLength);
                        break;
                    case"BufferGeometry":
                        a = r.parse(s);
                        break;
                    case"Geometry":
                        a = n.parse(s.data, this.texturePath).geometry;
                        break;
                    default:
                        console.warn('THREE.ObjectLoader: Unsupported geometry type "' + s.type + '"');
                        continue
                }
                a.uuid = s.uuid, void 0 !== s.name && (a.name = s.name), e[s.uuid] = a
            }
            return e
        }, setBinaryGeometryBuffer: function (t) {
            this.geometryBuffer = t
        }, parseBinaryGeometries: function (t) {
            var e = {};
            if (void 0 !== t) {
                for (var n = (new THREE.BufferGeometryLoader, 0), r = t.length; n < r; n++) {
                    var i = new THREE.BufferGeometry, o = t[n];
                    for (var a in o.offsets) if (o.offsets.hasOwnProperty(a)) {
                        var s = o.offsets[a], c = s[0], u = s[1] + 1, l = this.geometryBuffer.slice(c, u);
                        if ("index" === a) {
                            var h = new Uint32Array(l);
                            i.setIndex(new THREE.BufferAttribute(h, 1))
                        } else {
                            var f, h = new Float32Array(l);
                            "uv" === a || "uv2" === a ? f = 2 : "position" === a || "normal" === a || "color" === a ? f = 3 : "tangent" === a && (f = 4), i.addAttribute(a, new THREE.BufferAttribute(h, f))
                        }
                    }
                    i.uuid = o.uuid, void 0 !== o.name && (i.name = o.name), e[o.uuid] = i
                }
                this.setBinaryGeometryBuffer(null)
            }
            return e
        }, parseMaterials: function (t, e) {
            var n = {};
            if (void 0 !== t) {
                var r = new THREE.MaterialLoader;
                r.setTextures(e);
                for (var i = 0, o = t.length; i < o; i++) {
                    var a = r.parse(t[i]);
                    n[a.uuid] = a
                }
            }
            return n
        }, parseAnimations: function (t) {
            for (var e = [], n = 0; n < t.length; n++) {
                var r = THREE.AnimationClip.parse(t[n]);
                e.push(r)
            }
            return e
        }, parseImages: function (t, e) {
            var n = this, r = {};
            if (void 0 !== t && t.length > 0) {
                var i = new THREE.LoadingManager(e), o = new THREE.ImageLoader(i);
                o.setCrossOrigin(this.crossOrigin);
                for (var a = 0, s = t.length; a < s; a++) {
                    var c = t[a], u = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(c.url) ? c.url : n.texturePath + c.url;
                    r[c.uuid] = function (t) {
                        return n.manager.itemStart(t), o.load(t, function () {
                            n.manager.itemEnd(t)
                        })
                    }(u)
                }
            }
            return r
        }, parseTextures: function (t, e) {
            function n(t) {
                return "number" == typeof t ? t : (console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", t), THREE[t])
            }

            var r = {};
            if (void 0 !== t) for (var i = 0, o = t.length; i < o; i++) {
                var a, s = t[i];
                if (s.images) {
                    for (var c = [], u = 0, l = s.images.length; u < l; u++) void 0 === e[s.images[u]] && console.warn("THREE.ObjectLoader: Undefined image", s.images[u]), c.push(e[s.images[u]]);
                    a = new THREE.CubeTexture(c)
                } else void 0 === s.image && console.warn('THREE.ObjectLoader: No "image" specified for', s.uuid), void 0 === e[s.image] && console.warn("THREE.ObjectLoader: Undefined image", s.image), a = new THREE.Texture(e[s.image]);
                a.needsUpdate = !0, a.uuid = s.uuid, void 0 !== s.name && (a.name = s.name), void 0 !== s.mapping && (a.mapping = n(s.mapping)), void 0 !== s.offset && a.offset.fromArray(s.offset), void 0 !== s.repeat && a.repeat.fromArray(s.repeat), void 0 !== s.wrap && (a.wrapS = n(s.wrap[0]), a.wrapT = n(s.wrap[1])), void 0 !== s.minFilter && (a.minFilter = n(s.minFilter)), void 0 !== s.magFilter && (a.magFilter = n(s.magFilter)), void 0 !== s.anisotropy && (a.anisotropy = s.anisotropy), void 0 !== s.flipY && (a.flipY = s.flipY), r[s.uuid] = a
            }
            return r
        }, parseObject: function () {
            var t = new THREE.Matrix4;
            return function (e, n, r) {
                function i(t) {
                    return void 0 === n[t] && console.warn("THREE.ObjectLoader: Undefined geometry", t), n[t]
                }

                function o(t) {
                    if (void 0 !== t) return void 0 === r[t] && console.warn("THREE.ObjectLoader: Undefined material", t), r[t]
                }

                var a;
                switch (e.type) {
                    case"Scene":
                        a = new THREE.Scene;
                        break;
                    case"PerspectiveCamera":
                        a = new THREE.PerspectiveCamera(e.fov, e.aspect, e.near, e.far), void 0 !== e.focus && (a.focus = e.focus), void 0 !== e.zoom && (a.zoom = e.zoom), void 0 !== e.filmGauge && (a.filmGauge = e.filmGauge), void 0 !== e.filmOffset && (a.filmOffset = e.filmOffset), void 0 !== e.view && (a.view = Object.assign({}, e.view));
                        break;
                    case"OrthographicCamera":
                        a = new THREE.OrthographicCamera(e.left, e.right, e.top, e.bottom, e.near, e.far);
                        break;
                    case"AmbientLight":
                        a = new THREE.AmbientLight(e.color, e.intensity);
                        break;
                    case"DirectionalLight":
                        a = new THREE.DirectionalLight(e.color, e.intensity);
                        break;
                    case"PointLight":
                        a = new THREE.PointLight(e.color, e.intensity, e.distance, e.decay);
                        break;
                    case"SpotLight":
                        a = new THREE.SpotLight(e.color, e.intensity, e.distance, e.angle, e.penumbra, e.decay);
                        break;
                    case"HemisphereLight":
                        a = new THREE.HemisphereLight(e.color, e.groundColor, e.intensity);
                        break;
                    case"Mesh":
                        var s = i(e.geometry), c = o(e.material);
                        a = s.bones && s.bones.length > 0 ? new THREE.SkinnedMesh(s, c) : new THREE.Mesh(s, c);
                        break;
                    case"LOD":
                        a = new THREE.LOD;
                        break;
                    case"Line":
                        a = new THREE.Line(i(e.geometry), o(e.material), e.mode);
                        break;
                    case"LineSegments":
                        a = new THREE.LineSegments(i(e.geometry), o(e.material));
                        break;
                    case"PointCloud":
                    case"Points":
                        a = new THREE.Points(i(e.geometry), o(e.material));
                        break;
                    case"Sprite":
                        a = new THREE.Sprite(o(e.material));
                        break;
                    case"Group":
                        a = new THREE.Group;
                        break;
                    default:
                        a = new THREE.Object3D
                }
                if (a.uuid = e.uuid, void 0 !== e.name && (a.name = e.name), void 0 !== e.matrix ? (t.fromArray(e.matrix), t.decompose(a.position, a.quaternion, a.scale)) : (void 0 !== e.position && a.position.fromArray(e.position), void 0 !== e.rotation && a.rotation.fromArray(e.rotation), void 0 !== e.scale && a.scale.fromArray(e.scale)), void 0 !== e.castShadow && (a.castShadow = e.castShadow), void 0 !== e.receiveShadow && (a.receiveShadow = e.receiveShadow), void 0 !== e.visible && (a.visible = e.visible), void 0 !== e.userData && (a.userData = e.userData), void 0 !== e.children) for (var u in e.children) a.add(this.parseObject(e.children[u], n, r));
                if ("LOD" === e.type) for (var l = e.levels, h = 0; h < l.length; h++) {
                    var f = l[h], u = a.getObjectByProperty("uuid", f.object);
                    void 0 !== u && a.addLevel(u, f.distance)
                }
                return void 0 !== e.layers && (a.layers.mask = e.layers), a
            }
        }()
    }), t.exports = n
}, function (t, e, n) {
    function r(t, e) {
        return void 0 !== t ? t : e
    }

    var i = n(32), o = n(0), a = {
        aoFactor: "uAOPBRFactor",
        albedoFactor: "uAlbedoPBRFactor",
        glossFactor: "uGlossinessPBRFactor",
        metalFactor: "uMetalnessPBRFactor",
        opacity: "uOpacityFactor",
        normalMapFactor: "uNormalMapFactor",
        f0Factor: "uSpecularF0Factor",
        albedoMap: "sTextureAlbedoMap",
        normalMap: "sTextureNormalMap",
        normalMap2: "sTextureNormalMap2",
        aoMap: "sTextureAOMap",
        aoMap2: "sTextureAOMap2",
        metalGlossMap: "sTextureMetalGlossMap",
        packedMap: "sTexturePackedMap",
        emissiveMap: "sTextureEmissiveMap",
        lightMap: "sTextureLightMap",
        lightMapM: "sTextureLightMapM",
        lightMapDir: "sTextureLightMapDir",
        cubemap: "sSpecularPBR",
        panorama: "sPanoramaPBR",
        sph: "uDiffuseSPH",
        exposure: "uEnvironmentExposure",
        transform: "uEnvironmentTransform",
        occludeSpecular: "uOccludeSpecular",
        alphaTest: "uAlphaTest",
        color: "uColor",
        contrast: "uContrast"
    }, s = function (t) {
        t = Object.assign({
            uniforms: {
                uAOPBRFactor: {type: "f", value: 1},
                uAlbedoPBRFactor: {type: "f", value: 1},
                uGlossinessPBRFactor: {type: "f", value: 1},
                uMetalnessPBRFactor: {type: "f", value: 1},
                uNormalMapFactor: {type: "f", value: 1},
                uSpecularF0Factor: {type: "f", value: 1},
                uEnvironmentExposure: {type: "f", value: 1},
                uOpacityFactor: {type: "f", value: 1},
                sTextureAlbedoMap: {type: "t", value: null},
                sTextureAlbedoMap2: {type: "t", value: null},
                sTextureNormalMap: {type: "t", value: null},
                sTextureNormalMap2: {type: "t", value: null},
                sTextureAOMap: {type: "t", value: null},
                sTextureAOMap2: {type: "t", value: null},
                sTextureMetalGlossMap: {type: "t", value: null},
                sTexturePackedMap: {type: "t", value: null},
                sTextureEmissiveMap: {type: "t", value: null},
                sTextureLightMap: {type: "t", value: null},
                sTextureLightMapM: {type: "t", value: null},
                sTextureLightMapDir: {type: "t", value: null},
                sSpecularPBR: {type: "t", value: null},
                sPanoramaPBR: {type: "t", value: null},
                uTextureEnvironmentSpecularPBRLodRange: {type: "v2", value: new THREE.Vector2(10, 5)},
                uTextureEnvironmentSpecularPBRTextureSize: {type: "v2", value: new THREE.Vector2},
                uDiffuseSPH: {type: "3fv", value: null},
                uFlipY: {type: "i", value: 0},
                uOccludeSpecular: {type: "i", value: 0},
                uOutputLinear: {type: "i", value: 0},
                uEnvironmentTransform: {type: "m4", value: new THREE.Matrix4},
                uMode: {type: "i", value: 0},
                uColor: {type: "c", value: null},
                uAlphaTest: {type: "f", value: 0},
                uContrast: {type: "f", value: 1.1},
                offsetRepeat: {type: "v4", value: new THREE.Vector4(0, 0, 1, 1)},
                offsetRepeatDetail: {type: "v4", value: new THREE.Vector4(0, 0, 1, 1)},
                viewLightDir: {type: "v3", value: new THREE.Vector3},
                lightColor: {type: "c", value: new THREE.Color},
                highlights: {type: "i", value: 1}
            }
        }, t), i.call(this, t), Object.keys(this.uniforms).forEach(function (t) {
            this.onPropertyChange(t, function (e) {
                this.uniforms[t].value = e
            })
        }, this), _.each(a, function (t, e) {
            this.onPropertyChange(e, function (e) {
                this[t] = e
            })
        }, this), this.extensions = {
            derivatives: !0,
            shaderTextureLOD: null !== THREE.Extensions.get("EXT_shader_texture_lod")
        }, this.pbr = !0
    };
    s.inherit(i, {
        _clone: function (t) {
            var e = t || new s;
            return i.prototype.clone.call(this, e), e.name = this.name, e.transparent = this.transparent, _.each(this.uniforms, function (t, n) {
                var r = t.type;
                "v2" === r || "m4" === r ? e.uniforms[n].value.copy(t.value) : e.uniforms[n].value = t.value
            }, this), e
        }, clone: function () {
            var t = s.create(this.createOptions);
            return t.uuid = THREE.Math.generateUUID(), t
        }, updateEnvironmentTransform: function () {
            var t = new THREE.Quaternion;
            return function (e) {
                e.getWorldQuaternion(t).inverse(), this.uniforms.uEnvironmentTransform.value.makeRotationFromQuaternion(t)
            }
        }(), refreshOffsetRepeat: function () {
            var t;
            if (this.defines.USE_ALBEDOMAP ? t = this.sTextureAlbedoMap : this.defines.USE_NORMALMAP ? t = this.sTextureNormalMap : this.defines.USE_AOMAP && (t = this.sTextureAOMap), void 0 !== t) {
                var e = t.offset, n = t.repeat;
                this.uniforms.offsetRepeat.value.set(e.x, e.y, n.x, n.y)
            }
        }, refreshOffsetRepeatDetail: function () {
            var t = this.sTextureNormalMap2;
            if (void 0 !== t) {
                var e = t.offset, n = t.repeat;
                this.uniforms.offsetRepeatDetail.value.set(e.x, e.y, n.x, n.y)
            }
        }, refreshUniforms: function (t) {
            this.updateEnvironmentTransform(t)
        }
    }), s.create = function (t) {
        var e = new s({vertexShader: t.vertexShader, fragmentShader: t.fragmentShader});
        e.createOptions = t, e.uuid = t.uuid, e.name = t.name, e.transparent = r(t.transparent, !1), e.polygonOffset = r(t.polygonOffset, !1), e.polygonOffsetUnits = r(t.polygonOffsetUnits, 0), e.polygonOffsetFactor = r(t.polygonOffsetFactor, 0);
        var n, i, a = o.getTexture("textures/white.png"), c = o.getTexture("textures/normal.png"), u = t.albedoMap || a,
            l = t.albedoMap2 || a, h = t.normalMap || c, f = t.normalMap2 || c, p = t.aoMap || a, d = t.aoMap2 || a,
            m = t.metalGlossMap || a, v = t.packedMap || a, g = t.emissiveMap || a, y = t.lightMap || a,
            _ = t.lightMapM || a, b = t.lightMapDir || a, E = o.getSH(t.environment);
        return e.extensions.shaderTextureLOD ? n = o.getCubemap(t.environment) : i = o.getPanorama(t.environment), t.albedoMap && (e.defines.USE_ALBEDOMAP = !0), t.albedoMap2 && (e.defines.USE_ALBEDOMAP2 = !0), t.normalMap && (e.defines.USE_NORMALMAP = !0), t.normalMap2 && (e.defines.USE_NORMALMAP2 = !0), t.aoMap && (e.defines.USE_AOMAP = !0), t.aoMap2 && (e.defines.USE_AOMAP2 = !0), t.metalGlossMap && (e.defines.USE_METALGLOSSMAP = !0), t.packedMap && (e.defines.USE_PACKEDMAP = !0), t.emissiveMap && (e.defines.USE_EMISSIVEMAP = !0), t.lightMap && (e.defines.USE_LIGHTMAP = !0), t.lightMapDir && (e.defines.USE_LIGHTMAP_DIR = !0), e.uAlbedoPBRFactor = r(t.albedoFactor, 1), e.uNormalMapFactor = r(t.normalMapFactor, 1), e.uMetalnessPBRFactor = r(t.metalFactor, 1), e.uGlossinessPBRFactor = r(t.glossFactor, 1), e.uAOPBRFactor = r(t.aoFactor, 1), e.uSpecularF0Factor = r(t.f0Factor, .5), e.uEnvironmentExposure = r(t.exposure, 1), e.occludeSpecular = r(t.occludeSpecular ? 1 : 0, 1), e.uFlipY = r(t.flipNormals, 0), e.opacity = r(t.opacity, 1), e.color = (new THREE.Color).setHex(void 0 !== t.color ? t.color : 16777215), e.side = r(t.side, THREE.FrontSide), u.needsUpdate = !0, l.needsUpdate = !0, h.needsUpdate = !0, f.needsUpdate = !0, p.needsUpdate = !0, d.needsUpdate = !0, m.needsUpdate = !0, v.needsUpdate = !0, g.needsUpdate = !0, y.needsUpdate = !0, _.needsUpdate = !0, b.needsUpdate = !0, n && (n.needsUpdate = !0), i && (i.needsUpdate = !0), e.sTextureAlbedoMap = u, e.sTextureAlbedoMap2 = l, e.sTextureNormalMap = h, e.sTextureNormalMap2 = f, e.sTextureAOMap = p, e.sTextureAOMap2 = d, e.sTextureMetalGlossMap = m, e.sTexturePackedMap = v, e.sTextureEmissiveMap = g, e.sTextureLightMap = y, e.sTextureLightMapM = _, e.sTextureLightMapDir = b, e.sSpecularPBR = n, e.sPanoramaPBR = i, E && (e.uDiffuseSPH = new Float32Array(E, 27)), e.uEnvironmentTransform = new THREE.Matrix4, t.alphaTest && (e.alphaTest = t.alphaTest, e.defines.ALPHATEST = !0), e.extensions.shaderTextureLOD ? (e.defines.CUBEMAP = !0, e.uniforms.uTextureEnvironmentSpecularPBRTextureSize.value.set(256, 256)) : (e.defines.PANORAMA = !0, e.uniforms.uTextureEnvironmentSpecularPBRTextureSize.value.set(1024, 1024)), e.refreshOffsetRepeat(), e.refreshOffsetRepeatDetail(), e
    }, t.exports = s
}, function (t, e, n) {
    var r = n(40), i = {_timers: {}};
    i.createTimer = function (t) {
        var e = _.uniqueId("timer_"), n = new r(t);
        return n.id = e, i._timers[e] = n, n
    }, i.delay = function (t, e, n) {
        return i.createTimer({
            duration: t, onEnd: function () {
                e.call(n), delete i._timers[this.id]
            }
        }).start()
    }, i.updateTimers = function (t) {
        _.each(i._timers, function (e) {
            e.update(t)
        })
    }, i.clearTimers = function () {
        _.each(i._timers, function (t) {
            t.onEnd = null
        }), i._timers = {}
    }, t.exports = i
}, function (t, e) {
    var n = {
        isLatestAvailable: function () {
            return void 0 !== navigator.getVRDisplays
        }, isAvailable: function () {
            return void 0 !== navigator.getVRDisplays || void 0 !== navigator.getVRDevices
        }, getMessage: function () {
            var t;
            if (navigator.getVRDisplays ? navigator.getVRDisplays().then(function (e) {
                0 === e.length && (t = "WebVR supported, but no VRDisplays found.")
            }) : t = navigator.getVRDevices ? 'Your browser supports WebVR but not the latest version. See <a href="http://webvr.info">webvr.info</a> for more info.' : 'Your browser does not support WebVR. See <a href="http://webvr.info">webvr.info</a> for assistance.', void 0 !== t) {
                var e = document.createElement("div");
                e.style.position = "absolute", e.style.left = "0", e.style.top = "0", e.style.right = "0", e.style.zIndex = "999", e.align = "center";
                var n = document.createElement("div");
                return n.style.fontFamily = "sans-serif", n.style.fontSize = "16px", n.style.fontStyle = "normal", n.style.lineHeight = "26px", n.style.backgroundColor = "#fff", n.style.color = "#000", n.style.padding = "10px 20px", n.style.margin = "50px", n.style.display = "inline-block", n.innerHTML = t, e.appendChild(n), e
            }
        }, getButton: function (t) {
            var e = document.createElement("button");
            return e.style.position = "absolute", e.style.left = "calc(50% - 50px)", e.style.bottom = "20px", e.style.width = "100px", e.style.border = "0", e.style.padding = "8px", e.style.cursor = "pointer", e.style.backgroundColor = "#000", e.style.color = "#fff", e.style.fontFamily = "sans-serif", e.style.fontSize = "13px", e.style.fontStyle = "normal", e.style.textAlign = "center", e.style.zIndex = "999", e.textContent = "ENTER VR", e.onclick = function () {
                t.isPresenting ? t.exitPresent() : t.requestPresent()
            }, window.addEventListener("vrdisplaypresentchange", function (n) {
                e.textContent = t.isPresenting ? "EXIT VR" : "ENTER VR"
            }, !1), e
        }
    };
    t.exports = n
}, function (t, e, n) {
    function r() {
        P.removeClass("visible"), setTimeout(function () {
            H.addClass("visible")
        }, 400)
    }

    function i(t, e, n) {
        var r = ($(window).width() - e) / 2, i = ($(window).height() - n) / 2,
            o = "status=1,width=" + e + ",height=" + n + ",top=" + i + ",left=" + r;
        return window.open(t, "share", o), !1
    }

    function o() {
        window.isMobile && _.defer(function () {
            var t = L.outerHeight(!0) - D.height(), e = I.outerHeight(),
                n = window.innerHeight ? window.innerHeight : $(window).height(), r = n - (t + e);
            D.css("height", r)
        })
    }

    function a(t) {
        l = new m({
            vr: void 0 !== t,
            vrDisplay: t,
            preserveDrawingBuffer: void 0 !== t,
            maxPixelRatio: 1.5,
            fps: !1,
            logCalls: !1
        }), l.renderer.setClearColor(16777215), c()
    }

    function s(t) {
        return p.texturePath = w + t + "/", d.loadScene(t, w + "scenes/", l, g)
    }

    function c() {
        S.show(), o();
        var t = {
            geometries: [y, b, E],
            sh: ["room", "studio"],
            textures: ["textures/white.png", "textures/normal.png", "textures/waternormals.jpg", "textures/marker.png", "textures/circle.png", "textures/corner-gradient.png", "textures/flare.png"]
        };
        THREE.Extensions.get("EXT_shader_texture_lod") ? t.cubemaps = ["room/cubemap.bin"] : t.panoramas = ["room/panorama.bin"], p.environmentPath = w + "environments", p.geometryPath = w + "scenes/data/", new f(t).load().then(function (t) {
            s(E).then(function () {
                s(b).then(function () {
                    s(y).then(function () {
                        l.init(), _.defer(function () {
                            O.show(), S.hide()
                        }), h.AUTOSTART && !VRenabled && (N = !0, u(), H.addClass("visible"))
                    })
                })
            })
        })
    }

    function u() {
        B && l.enterVR(), l.start(), C.hide(), j.addClass("started"), T.addClass("state-about in-app"), P.removeClass("hidden"), window.isMobile || P.show(), $(window).trigger("resize"), H.addClass("visible"), setTimeout(function () {
            k.remove()
        }, 200)
    }

    n(14), n(15);
    var l, h = n(5), f = n(18), p = n(0), d = n(30), m = n(38), v = n(12), g = n(76), y = "interior2", b = "exterior2",
        E = "start", w = window.isMobile ? "assets_mobile/" : "assets/", x = $('[data-ref="sharing"]'),
        T = $('[data-ref="panel_container"]'), R = $('[data-ref="about_link"]'), M = $('[data-ref="close_about"]'),
        P = $('[data-ref="panel"]'), C = $('[data-ref="border"]'), S = $('[data-ref="progress"]'),
        O = $('[data-ref="start"]'), j = $(".loading"), k = $(".loading .background"), A = $(".percentage"),
        F = $(".warning"), H = $('[data-ref="about_button"]'), L = $('[data-ref="titlescreen_main"]'),
        D = $('[data-ref="titlescreen_illustration"]'), I = $('[data-ref="titlescreen_footer"]'), N = !1, B = !1;
    p.manager.onProgress = function (t, e, n) {
        A.html(Math.round(e / h.ASSET_COUNT * 100)), o()
    }, window.VRenabled = v.isAvailable();
    var U = v.isLatestAvailable();
    VRenabled ? U || F.html("<img src='img/missing-headset.png'>Your version of WebVR is out of date. <a href='http://webvr.info'>Fix this</a>") : F.html("<img src='img/missing-headset.png'>You browser does not support WebVR. <br/>Falling back to non-VR mode."), VRenabled && navigator.getVRDisplays ? navigator.getVRDisplays().then(function (t) {
        t.length > 0 ? (a(t[0]), B = !0) : (console.error("No VR display"), F.html("<img src='img/missing-headset.png'>Your browser supports WebVR, but we couldn'boot find your headset. Falling back to non-VR mode."), a())
    }.bind(this)).catch(function () {
        console.error("No VR display")
    }) : a(), $("document").ready(function () {
        o(), window.isMobile && $("body").addClass("mobile"), x.on("tap", function () {
            i($(this).data("href"), $(this).data("width"), $(this).data("height"))
        }), R.on("tap", function () {
            T.addClass("state-about")
        }), M.on("tap", function () {
            N ? r() : T.removeClass("state-about")
        }), O.on("tap", function () {
            N || (N = !0, VRenabled || window.isMobile ? (P.hide(), u()) : (P.addClass("hidden"), setTimeout(function () {
                P.hide(), C.addClass("hidden"), setTimeout(function () {
                    u()
                }, 400)
            }, 700)))
        }), H.on("tap", function (t) {
            H.removeClass("visible"), P.addClass("visible")
        }), l.on("closeAbout", function () {
            r()
        }), P.on("mouseenter", function () {
            $("body").removeClass("hovering")
        }), $(window).on("resize", o)
    })
}, function (t, e) {
}, function (t, e, n) {
    n(16), window._ = n(17), Number.prototype.lerp = function (t, e) {
        return this + (t - this) * e
    }, String.prototype.endsWith || (String.prototype.endsWith = function (t, e) {
        var n = this.toString();
        ("number" != typeof e || !isFinite(e) || Math.floor(e) !== e || e > n.length) && (e = n.length), e -= t.length;
        var r = n.indexOf(t, e);
        return -1 !== r && r === e
    }), Function.prototype.inherit = function (t, e) {
        if (!t || !_.isFunction(t)) throw"parent argument must be a function";
        this.prototype = _.extend(Object.create(t.prototype), e)
    }, Function.prototype.mixin = function (t) {
        _.each(t, function (t, e) {
            void 0 === this.prototype[e] && (this.prototype[e] = t)
        }, this)
    }, window.WIDTH = window.innerWidth, window.HEIGHT = window.innerHeight, window.mouseX = 0, window.mouseY = 0, window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), window.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}, function (t, e) {
    void 0 === Date.now && (Date.now = function () {
        return (new Date).valueOf()
    }), window.TWEEN = function () {
        var t = [], e = [], n = [];
        return {
            REVISION: "14", getAll: function () {
                return t
            }, removeAll: function () {
                t = []
            }, add: function (t) {
                e.push(t)
            }, remove: function (t) {
                n.push(t)
            }, update: function (r) {
                var i = 0;
                for (r = void 0 !== r ? r : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(); i < t.length;) t[i].update(r) ? i++ : t.splice(i, 1);
                return n.length > 0 && (n.forEach(function (e) {
                    var n = t.indexOf(e);
                    -1 !== n && t.splice(n, 1)
                }), n = []), e.length > 0 && (e.forEach(function (e) {
                    t.push(e)
                }), e = []), !0
            }
        }
    }(), TWEEN.Tween = function (t) {
        var e, n, r, i, o, a, s, c, u, l, h, f, p, d, m, v, g, y, _, b;
        this.reset = function (t) {
            return e = t, n = 0, r = {}, i = {}, o = {}, a = 1e3, s = 0, c = !1, u = !1, l = !1, h = 0, f = null, p = TWEEN.Easing.Linear.None, d = TWEEN.Interpolation.Linear, m = [], v = null, g = !1, y = null, _ = null, b = null, this
        }, this.to = function (t, e) {
            return void 0 !== e && (a = e), i = t, this
        }, this.start = function (t) {
            TWEEN.add(this), u = !0, g = !1, f = void 0 !== t ? t : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(), f += h;
            for (var n in i) r[n] = e[n], o[n] = r[n] || 0;
            return this
        }, this.stop = function () {
            return u ? (TWEEN.remove(this), u = !1, null !== b && b.call(e), this.stopChainedTweens(), this) : this
        }, this.stopChainedTweens = function () {
            for (var t = 0, e = m.length; t < e; t++) m[t].stop()
        }, this.delay = function (t) {
            return h = t, this
        }, this.repeat = function (t) {
            return s = t, this
        }, this.yoyo = function (t) {
            return c = t, this
        }, this.easing = function (t) {
            return p = t, this
        }, this.interpolation = function (t) {
            return d = t, this
        }, this.chain = function () {
            return m = arguments, this
        }, this.onStart = function (t) {
            return v = t, this
        }, this.onUpdate = function (t) {
            return y = t, this
        }, this.onComplete = function (t) {
            return _ = t, this
        }, this.onStop = function (t) {
            return b = t, this
        }, this.update = function (t) {
            var o;
            if (t < f) return !0;
            if (!u) return !1;
            !1 === g && (null !== v && v.call(e), g = !0);
            var s = (t - f) / a;
            s = s > 1 ? 1 : s, n = s;
            var c = p(s);
            for (o in i) {
                var l = r[o] || 0, h = i[o];
                e[o] = l + (h - l) * c
            }
            if (null !== y && y.call(e, c), 1 == s) {
                null !== _ && _.call(e);
                for (var d = 0, b = m.length; d < b; d++) m[d].start(t);
                return !1
            }
            return !0
        }, this.getProgress = function () {
            return n
        }, void 0 !== t && this.reset(t)
    }, TWEEN.Easing = {
        Linear: {
            None: function (t) {
                return t
            }
        }, Quadratic: {
            In: function (t) {
                return t * t
            }, Out: function (t) {
                return t * (2 - t)
            }, InOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
            }
        }, Cubic: {
            In: function (t) {
                return t * t * t
            }, Out: function (t) {
                return --t * t * t + 1
            }, InOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
            }
        }, Quartic: {
            In: function (t) {
                return t * t * t * t
            }, Out: function (t) {
                return 1 - --t * t * t * t
            }, InOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
            }
        }, Quintic: {
            In: function (t) {
                return t * t * t * t * t
            }, Out: function (t) {
                return --t * t * t * t * t + 1
            }, InOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
            }
        }, Sinusoidal: {
            In: function (t) {
                return 1 - Math.cos(t * Math.PI / 2)
            }, Out: function (t) {
                return Math.sin(t * Math.PI / 2)
            }, InOut: function (t) {
                return .5 * (1 - Math.cos(Math.PI * t))
            }
        }, Exponential: {
            In: function (t) {
                return 0 === t ? 0 : Math.pow(1024, t - 1)
            }, Out: function (t) {
                return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
            }, InOut: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
            }
        }, Circular: {
            In: function (t) {
                return 1 - Math.sqrt(1 - t * t)
            }, Out: function (t) {
                return Math.sqrt(1 - --t * t)
            }, InOut: function (t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            }
        }, Elastic: {
            In: function (t) {
                var e, n = .1;
                return 0 === t ? 0 : 1 === t ? 1 : (!n || n < 1 ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), -n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4))
            }, Out: function (t) {
                var e, n = .1;
                return 0 === t ? 0 : 1 === t ? 1 : (!n || n < 1 ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), n * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / .4) + 1)
            }, InOut: function (t) {
                var e, n = .1;
                return 0 === t ? 0 : 1 === t ? 1 : (!n || n < 1 ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), (t *= 2) < 1 ? n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * -.5 : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * .5 + 1)
            }
        }, Back: {
            In: function (t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e)
            }, Out: function (t) {
                var e = 1.70158;
                return --t * t * ((e + 1) * t + e) + 1
            }, InOut: function (t) {
                var e = 2.5949095;
                return (t *= 2) < 1 ? t * t * ((e + 1) * t - e) * .5 : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
            }
        }, Bounce: {
            In: function (t) {
                return 1 - TWEEN.Easing.Bounce.Out(1 - t)
            }, Out: function (t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }, InOut: function (t) {
                return t < .5 ? .5 * TWEEN.Easing.Bounce.In(2 * t) : .5 * TWEEN.Easing.Bounce.Out(2 * t - 1) + .5
            }
        }
    }, TWEEN.Interpolation = {
        Linear: function (t, e) {
            var n = t.length - 1, r = n * e, i = Math.floor(r), o = TWEEN.Interpolation.Utils.Linear;
            return e < 0 ? o(t[0], t[1], r) : e > 1 ? o(t[n], t[n - 1], n - r) : o(t[i], t[i + 1 > n ? n : i + 1], r - i)
        }, Bezier: function (t, e) {
            var n, r = 0, i = t.length - 1, o = Math.pow, a = TWEEN.Interpolation.Utils.Bernstein;
            for (n = 0; n <= i; n++) r += o(1 - e, i - n) * o(e, n) * t[n] * a(i, n);
            return r
        }, CatmullRom: function (t, e) {
            var n = t.length - 1, r = n * e, i = Math.floor(r), o = TWEEN.Interpolation.Utils.CatmullRom;
            return t[0] === t[n] ? (e < 0 && (i = Math.floor(r = n * (1 + e))), o(t[(i - 1 + n) % n], t[i], t[(i + 1) % n], t[(i + 2) % n], r - i)) : e < 0 ? t[0] - (o(t[0], t[0], t[1], t[1], -r) - t[0]) : e > 1 ? t[n] - (o(t[n], t[n], t[n - 1], t[n - 1], r - n) - t[n]) : o(t[i ? i - 1 : 0], t[i], t[n < i + 1 ? n : i + 1], t[n < i + 2 ? n : i + 2], r - i)
        }, Utils: {
            Linear: function (t, e, n) {
                return (e - t) * n + t
            }, Bernstein: function (t, e) {
                var n = TWEEN.Interpolation.Utils.Factorial;
                return n(t) / n(e) / n(t - e)
            }, Factorial: function () {
                var t = [1];
                return function (e) {
                    var n, r = 1;
                    if (t[e]) return t[e];
                    for (n = e; n > 1; n--) r *= n;
                    return t[e] = r
                }
            }(), CatmullRom: function (t, e, n, r, i) {
                var o = .5 * (n - t), a = .5 * (r - e), s = i * i;
                return (2 * e - 2 * n + o + a) * (i * s) + (-3 * e + 3 * n - 2 * o - a) * s + o * i + e
            }
        }
    }, void 0 !== t && t.exports && (t.exports = TWEEN)
}, function (t, e, n) {
    (function (t, r) {
        var i;
        (function () {
            function o(t, e) {
                if (t !== e) {
                    var n = null === t, r = t === P, i = t === t, o = null === e, a = e === P, s = e === e;
                    if (t > e && !o || !i || n && !a && s || r && s) return 1;
                    if (t < e && !n || !s || o && !r && i || a && i) return -1
                }
                return 0
            }

            function a(t, e, n) {
                for (var r = t.length, i = n ? r : -1; n ? i-- : ++i < r;) if (e(t[i], i, t)) return i;
                return -1
            }

            function s(t, e, n) {
                if (e !== e) return y(t, n);
                for (var r = n - 1, i = t.length; ++r < i;) if (t[r] === e) return r;
                return -1
            }

            function c(t) {
                return "function" == typeof t || !1
            }

            function u(t) {
                return null == t ? "" : t + ""
            }

            function l(t, e) {
                for (var n = -1, r = t.length; ++n < r && e.indexOf(t.charAt(n)) > -1;) ;
                return n
            }

            function h(t, e) {
                for (var n = t.length; n-- && e.indexOf(t.charAt(n)) > -1;) ;
                return n
            }

            function f(t, e) {
                return o(t.criteria, e.criteria) || t.index - e.index
            }

            function p(t, e, n) {
                for (var r = -1, i = t.criteria, a = e.criteria, s = i.length, c = n.length; ++r < s;) {
                    var u = o(i[r], a[r]);
                    if (u) {
                        if (r >= c) return u;
                        var l = n[r];
                        return u * ("asc" === l || !0 === l ? 1 : -1)
                    }
                }
                return t.index - e.index
            }

            function d(t) {
                return zt[t]
            }

            function m(t) {
                return Gt[t]
            }

            function v(t, e, n) {
                return e ? t = qt[t] : n && (t = Yt[t]), "\\" + t
            }

            function g(t) {
                return "\\" + Yt[t]
            }

            function y(t, e, n) {
                for (var r = t.length, i = e + (n ? 0 : -1); n ? i-- : ++i < r;) {
                    var o = t[i];
                    if (o !== o) return i
                }
                return -1
            }

            function isObjectLike(t) {
                return !!t && "object" == typeof t
            }

            function b(t) {
                return t <= 160 && t >= 9 && t <= 13 || 32 == t || 160 == t || 5760 == t || 6158 == t || t >= 8192 && (t <= 8202 || 8232 == t || 8233 == t || 8239 == t || 8287 == t || 12288 == t || 65279 == t)
            }

            function E(t, e) {
                for (var n = -1, r = t.length, i = -1, o = []; ++n < r;) t[n] === e && (t[n] = $, o[++i] = n);
                return o
            }

            function w(t, e) {
                for (var n, r = -1, i = t.length, o = -1, a = []; ++r < i;) {
                    var s = t[r], c = e ? e(s, r, t) : s;
                    r && n === c || (n = c, a[++o] = s)
                }
                return a
            }

            function x(t) {
                for (var e = -1, n = t.length; ++e < n && b(t.charCodeAt(e));) ;
                return e
            }

            function T(t) {
                for (var e = t.length; e-- && b(t.charCodeAt(e));) ;
                return e
            }

            function R(t) {
                return Wt[t]
            }

            function M(t) {
                function exports(value) {
                    if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
                        if (value instanceof LodashWrapper) return value;
                        if (ea.call(value, "__chain__") && ea.call(value, "__wrapped__")) return wrapperClone(value)
                    }
                    return new LodashWrapper(value)
                }

                function n() {
                }

                function LodashWrapper(t, e, n) {
                    this.__wrapped__ = t, this.__actions__ = n || [], this.__chain__ = !!e
                }

                function LazyWrapper(t) {
                    this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Ca, this.__views__ = []
                }

                function b() {
                    var t = new LazyWrapper(this.__wrapped__);
                    return t.__actions__ = ne(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = ne(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = ne(this.__views__), t
                }

                function zt() {
                    if (this.__filtered__) {
                        var t = new LazyWrapper(this);
                        t.__dir__ = -1, t.__filtered__ = !0
                    } else t = this.clone(), t.__dir__ *= -1;
                    return t
                }

                function Gt() {
                    var t = this.__wrapped__.value(), e = this.__dir__, n = isArray(t), r = e < 0, i = n ? t.length : 0,
                        o = $n(0, i, this.__views__), a = o.start, s = o.end, c = s - a, u = r ? s : a - 1,
                        l = this.__iteratees__, h = l.length, f = 0, p = xa(c, this.__takeCount__);
                    if (!n || i < V || i == c && p == c) return nn(r && n ? t.reverse() : t, this.__actions__);
                    var d = [];
                    t:for (; c-- && f < p;) {
                        u += e;
                        for (var m = -1, v = t[u]; ++m < h;) {
                            var g = l[m], y = g.iteratee, _ = g.type, b = y(v);
                            if (_ == G) v = b; else if (!b) {
                                if (_ == z) continue t;
                                break t
                            }
                        }
                        d[f++] = v
                    }
                    return d
                }

                function Wt() {
                    this.__data__ = {}
                }

                function $t(t) {
                    return this.has(t) && delete this.__data__[t]
                }

                function qt(t) {
                    return "__proto__" == t ? P : this.__data__[t]
                }

                function Yt(t) {
                    return "__proto__" != t && ea.call(this.__data__, t)
                }

                function Xt(t, e) {
                    return "__proto__" != t && (this.__data__[t] = e), this
                }

                function Qt(t) {
                    var e = t ? t.length : 0;
                    for (this.data = {hash: ga(null), set: new ha}; e--;) this.push(t[e])
                }

                function Zt(t, e) {
                    var n = t.data;
                    return ("string" == typeof e || Fi(e) ? n.set.has(e) : n.hash[e]) ? 0 : -1
                }

                function Kt(t) {
                    var e = this.data;
                    "string" == typeof t || Fi(t) ? e.set.add(t) : e.hash[t] = !0
                }

                function Jt(t, e) {
                    for (var n = -1, r = t.length, i = -1, o = e.length, a = Uo(r + o); ++n < r;) a[n] = t[n];
                    for (; ++i < o;) a[n++] = e[i];
                    return a
                }

                function ne(t, e) {
                    var n = -1, r = t.length;
                    for (e || (e = Uo(r)); ++n < r;) e[n] = t[n];
                    return e
                }

                function re(t, e) {
                    for (var n = -1, r = t.length; ++n < r && !1 !== e(t[n], n, t);) ;
                    return t
                }

                function ie(t, e) {
                    for (var n = t.length; n-- && !1 !== e(t[n], n, t);) ;
                    return t
                }

                function oe(t, e) {
                    for (var n = -1, r = t.length; ++n < r;) if (!e(t[n], n, t)) return !1;
                    return !0
                }

                function ae(t, e, n, r) {
                    for (var i = -1, o = t.length, a = r, s = a; ++i < o;) {
                        var c = t[i], u = +e(c);
                        n(u, a) && (a = u, s = c)
                    }
                    return s
                }

                function se(t, e) {
                    for (var n = -1, r = t.length, i = -1, o = []; ++n < r;) {
                        var a = t[n];
                        e(a, n, t) && (o[++i] = a)
                    }
                    return o
                }

                function ce(t, e) {
                    for (var n = -1, r = t.length, i = Uo(r); ++n < r;) i[n] = e(t[n], n, t);
                    return i
                }

                function ue(t, e) {
                    for (var n = -1, r = e.length, i = t.length; ++n < r;) t[i + n] = e[n];
                    return t
                }

                function le(t, e, n, r) {
                    var i = -1, o = t.length;
                    for (r && o && (n = t[++i]); ++i < o;) n = e(n, t[i], i, t);
                    return n
                }

                function he(t, e, n, r) {
                    var i = t.length;
                    for (r && i && (n = t[--i]); i--;) n = e(n, t[i], i, t);
                    return n
                }

                function fe(t, e) {
                    for (var n = -1, r = t.length; ++n < r;) if (e(t[n], n, t)) return !0;
                    return !1
                }

                function pe(t, e) {
                    for (var n = t.length, r = 0; n--;) r += +e(t[n]) || 0;
                    return r
                }

                function de(t, e) {
                    return t === P ? e : t
                }

                function me(t, e, n, r) {
                    return t !== P && ea.call(r, n) ? t : e
                }

                function ve(t, e, n) {
                    for (var r = -1, i = Bs(e), o = i.length; ++r < o;) {
                        var a = i[r], s = t[a], c = n(s, e[a], a, t, e);
                        (c === c ? c === s : s !== s) && (s !== P || a in t) || (t[a] = c)
                    }
                    return t
                }

                function ge(t, e) {
                    return null == e ? t : _e(e, Bs(e), t)
                }

                function ye(t, e) {
                    for (var n = -1, r = null == t, i = !r && Zn(t), o = i ? t.length : 0, a = e.length, s = Uo(a); ++n < a;) {
                        var c = e[n];
                        s[n] = i ? Kn(c, o) ? t[c] : P : r ? P : t[c]
                    }
                    return s
                }

                function _e(t, e, n) {
                    n || (n = {});
                    for (var r = -1, i = e.length; ++r < i;) {
                        var o = e[r];
                        n[o] = t[o]
                    }
                    return n
                }

                function be(t, e, n) {
                    var r = typeof t;
                    return "function" == r ? e === P ? t : an(t, e, n) : null == t ? Co : "object" == r ? Ne(t) : e === P ? Fo(t) : Be(t, e)
                }

                function Ee(t, e, n, r, i, o, a) {
                    var s;
                    if (n && (s = i ? n(t, r, i) : n(t)), s !== P) return s;
                    if (!Fi(t)) return t;
                    var c = isArray(t);
                    if (c) {
                        if (s = qn(t), !e) return ne(t, s)
                    } else {
                        var u = ra.call(t), l = u == K;
                        if (u != tt && u != q && (!l || i)) return Vt[u] ? Xn(t, u, e) : i ? t : {};
                        if (s = Yn(l ? {} : t), !e) return ge(s, t)
                    }
                    o || (o = []), a || (a = []);
                    for (var h = o.length; h--;) if (o[h] == t) return a[h];
                    return o.push(t), a.push(s), (c ? re : je)(t, function (r, i) {
                        s[i] = Ee(r, e, n, i, t, o, a)
                    }), s
                }

                function we(t, e, n) {
                    if ("function" != typeof t) throw new Qo(W);
                    return fa(function () {
                        t.apply(P, n)
                    }, e)
                }

                function xe(t, e) {
                    var n = t ? t.length : 0, r = [];
                    if (!n) return r;
                    var i = -1, o = zn(), a = o == s, c = a && e.length >= V ? mn(e) : null, u = e.length;
                    c && (o = Zt, a = !1, e = c);
                    t:for (; ++i < n;) {
                        var l = t[i];
                        if (a && l === l) {
                            for (var h = u; h--;) if (e[h] === l) continue t;
                            r.push(l)
                        } else o(e, l, 0) < 0 && r.push(l)
                    }
                    return r
                }

                function Te(t, e) {
                    var n = !0;
                    return La(t, function (t, r, i) {
                        return n = !!e(t, r, i)
                    }), n
                }

                function Re(t, e, n, r) {
                    var i = r, o = i;
                    return La(t, function (t, a, s) {
                        var c = +e(t, a, s);
                        (n(c, i) || c === r && c === o) && (i = c, o = t)
                    }), o
                }

                function Me(t, e, n, r) {
                    var i = t.length;
                    for (n = null == n ? 0 : +n || 0, n < 0 && (n = -n > i ? 0 : i + n), r = r === P || r > i ? i : +r || 0, r < 0 && (r += i), i = n > r ? 0 : r >>> 0, n >>>= 0; n < i;) t[n++] = e;
                    return t
                }

                function Pe(t, e) {
                    var n = [];
                    return La(t, function (t, r, i) {
                        e(t, r, i) && n.push(t)
                    }), n
                }

                function Ce(t, e, n, r) {
                    var i;
                    return n(t, function (t, n, o) {
                        if (e(t, n, o)) return i = r ? n : t, !1
                    }), i
                }

                function Se(t, e, n, r) {
                    r || (r = []);
                    for (var i = -1, o = t.length; ++i < o;) {
                        var a = t[i];
                        isObjectLike(a) && Zn(a) && (n || isArray(a) || Ri(a)) ? e ? Se(a, e, n, r) : ue(r, a) : n || (r[r.length] = a)
                    }
                    return r
                }

                function Oe(t, e) {
                    return Ia(t, e, to)
                }

                function je(t, e) {
                    return Ia(t, e, Bs)
                }

                function ke(t, e) {
                    return Na(t, e, Bs)
                }

                function Ae(t, e) {
                    for (var n = -1, r = e.length, i = -1, o = []; ++n < r;) {
                        var a = e[n];
                        Ai(t[a]) && (o[++i] = a)
                    }
                    return o
                }

                function Fe(t, e, n) {
                    if (null != t) {
                        n !== P && n in hr(t) && (e = [n]);
                        for (var r = 0, i = e.length; null != t && r < i;) t = t[e[r++]];
                        return r && r == i ? t : P
                    }
                }

                function He(t, e, n, r, i, o) {
                    return t === e || (null == t || null == e || !Fi(t) && !isObjectLike(e) ? t !== t && e !== e : Le(t, e, He, n, r, i, o))
                }

                function Le(t, e, n, r, i, o, a) {
                    var s = isArray(t), c = isArray(e), u = Y, l = Y;
                    s || (u = ra.call(t), u == q ? u = tt : u != tt && (s = zi(t))), c || (l = ra.call(e), l == q ? l = tt : l != tt && (c = zi(e)));
                    var h = u == tt, f = l == tt, p = u == l;
                    if (p && !s && !h) return Nn(t, e, u);
                    if (!i) {
                        var d = h && ea.call(t, "__wrapped__"), m = f && ea.call(e, "__wrapped__");
                        if (d || m) return n(d ? t.value() : t, m ? e.value() : e, r, i, o, a)
                    }
                    if (!p) return !1;
                    o || (o = []), a || (a = []);
                    for (var v = o.length; v--;) if (o[v] == t) return a[v] == e;
                    o.push(t), a.push(e);
                    var g = (s ? In : Bn)(t, e, n, r, i, o, a);
                    return o.pop(), a.pop(), g
                }

                function De(t, e, n) {
                    var r = e.length, i = r, o = !n;
                    if (null == t) return !i;
                    for (t = hr(t); r--;) {
                        var a = e[r];
                        if (o && a[2] ? a[1] !== t[a[0]] : !(a[0] in t)) return !1
                    }
                    for (; ++r < i;) {
                        a = e[r];
                        var s = a[0], c = t[s], u = a[1];
                        if (o && a[2]) {
                            if (c === P && !(s in t)) return !1
                        } else {
                            var l = n ? n(c, u, s) : P;
                            if (!(l === P ? He(u, c, n, !0) : l)) return !1
                        }
                    }
                    return !0
                }

                function Ie(t, e) {
                    var n = -1, r = Zn(t) ? Uo(t.length) : [];
                    return La(t, function (t, i, o) {
                        r[++n] = e(t, i, o)
                    }), r
                }

                function Ne(t) {
                    var e = Gn(t);
                    if (1 == e.length && e[0][2]) {
                        var n = e[0][0], r = e[0][1];
                        return function (t) {
                            return null != t && (t[n] === r && (r !== P || n in hr(t)))
                        }
                    }
                    return function (t) {
                        return De(t, e)
                    }
                }

                function Be(t, e) {
                    var n = isArray(t), r = tr(t) && rr(e), i = t + "";
                    return t = fr(t), function (o) {
                        if (null == o) return !1;
                        var a = i;
                        if (o = hr(o), (n || !r) && !(a in o)) {
                            if (null == (o = 1 == t.length ? o : Fe(o, Ye(t, 0, -1)))) return !1;
                            a = Mr(t), o = hr(o)
                        }
                        return o[a] === e ? e !== P || a in o : He(e, o[a], P, !0)
                    }
                }

                function Ue(t, e, n, r, i) {
                    if (!Fi(t)) return t;
                    var o = Zn(e) && (isArray(e) || zi(e)), a = o ? P : Bs(e);
                    return re(a || e, function (s, c) {
                        if (a && (c = s, s = e[c]), isObjectLike(s)) r || (r = []), i || (i = []), Ve(t, e, c, Ue, n, r, i); else {
                            var u = t[c], l = n ? n(u, s, c, t, e) : P, h = l === P;
                            h && (l = s), l === P && (!o || c in t) || !h && (l === l ? l === u : u !== u) || (t[c] = l)
                        }
                    }), t
                }

                function Ve(t, e, n, r, i, o, a) {
                    for (var s = o.length, c = e[n]; s--;) if (o[s] == c) return void (t[n] = a[s]);
                    var u = t[n], l = i ? i(u, c, n, t, e) : P, h = l === P;
                    h && (l = c, Zn(c) && (isArray(c) || zi(c)) ? l = isArray(u) ? u : Zn(u) ? ne(u) : [] : Bi(c) || Ri(c) ? l = Ri(u) ? Yi(u) : Bi(u) ? u : {} : h = !1), o.push(c), a.push(l), h ? t[n] = r(l, c, i, o, a) : (l === l ? l !== u : u === u) && (t[n] = l)
                }

                function ze(t) {
                    return function (e) {
                        return null == e ? P : e[t]
                    }
                }

                function Ge(t) {
                    var e = t + "";
                    return t = fr(t), function (n) {
                        return Fe(n, t, e)
                    }
                }

                function We(t, e) {
                    for (var n = t ? e.length : 0; n--;) {
                        var r = e[n];
                        if (r != i && Kn(r)) {
                            var i = r;
                            pa.call(t, r, 1)
                        }
                    }
                    return t
                }

                function $e(t, e) {
                    return t + ya(Ma() * (e - t + 1))
                }

                function qe(t, e, n, r, i) {
                    return i(t, function (t, i, o) {
                        n = r ? (r = !1, t) : e(n, t, i, o)
                    }), n
                }

                function Ye(t, e, n) {
                    var r = -1, i = t.length;
                    e = null == e ? 0 : +e || 0, e < 0 && (e = -e > i ? 0 : i + e), n = n === P || n > i ? i : +n || 0, n < 0 && (n += i), i = e > n ? 0 : n - e >>> 0, e >>>= 0;
                    for (var o = Uo(i); ++r < i;) o[r] = t[r + e];
                    return o
                }

                function Xe(t, e) {
                    var n;
                    return La(t, function (t, r, i) {
                        return !(n = e(t, r, i))
                    }), !!n
                }

                function Qe(t, e) {
                    var n = t.length;
                    for (t.sort(e); n--;) t[n] = t[n].value;
                    return t
                }

                function Ze(t, e, n) {
                    var r = Un(), i = -1;
                    return e = ce(e, function (t) {
                        return r(t)
                    }), Qe(Ie(t, function (t) {
                        return {
                            criteria: ce(e, function (e) {
                                return e(t)
                            }), index: ++i, value: t
                        }
                    }), function (t, e) {
                        return p(t, e, n)
                    })
                }

                function Ke(t, e) {
                    var n = 0;
                    return La(t, function (t, r, i) {
                        n += +e(t, r, i) || 0
                    }), n
                }

                function Je(t, e) {
                    var n = -1, r = zn(), i = t.length, o = r == s, a = o && i >= V, c = a ? mn() : null, u = [];
                    c ? (r = Zt, o = !1) : (a = !1, c = e ? [] : u);
                    t:for (; ++n < i;) {
                        var l = t[n], h = e ? e(l, n, t) : l;
                        if (o && l === l) {
                            for (var f = c.length; f--;) if (c[f] === h) continue t;
                            e && c.push(h), u.push(l)
                        } else r(c, h, 0) < 0 && ((e || a) && c.push(h), u.push(l))
                    }
                    return u
                }

                function tn(t, e) {
                    for (var n = -1, r = e.length, i = Uo(r); ++n < r;) i[n] = t[e[n]];
                    return i
                }

                function en(t, e, n, r) {
                    for (var i = t.length, o = r ? i : -1; (r ? o-- : ++o < i) && e(t[o], o, t);) ;
                    return n ? Ye(t, r ? 0 : o, r ? o + 1 : i) : Ye(t, r ? o + 1 : 0, r ? i : o)
                }

                function nn(t, e) {
                    var n = t;
                    n instanceof LazyWrapper && (n = n.value());
                    for (var r = -1, o = e.length; ++r < o;) {
                        var a = e[r];
                        n = a.func.apply(a.thisArg, ue([n], a.args))
                    }
                    return n
                }

                function rn(t, e, n) {
                    var r = 0, i = t ? t.length : r;
                    if ("number" == typeof e && e === e && i <= ja) {
                        for (; r < i;) {
                            var o = r + i >>> 1, a = t[o];
                            (n ? a <= e : a < e) && null !== a ? r = o + 1 : i = o
                        }
                        return i
                    }
                    return on(t, e, Co, n)
                }

                function on(t, e, n, r) {
                    e = n(e);
                    for (var i = 0, o = t ? t.length : 0, a = e !== e, s = null === e, c = e === P; i < o;) {
                        var u = ya((i + o) / 2), l = n(t[u]), h = l !== P, f = l === l;
                        if (a) var p = f || r; else p = s ? f && h && (r || null != l) : c ? f && (r || h) : null != l && (r ? l <= e : l < e);
                        p ? i = u + 1 : o = u
                    }
                    return xa(o, Oa)
                }

                function an(t, e, n) {
                    if ("function" != typeof t) return Co;
                    if (e === P) return t;
                    switch (n) {
                        case 1:
                            return function (n) {
                                return t.call(e, n)
                            };
                        case 3:
                            return function (n, r, i) {
                                return t.call(e, n, r, i)
                            };
                        case 4:
                            return function (n, r, i, o) {
                                return t.call(e, n, r, i, o)
                            };
                        case 5:
                            return function (n, r, i, o, a) {
                                return t.call(e, n, r, i, o, a)
                            }
                    }
                    return function () {
                        return t.apply(e, arguments)
                    }
                }

                function sn(t) {
                    var e = new aa(t.byteLength);
                    return new da(e).set(new da(t)), e
                }

                function cn(t, e, n) {
                    for (var r = n.length, i = -1, o = wa(t.length - r, 0), a = -1, s = e.length, c = Uo(s + o); ++a < s;) c[a] = e[a];
                    for (; ++i < r;) c[n[i]] = t[i];
                    for (; o--;) c[a++] = t[i++];
                    return c
                }

                function un(t, e, n) {
                    for (var r = -1, i = n.length, o = -1, a = wa(t.length - i, 0), s = -1, c = e.length, u = Uo(a + c); ++o < a;) u[o] = t[o];
                    for (var l = o; ++s < c;) u[l + s] = e[s];
                    for (; ++r < i;) u[l + n[r]] = t[o++];
                    return u
                }

                function ln(t, e) {
                    return function (n, r, i) {
                        var o = e ? e() : {};
                        if (r = Un(r, i, 3), isArray(n)) for (var a = -1, s = n.length; ++a < s;) {
                            var c = n[a];
                            t(o, c, r(c, a, n), n)
                        } else La(n, function (e, n, i) {
                            t(o, e, r(e, n, i), i)
                        });
                        return o
                    }
                }

                function hn(t) {
                    return gi(function (e, n) {
                        var r = -1, i = null == e ? 0 : n.length, o = i > 2 ? n[i - 2] : P, a = i > 2 ? n[2] : P,
                            s = i > 1 ? n[i - 1] : P;
                        for ("function" == typeof o ? (o = an(o, s, 5), i -= 2) : (o = "function" == typeof s ? s : P, i -= o ? 1 : 0), a && Jn(n[0], n[1], a) && (o = i < 3 ? P : o, i = 1); ++r < i;) {
                            var c = n[r];
                            c && t(e, c, o)
                        }
                        return e
                    })
                }

                function fn(t, e) {
                    return function (n, r) {
                        var i = n ? Va(n) : 0;
                        if (!nr(i)) return t(n, r);
                        for (var o = e ? i : -1, a = hr(n); (e ? o-- : ++o < i) && !1 !== r(a[o], o, a);) ;
                        return n
                    }
                }

                function pn(t) {
                    return function (e, n, r) {
                        for (var i = hr(e), o = r(e), a = o.length, s = t ? a : -1; t ? s-- : ++s < a;) {
                            var c = o[s];
                            if (!1 === n(i[c], c, i)) break
                        }
                        return e
                    }
                }

                function dn(t, e) {
                    function n() {
                        return (this && this !== te && this instanceof n ? r : t).apply(e, arguments)
                    }

                    var r = gn(t);
                    return n
                }

                function mn(t) {
                    return ga && ha ? new Qt(t) : null
                }

                function vn(t) {
                    return function (e) {
                        for (var n = -1, r = Ro(lo(e)), i = r.length, o = ""; ++n < i;) o = t(o, r[n], n);
                        return o
                    }
                }

                function gn(t) {
                    return function () {
                        var e = arguments;
                        switch (e.length) {
                            case 0:
                                return new t;
                            case 1:
                                return new t(e[0]);
                            case 2:
                                return new t(e[0], e[1]);
                            case 3:
                                return new t(e[0], e[1], e[2]);
                            case 4:
                                return new t(e[0], e[1], e[2], e[3]);
                            case 5:
                                return new t(e[0], e[1], e[2], e[3], e[4]);
                            case 6:
                                return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
                            case 7:
                                return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6])
                        }
                        var n = Ha(t.prototype), r = t.apply(n, e);
                        return Fi(r) ? r : n
                    }
                }

                function yn(t) {
                    function e(n, r, i) {
                        i && Jn(n, r, i) && (r = P);
                        var o = Dn(n, t, P, P, P, P, P, r);
                        return o.placeholder = e.placeholder, o
                    }

                    return e
                }

                function _n(t, e) {
                    return gi(function (n) {
                        var r = n[0];
                        return null == r ? r : (n.push(e), t.apply(P, n))
                    })
                }

                function bn(t, e) {
                    return function (n, r, i) {
                        if (i && Jn(n, r, i) && (r = P), r = Un(r, i, 3), 1 == r.length) {
                            n = isArray(n) ? n : lr(n);
                            var o = ae(n, r, t, e);
                            if (!n.length || o !== e) return o
                        }
                        return Re(n, r, t, e)
                    }
                }

                function En(t, e) {
                    return function (n, r, i) {
                        if (r = Un(r, i, 3), isArray(n)) {
                            var o = a(n, r, e);
                            return o > -1 ? n[o] : P
                        }
                        return Ce(n, r, t)
                    }
                }

                function wn(t) {
                    return function (e, n, r) {
                        return e && e.length ? (n = Un(n, r, 3), a(e, n, t)) : -1
                    }
                }

                function xn(t) {
                    return function (e, n, r) {
                        return n = Un(n, r, 3), Ce(e, n, t, !0)
                    }
                }

                function Tn(t) {
                    return function () {
                        for (var e, n = arguments.length, i = t ? n : -1, o = 0, a = Uo(n); t ? i-- : ++i < n;) {
                            var s = a[o++] = arguments[i];
                            if ("function" != typeof s) throw new Qo(W);
                            !e && LodashWrapper.prototype.thru && "wrapper" == Vn(s) && (e = new LodashWrapper([], !0))
                        }
                        for (i = e ? -1 : n; ++i < n;) {
                            s = a[i];
                            var c = Vn(s), u = "wrapper" == c ? Ua(s) : P;
                            e = u && er(u[0]) && u[1] == (L | k | F | D) && !u[4].length && 1 == u[9] ? e[Vn(u[0])].apply(e, u[3]) : 1 == s.length && er(s) ? e[c]() : e.thru(s)
                        }
                        return function () {
                            var t = arguments, r = t[0];
                            if (e && 1 == t.length && isArray(r) && r.length >= V) return e.plant(r).value();
                            for (var i = 0, o = n ? a[i].apply(this, t) : r; ++i < n;) o = a[i].call(this, o);
                            return o
                        }
                    }
                }

                function Rn(t, e) {
                    return function (n, r, i) {
                        return "function" == typeof r && i === P && isArray(n) ? t(n, r) : e(n, an(r, i, 3))
                    }
                }

                function Mn(t) {
                    return function (e, n, r) {
                        return "function" == typeof n && r === P || (n = an(n, r, 3)), t(e, n, to)
                    }
                }

                function Pn(t) {
                    return function (e, n, r) {
                        return "function" == typeof n && r === P || (n = an(n, r, 3)), t(e, n)
                    }
                }

                function Cn(t) {
                    return function (e, n, r) {
                        var i = {};
                        return n = Un(n, r, 3), je(e, function (e, r, o) {
                            var a = n(e, r, o);
                            r = t ? a : r, e = t ? e : a, i[r] = e
                        }), i
                    }
                }

                function Sn(t) {
                    return function (e, n, r) {
                        return e = u(e), (t ? e : "") + An(e, n, r) + (t ? "" : e)
                    }
                }

                function On(t) {
                    var e = gi(function (n, r) {
                        var i = E(r, e.placeholder);
                        return Dn(n, t, P, r, i)
                    });
                    return e
                }

                function jn(t, e) {
                    return function (n, r, i, o) {
                        var a = arguments.length < 3;
                        return "function" == typeof r && o === P && isArray(n) ? t(n, r, i, a) : qe(n, Un(r, o, 4), i, a, e)
                    }
                }

                function kn(t, e, n, r, i, o, a, s, c, u) {
                    function l() {
                        for (var y = arguments.length, _ = y, b = Uo(y); _--;) b[_] = arguments[_];
                        if (r && (b = cn(b, r, i)), o && (b = un(b, o, a)), d || v) {
                            var w = l.placeholder, x = E(b, w);
                            if ((y -= x.length) < u) {
                                var T = s ? ne(s) : P, R = wa(u - y, 0), M = d ? x : P, C = d ? P : x, j = d ? b : P,
                                    k = d ? P : b;
                                e |= d ? F : H, e &= ~(d ? H : F), m || (e &= ~(S | O));
                                var A = [t, e, n, j, M, k, C, T, c, R], L = kn.apply(P, A);
                                return er(t) && za(L, A), L.placeholder = w, L
                            }
                        }
                        var D = f ? n : this, I = p ? D[t] : t;
                        return s && (b = cr(b, s)), h && c < b.length && (b.length = c), this && this !== te && this instanceof l && (I = g || gn(t)), I.apply(D, b)
                    }

                    var h = e & L, f = e & S, p = e & O, d = e & k, m = e & j, v = e & A, g = p ? P : gn(t);
                    return l
                }

                function An(t, e, n) {
                    var r = t.length;
                    if (e = +e, r >= e || !ba(e)) return "";
                    var i = e - r;
                    return n = null == n ? " " : n + "", go(n, va(i / n.length)).slice(0, i)
                }

                function Fn(t, e, n, r) {
                    function i() {
                        for (var e = -1, s = arguments.length, c = -1, u = r.length, l = Uo(u + s); ++c < u;) l[c] = r[c];
                        for (; s--;) l[c++] = arguments[++e];
                        return (this && this !== te && this instanceof i ? a : t).apply(o ? n : this, l)
                    }

                    var o = e & S, a = gn(t);
                    return i
                }

                function Hn(t) {
                    var e = Wo[t];
                    return function (t, n) {
                        return n = n === P ? 0 : +n || 0, n ? (n = ua(10, n), e(t * n) / n) : e(t)
                    }
                }

                function Ln(t) {
                    return function (e, n, r, i) {
                        var o = Un(r);
                        return null == r && o === be ? rn(e, n, t) : on(e, n, o(r, i, 1), t)
                    }
                }

                function Dn(t, e, n, r, i, o, a, s) {
                    var c = e & O;
                    if (!c && "function" != typeof t) throw new Qo(W);
                    var u = r ? r.length : 0;
                    if (u || (e &= ~(F | H), r = i = P), u -= i ? i.length : 0, e & H) {
                        var l = r, h = i;
                        r = i = P
                    }
                    var f = c ? P : Ua(t), p = [t, e, n, r, i, l, h, o, a, s];
                    if (f && (ir(p, f), e = p[1], s = p[9]), p[9] = null == s ? c ? 0 : t.length : wa(s - u, 0) || 0, e == S) var d = dn(p[0], p[2]); else d = e != F && e != (S | F) || p[4].length ? kn.apply(P, p) : Fn.apply(P, p);
                    return (f ? Ba : za)(d, p)
                }

                function In(t, e, n, r, i, o, a) {
                    var s = -1, c = t.length, u = e.length;
                    if (c != u && !(i && u > c)) return !1;
                    for (; ++s < c;) {
                        var l = t[s], h = e[s], f = r ? r(i ? h : l, i ? l : h, s) : P;
                        if (f !== P) {
                            if (f) continue;
                            return !1
                        }
                        if (i) {
                            if (!fe(e, function (t) {
                                return l === t || n(l, t, r, i, o, a)
                            })) return !1
                        } else if (l !== h && !n(l, h, r, i, o, a)) return !1
                    }
                    return !0
                }

                function Nn(t, e, n) {
                    switch (n) {
                        case X:
                        case Q:
                            return +t == +e;
                        case Z:
                            return t.name == e.name && t.message == e.message;
                        case J:
                            return t != +t ? e != +e : t == +e;
                        case et:
                        case nt:
                            return t == e + ""
                    }
                    return !1
                }

                function Bn(t, e, n, r, i, o, a) {
                    var s = Bs(t), c = s.length;
                    if (c != Bs(e).length && !i) return !1;
                    for (var u = c; u--;) {
                        var l = s[u];
                        if (!(i ? l in e : ea.call(e, l))) return !1
                    }
                    for (var h = i; ++u < c;) {
                        l = s[u];
                        var f = t[l], p = e[l], d = r ? r(i ? p : f, i ? f : p, l) : P;
                        if (!(d === P ? n(f, p, r, i, o, a) : d)) return !1;
                        h || (h = "constructor" == l)
                    }
                    if (!h) {
                        var m = t.constructor, v = e.constructor;
                        if (m != v && "constructor" in t && "constructor" in e && !("function" == typeof m && m instanceof m && "function" == typeof v && v instanceof v)) return !1
                    }
                    return !0
                }

                function Un(t, n, r) {
                    var i = exports.callback || Mo;
                    return i = i === Mo ? be : i, r ? i(t, n, r) : i
                }

                function Vn(t) {
                    for (var e = t.name, n = Fa[e], r = n ? n.length : 0; r--;) {
                        var i = n[r], o = i.func;
                        if (null == o || o == t) return i.name
                    }
                    return e
                }

                function zn(t, n, r) {
                    var i = exports.indexOf || Tr;
                    return i = i === Tr ? s : i, t ? i(t, n, r) : i
                }

                function Gn(t) {
                    for (var e = eo(t), n = e.length; n--;) e[n][2] = rr(e[n][1]);
                    return e
                }

                function Wn(t, e) {
                    var n = null == t ? P : t[e];
                    return Di(n) ? n : P
                }

                function $n(t, e, n) {
                    for (var r = -1, i = n.length; ++r < i;) {
                        var o = n[r], a = o.size;
                        switch (o.type) {
                            case"drop":
                                t += a;
                                break;
                            case"dropRight":
                                e -= a;
                                break;
                            case"take":
                                e = xa(e, t + a);
                                break;
                            case"takeRight":
                                t = wa(t, e - a)
                        }
                    }
                    return {start: t, end: e}
                }

                function qn(t) {
                    var e = t.length, n = new t.constructor(e);
                    return e && "string" == typeof t[0] && ea.call(t, "index") && (n.index = t.index, n.input = t.input), n
                }

                function Yn(t) {
                    var e = t.constructor;
                    return "function" == typeof e && e instanceof e || (e = qo), new e
                }

                function Xn(t, e, n) {
                    var r = t.constructor;
                    switch (e) {
                        case rt:
                            return sn(t);
                        case X:
                        case Q:
                            return new r(+t);
                        case it:
                        case ot:
                        case at:
                        case st:
                        case ct:
                        case ut:
                        case lt:
                        case ht:
                        case ft:
                            var i = t.buffer;
                            return new r(n ? sn(i) : i, t.byteOffset, t.length);
                        case J:
                        case nt:
                            return new r(t);
                        case et:
                            var o = new r(t.source, jt.exec(t));
                            o.lastIndex = t.lastIndex
                    }
                    return o
                }

                function Qn(t, e, n) {
                    null == t || tr(e, t) || (e = fr(e), t = 1 == e.length ? t : Fe(t, Ye(e, 0, -1)), e = Mr(e));
                    var r = null == t ? t : t[e];
                    return null == r ? P : r.apply(t, n)
                }

                function Zn(t) {
                    return null != t && nr(Va(t))
                }

                function Kn(t, e) {
                    return t = "number" == typeof t || Ft.test(t) ? +t : -1, e = null == e ? ka : e, t > -1 && t % 1 == 0 && t < e
                }

                function Jn(t, e, n) {
                    if (!Fi(n)) return !1;
                    var r = typeof e;
                    if ("number" == r ? Zn(n) && Kn(e, n.length) : "string" == r && e in n) {
                        var i = n[e];
                        return t === t ? t === i : i !== i
                    }
                    return !1
                }

                function tr(t, e) {
                    var n = typeof t;
                    return !!("string" == n && Tt.test(t) || "number" == n) || !isArray(t) && (!xt.test(t) || null != e && t in hr(e))
                }

                function er(t) {
                    var n = Vn(t);
                    if (!(n in LazyWrapper.prototype)) return !1;
                    var r = exports[n];
                    if (t === r) return !0;
                    var o = Ua(r);
                    return !!o && t === o[0]
                }

                function nr(t) {
                    return "number" == typeof t && t > -1 && t % 1 == 0 && t <= ka
                }

                function rr(t) {
                    return t === t && !Fi(t)
                }

                function ir(t, e) {
                    var n = t[1], r = e[1], i = n | r, o = i < L,
                        a = r == L && n == k || r == L && n == D && t[7].length <= e[8] || r == (L | D) && n == k;
                    if (!o && !a) return t;
                    r & S && (t[2] = e[2], i |= n & S ? 0 : j);
                    var s = e[3];
                    if (s) {
                        var c = t[3];
                        t[3] = c ? cn(c, s, e[4]) : ne(s), t[4] = c ? E(t[3], $) : ne(e[4])
                    }
                    return s = e[5], s && (c = t[5], t[5] = c ? un(c, s, e[6]) : ne(s), t[6] = c ? E(t[5], $) : ne(e[6])), s = e[7], s && (t[7] = ne(s)), r & L && (t[8] = null == t[8] ? e[8] : xa(t[8], e[8])), null == t[9] && (t[9] = e[9]), t[0] = e[0], t[1] = i, t
                }

                function or(t, e) {
                    return t === P ? e : Os(t, e, or)
                }

                function ar(t, e) {
                    t = hr(t);
                    for (var n = -1, r = e.length, i = {}; ++n < r;) {
                        var o = e[n];
                        o in t && (i[o] = t[o])
                    }
                    return i
                }

                function sr(t, e) {
                    var n = {};
                    return Oe(t, function (t, r, i) {
                        e(t, r, i) && (n[r] = t)
                    }), n
                }

                function cr(t, e) {
                    for (var n = t.length, r = xa(e.length, n), i = ne(t); r--;) {
                        var o = e[r];
                        t[r] = Kn(o, n) ? i[o] : P
                    }
                    return t
                }

                function ur(t) {
                    for (var e = to(t), n = e.length, r = n && t.length, i = !!r && nr(r) && (isArray(t) || Ri(t)), o = -1, a = []; ++o < n;) {
                        var s = e[o];
                        (i && Kn(s, r) || ea.call(t, s)) && a.push(s)
                    }
                    return a
                }

                function lr(t) {
                    return null == t ? [] : Zn(t) ? Fi(t) ? t : qo(t) : oo(t)
                }

                function hr(t) {
                    return Fi(t) ? t : qo(t)
                }

                function fr(t) {
                    if (isArray(t)) return t;
                    var e = [];
                    return u(t).replace(Rt, function (t, n, r, i) {
                        e.push(r ? i.replace(St, "$1") : n || t)
                    }), e
                }

                function wrapperClone(t) {
                    return t instanceof LazyWrapper ? t.clone() : new LodashWrapper(t.__wrapped__, t.__chain__, ne(t.__actions__))
                }

                function dr(t, e, n) {
                    e = (n ? Jn(t, e, n) : null == e) ? 1 : wa(ya(e) || 1, 1);
                    for (var r = 0, i = t ? t.length : 0, o = -1, a = Uo(va(i / e)); r < i;) a[++o] = Ye(t, r, r += e);
                    return a
                }

                function mr(t) {
                    for (var e = -1, n = t ? t.length : 0, r = -1, i = []; ++e < n;) {
                        var o = t[e];
                        o && (i[++r] = o)
                    }
                    return i
                }

                function vr(t, e, n) {
                    return (t ? t.length : 0) ? ((n ? Jn(t, e, n) : null == e) && (e = 1), Ye(t, e < 0 ? 0 : e)) : []
                }

                function gr(t, e, n) {
                    var r = t ? t.length : 0;
                    return r ? ((n ? Jn(t, e, n) : null == e) && (e = 1), e = r - (+e || 0), Ye(t, 0, e < 0 ? 0 : e)) : []
                }

                function yr(t, e, n) {
                    return t && t.length ? en(t, Un(e, n, 3), !0, !0) : []
                }

                function _r(t, e, n) {
                    return t && t.length ? en(t, Un(e, n, 3), !0) : []
                }

                function br(t, e, n, r) {
                    var i = t ? t.length : 0;
                    return i ? (n && "number" != typeof n && Jn(t, e, n) && (n = 0, r = i), Me(t, e, n, r)) : []
                }

                function Er(t) {
                    return t ? t[0] : P
                }

                function wr(t, e, n) {
                    var r = t ? t.length : 0;
                    return n && Jn(t, e, n) && (e = !1), r ? Se(t, e) : []
                }

                function xr(t) {
                    return (t ? t.length : 0) ? Se(t, !0) : []
                }

                function Tr(t, e, n) {
                    var r = t ? t.length : 0;
                    if (!r) return -1;
                    if ("number" == typeof n) n = n < 0 ? wa(r + n, 0) : n; else if (n) {
                        var i = rn(t, e);
                        return i < r && (e === e ? e === t[i] : t[i] !== t[i]) ? i : -1
                    }
                    return s(t, e, n || 0)
                }

                function Rr(t) {
                    return gr(t, 1)
                }

                function Mr(t) {
                    var e = t ? t.length : 0;
                    return e ? t[e - 1] : P
                }

                function Pr(t, e, n) {
                    var r = t ? t.length : 0;
                    if (!r) return -1;
                    var i = r;
                    if ("number" == typeof n) i = (n < 0 ? wa(r + n, 0) : xa(n || 0, r - 1)) + 1; else if (n) {
                        i = rn(t, e, !0) - 1;
                        var o = t[i];
                        return (e === e ? e === o : o !== o) ? i : -1
                    }
                    if (e !== e) return y(t, i, !0);
                    for (; i--;) if (t[i] === e) return i;
                    return -1
                }

                function Cr() {
                    var t = arguments, e = t[0];
                    if (!e || !e.length) return e;
                    for (var n = 0, r = zn(), i = t.length; ++n < i;) for (var o = 0, a = t[n]; (o = r(e, a, o)) > -1;) pa.call(e, o, 1);
                    return e
                }

                function Sr(t, e, n) {
                    var r = [];
                    if (!t || !t.length) return r;
                    var i = -1, o = [], a = t.length;
                    for (e = Un(e, n, 3); ++i < a;) {
                        var s = t[i];
                        e(s, i, t) && (r.push(s), o.push(i))
                    }
                    return We(t, o), r
                }

                function Or(t) {
                    return vr(t, 1)
                }

                function jr(t, e, n) {
                    var r = t ? t.length : 0;
                    return r ? (n && "number" != typeof n && Jn(t, e, n) && (e = 0, n = r), Ye(t, e, n)) : []
                }

                function kr(t, e, n) {
                    return (t ? t.length : 0) ? ((n ? Jn(t, e, n) : null == e) && (e = 1), Ye(t, 0, e < 0 ? 0 : e)) : []
                }

                function Ar(t, e, n) {
                    var r = t ? t.length : 0;
                    return r ? ((n ? Jn(t, e, n) : null == e) && (e = 1), e = r - (+e || 0), Ye(t, e < 0 ? 0 : e)) : []
                }

                function Fr(t, e, n) {
                    return t && t.length ? en(t, Un(e, n, 3), !1, !0) : []
                }

                function Hr(t, e, n) {
                    return t && t.length ? en(t, Un(e, n, 3)) : []
                }

                function Lr(t, e, n, r) {
                    if (!(t ? t.length : 0)) return [];
                    null != e && "boolean" != typeof e && (r = n, n = Jn(t, e, r) ? P : e, e = !1);
                    var i = Un();
                    return null == n && i === be || (n = i(n, r, 3)), e && zn() == s ? w(t, n) : Je(t, n)
                }

                function Dr(t) {
                    if (!t || !t.length) return [];
                    var e = -1, n = 0;
                    t = se(t, function (t) {
                        if (Zn(t)) return n = wa(t.length, n), !0
                    });
                    for (var r = Uo(n); ++e < n;) r[e] = ce(t, ze(e));
                    return r
                }

                function Ir(t, e, n) {
                    if (!(t ? t.length : 0)) return [];
                    var r = Dr(t);
                    return null == e ? r : (e = an(e, n, 4), ce(r, function (t) {
                        return le(t, e, P, !0)
                    }))
                }

                function Nr() {
                    for (var t = -1, e = arguments.length; ++t < e;) {
                        var n = arguments[t];
                        if (Zn(n)) var r = LodashWrapper ? ue(xe(LodashWrapper, n), xe(n, LodashWrapper)) : n
                    }
                    return r ? Je(r) : []
                }

                function Br(t, e) {
                    var n = -1, r = t ? t.length : 0, i = {};
                    for (!r || e || isArray(t[0]) || (e = []); ++n < r;) {
                        var o = t[n];
                        e ? i[o] = e[n] : o && (i[o[0]] = o[1])
                    }
                    return i
                }

                function Ur(t) {
                    var n = exports(t);
                    return n.__chain__ = !0, n
                }

                function Vr(t, e, n) {
                    return e.call(n, t), t
                }

                function zr(t, e, n) {
                    return e.call(n, t)
                }

                function Gr() {
                    return Ur(this)
                }

                function Wr() {
                    return new LodashWrapper(this.value(), this.__chain__)
                }

                function $r(t) {
                    for (var e, r = this; r instanceof n;) {
                        var i = wrapperClone(r);
                        e ? o.__wrapped__ = i : e = i;
                        var o = i;
                        r = r.__wrapped__
                    }
                    return o.__wrapped__ = t, e
                }

                function qr() {
                    var t = this.__wrapped__, e = function (t) {
                        return n && n.__dir__ < 0 ? t : t.reverse()
                    };
                    if (t instanceof LazyWrapper) {
                        var n = t;
                        return this.__actions__.length && (n = new LazyWrapper(this)), n = n.reverse(), n.__actions__.push({
                            func: zr,
                            args: [e],
                            thisArg: P
                        }), new LodashWrapper(n, this.__chain__)
                    }
                    return this.thru(e)
                }

                function Yr() {
                    return this.value() + ""
                }

                function Xr() {
                    return nn(this.__wrapped__, this.__actions__)
                }

                function Qr(t, e, n) {
                    var r = isArray(t) ? oe : Te;
                    return n && Jn(t, e, n) && (e = P), "function" == typeof e && n === P || (e = Un(e, n, 3)), r(t, e)
                }

                function Zr(t, e, n) {
                    var r = isArray(t) ? se : Pe;
                    return e = Un(e, n, 3), r(t, e)
                }

                function Kr(t, e) {
                    return is(t, Ne(e))
                }

                function Jr(t, e, n, r) {
                    var i = t ? Va(t) : 0;
                    return nr(i) || (t = oo(t), i = t.length), n = "number" != typeof n || r && Jn(e, n, r) ? 0 : n < 0 ? wa(i + n, 0) : n || 0, "string" == typeof t || !isArray(t) && Vi(t) ? n <= i && t.indexOf(e, n) > -1 : !!i && zn(t, e, n) > -1
                }

                function ti(t, e, n) {
                    var r = isArray(t) ? ce : Ie;
                    return e = Un(e, n, 3), r(t, e)
                }

                function ei(t, e) {
                    return ti(t, Fo(e))
                }

                function ni(t, e, n) {
                    var r = isArray(t) ? se : Pe;
                    return e = Un(e, n, 3), r(t, function (t, n, r) {
                        return !e(t, n, r)
                    })
                }

                function ri(t, e, n) {
                    if (n ? Jn(t, e, n) : null == e) {
                        t = lr(t);
                        var r = t.length;
                        return r > 0 ? t[$e(0, r - 1)] : P
                    }
                    var i = -1, o = qi(t), r = o.length, a = r - 1;
                    for (e = xa(e < 0 ? 0 : +e || 0, r); ++i < e;) {
                        var s = $e(i, a), c = o[s];
                        o[s] = o[i], o[i] = c
                    }
                    return o.length = e, o
                }

                function ii(t) {
                    return ri(t, Ca)
                }

                function oi(t) {
                    var e = t ? Va(t) : 0;
                    return nr(e) ? e : Bs(t).length
                }

                function ai(t, e, n) {
                    var r = isArray(t) ? fe : Xe;
                    return n && Jn(t, e, n) && (e = P), "function" == typeof e && n === P || (e = Un(e, n, 3)), r(t, e)
                }

                function si(t, e, n) {
                    if (null == t) return [];
                    n && Jn(t, e, n) && (e = P);
                    var r = -1;
                    return e = Un(e, n, 3), Qe(Ie(t, function (t, n, i) {
                        return {criteria: e(t, n, i), index: ++r, value: t}
                    }), f)
                }

                function ci(t, e, n, r) {
                    return null == t ? [] : (r && Jn(e, n, r) && (n = P), isArray(e) || (e = null == e ? [] : [e]), isArray(n) || (n = null == n ? [] : [n]), Ze(t, e, n))
                }

                function ui(t, e) {
                    return Zr(t, Ne(e))
                }

                function li(t, e) {
                    if ("function" != typeof e) {
                        if ("function" != typeof t) throw new Qo(W);
                        var n = t;
                        t = e, e = n
                    }
                    return t = ba(t = +t) ? t : 0, function () {
                        if (--t < 1) return e.apply(this, arguments)
                    }
                }

                function hi(t, e, n) {
                    return n && Jn(t, e, n) && (e = P), e = t && null == e ? t.length : wa(+e || 0, 0), Dn(t, L, P, P, P, P, e)
                }

                function fi(t, e) {
                    var n;
                    if ("function" != typeof e) {
                        if ("function" != typeof t) throw new Qo(W);
                        var r = t;
                        t = e, e = r
                    }
                    return function () {
                        return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = P), n
                    }
                }

                function pi(t, e, n) {
                    function r() {
                        p && sa(p), u && sa(u), m = 0, u = p = d = P
                    }

                    function i(e, n) {
                        n && sa(n), u = p = d = P, e && (m = ms(), l = t.apply(f, c), p || u || (c = f = P))
                    }

                    function o() {
                        var t = e - (ms() - h);
                        t <= 0 || t > e ? i(d, u) : p = fa(o, t)
                    }

                    function a() {
                        i(g, p)
                    }

                    function s() {
                        if (c = arguments, h = ms(), f = this, d = g && (p || !y), !1 === v) var n = y && !p; else {
                            u || y || (m = h);
                            var r = v - (h - m), i = r <= 0 || r > v;
                            i ? (u && (u = sa(u)), m = h, l = t.apply(f, c)) : u || (u = fa(a, r))
                        }
                        return i && p ? p = sa(p) : p || e === v || (p = fa(o, e)), n && (i = !0, l = t.apply(f, c)), !i || p || u || (c = f = P), l
                    }

                    var c, u, l, h, f, p, d, m = 0, v = !1, g = !0;
                    if ("function" != typeof t) throw new Qo(W);
                    if (e = e < 0 ? 0 : +e || 0, !0 === n) {
                        var y = !0;
                        g = !1
                    } else Fi(n) && (y = !!n.leading, v = "maxWait" in n && wa(+n.maxWait || 0, e), g = "trailing" in n ? !!n.trailing : g);
                    return s.cancel = r, s
                }

                function di(t, e) {
                    if ("function" != typeof t || e && "function" != typeof e) throw new Qo(W);
                    var n = function () {
                        var r = arguments, i = e ? e.apply(this, r) : r[0], o = n.cache;
                        if (o.has(i)) return o.get(i);
                        var a = t.apply(this, r);
                        return n.cache = o.set(i, a), a
                    };
                    return n.cache = new di.Cache, n
                }

                function mi(t) {
                    if ("function" != typeof t) throw new Qo(W);
                    return function () {
                        return !t.apply(this, arguments)
                    }
                }

                function vi(t) {
                    return fi(2, t)
                }

                function gi(t, e) {
                    if ("function" != typeof t) throw new Qo(W);
                    return e = wa(e === P ? t.length - 1 : +e || 0, 0), function () {
                        for (var n = arguments, r = -1, i = wa(n.length - e, 0), o = Uo(i); ++r < i;) o[r] = n[e + r];
                        switch (e) {
                            case 0:
                                return t.call(this, o);
                            case 1:
                                return t.call(this, n[0], o);
                            case 2:
                                return t.call(this, n[0], n[1], o)
                        }
                        var a = Uo(e + 1);
                        for (r = -1; ++r < e;) a[r] = n[r];
                        return a[e] = o, t.apply(this, a)
                    }
                }

                function yi(t) {
                    if ("function" != typeof t) throw new Qo(W);
                    return function (e) {
                        return t.apply(this, e)
                    }
                }

                function _i(t, e, n) {
                    var r = !0, i = !0;
                    if ("function" != typeof t) throw new Qo(W);
                    return !1 === n ? r = !1 : Fi(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), pi(t, e, {
                        leading: r,
                        maxWait: +e,
                        trailing: i
                    })
                }

                function bi(t, e) {
                    return e = null == e ? Co : e, Dn(e, F, P, [t], [])
                }

                function Ei(t, e, n, r) {
                    return e && "boolean" != typeof e && Jn(t, e, n) ? e = !1 : "function" == typeof e && (r = n, n = e, e = !1), "function" == typeof n ? Ee(t, e, an(n, r, 1)) : Ee(t, e)
                }

                function wi(t, e, n) {
                    return "function" == typeof e ? Ee(t, !0, an(e, n, 1)) : Ee(t, !0)
                }

                function xi(t, e) {
                    return t > e
                }

                function Ti(t, e) {
                    return t >= e
                }

                function Ri(t) {
                    return isObjectLike(t) && Zn(t) && ea.call(t, "callee") && !la.call(t, "callee")
                }

                function Mi(t) {
                    return !0 === t || !1 === t || isObjectLike(t) && ra.call(t) == X
                }

                function Pi(t) {
                    return isObjectLike(t) && ra.call(t) == Q
                }

                function Ci(t) {
                    return !!t && 1 === t.nodeType && isObjectLike(t) && !Bi(t)
                }

                function Si(t) {
                    return null == t || (Zn(t) && (isArray(t) || Vi(t) || Ri(t) || isObjectLike(t) && Ai(t.splice)) ? !t.length : !Bs(t).length)
                }

                function Oi(t, e, n, r) {
                    n = "function" == typeof n ? an(n, r, 3) : P;
                    var i = n ? n(t, e) : P;
                    return i === P ? He(t, e, n) : !!i
                }

                function ji(t) {
                    return isObjectLike(t) && "string" == typeof t.message && ra.call(t) == Z
                }

                function ki(t) {
                    return "number" == typeof t && ba(t)
                }

                function Ai(t) {
                    return Fi(t) && ra.call(t) == K
                }

                function Fi(t) {
                    var e = typeof t;
                    return !!t && ("object" == e || "function" == e)
                }

                function Hi(t, e, n, r) {
                    return n = "function" == typeof n ? an(n, r, 3) : P, De(t, Gn(e), n)
                }

                function Li(t) {
                    return Ni(t) && t != +t
                }

                function Di(t) {
                    return null != t && (Ai(t) ? oa.test(ta.call(t)) : isObjectLike(t) && At.test(t))
                }

                function Ii(t) {
                    return null === t
                }

                function Ni(t) {
                    return "number" == typeof t || isObjectLike(t) && ra.call(t) == J
                }

                function Bi(t) {
                    var e;
                    if (!isObjectLike(t) || ra.call(t) != tt || Ri(t) || !ea.call(t, "constructor") && "function" == typeof (e = t.constructor) && !(e instanceof e)) return !1;
                    var n;
                    return Oe(t, function (t, e) {
                        n = e
                    }), n === P || ea.call(t, n)
                }

                function Ui(t) {
                    return Fi(t) && ra.call(t) == et
                }

                function Vi(t) {
                    return "string" == typeof t || isObjectLike(t) && ra.call(t) == nt
                }

                function zi(t) {
                    return isObjectLike(t) && nr(t.length) && !!Ut[ra.call(t)]
                }

                function Gi(t) {
                    return t === P
                }

                function Wi(t, e) {
                    return t < e
                }

                function $i(t, e) {
                    return t <= e
                }

                function qi(t) {
                    var e = t ? Va(t) : 0;
                    return nr(e) ? e ? ne(t) : [] : oo(t)
                }

                function Yi(t) {
                    return _e(t, to(t))
                }

                function Xi(t, e, n) {
                    var r = Ha(t);
                    return n && Jn(t, e, n) && (e = P), e ? ge(r, e) : r
                }

                function Qi(t) {
                    return Ae(t, to(t))
                }

                function Zi(t, e, n) {
                    var r = null == t ? P : Fe(t, fr(e), e + "");
                    return r === P ? n : r
                }

                function Ki(t, e) {
                    if (null == t) return !1;
                    var n = ea.call(t, e);
                    if (!n && !tr(e)) {
                        if (e = fr(e), null == (t = 1 == e.length ? t : Fe(t, Ye(e, 0, -1)))) return !1;
                        e = Mr(e), n = ea.call(t, e)
                    }
                    return n || nr(t.length) && Kn(e, t.length) && (isArray(t) || Ri(t))
                }

                function Ji(t, e, n) {
                    n && Jn(t, e, n) && (e = P);
                    for (var r = -1, i = Bs(t), o = i.length, a = {}; ++r < o;) {
                        var s = i[r], c = t[s];
                        e ? ea.call(a, c) ? a[c].push(s) : a[c] = [s] : a[c] = s
                    }
                    return a
                }

                function to(t) {
                    if (null == t) return [];
                    Fi(t) || (t = qo(t));
                    var e = t.length;
                    e = e && nr(e) && (isArray(t) || Ri(t)) && e || 0;
                    for (var n = t.constructor, r = -1, i = "function" == typeof n && n.prototype === t, o = Uo(e), a = e > 0; ++r < e;) o[r] = r + "";
                    for (var s in t) a && Kn(s, e) || "constructor" == s && (i || !ea.call(t, s)) || o.push(s);
                    return o
                }

                function eo(t) {
                    t = hr(t);
                    for (var e = -1, n = Bs(t), r = n.length, i = Uo(r); ++e < r;) {
                        var o = n[e];
                        i[e] = [o, t[o]]
                    }
                    return i
                }

                function no(t, e, n) {
                    var r = null == t ? P : t[e];
                    return r === P && (null == t || tr(e, t) || (e = fr(e), t = 1 == e.length ? t : Fe(t, Ye(e, 0, -1)), r = null == t ? P : t[Mr(e)]), r = r === P ? n : r), Ai(r) ? r.call(t) : r
                }

                function ro(t, e, n) {
                    if (null == t) return t;
                    var r = e + "";
                    e = null != t[r] || tr(e, t) ? [r] : fr(e);
                    for (var i = -1, o = e.length, a = o - 1, s = t; null != s && ++i < o;) {
                        var c = e[i];
                        Fi(s) && (i == a ? s[c] = n : null == s[c] && (s[c] = Kn(e[i + 1]) ? [] : {})), s = s[c]
                    }
                    return t
                }

                function io(t, e, n, r) {
                    var i = isArray(t) || zi(t);
                    if (e = Un(e, r, 4), null == n) if (i || Fi(t)) {
                        var o = t.constructor;
                        n = i ? isArray(t) ? new o : [] : Ha(Ai(o) ? o.prototype : P)
                    } else n = {};
                    return (i ? re : je)(t, function (t, r, i) {
                        return e(n, t, r, i)
                    }), n
                }

                function oo(t) {
                    return tn(t, Bs(t))
                }

                function ao(t) {
                    return tn(t, to(t))
                }

                function so(t, e, n) {
                    return e = +e || 0, n === P ? (n = e, e = 0) : n = +n || 0, t >= xa(e, n) && t < wa(e, n)
                }

                function co(t, e, n) {
                    n && Jn(t, e, n) && (e = n = P);
                    var r = null == t, i = null == e;
                    if (null == n && (i && "boolean" == typeof t ? (n = t, t = 1) : "boolean" == typeof e && (n = e, i = !0)), r && i && (e = 1, i = !1), t = +t || 0, i ? (e = t, t = 0) : e = +e || 0, n || t % 1 || e % 1) {
                        var o = Ma();
                        return xa(t + o * (e - t + ca("1e-" + ((o + "").length - 1))), e)
                    }
                    return $e(t, e)
                }

                function uo(t) {
                    return (t = u(t)) && t.charAt(0).toUpperCase() + t.slice(1)
                }

                function lo(t) {
                    return (t = u(t)) && t.replace(Ht, d).replace(Ct, "")
                }

                function ho(t, e, n) {
                    t = u(t), e += "";
                    var r = t.length;
                    return n = n === P ? r : xa(n < 0 ? 0 : +n || 0, r), (n -= e.length) >= 0 && t.indexOf(e, n) == n
                }

                function fo(t) {
                    return t = u(t), t && _t.test(t) ? t.replace(gt, m) : t
                }

                function po(t) {
                    return t = u(t), t && Pt.test(t) ? t.replace(Mt, v) : t || "(?:)"
                }

                function mo(t, e, n) {
                    t = u(t), e = +e;
                    var r = t.length;
                    if (r >= e || !ba(e)) return t;
                    var i = (e - r) / 2, o = ya(i);
                    return n = An("", va(i), n), n.slice(0, o) + t + n
                }

                function vo(t, e, n) {
                    return (n ? Jn(t, e, n) : null == e) ? e = 0 : e && (e = +e), t = bo(t), Ra(t, e || (kt.test(t) ? 16 : 10))
                }

                function go(t, e) {
                    var n = "";
                    if (t = u(t), (e = +e) < 1 || !t || !ba(e)) return n;
                    do {
                        e % 2 && (n += t), e = ya(e / 2), t += t
                    } while (e);
                    return n
                }

                function yo(t, e, n) {
                    return t = u(t), n = null == n ? 0 : xa(n < 0 ? 0 : +n || 0, t.length), t.lastIndexOf(e, n) == n
                }

                function _o(t, n, r) {
                    var i = exports.templateSettings;
                    r && Jn(t, n, r) && (n = r = P), t = u(t), n = ve(ge({}, r || n), i, me);
                    var o, a, s = ve(ge({}, n.imports), i.imports, me), c = Bs(s), l = tn(s, c), h = 0,
                        f = n.interpolate || Lt, p = "__p += '",
                        d = Yo((n.escape || Lt).source + "|" + f.source + "|" + (f === wt ? Ot : Lt).source + "|" + (n.evaluate || Lt).source + "|$", "g"),
                        m = "//# sourceURL=" + ("sourceURL" in n ? n.sourceURL : "lodash.templateSources[" + ++Bt + "]") + "\n";
                    t.replace(d, function (e, n, r, i, s, c) {
                        return r || (r = i), p += t.slice(h, c).replace(Dt, g), n && (o = !0, p += "' +\n__e(" + n + ") +\n'"), s && (a = !0, p += "';\n" + s + ";\n__p += '"), r && (p += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"), h = c + e.length, e
                    }), p += "';\n";
                    var v = n.variable;
                    v || (p = "with (obj) {\n" + p + "\n}\n"), p = (a ? p.replace(pt, "") : p).replace(dt, "$1").replace(mt, "$1;"), p = "function(" + (v || "obj") + ") {\n" + (v ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (o ? ", __e = isObjectLike.escape" : "") + (a ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + p + "return __p\n}";
                    var y = Zs(function () {
                        return Go(c, m + "return " + p).apply(P, l)
                    });
                    if (y.source = p, ji(y)) throw y;
                    return y
                }

                function bo(t, e, n) {
                    var r = t;
                    return (t = u(t)) ? (n ? Jn(r, e, n) : null == e) ? t.slice(x(t), T(t) + 1) : (e += "", t.slice(l(t, e), h(t, e) + 1)) : t
                }

                function Eo(t, e, n) {
                    var r = t;
                    return t = u(t), t ? (n ? Jn(r, e, n) : null == e) ? t.slice(x(t)) : t.slice(l(t, e + "")) : t
                }

                function wo(t, e, n) {
                    var r = t;
                    return t = u(t), t ? (n ? Jn(r, e, n) : null == e) ? t.slice(0, T(t) + 1) : t.slice(0, h(t, e + "") + 1) : t
                }

                function xo(t, e, n) {
                    n && Jn(t, e, n) && (e = P);
                    var r = I, i = N;
                    if (null != e) if (Fi(e)) {
                        var o = "separator" in e ? e.separator : o;
                        r = "length" in e ? +e.length || 0 : r, i = "omission" in e ? u(e.omission) : i
                    } else r = +e || 0;
                    if (t = u(t), r >= t.length) return t;
                    var a = r - i.length;
                    if (a < 1) return i;
                    var s = t.slice(0, a);
                    if (null == o) return s + i;
                    if (Ui(o)) {
                        if (t.slice(a).search(o)) {
                            var c, l, h = t.slice(0, a);
                            for (o.global || (o = Yo(o.source, (jt.exec(o) || "") + "g")), o.lastIndex = 0; c = o.exec(h);) l = c.index;
                            s = s.slice(0, null == l ? a : l)
                        }
                    } else if (t.indexOf(o, a) != a) {
                        var f = s.lastIndexOf(o);
                        f > -1 && (s = s.slice(0, f))
                    }
                    return s + i
                }

                function To(t) {
                    return t = u(t), t && yt.test(t) ? t.replace(vt, R) : t
                }

                function Ro(t, e, n) {
                    return n && Jn(t, e, n) && (e = P), t = u(t), t.match(e || It) || []
                }

                function Mo(t, e, n) {
                    return n && Jn(t, e, n) && (e = P), isObjectLike(t) ? So(t) : be(t, e)
                }

                function Po(t) {
                    return function () {
                        return t
                    }
                }

                function Co(t) {
                    return t
                }

                function So(t) {
                    return Ne(Ee(t, !0))
                }

                function Oo(t, e) {
                    return Be(t, Ee(e, !0))
                }

                function jo(t, e, n) {
                    if (null == n) {
                        var r = Fi(e), i = r ? Bs(e) : P, o = i && i.length ? Ae(e, i) : P;
                        (o ? o.length : r) || (o = !1, n = e, e = t, t = this)
                    }
                    o || (o = Ae(e, Bs(e)));
                    var a = !0, s = -1, c = Ai(t), u = o.length;
                    !1 === n ? a = !1 : Fi(n) && "chain" in n && (a = n.chain);
                    for (; ++s < u;) {
                        var l = o[s], h = e[l];
                        t[l] = h, c && (t.prototype[l] = function (e) {
                            return function () {
                                var n = this.__chain__;
                                if (a || n) {
                                    var r = t(this.__wrapped__);
                                    return (r.__actions__ = ne(this.__actions__)).push({
                                        func: e,
                                        args: arguments,
                                        thisArg: t
                                    }), r.__chain__ = n, r
                                }
                                return e.apply(t, ue([this.value()], arguments))
                            }
                        }(h))
                    }
                    return t
                }

                function ko() {
                    return te._ = ia, this
                }

                function Ao() {
                }

                function Fo(t) {
                    return tr(t) ? ze(t) : Ge(t)
                }

                function Ho(t) {
                    return function (e) {
                        return Fe(t, fr(e), e + "")
                    }
                }

                function Lo(t, e, n) {
                    n && Jn(t, e, n) && (e = n = P), t = +t || 0, n = null == n ? 1 : +n || 0, null == e ? (e = t, t = 0) : e = +e || 0;
                    for (var r = -1, i = wa(va((e - t) / (n || 1)), 0), o = Uo(i); ++r < i;) o[r] = t, t += n;
                    return o
                }

                function Do(t, e, n) {
                    if ((t = ya(t)) < 1 || !ba(t)) return [];
                    var r = -1, i = Uo(xa(t, Sa));
                    for (e = an(e, n, 1); ++r < t;) r < Sa ? i[r] = e(r) : e(r);
                    return i
                }

                function Io(t) {
                    var e = ++na;
                    return u(t) + e
                }

                function No(t, e) {
                    return (+t || 0) + (+e || 0)
                }

                function Bo(t, e, n) {
                    return n && Jn(t, e, n) && (e = P), e = Un(e, n, 3), 1 == e.length ? pe(isArray(t) ? t : lr(t), e) : Ke(t, e)
                }

                t = t ? ee.defaults(te.Object(), t, ee.pick(te, Nt)) : te;
                var Uo = t.Array, Vo = t.Date, zo = t.Error, Go = t.Function, Wo = t.Math, $o = t.Number, qo = t.Object,
                    Yo = t.RegExp, Xo = t.String, Qo = t.TypeError, Zo = Uo.prototype, Ko = qo.prototype,
                    Jo = Xo.prototype, ta = Go.prototype.toString, ea = Ko.hasOwnProperty, na = 0, ra = Ko.toString,
                    ia = te._,
                    oa = Yo("^" + ta.call(ea).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                    aa = t.ArrayBuffer, sa = t.clearTimeout, ca = t.parseFloat, ua = Wo.pow,
                    la = Ko.propertyIsEnumerable, ha = Wn(t, "Set"), fa = t.setTimeout, pa = Zo.splice,
                    da = t.Uint8Array, ma = Wn(t, "WeakMap"), va = Wo.ceil, ga = Wn(qo, "create"), ya = Wo.floor,
                    _a = Wn(Uo, "isArray"), ba = t.isFinite, Ea = Wn(qo, "keys"), wa = Wo.max, xa = Wo.min,
                    Ta = Wn(Vo, "now"), Ra = t.parseInt, Ma = Wo.random, Pa = $o.NEGATIVE_INFINITY,
                    Ca = $o.POSITIVE_INFINITY, Sa = 4294967295, Oa = Sa - 1, ja = Sa >>> 1, ka = 9007199254740991,
                    Aa = ma && new ma, Fa = {};
                exports.support = {};
                exports.templateSettings = {escape: bt, evaluate: Et, interpolate: wt, variable: "", imports: {_: exports}};
                var Ha = function () {
                        function t() {
                        }

                        return function (e) {
                            if (Fi(e)) {
                                t.prototype = e;
                                var n = new t;
                                t.prototype = P
                            }
                            return n || {}
                        }
                    }(), La = fn(je), Da = fn(ke, !0), Ia = pn(), Na = pn(!0), Ba = Aa ? function (t, e) {
                        return Aa.set(t, e), t
                    } : Co, Ua = Aa ? function (t) {
                        return Aa.get(t)
                    } : Ao, Va = ze("length"), za = function () {
                        var t = 0, e = 0;
                        return function (n, r) {
                            var i = ms(), o = U - (i - e);
                            if (e = i, o > 0) {
                                if (++t >= B) return n
                            } else t = 0;
                            return Ba(n, r)
                        }
                    }(), Ga = gi(function (t, e) {
                        return isObjectLike(t) && Zn(t) ? xe(t, Se(e, !1, !0)) : []
                    }), Wa = wn(), $a = wn(!0), qa = gi(function (t) {
                        for (var e = t.length, n = e, r = Uo(h), i = zn(), o = i == s, a = []; n--;) {
                            var c = t[n] = Zn(c = t[n]) ? c : [];
                            r[n] = o && c.length >= 120 ? mn(n && c) : null
                        }
                        var u = t[0], l = -1, h = u ? u.length : 0, f = r[0];
                        t:for (; ++l < h;) if (c = u[l], (f ? Zt(f, c) : i(a, c, 0)) < 0) {
                            for (var n = e; --n;) {
                                var p = r[n];
                                if ((p ? Zt(p, c) : i(t[n], c, 0)) < 0) continue t
                            }
                            f && f.push(c), a.push(c)
                        }
                        return a
                    }), Ya = gi(function (t, e) {
                        e = Se(e);
                        var n = ye(t, e);
                        return We(t, e.sort(o)), n
                    }), Xa = Ln(), Qa = Ln(!0), Za = gi(function (t) {
                        return Je(Se(t, !1, !0))
                    }), Ka = gi(function (t, e) {
                        return Zn(t) ? xe(t, e) : []
                    }), Ja = gi(Dr), ts = gi(function (t) {
                        var e = t.length, n = e > 2 ? t[e - 2] : P, r = e > 1 ? t[e - 1] : P;
                        return e > 2 && "function" == typeof n ? e -= 2 : (n = e > 1 && "function" == typeof r ? (--e, r) : P, r = P), t.length = e, Ir(t, n, r)
                    }), es = gi(function (t) {
                        return t = Se(t), this.thru(function (e) {
                            return Jt(isArray(e) ? e : [hr(e)], t)
                        })
                    }), ns = gi(function (t, e) {
                        return ye(t, Se(e))
                    }), rs = ln(function (t, e, n) {
                        ea.call(t, n) ? ++t[n] : t[n] = 1
                    }), is = En(La), os = En(Da, !0), as = Rn(re, La), ss = Rn(ie, Da), cs = ln(function (t, e, n) {
                        ea.call(t, n) ? t[n].push(e) : t[n] = [e]
                    }), us = ln(function (t, e, n) {
                        t[n] = e
                    }), ls = gi(function (t, e, n) {
                        var r = -1, i = "function" == typeof e, o = tr(e), a = Zn(t) ? Uo(t.length) : [];
                        return La(t, function (t) {
                            var s = i ? e : o && null != t ? t[e] : P;
                            a[++r] = s ? s.apply(t, n) : Qn(t, e, n)
                        }), a
                    }), hs = ln(function (t, e, n) {
                        t[n ? 0 : 1].push(e)
                    }, function () {
                        return [[], []]
                    }), fs = jn(le, La), ps = jn(he, Da), ds = gi(function (t, e) {
                        if (null == t) return [];
                        var n = e[2];
                        return n && Jn(e[0], e[1], n) && (e.length = 1), Ze(t, Se(e), [])
                    }), ms = Ta || function () {
                        return (new Vo).getTime()
                    }, vs = gi(function (t, e, n) {
                        var r = S;
                        if (n.length) {
                            var i = E(n, vs.placeholder);
                            r |= F
                        }
                        return Dn(t, r, e, n, i)
                    }), gs = gi(function (t, e) {
                        e = e.length ? Se(e) : Qi(t);
                        for (var n = -1, r = e.length; ++n < r;) {
                            var i = e[n];
                            t[i] = Dn(t[i], S, t)
                        }
                        return t
                    }), ys = gi(function (t, e, n) {
                        var r = S | O;
                        if (n.length) {
                            var i = E(n, ys.placeholder);
                            r |= F
                        }
                        return Dn(e, r, t, n, i)
                    }), _s = yn(k), bs = yn(A), Es = gi(function (t, e) {
                        return we(t, 1, e)
                    }), ws = gi(function (t, e, n) {
                        return we(t, e, n)
                    }), xs = Tn(), Ts = Tn(!0), Rs = gi(function (t, e) {
                        if (e = Se(e), "function" != typeof t || !oe(e, c)) throw new Qo(W);
                        var n = e.length;
                        return gi(function (r) {
                            for (var i = xa(r.length, n); i--;) r[i] = e[i](r[i]);
                            return t.apply(this, r)
                        })
                    }), Ms = On(F), Ps = On(H), Cs = gi(function (t, e) {
                        return Dn(t, D, P, P, P, Se(e))
                    }), isArray = _a || function (t) {
                        return isObjectLike(t) && nr(t.length) && ra.call(t) == Y
                    }, Os = hn(Ue), js = hn(function (t, e, n) {
                        return n ? ve(t, e, n) : ge(t, e)
                    }), ks = _n(js, de), As = _n(Os, or), Fs = xn(je), Hs = xn(ke), Ls = Mn(Ia), Ds = Mn(Na), Is = Pn(je),
                    Ns = Pn(ke), Bs = Ea ? function (t) {
                        var e = null == t ? P : t.constructor;
                        return "function" == typeof e && e.prototype === t || "function" != typeof t && Zn(t) ? ur(t) : Fi(t) ? Ea(t) : []
                    } : ur, Us = Cn(!0), Vs = Cn(), zs = gi(function (t, e) {
                        if (null == t) return {};
                        if ("function" != typeof e[0]) {
                            var e = ce(Se(e), Xo);
                            return ar(t, xe(to(t), e))
                        }
                        var n = an(e[0], e[1], 3);
                        return sr(t, function (t, e, r) {
                            return !n(t, e, r)
                        })
                    }), Gs = gi(function (t, e) {
                        return null == t ? {} : "function" == typeof e[0] ? sr(t, an(e[0], e[1], 3)) : ar(t, Se(e))
                    }), Ws = vn(function (t, e, n) {
                        return e = e.toLowerCase(), t + (n ? e.charAt(0).toUpperCase() + e.slice(1) : e)
                    }), $s = vn(function (t, e, n) {
                        return t + (n ? "-" : "") + e.toLowerCase()
                    }), qs = Sn(), Ys = Sn(!0), Xs = vn(function (t, e, n) {
                        return t + (n ? "isObjectLike" : "") + e.toLowerCase()
                    }), Qs = vn(function (t, e, n) {
                        return t + (n ? " " : "") + (e.charAt(0).toUpperCase() + e.slice(1))
                    }), Zs = gi(function (t, e) {
                        try {
                            return t.apply(P, e)
                        } catch (t) {
                            return ji(t) ? t : new zo(t)
                        }
                    }), Ks = gi(function (t, e) {
                        return function (n) {
                            return Qn(n, t, e)
                        }
                    }), Js = gi(function (t, e) {
                        return function (n) {
                            return Qn(t, n, e)
                        }
                    }), tc = Hn("ceil"), ec = Hn("floor"), nc = bn(xi, Pa), rc = bn(Wi, Ca), ic = Hn("round");
                return exports.prototype = n.prototype, LodashWrapper.prototype = Ha(n.prototype), LodashWrapper.prototype.constructor = LodashWrapper, LazyWrapper.prototype = Ha(n.prototype), LazyWrapper.prototype.constructor = LazyWrapper, Wt.prototype.delete = $t, Wt.prototype.get = qt, Wt.prototype.has = Yt, Wt.prototype.set = Xt, Qt.prototype.push = Kt, di.Cache = Wt, exports.after = li, exports.ary = hi, exports.assign = js, exports.at = ns, exports.before = fi, exports.bind = vs, exports.bindAll = gs, exports.bindKey = ys, exports.callback = Mo, exports.chain = Ur, exports.chunk = dr, exports.compact = mr, exports.constant = Po, exports.countBy = rs, exports.create = Xi, exports.curry = _s, exports.curryRight = bs, exports.debounce = pi, exports.defaults = ks, exports.defaultsDeep = As, exports.defer = Es, exports.delay = ws, exports.difference = Ga, exports.drop = vr, exports.dropRight = gr, exports.dropRightWhile = yr, exports.dropWhile = _r, exports.fill = br, exports.filter = Zr, exports.flatten = wr, exports.flattenDeep = xr, exports.flow = xs, exports.flowRight = Ts, exports.forEach = as, exports.forEachRight = ss, exports.forIn = Ls, exports.forInRight = Ds, exports.forOwn = Is, exports.forOwnRight = Ns, exports.functions = Qi, exports.groupBy = cs, exports.indexBy = us, exports.initial = Rr, exports.intersection = qa, exports.invert = Ji, exports.invoke = ls, exports.keys = Bs, exports.keysIn = to, exports.map = ti, exports.mapKeys = Us, exports.mapValues = Vs, exports.matches = So, exports.matchesProperty = Oo, exports.memoize = di, exports.merge = Os, exports.method = Ks, exports.methodOf = Js, exports.mixin = jo, exports.modArgs = Rs, exports.negate = mi, exports.omit = zs, exports.once = vi, exports.pairs = eo, exports.partial = Ms, exports.partialRight = Ps, exports.partition = hs, exports.pick = Gs, exports.pluck = ei, exports.property = Fo, exports.propertyOf = Ho, exports.pull = Cr, exports.pullAt = Ya, exports.range = Lo, exports.rearg = Cs, exports.reject = ni, exports.remove = Sr, exports.rest = Or, exports.restParam = gi, exports.set = ro, exports.shuffle = ii, exports.slice = jr, exports.sortBy = si, exports.sortByAll = ds, exports.sortByOrder = ci, exports.spread = yi, exports.take = kr, exports.takeRight = Ar, exports.takeRightWhile = Fr, exports.takeWhile = Hr, exports.tap = Vr,exports.throttle = _i,exports.thru = zr,exports.times = Do,exports.toArray = qi,exports.toPlainObject = Yi,exports.transform = io,exports.union = Za,exports.uniq = Lr,exports.unzip = Dr,exports.unzipWith = Ir,exports.values = oo,exports.valuesIn = ao,exports.where = ui,exports.without = Ka,exports.wrap = bi,exports.xor = Nr,exports.zip = Ja,exports.zipObject = Br,exports.zipWith = ts,exports.backflow = Ts,exports.collect = ti,exports.compose = Ts,exports.each = as,exports.eachRight = ss,exports.extend = js,exports.iteratee = Mo,exports.methods = Qi,exports.object = Br,exports.select = Zr,exports.tail = Or,exports.unique = Lr,jo(exports, exports),exports.add = No,exports.attempt = Zs,exports.camelCase = Ws,exports.capitalize = uo,exports.ceil = tc,exports.clone = Ei,exports.cloneDeep = wi,exports.deburr = lo,exports.endsWith = ho,exports.escape = fo,exports.escapeRegExp = po,exports.every = Qr,exports.find = is,exports.findIndex = Wa,exports.findKey = Fs,exports.findLast = os,exports.findLastIndex = $a,exports.findLastKey = Hs,exports.findWhere = Kr,exports.first = Er,exports.floor = ec,exports.get = Zi,exports.gt = xi,exports.gte = Ti,exports.has = Ki,exports.identity = Co,exports.includes = Jr,exports.indexOf = Tr,exports.inRange = so,exports.isArguments = Ri,exports.isArray = isArray,exports.isBoolean = Mi,exports.isDate = Pi,exports.isElement = Ci,exports.isEmpty = Si,exports.isEqual = Oi,exports.isError = ji,exports.isFinite = ki,exports.isFunction = Ai,exports.isMatch = Hi,exports.isNaN = Li,exports.isNative = Di,exports.isNull = Ii,exports.isNumber = Ni,exports.isObject = Fi,exports.isPlainObject = Bi,exports.isRegExp = Ui,exports.isString = Vi,exports.isTypedArray = zi,exports.isUndefined = Gi,exports.kebabCase = $s,exports.last = Mr,exports.lastIndexOf = Pr,exports.lt = Wi,exports.lte = $i,exports.max = nc,exports.min = rc,exports.noConflict = ko,exports.noop = Ao,exports.now = ms,exports.pad = mo,exports.padLeft = qs,exports.padRight = Ys,exports.parseInt = vo,exports.random = co,exports.reduce = fs,exports.reduceRight = ps,exports.repeat = go,exports.result = no,exports.round = ic,exports.runInContext = M,exports.size = oi,exports.snakeCase = Xs,exports.some = ai,exports.sortedIndex = Xa,exports.sortedLastIndex = Qa,exports.startCase = Qs,exports.startsWith = yo,exports.sum = Bo,exports.template = _o,exports.trim = bo,exports.trimLeft = Eo,exports.trimRight = wo,exports.trunc = xo,exports.unescape = To,exports.uniqueId = Io,exports.words = Ro,exports.all = Qr,exports.any = ai,exports.contains = Jr,exports.eq = Oi,exports.detect = is,exports.foldl = fs,exports.foldr = ps,exports.head = Er,exports.include = Jr,exports.inject = fs,jo(exports, function () {
                    var t = {};
                    return je(exports, function (n, r) {
                        exports.prototype[r] || (t[r] = n)
                    }), t
                }(), !1),exports.sample = ri,exports.prototype.sample = function (t) {
                    return this.__chain__ || null != t ? this.thru(function (e) {
                        return ri(e, t)
                    }) : ri(this.value())
                },exports.VERSION = C,re(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function (t) {
                    exports[t].placeholder = exports
                }),re(["drop", "take"], function (t, e) {
                    LazyWrapper.prototype[t] = function (n) {
                        var r = this.__filtered__;
                        if (r && !e) return new LazyWrapper(this);
                        n = null == n ? 1 : wa(ya(n) || 0, 0);
                        var o = this.clone();
                        return r ? o.__takeCount__ = xa(o.__takeCount__, n) : o.__views__.push({
                            size: n,
                            type: t + (o.__dir__ < 0 ? "Right" : "")
                        }), o
                    }, LazyWrapper.prototype[t + "Right"] = function (e) {
                        return this.reverse()[t](e).reverse()
                    }
                }),re(["filter", "map", "takeWhile"], function (t, e) {
                    var n = e + 1, r = n != G;
                    LazyWrapper.prototype[t] = function (t, e) {
                        var i = this.clone();
                        return i.__iteratees__.push({
                            iteratee: Un(t, e, 1),
                            type: n
                        }), i.__filtered__ = i.__filtered__ || r, i
                    }
                }),re(["first", "last"], function (t, e) {
                    var n = "take" + (e ? "Right" : "");
                    LazyWrapper.prototype[t] = function () {
                        return this[n](1).value()[0]
                    }
                }),re(["initial", "rest"], function (t, e) {
                    var n = "drop" + (e ? "" : "Right");
                    LazyWrapper.prototype[t] = function () {
                        return this.__filtered__ ? new LazyWrapper(this) : this[n](1)
                    }
                }),re(["pluck", "where"], function (t, e) {
                    var n = e ? "filter" : "map", r = e ? Ne : Fo;
                    LazyWrapper.prototype[t] = function (t) {
                        return this[n](r(t))
                    }
                }),LazyWrapper.prototype.compact = function () {
                    return this.filter(Co)
                },LazyWrapper.prototype.reject = function (t, e) {
                    return t = Un(t, e, 1), this.filter(function (e) {
                        return !t(e)
                    })
                },LazyWrapper.prototype.slice = function (t, e) {
                    t = null == t ? 0 : +t || 0;
                    var n = this;
                    return n.__filtered__ && (t > 0 || e < 0) ? new LazyWrapper(n) : (t < 0 ? n = n.takeRight(-t) : t && (n = n.drop(t)), e !== P && (e = +e || 0, n = e < 0 ? n.dropRight(-e) : n.take(e - t)), n)
                },LazyWrapper.prototype.takeRightWhile = function (t, e) {
                    return this.reverse().takeWhile(t, e).reverse()
                },LazyWrapper.prototype.toArray = function () {
                    return this.take(Ca)
                },je(LazyWrapper.prototype, function (t, n) {
                    var o = /^(?:filter|map|reject)|While$/.test(n), a = /^(?:first|last)$/.test(n),
                        s = exports[a ? "take" + ("last" == n ? "Right" : "") : n];
                    s && (exports.prototype[n] = function () {
                        var e = a ? [1] : arguments, n = this.__chain__, c = this.__wrapped__,
                            u = !!this.__actions__.length, l = c instanceof LazyWrapper, h = e[0], f = l || isArray(c);
                        f && o && "function" == typeof h && 1 != h.length && (l = f = !1);
                        var p = function (t) {
                            return a && n ? s(t, 1)[0] : s.apply(P, ue([t], e))
                        }, d = {func: zr, args: [p], thisArg: P}, m = l && !u;
                        if (a && !n) return m ? (c = c.clone(), c.__actions__.push(d), t.call(c)) : s.call(P, this.value())[0];
                        if (!a && f) {
                            c = m ? c : new LazyWrapper(this);
                            var v = t.apply(c, e);
                            return v.__actions__.push(d), new LodashWrapper(v, n)
                        }
                        return this.thru(p)
                    })
                }),re(["join", "pop", "push", "replace", "shift", "sort", "splice", "split", "unshift"], function (t) {
                    var n = (/^(?:replace|split)$/.test(t) ? Jo : Zo)[t],
                        r = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
                        i = /^(?:join|pop|replace|shift)$/.test(t);
                    exports.prototype[t] = function () {
                        var t = arguments;
                        return i && !this.__chain__ ? n.apply(this.value(), t) : this[r](function (e) {
                            return n.apply(e, t)
                        })
                    }
                }),je(LazyWrapper.prototype, function (t, n) {
                    var r = exports[n];
                    if (r) {
                        var i = r.name;
                        (Fa[i] || (Fa[i] = [])).push({name: n, func: r})
                    }
                }),Fa[kn(P, O).name] = [{
                    name: "wrapper",
                    func: P
                }],LazyWrapper.prototype.clone = b,LazyWrapper.prototype.reverse = zt,LazyWrapper.prototype.value = Gt,exports.prototype.chain = Gr,exports.prototype.commit = Wr,exports.prototype.concat = es,exports.prototype.plant = $r,exports.prototype.reverse = qr,exports.prototype.toString = Yr,exports.prototype.run = exports.prototype.toJSON = exports.prototype.valueOf = exports.prototype.value = Xr,exports.prototype.collect = exports.prototype.map,exports.prototype.head = exports.prototype.first,exports.prototype.select = exports.prototype.filter,exports.prototype.tail = exports.prototype.rest,exports
            }

            var P, C = "3.10.1", S = 1, O = 2, j = 4, k = 8, A = 16, F = 32, H = 64, L = 128, D = 256, I = 30,
                N = "...", B = 150, U = 16, V = 200, z = 1, G = 2, W = "Expected a function",
                $ = "__lodash_placeholder__", q = "[object Arguments]", Y = "[object Array]", X = "[object Boolean]",
                Q = "[object Date]", Z = "[object Error]", K = "[object Function]", J = "[object Number]",
                tt = "[object Object]", et = "[object RegExp]", nt = "[object String]", rt = "[object ArrayBuffer]",
                it = "[object Float32Array]", ot = "[object Float64Array]", at = "[object Int8Array]",
                st = "[object Int16Array]", ct = "[object Int32Array]", ut = "[object Uint8Array]",
                lt = "[object Uint8ClampedArray]", ht = "[object Uint16Array]", ft = "[object Uint32Array]",
                pt = /\b__p \+= '';/g, dt = /\b(__p \+=) '' \+/g, mt = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
                vt = /&(?:amp|lt|gt|quot|#39|#96);/g, gt = /[&<>"'`]/g, yt = RegExp(vt.source), _t = RegExp(gt.source),
                bt = /<%-([\s\S]+?)%>/g, Et = /<%([\s\S]+?)%>/g, wt = /<%=([\s\S]+?)%>/g,
                xt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/, Tt = /^\w*$/,
                Rt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,
                Mt = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g, Pt = RegExp(Mt.source),
                Ct = /[\u0300-\u036f\ufe20-\ufe23]/g, St = /\\(\\)?/g, Ot = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
                jt = /\w*$/, kt = /^0[xX]/, At = /^\[object .+?Constructor\]$/, Ft = /^\d+$/,
                Ht = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g, Lt = /($^)/, Dt = /['\n\r\u2028\u2029\\]/g,
                It = function () {
                    var t = "[A-Z\\xc0-\\xd6\\xd8-\\xde]", e = "[a-z\\xdf-\\xf6\\xf8-\\xff]+";
                    return RegExp(t + "+(?=" + t + e + ")|" + t + "?" + e + "|" + t + "+|[0-9]+", "g")
                }(),
                Nt = ["Array", "ArrayBuffer", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Math", "Number", "Object", "RegExp", "Set", "String", "isObjectLike", "clearTimeout", "isFinite", "parseFloat", "parseInt", "setTimeout", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap"],
                Bt = -1, Ut = {};
            Ut[it] = Ut[ot] = Ut[at] = Ut[st] = Ut[ct] = Ut[ut] = Ut[lt] = Ut[ht] = Ut[ft] = !0, Ut[q] = Ut[Y] = Ut[rt] = Ut[X] = Ut[Q] = Ut[Z] = Ut[K] = Ut["[object Map]"] = Ut[J] = Ut[tt] = Ut[et] = Ut["[object Set]"] = Ut[nt] = Ut["[object WeakMap]"] = !1;
            var Vt = {};
            Vt[q] = Vt[Y] = Vt[rt] = Vt[X] = Vt[Q] = Vt[it] = Vt[ot] = Vt[at] = Vt[st] = Vt[ct] = Vt[J] = Vt[tt] = Vt[et] = Vt[nt] = Vt[ut] = Vt[lt] = Vt[ht] = Vt[ft] = !0, Vt[Z] = Vt[K] = Vt["[object Map]"] = Vt["[object Set]"] = Vt["[object WeakMap]"] = !1;
            var zt = {
                    "À": "A",
                    "Á": "A",
                    "Â": "A",
                    "Ã": "A",
                    "Ä": "A",
                    "Å": "A",
                    "à": "a",
                    "á": "a",
                    "â": "a",
                    "ã": "a",
                    "ä": "a",
                    "å": "a",
                    "Ç": "C",
                    "ç": "c",
                    "Ð": "D",
                    "ð": "d",
                    "È": "E",
                    "É": "E",
                    "Ê": "E",
                    "Ë": "E",
                    "è": "e",
                    "é": "e",
                    "ê": "e",
                    "ë": "e",
                    "Ì": "I",
                    "Í": "I",
                    "Î": "I",
                    "Ï": "I",
                    "ì": "i",
                    "í": "i",
                    "î": "i",
                    "ï": "i",
                    "Ñ": "N",
                    "ñ": "n",
                    "Ò": "O",
                    "Ó": "O",
                    "Ô": "O",
                    "Õ": "O",
                    "Ö": "O",
                    "Ø": "O",
                    "ò": "o",
                    "ó": "o",
                    "ô": "o",
                    "õ": "o",
                    "ö": "o",
                    "ø": "o",
                    "Ù": "U",
                    "Ú": "U",
                    "Û": "U",
                    "Ü": "U",
                    "ù": "u",
                    "ú": "u",
                    "û": "u",
                    "ü": "u",
                    "Ý": "Y",
                    "ý": "y",
                    "ÿ": "y",
                    "Æ": "Ae",
                    "æ": "ae",
                    "Þ": "Th",
                    "þ": "th",
                    "ß": "ss"
                }, Gt = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "`": "&#96;"},
                Wt = {"&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&#96;": "`"},
                $t = {function: !0, object: !0}, qt = {
                    0: "x30",
                    1: "x31",
                    2: "x32",
                    3: "x33",
                    4: "x34",
                    5: "x35",
                    6: "x36",
                    7: "x37",
                    8: "x38",
                    9: "x39",
                    A: "x41",
                    B: "x42",
                    C: "x43",
                    D: "x44",
                    E: "x45",
                    F: "x46",
                    a: "x61",
                    b: "x62",
                    c: "x63",
                    d: "x64",
                    e: "x65",
                    f: "x66",
                    n: "x6e",
                    r: "x72",
                    t: "x74",
                    u: "x75",
                    v: "x76",
                    x: "x78"
                }, Yt = {"\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029"},
                Xt = $t[typeof e] && e && !e.nodeType && e, Qt = $t[typeof t] && t && !t.nodeType && t,
                Zt = Xt && Qt && "object" == typeof r && r && r.Object && r,
                Kt = $t[typeof self] && self && self.Object && self,
                Jt = $t[typeof window] && window && window.Object && window,
                te = (Qt && Qt.exports, Zt || Jt !== (this && this.window) && Jt || Kt || this), ee = M();
            te._ = ee, (i = function () {
                return ee
            }.call(e, n, e, t)) !== P && (t.exports = i)
        }).call(this)
    }).call(e, n(8)(t), n(3))
}, function (t, e, n) {
    var r = n(6), i = n(0), o = function (t) {
        t.manager && (this.manager = t.manager), t.cubemaps && (this.cubemaps = t.cubemaps), t.sh && (this.sh = t.sh), t.textures && (this.textures = t.textures), t.panoramas && (this.panoramas = t.panoramas), t.geometries && (this.geometries = t.geometries)
    };
    o.prototype.load = function () {
        var t = {};
        return this.cubemaps && (t.cubemap = i.loadSpecularCubemaps(this.cubemaps)), this.panoramas && (t.panorama = i.loadPanoramas(this.panoramas)), this.sh && (t.sh = i.loadSH(this.sh)), this.textures && (t.texture = i.loadTextures(this.textures)), this.geometries && (t.geometry = i.loadGeometries(this.geometries)), r.props(t)
    }, t.exports = o
}, function (t, e, n) {
    (function (t) {
        function r(t, e) {
            this._id = t, this._clearFn = e
        }

        var i = void 0 !== t && t || "undefined" != typeof self && self || window, o = Function.prototype.apply;
        e.setTimeout = function () {
            return new r(o.call(setTimeout, i, arguments), clearTimeout)
        }, e.setInterval = function () {
            return new r(o.call(setInterval, i, arguments), clearInterval)
        }, e.clearTimeout = e.clearInterval = function (t) {
            t && t.close()
        }, r.prototype.unref = r.prototype.ref = function () {
        }, r.prototype.close = function () {
            this._clearFn.call(i, this._id)
        }, e.enroll = function (t, e) {
            clearTimeout(t._idleTimeoutId), t._idleTimeout = e
        }, e.unenroll = function (t) {
            clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
        }, e._unrefActive = e.active = function (t) {
            clearTimeout(t._idleTimeoutId);
            var e = t._idleTimeout;
            e >= 0 && (t._idleTimeoutId = setTimeout(function () {
                t._onTimeout && t._onTimeout()
            }, e))
        }, n(20), e.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== t && t.setImmediate || this && this.setImmediate, e.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== t && t.clearImmediate || this && this.clearImmediate
    }).call(e, n(3))
}, function (t, e, n) {
    (function (t, e) {
        !function (t, n) {
            "use strict";

            function r(t) {
                "function" != typeof t && (t = new Function("" + t));
                for (var e = new Array(arguments.length - 1), n = 0; n < e.length; n++) e[n] = arguments[n + 1];
                var r = {callback: t, args: e};
                return u[c] = r, s(c), c++
            }

            function i(t) {
                delete u[t]
            }

            function o(t) {
                var e = t.callback, r = t.args;
                switch (r.length) {
                    case 0:
                        e();
                        break;
                    case 1:
                        e(r[0]);
                        break;
                    case 2:
                        e(r[0], r[1]);
                        break;
                    case 3:
                        e(r[0], r[1], r[2]);
                        break;
                    default:
                        e.apply(n, r)
                }
            }

            function a(t) {
                if (l) setTimeout(a, 0, t); else {
                    var e = u[t];
                    if (e) {
                        l = !0;
                        try {
                            o(e)
                        } finally {
                            i(t), l = !1
                        }
                    }
                }
            }

            if (!t.setImmediate) {
                var s, c = 1, u = {}, l = !1, h = t.document, f = Object.getPrototypeOf && Object.getPrototypeOf(t);
                f = f && f.setTimeout ? f : t, "[object process]" === {}.toString.call(t.process) ? function () {
                    s = function (t) {
                        e.nextTick(function () {
                            a(t)
                        })
                    }
                }() : function () {
                    if (t.postMessage && !t.importScripts) {
                        var e = !0, n = t.onmessage;
                        return t.onmessage = function () {
                            e = !1
                        }, t.postMessage("", "*"), t.onmessage = n, e
                    }
                }() ? function () {
                    var e = "setImmediate$" + Math.random() + "$", n = function (n) {
                        n.source === t && "string" == typeof n.data && 0 === n.data.indexOf(e) && a(+n.data.slice(e.length))
                    };
                    t.addEventListener ? t.addEventListener("message", n, !1) : t.attachEvent("onmessage", n), s = function (n) {
                        t.postMessage(e + n, "*")
                    }
                }() : t.MessageChannel ? function () {
                    var t = new MessageChannel;
                    t.port1.onmessage = function (t) {
                        a(t.data)
                    }, s = function (e) {
                        t.port2.postMessage(e)
                    }
                }() : h && "onreadystatechange" in h.createElement("script") ? function () {
                    var t = h.documentElement;
                    s = function (e) {
                        var n = h.createElement("script");
                        n.onreadystatechange = function () {
                            a(e), n.onreadystatechange = null, t.removeChild(n), n = null
                        }, t.appendChild(n)
                    }
                }() : function () {
                    s = function (t) {
                        setTimeout(a, 0, t)
                    }
                }(), f.setImmediate = r, f.clearImmediate = i
            }
        }("undefined" == typeof self ? void 0 === t ? this : t : self)
    }).call(e, n(3), n(7))
}, function (t, e, n) {
    var r = n(22), i = n(23), o = n(24), a = n(25), e = t.exports = function () {
        var t = o(arguments).map(s);
        return a.isUri(t[0]) ? i.apply(i, t) : r.join.apply(r, t)
    }, s = (e.isUrl = function (t) {
        return a.isUri(t) || "http://" === t || "https://" === t || "ftp://" === t
    }, e.replaceUndefined = function (t, e, n) {
        return void 0 === t || null === t ? a.isUri(n[0]) ? "/" : r.sep : t
    })
}, function (t, e, n) {
    (function (t) {
        function n(t, e) {
            for (var n = 0, r = t.length - 1; r >= 0; r--) {
                var i = t[r];
                "." === i ? t.splice(r, 1) : ".." === i ? (t.splice(r, 1), n++) : n && (t.splice(r, 1), n--)
            }
            if (e) for (; n--; n) t.unshift("..");
            return t
        }

        function r(t, e) {
            if (t.filter) return t.filter(e);
            for (var n = [], r = 0; r < t.length; r++) e(t[r], r, t) && n.push(t[r]);
            return n
        }

        var i = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, o = function (t) {
            return i.exec(t).slice(1)
        };
        e.resolve = function () {
            for (var e = "", i = !1, o = arguments.length - 1; o >= -1 && !i; o--) {
                var a = o >= 0 ? arguments[o] : t.cwd();
                if ("string" != typeof a) throw new TypeError("Arguments to path.resolve must be strings");
                a && (e = a + "/" + e, i = "/" === a.charAt(0))
            }
            return e = n(r(e.split("/"), function (t) {
                return !!t
            }), !i).join("/"), (i ? "/" : "") + e || "."
        }, e.normalize = function (t) {
            var i = e.isAbsolute(t), o = "/" === a(t, -1);
            return t = n(r(t.split("/"), function (t) {
                return !!t
            }), !i).join("/"), t || i || (t = "."), t && o && (t += "/"), (i ? "/" : "") + t
        }, e.isAbsolute = function (t) {
            return "/" === t.charAt(0)
        }, e.join = function () {
            var t = Array.prototype.slice.call(arguments, 0);
            return e.normalize(r(t, function (t, e) {
                if ("string" != typeof t) throw new TypeError("Arguments to path.join must be strings");
                return t
            }).join("/"))
        }, e.relative = function (t, n) {
            function r(t) {
                for (var e = 0; e < t.length && "" === t[e]; e++) ;
                for (var n = t.length - 1; n >= 0 && "" === t[n]; n--) ;
                return e > n ? [] : t.slice(e, n - e + 1)
            }

            t = e.resolve(t).substr(1), n = e.resolve(n).substr(1);
            for (var i = r(t.split("/")), o = r(n.split("/")), a = Math.min(i.length, o.length), s = a, c = 0; c < a; c++) if (i[c] !== o[c]) {
                s = c;
                break
            }
            for (var u = [], c = s; c < i.length; c++) u.push("..");
            return u = u.concat(o.slice(s)), u.join("/")
        }, e.sep = "/", e.delimiter = ":", e.dirname = function (t) {
            var e = o(t), n = e[0], r = e[1];
            return n || r ? (r && (r = r.substr(0, r.length - 1)), n + r) : "."
        }, e.basename = function (t, e) {
            var n = o(t)[2];
            return e && n.substr(-1 * e.length) === e && (n = n.substr(0, n.length - e.length)), n
        }, e.extname = function (t) {
            return o(t)[3]
        };
        var a = "b" === "ab".substr(-1) ? function (t, e, n) {
            return t.substr(e, n)
        } : function (t, e, n) {
            return e < 0 && (e = t.length + e), t.substr(e, n)
        }
    }).call(e, n(7))
}, function (t, e) {
    function n(t) {
        return t.replace(/[\/]+/g, "/").replace(/\/\?/g, "?").replace(/\/\#/g, "#").replace(/\:\//g, "://")
    }

    t.exports = function () {
        return n([].slice.call(arguments, 0).join("/"))
    }
}, function (t, e) {
    function n(t) {
        return "[object Object]" === Object.prototype.toString.call(t)
    }

    function r(t) {
        return "[object Arguments]" === Object.prototype.toString.call(t)
    }

    function i(t) {
        return Object.keys(t).map(function (e) {
            return t[e]
        })
    }

    t.exports = function (t, e) {
        return t || (t = []), r(t) && (t = [].splice.call(t, 0)), n(t) && e && (t = i(t)), Array.isArray(t) ? t : [t]
    }
}, function (t, e, n) {
    (function (t) {
        !function (t) {
            "use strict";

            function e(t) {
                if (t && !/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(t) && !/%[^0-9a-f]/i.test(t) && !/%[0-9a-f](:?[^0-9a-f]|$)/i.test(t)) {
                    var e = [], n = "", r = "", i = "", a = "", s = "", c = "";
                    if (e = o(t), n = e[1], r = e[2], i = e[3], a = e[4], s = e[5], n && n.length && i.length >= 0) {
                        if (r && r.length) {
                            if (0 !== i.length && !/^\//.test(i)) return
                        } else if (/^\/\//.test(i)) return;
                        if (/^[a-z][a-z0-9\+\-\.]*$/.test(n.toLowerCase())) return c += n + ":", r && r.length && (c += "//" + r), c += i, a && a.length && (c += "?" + a), s && s.length && (c += "#" + s), c
                    }
                }
            }

            function n(t, n) {
                if (e(t)) {
                    var r = [], i = "", a = "", s = "", c = "", u = "", l = "", h = "";
                    if (r = o(t), i = r[1], a = r[2], s = r[3], u = r[4], l = r[5], i) {
                        if (n) {
                            if ("https" != i.toLowerCase()) return
                        } else if ("http" != i.toLowerCase()) return;
                        if (a) return /:(\d+)$/.test(a) && (c = a.match(/:(\d+)$/)[0], a = a.replace(/:\d+$/, "")), h += i + ":", h += "//" + a, c && (h += c), h += s, u && u.length && (h += "?" + u), l && l.length && (h += "#" + l), h
                    }
                }
            }

            function r(t) {
                return n(t, !0)
            }

            function i(t) {
                return n(t) || r(t)
            }

            t.exports.is_uri = e, t.exports.is_http_uri = n, t.exports.is_https_uri = r, t.exports.is_web_uri = i, t.exports.isUri = e, t.exports.isHttpUri = n, t.exports.isHttpsUri = r, t.exports.isWebUri = i;
            var o = function (t) {
                return t.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/)
            }
        }(t)
    }).call(e, n(8)(t))
}, function (t, e) {
    function n(t, e, n) {
        for (var r = t * t, i = 2 * t * t, o = 3 * t * t, a = 0, s = 0; s < r; s++) n[a++] = e[s], n[a++] = e[s + r], n[a++] = e[s + i], n[a++] = e[s + o]
    }

    var r = function (t, e, n) {
        this.manager = void 0 !== n ? n : THREE.DefaultLoadingManager, this._size = t, this._interleaving = e
    };
    r.prototype = Object.create(THREE.BinaryTextureLoader.prototype), r.prototype._parser = function (t) {
        var e, r = this._size;
        if (this._interleaving) {
            var i = r * r * 4, o = new Uint8Array(t);
            e = new Uint8Array(i), n(r, o, e)
        } else e = new Uint8Array(t);
        return {
            width: r,
            height: r,
            data: e,
            format: THREE.RGBAFormat,
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping,
            type: THREE.UnsignedByteType
        }
    }, t.exports = r
}, function (t, e) {
    function n(t, e, n) {
        for (var r = t * t, i = 2 * t * t, o = 3 * t * t, a = 0, s = 0; s < r; s++) n[a++] = e[s], n[a++] = e[s + r], n[a++] = e[s + i], n[a++] = e[s + o]
    }

    var r = function (t, e, n) {
        this.manager = void 0 !== n ? n : THREE.DefaultLoadingManager, this._size = t, this._interleaved = e
    };
    r.prototype = Object.create(THREE.CompressedTextureLoader.prototype), r.prototype._parser = function (t) {
        for (var e = [], r = Math.log2(this._size), i = 0, o = 0; o <= r; o++) {
            var a = Math.pow(2, r - o), s = a * a * 4;
            if (i >= t.byteLength) break;
            for (var c = 0; c < 6; c++) {
                if (e[c] || (e[c] = []), this._interleaved) {
                    var u = new Uint8Array(t, i, s), l = new Uint8Array(s);
                    n(a, u, l)
                } else var l = new Uint8Array(t, i, s);
                e[c].push({data: l, width: a, height: a}), i += s
            }
        }
        return {
            isCubemap: !0,
            mipmaps: _.flatten(e),
            mipmapCount: r + 1,
            width: this._size,
            height: this._size,
            format: THREE.RGBAFormat,
            minFilter: THREE.LinearMipMapLinearFilter,
            magFilter: THREE.LinearFilter,
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping,
            type: THREE.UnsignedByteType
        }
    }, Math.log2 = Math.log2 || function (t) {
        return Math.log(t) * Math.LOG2E
    }, t.exports = r
}, function (t, e) {
    function n(t) {
        var e = t.slice(0, 27), n = 1 / (2 * Math.sqrt(Math.PI)), r = -.5 * Math.sqrt(3 / Math.PI), i = -r, o = r,
            a = .5 * Math.sqrt(15 / Math.PI), s = -a, c = .25 * Math.sqrt(5 / Math.PI), u = s,
            l = .25 * Math.sqrt(15 / Math.PI);
        return [n, n, n, r, r, r, i, i, i, o, o, o, a, a, a, s, s, s, c, c, c, u, u, u, l, l, l].map(function (t, n) {
            return t * e[n]
        })
    }

    var r = function (t) {
        THREE.XHRLoader.call(this), this.manager = void 0 !== t ? t : THREE.DefaultLoadingManager
    };
    r.prototype = Object.create(THREE.XHRLoader.prototype), r.prototype.load = function (t, e, r, i) {
        THREE.XHRLoader.prototype.load.call(this, t, function (t) {
            var r = JSON.parse(t), i = n(r);
            e(i)
        }, r, i)
    }, t.exports = r
}, function (t, e) {
    var n = function (t) {
        THREE.XHRLoader.call(this), this.setResponseType("arraybuffer"), this.manager = void 0 !== t ? t : THREE.DefaultLoadingManager
    };
    n.prototype = Object.create(THREE.XHRLoader.prototype), t.exports = n
}, function (t, e, n) {
    var r = n(6);
    n(31);
    var i = n(0), o = (n(10), n(9), {});
    o.loadScene = function (t, e, n, o) {
        return new r(function (r, a) {
            var s = (n.renderer, i.getGeometry(t));
            s && i.sceneLoader.setBinaryGeometryBuffer(s), i.loadScene(e + t + (o || ".json")).spread(function (t, e) {
                var i;
                t.materials = {}, t.cameras && t.cameras.length > 0 && (i = t.cameras[0]), i ? (i.aspect = window.innerWidth / window.innerHeight, i.updateProjectionMatrix()) : (i = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .01, 2e3), i.position.set(-3.5, 2, 3)), t.traverse(function (e) {
                    e.material && (e.material.materials ? e.material.materials.forEach(function (e) {
                        t.materials[e.uuid] = e
                    }) : t.materials[e.material.uuid] = e.material), e instanceof THREE.DirectionalLight && (e.position.set(0, 0, 1), e.quaternion.normalize(), e.position.applyQuaternion(e.quaternion), e.quaternion.set(0, 0, 0, 0), e.scale.set(0, 0, 0))
                }), n.scene = t, n.scenes.push(t), n.camera = i, r(t)
            })
        })
    }, t.exports = o
}, function (t, e, n) {
    var r = (n(2), n(10)), i = n(33), o = (n(0), THREE.MaterialLoader.prototype.parse);
    THREE.MaterialLoader.prototype.parse = function (t) {
        var e = o.call(this, t);
        if (t.customType && "MatcapMaterial" === t.customType) return i.create({
            uuid: t.uuid,
            name: t.name,
            normalMap: e.normalMap,
            matcapMap: THREE.ImageUtils.loadTexture("textures/matcap.jpg"),
            normalMapFactor: 1
        });
        if (t.customType && "PBRMaterial" === t.customType) {
            var a = t.metalGlossMap ? this.getTexture(t.metalGlossMap) : null,
                s = t.map2 ? this.getTexture(t.map2) : null, c = t.normalMap2 ? this.getTexture(t.normalMap2) : null,
                u = t.aoMap2 ? this.getTexture(t.aoMap2) : null, l = t.lightMapM ? this.getTexture(t.lightMapM) : null,
                h = t.lightMapDir ? this.getTexture(t.lightMapDir) : null,
                f = t.emissiveMap ? this.getTexture(t.emissiveMap) : null,
                p = t.packedPBRMap ? this.getTexture(t.packedPBRMap) : null;
            return r.create({
                vertexShader: n(34),
                fragmentShader: n(35),
                uuid: t.uuid,
                name: t.name,
                color: t.color,
                opacity: e.opacity,
                transparent: e.transparent,
                alphaTest: e.alphaTest,
                environment: t.environment,
                exposure: t.exposure,
                albedoMap: e.map,
                albedoMap2: s,
                metalGlossMap: a,
                packedMap: p,
                metalFactor: t.metalFactor,
                glossFactor: t.glossFactor,
                normalMapFactor: t.normalFactor,
                normalMap: e.normalMap,
                normalMap2: c,
                lightMap: e.lightMap,
                lightMapM: l,
                lightMapDir: h,
                aoMap: e.aoMap,
                aoMap2: u,
                aoFactor: t.aoFactor,
                occludeSpecular: t.occludeSpecular,
                emissiveMap: f
            })
        }
        if ("SkyboxMaterial" === t.customType) {
            var d = THREE.ShaderLib.cube;
            e.vertexShader = n(36), e.fragmentShader = n(37), e.uniforms = THREE.UniformsUtils.clone(d.uniforms), e.uniforms.tCube.value = this.getTexture(t.cubemap)
        }
        return e
    }
}, function (t, e) {
    var n = ["side", "alphaTest", "transparent", "depthWrite", "shading", "wireframe"], r = function (t) {
        t = t || {}, THREE.RawShaderMaterial.call(this, t), _.each(n, function (e) {
            var n = t[e];
            void 0 !== n && (this[e] = n)
        }, this)
    };
    r.inherit(THREE.RawShaderMaterial, {
        onPropertyChange: function (t, e) {
            Object.defineProperty(this, t, {
                get: function () {
                    return this["_" + t]
                }, set: function (n) {
                    this["_" + t] = n, e.call(this, n)
                }
            })
        }, clone: function (t) {
            var e = t || new Material;
            return THREE.RawShaderMaterial.prototype.clone.call(this, e), e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.fog = this.fog, e.lights = this.lights, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
        }
    }), t.exports = r
}, function (t, e, n) {
    function r(t, e) {
        return void 0 !== t ? t : e
    }

    var i = n(2), o = n(0),
        a = {normalMapFactor: "uNormalMapFactor", normalMap: "sTextureNormalMap", matcapMap: "sTextureAOMap"},
        s = function (t) {
            t = Object.assign({
                vertexShader: t.vertexShader,
                fragmentShader: t.fragmentShader,
                uniforms: {
                    uNormalMapFactor: {type: "f", value: 1},
                    sTextureMatcapMap: {type: "t", value: null},
                    sTextureNormalMap: {type: "t", value: null},
                    uFlipY: {type: "i", value: 0},
                    uOutputLinear: {type: "i", value: 0}
                }
            }, t), i.call(this, t), Object.keys(this.uniforms).forEach(function (t) {
                this.onPropertyChange(t, function (e) {
                    this.uniforms[t].value = e
                })
            }, this), _.each(a, function (t, e) {
                this.onPropertyChange(e, function (e) {
                    this[t] = e
                })
            }, this), this.extensions = {derivatives: !0}
        };
    s.inherit(i, {
        clone: function (t) {
            var e = t || new s;
            return i.prototype.clone.call(this, e), e.name = this.name, e.transparent = this.transparent, _.each(this.uniforms, function (t, n) {
                var r = t.type;
                "v2" === r || "m4" === r ? e.uniforms[n].value.copy(t.value) : e.uniforms[n].value = t.value
            }, this), e
        }
    }), s.create = function (t) {
        var e = new s;
        e.uuid = t.uuid, e.name = t.name, e.transparent = r(t.transparent, !1), e.polygonOffset = r(t.polygonOffset, !1), e.polygonOffsetUnits = r(t.polygonOffsetUnits, 0), e.polygonOffsetFactor = r(t.polygonOffsetFactor, 0);
        var n = (o.getTexture("white.png"), t.normalMap), i = t.matcapMap;
        return e.uNormalMapFactor = r(t.normalMapFactor, 1), e.uFlipY = r(t.flipNormals, 0), e.side = r(t.side, THREE.FrontSide), n.needsUpdate = !0, i.needsUpdate = !0, e.sTextureNormalMap = n, e.sTextureMatcapMap = i, e
    }, t.exports = s
}, function (t, e) {
    t.exports = "attribute vec3 position;\nattribute vec3 normal;\nattribute vec4 tangent;\nattribute vec2 uv;\nattribute vec2 uv2;\n\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\n\nuniform vec4 offsetRepeat;\nuniform vec4 offsetRepeatDetail;\n\nvarying vec3 FragNormal;\nvarying vec4 FragTangent;\nvarying vec4 FragEyeVector;\nvarying vec2 vUv;\n\n#if defined(USE_ALBEDO2) || defined(USE_NORMALMAP2) || defined(USE_AOMAP2)\nvarying vec2 vUvDetail;\n#endif\n\n#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif\n\nvoid main() {\n  vec4 worldPosition = modelMatrix * vec4(position, 1.0);\n\n  FragEyeVector = viewMatrix * worldPosition;\n\n  gl_Position = projectionMatrix * FragEyeVector;\n\n  vUv = uv.xy * offsetRepeat.zw + offsetRepeat.xy;\n\n  #if defined(USE_ALBEDO2) || defined(USE_NORMALMAP2) || defined(USE_AOMAP2)\n  vUvDetail = uv.xy * offsetRepeatDetail.zw + offsetRepeatDetail.xy;\n  #endif\n\n  FragNormal = normalMatrix * normal;\n  FragTangent.xyz = normalMatrix * tangent.xyz;\n  FragTangent.w = tangent.w;\n\n  #ifdef USE_LIGHTMAP\n  vUv2 = uv2.xy;\n  #endif\n}\n"
}, function (t, e) {
    t.exports = "#define MOBILE\n#define LUV\n\nuniform float uAOPBRFactor;\nuniform float uAlbedoPBRFactor;\nuniform float uEnvironmentExposure;\nuniform float uGlossinessPBRFactor;\nuniform float uMetalnessPBRFactor;\nuniform float uNormalMapFactor;\nuniform float uOpacityFactor;\nuniform float uSpecularF0Factor;\n\nuniform int uMode;\nuniform vec3 uColor;\nuniform float uAlphaTest;\n\nuniform int uFlipY;\nuniform int uOccludeSpecular;\nuniform int uOutputLinear;\n\nuniform samplerCube sSpecularPBR;\nuniform sampler2D sPanoramaPBR;\n\nuniform sampler2D sTextureAlbedoMap;\nuniform sampler2D sTextureAlbedoMap2;\nuniform sampler2D sTextureNormalMap;\nuniform sampler2D sTextureNormalMap2;\n#ifdef USE_PACKEDMAP\nuniform sampler2D sTexturePackedMap;\n#else\nuniform sampler2D sTextureAOMap;\nuniform sampler2D sTextureMetalGlossMap;\n#endif\nuniform sampler2D sTextureAOMap2;\nuniform sampler2D sTextureEmissiveMap;\n\nuniform vec2 uTextureEnvironmentSpecularPBRLodRange;\nuniform vec2 uTextureEnvironmentSpecularPBRTextureSize;\nuniform vec3 uDiffuseSPH[9];\nuniform mat4 uEnvironmentTransform;\n\nvarying vec3 FragNormal;\nvarying vec4 FragTangent;\nvarying vec4 FragEyeVector;\nvarying vec2 vUv;\n\n#if defined(USE_ALBEDO2) || defined(USE_NORMALMAP2) || defined(USE_AOMAP2)\nvarying vec2 vUvDetail;\n#endif\n\n#ifdef USE_LIGHTMAP\n  uniform sampler2D sTextureLightMap;\n  uniform sampler2D sTextureLightMapM;\n  varying vec2 vUv2;\n#endif\n\n#ifdef USE_DIR_LIGHT\nuniform vec3 viewLightDir;\nuniform vec3 lightColor;\nuniform int highlights;\n#endif\n\nvec3 DecodeLightmapRGBM(vec4 data, vec2 decodeInstructions) {\n  return (decodeInstructions.x * pow(abs(data.a), decodeInstructions.y)) * data.rgb;\n}\n\nfloat linearTosRGB(const in float c) {\n  if (c >= 1.0) return 1.0;\n  float S1 = sqrt(c);\n  float S2 = sqrt(S1);\n  float S3 = sqrt(S2);\n  return 0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * c;\n}\n\nvec3 linearTosRGB(const in vec3 c) {\n  vec3 cm = c;\n  vec3 S1 = sqrt(cm);\n  vec3 S2 = sqrt(S1);\n  vec3 S3 = sqrt(S2);\n  return 0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * cm;\n}\n\nvec4 linearTosRGB(const in vec4 c) {\n  vec3 cm = min(c.rgb, 1.0);\n  vec3 S1 = sqrt(cm);\n  vec3 S2 = sqrt(S1);\n  vec3 S3 = sqrt(S2);\n  return vec4(0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * cm, c.a);\n}\n\nfloat sRGBToLinear(const in float c) {\n  return c * (c * (c * 0.305306011 + 0.682171111) + 0.012522878);\n}\n\nvec3 sRGBToLinear(const in vec3 c) {\n  return c * (c * (c * 0.305306011 + 0.682171111) + 0.012522878);\n}\n\nvec4 sRGBToLinear(const in vec4 c) {\n  return vec4(c.rgb * (c.rgb * (c.rgb * 0.305306011 + 0.682171111) + 0.012522878), c.a);\n}\n\nvec3 RGBMToRGB(const in vec4 rgba) {\n  const float maxRange = 8.0;\n  return rgba.rgb * maxRange * rgba.a;\n}\n\nconst mat3 LUVInverse = mat3(6.0013,    -2.700,   -1.7995,\n                -1.332,    3.1029,   -5.7720,\n                0.3007,    -1.088,    5.6268);\n\nvec3 LUVToRGB(const in vec4 vLogLuv) {\n  float Le = vLogLuv.z * 255.0 + vLogLuv.w;\n  vec3 Xp_Y_XYZp;\n  Xp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n  Xp_Y_XYZp.z = Xp_Y_XYZp.y / vLogLuv.y;\n  Xp_Y_XYZp.x = vLogLuv.x * Xp_Y_XYZp.z;\n  vec3 vRGB = LUVInverse * Xp_Y_XYZp;\n  return max(vRGB, 0.0);\n}\n\nvec4 encodeRGBM(const in vec3 col, const in float range) {\n  if(range <= 0.0)\n    return vec4(col, 1.0);\n  vec4 rgbm;\n  vec3 color = col / range;\n  rgbm.a = clamp(max(max(color.r, color.g), max(color.b, 1e-6)), 0.0, 1.0);\n  rgbm.a = ceil(rgbm.a * 255.0) / 255.0;\n  rgbm.rgb = color / rgbm.a;\n  return rgbm;\n}\n\nvec3 decodeRGBM(const in vec4 col, const in float range) {\n  if(range <= 0.0)\n    return col.rgb;\n  return range * col.rgb * col.a;\n}\n\nvec3 textureRGB(const in sampler2D texture, const in vec2 uv) {\n  return texture2D(texture, uv.xy).rgb;\n}\n\nvec4 textureRGBA(const in sampler2D texture, const in vec2 uv) {\n  return texture2D(texture, uv.xy).rgba;\n}\n\nfloat textureIntensity(const in sampler2D texture, const in vec2 uv) {\n  return texture2D(texture, uv).r;\n}\n\nfloat textureAlpha(const in sampler2D texture, const in vec2 uv) {\n  return texture2D(texture, uv.xy).a;\n}\n\nfloat adjustSpecular(const in float specular, const in vec3 normal) {\n  float normalLen = length(normal);\n  if (normalLen < 1.0) {\n    float normalLen2 = normalLen * normalLen;\n    float kappa = (3.0 * normalLen -  normalLen2 * normalLen)/(1.0 - normalLen2);\n    return 1.0-min(1.0, sqrt((1.0-specular) * (1.0-specular) + 1.0/kappa));\n  }\n  return specular;\n}\n\nvec3 mtexNspaceTangent(const in vec4 tangent, const in vec3 normal, const in vec3 texnormal) {\n  vec3 tang = vec3(0.0,1.0,0.0);\n  float l = length(tangent.xyz);\n  if (l != 0.0) {\n    tang =  tangent.xyz / l;\n  }\n  vec3 B = tangent.w * normalize(cross(normal, tang));\n  return normalize(texnormal.x*tang + texnormal.y*B + texnormal.z*normal);\n}\n\nvec2 normalMatcap(const in vec3 normal, const in vec3 nm_z) {\n  vec3 nm_x = vec3(-nm_z.z, 0.0, nm_z.x);\n  vec3 nm_y = cross(nm_x, nm_z);\n  return vec2(dot(normal.xz, nm_x.xz), dot(normal, nm_y)) * vec2(0.5)  + vec2(0.5) ;\n}\n\nvec3 rgbToNormal(const in vec3 texel, const in int flipNormalY) {\n  vec3 rgb = texel * vec3(2.0) + vec3(-1.0);\n  rgb[1] = flipNormalY == 1 ? -rgb[1] : rgb[1];\n  return rgb;\n}\n\nvec3 bumpMap(const in vec4 tangent, const in vec3 normal, const in vec2 gradient) {\n  vec3 outnormal;\n  float l = length(tangent.xyz);\n  if (l != 0.0) {\n    vec3 tang =  tangent.xyz / l;\n    vec3 binormal = tangent.w * normalize(cross(normal, tang));\n    outnormal = normal + gradient.x * tang + gradient.y * binormal;\n  }\n  else {\n     outnormal = vec3(normal.x + gradient.x, normal.y + gradient.y, normal.z);\n  }\n  return normalize(outnormal);\n}\n\nfloat specularOcclusion(const in int occlude, const in float ao, const in vec3 N, const in vec3 V) {\n  if(occlude == 0)\n    return 1.0;\n  float d = dot(N, V) + ao;\n  return clamp((d * d) - 1.0 + ao, 0.0, 1.0);\n}\n\nfloat adjustRoughnessNormalMap(const in float roughness, const in vec3 normal) {\n  float normalLen = length(normal);\n  if (normalLen < 1.0) {\n    float normalLen2 = normalLen * normalLen;\n    float kappa = (3.0 * normalLen -  normalLen2 * normalLen)/(1.0 - normalLen2);\n    return min(1.0, sqrt(roughness * roughness + 1.0/kappa));\n  }\n  return roughness;\n}\n\nfloat adjustRoughnessGeometry(const in float roughness, const in vec3 normal) {\n  return roughness;\n}\n\nmat3 environmentTransformPBR(const in mat4 tr) {\n  vec3 x = vec3(tr[0][0], tr[1][0], tr[2][0]);\n  vec3 y = vec3(tr[0][1], tr[1][1], tr[2][1]);\n  vec3 z = vec3(tr[0][2], tr[1][2], tr[2][2]);\n  mat3 m = mat3(x, y, z);\n  return m;\n}\n\nvec3 evaluateDiffuseSphericalHarmonics(const in vec3 s[9], const in mat3 envTrans, const in vec3 N) {\n  vec3 n = envTrans * N;\n  vec3 result = (s[0]+s[1]*n.y+s[2]*n.z+s[3]*n.x+s[4]*n.y*n.x+s[5]*n.y*n.z+s[6]*(3.0*n.z*n.z-1.0)+s[7]*(n.z*n.x)+s[8]*(n.x*n.x-n.y*n.y));\n  return max(result, vec3(0.0));\n}\n\nfloat linRoughnessToMipmap(const in float roughnessLinear) {\n  return sqrt(roughnessLinear);\n}\n\nvec3 integrateBRDF(const in vec3 specular, const in float r, const in float NoV, const in sampler2D tex) {\n  vec4 rgba = texture2D(tex, vec2(NoV, r));\n  float b = (rgba[3] * 65280.0 + rgba[2] * 255.0);\n  float a = (rgba[1] * 65280.0 + rgba[0] * 255.0);\n  const float div = 1.0/65535.0;\n  return (specular * a + b) * div;\n}\n\nvec3 integrateBRDFApprox(const in vec3 specular, const in float roughness, const in float NoV) {\n  const vec4 c0 = vec4(-1, -0.0275, -0.572, 0.022);\n  const vec4 c1 = vec4(1, 0.0425, 1.04, -0.04);\n  vec4 r = roughness * c0 + c1;\n  float a004 = min(r.x * r.x, exp2(-9.28 * NoV)) * r.x + r.y;\n  vec2 AB = vec2(-1.04, 1.04) * a004 + r.zw;\n  return specular * AB.x + AB.y;\n}\n\nvec3 computeIBLDiffuseUE4(const in vec3 normal, const in vec3 albedo, const in mat3 envTrans, const in vec3 sphHarm[9]) {\n  return evaluateDiffuseSphericalHarmonics(sphHarm, envTrans, normal);\n}\n\n\n#ifdef CUBEMAP\nvec3 textureCubemapLod(const in samplerCube texture, const in vec3 dir, const in float lod) {\n  vec4 rgba = textureCubeLodEXT(texture, dir, lod);\n#ifdef FLOAT\n  return rgba.rgb;\n#endif\n#ifdef RGBM\n  return RGBMToRGB(rgba);\n#endif\n#ifdef LUV\n  return LUVToRGB(rgba);\n#endif\n}\n\nvec3 textureCubeLodEXTFixed(const in samplerCube texture, const in vec2 size, const in vec3 direction, const in float lodInput, const in float maxLod) {\n  vec3 dir = direction;\n  float lod = min(maxLod, lodInput);\n\n  float scale = 1.0 - exp2(lod) / size.x;\n  vec3 absDir = abs(dir);\n  float M = max(max(absDir.x, absDir.y), absDir.z);\n\n  if (absDir.x != M) dir.x *= scale;\n  if (absDir.y != M) dir.y *= scale;\n  if (absDir.z != M) dir.z *= scale;\n\n  return textureCubemapLod(texture, dir, lod);\n}\n\nvec3 prefilterEnvMapCube(const in float rLinear, const in vec3 R, const in samplerCube tex, const in vec2 lodRange, const in vec2 size){\n  float lod = linRoughnessToMipmap(rLinear) * lodRange[1];\n  return textureCubeLodEXTFixed(tex, size, R, lod, lodRange[0]);\n}\n\n#define samplerEnv samplerCube\n#define prefilterEnvMap prefilterEnvMapCube\n\n#else\n#ifdef PANORAMA\nvec2 computeUVForMipmap(const in float level, const in vec2 uvBase, const in float size, const in float maxLOD) {\n  vec2 uv = uvBase;\n  float widthForLevel = exp2(maxLOD - level);\n  float heightForLevel = widthForLevel * 0.5;\n  float widthFactor = pow(0.5, level);\n  float heightFactor = widthFactor * 0.5;\n  float texelSize = 1.0 / size;\n\n  uv.y = 1.0 - uv.y;\n\n  float resizeX = (widthForLevel - 2.0) * texelSize;\n  float resizeY = (heightForLevel - 2.0) * texelSize;\n\n  float uvSpaceLocalX = texelSize + uv.x * resizeX;\n  float uvSpaceLocalY = texelSize + uv.y * resizeY;\n\n  uvSpaceLocalY += heightFactor;\n\n  return vec2(uvSpaceLocalX, uvSpaceLocalY);\n}\n\nvec2 normalToPanoramaUVY(const in vec3 dir) {\n  float n = length(dir.xz);\n\n  vec2 pos = vec2((n > 0.0000001) ? max(-1.0, dir.x / n) : 0.0, dir.y);\n\n  if (pos.x > 0.0) pos.x = min(0.999999, pos.x);\n\n  pos = acos(pos) * 0.3183098861837907;\n\n  pos.x = (dir.z > 0.0) ? pos.x * 0.5 : 1.0 - (pos.x * 0.5);\n\n  pos.x = mod(pos.x - 0.25 + 1.0, 1.0);\n  pos.y = 1.0 - pos.y;\n  return pos;\n}\n\nvec3 texturePanorama(const in sampler2D texture, const in vec2 uv) {\n  vec4 rgba = texture2D(texture, uv);\n#ifdef FLOAT\n  return rgba.rgb;\n#endif\n#ifdef RGBM\n  return RGBMToRGB(rgba);\n#endif\n#ifdef LUV\n  return LUVToRGB(rgba);\n#endif\n}\n\nvec3 texturePanoramaLod(const in sampler2D texture, const in vec2 size, const in vec3 direction, const in float lodInput, const in float maxLOD) {\n  float lod = min(maxLOD, lodInput);\n  vec2 uvBase = normalToPanoramaUVY(direction);\n\n  float lod0 = floor(lod);\n  vec2 uv0 = computeUVForMipmap(lod0, uvBase, size.x, maxLOD);\n  vec3 texel0 = texturePanorama(texture, uv0.xy);\n\n  float lod1 = ceil(lod);\n  vec2 uv1 = computeUVForMipmap(lod1, uvBase, size.x, maxLOD);\n  vec3 texel1 = texturePanorama(texture, uv1.xy);\n\n  return mix(texel0, texel1, fract(lod));\n}\n\nvec3 prefilterEnvMapPanorama(const in float rLinear, const in vec3 R, const in sampler2D tex, const in vec2 lodRange, const in vec2 size) {\n  float lod = linRoughnessToMipmap(rLinear) * lodRange[1];\n  return texturePanoramaLod(tex, size, R, lod, lodRange[0]);\n}\n\n#define samplerEnv sampler2D\n#define prefilterEnvMap prefilterEnvMapPanorama\n\n#else\nvec3 prefilterEnvMap(const in float rLinear, const in vec3 R, const in sampler2D tex, const in vec2 lodRange, const in vec2 size) {\n  return vec3(0.0);\n}\n#define samplerEnv sampler2D\n#endif\n\n#endif\n\nvec3 getSpecularDominantDir(const in vec3 N, const in vec3 R, const in float realRoughness) {\n  float smoothness = 1.0 - realRoughness;\n  float lerpFactor = smoothness * (sqrt(smoothness) + realRoughness);\n  return mix(N, R, lerpFactor);\n}\n\nvec3 computeIBLSpecularUE4(\n  const in vec3 N,\n  const in vec3 V,\n  const in float rLinear,\n  const in vec3 specular,\n  const in mat3 envTrans,\n  const in samplerEnv texEnv,\n  const in vec2 lodRange,\n  const in vec2 size,\n  const in vec3 frontNormal\n  #ifdef MOBILE\n){\n  #else\n  ,const in sampler2D texBRDF) {\n  #endif\n\n  float rough = max(rLinear, 0.0);\n\n  float NoV = clamp(dot(N, V), 0.0, 1.0);\n  vec3 R = normalize(NoV * 2.0 * N - V);\n\n  R = getSpecularDominantDir(N, R, rLinear);\n\n  vec3 dir = envTrans * R;\n  dir.xz *= -1.0;\n\n  vec3 prefilteredColor = prefilterEnvMap(rough, dir, texEnv, lodRange, size);\n  float factor = clamp(1.0 + 1.3 * dot(R, frontNormal), 0.1, 1.0);\n  prefilteredColor *= factor * factor;\n  #ifdef MOBILE\n  return prefilteredColor * integrateBRDFApprox(specular, rough, NoV);\n  #else\n  return prefilteredColor * integrateBRDF(specular, rough, NoV, texBRDF);\n  #endif\n}\n\nfloat luma(vec3 color) {\n  return dot(color, vec3(0.299, 0.587, 0.114));\n}\n\n#ifdef USE_DIR_LIGHT\n\n#define PI 3.141593\n#define G1V(dotNV, k) (1.0 / (dotNV * (1.0 - k) + k))\n#define saturate(_x) clamp(_x, 0.0, 1.0)\n\nvec4 LightingFuncPrep(const in vec3 N,\n                      const in vec3 V,\n                      const in float roughness)\n{\n\n    float dotNV = saturate(dot(N,V));\n    float alpha = roughness * roughness;\n    float k = alpha * .5;\n    float visNV = G1V(dotNV,k);\n\n    vec4 prepSpec;\n\n    prepSpec.x = alpha;\n    prepSpec.y = alpha * alpha;\n    prepSpec.z = k;\n    prepSpec.w = visNV;\n\n    return prepSpec;\n\n}\n\nvec3 LightingFuncUsePrepGGX(const vec4 prepSpec,\n              const vec3 N,\n              const vec3 V,\n              const vec3 L,\n              const vec3 F0,\n              const float dotNL)\n{\n  vec3 H = normalize(V + L);\n  float dotNH = saturate(dot(N, H));\n  float alphaSqr = prepSpec.y;\n  float denom = dotNH * dotNH * (alphaSqr - 1.0) + 1.0;\n  float D = alphaSqr / (PI * denom * denom);\n  float dotLH = saturate(dot(L, H));\n  float dotLH5 = pow(1.0 - dotLH, 5.0);\n  vec3 F = vec3(F0) + (vec3(1.0) - F0) * (dotLH5);\n  float visNL = G1V(dotNL, prepSpec.z);\n  vec3 specular = D * F * visNL * prepSpec.w;\n\n  return specular;\n}\n\nvec3 computeLight(const in vec3 lightColor,\n          const in vec3 albedoColor,\n          const in vec3 normal,\n          const in vec3 viewDir,\n          const in vec3 lightDir,\n          const in vec3 specular,\n          const in vec4 prepSpec,\n          const in float dotNL)\n{\n  vec3 cSpec = LightingFuncUsePrepGGX(prepSpec, normal, viewDir, lightDir, specular, dotNL);\n  return lightColor * dotNL * cSpec;\n}\n\nvec3 computeSunLightPBRShading(\n  const in vec3 normal,\n  const in vec3 eyeVector,\n\n  const in vec3 albedo,\n  const in vec4 prepSpec,\n  const in vec3 specular,\n\n  const in vec3 lightColor,\n  const in vec3 lightEyeDir)\n{\n  bool lighted = false;\n  float NdotL = dot(lightEyeDir, normal);\n  if (NdotL > 0.0)\n  {\n    lighted = true;\n    return computeLight(lightColor, albedo, normal, eyeVector, lightEyeDir, specular, prepSpec,  NdotL);\n  }\n  return vec3(0.0);\n}\n#endif\n\n\nvoid main() {\n  vec3 eyeVector = normalize(-FragEyeVector.rgb);\n  mat3 transform = environmentTransformPBR(uEnvironmentTransform);\n\n  vec4 frontTangent = gl_FrontFacing ? FragTangent : -FragTangent;\n  vec3 frontNormal = gl_FrontFacing ? FragNormal : -FragNormal;\n\n  vec3 normal = normalize(frontNormal);\n\n  #ifdef USE_NORMALMAP\n    vec3 nmTexel = rgbToNormal(textureRGB(sTextureNormalMap, vUv.xy), uFlipY);\n    vec3 normalMap = vec3(uNormalMapFactor * nmTexel.xy, nmTexel.z);\n    vec3 geoNormal = mtexNspaceTangent(frontTangent, normal, normalMap);\n  #else\n    vec3 geoNormal = normal;\n  #endif\n\n  #ifdef USE_NORMALMAP2\n    vec3 nm2Texel = rgbToNormal(textureRGB(sTextureNormalMap2, vUvDetail.xy), uFlipY);\n    vec3 normalMap2 = vec3(uNormalMapFactor * nm2Texel.xy, nm2Texel.z);\n    vec3 geoNormal2 = mtexNspaceTangent(frontTangent, normal, normalMap2);\n\n    geoNormal = mix(geoNormal, geoNormal2, 0.5);\n  #endif\n\n  #if defined(USE_PACKEDMAP)\n  vec3 combinedTexel = textureRGB(sTexturePackedMap, vUv.xy);\n  #elif defined(USE_METALGLOSSMAP)\n  vec3 combinedTexel = textureRGB(sTextureMetalGlossMap, vUv.xy);\n  #else\n  vec3 combinedTexel = vec3(1.0, 1.0, 1.0);\n  #endif\n  float metalness = combinedTexel.r;\n  float glossiness = combinedTexel.b;\n  float channelMetalnessPBR = metalness * uMetalnessPBRFactor;\n  float channelGlossinessPBR = glossiness * uGlossinessPBRFactor;\n  float roughness = 1.0 - channelGlossinessPBR;\n  float tmp_51 = max(1.e-4, roughness);\n  #ifdef USE_NORMALMAP\n    float tmp_52 = adjustRoughnessNormalMap(tmp_51, normalMap);\n    float materialRoughness = adjustRoughnessGeometry(tmp_52, normal);\n  #else\n    float materialRoughness = tmp_51;\n  #endif\n\n  vec4 albedoMap = vec4(uColor, 1.0);\n  #ifdef USE_ALBEDOMAP\n    albedoMap *= textureRGBA(sTextureAlbedoMap, vUv.xy);\n  #endif\n\n  #ifdef USE_ALBEDOMAP2\n    albedoMap *= textureRGBA(sTextureAlbedoMap2, vUvDetail.xy);\n  #endif\n\n  vec3 channelAlbedoPBR = sRGBToLinear(albedoMap.rgb) * uAlbedoPBRFactor;\n  vec3 materialDiffusePBR = channelAlbedoPBR * (1.0 - channelMetalnessPBR);\n\n  #if defined(USE_PACKEDMAP)\n  float ao = combinedTexel.g;\n  #elif defined(USE_AOMAP)\n  float ao = textureIntensity(sTextureAOMap, vUv.xy);\n  #else\n  float ao = 1.0;\n  #endif\n\n  #ifdef USE_AOMAP2\n    ao *= textureIntensity(sTextureAOMap2, vUvDetail.xy);\n  #endif\n  float channelAOPBR = mix(1.0, ao, uAOPBRFactor);\n\n  float luminance = 1.0;\n  #ifdef USE_LIGHTMAP\n    #ifdef USE_NORMALMAP\n      luminance = luma(computeIBLDiffuseUE4(geoNormal, materialDiffusePBR, transform, uDiffuseSPH));\n      luminance = mix(luminance, 1.0, abs(dot(geoNormal, normal)));\n      if (uMode == -1) {\n        luminance = 1.0;\n      }\n\n      vec3 diffuse = materialDiffusePBR * luminance;\n    #else\n      vec3 diffuse = materialDiffusePBR;\n    #endif\n  #else\n  vec3 diffuse = materialDiffusePBR * computeIBLDiffuseUE4(geoNormal, materialDiffusePBR, transform, uDiffuseSPH);\n  #endif\n\n  diffuse *= channelAOPBR;\n\n  #ifdef USE_LIGHTMAP\n    vec3 lightmapTexel = textureRGB(sTextureLightMap, vUv2);\n    float lightmapM = textureIntensity(sTextureLightMapM, vUv2);\n    vec3 lightmap = DecodeLightmapRGBM(sRGBToLinear(vec4(lightmapTexel, lightmapM)), vec2(34.0, 2.2));\n\n    diffuse *= lightmap;\n  #endif\n\n  float materialSpecularf0 = mix(0.0, 0.08, uSpecularF0Factor);\n  vec3 materialSpecularPBR = mix(vec3(materialSpecularf0), channelAlbedoPBR, channelMetalnessPBR);\n  #ifdef CUBEMAP\n  vec3 specular = computeIBLSpecularUE4(geoNormal, eyeVector, materialRoughness, materialSpecularPBR, transform, sSpecularPBR, uTextureEnvironmentSpecularPBRLodRange, uTextureEnvironmentSpecularPBRTextureSize, normal);\n  #else\n  #ifdef PANORAMA\n  vec3 specular = computeIBLSpecularUE4(geoNormal, eyeVector, materialRoughness, materialSpecularPBR, transform, sPanoramaPBR, uTextureEnvironmentSpecularPBRLodRange, uTextureEnvironmentSpecularPBRTextureSize, normal);\n  #endif\n  #endif\n\n  #if defined(OCCLUDE_SPECULAR) && defined(USE_LIGHTMAP)\n    float factor = 3.;\n    specular = mix(specular * 0.0, specular, clamp(min(lightmap, vec3(channelAOPBR)) * (factor * channelGlossinessPBR), 0.0, 1.0));\n  #endif\n\n  #ifdef USE_EMISSIVEMAP\n  vec3 emissive = textureRGB(sTextureEmissiveMap, vUv.xy);\n  #endif\n\n  vec3 color = diffuse + specular;\n\n  color *= uEnvironmentExposure;\n\n  #ifdef USE_DIR_LIGHT\n  vec4 prepSpec = LightingFuncPrep(geoNormal, eyeVector, materialRoughness);\n  vec3 lightEyeDir = viewLightDir;\n  float lightIntensity = 0.4;\n  vec3 lightDiffuse = lightColor * lightIntensity;\n  vec3 lightSpecular = computeSunLightPBRShading(geoNormal, eyeVector, materialDiffusePBR, prepSpec, materialSpecularPBR, lightDiffuse, lightEyeDir);\n\n  float lmf = 1.0;\n\n    #ifdef USE_LIGHTMAP\n      lmf = clamp(pow(abs(luma(lightmap)), 4.0), 0.0, 1.0);\n      lightSpecular = mix(vec3(0.0), lightSpecular, lmf);\n    #endif\n\n  if (highlights == 1) {\n    color += lightSpecular;\n  }\n  #endif\n\n  float channelOpacity = mix(albedoMap.a * uOpacityFactor, 1.0, luma(specular) * 2.0);\n\n  #ifdef USE_EMISSIVEMAP\n    color += sRGBToLinear(emissive);\n  #endif\n\n  if (uMode <= 0) {\n    gl_FragColor = vec4(linearTosRGB(color), channelOpacity);\n  } else if (uMode == 1) {\n    gl_FragColor = vec4(linearTosRGB(geoNormal), 1.0);\n  } else if (uMode == 2) {\n    #ifdef USE_LIGHTMAP\n    gl_FragColor = vec4(linearTosRGB(lightmap), 1.0);\n    #else\n    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);\n    #endif\n  } else if (uMode == 3) {\n    gl_FragColor = vec4(linearTosRGB(vec3(channelAOPBR)), 1.0);\n  } else if (uMode == 4) {\n    gl_FragColor = vec4(linearTosRGB(vec3(channelMetalnessPBR)), 1.0);\n  } else if (uMode == 5) {\n    gl_FragColor = vec4(linearTosRGB(vec3(channelGlossinessPBR)), 1.0);\n  } else if (uMode == 6) {\n    gl_FragColor = vec4(linearTosRGB(channelAlbedoPBR), 1.0);\n  } else if (uMode == 7) {\n    gl_FragColor = vec4(linearTosRGB(vec3(luminance)), 1.0);\n  }\n\n  #ifdef ALPHATEST\n    if (gl_FragColor.a < uAlphaTest) {\n      discard;\n    } else {\n      gl_FragColor.a = 1.0;\n    }\n  #endif\n}"
}, function (t, e) {
    t.exports = "varying vec3 vWorldPosition;\n\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\n\nvoid main() {\n  vWorldPosition = transformDirection( position, modelMatrix );\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}"
}, function (t, e) {
    t.exports = "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\n\nvoid main() {\n  vec3 dir = vWorldPosition;\n  dir.z *= -1.0;\n\n  vec4 texel = textureCube(tCube, dir);\n\n  gl_FragColor = vec4(texel.rgb, 1.0);\n}"
}, function (t, e, n) {
    function r(t, e) {
        var n = [];
        return t.traverse(function (t) {
            t.name === e && n.push(t)
        }), n
    }

    function i(t) {
        return _.contains(_.map(x, function (t) {
            return t.name
        }), t.name)
    }

    function o(t, e, n, r) {
        return {x: (t.pageX - e.x) / n * 2 - 1, y: 1 - (t.pageY - e.y) / r * 2}
    }

    var a = n(39), s = n(1), c = n(0), u = n(42), l = (n(12), n(43)), h = n(4), f = n(44), p = n(48), d = n(52),
        m = n(60), v = n(63), g = n(64), y = n(65), b = n(66), E = n(69), w = n(72), x = n(75), T = function (t) {
            a.call(this, t), this.mode = t.vr ? T.VR_MODE : T.DEFAULT_MODE, this.vrDisplay = t.vrDisplay
        };
    T.inherit(a, {
        init: function () {
            this.mode === T.VR_MODE && this.initWebVR(this.vrDisplay), this.$container = $(document.body), this.updateContainerInfo(), $(window).on("resize", function () {
                this.updateContainerInfo(), this.mode === T.DEFAULT_MODE && this.hud.resize()
            }.bind(this)), this.startScene = this.scenes[0], this.exteriorScene = this.scenes[1], this.interiorScene = this.scenes[2], this.enteredRoom = !1, this.renderer.autoClear = !1, this.scene.updateMatrixWorld(!0), this.initMaterialManager(), this.initCamera(), this.initUI(), this.initObjectPickers(), this.initObjectsRenderOrder(), this.initMaterialsExposure(), this.initPool(), this.initSeaHighlights(), this.initFlares(), this.initDirLight(), this.initHoverScene(), this.initCameraScene(), Config.DEBUG_KEYS && this.initDebugKeyEvents(), this.mode === T.VR_MODE ? (this.initInstructions(), this.initInputManager(), this.handleVREvents(), this.initCrosshair(), this.initTransitionScene()) : this.mode === T.DEFAULT_MODE && this.handleNonVREvents(), this.config.fps && this.initFPSCounter(), this.config.logCalls && this.initDrawCallsCounter(), this.handleHudEvents(), this.handleCameraEvents(), $(window).trigger("resize"), _.defer(this.preRenderHUD.bind(this))
        }, initInstructions: function () {
            this.startInstructions = this.startScene.getObjectByName("instructions"), this.startInstructions && (this.startInstructions.position.z = -.75, this.camera.add(this.startInstructions))
        }, updateInstructions: function (t) {
            var e = .25 + .75 * Math.abs(Math.sin(3 * t.elapsed));
            this.startInstructionsCTA || (this.startInstructionsCTA = this.startInstructions.getObjectByName("cta")), this.startInstructionsCTA.material.opacity = e
        }, initDirLight: function () {
            this.dirLight = this.interiorScene.getObjectByName("Directional Light"), _.each([this.interiorScene, this.exteriorScene], function (t) {
                _.each(t.materials, function (t) {
                    t.pbr && !t.ignoreDirLight && (t.defines.USE_DIR_LIGHT = !0, t.uniforms.lightColor.value.setRGB(1, 1, 1), t.needsUpdate = !0)
                })
            })
        }, initHoverScene: function () {
            this.hoverScene = new THREE.Scene
        }, initCameraScene: function () {
            this.cameraScene = new THREE.Scene, this.cameraScene.add(this.camera)
        }, initDebugKeyEvents: function () {
            var t = function (t) {
                _.each(this.scenes, function (e) {
                    _.each(e.materials, function (e) {
                        e.pbr && t(e.uniforms.uMode)
                    })
                }), _.each(this.hud.palettes, function (e) {
                    e.children.forEach(function (e) {
                        t(e.material.uniforms.uMode)
                    }, this)
                }, this)
            }.bind(this);
            $(document).on("keypress", function (e) {
                99 == e.keyCode ? t(function (t) {
                    6 == t.value ? t.value = 1 : t.value++
                }) : 109 == e.keyCode ? t(function (t) {
                    t.value = 0
                }) : 116 == e.keyCode ? (this.ratio ? (this.ratio += 1, this.ratio > 2 && (this.ratio = 1)) : this.ratio = 1, this.renderer.setPixelRatio(this.ratio)) : 110 == e.keyCode ? t(function (t) {
                    t.value >= 0 ? t.value = -1 : t.value = 0
                }) : 104 == e.keyCode ? _.each([this.interiorScene, this.exteriorScene], function (t) {
                    _.each(t.materials, function (t) {
                        t.pbr && (0 == t.uniforms.highlights.value ? t.uniforms.highlights.value = 1 : t.uniforms.highlights.value = 0)
                    })
                }) : 80 === e.keyCode ? this.captureFrame(5e3, 2e3) : 115 === e.keyCode && ($(this.counter).toggle(), $(this.dcCounter).toggle())
            }.bind(this))
        }, initFPSCounter: function () {
            var t = $(this.counter);
            t.css("left", "20px"), t.css("padding", "3px"), t.css("font-size", "2em"), t.css("background-color", "black")
        }, initDrawCallsCounter: function () {
            var t = $("<div id='dc'></div>");
            $("body").append(t), t.css("position", "absolute").css("display", "block !important").css("color", "yellow").css("top", "60px").css("left", "20px").css("padding", "3px").css("font-size", "2em").css("background-color", "black").css("z-index", "999999"), this.dcCounter = t[0]
        }, initInputManager: function () {
            this.inputManager = new v
        }, start: function () {
            this.camera.enableControls(), this.mode !== T.DEFAULT_MODE || window.isMobile ? this.mode === T.DEFAULT_MODE && window.isMobile && this.ui.showMoveInstructions() : this.ui.showLookInstructions(), a.prototype.start.call(this)
        }, enterVR: function () {
            this.camera.vrControls.hasInput() && this.effect.requestPresent()
        }, handleVREvents: function () {
            this.inputManager.on("press", function () {
                this.enteredRoom ? this.hud.visible && this.hudPicker.hitTest() ? this.hudPicker.onTap() : this.scenePicker.hitTest() && this.scenePicker.onTap() : this.fadeOut(750).onComplete(function () {
                    this.camera.moveTo(0, 0), this.enteredRoom = !0, this.fadeIn(2e3), this.camera.remove(this.startInstructions)
                }.bind(this))
            }.bind(this))
        }, handleNonVREvents: function () {
            var t = null;
            return function () {
                window.isMobile || $("canvas").on("mousemove", function (t) {
                    var e = o(t, this.containerOffset, this.containerWidth, this.containerHeight);
                    this.scenePicker.updateMouseCoords(e), this.hudPicker.updateMouseCoords(e)
                }.bind(this)), $("canvas").on("tap", function (e) {
                    if (window.isMobile) {
                        var n = o(e, this.containerOffset, this.containerWidth, this.containerHeight);
                        this.scenePicker.updateMouseCoords(n), this.hudPicker.updateMouseCoords(n)
                    }
                    var r = null, i = null;
                    this.camera.moving || this.camera.rotating || !this.camera.enabled || (r = this.hud.visible && this.hudPicker.hitTest(), i = this.scenePicker.hitTest()), window.isMobile && !r && i && "floor" === i.name && (this.ui.updateMarker(this.scenePicker.getPoint()), this.ui.showMarker(), t && clearTimeout(t), t = setTimeout(function () {
                        this.ui.hideMarker(), t = null
                    }.bind(this), 2e3)), r ? this.hudPicker.onTap() : i && this.scenePicker.onTap()
                }.bind(this))
            }
        }(), handleHudEvents: function () {
            this.hud.on("selectMaterial", function (t) {
                this.materialManager.setObjectMaterial(this.currentSelected, t), this.hud.setCurrent(t), this.materialInstructionsVisible && (this.ui.hideMaterialInstructions(), this.materialInstructionsVisible = !1)
            }, this)
        }, handleCameraEvents: function () {
            this.camera.on("startMove", function () {
                this.ui.freezeMarker()
            }, this), this.camera.on("endMove", function () {
                this.ui.unfreezeMarker()
            }, this), this.camera.on("firstMove", function () {
                this.ui.hideMoveInstructions()
            }, this), this.camera.on("firstRotate", function () {
                this.ui.hideLookInstructions()
            }, this)
        }, updateContainerInfo: function () {
            this.containerOffset = {
                x: this.$container.offset().left,
                y: this.$container.offset().top
            }, this.containerWidth = this.$container.width(), this.containerHeight = this.$container.height()
        }, initMaterialManager: function () {
            this.materialManager = new y({scenes: this.scenes, configurables: x})
        }, initCamera: function () {
            var t = this.camera = new d({
                vr: this.mode === T.VR_MODE,
                states: this.scene.getObjectByName("cameras").children,
                $container: this.$container
            });
            this.scene.add(t), t.enabled = !0, this.mode === T.VR_MODE && this.camera.vrControls.setVRDisplay(this.vrDisplay)
        }, initTransitionScene: function () {
            var t = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new w);
            t.material.uniforms.diffuse.value = new THREE.Color(0), t.material.uniforms.opacity.value = 0, t.material.transparent = !0, t.frustumCulled = !1;
            var e = new THREE.Scene;
            e.add(t), this.transitionQuad = t, this.transitionScene = e
        }, fadeOut: function (t) {
            return h.tween(t || 500).onUpdate(function (t) {
                this.transitionQuad.material.opacity = t
            }.bind(this))
        }, fadeIn: function (t) {
            return h.tween(t || 500).onUpdate(function (t) {
                this.transitionQuad.material.opacity = 1 - t
            }.bind(this))
        }, initObjectPickers: function () {
            var t = ["floor", "walls", "armchairs", "colliders"], e = [];
            x.forEach(function (e) {
                t.push(e.name)
            }), _.each(t, function (t) {
                var n = r(this.scene, t);
                _.each(n, function (t) {
                    t.traverse(function (t) {
                        e.push(t)
                    }.bind(this))
                }, this)
            }, this), _.each(this.scene.getObjectByName("colliders").children, function (t) {
                t.visible = !0, t.material.visible = !1
            }), this.scenePicker = new g({
                camera: this.camera,
                checkFlag: !0,
                vr: this.mode === T.VR_MODE
            }), this.scenePicker.add(e), this.hudPicker = new g({
                camera: this.hud.camera,
                checkFlag: !0,
                vr: this.mode === T.VR_MODE
            }), this.mode === T.VR_MODE && (this.hudPicker.camera = this.camera), this.hudPicker.add(this.hud.getPickables()), this.handlePickerEvents()
        }, handlePickerEvents: function () {
            this.scenePicker.on("pick", function (t, e) {
                var n;
                "floor" === t.name ? (this.VREnabled && !this.warping ? (this.warping = !0, this.fadeOut(200).onComplete(function () {
                    this.camera.moveTo(e.x, e.z, 1e3), this.fadeIn(200).onComplete(function () {
                        this.warping = !1
                    }.bind(this))
                }.bind(this)), this.ui.hideMoveInstructions()) : this.VREnabled || this.camera.moveTo(e.x, e.z, 1e3), this.$container.removeClass("hovering"), this.ui.activateMarker(), this.currentSelected && this.deselectObject(this.currentSelected)) : i(t) ? n = t : i(t.parent) && (n = t.parent), n && n !== this.currentSelected && this.selectObject(n)
            }, this), this.scenePicker.on("enter", function (t) {
                this.VREnabled && !this.enteredRoom || ("floor" !== t.name || window.isMobile || this.ui.showMarker(), i(t) && t !== this.currentSelected ? this.highlightObject(t) : i(t.parent) && t.parent !== this.currentSelected && this.highlightObject(t.parent))
            }, this), this.scenePicker.on("leave", function (t) {
                this.VREnabled && !this.enteredRoom || ("floor" !== t.name || window.isMobile || this.ui.hideMarker(), i(t) && t !== this.currentSelected ? this.clearHighlight(t) : i(t.parent) && t.parent !== this.currentSelected && this.clearHighlight(t.parent))
            }, this), this.hudPicker.on("pick", function (t) {
                this.hud.select(t)
            }, this), this.hudPicker.on("enter", function (t) {
                window.isMobile || (this.hud.enter(t), this.ui.onEnterObject(), this.ui.hideMarker())
            }, this), this.hudPicker.on("leave", function (t) {
                window.isMobile || (this.hud.leave(t), this.ui.onLeaveObject())
            }, this)
        }, initUI: function () {
            this.ui = new f({
                container: this.$container,
                scene: this.scene,
                camera: this.camera,
                configurables: x,
                vr: this.mode === T.VR_MODE
            }), this.hud = new p({scene: this.scene, configurables: x, vr: this.mode === T.VR_MODE})
        }, initWebVR: function (t) {
            this.effect = new l(this.renderer), this.effect.autoSubmitFrame = !1, this.VREnabled = !1, this.effect.setVRDisplay(t)
        }, selectObject: function (t) {
            var e = t.name, n = function (t) {
                return _.find(x, function (e) {
                    return e.name === t
                })
            };
            window.isMobile && this.isSelecting || (this.isSelecting = !0, setTimeout(function () {
                this.isSelecting = !1
            }.bind(this), 1500), this.clearHighlight(t), this.currentSelected = t, this.hud.show(), this.hud.setPanel(e), window.isMobile ? this.selectObjectMobile(e) : this.VREnabled ? this.selectObjectVR(e) : (this.camera.setOrbitDistances(0, 1 / 0), this.camera.setState(e).onComplete(function () {
                this.hud.setPalette(e), this.camera.setOrbitDistances(n(e).minDistance, n(e).maxDistance), this.materialHelpDisplayed ? this.materialInstructionsVisible && (this.ui.hideMaterialInstructions(), this.materialInstructionsVisible = !1) : (this.materialHelpDisplayed = !0, this.ui.showMaterialInstructions(), this.materialInstructionsVisible = !0)
            }.bind(this))), this.mode !== T.VR_MODE && !window.isMobile && this.hud.currentPalette && this.hud.currentPalette.fadeOut())
        }, selectObjectMobile: function (t) {
            this.hud.setPalette(t, 1e3), setTimeout(function () {
                this.materialHelpDisplayed ? this.materialInstructionsVisible && (this.ui.hideMaterialInstructions(), this.materialInstructionsVisible = !1) : (this.materialHelpDisplayed = !0, this.ui.showMaterialInstructions(), this.materialInstructionsVisible = !0)
            }.bind(this), 1e3), this.ui.hideMoveInstructions()
        }, selectObjectVR: function (t) {
            var e = this.hud.palettes[t], n = e.children.length, r = -.2 * (n - 1) / 2;
            this.hud.maxScale = .07, this.hud.setPalette(t, 1e3), _.each(e.children, function (t, e) {
                t.position.set(.2 * e + r, 0, 0), t.scale.set(0, 0, 0), t.tweenValue.scale = this.hud.maxScale, t.rotation.set(0, 0, 0), this.scene.materials[t.material.uuid] = t.material
            }, this), e.position.set(0, -.25, -.6), e.rotation.set(0, 0, 0), e.scale.set(1, 1, 1), this.camera.add(e), this.camera.updateMatrixWorld(!0), e.getWorldPosition(e.position), e.getWorldQuaternion(e.quaternion), this.camera.remove(e);
            var i = e.quaternion, o = new THREE.Vector3(0, 1, 0), a = o.clone().applyQuaternion(i).normalize(),
                s = o.angleTo(a), c = new THREE.Vector3;
            c.crossVectors(a, o).normalize();
            var u = new THREE.Quaternion;
            u.setFromAxisAngle(c, s).normalize(), e.quaternion.multiplyQuaternions(u, i), this.hoverScene.add(e);
            var l = this.hud.panels[t];
            l.position.set(.25, -.1, -.55), l.rotation.set(0, 0, 0), l.scale.set(85e-5, 85e-5, 85e-5), this.camera.add(l), this.camera.updateMatrixWorld(!0), l.getWorldPosition(l.position), l.getWorldQuaternion(l.quaternion), this.camera.remove(l), this.hoverScene.add(l);
            var i = l.quaternion, h = o.clone().applyQuaternion(i).normalize(), s = o.angleTo(h), c = new THREE.Vector3;
            c.crossVectors(h, o).normalize();
            var u = new THREE.Quaternion;
            u.setFromAxisAngle(c, s).normalize(), l.quaternion.multiplyQuaternions(u, i), this.ui.hideConfigureInstructions()
        }, deselectObject: function (t) {
            this.hud.hide(), this.currentSelected = null, this.materialInstructionsVisible && (this.ui.hideMaterialInstructions(), this.materialInstructionsVisible = !1)
        }, highlightObject: function (t) {
            var e = t.group ? t.group : t;
            e.worldPosition || (e.worldPosition = new THREE.Vector3), e.previousPosition || (e.previousPosition = new THREE.Vector3), this.ui.highlightObject(t), e.getWorldPosition(e.worldPosition), e.previousPosition.copy(e.position), e.previousParent = e.parent, this.hoverScene.add(e), e.position.copy(e.worldPosition)
        }, clearHighlight: function (t) {
            var e = t.group ? t.group : t;
            this.ui.clearHighlight(), e.previousParent.add(e), e.position.copy(e.previousPosition)
        }, initObjectsRenderOrder: function () {
            var t = this.interiorScene.getObjectByName("glassrail");
            t && (t.renderOrder = 50);
            var e = this.interiorScene.getObjectByName("glasses");
            e && (e.renderOrder = 100);
            var n = this.interiorScene.getObjectByName("sea");
            n && (n.renderOrder = 100);
            var r = this.interiorScene.getObjectByName("sky");
            r && (r.renderOrder = 95, r.visible = !0);
            var i = this.interiorScene.getObjectByName("clouds");
            i && i.traverse(function (t) {
                t.renderOrder = 98
            });
            var o = this.interiorScene.getObjectByName("sun");
            o && o.traverse(function (t) {
                t.renderOrder = 97
            });
            var a = this.interiorScene.getObjectByName("sun_and_clouds_merged");
            a && (a.renderOrder = 97);
            var s = this.interiorScene.getObjectByName("sea_highlight");
            s && (s.renderOrder = 101);
            var c = this.interiorScene.getObjectByName("islands");
            c && c.traverse(function (t) {
                t.renderOrder = 102
            });
            var u = this.interiorScene.getObjectByName("islands_merged");
            u && (u.renderOrder = 102);
            var l = this.interiorScene.getObjectByName("sea_highlights2");
            l && (l.renderOrder = 103)
        }, initCrosshair: function () {
            this.crosshair = new u, this.crosshair.fadeOut(), this.camera.add(this.crosshair)
        }, initMaterialsExposure: function () {
            this.scene.getObjectByName("feet").material.exposure = .3
        }, initFlares: function () {
            this.flares = [];
            var t = this.interiorScene.getObjectByName("spots"), e = c.getTexture("textures/flare.png");
            t && t.children.forEach(function (t) {
                var n = new THREE.PointsMaterial({
                    size: 1.5,
                    map: e,
                    transparent: !0,
                    depthWrite: !1,
                    depthTest: !1,
                    blending: THREE.AdditiveBlending,
                    opacity: .35
                }), r = new THREE.Geometry;
                r.vertices.push(new THREE.Vector3);
                var i = new THREE.Points(r, n);
                t.getWorldPosition(i.position), this.flares.push(i), this.interiorScene.add(i)
            }, this)
        }, initPool: function () {
            this.water = new m({
                light: this.scene.getObjectByName("ocean light"),
                camera: this.camera,
                renderer: this.renderer,
                object: this.exteriorScene.getObjectByName("pool_water"),
                transparent: !0,
                opacity: .6
            }), this.exteriorScene.getObjectByName("pool_water").visible = !1, this.exteriorScene.add(this.water)
        }, initSeaHighlights: function () {
            var t = this.interiorScene.getObjectByName("sea_highlights2"), e = t.material, n = e.map;
            this.noise = new E, t.material = new b, t.material.map = n, t.material.uniforms.offsetRepeat.value.set(n.offset.x, n.offset.y, n.repeat.x, n.repeat.y), t.material.transparent = e.transparent, t.material.noiseMap = this.noise.target.texture, this.seaHighlights = t
        }, updateSeaHighlights: function (t) {
            this.seaHighlights.material.updateUniforms(t)
        }, updateDirLight: function () {
            var t = new THREE.Vector3, e = new THREE.Vector3;
            return function () {
                e.setFromMatrixPosition(this.dirLight.matrixWorld), t.setFromMatrixPosition(this.dirLight.target.matrixWorld), e.sub(t), e.transformDirection(this.camera.matrixWorldInverse), _.each([this.interiorScene, this.exteriorScene], function (t) {
                    _.each(t.materials, function (t) {
                        t.pbr && t.uniforms.viewLightDir.value.copy(e)
                    })
                })
            }
        }(), updateCrosshair: function () {
            var t = new THREE.Vector3, e = new THREE.Vector3, n = new THREE.Vector2, r = new THREE.Vector2;
            return function () {
                if (this.VREnabled) {
                    var i = this.hud.currentPalette;
                    if (this.camera.updateMatrixWorld(!0), this.crosshair.getWorldPosition(e), e.project(this.camera), n.set(e.x, e.y), i) {
                        var o = 1 / 0;
                        i.children.forEach(function (e) {
                            e.getWorldPosition(t), t.project(this.camera), r.set(t.x, t.y);
                            var i = n.distanceTo(r);
                            i < o && (o = i)
                        }, this), o > .5 ? (this.crosshair.fadeOut(), this.ui.fadeInMarker()) : (this.crosshair.fadeIn(), this.ui.fadeOutMarker())
                    }
                }
            }
        }(), updateUI: function () {
            if (window.isMobile) return void this.scenePicker.hitTest(!0);
            this.camera.moving || this.camera.rotating || !this.camera.enabled || (this.hud.visible ? this.hudPicker.hitTest() ? (this.scenePicker.clearState(), this.ui.onEnterObject(), this.camera.vr || (this.camera.orbitControls.enabled = !1)) : (this.scenePicker.hitTest(), this.camera.mode === d.ORBIT_MODE && (this.camera.orbitControls.enabled = !0)) : this.scenePicker.hitTest()), this.camera.rotating && (this.scenePicker.clearState(), this.hudPicker.clearState(), this.ui.currentHighlighted && this.clearHighlight(this.ui.currentHighlighted)), this.ui.update(this.scenePicker.getPoint())
        }, updateFlares: function () {
            var t = new THREE.Raycaster, e = new THREE.Vector3, n = new THREE.Vector3,
                r = ["walls", "sofa_main", "laptop", "suspended_lamp", "table_objects_merged", "bottle", "seat_main_left"],
                i = [];
            return function () {
                0 === i.length && r.forEach(function (t) {
                    var e = this.interiorScene.getObjectByName(t);
                    e && i.push(e)
                }, this), this.camera.getWorldPosition(n), this.flares.forEach(function (r, o) {
                    e.subVectors(r.position, n).normalize(), t.set(n, e), t.intersectObjects(i).length > 1 ? r.visible = !1 : r.visible = !0
                }, this)
            }
        }(), update: function (t) {
            this.VREnabled || this.mode !== T.VR_MODE || (this.effect.requestPresent(), this.VREnabled = !0), this.camera.enabled && this.camera.update(), this.startInstructions && !this.enteredRoom && this.updateInstructions(t), this.flares && this.updateFlares(), this.updateUI(), this.hud.update(t), this.water.update(t), this.updateSeaHighlights(t), this.updateDirLight(), this.updateCrosshair(), this.inputManager && this.inputManager.update(), a.prototype.update.call(this, t)
        }, preRenderHUD: function () {
            this.renderer.clear(), this.hud.visible = !0, this.hud.showAllPalettes(!1), this.hud.showAllPanels(), this.hud.render(this.renderer), this.hud.visible = !1, this.hud.hideAllPalettes(), this.hud.hideAllPanels()
        }, preRenderAll: function () {
            this.renderer.clear(), this.scene.traverse(function (t) {
                t.frustumCulled = !1, t.wasVisible = t.visible, t.visible = !0
            }), this.hud.visible = !0, this.hud.showAllPalettes(!1), this.hud.showAllPanels(), this.water.render(), this.renderScene(this.scene, this.camera), this.hud.render(this.renderer), this.hud.visible = !1, this.hud.hideAllPalettes(), this.hud.hideAllPanels(), this.scene.traverse(function (t) {
                t.frustumCulled = !0, t.visible = t.wasVisible, delete t.wasVisible
            })
        }, render: function () {
            var t = 0, e = function () {
                this.config.logCalls && (t += this.renderer.info.render.calls)
            }.bind(this);
            this.renderer.clear(), this.noise.render(this.renderer), this.mode === T.VR_MODE ? (this.enteredRoom ? (this.effect.render(this.exteriorScene, this.camera), this.effect.render(this.interiorScene, this.camera), this.hoverScene.children.length > 0 && this.effect.render(this.hoverScene, this.camera)) : this.effect.render(this.startScene, this.camera), this.effect.render(this.cameraScene, this.camera), this.effect.render(this.transitionScene, this.camera), this.effect.submitFrame()) : this.mode === T.DEFAULT_MODE && (this.renderScene(this.interiorScene, this.camera), e(), this.renderScene(this.exteriorScene, this.camera), e(), this.hoverScene.children.length > 0 && (this.renderScene(this.hoverScene, this.camera), e()), this.hud.render(this.renderer), e(), this.renderScene(this.cameraScene, this.camera), e(), this.config.logCalls && (this.dcCounter.textContent = t + " DC"))
        }, requestAnimationFrame: function (t) {
            this.effect ? this.effect.requestAnimationFrame(t) : requestAnimationFrame(t)
        }, captureFrame: function (t, e) {
            this.setSize(t, e), this.render();
            var n = document.querySelector("canvas");
            window.open(n.toDataURL())
        }
    }), T.mixin(s), T.DEFAULT_MODE = 0, T.VR_MODE = 1, t.exports = T
}, function (t, e, n) {
    function r(t) {
        var e = window.WIDTH = window.innerWidth, n = window.HEIGHT = window.innerHeight;
        this.setSize(e, n)
    }

    function i(t) {
        var e, n;
        void 0 !== document.hidden ? (e = "hidden", n = "visibilitychange") : void 0 !== document.mozHidden ? (e = "mozHidden", n = "mozvisibilitychange") : void 0 !== document.msHidden ? (e = "msHidden", n = "msvisibilitychange") : void 0 !== document.webkitHidden && (e = "webkitHidden", n = "webkitvisibilitychange"), void 0 !== document.addEventListener && document.addEventListener(n, function () {
            document[e] ? t.onLeaveTab() : setTimeout(t.onFocusTab.bind(t), 50)
        }, !1)
    }

    function o(t) {
    }

    var a = n(1), s = n(11), c = n(41), u = function (t) {
        if (t = void 0 !== t ? t : {}, this.renderer = new THREE.WebGLRenderer({
            alpha: !0,
            antialias: !0,
            canvas: t.canvas || document.querySelector("canvas"),
            preserveDrawingBuffer: void 0 !== t.preserveDrawingBuffer ? t.preserveDrawingBuffer : void 0
        }), THREE.Extensions = this.renderer.extensions, this.config = {
            fps: void 0 !== t.fps && t.fps,
            profiling: void 0 !== t.profiling && t.profiling,
            logDrawCalls: void 0 !== t.logDrawCalls && t.logDrawCalls
        }, t && t.maxPixelRatio) var e = window.devicePixelRatio > t.maxPixelRatio ? t.maxPixelRatio : window.devicePixelRatio; else var e = window.devicePixelRatio;
        window.isMobile && (e = e > 1.5 ? 1.5 : e), this.renderer.setPixelRatio(e), this.setSize(t.width || window.innerWidth, t.height || window.innerHeight), void 0 !== t.autoClear && (this.renderer.autoClear = t.autoClear), void 0 !== t.clearColor && this.renderer.setClearColor(t.clearColor), void 0 !== t.supportsTextureLod && !0 !== t.supportsTextureLod || THREE.Extensions.get("EXT_shader_texture_lod"), this.clock = new THREE.Clock, this.paused = !1, this.scenes = [], this.scene = null, this._drawCalls = 0, window.onresize = r.bind(this), window.addEventListener("keyup", o.bind(this)), this.renderer.domElement.addEventListener("mousemove", function (t) {
            window.mouseX = t.pageX / WIDTH * 2 - 1, window.mouseY = 1 - t.pageY / HEIGHT * 2
        }), this.config.fps && (this.fpsCounter = new c, this.counter = document.createElement("div"), document.querySelectorAll("body")[0].appendChild(this.counter), this.counter.setAttribute("style", "position:absolute;top:20px;left:200px;color:#ff00ff;display:block !important;z-index:999999;")), i(this)
    };
    u.prototype = {
        render: function (t) {
            this.scene && this.camera && this.renderScene(this.scene, this.camera)
        }, renderScene: function (t, e) {
            this.renderer.render(t, e), this.config.logDrawCalls && (this._drawCalls += this.renderer.info.render.calls)
        }, update: function (t) {
            this.camera && (this.camera.updateMatrixWorld(!0), this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld)), _.each(this.scenes, function (e) {
                this.updateCustomMaterials(e), e.update && (e.updateMatrixWorld(!0), e.update(this.renderer, t))
            }, this)
        }, updateCustomMaterials: function (t, e) {
            _.each(t.materials, function (t) {
                t.pbr && (e || this.camera) && t.refreshUniforms(e || this.camera)
            }, this)
        }, doUpdate: function () {
            var t = {delta: 0, elapsed: 0};
            return function () {
                if (t.delta = this.clock.getDelta(), t.elapsed = this.clock.getElapsedTime(), !this.paused) {
                    this.requestAnimationFrame(this.doUpdate.bind(this));
                    var e = void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now();
                    TWEEN.update(e), s.updateTimers(t), this.config.logDrawCalls && (this._drawCalls = 0), this.config.profiling && console.time("update"), this.update(t), this.config.profiling && console.timeEnd("update"), this.render(t), this.started || (this.started = !0), this.config.fps && this.fpsCounter.update(t, function (t) {
                        this.counter.textContent = t + " FPS"
                    }.bind(this)), this.config.logDrawCalls && this.logDrawCalls(this._drawCalls)
                }
            }
        }(), start: function () {
            this.doUpdate()
        }, pause: function () {
            this.paused || (this.clock.stop(), this.paused = !0, this.config.fps && (this.counter.textContent += " (paused)"))
        }, resume: function () {
            this.paused && (this.clock.start(), this.paused = !1, this.started && this.doUpdate())
        }, onLeaveTab: function () {
            this.paused || (this.pause(), this.shouldResume = !0)
        }, onFocusTab: function () {
            this.shouldResume && (this.resume(), this.shouldResume = !1)
        }, setAspectRatio: function (t) {
            this.camera && (this.camera.aspect = t, this.camera.updateProjectionMatrix())
        }, setSize: function (t, e) {
            this.started && this.setAspectRatio(t / e), this.renderer.setSize(t, e)
        }, requestAnimationFrame: function (t) {
            requestAnimationFrame(t)
        }, logDrawCalls: function (t) {
            console.log("Draw calls:", t)
        }
    }, u.mixin(a), t.exports = u
}, function (t, e) {
    var n = function (t) {
        t = _.extend({}, {
            duration: 1e3, repeat: !1, onStart: function () {
            }, onEnd: function () {
            }
        }, t), this.duration = t.duration, this.repeat = t.repeat, this.startCallback = t.onStart, this.endCallback = t.onEnd, this.reset()
    };
    n.inherit(Object, {
        reset: function () {
            return this.started = !1, this.paused = !1, this.ended = !1, this.elapsedTime = 0, this
        }, start: function () {
            return this.started || this.ended ? this : (this.started = !0, this.startCallback(), this)
        }, stop: function () {
            return this.started ? this.reset() : this
        }, pause: function () {
            return this.paused = !0, this
        }, resume: function () {
            return this.paused = !1, this
        }, update: function (t) {
            return !this.started || this.paused || this.ended ? this : (this.elapsedTime += 1e3 * t.delta, this.elapsedTime > this.duration && (this.endCallback(), this.ended = !0), this)
        }
    }), t.exports = n
}, function (t, e) {
    var n = function () {
        this.frames = 0, this.fps = 0, this.lastTime = 0
    };
    n.prototype = {
        update: function (t, e) {
            var t = 1e3 * t.elapsed;
            this.frames++, t > this.lastTime + 1e3 && (this.fps = Math.round(1e3 * this.frames / (t - this.lastTime)), e(this.fps), this.lastTime = t, this.frames = 0)
        }
    }, t.exports = n
}, function (t, e) {
    var n = function () {
        THREE.Mesh.call(this, new THREE.SphereGeometry(.005, 25, 25), new THREE.MeshBasicMaterial({
            color: 16777215,
            opacity: 1,
            transparent: !0,
            depthTest: !1
        })), this.position.z = -.5, this.tween = new TWEEN.Tween, this.values = {opacity: 1, scale: 1}
    };
    n.inherit(THREE.Mesh, {
        fadeIn: function () {
            if (this.faded) {
                var t = this.values;
                this.tween.reset(t).to({
                    opacity: 1,
                    scale: 1
                }, 750).easing(TWEEN.Easing.Cubic.InOut).onUpdate(function () {
                    this.material.opacity = t.opacity, this.scale.set(t.scale, t.scale, t.scale)
                }.bind(this)).start(), this.faded = !1
            }
        }, fadeOut: function () {
            if (!this.faded) {
                var t = this.values;
                this.tween.reset(t).to({
                    opacity: 0,
                    scale: .7
                }, 400).easing(TWEEN.Easing.Cubic.InOut).onUpdate(function () {
                    this.material.opacity = t.opacity, this.scale.set(t.scale, t.scale, t.scale)
                }.bind(this)).start(), this.faded = !0
            }
        }
    }), t.exports = n
}, function (t, e) {
    var n = function (t, e) {
        function n(t) {
            u = t, t.length > 0 ? c = t[0] : e && e("HMD not available")
        }

        function r() {
            var e = y.isPresenting;
            if (y.isPresenting = void 0 !== c && c.isPresenting, y.isPresenting) {
                var n = c.getEyeParameters("left"), r = n.renderWidth, i = n.renderHeight;
                e || (E = t.getPixelRatio(), _ = t.getSize(), t.setPixelRatio(1), t.setSize(2 * r, i, !1))
            } else e && (t.setPixelRatio(E), t.setSize(_.width, _.height, b))
        }

        function i(t) {
            t.pose.orientation ? (P.fromArray(t.pose.orientation), d.makeRotationFromQuaternion(P)) : d.identity(), t.pose.position && (C.fromArray(t.pose.position), d.setPosition(C)), m.fromArray(t.leftViewMatrix), m.multiply(d), v.fromArray(t.rightViewMatrix), v.multiply(d), m.getInverse(m), v.getInverse(v)
        }

        function o(t) {
            var e = 2 / (t.leftTan + t.rightTan), n = (t.leftTan - t.rightTan) * e * .5, r = 2 / (t.upTan + t.downTan);
            return {scale: [e, r], offset: [n, (t.upTan - t.downTan) * r * .5]}
        }

        function a(t, e, n, r) {
            e = void 0 === e || e, n = void 0 === n ? .01 : n, r = void 0 === r ? 1e4 : r;
            var i = e ? -1 : 1, a = new THREE.Matrix4, s = a.elements, c = o(t);
            return s[0] = c.scale[0], s[1] = 0, s[2] = c.offset[0] * i, s[3] = 0, s[4] = 0, s[5] = c.scale[1], s[6] = -c.offset[1] * i, s[7] = 0, s[8] = 0, s[9] = 0, s[10] = r / (n - r) * -i, s[11] = r * n / (n - r), s[12] = 0, s[13] = 0, s[14] = i, s[15] = 0, a.transpose(), a
        }

        function s(t, e, n, r) {
            var i = Math.PI / 180;
            return a({
                upTan: Math.tan(t.upDegrees * i),
                downTan: Math.tan(t.downDegrees * i),
                leftTan: Math.tan(t.leftDegrees * i),
                rightTan: Math.tan(t.rightDegrees * i)
            }, e, n, r)
        }

        var c, u, l, h, f = new THREE.Vector3, p = new THREE.Vector3, d = new THREE.Matrix4, m = new THREE.Matrix4,
            v = new THREE.Matrix4, g = null;
        "VRFrameData" in window && (g = new window.VRFrameData), navigator.getVRDisplays && navigator.getVRDisplays().then(n).catch(function () {
            console.warn("THREE.VREffect: Unable to get VR Displays")
        }), this.isPresenting = !1;
        var y = this, _ = t.getSize(), b = !1, E = t.getPixelRatio();
        this.getVRDisplay = function () {
            return c
        }, this.setVRDisplay = function (t) {
            c = t
        }, this.getVRDisplays = function () {
            return console.warn("THREE.VREffect: getVRDisplays() is being deprecated."), u
        }, this.setSize = function (e, n, r) {
            if (_ = {width: e, height: n}, b = r, y.isPresenting) {
                var i = c.getEyeParameters("left");
                t.setPixelRatio(1), t.setSize(2 * i.renderWidth, i.renderHeight, !1)
            } else t.setPixelRatio(E), t.setSize(e, n, r)
        };
        var w = t.domElement, x = [0, 0, .5, 1], T = [.5, 0, .5, 1];
        window.addEventListener("vrdisplaypresentchange", r, !1), this.setFullScreen = function (t) {
            return new Promise(function (e, n) {
                return void 0 === c ? void n(new Error("No VR hardware found.")) : y.isPresenting === t ? void e() : void e(t ? c.requestPresent([{source: w}]) : c.exitPresent())
            })
        }, this.requestPresent = function () {
            return this.setFullScreen(!0)
        }, this.exitPresent = function () {
            return this.setFullScreen(!1)
        }, this.requestAnimationFrame = function (t) {
            return void 0 !== c ? c.requestAnimationFrame(t) : window.requestAnimationFrame(t)
        }, this.cancelAnimationFrame = function (t) {
            void 0 !== c ? c.cancelAnimationFrame(t) : window.cancelAnimationFrame(t)
        }, this.submitFrame = function () {
            void 0 !== c && y.isPresenting && c.submitFrame()
        }, this.autoSubmitFrame = !0;
        var R = new THREE.PerspectiveCamera;
        R.layers.enable(1);
        var M = new THREE.PerspectiveCamera;
        M.layers.enable(2), this.render = function (e, n, r, o) {
            if (c && y.isPresenting) {
                var a = e.autoUpdate;
                a && (e.updateMatrixWorld(), e.autoUpdate = !1), Array.isArray(e) && (console.warn("THREE.VREffect.render() no longer supports arrays. Use object.layers instead."), e = e[0]);
                var u, d, _ = t.getSize(), b = c.getLayers();
                if (b.length) {
                    var E = b[0];
                    u = null !== E.leftBounds && 4 === E.leftBounds.length ? E.leftBounds : x, d = null !== E.rightBounds && 4 === E.rightBounds.length ? E.rightBounds : T
                } else u = x, d = T;
                if (l = {
                    x: Math.round(_.width * u[0]),
                    y: Math.round(_.height * u[1]),
                    width: Math.round(_.width * u[2]),
                    height: Math.round(_.height * u[3])
                }, h = {
                    x: Math.round(_.width * d[0]),
                    y: Math.round(_.height * d[1]),
                    width: Math.round(_.width * d[2]),
                    height: Math.round(_.height * d[3])
                }, r ? (t.setRenderTarget(r), r.scissorTest = !0) : (t.setRenderTarget(null), t.setScissorTest(!0)), (t.autoClear || o) && t.clear(), null === n.parent && n.updateMatrixWorld(), n.matrixWorld.decompose(R.position, R.quaternion, R.scale), M.position.copy(R.position), M.quaternion.copy(R.quaternion), M.scale.copy(R.scale), c.getFrameData) c.depthNear = n.near, c.depthFar = n.far, c.getFrameData(g), R.projectionMatrix.elements = g.leftProjectionMatrix, M.projectionMatrix.elements = g.rightProjectionMatrix, i(g), R.updateMatrix(), R.matrix.multiply(m), R.matrix.decompose(R.position, R.quaternion, R.scale), M.updateMatrix(), M.matrix.multiply(v), M.matrix.decompose(M.position, M.quaternion, M.scale); else {
                    var w = c.getEyeParameters("left"), P = c.getEyeParameters("right");
                    R.projectionMatrix = s(w.fieldOfView, !0, n.near, n.far), M.projectionMatrix = s(P.fieldOfView, !0, n.near, n.far), f.fromArray(w.offset), p.fromArray(P.offset), R.translateOnAxis(f, R.scale.x), M.translateOnAxis(p, M.scale.x)
                }
                return r ? (r.viewport.set(l.x, l.y, l.width, l.height), r.scissor.set(l.x, l.y, l.width, l.height)) : (t.setViewport(l.x, l.y, l.width, l.height), t.setScissor(l.x, l.y, l.width, l.height)), t.render(e, R, r, o), r ? (r.viewport.set(h.x, h.y, h.width, h.height), r.scissor.set(h.x, h.y, h.width, h.height)) : (t.setViewport(h.x, h.y, h.width, h.height), t.setScissor(h.x, h.y, h.width, h.height)), t.render(e, M, r, o), r ? (r.viewport.set(0, 0, _.width, _.height), r.scissor.set(0, 0, _.width, _.height), r.scissorTest = !1, t.setRenderTarget(null)) : (t.setViewport(0, 0, _.width, _.height), t.setScissorTest(!1)), a && (e.autoUpdate = !0), void (y.autoSubmitFrame && y.submitFrame())
            }
            t.render(e, n, r, o)
        }, this.dispose = function () {
            window.removeEventListener("vrdisplaypresentchange", r, !1)
        };
        var P = new THREE.Quaternion, C = new THREE.Vector3
    };
    t.exports = n
}, function (t, e, n) {
    var r = n(0), i = n(4), o = n(1), a = n(45), s = (window.innerWidth, window.innerHeight, function (t) {
        this.scene = t.scene, this.camera = t.camera, this.configurables = t.configurables, this.$container = t.container, this.vr = t.vr, this.$lookInstructions = $('[data-ref="look_instructions"]'), this.$materialInstructions = $('[data-ref="material_instructions"]'), this.$moveInstructions = $('[data-ref="move_instructions"]'), this.tweens = {marker: new TWEEN.Tween}, this.values = {markerOpacity: 1}, this.initStrokes(), this.initMarker(), this.vr && this.initVRInstructions()
    });
    s.prototype = {
        initVRInstructions: function () {
            this.VRMoveInstructions = this.scene.getObjectByName("move_instructions"), this.VRMoveInstructions && (this.VRMoveInstructions.position.z = -.75, this.VRMoveInstructions.position.y = -.25, this.camera.add(this.VRMoveInstructions)), this.VRConfigureInstructions = this.scene.getObjectByName("configure_instructions"), this.VRConfigureInstructions && (this.VRConfigureInstructions.position.z = -.75, this.VRConfigureInstructions.position.y = -.25, this.camera.add(this.VRConfigureInstructions))
        }, initStrokes: function () {
            this.configurables.forEach(function (t) {
                var e = t.name, n = this.scene.getObjectByName(e), r = this.scene.getObjectByName(n.name + "_stroke"),
                    i = this.scene.getObjectByName("hovergroup_" + e);
                if (void 0 === r) return void console.warn("Missing stroke mesh for " + e);
                r.renderOrder = 1, i ? (i.traverse(function (t) {
                    t.renderOrder = 2
                }), n.group = i) : n.traverse(function (t) {
                    t.renderOrder = 2
                }), n.add(r), r.position.set(0, 0, 0), r.rotation.set(0, 0, 0), r.scale.set(1, 1, 1), r.material = new a, r.material.objectScale = n.scale.x, n.stroke = r
            }, this)
        }, highlightObject: function (t) {
            t.stroke.visible = !0, this.currentHighlighted = t, this.onEnterObject(), this.vr && (this.VRConfigureInstructions && (this.VRConfigureInstructions.visible = !0), this.VRMoveInstructions && (this.VRMoveInstructions.visible = !1))
        }, clearHighlight: function () {
            this.currentHighlighted && (this.currentHighlighted.stroke.visible = !1, this.currentHighlighted = null), this.onLeaveObject(), this.vr && this.VRConfigureInstructions && (this.VRConfigureInstructions.visible = !1)
        }, onEnterObject: function () {
            this.$container.addClass("hovering")
        }, onLeaveObject: function () {
            this.$container.removeClass("hovering")
        }, initMarker: function () {
            this.marker = new THREE.Mesh(new THREE.PlaneGeometry(.4, .4, 1, 1), new THREE.MeshBasicMaterial({
                color: 16777215,
                map: r.getTexture("textures/marker.png"),
                transparent: !0,
                opacity: .5,
                depthWrite: !1
            })), this.marker.material.map.anisotropy = 16, this.scene.add(this.marker);
            var t = this.marker.clone();
            t.material = new THREE.MeshBasicMaterial({
                transparent: !0,
                map: r.getTexture("textures/circle.png"),
                depthWrite: !1,
                opacity: 0,
                blending: THREE.AdditiveBlending
            }), this.marker.add(t), this.marker.ripple = t, this.marker.rotation.x = -Math.PI / 2, this.marker.position.setY(.05), this.marker.visible = !0, this.hideMarker()
        }, freezeMarker: function () {
            this.marker.frozen = !0
        }, unfreezeMarker: function () {
            this.marker.frozen = !1
        }, updateMarker: function (t) {
            t && (this.marker.position.x = t.x, this.marker.position.z = t.z), this.marker.visible && !this.$container.hasClass("hovering") && this.$container.addClass("hovering")
        }, showMarker: function () {
            this.marker.visible = !0, this.$container.addClass("hovering"), this.vr && this.VRMoveInstructions && (this.VRMoveInstructions.visible = !0)
        }, hideMarker: function () {
            this.marker.visible = !1, this.$container.removeClass("hovering")
        }, fadeInMarker: function () {
            this.tweens.marker.reset(this.values).to({markerOpacity: 1}, 500).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
                this.marker.material.opacity = this.values.markerOpacity
            }.bind(this)).start()
        }, fadeOutMarker: function () {
            this.tweens.marker.reset(this.values).to({markerOpacity: 0}, 300).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
                this.marker.material.opacity = this.values.markerOpacity
            }.bind(this)).start()
        }, activateMarker: function () {
            i.tween(500, TWEEN.Easing.Quadratic.Out).onUpdate(function (t) {
                this.marker.material.opacity = .5 + .5 * (1 - t), this.marker.ripple.material.opacity = 1 - t, this.marker.ripple.scale.set(1 + t / 2, 1 + t / 2, 1 + t / 2)
            }.bind(this))
        }, showMaterialInstructions: function () {
            this.$materialInstructions.addClass("visible")
        }, hideMaterialInstructions: function () {
            this.$materialInstructions.addClass("fadeout"), setTimeout(function () {
                this.$materialInstructions.removeClass("fadeout visible"), this.$materialInstructions.hide()
            }.bind(this), 500)
        }, showLookInstructions: function () {
            this.$lookInstructions.addClass("visible")
        }, hideLookInstructions: function () {
            this.$lookInstructions.addClass("fadeout"), setTimeout(function () {
                this.$lookInstructions.removeClass("fadeout visible"), this.$lookInstructions.hide()
            }.bind(this), 500)
        }, hideConfigureInstructions: function () {
            this.vr && this.VRConfigureInstructions && (this.camera.remove(this.VRConfigureInstructions), this.VRConfigureInstructions = null)
        }, showMoveInstructions: function () {
            this.$moveInstructions.addClass("visible")
        }, hideMoveInstructions: function () {
            this.$moveInstructions.addClass("fadeout"), setTimeout(function () {
                this.$moveInstructions.removeClass("fadeout visible"), this.$moveInstructions.hide()
            }.bind(this), 500), this.vr && this.VRMoveInstructions && (this.camera.remove(this.VRMoveInstructions), this.VRMoveInstructions = null)
        }, update: function (t) {
            this.marker.frozen || this.updateMarker(t)
        }
    }, s.mixin(o), t.exports = s
}, function (t, e, n) {
    var r = n(2), i = function (t) {
        t = Object.assign({
            vertexShader: n(46),
            fragmentShader: n(47),
            uniforms: {
                diffuse: {type: "c", value: new THREE.Color(16777215)},
                opacity: {type: "f", value: 1},
                objectScale: {type: "f", value: 1}
            }
        }, t), r.call(this, t), Object.keys(this.uniforms).forEach(function (t) {
            this.onPropertyChange(t, function (e) {
                this.uniforms[t].value = e
            })
        }, this), this.depthWrite = !1
    };
    i.inherit(r, {
        clone: function (t) {
            var e = t || new i;
            return r.prototype.clone.call(this, e), e.name = this.name, e.transparent = this.transparent, _.each(this.uniforms, function (t, n) {
                var r = t.type;
                "v2" === r || "m4" === r ? e.uniforms[n].value.copy(t.value) : e.uniforms[n].value = t.value
            }, this), e
        }
    }), t.exports = i
}, function (t, e) {
    t.exports = "uniform float objectScale;\n\nvoid main() {\n  float thickness = 0.015 / objectScale;\n  vec4 worldPos = modelMatrix * vec4(position, 1.0);\n  vec4 worldNormal = modelMatrix * vec4(normal, 0.0);\n \n  worldPos += worldNormal * thickness;\n  gl_Position = projectionMatrix * viewMatrix * worldPos;\n}"
}, function (t, e) {
    t.exports = "uniform vec3 diffuse;\nuniform float opacity;\n\nvoid main() {\n  gl_FragColor = vec4(diffuse, opacity);\n}"
}, function (t, e, n) {
    var r = n(1), i = n(49), o = n(51), a = n(0), s = function (t) {
        this.scene = new THREE.Scene, this.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -1e4, 1e4), this.width = this.camera.right - this.camera.left, this.height = this.camera.top - this.camera.bottom, this.size = {
            width: this.width,
            height: this.height
        }, this.maxScale = .05 * this.width, this.scene.add(this.camera), this.camera.position.set(0, 0, 1e3), this.camera.lookAt(this.scene.position), this.palettes = {}, this.pickables = [], this.createPalettes(t.scene, t.configurables, t.vr), this.hideAllPalettes(), this.createPanels(t.scene, t.configurables, t.vr), this.visible = !1
    };
    s.prototype = {
        createPanels: function (t, e, n) {
            var r = a.getTexture("textures/corner-gradient.png");
            this.panels = {}, _.each(e, function (e) {
                var o = t.getObjectByName("ui_panel").clone(), a = new i({
                    referenceObject: o,
                    data: e.panel_data,
                    hudSize: {width: this.width, height: this.height},
                    gradientMap: r,
                    showGradient: !n
                });
                this.scene.add(a), a.visible = !1, this.panels[e.name] = a
            }, this)
        }, createPalettes: function (t, e, n) {
            e.forEach(function (e) {
                var r = e.name, i = t.getObjectByName(r), a = this.getMaterialsForObject(i),
                    s = new o({hudSize: this.size, maxScale: this.maxScale, materials: a, exposureBoost: !n});
                this.palettes[r] = s, this.scene.add(s), s.children.forEach(function (t) {
                    this.pickables.push(t)
                }, this), s.name = r + "_palette"
            }, this)
        }, getMaterialsForObject: function (t) {
            if (t) {
                var e = t.getObjectByName("materials");
                if (e) return _.map(e.children, function (t) {
                    return t.material
                })
            }
        }, showAllPalettes: function (t) {
            _.each(this.palettes, function (e) {
                e.show(t)
            }, this)
        }, hideAllPalettes: function () {
            _.each(this.palettes, function (t) {
                t.hide()
            }, this), this.currentPalette = null
        }, showAllPanels: function () {
            _.each(this.panels, function (t) {
                t.show(!1)
            }, this)
        }, hideAllPanels: function () {
            _.each(this.panels, function (t) {
                t.hide()
            }, this)
        }, setPanel: function (t, e) {
            this.currentPanel && this.currentPanel.fadeOut(), this.currentPanel = this.panels[t], this.currentPanel.show(e)
        }, setPalette: function (t, e) {
            var n = function () {
                this.currentPalette && this.currentPalette.show()
            }.bind(this);
            this.currentPalette ? this.currentPalette.fadeOut() : this.hideAllPalettes(), this.currentPalette = this.palettes[t], e ? setTimeout(n, e) : n()
        }, getPickables: function () {
            return this.pickables
        }, show: function () {
            this.visible = !0
        }, hide: function () {
            this.currentPalette.fadeOut(function () {
                this.visible = !1, this.currentPalette = null
            }.bind(this)), this.currentPanel.fadeOut(function () {
                this.currentPanel = null
            }.bind(this))
        }, enter: function (t) {
            var e = t.tweenValue;
            t.tween.reset(e).to({scale: 1.2 * this.maxScale}, 250).easing(TWEEN.Easing.Quartic.Out).onUpdate(function () {
                t.scale.set(e.scale, e.scale, e.scale)
            }).start(), this.hoveredObject = t
        }, leave: function (t) {
            var e = t.tweenValue;
            t.tween.reset(e).to({scale: this.maxScale}, 250).easing(TWEEN.Easing.Quartic.Out).onUpdate(function () {
                t.scale.setScalar(e.scale)
            }).start(), this.hoveredObject = null
        }, select: function () {
            var t = new TWEEN.Tween, e = {scale: 1, opacity: .35};
            return function (n) {
                n.current || (_.contains(this.currentPalette.children, n) && this.trigger("selectMaterial", this.currentPalette.children.indexOf(n)), t.reset(e).to({
                    scale: 1.3,
                    opacity: 0
                }, 400).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
                    n.ripple.scale.set(e.scale, e.scale, e.scale), n.ripple.material.opacity = e.opacity
                }).onComplete(function () {
                    e.scale = 1.05, e.opacity = .35
                }).start())
            }
        }(), render: function (t) {
            this.visible && t.render(this.scene, this.camera)
        }, update: function (t) {
            this.hoveredObject && (this.hoveredObject.rotation.y += t.delta)
        }, setCurrent: function (t) {
            var e = this.currentPalette.children[t];
            this.currentPalette.children.forEach(function (t) {
                t.current = !1, t.stroke.visible = !1
            }), e.current = !0, e.stroke.visible = !0, this.currentPanel.setMaterial(t)
        }, resize: function () {
            this.camera.left = window.innerWidth / -2, this.camera.right = window.innerWidth / 2, this.camera.top = window.innerHeight / 2, this.camera.bottom = window.innerHeight / -2, this.camera.updateProjectionMatrix(), this.size.width = this.camera.right - this.camera.left, this.size.height = this.camera.top - this.camera.bottom, this.maxScale = this.size.width > this.size.height ? .05 * this.size.width : .05 * this.size.height, _.invoke(this.panels, "resize", this.size), _.invoke(this.palettes, "resize", this.size, this.maxScale)
        }
    }, s.mixin(r), t.exports = s
}, function (t, e, n) {
    function r(t) {
        var e = new o, n = e.canvas;
        switch (e.resize(512, 512), t) {
            case"name":
                e.draw(arguments[1], '96px "AlternateGothic3"', "white", 2);
                break;
            case"dimensions":
                e.draw(arguments[1], '24px "Work Sans"', "white", 2);
                break;
            case"material":
                e.draw(arguments[1], '36px "Work Sans"', "white", 2)
        }
        new THREE.Texture(n);
        return new THREE.Texture(n)
    }

    function i(t, e) {
        t.offset.copy(e.material.map.offset), t.repeat.copy(e.material.map.repeat), t.wrapS = t.WrapT = THREE.ClampToEdgeWrapping, t.minFilter = THREE.LinearFilter, t.needsUpdate = !0, e.material.map = t, e.material.needsUpdate = !0
    }

    var o = n(50), a = function (t) {
        THREE.Object3D.call(this);
        var e = t.data;
        this.showGradient = t.showGradient, this.gradientMap = t.gradientMap, this.initLayout(t.referenceObject, t.hudSize), this.materialTextures = [];
        var n = r("name", e.type), o = r("dimensions", e.dimensions);
        return e.materials.forEach(function (t) {
            var e = r("material", t);
            this.materialTextures.push(e)
        }, this), i(n, this.nameObj), i(o, this.dimensionsObj), i(this.materialTextures[0], this.materialObj), this
    };
    a.inherit(THREE.Object3D, {
        initLayout: function (t, e) {
            var n = e.width > e.height, r = n ? .075 * e.height : .08 * e.width,
                i = n ? e.width / 1880 : e.height / 1400, o = t.getObjectByName("name"), a = t.getObjectByName("line"),
                s = t.getObjectByName("dimensions"), c = t.getObjectByName("material");
            this.innerContainer = new THREE.Object3D, this.innerContainer.position.set(-.5 * e.width + r, .5 * e.height - r, 0), this.add(this.innerContainer), this.innerContainer.scale.setScalar(i), this.nameObj = this.addElement(o, 0, 0), this.lineObj = this.addElement(a, -205, 100), this.dimensionsObj = this.addElement(s, 0, 125), this.materialObj = this.addElement(c, 0, 110), this.showGradient && this.initGradient(r), a.children[0].material.polygonOffset = !0, a.children[0].material.polygonOffsetFactor = -.1
        }, initGradient: function (t) {
            var e = new THREE.MeshBasicMaterial({transparent: !0, map: this.gradientMap, opacity: 0}),
                n = new THREE.Mesh(new THREE.PlaneBufferGeometry(512, 512, 1, 1), e);
            this.innerContainer.add(n), n.scale.setScalar((512 + t) / 512), n.position.set(256 - t / 2, t / 2 - 256, 0), n.renderOrder = 0, this.gradient = n, this.gradient.maxOpacity = window.isMobile ? .2 : .3, this.gradient.animation = {
                tween: new TWEEN.Tween,
                opacity: 0
            }
        }, resize: function (t) {
            var e = t.width > t.height, n = e ? .075 * t.height : .08 * t.width,
                r = e ? t.width / 1880 : t.height / 1400;
            this.innerContainer.position.set(-.5 * t.width + n, .5 * t.height - n, 0), this.innerContainer.scale.setScalar(r), this.gradient.scale.setScalar((512 + n) / 512), this.gradient.position.set(256 - n / 2, n / 2 - 256, 0)
        }, show: function (t) {
            t = void 0 === t || t, this.visible = !0, this.innerContainer.visible = !0, t && (this.nameObj.visible = !1, this.materialObj.visible = !1, this.dimensionsObj.visible = !1, this.animateLine(), setTimeout(this.animateUpperElement.bind(this), 300), setTimeout(this.animateLowerElement.bind(this), 500)), this.showGradient && this.fadeInGradient()
        }, fadeInGradient: function () {
            this.gradient.material.opacity = 0, this.gradient.animation.opacity = 0, this.gradient.animation.tween.reset(this.gradient.animation).to({opacity: this.gradient.maxOpacity}, 1e3).onUpdate(function () {
                this.gradient.material.opacity = this.gradient.animation.opacity
            }.bind(this)).start()
        }, fadeOutGradient: function () {
            this.gradient.animation.tween.reset(this.gradient.animation).to({opacity: 0}, 350).onUpdate(function () {
                this.gradient.material.opacity = this.gradient.animation.opacity
            }.bind(this)).start()
        }, hide: function () {
            this.visible = !1
        }, addElement: function (t, e, n) {
            var r = new THREE.Box3;
            return function (t, e, n) {
                this.add(t), r.setFromObject(t), this.innerContainer.add(t), t.height = r.max.y - r.min.y, t.width = r.max.x - r.min.x;
                var i = -t.height / this.scale.y / 2 - n, o = t.width / this.scale.x / 2 + e;
                return t.position.set(o, i, 0), t.material && (t.material = t.material.clone(), t.material.depthTest = !1), t.traverse(function (t) {
                    t.renderOrder = 1
                }), t
            }
        }(), setMaterial: function () {
            var t = new TWEEN.Tween, e = {offset: 0, progress: 0};
            return function (n) {
                if (this.materialTween) return void this.materialTween.onComplete(function () {
                    e.offset = 0, e.progress = 0, this.innerContainer.remove(this.materialObj), this.materialObj = this.clone, this.materialTween = null, this.setMaterial(n)
                }.bind(this));
                var r = this.materialTextures[n], o = this.materialObj.clone();
                if (this.clone = o, this.innerContainer.add(o), o.position.copy(this.materialObj.position), o.position.x -= 200, o.material && (o.material = o.material.clone(), o.material.depthTest = !1), o.traverse(function (t) {
                    t.renderOrder = 1
                }), !r) return void console.warn("Missing material texture. Panel cannot display current material name.");
                i(r, o), o.material.opacity = 0;
                var a = this.materialObj.position.x, s = o.position.x, c = function () {
                    e.offset = 0, e.progress = 0, this.innerContainer.remove(this.materialObj), this.materialObj = o, this.materialObj.position.setX(a + e.offset), this.materialTween = null
                };
                this.materialTween = t.reset(e).to({offset: 200}, 500).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function (t) {
                    this.materialObj.position.setX(a + e.offset), o.position.setX(s + e.offset), this.materialObj.material.opacity = 1 - t, o.material.opacity = t
                }.bind(this)).onComplete(c.bind(this)).onStop(c.bind(this)).start()
            }
        }(), animateLine: function () {
            var t = new TWEEN.Tween, e = {x: 0};
            return function () {
                var n = this.lineObj, r = n.scale.x;
                e.y = n.scale.y, e.z = n.scale.z, n.scale.setX(1e-5), t.reset(e).to({x: r}, 1e3).easing(TWEEN.Easing.Quartic.InOut).onUpdate(function () {
                    n.scale.set(e.x, e.y, e.z)
                }).onComplete(function () {
                    e.x = 1e-5
                }).start()
            }
        }(), animateUpperElement: function () {
            var t = new TWEEN.Tween, e = {offset: 1, opacity: 0};
            return function () {
                var n = this.nameObj, r = n.material.map, i = r.offset.y;
                n.visible = !0, r.offset.setY(e.offset), t.reset(e).to({
                    offset: i,
                    opacity: 1
                }, 1e3).easing(TWEEN.Easing.Quartic.InOut).onUpdate(function () {
                    r.offset.setY(e.offset), n.material.opacity = e.opacity
                }).onComplete(function () {
                    e.offset = 1, e.opacity = 0
                }).start()
            }
        }(), animateLowerElement: function () {
            var t = new TWEEN.Tween, e = {offset1: .73, offset2: .8, opacity: 0};
            return function () {
                var n = this.materialObj, r = n.material.map, i = r.offset.y, o = this.dimensionsObj,
                    a = o.material.map, s = a.offset.y;
                n.visible = !0, o.visible = !0, n.material.opacity = 0, o.material.opacity = 0, r.offset.setY(e.offset1), a.offset.setY(e.offset2), t.reset(e).to({
                    offset1: i,
                    offset2: s,
                    opacity: 1
                }, 1e3).easing(TWEEN.Easing.Quartic.InOut).onUpdate(function () {
                    r.offset.setY(e.offset1), a.offset.setY(e.offset2), n.material.opacity = e.opacity, o.material.opacity = e.opacity
                }).onComplete(function () {
                    e.offset1 = .73, e.offset2 = .8, e.opacity = 0
                }).start()
            }
        }(), fadeOut: function () {
            var t = new TWEEN.Tween, e = {opacity: 1};
            return function (n) {
                t.reset(e).to({opacity: 0}, 350).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function (t) {
                    this.traverse(function (t) {
                        t.material && (t.material.opacity = e.opacity)
                    }.bind(this))
                }.bind(this)).onComplete(function () {
                    e.opacity = 1, this.traverse(function (t) {
                        t.material && (t.material.opacity = e.opacity)
                    }), this.hide(), n && n()
                }.bind(this)).start(), this.materialTween && this.materialTween.stop(), this.showGradient && this.fadeOutGradient()
            }
        }()
    }), t.exports = a
}, function (t, e) {
    function n() {
        s = document.createElement("canvas"), a = s.getContext("2d")
    }

    function r(t, e) {
        s.width = t, s.height = e, i()
    }

    function i() {
        a.clearRect(0, 0, s.width, s.height), a.fillStyle = "rgba(255, 255, 255, 0.001)", a.fillRect(0, 0, s.width, s.height)
    }

    function o(t, e, n, r) {
        a.font = e, a.fillStyle = n, a.textBaseline = "hanging", a.fillText(t, 0, c + r)
    }

    var a, s, c = 1, u = function () {
        n(), this.canvas = s
    };
    u.prototype.draw = function (t, e, n, r) {
        t.length > 0 && o(t, e, n, r)
    }, u.prototype.resize = function (t, e) {
        r(t, e)
    }, u.prototype.reset = function () {
        i()
    }, t.exports = u
}, function (t, e, n) {
    var r = n(0), i = function (t) {
        return THREE.Object3D.call(this), this.strokeMaterial = new THREE.MeshBasicMaterial({
            color: 16777215,
            side: THREE.BackSide,
            transparent: !0
        }), this.rippleMaterial = this.strokeMaterial.clone(), this.rippleMaterial.opacity = 0, this.materials = t.materials, this.itemCount = this.materials.length, this.maxScale = t.maxScale, this.exposureBoost = t.exposureBoost, this.initLayout(t.hudSize), this
    };
    i.inherit(THREE.Object3D, {
        initLayout: function (t) {
            if (this.materials) {
                var e = t.width > t.height,
                    n = e ? t.width * (.125 * this.itemCount) : t.width * (.16 * this.itemCount), r = .3 * -t.height;
                this.materials.forEach(function (t, e) {
                    var i = -n / 2 + n / (this.itemCount - 1) * e, o = this.createSphere(i, r, t, 1);
                    this.add(o), o.name = "material_" + e
                }, this), this.children[0].current = !0, this.children[0].stroke.visible = !0
            }
        }, resize: function (t, e) {
            var n = t.width > t.height, r = n ? t.width * (.125 * this.itemCount) : t.width * (.16 * this.itemCount),
                i = n ? .3 * -t.height : .35 * -t.height;
            this.maxScale = e, this.children.forEach(function (t, e) {
                var n = -r / 2 + r / (this.itemCount - 1) * e;
                t.position.setX(n), t.position.setY(i), t.scale.setScalar(this.maxScale), t.tweenValue.scale = this.maxScale
            }, this)
        }, createSphere: function (t, e, n, i) {
            var o = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), n.clone());
            o.scale.setScalar(i);
            var a = o.clone(), s = a.clone();
            o.rotation.x = .25, o.position.setX(t), o.position.setY(e), a.scale.setScalar(1.05), a.material = this.strokeMaterial, o.add(a), o.stroke = a, a.visible = !1, o.ripple = s, s.material = this.rippleMaterial, a.add(s), o.material.transparent = !0, o.material.defines.USE_DIR_LIGHT = !0;
            var c = r.getSH("studio");
            return o.material.uDiffuseSPH = new Float32Array(c, 27), this.exposureBoost && (o.material.uEnvironmentExposure = 1.5), o.tween = new TWEEN.Tween, o.tweenValue = {scale: this.maxScale}, o.material.defines.USE_AOMAP2 = !1, o.material.defines.USE_NORMALMAP2 = !1, o
        }, hide: function () {
            this.visible = !1, this.children.forEach(function (t) {
                t.pickable = !1
            })
        }, show: function () {
            return function (t) {
                t = void 0 === t || t, this.children.forEach(function (t) {
                    t.material.opacity = 1, t.stroke.material.opacity = 1
                }), t ? (this.visible = !0, this.children.forEach(function (t, e) {
                    var n = {scale: 1e-5};
                    t.scale.set(1e-5, 1e-5, 1e-5), t.pickable = !0, setTimeout(function () {
                        t.tween.reset(n).to({scale: t.tweenValue.scale}, 1e3).easing(TWEEN.Easing.Elastic.Out).onUpdate(function () {
                            this.hoveredObject !== t && t.scale.setScalar(n.scale)
                        }.bind(this)).start()
                    }.bind(this), 125 * e)
                }.bind(this))) : (this.visible = !0, this.children.forEach(function (t) {
                    t.pickable = !0, t.scale.setScalar(this.maxScale)
                }, this))
            }
        }(), fadeOut: function () {
            var t = new TWEEN.Tween, e = {opacity: 1};
            return function (n) {
                t.reset(e).to({opacity: 0}, 350).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function (t) {
                    this.children.forEach(function (t) {
                        t.material.opacity = e.opacity, t.stroke.material.opacity = e.opacity
                    })
                }.bind(this)).onComplete(function () {
                    e.opacity = 1, this.children.forEach(function (t) {
                        t.material.opacity = e.opacity, t.stroke.material.opacity = e.opacity
                    }), this.hide(), n && n()
                }.bind(this)).start()
            }
        }()
    }), t.exports = i
}, function (t, e, n) {
    var r = THREE.PerspectiveCamera, i = n(1), o = n(53), a = n(54), s = n(55), c = n(58), u = n(5), l = function (t) {
        r.call(this), this.fov = 50, this.near = .01, this.far = 1500, this.updateProjectionMatrix(), this.moving = !1, this.rotating = !1, t.vr ? (this.vr = !0, this.vrControls = new o(this), this.mode = l.VR_MODE, this.moveTo(0, 0)) : (window.isMobile ? this.lookControls = new s(this, t.canvasElement) : (this.lookControls = new a(this, t.$container), u.ENABLE_DAMPING && (this.lookControls.enableDamping = !0, this.lookControls.dampingFactor = .25)), this.orbitControls = new c(this, {
            autoSpeed: u.ENABLE_DAMPING ? .1 : 1,
            autoDelay: 3e3,
            domElement: document.getElementById("main_canvas")
        }), this.orbitControls.enableZoom = !!u.ENABLE_ZOOM, this.orbitControls.enablePan = !!u.ENABLE_PAN, this.orbitControls.enabled = !1, this.orbitControls.maxPolarAngle = Math.PI / 2, u.ENABLE_DAMPING && (this.orbitControls.enableDamping = !0, this.orbitControls.dampingFactor = .065, this.orbitControls.rotateSpeed = .05), this._target = new THREE.Object3D, this._target.position.z = -1, this.add(this._target), this.mode = l.LOOK_MODE), t.states && (this.initStates(t.states), this.states.start ? (this.position.copy(this.states.start[0].position), this.quaternion.copy(this.states.start[0].quaternion), this.vr || this.lookControls.setOrientationFromCamera()) : this.moveTo(-3.5, 3))
    };
    l.inherit(r, {
        initStates: function (t) {
            this.states = {}, t.forEach(function (t) {
                var e = t.name.replace("_camera", "");
                this.states[e] ? this.states[e].push(t) : this.states[e] = [t], t.children.length > 0 && (t.target = new THREE.Vector3, t.children[0].getWorldPosition(t.target))
            }, this)
        }, setState: function (t) {
            if (!this.vr) {
                if (void 0 === t) return void console.warn("setCameraState() requires an argument");
                if (!this.states.hasOwnProperty(t)) return void console.error("Camera state was not found:", t);
                this.setMode(l.ORBIT_MODE);
                var e = _.min(this.states[t], function (t) {
                    return this.position.distanceTo(t.position)
                }.bind(this));
                return this.isTransitioning = !0, this.tweenOrbitTargetTo(e.target, 1e3).onComplete(function () {
                    this.isTransitioning = !1, this.orbitControls.startAutoOrbit(1e3)
                }.bind(this)), this.tweenPositionTo(e.position, 1e3)
            }
        }, setMode: function (t) {
            var e = new THREE.Vector3;
            return function (t) {
                switch (t) {
                    case l.ORBIT_MODE:
                        this._target.getWorldPosition(e), this.orbitControls.setTarget(e), this.orbitControls.enabled = !0;
                        break;
                    case l.LOOK_MODE:
                        this.lookControls.setOrientationFromCamera(), this.orbitControls.enabled = !1, this.orbitControls.stopAutoOrbit();
                        break;
                    case l.VR_MODE:
                        this.orbitControls.enabled = !1
                }
                this.mode = t
            }
        }(), moveTo: function () {
            var t = new THREE.Vector3;
            return function (e, n, r) {
                r = r || 0, t.set(e, this.vr ? l.DEFAULT_HEIGHT_VR : l.DEFAULT_HEIGHT, n), r > 0 && !this.vr ? (this.trigger("startMove"), this.moving = !0, this.tweenPositionTo(t, r).onComplete(function () {
                    this.trigger("endMove"), this.moving = !1
                }.bind(this))) : (this.position.copy(t), this.vr && (this.updateMatrixWorld(!0), this.vrControls.setPosition(this))), this.firstMove || (this.trigger("firstMove"), this.firstMove = !0), this.vr || this.setMode(l.LOOK_MODE)
            }
        }(), tweenPositionTo: function () {
            var t = {x: 0, y: 0, z: 0}, e = new TWEEN.Tween;
            return function (n, r) {
                return t.x = this.position.x, t.y = this.position.y, t.z = this.position.z, e.reset(t).to({
                    x: n.x,
                    y: n.y,
                    z: n.z
                }, r).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
                    this.position.set(t.x, t.y, t.z)
                }.bind(this)).start()
            }
        }(), tweenOrbitTargetTo: function () {
            var t = {x: 0, y: 0, z: 0}, e = new TWEEN.Tween;
            return function (n, r) {
                if (!this.orbitControls) throw new Error("Orbit controls required");
                var i = this.orbitControls.getTarget();
                return t.x = i.x, t.y = i.y, t.z = i.z, e.reset(t).to({
                    x: n.x,
                    y: n.y,
                    z: n.z
                }, r).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
                    this.orbitControls.target.set(t.x, t.y, t.z)
                }.bind(this)).start()
            }
        }(), enableControls: function () {
            this.vr || (this.lookControls.enabled = !0)
        }, setOrbitDistances: function (t, e) {
            this.orbitControls.minDistance = t, this.orbitControls.maxDistance = e
        }, update: function () {
            this.mode === l.VR_MODE ? this.vrControls.update() : (this.mode === l.ORBIT_MODE ? (this.orbitControls.update(), this.rotating = this.orbitControls.isRotating || this.isTransitioning) : (this.lookControls.update(), this.rotating = this.lookControls.isRotating), this.rotating && !this.firstRotate && (this.trigger("firstRotate"), this.firstRotate = !0))
        }
    }), l.LOOK_MODE = 0, l.ORBIT_MODE = 1, l.VR_MODE = 2, l.DEFAULT_HEIGHT = 1.4, l.DEFAULT_HEIGHT_VR = 1.55, l.mixin(i), t.exports = l
}, function (t, e) {
    var n = function (t, e) {
        function n(t) {
            i = t, t.length > 0 ? r = t[0] : e && e("VR input not available.")
        }

        var r, i, o = this, a = new THREE.Matrix4, s = null,
            c = (new THREE.Vector3).setFromMatrixPosition(t.matrixWorld), u = t.quaternion.clone(),
            l = new THREE.Vector3, h = new THREE.Quaternion, f = new THREE.Vector3;
        "VRFrameData" in window && (s = new VRFrameData), navigator.getVRDisplays && navigator.getVRDisplays().then(n).catch(function () {
            console.warn("THREE.VRControls: Unable to get VR Displays")
        }), this.scale = 1, this.standing = !1, this.userHeight = 1.6, this.getVRDisplay = function () {
            return r
        }, this.setVRDisplay = function (t) {
            r = t
        }, this.getVRDisplays = function () {
            return console.warn("THREE.VRControls: getVRDisplays() is being deprecated."), i
        }, this.getStandingMatrix = function () {
            return a
        }, this.setPosition = function (t) {
            c.setFromMatrixPosition(t.matrixWorld), s.pose.position && (f.set(s.pose.position[0], s.pose.position[1], s.pose.position[2]), c.sub(f))
        }, this.getPosition = function () {
            return c
        }, this.setOrientation = function (t) {
            u.copy(t.quaternion)
        }, this.getOrientation = function (t) {
            return u
        }, this.hasInput = function () {
            return null !== s
        }, this.update = function () {
            if (r) {
                var e;
                r.getFrameData ? (r.getFrameData(s), e = s.pose) : r.getPose && (e = r.getPose()), null !== e.orientation && (h.fromArray(e.orientation), t.quaternion.multiplyQuaternions(u, h).normalize()), null !== e.position ? (l.fromArray(e.position), l.applyQuaternion(u), t.position.addVectors(c, l)) : t.position.set(0, 0, 0), this.standing && (r.stageParameters ? (t.updateMatrix(), a.fromArray(r.stageParameters.sittingToStandingTransform), t.applyMatrix(a)) : t.position.setY(t.position.y + this.userHeight)), t.position.multiplyScalar(o.scale)
            }
        }, this.resetPose = function () {
            r && r.resetPose()
        }, this.resetSensor = function () {
            console.warn("THREE.VRControls: .resetSensor() is now .resetPose()."), this.resetPose()
        }, this.zeroSensor = function () {
            console.warn("THREE.VRControls: .zeroSensor() is now .resetPose()."), this.resetPose()
        }, this.dispose = function () {
            r = null
        }
    };
    t.exports = n
}, function (t, e) {
    function n(t, e) {
        var n = document.getElementById("main_canvas");
        n.addEventListener("mousemove", this.onMouseMove.bind(this)), n.addEventListener("mousedown", this.onMouseDown.bind(this)), n.addEventListener("mouseup", this.onMouseUp.bind(this)), this.camera = t, this.phi = 0, this.theta = 0, this.rotateStart = new THREE.Vector2, this.rotateEnd = new THREE.Vector2, this.rotateDelta = new THREE.Vector2, this.isDragging = !1, this.isRotating = !1, this.enableDamping = !1, this.dampingFactor = .25, this.$container = e
    }

    function r(t) {
        var e = t.clientX == i && t.clientY == o;
        return i = t.clientX, o = t.clientY, e
    }

    var i, o;
    n.prototype = {
        update: function () {
            var t = new THREE.Euler(0, 0, 0, "YXZ"), e = new THREE.Quaternion;
            return function () {
                return t.set(this.phi, this.theta, 0), e.setFromEuler(t), this.enableDamping ? this.camera.quaternion.slerp(e, this.dampingFactor) : this.camera.quaternion.copy(e), this
            }
        }(), setOrientationFromCamera: function () {
            var t = new THREE.Euler(0, 0, 0, "YXZ");
            return function () {
                return t.setFromQuaternion(this.camera.quaternion), this.phi = t.x, this.theta = t.y, this
            }
        }(), reset: function () {
            return this.phi = 0, this.theta = 0, this.update(), this
        }, onMouseDown: function (t) {
            this.rotateStart.set(t.clientX, t.clientY), this.isMouseDown = !0, i = t.clientX, o = t.clientY
        }, onMouseMove: function (t) {
            if (!r(t) && (this.isMouseDown || this.isPointerLocked()) && this.enabled) {
                if (this.isRotating = !0, this.$container.hasClass("rotating") || this.$container.addClass("rotating"), this.isPointerLocked()) {
                    var e = t.movementX || t.mozMovementX || 0, n = t.movementY || t.mozMovementY || 0;
                    this.rotateEnd.set(this.rotateStart.x - e, this.rotateStart.y - n)
                } else this.rotateEnd.set(t.clientX, t.clientY);
                this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart), this.rotateStart.copy(this.rotateEnd), this.phi += 2 * Math.PI * this.rotateDelta.y / screen.height * .3, this.theta += 2 * Math.PI * this.rotateDelta.x / screen.width * .5, this.phi = THREE.Math.clamp(this.phi, -Math.PI / 2, Math.PI / 2)
            }
        }, onMouseUp: function (t) {
            this.isMouseDown = !1, this.isRotating = !1, this.$container.removeClass("rotating")
        }, isPointerLocked: function () {
            return void 0 !== (document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement)
        }
    }, t.exports = n
}, function (t, e, n) {
    function r(t, e) {
        this.camera = t, this.touchPanner = new i(e), this._enabled = !0, Object.defineProperty(this, "enabled", {
            get: function () {
                return this._enabled
            }, set: function (t) {
                this.touchPanner.enabled = t, this._enabled = t
            }
        })
    }

    var i = n(56);
    r.prototype = {}, r.prototype.update = function () {
        this.touchPanner.update(), this.camera.quaternion.copy(this.touchPanner.getOrientation())
    }, r.prototype.setOrientationFromCamera = function () {
        var t = new THREE.Euler(0, 0, 0, "YXZ");
        return function () {
            t.setFromQuaternion(this.camera.quaternion), this.touchPanner.setState(t.x, t.y)
        }
    }(), r.prototype.setRotationAngle = function (t) {
        this.touchPanner.setRotationAngle(t)
    }, r.prototype.canMove = function () {
        return !0
    }, t.exports = r
}, function (t, e, n) {
    function r(t) {
        var e = void 0 !== t ? t : window;
        this.speed = window.innerHeight > window.innerWidth ? a : 2 * a, window.addEventListener("resize", function () {
            this.speed = window.innerHeight > window.innerWidth ? a : 2 * a
        }.bind(this)), e.addEventListener("touchstart", this.onTouchStart_.bind(this)), e.addEventListener("touchmove", this.onTouchMove_.bind(this), {passive: !1}), e.addEventListener("touchend", this.onTouchEnd_.bind(this)), this.isTouching = !1, this.rotateStart = new THREE.Vector2, this.rotateEnd = new THREE.Vector2, this.rotateDelta = new THREE.Vector2, this._theta = 0, this._phi = 0, this.theta = 0, this.phi = 0, this.orientation = new THREE.Quaternion, this.enableDamping = !0, this.dampingFactor = .25, this._enabled = !0, Object.defineProperty(this, "enabled", {
            get: function () {
                return this._enabled
            }, set: function (t) {
                this._enabled = t
            }
        })
    }

    function i(t, e, n) {
        return (1 - n) * t + n * e
    }

    var o = n(5), a = (n(57), .25);
    r.prototype.getOrientation = function () {
        var t = o.ENABLE_GYRO ? "XYZ" : "YXZ", e = new THREE.Euler(0, 0, 0, t);
        return function () {
            var t = o.ENABLE_GYRO ? 0 : this.phi;
            return e.set(t, this.theta, 0), this.orientation.setFromEuler(e), this.orientation
        }
    }(), r.prototype.resetSensor = function () {
        this._theta = 0, this._phi = 0, this.theta = 0, this.phi = 0
    }, r.prototype.onTouchStart_ = function (t) {
        1 == t.touches.length && this._enabled && (this.rotateStart.set(t.touches[0].pageX, t.touches[0].pageY), this.isTouching = !0)
    }, r.prototype.onTouchMove_ = function (t) {
        if (this.isTouching && this._enabled) {
            this.rotateEnd.set(t.touches[0].pageX, t.touches[0].pageY), this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart), this.rotateStart.copy(this.rotateEnd);
            var e = document.body;
            this._theta += 2 * Math.PI * this.rotateDelta.x / e.clientWidth * this.speed, this._phi += 2 * Math.PI * this.rotateDelta.y / e.clientHeight * this.speed, this._phi = THREE.Math.clamp(this._phi, -Math.PI / 2, Math.PI / 2), t.preventDefault()
        }
    }, r.prototype.setRotationAngle = function (t) {
        this.theta = this._theta = t
    }, r.prototype.onTouchEnd_ = function (t) {
        this.isTouching = !1
    }, r.prototype.setState = function (t, e) {
        this.phi = this._phi = t, this.theta = this._theta = e
    }, r.prototype.update = function () {
        this.phi = i(this.phi, this._phi, this.dampingFactor), this.theta = i(this.theta, this._theta, this.dampingFactor)
    }, t.exports = r
}, function (t, e) {
    var n = window.Util || {};
    n.MIN_TIMESTEP = .001, n.MAX_TIMESTEP = 1, n.isIOS = function () {
        var t = /iPad|iPhone|iPod/.test(navigator.platform);
        return function () {
            return t
        }
    }(), n.isSafari = function () {
        var t = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        return function () {
            return t
        }
    }(), n.isFirefoxAndroid = function () {
        var t = -1 !== navigator.userAgent.indexOf("Firefox") && -1 !== navigator.userAgent.indexOf("Android");
        return function () {
            return t
        }
    }(), n.isLandscapeMode = function () {
        return 90 == window.orientation || -90 == window.orientation
    }, n.isTimestampDeltaValid = function (t) {
        return !isNaN(t) && (!(t <= n.MIN_TIMESTEP) && !(t > n.MAX_TIMESTEP))
    }, t.exports = n
}, function (t, e, n) {
    function r(t, e) {
        i.call(this, t, e.domElement), this.autoSpeed = e.autoSpeed, this.autoDelay = e.autoDelay, this.autoOrbitTimer = o.createTimer({
            duration: this.autoDelay,
            onEnd: function () {
                this.startAutoOrbit()
            }.bind(this)
        })
    }

    var i = n(59), o = n(11);
    r.inherit(i, {
        setTarget: function (t) {
            this.constraint.target.copy(t)
        }, getTarget: function (t) {
            return this.constraint.target
        }, startAutoOrbit: function (t) {
            var e = function () {
                this.autoRotateSpeed = this.autoSpeed, this.autoRotate = !0, this.startTimeout = null
            }.bind(this);
            this.stopAutoOrbit(), void 0 !== t ? this.startTimeout = setTimeout(e, t) : e()
        }, stopAutoOrbit: function () {
            this.autoRotate = !1, this.autoOrbitTimer.reset()
        }, onMouseMove: function () {
            this.stopAutoOrbit(), this.autoOrbitTimer.start(), this.startTimeout && clearTimeout(this.startTimeout)
        }
    }), t.exports = r
}, function (t, e) {
    !function () {
        function e(t) {
            this.object = t, this.target = new THREE.Vector3, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .25;
            var e, n, r = this, i = 0, o = 0, a = 1, s = new THREE.Vector3, c = !1;
            this.getPolarAngle = function () {
                return n
            }, this.getAzimuthalAngle = function () {
                return e
            }, this.rotateLeft = function (t) {
                o -= t
            }, this.rotateUp = function (t) {
                i -= t
            }, this.panLeft = function () {
                var t = new THREE.Vector3;
                return function (e) {
                    var n = this.object.matrix.elements;
                    t.set(n[0], n[1], n[2]), t.multiplyScalar(-e), s.add(t)
                }
            }(), this.panUp = function () {
                var t = new THREE.Vector3;
                return function (e) {
                    var n = this.object.matrix.elements;
                    t.set(n[4], n[5], n[6]), t.multiplyScalar(e), s.add(t)
                }
            }(), this.pan = function (t, e, n, i) {
                if (r.object instanceof THREE.PerspectiveCamera) {
                    var o = r.object.position, a = o.clone().sub(r.target), s = a.length();
                    s *= Math.tan(r.object.fov / 2 * Math.PI / 180), r.panLeft(2 * t * s / i), r.panUp(2 * e * s / i)
                } else r.object instanceof THREE.OrthographicCamera ? (r.panLeft(t * (r.object.right - r.object.left) / n), r.panUp(e * (r.object.top - r.object.bottom) / i)) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.")
            }, this.dollyIn = function (t) {
                r.object instanceof THREE.PerspectiveCamera ? a /= t : r.object instanceof THREE.OrthographicCamera ? (r.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * t)), r.object.updateProjectionMatrix(), c = !0) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.")
            }, this.dollyOut = function (t) {
                r.object instanceof THREE.PerspectiveCamera ? a *= t : r.object instanceof THREE.OrthographicCamera ? (r.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / t)), r.object.updateProjectionMatrix(), c = !0) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.")
            }, this.update = function () {
                var r = new THREE.Vector3,
                    u = (new THREE.Quaternion).setFromUnitVectors(t.up, new THREE.Vector3(0, 1, 0)),
                    l = u.clone().inverse(), h = new THREE.Vector3, f = new THREE.Quaternion;
                return function () {
                    var t = this.object.position;
                    r.copy(t).sub(this.target), r.applyQuaternion(u), e = Math.atan2(r.x, r.z), n = Math.atan2(Math.sqrt(r.x * r.x + r.z * r.z), r.y), e += o, n += i, this.object.theta = e = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, e)), n = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, n)), this.object.phi = n = Math.max(1e-6, Math.min(Math.PI - 1e-6, n));
                    var p = r.length() * a;
                    return p = Math.max(this.minDistance, Math.min(this.maxDistance, p)), this.target.add(s), r.x = p * Math.sin(n) * Math.sin(e), r.y = p * Math.cos(n), r.z = p * Math.sin(n) * Math.cos(e), r.applyQuaternion(l), t.copy(this.target).add(r), this.object.lookAt(this.target), !0 === this.enableDamping ? (o *= 1 - this.dampingFactor, i *= 1 - this.dampingFactor) : (o = 0, i = 0), a = 1, s.set(0, 0, 0), !!(c || h.distanceToSquared(this.object.position) > 1e-6 || 8 * (1 - f.dot(this.object.quaternion)) > 1e-6) && (h.copy(this.object.position), f.copy(this.object.quaternion), c = !1, !0)
                }
            }()
        }

        function n(t) {
            var e = t.clientX == r && t.clientY == i;
            return r = t.clientX, i = t.clientY, e
        }

        var r, i, o = function (t, o) {
            function a(t, e) {
                var n = _.domElement === document ? _.domElement.body : _.domElement;
                y.pan(t, e, n.clientWidth, n.clientHeight)
            }

            function s() {
                return 2 * Math.PI / 60 / 60 * _.autoRotateSpeed
            }

            function c() {
                return Math.pow(.95, _.zoomSpeed)
            }

            function u(t) {
                if (!1 !== _.enabled) {
                    if (r = t.clientX, i = t.clientY, t.preventDefault(), t.button === _.mouseButtons.ORBIT) {
                        if (!1 === _.enableRotate) return;
                        O = S.ROTATE, b.set(t.clientX, t.clientY)
                    } else if (t.button === _.mouseButtons.ZOOM) {
                        if (!1 === _.enableZoom) return;
                        O = S.DOLLY, M.set(t.clientX, t.clientY)
                    } else if (t.button === _.mouseButtons.PAN) {
                        if (!1 === _.enablePan) return;
                        O = S.PAN, x.set(t.clientX, t.clientY)
                    }
                    O !== S.NONE && (document.addEventListener("mousemove", l, !1), document.addEventListener("mouseup", h, !1), _.dispatchEvent(k)), _.onMouseDown()
                }
            }

            function l(t) {
                if (!1 !== _.enabled && !n(t)) {
                    t.preventDefault();
                    var e = _.domElement === document ? _.domElement.body : _.domElement;
                    if (O === S.ROTATE) {
                        if (!1 === _.enableRotate) return;
                        _.isRotating = !0, E.set(t.clientX, t.clientY), w.subVectors(E, b), y.rotateLeft(2 * Math.PI * w.x / e.clientWidth * _.rotateSpeed), y.rotateUp(2 * Math.PI * w.y / e.clientHeight * _.rotateSpeed), b.copy(E)
                    } else if (O === S.DOLLY) {
                        if (!1 === _.enableZoom) return;
                        P.set(t.clientX, t.clientY), C.subVectors(P, M), C.y > 0 ? y.dollyIn(c()) : C.y < 0 && y.dollyOut(c()), M.copy(P)
                    } else if (O === S.PAN) {
                        if (!1 === _.enablePan) return;
                        T.set(t.clientX, t.clientY), R.subVectors(T, x), a(R.x, R.y), x.copy(T)
                    }
                    O !== S.NONE && _.update(), _.onMouseMove()
                }
            }

            function h() {
                !1 !== _.enabled && (document.removeEventListener("mousemove", l, !1), document.removeEventListener("mouseup", h, !1), _.dispatchEvent(A), O = S.NONE, _.isRotating = !1, _.onMouseUp())
            }

            function f(t) {
                if (!1 !== _.enabled && !1 !== _.enableZoom && O === S.NONE) {
                    t.preventDefault(), t.stopPropagation();
                    var e = 0;
                    void 0 !== t.wheelDelta ? e = t.wheelDelta : void 0 !== t.detail && (e = -t.detail), e > 0 ? y.dollyOut(c()) : e < 0 && y.dollyIn(c()), _.update(), _.dispatchEvent(k), _.dispatchEvent(A)
                }
            }

            function p(t) {
                if (!1 !== _.enabled && !1 !== _.enableKeys && !1 !== _.enablePan) switch (t.keyCode) {
                    case _.keys.UP:
                        a(0, _.keyPanSpeed), _.update();
                        break;
                    case _.keys.BOTTOM:
                        a(0, -_.keyPanSpeed), _.update();
                        break;
                    case _.keys.LEFT:
                        a(_.keyPanSpeed, 0), _.update();
                        break;
                    case _.keys.RIGHT:
                        a(-_.keyPanSpeed, 0), _.update()
                }
            }

            function d(t) {
                if (!1 !== _.enabled) {
                    switch (t.touches.length) {
                        case 1:
                            if (!1 === _.enableRotate) return;
                            O = S.TOUCH_ROTATE, b.set(t.touches[0].pageX, t.touches[0].pageY);
                            break;
                        case 2:
                            if (!1 === _.enableZoom) return;
                            O = S.TOUCH_DOLLY;
                            var e = t.touches[0].pageX - t.touches[1].pageX,
                                n = t.touches[0].pageY - t.touches[1].pageY, r = Math.sqrt(e * e + n * n);
                            M.set(0, r);
                            break;
                        case 3:
                            if (!1 === _.enablePan) return;
                            O = S.TOUCH_PAN, x.set(t.touches[0].pageX, t.touches[0].pageY);
                            break;
                        default:
                            O = S.NONE
                    }
                    O !== S.NONE && _.dispatchEvent(k)
                }
            }

            function m(t) {
                if (!1 !== _.enabled) {
                    t.preventDefault(), t.stopPropagation();
                    var e = _.domElement === document ? _.domElement.body : _.domElement;
                    switch (t.touches.length) {
                        case 1:
                            if (!1 === _.enableRotate) return;
                            if (O !== S.TOUCH_ROTATE) return;
                            _.isRotating = !0, E.set(t.touches[0].pageX, t.touches[0].pageY), w.subVectors(E, b), y.rotateLeft(2 * Math.PI * w.x / e.clientWidth * _.rotateSpeed), y.rotateUp(2 * Math.PI * w.y / e.clientHeight * _.rotateSpeed), b.copy(E), _.update();
                            break;
                        case 2:
                            if (!1 === _.enableZoom) return;
                            if (O !== S.TOUCH_DOLLY) return;
                            var n = t.touches[0].pageX - t.touches[1].pageX,
                                r = t.touches[0].pageY - t.touches[1].pageY, i = Math.sqrt(n * n + r * r);
                            P.set(0, i), C.subVectors(P, M), C.y > 0 ? y.dollyOut(c()) : C.y < 0 && y.dollyIn(c()), M.copy(P), _.update();
                            break;
                        case 3:
                            if (!1 === _.enablePan) return;
                            if (O !== S.TOUCH_PAN) return;
                            T.set(t.touches[0].pageX, t.touches[0].pageY), R.subVectors(T, x), a(R.x, R.y), x.copy(T), _.update();
                            break;
                        default:
                            O = S.NONE
                    }
                }
            }

            function v() {
                !1 !== _.enabled && (_.dispatchEvent(A), O = S.NONE, _.isRotating = !1)
            }

            function g(t) {
                t.preventDefault()
            }

            var y = new e(t);
            this.domElement = void 0 !== o ? o : document, Object.defineProperty(this, "constraint", {
                get: function () {
                    return y
                }
            }), this.getPolarAngle = function () {
                return y.getPolarAngle()
            }, this.getAzimuthalAngle = function () {
                return y.getAzimuthalAngle()
            }, this.enabled = !0, this.center = this.target, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.enableKeys = !0, this.keys = {
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                BOTTOM: 40
            }, this.mouseButtons = {ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT};
            var _ = this, b = new THREE.Vector2, E = new THREE.Vector2, w = new THREE.Vector2, x = new THREE.Vector2,
                T = new THREE.Vector2, R = new THREE.Vector2, M = new THREE.Vector2, P = new THREE.Vector2,
                C = new THREE.Vector2,
                S = {NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5}, O = S.NONE;
            this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom;
            var j = {type: "change"}, k = {type: "start"}, A = {type: "end"};
            this.update = function () {
                this.autoRotate && O === S.NONE && y.rotateLeft(s()), !0 === y.update() && this.dispatchEvent(j)
            }, this.reset = function () {
                O = S.NONE, this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(j), this.update()
            }, this.dispose = function () {
                this.domElement.removeEventListener("contextmenu", g, !1), this.domElement.removeEventListener("mousedown", u, !1), this.domElement.removeEventListener("mousewheel", f, !1), this.domElement.removeEventListener("MozMousePixelScroll", f, !1), this.domElement.removeEventListener("touchstart", d, !1), this.domElement.removeEventListener("touchend", v, !1), this.domElement.removeEventListener("touchmove", m, !1), document.removeEventListener("mousemove", l, !1), document.removeEventListener("mouseup", h, !1), window.removeEventListener("keydown", p, !1)
            }, this.domElement.addEventListener("contextmenu", g, !1), this.domElement.addEventListener("mousedown", u, !1), this.domElement.addEventListener("mousewheel", f, !1), this.domElement.addEventListener("MozMousePixelScroll", f, !1), this.domElement.addEventListener("touchstart", d, !1), this.domElement.addEventListener("touchend", v, !1), this.domElement.addEventListener("touchmove", m, !1), window.addEventListener("keydown", p, !1), this.update()
        };
        o.prototype = Object.create(THREE.EventDispatcher.prototype), o.prototype.constructor = o, o.prototype.onMouseDown = function () {
        }, o.prototype.onMouseMove = function () {
        }, o.prototype.onMouseUp = function () {
        }, Object.defineProperties(o.prototype, {
            object: {
                get: function () {
                    return this.constraint.object
                }
            }, target: {
                get: function () {
                    return this.constraint.target
                }, set: function (t) {
                    console.warn("OrbitControls: target is now immutable. Use target.set() instead."), this.constraint.target.copy(t)
                }
            }, minDistance: {
                get: function () {
                    return this.constraint.minDistance
                }, set: function (t) {
                    this.constraint.minDistance = t
                }
            }, maxDistance: {
                get: function () {
                    return this.constraint.maxDistance
                }, set: function (t) {
                    this.constraint.maxDistance = t
                }
            }, minZoom: {
                get: function () {
                    return this.constraint.minZoom
                }, set: function (t) {
                    this.constraint.minZoom = t
                }
            }, maxZoom: {
                get: function () {
                    return this.constraint.maxZoom
                }, set: function (t) {
                    this.constraint.maxZoom = t
                }
            }, minPolarAngle: {
                get: function () {
                    return this.constraint.minPolarAngle
                }, set: function (t) {
                    this.constraint.minPolarAngle = t
                }
            }, maxPolarAngle: {
                get: function () {
                    return this.constraint.maxPolarAngle
                }, set: function (t) {
                    this.constraint.maxPolarAngle = t
                }
            }, minAzimuthAngle: {
                get: function () {
                    return this.constraint.minAzimuthAngle
                }, set: function (t) {
                    this.constraint.minAzimuthAngle = t
                }
            }, maxAzimuthAngle: {
                get: function () {
                    return this.constraint.maxAzimuthAngle
                }, set: function (t) {
                    this.constraint.maxAzimuthAngle = t
                }
            }, enableDamping: {
                get: function () {
                    return this.constraint.enableDamping
                }, set: function (t) {
                    this.constraint.enableDamping = t
                }
            }, dampingFactor: {
                get: function () {
                    return this.constraint.dampingFactor
                }, set: function (t) {
                    this.constraint.dampingFactor = t
                }
            }, noZoom: {
                get: function () {
                    return console.warn("OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), !this.enableZoom
                }, set: function (t) {
                    console.warn("OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), this.enableZoom = !t
                }
            }, noRotate: {
                get: function () {
                    return console.warn("OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), !this.enableRotate
                }, set: function (t) {
                    console.warn("OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), this.enableRotate = !t
                }
            }, noPan: {
                get: function () {
                    return console.warn("OrbitControls: .noPan has been deprecated. Use .enablePan instead."), !this.enablePan
                }, set: function (t) {
                    console.warn("OrbitControls: .noPan has been deprecated. Use .enablePan instead."), this.enablePan = !t
                }
            }, noKeys: {
                get: function () {
                    return console.warn("OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), !this.enableKeys
                }, set: function (t) {
                    console.warn("OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), this.enableKeys = !t
                }
            }, staticMoving: {
                get: function () {
                    return console.warn("OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), !this.constraint.enableDamping
                }, set: function (t) {
                    console.warn("OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), this.constraint.enableDamping = !t
                }
            }, dynamicDampingFactor: {
                get: function () {
                    return console.warn("OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.constraint.dampingFactor
                }, set: function (t) {
                    console.warn("OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.constraint.dampingFactor = t
                }
            }
        }), t.exports = o
    }()
}, function (t, e, n) {
    function r(t) {
        var e = o.getTexture("textures/waternormals.jpg");
        e.wrapS = e.wrapT = THREE.RepeatWrapping;
        var n = new THREE.Vector3;
        t.light && t.light instanceof THREE.Light ? n.copy(t.light.position) : n.set(-.2, .3, -.5), this.effect = new i(t.renderer, t.camera, {
            color: 16777215,
            waterNormals: e,
            transparent: void 0 !== t.transparent && t.transparent,
            sunDirection: n,
            sunColor: 16777215,
            shininess: 500,
            alpha: .35
        }), t.object ? (THREE.Mesh.call(this, t.object.geometry, this.effect.material), this.position.copy(t.object.position), this.rotation.copy(t.object.rotation), this.scale.copy(t.object.scale)) : (THREE.Mesh.call(this, new THREE.PlaneBufferGeometry(2e3, 2e3, 10, 10), this.effect.material), this.rotation.x = .5 * -Math.PI, this.position.y -= 20), this.add(this.effect)
    }

    var i = n(61), o = n(0);
    r.inherit(THREE.Mesh, {
        update: function (t) {
            this.effect.material.uniforms.time && (this.effect.material.uniforms.time.value += .25 * t.delta), this.effect.update()
        }, render: function () {
            this.effect.render(this.effect.renderer, this.effect.camera)
        }
    }), t.exports = r
}, function (t, e, n) {
    var r = n(62), i = {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
            color: {value: new THREE.Color(5592405)},
            mirrorSampler: {value: null},
            textureMatrix: {value: new THREE.Matrix4},
            normalSampler: {value: null},
            alpha: {value: 1},
            time: {value: 0},
            distortionScale: {value: 20},
            noiseScale: {value: 1},
            sunColor: {value: new THREE.Color(8355711)},
            sunDirection: {value: new THREE.Vector3(.70707, .70707, 0)},
            eye: {value: new THREE.Vector3}
        }]),
        vertexShader: ["uniform mat4 textureMatrix;", "varying vec4 mirrorCoord;", "varying vec3 worldPosition;", "void main() {", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "vec4 worldPos = modelMatrix * vec4( position, 1.0 );", "mirrorCoord = textureMatrix * worldPos;", "worldPosition = worldPos.xyz;", "gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"),
        fragmentShader: ["precision highp float;", "uniform sampler2D mirrorSampler;", "uniform float alpha;", "uniform float time;", "uniform float distortionScale;", "uniform sampler2D normalSampler;", "uniform vec3 sunColor;", "uniform vec3 sunDirection;", "uniform vec3 eye;", "uniform vec3 color;", "varying vec4 mirrorCoord;", "varying vec3 worldPosition;", "vec4 getNoise( vec2 uv )", "{", "float uvScale = 0.5;", "float boot = time * uvScale;", "\tvec2 uv0 = ( uv / 20.0 ) + vec2(boot / 17.0, boot / 29.0);", "\tvec2 uv1 = (uv / 30.0) - vec2( boot / -19.0, boot / 31.0 );", "\tvec2 uv2 = uv / vec2( 9.0, 18.0 ) + vec2( boot / 101.0, boot / 97.0 );", "\tvec2 uv3 = uv / vec2( 13.0, 20.0 ) - vec2( boot / 109.0, boot / -113.0 );", "uv0 /= uvScale;", "uv1 /= uvScale;", "uv2 /= uvScale;", "uv3 /= uvScale;", "\tvec4 noise = texture2D( normalSampler, uv0 ) + texture2D( normalSampler, uv1 ) + texture2D(normalSampler, uv2) + texture2D(normalSampler, uv3);", "\treturn noise * 0.5 - 1.0;", "}", "void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor )", "{", "\tvec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );", "\tfloat direction = max( 0.0, dot( eyeDirection, reflection ) );", "\tspecularColor += pow( direction, shiny ) * sunColor * spec;", "\tdiffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;", "}", THREE.ShaderChunk.common, THREE.ShaderChunk.fog_pars_fragment, "float blendOverlay(float base, float blend) {", "return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );", "}", "void main()", "{", "\tvec4 noise = getNoise( worldPosition.xz );", "\tvec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );", "\tvec3 diffuseLight = vec3(0.0);", "\tvec3 specularLight = vec3(0.0);", "\tvec3 worldToEye = eye - worldPosition;", "\tvec3 eyeDirection = normalize( worldToEye );", "\tsunLight( surfaceNormal, eyeDirection, 200.0, 1.5, 0.5, diffuseLight, specularLight );", "\tfloat distance = length(worldToEye);", "\tvec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;", " vec4 mirrorDistord = mirrorCoord;", " mirrorDistord.x += distortion.x;", " mirrorDistord.w += distortion.y;", "\tvec3 reflectionSample = texture2DProj( mirrorSampler, mirrorDistord ).rgb;", "reflectionSample = vec3(0.565, 0.714, 0.831);", "\tfloat theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );", "\tfloat rf0 = 0.3;", " float d = 1.0 - clamp(distance / 1500.0, 0.0, 1.0);", "\tfloat reflectance = d * clamp(rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 ), 0.0, 1.0);", " reflectance = 1.0;", "\tvec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * color;", "\tvec3 albedo = mix( sunColor * diffuseLight * 0.3 + scatter, ( mix(scatter, reflectionSample, 0.75) + reflectionSample * specularLight ), reflectance );", "\tvec3 outgoingLight = albedo;", THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, max(alpha, specularLight.r) );", "}"].join("\n")
    }, o = function (t, e, n) {
        function i(t, e) {
            return void 0 !== t ? t : e
        }

        this.clipBias = i(n.clipBias, 0), this.alpha = i(n.alpha, 1), this.time = i(n.time, 0), this.normalSampler = i(n.waterNormals, null), this.sunDirection = i(n.sunDirection, new THREE.Vector3(.70707, .70707, 0)), this.sunColor = new THREE.Color(i(n.sunColor, 16777215)), this.eye = i(n.eye, new THREE.Vector3(0, 0, 0)), this.distortionScale = i(n.distortionScale, 10), this.side = i(n.side, THREE.DoubleSide), this.fog = i(n.fog, !1), r.apply(this, arguments), n.transparent && (this.material.transparent = n.transparent), this.material.uniforms.alpha.value = this.alpha, this.material.uniforms.time.value = this.time, this.material.uniforms.normalSampler.value = this.normalSampler, this.material.uniforms.sunColor.value = this.sunColor, this.material.uniforms.sunDirection.value = this.sunDirection, this.material.uniforms.distortionScale.value = this.distortionScale, this.material.uniforms.eye.value = this.eye
    };
    o.prototype = Object.create(r.prototype), o.prototype.constructor = o, o.prototype.initMaterial = function () {
        var t = THREE.UniformsUtils.clone(i.uniforms);
        this.material = new THREE.ShaderMaterial({
            fragmentShader: i.fragmentShader,
            vertexShader: i.vertexShader,
            uniforms: t,
            side: this.side,
            fog: this.fog
        })
    }, o.prototype.updateTextureMatrix = function () {
        r.prototype.updateTextureMatrix.call(this);
        var t = new THREE.Vector3;
        t.setFromMatrixPosition(this.camera.matrixWorld), this.eye = t, this.material.uniforms.eye.value = this.eye
    }, o.prototype.update = function () {
        var t = new THREE.Vector3;
        return function (e) {
            this.updateMatrixWorld(), this.camera.updateMatrixWorld(), t.setFromMatrixPosition(this.camera.matrixWorld), this.eye = t, this.material.uniforms.eye.value = this.eye
        }
    }(), t.exports = o
}, function (t, e) {
    var n = {
        uniforms: {
            color: {value: new THREE.Color(8355711)},
            mirrorSampler: {value: null},
            textureMatrix: {value: new THREE.Matrix4}
        },
        vertexShader: ["uniform mat4 textureMatrix;", "varying vec4 mirrorCoord;", "void main() {", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );", "mirrorCoord = textureMatrix * worldPosition;", "gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"),
        fragmentShader: ["uniform vec3 color;", "uniform sampler2D mirrorSampler;", "varying vec4 mirrorCoord;", "float blendOverlay(float base, float blend) {", "return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );", "}", "void main() {", "vec4 c = texture2DProj(mirrorSampler, mirrorCoord);", "c = vec4(blendOverlay(color.r, c.r), blendOverlay(color.g, c.g), blendOverlay(color.b, c.b), 1.0);", "gl_FragColor = c;", "}"].join("\n")
    }, r = function (t, e, n) {
        THREE.Object3D.call(this), this.name = "mirror_" + this.id, n = n || {}, this.matrixNeedsUpdate = !0;
        var r = void 0 !== n.textureWidth ? n.textureWidth : 512,
            i = void 0 !== n.textureHeight ? n.textureHeight : 512;
        this.clipBias = void 0 !== n.clipBias ? n.clipBias : 0;
        var o = void 0 !== n.color ? new THREE.Color(n.color) : new THREE.Color(8355711);
        if (this.renderer = t, this.mirrorPlane = new THREE.Plane, this.normal = new THREE.Vector3(0, 0, 1), this.mirrorWorldPosition = new THREE.Vector3, this.cameraWorldPosition = new THREE.Vector3, this.rotationMatrix = new THREE.Matrix4, this.lookAtPosition = new THREE.Vector3(0, 0, -1), this.clipPlane = new THREE.Vector4, void 0 !== n.debugMode && n.debugMode) {
            var a = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 10, 16777088),
                s = new THREE.Geometry;
            s.vertices.push(new THREE.Vector3(-10, -10, 0)), s.vertices.push(new THREE.Vector3(10, -10, 0)), s.vertices.push(new THREE.Vector3(10, 10, 0)), s.vertices.push(new THREE.Vector3(-10, 10, 0)), s.vertices.push(s.vertices[0]);
            var c = new THREE.Line(s, new THREE.LineBasicMaterial({color: 16777088}));
            this.add(a), this.add(c)
        }
        e instanceof THREE.PerspectiveCamera ? this.camera = e : (this.camera = new THREE.PerspectiveCamera, console.log(this.name + ": camera is not a Perspective Camera!")), this.textureMatrix = new THREE.Matrix4, this.mirrorCamera = this.camera.clone(), this.mirrorCamera.matrixAutoUpdate = !0;
        var u = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBFormat,
            stencilBuffer: !1
        };
        this.renderTarget = new THREE.WebGLRenderTarget(r, i, u), this.renderTarget2 = new THREE.WebGLRenderTarget(r, i, u), this.initMaterial(), this.material.uniforms.mirrorSampler.value = this.renderTarget.texture, this.material.uniforms.color.value = o, this.material.uniforms.textureMatrix.value = this.textureMatrix, THREE.Math.isPowerOfTwo(r) && THREE.Math.isPowerOfTwo(i) || (this.renderTarget.texture.generateMipmaps = !1, this.renderTarget2.texture.generateMipmaps = !1), this.updateTextureMatrix(), this.render()
    };
    r.prototype = Object.create(THREE.Object3D.prototype), r.prototype.constructor = r, r.prototype.initMaterial = function () {
        var t = THREE.UniformsUtils.clone(n.uniforms);
        this.material = new THREE.ShaderMaterial({
            fragmentShader: n.fragmentShader,
            vertexShader: n.vertexShader,
            uniforms: t
        })
    }, r.prototype.renderWithMirror = function (t) {
        this.updateTextureMatrix(), this.matrixNeedsUpdate = !1;
        var e = t.camera;
        t.camera = this.mirrorCamera, t.renderTemp(), t.material.uniforms.mirrorSampler.value = t.renderTarget2.texture, this.render(), this.matrixNeedsUpdate = !0, t.material.uniforms.mirrorSampler.value = t.renderTarget.texture, t.camera = e, t.updateTextureMatrix()
    }, r.prototype.updateTextureMatrix = function () {
        this.updateMatrixWorld(), this.camera.updateMatrixWorld(), this.mirrorWorldPosition.setFromMatrixPosition(this.matrixWorld), this.cameraWorldPosition.setFromMatrixPosition(this.camera.matrixWorld), this.rotationMatrix.extractRotation(this.matrixWorld), this.normal.set(0, 0, 1), this.normal.applyMatrix4(this.rotationMatrix);
        var t = this.mirrorWorldPosition.clone().sub(this.cameraWorldPosition);
        t.reflect(this.normal).negate(), t.add(this.mirrorWorldPosition), this.rotationMatrix.extractRotation(this.camera.matrixWorld), this.lookAtPosition.set(0, 0, -1), this.lookAtPosition.applyMatrix4(this.rotationMatrix), this.lookAtPosition.add(this.cameraWorldPosition);
        var e = this.mirrorWorldPosition.clone().sub(this.lookAtPosition);
        e.reflect(this.normal).negate(), e.add(this.mirrorWorldPosition), this.up.set(0, -1, 0), this.up.applyMatrix4(this.rotationMatrix), this.up.reflect(this.normal).negate(), this.mirrorCamera.position.copy(t), this.mirrorCamera.up = this.up, this.mirrorCamera.lookAt(e), this.mirrorCamera.updateProjectionMatrix(), this.mirrorCamera.updateMatrixWorld(), this.mirrorCamera.matrixWorldInverse.getInverse(this.mirrorCamera.matrixWorld), this.textureMatrix.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), this.textureMatrix.multiply(this.mirrorCamera.projectionMatrix), this.textureMatrix.multiply(this.mirrorCamera.matrixWorldInverse), this.mirrorPlane.setFromNormalAndCoplanarPoint(this.normal, this.mirrorWorldPosition), this.mirrorPlane.applyMatrix4(this.mirrorCamera.matrixWorldInverse), this.clipPlane.set(this.mirrorPlane.normal.x, this.mirrorPlane.normal.y, this.mirrorPlane.normal.z, this.mirrorPlane.constant);
        var n = new THREE.Vector4, r = this.mirrorCamera.projectionMatrix;
        n.x = (Math.sign(this.clipPlane.x) + r.elements[8]) / r.elements[0], n.y = (Math.sign(this.clipPlane.y) + r.elements[9]) / r.elements[5], n.z = -1, n.w = (1 + r.elements[10]) / r.elements[14];
        var i = new THREE.Vector4;
        i = this.clipPlane.multiplyScalar(2 / this.clipPlane.dot(n)), r.elements[2] = i.x, r.elements[6] = i.y, r.elements[10] = i.z + 1 - this.clipBias, r.elements[14] = i.w
    }, r.prototype.render = function () {
        this.matrixNeedsUpdate && this.updateTextureMatrix(), this.matrixNeedsUpdate = !0;
        for (var t = this; null !== t.parent;) t = t.parent;
        if (void 0 !== t && t instanceof THREE.Scene) {
            var e = this.material.visible;
            this.material.visible = !1, this.renderer.render(t, this.mirrorCamera, this.renderTarget, !0), this.material.visible = e
        }
    }, r.prototype.renderTemp = function () {
        this.matrixNeedsUpdate && this.updateTextureMatrix(), this.matrixNeedsUpdate = !0;
        for (var t = this; null !== t.parent;) t = t.parent;
        void 0 !== t && t instanceof THREE.Scene && this.renderer.render(t, this.mirrorCamera, this.renderTarget2, !0)
    }, t.exports = r
}, function (t, e, n) {
    var r = n(1), i = function () {
        this.shouldPoll = !0, this.buttonPressed = null, $(document).on("keypress", function (t) {
            32 == t.keyCode && this.trigger("press")
        }.bind(this))
    };
    i.prototype = {
        poll: function () {
            this.shouldPoll && (this.gamepads = navigator.getGamepads())
        }, update: function () {
            this.poll(), _.each(this.gamepads, function (t) {
                if (t) for (var e = 0; e < t.buttons.length; e++) {
                    var n = t.buttons[e];
                    n.pressed ? this.buttonPressed = e : null != this.buttonPressed && this.buttonPressed === e && (this.trigger("press"), this.buttonPressed = null)
                }
            }, this)
        }
    }, i.mixin(r), t.exports = i
}, function (t, e, n) {
    var r = n(1), i = function (t) {
        t = t || {}, this.objects = [], this.mouseCoords = {
            x: 0,
            y: 0
        }, this.camera = t.camera, this.vr = t.vr, this.checkFlag = void 0 !== t.checkFlag && t.checkFlag
    };
    i.prototype = {
        add: function (t) {
            _.isArray(t) || (t = [t]), _.each(t, function (t) {
                this.objects.push(t), t.pickable = !0
            }, this)
        }, remove: function (t) {
            for (var e = 0; e < this.objects.length; e++) {
                if (this.objects[e].id === t.id) {
                    this.objects.splice(e, 1);
                    break
                }
            }
        }, clear: function () {
            this.objects = []
        }, clearState: function () {
            this.currentObj && (this.trigger("leave", this.currentObj), this.currentObj = null)
        }, onTap: function () {
            this.currentObj && this.trigger("pick", this.currentObj, this.point)
        }, hitTest: function () {
            var t = new THREE.Raycaster, e = new THREE.Vector3, n = new THREE.Vector3;
            new THREE.Vector3;
            return function (r) {
                var i;
                this.camera.getWorldPosition(n), this.vr || r ? (this.camera.getWorldDirection(e), t.set(n, e)) : t.setFromCamera(this.mouseCoords, this.camera);
                var o = t.intersectObjects(this.objects);
                if (o.length > 0) {
                    var a = _.find(o, function (t) {
                        return this.checkFlag ? void 0 !== t.object.pickable && !0 === t.object.pickable : t.object
                    }, this);
                    a && (this.point = a.point, i = a.object)
                }
                return (i && this.currentObj && this.currentObj !== i || !i && this.currentObj) && (this.trigger("leave", this.currentObj), this.currentObj = null), i && !this.currentObj && (this.trigger("enter", i, this.point), this.currentObj = i), i
            }
        }(), updateMouseCoords: function (t) {
            this.mouseCoords = t
        }, getPoint: function () {
            return this.point
        }
    }, i.mixin(r), t.exports = i
}, function (t, e) {
    var n = ["brown_leather", "fine_touch_leather 1", "yellow_leather"], r = function (t) {
        this.scene = t.scenes[2], this.scenes = t.scenes, this.configurables = t.configurables, this.initMaterials(), this.initObjects(), this.initSpecialProperties()
    };
    r.prototype = {
        initSpecialProperties: function () {
            var t = this.getMaterial("Plant_ALB");
            t && (t.side = THREE.DoubleSide);
            var e = this.getMaterial("glass");
            e && (e.side = THREE.DoubleSide, e.f0Factor = 1, e.depthWrite = !1);
            var n = this.getMaterial("palm_leaves");
            n && (n.side = THREE.DoubleSide, n.depthWrite = !0, n.f0Factor = 1);
            var r = this.getMaterial("tabwood");
            r && (r.f0Factor = 1), _.each(this.scene.materials, function (t) {
                t.pbr && (t.f0Factor = 1)
            });
            var i = this.getMaterial("sansevieria");
            i && (i.side = THREE.DoubleSide);
            var o = this.getMaterial("tripod_lamp");
            o && (o.side = THREE.DoubleSide);
            var a = ["coffee_table_feet", "chair_feet", "door_handle"];
            _.each(this.scenes, function (t) {
                _.each(t.materials, function (t) {
                    !t.pbr || a.indexOf(t.name) > -1 || (t.defines.OCCLUDE_SPECULAR = !0)
                })
            });
            var s = this.getMaterial("pool_interior");
            s && (s.exposure = 1.25), _.each(this.scenes[1].materials, function (t) {
                t.pbr && (t.exposure = 1.2)
            }, this)
        }, initMaterials: function () {
            this.materials = {}, this.configurables.forEach(function (t) {
                var e = t.name, r = this.scene.getObjectByName(e), i = this.getMaterialsForObject(r),
                    o = r.getObjectByName(t.linkedObjects[0]).material, a = o.uniforms.sTextureLightMap.value,
                    s = o.uniforms.sTextureLightMapM.value, c = o.uniforms.sTextureAOMap2.value,
                    u = o.uniforms.sTextureNormalMap2.value, l = r.getObjectByName("materials");
                this.materials[e] = i, i.forEach(function (t) {
                    this.scene.materials[t.uuid] = t, a && (t.lightMap = a, t.lightMapM = s, t.defines.USE_LIGHTMAP = !0), c && (t.uniforms.sTextureAOMap2.value = c, t.defines.USE_AOMAP2 = !0), u && (t.uniforms.sTextureNormalMap2.value = u, t.defines.USE_NORMALMAP2 = !0), t.needsUpdate = !0, n.indexOf(t.name) < 0 && (t.ignoreDirLight = !0)
                }, this), n.indexOf(o.name) < 0 && (o.ignoreDirLight = !0), l.traverse(function (t) {
                    t.visible = !1
                })
            }, this)
        }, initObjects: function () {
            this.objects = {}, this.configurables.forEach(function (t) {
                this.objects[t.name] = [], t.linkedObjects.forEach(function (e) {
                    var n = this.getChildByName(this.scene.getObjectByName(t.name), e);
                    this.objects[t.name] = this.objects[t.name].concat(n)
                }, this)
            }, this)
        }, setObjectMaterial: function (t, e) {
            var n = this.materials[t.name][e];
            this.crossFadeMaterial(this.objects[t.name], n)
        }, crossFadeMaterial: function () {
            var t = new TWEEN.Tween, e = {opacity: 0};
            return function (n, r) {
                if (this.crossFade) return void this.crossFade.onComplete(function () {
                    n.forEach(function (t) {
                        t.material = this.currentFadingMaterial, t.parent.remove(t.materialClone), t.materialClone = null
                    }, this), this.currentFadingMaterial.transparent = !1, this.currentFadingMaterial.depthWrite = !0, e.opacity = 0, this.crossFade = null, r !== this.currentFadingMaterial && this.crossFadeMaterial(n, r)
                }.bind(this));
                this.currentFadingMaterial = r, n.forEach(function (t) {
                    var e = t.clone();
                    t.parent.add(e), t.materialClone = e, t.targetMaterial = r, e.material = r
                }), r.transparent = !0, r.depthWrite = !1, r.opacity = 0;
                var i = function () {
                    n.forEach(function (t) {
                        t.material = r, t.parent.remove(t.materialClone), t.materialClone = null
                    }), e.opacity = 0, r.transparent = !1, r.depthWrite = !0, this.crossFade = null
                };
                this.crossFade = t.reset(e).to({opacity: 1}, 300).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                    r.opacity = e.opacity
                }).onComplete(i.bind(this)).onStop(i.bind(this)).start()
            }
        }(), getMaterial: function (t) {
            for (var e, n = 0; n < this.scenes.length && !(e = _.find(this.scenes[n].materials, function (e) {
                return e.name === t
            })); n++) ;
            return e
        }, getMaterialsForObject: function (t) {
            if (t) {
                var e = t.getObjectByName("materials");
                if (e) return _.map(e.children, function (t) {
                    return t.children.length > 0 ? t.children[0].material.clone() : t.material.clone()
                })
            }
        }, getChildByName: function (t, e) {
            var n = [];
            return t.traverse(function (t) {
                t.name === e && n.push(t)
            }), n
        }, getObjectsByName: function (t, e) {
            var n = [];
            return t.traverse(function (t) {
                t.name === e && n.push(t)
            }), n
        }
    }, t.exports = r
}, function (t, e, n) {
    var r = n(2), i = (n(4), n(0), function (t) {
        t = Object.assign({
            vertexShader: n(67),
            fragmentShader: n(68),
            uniforms: {
                diffuse: {type: "c", value: new THREE.Color(16777215)},
                map: {type: "t", value: null},
                offsetRepeat: {type: "v4", value: new THREE.Vector4(0, 0, 1, 1)},
                opacity: {type: "f", value: 1},
                threshold: {type: "f", value: 0},
                range: {type: "f", value: .1},
                noiseMap: {type: "t", value: null}
            }
        }, t), r.call(this, t), Object.keys(this.uniforms).forEach(function (t) {
            this.onPropertyChange(t, function (e) {
                this.uniforms[t].value = e
            })
        }, this), this.threshold = 0, this.sign = 1, this.lastUpdate = 0
    });
    i.inherit(r, {
        clone: function (t) {
            var e = t || new i;
            return r.prototype.clone.call(this, e), e.name = this.name, e.transparent = this.transparent, _.each(this.uniforms, function (t, n) {
                var r = t.type;
                "v2" === r || "m4" === r ? e.uniforms[n].value.copy(t.value) : e.uniforms[n].value = t.value
            }, this), e
        }, updateUniforms: function (t) {
            this.uniforms.threshold.value += .35 * t.delta
        }
    }), t.exports = i
}, function (t, e) {
    t.exports = "#ifdef USE_MAP\n  varying vec2 vUv;\n  uniform vec4 offsetRepeat;\n#endif\n\nvoid main() {\n  #ifdef USE_MAP\n    vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n  #endif\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}"
}, function (t, e) {
    t.exports = "#ifdef USE_MAP\n  varying vec2 vUv;\n\n  uniform sampler2D map;\n#endif\n\nuniform sampler2D noiseMap;\n\nuniform vec3 diffuse;\nuniform float opacity;\nuniform float threshold;\nuniform float range;\n\nconst vec3 white = vec3(1.0);\n\nvoid main() {\n  gl_FragColor = vec4(diffuse, opacity);\n\n  #ifdef USE_MAP\n    vec4 mapTexel = texture2D(map, vUv);\n  #endif\n\n  vec3 noise = texture2D(noiseMap, vUv).rgb;\n\n  float v = fract(noise.r + threshold * 0.75);\n  v = step(0.9, v);\n\n  float alpha = step(0.5, (v * mapTexel.a));\n\n  gl_FragColor = vec4(white, alpha);\n}\n"
}, function (t, e, n) {
    var r = function () {
        this.target = new THREE.WebGLRenderTarget(512, 512, {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBFormat
        }), this.target.texture.generateMipmaps = !1, this.material = new THREE.ShaderMaterial({
            vertexShader: n(70),
            fragmentShader: n(71)
        }), this.scene = new THREE.Scene, this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        var t = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
        this.scene.add(t)
    };
    r.prototype = {
        render: function (t) {
            t.render(this.scene, this.camera, this.target)
        }
    }, t.exports = r
}, function (t, e) {
    t.exports = "varying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}"
}, function (t, e) {
    t.exports = "varying vec2 vUv;\n\nfloat rand(vec2 co) {\n  return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n  gl_FragColor = vec4(vec3(rand(vUv)), 1.0);\n}"
}, function (t, e, n) {
    var r = n(2), i = (n(4), function (t) {
        t = Object.assign({
            vertexShader: n(73),
            fragmentShader: n(74),
            uniforms: {
                diffuse: {type: "c", value: new THREE.Color(16777215)},
                map: {type: "t", value: null},
                offsetRepeat: {type: "v4", value: new THREE.Vector4(0, 0, 1, 1)},
                opacity: {type: "f", value: 1},
                bias: {type: "f", value: 0}
            }
        }, t), r.call(this, t), Object.keys(this.uniforms).forEach(function (t) {
            this.onPropertyChange(t, function (e) {
                this.uniforms[t].value = e
            })
        }, this), this.transparent = t.transparent
    });
    i.inherit(r), t.exports = i
}, function (t, e) {
    t.exports = "#ifdef USE_MAP\n  varying vec2 vUv;\n  uniform vec4 offsetRepeat;\n#endif\n\nvoid main() {\n  #ifdef USE_MAP\n    vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n  #endif\n\n  gl_Position = vec4(position.x, position.y, 0.0, 1.0);\n}"
}, function (t, e) {
    t.exports = "#ifdef USE_MAP\n  varying vec2 vUv;\n\n  uniform sampler2D map;\n#endif\n\nuniform vec3 diffuse;\nuniform float opacity;\nuniform float bias;\n\nvoid main() {\n  gl_FragColor = vec4(diffuse, opacity);\n\n  #ifdef USE_MAP\n    vec4 mapTexel = texture2D(map, vUv, bias);\n\n    gl_FragColor *= mapTexel;\n  #endif\n}"
}, function (t, e) {
    t.exports = [{
        name: "fauteuil",
        linkedObjects: ["seat_main"],
        panel_data: {
            name: "OSCAR",
            type: "LOUNGE SEAT",
            dimensions: "100 x 94 x 97 cm",
            materials: ["Blue Leather", "Grey Knit Fabric", "Blue Knit Fabric", "Dark Grey Cotton"]
        },
        minDistance: 1,
        maxDistance: 2
    }, {
        name: "fauteuil2",
        linkedObjects: ["seat_main"],
        panel_data: {
            name: "OSCAR",
            type: "LOUNGE SEAT",
            dimensions: "100 x 94 x 97 cm",
            materials: ["Blue Leather", "Grey Knit Fabric", "Blue Knit Fabric", "Dark Grey Cotton"]
        },
        minDistance: 1,
        maxDistance: 2
    }, {
        name: "table",
        linkedObjects: ["table_top"],
        panel_data: {
            name: "CHLOE",
            type: "DINING TABLE",
            dimensions: "180 x 90 x 75 cm",
            materials: ["Ash Wood", "Walnut", "Grey Blue Granite", "Painted Metal"]
        },
        minDistance: 1.65,
        maxDistance: 2.55
    }, {
        name: "coffee_table",
        linkedObjects: ["board"],
        panel_data: {
            name: "ELENA",
            type: "COFFEE TABLE",
            dimensions: "120 x 120 x 35 cm",
            materials: ["Natural Beech Wood", "Vintage Plastic", "Glossy White", "Polished Copper"]
        },
        minDistance: .95,
        maxDistance: 1.6
    }, {
        name: "canape",
        linkedObjects: ["sofa_main"],
        panel_data: {
            name: "BARNEY",
            type: "LOUNGE SOFA",
            dimensions: "274 x 95 x 83 cm",
            materials: ["White Bull Leather", "Brown Leather", "Grey Fabric", "Dark Grey Cotton"]
        },
        minDistance: 2,
        maxDistance: 3
    }, {
        name: "suspended_lamp",
        linkedObjects: ["suspended_lamp"],
        panel_data: {
            name: "SARAH",
            type: "PENDANT LAMP",
            dimensions: "35 x 35 x 30 cm",
            materials: ["Black & Gold", "Glossy White", "Glossy Blue", "Yellow Rubber"]
        },
        minDistance: 1,
        maxDistance: 2
    }]
}, function (t, e) {
    t.exports = ".js"
}]);
