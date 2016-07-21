/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 16-2-18 上午11:07
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */
define(function (require , exports , module) {
                "use strict";
                var Tpl = require("./utils/htmlTpl.js"),
                    Tool = require("./utils/tools.js"),
                    IS = window['IS'] = require("./utils/is.js");
                var  R = function(opt){
                                this.opts = $.extend({},opt);
                                this.rankListUrl = '/appsite_api/rank/get_rank_by_cateid';  // 排行榜接口url
                                this.categoryUrl = '/appsite_api/rank/get_rank_list'; //'/appsite_api/index/get_category_list';   //频道接口
                                window['ISIS'] = new IS(this.opts.IS_Id ,{
                                            scrollbars: true,
                                            mouseWheel: true,
                                            fadeScrollbar : true ,
                                            momentum : true,
                                            useTransform : true,
                                   //         click : true,
                                            preventDefault : false
                                });
                                return this ;
                };

                R.prototype = {
                            constructor : R,

                            init : function(){
                                    var _this = this ;
                                    if(location.href.indexOf('page=sort_list')>-1){
                                           _this.getRankList();
                                    }else if(location.href.indexOf('page=sort_switch')>-1){
                                          _this.getCategoryList();
                                    }
                                    _this.bindEvent();
                                    return _this;
                            },

                            bindEvent :function(){
                                  var _this = this ;
                                  $("div.rel_cont").live('click',function(){
                                          var strJson_IOS,strJson,obj = $(this),
                                              cgId = obj.attr('cateid'),cgname = obj.attr('catename');
                                          var data = { pcode:cgId,pname:cgname};
                                          strJson = JSON.stringify(data);
                                          strJson_IOS = encodeURIComponent(strJson);
                                     //     alert(strJson_IOS);
                                          if($.browser.ios){
                                                  $(document.body).append('<iframe src="'+strJson_IOS+'/ios/topChang/click" style="display:none"></iframe>');
                                          }else if($.browser.android){
                                              if(window.appInterface.changePhb){
                                                  window.appInterface.changePhb(strJson);
                                              };
                                          };
                                  });

                                  ISIS.on('scrollEnd', function (){
                                            console.log('scrollEnd----');
                                            ISIS.refresh();
                                  }, false);

                                  document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                            },

                            getCategoryList : function(){
                                    var _this = this ;
                                    $.ajax({
                                        url:_this.categoryUrl,
                                        type:'get',
                                        data:[],
                                        success:function(rel){
                                                if(!rel){ return false ;}
                                                var msg = JSON.parse(rel);
                                                console.log(msg);
                                                if(msg['result']['code'] == 0){
                                                    $('.relative').empty();
                                                    $('.tip').html('对不起，搜索结果为空!');
                                                    $(".tishi").fadeIn();
                                                }else{
                                                    $("div.tishi").fadeOut();
                                                    Tpl.getTplToHtml({
                                                            id:'.relative',
                                                            sTpl:'#topTpl',
                                                            data:msg
                                                    },function(){
                                                        $("#cg_"+_this.opts.cateid).find('div.rel_more').attr('class','rel_ok fr box');
                                                        $('.relative').fadeIn(function(){
                                                                ISIS.refresh();
                                                        });
                                                    });
                                                }
                                        },error:function(e){Tool.alert('请求链接失败，请检测网络!');}
                                    });

                            },

                            //排行数据
                            getRankList : function(){
                                    var _this = this ;
                                    $.ajax({
                                            url:_this.rankListUrl+'?cateid='+_this.opts.cateid,
                                            type:'get',
                                            data:[],
                                            success:function(rel){
                                                    if(!rel){ return false ;}
                                                    var msg = JSON.parse(rel);
                                                    console.log(msg);
                                                    if(msg['result']['code'] == 0){
                                                        $('.relative').empty();
                                                        $('.tip').html('对不起，排行榜为空!');
                                                        $(".tishi").fadeIn();
                                                    }else{
                                                        $("div.tishi").fadeOut();
                                                        Tpl.getTplToHtml({
                                                                id:'.relative',
                                                                sTpl:'#topTpl',
                                                                data:msg
                                                        },function(){
                                                            $('.relative').fadeIn(function(){
                                                                    ISIS.refresh();
                                                            });
                                                        });
                                                    }
                                            },error:function(e){Tool.alert('请求链接失败，请检测网络!');}
                                    });
                            }
                };

                module.exports = function(opt){
                     return new R(opt).init();
                }({
                    cateid : Tool.queryUrl('cateid'),
                    IS_Id : '#wrap'
                });
});