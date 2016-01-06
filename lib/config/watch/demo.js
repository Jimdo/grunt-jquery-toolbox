module.exports = function() {
  'use strict';

  return {
    files: [
      '<%= jqueryToolbox.files.src.js %>',
      '<%= jqueryToolbox.files.src.sass %>',
      '<%= jqueryToolbox.files.src.less %>',
      '<%= jqueryToolbox.folder.demo %>**/*',
      '<%= jqueryToolbox.files.bower %>'
    ],
    tasks: ['wiredep:demo', 'injector:demo'],
    options: {
      livereload: '<%= jqueryToolbox.livereloadPort %>'
    }
  };
};
