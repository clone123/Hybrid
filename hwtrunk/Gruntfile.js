/**
 * Created with WebStorm.
 * User: clone
 * Date: 2015/4/23
 * Time: 11:57
 * To change this template use File | Settings | File Templates.
 */
module.exports = function(grunt) {

                grunt.initConfig({

                                pkg: grunt.file.readJSON('package.json'),

                                transport: {

                                        haowai: {
                                            options:{
                                                relative:true,
                                                format:'../js/dist/{{filename}}'
                                            },
                                            files: [{
                                                    cwd: 'mapi/statics/js/',
                                                    src: '*.js',
                                                    dest: '.build/mapi/statics/js/'
                                             }]
                                        }
                                },

            /*                    concat: {
                                        zcLottery: {
                                            options: {
                                                relative: true
                                            },
                                            files: {
                                                '<%= dirs.zcDest %>zc.js': ['<%= dirs.zcSrc %>zc.buy.js', '<%= dirs.zcSrc %>zc.tool.js', '<%= dirs.zcSrc %>zc.odd.js']
                                            }
                                        }
                                },*/


                                uglify: {
                                        options: {
                                            banner: '/*! author:<%= pkg.author %>  email:<%= pkg.email %>  QQ:<%= pkg.QQ %>  time:<%= grunt.template.today("yyyy-mm-dd") %> v<%= pkg.version %>  */\n'
                                        },

                                        haowai: {
                                            files: [{
                                                    expand: true,
                                                    //相对路径
                                                    cwd: '.build/mapi/statics/js/',
                                                    src: '*.js',
                                                    dest: 'mapi/statics/js/dist/',
                                                    rename: function (dest, src) {

                                                                var folder = src.substring(0, src.lastIndexOf('/'));
                                                                var filename = src.substring(src.lastIndexOf('/'), src.length);
                                                                filename = filename.substring(0, filename.lastIndexOf('.'));
                                                                if(filename.indexOf('debug')>-1){
                                                                    var fileresult=dest + folder + 'debug.min.js';
                                                                }else{
                                                                    var fileresult=dest + folder + filename + '.js';
                                                                };

                                                                grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);

                                                                return fileresult;
                                                    }
                                             }]
                                        }

                                },

                                clean: {
                                    build: ['.build']
                                }
                });


                grunt.loadNpmTasks('grunt-cmd-transport');
                grunt.loadNpmTasks('grunt-contrib-concat');
                grunt.loadNpmTasks('grunt-contrib-uglify');
                grunt.loadNpmTasks('grunt-contrib-clean');
                grunt.loadNpmTasks('grunt-contrib-copy');

                grunt.registerTask('haowai',['transport:haowai','uglify:haowai','clean']);

};