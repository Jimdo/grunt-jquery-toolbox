module.exports = function() {
  'use strict';

  return {
    options: {
      type: 'lcov',
      dir: '<%= jqueryToolbox._.folder.coverageReport %>',
      print: 'text-summary'
    },
    src: '<%= jqueryToolbox._.folder.coverage %>/**/*.json'
  };
};
