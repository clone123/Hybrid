/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 15-11-26 下午5:33
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */

define(function(require, exports , module){
             "use strict";
             var Handlebars = require('../lib/handlebars.js');

             Handlebars.registerHelper('if_even', function(value, options) {
                            if((value % 2) == 1) {
                                return options.fn(this);
                            } else {
                                return options.inverse(this);
                            };
             });
             Handlebars.registerHelper('top3', function(value, options) {
                        if(value  < 3) {
                            return options.fn(this);
                        } else {
                            return options.inverse(this);
                        };
             });

             Handlebars.registerHelper('addOne', function(index) {
                           return index + 1 ;
             });

             var Tpl = {
                     getTplToHtml : function(opt,fn){
                            var opts = $.extend({},opt || {}),
                                sTpl = $(opts.sTpl).html(),
                                html = Handlebars.compile(sTpl)(opts.data);

                            $.when().done(function(){
                                            if(opts.aType ==2){
                                                $(opts.id).append($.trim(html));
                                            }else if(opts.aType){
                                                $(opts.id).after($.trim(html));
                                            }else{
                                                $(opts.id).html($.trim(html));
                                            };
                                            console.log('进程-->--开始加载数据......1.....By -clone');
                            }).then(function(){
                                    $.when().done(function(){
                                        if(fn){fn.call(this);};
                                        console.log('进程-->--执行回调函数......2.....By -clone');
                                    }).then(function(){
                                            try{ ISIS && ISIS.refresh();}catch (e){};
                                            console.log('进程-->--刷新ISIS数据......3.....By -clone');
                                        })
                            }).fail(function(){
                                    try{ ISIS && ISIS.refresh();}catch (e){};
                                    console.log('----数据异常执行失败!!!----By -clone');
                            });
                     }
             };
             module.exports = Tpl ;
});

