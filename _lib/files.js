/* global __dirname */
var util = require('grunt').util;
var _ = util._;
var path = require('path');
var helpers = require('./helpers');
var getProjectConfig = helpers.getProjectConfig;
var files = {};


/* SRC
 ***************/
files.src = {};

files.src.js = getProjectConfig('files.src.js', [
  'src/js/**/*.js'
]);

files.src.less = getProjectConfig('files.src.less', [
  'src/less/**/*.less'
]);


/* VENDOR
 ***************/
files.vendor = {};

var vendorJs = files.vendor.js = getProjectConfig('files.vendor.js') || {};
files.vendor.css = getProjectConfig('files.vendor.css') || [];


/* TEST FILES
 ***************/
files.test = {};

files.test.unit = getProjectConfig('files.test.unit', [
  'test/unit/SpecHelper.+(js|coffee)',
  'test/unit/**/*Spec.+(js|coffee)'
]);


/* DEMO FOLDER
 ***************/
files.demoEnvFolder = getProjectConfig('files.demoEnvFolder', 'demo/');

/* DIST FOLDER
 ***************/
files.distFolder = getProjectConfig('files.distFolder', 'dist/');

/* INTERNAL
 ***************/

var tmpFolderName =  '.tmp/';

files.internal = {};

files.internal.projectFolder = helpers.projectDir;

var baseFolder = files.internal.baseFolder = path.resolve(__dirname, '../');

files.internal.tmpFolder = path.join(baseFolder, tmpFolderName);

files.internal.pkg = ['package.json'];
if (helpers.hasBower()) {
  files.internal.pkg.push('bower.json');
}



/* ENVIRONMENTS
 ***************/
files.environments = {};

var bowerFolder = 'bower_components';
var bowerJquery = path.join(bowerFolder, 'jquery/dist/jquery.js');

var baseEnvironment = getProjectConfig('envFilter', function(env) { return env; })(
  [].concat(
    vendorJs.top || [],
    bowerJquery,
    vendorJs.jqueryPlugins || [],
    files.src.js,
    vendorJs.bottom || []
  )
);

var demoEnvironment = _.clone(baseEnvironment);
var karmaEnvironment = _.clone(baseEnvironment);

karmaEnvironment.unshift(path.join(baseFolder, bowerFolder, '/jasmine-moar-matchers/lib/*.js'));
karmaEnvironment = karmaEnvironment.map(function(file) {
  switch(file) {
    case bowerJquery:
      return path.join(baseFolder, file);
    default:
      return file;
  }
});

files.environments.demo = demoEnvironment;
files.environments.karma = karmaEnvironment;


/* EXPORTSCHLAGER
 ***************/
module.exports = files;
