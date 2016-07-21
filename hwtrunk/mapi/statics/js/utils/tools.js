/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 15-11-30 下午2:13
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */
define(function (require , exports , module) {

            "use strict";

             var  Diadlog = require('./dialog.js');
             var  Tool = {
                        queryUrl : function(key){
                                var json = {};
                                var url = location.href.replace(/^[^?=]*\?/ig,'').split('#')[0];	//去除网址与hash信息

                                url.replace(/(^|&)([^&=]+)=([^&]*)/g, function (a, b, key , value){
                                            try {
                                                key = decodeURIComponent(key);
                                            } catch(e) {};

                                            try {
                                                value = decodeURIComponent(value);
                                            } catch(e) {};

                                            if (!(key in json)) {
                                                json[key] = /\[\]$/.test(key) ? [value] : value;
                                            }else if (json[key] instanceof Array) {
                                                json[key].push(value);
                                            }else {
                                                json[key] = [json[key], value];
                                            };
                                });
                                return key ? json[key] : json;
                        },
                        fadeAlert : function(msg){
                                 var str = '<div class="alert psa clearfix" style="display:none;">'+
                                                      '<span class="alertOk dsb"></span>'+
                                                  '<span class="scTxt dsb alertMsg">'+msg+'</span>'+
                                            '</div>';
                                  $(document.body).append(str);
                                  $(".alert").fadeIn(3000,function(){
                                           var _this = this ;
                                           setTimeout(function(){
                                                  $(_this).remove();
                                           },1000);
                                  });
                        },
                        confirm : function(msg,fn,fn2){
                                Diadlog({
                                         className : "layerWap layerB",
                                         content: "<p class='alignCenter'>"+msg+"</p>",
                                         confirmBtn: true,
                                         repealBtn: true,
                                         repealTip: "确定",
                                         confirmTip: "取消",
                                         confirmCallBack:fn2 || function(e){$(e).fadeOut()},
                                         repealCallBack: fn
                                 });
                         },
                        alert : function(opt,fn){
                                 Diadlog({
                                         className : "layerWap layerA",
                                         content: "<p class='alignCenter'>"+opt+"</p>",
                                         confirmBtn: true,
                                         confirmTip: "确定",
                                         confirmCallBack : fn
                                 });
                        },
                        imgAuto : function(opts){
                                 var _this = this  ;
                                 _this.opts = $.extend({},opts);
                                 _this.imgList  = $(_this.opts.cls).find(_this.opts.type);
                                 _this._width = window.innerWidth;
                                 for( var i = 0, len = _this.imgList.length; i < len; i++){
                                         _this.createImage(_this.imgList[i],_this._width);
                                         try{ ISIS && ISIS.refresh();}catch (e){};
                                 };
                         },
                        createImage : function(imgObj , _width){
                                 var dw =  $(imgObj).attr('data-w') ;
                                 if((imgObj.width > 30 && imgObj.height > 30) || dw > 100 ){
                                         console.log('w:'+imgObj.width+'----h:'+imgObj.height+'----s:'+_width);
                                         if(imgObj.width > _width/2 || dw){
                                               imgObj.onload = function(imgObj){
                                                           var mo = $(imgObj),
                                                               srcNew = mo.attr('data-src') ||  mo.attr('src') ;
                                                           mo.attr({
                                                                   style : 'margin:0 auto;display:block;width:100%',
                                                                   src : srcNew
                                                           });
                                               }(imgObj,_width);
                                         }
                                 };
                        },
                        videoAuto : function(opts){
                                var _this = this ,ifmArr = $(opts.cls);
                                if(!ifmArr.length) return false ;
                                for(var i= 0,iLen = ifmArr.length;i<iLen;i++){
                                        var ifm = $(ifmArr[i]) ,
                                            vSrc = ifm.attr('src') || ifm.attr('original'),
                                            left = ifm.offset().left,
                                            vArr = vSrc.split('&'); //https://v.qq.com/iframe/player.html?vid=p01757mnzkp&width=670&height=502.5&auto=0
                                        ifm.hide();
                                        _this.width = window.innerWidth - left * 2;
                                        _this.heigth = _this.width / 1.3 ;
                                        vSrc = vArr[0] + '&width='+_this.width+'&height='+_this.heigth+'&auto=0';
                                        ifm.attr({
                                            src : '',
                                            width : _this.width,
                                            heigth : _this.heigth
                                        }).hide();

                                        var  videoStr = '<video  controls="controls"  name="media">' +
                                                        '<source src="'+vArr[0]+'" type="video/mp4">' +
                                                        '</video>';
                                        ifm.after(videoStr);
                                        try{ ISIS && ISIS.refresh();}catch (e){};
                                };
                         },
                        eventIOS_Android : function(ios_fn , ad_fn){
                             if($.browser.ios){
                                     ios_fn.call(this);
                             }else if($.browser.android){
                                     ad_fn.call(this);
                             };
                        }
            };

           module.exports = Tool ;
});