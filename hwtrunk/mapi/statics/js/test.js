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
                    Lazy = require("./utils/lazy.test.js"),
                    IS = window['IS'] = require("./utils/iScroll.test.js");
                var Con = function(opt){
                                this.opts = $.extend({},opt);
                                this.conUrl = '/appsite_api/html5/get_article_by_aid'; // 详情页内容和标题接口url
                                this.raUrl = '/appsite_api/html5/get_related_article_by_aid';  // 相关文章url
                                this.comUrl = '/appsite_api/html5/get_comment_list_by_aid'; // 全部评论列表url
                                this.comSaveUrl = '/appsite_api/html5/save_comment_by_aid' //保存评论
                                this.isLoadCom = true ;
                                this.log = this.opts.log && true ;
                                window['ISIS'] = new IS(this.opts.IS_Id ,{
                                            scrollbars: true,
                                            mouseWheel: true,
                                            fadeScrollbar : true ,
                                            momentum : true,
                                            preventDefault : false
                                });
                                return this ;
                };

                Con.prototype = {
                    constructor:Con,
                    init : function(){
                        var _this = this ;
                        _this.getContextInfo();
                        _this.getRelatedArticles();
                        _this.getComment();
                        _this.bindEvent();

                        return _this ;
                    },

                    bindEvent : function(){
                        var _this = this ;
                        document.documentElement.style.height = window.innerHeight + 'px';

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

                        // 发表评论
                        $(".sendCom").on('tap',function(){
                            var comment = $("#comment").val();
                            if(!comment)return  Tool.alert('评论数据不能为空');
                            $(window).blur();
                            _this.saveComment();
                        });

                        // 点击写评论
                        $(".writeCom").on('tap',function(){
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
                                Tool.alert('请您先登录!');
                                return false ;
                            };
                            $(".sharTip").hide();
                            $(".sCom").fadeToggle();

                        });

                        // 点击分享
                        $(".share").on('tap',function(){
                            $(".sCom").hide();
                            var strJson_IOS,strJson;
                            strJson = JSON.stringify(_this.strJson);
                            strJson_IOS = encodeURIComponent(strJson);
                            if($.browser.ios){
                                $(document.body).append('<iframe  src="'+strJson_IOS+'/ios/sharTip/click" style="display:none"></iframe>');
                            }else if($.browser.android){
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

                        ISIS.on('tap',function(){
                                 alert('tap');
                        });
                        ISIS.on('click',function(){
                                alert('click');
                        });

                        $('#wrap').on('tap',function(e){
                                return false ;
                                console.log(e);
                                alert('wrap-----tap')
                        });

                        $('#wrap').on('click',function(e){

                                    console.log(e);
                                    alert('wrap-----click')
                        });

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
                            $(".scMask").fadeIn(3000,function(){$(this).fadeOut();});
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
                            $(".scMask").fadeIn(3000,function(){$(this).fadeOut();});
                        };
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
                                if(msg['result']['code'] == 0)  {
                                    alert(msg['result']['message']);
                                    return false ;
                                }
                                if(_this.log){console.log(msg);}
                                Tpl.getTplToHtml({
                                    id:'.header',
                                    sTpl:'#headerTpl',
                                    data:msg.article_info
                                },function(){
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
                                        weixin : _this.artInfo['weixin'] || ''
                                    };
                                    var cc =  msg.article_info['content']; //msg.article_info['content'].replace(/!important/g,'');
                                    cc = cc.replace(/src/g,'original');
                                    $('.main_txt').html(cc);
                                    document.title =  _this.artInfo['title'];
                                    $('div:first').before('<img src="'+_this.artInfo['imgurl']+'" style="display:none">')
                                    _this.bindAudioEvent();
                                    Tool.videoAuto({ cls : '.video_iframe'});
                                    Lazy.lazyload({
                                        id : '.main_txt',
                                        tag : 'img',
                                        event : 'scrollEnd'
                                    });
                /*                    try{
                                        for(var ii=0;ii<2;ii++){
                                            var imgF = $('.main_txt img:eq('+ii+')'),  //处理一张是小图片的情况
                                                isF = imgF.attr('i2s_filters') || imgF.attr('data_ue_src') || imgF.attr('source'),
                                                data_w = imgF.attr('data-w');
                                            var dw = data_w - 0;
                                            if(data_w && dw < 50){ isF = true ;};
                                            if(imgF.attr('copyright_status')){ isF = false};
                                            if(isF){ imgF.attr('style','width:auto !important;display:inline');};
                                        };
                                    }catch(ee){}*/
                                });
                            },error:function(){}
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
                                Tpl.getTplToHtml({
                                    id:'.relative',
                                    sTpl:'#relativeTpl',
                                    data:msg
                                },function(){
                                    _this.aTop = $(".relative").offset().top;
                                    if(_this.aTop < $(window).height()){
                                        _this.getComment();
                                    };
                                });
                            },error:function(){}
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
                                    aType:true,
                                    data:msg
                                },function(){
                                    $('.comment,.com_title').show();
                                });
                            },error:function(){}
                        });
                    },

                    // 发表评论
                    saveComment : function(){
                        var _this = this , dt , time = new Date(),
                            cLen = $('.com_cont').length ,
                            d = time.getDate(),sT = time.getMonth()+1+'-'+(d <10 ? '0'+d : d ),
                            comV = $("#comment").val();

                        dt = {
                            content:comV,
                            aid:_this.opts.aid
                        };

                        if(cLen){
                            Tpl.getTplToHtml({
                                id:'.comment h2',
                                sTpl:'#commentTpl',
                                aType:true,
                                num:1,
                                data:{comment_list:[{content:comV,createtime:sT,headpath:_this.userImg,nickname:_this.nickname}]}
                            });
                        }
                        $.ajax({
                            url:_this.comSaveUrl,
                            type:'post',
                            data:dt,
                            success:function(rel){
                                if(!rel){ return false ;}
                                var msg = JSON.parse(rel);
                                if(msg['result']['code'] == 0)  return false ;
                                if(_this.log){console.log(msg);}
                                $("#comment").val(null);
                                Tool.alert('发表成功!');
                                setTimeout(function(){
                                    if(!cLen){ _this.getComment();};
                                },500);

                            },error:function(){}
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

