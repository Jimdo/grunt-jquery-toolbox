module.exports = function(injectorTransform) {
  'use strict';

  return {
    options: {
      template: '<%= jqueryToolbox.folder.demo %>index.html',
      transform: injectorTransform
    },
    files: {
      '<%= jqueryToolbox.folder.demo %>index.html': [
        '<%= jqueryToolbox.files.src.js %>',
        '<%= jqueryToolbox.files.src.less %>',
        '<%= jqueryToolbox.files.src.sass %>'
      ],
    }
  };
};
