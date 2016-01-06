module.exports = function(connectMiddleware) {
  'use strict';

  return {
    options: {
      hostname: '*',
      port: '<%= jqueryToolbox.demoPort %>',
      middleware: connectMiddleware,
      base: [
        '<%= jqueryToolbox._.folder.tmp %>',
        '<%= jqueryToolbox._.folder.projectBase %>',
        '<%= jqueryToolbox._.folder.base %>',
        '<%= jqueryToolbox.folder.demo %>'
      ],
      livereload: '<%= jqueryToolbox.livereloadPort %>'
    }
  };
};
