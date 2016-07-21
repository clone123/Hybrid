/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 16-2-18 上午11:06
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */
define(function (require , exports , module) {
                    "use strict";
                    var Tpl = require("./utils/htmlTpl.js"),
                        Tool = require("./utils/tools.js"),
                        IS = window['IS'] = require("./utils/is.js");
                    var  P = function(opt){
                                    this.opts = $.extend({},opt);
                                    this.page = 1 ;
                                    this.isClose = true ;
                                    this.conListUrl = '/appsite_api/follow/get_follow_weixin'; // 关注公众号列表接口url
                                    this.followUrl = '/appsite_api/follow/follow_weixin'      // 关注接口url
                                    window['ISIS'] = new IS(this.opts.IS_Id ,{
                                                scrollbars: true,
                                                mouseWheel: true,
                                                fadeScrollbar : true ,
                                                momentum : true,
                                                useTransform : true,
                                             //   click : true,
                                                preventDefault : false
                                    });
                                    return this ;
                    };

                    P.prototype = {
                                constructor : P,

                                init : function(){
                                            var _this = this ;
                                            _this.getConList(0);
                                            _this.bindEvent();
                                            return _this;
                                },

                                bindEvent : function(){

                                      var _this = this ;

                                      $(".rel_cont").unbind().live('swipeLeft',function(){
                                              var obj = $(this),a = obj.find('a.rel_a'),del = obj.find('div.rel_but');
                                              del.show();
                                              window.requestAnimationFrame(function(){
                                                          a.animate({
                                                               right : '26%'
                                                          },'fast',function(){
                                                               del.css('z-index',1);
                                                          });
                                              });
                                      });

                                      $(".rel_cont").unbind().live('swipeRight',function(){
                                              var obj = $(this),a = obj.find('a.rel_a'),del = obj.find('div.rel_but');
                                              del.css('z-index',-1);
                                              window.requestAnimationFrame(function(){
                                                          a.animate({
                                                               right : '0px'
                                                          },'fast');
                                              });
                                       });

                                       $(document).on('tap','div.rel_but',function(e){
                                               //    alert(JSON.stringify(_this.userInfo));
                                                   if(_this.userInfo){
                                                           _this.userImg = _this.userInfo['userImg'];
                                                           _this.nickname = _this.userInfo['nickname'];
                                                           _this.setFollow(this);
                                                   }else if($.browser.ios){
                                                       $(document.body).append('<iframe src="ios/login/click" style="display:none"></iframe>');
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
                                                _this.getConList(2);
                                                console.log('scrollEnd----');
                                      }, false);

                                      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

                                },
                                setFollow : function(o){
                                        var _this = this,obj = $(o),weixin = obj.attr('weixin') ;
                                        $.ajax({
                                            url:_this.followUrl,
                                            type:'post',
                                            data :{weixin:weixin},
                                            success : function(rel){
                                                if(!rel) return false ;
                                                var msg = JSON.parse(rel);
                                                if(msg['result']['code'] == 0)  {
                                                    Tool.alert(msg['result']['message']);
                                                    return false ;
                                                }else{
                                                    $(obj.parent()).fadeOut(function(){
                                                           $(this).remove();
                                                    });
                                                };
                                                console.log(msg['action']['message']);
                                            },error:function(e){ Tool.alert('请求链接失败，请检测网络!')}
                                        });
                                },

                                // 公众号列表
                                getConList : function(f){
                                        var _this = this ;
                                        if(!_this.isClose){ return false ;}
                                        $.ajax({
                                            url:_this.conListUrl+'?page='+_this.page,
                                            type:'get',
                                            data:[],
                                            success:function(rel){
                                                if(!rel){ return false ;}
                                                var msg = JSON.parse(rel);
                                                console.log(msg);
                                                if(msg['result']['code'] == 0 && f) { _this.isClose = false; return false ;}
                                                if(msg['result']['code'] == 0 ){
                                                    $('.relative').empty();
                                                    $('.tip').html('对不起，关注列表为空!');
                                                    $(".tishi").fadeIn();
                                                }else{
                                                    $("div.tishi").fadeOut();
                                                    Tpl.getTplToHtml({
                                                            id:'.relative',
                                                            sTpl:'#topTpl',
                                                            data:msg,
                                                            aType : f
                                                    },function(){
                                                        _this.userInfo = msg['result']['userinfo'] || '';
                                                        _this.page += 1 ;
                                                        if(!f){
                                                                $('.relative').show(function(){
                                                                       ISIS.refresh();
                                                                });
                                                        };
                                                    });
                                                }
                                            },error:function(e){Tool.alert('请求链接失败，请检测网络!')}
                                        });
                                }
                    };

                    module.exports = function(opt){
                              return new P(opt).init();
                    }({
                        IS_Id : '#wrap'
                    });
});