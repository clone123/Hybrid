/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 16-2-2 下午6:13
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */
/*! TenVideoPlayer_V2 - v2.0.0 - 2016-01-27 09:49:13
 * Copyright (c) 2016
 * Powered by Tencent-Video Web Front End Team
 */
!function(a) {
    if (tvp = {}, tvp.lastModify = "2016-01-27 09:49:12", tvp.ts = tvp.lastModify.replace(/\D/g, ""),
        tvp.ver = "$V2.0Build7121$", tvp.dataset = {
        openLazy:!0
    }, tvp.name = "腾讯视频统一播放器", "undefined" == typeof window.DEBUG && (window.DEBUG = 1),
        window.FILEPATH = "//imgcache.qq.com/tencentvideo_v1/tvp/js/", top != window) try {
        tvp.topurl = top.location.href;
    } catch (b) {}
    tvp.log = function(a) {
        if (window.DEBUG && null != document.getElementById("tvp_debug_console")) {
            var b = document.getElementById("tvp_debug_console");
            b.innerHTML += a + " | ";
        } else window.console && window.console.log("[" + tvp.log.debugid++ + "] " + a);
    }, tvp.debug = function(a) {
        window.DEBUG || -1 !== tvp.log.isDebug || (tvp.log.isDebug = "true" == tvp.$.getUrlParam("debug") ? 1 :0),
            (window.DEBUG || tvp.log.isDebug) && tvp.log(a);
    }, tvp.log.isDebug = -1, tvp.log.debugid = 1, tvp.DEVICE = {
        aphone:1,
        iphone:2,
        ipad:3,
        other:0
    }, tvp.PLATFORM = {
        wechat:1,
        mqq:2,
        qqbrowser:3,
        other:0
    }, tvp.APPID = {
        wechatPublic:1e4,
        news:10001,
        qqmusic:10007
    }, tvp.ACTION = {
        onVodH5Init:"tvp:vodhtml5:beforeInit",
        onFlashPlayerInited:"tvp:flash:inited"
    }, function(a) {
        function b(b, c, d) {
            var e = a.Event(c);
            return a(b).trigger(e, d), !e.isDefaultPrevented();
        }
        function c(a, c, d, e) {
            return a.global ? b(c || s, d, e) :void 0;
        }
        function d(b) {
            b.global && 0 === a.active++ && c(b, null, "ajaxStart");
        }
        function e(b) {
            b.global && !--a.active && c(b, null, "ajaxStop");
        }
        function f(a, b) {
            var d = b.context;
            return b.beforeSend.call(d, a, b) === !1 || c(b, d, "ajaxBeforeSend", a, b) === !1 ? !1 :void c(b, d, "ajaxSend", a, b);
        }
        function g(a, b, d, e) {
            var f = d.context, g = "success";
            d.success.call(f, a, g, b), e && e.resolveWith(f, a, g, b), c(d, f, "ajaxSuccess", b, d, a),
                i(g, b, d);
        }
        function h(a, b, d, e, f) {
            var g = e.context;
            e.error.call(g, d, b, a), f && f.rejectWith(g, d, b, a), c(e, g, "ajaxError", d, e, a || b),
                i(b, d, e);
        }
        function i(a, b, d) {
            var f = d.context;
            d.complete.call(f, b, a), c(d, f, "ajaxComplete", b, d), e(d);
        }
        function j() {}
        function k(a) {
            return a && (a = a.split(";", 2)[0]), a && (a == x ? "html" :a == w ? "json" :u.test(a) ? "script" :v.test(a) && "xml") || "text";
        }
        function l(a, b) {
            return "" == b ? a :(a + "&" + b).replace(/[&?]{1,2}/, "?");
        }
        function m(b) {
            b.processData && b.data && "string" != a.type(b.data) && (b.data = a.param(b.data, b.traditional)),
                !b.data || b.type && "GET" != b.type.toUpperCase() || (b.url = l(b.url, b.data),
                    b.data = void 0);
        }
        function n(b, c, d, e) {
            return a.isFunction(c) && (e = d, d = c, c = void 0), a.isFunction(d) || (e = d,
                d = void 0), {
                url:b,
                data:c,
                success:d,
                dataType:e
            };
        }
        function o(b, c, d, e) {
            var f, g = a.isArray(c), h = a.isPlainObject(c);
            a.each(c, function(c, i) {
                f = a.type(i), e && (c = d ? e :e + "[" + (h || "object" == f || "array" == f ? c :"") + "]"),
                    !e && g ? b.add(i.name, i.value) :"array" == f || !d && "object" == f ? o(b, i, d, c) :b.add(c, i);
            });
        }
        if (!(a.ajaxJSONP && a.getJSON && a.get && a.post)) {
            var p, q, r = 0, s = window.document, t = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, u = /^(?:text|application)\/javascript/i, v = /^(?:text|application)\/xml/i, w = "application/json", x = "text/html", y = /^\s*$/, z = s.createElement("a");
            z.href = window.location.href, a.active = 0, a.ajaxJSONP = function(b, c) {
                if (!("type" in b)) return a.Ajax(b);
                var d, e, i = b.jsonpCallback, j = (a.isFunction(i) ? i() :i) || "jsonp" + ++r, k = s.createElement("script"), l = window[j], m = function(b) {
                    a(k).triggerHandler("error", b || "abort");
                }, n = {
                    abort:m
                };
                return c && c.promise(n), a(k).on("load error", function(f, i) {
                    clearTimeout(e), a(k).off().remove(), "error" != f.type && d ? g(d[0], n, b, c) :h(null, i || "error", n, b, c),
                        window[j] = l, d && a.isFunction(l) && l(d[0]), l = d = void 0;
                }), f(n, b) === !1 ? (m("abort"), n) :(window[j] = function() {
                    d = arguments;
                }, k.src = b.url.replace(/\?(.+)=\?/, "?$1=" + j), s.head.appendChild(k), b.timeout > 0 && (e = setTimeout(function() {
                    m("timeout");
                }, b.timeout)), n);
            }, a.ajaxSettings = {
                type:"GET",
                beforeSend:j,
                success:j,
                error:j,
                complete:j,
                context:null,
                global:!0,
                xhr:function() {
                    return new window.XMLHttpRequest();
                },
                accepts:{
                    script:"text/javascript, application/javascript, application/x-javascript",
                    json:w,
                    xml:"application/xml, text/xml",
                    html:x,
                    text:"text/plain"
                },
                crossDomain:!1,
                timeout:0,
                processData:!0,
                cache:!0
            }, a.Ajax = function(b) {
                var c, e, i = a.extend({}, b || {}), n = a.Deferred && a.Deferred();
                for (p in a.ajaxSettings) void 0 === i[p] && (i[p] = a.ajaxSettings[p]);
                d(i), i.crossDomain || (c = s.createElement("a"), c.href = i.url, c.href = c.href,
                    i.crossDomain = z.protocol + "//" + z.host != c.protocol + "//" + c.host), i.url || (i.url = window.location.toString()),
                    (e = i.url.indexOf("#")) > -1 && (i.url = i.url.slice(0, e)), m(i);
                var o = i.dataType, r = /\?.+=\?/.test(i.url);
                if (r && (o = "jsonp"), i.cache !== !1 && (b && b.cache === !0 || "script" != o && "jsonp" != o) || (i.url = l(i.url, "_=" + Date.now())),
                    "jsonp" == o) return r || (i.url = l(i.url, i.jsonp ? i.jsonp + "=?" :i.jsonp === !1 ? "" :"callback=?")),
                    a.ajaxJSONP(i, n);
                var t, u = i.accepts[o], v = {}, w = function(a, b) {
                    v[a.toLowerCase()] = [ a, b ];
                }, x = /^([\w-]+:)\/\//.test(i.url) ? RegExp.$1 :window.location.protocol, A = i.xhr(), B = A.setRequestHeader;
                if (n && n.promise(A), i.crossDomain || w("X-Requested-With", "XMLHttpRequest"),
                    w("Accept", u || "*/*"), (u = i.mimeType || u) && (u.indexOf(",") > -1 && (u = u.split(",", 2)[0]),
                    A.overrideMimeType && A.overrideMimeType(u)), (i.contentType || i.contentType !== !1 && i.data && "GET" != i.type.toUpperCase()) && w("Content-Type", i.contentType || "application/x-www-form-urlencoded"),
                    i.headers) for (q in i.headers) w(q, i.headers[q]);
                if (A.setRequestHeader = w, A.onreadystatechange = function() {
                    if (4 == A.readyState) {
                        A.onreadystatechange = j, clearTimeout(t);
                        var b, c = !1;
                        if (A.status >= 200 && A.status < 300 || 304 == A.status || 0 == A.status && "file:" == x) {
                            o = o || k(i.mimeType || A.getResponseHeader("content-type")), b = A.responseText;
                            try {
                                "script" == o ? (1, eval)(b) :"xml" == o ? b = A.responseXML :"json" == o && (b = y.test(b) ? null :a.parseJSON(b));
                            } catch (d) {
                                c = d;
                            }
                            c ? h(c, "parsererror", A, i, n) :g(b, A, i, n);
                        } else h(A.statusText || null, A.status ? "error" :"abort", A, i, n);
                    }
                }, f(A, i) === !1) return A.abort(), h(null, "abort", A, i, n), A;
                if (i.xhrFields) for (q in i.xhrFields) A[q] = i.xhrFields[q];
                var C = "async" in i ? i.async :!0;
                A.open(i.type, i.url, C, i.username, i.password);
                for (q in v) B.apply(A, v[q]);
                return i.timeout > 0 && (t = setTimeout(function() {
                    A.onreadystatechange = j, A.abort(), h(null, "timeout", A, i, n);
                }, i.timeout)), A.send(i.data ? i.data :null), A;
            }, a.get = function() {
                return a.Ajax(n.apply(null, arguments));
            }, a.post = function() {
                var b = n.apply(null, arguments);
                return b.type = "POST", a.Ajax(b);
            }, a.getJSON = function() {
                var b = n.apply(null, arguments);
                return b.dataType = "json", a.Ajax(b);
            }, a.fn.load = function(b, c, d) {
                if (!this.length) return this;
                var e, f = this, g = b.split(/\s/), h = n(b, c, d), i = h.success;
                return g.length > 1 && (h.url = g[0], e = g[1]), h.success = function(b) {
                    f.html(e ? a("<div>").html(b.replace(t, "")).find(e) :b), i && i.apply(f, arguments);
                }, a.Ajax(h), this;
            };
            var A = encodeURIComponent;
            a.param = function(b, c) {
                var d = [];
                return d.add = function(b, c) {
                    a.isFunction(c) && (c = c()), null == c && (c = ""), this.push(A(b) + "=" + A(c));
                }, o(d, b, c), d.join("&").replace(/%20/g, "+");
            };
        }
    }(Zepto), function() {
        function a(a) {
            return a instanceof Array;
        }
        if ("object" != typeof tvp || !tvp.$ || !tvp.$.Deferred) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o = [].slice;
            f = "1.3.2", c = "pending", e = "resolved", d = "rejected", j = function(a, b) {
                return null != a ? a.hasOwnProperty(b) :void 0;
            }, l = function(a) {
                return j(a, "length") && j(a, "callee");
            }, i = function(b) {
                return l(b) ? i(Array.prototype.slice.call(b)) :a(b) ? b.reduce(function(b, c) {
                    return a(c) ? b.concat(i(c)) :(b.push(c), b);
                }, []) :[ b ];
            }, g = function(a, b) {
                return 0 >= a ? b() :function() {
                    return --a < 1 ? b.apply(this, arguments) :void 0;
                };
            }, m = function(a, b) {
                return function() {
                    var c;
                    return c = [ a ].concat(Array.prototype.slice.call(arguments, 0)), b.apply(this, c);
                };
            }, h = function(a, b, c) {
                var d, e, f, g, h;
                for (g = i(a), h = [], e = 0, f = g.length; f > e; e++) d = g[e], h.push(d.call.apply(d, [ c ].concat(o.call(b))));
                return h;
            }, b = function() {
                var a, f, g, j, k, l;
                return l = c, j = [], k = [], a = [], g = {}, this.promise = function(f) {
                    var m, n;
                    return f = f || {}, f.state = function() {
                        return l;
                    }, n = function(a, b) {
                        return function() {
                            return l === c && b.push.apply(b, i(arguments)), a() && h(arguments, g), f;
                        };
                    }, f.done = n(function() {
                        return l === e;
                    }, j), f.fail = n(function() {
                        return l === d;
                    }, k), f.always = n(function() {
                        return l !== c;
                    }, a), m = function(a, c) {
                        var d, e;
                        return d = new b(), e = function(a, b, c) {
                            return a(c ? function() {
                                return b(c.apply(null, i(arguments)));
                            } :function() {
                                return b.apply(null, i(arguments));
                            });
                        }, e(f.done, d.resolve, a), e(f.fail, d.reject, c), d;
                    }, f.pipe = m, f.then = m, f;
                }, this.promise(this), f = function(b, d, e) {
                    return function() {
                        return l === c && (l = b, g = arguments, h([ d, a ], g, e)), this;
                    };
                }, this.resolve = f(e, j), this.reject = f(d, k), this.resolveWith = function() {
                    var a, b;
                    return b = arguments[0], a = 2 <= arguments.length ? o.call(arguments, 1) :[], f(e, j, b).apply(null, a);
                }, this.rejectWith = function() {
                    var a, b;
                    return b = arguments[0], a = 2 <= arguments.length ? o.call(arguments, 1) :[], f(d, k, b).apply(null, a);
                }, this;
            }, n = function() {
                var a, c, d, e, f, h, j, k;
                for (e = new b(), c = i(arguments), d = g(c.length, e.resolve), f = 0, j = c.length; j > f; f++) a = c[f],
                    a.done(d);
                for (h = 0, k = c.length; k > h; h++) a = c[h], a.fail(function(a, b) {
                    return e.reject(a, b);
                });
                return e.promise();
            }, k = function(a) {
                return a.Deferred = function() {
                    return new b();
                }, a.ajax = m(a.ajax, function(a, c) {
                    var d, e;
                    return null == c && (c = {}), e = new b(), d = function(a, b) {
                        return m(a, function() {
                            var a, c;
                            return c = arguments[0], a = 2 <= arguments.length ? o.call(arguments, 1) :[], c && c.apply(null, a),
                                b.apply(null, a);
                        });
                    }, c.success = d(c.success, e.resolve), c.error = d(c.error, e.reject), a(c), e.promise();
                }), a.when = n;
            }, "undefined" != typeof exports ? (exports.Deferred = function() {
                return new b();
            }, exports.when = n, exports.installInto = k) :(this.Deferred = function() {
                return new b();
            }, this.Deferred.when = n, this.Deferred.installInto = k, this.DeferedClass = b),
                tvp.Deferred.installInto("undefined" != typeof Zepto ? Zepto :jq);
        }
    }.call(tvp);
    var c = !1;
    "undefined" != typeof Zepto && Zepto._tvp ? (tvp.$ = Zepto, c = !0) :(tvp.$ = {},
        c = !1), function() {
        return c ? void 0 :"function" == typeof window.Zepto ? void (tvp.$ = window.Zepto) :"function" == typeof window.jQuery && "function" == typeof window.jQuery.Deferred ? (tvp.$ = window.jQuery,
            void (!tvp.$.os && "undefined" != typeof Zepto && Zepto.__detect && Zepto.__detect.call(tvp.$, navigator.userAgent))) :void ("function" == typeof window.jq && (tvp.$ = window.jq,
            !tvp.$.os && "undefined" != typeof Zepto && Zepto.__detect && Zepto.__detect.call(tvp.$, navigator.userAgent)));
    }(), function() {
        "undefined" == typeof document.DOCUMENT_NODE && (document.DOCUMENT_NODE = 9);
    }(), function(a) {
        function b(a) {
            var b = this.os = {}, c = this.browser = {}, d = a.match(/WebKit\/([\d.]+)/), e = a.match(/(Android)(\s+|\/)([\d.]+)/), f = a.match(/(iPad).*OS\s([\d_]+)/), g = !f && a.match(/(iPhone\sOS)\s([\d_]+)/), h = a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), i = h && a.match(/TouchPad/), j = a.match(/Kindle\/([\d.]+)/), k = a.match(/Silk\/([\d._]+)/), l = a.match(/(BlackBerry).*Version\/([\d.]+)/), m = a.match(/(BB10).*Version\/([\d.]+)/), n = a.match(/(RIM\sTablet\sOS)\s([\d.]+)/), o = a.match(/PlayBook/), p = a.match(/Chrome\/([\d.]+)/) || a.match(/CriOS\/([\d.]+)/), q = a.match(/Firefox\/([\d.]+)/);
            (c.webkit = !!d) && (c.version = d[1]), e && (b.android = !0, b.version = e[3]),
                g && (b.ios = b.iphone = !0, b.version = g[2].replace(/_/g, ".")), f && (b.ios = b.ipad = !0,
                b.version = f[2].replace(/_/g, ".")), h && (b.webos = !0, b.version = h[2]), i && (b.touchpad = !0),
                l && (b.blackberry = !0, b.version = l[2]), m && (b.bb10 = !0, b.version = m[2]),
                n && (b.rimtabletos = !0, b.version = n[2]), o && (c.playbook = !0), j && (b.kindle = !0,
                b.version = j[1]), k && (c.silk = !0, c.version = k[1]), !k && b.android && a.match(/Kindle Fire/) && (c.silk = !0),
                p && (c.chrome = !0, c.version = p[1]), q && (c.firefox = !0, c.version = q[1]),
                b.tablet = !!(f || o || e && !a.match(/Mobile/) || q && a.match(/Tablet/)), b.phone = !(b.tablet || !(e || g || h || l || m || p && a.match(/Android/) || p && a.match(/CriOS\/([\d.]+)/) || q && a.match(/Mobile/)));
        }
        b.call(a, navigator.userAgent);
    }(tvp.$), function(a) {
        function b(b) {
            var c = b.match(/MQQBrowser\/(\d+\.\d+)/i), d = b.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i) || b.match(/V1_AND_SQ_([\d\.]+)/), e = b.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/) || b.match(/MicroMessenger\/((\d+)\.(\d+))/), f = b.match(/Mac\sOS\sX\s(\d+\_\d+)/), g = b.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/), h = b.match(/MiuiBrowser\/(\d+\.\d+)/i), i = b.match(/MI-ONE/), j = b.match(/MI PAD/), k = b.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/) || b.match(/\sUC\s/), l = b.match(/IEMobile(\/|\s+)(\d+\.\d+)/) || b.match(/WPDesktop/), m = b.match(/(ipod).*\s([\d_]+)/i), n = b.match(/(ipad).*\s([\d_]+)/i), o = b.match(/(iphone)\sos\s([\d_]+)/i), p = b.match(/Chrome\/(\d+\.\d+)/), q = b.match(/qqnews\/(\d+\.\d+\.\d+)/i), r = b.match(/qnreading\/(\d+\.\d+\.\d+)/i), s = b.match(/LieBaoFast\/(\d+\.\d+\.\d+)/i), t = b.match(/com\.douban\.frodo\/(\d+\.\d+\.\d+)/i), u = b.match(/QQLiveBrowser\/(\d+\.\d+\.\d+)/i), v = b.match(/MIDP-([\d\.]+)/i), w = b.match(/Mozilla.*Linux.*Android.*AppleWebKit.*Mobile Safari/), x = b.match(/(android)\s([\d\.]+)/i);
            if (a.browser = a.browser || {}, a.os = a.os || {}, window.ActiveXObject) {
                var y = 6;
                (window.XMLHttpRequest || b.indexOf("MSIE 7.0") > -1) && (y = 7), (window.XDomainRequest || b.indexOf("Trident/4.0") > -1) && (y = 8),
                    b.indexOf("Trident/5.0") > -1 && (y = 9), b.indexOf("Trident/6.0") > -1 && (y = 10),
                    a.browser.ie = !0, a.browser.version = y;
            } else b.indexOf("Trident/7.0") > -1 && (a.browser.ie = !0, a.browser.version = 11);
            x && (this.os.android = !0, this.os.version = x[2]), v && (this.os.android = !0),
                m && (this.os.ios = this.os.ipod = !0, this.os.version = m[2].replace(/_/g, ".")),
                n && (this.os.ios = this.os.ipad = !0, this.os.version = n[2].replace(/_/g, ".")),
                o && (this.os.iphone = this.os.ios = !0, this.os.version = o[2].replace(/_/g, ".")),
                g && (this.os.windows = !0, this.os.version = g[2]), f && (this.os.Mac = !0, this.os.version = f[1]),
                b.indexOf("lepad_hls") > 0 && (this.os.LePad = !0), j && (this.os.MIPAD = !0), c && (this.browser.MQQ = !0,
                this.browser.version = c[1]), d && (this.browser.MQQClient = !0, this.browser.version = d[1]),
                e && (this.browser.WeChat = !0, this.browser.version = e[1]), h && (this.browser.MIUI = !0,
                this.browser.version = h[1]), k && (this.browser.UC = !0, this.browser.version = k[1] || NaN),
                l && (this.browser.IEMobile = !0, this.browser.version = l[2]), w && (this.browser.AndriodBrowser = !0),
                i && (this.browser.M1 = !0), p && (this.browser.Chrome = !0, this.browser.version = p[1]),
                q && (this.browser.qqnews = !0, this.browser.version = q[1]), r && (this.browser.kuaibao = !0,
                this.browser.version = r[1]), s && (this.browser.liebao = !0, this.browser.version = s[1]),
                t && (this.browser.douban = !0, this.browser.version = t[1]), u && (this.browser.qqlive = !0,
                this.browser.version = u[1]), this.os.windows && ("undefined" != typeof navigator.platform && "win64" == navigator.platform.toLowerCase() ? this.os.win64 = !0 :this.os.win64 = !1);
            var z = {
                iPad7:"iPad; CPU OS 7",
                LePad:"lepad_hls",
                XiaoMi:"MI-ONE",
                SonyDTV:"SonyDTV",
                SamSung:"SAMSUNG",
                HTC:"HTC",
                VIVO:"vivo"
            };
            for (var A in z) this.os[A] = -1 !== b.indexOf(z[A]);
            a.os.phone = a.os.phone || /windows phone/i.test(b), this.os.getNumVersion = function() {
                return parseFloat(a.os.version, "10");
            }, this.os.hasTouch = "ontouchstart" in window, this.os.hasTouch && this.os.ios && this.os.getNumVersion() < 6 && (this.os.hasTouch = !1),
                a.browser.WeChat && a.browser.version < 5 && (this.os.hasTouch = !1), a.extend(a.browser, {
                getNumVersion:function() {
                    return parseFloat(a.browser.version, "10");
                },
                isFFCanOcx:function() {
                    return a.browser.firefox && a.browser.getNumVersion() >= 3 ? !0 :!1;
                },
                isCanOcx:function() {
                    return !(!a.os.windows || !a.browser.ie && !a.browser.isFFCanOcx() && !a.browser.webkit);
                },
                isNotIESupport:function() {
                    return !!a.os.windows && (!!a.browser.webkit || a.browser.isFFCanOcx());
                }
            }), a.userAgent = {}, a.extend(a.userAgent, a.os), a.extend(a.userAgent, a.browser),
                a.userAgent.browserVersion = a.browser.version, a.userAgent.osVersion = a.os.version,
                delete a.userAgent.version;
        }
        b.call(a, navigator.userAgent);
    }(tvp.$), function(a) {
        var b = {
            getByID:function(a) {
                return document.getElementById(a);
            },
            noop:function() {},
            isString:function(b) {
                return "string" === a.type(b);
            },
            isUndefined:function(b) {
                return "undefined" === a.type(b);
            },
            now:function() {
                return new Date().getTime();
            },
            getISOTimeFormat:function() {
                var a = new Date(), b = a.getFullYear(), c = a.getMonth() + 1, d = a.getDate(), e = a.getHours(), f = a.getMinutes(), g = a.getSeconds();
                return [ [ b, 10 > c ? "0" + c :c, 10 > d ? "0" + d :d ].join("-"), [ 10 > e ? "0" + e :e, 10 > f ? "0" + f :f, 10 > g ? "0" + g :g ].join(":") ].join(" ");
            },
            formatSeconds:function(a) {
                a = parseInt(a);
                var b = parseInt(a / 60), c = b >= 60 ? parseInt(b / 60) :0, d = a % 60, e = "";
                return b >= 60 && (b %= 60), c > 0 && (e += 10 > c ? "0" + c :c, e += ":"), e += 10 > b ? "0" + b :b,
                    e += ":", e += 10 > d ? "0" + d :d;
            },
            formatSecondsWithText:function(a) {
                var b = this.formatSeconds(a), c = b.split(":"), d = "";
                switch (c.length) {
                    case 1:
                        d = c[0] + "秒";
                        break;

                    case 2:
                        d = c[0] + "分" + c[1] + "秒";
                        break;

                    case 3:
                        d = c[0] + "小时" + c[1] + "分" + c[2] + "秒";
                        break;

                    default:
                        d = b;
                }
                return d;
            },
            formatFileSize:function(a) {
                return a = parseInt(a, 10), a = a / 1024 / 1024, a = a.toFixed(1), a + "M";
            },
            getHost:function() {
                var a = window.location.hostname || window.location.host, b = location.host.split(".");
                return b.length > 1 && (a = b.slice(b.length - 2).join(".")), a;
            },
            getUrlParam:function(a, b) {
                b = b || document.location.toString();
                var c = new RegExp("(^|&|\\\\?)" + a + "=([^&]*)(&|$|#)"), d = null;
                return d = b.match(c), d ? d[2] :"";
            },
            setUrlParam:function(a, b, c) {
                c = c || location.href;
                var d, e, f = new RegExp("[\\?&#]" + a + "=([^&#]+)", "gi"), g = c.match(f), h = "{key" + new Date().getTime() + "}";
                if (d = g && g.length > 0 ? g[g.length - 1] :"", e = a + "=" + b, d) {
                    var i = d.charAt(0);
                    c = c.replace(d, h), c = c.replace(h, b ? i + e :"");
                } else b && (c += c.indexOf("?") > -1 ? "&" + e :"?" + e);
                return c;
            },
            filterXSS:function(b) {
                return a.isString(b) ? b.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;") :b;
            },
            createGUID:function(a) {
                a = a || 32;
                for (var b = "", c = 1; a >= c; c++) {
                    var d = Math.floor(16 * Math.random()).toString(16);
                    b += d;
                }
                return b;
            },
            newGuid:function() {
                function a() {
                    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
                }
                return [ a(), a(), a(), a(), a(), a(), a(), a() ].join("");
            },
            formatSize:function(a) {
                var b = "" + a;
                return b.indexOf("%") > 0 ? b :b.indexOf("px") > 0 ? b :/^\d+$/.test(b) ? b + "px" :b;
            },
            compareVersion:function(a, b) {
                a = String(a).split("."), b = String(b).split(".");
                try {
                    for (var c = 0, d = Math.max(a.length, b.length); d > c; c++) {
                        var e = isFinite(a[c]) && Number(a[c]) || 0, f = isFinite(b[c]) && Number(b[c]) || 0;
                        if (f > e) return -1;
                        if (e > f) return 1;
                    }
                } catch (g) {
                    return -1;
                }
                return 0;
            },
            isTrue:function(a) {
                return !!tvp.$.filterXSS(a);
            },
            loadPluginCss:function(b) {
                var c = "", d = tvp.defaultConfig.pluginCssUrl;
                return b in d && (c = tvp.defaultConfig.cssPath + d[b]), a.loadCss(c);
            },
            getData:function(a) {
                return window.localStorage ? window.localStorage[a] :void 0;
            },
            setData:function(a, b) {
                return window.localStorage ? (window.localStorage[a] = b, !0) :void 0;
            },
            delData:function(a) {
                return window.localStorage ? (window.localStorage.removeItem(a), !0) :void 0;
            },
            formatTpl:function(b, c) {
                if (b && "object" === a.type(c)) {
                    for (var d in c) for (var e = "${" + d + "}"; b.indexOf(e) > -1; ) b = b.replace(e, c[d]);
                    return b;
                }
            },
            loadCss:function(b) {
                var c = a.Deferred(), d = !1;
                if (b) {
                    for (;b.indexOf("../") >= 0; ) b = b.replace("../", "");
                    b = a.filterXSS(b);
                    var e = document, f = e.getElementsByTagName("head")[0] || e.documentElement, g = f.getElementsByTagName("base")[0], h = e.createElement("link");
                    h.rel = "stylesheet", h.href = b, h.onload = h.onerror = function() {
                        h.onload = h.onerror = null, d = !0, c.resolve();
                    }, setTimeout(function() {
                        d || c.resolve();
                    }, 2500), g ? f.insertBefore(h, g) :f.appendChild(h);
                } else c.reject();
                return c;
            }
        };
        a.extend(a, b);
    }(tvp.$), function(a) {
        a.cookie = {
            set:function(a, b, c, d, e) {
                if (e) {
                    var f = new Date(), g = new Date();
                    g.setTime(f.getTime() + 36e5 * e);
                }
                return document.cookie = a + "=" + b + "; " + (e ? "expires=" + g.toGMTString() + "; " :"") + (d ? "path=" + d + "; " :"path=/; ") + (c ? "domain=" + c + ";" :"domain=" + window.location.host + ";"),
                    !0;
            },
            get:function(a) {
                var b = new RegExp("(?:^|;+|\\s+)" + a + "=([^;]*)"), c = document.cookie.match(b);
                return c ? c[1] :"";
            },
            del:function(a, b, c) {
                var d = new Date();
                d.setTime(d.getTime() - 1), document.cookie = a + "=; expires=" + d.toGMTString() + ";" + (c ? "path=" + c + "; " :"path=/; ") + (b ? "domain=" + b + ";" :"domain=" + window.location.host + ";");
            }
        };
    }(tvp.$), tvp = tvp || {}, tvp.common = {
        isUseHtml5:function() {
            var a = navigator.userAgent, b = null;
            if (/ipad|ipod|iphone|lepad_hls|IEMobile|WPDesktop/gi.test(a)) return !0;
            if (tvp.$.os.android) {
                if (tvp.common.isSupportMP4()) return !0;
                if (tvp.$.browser.MQQ && tvp.$.browser.getNumVersion() >= 4.2) return !0;
                if (-1 != a.indexOf("MI2")) return !0;
                if (tvp.$.os.version >= "4" && (b = a.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)) && b[1] >= 4.2) return !0;
                if (tvp.$.os.version >= "4.1") return !0;
            }
            return !1;
        },
        isInUseH5:function() {
            var a = navigator.userAgent, b = null;
            if (tvp.$.os.android) {
                if (tvp.$.browser.MQQ && tvp.$.browser.getNumVersion() >= 4.2) return !0;
                if (-1 != a.indexOf("MI2")) return !0;
                if (tvp.$.os.version >= "4" && (b = a.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)) && b[1] >= 4.2) return !0;
                if (tvp.$.os.version >= "4.1") return !0;
            }
        },
        isUseHLS:function() {
            return tvp.$.os.ios ? !0 :void 0;
        },
        isMac:function() {
            var a = /Macintosh/gi.test(navigator.userAgent);
            return a;
        },
        isLiveUseHTML5:function() {
            return tvp.$.os.ios ? !0 :tvp.$.os.ipad ? !0 :tvp.$.os.android && tvp.common.isSupportM3u8() ? !0 :!1;
        },
        isSupportM3u8:function() {
            var a = document.createElement("video"), b = [ "application/x-mpegURL", "audio/mpegurl", "vnd.apple.mpegURL", "application/vnd.apple.mpegURL" ], c = !1;
            return "function" == typeof a.canPlayType && tvp.$.each(b, function(b, d) {
                return a.canPlayType(d) ? void (c = !0) :void 0;
            }), a = null, tvp.$.os.android && (tvp.$.os.version >= "4" && tvp.$.browser.Chrome && (c = !0),
                tvp.$.browser.M1 && (c = !1), /V8 Build/.test(navigator.userAgent) && (c = !1),
                tvp.$.browser.MQQ && tvp.$.browser.getNumVersion() >= 4.2 && (c = !0)), c;
        },
        isSupportMP4:function() {
            var a = document.createElement("video");
            if ("function" == typeof a.canPlayType) {
                if ("probably" == a.canPlayType('video/mp4; codecs="mp4v.20.8"')) return !0;
                if ("probably" == a.canPlayType('video/mp4; codecs="avc1.42E01E"') || "probably" == a.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')) return !0;
            }
            return !1;
        },
        isSupportSVG:function() {
            return document.implementation && tvp.$.isFunction(document.implementation.hasFeature) ? document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") :!1;
        },
        isEnforceMP4:function() {
            if (tvp.$.os.android) {
                if (tvp.$.browser.firefox) return !0;
                if (tvp.$.browser.chrome) return !1;
                if (tvp.$.os.version >= "4.0" && tvp.$.browser.MQQ && tvp.$.browser.version < "4.0") return !0;
            }
            return !1;
        },
        getUin:function(a) {
            var b = tvp.$.cookie.get("skey"), c = tvp.$.cookie.get("lskey"), d = "", e = 0, f = !1;
            return "undefined" == typeof isLeak && "undefined" != typeof a && (isLeak = a),
                isLeak = "undefined" == typeof isLeak ? !1 :!0, f = !!isLeak && "" != c, f || "" != b ? (d = tvp.$.cookie.get("uin"),
                "" == d && f && (d = tvp.$.cookie.get("luin")), e = parseInt(d.replace(/^o0*/g, ""), 10),
                isNaN(e) || 1e4 >= e ? 0 :e) :0;
        },
        getSKey:function(a) {
            var b = tvp.$.cookie.get("skey"), c = tvp.$.cookie.get("lskey"), d = "";
            return d = a ? "" != b && "" != c ? b :b || c :b;
        },
        getToken:function(a) {
            var b = this.getSKey(a), c = this.time33(b);
            return c;
        },
        time33:function(a) {
            for (var b = 0, c = a.length, d = 5381; c > b; ++b) d += (d << 5) + a.charAt(b).charCodeAt();
            return 2147483647 & d;
        },
        openLogin:function() {},
        getVideoSnap:function(a, b) {
            var c, d, e = 1e8;
            if (a.indexOf("_") > 0) {
                var f = a.split("_");
                a = f[0], b = parseInt(f[1]);
            }
            for (var g = 4294967296, h = 0, i = 0; i < a.length; i++) {
                var j = a.charCodeAt(i);
                h = 32 * h + h + j, h >= g && (h %= g);
            }
            return d = h % e, void 0 == b && (b = 0), c = 0 == b ? [ "http://vpic.video.qq.com/", d, "/", a, "_160_90_3.jpg" ].join("") :[ "http://vpic.video.qq.com/", d, "/", a, "_", "160_90_", b, "_1.jpg" ].join("");
        },
        getVideoSnapMobile:function(a, b) {
            b = b || 0;
            var c = [ "496_280" ], d = "http://shp.qpic.cn/qqvideo_ori/0/{vid}_{index}/0";
            return d.replace("{vid}", a).replace("{index}", c[b]);
        },
        picerr:function() {},
        getDeviceId:function() {
            var a = tvp.DEVICE.other;
            return tvp.$.os.iphone ? a = tvp.DEVICE.iphone :tvp.$.os.ipad ? a = tvp.DEVICE.ipad :tvp.$.os.android && tvp.$.os.phone && (a = tvp.DEVICE.aphone),
                a;
        },
        getPlatformId:function() {
            var a = tvp.PLATFORM.other;
            return tvp.$.browser.WeChat ? a = tvp.PLATFORM.wechat :tvp.$.browser.MQQClient ? a = tvp.PLATFORM.mqq :tvp.$.browser.MQQ && (a = tvp.PLATFORM.qqbrowser),
                a;
        },
        getParams:function(a) {
            for (var b, c, d = a.indexOf("?"), e = a.substring(d + 1), f = /\w+=[^&]+/g, g = {}; null !== (b = f.exec(e)); ) c = b[0].split("="),
                c.length >= 2 && (g[c.shift()] = c.join("="));
            return g;
        },
        recomdTextById:function(a) {
            if (a) {
                if (this.recomdText || (this.recomdText = {}), this.recomdText[a] && "string" == typeof this.recomdText[a]) return this.recomdText[a];
                var b, c = tvp.$.Deferred(), d = this, e = 50;
                return e = 0, e && 100 * Math.random() > e ? (c.resolve(), c) :(b = tvp.common.get_request_url("like") + "?callback=?",
                    tvp.$.ajax({
                        url:b,
                        dataType:"jsonp",
                        jsonpCallback:"tvp_request_like_callback_" + parseInt(1e6 * Math.random()),
                        data:{
                            id:a,
                            uin:0,
                            playright:7,
                            msgtype:103,
                            otype:"json",
                            tablist:9
                        }
                    }).done(function(b) {
                            b && b.rmdword ? (d.recomdText[a] = b, c.resolve()) :c.resolve();
                        }).fail(function() {
                            c.resolve();
                        }), setTimeout(function() {
                    c.resolve();
                }, 5e3), c);
            }
        },
        get_hostname_fromUrl:function(a) {
            if (a) {
                var b = document.createElement("a");
                return b.href = a, b.hostname;
            }
        },
        get_css_path:function() {
            return "//imgcache.qq.com/tencentvideo_v1/vstyle/mobile/v2/style/";
        },
        get_js_path:function() {
            return "//imgcache.qq.com/tencentvideo_v1/tvp/";
        },
        get_request_url:function(a) {
            var b = {
                getinfo:[ "http://h5vv.video.qq.com/getinfo", "https://sec.video.qq.com/p/h5vv.video/getinfo" ],
                getinfoInews:[ "http://h5wx.video.qq.com/getinfo?callback=?&", "https://sec.video.qq.com/p/h5wx.video/getinfo?callback=?&" ],
                getvinfo:[ "http://h5vv.video.qq.com/getvinfo", "https://sec.video.qq.com/p/h5vv.video/getvinfo" ],
                getkey:[ "http://h5vv.video.qq.com/getkey", "https://sec.video.qq.com/p/h5vv.video/getkey" ],
                getkeyInews:[ "http://h5wx.video.qq.com/getkey?callback=?&", "https://sec.video.qq.com/p/h5wx.video/getkey?callback=?&" ],
                limit_conf:[ "http://v.qq.com/iframe/limit_conf.js", "https://v.qq.com/iframe/limit_conf.js" ],
                zb:[ "http://info.zb.video.qq.com", "https://sec.video.qq.com/p/info.zb/video/" ],
                swf_root:[ "http://imgcache.qq.com/tencentvideo_v1/player/", "https://imgcache.qq.com/tencentvideo_v1/player/" ],
                rmd_mobile:[ "http://like.video.qq.com/fcgi-bin/rmd_mobile", "https://sec.video.qq.com/p/like.video/fcgi-bin/rmd_mobile" ],
                like:[ "http://like.video.qq.com/fcgi-bin/like", "https://sec.video.qq.com/p/like.video/fcgi-bin/like" ],
                dataout_ex:[ "http://sns.video.qq.com/fcgi-bin/dlib/dataout_ex", "https://sec.video.qq.com/p/sns.video/fcgi-bin/dlib/dataout_ex" ],
                get_dtype:[ "http://h5vv.video.qq.com/getdtype", "https://sec.video.qq.com/p/h5vv.video/getdtype" ]
            };
            return "https:" === window.location.protocol ? b[a][1] :b[a][0];
        },
        get_chid:function() {
            var a = "";
            return /(.*\.)3g\.qq\.com$/i.test(document.location.hostname) ? a = 13 :"v.qq.com" === document.location.hostname || tvp.$.browser.qqlive ? a = 0 :tvp.$.browser.WeChat ? a = 3 :tvp.$.browser.MQQClient ? a = 10 :tvp.$.browser.qqnews && (a = 2),
                a;
        },
        get_stdfrom:function() {
            var a = "view.inews.qq.com" === location.host, b = tvp.$;
            return b.os.iphone || b.os.ipod ? a ? "v3110" :"v3010" :b.os.ipad ? a ? "v4110" :"v4010" :b.os.android ? b.os.tablet ? "v6010" :a ? "v5110" :"v5010" :b.browser.IEMobile ? "v7010" :"v1010";
        },
        get_platform:function() {
            var a = tvp.$;
            return a.os.iphone ? 1 :a.os.ipad ? 2 :a.os.android ? 3 :4;
        },
        is_mqq_buluo:function() {
            return !tvp.$.browser.MQQClient || "xiaoqu.qq.com" !== window.location.hostname && "buluo.qq.com" !== window.location.hostname ? !1 :!0;
        },
        getPageType:function() {
            return tvp.app ? tvp.app.pageType :tvp.$.browser.WeChat ? 1 :tvp.$.browser.MQQClient ? 2 :tvp.$.browser.MQQ ? 3 :0;
        },
        getPosition:function(a) {
            for (var b = a.offsetLeft, c = a.offsetTop, d = a.offsetParent; null !== d; ) b += d.offsetLeft,
                c += d.offsetTop, d = d.offsetParent;
            return {
                x:b,
                y:c
            };
        },
        afterWeChatReady:function(a) {
            function b() {
                c.resolve();
            }
            var c = tvp.$.Deferred(), d = a.timeout || 5e3;
            return tvp.$.browser.WeChat ? "undefined" != typeof WeixinJSBridge && WeixinJSBridge.on ? b() :(document.addEventListener("WeixinJSBridgeReady", function() {
                b();
            }), setTimeout(function() {
                b();
            }, d)) :b(), c;
        }
    }, tvp.version = function() {
        function a(a) {
            if (b(a)) return a;
            if (/\d+/i.test(a)) {
                var c = parseInt(a / 1e4 / 100, 10), d = parseInt(a / 1e4, 10) - 100 * c, e = parseInt(a, 10) - (100 * c * 1e4 + 1e4 * d), f = c + "." + d + "." + e;
                return f;
            }
            return a;
        }
        function b(a) {
            return /^(\d+\.){2}\d+(\.\d+)?$/.test(a);
        }
        var c, d = "0.0.0.0", e = "0.0.0", f = new Image(), g = !1, h = !1;
        return "film.qq.com" == document.location.host && (h = !0), {
            getOcx:function(b) {
                if (tvp.$.isUndefined(b) && (b = !0), b && "0.0.0.0" != d) return d;
                var e;
                if (tvp.$.browser.ie) try {
                    e = "IE begin", c = new ActiveXObject(QQLive.config.PROGID_QQLIVE_INSTALLER), "undefined" != typeof c.getVersion ? (d = c.GetVersionByClsid(QQLive.config.OCX_CLSID),
                        e = "get actObj.GetVersionByClsid:" + d) :e = "no function:actObj.GetVersionByClsid";
                } catch (i) {
                    h && !g && (g = !0) && (f.src = "http://btrace.video.qq.com/collect?sIp=&iQQ=" + tvp.common.getUin() + "&sBiz=IE&sOp=" + encodeURIComponent(navigator.userAgent) + "&iSta=0&iTy=2432&iFlow=&sUrl=" + encodeURIComponent(location.toString()) + "&sRef=" + encodeURIComponent(document.referrer) + "&sMsg=" + encodeURIComponent(i.message) + "&sStep=" + encodeURIComponent(e) + "&_=" + Math.random());
                } else if (tvp.$.browser.isNotIESupport()) {
                    e = "no IE begin";
                    var j, k = navigator.plugins;
                    if (tvp.$.isUndefined(k.namedItem) || (e = "plugs.namedItem", j = k.namedItem("腾讯视频")),
                        !j) {
                        e = "no plugs.namedItem:tencentvideo";
                        for (var l = 0, m = k.length; m > l; l++) if (k[l] && "腾讯视频" == k[l].name || "npQQLive.dll" == k[l].filename) {
                            j = k[l];
                            break;
                        }
                    }
                    if (j) if (tvp.$.isUndefined(j.version)) {
                        e = "plug.description:" + j.description;
                        var n, o = j.description;
                        n = o.match(/version:((\d+\.){3}(\d+)?)/), n && (d = n[1]);
                    } else e = "plug.version:" + j.version, d = j.version; else e = "no plugs[i].filename:npQQLive.dll";
                }
                return parseInt(d, 10) || h && !g && (g = !0) && (f.src = "http://btrace.video.qq.com/collect?sIp=&iQQ=" + tvp.common.getUin() + "&sBiz=" + (tvp.$.browser.ie ? "IE" :"NOIE") + "&sOp=" + encodeURIComponent(navigator.userAgent) + "&iSta=0&iTy=2432&iFlow=&sUrl=" + encodeURIComponent(location.toString()) + "&sRef=" + encodeURIComponent(document.referrer) + "&sMsg=" + d + "&sStep=" + encodeURIComponent(e) + "&_=" + Math.random()),
                    d = a(d);
            },
            getFlash:function() {
                if ("0.0.0" != e) return e;
                var a, b = null, c = null, d = [], i = "Shockwave Flash", j = navigator, k = "application/x-shockwave-flash";
                if (tvp.$.browser.ie) try {
                    a = "IE begin", b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), a = "new ActiveXObject",
                        b && (c = b.GetVariable("$version"), a = "swf.GetVariable", c && (c = c.split(" ")[1].split(","),
                            d = [ parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10) ]));
                } catch (l) {
                    h && !g && (g = !0) && (f.src = "http://btrace.video.qq.com/collect?sIp=&iQQ=" + tvp.common.getUin() + "&sBiz=IE&sOp=" + encodeURIComponent(navigator.userAgent) + "&iSta=1&iTy=2432&iFlow=&sUrl=" + encodeURIComponent(location.toString()) + "&sRef=" + encodeURIComponent(document.referrer) + "&sMsg=" + encodeURIComponent(l.message) + "&sStep=" + encodeURIComponent(a) + "&_=" + Math.random());
                } else tvp.$.isUndefined(j.plugins) || "object" != typeof j.plugins[i] || (a = "no IE begin",
                    c = j.plugins[i].description, a = "plugins[S].description", c && (tvp.$.isUndefined(j.mimeTypes) || !j.mimeTypes[k] || j.mimeTypes[k].enabledPlugin) ? (a = "parse description",
                    c = c.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), d[0] = parseInt(c.replace(/^(.*)\..*$/, "$1"), 10),
                    d[1] = parseInt(c.replace(/^.*\.(.*)\s.*$/, "$1"), 10), d[2] = /[a-zA-Z]/.test(c) ? parseInt(c.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) :0) :a = "no mimeTypes or disable");
                return e = d.join("."), parseInt(e, 10) || h && !g && (g = !0) && (f.src = "http://btrace.video.qq.com/collect?sIp=&iQQ=" + tvp.common.getUin() + "&sBiz=" + (tvp.$.browser.ie ? "IE" :"NOIE") + "&sOp=" + encodeURIComponent(navigator.userAgent) + "&iSta=1&iTy=2432&iFlow=&sUrl=" + encodeURIComponent(location.toString()) + "&sRef=" + encodeURIComponent(document.referrer) + "&sMsg=" + e + "&sStep=" + encodeURIComponent(a) + "&_=" + Math.random()),
                    e;
            },
            getFlashMain:function() {
                return parseInt(tvp.version.getFlash().split(".")[0], 10);
            }
        };
    }(), function(a, b) {
        var c = {
            qqlive:{
                text1:"腾讯视频客户端",
                text2:"可观看更多视频",
                md5Cgi:"http://mcgi.v.qq.com/commdatav2?cmd=39&otype=json&confid=${id}",
                md5Cgi_https:"https://sec.video.qq.com/p/mcgi.v/commdatav2?cmd=39&otype=json&confid=${id}",
                payUrl:"http://film.qq.com/weixin/detail/${index}/${cid}.html",
                scheme:"tenvideo2://",
                logoClass:"",
                openUrl:"tenvideo2://?action=5&video_id=${vid}",
                liveOpenUrl:"tenvideo2://?action=8&channel_id=${lid}",
                ipadDownloadUrl:"https://itunes.apple.com/cn/app/teng-xun-shi-pinhd/id407925512?mt=8",
                iphoneDownloadUrl:"http://itunes.apple.com/cn/app/id458318329?mt=8",
                aphoneDownloadUrl:"http://mcgi.v.qq.com/commdatav2?cmd=4&confid=140&platform=aphone",
                VIA:"ANDROIDQQ.QQLIVE",
                appId:"100730521",
                downloadId:"TencentVideo",
                taskName:"TencentVideo",
                packageName:b.os.iphone ? "com.tencent.live4iphone" :"com.tencent.qqlive",
                packageUrl:"tenvideo2://can_open_me_if_install_and_regeister_this_scheme"
            },
            weishi:{
                text1:"微视客户端",
                text2:"发现更多精彩",
                logoClass:"tvp_download_app_solo_weishi",
                md5Cgi:"http://www.weishi.com/api/packdata.php?confid=${id}",
                scheme:b.os.iphone ? " weishiiosscheme://" :"weishiandroidscheme://",
                openUrl:b.os.iphone ? " weishiiosscheme://detail?tweetid=${id}" :"weishiandroidscheme://detail?tweetid=${id}",
                iphoneDownloadUrl:"http://www.weishi.com/download/index.php?pgv_ref=weishi.shipin.xinwenfenxiang",
                aphoneDownloadUrl:"http://www.weishi.com/download/index.php?pgv_ref=weishi.shipin.xinwenfenxiang",
                ipadDownloadUrl:"",
                VIA:"ANDROIDQQ.WEISHI",
                appId:"1101083114",
                downloadId:"TencentWeishi",
                taskName:"TencentWeishi",
                packageName:b.os.iphone ? "com.tencent.microvision" :"com.tencent.weishi",
                packageUrl:b.os.iphone ? "weishiiosscheme://can_open_me_if_install_and_regeister_this_scheme" :"weishiandroidscheme://can_open_me_if_install_and_regeister_this_scheme"
            },
            yyb:{
                packageName:"com.tencent.android.qqdownloader"
            }
        };
        a.app = {
            config:{
                defaultName:"qqlive",
                QQApiUrl:"http://pub.idqqimg.com/qqmobile/qqapi.js",
                mqqApiUrl:"http://res.imtt.qq.com/browser_lightapp/QQBrowserApi/getCryptext/browser_interface_getCryptext.js"
            },
            loadQQClientDefer:!1,
            loadDownloaderDefer:!1,
            loadMqqDefer:!1,
            getDownloadUrl:function(d, e) {
                return e = e || a.app.config.defaultName, d = b.os.iphone ? c[e].iphoneDownloadUrl :d || c[e].aphoneDownloadUrl,
                    d = b.os.ipad ? c[e].ipadDownloadUrl :d;
            },
            getPayUrl:function(a) {
                var d = b.formatTpl(c.qqlive.payUrl, {
                    index:a.slice(0, 1),
                    cid:a
                });
                return d;
            },
            getOpenUrl:function(d) {
                var e = {}, f = !1;
                if (!d) return f;
                if (d.appName && d.appName !== a.app.config.defaultName) return f = d.openId ? c[d.appName].openUrl.replace("${id}", d.openId) :c[d.appName].scheme;
                switch (d.lid ? e.channel_id = d.lid :d.cid ? e.cover_id = d.cid :d.tid ? e.topic_id = d.tid :d.vidArray || !d.vid ? e.video_id = "${vid}" :d.vid && (e.video_id = d.vid),
                    d.vid2 && (e.video_id = d.vid2), d.openType) {
                    case 6:
                        d.cid && (e.action = 1);
                        break;

                    case 2:
                        d.lid ? e.action = 8 :e.action = 7;
                        break;

                    case 3:
                        d.lid ? e.action = 8 :d.tid ? e.action = 6 :e.action = 5;
                        break;

                    case 4:
                        d.cid && (e.action = 1);
                        break;

                    default:
                        d.lid ? e.action = 8 :d.cid ? e.action = 1 :e.action = 5;
                }
                if (d.promotionId && (e.from = d.promotionId + "_" + (d.contentId ? d.contentId :"")),
                    e.action = e.action || 5, f = c.qqlive.scheme + "?" + decodeURIComponent(b.param(e)),
                    (d.cid || d.h5Url) && parseInt(d.pay)) {
                    var g = d.cid ? a.app.getPayUrl(d.cid) :d.h5Url;
                    b.os.iphone ? (f = g, d.openUrl = f) :d.version && parseInt(d.version) < 5852 && (f = g);
                }
                return f !== g && d.openUrl && (f = b.filterXSS(d.openUrl), f.indexOf("from") < 0 && f.indexOf("?") > -1 && d.promotionId && (f += "&from=" + d.promotionId + "_" + (d.contentId ? d.contentId :""))),
                    f;
            },
            getPackageInfo:function() {
                return c;
            },
            pageType:function() {
                return b.browser.WeChat ? 1 :b.browser.MQQClient ? 2 :b.browser.MQQ ? 3 :0;
            }(),
            isSupportApp:function() {
                return b.os.iphone || b.os.ipod || b.os.ipad ? !0 :b.os.android ? !0 :!1;
            }(),
            unbindTryOpenAppBanner:function(a) {
                a ? a.noTryOpen = !0 :"";
            },
            bindTryOpenAppBanner:function(c) {
                if (c && !([ 2, 3 ].indexOf(a.app.pageType) > -1 || 1 === a.app.pageType && (window !== top && top.location.href || window === top))) {
                    var d = a.$.os.hasTouch ? "touchend" :"click", e = c.$btn, f = e.attr("data-url"), g = !1, h = function() {
                        var b = navigator.userAgent;
                        return a.$.os.android || a.$.os.ios ? -1 != b.indexOf("qqnews/") ? !1 :a.$.os.android && g ? !1 :/^http|https/g.test(f) ? !1 :!0 :!1;
                    };
                    if (!h()) return !1;
                    e.bind("touchend click", function(a) {
                        c.noTryOpen || a.preventDefault();
                    });
                    var i = !1;
                    e.bind("touchstart", function() {
                        i = !1;
                    }).bind("touchmove", function() {
                            i = !0;
                        }), e.bind(d, function(d) {
                        if (d.preventDefault(), !i) {
                            var e, f = d.target;
                            e = "a" === f.tagName.toLowerCase() ? b(f) :b(f).parents("a"), c.noTryOpen || a.app.tryOpenAppBanner(e);
                        }
                    });
                }
            },
            tryOpenAppBanner:function(a) {
                if (a.length) {
                    var b = a.attr("href"), c = a.attr("data-url"), d = function() {
                        location.href = b;
                    }, e = function() {
                        var a = document.createElement("iframe");
                        a.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;opacity:0;",
                            a.src = c, document.body.appendChild(a);
                    };
                    e();
                    var f = new Date().valueOf();
                    setTimeout(function() {
                        var a = new Date().valueOf();
                        1550 > a - f && d();
                    }, 1500);
                }
            },
            loadMqqAPI:function() {
                if (a.app.loadMqqDefer) return a.app.loadMqqDefer;
                var c = b.Deferred();
                if (a.app.loadMqqDefer = c, window.x5) c.resolve(); else {
                    var d = this.config.mqqApiUrl;
                    b.getScript(d, function() {
                        window.x5 ? c.resolve() :c.reject();
                    });
                }
                return setTimeout(function() {
                    c.reject();
                }, 5e3), c;
            },
            invokeQQBrowserAPI:function(c) {
                function d() {
                    if (window.x5 && x5.ios && x5.ios.getMobileAppSupport) {
                        var a = {
                            scheme:c.packageInfo.packageUrl
                        };
                        x5.ios.getMobileAppSupport(a, function(a) {
                            e.resolve(a && 1 == a.isSupportApp ? 1 :0);
                        }, function() {
                            e.resolve(0);
                        });
                    } else e.resolve(0);
                    setTimeout(function() {
                        e.resolve(0);
                    }, 300);
                }
                if (!b.os.iphone && window.QQApi && QQApi.checkAppInstalled) return this.invokeQQClientAPI(c);
                var e = b.Deferred();
                if (!b.os.iphone && window.x5mtt && window.x5mtt.isApkInstalled) {
                    var f = window.x5mtt.isApkInstalled('{"packagename": ' + c.packageInfo.packageName + "}");
                    e.resolve(-1 != f ? 1 :0);
                } else b.os.iphone && parseInt(b.os.version) > 5 ? a.app.loadMqqAPI().done(function() {
                    d();
                }).fail(function() {
                        e.resolve(0);
                    }) :e.resolve(0);
                return setTimeout(function() {
                    e.resolve(0);
                }, 3e3), e;
            },
            getQQBrowserSignKey:function(c, d) {
                var e = a.app, f = e.pageType, g = new b.Deferred(), h = this.loadMqqAPI();
                return 3 != f ? void g.resolve(0) :(h.done(function() {
                    if (!window.x5 || !a.$.os.ios) return void g.resolve(0);
                    if (!x5.ios || !x5.ios.getBrowserSignature) return void g.resolve(0);
                    var b = {
                        vid:c
                    };
                    d && (b.timestamp = parseInt(new Date().valueOf() / 1e3)), x5.ios.getBrowserSignature(b, function(a) {
                        a && a.key && a.ver && a.platform ? g.resolve({
                            key:a.key,
                            ver:a.ver,
                            platform:a.platform
                        }) :g.resolve(0);
                    }, function() {
                        g.resolve(0);
                    });
                }), h.fail(function() {
                    g.resolve(0);
                }), g);
            },
            mqqBuoLuoAuth:function(a) {
                var c, d = b.Deferred();
                try {
                    window.getBrowserSignature(a, function(a) {
                        if (a && a.data) try {
                            var b = JSON.parse(a.data);
                            b && b.result && b.result.token && (c = b.result.token);
                        } catch (e) {}
                        d.resolve(c);
                    }), setTimeout(function() {
                        d.reject();
                    }, 5e3);
                } catch (e) {
                    d.reject();
                }
                return d;
            },
            kuaiBaoAppAuth:function(a, c) {
                var d = b.Deferred(), e = "undefined" != typeof c ? c + "" :parseInt(+new Date() / 1e3) + "", f = "TVP_KUAIBAO_CB_" + e.substr(-4, 4);
                window[f] = function(a) {
                    var b;
                    try {
                        b = JSON.parse(a);
                    } catch (c) {}
                    d.resolve(b);
                };
                var g = function() {
                    var b = {
                        method:"getCKey",
                        types:[ "string", "string", "string" ],
                        args:[ a, e, f ],
                        instanceName:"TencentNewsScriptControllerJsInterface"
                    }, c = "jsbridge://get_with_json_data?json=" + encodeURIComponent(JSON.stringify(b)) + "&_t=" + e, d = new Image();
                    d.src = c;
                }, h = function() {
                    var b = function() {
                        window.getBrowserSignature(a, e, f);
                    };
                    "function" == typeof window.getBrowserSignature ? b() :document.addEventListener("TencentNewsJSInjectionComplete", function() {
                        b();
                    });
                };
                return b.os.ios ? h() :b.os.android && g(), setTimeout(function() {
                    d.reject();
                }, 1e4), d;
            },

            loadQQClientAPI:function() {
                if (a.app.loadQQClientDefer) return a.app.loadQQClientDefer;
                var c = b.Deferred();
                if (a.app.loadQQClientDefer = c, window.mqq || window.QQApi) c.resolve(); else {
                    var d = this.config.QQApiUrl;
                    b.getScript(d, function() {
                        c.resolve();
                    });
                }
                return setTimeout(function() {
                    c.reject();
                }, 3e3), c;
            },
            invokeQQClientAPI:function(a) {
                function c() {
                    !e && window.QQApi && QQApi.checkAppInstalled ? QQApi.checkAppInstalled(f, function(a) {
                        a && 0 != a ? (a = a.split("."), a = a[a.length - 1], d.resolve(1, a)) :d.resolve(0);
                    }) :window.mqq && mqq.app && mqq.app.isAppInstalled ? mqq.app.isAppInstalled(f, function(a) {
                        d.resolve(a ? 1 :0);
                    }) :d.resolve(0);
                }
                var d = b.Deferred(), e = b.os.iphone, f = e ? a.packageInfo.packageUrl :a.packageInfo.packageName;
                return this.loadQQClientAPI().done(function() {
                    c();
                }).fail(function() {
                        d.resolve(0);
                    }), setTimeout(function() {
                    d.resolve(0);
                }, 5e3), d;
            },
            getAppMd5:function(d, e) {
                d = d || 140, e = e || a.app.config.defaultName;
                var f, g = b.Deferred();
                f = "https:" === window.location.protocol ? c[e].md5Cgi_https :c[e].md5Cgi;
                var h = f.replace("${id}", d);
                return b.ajax({
                    url:h,
                    dataType:"jsonp",
                    jsonpCallback:"tvp_request_getmd5_callback_" + parseInt(1e6 * Math.random())
                }).then(function(a) {
                        g.resolve(a && a.data ? a.data :a);
                    }), g;
            },
            report:function(c, d) {
                var e = {};
                d = d && d.curVideo ? d :!1, d && (e = {
                    vid:d.curVideo.getVid() || d.curVideo.getChannelId(),
                    appId:d.config.appid || d.config.appId,
                    contentId:d.config.contentId
                }), c && (c = b.extend(c, e), a.report(c), 3537 === c.cmd && a.bossReport && a.bossReport.appReportShowClick && a.bossReport.appReportShowClick(c, d));
            },
            invokeWeChatAPI:function(a) {
                var c = b.Deferred(), d = this;
                return window != top && (WeixinJSBridge = top.WeixinJSBridge), WeixinJSBridge.invoke || c.resolve(0),
                    d.getNetworkTypeInWechat().done(function(b) {
                        a && a.t && a.t.config && (a.t.config.nettype = b);
                    }), b.os.iphone ? WeixinJSBridge.invoke("getInstallState", a.packageInfo, function(a) {
                    var b = a.err_msg;
                    b.indexOf("get_install_state:yes") > -1 ? c.resolve(1) :c.resolve(0);
                }) :WeixinJSBridge.invoke("getInstallState", a.packageInfo, function(a) {
                    var b = a.err_msg;
                    if (b.indexOf("get_install_state:yes") > -1) {
                        var d = b.split("yes_"), e = 0;
                        d.length >= 2 && (e = parseInt(d[1], 10)), e = isNaN(e) ? 0 :e, c.resolve(1, e);
                    } else c.resolve(0);
                }), setTimeout(function() {
                    c.resolve(0);
                }, 6e3), c;
            },
            getNetworkTypeInWechat:function() {
                var a = b.Deferred();
                return WeixinJSBridge.invoke("getNetworkType", {}, function(b) {
                    var c = -1;
                    b && b.err_msg && ("network_type:fail" === b.err_msg && (c = 0), "network_type:wifi" === b.err_msg && (c = 1),
                        "network_type:edge" === b.err_msg && (c = 2), "network_type:wwan" === b.err_msg && (c = 3)),
                        a.resolve(c);
                }), a;
            },
            check:function(d) {
                var e = a.app, f = e.pageType, g = b.Deferred();
                if (d = d || {}, d.appName = d.appName || a.app.config.defaultName, d.packageInfo = c[d.appName],
                    1 == f) {
                    var h = window == top ? document :top.document;
                    if (top.WeixinJSBridge) e.invokeWeChatAPI(d).then(function(a, b) {
                        g.resolve(e.buildResult(a, d, b));
                    }); else try {
                        h.addEventListener("WeixinJSBridgeReady", function() {
                            e.invokeWeChatAPI(d).then(function(a, b) {
                                g.resolve(e.buildResult(a, d, b));
                            });
                        });
                    } catch (i) {
                        g.resolve(e.buildResult(0, d));
                    }
                } else if (3 == f) try {
                    e.invokeQQBrowserAPI(d).then(function(a, b) {
                        g.resolve(e.buildResult(a, d, b));
                    });
                } catch (i) {
                    g.resolve(e.buildResult(0, d));
                } else if (2 == f) try {
                    e.invokeQQClientAPI(d).then(function(a, b) {
                        g.resolve(e.buildResult(a, d, b));
                    });
                } catch (i) {
                    g.resolve(e.buildResult(0, d));
                } else g.resolve(e.buildResult(0, d));
                return g;
            },
            createDownloader:function(b) {
                this.loadDownloaderAPI().done(function() {
                    new a.AppDownloader(b);
                });
            },
            loadDownloaderAPI:function() {
                if (a.app.loadDownloaderDefer) return a.app.loadDownloaderDefer;
                var c = b.Deferred();
                a.app.loadDownloaderDefer = c;
                var d = "";
                return 1 == this.pageType && (d = a.defaultConfig.libpath + a.defaultConfig.pluginUrl.AppDownloadClickWechat),
                    2 == this.pageType && (d = a.defaultConfig.libpath + a.defaultConfig.pluginUrl.AppDownloadClickMqq),
                    d || c.reject(), b.downloadClick_wechat || b.downloadClick_mqq ? c.resolve() :(b.getScript(d, function() {
                    c.resolve();
                }), setTimeout(function() {
                    c.reject();
                }, 3e3)), c;
            },
            checkCanDownloader:function(a, c, d) {
                function e() {
                    b.downloadClick_wechat && d && b.downloadClick_wechat(d), b.downloadClick_mqq && d && b.downloadClick_mqq(d),
                        f.resolve(1);
                }
                var f = b.Deferred();
                if (b.os.iphone || b.os.ipad || !c || 1 == a) return f.resolve(0), f;
                var g = !1, h = !1, i = /android/i.test(navigator.userAgent.toLowerCase());
                return !i || 1 == a || !c.downloader || c.downloadUrl && !c.md5 || !c.downloadUrl && c.md5 ? (f.resolve(0),
                    f) :(b.isArray(c.range) && b.each(c.range, function(a, b) {
                    1 == b && (g = !0), 2 == b && (h = !0);
                }), c.downloaderCallback || (g = !0, h = !0), b.browser.WeChat && g || b.browser.MQQClient && h ? this.loadDownloaderAPI().done(function() {
                    e();
                }).fail(function() {
                        f.resolve(0);
                    }) :f.resolve(0), f);
            },
            buildResult:function(c, d, e) {
                var f = "", g = this.pageType, h = b.os.iphone;
                d.version = e;
                var i = a.app.getOpenUrl(d), j = this;
                return h && !d.openUrl && (1 == g && (i += "&callback=weixin%3A%2F%2F&sender=%e5%be%ae%e4%bf%a1"),
                    2 == g && (i += "&callback=mqqapi%3A%2F%2F&sender=%E6%89%8B%E6%9C%BAQQ"), 3 == g && (i += "&callback=mqqbrowser%3A%2F%2F&sender=QQ%E6%B5%8F%E8%A7%88%E5%99%A8")),
                    f = 1 == c ? i :b.os.iphone && parseInt(d.pay) && d.cid ? a.app.getPayUrl(d.cid) :j.getDownloadUrl(d.downloadUrl, d.appName),
                {
                    hasApp:c,
                    pageType:g,
                    os:h,
                    version:e,
                    openUrl:i,
                    liveOpenUrl:i,
                    url:f
                };
            }
        };
    }(tvp, tvp.$), tvp.PLAYER_DEFINE = {
        LIVE:1,
        VOD:2
    }, tvp.defaultConfig = {
        video:null,
        width:600,
        height:450,
        autoplay:!1,
        autoplayAfterLoadingad:!0,
        loadingadAutoplay:!1,
        isSkipLoadingAd:!1,
        skipLoadingAdTime:5,
        loadingadChid:"",
        skipLoadingAdText:"你可在{$sec}秒后关闭广告",
        skipLoadingAdCloseText:"关闭广告",
        adForbiddenTitle:"应版权方要求，好莱坞会员无法跳过该剧广告",
        adForbiddenText:"为了给腾讯视频用户提供更多优质美剧，应版权方(华纳)要求，好莱坞会员在观看华纳美剧时无法跳过广告（《吸血鬼日记》《破产姐妹》《无耻之徒》等）。我们会为会员用户继续争取免广告权益，请您继续支持，谢谢!",
        mute:!1,
        html5loop:!1,
        disableShortVideoPause:!1,
        volume:50,
        modId:"mod_player",
        playerid:"",
        coverId:"",
        typeId:0,
        pic:"",
        type:tvp.PLAYER_DEFINE.VOD,
        playerType:"auto",
        loadingswf:"",
        oid:"",
        share:!0,
        isHtml5UseHLS:"auto",
        isShowDurationLimit:!0,
        isHtml5AutoBuffer:!1,
        isHtml5UseAirPlay:!0,
        isHtml5ControlAlwaysShow:!1,
        html5Preload:"none",
        html5VodUIFeature:[ "controlbar", "tips", "title", "meta", "playpause", "progress", "timepanel", "definition", "volume", "fullscreen", "overlay", "bigben", "posterlayer", "shadow", "promotion", "loadingAd", "adonend", "bullet", "preview", "verticalbullet" ],
        html5LiveUIFeature:[ "controlbar", "tips", "playpause", "fullscreen", "overlay", "posterlayer", "shadow", "bullet", "loadingAd" ],
        html5LiveFrontShow:[ "liveDownloader" ],
        html5FeatureExtJS:{
            adonend:"//imgcache.qq.com/tencentvideo_v1/tvp/js/plugins/adonend.js?max_age=86400"
        },
        html5ForbiddenUIFeature:[],
        isHtml5UseUI:!0,
        HTML5CSSName:"",
        isHtml5ShowPosterOnStart:!0,
        isHtml5ShowPosterOnEnd:!1,
        isHtml5ShowPosterOnChange:!0,
        isiPhoneShowPosterOnPause:!0,
        isiPhoneShowPlaysinline:!0,
        isHtml5ShowPlayBtnOnPause:!0,
        isHtml5UseFakeFullScreen:!tvp.$.os.ios,
        isIOSVideoOffset:!0,
        isHtml5ShowLoadingAdOnStart:!tvp.$.os.phone,
        isHtml5ShowLoadingAdOnChange:!tvp.$.os.phone,
        isHtml5ShowLoadingAdOnReplay:!0,
        specialVideoFileDomain:"",
        flashWmode:"direct",
        vodFlashUrl:"",
        vodFlashType:"TPout",
        vodFlashExtVars:{},
        vodFlashListType:2,
        vodFlashSkin:"",
        isVodFlashShowCfg:!0,
        isVodFlashShowEnd:!0,
        isVodFlashShowSearchBar:!0,
        isVodFlashShowNextBtn:!0,
        liveFlashUrl:"",
        liveFlashSwfType:"TencentPlayerLive",
        isLiveFlashShowConfigBtn:!0,
        isLiveflashShowFullBtn:!0,
        isLiveFlashShowCfg:!0,
        liveFlashWatermark:"",
        liveFlashAppType:"",
        liveFlashExtVars:{},
        flashVersionTag:"20140714",
        ocxControlBar:"",
        ocxControlHeight:60,
        ocxSkin:"",
        isOcxShowPauseBtn:!1,
        isOcxHideControl:!1,
        plugins:{
            AppBanner:!1,
            AppRecommend:!1,
            AppDownloadOnPause:!1,
            AppBannerOnPause:!1,
            AppFollow:!1
        },
        pluginUrl:{
            AppBanner:"js/plugins/appbanner.js?v=" + tvp.ts,
            AppFollow:"js/plugins/appfollow.js?v=" + tvp.ts,
            AppRecommend:"js/plugins/apprecommend.js?v=" + tvp.ts,
            AppRecommendBanner:"js/plugins/apprecommendbanner.js?v=" + tvp.ts,
            AppDownloadOnPause:"js/plugins/appdownloadonpause.js?v=" + tvp.ts,
            AppBannerOnPause:"js/plugins/appbanneronpause.js?v=" + tvp.ts,
            AppDownloadClickWechat:"js/plugins/appdownloadclickwechat.js?v=" + tvp.ts,
            AppDownloadClickMqq:"js/plugins/appdownloadclickmqq.js?v=" + tvp.ts
        },
        cssPath:tvp.common.get_css_path(),
        pluginCssUrl:{},
        libpath:tvp.common.get_js_path(),
        noLimitBtn:!1,
        isContinuePlay:!0,
        h5VodBullet:!1,
        h5LiveBullet:!1,
        caseSetting:{},
        limitSetting:{
            downloader:!0
        },
        useLimitCase1UI:!0,
        definition:{
            fhd:"蓝光1080P",
            shd:"超清720P",
            hd:"高清480P",
            sd:"流畅270P"
        },
        isShortVideo:!1,
        longVideoID:"",
        useHtml5VerticalBullet:!1,
        verticalBulletID:"",
        flashFakeFullscreenZindex:9999
    }, function(a) {
        tvp = tvp || {}, tvp.fastclick = function(b) {
            var c = a(b), d = {}, e = a.os.hasTouch;
            e && (c.attr("data-fastclick", 1), c.on("touchstart", function(a) {
                a = e ? a.touches[0] :a, d.start = +new Date(), d.tar = a.target, d.x1 = a.pageX,
                    d.y1 = a.pageY;
            }).on("touchend", function(b) {
                    if (b.preventDefault(), b && b.changedTouches && b.changedTouches.length) {
                        b = b.changedTouches[0];
                        var c, e, f;
                        return d.end = +new Date(), d.x2 = b.pageX, d.y2 = b.pageY, c = Math.abs(d.x2 - d.x1),
                            e = Math.abs(d.y2 - d.y1), f = d.end - d.start, 30 > c && 30 > e && 300 > f ? (a(d.tar).trigger("fastclick"),
                            !1) :void 0;
                    }
                }));
        };
    }(tvp.$), function(a) {
        var b = function(a, c) {
            return function(d, e) {
                var f = /\s/.test(d) ? function(a) {
                    var b, d = [ c ], e = [ [] ];
                    for (b in a) d.push(b), e.push(a[b]);
                    return new Function(d, f.$).apply(a, e).join("");
                } :a[d] = a[d] || b(document.getElementById(d).innerHTML);
                return f.$ = f.$ || c + ".push('" + d.replace(/\\/g, "\\\\").replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join(c + ".push('").split("\r").join("\\'") + "');return " + c,
                    e ? f(e) :f;
            };
        }({}, "$" + +new Date());
        a.tmpl = b;
    }(tvp.$), function(a) {
        "undefined" == typeof a.getScript && (a.getScript = function(a, b) {
            var c = document.createElement("script"), d = document.getElementsByTagName("head")[0], e = /^(?:loaded|complete|undefined)$/;
            c.async = "async", c.src = a, c.charset = "utf-8", b && (c.onload = c.onerror = c.onreadystatechange = function() {
                e.test(c.readyState) && (c.onload = c.onerror = c.onreadystatechange = null, window.DEBUG || d.removeChild(c),
                    c = null, b());
            }), d.appendChild(c);
        });
    }(tvp.$), tvp.report = function() {
        function a() {
            return 0 == h.length ? (f = !0, void (g = null)) :(clearTimeout(e), c(h.splice(0, 1)),
                void (f = !1));
        }
        function b(a) {
            return tvp.dataset.openLazy ? a && a.toLowerCase && a.toLowerCase().indexOf("bossid=2865") > -1 ? !1 :!0 :(i && i.length && (h = i.concat(h),
                i = []), !1);
        }
        function c(c) {
            clearTimeout(e), c && "array" === tvp.$.type(c) && c.length && (c = c[0]), b(c) ? i.push(c) :(g = document.createElement("img"),
                g.onerror = a, g.src = c), setTimeout(a, 1e3);
        }
        function d(a) {
            return a && /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i.test(a) ? null == g ? (c(a),
                void (f = !1)) :f ? (c(a), void (f = !1)) :void h.push(a) :void 0;
        }
        var e, f = !0, g = null, h = [], i = [];
        return tvp.$.browser.WeChat ? tvp.$(document).off("tvp:report:continue").on("tvp:report:continue", a) :(tvp.dataset.openLazy = !1,
            a()), function(a) {
            if (tvp.$.isString(a)) return void d(a);
            if ("object" == tvp.$.type(a)) {
                var b, c = {
                    deviceId:"int1",
                    platformId:"int2",
                    appId:"int3",
                    speed:"int4",
                    contentId:"str1",
                    fileName:"str2"
                }, e = {
                    cmd:-1,
                    url:window != top ? document.referrer :document.location.href,
                    ver:tvp.ver.replace(/\$/g, ""),
                    ua:navigator.userAgent,
                    int1:tvp.common.getDeviceId(),
                    int2:tvp.common.getPlatformId(),
                    int3:0,
                    int4:0,
                    str1:"",
                    str2:tvp.filename
                }, f = "http://rcgi.video.qq.com/web_report?";
                for (b in c) b in a && (a[c[b]] = a[b], delete a[b]);
                a = tvp.$.extend(e, a), f += tvp.$.param(a), d(f);
            }
        };
    }(), tvp.ajax = function(a) {
        function b(a, b) {
            a = a || {}, b = String(b);
            var c, d = /([\d\w_]+)/g;
            for (d.lastIndex = 0; null !== (c = d.exec(b)) && (a = a[c[0]], void 0 !== a && null !== a); ) ;
            return a;
        }
        function c(a) {
            return a = a.slice(0, a.indexOf("?")), a = a.split("/"), {
                host:a[2],
                path:"/" + a.slice(3).join("/")
            };
        }
        function d(a, b, d, e) {
            var f = "http://c.isdspeed.qq.com/code.cgi", g = c(a);
            tvp.report(f, {
                domain:g.host,
                cgi:g.path,
                type:b,
                code:d,
                time:e
            });
        }
        function e(c, e) {
            if ("object" == a.type(c) && c.url && "string" == typeof c.url) {
                "object" == typeof e && (e = a.extend({
                    key:"suc",
                    value:0
                }, e));
                var f = a.Deferred(), g = a.now(), h = 0, i = a.extend({
                    dataType:"jsonp"
                }, c);
                return a.ajax(i).done(function(i) {
                    var j = i && "object" == typeof e ? b(i, e.key) :0;
                    h = a.now() - g, i && "undefined" != typeof j && j == e.value ? (d(c.url, 1, j, h),
                        f.resolve(i, h)) :(d(c.url, 3, j, h), f.resolve(i, h));
                }).fail(function(b) {
                        h = a.now() - g, d(c.url, 2, 900, h), f.reject(b, h);
                    }), f;
            }
        }
        return e;
    }(tvp.$), tvp.reportErr = function(a, b) {
        b = b || "tvperror";
        var c = "http://rcgi.video.qq.com/report/jsbossrep?block=" + b + "&ret=-1&level=4&msg=";
        a = [ location.href, navigator.userAgent, tvp.filename, tvp.ver, a ].join("|"),
            a = encodeURIComponent(a), c += a, tvp.report(c);
    }, tvp.bossReport = {
        rcmdTextReport:function(a, b, c, d) {
            var e, f, g, h, i, j;
            d = d || 0, g = window.navigator.userAgent.toLowerCase(), f = g.indexOf("qzone") > -1,
                i = tvp.app.pageType, j = tvp.common.getUin(), h = 1 === i ? 2 :2 === i ? 4 :f ? 6 :-1,
                e = {
                    oper:a,
                    iplat:h,
                    tab:b,
                    rlist:c,
                    host:location.hostname,
                    url:top.location.href || window.location.href,
                    rtype:0,
                    ptype:21,
                    uin:j,
                    int1:d,
                    int2:tvp.common.getDeviceId()
                };
            var k = "http://btrace.video.qq.com/kvcollect?BossId=2745&Pwd=0&_dc=" + Math.random();
            k += "&" + tvp.$.param(e), tvp.report(k);
        },
        window_error:function(a) {
            return;
        },
        play_report:function(a) {
            if (a && !tvp.$.isEmptyObject(a)) {
                var b = "http://btrace.video.qq.com/kvcollect?BossId=2865&Pwd=1698957057&_dc=" + Math.random();
                b += "&" + a.join("&"), tvp.report(b);
            }
        },
        user_action_report:function(a) {
            var b = {
                sop:a.actions,
                url:a.url || top.location.href,
                platform:tvp.common.getDeviceId(),
                vid:a.vid
            }, c = "http://btrace.video.qq.com/kvcollect?BossId=2797&Pwd=219856622&_dc=" + Math.random();
            c += "&" + tvp.$.param(b), tvp.report(c);
        },
        apprecommend_report:function(a) {
            var b, c = tvp.app.pageType, d = window.navigator.userAgent.toLowerCase(), e = d.indexOf("qzone") > -1;
            b = 1 === c ? 2 :2 === c ? 4 :e ? 6 :-1;
            var f = {
                oper:a.oper,
                tab:a.tab_id,
                vid:a.vid,
                rlist:a.rlist,
                page:a.page,
                url:top.location.href || window.location.href,
                iplat:b,
                ptype:21,
                rtype:1
            }, g = "http://btrace.video.qq.com/kvcollect?BossId=2745&Pwd=0&_dc=" + Math.random();
            g += "&" + tvp.$.param(f), tvp.report(g);
        },
        report_bullet_switch:function(a) {
            a = a || {};
            var b = tvp.$;
            if (a.platform = b.os.android ? 1 :b.os.iphone ? 2 :b.os.ipad ? 3 :4, a.url = window.location.href,
                "undefined" !== b.type(a.user_action)) {
                var c = "http://btrace.video.qq.com/kvcollect?BossId=3084&Pwd=1539562724&_dc=" + Math.random();
                c += "&" + b.param(a), tvp.report(c);
            }
        },
        h5_live_quality:function(a) {
            var b = {
                step:a.step,
                sid:a.sid,
                vurl:a.vurl || "",
                guid:a.guid,
                playno:a.playno,
                vdef:a.vdef,
                tpay:a.tpay,
                cpay:a.cpay,
                fplayerver:tvp.ver.replace(/\$/g, ""),
                ftime:+new Date(),
                ctime:+new Date(),
                rtime:+new Date(),
                sdtfrom:tvp.common.get_stdfrom(),
                platform:tvp.common.get_platform(),
                surl:location.href,
                sref:document.referrer,
                vip_type:"",
                adid:"",
                ptag:tvp.$.getUrlParam("ptag", location.href)
            }, c = "http://btrace.video.qq.com/kvcollect?BossId=3101&Pwd=1037836152&_dc=" + Math.random();
            c += "&" + tvp.$.param(b), tvp.report(c);
        },
        appReportShowClick:function(a, b) {
            var c = "http://btrace.video.qq.com/kvcollect?BossId=3267&Pwd=1887953802&", d = {
                cmd:-1,
                url:window != top ? document.referrer :document.location.href,
                ver:tvp.ver.replace(/\$/g, ""),
                ua:navigator.userAgent,
                int1:tvp.common.getDeviceId(),
                int2:tvp.common.getPlatformId(),
                int3:0,
                int4:0,
                str1:"",
                str2:tvp.filename
            };
            a = tvp.$.extend(d, a), a.iSta = a.cmd, delete a.cmd, a = tvp.$.extend(a, {
                iTy:3267,
                iQQ:tvp.$.cookie && tvp.$.cookie.get && (tvp.$.cookie.get("uin") || tvp.$.cookie.get("luin"))
            }), a.iQQ && (a.iQQ = a.iQQ.replace(/\D/gi, "")), b && b.config && b.config.isShortVideo ? b.config.useHtml5VerticalBullet ? a.isshortvd = 2 :a.isshortvd = 1 :a.isshortvd = 0,
                b && b.dataset && b.dataset.noShortVideoData && (a.isshortvd = 3), c += tvp.$.param(a),
                tvp.report(c);
        }
    }, function() {
        tvp.common && tvp.common.afterWeChatReady && tvp.$.browser.WeChat && tvp.common.afterWeChatReady({
            timeout:5e3
        }).done(function() {
                tvp.dataset.openLazy = !1, tvp.$(document).trigger("tvp:report:continue");
            });
    }(), tvp.retCode = {
        snid:0,
        TYPE:{
            SUC:1,
            ERR:2
        },
        config:{
            cgi:"http://isdspeed.qq.com/cgi-bin/v.cgi",
            sampling:1
        },
        commCode:{
            error:11,
            MQzone_Err:12
        },
        report:function(a, b, c, d) {
            if (a && !(isNaN(b) || 1 > b) && "undefined" != typeof c) {
                var e = this.config.cgi;
                e += "?flag1=" + a.toString() + "&flag2=" + b.toString() + "&1=" + tvp.retCode.config.sampling + "&2=" + c,
                    d && (e += "&flag3=" + d.toString()), tvp.report(e);
            }
        }
    }, tvp.RetCode = function(a) {
        this.appid = a, this.timer = {
            begin:0,
            end:0
        }, this.SNID = tvp.retCode.snid, this.isReported = !1, tvp.retCode.snid++;
    }, tvp.RetCode.prototype = {
        begin:function() {
            this.timer.begin = new Date().valueOf();
        },
        end:function() {
            this.timer.end = this.timer.end || new Date().valueOf();
        },
        report:function(a, b) {
            if (!this.isReported) {
                this.end();
                var c = this.timer.end - this.timer.begin;
                tvp.retCode.report(this.appid, a, c, b), this.isReported = !0;
            }
        },
        reportSuc:function() {
            this.report(tvp.retCode.TYPE.SUC);
        },
        reportErr:function(a) {
            a = a || tvp.retCode.commCode.error, this.report(tvp.retCode.TYPE.ERR, a);
        }
    }, function(a, b) {
        var c = {
            poster:"",
            prefix:0,
            tail:0,
            tagStart:0,
            tagEnd:0,
            duration:"",
            historyStart:0,
            pay:0,
            eduext:0,
            classType:0,
            yyactid:0,
            coverId:"",
            title:"",
            isLookBack:0,
            tstart:0,
            CDNType:0,
            vFormat:"",
            LiveReTime:"",
            typeId:0,
            format:b.os.ipad || b.os.MIPAD ? "mp4" :"auto",
            channelExtParam:{},
            pid:"",
            rid:"",
            bulletId:"",
            bullet:!1,
            h5BulletId:"",
            freeFlowHelper:!1
        };
        a.VideoInfo = function() {
            function d(a) {
                return a.indexOf("_") < 0 ? a :a.split("_")[0];
            }
            function e(a) {
                return a.indexOf("_") < 0 ? 0 :parseInt(a.split("_")[1]);
            }
            function f(a) {
                for (var b = [], c = a.split("|"), e = 0; e < c.length; e++) b.push(d(c[e]));
                return b.join("|");
            }
            function g() {
                p && p instanceof a.Player && p.on(a.ACTION.onVodH5Init, function() {
                    var b;
                    "auto" === p.config.isHtml5UseHLS && a.common.isUseHLS() || p.config.isHtml5UseHLS || (b = n.getMP4Url(),
                        n.callGetMp4UrlDefer.resolve(b));
                });
            }
            var h = "", i = "", j = 0, k = 0, l = "", m = "", n = this, o = {}, p = null, q = {}, r = null;
            b.extend(o, c), this.data = {}, this.url = "", this.lastQueryVid = "", this.callGetMp4UrlDefer = b.Deferred(),
                b.each(o, function(a) {
                    var b = a.charAt(0).toUpperCase() + a.substr(1);
                    n["set" + b] = function(b) {
                        return o[a] = b, this;
                    }, n["get" + b] = function() {
                        return o[a];
                    };
                }), this.setCurPlayer = function(a) {
                p = a, g();
            }, this.setVid = function(c) {
                if (a.$.isString(c)) {
                    if (this.clear(), l = c, c.indexOf("|") < 0) {
                        var g = d(c);
                        h = g, k = e(c), i = g;
                    } else {
                        var j = c.split("|");
                        h = d(j[0]), k = e(j[0]), i = f(c);
                    }
                    return h = b.filterXSS(h), i = b.filterXSS(i), this;
                }
            }, this.getVid = function() {
                return h;
            }, this.getVidList = function() {
                return i;
            }, this.getVidArray = function() {
                return i.split("|");
            }, this.getIdx = function() {
                return k;
            }, this.getDuration = function() {
                if (!o.duration) return this.data && this.data.vl && b.isArray(this.data.vl.vi) && this.data.vl.vi.length > 0 && 0 != this.data.vl.vi[0].td ? this.data.vl.vi[0].td :0;
                for (var a = o.duration.split("|"), c = 0, d = 0, e = a.length; e > d; d++) c += parseInt(a[d]);
                return c;
            }, this.getFileSize = function() {
                return this.data && this.data.vl && this.data.vl.vi && this.data.vl.vi[0] && this.data.vl.vi[0].fs ? parseInt(this.data.vl.vi[0].fs, 10) :0;
            }, this.getTimelong = function() {
                return this.getDuration();
            }, this.getEndOffset = function() {
                return this.getDuration() - this.getTail();
            }, this.setChannelId = function(b) {
                return a.$.isString(b) ? (m = b, this) :void 0;
            }, this.getChannelId = function() {
                return m;
            }, this.getFullVid = function() {
                return 0 == this.getIdx() ? d(this.getVid()) :d(this.getVid()) + "_" + this.getIdx();
            }, this.getTitle = function() {
                return "" === o.title && this.data && ("mp4" == this.data.playtype && this.data.vl && b.isArray(this.data.vl.vi) && this.data.vl.vi.length > 0 ? o.title = this.data.vl.vi[0].ti || "" :"hls" == this.data.playtype && b.isArray(this.data.vi) && this.data.vi.length > 0 && (o.title = this.data.vi[0].title || "")),
                    o.title;
            }, this.clear = function() {
                h = "", i = "", j = 0, k = 0, m = "", r = null, q = {}, b.extend(o, c), this.data = {},
                    this.url = "";
            }, this.clone = function(a) {
                a.setVid(l), a.setChannelId(m);
                for (var c in o) {
                    var d = c.charAt(0).toUpperCase() + c.substr(1);
                    a["set" + d](this["get" + d]());
                }
                b.extend(a.data, this.data);
            }, this.getVideoSnap = function() {
                var b = [];
                return b[0] = a.common.getVideoSnap(h, k), b[1] = b[0].replace("_160_90_3", "_1"),
                    b[2] = b[1].replace("_1.jpg", ".png"), b;
            }, this.getMP4Url = function(c, d) {
                var e = "", f = this.getVidArray(), g = "";
                if (b.isString(c)) {
                    if (e = c, b.inArray(c, f) < 0) {
                        var h = b.Deferred();
                        return h.reject(), h;
                    }
                } else isNaN(c) ? (e = this.getVid(), g = this.getFullVid()) :g = e = this.getVidArray()[c >= f.length ? 0 :c];
                this.lastQueryVid = g || e, this.setRid(b.createGUID());
                var i, j = e + "_mp4_" + this.getFormat();
                if (d && (i = b.Deferred()), "object" == b.type(q[j]) && b.isFunction(q[j].done) && "resolved" == q[j].state()) return q[j];
                q[j] = b.Deferred();
                var k = this;
                return a.h5Helper.loadVideoUrlByVid({
                    vid:e,
                    isPay:this.getPay(),
                    eduext:o.eduext ? o.eduext :0,
                    yyactid:o.yyactid ? o.yyactid :0,
                    classType:o.classType,
                    fmt:this.getFormat(),
                    appId:p instanceof a.Player ? p.config.appid :0,
                    contentId:p instanceof a.Player ? p.config.contentId :""
                }).done(function(a, c, d, e) {
                        var f = k.getFreeFlowHelper(), g = !1, h = function(a) {
                            "array" === b.type(a) ? (k.url = a[0], k.dataHls = a, a = a[0]) :k.url = a, k.data = c,
                                k.data.playtype = "mp4", "undefined" != typeof d && (k.videoSlice = d), "undefined" != typeof e && (k.dataJson = e,
                                k.setDuration(e.preview + "")), i ? i.resolve(a) :q[j] && q[j].resolve(a);
                        };
                        "function" === b.type(f) ? (f(a, function(a) {
                            g = !0, h(a);
                        }), setTimeout(function() {
                            g || h(a);
                        }, 5e3)) :h(a);
                    }).fail(function(a, c) {
                        q[j] && q[j].reject(a, b.isUndefined(c) ? 0 :c);
                    }), i ? i :q[j];
            }, this.switchDefinition = function(c) {
                var d = b.Deferred(), e = this;
                return a.h5Helper.loadVideoUrlByVid({
                    vid:this.getVid(),
                    isPay:this.getPay(),
                    eduext:this.getEduext(),
                    yyactid:this.getYyactid(),
                    classType:this.getClassType(),
                    fmt:c || this.getFormat(),
                    appId:p instanceof a.Player ? p.config.appid :0,
                    contentId:p instanceof a.Player ? p.config.contentId :""
                }).done(function(a, c, f, g) {
                        var h = e.getFreeFlowHelper(), i = !1, j = function(a) {
                            e.url = a, e.data = c, e.data.playtype = "mp4", "undefined" != typeof f && (e.videoSlice = f),
                                "undefined" != typeof g && (e.dataJson = g, e.setDuration(g.preview + "")), d.resolve(a);
                        };
                        "function" === b.type(h) ? (h(a, function(a) {
                            i = !0, j(a);
                        }), setTimeout(function() {
                            i || j(a);
                        }, 5e3)) :j(a);
                    }).fail(function(a, c) {
                        d.reject(a, b.isUndefined(c) ? 0 :c);
                    }), d;
            }, this.getHLS = function(c) {
                var d = "", e = this.getVidArray(), f = "";
                if (b.isString(c)) {
                    if (d = c, b.inArray(c, e) < 0) {
                        var g = b.Deferred();
                        return g.reject(), g;
                    }
                } else isNaN(c) ? (d = this.getVid(), f = this.getFullVid()) :f = d = this.getVidArray()[c >= e.length ? 0 :c];
                this.lastQueryVid = f || d, this.setRid(b.createGUID());
                var h = d + "_hls_" + this.getFormat();
                if ("object" == b.type(q[h]) && b.isFunction(q[h].done) && "resolved" == q[h].state()) return q[h];
                q[h] = b.Deferred();
                var i = this;
                return a.h5Helper.loadHLSUrlByVid({
                    vid:d,
                    isPay:this.getPay(),
                    fmt:this.getFormat(),
                    appId:p instanceof a.Player ? p.config.appid :0,
                    contentId:p instanceof a.Player ? p.config.contentId :""
                }).done(function(a, b) {
                        i.url = a, i.data = b, i.data.playtype = "hls", q[h] && q[h].resolve(a);
                    }).fail(function(a, c) {
                        q[h] && q[h].reject(a, b.isUndefined(c) ? 0 :c);
                    }), q[h];
            }, this.getPlayFormat = function() {
                if (!b.isPlainObject(this.data)) return this.getFormat();
                if ("object" == b.type(this.data.fl) && b.isArray(this.data.fl.fi)) for (var a = this.data.fl.fi, c = 0; c < a.length; c++) if (1 == a[c].sl) return a[c].name;
                return this.getFormat();
            }, this.getSrtLangList = function() {
                return "object" == b.type(this.data.sfl) && b.isArray(this.data.sfl.fi) ? (b.each(this.data.sfl.fi, function(b, c) {
                    c.desc = a.html5lang.getSrtName(c.id);
                }), this.data.sfl.fi) :[];
            }, this.getSrtUrlList = function(c) {
                if (b.isUndefined(c)) {
                    var d = this.getSrtLangList();
                    if (!(d.length > 0)) return b.Deferred().reject(-1);
                    c = d[0];
                }
                if ("object" != b.type(c) && !isNaN(c)) {
                    for (var e = 0, f = this.data.sfl.fi.length; f > e; e++) if (this.data.sfl.fi[e].id == c) {
                        c = this.data.sfl.fi[e];
                        break;
                    }
                    if ("object" != b.type(c)) return b.Deferred().reject(-2);
                }
                var g = this.getVid(), h = g + "_srt_" + c.id;
                if ("object" == b.type(q[h]) && b.isFunction(q[h].done) && "resolved" == q[h].state()) return q[h];
                q[h] = b.Deferred();
                var i = this;
                return a.h5Helper.loadSRT({
                    vid:g,
                    sflid:c.id,
                    pid:i.getPid()
                }).done(function(a) {
                        var d = [];
                        "object" == b.type(a.ul) && b.isArray(a.ul.ui) && b.each(a.ul.ui, function(a, b) {
                            d.push([ b.url, "lang=" + c.name ].join("?"));
                        }), q[h].resolve(d);
                    }).fail(function(a) {
                        q[h].reject(a);
                    }), q[h];
            }, this.getFormatList = function() {
                if ("object" == b.type(r) && b.isFunction(r.done)) return r;
                r = b.Deferred();
                var a = this, c = [ "sd", "hd", "shd", "fhd" ], d = function() {
                    var d = [];
                    return b.isPlainObject(a.data.fl) && b.isArray(a.data.fl.fi) ? (b.each(a.data.fl.fi, function(a, e) {
                        -1 != b.inArray(e.name, c) && d.push(e.name);
                    }), d) :[];
                };
                return this.getMP4Url().done(function() {
                    r.resolve({
                        list:d()
                    });
                }).fail(function() {
                        r.reject({
                            list:[]
                        });
                    }), r;
            }, this.hasHardSubtitle = function() {
                for (var a = this.getFormat(), b = 0, c = this.data.fl.fi.length; c > b; b++) {
                    var d = this.data.fl.fi[b];
                    if (d.name == a) return !!d.sb;
                }
                return !1;
            }, this.hasSoftSubtitle = function() {
                return "object" == b.type(this.data.sfl) && b.isArray(this.data.sfl.fi) && this.data.sfl.fi.length > 0;
            };
        }, a.PLAYTYPE = {
            LIVE:"1",
            VOD:"2"
        };
    }(tvp, tvp.$), function(a) {
        tvp.speedlimit = {
            buildResult:function(b) {
                var c = !1, d = !1, e = a.Deferred();
                return a.browser.MQQ && a.browser.version > 5.1 && (d = !0), d && this.mqqGetResult(b).then(function(a) {
                    a ? e.resolve(a) :e.resolve();
                }), d && (c = !0), c || e.resolve(), setTimeout(function() {
                    e.resolve();
                }, 3e3), e;
            },
            mqqGetResult:function(b) {
                function c() {
                    if (window.x5 && window.x5.getBrowserSignature) try {
                        var c = parseInt(tvp.$.now() / 1e3, 10);
                        x5.getBrowserSignature("vid:" + b + "[" + c + "]", function(b) {
                            b ? d.resolve({
                                bver:a.browser.version,
                                pkckey:b
                            }) :d.resolve();
                        }, function() {
                            d.resolve();
                        });
                    } catch (e) {
                        d.resolve();
                    } else d.resolve();
                    setTimeout(function() {
                        d.resolve();
                    }, 300);
                }
                var d = a.Deferred();
                return window.x5 && window.x5.getBrowserSignature ? c() :tvp.app ? (tvp.app.loadMqqDefer || (tvp.app.loadMqqDefer = tvp.app.loadMqqAPI()),
                    tvp.app.loadMqqDefer.done(function() {
                        c();
                    }), tvp.app.loadMqqDefer.fail(function() {
                    d.resolve();
                })) :d.resolve(), d;
            }
        };
    }(tvp.$);
    var d = {};
    d.ha = function(a) {
        function b(a, b) {
            return ((a >> 1) + (b >> 1) << 1) + (1 & a) + (1 & b);
        }
        for (var c = [], d = 0; 64 > d; ) c[d] = 0 | 4294967296 * Math.abs(Math.sin(++d));
        var e = function(d) {
            for (var e, f, g, h, i = [], j = unescape(encodeURI(d)), k = j.length, l = [ e = 1732584193, f = -271733879, ~e, ~f ], m = 0; k >= m; ) i[m >> 2] |= (j.charCodeAt(m) || 128) << 8 * (m++ % 4);
            for (i[d = (k + 8 >> 6) * a + 14] = 8 * k, m = 0; d > m; m += a) {
                for (k = l, h = 0; 64 > h; ) k = [ g = k[3], b(e = k[1], (g = b(b(k[0], [ e & (f = k[2]) | ~e & g, g & e | ~g & f, e ^ f ^ g, f ^ (e | ~g) ][k = h >> 4]), b(c[h], i[[ h, 5 * h + 1, 3 * h + 5, 7 * h ][k] % a + m]))) << (k = [ 7, 12, 17, 22, 5, 9, 14, 20, 4, 11, a, 23, 6, 10, 15, 21 ][4 * k + h++ % 4]) | g >>> 32 - k), e, f ];
                for (h = 4; h; ) l[--h] = b(l[h], k[h]);
            }
            for (d = ""; 32 > h; ) d += (l[h >> 3] >> 4 * (1 ^ 7 & h++) & 15).toString(a);
            return d;
        };
        return e;
    }(16), d.stringToHex = function(a) {
        for (var b = "", c = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"), d = 0; d < a.length; d++) b += c[a.charCodeAt(d) >> 4] + c[15 & a.charCodeAt(d)];
        return b;
    }, d.hexToString = function(a) {
        for (var b = "", c = "0x" == a.substr(0, 2) ? 2 :0; c < a.length; c += 2) b += String.fromCharCode(parseInt(a.substr(c, 2), 16));
        return b;
    }, d._Seed = "#$#@#*ad", d.tempcalc = function(a, b) {
        for (var c = "", d = 0; d < a.length; d++) c += String.fromCharCode(a.charCodeAt(d) ^ b.charCodeAt(d % 4));
        return c;
    }, d.u1 = function(a, b) {
        for (var c = "", d = b; d < a.length; d += 2) c += a.charAt(d);
        return c;
    }, d._urlStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        d.urlenc = function(a, b, c) {
            for (var e, f, g, h, i, j, k, l = "", m = 0; m < a.length; ) e = a.charCodeAt(m++),
                f = a.charCodeAt(m++), g = a.charCodeAt(m++), 15 == m && (l += "A", l += b, l += c),
                h = e >> 2, i = (3 & e) << 4 | f >> 4, j = (15 & f) << 2 | g >> 6, k = 63 & g, isNaN(f) ? j = k = 64 :isNaN(g) && (k = 64),
                l = l + d._urlStr.charAt(h) + d._urlStr.charAt(i) + d._urlStr.charAt(j) + d._urlStr.charAt(k);
            return l;
        }, d.$xx = function(a, b, c, e) {
        var f = "" + Math.floor(new Date().valueOf() / 1e3), e = ("" + e).charAt(0), g = "", h = "", i = {
            plt:a || "",
            vid:b || "",
            std:c || "",
            sts:e || "",
            ts:f,
            rf:g,
            ua:h
        };
        i = window.JSON ? JSON.stringify(i) :function() {
            var a = [];
            for (var b in i) a.push('"' + b + '":"' + i[b] + '"');
            return "{" + a.join(",") + "}";
        }(i);
        var j = d.hexToString(d.ha(a + b + f + d._Seed + g + h + e.charAt(0) + c)), k = d.urlenc(d.tempcalc(j, d._Seed), e.charAt(0), f), l = d.urlenc(d.tempcalc(j, "86FG@hdf"), e.charAt(0), f), m = d.u1(k, 0), n = d.u1(k, 1);
        return {
            p:i,
            u:k,
            c:l,
            u1:m,
            u2:n,
            t:f
        };
    }, function(a, b) {
        function c() {
            return this.init();
        }
        var d = [ {
            reg:function() {
                return this.cfg.noAuth ? !0 :!1;
            },
            request:function(a) {
                var b = this;
                a.resolve({
                    param:{
                        vids:b.cfg.vid,
                        defaultfmt:b.cfg.fmt
                    }
                });
            }
        }, {
            reg:function() {
                return this.cfg.eduext ? !0 :!1;
            },
            request:function(a) {
                var b = this;
                a.resolve({
                    cgi:b.cfg2.cgi.edugetvinfo,
                    param:{
                        eduext:b.cfg.eduext,
                        platform:261001,
                        vid:b.cfg.vid,
                        defn:b.cfg.fmt
                    }
                });
            }
        }, {
            reg:function() {
                return 1 === this.cfg.classType ? !0 :!1;
            },
            request:function(a) {
                var b = this;
                a.resolve({
                    cgi:b.cfg2.cgi.edugetvinfo,
                    param:{
                        platform:221001,
                        vid:b.cfg.vid,
                        defn:b.cfg.fmt
                    }
                });
            }
        }, {
            reg:function() {
                return this.cfg.yyactid ? !0 :!1;
            },
            request:function(a) {
                var b = this;
                a.resolve({
                    cgi:b.cfg2.cgi.yygetinfo,
                    cgi2:b.cfg2.cgi.yygetkey,
                    param:{
                        actid:b.cfg.yyactid,
                        platform:181001,
                        vids:b.cfg.vid,
                        defaultfmt:b.cfg.fmt
                    }
                });
            }
        }, {
            reg:function() {
                if (window !== top && "v.qq.com" === location.hostname && "/iframe/player.html" === location.pathname) {
                    var b = a.common.getParams(location.href);
                    if (b && b.cKey && b.encryptVer && b.platform) return this.params = b, !0;
                }
                return !1;
            },
            request:function(a) {
                var b, c = this, d = {
                    cgi:c.cfg2.cgi.getinfo,
                    param:{
                        encryptVer:c.params.encryptVer,
                        platform:c.params.platform,
                        cKey:c.params.cKey,
                        vids:c.cfg.vid,
                        defaultfmt:c.cfg.fmt
                    }
                };
                try {
                    b = window.parent.location.href;
                } catch (e) {}
                b && (d.param.wxrefer = b), a.resolve(d);
            }
        }, {
            reg:function() {
                return a.common.is_mqq_buluo() ? !0 :!1;
            },
            request:function(b) {
                if (!window.getBrowserSignature) return void b.reject();
                var c = this;
                window.getBrowserSignature(c.cfg.vid, function(d) {
                    var e;
                    if (d && d.data) try {
                        var f = JSON.parse(d.data);
                        f && f.result && f.result.token && (e = f.result.token);
                    } catch (g) {}
                    e ? b.resolve({
                        param:{
                            cKey:e,
                            encryptVer:"6.4",
                            platform:a.$.os.ios ? "170408" :"170308",
                            vids:c.cfg.vid,
                            defaultfmt:c.cfg.fmt
                        }
                    }) :b.reject();
                });
            }
        }, {
            reg:function() {
                return b.browser.MQQ && !a.$.browser.MQQClient && window === top ? !0 :!1;
            },
            request:function(c) {
                var d, e, f = this, g = "undefined" != typeof f.cfg.svr_time ? f.cfg.svr_time + "" :parseInt(+new Date() / 1e3) + "", h = function() {
                    var a, d, e = {
                        vid:f.cfg.vid
                    };
                    e.timestamp = g, b.os.ios ? (a = x5.ios.getBrowserSignature, d = b.os.ipad ? e :"vid:" + e.vid + "[" + e.timestamp + "]") :(a = x5.android.getBrowserSignature,
                        d = "vid:" + e.vid + "[" + e.timestamp + "]"), a(d, function(a) {
                        if ("object" == typeof a && a.key && a.ver && a.platform) {
                            var b = {
                                cgi:f.cfg.cgi.getvinfo,
                                param:{
                                    cKey:a.key,
                                    encryptVer:a.ver,
                                    platform:a.platform,
                                    vid:f.cfg.vid,
                                    defn:f.cfg.fmt
                                }
                            };
                            c.resolve(b);
                        } else if ("object" == typeof a && a.data) {
                            var b = {
                                cgi:f.cfg.cgi.getvinfo,
                                param:{
                                    cKey:a.data,
                                    encryptVer:"4.0",
                                    platform:"161001",
                                    vid:f.cfg.vid,
                                    defn:f.cfg.fmt
                                }
                            };
                            c.resolve(b);
                        } else if ("string" == typeof a) {
                            var b = {
                                cgi:f.cfg.cgi.getvinfo,
                                param:{
                                    cKey:a,
                                    encryptVer:"4.0",
                                    platform:"161001",
                                    vid:f.cfg.vid,
                                    defn:f.cfg.fmt
                                }
                            };
                            c.resolve(b);
                        } else c.reject();
                    }, function() {
                        c.reject();
                    });
                };
                d = window.x5 && x5.ios && "function" === b.type(x5.ios.getBrowserSignature), e = window.x5 && "function" === b.type(window.x5.getBrowserSignature),
                    d || e ? h() :a.app.loadMqqAPI().done(function() {
                        d = window.x5 && x5.ios && "function" === b.type(x5.ios.getBrowserSignature), e = window.x5 && "function" === b.type(window.x5.getBrowserSignature),
                            d || e ? h() :c.reject();
                    }).fail(function() {
                            c.reject();
                        });
            }
        }, {
            reg:function() {
                return b.browser.qqnews || b.browser.kuaibao ? !0 :!1;
            },
            request:function(a) {
                var c = this, d = c.cfg.vid, e = "undefined" != typeof c.cfg.svr_time ? c.cfg.svr_time + "" :parseInt(+new Date() / 1e3) + "", f = "TVP_KUAIBAO_CB_" + e.substr(-4, 4);
                window[f] = function(b) {
                    var d;
                    try {
                        d = JSON.parse(b);
                    } catch (e) {}
                    if (d && d.key && d.ver && d.platform && d.sdtfrom) {
                        var f = {
                            param:{
                                cKey:d.key,
                                encryptVer:d.ver,
                                platform:d.platform,
                                sdtfrom:d.sdtfrom,
                                vid:c.cfg.vid,
                                defaultfmt:"mp4"
                            }
                        };
                        a.resolve(f);
                    } else a.reject();
                };
                var g = function() {
                    var a = {
                        method:"getCKey",
                        types:[ "string", "string", "string" ],
                        args:[ d, e, f ],
                        instanceName:"TencentNewsScriptControllerJsInterface"
                    }, b = "jsbridge://get_with_json_data?json=" + encodeURIComponent(JSON.stringify(a)) + "&_t=" + e, c = new Image();
                    c.src = b;
                }, h = function() {
                    var a = function() {
                        window.getBrowserSignature(d, e, f);
                    };
                    "function" == typeof window.getBrowserSignature ? a() :document.addEventListener("TencentNewsJSInjectionComplete", function() {
                        a();
                    });
                };
                b.os.ios ? h() :b.os.android ? g() :a.reject();
            }
        }, {
            reg:function() {
                return b.browser.douban || b.browser.liebao ? !0 :!1;
            },
            request:function(a) {
                var b, c = this, d = "undefined" != typeof c.cfg.svr_time ? c.cfg.svr_time + "" :parseInt(+new Date() / 1e3) + "", e = function() {
                    if (!window.getBrowserSignature) return void a.reject();
                    try {
                        b = window.getBrowserSignature(c.cfg.vid, d);
                    } catch (e) {}
                    if (b && b.key && b.ver && b.platform) {
                        var f = {
                            param:{
                                cKey:b.key,
                                encryptVer:b.ver,
                                platform:b.platform,
                                vid:c.cfg.vid,
                                defaultfmt:c.cfg.fmt
                            }
                        };
                        a.resolve(f);
                    } else a.reject();
                };
                e();
            }
        }, {
            reg:function() {
                return a.$.browser.MQQClient && "mqqcartoon" === a.$.getUrlParam("openS") ? !0 :!1;
            },
            request:function(b) {
                var c = this;
                a.$.getScript("http://imgcache.qq.com/club/client/comic/release/js/util/qqComicVideoAuth.js?t=" + a.ts, function() {
                    "function" === a.$.type(window.getBrowserSignature) ? window.getBrowserSignature(c.cfg.vid, function(a) {
                        if (a && -1 !== a) {
                            var d = {
                                cgi:c.cfg2.cgi.getvinfo,
                                param:{
                                    cKey:a,
                                    encryptVer:"6.4",
                                    platform:"170101",
                                    vid:c.cfg.vid,
                                    defn:c.cfg.fmt
                                }
                            };
                            b.resolve(d);
                        }
                    }) :b.reject();
                });
            }
        } ];
        c.prototype = {
            init:function() {
                return this.reg_request;
            },
            reg_request:function(c, e) {
                var f = this;
                f.cfg = c, f.cfg2 = e;
                var g = b.Deferred(), h = !1;
                return a.config && a.config.authRules && a.config.authRules.length && (d = d.concat(a.config.authRules)),
                    b(d).each(function(a, c) {
                        return "function" !== b.type(c.reg) ? !0 :"function" !== b.type(c.request) ? !0 :c.reg.call(f) ? (h = !0,
                            c.request.call(f, g), !1) :!0;
                    }), h || g.reject(), setTimeout(function() {
                    g.reject();
                }, 6e3), g;
            }
        }, a.auth = new c();
    }(tvp, tvp.$), function(a, b) {
        function c() {
            var a = "view.inews.qq.com" === k.host;
            return location.hostname.indexOf("caixin.com") > -1 ? "v1093" :b.os.iphone || b.os.ipod ? a ? "v3110" :"v3010" :b.os.ipad ? a ? "v4110" :"v4010" :b.os.android ? b.os.tablet ? "v6010" :a ? "v5110" :"v5010" :b.browser.IEMobile ? "v7010" :"v1010";
        }
        function e(a, b) {
            for (var c = 0, d = b.length; d > c; c++) if (1 == b[c].sl) return b[c].id;
            return -1;
        }
        function f(c) {
            var d = {
                cmd:3532,
                speed:0,
                appId:0,
                contentId:"",
                vid:"",
                itype:1,
                val:0,
                val2:0,
                str3:""
            };
            c = b.extend(d, c), a.report(c);
        }
        function g(a) {
            a = a || {};
            var d, e = !1;
            return a.alias && "string" == typeof a.fn && a.vid && (a.fn = a.fn.replace(a.vid, a.alias),
                e = !0), l && "string" == typeof a.path && (a.path = a.path.replace(/\/\/(.+?)(\/|#|$|\?)/, function() {
                return arguments.length > 1 ? arguments[0].replace(arguments[1], l) :arguments[0];
            })), d = a.path.indexOf("?") > -1 ? a.path + "&" + a.fn + "&vkey=" + a.vkey + "&br=" + a.br + "&platform=2&fmt=" + a.fmt + "&level=" + a.level + "&sdtfrom=" + c() :a.path + a.fn + "?vkey=" + a.vkey + "&br=" + a.br + "&platform=2&fmt=" + a.fmt + "&level=" + a.level + "&sdtfrom=" + c(),
                b.isString(a.sha) && a.sha.length > 0 && (d += "&sha=" + a.sha), e && (d += "&vidalias=1"),
                d;
        }
        function h(a) {
            if ("object" !== b.type(a)) return 0;
            if (!(a.ul && a.ul.ui && a.ul.ui.length)) return 0;
            var c = [];
            return b(a.ul.ui).each(function(a, b) {
                b.url && b.hls && b.hls.pt && c.push(b.url + b.hls.pt);
            }), 0 === c.length ? 0 :c;
        }
        function i(a) {
            return function(c) {
                f(b.extend(a, c));
            };
        }
        function j(e) {
            var f, g, h, i = "", j = 1, k = {};
            if ("object" == typeof d && "function" == typeof d.$xx && "string" == typeof e) {
                f = b.getUrlParam("platform", e), g = b.getUrlParam("vids", e), h = c(), e.indexOf("mvgetinfo?") > -1 && (b.os.iphone ? h = "V3013" :b.os.ipad ? h = "V4013" :b.os.android && (h = "V5013"));
                try {
                    k = d.$xx(f, g, h, j);
                } catch (l) {
                    "function" == typeof a.reportErr && l && l.message && a.reportErr(l.message);
                }
                k && (i = i + "&_qv_rmt=" + k.u1, i = i + "&_qv_rmt2=" + k.u2, b.getUrlParam("sdtfrom", e) || (i = i + "&sdtfrom=" + h),
                    e = e + (-1 == e.indexOf("?") ? "?" :"&") + i, b.cookie.set("qv_als", k.c));
            }
            return e;
        }
        var k = {
            isHLS:!1,
            isPay:!1,
            vid:"",
            fmt:"auto",
            platform:11001,
            host:window != top ? document.referrer :document.location.host
        }, l = "";
        k.cgi = function() {
            if ("view.inews.qq.com" === k.host) {
                var c = "";
                return b.browser.WeChat && (c = "nocache=1&"), {
                    getinfo:a.common.get_request_url("getinfoInews"),
                    getkey:a.common.get_request_url("getkeyInews") + c
                };
            }
            return {
                getinfo:a.common.get_request_url("getinfo") + "?callback=?&",
                getvinfo:a.common.get_request_url("getvinfo") + "?callback=?&",
                edugetvinfo:"http://sv.video.qq.com/edugetvinfo?",
                yygetinfo:"http://sv.video.qq.com/mvgetinfo?",
                yygetkey:"http://sv.video.qq.com/mvgetkey?",
                getkey:a.common.get_request_url("getkey") + "?callback=?&"
            };
        }(), k.retryCgi = function() {
            return b.browser.WeChat || b.browser.MQQClient ? {
                getinfo:k.cgi.getinfo.replace(/(\/\/)(.+?)(\/|$)/, "$1bkh5vv.video.qq.com$3"),
                getkey:k.cgi.getkey.replace(/(\/\/)(.+?)(\/|$)/, "$1bkh5vv.video.qq.com$3")
            } :{
                getinfo:k.cgi.getinfo.replace(/(\/\/)(.+?)(\/|$)/, "$1bkh5vv.video.qq.com$3"),
                getkey:k.cgi.getkey.replace(/(\/\/)(.+?)(\/|$)/, "$1bkh5vv.video.qq.com$3")
            };
        }(), a.h5Helper = {
            loadVideoUrlByVid:function(c) {
                var d = "";
                return a.speedlimit ? (d = b.Deferred(), a.speedlimit.buildResult().done(function(b) {
                    var e = a.h5Helper.loadVideoUrlByVid_base(c, b);
                    e.done(function(a, b) {
                        d.resolve(a, b);
                    }), e.fail(function(a, b) {
                        d.reject(a, b);
                    });
                })) :d = a.h5Helper.loadVideoUrlByVid_base(c), d;
            },
            loadVideoUrlByVid_base:function(d, f) {
                var l, m, n = {}, o = {}, p = 0, q = b.Deferred();
                b.extend(b.extend(n, k), d);
                var r, s = new a.RetCode(100126), t = !1, u = k.cgi.getinfo, v = b.now(), w = 0, x = "", y = b.noop, z = k.cgi.getkey;
                r = {
                    platform:n.platform,
                    charge:n.isPay ? 1 :0,
                    otype:"json",
                    sphls:a.common.isSupportM3u8() ? 1 :0,
                    sb:1,
                    nocache:b.browser.MQQClient || b.browser.WeChat ? 1 :0,
                    _rnd:new Date().valueOf()
                }, d.retryDefer && b.isFunction(d.retryDefer.reject) && (t = !0, q = d.retryDefer,
                    u = k.retryCgi.getinfo, z = k.retryCgi.getkey), d.loadingAdCgi && (u = d.loadingAdCgi,
                    d.noAuth = !0), d.defer && (q = d.defer), y = i({
                    itype:1,
                    val2:t ? 1 :0,
                    str3:x,
                    vid:n.vid,
                    appId:n.appId,
                    contentId:n.contentId
                }), s.begin(), y();
                var A = function(e) {
                    if (w = b.now() - v, e && e.s ? "o" != e.s ? (p = e.em || 50, m = e.exem) :e.vl && e.vl.vi && b.isArray(e.vl.vi) && 0 != e.vl.cnt ? l = e.vl.vi[0] :p = 68 :p = 50,
                        0 != p || 5 == l.fst && b.isPlainObject(l.ul) && b.isArray(l.ul.ui) && 0 != l.ul.ui.length ? 0 == p && 2 != l.st && (8 != l.st ? p = 62 :(p = 83,
                            m = l.ch)) :p = 62, d.yyactid && 83 === p && (m = -3), a.common.is_mqq_buluo() && (m = 0),
                        0 != p) return y({
                        val:p,
                        speed:w
                    }), s.reportErr(p), void q.reject(p, m);
                    if (s.reportSuc(), y({
                        val:0,
                        speed:w
                    }), d.loadingAdCgi) return void q.resolve(l.ul.ui[0].url, {
                        vl:e.vl,
                        fl:e.fl,
                        sfl:e.sfl,
                        exem:e.exem,
                        preview:e.preview
                    });
                    if (3 == e.dltype) m = h(l), q.resolve(m, {
                        vl:e.vl,
                        fl:e.fl,
                        sfl:e.sfl,
                        exem:e.exem,
                        preview:e.preview
                    }); else {
                        if (l.fvkey) return m = g({
                            path:l.ul.ui[0].url,
                            fn:l.fn,
                            vkey:l.fvkey,
                            br:l.br,
                            platform:2,
                            fmt:n.fmt,
                            level:l.level,
                            sdtfrom:c(),
                            sha:l.fsha,
                            vid:n.vid,
                            alias:l.alias
                        }), void q.resolve(m, {
                            vl:e.vl,
                            fl:e.fl,
                            sfl:e.sfl,
                            exem:e.exem,
                            preview:e.preview
                        });
                        B(e);
                    }
                }, B = function(f) {
                    var h, k = l.ul.ui[0];
                    o.br = l.br, o.path = k.url, o.fn = l.fn, o.fiid = e(n, f.fl.fi), o.vt = k.vt, h = new a.RetCode(100127),
                        h.begin(), v = b.now(), x = z + b.param({
                        otype:"json",
                        vid:n.vid,
                        format:o.fiid,
                        filename:o.fn,
                        platform:n.platform,
                        vt:o.vt,
                        charge:n.isPay ? 1 :0,
                        _rnd:new Date().valueOf()
                    }), x = j(x), y = i({
                        itype:2,
                        val2:t ? 1 :0,
                        str3:x,
                        vid:n.vid,
                        appId:n.appId,
                        contentId:n.contentId
                    }), y(), b.ajax({
                        url:x,
                        dataType:"jsonp",
                        jsonpCallback:"tvp_request_getvkey_callback_" + parseInt(1e6 * Math.random())
                    }).done(function(a) {
                            var d = "";
                            return p = 0, w = b.now() - v, a && a.s ? "o" != a.s && (p = a.em || 50) :p = 50,
                                0 != p ? (h.reportErr(p), y({
                                    val:p,
                                    speed:w
                                }), void q.reject(p)) :(d = g({
                                    path:o.path,
                                    fn:o.fn,
                                    vkey:a.key,
                                    br:o.br,
                                    platform:2,
                                    fmt:n.fmt,
                                    level:a.level,
                                    sdtfrom:c(),
                                    sha:a.sha,
                                    vid:n.vid,
                                    alias:l.alias
                                }), h.reportSuc(), y({
                                    val:0,
                                    speed:w
                                }), void q.resolve(d, {
                                    vl:f.vl,
                                    fl:f.fl,
                                    sfl:f.sfl,
                                    exem:f.exem,
                                    preview:f.preview
                                }));
                        }).fail(function() {
                            h.reportErr(), y({
                                val:500,
                                speed:b.now() - v
                            }), t ? q.reject(500, 2) :(d.retryDefer = q, a.h5Helper.loadVideoUrlByVid(d));
                        });
                }, C = function() {
                    x = u + b.param(r), f && "object" === b.type(f) && (x += "&" + b.param(f)), x = j(x),
                        b.ajax({
                            url:x,
                            dataType:"jsonp",
                            jsonpCallback:"tvp_request_getinfo_callback_" + parseInt(1e6 * Math.random())
                        }).done(function(b) {
                                return !d.noAuth && b && 0 != b.em && "o" != b.s ? 85 === b.em && -3 === b.type && 1 === d.cgi_auth_index ? (d.cgi_auth_index += 1,
                                    d.defer = q, d.needTime = !0, d.svr_time = b.curTime, void a.h5Helper.loadVideoUrlByVid(d)) :(d.noAuth = !0,
                                    d.defer = q, void a.h5Helper.loadVideoUrlByVid(d)) :void A(b);
                            }).fail(function() {
                                s.reportErr(), y({
                                    val:500,
                                    speed:b.now() - v
                                }), t ? q.reject(500, 1) :(d.noAuth = !0, d.retryDefer = q, a.h5Helper.loadVideoUrlByVid(d));
                            });
                };
                return d.cgi_auth_index || (d.cgi_auth_index = 1), a.auth(n, k).done(function(a) {
                    a = a || {}, "undefined" !== b.type(a.cgi) && a.cgi && (u = a.cgi), "undefined" !== b.type(a.cgi2) && a.cgi2 && (z = a.cgi2),
                        a.param && b.extend(r, a.param), C();
                }).fail(function() {
                        b.extend(r, {
                            vids:n.vid,
                            defaultfmt:n.fmt
                        }), C();
                    }), q;
            },
            loadHDVideoUrlByVid:function(b) {
                b.fmt = "mp4", a.h5Helper.loadVideoUrlByVid(b);
            },
            loadHLSUrlByVid:function(c) {
                var d = {}, e = b.Deferred();
                b.extend(b.extend(d, k), c);
                var f = new a.RetCode(100128), g = "http://h5vv.video.qq.com/gethls?callback=?&" + b.param({
                    vid:d.vid,
                    charge:d.isPay ? 1 :0,
                    otype:"json",
                    platform:d.platform,
                    _rnd:new Date().valueOf()
                }), h = i({
                    itype:3,
                    str3:g,
                    vid:d.vid,
                    appId:d.appId,
                    contentId:d.contentId
                }), l = b.now();
                return g = j(g), h(), f.begin(), b.ajax({
                    url:g,
                    dataType:"jsonp"
                }).done(function(c) {
                        if (!c || !c.s) return f.reportErr(50), h({
                            speed:b.now() - l,
                            val:50
                        }), void e.reject(50);
                        if ("o" != c.s) return f.reportErr(c.em || 50), h({
                            speed:b.now() - l,
                            val:c.em || 50
                        }), void e.reject(c.em || 50);
                        if (!c.vd || !c.vd.vi || !a.$.isArray(c.vd.vi)) return f.reportErr(68), h({
                            speed:b.now() - l,
                            val:68
                        }), void e.reject(68);
                        for (var d = [], g = -2, i = 0; i < c.vd.vi.length; i++) if (g = c.vd.vi[i].ch,
                            2 == c.vd.vi[i].st) {
                            var j = c.vd.vi[i].url.toLowerCase();
                            if (!(j.indexOf(".mp4") < 0 && j.indexOf(".m3u8") < 0) && c.vd.vi[i].url) {
                                var k = c.vd.vi[i];
                                d.push(k.url);
                                break;
                            }
                        }
                        return 0 == d.length ? (f.reportErr(68), h({
                            speed:b.now() - l,
                            val:68
                        }), void e.reject(68, g)) :(h({
                            speed:b.now() - l,
                            val:0
                        }), f.reportSuc(), void e.resolve(d[0], c.vd));
                    }).fail(function() {
                        f.reportErr(), h({
                            speed:b.now() - l,
                            val:500
                        }), e.reject(500, 3);
                    }), e;
            },
            load3GVideoUrl:function(b) {
                b.fmt = "msd", a.h5Helper.loadVideoUrlByVid(b);
            },
            loadIsUseHLS:function(c) {
                var d = {}, e = b.Deferred();
                b.extend(b.extend(d, k), c);
                var f = new a.RetCode(100125);
                return f.begin(), b.ajax({
                    url:a.common.get_request_url("get_dtype") + "?callback=?&" + b.param({
                        vids:d.vid,
                        platform:d.platform,
                        otype:"json",
                        _rnd:new Date().valueOf()
                    }),
                    dataType:"jsonp"
                }).done(function(a) {
                        var d = 1;
                        if ("object" != b.type(a)) return f.reportErr(), void e.reject(500, 4);
                        if ("o" != a.s || !b.isArray(a.dl) || 0 == a.dl.length) return f.reportErr(a.em),
                            void e.reject(a.em || 50);
                        for (var g = 0, h = a.dl.length; h > g; g++) a.dl[g].vid === c.vid && (d = a.dl[g].dltype);
                        f.reportSuc(), e.resolve(d, a);
                    }).fail(function() {
                        f.reportErr(), e.reject(500, 4);
                    }), e;
            },
            loadSRT:function(a) {
                var c = {}, d = b.Deferred();
                return b.extend(b.extend(c, k), a), b.ajax({
                    url:"http://h5vv.video.qq.com/getsurl?" + b.param({
                        vid:c.vid,
                        format:c.sflid,
                        platform:c.platform,
                        pid:c.pid,
                        otype:"json",
                        _rnd:new Date().valueOf()
                    }),
                    dataType:"jsonp"
                }).done(function(a) {
                        return "object" != b.type(a) ? void d.reject(500) :"o" != a.s ? void d.reject(isNaN(a.em) ? 500 :a.em, a.msg || "") :void d.resolve(a);
                    }).fail(function() {
                        d.reject(500);
                    }), d;
            },
            setSpecialVideoFileDomain:function(a) {
                "string" == typeof a && /^(\S+[\.])?qq\.com/.test(location.host) && (l = a);
            }
        };
    }(tvp, tvp.$), function(a, b) {
        a.BasePlayer = function() {
            var c = {};
            this.modId = "", this.sessionId = "", this.$mod = null, this.videomod = null, this.playerid = "",
                this.curVideo = null, this.instance = null, this.dataset = {}, this.eventList = [ "inited", "play", "playing", "ended", "allended", "pause", "resume", "timeupdate", "getnext", "error", "stop", "fullscreen", "change", "write", "flashpopup", "getnextenable", "msg", "h5loadingadstart", "h5loadingadend", "volumechange" ],
                this.config = {}, this.hijackFun = [ "getPlayer", "getCurVideo", "showPlayer", "hidePlayer", "play", "pause", "getPlaytime", "setPlaytime", "getPlayerType", "resize" ],
                this.prototype = {}, function(b) {
                var c = [ "init", "addParam", "write", "setPlayerReady" ];
                c = c.concat(b.hijackFun);
                for (var d = 0, e = c.length; e > d; d++) b.prototype[c[d]] = a.$.noop;
            }(this), this.addParam = function(a, b) {
                this.config[a] = b;
            }, this.on = function(a, d) {
                a && b.isFunction(d) && (c[a] = b.isArray(c[a]) ? c[a] :[], c[a].push(d));
            }, this.trigger = function(a) {
                var d, e, f;
                if (a && b.isArray(c[a])) for (e = 0, f = c[a].length; f > e; e++) b.isFunction(c[a][e]) && (d = Array.prototype.slice.call(arguments, 1),
                    c[a][e].apply(null, d));
            }, this.off = function(a, d) {
                var e;
                a && b.isArray(c[a]) && (d ? (e = b.inArray(d, c[a]), e >= 0 && (c[a][e] = void 0)) :c[a] = void 0);
            };
        }, a.BasePlayer.prototype = {
            setCurVideo:function(a) {
                this.curVideo = a;
            },
            getPlayer:function() {
                return null;
            },
            getCurVideo:function() {
                return this.curVideo;
            },
            getCurVid:function() {
                return this.curVideo instanceof a.VideoInfo ? this.curVideo.getVid() :"";
            },
            getCurVidList:function() {
                return this.curVideo instanceof a.VideoInfo ? this.curVideo.getVidList() :"";
            },
            init:function(c) {
                b.extend(this.config, c);
                for (var d = 0, e = this.eventList.length; e > d; d++) {
                    var f = "on" + this.eventList[d];
                    this[f] = b.isFunction(this.config[f]) ? this.config[f] :a.$.noop;
                }
                this.setCurVideo(this.config.video), this.write(this.config.modId);
            },
            write:function(a) {
                b("#" + a).html("here is player of base");
            },
            log:function(a) {
                window.console && window.console.log(a);
            },
            getCBEvent:function(c) {
                var d;
                return this.instance && b.isFunction(this.instance[c]) && this.instance[c] != a.$.noop ? d = this.instance[c] :b.isFunction(this[c]) && this[c] != a.$.noop && (d = this[c]),
                    d;
            },
            callCBEvent:function(a) {
                var c = this.getCBEvent(a);
                if (b.isFunction(c)) {
                    var d = Array.prototype.slice.call(arguments, 1);
                    return c.apply(this, d);
                }
                return void 0;
            },
            resize:function(a, c) {
                var d = this.getPlayer();
                d && (d.style.width = b.formatSize(a), d.style.height = b.formatSize(c));
            },
            showPlayer:function() {},
            hidePlayer:function() {},
            execFlashMethod:function(a) {
                var b, c = this.getPlayer(), d = [];
                if (c && c[a]) {
                    d = [].slice.call(arguments, 1);
                    try {
                        return b = c[a].apply(c, d);
                    } catch (e) {}
                }
            }
        };
    }(tvp, tvp.$), function(a, b) {
        a.livehub = {
            g_flashp2p:!1,
            iretcode:0,
            g_curCnlInfo:{},
            stepReport:function(c, d) {
                var e = {
                    cmd:3545,
                    val:c
                };
                "object" == b.type(d) && (e = b.extend(e, {
                    speed:d.delay,
                    int5:d.code,
                    vid:d.lid
                }), d.config && (e = b.extend(e, {
                    contentId:d.config.contentId,
                    appId:d.config.appid
                }))), a.report(e);
            },
            FlashChecker:function(c) {
                var d = this;
                this.cnlId = "", this.extParam = {}, this.onError = b.noop, this.onCanFlash = b.noop,
                    this.onCanHTML5 = b.noop, this.onCanOCX = b.noop, this.onComplete = b.noop, this.onGetCnlId = b.noop;
                var e = function(b, d) {
                    d = d || {}, d.config = c, a.livehub.stepReport(b, d);
                };
                this.onSuccess = function(c) {
                    c && 0 == c.iretcode ? (a.livehub.iretcode = c.iretcode, a.livehub.g_flashp2p = c.flashp2p ? !0 :!1,
                        a.debug("get channel info:flashid=" + c.flashid + ",p2pid=" + c.p2pid + ",flashp2p=" + c.flashp2p),
                        d.cnlId = "" + c.flashid || c.p2pid || "", d.onGetCnlId("" + d.cnlId, !1), a.livehub.getCurChannelInfo(d.cnlId, d.extParam),
                        c.flashid ? (e(5), d.onCanFlash(d.cnlId)) :b.os.windows && c.p2pid ? (e(6), d.onCanOCX(d.cnlId)) :(e(7, {
                            code:c.iretcode
                        }), d.onError(c.iretcode))) :(e(8, {
                        code:c.iretcode
                    }), d.onError(500));
                }, this.send = function() {
                    if (e(1), a.common.isUseHtml5()) return e(2), d.onCanHTML5(d.cnlId), void d.onComplete();
                    var c = b.now();
                    b.ajax({
                        url:"http://info.zb.qq.com",
                        data:{
                            cmd:1,
                            cnlid:d.cnlId || ""
                        },
                        dataType:"jsonp"
                    }).done(function(a, f) {
                            f = b.now() - c, e(3, {
                                delay:f
                            }), d.onSuccess(a), d.onComplete();
                        }).fail(function(a, f) {
                            f = b.now() - c, e(4, {
                                delay:f
                            }), d.onError(), d.onComplete();
                        });
                };
            },
            getCurChannelInfo:function(c, d) {
                var e = a.livehub.g_curCnlInfo;
                d && "object" == b.type(d) ? (e.cnlId = d.cnlId, d.channelname && (e.cnlName = d.channelname),
                    d.currentname && d.currenttime && (e.prmInfo = d.currenttime + "|" + d.currentname)) :e = {};
            }
        };
    }(tvp, tvp.$), function(a, b) {
        function d(c, d, e) {
            var f = b.now(), h = f - g, i = {
                cmd:3529,
                val:c,
                str4:d,
                speed:0 > h ? b.now() - f :h
            };
            g = f, "object" == b.type(e) && b.extend(i, e), a.report(i);
        }
        function e(c, d) {
            var e = c + "Defer";
            if (a[e]) return a[e];
            var f = b.Deferred();
            a[e] = f;
            var g = "//imgcache.qq.com/tencentvideo_v1/tvp/js/", h = c.toLowerCase();
            "OcxPlayer" == c && "undefined" != typeof QQLive && "undefined" != typeof QQLive.DEFINE && (h = "ocxplayerlite");
            var i = g + "module/" + h + ".js?max_age=86400&v=" + a.ts;
            if ("function" == typeof a[c]) f.resolve(); else {
                var j = new a.RetCode(100123), k = b.now();
                j.begin(), d(1), b.getScript(i, function() {
                    var e = b.now() - k;
                    if ("function" != typeof a[c]) throw j.reportErr(11), d(2, 11, e), new Error(errMsg[1]);
                    d(2, 0, e), j.reportSuc(), f.resolve();
                });
            }
            return f;
        }
        function f(a) {
            return "string" == b.type(a) && /html5|mp4/i.test(a);
        }
        var g = b.now(), h = function(c, d) {
            function g() {
                var a = b.Deferred();
                switch (r.playerType) {
                    case "flash":
                        t = "FlashPlayer";
                        break;

                    case "html5":
                        m();
                        break;

                    case "ocx":
                        t = "OcxPlayer";
                        break;

                    case "mp4":
                        t = "MP4Link";
                        break;

                    default:
                        i();
                }
                return a.resolve(), a;
            }
            function i() {
                var b = navigator.platform.toLowerCase(), c = navigator.userAgent.toLowerCase(), d = a.version.getFlashMain(), e = /ipad|ipod|iphone|lepad_hls|IEMobile|WPDesktop/gi.test(c), f = (/MacIntel/gi.test(b),
                    /ipad|ipod|iphone|playstation/gi.test(b));
                return a.common.isEnforceMP4() ? void (t = "MP4Link") :e || f || a.$.os.android ? void (a.common.isSupportMP4() || a.common.isInUseH5() ? m() :t = "MP4Link") :a.$.os.Mac && "film.qq.com" === location.hostname ? void (t = "FlashPlayer") :a.$.os.Mac && (10 > d || !d) && a.common.isSupportMP4() ? void m() :void (t = "FlashPlayer");
            }
            function j(c) {
                if (c.getChannelId()) {
                    var d = c.getChannelId();
                    if ("object" == b.type(s[d]) && b.isFunction(s[d].done)) return s[d];
                    s[d] = b.Deferred();
                    var e = new a.livehub.FlashChecker(r), f = !0;
                    return e.cnlId = c.getChannelId(), e.extParam = c.getChannelExtParam(), e.onGetCnlId = function(a, b) {
                        c.setChannelId(a), c.setIsLookBack(!!b);
                    }, e.onCanFlash = function(a) {
                        t = "FlashLivePlayer";
                    }, e.onCanHTML5 = function() {
                        n();
                    }, e.onCanOCX = function() {
                        t = "OcxPlayer";
                    }, e.onError = function(a) {
                        k(), f = !1;
                    }, e.onComplete = function() {
                        l(), f ? s[d].resolve() :s[d].reject();
                    }, e.send(), s[d];
                }
            }
            function k() {
                a.common.isLiveUseHTML5() ? n() :t = b.os.android ? "FlashLivePlayer" :"OcxPlayer";
            }
            function l() {
                switch (r.playerType) {
                    case "flash":
                        t = "FlashLive";
                        break;

                    case "html5":
                        n();
                        break;

                    case "flashLive":
                        t = "FlashLivePlayer";
                        break;

                    case "ocx":
                        t = "OcxPlayer";
                }
            }
            function m() {
                x = !0, t = r.isHtml5UseUI ? "Html5Player" :"Html5Tiny";
            }
            function n() {
                t = r.isHtml5UseUI ? "Html5Live" :"Html5LiveTiny";
            }
            function o(a) {
                for (var b = !1, c = document.getElementsByTagName("link") || [], d = 0, e = c.length; e > d && !(b = c[d] && c[d].href && (c[d].href.indexOf(a) > 0 || -1 != c[d].href.indexOf("player_inews.css"))); ) d++;
                return b;
            }
            function p() {
                function d() {
                    if (!g) {
                        g = !0;
                        var b = new a[t]();
                        b.init(c), q.resolve(b, t);
                    }
                }
                var e = null, g = !1, h = b.inArray(t, w), i = r.cssPath + (c.HTML5CSSName || "player.css");
                (h > -1 && b.isString(c.HTML5CSSName) && c.HTML5CSSName.length > 0 || f(t)) && !o(i) ? (e = setTimeout(function() {
                    c.isHtml5UseUI = !1, t = y[h], d();
                }, 5e3), i += -1 === i.indexOf("?") ? "?t=" + a.ts :"&t=" + a.ts, b.loadCss(i).done(function() {
                    clearTimeout(e), e = null, d();
                })) :d();
            }
            var q = b.Deferred(), r = {}, s = {}, t = "FlashPlayer", u = [ "未指明播放器内核", "您当前使用的统一播放器JS文件不包含指定的播放器内核", "video未初始化" ], v = [ "FlashPlayer", "FlashLivePlayer", "MP4Link", "OcxPlayer" ], w = [ "Html5Player", "Html5Live" ], x = !1, y = [ "Html5Tiny", "Html5LiveTiny" ];
            if (v = v.concat(w), v = v.concat(y), b.extend(r, c), b.isUndefined(c.isHTML5UseUI) || (r.isHtml5UseUI = c.isHTML5UseUI),
                !c.video instanceof a.VideoInfo) throw new Error(u[2]);
            return c.video.setCurPlayer(d), h.checkLivePlayer = j, b.when(c.type == a.PLAYER_DEFINE.VOD ? g() :j(c.video)).then(function() {
                var f = "", g = function(b, d, e) {
                    a.report({
                        cmd:3531,
                        val:b,
                        val2:d || 0,
                        str3:f,
                        speed:e || 0,
                        contentId:c.contentId || "",
                        appId:c.appid || 0
                    });
                };
                if (!t) throw new Error(u[0]);
                if (b.inArray(t, v) < 0) throw new Error(u[1]);
                c.type == a.PLAYER_DEFINE.VOD && x && d && d.trigger && d.trigger(a.ACTION.onVodH5Init),
                    "function" != typeof a[t] ? e(t, g).done(function() {
                        p.call(d);
                    }) :p.call(d);
            }), q;
        }, i = {
            player:"playerType",
            showcfg:[ "isVodFlashShowCfg", "isLiveFlashShowCfg" ],
            searchbar:[ "isVodFlashShowSearchBar" ],
            showend:[ "isVodFlashShowEnd" ],
            tpid:[ "typeId" ],
            cid:[ "coverId" ],
            flashshownext:[ "isVodFlashShowNextBtn" ],
            loadingswf:"loadingswf",
            wmode:"flashWmode",
            flashskin:[ "vodFlashSkin" ],
            extvars:[ "vodFlashExtVars" ],
            swftype:[ "vodFlashType" ],
            swfurl:[ "vodFlashUrl", "liveFlashUrl" ]
        };
        a.Player = function(c, e) {
            this.sessionId = b.createGUID(), d(1, this.sessionId), this.instance = null, this.config = {},
                this._oldcfg = {}, b.extend(this.config, a.defaultConfig), this.setting("width", c),
                this.setting("height", e);
        }, a.Player.fn = a.Player.prototype = new a.BasePlayer(), b.extend(a.Player.fn, {
            setting:function(a, b) {
                this.config[a] = b;
            },
            output:function(a) {
                this.setting("modId", a), this.create(this.config);
            },
            create:function(e) {
                var f = this;
                b.extend(f.config, e), d(2, this.sessionId, {
                    contentId:f.config.contentId || "",
                    appId:f.config.appid || 0
                });
                var g = function() {
                    h(f.config, f).done(function(c, g) {
                        try {
                            d(3, f.sessionId, {
                                vid:c.curVideo.getFullVid() || c.curVideo.getChannelId(),
                                str3:c.getPlayerType(),
                                contentId:f.config.contentId || "",
                                appId:f.config.appid || 0
                            });
                        } catch (i) {}
                        f.instance = c, f.instance.instance = f;
                        for (var j in f.instance) "instance" != j && ("on" == j.substr(0, 2) && b.isFunction(f[j]) && f[j] != a.$.noop || (f[j] = f.instance[j]));
                        c.callCBEvent("onwrite"), f.config.type == a.PLAYER_DEFINE.LIVE && (f.play = function(c) {
                            b.isString(c) ? (f.config.video.setChannelId(c), c = f.config.video) :c instanceof a.VideoInfo && b.when(h.checkLivePlayer(c)).then(function() {
                                f.instance instanceof a[g] ? f.instance.play(c) :(e.video = c, h(e));
                            });
                        }), a.Player.instance[f.playerid] = f;
                    }).always(function() {
                            function d(a, c) {
                                try {
                                    var d = "build" + a;
                                    return b.isFunction(f[d]) ? (f[d].call(f, c), !0) :!1;
                                } catch (e) {}
                            }
                            if (b.each(f.config.plugins, function(a, c) {
                                if (c && a in f.config.pluginUrl) {
                                    var e, g = b.isPlainObject(c) ? c :{};
                                    if ("AppRecommend" === a && f.config.plugins.adonend) return;
                                    if (!d(a, g)) {
                                        e = a;
                                        var h = f.config.libpath + f.config.pluginUrl[e];
                                        b.isString(h) && "" != b.trim(h) && b.getScript(h, function() {
                                            d(a, g);
                                        });
                                    }
                                }
                            }), window.console && c) {
                                var e = {
                                    jQuery:"jq",
                                    Zepto:"zepto",
                                    jq:"jqmobi"
                                };
                                for (var g in e) if ("function" == typeof window[g]) {
                                    if ("jQuery" === g && "function" != typeof jQuery.Deferred) break;
                                    console.warn("\n" + a.name + "提示：\n您当前页面使用了" + g + "\n建议您引用" + a.name + " for " + g + "专用版，更轻更快更精简\nJS地址://imgcache.qq.com/tencentvideo_v1/tvp/js/tvp.player_v2_" + e[g] + ".js\n\n");
                                }
                            }
                        });
                }, i = function() {
                    var c, d = b.Deferred(), e = "//v.qq.com/iframe/tvp.config.js";
                    if (a.config) return d.resolve(), d;
                    var f = parseInt(100 * Math.random(), 10) + 1, g = 100;
                    return 100 - g > f ? (d.reject(), d) :(c = b.getScript(e, function() {
                        return a.config ? void d.resolve() :void d.reject();
                    }), c && "function" === b.type(c.fail) && c.fail(function() {
                        d.reject();
                    }), setTimeout(function() {
                        d.reject();
                    }, 4e3), d);
                };
                i().done(function() {
                    try {
                        a.config && a.config.defaultConfig && b.extend(f.config, a.config.defaultConfig);
                    } catch (c) {}
                    g();
                }).fail(function() {
                        g();
                    });
            },
            addParam:function(c, d) {
                a.report({
                    cmd:3546,
                    val:1
                }), "config" == c && "object" == b.type(d) ? b.extend(this.config, d) :this._oldcfg[c] = d;
            },
            setCurVideo:function(b) {
                a.report({
                    cmd:3546,
                    val:2
                }), this.config.video = b, b && b instanceof a.VideoInfo && b.setCurPlayer(this);
            },
            write:function(c) {
                a.report({
                    cmd:3546,
                    val:3
                }), this.config.modId = c;
                var d = 1 == this._oldcfg.type ? 1 :2, e = this;
                b.each(this._oldcfg, function(c, f) {
                    c in i ? b.isArray(i[c]) ? 2 == d ? e.config[i[c][0]] = f :1 == d && i[c].length >= 2 && (e.config[i[c][1]] = f) :b.isString(i[c]) && (e.config[i[c]] = f) :c in a.defaultConfig && (e.config[c] = f);
                }), delete this._oldcfg, this.create(this.config);
            }
        }), a.create = h;
    }(tvp, tvp.$), tvp.Player.instance = {}, function(a) {
        a.extend(a.fn, {
            createTVP:function(b) {
                if (tvp.report({
                    cmd:3546,
                    val:4
                }), b = a.extend({}, tvp.defaultConfig, b || {}), b.video) {
                    var c = null;
                    b.video instanceof tvp.VideoInfo ? c = b.video :(c = new tvp.VideoInfo(), c.setVid(b.video.vid)),
                        b.video = c, this.each(function(c, d) {
                        if ("object" == a.type(d) && 1 == d.nodeType) {
                            b.modId = d.id;
                            var e = new tvp.Player();
                            e.create(b);
                        }
                    });
                }
            }
        });
    }(tvp.$), function(a) {
        tvp.modeHide = function(b, c) {
            function d() {
                o.off("click.tvp_mode_hide").on("click.tvp_mode_hide", function() {
                    var b;
                    if (i = n.getPlayer(), b = i ? a(i).attr("src") :n.$mod.find("a").attr("href")) {
                        if (!tvp.common.isSupportMP4() && !tvp.common.isUseHtml5()) return void (window.location.href = b);
                        l.show(), setTimeout(function() {
                            m.isend ? (m.isend = !1, n.play()) :i.play(), f(), setTimeout(function() {
                                i.play();
                            }, 100), e();
                        }, 5);
                    }
                });
            }
            function e() {
                m.isInit || (m.isInit = !0, a(i).on("ended", function() {
                    n.cancelFullScreen();
                }).on("playing", function() {
                        document.webkitIsFullScreen || i.webkitDisplayingFullscreen || k;
                    }).on("webkitendfullscreen", function() {
                        g();
                    }), a(document).on("webkitfullscreenchange fullscreenchange", function() {
                    g();
                }));
            }
            function f() {
                h() ? n.enterFullScreen() :i.webkitEnterFullscreen();
            }
            function g() {
                i && (document.webkitIsFullScreen || i.webkitDisplayingFullscreen || k || n.isFakeFullscreen && n.isFakeFullscreen() || (i.pause(),
                    l.hide()));
            }
            function h() {
                return tvp.$.os.android ? tvp.$.browser.MQQ ? !1 :tvp.$.compareVersion(tvp.$.os.version, "4.4") > -1 ? !1 :!0 :!1;
            }
            var i, j, k, l = a("#" + c.modId), m = new tvp.VideoInfo(), n = new tvp.Player(), o = a(b.btn);
            j = {
                width:"100%",
                height:window.innerHeight,
                video:m,
                modId:c.modId,
                isHtml5UseUI:!0,
                isHtml5UseFakeFullScreen:h(),
                isiPhoneShowPlaysinline:!1,
                onwrite:function() {
                    d();
                },
                onfullscreen:function(a) {
                    a = k, k || g();
                }
            }, a.extend(j, c), c.type = c.type || 2, 1 === c.type ? (j.type = 1, m.setChannelId(c.lid)) :(j.type = 2,
                m.setVid(c.vid)), n.create(j);
        };
    }(tvp.$), tvp.filename = "tvp.player_v2_zepto.js", "function" == typeof define && define("tvp", [], function() {
        return tvp;
    }), a.tvp = tvp, "undefined" != typeof QQLive && (a.QQLive = QQLive);
}(this);