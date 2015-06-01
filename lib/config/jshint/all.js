module.exports = function() {
  'use strict';

  return {
    options: {
      ignores: ['**/*.coffee'],
      jshintrc: true,
    },
    src: [
      '<%= jqueryToolbox.files.src.js %>',
      '<%= jqueryToolbox.files.test.unit %>',
      '<%= jqueryToolbox.files.styleCheck %>'
    ]
  };
};
