/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 15-12-2 下午3:24
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */
define(function (require , exports , module) {
                "use strict";
                var  Tool = require("./utils/tools.js");
                var  S = function(opt){
                                this.opts = $.extend({},opt);
                                this.subNoUrl = '/appsite_api/index/save_weixin'; // 提交公众号接口url
                                this.randUrl = '/appsite_api/html5/randVerify' ;  // 验证码接口
                                this.isRes = false ;
                                return this ;
                };

                S.prototype = {
                            constructor : S,

                            init : function(){
                                        var _this = this ;
                                        _this.getRandCode();
                                        _this.bindEvent();
                                        return _this;
                            },

                            bindEvent :function(){
                                    var _this = this ;

                                    $("#subNo").click(function(){
                                             if(_this.checkSubNo()){
                                                   _this.savePublicNumber();
                                             };
                                    });

                                    $("#code").on('tap',function(){
                                              if(_this.isRes){ return false;};
                                              _this.getRandCode();
                                    });
                            },


                            checkSubNo : function(){
                                   var weixin = $("#weixin").val(),
                                       code = $("#randCode").val(),
                                       tel = $("#tel").val();
                                   if(!weixin || !tel) return  Tool.alert('公众号或联系方式不能为空');
                                   if(!code) return  Tool.alert('验证码不能为空');
                                   if(!/^\d{11}$/.test(tel)) return  Tool.alert('请正确填写11位数手机号');
                                   return true ;
                            },

                            getRandCode : function(){
                                var _this = this ;
                                _this.isRes = true ;
                                $.ajax({
                                      url:_this.randUrl,
                                      type:'get',

                                      success:function(rel){
                                            _this.isRes = false ;
                                            if(!rel){ return false;}
                                            var msg = JSON.parse(rel);
                                            if(msg['code'] ==1){
                                                  $("#code").html(msg['yzm']);
                                            };
                                      },error:function(e){alert('')}
                                });

                            },

                            // 提交公众号
                            savePublicNumber : function(){
                                    var _this = this , dt;
                                    dt = {
                                        weixin:$("#weixin").val(),
                                        tel:$("#tel").val(),
                                        yzm: $("#randCode").val()
                                    };
                                    $.ajax({
                                            url:_this.subNoUrl,
                                            type:'post',
                                            data:dt,
                                            success:function(rel){
                                                    if(!rel){ return false ;}
                                                     var msg = JSON.parse(rel);
                                                    console.log(msg);

                                                    if(msg['result']['code'] ==1){
                                                        if($.browser.ios){
                                                            $(document.body).append('<iframe src="ios/pageClose/click" style="display:none"></iframe>');
                                                        }else if($.browser.android){
                                                            if(window.appInterface.pageClose){
                                                                window.appInterface.pageClose();
                                                            };
                                                        }
                                                    }else{
                                                        Tool.alert(msg['result']['message']);
                                                    };
                                            },error:function(){Tool.alert('请求失败,请检测您的网络!')}
                                    });
                            }
                };

                module.exports = new S().init();
});