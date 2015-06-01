module.exports = function() {
  'use strict';

  return {
    options: {
      browsers: '<%= jqueryToolbox.autoprefixerBrowsers %>'
    },
    src: '<%= concat.distStylesMin.dest %>',
    dest: '<%= concat.distStylesMin.dest %>'
  };
};
