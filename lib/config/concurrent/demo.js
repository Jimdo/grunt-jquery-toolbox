module.exports = function() {
  'use strict';

  return {
    options: {
      logConcurrentOutput: true
    },
    tasks: ['watch:demo', 'shell:openDemo']
  };
};
