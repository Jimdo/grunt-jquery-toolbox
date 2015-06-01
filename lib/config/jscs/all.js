module.exports = function() {
  'use strict';

  return {
    src: [
      '<%= jqueryToolbox.files.src.js %>',
      '<%= jqueryToolbox.files.test.unit %>',
      '<%= jqueryToolbox.files.styleCheck %>'
    ]
  };
};
