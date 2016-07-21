/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 16-1-28 上午11:44
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */
/**
 * author: wangjingyi@bytedance.com
 * date:   2015-9-22
 * 说明：  前端只需要配置一个占位符和一段脚本引用：
 * <div class="tt-video-box" tt-videoid="12C237E0C3F6470689B075FB1C52B176" tt-poster="../xx.jpg">视频加载中...</div>
 * <script src="tt.player.js"></script>
 * 1.div的class必须是固定的 tt-video-box
 * 2.tt-videoid属性名必须固定 对应播放视频ID
 * 3.tt-poster属性名固定, 对应海报图的url
 * 4.引用的时候注意要将占位符div置于script脚本之前,script脚本尽量放在</body>结束标签前,避免脚本找不到占位符的div导致视频不能正常播放。
 * 5.注意同一页面多个视频播放的时候，只需要配置多个div和一段script
 * 20150609 : fix 视频海报图覆盖问题，视频播放乱序问题
 * 20150611 : add ie8 poster海报图添加.jpg后缀
 * 20150614 : fix ie8下html5media加载时序，保证所有video生成后正常转为flash播放
 *            ie8下单视频多视频兼容，缺陷：转为flash需要时间，待再优化
 * 20150809 : fix 脚本只能加载一次添加标示位tt-datainited ：containers[i].setAttribute('tt-datainited',1);
 * 20150817 : h5正常播放统计事件添加
 * 20150922 : tt-autoplay =“true” 审核后台自动播放添加
 * 20151016 : 保留原有container样式
 * 20151109 : 添加审核后台播放异常显示处理
 * 20151117 : ios系统下，video标签添加webkit-playsinline特性，保证UIWebView播放视屏默认不全屏
 * 20151127 : 添加头条号播放异常显示处理
 * 20151208 : 发布视频请求成功或失败事件
 **/
;( function( window ) {
    'use strict';
    //下面是64个基本的编码
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var base64DecodeChars = new Array(
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
//编码的方法
    function base64encode(str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while(i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if(i == len)
            {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if(i == len)
            {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }

//解码的方法
    function base64decode(str) {
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while(i < len) {

            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while(i < len && c1 == -1);
            if(c1 == -1)
                break;

            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while(i < len && c2 == -1);
            if(c2 == -1)
                break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if(c3 == 61)
                    return out;
                c3 = base64DecodeChars[c3];
            } while(i < len && c3 == -1);
            if(c3 == -1)
                break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if(c4 == 61)
                    return out;
                c4 = base64DecodeChars[c4];
            } while(i < len && c4 == -1);
            if(c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    }

    function utf16to8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for(i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            }
        }
        return out;
    }

    function utf8to16(str) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = str.length;
        i = 0;
        while(i < len) {
            c = str.charCodeAt(i++);
            switch(c >> 4)
            {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += str.charAt(i-1);
                break;
                case 12: case 13:
                // 110x xxxx   10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    }

//Array.prototype.indexOf()方法是在ES5规范中添加的，在IE9及以下浏览器不支持
    function indexOf(array,item){
        for(var i=0;i< array.length;i++) {
            if (array[i] == item) {
                return i;
            }
        }
        return -1;
    }

    function createScript(scr, url, charset) {
        scr.setAttribute('type', 'text/javascript');
        charset && scr.setAttribute('charset', charset);
        scr.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(scr);
    }

    function isFunction(source) {
        return '[object Function]' == Object.prototype.toString.call(source);
    }

    function jsonp(url, callback, opt_options) {
        var scr = document.createElement('SCRIPT'),
            prefix = 'tt__video__',
            callbackName,
            options = opt_options || {},
            charset = options['charset'],
            queryField = 'callback',
            timeOut = options['timeOut'] || 0,
            timer;

        if (isFunction(callback)) {
            callbackName = prefix + Math.floor(Math.random() * 2147483648).toString(36);
            window[callbackName] = getCallBack(0);
        }

        if( timeOut ){
            timer = setTimeout(getCallBack(1), timeOut);
        }

        //auto add callback=***
        url += (url.indexOf('?') < 0 ? '?' : '&') + queryField + '=' + callbackName;

        createScript(scr, url, charset);

        function getCallBack(onTimeOut){
            return function() {
                try {
                    if ( onTimeOut ) {
                        options.onfailure && options.onfailure();
                    } else {
                        callback.apply(window, arguments);
                        clearTimeout(timer);
                    }
                    window[callbackName] = null;
                    delete window[callbackName];
                } catch (exception) {
                } finally {
                }
            }
        }
    }

//获取视窗宽度
    function getViewWidth(){
        var doc = document,
            client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

        return client.offsetWidth;
    }

    function data2video() {
        //TODO: class must be tt-video-box
        var containers = document.querySelectorAll('.tt-video-box');
        //getElementsByClassName不支持ie8

        var j = 0;
        var containerArr = [];

        for (var i = 0; i < containers.length; i++) {
            //TODO: attribute must be tt-videoid
            var id = containers[i].getAttribute('tt-videoid') || '';

            var posterUrl = containers[i].getAttribute('tt-poster') || '';

            containerArr.push({
                box: containers[i],
                id: id,
                url: posterUrl
            });

            var dj = 0;

            if(containers[i].getAttribute('tt-datainited') == null) {
                containers[i].setAttribute('tt-datainited',1);
                var urlstr = 'http://i.snssdk.com/video/urls/1/toutiao/mp4/'+ id;
                jsonp(urlstr,function (result) {
                    var status = result.data.status;
                    // 正常播放的情况：code=0&status=10
                    if (result.code == 0 && status == 10){
                        var obj = result.data.video_list;
                        var arr = obj.video_1;
                        var originUrl = arr.main_url;
                        var decodeUrl = base64decode(originUrl);
                        var offsetWidth = getViewWidth();
                        if(offsetWidth >640){
                            offsetWidth = 640;
                        }
                        var v_ratio = 9/16;
                        j++;

                        //判断ie8浏览器特殊处理poster
                        var ua = navigator.userAgent.toLowerCase();
                        var ieVersion = ua.match(/msie ([\d.]+)/);

                        //fix bug here
                        for (var w = 0; w < containerArr.length; w++) {
                            if (result.data.video_id && containerArr[w].id == result.data.video_id) {

                                //手机不设置高宽
                                var uselessness='iphone|ipad|android';
                                var template = '<video src="' + decodeUrl + '" type="video/mp4" controls="" poster="' + containerArr[w].url + '" preload="none" style="width:100%;"></video>';

                                if(/iphone|ipad/i.test(navigator.userAgent)){
                                    template = '<video src="' + decodeUrl + '" type="video/mp4" controls="" poster="' + containerArr[w].url + '" preload="none" webkit-playsinline style="width:100%;"></video>';
                                    containerArr[w].box.style.cssText += 'margin:0 auto;';

                                } else if (/Android/i.test(navigator.userAgent)){
                                    template = '<video src="' + decodeUrl + '" type="video/mp4" controls="" poster="' + containerArr[w].url + '" preload="none" style="width:100%;"></video>';
                                    containerArr[w].box.style.cssText += 'margin:0 auto;';
                                } else if (ieVersion && ieVersion.length > 1){
                                    if (ieVersion[1] == '8.0'){
                                        template = '<video src="' + decodeUrl + '" type="video/mp4" controls="" poster="' + containerArr[w].url + '.jpg" preload="none" style="width:100%;height:100%;"></video>';
                                        containerArr[w].box.style.cssText += 'width:'+ offsetWidth +'px;height:'+ offsetWidth*v_ratio+'px;margin:0 auto;background-color:#000';
                                    }
                                    // pc端新审核后台添加自动播放判断
                                } else {
                                    if(containerArr[w].box.getAttribute('tt-autoplay') == "true" && location.hostname == "admin.bytedance.com"){
                                        template = '<video src="' + decodeUrl + '" type="video/mp4" controls="" poster="' + containerArr[w].url + '" preload="none" autoplay="autoplay" style="width:100%;height:100%;"></video>';
                                    } else {
                                        template = '<video src="' + decodeUrl + '" type="video/mp4" controls="" poster="' + containerArr[w].url + '" preload="none" style="width:100%;height:100%;"></video>';
                                    }
                                    containerArr[w].box.style.cssText += 'width:'+ offsetWidth +'px;height:'+ offsetWidth*v_ratio+'px;margin:0 auto;background-color:#000';
                                }

                                containerArr[w].box.innerHTML = template;
                                // 发布视频请求成功事件
                                window.listener && listener.trigger("com.toutiao.m.videoContent","video-loaded-successed");
                                if (location.hostname != "admin.bytedance.com"){
                                    insertLog();
                                }
                                // ie8特殊处理写入video标签用于转flash播放
                                if (ieVersion && ieVersion.length > 1) {
                                    if (ieVersion[1] == '8.0'){
                                        var videoEle = document.createElement('video');
                                        videoEle.setAttribute('src', decodeUrl);
                                        videoEle.setAttribute('type', 'video/mp4');
                                        videoEle.setAttribute('controls', '');
                                        videoEle.setAttribute('poster', containerArr[w].url + '.jpg');
                                        videoEle.setAttribute('preload', 'none');
                                        videoEle.style.cssText += 'width:100%;height:100%;';

                                        containerArr[w].box.innerHTML = '';
                                        containerArr[w].box.appendChild(videoEle);
                                        //当前jsonp回调的视频匹配成功
                                        dj++;
                                        if (dj == containerArr.length) {
                                            hackVideo();
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        // pc端添加后台播放异常显示处理
                        for (var w = 0; w < containerArr.length; w++) {

                            if((location.hostname == "admin.bytedance.com" || location.hostname == "mp.toutiao.com") && status != 10){
                                var statusObj = {
                                    '20':'转码失败',
                                    '30':'转码进行中',
                                    '40':'视频id不存在',
                                    '0':'unknown',
                                    '1':'上传中',
                                    '2':'上传失败',
                                    '3':'等待上传',
                                    '101':'视频被屏蔽',
                                    '102':'视频被删除',
                                    '103':'视频永久删除'
                                };
                                var statusDesc = '';
                                for (var key in statusObj){
                                    if ( key == status){
                                        statusDesc = statusObj[key];
                                    }
                                }
                                template ='<span style="display: inline-block;height: 360px;width: 100%;line-height: 360px;background-color: rgba(0, 0, 0,0.9);color: #fff;">'+ result.message + '：' + statusDesc +'</span>';
                            }
                            containerArr[w].box.innerHTML = template;
                            // 发布视频请求失败事件
                            window.listener && listener.trigger("com.toutiao.m.videoContent","video-loaded-failed");
                            containerArr[w].box.style.cssText+= 'margin: 0px auto;height: 360px;width: 640px;text-align: center;';
                            if (location.hostname != "admin.bytedance.com"){
                                insertLog();
                            }
                        }
                    }
                });
            }
        }
    }
    data2video();

    function hackVideo () {
        var hm = document.createElement("script");
        hm.src = "http://s0.pstatp.com/html5media1.1.8/html5media.min.js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    }

    function insertLog() {
        var hm = document.createElement("script");
        hm.src = "http://s0.pstatp.com/tt_player/tt.player.log.js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    }

})( window );