grunt-jquery-toolbox
=====================

[![Build Status](https://travis-ci.org/Jimdo/grunt-jquery-toolbox.svg)](https://travis-ci.org/Jimdo/grunt-jquery-toolbox)
[![Dependency Status](https://david-dm.org/Jimdo/grunt-jquery-toolbox.svg)](https://david-dm.org/Jimdo/grunt-jquery-toolbox)

Collection of grunt tasks and optional opinionated configuration
for development of jquery plugins.


Install
-------

```sh
npm install grunt grunt-cli --save-dev
npm install grunt-jquery-toolbox --save-dev
```

Use
---

```js
// Gruntfile.js
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jqueryToolbox: { /* see config */ }
    /* project specific configuration here */
  });

  /* load jquery-toolbox collection
     see Included 3rd party tasks */
  grunt.loadNpmTasks('grunt-jquery-toolbox');

  /* custom tasks and hooks */
  grunt.registerTask('default', ['test']);
  grunt.registerTask('build:after', function() {
    grunt.log.ok('work complete!');
  });
};
```


Tasks
-----

Depending on the tasks added by [addTasks](#use) these grunts are available
in the project.

```sh
#see this list by using
grunt --help
```

### $ `grunt test`

Run the tests.

__Environment Variables__:
 - `KARMA_BROWSERS` overwrite browsers for unit tests (default: PhantomJs,Chrome,Firefox)
 - `KARMA_REPORTERS` overwrite reporters for unit tests (default: progress)

__Options__:
 - `--browsers` change browsers for current suite(s)
 - `--reporters` change reporters for current suite(s)
 - `--no-coverage` disable coverage reports and instrumentation (useful for debugging)
 - `--no-jshint` disable jshint (useful for debugging)
 - `--watch` tdd style

### $ `grunt demo`
Serve demo application

__Environment Variables__:
 - `DEMO_PORT` change port (default: 8000)

__Options__:
 - `--port` change port of current task

### $ `grunt coverage`
Serve coverage report, requires `grunt test:unit` to have been run once.

__Environment Variables__:
 - `COVERAGE_PORT` change port (default: 7000)

__Options__:
 - `--port` change port

### $ `grunt build[:watch]`
Concatenate, annotate and minify JavaScript and less files
Optionally watch the `src` files and rebuild on change

### $ `grunt release[:level]`
Run tests, (if successful) bump version build project, commit changes and push to origin


Default project structure
-------------------------

```
 ┌ demo/
 │ └ index.html
 ├ dist/
 ├ src/
 │ ├ js/
 │ │ ├ *.js (project related js files)
 │ ├ less/
 │ │ └ *.less (project related less files)
 │ └ partials/
 │   └ *.html (views for directives)
 ├ test/
 │ └ unit/
 │   ├ SpecHelper.js|coffee (test setup stuff)
 │   └ *Spec.js|coffee (unit test files)
 ├ .jshintrc (optional)
 ├ bower.json (optional)
 ├ package.json
 └ Gruntfile.js|coffee
```

This is customizable via the [config](#config)


Config
------

Values are defaults or explanations.

```js
// Gruntfile.js
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    jqueryToolbox: {
        /* specify the preconfigured tasks that
         should be used in the project */
      tasks: [
        'build',
        'coverage',
        'coveralls',
        'demo',
        'release',
        'tdd',
        'test'
      ],

      // whether or not the author in package.json should be set to the
      // contributor with the most commits
      dynamicAuthor: false,

      // customize the demo/test environment files
      envFilter: function(env) { return env; },

      // customize project structure
      files: {
        src: {
          js: [
            'src/js/helper.module.js'
          ],
          less: [
            'src/less/**/*.less'
          ]
        },
        // additional vendor files for tests and demos that
        // won't be shipped within dist
        vendor: {
          js: {
            top: [],
            jqueryPlugins: [],
            bottom: []
          },
          css: [],
        },
        test: {
          unit: [
            'test/unit/SpecHelper.+(js|coffee)',
            'test/unit/**/*Spec.+(js|coffee)'
          ]
        },
        demoEnvFolder: 'demo/',
        distFolder: 'dist/'
      },

      // custom path for your jshintrc
      jshintrc: '.jshintrc',

      // how much commits make a maintainer?
      maintainersThreshold: 15,

      // custom middleware for demo server
      // can also be an array of middleware
      middleware: {
        demo: function(req, res, next) { next(); }
      },

      // banners an wraps for generated dist files (can be paths or strings)
      template: {
        banner: 'lib/templates/banner.tpl',
        bannerMin: 'lib/templates/bannerMin.tpl',
        wrapTop: 'lib/templates/wrapTop.tpl',
        wrapBottom: 'lib/templates/wrapBottom.tpl'
      }
    }

    /* additional configuration ... */
  });

  /* rest of gruntfile ... */
};
```


Custom tasks and hooks
----------------------

Register custom tasks and or setup before the added tasks run.

```js
// Gruntfile.js
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({ /* ... */ });

  /* initiation of tasks ... */

  /* add any custom tasks */
  grunt.registerTask('sayYolo', function() {
    console.log('YOLO!');
  });

  /* hook it into tooling tasks ones.
     this will be called before all other release tasks */
  grunt.registerTask('release:before', ['sayYolo']);
};
```

### Hooks

 - test:before
 - test:unit:before
 - test:after
 - test:unit:after
 - tdd:before
 - tdd:unit:before
 - demo:before
 - coverage:before
 - build:before
 - build:after
 - release:before
 - release:after


Included 3rd party tasks
------------------------

 - [grunt-bump](https://github.com/vojtajina/grunt-bump)
 - [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent)
 - [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
 - [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
 - [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
 - [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less)
 - [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
 - [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
 - [grunt-coveralls](https://github.com/pimterry/grunt-coveralls)
 - [grunt-istanbul](https://github.com/taichi/grunt-istanbul)
 - [grunt-karma](https://github.com/karma-runner/grunt-karma)
 - [grunt-npm](https://github.com/Xiphe/grunt-npm/)
 - [grunt-shell](https://github.com/sindresorhus/grunt-shell)


LICENSE
-------

> The MIT License
>
> Copyright (c) 2014 Jimdo GmbH http://jimdo.com
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
