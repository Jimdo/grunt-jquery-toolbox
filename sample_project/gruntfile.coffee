module.exports = (grunt) ->

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    jqueryToolbox: {}
  });

  require('../tasks/init');
