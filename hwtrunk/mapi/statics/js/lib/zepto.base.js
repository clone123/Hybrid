var Zepto = function() {
    function t(t) {
        return null == t ? String(t) : B[J.call(t)] || "object";
    }
    function e(e) {
        return "function" == t(e);
    }
    function n(t) {
        return null != t && t == t.window;
    }
    function r(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE;
    }
    function i(e) {
        return "object" == t(e);
    }
    function o(t) {
        return i(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype;
    }
    function a(t) {
        return "number" == typeof t.length;
    }
    function s(t) {
        return P.call(t, function(t) {
            return null != t;
        });
    }
    function u(t) {
        return t.length > 0 ? j.fn.concat.apply([], t) : t;
    }
    function c(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
    }
    function l(t) {
        return t in Z ? Z[t] : Z[t] = new RegExp("(^|\\s)" + t + "(\\s|$)");
    }
    function f(t, e) {
        return "number" != typeof e || $[c(t)] ? e : e + "px";
    }
    function h(t) {
        var e, n;
        return L[t] || (e = A.createElement(t), A.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"),
            e.parentNode.removeChild(e), "none" == n && (n = "block"), L[t] = n), L[t];
    }
    function p(t) {
        return "children" in t ? O.call(t.children) : j.map(t.childNodes, function(t) {
            return 1 == t.nodeType ? t : void 0;
        });
    }
    function d(t, e, n) {
        for (E in e) n && (o(e[E]) || G(e[E])) ? (o(e[E]) && !o(t[E]) && (t[E] = {}), G(e[E]) && !G(t[E]) && (t[E] = []),
            d(t[E], e[E], n)) : e[E] !== w && (t[E] = e[E]);
    }
    function m(t, e) {
        return null == e ? j(t) : j(t).filter(e);
    }
    function v(t, n, r, i) {
        return e(n) ? n.call(t, r, i) : n;
    }
    function g(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n);
    }
    function y(t, e) {
        var n = t.className, r = n && n.baseVal !== w;
        return e === w ? r ? n.baseVal : n : void (r ? n.baseVal = e : t.className = e);
    }
    function x(t) {
        var e;
        try {
            return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? j.parseJSON(t) : t : e) : t;
        } catch (n) {
            return t;
        }
    }
    function b(t, e) {
        e(t);
        for (var n in t.childNodes) b(t.childNodes[n], e);
    }
    var w, E, j, T, S, C, N = [], O = N.slice, P = N.filter, A = window.document, L = {}, Z = {}, $ = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    }, _ = /^\s*<(\w+|!)[^>]*>/, D = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, R = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, M = /^(?:body|html)$/i, k = /([A-Z])/g, z = [ "val", "css", "html", "text", "data", "width", "height", "offset" ], F = [ "after", "prepend", "before", "append" ], q = A.createElement("table"), H = A.createElement("tr"), I = {
        tr: A.createElement("tbody"),
        tbody: q,
        thead: q,
        tfoot: q,
        td: H,
        th: H,
        "*": A.createElement("div")
    }, V = /complete|loaded|interactive/, U = /^[\w-]*$/, B = {}, J = B.toString, X = {}, W = A.createElement("div"), Y = {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    }, G = Array.isArray || function(t) {
        return t instanceof Array;
    };
    return X.matches = function(t, e) {
        if (!e || !t || 1 !== t.nodeType) return !1;
        var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
        if (n) return n.call(t, e);
        var r, i = t.parentNode, o = !i;
        return o && (i = W).appendChild(t), r = ~X.qsa(i, e).indexOf(t), o && W.removeChild(t),
            r;
    }, S = function(t) {
        return t.replace(/-+(.)?/g, function(t, e) {
            return e ? e.toUpperCase() : "";
        });
    }, C = function(t) {
        return P.call(t, function(e, n) {
            return t.indexOf(e) == n;
        });
    }, X.fragment = function(t, e, n) {
        var r, i, a;
        return D.test(t) && (r = j(A.createElement(RegExp.$1))), r || (t.replace && (t = t.replace(R, "<$1></$2>")),
            e === w && (e = _.test(t) && RegExp.$1), e in I || (e = "*"), a = I[e], a.innerHTML = "" + t,
            r = j.each(O.call(a.childNodes), function() {
                a.removeChild(this);
            })), o(n) && (i = j(r), j.each(n, function(t, e) {
            z.indexOf(t) > -1 ? i[t](e) : i.attr(t, e);
        })), r;
    }, X.Z = function(t, e) {
        return t = t || [], t.__proto__ = j.fn, t.selector = e || "", t;
    }, X.isZ = function(t) {
        return t instanceof X.Z;
    }, X.init = function(t, n) {
        var r;
        if (!t) return X.Z();
        if ("string" == typeof t) if (t = t.trim(), "<" == t[0] && _.test(t)) r = X.fragment(t, RegExp.$1, n),
            t = null; else {
            if (n !== w) return j(n).find(t);
            r = X.qsa(A, t);
        } else {
            if (e(t)) return j(A).ready(t);
            if (X.isZ(t)) return t;
            if (G(t)) r = s(t); else if (i(t)) r = [ t ], t = null; else if (_.test(t)) r = X.fragment(t.trim(), RegExp.$1, n),
                t = null; else {
                if (n !== w) return j(n).find(t);
                r = X.qsa(A, t);
            }
        }
        return X.Z(r, t);
    }, j = function(t, e) {
        return X.init(t, e);
    }, j.extend = function(t) {
        var e, n = O.call(arguments, 1);
        return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function(n) {
            d(t, n, e);
        }), t;
    }, X.qsa = function(t, e) {
        var n, i = "#" == e[0], o = !i && "." == e[0], a = i || o ? e.slice(1) : e, s = U.test(a);
        return r(t) && s && i ? (n = t.getElementById(a)) ? [ n ] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : O.call(s && !i ? o ? t.getElementsByClassName(a) : t.getElementsByTagName(e) : t.querySelectorAll(e));
    }, j.contains = function(t, e) {
        return t !== e && t.contains(e);
    }, j.type = t, j.isFunction = e, j.isWindow = n, j.isArray = G, j.isPlainObject = o,
        j.isEmptyObject = function(t) {
            var e;
            for (e in t) return !1;
            return !0;
        }, j.inArray = function(t, e, n) {
        return N.indexOf.call(e, t, n);
    }, j.camelCase = S, j.trim = function(t) {
        return null == t ? "" : String.prototype.trim.call(t);
    }, j.uuid = 0, j.support = {}, j.expr = {}, j.map = function(t, e) {
        var n, r, i, o = [];
        if (a(t)) for (r = 0; r < t.length; r++) n = e(t[r], r), null != n && o.push(n); else for (i in t) n = e(t[i], i),
            null != n && o.push(n);
        return u(o);
    }, j.each = function(t, e) {
        var n, r;
        if (a(t)) {
            for (n = 0; n < t.length; n++) if (e.call(t[n], n, t[n]) === !1) return t;
        } else for (r in t) if (e.call(t[r], r, t[r]) === !1) return t;
        return t;
    }, j.grep = function(t, e) {
        return P.call(t, e);
    }, window.JSON && (j.parseJSON = JSON.parse), j.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
        B["[object " + e + "]"] = e.toLowerCase();
    }), j.fn = {
        forEach: N.forEach,
        reduce: N.reduce,
        push: N.push,
        sort: N.sort,
        indexOf: N.indexOf,
        concat: N.concat,
        map: function(t) {
            return j(j.map(this, function(e, n) {
                return t.call(e, n, e);
            }));
        },
        slice: function() {
            return j(O.apply(this, arguments));
        },
        ready: function(t) {
            return V.test(A.readyState) && A.body ? t(j) : A.addEventListener("DOMContentLoaded", function() {
                t(j);
            }, !1), this;
        },
        get: function(t) {
            return t === w ? O.call(this) : this[t >= 0 ? t : t + this.length];
        },
        toArray: function() {
            return this.get();
        },
        size: function() {
            return this.length;
        },
        remove: function() {
            return this.each(function() {
                null != this.parentNode && this.parentNode.removeChild(this);
            });
        },
        each: function(t) {
            return N.every.call(this, function(e, n) {
                return t.call(e, n, e) !== !1;
            }), this;
        },
        filter: function(t) {
            return e(t) ? this.not(this.not(t)) : j(P.call(this, function(e) {
                return X.matches(e, t);
            }));
        },
        add: function(t, e) {
            return j(C(this.concat(j(t, e))));
        },
        is: function(t) {
            return this.length > 0 && X.matches(this[0], t);
        },
        not: function(t) {
            var n = [];
            if (e(t) && t.call !== w) this.each(function(e) {
                t.call(this, e) || n.push(this);
            }); else {
                var r = "string" == typeof t ? this.filter(t) : a(t) && e(t.item) ? O.call(t) : j(t);
                this.forEach(function(t) {
                    r.indexOf(t) < 0 && n.push(t);
                });
            }
            return j(n);
        },
        has: function(t) {
            return this.filter(function() {
                return i(t) ? j.contains(this, t) : j(this).find(t).size();
            });
        },
        eq: function(t) {
            return -1 === t ? this.slice(t) : this.slice(t, +t + 1);
        },
        first: function() {
            var t = this[0];
            return t && !i(t) ? t : j(t);
        },
        last: function() {
            var t = this[this.length - 1];
            return t && !i(t) ? t : j(t);
        },
        find: function(t) {
            var e, n = this;
            return e = "object" == typeof t ? j(t).filter(function() {
                var t = this;
                return N.some.call(n, function(e) {
                    return j.contains(e, t);
                });
            }) : 1 == this.length ? j(X.qsa(this[0], t)) : this.map(function() {
                return X.qsa(this, t);
            });
        },
        closest: function(t, e) {
            var n = this[0], i = !1;
            for ("object" == typeof t && (i = j(t)); n && !(i ? i.indexOf(n) >= 0 : X.matches(n, t)); ) n = n !== e && !r(n) && n.parentNode;
            return j(n);
        },
        parents: function(t) {
            for (var e = [], n = this; n.length > 0; ) n = j.map(n, function(t) {
                return (t = t.parentNode) && !r(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0;
            });
            return m(e, t);
        },
        parent: function(t) {
            return m(C(this.pluck("parentNode")), t);
        },
        children: function(t) {
            return m(this.map(function() {
                return p(this);
            }), t);
        },
        contents: function() {
            return this.map(function() {
                return O.call(this.childNodes);
            });
        },
        siblings: function(t) {
            return m(this.map(function(t, e) {
                return P.call(p(e.parentNode), function(t) {
                    return t !== e;
                });
            }), t);
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = "";
            });
        },
        pluck: function(t) {
            return j.map(this, function(e) {
                return e[t];
            });
        },
        show: function() {
            return this.each(function() {
                "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName));
            });
        },
        replaceWith: function(t) {
            return this.before(t).remove();
        },
        wrap: function(t) {
            var n = e(t);
            if (this[0] && !n) var r = j(t).get(0), i = r.parentNode || this.length > 1;
            return this.each(function(e) {
                j(this).wrapAll(n ? t.call(this, e) : i ? r.cloneNode(!0) : r);
            });
        },
        wrapAll: function(t) {
            if (this[0]) {
                j(this[0]).before(t = j(t));
                for (var e; (e = t.children()).length; ) t = e.first();
                j(t).append(this);
            }
            return this;
        },
        wrapInner: function(t) {
            var n = e(t);
            return this.each(function(e) {
                var r = j(this), i = r.contents(), o = n ? t.call(this, e) : t;
                i.length ? i.wrapAll(o) : r.append(o);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                j(this).replaceWith(j(this).children());
            }), this;
        },
        clone: function() {
            return this.map(function() {
                return this.cloneNode(!0);
            });
        },
        hide: function() {
            return this.css("display", "none");
        },
        toggle: function(t) {
            return this.each(function() {
                var e = j(this);
                (t === w ? "none" == e.css("display") : t) ? e.show() : e.hide();
            });
        },
        prev: function(t) {
            return j(this.pluck("previousElementSibling")).filter(t || "*");
        },
        next: function(t) {
            return j(this.pluck("nextElementSibling")).filter(t || "*");
        },
        html: function(t) {
            return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function(e) {
                var n = this.innerHTML;
                j(this).empty().append(v(this, t, e, n));
            });
        },
        text: function(t) {
            return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function() {
                this.textContent = t === w ? "" : "" + t;
            });
        },
        attr: function(t, e) {
            var n;
            return "string" == typeof t && e === w ? 0 == this.length || 1 !== this[0].nodeType ? w : "value" == t && "INPUT" == this[0].nodeName ? this.val() : !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : this.each(function(n) {
                if (1 === this.nodeType) if (i(t)) for (E in t) g(this, E, t[E]); else g(this, t, v(this, e, n, this.getAttribute(t)));
            });
        },
        removeAttr: function(t) {
            return this.each(function() {
                1 === this.nodeType && g(this, t);
            });
        },
        prop: function(t, e) {
            return t = Y[t] || t, e === w ? this[0] && this[0][t] : this.each(function(n) {
                this[t] = v(this, e, n, this[t]);
            });
        },
        data: function(t, e) {
            var n = this.attr("data-" + t.replace(k, "-$1").toLowerCase(), e);
            return null !== n ? x(n) : w;
        },
        val: function(t) {
            return 0 === arguments.length ? this[0] && (this[0].multiple ? j(this[0]).find("option").filter(function() {
                return this.selected;
            }).pluck("value") : this[0].value) : this.each(function(e) {
                this.value = v(this, t, e, this.value);
            });
        },
        offset: function(t) {
            if (t) return this.each(function(e) {
                var n = j(this), r = v(this, t, e, n.offset()), i = n.offsetParent().offset(), o = {
                    top: r.top - i.top,
                    left: r.left - i.left
                };
                "static" == n.css("position") && (o.position = "relative"), n.css(o);
            });
            if (0 == this.length) return null;
            var e = this[0].getBoundingClientRect();
            return {
                left: e.left + window.pageXOffset,
                top: e.top + window.pageYOffset,
                width: Math.round(e.width),
                height: Math.round(e.height)
            };
        },
        css: function(e, n) {
            if (arguments.length < 2) {
                var r = this[0], i = getComputedStyle(r, "");
                if (!r) return;
                if ("string" == typeof e) return r.style[S(e)] || i.getPropertyValue(e);
                if (G(e)) {
                    var o = {};
                    return j.each(G(e) ? e : [ e ], function(t, e) {
                        o[e] = r.style[S(e)] || i.getPropertyValue(e);
                    }), o;
                }
            }
            var a = "";
            if ("string" == t(e)) n || 0 === n ? a = c(e) + ":" + f(e, n) : this.each(function() {
                this.style.removeProperty(c(e));
            }); else for (E in e) e[E] || 0 === e[E] ? a += c(E) + ":" + f(E, e[E]) + ";" : this.each(function() {
                this.style.removeProperty(c(E));
            });
            return this.each(function() {
                this.style.cssText += ";" + a;
            });
        },
        index: function(t) {
            return t ? this.indexOf(j(t)[0]) : this.parent().children().indexOf(this[0]);
        },
        hasClass: function(t) {
            return t ? N.some.call(this, function(t) {
                return this.test(y(t));
            }, l(t)) : !1;
        },
        addClass: function(t) {
            return t ? this.each(function(e) {
                T = [];
                var n = y(this), r = v(this, t, e, n);
                r.split(/\s+/g).forEach(function(t) {
                    j(this).hasClass(t) || T.push(t);
                }, this), T.length && y(this, n + (n ? " " : "") + T.join(" "));
            }) : this;
        },
        removeClass: function(t) {
            return this.each(function(e) {
                return t === w ? y(this, "") : (T = y(this), v(this, t, e, T).split(/\s+/g).forEach(function(t) {
                    T = T.replace(l(t), " ");
                }), void y(this, T.trim()));
            });
        },
        toggleClass: function(t, e) {
            return t ? this.each(function(n) {
                var r = j(this), i = v(this, t, n, y(this));
                i.split(/\s+/g).forEach(function(t) {
                    (e === w ? !r.hasClass(t) : e) ? r.addClass(t) : r.removeClass(t);
                });
            }) : this;
        },
        scrollTop: function(t) {
            if (this.length) {
                var e = "scrollTop" in this[0];
                return t === w ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
                    this.scrollTop = t;
                } : function() {
                    this.scrollTo(this.scrollX, t);
                });
            }
        },
        scrollLeft: function(t) {
            if (this.length) {
                var e = "scrollLeft" in this[0];
                return t === w ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
                    this.scrollLeft = t;
                } : function() {
                    this.scrollTo(t, this.scrollY);
                });
            }
        },
        position: function() {
            if (this.length) {
                var t = this[0], e = this.offsetParent(), n = this.offset(), r = M.test(e[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : e.offset();
                return n.top -= parseFloat(j(t).css("margin-top")) || 0, n.left -= parseFloat(j(t).css("margin-left")) || 0,
                    r.top += parseFloat(j(e[0]).css("border-top-width")) || 0, r.left += parseFloat(j(e[0]).css("border-left-width")) || 0,
                {
                    top: n.top - r.top,
                    left: n.left - r.left
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || A.body; t && !M.test(t.nodeName) && "static" == j(t).css("position"); ) t = t.offsetParent;
                return t;
            });
        }
    }, j.fn.detach = j.fn.remove, [ "width", "height" ].forEach(function(t) {
        var e = t.replace(/./, function(t) {
            return t[0].toUpperCase();
        });
        j.fn[t] = function(i) {
            var o, a = this[0];
            return i === w ? n(a) ? a["inner" + e] : r(a) ? a.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function(e) {
                a = j(this), a.css(t, v(this, i, e, a[t]()));
            });
        };
    }), F.forEach(function(e, n) {
        var r = n % 2;
        j.fn[e] = function() {
            var e, i, o = j.map(arguments, function(n) {
                return e = t(n), "object" == e || "array" == e || null == n ? n : X.fragment(n);
            }), a = this.length > 1;
            return o.length < 1 ? this : this.each(function(t, e) {
                i = r ? e : e.parentNode, e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null,
                    o.forEach(function(t) {
                        if (a) t = t.cloneNode(!0); else if (!i) return j(t).remove();
                        b(i.insertBefore(t, e), function(t) {
                            null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML);
                        });
                    });
            });
        }, j.fn[r ? e + "To" : "insert" + (n ? "Before" : "After")] = function(t) {
            return j(t)[e](this), this;
        };
    }), X.Z.prototype = j.fn, X.uniq = C, X.deserializeValue = x, j.zepto = X, j;
}();

window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function(t) {
    function e(t) {
        return t._zid || (t._zid = h++);
    }
    function n(t, n, o, a) {
        if (n = r(n), n.ns) var s = i(n.ns);
        return (v[e(t)] || []).filter(function(t) {
            return !(!t || n.e && t.e != n.e || n.ns && !s.test(t.ns) || o && e(t.fn) !== e(o) || a && t.sel != a);
        });
    }
    function r(t) {
        var e = ("" + t).split(".");
        return {
            e: e[0],
            ns: e.slice(1).sort().join(" ")
        };
    }
    function i(t) {
        return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)");
    }
    function o(t, e) {
        return t.del && !y && t.e in x || !!e;
    }
    function a(t) {
        return b[t] || y && x[t] || t;
    }
    function s(n, i, s, u, l, h, p) {
        var d = e(n), m = v[d] || (v[d] = []);
        i.split(/\s/).forEach(function(e) {
            if ("ready" == e) return t(document).ready(s);
            var i = r(e);
            i.fn = s, i.sel = l, i.e in b && (s = function(e) {
                var n = e.relatedTarget;
                return !n || n !== this && !t.contains(this, n) ? i.fn.apply(this, arguments) : void 0;
            }), i.del = h;
            var d = h || s;
            i.proxy = function(t) {
                if (t = c(t), !t.isImmediatePropagationStopped()) {
                    t.data = u;
                    var e = d.apply(n, t._args == f ? [ t ] : [ t ].concat(t._args));
                    return e === !1 && (t.preventDefault(), t.stopPropagation()), e;
                }
            }, i.i = m.length, m.push(i), "addEventListener" in n && n.addEventListener(a(i.e), i.proxy, o(i, p));
        });
    }
    function u(t, r, i, s, u) {
        var c = e(t);
        (r || "").split(/\s/).forEach(function(e) {
            n(t, e, i, s).forEach(function(e) {
                delete v[c][e.i], "removeEventListener" in t && t.removeEventListener(a(e.e), e.proxy, o(e, u));
            });
        });
    }
    function c(e, n) {
        return (n || !e.isDefaultPrevented) && (n || (n = e), t.each(T, function(t, r) {
            var i = n[t];
            e[t] = function() {
                return this[r] = w, i && i.apply(n, arguments);
            }, e[r] = E;
        }), (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = w)),
            e;
    }
    function l(t) {
        var e, n = {
            originalEvent: t
        };
        for (e in t) j.test(e) || t[e] === f || (n[e] = t[e]);
        return c(n, t);
    }
    var f, h = 1, p = Array.prototype.slice, d = t.isFunction, m = function(t) {
        return "string" == typeof t;
    }, v = {}, g = {}, y = "onfocusin" in window, x = {
        focus: "focusin",
        blur: "focusout"
    }, b = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    g.click = g.mousedown = g.mouseup = g.mousemove = "MouseEvents", t.event = {
        add: s,
        remove: u
    }, t.proxy = function(n, r) {
        if (d(n)) {
            var i = function() {
                return n.apply(r, arguments);
            };
            return i._zid = e(n), i;
        }
        if (m(r)) return t.proxy(n[r], n);
        throw new TypeError("expected function");
    }, t.fn.bind = function(t, e, n) {
        return this.on(t, e, n);
    }, t.fn.unbind = function(t, e) {
        return this.off(t, e);
    }, t.fn.one = function(t, e, n, r) {
        return this.on(t, e, n, r, 1);
    };
    var w = function() {
        return !0;
    }, E = function() {
        return !1;
    }, j = /^([A-Z]|returnValue$|layer[XY]$)/, T = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    t.fn.delegate = function(t, e, n) {
        return this.on(e, t, n);
    }, t.fn.undelegate = function(t, e, n) {
        return this.off(e, t, n);
    }, t.fn.live = function(e, n) {
        return t(document.body).delegate(this.selector, e, n), this;
    }, t.fn.die = function(e, n) {
        return t(document.body).undelegate(this.selector, e, n), this;
    }, t.fn.on = function(e, n, r, i, o) {
        var a, c, h = this;
        return e && !m(e) ? (t.each(e, function(t, e) {
            h.on(t, n, r, e, o);
        }), h) : (m(n) || d(i) || i === !1 || (i = r, r = n, n = f), (d(r) || r === !1) && (i = r,
            r = f), i === !1 && (i = E), h.each(function(f, h) {
            o && (a = function(t) {
                return u(h, t.type, i), i.apply(this, arguments);
            }), n && (c = function(e) {
                var r, o = t(e.target).closest(n, h).get(0);
                return o && o !== h ? (r = t.extend(l(e), {
                    currentTarget: o,
                    liveFired: h
                }), (a || i).apply(o, [ r ].concat(p.call(arguments, 1)))) : void 0;
            }), s(h, e, i, r, n, c || a);
        }));
    }, t.fn.off = function(e, n, r) {
        var i = this;
        return e && !m(e) ? (t.each(e, function(t, e) {
            i.off(t, n, e);
        }), i) : (m(n) || d(r) || r === !1 || (r = n, n = f), r === !1 && (r = E), i.each(function() {
            u(this, e, r, n);
        }));
    }, t.fn.trigger = function(e, n) {
        return e = m(e) || t.isPlainObject(e) ? t.Event(e) : c(e), e._args = n, this.each(function() {
            "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n);
        });
    }, t.fn.triggerHandler = function(e, r) {
        var i, o;
        return this.each(function(a, s) {
            i = l(m(e) ? t.Event(e) : e), i._args = r, i.target = s, t.each(n(s, e.type || e), function(t, e) {
                return o = e.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0;
            });
        }), o;
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
        t.fn[e] = function(t) {
            return t ? this.bind(e, t) : this.trigger(e);
        };
    }), [ "focus", "blur" ].forEach(function(e) {
        t.fn[e] = function(t) {
            return t ? this.bind(e, t) : this.each(function() {
                try {
                    this[e]();
                } catch (t) {}
            }), this;
        };
    }), t.Event = function(t, e) {
        m(t) || (e = t, t = e.type);
        var n = document.createEvent(g[t] || "Events"), r = !0;
        if (e) for (var i in e) "bubbles" == i ? r = !!e[i] : n[i] = e[i];
        return n.initEvent(t, r, !0), c(n);
    };
}(Zepto), function(t) {
    function e(e, n, r) {
        var i = t.Event(n);
        return t(e).trigger(i, r), !i.isDefaultPrevented();
    }
    function n(t, n, r, i) {
        return t.global ? e(n || y, r, i) : void 0;
    }
    function r(e) {
        e.global && 0 === t.active++ && n(e, null, "ajaxStart");
    }
    function i(e) {
        e.global && !--t.active && n(e, null, "ajaxStop");
    }
    function o(t, e) {
        var r = e.context;
        return e.beforeSend.call(r, t, e) === !1 || n(e, r, "ajaxBeforeSend", [ t, e ]) === !1 ? !1 : void n(e, r, "ajaxSend", [ t, e ]);
    }
    function a(t, e, r, i) {
        var o = r.context, a = "success";
        r.success.call(o, t, a, e), i && i.resolveWith(o, [ t, a, e ]), n(r, o, "ajaxSuccess", [ e, r, t ]),
            u(a, e, r);
    }
    function s(t, e, r, i, o) {
        var a = i.context;
        i.error.call(a, r, e, t), o && o.rejectWith(a, [ r, e, t ]), n(i, a, "ajaxError", [ r, i, t || e ]),
            u(e, r, i);
    }
    function u(t, e, r) {
        var o = r.context;
        r.complete.call(o, e, t), n(r, o, "ajaxComplete", [ e, r ]), i(r);
    }
    function c() {}
    function l(t) {
        return t && (t = t.split(";", 2)[0]), t && (t == j ? "html" : t == E ? "json" : b.test(t) ? "script" : w.test(t) && "xml") || "text";
    }
    function f(t, e) {
        return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?");
    }
    function h(e) {
        e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)),
            !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = f(e.url, e.data),
                e.data = void 0);
    }
    function p(e, n, r, i) {
        return t.isFunction(n) && (i = r, r = n, n = void 0), t.isFunction(r) || (i = r,
            r = void 0), {
            url: e,
            data: n,
            success: r,
            dataType: i
        };
    }
    function d(e, n, r, i) {
        var o, a = t.isArray(n), s = t.isPlainObject(n);
        t.each(n, function(n, u) {
            o = t.type(u), i && (n = r ? i : i + "[" + (s || "object" == o || "array" == o ? n : "") + "]"),
                !i && a ? e.add(u.name, u.value) : "array" == o || !r && "object" == o ? d(e, u, r, n) : e.add(n, u);
        });
    }
    var m, v, g = 0, y = window.document, x = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, b = /^(?:text|application)\/javascript/i, w = /^(?:text|application)\/xml/i, E = "application/json", j = "text/html", T = /^\s*$/;
    t.active = 0, t.ajaxJSONP = function(e, n) {
        if (!("type" in e)) return t.ajax(e);
        var r, i, u = e.jsonpCallback, c = (t.isFunction(u) ? u() : u) || "jsonp" + ++g, l = y.createElement("script"), f = window[c], h = function(e) {
            t(l).triggerHandler("error", e || "abort");
        }, p = {
            abort: h
        };
        return n && n.promise(p), t(l).on("load error", function(o, u) {
            clearTimeout(i), t(l).off().remove(), "error" != o.type && r ? a(r[0], p, e, n) : s(null, u || "error", p, e, n),
                window[c] = f, r && t.isFunction(f) && f(r[0]), f = r = void 0;
        }), o(p, e) === !1 ? (h("abort"), p) : (window[c] = function() {
            r = arguments;
        }, l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + c), y.head.appendChild(l), e.timeout > 0 && (i = setTimeout(function() {
            h("timeout");
        }, e.timeout)), p);
    }, t.ajaxSettings = {
        type: "GET",
        beforeSend: c,
        success: c,
        error: c,
        complete: c,
        context: null,
        global: !0,
        xhr: function() {
            return new window.XMLHttpRequest();
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: E,
            xml: "application/xml, text/xml",
            html: j,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, t.ajax = function(e) {
        var n = t.extend({}, e || {}), i = t.Deferred && t.Deferred();
        for (m in t.ajaxSettings) void 0 === n[m] && (n[m] = t.ajaxSettings[m]);
        r(n), n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host),
            n.url || (n.url = window.location.toString()), h(n), n.cache === !1 && (n.url = f(n.url, "_=" + Date.now()));
        var u = n.dataType, p = /\?.+=\?/.test(n.url);
        if ("jsonp" == u || p) return p || (n.url = f(n.url, n.jsonp ? n.jsonp + "=?" : n.jsonp === !1 ? "" : "callback=?")),
            t.ajaxJSONP(n, i);
        var d, g = n.accepts[u], y = {}, x = function(t, e) {
            y[t.toLowerCase()] = [ t, e ];
        }, b = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol, w = n.xhr(), E = w.setRequestHeader;
        if (i && i.promise(w), n.crossDomain || x("X-Requested-With", "XMLHttpRequest"),
            x("Accept", g || "*/*"), (g = n.mimeType || g) && (g.indexOf(",") > -1 && (g = g.split(",", 2)[0]),
            w.overrideMimeType && w.overrideMimeType(g)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && x("Content-Type", n.contentType || "application/x-www-form-urlencoded"),
            n.headers) for (v in n.headers) x(v, n.headers[v]);
        if (w.setRequestHeader = x, w.onreadystatechange = function() {
            if (4 == w.readyState) {
                w.onreadystatechange = c, clearTimeout(d);
                var e, r = !1;
                if (w.status >= 200 && w.status < 300 || 304 == w.status || 0 == w.status && "file:" == b) {
                    u = u || l(n.mimeType || w.getResponseHeader("content-type")), e = w.responseText;
                    try {
                        "script" == u ? (1, eval)(e) : "xml" == u ? e = w.responseXML : "json" == u && (e = T.test(e) ? null : t.parseJSON(e));
                    } catch (o) {
                        r = o;
                    }
                    r ? s(r, "parsererror", w, n, i) : a(e, w, n, i);
                } else s(w.statusText || null, w.status ? "error" : "abort", w, n, i);
            }
        }, o(w, n) === !1) return w.abort(), s(null, "abort", w, n, i), w;
        if (n.xhrFields) for (v in n.xhrFields) w[v] = n.xhrFields[v];
        var j = "async" in n ? n.async : !0;
        w.open(n.type, n.url, j, n.username, n.password);
        for (v in y) E.apply(w, y[v]);
        return n.timeout > 0 && (d = setTimeout(function() {
            w.onreadystatechange = c, w.abort(), s(null, "timeout", w, n, i);
        }, n.timeout)), w.send(n.data ? n.data : null), w;
    }, t.get = function() {
        return t.ajax(p.apply(null, arguments));
    }, t.post = function() {
        var e = p.apply(null, arguments);
        return e.type = "POST", t.ajax(e);
    }, t.getJSON = function() {
        var e = p.apply(null, arguments);
        return e.dataType = "json", t.ajax(e);
    }, t.fn.load = function(e, n, r) {
        if (!this.length) return this;
        var i, o = this, a = e.split(/\s/), s = p(e, n, r), u = s.success;
        return a.length > 1 && (s.url = a[0], i = a[1]), s.success = function(e) {
            o.html(i ? t("<div>").html(e.replace(x, "")).find(i) : e), u && u.apply(o, arguments);
        }, t.ajax(s), this;
    };
    var S = encodeURIComponent;
    t.param = function(t, e) {
        var n = [];
        return n.add = function(t, e) {
            this.push(S(t) + "=" + S(e));
        }, d(n, t, e), n.join("&").replace(/%20/g, "+");
    };
}(Zepto), function(t) {
    t.fn.serializeArray = function() {
        var e, n = [];
        return t([].slice.call(this.get(0).elements)).each(function() {
            e = t(this);
            var r = e.attr("type");
            "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != r && "reset" != r && "button" != r && ("radio" != r && "checkbox" != r || this.checked) && n.push({
                name: e.attr("name"),
                value: e.val()
            });
        }), n;
    }, t.fn.serialize = function() {
        var t = [];
        return this.serializeArray().forEach(function(e) {
            t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value));
        }), t.join("&");
    }, t.fn.submit = function(e) {
        if (e) this.bind("submit", e); else if (this.length) {
            var n = t.Event("submit");
            this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit();
        }
        return this;
    };
}(Zepto), function(t) {
    "__proto__" in {} || t.extend(t.zepto, {
        Z: function(e, n) {
            return e = e || [], t.extend(e, t.fn), e.selector = n || "", e.__Z = !0, e;
        },
        isZ: function(e) {
            return "array" === t.type(e) && "__Z" in e;
        }
    });
    try {
        getComputedStyle(void 0);
    } catch (e) {
        var n = getComputedStyle;
        window.getComputedStyle = function(t) {
            try {
                return n(t);
            } catch (e) {
                return null;
            }
        };
    }
}(Zepto);

!function(e, t) {
    function n(e) {
        return e.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase();
    }
    function i(e) {
        return r ? r + e : e.toLowerCase();
    }
    var r, o, a, s, u, c, l, f, d, h, m = "", p = {
        Webkit: "webkit",
        Moz: "",
        O: "o"
    }, g = window.document, v = g.createElement("div"), w = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, y = {};
    e.each(p, function(e, n) {
        return v.style[e + "TransitionProperty"] !== t ? (m = "-" + e.toLowerCase() + "-",
            r = n, !1) : void 0;
    }), o = m + "transform", y[a = m + "transition-property"] = y[s = m + "transition-duration"] = y[c = m + "transition-delay"] = y[u = m + "transition-timing-function"] = y[l = m + "animation-name"] = y[f = m + "animation-duration"] = y[h = m + "animation-delay"] = y[d = m + "animation-timing-function"] = "",
        e.fx = {
            off: r === t && v.style.transitionProperty === t,
            speeds: {
                _default: 400,
                fast: 200,
                slow: 600
            },
            cssPrefix: m,
            transitionEnd: i("TransitionEnd"),
            animationEnd: i("AnimationEnd")
        }, e.fn.animate = function(n, i, r, o, a) {
        return e.isFunction(i) && (o = i, r = t, i = t), e.isFunction(r) && (o = r, r = t),
            e.isPlainObject(i) && (r = i.easing, o = i.complete, a = i.delay, i = i.duration),
            i && (i = ("number" == typeof i ? i : e.fx.speeds[i] || e.fx.speeds._default) / 1e3),
            a && (a = parseFloat(a) / 1e3), this.anim(n, i, r, o, a);
    }, e.fn.anim = function(i, r, m, p, g) {
        var v, b, j, q = {}, A = "", x = this, T = e.fx.transitionEnd, P = !1;
        if (r === t && (r = e.fx.speeds._default / 1e3), g === t && (g = 0), e.fx.off && (r = 0),
            "string" == typeof i) q[l] = i, q[f] = r + "s", q[h] = g + "s", q[d] = m || "linear",
            T = e.fx.animationEnd; else {
            b = [];
            for (v in i) w.test(v) ? A += v + "(" + i[v] + ") " : (q[v] = i[v], b.push(n(v)));
            A && (q[o] = A, b.push(o)), r > 0 && "object" == typeof i && (q[a] = b.join(", "),
                q[s] = r + "s", q[c] = g + "s", q[u] = m || "linear");
        }
        return j = function(t) {
            if ("undefined" != typeof t) {
                if (t.target !== t.currentTarget) return;
                e(t.target).unbind(T, j);
            } else e(this).unbind(T, j);
            P = !0, e(this).css(y), p && p.call(this);
        }, r > 0 && (this.bind(T, j), setTimeout(function() {
            P || j.call(x);
        }, 1e3 * r + 25)), this.size() && this.get(0).clientLeft, this.css(q), 0 >= r && setTimeout(function() {
            x.each(function() {
                j.call(this);
            });
        }, 0), this;
    }, v = null;
}(Zepto), function(e) {
    var t, n = [];
    e.fn.remove = function() {
        return this.each(function() {
            this.parentNode && ("IMG" === this.tagName && (n.push(this), this.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
                t && clearTimeout(t), t = setTimeout(function() {
                n = [];
            }, 6e4)), this.parentNode.removeChild(this));
        });
    };
}(Zepto), function(e, t) {
    function n(n, i, r, o, a) {
        "function" != typeof i || a || (a = i, i = t);
        var s = {
            opacity: r
        };
        return o && (s.scale = o, n.css(e.fx.cssPrefix + "transform-origin", "0 0")), n.animate(s, i, null, a);
    }
    function i(t, i, r, o) {
        return n(t, i, 0, r, function() {
            a.call(e(this)), o && o.call(this);
        });
    }
    var r = window.document, o = (r.documentElement, e.fn.show), a = e.fn.hide, s = e.fn.toggle;
    e.fn.show = function(e, i) {
        return o.call(this), e === t ? e = 0 : this.css("opacity", 0), n(this, e, 1, "1,1", i);
    }, e.fn.hide = function(e, n) {
        return e === t ? a.call(this) : i(this, e, "0,0", n);
    }, e.fn.toggle = function(n, i) {
        return n === t || "boolean" == typeof n ? s.call(this, n) : this.each(function() {
            var t = e(this);
            t["none" == t.css("display") ? "show" : "hide"](n, i);
        });
    }, e.fn.fadeTo = function(e, t, i) {
        return n(this, e, t, null, i);
    }, e.fn.fadeIn = function(e, t) {
        var n = this.css("opacity");
        return n > 0 ? this.css("opacity", 0) : n = 1, o.call(this).fadeTo(e, n, t);
    }, e.fn.fadeOut = function(e, t) {
        return i(this, e, null, t);
    }, e.fn.fadeToggle = function(t, n) {
        return this.each(function() {
            var i = e(this);
            i[0 == i.css("opacity") || "none" == i.css("display") ? "fadeIn" : "fadeOut"](t, n);
        });
    };
}(Zepto), function(e) {
    e.Callbacks = function(t) {
        t = e.extend({}, t);
        var n, i, r, o, a, s, u = [], c = !t.once && [], l = function(e) {
            for (n = t.memory && e, i = !0, s = o || 0, o = 0, a = u.length, r = !0; u && a > s; ++s) if (u[s].apply(e[0], e[1]) === !1 && t.stopOnFalse) {
                n = !1;
                break;
            }
            r = !1, u && (c ? c.length && l(c.shift()) : n ? u.length = 0 : f.disable());
        }, f = {
            add: function() {
                if (u) {
                    var i = u.length, s = function(n) {
                        e.each(n, function(e, n) {
                            "function" == typeof n ? t.unique && f.has(n) || u.push(n) : n && n.length && "string" != typeof n && s(n);
                        });
                    };
                    s(arguments), r ? a = u.length : n && (o = i, l(n));
                }
                return this;
            },
            remove: function() {
                return u && e.each(arguments, function(t, n) {
                    for (var i; (i = e.inArray(n, u, i)) > -1; ) u.splice(i, 1), r && (a >= i && --a,
                        s >= i && --s);
                }), this;
            },
            has: function(t) {
                return !(!u || !(t ? e.inArray(t, u) > -1 : u.length));
            },
            empty: function() {
                return a = u.length = 0, this;
            },
            disable: function() {
                return u = c = n = void 0, this;
            },
            disabled: function() {
                return !u;
            },
            lock: function() {
                return c = void 0, n || f.disable(), this;
            },
            locked: function() {
                return !c;
            },
            fireWith: function(e, t) {
                return !u || i && !c || (t = t || [], t = [ e, t.slice ? t.slice() : t ], r ? c.push(t) : l(t)),
                    this;
            },
            fire: function() {
                return f.fireWith(this, arguments);
            },
            fired: function() {
                return !!i;
            }
        };
        return f;
    };
}(Zepto), function(e) {
    function t(t) {
        return t = e(t), !(!t.width() && !t.height()) && "none" !== t.css("display");
    }
    function n(e, t) {
        e = e.replace(/=#\]/g, '="#"]');
        var n, i, r = s.exec(e);
        if (r && r[2] in a && (n = a[r[2]], i = r[3], e = r[1], i)) {
            var o = Number(i);
            i = isNaN(o) ? i.replace(/^["']|["']$/g, "") : o;
        }
        return t(e, n, i);
    }
    var i = e.zepto, r = i.qsa, o = i.matches, a = e.expr[":"] = {
        visible: function() {
            return t(this) ? this : void 0;
        },
        hidden: function() {
            return t(this) ? void 0 : this;
        },
        selected: function() {
            return this.selected ? this : void 0;
        },
        checked: function() {
            return this.checked ? this : void 0;
        },
        parent: function() {
            return this.parentNode;
        },
        first: function(e) {
            return 0 === e ? this : void 0;
        },
        last: function(e, t) {
            return e === t.length - 1 ? this : void 0;
        },
        eq: function(e, t, n) {
            return e === n ? this : void 0;
        },
        contains: function(t, n, i) {
            return e(this).text().indexOf(i) > -1 ? this : void 0;
        },
        has: function(e, t, n) {
            return i.qsa(this, n).length ? this : void 0;
        }
    }, s = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"), u = /^\s*>/, c = "Zepto" + +new Date();
    i.qsa = function(t, o) {
        return n(o, function(n, a, s) {
            try {
                var l;
                !n && a ? n = "*" : u.test(n) && (l = e(t).addClass(c), n = "." + c + " " + n);
                var f = r(t, n);
            } catch (d) {
                throw console.error("error performing selector: %o", o), d;
            } finally {
                l && l.removeClass(c);
            }
            return a ? i.uniq(e.map(f, function(e, t) {
                return a.call(e, t, f, s);
            })) : f;
        });
    }, i.matches = function(e, t) {
        return n(t, function(t, n, i) {
            return !(t && !o(e, t) || n && n.call(e, null, i) !== e);
        });
    };
}(Zepto), function(e) {
    function t(n) {
        var i = [ [ "resolve", "done", e.Callbacks({
            once: 1,
            memory: 1
        }), "resolved" ], [ "reject", "fail", e.Callbacks({
            once: 1,
            memory: 1
        }), "rejected" ], [ "notify", "progress", e.Callbacks({
            memory: 1
        }) ] ], r = "pending", o = {
            state: function() {
                return r;
            },
            always: function() {
                return a.done(arguments).fail(arguments), this;
            },
            then: function() {
                var n = arguments;
                return t(function(t) {
                    e.each(i, function(i, r) {
                        var s = e.isFunction(n[i]) && n[i];
                        a[r[1]](function() {
                            var n = s && s.apply(this, arguments);
                            if (n && e.isFunction(n.promise)) n.promise().done(t.resolve).fail(t.reject).progress(t.notify); else {
                                var i = this === o ? t.promise() : this, a = s ? [ n ] : arguments;
                                t[r[0] + "With"](i, a);
                            }
                        });
                    }), n = null;
                }).promise();
            },
            promise: function(t) {
                return null != t ? e.extend(t, o) : o;
            }
        }, a = {};
        return e.each(i, function(e, t) {
            var n = t[2], s = t[3];
            o[t[1]] = n.add, s && n.add(function() {
                r = s;
            }, i[1 ^ e][2].disable, i[2][2].lock), a[t[0]] = function() {
                return a[t[0] + "With"](this === a ? o : this, arguments), this;
            }, a[t[0] + "With"] = n.fireWith;
        }), o.promise(a), n && n.call(a, a), a;
    }
    var n = Array.prototype.slice;
    e.when = function(i) {
        var r, o, a, s = n.call(arguments), u = s.length, c = 0, l = 1 !== u || i && e.isFunction(i.promise) ? u : 0, f = 1 === l ? i : t(), d = 0, h = function(e, t, i) {
            return function(o) {
                t[e] = this, i[e] = arguments.length > 1 ? n.call(arguments) : o, i === r ? f.notifyWith(t, i) : --l || f.resolveWith(t, i);
            };
        }, m = function() {
            return function() {
                d++, --l || (d == u ? f.reject() : f.resolve());
            };
        };
        if (u > 1) for (r = new Array(u), o = new Array(u), a = new Array(u); u > c; ++c) s[c] && e.isFunction(s[c].promise) ? s[c].promise().done(h(c, a, s)).fail(m()).progress(h(c, o, r)) : --l;
        return l || f.resolveWith(a, s), f.promise();
    }, e.Deferred = t;
}(Zepto), function(e) {
    function t(t, i) {
        var u = t[s], c = u && r[u];
        if (void 0 === i) return c || n(t);
        if (c) {
            if (i in c) return c[i];
            var l = a(i);
            if (l in c) return c[l];
        }
        return o.call(e(t), i);
    }
    function n(t, n, o) {
        var u = t[s] || (t[s] = ++e.uuid), c = r[u] || (r[u] = i(t));
        return void 0 !== n && (c[a(n)] = o), c;
    }
    function i(t) {
        var n = {};
        return e.each(t.attributes || u, function(t, i) {
            0 == i.name.indexOf("data-") && (n[a(i.name.replace("data-", ""))] = e.zepto.deserializeValue(i.value));
        }), n;
    }
    var r = {}, o = e.fn.data, a = e.camelCase, s = e.expando = "Zepto" + +new Date(), u = [];
    e.fn.data = function(i, r) {
        return void 0 === r ? e.isPlainObject(i) ? this.each(function(t, r) {
            e.each(i, function(e, t) {
                n(r, e, t);
            });
        }) : 0 in this ? t(this[0], i) : void 0 : this.each(function() {
            n(this, i, r);
        });
    }, e.fn.removeData = function(t) {
        return "string" == typeof t && (t = t.split(/\s+/)), this.each(function() {
            var n = this[s], i = n && r[n];
            i && e.each(t || i, function(e) {
                delete i[t ? a(this) : e];
            });
        });
    }, [ "remove", "empty" ].forEach(function(t) {
        var n = e.fn[t];
        e.fn[t] = function() {
            var e = this.find("*");
            return "remove" === t && (e = e.add(this)), e.removeData(), n.call(this);
        };
    });
}(Zepto), function(e) {
    [ "width", "height" ].forEach(function(t) {
        var n = t.replace(/./, function(e) {
            return e[0].toUpperCase();
        });
        e.fn["outer" + n] = function(e) {
            var n = this;
            if (n) {
                var i = n[t](), r = {
                    width: [ "left", "right" ],
                    height: [ "top", "bottom" ]
                };
                return r[t].forEach(function(t) {
                    e && (i += parseInt(n.css("margin-" + t), 10));
                }), i;
            }
            return null;
        };
    });
}(window.Zepto || window.jQuery),
function(e) {
    var t = e.ajax;
    e.ajax = function(n) {
        return n.data = n.data || {}, n.data.csrfmiddlewaretoken = e('input[name="csrfmiddlewaretoken"]').val(),
            t(n);
    };
}(window.Zepto || window.jQuery),
function(e) {
    function t(e, t, n, i) {
        return Math.abs(e - t) >= Math.abs(n - i) ? e - t > 0 ? "Left" : "Right" : n - i > 0 ? "Up" : "Down";
    }
    function n() {
        l = null, d.last && (d.el && d.el.trigger("longTap"), d = {});
    }
    function i() {
        l && clearTimeout(l), l = null;
    }
    function r() {
        s && clearTimeout(s), u && clearTimeout(u), c && clearTimeout(c), l && clearTimeout(l),
            s = u = c = l = null, d = {};
    }
    function o(e) {
        return ("touch" == e.pointerType || e.pointerType == e.MSPOINTER_TYPE_TOUCH) && e.isPrimary;
    }
    function a(e, t) {
        return e.type == "pointer" + t || e.type.toLowerCase() == "mspointer" + t;
    }
    var s, u, c, l, f, d = {}, h = 750;
    e(document).ready(function() {
        var m, p, g, v, w = 0, y = 0;
        "MSGesture" in window && (f = new MSGesture(), f.target = document.body), e(document).bind("MSGestureEnd", function(e) {
            var t = e.velocityX > 1 ? "Right" : e.velocityX < -1 ? "Left" : e.velocityY > 1 ? "Down" : e.velocityY < -1 ? "Up" : null;
            t && (d.el && d.el.trigger("swipe"), d.el && d.el.trigger("swipe" + t));
        }).on("touchstart MSPointerDown pointerdown", function(t) {
                (!(v = a(t, "down")) || o(t)) && (g = v ? t : t.touches[0], t.touches && 1 === t.touches.length && d.x2 && (d.x2 = void 0,
                    d.y2 = void 0), m = Date.now(), p = m - (d.last || m), d.el = e("tagName" in g.target ? g.target : g.target.parentNode),
                    s && clearTimeout(s), d.x1 = g.pageX, d.y1 = g.pageY, p > 0 && 250 >= p && (d.isDoubleTap = !0),
                    d.last = m, l = setTimeout(n, h), f && v && f.addPointer(t.pointerId));
            }).on("touchmove MSPointerMove pointermove", function(e) {
                (!(v = a(e, "move")) || o(e)) && (g = v ? e : e.touches[0], i(), d.x2 = g.pageX,
                    d.y2 = g.pageY, w += Math.abs(d.x1 - d.x2), y += Math.abs(d.y1 - d.y2));
            }).on("touchend MSPointerUp pointerup", function(n) {
                (!(v = a(n, "up")) || o(n)) && (i(), d.x2 && Math.abs(d.x1 - d.x2) > 30 || d.y2 && Math.abs(d.y1 - d.y2) > 30 ? c = setTimeout(function() {
                    d.el && d.el.trigger("swipe"), d.el && d.el.trigger("swipe" + t(d.x1, d.x2, d.y1, d.y2)),
                        d = {};
                }, 0) : "last" in d && (30 > w && 30 > y ? u = setTimeout(function() {
                    var t = e.Event("tap");
                    t.cancelTouch = r, d.el && d.el.trigger(t), d.isDoubleTap ? (d.el && d.el.trigger("doubleTap"),
                        d = {}) : s = setTimeout(function() {
                        s = null, d.el && d.el.trigger("singleTap"), d = {};
                    }, 250);
                }, 0) : d = {}), w = y = 0);
            }).on("touchcancel MSPointerCancel pointercancel", r), e(window).on("scroll", r);
    }), [ "swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap" ].forEach(function(t) {
        e.fn[t] = function(e) {
            return this.on(t, e);
        };
    });
}(window.Zepto || window.jQuery), function(e) {
    if (!e.getScript) {
        var t = e.Deferred();
        e.getScript = function(e) {
            var n = document.createElement("script");
            return n.async = "async", n.src = e, n.onload = function() {
                t.resolve();
            }, n.onerror = function() {
                t.reject();
            }, setTimeout(function() {
                document.getElementsByTagName("head")[0].appendChild(n);
            }), t;
        };
    }
}(window.Zepto || window.jQuery),


function(e) {
    function t(e, t) {
        var n = this.os = {}, i = this.browser = {}, r = e.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
            o = e.match(/(Android);?[\s\/]+([\d.]+)?/), a = !!e.match(/\(Macintosh\; Intel /),
            s = e.match(/(iPad).*OS\s([\d_]+)/), u = e.match(/(iPod)(.*OS\s([\d_]+))?/),
            c = !s && e.match(/(iPhone\sOS)\s([\d_]+)/), l = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
            f = /Win\d{2}|Windows/.test(t), d = e.match(/Windows Phone ([\d.]+)/), h = l && e.match(/TouchPad/),
            m = e.match(/Kindle\/([\d.]+)/), p = e.match(/Silk\/([\d._]+)/), g = e.match(/(BlackBerry).*Version\/([\d.]+)/),
            v = e.match(/(BB10).*Version\/([\d.]+)/), w = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/), y = e.match(/PlayBook/),
            b = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/), j = e.match(/Firefox\/([\d.]+)/),
            q = e.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/), A = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
            x = !b && e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/), T = x || e.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
        (i.webkit = !!r) && (i.version = r[1]), o && (n.android = !0, n.version = o[2]),
            c && !u && (n.ios = n.iphone = !0, n.version = c[2].replace(/_/g, ".")), s && (n.ios = n.ipad = !0,
            n.version = s[2].replace(/_/g, ".")), u && (n.ios = n.ipod = !0, n.version = u[3] ? u[3].replace(/_/g, ".") : null),
            d && (n.wp = !0, n.version = d[1]), l && (n.webos = !0, n.version = l[2]), h && (n.touchpad = !0),
            g && (n.blackberry = !0, n.version = g[2]), v && (n.bb10 = !0, n.version = v[2]),
            w && (n.rimtabletos = !0, n.version = w[2]), y && (i.playbook = !0), m && (n.kindle = !0,
            n.version = m[1]), p && (i.silk = !0, i.version = p[1]), !p && n.android && e.match(/Kindle Fire/) && (i.silk = !0),
            b && (i.chrome = !0, i.version = b[1]), j && (i.firefox = !0, i.version = j[1]),
            q && (n.firefoxos = !0, n.version = q[1]), A && (i.ie = !0, i.version = A[1]), T && (a || n.ios || f) && (i.safari = !0,
            n.ios || (i.version = T[1])), x && (i.webview = !0), i.ucbrowser = e.match(/ucbrowser/g) ? !0 : !1,
            i.toutiao = "http://nativeapp.toutiao.com" == document.referrer || /(News|NewsSocial|Explore|NewsArticle)( |\/)(\d.\d.\d)/i.test(e),
            n.tablet = !!(s || y || o && !e.match(/Mobile/) || j && e.match(/Tablet/) || A && !e.match(/Phone/) && e.match(/Touch/)),
            n.phone = !(n.tablet || n.ipod || !(o || c || l || g || v || b && e.match(/Android/) || b && e.match(/CriOS\/([\d.]+)/) || j && e.match(/Mobile/) || A && e.match(/Touch/)));
    }
    t.call(e, navigator.userAgent, navigator.platform), e.__detect = t;
}(window.Zepto || window.jQuery),

function(e) {
    function t(t) {
        var i = e.extend(s.settings, t), r = e.proxy(n, this);
        r(), i.refreshMillis > 0 && setInterval(r, i.refreshMillis);
    }
    function n() {
        var t = i(this), n = t.datetime;
        return isNaN(n) || e(this).text(s.inWords(n)), this;
    }
    function i(t) {
        return t = e(t), t.data("timeago") || t.data("timeago", {
            datetime: s.datetime(t)
        }), t.data("timeago");
    }
    function r(e) {
        return new Date().getTime() - e.getTime();
    }
    function o(e) {
        var t = new Date();
        return t.getMonth() > e.getMonth() || t.getDate() > e.getDate();
    }
    function a(e) {
        return new Date().getFullYear() > e.getFullYear();
    }
    Date.prototype.format = function(e) {
        var t = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            S: this.getMilliseconds()
        };
        /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var n in t) new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[n] : ("00" + t[n]).substr(("" + t[n]).length)));
        return e;
    };
    var s = {
        settings: {
            refreshMillis: 6e4,
            relative: !1,
            strings: {
                suffixAgo: "前",
                seconds: "刚刚",
                minute: "1分钟",
                minutes: "%d分钟",
                hour: "1小时",
                hours: "%d小时",
                days: "%d天",
                months: "%d月",
                years: "%d年",
                numbers: []
            },
            yearsAgoFormat: "yyyy-MM-dd",
            daysAgoFormat: "MM-dd hh:mm"
        },
        inWords: function(t) {
            function n(t, n) {
                var i = e.isFunction(t) ? t(n, u) : t, r = c.numbers && c.numbers[n] || n;
                return i.replace(/%d/i, r);
            }
            var i = s.settings.relative;
            if (!i && a(t)) return t.format(this.settings.yearsAgoFormat);
            if (!i && o(t)) return t.format(this.settings.daysAgoFormat);
            var u = r(t), c = this.settings.strings, l = c.suffixAgo, f = Math.abs(u) / 1e3, d = f / 60, h = d / 60, m = h / 24, p = m / 30, g = m / 365;
            return words = 60 > f ? n(c.seconds, Math.floor(f)) : 60 > d ? n(c.minutes, Math.floor(d)) : 24 > h ? n(c.hours, Math.floor(h)) : 30 > m ? n(c.days, Math.floor(m)) : 365 > m ? n(c.months, Math.floor(p)) : n(c.years, Math.floor(g)),
                "刚刚" == words ? words : words + l;
        },
        parse: function(t) {
            var n = e.trim(t);
            return n = n.replace(/\.\d+/, ""), n = n.replace(/-/, "/").replace(/-/, "/"), n = n.replace(/T/, " ").replace(/Z/, " UTC"),
                n = n.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"), new Date(n);
        },
        datetime: function(t) {
            var n = e(t).attr(s.isTime(t) ? "datetime" : "title");
            return s.parse(n);
        },
        isTime: function(t) {
            return "time" === e(t).get(0).tagName.toLowerCase();
        }
    };
    e.fn.timeago = function(e) {
        return this.each(function() {
            t.call(this, e);
        }), this;
    };
}(window.Zepto || window.jQuery),function(e){
    var ua = navigator.userAgent;
    e.browser = e.browser || {},
    e.browser.ios = /iPhone|iPod|iPad/i.test(ua), e.browser.iphone = /iPhone/i.test(ua),
    e.browser.ipad = /iPad/i.test(ua), e.browser.android = /Android/i.test(ua), e.browser.android4 = /Android\s4/i.test(ua),
    e.browser.android2 = /Android\s2/i.test(ua)
}(window.Zepto || window.jQuery);

(window.Zepto || window.jQuery).cookie = function(e, t, n) {
    if ("undefined" == typeof t) {
        var i = null;
        if (document.cookie && "" != document.cookie) for (var r = document.cookie.split(";"), o = 0; o < r.length; o++) {
            var a = (window.jQuery || window.Zepto).trim(r[o]);
            if (a.substring(0, e.length + 1) == e + "=") {
                i = decodeURIComponent(a.substring(e.length + 1));
                break;
            }
        }
        return i;
    }
    n = n || {}, null === t && (t = "", n.expires = -1);
    var s = "";
    if (n.expires && ("number" == typeof n.expires || n.expires.toUTCString)) {
        var u;
        "number" == typeof n.expires ? (u = new Date(), u.setTime(u.getTime() + n.expires)) : u = n.expires,
            s = "; expires=" + u.toUTCString();
    }
    var c = n.path ? "; path=" + n.path : "", l = n.domain ? "; domain=" + n.domain : "", f = n.secure ? "; secure" : "";
    document.cookie = [ e, "=", encodeURIComponent(t), s, c, l, f ].join("");
},
$.request = function(e) {
    if (!$.__tt_requestParams) {
        for (var t = location.search, n = t.substring(t.indexOf("?") + 1, t.length).split("&"), i = {}, r = 0, o = n.length; o > r; r++) {
            var a = n[r];
            a && (i[a.substring(0, a.indexOf("=")).toLowerCase()] = a.substring(a.indexOf("=") + 1, a.length));
        }
        $.__tt_requestParams = i;
    }
    if (!e) return i;
    var s = $.__tt_requestParams[e.toLowerCase()];
    return s ? $.trim(s) : "";
},
$.hash = function() {
    var e = location.hash.substr(1), t = {};
    if (e) for (var n = e.split("&"), i = 0; i < n.length; i++) {
        var r = n[i].split("=");
        t[r[0]] = r[1];
    }
    if ("string" == typeof arguments[0]) return t[arguments[0]];
    if ("object" == typeof arguments[0]) {
        for (var o in arguments[0]) t[o] = arguments[0][o];
        var a = "";
        for (var o in t) a += o + "=" + t[o] + "&";
        location.href = "#" + a.substring(0, a.length - 1);
    }
}();


