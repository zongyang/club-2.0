module.exports = function(grunt) {
  // 项目配置
  grunt.initConfig({
    // package
    pkg: grunt.file.readJSON('package.json'),

    //文件头注释
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n',
    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'views',
          src: ['**/*.sass'],
          dest: 'views',
          ext: '.css'
        }]
      }
    },
    watch: {
      scripts: {
        files: [
          '**/*.sass',
          'views/admin/**/*.js',
          '!views/admin/admin.js'
        ],
        tasks: ['sass']
      }
    }
  });
  // 加载
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 默认任务
  grunt.registerTask('default', ['sass']);
}