module.exports = function(grunt) {
  grunt.initConfig({
    // pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', '!lib/ol.js', '!lib/fetch.min.js', '!lib/plugins/text.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
};
