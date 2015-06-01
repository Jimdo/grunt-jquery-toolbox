module.exports = function(grunt) {
  'use strict';

  var preprocessors = {};
  var coverageReporter = {};
  var reporters = grunt.config('jqueryToolbox.unitReporters');

  if (grunt.config('jqueryToolbox.coverage')) {
    grunt.config('jqueryToolbox.files.src.js').forEach(function(file) {
      preprocessors[file] = ['coverage'];
    });
    coverageReporter.reporters = [{
      type: 'json',
      dir: '<%= jqueryToolbox._.folder.coverage %>/unit'
    }];
    reporters.push('coverage');
  }
  preprocessors['**/*.coffee'] = ['coffee'];

  return {
    options: {
      preprocessors: preprocessors,
      coverageReporter: coverageReporter,
      reporters: reporters,
      singleRun: true,
      frameworks: [
        'jasmine'
      ],
      files: '<%= jqueryToolbox.files.test.unitSuite %>'
    },
    all: {
      options: {
        browsers: '<%= jqueryToolbox.unitBrowsers %>'
      }
    },
    tdd: {
      options: {
        background: true,
        singleRun: false,
        autoWatch: false,
        browsers: '<%= jqueryToolbox.unitBrowsers %>'
      },
    }
  };
};
