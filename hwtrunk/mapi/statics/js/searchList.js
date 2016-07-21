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
                   Tool = require("./utils/tools.js"),
                   IS = window['IS'] = require("./utils/is.js");
               var  S = function(opt){
                            this.opts = $.extend({},opt);
                            this.isReSub = false ; //是否重复提交
                            this.searchUrl = '/appsite_api/html5/get_search_list'; // 用户信息接口url
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

               S.prototype = {
                       constructor : S,

                       init : function(){
                                 var _this = this ;
                                 _this.bindEvent();
                                 return _this;
                       },

                       bindEvent :function(){
                              var _this = this ;

                             $(".delIcon,.cancel").click(function(){
                                     $("#searchC").val('');
                                     $(".delIcon,.cancel").hide();
                             });

                            $(".searchIcon").on('tap',function(){
                                      var v = $("#searchC").val();
                                      if(!v) return Tool.alert('搜索内容不能为空！') ;
                                      $(".load_div").show();
                                      _this.opts.nickname = v;
                                      _this.getSearchList();
                            });
                           document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

                       },

                       // 相关文章
                       getSearchList : function(){
                               var _this = this ;
                               if(_this.isReSub){ return false ;};
                               _this.isReSub = true ;
                               $.ajax({
                                       url:_this.searchUrl+'?nickname='+_this.opts.nickname,
                                       type:'get',
                                       data:[],
                                       success:function(rel){
                                              _this.isReSub = false ;
                                              $(".load_div").hide();
                                               if(!rel){
                                                   $('.relative').empty();
                                                   $('.tip').html('对不起，搜索结果为空!');
                                                   $(".tishi").fadeIn();
                                                   return false ;
                                               };
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
                                                           sTpl:'#relativeTpl',
                                                           data:msg
                                                   },function(){
                                                       $('.relative').fadeIn(function(){
                                                              ISIS.refresh();
                                                       });
                                                   });
                                               }
                                       },error:function(e){Tool.alert('请求链接失败，请检测网络!')}
                               });
                       }
               };

               module.exports = function(opt){
                          return new S(opt).init();
               }({
                    nickname: Tool.queryUrl('nickname'),
                    IS_Id : '#wrap'
               });
});