var optPort = require('grunt').option('port');
var helpers = require('../helpers');
var aSourceFile = helpers.resolveAssets(helpers.getFiles('src.js'))[0];
var bowerFolder = helpers.getFolder('internal.base', 'bower_components');
var openDemoCmd = 'sleep 1 && open http://localhost:';
var bower;

if (helpers.hasBower()) {
  bower = helpers.getFolder('internal.project', 'node_modules/.bin/bower');
} else {
  bower = helpers.getFolder('internal.base', 'node_modules/.bin/bower');
}

module.exports = {
  triggerTests: {
    command: '(sleep 1 && touch ' + aSourceFile + ') > /dev/null 2>&1 &'
  },
  openDemo: {
    command: openDemoCmd + (optPort || process.env.DEMO_PORT || 8000) + '/'
  },
  deleteCoverages: {
    command: [
      'rm -rf',
      helpers.getFolder('internal.tmp', 'coverage'),
      '&&',
      'rm -rf',
      helpers.getFolder('internal.tmp', 'coverageReport')
    ].join(' ')
  },
  bower: {
    command: [
      'if [ ! -d ' + bowerFolder + ' ]; then',
      '(cd ' + helpers.getFolder('internal.base') + ' && ' + bower + ' install)',
      'fi'
    ].join(' ')
  }
};
