/* global __dirname */
var grunt = require('grunt');
var findup = require('findup-sync');
var path = require('path');
var basepath = path.resolve(__dirname, '..');
var dependencies = require('../package.json').dependencies;
var dependency;
var tasksDir;
var tasks = grunt.config('jquery-toolbox').tasks;

grunt.verbose.subhead('Registering subtasks of "grunt-jquery-toolbox"...');

for (dependency in dependencies) {
  if (dependency.indexOf('grunt-') === 0) {
    tasksDir = findup(path.join('node_modules', dependency, 'tasks'), {cwd: basepath});
    if (tasksDir) {
      grunt.loadTasks(tasksDir);
    }
  }
}

grunt.verbose.writeln();
grunt.verbose.write('Subtasks of "grunt-jquery-toolbox"...');
grunt.verbose.writeln('OK'.green);
grunt.verbose.writeln();

grunt.verbose.write('Configuring grunt-jquery-toolbox tasks...');
require('../lib/index').addTasks(tasks);
grunt.verbose.writeln('OK'.green);
grunt.verbose.writeln();