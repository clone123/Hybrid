/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 15-11-26 下午5:30
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */

define(function (require , exports , module){

                 "use strict";

                  var Tpl = require("./utils/htmlTpl.js"),
                      Tool = require("./utils/tools.js"),
                      Lazy = require("./utils/lazy.js"),
                      IS = window['IS'] = require("./utils/iscroll-zoom.js");

                  var Con = function(opt){
                               this.opts = $.extend({},opt);
                               this.conUrl = '/appsite_api/article/get_article_by_aid'; // 详情页内容和标题接口url article
                               this.raUrl = '/appsite_api/html5/get_related_article_by_aid';  // 相关文章url
                               this.comUrl = '/appsite_api/html5/get_comment_list_by_aid'; // 全部评论列表url
                               this.comSaveUrl = '/appsite_api/html5/save_comment_by_aid'; //保存评论
                               this.clickLikeUrl = '/appsite_api/html5/vote_article_by_aid';  // 点赞接口
                               this.isLoadCom = true ;
                               this.isReSub = false ; // 重复提交
                               this.log = this.opts.log && true ;
                               window['ISIS'] = new IS(this.opts.IS_Id ,{
                                           scrollbars: true,
                                           zoom: true,
                                           scrollX: true,
                                           scrollY: true,
                                           mouseWheel : true,
                                           fadeScrollbar : true ,
                                           momentum : true,
                                           useTransform : true,
                                      //     click : true,
                                           preventDefault : false
                               });
                               return this ;
                  };

                  Con.prototype = {
                         constructor:Con,
                         init : function(){
                                      var _this = this ;

                                      //alert($.cookie('token'));
                                     $.cookie('token',$.cookie('token'),{domain:location.host,path:"/"});

                                      // 图文单独及视频分享的详情页
                                      _this.getContextInfo();
                                      _this.getRelatedArticles();
                                      _this.bindEvent();

                                      return _this ;
                         },

                         bindEvent : function(){
                                   var _this = this ;
                                   document.documentElement.style.height = window.innerHeight + 'px';

                            //      alert($.cookie('token')+'-----'+document.cookie);


                                  if($('.topDown').length){ $("#wrap").css('top','40px')};

                                  // 判断IOS是否收藏
                                  if($.browser.ios && parseInt(_this.opts.collected)){
                                            $(".icon_sc").addClass('saved');
                                  };
                                  if($.browser.android && window.appInterface && window.appInterface.isCollection){
                                              var flag = window.appInterface.isCollection();
                                              if(flag){
                                                    $(".icon_sc").addClass('saved');
                                              }
                                 };
            /*                     $(document).on('tap','div.reader',function(){
                                            if($.browser.ios){
                                                   var url = $('.reader a').attr('href');
                                                   var strJson_IOS = encodeURIComponent(url);
                                                   $(document.body).append('<iframe  src="'+strJson_IOS+'/ios/reader/click" style="display:none"></iframe>');
                                                   alert(111)
                                                   return false ;
                                            };
                                 });*/

                                  // 发表评论
                                  $(".sendCom").on('tap',function(){
                                            if(_this.isReSub){ return false};
                                            var comment = $("#comment").val();
                                            if(!comment)return  Tool.fadeAlert('评论数据不能为空');
                                            if(comment.length > 300)return  Tool.fadeAlert('评论数据不能超过300字符');
                                            $("#comment").blur();
                                            $('.blank').fadeOut();
                                           _this.saveComment();
                                  });

                                  $("#comment").live('focusin',function(){
                                           $(".blank").fadeIn();
                                           $(".sendCom").addClass('red');
                                  });
                                  $("#comment").live('focusout',function(){
                                          $(".sendCom").removeClass('red');
                                  });
                                  $(".blank").on('tap',function(){
                                         $(this).fadeOut();
                                         $("#comment").blur();
                                  });

                                  // 点击写评论
                                  $(".writeCom").on('tap',function(){
                                          //    alert(JSON.stringify(_this.userInfo));
                                              if(_this.userInfo){
                                                  _this.userImg = _this.userInfo['userImg'];
                                                  _this.nickname = _this.userInfo['nickname'];
                                              }else if($.browser.ios){
                                                      $(document.body).append('<iframe src="ios/login/click" style="display:none"></iframe>');
                                                      return false ;
                                              }else if($.browser.android){
                                                  if(window.appInterface.unLogin){
                                                          window.appInterface.unLogin();
                                                          return false ;
                                                  };
                                              }else{
                                                   Tool.fadeAlert('请您先登录!');
                                                   return false ;
                                              };
                                              $(".sharTip").hide();
                                              $(".sCom").fadeToggle();

                                  });

                                     // 点击点赞
                                  $(".clickLike").on('tap',function(){
                                         _this.clickLike(this);
                                  });

                                  // 点击分享
                                  $(".share").on('tap',function(){
                                          $(".sCom").hide();
                                          $("#comment").blur();
                                          var strJson_IOS,strJson;
                                          strJson = JSON.stringify(_this.strJson);
                                          strJson_IOS = encodeURIComponent(strJson);
                                          if($.browser.ios){
                                                 $(document.body).append('<iframe  src="'+strJson_IOS+'/ios/sharTip/click" style="display:none"></iframe>');
                                          }else if($.browser.android){
                                         //     alert(strJson)
                                              if(window.appInterface.sharedNews){
                                                       window.appInterface.sharedNews(strJson);
                                              };
                                          }else{
                                               $(".jiathis_style_32x32 span").eq(0).attr('class','shar');
                                               $(".sharTip").fadeToggle();
                                          };
                                  });

                                  // 点击收藏
                                  $(".collection").on('tap',function(){
                                             _this.collectionIOS(this);
                                  });
                                  _this.bindISISEvent();
                                  document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                         },

                         bindISISEvent : function(){
                                 var _this = this ;

                                 ISIS.on('scrollStart',function(){
                                        var com =  $("#comment");
                                        if(_this.log){console.log('scrollStart----');}
                                        com.blur();

                                 });

                                 ISIS.on('scrollEnd', function (){
                                         var sTop = Math.abs(ISIS.y) ,
                                             height = $(window).height();

                                         _this.aTop = $(".relative").offset().top;
                                         if(sTop + height >= _this.aTop && !$(".com_cont").length && _this.isLoadCom){
                                                     _this.isLoadCom = false ;
                                                     _this.getComment();
                                         };
                                         ISIS.refresh();
                                         if(_this.log){console.log('scrollEnd----');}
                                 }, false);


                         },

                         bindAudioEvent :function(){
                                 $('.audio_wrp').on('tap',function(){
                                          var audio =  document.getElementById('audioV1') ;
                                          if(audio){
                                                audio.pause();
                                                $(audio).remove();
                                           };
                                           $("mpvoice").trigger('tap');

                                 });

                                 $("mpvoice").on('tap',function(){
                                         var adUrl = $(this).attr('audio-data');
                                         var str = '<audio  id="audioV1" controls="controls"  style="display:none">' +
                                                           '<source src="'+adUrl+'" type="video/mp4">'+
                                                    '</audio>';
                                         $(document.body).append(str);
                                         document.getElementById("audioV1").play();
                                         (function(ad){
                                                 var audio = $(ad)[0];
                                                 audio.loop = false ;
                                                 audio.addEventListener('ended', function () {
                                                           $('#audioV1').remove();
                                                 }, false);
                                         })(str);
                                 });

                                /* $("video").unbind().on('click',function(){
                                         var _this = this ,obj =  $(_this), src = obj.attr('dataSrc');
                                         if(!obj.find('source').length){
                                                obj.append('<source src="'+src+'" type="video/mp4">');
                                                setTimeout(function(){
                                                      $(_this)[0].play();
                                                },500);
                                         };
                                 });*/

                               /*  $("video.videoCls").unbind().on('click',function(){
                                             $(this)[0].play();
                                 });*/



                         },

                         bindVideoRelatedArticleEvent : function(){
                                      var _this = this ;
                                      $("div.rel_img,div.rel_detail").unbind().live('click',function(){
                                                  var obj = $(this),key = obj.parent().attr('key'),strJson,strJson_IOS,
                                                      data = _this.article_list[key]  ;
                                                  strJson = JSON.stringify(data);
                                                  strJson_IOS = encodeURIComponent(strJson);
                                                  if($.browser.ios){
                                                         $(document.body).append('<iframe src="'+strJson_IOS+'/ios/clickVideo/click" style="display:none"></iframe>');
                                                  }else if($.browser.android){
                                                      if(window.appInterface.clickVideo){
                                                             window.appInterface.clickVideo(strJson);
                                                      };
                                                  };
                                      })
                         },

                         collectionIOS : function(obj){
                                 var _this  = this , span = $(obj).find('span');
                                 if(!span.hasClass('saved')){
                                         span.addClass('saved');
                                         var strJson_IOS,strJson;
                                         strJson = JSON.stringify(_this.strJson);
                                         strJson_IOS = encodeURIComponent(strJson);
                                         if($.browser.ios){
                                             $(document.body).append('<iframe src="'+strJson_IOS+'/ios/test/click" style="display:none"></iframe>');
                                         }else if($.browser.android){
                                             if(window.appInterface.collectionArticle){
                                                   window.appInterface.collectionArticle(strJson);
                                             };
                                         };
                                         $(".scTxt").text('收藏成功');
                                         $(".scMask").fadeIn(1500,function(){$(this).fadeOut();});
                                 }else if(span.hasClass('saved')){
                                         span.removeClass('saved');
                                         if($.browser.ios){
                                             $(document.body).append('<iframe src="ios/cancel/click" style="display:none"></iframe>');
                                         }else if($.browser.android){
                                             if(window.appInterface.cancelcollection){
                                                 window.appInterface.cancelcollection();
                                             };
                                         };
                                         $(".scTxt").text('取消收藏');
                                         $(".scMask").fadeIn(1500,function(){$(this).fadeOut();});
                                 };
                         },

                         clickLike : function(obj){
                               var _this  = this , span = $(obj).find('span');
                               if(!span.hasClass('clike')){
                                       span.addClass('clike');
                                       _this.setClickLike();
                               };
                         },

                         setClickLike : function(){
                              var _this = this ;
                              $.ajax({
                                   url:_this.clickLikeUrl,
                                   type:'post',
                                   data:{aid:_this.opts.aid},
                                   success:function(rel){
                                       if(!rel){ return false ;}
                                       var msg = JSON.parse(rel);
                                       if(msg['result']['code'] == 0)  {
                                           Tool.alert(msg['result']['message']);
                                           return false ;
                                       }else{
                                           $("#clickNum").text(Number($("#clickNum").text()) + 1);
                                           return false ;
                                       }
                                   },error:function(e){Tool.alert('请求链接失败，请检测网络!')}
                              });
                         },


                         // 详情页内容和标题
                         getContextInfo : function(){
                                var _this = this ;
                                $.ajax({
                                        url:_this.conUrl+'?aid='+_this.opts.aid,
                                        type:'get',
                                        data:[],
                                        success:function(rel){
                                             if(!rel){ return false ;}
                                             var msg = JSON.parse(rel);
                                             $('.load_div').hide();
                                             if(msg['result']['code'] == 0){
                                                   Tool.alert(msg['result']['message']);
                                                   return false ;
                                             };
                                             if(_this.log){console.log(msg);}
                                             _this.userInfo = msg['result']['userinfo'] || '';
                                             _this.artInfo = msg.article_info ;
                                             _this.strJson = {
                                                        shareArticle : _this.artInfo['shareUrl'] || '',
                                                        aid : _this.artInfo['aid'] || '',
                                                        typeid : _this.artInfo['category_id'] || '',
                                                        title : _this.artInfo['title'] || '',
                                                        desc : _this.artInfo['description'] || '',
                                                        imgurl : _this.artInfo['imgurl'] || '',
                                                        new_source : _this.artInfo['new_source'] || '',
                                                        readNum : _this.artInfo['readNum'] || '',
                                                        nickname :_this.artInfo['nickname'] || '',
                                                        weixin : _this.artInfo['weixin'] || '',
                                                        videourls : _this.artInfo['videourls'] || '',
                                                        videoCovers  : _this.artInfo['videoCovers '] || ''
                                             };
                                             $("#clickNum").text(_this.artInfo['voteNum']);

                                             document.title =  _this.artInfo['title'];
                                             // 处理微信里面二次分享图标显示问题
                                             if(location.href.indexOf('page=shareArticle')>-1){
                                                   $('div:first').before('<img src="'+_this.artInfo['imgurl']+'" style="display:none">')
                                             };
                                             var rn = (_this.artInfo['readNum'] || 0) - 0 + 1 ;
                                             if($.browser.android){
                                                    if(window.appInterface && window.appInterface.addReadNum){
                                                        window.appInterface.addReadNum(rn);
                                                    };
                                             }else if($.browser.ios){
                                                  $(document.body).append('<iframe src="'+rn+'/ios/readNum/click" style="display:none"></iframe>');
                                             };

                                            var dNum = 0;
                                            msg.article_info['content'] = msg.article_info['content'].replace(/<img [^>]*>/g ,function(s1,s2){
                                                          dNum += 1 ;
                                                          var strImg = s1.replace(/>/,' data-index='+(dNum-1)+'>');
                                                          return strImg ;
                                             });

                                             //  视频详情页
                                             if(location.href.indexOf('page=contentVideo')>0){
                                                         var  cc =  msg.article_info['content'].replace(/<iframe(.+)<\/iframe>/g ,'');
                                                         $('.main_txt').html(cc);
                                                         // 处理图片懒加载
                                                         Lazy.lazyload({
                                                                 id : '.main_txt',
                                                                 tag : 'img',
                                                                 event : 'scrollEnd'
                                                         });
                                             }else{
                                                     Tpl.getTplToHtml({
                                                             id:'.header',
                                                             sTpl:'#headerTpl',
                                                             data:msg.article_info
                                                     },function(){
                                                         var cc = msg.article_info['content']; //msg.article_info['content'].replace(/!important/g,'');
                                                         // 视频详情页
                                                         if(_this.artInfo['isVideo'] == 1){
                                                             if(_this.log){console.log(cc)};
                                                             cc = cc.replace(/<iframe(.+)<\/iframe>/g , function($1){
                                                                         var  src = $1.match(/(http:\/\/.+\.mp4)/g);
                                                                 //poster="/statics/images/play90.jpg"
                                                                 return  '<video  style="width:100%;" webkit-playsinline x-webkit-airplay  class="video-js"  controls>' +
                                                                                     '<source src="'+src[0]+'" type="video/mp4">' +
                                                                          '</video>';
                                                             });
                                                         }else{
                                                             cc = cc.replace(/src/g,'lazySrc'); // 因抓取数据没办法修改，强制自动替换为后面做图片懒加载做准备
                                                         };
                                                         $('.main_txt').html(cc);

                                                         // 详情页视频播放
                                                         if(_this.artInfo['isVideo'] == 1){
                                                                 var sArr =  $(".main_txt section");
                                                                 for(var st = 0,sL = sArr.length;st<sL;st++){
                                                                     if(!$(sArr[st]).find('video').length){$(sArr[st]).hide()}
                                                                 };
                                                                 var vArr = $("video"),vLen = vArr.length;
                                                                 for(var ii=0;ii<vLen;ii++){
                                                                         var vdo = vArr[ii];
                                                                         if(!vdo) return false ;
                                                                         videojs(vdo,{},function(){
                                                                             console.log('视频加载成功。。。');
                                                                         }); //videojs
                                                                 };
                                                         };
                                                         // 处理图片懒加载
                                                         Lazy.lazyload({
                                                                 id : '.main_txt',
                                                                 tag : 'img',
                                                                 event : 'scrollEnd'
                                                         });
                                                     });
                                             };
                                             setTimeout(function(){
                                                     if(_this.artInfo['msg_source_url']){
                                                             $("div.reader").show();
                                                             $("div.reader a").attr('href',_this.artInfo['msg_source_url']);
                                                     }else{
                                                          $("div.reader").hide();
                                                     };
                                             },2000);

                                        },error:function(e){Tool.alert('请求链接失败，请检测网络!')}
                                 });
                         },

                        // 相关文章
                         getRelatedArticles : function(){
                                var _this = this ;
                                $.ajax({
                                         url:_this.raUrl+'?aid='+_this.opts.aid,
                                         type:'get',
                                         data:[],
                                         success:function(rel){
                                                 if(!rel){ return false ;}
                                                 var msg = JSON.parse(rel);
                                                 if(msg['result']['code'] == 0)  return false ;
                                                 if(_this.log){console.log(msg);}
                                                 _this.article_list = msg['article_list'];
                                                 if(location.href.indexOf('page=contentVideo')>0){ var sTpl = '#relativeTpl_video';}else{ var sTpl = '#relativeTpl';};
                                                 Tpl.getTplToHtml({
                                                         id:'.relative',
                                                         sTpl:sTpl,
                                                         data:msg
                                                 },function(){
                                                        _this.aTop = $(".relative").offset().top;
                                                        if(_this.aTop < $(window).height()){
                                                                _this.getComment();
                                                        };
                                                       if(location.href.indexOf('page=contentVideo')>0){_this.bindVideoRelatedArticleEvent()};
                                                 });
                                         },error:function(e){Tool.alert('请求链接失败，请检测网络!')}
                                 });
                         },

                         // 全部评论
                         getComment : function(){
                                 var _this = this ;
                                 $(".com_cont").remove();
                                 $.ajax({
                                         url:_this.comUrl+'?aid='+_this.opts.aid,
                                         type:'get',
                                         data:[],
                                         success:function(rel){
                                                 if(!rel){ return false ;}
                                                 var msg = JSON.parse(rel);
                                                 if(msg['result']['code'] == 0)  return false ;
                                                 if(_this.log){console.log(msg);}
                                                 if(msg['result']['code'] ==0) return false ;
                                                 Tpl.getTplToHtml({
                                                         id:'.comment h2',
                                                         sTpl:'#commentTpl',
                                                         aType:1,
                                                         data:msg
                                                 },function(){
                                                       $('.comment,.com_title').show();
                                                 });
                                         },error:function(e){Tool.alert('请求链接失败，请检测网络!')}
                                 });
                         },


                          // 发表评论
                          saveComment : function(){
                                  var _this = this , dt , time = new Date(),
                                      cLen = $('.com_cont').length ,
                                      d = time.getDate(),
                                      ms = time.getMonth()+ 1,
                                      ms = (ms < 10 ? '0'+ms : ms) ,
                                      sT = ms +'-'+(d <10 ? '0'+d : d ),
                                      comV = $("#comment").val();

                                  dt = {
                                          content:comV,
                                          aid:_this.opts.aid
                                  };
                                  _this.isReSub = true ;
                                  if(cLen){
                                      Tpl.getTplToHtml({
                                              id:'.comment h2',
                                              sTpl:'#commentTpl',
                                              aType:1,
                                              num:1,
                                              data:{comment_list:[{content:comV,createtime:sT,headpath:_this.userImg,nickname:_this.nickname}]}
                                      });
                                  };
                                  $.ajax({
                                          url:_this.comSaveUrl,
                                          type:'post',
                                          data:dt,
                                          success:function(rel){
                                                  _this.isReSub = false ;
                                                  if(!rel){ return false ;}
                                                  var msg = JSON.parse(rel);
                                                  if(msg['result']['code'] == 0)  return false ;
                                                  if(_this.log){console.log(msg);}
                                                  $("#comment").val(null);
                                                  Tool.fadeAlert('发表成功!');
                                                  setTimeout(function(){
                                                      if(!cLen){ _this.getComment();};
                                                  },500);

                                          },error:function(e){Tool.alert('请求链接失败，请检测网络!')}
                                  });

                          }
                  };


                  module.exports = function(opt){
                             return  new Con(opt).init();
                  }({
                      aid : Tool.queryUrl('aid'),
                      collected : Tool.queryUrl('collected'),
                      IS_Id : '#wrap',
                      log : Tool.queryUrl('log')
                  });
});

