/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 15-11-19 上午10:24
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */

define(function(reuqire , exports , module){
            (function(win){
                 //  'use strict';
                    var Img = {
                            imgList  : win.document.querySelector('.main_txt').getElementsByTagName('img'),
                            _width : win.innerWidth,
                            imgAuto : function(){
                                var _this = this ;
                                _this._width = win.innerWidth;
                                for( var i = 0, len = _this.imgList.length; i < len; i++){
                                    _this.createImage(_this.imgList[i],_this._width);
                                };
                            },
                            createImage : function(imgObj , _width){
                                    if(imgObj.width > 30 && imgObj.height > 30){
                                            if(imgObj.width > _width){
                                                    var pW = $(imgObj).parent().width() , wd = win.Math.min.apply(win.Math,[pW,_width]) - 50;
                                                    $(imgObj).attr({
                                                           style : '',
                                                           width : wd,
                                                           height : (imgObj.height*wd)/imgObj.width
                                                    });
                                            }
                                    };
                            }
                    };
                    Img.imgAuto();
                    win.onresize = function(){
                           Img.imgAuto();
                    };
            })(window);
});


