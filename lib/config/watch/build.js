module.exports = function() {
  'use strict';

  return {
    files: [
      '<%= jqueryToolbox.files.src.js %>',
      '<%= jqueryToolbox.files.src.less %>',
      '<%= jqueryToolbox.files.src.sass %>',
      '<%= jqueryToolbox.folder.partials %>/**/*.html'
    ],
    tasks: ['build']
  };
};
