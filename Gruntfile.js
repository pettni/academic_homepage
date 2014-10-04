module.exports = function(grunt) {
    
  path = require('path');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Watch config
    watch: {
      html: {
        files: 'public/{,*/}*.html',
      },
      css: {
        files: 'public/css/*.css',
      },
      js: {
        files: 'public/js/{,*/}*.js',
      },
      options: {
        livereload: 35729,
      },
      karma: {
        files: [ 'test/**/*.js' ],
        tasks: [ 'karma:unit:run' ] //NOTE the :run flag
      }
    },

    express: {
      server: {
        options: {
          // hostname: 'localhost',
          port: 3000,
          server: 'server.js',
          bases: 'public/',
          livereload: true,
        },
      },
    },

    open: {
        all: {
            path: 'http://localhost:3000',
            app: 'Google Chrome'
        }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true,
        singleRun: false      
      }
    }

  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('default', [
      'express',
      'open',
      'karma:unit:start',
      'watch'
    ]);
};
