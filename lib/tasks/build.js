module.exports = function() {
  'use strict';

  return {
    description: [
      'Concatenate, annotate and minify src files',
      '  subtasks:',
      '    :watch rebuild on src change'
    ],
    options: {
      watch: {
        grunt: ':watch',
        key: 'jqueryToolbox.watch'
      }
    },
    run: [
      'less:dist',
      'sass:dist',
      'concat:dist',
      'concat:distStyles',
      'concat:distStylesMin',
      'autoprefixer:dist',
      'autoprefixer:distMin',
      'uglify:dist',
      'cssmin:dist',
      {
        if: 'jqueryToolbox.watch',
        task: 'watch:build'
      }
    ]
  };
};
