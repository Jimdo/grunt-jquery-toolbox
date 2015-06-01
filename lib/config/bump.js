module.exports = function() {
  'use strict';

  return {
    options: {
      files: '<%= jqueryToolbox._.files.pkg %>',
      updateConfigs: ['pkg'],
      commitFiles: [
        '<%= jqueryToolbox._.files.pkg %>',
        '<%= jqueryToolbox.folder.dist %>/**/*'
      ],
      pushTo: 'origin'
    }
  };
};
