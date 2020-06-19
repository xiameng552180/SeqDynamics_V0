! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.eventDrops = e()
}(this, function() {
    "use strict";
    var je = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function t(t, e) {
        return t(e = {
            exports: {}
        }, e.exports), e.exports
    }
    var L = t(function(t, e) {
            var o = 200,
                r = "__lodash_hash_undefined__",
                n = 9007199254740991,
                j = "[object Arguments]",
                u = "[object Array]",
                T = "[object Boolean]",
                M = "[object Date]",
                a = "[object Error]",
                x = "[object Function]",
                D = "[object GeneratorFunction]",
                C = "[object Map]",
                A = "[object Number]",
                U = "[object Object]",
                i = "[object Promise]",
                O = "[object RegExp]",
                F = "[object Set]",
                S = "[object String]",
                Y = "[object Symbol]",
                c = "[object WeakMap]",
                H = "[object ArrayBuffer]",
                k = "[object DataView]",
                L = "[object Float32Array]",
                E = "[object Float64Array]",
                I = "[object Int8Array]",
                z = "[object Int16Array]",
                $ = "[object Int32Array]",
                W = "[object Uint8Array]",
                Z = "[object Uint8ClampedArray]",
                P = "[object Uint16Array]",
                B = "[object Uint32Array]",
                V = /\w*$/,
                f = /^\[object .+?Constructor\]$/,
                l = /^(?:0|[1-9]\d*)$/,
                s = {};
            s[L] = s[E] = s[I] = s[z] = s[$] = s[W] = s[Z] = s[P] = s[B] = !0, s[j] = s[u] = s[H] = s[T] = s[k] = s[M] = s[a] = s[x] = s[C] = s[A] = s[U] = s[O] = s[F] = s[S] = s[c] = !1;
            var J = {};
            J[j] = J[u] = J[H] = J[k] = J[T] = J[M] = J[L] = J[E] = J[I] = J[z] = J[$] = J[C] = J[A] = J[U] = J[O] = J[F] = J[S] = J[Y] = J[W] = J[Z] = J[P] = J[B] = !0, J[a] = J[x] = J[c] = !1;
            var h = "object" == typeof je && je && je.Object === Object && je,
                d = "object" == typeof self && self && self.Object === Object && self,
                p = h || d || Function("return this")(),
                v = e && !e.nodeType && e,
                g = v && t && !t.nodeType && t,
                y = g && g.exports === v,
                _ = y && h.process,
                m = function() {
                    try {
                        return _ && _.binding("util")
                    } catch (t) {}
                }(),
                b = m && m.isTypedArray;

            function X(t, e) {
                return t.set(e[0], e[1]), t
            }

            function N(t, e) {
                return t.add(e), t
            }

            function w(t, e, n) {
                switch (n.length) {
                    case 0:
                        return t.call(e);
                    case 1:
                        return t.call(e, n[0]);
                    case 2:
                        return t.call(e, n[0], n[1]);
                    case 3:
                        return t.call(e, n[0], n[1], n[2])
                }
                return t.apply(e, n)
            }

            function Q(t, e) {
                for (var n = -1, r = t ? t.length : 0; ++n < r && !1 !== e(t[n], n, t););
                return t
            }

            function R(t, e, n, r) {
                var o = -1,
                    u = t ? t.length : 0;
                for (r && u && (n = t[++o]); ++o < u;) n = e(n, t[o], o, t);
                return n
            }

            function G(t) {
                var e = !1;
                if (null != t && "function" != typeof t.toString) try {
                    e = !!(t + "")
                } catch (t) {}
                return e
            }

            function q(t) {
                var n = -1,
                    r = Array(t.size);
                return t.forEach(function(t, e) {
                    r[++n] = [e, t]
                }), r
            }

            function K(e, n) {
                return function(t) {
                    return e(n(t))
                }
            }

            function tt(t) {
                var e = -1,
                    n = Array(t.size);
                return t.forEach(function(t) {
                    n[++e] = t
                }), n
            }
            var et, nt = Array.prototype,
                rt = Function.prototype,
                ot = Object.prototype,
                ut = p["__core-js_shared__"],
                at = (et = /[^.]+$/.exec(ut && ut.keys && ut.keys.IE_PROTO || "")) ? "Symbol(src)_1." + et : "",
                it = rt.toString,
                ct = ot.hasOwnProperty,
                ft = it.call(Object),
                lt = ot.toString,
                st = RegExp("^" + it.call(ct).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                ht = y ? p.Buffer : void 0,
                dt = p.Symbol,
                pt = p.Uint8Array,
                vt = K(Object.getPrototypeOf, Object),
                gt = Object.create,
                yt = ot.propertyIsEnumerable,
                _t = nt.splice,
                mt = Object.getOwnPropertySymbols,
                bt = ht ? ht.isBuffer : void 0,
                wt = K(Object.keys, Object),
                jt = Math.max,
                Tt = Kt(p, "DataView"),
                Mt = Kt(p, "Map"),
                xt = Kt(p, "Promise"),
                Dt = Kt(p, "Set"),
                Ct = Kt(p, "WeakMap"),
                At = Kt(Object, "create"),
                Ut = ue(Tt),
                Ot = ue(Mt),
                Ft = ue(xt),
                St = ue(Dt),
                Yt = ue(Ct),
                Ht = dt ? dt.prototype : void 0,
                kt = Ht ? Ht.valueOf : void 0;

            function Lt(t) {
                var e = -1,
                    n = t ? t.length : 0;
                for (this.clear(); ++e < n;) {
                    var r = t[e];
                    this.set(r[0], r[1])
                }
            }

            function Et(t) {
                var e = -1,
                    n = t ? t.length : 0;
                for (this.clear(); ++e < n;) {
                    var r = t[e];
                    this.set(r[0], r[1])
                }
            }

            function It(t) {
                var e = -1,
                    n = t ? t.length : 0;
                for (this.clear(); ++e < n;) {
                    var r = t[e];
                    this.set(r[0], r[1])
                }
            }

            function zt(t) {
                this.__data__ = new Et(t)
            }

            function $t(t, e) {
                var n = ce(t) || ie(t) ? function(t, e) {
                        for (var n = -1, r = Array(t); ++n < t;) r[n] = e(n);
                        return r
                    }(t.length, String) : [],
                    r = n.length,
                    o = !!r;
                for (var u in t) !e && !ct.call(t, u) || o && ("length" == u || ne(u, r)) || n.push(u);
                return n
            }

            function Wt(t, e, n) {
                (void 0 === n || ae(t[e], n)) && ("number" != typeof e || void 0 !== n || e in t) || (t[e] = n)
            }

            function Zt(t, e, n) {
                var r = t[e];
                ct.call(t, e) && ae(r, n) && (void 0 !== n || e in t) || (t[e] = n)
            }

            function Pt(t, e) {
                for (var n = t.length; n--;)
                    if (ae(t[n][0], e)) return n;
                return -1
            }

            function Bt(n, r, o, u, t, e, a) {
                var i;
                if (u && (i = e ? u(n, t, e, a) : u(n)), void 0 !== i) return i;
                if (!pe(n)) return n;
                var c, f, l, s, h, d, p = ce(n);
                if (p) {
                    if (i = function(t) {
                            var e = t.length,
                                n = t.constructor(e);
                            e && "string" == typeof t[0] && ct.call(t, "index") && (n.index = t.index, n.input = t.input);
                            return n
                        }(n), !r) return Rt(n, i)
                } else {
                    var v = ee(n),
                        g = v == x || v == D;
                    if (se(n)) return function(t, e) {
                        if (e) return t.slice();
                        var n = new t.constructor(t.length);
                        return t.copy(n), n
                    }(n, r);
                    if (v == U || v == j || g && !e) {
                        if (G(n)) return e ? n : {};
                        if (i = "function" != typeof(h = g ? {} : n).constructor || re(h) ? {} : pe(d = vt(h)) ? gt(d) : {}, !r) return s = c = n, f = (l = i) && Gt(s, me(s), l), Gt(c, te(c), f)
                    } else {
                        if (!J[v]) return e ? n : {};
                        i = function(t, e, n, r) {
                            var o = t.constructor;
                            switch (e) {
                                case H:
                                    return Qt(t);
                                case T:
                                case M:
                                    return new o(+t);
                                case k:
                                    return p = t, v = r ? Qt(p.buffer) : p.buffer, new p.constructor(v, p.byteOffset, p.byteLength);
                                case L:
                                case E:
                                case I:
                                case z:
                                case $:
                                case W:
                                case Z:
                                case P:
                                case B:
                                    return h = t, d = r ? Qt(h.buffer) : h.buffer, new h.constructor(d, h.byteOffset, h.length);
                                case C:
                                    return l = t, s = n, R(r ? s(q(l), !0) : q(l), X, new l.constructor);
                                case A:
                                case S:
                                    return new o(t);
                                case O:
                                    return (f = new(c = t).constructor(c.source, V.exec(c))).lastIndex = c.lastIndex, f;
                                case F:
                                    return a = t, i = n, R(r ? i(tt(a), !0) : tt(a), N, new a.constructor);
                                case Y:
                                    return u = t, kt ? Object(kt.call(u)) : {}
                            }
                            var u;
                            var a, i;
                            var c, f;
                            var l, s;
                            var h, d;
                            var p, v
                        }(n, v, Bt, r)
                    }
                }
                a || (a = new zt);
                var y, _, m, b = a.get(n);
                if (b) return b;
                if (a.set(n, i), !p) var w = o ? (_ = te, m = me(y = n), ce(y) ? m : function(t, e) {
                    for (var n = -1, r = e.length, o = t.length; ++n < r;) t[o + n] = e[n];
                    return t
                }(m, _(y))) : me(n);
                return Q(w || n, function(t, e) {
                    w && (t = n[e = t]), Zt(i, e, Bt(t, r, o, u, e, n, a))
                }), i
            }

            function Vt(t) {
                return !(!pe(t) || (e = t, at && at in e)) && (he(t) || G(t) ? st : f).test(ue(t));
                var e
            }

            function Jt(t) {
                if (!pe(t)) return function(t) {
                    var e = [];
                    if (null != t)
                        for (var n in Object(t)) e.push(n);
                    return e
                }(t);
                var e = re(t),
                    n = [];
                for (var r in t)("constructor" != r || !e && ct.call(t, r)) && n.push(r);
                return n
            }

            function Xt(r, o, u, a, i) {
                if (r !== o) {
                    if (!ce(o) && !ye(o)) var c = Jt(o);
                    Q(c || o, function(t, e) {
                        if (c && (t = o[e = t]), pe(t)) i || (i = new zt),
                            function(t, e, n, r, o, u, a) {
                                var i = t[n],
                                    c = e[n],
                                    f = a.get(c);
                                if (f) return Wt(t, n, f);
                                var l = u ? u(i, c, n + "", t, e, a) : void 0,
                                    s = void 0 === l;
                                s && (ce(l = c) || ye(c) ? l = ce(i) ? i : le(i) ? Rt(i) : Bt(c, !(s = !1)) : function(t) {
                                    if (!ve(t) || lt.call(t) != U || G(t)) return !1;
                                    var e = vt(t);
                                    if (null === e) return !0;
                                    var n = ct.call(e, "constructor") && e.constructor;
                                    return "function" == typeof n && n instanceof n && it.call(n) == ft
                                }(c) || ie(c) ? l = ie(i) ? Gt(h = i, fe(d = h) ? $t(d, !0) : Jt(d)) : !pe(i) || r && he(i) ? Bt(c, !(s = !1)) : i : s = !1);
                                var h, d;
                                s && (a.set(c, l), o(l, c, r, u, a), a.delete(c));
                                Wt(t, n, l)
                            }(r, o, e, u, Xt, a, i);
                        else {
                            var n = a ? a(r[e], t, e + "", r, o, i) : void 0;
                            void 0 === n && (n = t), Wt(r, e, n)
                        }
                    })
                }
            }

            function Nt(u, a) {
                return a = jt(void 0 === a ? u.length - 1 : a, 0),
                    function() {
                        for (var t = arguments, e = -1, n = jt(t.length - a, 0), r = Array(n); ++e < n;) r[e] = t[a + e];
                        e = -1;
                        for (var o = Array(a + 1); ++e < a;) o[e] = t[e];
                        return o[a] = r, w(u, this, o)
                    }
            }

            function Qt(t) {
                var e = new t.constructor(t.byteLength);
                return new pt(e).set(new pt(t)), e
            }

            function Rt(t, e) {
                var n = -1,
                    r = t.length;
                for (e || (e = Array(r)); ++n < r;) e[n] = t[n];
                return e
            }

            function Gt(t, e, n, r) {
                n || (n = {});
                for (var o = -1, u = e.length; ++o < u;) {
                    var a = e[o],
                        i = r ? r(n[a], t[a], a, n, t) : void 0;
                    Zt(n, a, void 0 === i ? t[a] : i)
                }
                return n
            }

            function qt(t, e) {
                var n, r, o = t.__data__;
                return ("string" == (r = typeof(n = e)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? o["string" == typeof e ? "string" : "hash"] : o.map
            }

            function Kt(t, e) {
                var n, r, o = (r = e, null == (n = t) ? void 0 : n[r]);
                return Vt(o) ? o : void 0
            }
            Lt.prototype.clear = function() {
                this.__data__ = At ? At(null) : {}
            }, Lt.prototype.delete = function(t) {
                return this.has(t) && delete this.__data__[t]
            }, Lt.prototype.get = function(t) {
                var e = this.__data__;
                if (At) {
                    var n = e[t];
                    return n === r ? void 0 : n
                }
                return ct.call(e, t) ? e[t] : void 0
            }, Lt.prototype.has = function(t) {
                var e = this.__data__;
                return At ? void 0 !== e[t] : ct.call(e, t)
            }, Lt.prototype.set = function(t, e) {
                return this.__data__[t] = At && void 0 === e ? r : e, this
            }, Et.prototype.clear = function() {
                this.__data__ = []
            }, Et.prototype.delete = function(t) {
                var e = this.__data__,
                    n = Pt(e, t);
                return !(n < 0 || (n == e.length - 1 ? e.pop() : _t.call(e, n, 1), 0))
            }, Et.prototype.get = function(t) {
                var e = this.__data__,
                    n = Pt(e, t);
                return n < 0 ? void 0 : e[n][1]
            }, Et.prototype.has = function(t) {
                return -1 < Pt(this.__data__, t)
            }, Et.prototype.set = function(t, e) {
                var n = this.__data__,
                    r = Pt(n, t);
                return r < 0 ? n.push([t, e]) : n[r][1] = e, this
            }, It.prototype.clear = function() {
                this.__data__ = {
                    hash: new Lt,
                    map: new(Mt || Et),
                    string: new Lt
                }
            }, It.prototype.delete = function(t) {
                return qt(this, t).delete(t)
            }, It.prototype.get = function(t) {
                return qt(this, t).get(t)
            }, It.prototype.has = function(t) {
                return qt(this, t).has(t)
            }, It.prototype.set = function(t, e) {
                return qt(this, t).set(t, e), this
            }, zt.prototype.clear = function() {
                this.__data__ = new Et
            }, zt.prototype.delete = function(t) {
                return this.__data__.delete(t)
            }, zt.prototype.get = function(t) {
                return this.__data__.get(t)
            }, zt.prototype.has = function(t) {
                return this.__data__.has(t)
            }, zt.prototype.set = function(t, e) {
                var n = this.__data__;
                if (n instanceof Et) {
                    var r = n.__data__;
                    if (!Mt || r.length < o - 1) return r.push([t, e]), this;
                    n = this.__data__ = new It(r)
                }
                return n.set(t, e), this
            };
            var te = mt ? K(mt, Object) : function() {
                    return []
                },
                ee = function(t) {
                    return lt.call(t)
                };

            function ne(t, e) {
                return !!(e = null == e ? n : e) && ("number" == typeof t || l.test(t)) && -1 < t && t % 1 == 0 && t < e
            }

            function re(t) {
                var e = t && t.constructor;
                return t === ("function" == typeof e && e.prototype || ot)
            }

            function oe(t, e, n, r, o, u) {
                return pe(t) && pe(e) && (u.set(e, t), Xt(t, e, void 0, oe, u), u.delete(e)), t
            }

            function ue(t) {
                if (null != t) {
                    try {
                        return it.call(t)
                    } catch (t) {}
                    try {
                        return t + ""
                    } catch (t) {}
                }
                return ""
            }

            function ae(t, e) {
                return t === e || t != t && e != e
            }

            function ie(t) {
                return le(t) && ct.call(t, "callee") && (!yt.call(t, "callee") || lt.call(t) == j)
            }(Tt && ee(new Tt(new ArrayBuffer(1))) != k || Mt && ee(new Mt) != C || xt && ee(xt.resolve()) != i || Dt && ee(new Dt) != F || Ct && ee(new Ct) != c) && (ee = function(t) {
                var e = lt.call(t),
                    n = e == U ? t.constructor : void 0,
                    r = n ? ue(n) : void 0;
                if (r) switch (r) {
                    case Ut:
                        return k;
                    case Ot:
                        return C;
                    case Ft:
                        return i;
                    case St:
                        return F;
                    case Yt:
                        return c
                }
                return e
            });
            var ce = Array.isArray;

            function fe(t) {
                return null != t && de(t.length) && !he(t)
            }

            function le(t) {
                return ve(t) && fe(t)
            }
            var se = bt || function() {
                return !1
            };

            function he(t) {
                var e = pe(t) ? lt.call(t) : "";
                return e == x || e == D
            }

            function de(t) {
                return "number" == typeof t && -1 < t && t % 1 == 0 && t <= n
            }

            function pe(t) {
                var e = typeof t;
                return !!t && ("object" == e || "function" == e)
            }

            function ve(t) {
                return !!t && "object" == typeof t
            }
            var ge, ye = b ? (ge = b, function(t) {
                return ge(t)
            }) : function(t) {
                return ve(t) && de(t.length) && !!s[lt.call(t)]
            };
            var _e = Nt(function(t) {
                return t.push(void 0, oe), w(we, void 0, t)
            });

            function me(t) {
                return fe(t) ? $t(t) : function(t) {
                    if (!re(t)) return wt(t);
                    var e = [];
                    for (var n in Object(t)) ct.call(t, n) && "constructor" != n && e.push(n);
                    return e
                }(t)
            }
            var be, we = (be = function(t, e, n, r) {
                Xt(t, e, n, r)
            }, Nt(function(t, e) {
                var n = -1,
                    r = e.length,
                    o = 1 < r ? e[r - 1] : void 0,
                    u = 2 < r ? e[2] : void 0;
                for (o = 3 < be.length && "function" == typeof o ? (r--, o) : void 0, u && function(t, e, n) {
                        if (!pe(n)) return !1;
                        var r = typeof e;
                        return !!("number" == r ? fe(n) && ne(e, n.length) : "string" == r && e in n) && ae(n[e], t)
                    }(e[0], e[1], u) && (o = r < 3 ? void 0 : o, r = 1), t = Object(t); ++n < r;) {
                    var a = e[n];
                    a && be(t, a, n, o)
                }
                return t
            }));
            t.exports = _e
        }),
        o = new Date,
        c = new Date;

    function f(u, a, n, r) {
        function i(t) {
            return u(t = new Date(+t)), t
        }
        return (i.floor = i).ceil = function(t) {
            return u(t = new Date(t - 1)), a(t, 1), u(t), t
        }, i.round = function(t) {
            var e = i(t),
                n = i.ceil(t);
            return t - e < n - t ? e : n
        }, i.offset = function(t, e) {
            return a(t = new Date(+t), null == e ? 1 : Math.floor(e)), t
        }, i.range = function(t, e, n) {
            var r, o = [];
            if (t = i.ceil(t), n = null == n ? 1 : Math.floor(n), !(t < e && 0 < n)) return o;
            for (; o.push(r = new Date(+t)), a(t, n), u(t), r < t && t < e;);
            return o
        }, i.filter = function(n) {
            return f(function(t) {
                if (t <= t)
                    for (; u(t), !n(t);) t.setTime(t - 1)
            }, function(t, e) {
                if (t <= t)
                    if (e < 0)
                        for (; ++e <= 0;)
                            for (; a(t, -1), !n(t););
                    else
                        for (; 0 <= --e;)
                            for (; a(t, 1), !n(t););
            })
        }, n && (i.count = function(t, e) {
            return o.setTime(+t), c.setTime(+e), u(o), u(c), Math.floor(n(o, c))
        }, i.every = function(e) {
            return e = Math.floor(e), isFinite(e) && 0 < e ? 1 < e ? i.filter(r ? function(t) {
                return r(t) % e == 0
            } : function(t) {
                return i.count(0, t) % e == 0
            }) : i : null
        }), i
    }
    var e = f(function() {}, function(t, e) {
        t.setTime(+t + e)
    }, function(t, e) {
        return e - t
    });
    e.every = function(n) {
        return n = Math.floor(n), isFinite(n) && 0 < n ? 1 < n ? f(function(t) {
            t.setTime(Math.floor(t / n) * n)
        }, function(t, e) {
            t.setTime(+t + e * n)
        }, function(t, e) {
            return (e - t) / n
        }) : e : null
    };
    var n = 1e3,
        r = 6e4,
        u = 36e5,
        a = 6048e5,
        x = (f(function(t) {
            t.setTime(Math.floor(t / n) * n)
        }, function(t, e) {
            t.setTime(+t + e * n)
        }, function(t, e) {
            return (e - t) / n
        }, function(t) {
            return t.getUTCSeconds()
        }), f(function(t) {
            t.setTime(Math.floor(t / r) * r)
        }, function(t, e) {
            t.setTime(+t + e * r)
        }, function(t, e) {
            return (e - t) / r
        }, function(t) {
            return t.getMinutes()
        }), f(function(t) {
            var e = t.getTimezoneOffset() * r % u;
            e < 0 && (e += u), t.setTime(Math.floor((+t - e) / u) * u + e)
        }, function(t, e) {
            t.setTime(+t + e * u)
        }, function(t, e) {
            return (e - t) / u
        }, function(t) {
            return t.getHours()
        }), f(function(t) {
            t.setHours(0, 0, 0, 0)
        }, function(t, e) {
            t.setDate(t.getDate() + e)
        }, function(t, e) {
            return (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * r) / 864e5
        }, function(t) {
            return t.getDate() - 1
        }));

    function i(e) {
        return f(function(t) {
            t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0)
        }, function(t, e) {
            t.setDate(t.getDate() + 7 * e)
        }, function(t, e) {
            return (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * r) / a
        })
    }
    var l = i(0),
        D = i(1),
        s = (i(2), i(3), i(4)),
        h = (i(5), i(6), f(function(t) {
            t.setDate(1), t.setHours(0, 0, 0, 0)
        }, function(t, e) {
            t.setMonth(t.getMonth() + e)
        }, function(t, e) {
            return e.getMonth() - t.getMonth() + 12 * (e.getFullYear() - t.getFullYear())
        }, function(t) {
            return t.getMonth()
        }), f(function(t) {
            t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
        }, function(t, e) {
            t.setFullYear(t.getFullYear() + e)
        }, function(t, e) {
            return e.getFullYear() - t.getFullYear()
        }, function(t) {
            return t.getFullYear()
        }));
    h.every = function(n) {
        return isFinite(n = Math.floor(n)) && 0 < n ? f(function(t) {
            t.setFullYear(Math.floor(t.getFullYear() / n) * n), t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
        }, function(t, e) {
            t.setFullYear(t.getFullYear() + e * n)
        }) : null
    };
    f(function(t) {
        t.setUTCSeconds(0, 0)
    }, function(t, e) {
        t.setTime(+t + e * r)
    }, function(t, e) {
        return (e - t) / r
    }, function(t) {
        return t.getUTCMinutes()
    }), f(function(t) {
        t.setUTCMinutes(0, 0, 0)
    }, function(t, e) {
        t.setTime(+t + e * u)
    }, function(t, e) {
        return (e - t) / u
    }, function(t) {
        return t.getUTCHours()
    });
    var C = f(function(t) {
        t.setUTCHours(0, 0, 0, 0)
    }, function(t, e) {
        t.setUTCDate(t.getUTCDate() + e)
    }, function(t, e) {
        return (e - t) / 864e5
    }, function(t) {
        return t.getUTCDate() - 1
    });

    function d(e) {
        return f(function(t) {
            t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0)
        }, function(t, e) {
            t.setUTCDate(t.getUTCDate() + 7 * e)
        }, function(t, e) {
            return (e - t) / a
        })
    }
    var p = d(0),
        A = d(1),
        v = (d(2), d(3), d(4)),
        g = (d(5), d(6), f(function(t) {
            t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
        }, function(t, e) {
            t.setUTCMonth(t.getUTCMonth() + e)
        }, function(t, e) {
            return e.getUTCMonth() - t.getUTCMonth() + 12 * (e.getUTCFullYear() - t.getUTCFullYear())
        }, function(t) {
            return t.getUTCMonth()
        }), f(function(t) {
            t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
        }, function(t, e) {
            t.setUTCFullYear(t.getUTCFullYear() + e)
        }, function(t, e) {
            return e.getUTCFullYear() - t.getUTCFullYear()
        }, function(t) {
            return t.getUTCFullYear()
        }));

    function U(t) {
        if (0 <= t.y && t.y < 100) {
            var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
            return e.setFullYear(t.y), e
        }
        return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L)
    }

    function O(t) {
        if (0 <= t.y && t.y < 100) {
            var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
            return e.setUTCFullYear(t.y), e
        }
        return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
    }

    function F(t) {
        return {
            y: t,
            m: 0,
            d: 1,
            H: 0,
            M: 0,
            S: 0,
            L: 0
        }
    }
    g.every = function(n) {
        return isFinite(n = Math.floor(n)) && 0 < n ? f(function(t) {
            t.setUTCFullYear(Math.floor(t.getUTCFullYear() / n) * n), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
        }, function(t, e) {
            t.setUTCFullYear(t.getUTCFullYear() + e * n)
        }) : null
    };
    var y, _, m, S = {
            "-": "",
            _: " ",
            0: "0"
        },
        b = /^\s*\d+/,
        w = /^%/,
        j = /[\\^$*+?|[\]().{}]/g;

    function T(t, e, n) {
        var r = t < 0 ? "-" : "",
            o = (r ? -t : t) + "",
            u = o.length;
        return r + (u < n ? new Array(n - u + 1).join(e) + o : o)
    }

    function M(t) {
        return t.replace(j, "\\$&")
    }

    function Y(t) {
        return new RegExp("^(?:" + t.map(M).join("|") + ")", "i")
    }

    function H(t) {
        for (var e = {}, n = -1, r = t.length; ++n < r;) e[t[n].toLowerCase()] = n;
        return e
    }

    function k(t, e, n) {
        var r = b.exec(e.slice(n, n + 1));
        return r ? (t.w = +r[0], n + r[0].length) : -1
    }

    function E(t, e, n) {
        var r = b.exec(e.slice(n, n + 1));
        return r ? (t.u = +r[0], n + r[0].length) : -1
    }

    function I(t, e, n) {
        var r = b.exec(e.slice(n, n + 2));
        return r ? (t.U = +r[0], n + r[0].length) : -1
    }

    function z(t, e, n) {
        var r = b.exec(e.slice(n, n + 2));
        return r ? (t.V = +r[0], n + r[0].length) : -1
    }

    function $(t, e, n) {
        var r = b.exec(e.slice(n, n + 2));
        return r ? (t.W = +r[0], n + r[0].length) : -1
    }

    function W(t, e, n) {
        var r = b.exec(e.slice(n, n + 4));
        return r ? (t.y = +r[0], n + r[0].length) : -1
    }

    function Z(t, e, n) {
        var r = b.exec(e.slice(n, n + 2));
        return r ? (t.y = +r[0] + (68 < +r[0] ? 1900 : 2e3), n + r[0].length) : -1
    }

    function P(t, e, n) {
        var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
        return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1
    }

    function B(t, e, n) {
        var r = b.exec(e.slice(n, n + 2));
        return r ? (t.m = r[0] - 1, n + r[0].length) : -1
    }

    function V(t, e, n) {
        var r = b.exec(e.slice(n, n + 2));
        return r ? (t.d = +r[0], n + r[0].length) : -1
    }

    function J(t, e, n) {
        var r = b.exec(e.slice(n, n + 3));
        return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1
    }

    function X(t, e, n) {
        var r = b.exec(e.slice(n, n + 2));
        return r ? (t.H = +r[0], n + r[0].length) : -1
    }

    function N(t, e, n) {
        var r = b.exec(e.slice(n, n + 2));
        return r ? (t.M = +r[0], n + r[0].length) : -1
    }

    function Q(t, e, n) {
        var r = b.exec(e.slice(n, n + 2));
        return r ? (t.S = +r[0], n + r[0].length) : -1
    }

    function R(t, e, n) {
        var r = b.exec(e.slice(n, n + 3));
        return r ? (t.L = +r[0], n + r[0].length) : -1
    }

    function G(t, e, n) {
        var r = b.exec(e.slice(n, n + 6));
        return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1
    }

    function q(t, e, n) {
        var r = w.exec(e.slice(n, n + 1));
        return r ? n + r[0].length : -1
    }

    function K(t, e, n) {
        var r = b.exec(e.slice(n));
        return r ? (t.Q = +r[0], n + r[0].length) : -1
    }

    function tt(t, e, n) {
        var r = b.exec(e.slice(n));
        return r ? (t.Q = 1e3 * +r[0], n + r[0].length) : -1
    }

    function et(t, e) {
        return T(t.getDate(), e, 2)
    }

    function nt(t, e) {
        return T(t.getHours(), e, 2)
    }

    function rt(t, e) {
        return T(t.getHours() % 12 || 12, e, 2)
    }

    function ot(t, e) {
        return T(1 + x.count(h(t), t), e, 3)
    }

    function ut(t, e) {
        return T(t.getMilliseconds(), e, 3)
    }

    function at(t, e) {
        return ut(t, e) + "000"
    }

    function it(t, e) {
        return T(t.getMonth() + 1, e, 2)
    }

    function ct(t, e) {
        return T(t.getMinutes(), e, 2)
    }

    function ft(t, e) {
        return T(t.getSeconds(), e, 2)
    }

    function lt(t) {
        var e = t.getDay();
        return 0 === e ? 7 : e
    }

    function st(t, e) {
        return T(l.count(h(t), t), e, 2)
    }

    function ht(t, e) {
        var n = t.getDay();
        return t = 4 <= n || 0 === n ? s(t) : s.ceil(t), T(s.count(h(t), t) + (4 === h(t).getDay()), e, 2)
    }

    function dt(t) {
        return t.getDay()
    }

    function pt(t, e) {
        return T(D.count(h(t), t), e, 2)
    }

    function vt(t, e) {
        return T(t.getFullYear() % 100, e, 2)
    }

    function gt(t, e) {
        return T(t.getFullYear() % 1e4, e, 4)
    }

    function yt(t) {
        var e = t.getTimezoneOffset();
        return (0 < e ? "-" : (e *= -1, "+")) + T(e / 60 | 0, "0", 2) + T(e % 60, "0", 2)
    }

    function _t(t, e) {
        return T(t.getUTCDate(), e, 2)
    }

    function mt(t, e) {
        return T(t.getUTCHours(), e, 2)
    }

    function bt(t, e) {
        return T(t.getUTCHours() % 12 || 12, e, 2)
    }

    function wt(t, e) {
        return T(1 + C.count(g(t), t), e, 3)
    }

    function jt(t, e) {
        return T(t.getUTCMilliseconds(), e, 3)
    }

    function Tt(t, e) {
        return jt(t, e) + "000"
    }

    function Mt(t, e) {
        return T(t.getUTCMonth() + 1, e, 2)
    }

    function xt(t, e) {
        return T(t.getUTCMinutes(), e, 2)
    }

    function Dt(t, e) {
        return T(t.getUTCSeconds(), e, 2)
    }

    function Ct(t) {
        var e = t.getUTCDay();
        return 0 === e ? 7 : e
    }

    function At(t, e) {
        return T(p.count(g(t), t), e, 2)
    }

    function Ut(t, e) {
        var n = t.getUTCDay();
        return t = 4 <= n || 0 === n ? v(t) : v.ceil(t), T(v.count(g(t), t) + (4 === g(t).getUTCDay()), e, 2)
    }

    function Ot(t) {
        return t.getUTCDay()
    }

    function Ft(t, e) {
        return T(A.count(g(t), t), e, 2)
    }

    function St(t, e) {
        return T(t.getUTCFullYear() % 100, e, 2)
    }

    function Yt(t, e) {
        return T(t.getUTCFullYear() % 1e4, e, 4)
    }

    function Ht() {
        return "+0000"
    }

    function kt() {
        return "%"
    }

    function Lt(t) {
        return +t
    }

    function Et(t) {
        return Math.floor(+t / 1e3)
    }
    y = function(t) {
        var r = t.dateTime,
            o = t.date,
            u = t.time,
            e = t.periods,
            n = t.days,
            a = t.shortDays,
            i = t.months,
            c = t.shortMonths,
            f = Y(e),
            l = H(e),
            s = Y(n),
            h = H(n),
            d = Y(a),
            p = H(a),
            v = Y(i),
            g = H(i),
            y = Y(c),
            _ = H(c),
            m = {
                a: function(t) {
                    return a[t.getDay()]
                },
                A: function(t) {
                    return n[t.getDay()]
                },
                b: function(t) {
                    return c[t.getMonth()]
                },
                B: function(t) {
                    return i[t.getMonth()]
                },
                c: null,
                d: et,
                e: et,
                f: at,
                H: nt,
                I: rt,
                j: ot,
                L: ut,
                m: it,
                M: ct,
                p: function(t) {
                    return e[+(12 <= t.getHours())]
                },
                Q: Lt,
                s: Et,
                S: ft,
                u: lt,
                U: st,
                V: ht,
                w: dt,
                W: pt,
                x: null,
                X: null,
                y: vt,
                Y: gt,
                Z: yt,
                "%": kt
            },
            b = {
                a: function(t) {
                    return a[t.getUTCDay()]
                },
                A: function(t) {
                    return n[t.getUTCDay()]
                },
                b: function(t) {
                    return c[t.getUTCMonth()]
                },
                B: function(t) {
                    return i[t.getUTCMonth()]
                },
                c: null,
                d: _t,
                e: _t,
                f: Tt,
                H: mt,
                I: bt,
                j: wt,
                L: jt,
                m: Mt,
                M: xt,
                p: function(t) {
                    return e[+(12 <= t.getUTCHours())]
                },
                Q: Lt,
                s: Et,
                S: Dt,
                u: Ct,
                U: At,
                V: Ut,
                w: Ot,
                W: Ft,
                x: null,
                X: null,
                y: St,
                Y: Yt,
                Z: Ht,
                "%": kt
            },
            w = {
                a: function(t, e, n) {
                    var r = d.exec(e.slice(n));
                    return r ? (t.w = p[r[0].toLowerCase()], n + r[0].length) : -1
                },
                A: function(t, e, n) {
                    var r = s.exec(e.slice(n));
                    return r ? (t.w = h[r[0].toLowerCase()], n + r[0].length) : -1
                },
                b: function(t, e, n) {
                    var r = y.exec(e.slice(n));
                    return r ? (t.m = _[r[0].toLowerCase()], n + r[0].length) : -1
                },
                B: function(t, e, n) {
                    var r = v.exec(e.slice(n));
                    return r ? (t.m = g[r[0].toLowerCase()], n + r[0].length) : -1
                },
                c: function(t, e, n) {
                    return M(t, r, e, n)
                },
                d: V,
                e: V,
                f: G,
                H: X,
                I: X,
                j: J,
                L: R,
                m: B,
                M: N,
                p: function(t, e, n) {
                    var r = f.exec(e.slice(n));
                    return r ? (t.p = l[r[0].toLowerCase()], n + r[0].length) : -1
                },
                Q: K,
                s: tt,
                S: Q,
                u: E,
                U: I,
                V: z,
                w: k,
                W: $,
                x: function(t, e, n) {
                    return M(t, o, e, n)
                },
                X: function(t, e, n) {
                    return M(t, u, e, n)
                },
                y: Z,
                Y: W,
                Z: P,
                "%": q
            };

        function j(c, f) {
            return function(t) {
                var e, n, r, o = [],
                    u = -1,
                    a = 0,
                    i = c.length;
                for (t instanceof Date || (t = new Date(+t)); ++u < i;) 37 === c.charCodeAt(u) && (o.push(c.slice(a, u)), null != (n = S[e = c.charAt(++u)]) ? e = c.charAt(++u) : n = "e" === e ? " " : "0", (r = f[e]) && (e = r(t, n)), o.push(e), a = u + 1);
                return o.push(c.slice(a, u)), o.join("")
            }
        }

        function T(o, u) {
            return function(t) {
                var e, n, r = F(1900);
                if (M(r, o, t += "", 0) != t.length) return null;
                if ("Q" in r) return new Date(r.Q);
                if ("p" in r && (r.H = r.H % 12 + 12 * r.p), "V" in r) {
                    if (r.V < 1 || 53 < r.V) return null;
                    "w" in r || (r.w = 1), "Z" in r ? (e = 4 < (n = (e = O(F(r.y))).getUTCDay()) || 0 === n ? A.ceil(e) : A(e), e = C.offset(e, 7 * (r.V - 1)), r.y = e.getUTCFullYear(), r.m = e.getUTCMonth(), r.d = e.getUTCDate() + (r.w + 6) % 7) : (e = 4 < (n = (e = u(F(r.y))).getDay()) || 0 === n ? D.ceil(e) : D(e), e = x.offset(e, 7 * (r.V - 1)), r.y = e.getFullYear(), r.m = e.getMonth(), r.d = e.getDate() + (r.w + 6) % 7)
                } else("W" in r || "U" in r) && ("w" in r || (r.w = "u" in r ? r.u % 7 : "W" in r ? 1 : 0), n = "Z" in r ? O(F(r.y)).getUTCDay() : u(F(r.y)).getDay(), r.m = 0, r.d = "W" in r ? (r.w + 6) % 7 + 7 * r.W - (n + 5) % 7 : r.w + 7 * r.U - (n + 6) % 7);
                return "Z" in r ? (r.H += r.Z / 100 | 0, r.M += r.Z % 100, O(r)) : u(r)
            }
        }

        function M(t, e, n, r) {
            for (var o, u, a = 0, i = e.length, c = n.length; a < i;) {
                if (c <= r) return -1;
                if (37 === (o = e.charCodeAt(a++))) {
                    if (o = e.charAt(a++), !(u = w[o in S ? e.charAt(a++) : o]) || (r = u(t, n, r)) < 0) return -1
                } else if (o != n.charCodeAt(r++)) return -1
            }
            return r
        }
        return m.x = j(o, m), m.X = j(u, m), m.c = j(r, m), b.x = j(o, b), b.X = j(u, b), b.c = j(r, b), {
            format: function(t) {
                var e = j(t += "", m);
                return e.toString = function() {
                    return t
                }, e
            },
            parse: function(t) {
                var e = T(t += "", U);
                return e.toString = function() {
                    return t
                }, e
            },
            utcFormat: function(t) {
                var e = j(t += "", b);
                return e.toString = function() {
                    return t
                }, e
            },
            utcParse: function(t) {
                var e = T(t, O);
                return e.toString = function() {
                    return t
                }, e
            }
        }
    }({
        dateTime: "%x, %X",
        date: "%-m/%-d/%Y",
        time: "%-I:%M:%S %p",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }), y.format, y.parse, _ = y.utcFormat, m = y.utcParse;
    var It = "%Y-%m-%dT%H:%M:%S.%LZ";
    Date.prototype.toISOString || _(It); + new Date("2000-01-01T00:00:00.000Z") || m(It);
    var zt = {
            dateTime: "%x, %X",
            date: "%-m/%-d/%Y",
            time: "%-I:%M:%S %p",
            periods: ["AM", "PM"],
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        $t = t(function(t, e) {
            var d = 200,
                n = "Expected a function",
                r = "__lodash_hash_undefined__",
                y = 1,
                b = 2,
                u = 1 / 0,
                o = 9007199254740991,
                _ = "[object Arguments]",
                m = "[object Array]",
                w = "[object Boolean]",
                j = "[object Date]",
                T = "[object Error]",
                a = "[object Function]",
                i = "[object GeneratorFunction]",
                M = "[object Map]",
                x = "[object Number]",
                D = "[object Object]",
                c = "[object Promise]",
                C = "[object RegExp]",
                A = "[object Set]",
                U = "[object String]",
                O = "[object Symbol]",
                f = "[object WeakMap]",
                F = "[object ArrayBuffer]",
                S = "[object DataView]",
                l = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                s = /^\w*$/,
                h = /^\./,
                p = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
                v = /\\(\\)?/g,
                g = /^\[object .+?Constructor\]$/,
                Y = /^(?:0|[1-9]\d*)$/,
                H = {};
            H["[object Float32Array]"] = H["[object Float64Array]"] = H["[object Int8Array]"] = H["[object Int16Array]"] = H["[object Int32Array]"] = H["[object Uint8Array]"] = H["[object Uint8ClampedArray]"] = H["[object Uint16Array]"] = H["[object Uint32Array]"] = !0, H[_] = H[m] = H[F] = H[w] = H[S] = H[j] = H[T] = H[a] = H[M] = H[x] = H[D] = H[C] = H[A] = H[U] = H[f] = !1;
            var k = "object" == typeof je && je && je.Object === Object && je,
                L = "object" == typeof self && self && self.Object === Object && self,
                E = k || L || Function("return this")(),
                I = e && !e.nodeType && e,
                z = I && t && !t.nodeType && t,
                $ = z && z.exports === I && k.process,
                W = function() {
                    try {
                        return $ && $.binding("util")
                    } catch (t) {}
                }(),
                Z = W && W.isTypedArray;

            function P(t, e) {
                return !!(t ? t.length : 0) && -1 < function(t, e, n) {
                    if (e != e) return function(t, e, n, r) {
                        var o = t.length,
                            u = n + (r ? 1 : -1);
                        for (; r ? u-- : ++u < o;)
                            if (e(t[u], u, t)) return u;
                        return -1
                    }(t, J, n);
                    var r = n - 1,
                        o = t.length;
                    for (; ++r < o;)
                        if (t[r] === e) return r;
                    return -1
                }(t, e, 0)
            }

            function B(t, e, n) {
                for (var r = -1, o = t ? t.length : 0; ++r < o;)
                    if (n(e, t[r])) return !0;
                return !1
            }

            function V(t, e) {
                for (var n = -1, r = t ? t.length : 0; ++n < r;)
                    if (e(t[n], n, t)) return !0;
                return !1
            }

            function J(t) {
                return t != t
            }

            function X(t, e) {
                return t.has(e)
            }

            function N(t) {
                var e = !1;
                if (null != t && "function" != typeof t.toString) try {
                    e = !!(t + "")
                } catch (t) {}
                return e
            }

            function Q(t) {
                var n = -1,
                    r = Array(t.size);
                return t.forEach(function(t, e) {
                    r[++n] = [e, t]
                }), r
            }

            function R(t) {
                var e = -1,
                    n = Array(t.size);
                return t.forEach(function(t) {
                    n[++e] = t
                }), n
            }
            var G, q, K, tt = Array.prototype,
                et = Function.prototype,
                nt = Object.prototype,
                rt = E["__core-js_shared__"],
                ot = (G = /[^.]+$/.exec(rt && rt.keys && rt.keys.IE_PROTO || "")) ? "Symbol(src)_1." + G : "",
                ut = et.toString,
                at = nt.hasOwnProperty,
                it = nt.toString,
                ct = RegExp("^" + ut.call(at).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                ft = E.Symbol,
                lt = E.Uint8Array,
                st = nt.propertyIsEnumerable,
                ht = tt.splice,
                dt = (q = Object.keys, K = Object, function(t) {
                    return q(K(t))
                }),
                pt = Vt(E, "DataView"),
                vt = Vt(E, "Map"),
                gt = Vt(E, "Promise"),
                yt = Vt(E, "Set"),
                _t = Vt(E, "WeakMap"),
                mt = Vt(Object, "create"),
                bt = Kt(pt),
                wt = Kt(vt),
                jt = Kt(gt),
                Tt = Kt(yt),
                Mt = Kt(_t),
                xt = ft ? ft.prototype : void 0,
                Dt = xt ? xt.valueOf : void 0,
                Ct = xt ? xt.toString : void 0;

            function At(t) {
                var e = -1,
                    n = t ? t.length : 0;
                for (this.clear(); ++e < n;) {
                    var r = t[e];
                    this.set(r[0], r[1])
                }
            }

            function Ut(t) {
                var e = -1,
                    n = t ? t.length : 0;
                for (this.clear(); ++e < n;) {
                    var r = t[e];
                    this.set(r[0], r[1])
                }
            }

            function Ot(t) {
                var e = -1,
                    n = t ? t.length : 0;
                for (this.clear(); ++e < n;) {
                    var r = t[e];
                    this.set(r[0], r[1])
                }
            }

            function Ft(t) {
                var e = -1,
                    n = t ? t.length : 0;
                for (this.__data__ = new Ot; ++e < n;) this.add(t[e])
            }

            function St(t) {
                this.__data__ = new Ut(t)
            }

            function Yt(t, e) {
                var n = re(t) || ne(t) ? function(t, e) {
                        for (var n = -1, r = Array(t); ++n < t;) r[n] = e(n);
                        return r
                    }(t.length, String) : [],
                    r = n.length,
                    o = !!r;
                for (var u in t) !e && !at.call(t, u) || o && ("length" == u || Xt(u, r)) || n.push(u);
                return n
            }

            function Ht(t, e) {
                for (var n = t.length; n--;)
                    if (ee(t[n][0], e)) return n;
                return -1
            }

            function kt(t, e) {
                for (var n = 0, r = (e = Nt(e, t) ? [e] : Wt(e)).length; null != t && n < r;) t = t[qt(e[n++])];
                return n && n == r ? t : void 0
            }

            function Lt(t, e) {
                return null != t && e in Object(t)
            }

            function Et(t, e, n, r, o) {
                return t === e || (null == t || null == e || !ie(t) && !ce(e) ? t != t && e != e : function(t, e, n, r, o, u) {
                    var a = re(t),
                        i = re(e),
                        c = m,
                        f = m;
                    a || (c = (c = Jt(t)) == _ ? D : c);
                    i || (f = (f = Jt(e)) == _ ? D : f);
                    var l = c == D && !N(t),
                        s = f == D && !N(e),
                        h = c == f;
                    if (h && !l) return u || (u = new St), a || se(t) ? Pt(t, e, n, r, o, u) : function(t, e, n, r, o, u, a) {
                        switch (n) {
                            case S:
                                if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
                                t = t.buffer, e = e.buffer;
                            case F:
                                return !(t.byteLength != e.byteLength || !r(new lt(t), new lt(e)));
                            case w:
                            case j:
                            case x:
                                return ee(+t, +e);
                            case T:
                                return t.name == e.name && t.message == e.message;
                            case C:
                            case U:
                                return t == e + "";
                            case M:
                                var i = Q;
                            case A:
                                var c = u & b;
                                if (i || (i = R), t.size != e.size && !c) return !1;
                                var f = a.get(t);
                                if (f) return f == e;
                                u |= y, a.set(t, e);
                                var l = Pt(i(t), i(e), r, o, u, a);
                                return a.delete(t), l;
                            case O:
                                if (Dt) return Dt.call(t) == Dt.call(e)
                        }
                        return !1
                    }(t, e, c, n, r, o, u);
                    if (!(o & b)) {
                        var d = l && at.call(t, "__wrapped__"),
                            p = s && at.call(e, "__wrapped__");
                        if (d || p) {
                            var v = d ? t.value() : t,
                                g = p ? e.value() : e;
                            return u || (u = new St), n(v, g, r, o, u)
                        }
                    }
                    if (!h) return !1;
                    return u || (u = new St),
                        function(t, e, n, r, o, u) {
                            var a = o & b,
                                i = he(t),
                                c = i.length,
                                f = he(e).length;
                            if (c != f && !a) return !1;
                            for (var l = c; l--;) {
                                var s = i[l];
                                if (!(a ? s in e : at.call(e, s))) return !1
                            }
                            var h = u.get(t);
                            if (h && u.get(e)) return h == e;
                            var d = !0;
                            u.set(t, e), u.set(e, t);
                            for (var p = a; ++l < c;) {
                                s = i[l];
                                var v = t[s],
                                    g = e[s];
                                if (r) var y = a ? r(g, v, s, e, t, u) : r(v, g, s, t, e, u);
                                if (!(void 0 === y ? v === g || n(v, g, r, o, u) : y)) {
                                    d = !1;
                                    break
                                }
                                p || (p = "constructor" == s)
                            }
                            if (d && !p) {
                                var _ = t.constructor,
                                    m = e.constructor;
                                _ != m && "constructor" in t && "constructor" in e && !("function" == typeof _ && _ instanceof _ && "function" == typeof m && m instanceof m) && (d = !1)
                            }
                            return u.delete(t), u.delete(e), d
                        }(t, e, n, r, o, u)
                }(t, e, Et, n, r, o))
            }

            function It(t) {
                return !(!ie(t) || (e = t, ot && ot in e)) && (ue(t) || N(t) ? ct : g).test(Kt(t));
                var e
            }

            function zt(t) {
                return "function" == typeof t ? t : null == t ? de : "object" == typeof t ? re(t) ? function(c, f) {
                    if (Nt(c) && Qt(f)) return Rt(qt(c), f);
                    return function(t) {
                        var e, n, r, o, u, a, i = (n = c, void 0 === (o = null == (e = t) ? void 0 : kt(e, n)) ? r : o);
                        return void 0 === i && i === f ? (a = c, null != (u = t) && function(t, e, n) {
                            e = Nt(e, t) ? [e] : Wt(e);
                            for (var r, o = -1, u = e.length; ++o < u;) {
                                var a = qt(e[o]);
                                if (!(r = null != t && n(t, a))) break;
                                t = t[a]
                            }
                            return r || !!(u = t ? t.length : 0) && ae(u) && Xt(a, u) && (re(t) || ne(t))
                        }(u, a, Lt)) : Et(f, i, void 0, y | b)
                    }
                }(t[0], t[1]) : function(e) {
                    var n = function(t) {
                        var e = he(t),
                            n = e.length;
                        for (; n--;) {
                            var r = e[n],
                                o = t[r];
                            e[n] = [r, o, Qt(o)]
                        }
                        return e
                    }(e);
                    if (1 == n.length && n[0][2]) return Rt(n[0][0], n[0][1]);
                    return function(t) {
                        return t === e || function(t, e, n, r) {
                            var o = n.length,
                                u = o,
                                a = !r;
                            if (null == t) return !u;
                            for (t = Object(t); o--;) {
                                var i = n[o];
                                if (a && i[2] ? i[1] !== t[i[0]] : !(i[0] in t)) return !1
                            }
                            for (; ++o < u;) {
                                var c = (i = n[o])[0],
                                    f = t[c],
                                    l = i[1];
                                if (a && i[2]) {
                                    if (void 0 === f && !(c in t)) return !1
                                } else {
                                    var s = new St;
                                    if (r) var h = r(f, l, c, t, e, s);
                                    if (!(void 0 === h ? Et(l, f, r, y | b, s) : h)) return !1
                                }
                            }
                            return !0
                        }(t, e, n)
                    }
                }(t) : Nt(e = t) ? (r = qt(e), function(t) {
                    return null == t ? void 0 : t[r]
                }) : (n = e, function(t) {
                    return kt(t, n)
                });
                var e, n, r
            }

            function $t(t) {
                if (n = (e = t) && e.constructor, r = "function" == typeof n && n.prototype || nt, e !== r) return dt(t);
                var e, n, r, o = [];
                for (var u in Object(t)) at.call(t, u) && "constructor" != u && o.push(u);
                return o
            }

            function Wt(t) {
                return re(t) ? t : Gt(t)
            }
            At.prototype.clear = function() {
                this.__data__ = mt ? mt(null) : {}
            }, At.prototype.delete = function(t) {
                return this.has(t) && delete this.__data__[t]
            }, At.prototype.get = function(t) {
                var e = this.__data__;
                if (mt) {
                    var n = e[t];
                    return n === r ? void 0 : n
                }
                return at.call(e, t) ? e[t] : void 0
            }, At.prototype.has = function(t) {
                var e = this.__data__;
                return mt ? void 0 !== e[t] : at.call(e, t)
            }, At.prototype.set = function(t, e) {
                return this.__data__[t] = mt && void 0 === e ? r : e, this
            }, Ut.prototype.clear = function() {
                this.__data__ = []
            }, Ut.prototype.delete = function(t) {
                var e = this.__data__,
                    n = Ht(e, t);
                return !(n < 0 || (n == e.length - 1 ? e.pop() : ht.call(e, n, 1), 0))
            }, Ut.prototype.get = function(t) {
                var e = this.__data__,
                    n = Ht(e, t);
                return n < 0 ? void 0 : e[n][1]
            }, Ut.prototype.has = function(t) {
                return -1 < Ht(this.__data__, t)
            }, Ut.prototype.set = function(t, e) {
                var n = this.__data__,
                    r = Ht(n, t);
                return r < 0 ? n.push([t, e]) : n[r][1] = e, this
            }, Ot.prototype.clear = function() {
                this.__data__ = {
                    hash: new At,
                    map: new(vt || Ut),
                    string: new At
                }
            }, Ot.prototype.delete = function(t) {
                return Bt(this, t).delete(t)
            }, Ot.prototype.get = function(t) {
                return Bt(this, t).get(t)
            }, Ot.prototype.has = function(t) {
                return Bt(this, t).has(t)
            }, Ot.prototype.set = function(t, e) {
                return Bt(this, t).set(t, e), this
            }, Ft.prototype.add = Ft.prototype.push = function(t) {
                return this.__data__.set(t, r), this
            }, Ft.prototype.has = function(t) {
                return this.__data__.has(t)
            }, St.prototype.clear = function() {
                this.__data__ = new Ut
            }, St.prototype.delete = function(t) {
                return this.__data__.delete(t)
            }, St.prototype.get = function(t) {
                return this.__data__.get(t)
            }, St.prototype.has = function(t) {
                return this.__data__.has(t)
            }, St.prototype.set = function(t, e) {
                var n = this.__data__;
                if (n instanceof Ut) {
                    var r = n.__data__;
                    if (!vt || r.length < d - 1) return r.push([t, e]), this;
                    n = this.__data__ = new Ot(r)
                }
                return n.set(t, e), this
            };
            var Zt = yt && 1 / R(new yt([, -0]))[1] == u ? function(t) {
                return new yt(t)
            } : function() {};

            function Pt(t, e, n, r, o, u) {
                var a = o & b,
                    i = t.length,
                    c = e.length;
                if (i != c && !(a && i < c)) return !1;
                var f = u.get(t);
                if (f && u.get(e)) return f == e;
                var l = -1,
                    s = !0,
                    h = o & y ? new Ft : void 0;
                for (u.set(t, e), u.set(e, t); ++l < i;) {
                    var d = t[l],
                        p = e[l];
                    if (r) var v = a ? r(p, d, l, e, t, u) : r(d, p, l, t, e, u);
                    if (void 0 !== v) {
                        if (v) continue;
                        s = !1;
                        break
                    }
                    if (h) {
                        if (!V(e, function(t, e) {
                                if (!h.has(e) && (d === t || n(d, t, r, o, u))) return h.add(e)
                            })) {
                            s = !1;
                            break
                        }
                    } else if (d !== p && !n(d, p, r, o, u)) {
                        s = !1;
                        break
                    }
                }
                return u.delete(t), u.delete(e), s
            }

            function Bt(t, e) {
                var n, r, o = t.__data__;
                return ("string" == (r = typeof(n = e)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? o["string" == typeof e ? "string" : "hash"] : o.map
            }

            function Vt(t, e) {
                var n, r, o = (r = e, null == (n = t) ? void 0 : n[r]);
                return It(o) ? o : void 0
            }
            var Jt = function(t) {
                return it.call(t)
            };

            function Xt(t, e) {
                return !!(e = null == e ? o : e) && ("number" == typeof t || Y.test(t)) && -1 < t && t % 1 == 0 && t < e
            }

            function Nt(t, e) {
                if (re(t)) return !1;
                var n = typeof t;
                return !("number" != n && "symbol" != n && "boolean" != n && null != t && !fe(t)) || (s.test(t) || !l.test(t) || null != e && t in Object(e))
            }

            function Qt(t) {
                return t == t && !ie(t)
            }

            function Rt(e, n) {
                return function(t) {
                    return null != t && (t[e] === n && (void 0 !== n || e in Object(t)))
                }
            }(pt && Jt(new pt(new ArrayBuffer(1))) != S || vt && Jt(new vt) != M || gt && Jt(gt.resolve()) != c || yt && Jt(new yt) != A || _t && Jt(new _t) != f) && (Jt = function(t) {
                var e = it.call(t),
                    n = e == D ? t.constructor : void 0,
                    r = n ? Kt(n) : void 0;
                if (r) switch (r) {
                    case bt:
                        return S;
                    case wt:
                        return M;
                    case jt:
                        return c;
                    case Tt:
                        return A;
                    case Mt:
                        return f
                }
                return e
            });
            var Gt = te(function(t) {
                var e;
                t = null == (e = t) ? "" : function(t) {
                    if ("string" == typeof t) return t;
                    if (fe(t)) return Ct ? Ct.call(t) : "";
                    var e = t + "";
                    return "0" == e && 1 / t == -u ? "-0" : e
                }(e);
                var o = [];
                return h.test(t) && o.push(""), t.replace(p, function(t, e, n, r) {
                    o.push(n ? r.replace(v, "$1") : e || t)
                }), o
            });

            function qt(t) {
                if ("string" == typeof t || fe(t)) return t;
                var e = t + "";
                return "0" == e && 1 / t == -u ? "-0" : e
            }

            function Kt(t) {
                if (null != t) {
                    try {
                        return ut.call(t)
                    } catch (t) {}
                    try {
                        return t + ""
                    } catch (t) {}
                }
                return ""
            }

            function te(o, u) {
                if ("function" != typeof o || u && "function" != typeof u) throw new TypeError(n);
                var a = function() {
                    var t = arguments,
                        e = u ? u.apply(this, t) : t[0],
                        n = a.cache;
                    if (n.has(e)) return n.get(e);
                    var r = o.apply(this, t);
                    return a.cache = n.set(e, r), r
                };
                return a.cache = new(te.Cache || Ot), a
            }

            function ee(t, e) {
                return t === e || t != t && e != e
            }

            function ne(t) {
                return ce(e = t) && oe(e) && at.call(t, "callee") && (!st.call(t, "callee") || it.call(t) == _);
                var e
            }
            te.Cache = Ot;
            var re = Array.isArray;

            function oe(t) {
                return null != t && ae(t.length) && !ue(t)
            }

            function ue(t) {
                var e = ie(t) ? it.call(t) : "";
                return e == a || e == i
            }

            function ae(t) {
                return "number" == typeof t && -1 < t && t % 1 == 0 && t <= o
            }

            function ie(t) {
                var e = typeof t;
                return !!t && ("object" == e || "function" == e)
            }

            function ce(t) {
                return !!t && "object" == typeof t
            }

            function fe(t) {
                return "symbol" == typeof t || ce(t) && it.call(t) == O
            }
            var le, se = Z ? (le = Z, function(t) {
                return le(t)
            }) : function(t) {
                return ce(t) && ae(t.length) && !!H[it.call(t)]
            };

            function he(t) {
                return oe(t) ? Yt(t) : $t(t)
            }

            function de(t) {
                return t
            }
            t.exports = function(t, e) {
                return t && t.length ? function(t, e, n) {
                    var r = -1,
                        o = P,
                        u = t.length,
                        a = !0,
                        i = [],
                        c = i;
                    if (n) a = !1, o = B;
                    else if (d <= u) {
                        var f = e ? null : Zt(t);
                        if (f) return R(f);
                        a = !1, o = X, c = new Ft
                    } else c = e ? [] : i;
                    t: for (; ++r < u;) {
                        var l = t[r],
                            s = e ? e(l) : l;
                        if (l = n || 0 !== l ? l : 0, a && s == s) {
                            for (var h = c.length; h--;)
                                if (c[h] === s) continue t;
                            e && c.push(s), i.push(l)
                        } else o(c, s, n) || (c !== i && c.push(s), i.push(l))
                    }
                    return i
                }(t, zt(e)) : []
            }
        }),
        Wt = function(s, h) {
            return function(t) {
                var e, n, r = s.drop,
                    o = r.color,
                    u = r.radius,
                    a = r.date,
                    i = r.onClick,
                    c = r.onMouseOver,
                    f = r.onMouseOut,
                    l = t.selectAll(".drop").data((e = h, n = a, function(t) {
                        return $t(t.data, function(t) {
                            return Math.round(e(n(t)))
                        })
                    }));
                l.enter().append("rect").classed("drop", !0).attr("width", u).attr("height", u + 20).attr("transform", "translate(0, -10)").on("click", i).on("mouseover", c).on("mouseout", f).merge(l).attr("fill", o).attr("opacity", 0.5).attr("x", function(t) {
                    return h(a(t))
                }), l.exit().on("click", null).on("mouseover", null).on("mouseout", null).remove()
            }
        };

    function Zt(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }
    return function(t) {
        var e = t.d3,
            Y = void 0 === e ? window.d3 : e,
            H = function(t, e) {
                var n = {};
                for (var r in t) 0 <= e.indexOf(r) || Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
                return n
            }(t, ["d3"]),
            g = function(t) {
                var n, e = L(H || {}, {
                        locale: zt,
                        metaballs: {
                            blurDeviation: 10,
                            colorMatrix: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -10"
                        },
                        bound: {
                            format: (n = Y).timeFormat("%d %B %Y")
                        },
                        axis: {
                            formats: {
                                milliseconds: "%L",
                                seconds: ":%S",
                                minutes: "%I:%M",
                                hours: "%I %p",
                                days: "%a %d",
                                weeks: "%b %d",
                                months: "%B",
                                year: "%Y"
                            }
                        },
                        drops: function(t) {
                            return t.data
                        },
                        drop: {
                            color: null,
                            radius: 5,
                            date: function(t) {
                                return new Date(t)
                            },
                            onClick: function() {},
                            onMouseOver: function() {},
                            onMouseOut: function() {}
                        },
                        label: {
                            padding: 20,
                            text: function(t) {
                                return t.name + " (" + t.data.length + ")"
                            },
                            width: 200
                        },
                        line: {
                            color: function(t, e) {
                                return n.schemeCategory10[e]
                            },
                            height: 30
                        },
                        margin: {
                            top: 20,
                            right: 10,
                            bottom: 20,
                            left: -100
                        },
                        range: {
                            start: new Date((new Date).getTime() - 31536e6),
                            end: new Date
                        },
                        zoom: {
                            onZoomStart: null,
                            onZoom: null,
                            onZoomEnd: null,
                            minimumScale: 0,
                            maximumScale: 1 / 0
                        }
                    }),
                    r = (e.drops, e.zoom),
                    o = e.drop,
                    u = (o.onClick, o.onMouseOut, o.onMouseOver, e.metaballs),
                    a = e.label.width,
                    i = e.line.height,
                    c = e.range,
                    f = c.start,
                    l = c.end,
                    s = e.margin,
                    h = t.node().clientWidth - s.left - s.right,
                    d = Y.scaleTime().domain([f, l]).range([0, h - a]),
                    p = t.selectAll("svg").data(t.data());
                p.exit().remove();
                var v, g, y, _, m, b, w, j, T, M, x, D, C, A, U, O, F, S = p.enter().append("svg").attr("width", h).classed("event-drop-chart", !0);
                r && S.call((v = Y, g = S, _ = d, m = k, b = function() {
                    return Y.event
                }, w = (y = e).label, j = w.width, T = w.padding, M = y.zoom, x = M.onZoomStart, D = M.onZoom, C = M.onZoomEnd, A = M.minimumScale, U = M.maximumScale, (O = v.zoom().scaleExtent([A, U])).on("zoom.start", x).on("zoom.end", C), O.on("zoom", function(t) {
                    var e, n, r, o, u, a, i, c, f = (e = b().transform, o = v, u = (n = j) + (r = T), a = e.x, i = e.y, c = e.k, o.zoomIdentity.translate(-u, 0).translate(a, i).scale(c).translate(n + r, 0)).rescaleX(_);
                    g.call(m(y, f)), D && D(t)
                }), O)), u && S.call((F = e, function(t) {
                    var e = F.metaballs,
                        n = e.blurDeviation,
                        r = e.colorMatrix,
                        o = t.append("defs").append("filter").attr("id", "metaballs");
                    o.append("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", 0).attr("result", "blur")
                })), S.merge(p).attr("height", function(t) {
                    return (t.length + 1) * i + s.top + s.bottom
                }), console.log(s);
                S.append("g").classed("viewport", !0).attr("transform", "translate(" + s.left + "," + s.top + ")").call(k(e, d))
            };
        g.scale = function() {
            return g._scale
        }, g.filteredData = function() {
            return g._filteredData
        };
        var k = function(p, v) {
            return function(t) {
                var o, e, r, u, a, n, i, c, h, d, f = p.drop.date,
                    l = v.domain().map(function(t) {
                        return new Date(t)
                    }),
                    s = t.data().map(function(t) {
                        if (!Array.isArray(t)) throw new Error("Selection data is not an array. Are you sure you provided an array of arrays to `data` function?");
                        return t.map(function(t) {
                            if (!t.fullData && (t.fullData = p.drops(t), !t.fullData)) throw new Error("No drops data has been found. It looks by default in the `data` property. You can use the `drops` configuration parameter to tune it.");
                            return t.data = t.fullData.filter(function(t) {
                                return e = f(t), n = l, r = Math.min.apply(Math, Zt(n)), o = Math.max.apply(Math, Zt(n)), new Date(e) >= r && new Date(e) <= o;
                                var e, n, r, o
                            }), t
                        })
                    });
                g._scale = v, g._filteredData = s[0], t.data(s).call((h = p, d = v, function(t) {
                    var e = h.metaballs,
                        n = h.label,
                        r = n.text,
                        o = n.padding,
                        u = n.width,
                        a = h.line,
                        i = a.color,
                        c = a.height,
                        f = t.selectAll(".drop-line").data(function(t) {
                            return t
                        }),
                        l = f.enter().append("g").classed("drop-line", !0).attr("transform", function(t, e) {
                            return "translate(0, " + e * c + ")"
                        });
                    l.append("line").classed("line-separator", !0).attr("x1", u).attr("x2", "100%").attr("y1", function() {
                        return c
                    }).attr("y2", function() {
                        return c
                    });
                    var s = l.append("g").classed("drops", !0).attr("transform", function() {
                        return "translate(" + u + ", " + c / 2 + ")"
                    }).call(Wt(h, d));
                    s.append("rect").attr("x", 0).attr("y", -h.line.height / 2).attr("width", 1).attr("height", h.line.height).attr("fill", "grey"), e && s.style("filter", "url(#metaballs)"), l.append("text").attr("x", u - 2.2 * o).attr("y", c / 2).attr("dy", "0.25em").attr("font-size", "10px").attr("text-anchor", "end").text(r), f.selectAll("text").text(r), f.selectAll(".drops").call(Wt(h, d)), f.exit().remove()
                })).call((i = p, c = v, function(t) {
                    var e = i.margin,
                        n = i.bound.format,
                        r = i.label.width,
                        o = i.line.height,
                        u = t.selectAll(".bound").data(function(t) {
                            return t
                        }),
                        a = t.data()[0].length;
                    u.exit().remove(), u.enter().filter(function(t, e) {
                        return !e
                    }).append("g").classed("bound", !0).classed("start", !0).attr("transform", "translate(" + r + ", " + (o * a + e.top) + ")").append("text").text(n(c.domain()[0])), u.enter().filter(function(t, e) {
                        return !e
                    }).append("g").classed("bound", !0).classed("end", !0).attr("transform", "translate(" + r + ", " + (o * a + e.top) + ")").append("text").attr("x", c.range()[1] - e.right).attr("text-anchor", "end").text(n(c.domain()[1])), u.selectAll(".bound.start text").text(n(c.domain()[0])), u.selectAll(".bound.end text").text(n(c.domain()[1]))
                })).call((o = Y, r = v, u = (e = p).label.width, a = e.axis.formats, n = e.locale, o.timeFormatDefaultLocale(n), function(t) {
                    var e = t.selectAll(".axis").data(function(t) {
                        return t
                    });
                    e.exit().remove();
                    var n = o.axisTop(r).tickFormat(function(t) {
                        return e = t, n = a, (r = o).timeSecond(e) < e ? r.timeFormat(n.milliseconds)(e) : r.timeMinute(e) < e ? r.timeFormat(n.seconds)(e) : r.timeHour(e) < e ? r.timeFormat(n.minutes)(e) : r.timeDay(e) < e ? r.timeFormat(n.hours)(e) : r.timeMonth(e) < e ? r.timeWeek(e) < e ? r.timeFormat(n.days)(e) : r.timeFormat(n.weeks)(e) : r.timeYear(e) < e ? r.timeFormat(n.months)(e) : r.timeFormat(n.year)(e);
                        var e, n, r
                    });
                    e.enter().filter(function(t, e) {
                        return !e
                    }).append("g").classed("axis", !0).attr("transform", "translate(" + u + ",0)").call(n), e.call(n)
                }))
            }
        };
        return g.draw = k, g
    }
});

//# sourceMappingURL=index.js.map
