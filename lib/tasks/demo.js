module.exports = function() {
  'use strict';

  return {
    description: [
      'serve demo application',
      '  options:',
      '    --port|demo-port  (default: 8000)',
      '    --livereload-port (default: 35729)',
      '  Environment Variables:',
      '    DEMO_PORT         (default: 8000)',
      '    LIVERELOAD_PORT   (default: 35729)'
    ],
    options: {
      'demo-port': {
        env: 'DEMO_PORT',
        alias: 'port',
        key: 'jqueryToolbox.demoPort'
      },
      'livereload-port': {
        env: 'LIVERELOAD_PORT',
        key: 'jqueryToolbox.livereloadPort'
      }
    },
    run: [
      'wiredep:demo',
      'injector:demo',
      'connect:demo',
      'concurrent:demo'
    ]
  };
};
