module.exports = function() {
  'use strict';

  return {
    description: [
      'execute unit tests',
      '  options:',
      '    --no-coverage     (Default: false)',
      '    --no-jshint       (Default: false)',
      '    --no-jscs         (Default: false)',
      '    --unit-browsers   (Default: Chrome,Firefox,PhantomJS)',
      '    --unit-reporters  (Default: progress)',
      '  Environment Variables:',
      '    KARMA_BROWSERS    (Default: Chrome,Firefox,PhantomJS)',
      '    KARMA_REPORTERS   (Default: progress)'
    ],
    options: {
      watch: 'jqueryToolbox.watch',
      coverage: 'jqueryToolbox.coverage',
      jscs: 'jqueryToolbox.jscs',
      jshint: 'jqueryToolbox.jshint',
      'unit-browsers': {
        env: 'KARMA_BROWSERS',
        alias: [
          'unit-browser',
          'browsers',
          'browser',
        ],
        type: 'array',
        key: 'jqueryToolbox.unitBrowsers'
      },
      'unit-reporters': {
        env: 'KARMA_REPORTERS',
        alias: [
          'unit-reporter',
          'reporters',
          'reporter'
        ],
        type: 'array',
        key: 'jqueryToolbox.unitReporters'
      }
    },
    run: [
      {
        if: 'jqueryToolbox.watch',
        task: 'karma:tdd:start',
        else: 'runtest:unit'
      },
      {
        if: 'jqueryToolbox.watch',
        task: [
          'shell:triggerTests',
          'watch:unit'
        ]
      }
    ]
  };
};
