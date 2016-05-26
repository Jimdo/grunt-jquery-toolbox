module.exports = function connectMiddleWareFactory(
  _,
  fs,
  grunt,
  path,
  del,
  mkdirp
) {
  'use strict';

  var connectLess = require('connect-less');
  var sass = require('node-sass-middleware');
  var postcssMiddleware = require('postcss-middleware');
  var autoprefixer = require('autoprefixer');

  function cleanup() {
    var tmpFolder = grunt.config('jqueryToolbox._.folder.tmp');

    [
      path.join(tmpFolder, grunt.config('jqueryToolbox.folder.demo')),
      path.join(tmpFolder, grunt.config('jqueryToolbox.folder.src.less'))
    ].forEach(function(folder) {
      del.sync(folder, {force: true});
      mkdirp(folder);
    });
  }

  function lessMiddleware() {
    var tmpFolder = grunt.config('jqueryToolbox._.folder.tmp');

    return connectLess({
      dst: tmpFolder
    });
  }

  function sassMiddleware() {
    var sassSrc = grunt.config('jqueryToolbox.folder.src.sass');
    var tmpFolder = grunt.config('jqueryToolbox._.folder.tmp');

    return sass({
      response: false,
      src: path.resolve(sassSrc),
      outputStyle: 'expanded',
      dest: path.join(tmpFolder, 'src/sass'),
      prefix: '/src/sass'
    });
  }

  function autoprefixerMiddleware() {
    var tmpFolder = grunt.config('jqueryToolbox._.folder.tmp');
    var projectBase = grunt.config('jqueryToolbox._.folder.projectBase');

    return postcssMiddleware({
      plugins: [
        autoprefixer({
          browsers: grunt.config('jqueryToolbox.autoprefixerBrowsers')
        })
      ],
      src: function(req) {
        if (path.extname(req.url) === '.css') {
          return [
            path.join(tmpFolder, req.url),
            path.join(projectBase, req.url)
          ];
        }

        return '';
      }
    });
  }

  function customMiddleware() {
    var custom = grunt.config('jqueryToolbox.customMiddleware');

    if (_.isArray(custom) || _.isFunction(custom)) {
      return custom;
    }

    return [];
  }

  return function(connect, options, middlewares) {
    cleanup();

    middlewares.unshift(lessMiddleware());
    middlewares.unshift(sassMiddleware());
    middlewares.unshift(autoprefixerMiddleware());

    return [].concat(customMiddleware()).concat(middlewares);
  };
};
