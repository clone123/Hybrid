/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 15-12-17 下午5:47
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */
define(function (require , exports , module) {
          "use strict";

           var Lazy  = {
                   defaultOpt : {
                           threshold       : 0,
                           failure_limit   : 0,
                           event           : "touchend",
                           effect          : "fadeIn",
                           id               : null,
                           tag              : null,
                           container       : window,
                           data_attribute  : "lazySrc",
                           skip_invisible  : true,
                           appear          : null,
                           load            : null
                   },
                   lazyload : function(opt){
                           var _this = this ;

                           _this.opts = $.extend(_this.defaultOpt , opt);
                           _this.container =  _this.opts.container ;
                           _this.elems = $(_this.opts.id).find(_this.opts.tag) ;
                           /*$(_this.container).on(_this.opts.event, function() {
                                     return  _this.loadImage();
                           });*/
                           ISIS.on(_this.opts.event , function(){
                                   return  _this.loadImage();
                           });
                           _this.elems.each(function(){
                                   var self = this;
                                   var $self = $(self);

                                   self.loaded = false;

                                   /* When appear is triggered load original image. */
                                   $self.one("updateImage", function() {
                                           if (!this.loaded) {
                                               console.log('updateImage------');
                                               $("<img />").bind("load", function() {
                                                       $self.hide().attr("src", $self.attr(_this.opts.data_attribute))[_this.opts.effect](_this.opts.effect_speed);
                                                       self.loaded = true;

                                                       /* Remove image from array so it is not looped next time. */
                                                       var temp = $.grep(_this.elems, function(element) {
                                                               return !element.loaded;
                                                       });
                                                       var elements = $(temp);

                                                       if (_this.opts.load) {
                                                           var elements_left = elements.length;
                                                           _this.opts.load.call(self, elements_left, _this.opts);
                                                       }
                                               }).attr("src", $self.attr(_this.opts.data_attribute));
                                           }
                                   });

                                   /* When wanted event is triggered load original image */
                                   /* by triggering updateImage.                              */
                                   /*if (0 !== _this.opts.event.indexOf("touchend")) {
                                           self.addEventListener(_this.opts.event, function() {
                                                   if (!self.loaded) {
                                                       $self.trigger("updateImage");
                                                   }
                                           });
                                   };*/
                           });
                           this.loadImage();
                           return this ;
                   },

                   loadImage : function(){
                         var _this = this ;
                         _this.elems.each(function(){
                              /*   if (0*//*_this.opts.skip_invisible && !$(this).is(":visible")*//*) {
                                          return false ;
                                 }else*/ if (!_this.calCurrentScreen(this)) {
                                         $(this).trigger("updateImage");
                                 }
                         });
                   },

                   calCurrentScreen : function(element) {
                           var  _this = this ,fold;

                           if (_this.container === undefined || _this.container === window) {
                                   fold = $(window).height() + (Math.abs(ISIS.y) || $(window).scrollTop()) ;
                           } else {
                                 fold = $(_this.container).offset().top + $(_this.container).height();
                           };
                           return fold <= $(element).offset().top - _this.opts.threshold;
                   }
           };

           module.exports = Lazy ;
});