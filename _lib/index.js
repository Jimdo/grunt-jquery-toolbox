// var helpers = require('./helpers');
var grunt = require('grunt');
var helpers = require('./helpers');
var availableTasks = {};

grunt.registerTask('', 'this is a place holder for undefined tasks *', []);

/**
 * Hooks that may be overwritten in order to
 * prepare or tear down additional services.
 */
var hooks = {
  demo: function() {
    grunt.registerTask('demo:before', 'overwrite this *', []);
  },
  test: function() {
    grunt.registerTask('test:before', 'overwrite this *', []);
    grunt.registerTask('test:unit:before', 'overwrite this *', []);
    grunt.registerTask('test:unit:after', 'overwrite this *', []);
    grunt.registerTask('test:after', 'overwrite this *', []);
  },
  tdd: function() {
    grunt.registerTask('tdd:before', 'overwrite this *', []);
    grunt.registerTask('tdd:unit:before', 'overwrite this *', []);
  },
  coverage: function() {
    grunt.registerTask('coverage:before', 'overwrite this *', []);
  },
  build: function() {
    grunt.registerTask('build:before', 'overwrite this *', []);
    grunt.registerTask('build:after', 'overwrite this *', []);
  },
  release: function() {
    grunt.registerTask('release:before', 'overwrite this *', []);
    grunt.registerTask('release:after', 'overwrite this *', []);
  },
  coveralls: function() {
    grunt.registerTask('coveralls:before', 'overwrite this *', []);
    grunt.registerTask('coveralls:after', 'overwrite this *', []);
  }
};


/**
 * Following tasks can be registered by calling
 * loadTasks({tasks: [ <tasklist> ]})
 */

availableTasks.coveralls = {
  desc: [
    'send coverage report to coveralls'
  ].join('\n'),
  hooks: hooks.coveralls,
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      'coveralls'
    ]));
  }
};

availableTasks.demo = {
  desc: [
    'serve demo application',
    '  options:',
    '    --port  (default: 8000)',
    '  Environment Variables:',
    '    DEMO_PORT  (default: 8000)'
  ].join('\n'),
  hooks: hooks.demo,
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      'shell:bower',
      'connect:demo',
      'concurrent:demo',
      'watch:demo',
      'shell:openDemo'
    ]));
    grunt.registerTask('demo', availableTasks.demo.desc, [
      'demo:before',
      'shell:bower',
      'connect:demo',
      'concurrent:demo'
    ]);
  }
};

availableTasks.test = {
  desc: [
    'run the tests',
    '  subtasks:',
    '    :unit  execute just unit suite',
    '  options:',
    '    --browsers     set browsers for current suite(s)',
    '    --reporters    set reporters for current suite(s)',
    '    --no-coverage  disable coverage reports and instrumentation (useful for debugging)',
    '    --no-jshint    disable jshint (useful for debugging)',
    '  Environment Variables:',
    '    KARMA_BROWSERS       (default: PhantomJs,Chrome,Firefox)',
    '    KARMA_REPORTERS      (default: progress)'
  ].join('\n'),
  hooks: hooks.test,
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      helpers.withCoverage('shell:deleteCoverages'),
      'shell:bower',
      helpers.withJshint('jshint'),
      'karma:all',
      helpers.withCoverage('makeReport')
    ]));
    grunt.registerTask(
      'test',
      availableTasks.test.desc,
      function(suite) {
        var tasks = [
          'test:before',
          helpers.withCoverage('shell:deleteCoverages'),
          'shell:bower',
          helpers.withJshint('jshint')
        ];

        if (!suite || suite === 'unit') {
          process.env.defaultBrowsers = 'Firefox,Chrome';
          tasks.push(
            'test:unit:before',
            'karma:all',
            helpers.withCoverage('_normalizeUnitCoverage'),
            'test:unit:after'
          );
        }

        tasks.push(helpers.withCoverage('makeReport'), 'test:after');
        grunt.task.run(tasks);
      }
    );
  }
};

availableTasks.tdd = {
  desc: availableTasks.test.desc.replace(
    'run the tests',
    'run the tests and rerun on src changes'
  ),
  hooks: function() {
    hooks.test();
    hooks.tdd();
  },
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      helpers.withCoverage('shell:deleteCoverages'),
      'shell:bower',
      'karma:watch',
      'shell:triggerTests',

      'watch:andTestUnit',

      helpers.withCoverage('shell:deleteCoverages'),
      helpers.withCoverage('makeReport')
    ]));
    grunt.registerTask(
      'tdd',
      availableTasks.tdd.desc,
      function(suite) {
        var tasks = ['tdd:before', 'shell:bower'];

        var watcher = '';
        if (!suite || suite === 'unit') {
          tasks.push('tdd:unit:before', 'karma:watch:start');
        }
        watcher = 'watch:andTestUnit';

        tasks.push('shell:triggerTests');

        tasks.push(watcher);
        grunt.task.run(tasks);
      }
    );
  }
};

availableTasks.coverage = {
  desc: [
    'serve coverage report',
    'requires `grunt test` to have been run once',
    '  options:',
    '    --port  (default: 7000)',
    '  Environment Variables:',
    '    COVERAGE_PORT  (default: 7000)'
  ].join('\n'),
  hooks: hooks.coverage,
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      'connect:coverage'
    ]));
    grunt.registerTask('coverage', availableTasks.coverage.desc, [
      'coverage:before',
      'connect:coverage'
    ]);
  }
};

availableTasks.build = {
  desc: [
    'Concatenate, annotate and minify JavaScript and less files',
    '  subtasks:',
    '    :watch rebuild on src change'
  ].join('\n'),
  hooks: hooks.build,
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      'shell:bower',
      'less:dist',
      'less:distmin',
      'concat:dist',
      'uglify:dist',
      'watch:build'
    ]));

    grunt.registerTask(
      'build',
      availableTasks.build.desc,
      function(watch) {
        var tasks = [
          'build:before',
          'shell:bower',
          'less:dist',
          'less:distmin',
          'concat:dist',
          'uglify:dist',
          'build:after'
        ];

        if (watch === 'watch') {
          tasks.push('watch:build');
        }

        grunt.task.run(tasks);
      }
    );
  }
};

availableTasks.release = {
  desc: [
    'Run tests,',
    '(if successful) bump version build project,',
    'commit changes and push to origin.',
    '  options:',
    '    <see test>',
    '  Environment Variables:',
    '    <see test>'
  ].join('\n'),
  hooks: function() {
    hooks.release();
    hooks.test();
    hooks.build();
  },
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      'shell:deleteCoverages',
      'shell:bower',
      'jshint',
      'karma:all',
      'makeReport',
      'update-contributors',
      'bump',
      'less:dist',
      'less:distmin',
      'concat:dist',
      'uglify:dist'
    ]));
    grunt.registerTask('release', availableTasks.release.desc, function(type) {
      grunt.task.run([
        'release:before',
        'test',
        'update-contributors',
        'bump-only:' + (type || 'patch'),
        'build',
        'bump-commit',
        'release:after'
      ]);
    });
  }
};

module.exports = {
  addTasks: function(tasksToAdd) {
    if (typeof tasksToAdd === 'undefined') {
      tasksToAdd = Object.keys(availableTasks);
    }

    grunt.registerTask(
      '_normalizeUnitCoverage',
      'helper for coverage reports *',
      helpers.normalizeCoverageTask
    );

    tasksToAdd.forEach(function(task) {
      if (availableTasks[task]) {
        availableTasks[task].hooks();
      } else {
        grunt.log.error('undefined task "' + task + '" in grunt-jquery-toolbox');
      }
    });

    tasksToAdd.forEach(function(task) {
      if (availableTasks[task]) {
        availableTasks[task].task();
      }
    });

  }
};