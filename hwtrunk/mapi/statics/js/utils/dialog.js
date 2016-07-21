/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 16-3-1 上午11:20
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */

define(function (require , exports , module) {
            "use strict";

            // 对话框－动态插入内容
            var Dialog = function(opt){
                                $('#maskWin,.layerWap').remove();//连续出现提示框 先清除之前的提示框
                                var options = $.extend({
                                                    title   : "",                    // 标题
                                                    className: "",                  // 外框的className，layerWap layerB（A）
                                                    content : "",                   // 内容可以是html
                                                    width   : "",                   // 设置高度，默认为auto
                                                    height  : "auto",               // 设置高度，默认是auto
                                                    zIndex  : 10001,                // z轴位置，默认10001,
                                                    isBg    : true,                 // 是否要黑色背景
                                                    isTitle : true,                 // 是否要标题
                                                    isClose : true,                 // 是否要关闭按钮
                                                    autoClose : false,              // 是否自动关闭
                                                    autoCloseTime: 500,             // 自动关闭时间
                                                    opacity : .3,                   // 透明度
                                                    confirmBtn : false,             // 是否需要确定按钮
                                                    repealBtn  : false,             // 是否需要取消按钮
                                                    confirmTip : "确定",            // 确定按钮文字
                                                    repealTip  : "取消",            // 取消按钮文字
                                                    onClose : function(){},         // 关闭时回调函数
                                                    confirmCallBack: function(){},  // 确定回调函数
                                                    repealCallBack : function(){}   // 取消时回调函灵敏
                                }, opt || {});

                                var createDialog = function(){
                                            var o = options,
                                                dialogHTML = "",
                                                dialogBox = $("<div class='"+ o.className +"'>"),
                                                stopCode = false;

                                            dialogBox.css({"width": o.width, "height": o.height, "zIndex": o.zIndex});
                                            $("body").append(dialogBox);

                                            // 是否创建标题
                                            if(o.isTitle){
                                                dialogHTML+= "<h2>"+ o.title +"</h2>";
                                            }
                                            dialogHTML += "<div class='layerCon'>" + o.content + "</div>";      // pack-box
                                            dialogHTML += "<div class='layerBtn' id='diaBtn'></div>";
                                            dialogBox.html(dialogHTML);

                                            // 是否创建按钮
                                            if(o.confirmBtn){
                                                $("#diaBtn").append("<input type='button' class='h' id='conBtn' value='"+ o.confirmTip +"'>");
                                            }
                                            if(o.repealBtn){
                                                $("#diaBtn").append("<input type='button' id='repBtn' value='"+ o.repealTip +"'>");
                                            }

                                            // 是否要mask层
                                            if(o.isBg){
                                                addMaskWin();
                                            }

                                            // 确定、取消回调函数
                                            $("#conBtn").click(function(e){
                                                if(o.confirmCallBack){
                                                    stopCode = o.confirmCallBack();
                                                    if(stopCode){       // 如果回调true终止程序
                                                        return false;
                                                    }
                                                }
                                                closeDialog();
                                                //e.stopPropagation();
                                            });

                                            $("#repBtn").click(function(e){
                                                if(o.repealCallBack){
                                                    stopCode = o.repealCallBack();
                                                    if(stopCode){       // 如果回调true终止程序
                                                        return false;
                                                    }
                                                }
                                                closeDialog();
                                                e.stopPropagation();
                                            });

                                            // 关闭层
                                            $(".close").click(function(e){
                                                closeDialog();
                                                e.stopPropagation();
                                            })

                                            dialogPos(dialogBox);

                                            $(window).resize(function(event) {
                                                dialogPos(dialogBox);
                                                window.removeEventListener("touchmove", clearMove, false);
                                            });

                                            window.addEventListener("touchmove", clearMove, false);

                                            if(o.autoClose){
                                                setTimeout(function(){
                                                       closeDialog();
                                                }, o.autoCloseTime);
                                    }
                                };

                                var clearMove = function(e){
                                            var e = event || e;
                                            if (e && e.preventDefault){
                                                // e.preventDefault();
                                            }
                                            else{
                                                window.event.returnValue = false;
                                            }
                                            return false;
                                };

                                // 设置弹层位置
                                var dialogPos = function(oBox){
                                            var nWidth = oBox.width() / 2;
                                            var nHeight = oBox.height() / 2;
                                            var nScrollT = $(window).scrollTop();

                                            oBox.css({
                                                    "position":"absolute",
                                                    "top": ($(window).height() - oBox.height())/ 2 + nScrollT + "px",
                                                    "left": "50%",
                                                    "margin-left": "-" + nWidth + "px",
                                                    // "margin-top": "-" + (nHeight-nScrollT) + "px",
                                                    "z-index": "9999"
                                            }).fadeIn();
                                };

                                // 横竖屏旋转
                                function updateLayout(event){
                                            // 判断浏览器是否支持orientation属性
                                            if(event.orientation){
                                                if(event.orientation == 'portrait'){
                                                    alert("portrait");//竖屏
                                                }
                                                else if(event.orientation == 'landscape') {
                                                    alert("landscape");//横评
                                                }
                                            };
                                };

                                // 创建遮照层
                                var addMaskWin = function(){
                                                var overlayCss = {
                                                        position       : 'fixed',
                                                        zIndex         : '9000',
                                                        top            : '0px',
                                                        left           : '0px',
                                                        height         : '100%',
                                                        width          : '100%',
                                                        backgroundColor: '#000',
                                                        filter         : 'alpha(opacity=40)',
                                                        opacity        : 0.4
                                                    }/*,
                                                    overlayCss2 = { //for ie 6
                                                        position : 'absolute',
                                                        height   : $(window).height()
                                                    }*/;
                                                var overlay = $('<div id="maskWin" class="daskbg" />');
                                                $('body').append(overlay.css(overlayCss));
                                                $('#Overlay').animate({backgroundColor:overlayCss.backgroundColor, opacity: overlayCss.opacity},0);
                                };

                                // 关闭Dialog窗口并执行回调
                                var closeDialog = function(){
                                            var o = options;
                                            var dialogBox = $(".layerWap");
                                            var isClose = false

                                            $("#maskWin").remove();
                                            dialogBox.remove();
                                            isClose = true;

                                            /*if(o.isBg){
                                             $("#maskWin").remove();
                                             dialogBox.remove();
                                             isClose = true;
                                             }
                                             else{
                                             dialogBox.remove();
                                             isClose = true;
                                             }*/

                                            window.removeEventListener("touchmove", clearMove, false);

                                            return isClose;
                                };

                                createDialog();

                                return {
                                    closeDialog: closeDialog,
                                    options: options
                                };
            };

            module.exports = Dialog ;
});