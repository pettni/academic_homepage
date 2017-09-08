module.exports = function(grunt) {
    
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    express: {
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      dev: {
        files: ['public/index.html', 'public/js/*.js', 'public/html/*.html', 'public/css/*.css'],
      }
    }
});

  // Load plugins.
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch')

  // Default task(s).
  grunt.registerTask('default', [
      'express:dev',
      'watch:dev'
    ]);
};
