module.exports = (grunt) ->

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    'jquery-toolbox': {}
  });

  require('../tasks/collection');
