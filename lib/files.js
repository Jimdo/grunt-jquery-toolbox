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
  'src/js/helper.module.js',
  'src/js/**/!(helper)*.js'
]);

files.src.less = getProjectConfig('files.src.less', [
  'src/less/**/*.less'
]);

files.src.partialsFolder = getProjectConfig('files.src.partialsFolder', 'src/partials/');


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

files.test.e2e = getProjectConfig('files.test.e2e', [
  'test/e2e/SpecHelper.+(js|coffee)',
  'test/e2e/**/*Spec.+(js|coffee)'
]);


/* DEMO FOLDER
 ***************/
files.demoEnvFolder = getProjectConfig('files.demoEnvFolder', 'demo/');


/* E2E DEMO FOLDER
 ***************/
files.e2eEnvFolder = getProjectConfig('files.e2eEnvFolder', 'test/e2e/env/');


/* DIST FOLDER
 ***************/
files.distFolder = getProjectConfig('files.distFolder', 'dist/');


/* INTERNAL
 ***************/

var tmpFolderName =  '.tmp/';
var ngTemplates = path.join(tmpFolderName, 'ng_templates.js');

files.internal = {};

files.internal.projectFolder = helpers.config.projectDir;

var baseFolder = files.internal.baseFolder = path.resolve(__dirname, '../');

files.internal.tmpFolder = path.join(baseFolder, tmpFolderName);

files.internal.pkg = ['package.json'];
if (helpers.hasBower()) {
  files.internal.pkg.push('bower.json');
}

files.internal.ngTemplates = path.join(baseFolder, ngTemplates);


/* ENVIRONMENTS
 ***************/
files.environments = {};

var relativeBaseFolder = 'node_modules/peons-angular/';
var relativeBowerFolder = path.join(relativeBaseFolder, 'bower_components');
var relativeNgTemplates = path.join(relativeBaseFolder, ngTemplates);

var baseEnvironment = getProjectConfig('envFilter', function(env) { return env; })(
  [].concat(
    vendorJs.top || [],
    path.join(relativeBowerFolder, 'angular/angular.js'),
    vendorJs.angularModules || [],
    files.src.js,
    relativeNgTemplates,
    vendorJs.bottom || []
  )
);

var demoEnvironment = _.clone(baseEnvironment);
var karmaEnvironment = _.clone(baseEnvironment);

karmaEnvironment.unshift(path.join(relativeBowerFolder, '/jasmine-moar-matchers/lib/*.js'));
karmaEnvironment.push(path.join(relativeBowerFolder, '/angular-mocks/angular-mocks.js'));

files.environments.demo = demoEnvironment;
files.environments.karma = karmaEnvironment;


/* EXPORTSCHLAGER
 ***************/
module.exports = files;