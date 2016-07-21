/*! TenVideoPlayer_V2 - v2.0.0 - 2015-12-10 16:24:51
 * Copyright (c) 2015
 * Powered by Tencent-Video Web Front End Team 
*/
!function(a, b) {
    function c(b) {
        var c;
        return b.relatedBtn && (g ? (c = a.$.getUrlParam("from", b.relatedBtn.attr("href")),
        c = c.replace(/\D/g, "")) : c = a.$.getUrlParam("confid", b.relatedBtn.attr("data-downloadurl"))),
        !c && b.promotionId && (c = b.promotionId),
        !c && b.downloadBtn && (c = b.downloadBtn.attr("data-promotionId")),
        c || 666
    }
    function d(d, e) {
        var f = {
            cmd: 3537,
            int5: d,
            str4: g ? 3 : 1,
            str8: b.getUrlParam("mmuin"),
            val: e.initStep || 1
        }
          , h = e.t;
        f.int6 = c(e),
        a.app.report(f, h)
    }
    function e(a) {
        this.userop = a;
        var c = b.extend({}, f, a);
        return this.op = c,
        this.init(c),
        this
    }
    var f = {
        pluginName: "AppRecommend",
        text1: "\u67e5\u770b\u516c\u4f17\u53f7\u66f4\u591a\u89c6\u9891",
        picCgi: a.common.get_request_url("rmd_mobile"),
        navCurrentClass: "tvp_current",
        downloader: !0,
        range: [1, 2],
        downloaderCallback: "transferDownloadState",
        tpl: ['<div data-role="relatebox" id="${relateid}" class="tvp_related_layer tvp_related_layer_nobanner tvp_none">', '<div class="tvp_related">', '<div data-role="relatemove" class="tvp_related_inner">', "<% for(var i=0;i<list.length;i++) {%>", '<ul class="tvp_related_list">', "<% for(var j=0;j<list[i].length;j++) {%>", '<li class="tvp_item">', '<a data-alginfo="<%=list[i][j].alginfo%>" data-action="applink" data-vid="<%=list[i][j].id%>" ${iframe} data-role="relatelink" data-url="#" href="#" class="tvp_related_link">', '<div class="tvp_figure">', '<img src="<%=list[i][j].pic3url%>" alt="" class="tvp_pic">', "<% if(list[i][j].isFull==1) { %>", '<div class="tvp_mark_skew">\u5b8c\u6574\u7248</div>', "<% } %>", "</div>", '<div class="tvp_title"><%=list[i][j].title%></div>', "</a>", "</li>", "<% }%>", "</ul>", "<% }%>", "</div>", '<div class="tvp_related_nav">', "<% for(var i=0;i<navCount;i++) {%>", '<div data-role="relatetrigger" class="tvp_dot"></div>', "<% }%>", "</div>", '<div class="tvp_related_gap"></div>', "</div>", '<div data-role="replay" class="tvp_replay"><div class="tvp_icon_replay"></div>\u91cd\u65b0\u64ad\u653e</div>', "</div>"].join(""),
        tpl2: ['<div style="display:none;" data-role="relatebox" class="tvp_related" id="${relateid}">', '   <div data-role="relatemove" class="tvp_related_inner">', "		<% for(var i=0;i<list.length;i++) {%>", "			<% if(i==0) {%>", '			<ul class="${listclass}">', "			<% }%>", "			<% if(i>0 && i%3==0) {%>", "			</ul>", '			<ul class="${listclass}">', "			<% }%>", '			<li class="tvp_item">', '				<a data-action="applink" ${iframe} data-role="relatelink" data-url="#" href="#" data-vid="<%=list[i].id%>" class="tvp_related_link"><img class="tvp_figure" src="<%=list[i].picurl%>" /><strong class="tvp_title"><%=list[i].title%></strong></a>', "			</li>", "			<% if(i==list.length-1) {%>", "			</ul>", "			<% }%>", "		<% }%>", "   </div>", "	<% if(list.length>3) {%>", '	<div class="tvp_related_nav">', "	<% for(var i=0;i<list.length;i++) {%>", "		<% if(i%3==0) {%>", '			<i data-role="relatetrigger" class="dot"></i>', "		<% }%>", "	<% }%>", "   </div>", "	<% }%>", "</div>", '<div style="display:none;" data-role="replay" class="tvp_replay"><i class="tvp_icon_replay"></i>\u91cd\u65b0\u64ad\u653e</div>'].join(""),
        shortVideoTpl: ['<div class="tvp_full_layer tvp_none" data-role="relatebox">', '<div class="tvp_layer_inner">', '<div class="tvp_desc">\u6253\u5f00\u817e\u8baf\u89c6\u9891</div>', '<a href="#" class="tvp_btn_normal" data-role="relatebox-btn"><%=data.title%></a>', "</div>", '<div data-role="replay" class="tvp_replay"><div class="tvp_icon_replay"></div>\u91cd\u65b0\u64ad\u653e</div>', "</div>"].join(""),
        recommendTips: ['<div class="related_banner" data-role="relatetips">', '  <div class="related_banner_inner">\u5230\u817e\u8baf\u89c6\u9891\u5ba2\u6237\u7aef\uff0c\u770b\u66f4\u591a\u7cbe\u5f69\u63a8\u8350</div>', "</div>"].join(""),
        bannerTpl: ['<div data-role="appbannerbox" class="tvp_app_download" style="display:none">', '   <a data-action="applink" data-role="appbannerlink" class="tvp_download_app" href="${url}" ${iframe}>', '		<i class="tvp_icon_logo"></i>', '		<span class="tvp_download_app_wording"><span class="tvp_download_app_title" data-role="appbannertext1">${text1}</span><span data-role="appbannertext2" class="tvp_download_app_desc">${text2}</span></span>', '		<span data-role="appbannerbtntext" class="tvp_app_btn_em">${btnText}</span>', "	</a>", "</div>"].join(""),
        downLoadLayer: ['<div class="tvp_download_layer" data-role="download-layer" style="display:none;">', '<div class="tvp_promote_text" data-role="promote-text">\u6b63\u5728\u4e0b\u8f7d\u817e\u8baf\u89c6\u9891\uff0c\u9a6c\u4e0a\u5c31\u80fd\u89c2\u770b\u54df</div>', '<div class="tvp_promote_download" data-status="downloading">', '<div class="tvp_promote_progress" data-role="appbannerbtnprogress"></div>', "</div>", '<div class="tvp_dowanload_finish tvp_none" data-role="finish">', '<span class="tvp_icon_finish"></span>', '<span class="tvp_btn">\u4e0b\u8f7d\u5df2\u5b8c\u6210\uff0c\u70b9\u51fb\u5b89\u88c5</span>', "</div>", "</div>"].join(""),
        installedTips: ['<div class="tvp_install_success">', '<div class="tvp_tips">\u5b89\u88c5\u5df2\u5b8c\u6210\uff0c<br>\u70b9\u51fb\u53ef\u76f4\u63a5\u64ad\u653e</div>', '<span class="tvp_arrow"></span>', "</div>"].join("")
    }
      , g = !1
      , h = !1;
    b.extend(e.prototype, {
        init: function(a) {
            var c = a.t
              , d = this;
            this.op = b.extend(a, {
                $mod: c.$UILayer || c.$videomod,
                currentIndex: 0,
                relateid: "tvp_related_" + c.playerid,
                eventType: b.os.hasTouch ? "touchend" : "click",
                currentTime: 0,
                replayClicked: !1,
                tjReportParams: "",
                isWechatIframe: 2 == a.type ? !0 : !1,
                vidArray: []
            }),
            this.fixParams(a),
            d.isShortVideo = d.op.t.config.isShortVideo,
            d.longVideoID = d.op.t.config.longVideoID || d.op.vid,
            this.initFirstEvent(a).done(function() {
                return d.isShortVideo ? (d.initShortVideoRole(),
                d.initEvent(a),
                void d.fixShortVideoOpen()) : void d.getList(a).done(function(b) {
                    b && (d.initRoles(b),
                    d.fixVideoUrl(a),
                    d.initEvent(a))
                }
                )
            }
            )
        },
        fixShortVideoOpen: function() {
            var b = this
              , e = {
                promotionId: c(b.op.t.config),
                vid: b.longVideoID
            };
            b.op && b.op.t && (b.op.t.curVideo.getCoverId() || b.op.t.config.coverId) && (e.cid = b.op.t.curVideo.getCoverId() || b.op.t.config.coverId),
            a.app.check(e).done(function(c) {
                c && c.url && (b.hasApp = c.hasApp,
                g = c.hasApp,
                b.op.t.config && b.op.t.config.shortVideoOpenUrl && (c.openUrl = b.op.t.config.shortVideoOpenUrl),
                b.openUrl = c.openUrl,
                b.downloadUrl = c.url,
                b.updateFullVideoBtn(c.openUrl, c.url),
                b.hasApp ? d(6, b.op) : (a.app.bindTryOpenAppBanner && a.app.bindTryOpenAppBanner({
                    $btn: b.$btn
                }),
                d(1, b.op)),
                b.$btn.on("click", function() {
                    b.op.relatedBtn = b.$btn,
                    b.hasApp ? d(7, b.op) : d(2, b.op)
                }
                )),
                b.fixShortVideoUrlEvent(b.op)
            }
            )
        },
        updateFullVideoBtn: function(a, b) {
            if (a = a || this.openUrl,
            b = b || this.downloadUrl,
            a && b) {
                var d = {};
                "undefined" != typeof a && (d.href = b),
                "undefined" != typeof b && (d["data-url"] = a),
                d["data-promotionid"] = c(this.op.t.config),
                this.hasApp && a && (d.href = a),
                this.$btn.attr(d)
            }
        },
        isShowByLanscape: function(a) {
            var b = !1
              , c = a.width()
              , d = a.height()
              , e = 530;
            return c > d && c > e && (b = !0),
            b
        },
        insertTip: function() {},
        removeTip: function() {
            var a = this.op
              , b = a.$mod
              , c = b.find('[data-role="relatetips"]');
            c && c.remove && c.remove()
        },
        fixUI: function() {
            var a = this.op
              , c = a.t
              , d = a.$mod
              , e = d.find(".tvp_video");
            if (!c.$UILayer) {
                d.addClass("tvp_container");
                var f = e.find(".tvp_shadow");
                f.length || (f = b('<div class="tvp_shadow"></div>').appendTo(e),
                f.hide()),
                this.$shadow = f
            }
        },
        fixShowShortVideo: function(a) {
            a ? (this.$relateBox.removeClass("tvp_none"),
            this.$replay.removeClass("tvp_none"),
            this.op.t.$video.trigger("overlay_ctrl_hidereplay")) : (this.$relateBox.addClass("tvp_none"),
            this.$replay.addClass("tvp_none"))
        },
        fixShow: function(a) {
            if (this.isShortVideo)
                return void this.fixShowShortVideo(a);
            var b = this
              , c = this.op
              , e = c.t
              , f = c.$mod
              , i = this.$shadow
              , j = this.$relateBox
              , k = this.$replay
              , l = c.t.$video[0];
            "function" == typeof c.t.hasDurationLimit && c.t.hasDurationLimit() || (a ? (e.hidePlayer(l),
            e.$UILayer ? (e.hideControl(),
            e.$video.trigger("overlay_ctrl_hidereplay"),
            setTimeout(function() {
                e.$UILayer.removeClass("tvp_onpause")
            }
            , 100)) : (f.addClass("tvp_finished"),
            i.show()),
            c.currentIndex = 0,
            b.move(),
            b.setDataListPageInfo(),
            b.resizeNavDot(),
            j.show(),
            setTimeout(function() {
                f.find(".tvp_overlay_play").addClass("tvp_none")
            }
            , 550),
            k.show(),
            h || (d(g ? 6 : 1, c),
            h = !0)) : (b.hasReport = !1,
            c.replayClicked || (j.hide(),
            k.hide(),
            e.showPlayer(l),
            e.$UILayer || (f.removeClass("tvp_finished"),
            i.hide()))))
        },
        getList: function(c) {
            var d = b.Deferred()
              , e = f.picCgi
              , g = {
                otype: "json",
                size: c.size || 12,
                id: c.vid
            };
            return e = a.common.get_request_url("like"),
            g = c.isWechatIframe ? b.extend(g, {
                uin: 0,
                playright: 7,
                pidx: 0,
                msgtype: 175,
                tablist: 9
            }) : b.extend(g, {
                uin: 0,
                playright: 7,
                pidx: 0,
                msgtype: 174,
                tablist: 9
            }),
            "undefined" !== b.type(c.isInsertCurId) && (g.isInsertCurId = c.isInsertCurId),
            -1 === e.indexOf("?") ? -1 === e.indexOf("callback") && (e += "?callback=?") : -1 === e.indexOf("callback") && (e += "&callback=?"),
            b.ajax({
                url: e,
                data: g,
                dataType: "jsonp",
                jsonCache: 600
            }).done(function(a) {
                var e = !1
                  , f = !1;
                a && a.tablist && 1 === a.tablist.length && a.tablist[0] && a.tablist[0].media_info && a.tablist[0].media_info.length && (e = a.tablist[0].media_info,
                c.tjReportParams = a.tablist[0]),
                e ? (b.each(e, function(a, b) {
                    return c.vidArray.push(b.id),
                    !c.isWechatIframe || b.id && b.pic3url && b.title ? void 0 : (f = !0,
                    !0)
                }
                ),
                f || d.resolve(e)) : d.resolve()
            }
            ).fail(function() {
                d.resolve()
            }
            ),
            d
        },
        getAppBanner: function() {
            var a = this.op.t
              , c = b.Deferred();
            if (b.createAppBanner)
                c.resolve();
            else {
                var d = a.config.libpath + a.config.pluginUrl.AppBanner;
                b.getScript(d, function() {
                    c.resolve()
                }
                )
            }
            return c
        },
        fixUrl: function(a, b) {
            return b && (a = a.replace("${vid}", b)),
            a + "&from=" + this.op.appmsgid + "&extend=" + this.op.biz
        },
        fixVideoUrl: function() {
            var c = this
              , e = this.op
              , f = this.$links
              , h = b.extend({}, e);
            h.vid = "",
            a.app.check(h).done(function(h) {
                h && h.url && (f.each(function(a, d) {
                    var e = b(d).data("vid");
                    d.href = c.fixUrl(h.url, e),
                    b(d).attr("data-url", c.fixUrl(h.openUrl, e))
                }
                ),
                g = h.hasApp,
                g ? f.on("click", function() {
                    var a = b(this);
                    e.relatedBtn = a,
                    d(7, e)
                }
                ) : a.app.bindTryOpenAppBanner && a.app.bindTryOpenAppBanner({
                    $btn: f
                })),
                c.fixVideoUrlEvent(e)
            }
            )
        },
        fixControl: function(a) {
            var b = this.op
              , c = b.t
              , d = 5
              , e = c.control.$control
              , f = c.instance.isFullScreen && c.config.isHtml5UseFakeFullScreen
              , g = this.$relateBox;
            if (1 == a && f) {
                var h = g.css("z-index");
                e.css("z-index", h + 1),
                c.showControl()
            }
            1 !== a && e.css("z-index", d),
            2 == a && g.is("not:hidden") && c.hideControl()
        },
        fixShortVideoUrlEvent: function(c) {
            var d = this;
            c.downloader && (this.$btn.attr("data-downloadurl", c.downloadUrl),
            b.downloadClick_wechat && b.downloadClick_wechat.hasDownloader && (b.downloadClick_wechat.bindDownloader(this.$btn, "click"),
            a.app.getAppMd5(c.promotionId || 236).done(function(a) {
                a && a.md5 && d.$btn.attr("data-downloadmd5", a.md5)
            }
            )),
            b.downloadClick_mqq && b.downloadClick_mqq.hasDownloader && b.downloadClick_mqq.bindDownloader(this.$btn, "click"))
        },
        fixVideoUrlEvent: function(c) {
            var d = this
              , e = this.$links || b([]);
            c.downloader && (this.$relateBox.attr("data-downloadurl", c.downloadUrl),
            b.downloadClick_wechat && b.downloadClick_wechat.hasDownloader && (b.downloadClick_wechat.bindDownloader(this.$relateBox, "click"),
            a.app.getAppMd5(c.promotionId || 236).done(function(a) {
                a && a.md5 && d.$relateBox.attr("data-downloadmd5", a.md5)
            }
            )),
            b.downloadClick_mqq && b.downloadClick_mqq.hasDownloader && b.downloadClick_mqq.bindDownloader(this.$relateBox, "click")),
            e.on("click", function() {
                var d = b(this)
                  , e = d.attr("data-vid")
                  , f = d.attr("data-alginfo");
                a.bossReport.apprecommend_report({
                    tab_id: c.tjReportParams.tab_id,
                    oper: 2,
                    vid: e,
                    page: c.currentIndex,
                    rlist: f
                })
            }
            )
        },
        fixParams: function() {
            function a(a) {
                var d = b.getUrlParam(a, c);
                return d && (d = decodeURIComponent(d),
                d = b.filterXSS(d)),
                d
            }
            var c = window != top ? document.referrer : document.location.href
              , d = this.op;
            d.biz = a("__biz"),
            d.appmsgid = a("appmsgid")
        },
        swipeHistory: {},
        move: function(b) {
            this.setDataListPageInfo();
            var c, e = this.op, f = 0, h = e.currentIndex, i = 0, j = e.$mod.width(), k = (e.$mod.height(),
            this), l = function() {
                if (!k.swipeHistory.hasOwnProperty(f)) {
                    k.swipeHistory[f] = null ,
                    d(g ? 6 : 1, e);
                    var b = e.tjReportParams.media_info.slice(0)
                      , c = k.pageSize * f
                      , h = b.splice(c, k.pageSize)
                      , i = [];
                    a.$(h).each(function(a, b) {
                        i.push(b.alginfo)
                    }
                    ),
                    a.bossReport.apprecommend_report({
                        tab_id: e.tjReportParams.tab_id,
                        oper: 1,
                        vid: e.vid,
                        page: f,
                        rlist: i.join("+")
                    })
                }
            }
            ;
            c = Math.round(e.vidArray.length / this.pageSize) - 1,
            "left" == b && (f = h + 1),
            "right" == b && (f = h - 1),
            b || (f = h),
            0 > f || f > c || (i -= f * j,
            this.$mover.css({
                "-webkit-transform": "translateX(" + i + "px)"
            }),
            e.currentIndex = f,
            this.fixTrigger(),
            l())
        },
        setDataListPageInfo: function() {
            this.op && this.op.t && "function" === b.type(this.op.t.isFakeFullscreen) && this.op.t.isFakeFullscreen() ? (this.pageSize = 4,
            this.listInPage = 4) : (this.pageSize = 2,
            this.listInPage = 4),
            this.baseSize = 2
        },
        resizeNavDot: function() {
            if (this.op && this.op.t && "function" === b.type(this.op.t.isFakeFullscreen) && this.op.t.isFakeFullscreen()) {
                var a = parseInt(this.dataListCount / this.pageSize);
                this.$navDot.each(function(c, d) {
                    c + 1 > a ? b(d).css({
                        display: "none"
                    }) : b(d).css({
                        display: "inline-block"
                    })
                }
                )
            } else
                this.$navDot.css({
                    display: "inline-block"
                })
        },
        initShortVideoRole: function() {
            var a = f.shortVideoTpl
              , c = this.op
              , d = "\u7acb\u5373\u89c2\u770b\u66f4\u591a\u5185\u5bb9";
            c.t && c.t.config && c.t.config.shortVideoBtnTitle && (d = c.t.config.shortVideoBtnTitle,
            d && d.length > 13 && (d = d.substr(0, 13) + "..."));
            var e = b.tmpl(a)
              , g = e({
                data: {
                    title: d
                }
            });
            c.$mod.append(g),
            this.$relateBox = c.$mod.find("[data-role=relatebox]"),
            this.$replay = c.$mod.find("[data-role=replay]"),
            this.$btn = c.$mod.find('[data-role="relatebox-btn"]'),
            this.initDownloadLayer()
        },
        initRoles: function(a) {
            this.fixUI(),
            this.setDataListPageInfo();
            var c = this.op
              , d = this
              , e = c.$mod
              , g = f.tpl
              , h = "tvp_related_list tvp_related_list_v2";
            g = b.formatTpl(g, {
                relateid: c.relateid,
                listclass: h,
                iframe: window != top ? 'target="_parent"' : ""
            });
            var i, j, k = [], l = [];
            if (a && a.length) {
                j = a.slice(0),
                i = Math.round(j.length / this.baseSize),
                this.navCount = i,
                this.dataListCount = j.length;
                for (var m = 0, n = Math.round(j.length / this.listInPage) + 1; n > m; m++)
                    l = j.splice(0, this.listInPage),
                    l && l.length && k.push(l);
                var o = b.tmpl(g)
                  , p = this.isShowByLanscape(e)
                  , q = o({
                    list: k,
                    navCount: i
                });
                p && e.addClass("tvp_landscape"),
                e.append(q),
                this.$box = e.find('[data-role="relatebox"]'),
                this.$navDot = e.find('[data-role="relatetrigger"]'),
                this.resizeNavDot();
                var r = function() {
                    var a = function() {
                        var a = d.isShowByLanscape(e);
                        a ? e.addClass("tvp_landscape") : e.removeClass("tvp_landscape"),
                        c.currentIndex = 0,
                        d.move()
                    }
                    ;
                    setTimeout(function() {
                        a()
                    }
                    , 500)
                }
                  , s = window !== top && top.location.href ? top : window;
                s.addEventListener && s.addEventListener("orientationchange", r, !1);
                var t = function() {
                    d.setDataListPageInfo(),
                    d.resizeNavDot()
                }
                ;
                c.$mod.off("tvp:bullet:enterfullscreen").on("tvp:bullet:enterfullscreen", t).off("tvp:bullet:cancelfullscreen").on("tvp:bullet:cancelfullscreen", t),
                this.$relateBox = e.find("[data-role=relatebox]"),
                this.$replay = e.find("[data-role=replay]"),
                this.$links = e.find("[data-role=relatelink]"),
                this.$triggers = e.find("[data-role=relatetrigger]"),
                this.$mover = e.find("[data-role=relatemove]"),
                this.$lists = e.find(".tvp_related_list"),
                this.fixTrigger(),
                this.initDownloadLayer()
            }
        },
        initDownloadLayer: function() {
            var c = this.op.$mod
              , d = this
              , e = b.tmpl(f.downLoadLayer, {});
            c.append(e);
            var g, h = c.find("div.tvp_download_layer"), i = h.find(".tvp_dowanload_finish");
            g = c.parent().parent().find('[data-role="appfollow_btn"]'),
            g && g.length || (g = c.parent().parent().find('[data-role="appbannerlink"]')),
            g.on("tvp:appdownload:downloading", function() {
                a.log("tvp:appdownload:downloading"),
                i.addClass("tvp_none"),
                h.find(".tvp_promote_download").attr("data-status", "downloading"),
                h.show()
            }
            ).on("tvp:appdownload:complete", function() {
                a.log("tvp:appdownload:complete"),
                i.removeClass("tvp_none"),
                b.downloadClick_wechat ? b.downloadClick_wechat.bindDownloader(i.find(".tvp_btn")) : b.downloadClick_mqq && b.downloadClick_mqq.bindDownloader(i.find(".tvp_btn")),
                g.one("tvp:appdownload:afterInstall", function() {
                    a.log("tvp:appdownload:afterInstall");
                    var b = h.parent();
                    h.hide(),
                    b.append(f.installedTips),
                    b.find(".tvp_install_success").one("click", function() {
                        b.find(".tvp_install_success").remove()
                    }
                    ),
                    setTimeout(function() {
                        b.find(".tvp_install_success").remove()
                    }
                    , 3e3),
                    d.isShortVideo && d.updateFullVideoBtn(d.openUrl, d.openUrl)
                }
                ),
                h.show()
            }
            ).on("tvp:appdownload:fail", function() {
                h.hide()
            }
            ).on("tvp:appdownload:pause", function() {
                a.log("tvp:appdownload:pause"),
                h.find(".tvp_promote_download").attr("data-status", "pause")
            }
            )
        },
        fillBanner: function(a) {
            var c = this
              , d = b.extend({}, c.userop, {
                style: "none",
                isAutoReport: !1,
                reportParams: {
                    int5: 1
                },
                t: a.t,
                vid: a.vid,
                tpl: f.bannerTpl,
                modId: a.relateid
            });
            this.getAppBanner().done(function() {
                b.createAppBanner(d).done(function(a) {
                    c.AppBanner = a;
                    var b = a.$btn
                      , d = b.attr("href");
                    b.attr("href", c.fixUrl(d))
                }
                )
            }
            )
        },
        fixTrigger: function() {
            if (this.$triggers.length) {
                var a = this.op.currentIndex
                  , b = this.op;
                this.$triggers.removeClass(b.navCurrentClass).eq(a).addClass(b.navCurrentClass)
            }
        },
        initFirstEvent: function(a) {
            var c = a.t
              , d = c.$video
              , e = d[0]
              , f = !1
              , g = b.Deferred();
            return d.on("timeupdate", function() {
                e.currentTime && (a.currentTime = e.currentTime),
                !f && parseInt(c.getDuration()) - parseInt(a.currentTime) < 7 && (f = !0,
                g.resolve())
            }
            ),
            g
        },
        recommendSwipe: function() {
            var a, c, d = this, e = !1, f = 0, g = 0, h = 0, i = 0, j = this.$relateBox;
            j.off("touchstart").off("touchmove").off("touchend").on("touchstart", function(b) {
                if (e = !0,
                b && b.touches && b.touches.length) {
                    var c = b.touches[0];
                    return a = c.target,
                    f = c.pageX,
                    h = c.pageY,
                    !1
                }
            }
            ).on("touchend", function(j) {
                if (!e)
                    return !0;
                if (!(j && j.changedTouches && j.changedTouches.length))
                    return !0;
                var k = j.changedTouches[0];
                g = k.pageX,
                i = k.pageY,
                e = !1;
                var l = g - f
                  , m = i - h
                  , n = Math.abs(l)
                  , o = Math.abs(m);
                return 25 > n && 25 > o ? (setTimeout(function() {
                    if (!c) {
                        var d = b(a);
                        d && d.trigger && d.trigger("click"),
                        c = null 
                    }
                }
                , 380),
                k = j = null ,
                !1) : n > o && n > 30 && 70 > o ? (0 > l ? d.move("left") : d.move("right"),
                !1) : void 0
            }
            ).off("click.swipe").on("click.swipe", function() {
                c = !0
            }
            )
        },
        initEvent: function(c) {
            var d = c.t
              , e = this
              , f = d.$video
              , g = f[0]
              , h = this.$replay;
            h.on(c.eventType, function() {
                c.replayClicked = !0,
                setTimeout(function() {
                    c.replayClicked = !1,
                    g.play(),
                    parseInt(d.getDuration()) - parseInt(c.currentTime) < 6 && g.load(),
                    g.currentTime = c.currentTime = 0,
                    g.play()
                }
                , 500)
            }
            ),
            f.on("pause paused", function() {
                if (!d.isTouching && !e.isShortVideo) {
                    var a = parseInt(d.getDuration())
                      , f = this
                      , h = parseInt(b.os.iphone ? c.currentTime : g.currentTime);
                    return a - h > 5 ? void e.fixShow(0) : void setTimeout(function() {
                        f.paused && !e.op.t.control.isTouching && (d.config && d.config.isShortVideo || e.fixShow(1))
                    }
                    , 400)
                }
            }
            ),
            f.on("ended", function() {
                e.fixShow(1)
            }
            ),
            f.on("play playing", function() {
                e.fixShow(0)
            }
            ),
            this.recommendSwipe(),
            this.op.t.$mod.off("tvp:recommend:orientationchange").on("tvp:recommend:orientationchange", function() {
                e.move();
                try {
                    b(top).off("orientationchange.recommend")
                } catch (a) {}
            }
            );
            try {
                b(top).off("orientationchange.recommend").on("orientationchange.recommend", function() {
                    setTimeout(function() {
                        e.move()
                    }
                    , 400)
                }
                )
            } catch (i) {}
            if (this.op.t.$mod.on("tvp:recommend:showtip", function() {
                e.insertTip()
            }
            ),
            this.op.t.$mod.on("tvp:recommend:hidetip", function() {
                e.removeTip()
            }
            ),
            d.control) {
                var j = d.control.$control
                  , k = j.find(a.html5skin.elements.fullscreen);
                k.on(c.eventType, function() {
                    e.move()
                }
                )
            }
        }
    }),
    b.extend(b, {
        createAppRecommend: function(a) {
            var c = b.Deferred()
              , d = new e(a);
            return a.t && (a.t.AppRecommend = d),
            c.resolve(d),
            c
        }
    })
}
(tvp, tvp.$),
function(a, b) {
    b.extend(a.Player.fn, {
        buildAppRecommend: function(c) {
            var d = this;
            this.flashobj || a.$.browser.IEMobile || this.$videomod && (!a.app || a.app.isSupportApp) && setTimeout(function() {
                d.instance && d.instance.DurationLimitInstance && d.instance.DurationLimitInstance.enable || (c = c || {},
                c.t = d,
                c.vid = c.vid || d.curVideo.getVid(),
                b.createAppRecommend(c))
            }
            , 5e3)
        }
    })
}
(tvp, tvp.$);
/*  |xGv00|f239b546f4a01b9d2360f5fcf089eccf */