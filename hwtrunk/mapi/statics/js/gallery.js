/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 16-3-6 下午2:29
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */

define(function(require , exoprts , module){
            "use strict";

             var PSUI = require('./utils/photoswipe-ui-default.js'),
                 PS  = require('./utils/photoswipe.js');

             var ImgPS = window['ImgPS'] = {
                                     init : function(){
                                                   var _t = this ;

                                                   if($.browser.android){
                                                               if(window.appInterface && window.appInterface.appVersion){
                                                                      var version = window.appInterface.appVersion();
                                                                      if(parseFloat(version)<2){ $("#save").hide();};
                                                               }else{
                                                                    $("#save").hide();
                                                               };
                                                   }else if($.browser.ios){
                                                             if(window.checkIOS_Version){
                                                                     var d =  window.checkIOS_Version();
                                                                     var dArr = d && d.split('*'),version = dArr[1];
                                                                     if(parseFloat(version)<2){ $("#save").hide();};
                                                             }else{
                                                                  $("#save").hide();
                                                             };
                                                   };

                                                   _t.bindEvent();

                                                   return this ;
                                     },

                                   /*  checkIOS_Version : function(data){
                                             var d = data ,
                                                 version = d.version;
                                         //    alert('pcode--'+ d.pcode+'====version----'+ d.version);
                                            if(parseFloat(version)<2){ $("#save").hide();};
                                     },*/

                                     bindEvent : function(){
                                                var _this = this ;
                                                $(document).on("tap", ".main_txt img", function(e) {
                                                            var  pswp = $("#photoImg"),imgObj = this ,
                                                                 index = $(imgObj).attr("data-index") - 0;

                                                            ISIS.refresh();
                                                            if(pswp.attr('aria-hidden')=='false') return false ;

                                                             $.when().done(function(){
                                                                    _this.getMainImg();
                                                            }).then(function(){
                                                                 //   alert(JSON.stringify(window['imgItems'][index]));
                                                                   var p = new PS(pswp[0], PSUI, window['imgItems'], {
                                                                                        index:index ,
                                                                                        showHideOpacity:true
                                                                   });
                                                                   p.init();
                                                                   ISIS.refresh();
                                                            });
                                                });

                                               $(".pswp__container").on('tap',function(){
                                                         $(".pswp__button--close").click();
                                                         setTimeout(function(){
                                                                ISIS.refresh();
                                                         },1500)
                                               });

                                                $("#save").on('tap',function(){
                                                       var n = $('.pswp__counter').html().split('/')[0] - 0,
                                                           url = JSON.stringify(window['imgItems'][n-1]['src']),
                                                           url_IOS = encodeURIComponent(url);
                                                        if($.browser.android){
                                                            if(window.appInterface && window.appInterface.downloadImg){
                                                                   window.appInterface.downloadImg(url);
                                                            };
                                                        }else if($.browser.ios){
                                                            $(document.body).append('<iframe src="'+url_IOS+'/ios/downloadImg/click" style="display:none"></iframe>');
                                                        };
                                                });

                                     },
                                     getMainImg : function(){
                                             var imgArr = $(".main_txt img"),len, i,imgItems = [];
                                             for(i= 0,len = imgArr.length;i<len;i++){
                                                     var img = $(imgArr[i]),width = img.width() , height = img.height();
                                                     if(!img.attr('data-index')) continue;
                                                     var inx = img.attr('data-index') - 0 ;
                                                     if($.browser.ios){
                                                             if(width > height){
                                                                   width = width * 1.77;
                                                                   height = height * 1.77;
                                                             }else if(height > window.screen.height * 0.7){
                                                                     width = window.screen.width;
                                                                     height = window.screen.width * 1.77;
                                                             };
                                                     };
                                                     imgItems[inx] = {
                                                         src : img.attr('lazysrc'),
                                                         w: width || window.screen.width ,
                                                         h: height || window.screen.width * 1.77
                                                     };
                                         };
                                         window['imgItems'] = imgItems ;
                                   }
             };

             module.exports = function(imgPS){
                        return  imgPS.init();
             }(ImgPS);
});