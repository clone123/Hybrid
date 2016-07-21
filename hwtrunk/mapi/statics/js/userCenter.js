/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 15-11-27 下午1:54
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */
define(function (require , exports , module) {
              "use strict";
              var Tpl = require("./utils/htmlTpl.js"),
                  Tool = window['Tool'] = require("./utils/tools.js"),
                  IS = window['IS'] = require("./utils/is.js");

               var  U = function(opt){
                            this.opts = $.extend({},opt);
                            this.userUrl = '/appsite_api/html5/get_weixin_info'; // 用户信息接口url
                            this.raUrl = '/appsite_api/html5/get_weixin_article_list';  // 相关文章url
                            this.followUrl = '/appsite_api/follow/follow_weixin' ;     // 关注接口url
                            this.isReSub = false ;  // 是否重复提交;
                            this.isClose = true ;
                            this.page = 1 ;
                            window['ISIS'] = new IS(this.opts.IS_Id ,{
                                        scrollbars: true,
                                        mouseWheel: true,
                                        fadeScrollbar : true ,
                                        momentum : true,
                                        useTransform : true,
                                //      click : true,
                                        preventDefault : false
                            });
                            return this ;
               };

               U.prototype = {
                       constructor : U,

                       init : function(){
                                 var _this = this ;
                                 _this.getPNInfo();
                                 _this.getPN_RelatedArticles(0);
                                 _this.bindEvent();
                                 return _this;
                       },

                      bindEvent : function(){
                                  var _this = this ;

                               /*   Tool.alert('follow-哈哈艾丝凡粉色的--------'+Tool.queryUrl('follow'),function(){
                                            console.log(11111111)
                                  });*/



                                  if(Tool.queryUrl('follow')){ _this.setFollow();};


                                  // 点击关注
                                  $(".attention").live('click',function(){
                                          //    alert(JSON.stringify(_this.userInfo));
                                              if(_this.isReSub){ return false;};
                                              _this.isReSub = true ;
                                              setTimeout(function(){
                                                    _this.isReSub = false ;
                                              },1500);
                                              if(_this.userInfo){
                                                  _this.userImg = _this.userInfo['userImg'];
                                                  _this.nickname = _this.userInfo['nickname'];
                                                  _this.setFollow();
                                              }else if($.browser.ios){
                                                  $(document.body).append('<iframe src="ios/loginUC/click" style="display:none"></iframe>');
                                                  return false ;
                                              }else if($.browser.android){
                                                  if(window.appInterface.unLogin){
                                                          window.appInterface.unLogin();
                                                          return false ;
                                                  };
                                              }else{
                                                  Tool.alert('请您先登录!');
                                                  return false ;
                                              };
                                  });


                                  ISIS.on('scrollEnd', function (){
                                          _this.getPN_RelatedArticles(2);
                                          console.log('scrollEnd----');
                                  }, false);

                                  document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

                      },


                      setFollow : function(){
                              var _this = this ;
                              $.ajax({
                                     url:_this.followUrl,
                                     type:'post',
                                     data :{weixin:_this.opts.weixin},
                                     success : function(rel){
                                         if(!rel) return false ;
                                         var msg = JSON.parse(rel);
                                      //   alert(JSON.stringify(msg));
                                         if(msg['result']['code'] == 0)  {
                                             console.log(msg['result']['message']+'-----'+_this.followUrl);
                                             return false ;
                                         }else if(msg['action']['action'] == 'addfollow'){
                                              $("#followWX").html('已关注');
                                         }else{
                                              $("#followWX").html('关注');
                                         };
                                         console.log(msg['action']['message']);
                                     },error:function(e){ Tool.alert('请求链接失败，请检测网络!')}
                              });
                      },

                       // 用户信息
                       getPNInfo : function(){
                               var _this  = this ;
                        //       alert('newSource----'+Tool.queryUrl('newSource'));
                               $.ajax({
                                     url:_this.userUrl+'?weixin='+_this.opts.weixin+'&newSource='+_this.opts.newsource,
                                     type:'get',
                                     data:[],
                                     success : function(rel){
                                         if(!rel) return false ;
                                         var msg = JSON.parse(rel);
                                         if(msg['result']['code'] == 0)  {
                                                 Tool.alert(msg['result']['message']);
                                                 return false ;
                                         }
                                         console.log(msg);
                                         Tpl.getTplToHtml({
                                                 id:'.top',
                                                 sTpl:'#topTpl',
                                                 data:msg.weixin_info
                                         },function(){
                                             _this.userInfo = msg['result']['userinfo'] || '';
                                             if($.browser.android){
                                                     if(window.appInterface && window.appInterface.appVersion){
                                                             if(Tool.queryUrl('newSource')==2 || Tool.queryUrl('newSource')==undefined || Tool.queryUrl('newSource')=='undefined'){
                                                                    $("div.attention").hide();
                                                             };
                                                     }else{
                                                         $("div.attention").hide();
                                                     };
                                             }else if($.browser.ios){
                                                     if(window.checkIOS_Version){
                                                             if(Tool.queryUrl('newSource')==2 || Tool.queryUrl('newSource')==undefined || Tool.queryUrl('newSource')=='undefined'){
                                                                 $("div.attention").hide();
                                                             };
                                                     }else{
                                                           $("div.attention").hide();
                                                     };
                                             };
                                             if(msg['weixin_info']['isFollow'] ==1){
                                                   $("#followWX").html('已关注');
                                             }else{
                                                  $("#followWX").html('关注');
                                             };
                                         });
                                     },error:function(e){Tool.alert('请求链接失败，请检测网络!')}
                               });
                       },

                       // 相关文章
                       getPN_RelatedArticles : function(f){
                               var _this = this ;
                               if(!_this.isClose){ return false ;}
                               $.ajax({
                                       url:_this.raUrl+'?weixin='+_this.opts.weixin+'&newSource='+_this.opts.newsource+'&page='+_this.page,
                                       type:'get',
                                       data:[],
                                       success:function(rel){
                                               if(!rel){ return false ;}
                                               var msg = JSON.parse(rel);
                                               if(msg['result']['code'] == 0 && f) { _this.isClose = false; return false ;}
                                               if(msg['result']['code'] == 0)  {
                                                       Tool.alert(msg['result']['message']);
                                                       return false ;
                                               }
                                               console.log(msg);
                                               Tpl.getTplToHtml({
                                                       id:'.main',
                                                       sTpl:'#contentTpl',
                                                       data:msg,
                                                       aType : f
                                               },function(){
                                                   _this.page += 1 ;
                                                   setTimeout(function(){
                                                         ISIS.refresh();
                                                   },1000);
                                               });
                                       },error:function(e){Tool.alert('请求链接失败，请检测网络!')}
                               });
                       }
               };

               module.exports = function(opt){
                          return new U(opt).init();
               }({
                    weixin: Tool.queryUrl('weixin'),
                    newsource: Tool.queryUrl('newSource'),
                    IS_Id : '#wrap'
               });
});