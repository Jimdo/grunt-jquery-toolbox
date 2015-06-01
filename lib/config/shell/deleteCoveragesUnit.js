module.exports = function() {
  'use strict';

  return {
    command: [
      'rm -rf <%= jqueryToolbox._.folder.coverage %>/unit',
      '&&',
      'rm -rf <%= jqueryToolbox._.folder.coverageReport %>'
    ].join(' ')
  };
};
