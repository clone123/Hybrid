/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 15-11-26 上午10:12
 * QQ: 351354136
 * To change this template use File | Settings | File Templates.
 */

"use strict";

module.exports = {
              entry:{
                   submitNo : './mapi/statics/js/submitNo.js',
                   userCenter : './mapi/statics/js/userCenter.js',
                   content : './mapi/statics/js/content.js',
                   searchList : './mapi/statics/js/searchList.js',
                   rankList : './mapi/statics/js/rankList.js',
                   watchList : './mapi/statics/js/watchList.js',
                   gallery : './mapi/statics/js/gallery.js',
                   contentManager : './mapi/statics/js/contentManager.js'
                 //  test : './mapi/statics/js/test.js'
              },
              output:{
                  path:'./mapi/statics/js/dist/',
                  filename:'v1.[name].js'
              },
              resolve :{
                   alias : {
                       jquery : "./mapi/statics/js/lib/zepto.js"
                   },
                   extensions :['','.js','.css','.png','.jpg']
              },
              module:{
                    loaders:[
                        {test:/\.css$/,loader:'!style!css!'},
                        {test:/\.(jpg|png)$/,loader:'!url!'}
                    ]
               }
};