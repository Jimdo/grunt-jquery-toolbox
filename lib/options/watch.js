var _ = require('grunt').util._;
var helpers = require('../helpers');


var testEnvFiles = helpers.getFiles('src.js')
  .concat(helpers.getFiles('src.less'));

var unitTestfiles = _.clone(testEnvFiles).concat(helpers.getFiles('test.unit'));

var demoFiles = helpers.getFiles('src.js')
  .concat(helpers.getFiles('src.less'))
  .concat(helpers.getFolder('demoEnv', '**/*'));

function wrapHooks(tasks, type) {
  if (type === 'global') {
    tasks.unshift('test:before');
    tasks.push('test:after');
  } else {
    tasks.unshift(['test', type, 'before'].join(':'));
    tasks.push(['test', type, 'after'].join(':'));
  }

  return tasks;
}

module.exports = {
  andTestUnit: {
    files: unitTestfiles,
    tasks: wrapHooks([
      helpers.withCoverage('shell:deleteCoverages'),
      'karma:watch:run',
      helpers.withCoverage('_normalizeUnitCoverage'),
      helpers.withCoverage('makeReport')
    ], 'unit')
  },
  demo: {
    files: demoFiles,
    tasks: [],
    options: {
      livereload: true
    }
  }
};
