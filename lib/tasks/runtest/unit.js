module.exports = function(rootTask) {
  'use strict';

  return {
    description: [
      'internal task of test:unit'
    ],
    run: [
      {
        if: 'jqueryToolbox.jshint',
        task: 'jshint:all'
      },
      {
        if: 'jqueryToolbox.jscs',
        task: 'jscs:all'
      },
      {
        if: 'jqueryToolbox.coverage',
        task: 'shell:deleteCoveragesUnit'
      },
      {
        if: 'jqueryToolbox.watch',
        task: 'karma:tdd:run',
        else: 'karma:all'
      },
      {
        if: 'jqueryToolbox.coverage',
        task: 'normalizeCoverage'
      },
      {
        if: [
          'test' === rootTask,
          'jqueryToolbox.coverage'
        ],
        task: 'makeReport'
      }
    ]
  };
};
