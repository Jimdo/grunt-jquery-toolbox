module.exports = function(grunt) {
  'use strict';

  return {
    options: {
      bowerJson: require(grunt.config('jqueryToolbox.files.bower'))
    },
    src: [
      '<%= jqueryToolbox.folder.demo %>index.html'
    ]
  };
};
