/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 16-3-22 下午1:31
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */

/* 基于gulp和webpack前端构建工具，JS模块压缩合并，文件配置*/
{
        "use strict";

        var gulp = require("gulp"), uglify = require('gulp-uglify'),
            named = require('vinyl-named'),webpack = require("gulp-webpack");

        /*测试JS*/
/*        gulp.task("test",["content"],function(){

                return gulp.src(["./mapi/statics/js/a.js","./mapi/statics/js/b.js"]).
                        pipe(named()).
                        pipe(webpack({output: {filename: 'v1.[name].js'}})).
                        pipe(uglify()).
                        pipe(gulp.dest("./mapi/statics/js/dist/"));
        });*/

        /*文章详情页*/
        gulp.task("content",function(){

                   return gulp.src("./mapi/statics/js/content.js").
                           pipe(named()).
                           pipe(webpack({output: {filename: 'v1.[name].js'}})).
                           pipe(uglify()).
                           pipe(gulp.dest("./mapi/statics/js/dist/"));
        });

        /*后台文章详情页*/
        gulp.task("contentManager",function(){

                    return gulp.src("./mapi/statics/js/contentManager.js").
                            pipe(named()).
                            pipe(webpack({output: {filename: 'v1.[name].js'}})).
                            pipe(uglify()).
                            pipe(gulp.dest("./mapi/statics/js/dist/"));
        });

        /*公众号提交*/
        gulp.task("submitNo",function(){

                    return gulp.src("./mapi/statics/js/submitNo.js").
                            pipe(named()).
                            pipe(webpack({output: {filename: 'v1.[name].js'}})).
                            pipe(uglify()).
                            pipe(gulp.dest("./mapi/statics/js/dist/"));
        });

        /*公众号详情*/
        gulp.task("userCenter",function(){

                    return gulp.src("./mapi/statics/js/userCenter.js").
                            pipe(named()).
                            pipe(webpack({output: {filename: 'v1.[name].js'}})).
                            pipe(uglify()).
                            pipe(gulp.dest("./mapi/statics/js/dist/"));
        });

        /*搜索页*/
        gulp.task("searchList",function(){

                    return gulp.src("./mapi/statics/js/searchList.js").
                            pipe(named()).
                            pipe(webpack({output: {filename: 'v1.[name].js'}})).
                            pipe(uglify()).
                            pipe(gulp.dest("./mapi/statics/js/dist/"));
        });

        /*排行榜-切换*/
        gulp.task("rankList",function(){

                    return gulp.src("./mapi/statics/js/rankList.js").
                            pipe(named()).
                            pipe(webpack({output: {filename: 'v1.[name].js'}})).
                            pipe(uglify()).
                            pipe(gulp.dest("./mapi/statics/js/dist/"));
        });

        /*关注列表*/
        gulp.task("watchList",function(){

                    return gulp.src("./mapi/statics/js/watchList.js").
                            pipe(named()).
                            pipe(webpack({output: {filename: 'v1.[name].js'}})).
                            pipe(uglify()).
                            pipe(gulp.dest("./mapi/statics/js/dist/"));
        });

        /*图片滑动插件*/
        gulp.task("gallery",function(){

                    return gulp.src("./mapi/statics/js/gallery.js").
                            pipe(named()).
                            pipe(webpack({output: {filename: 'v1.[name].js'}})).
                            pipe(uglify()).
                            pipe(gulp.dest("./mapi/statics/js/dist/"));
        });

}