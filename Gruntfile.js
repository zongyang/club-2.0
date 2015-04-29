module.exports = function(grunt) {
  // 项目配置
  grunt.initConfig({
    // package
    pkg: grunt.file.readJSON('package.json'),

    //文件头注释
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n',
    concat: {
      dist: {
        //src: ['views/admin/common.js', 'views/admin/user.js', 'views/admin/project.js', 'views/admin/news.js'],
        src:['views/admin/**/*.js','!views/admin/admin.js'],
        dest: 'views/admin/admin.js'
      }
    },
    sass: {
      dist: {
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
          'views/admin/*.js',
          '!views/admin/admin.js'
        ],
        tasks: ['sass','concat']
      }
    }
  });
  // 加载
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 默认任务
  grunt.registerTask('default', ['sass', 'concat']);
}