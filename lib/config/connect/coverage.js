module.exports = function() {
  'use strict';

  return {
    options: {
      hostname: '*',
      port: '<%= jqueryToolbox.coveragePort %>',
      base: [
        '<%= jqueryToolbox._.folder.tmp %>/coverageReport/lcov-report/',
      ],
      livereload: true,
      open: true
    }
  };
};
