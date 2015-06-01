module.exports = function() {
  'use strict';

  return {
    options: {
      browsers: '<%= jqueryToolbox.autoprefixerBrowsers %>'
    },
    src: '<%= concat.distStyles.dest %>',
    dest: '<%= concat.distStyles.dest %>'
  };
};
