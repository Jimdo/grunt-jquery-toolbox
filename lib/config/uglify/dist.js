module.exports = function() {
  'use strict';

  return {
    options: {
      banner: '<%= jqueryToolbox.template.bannerMin %>'
    },
    src: '<%= concat.dist.dest %>',
    dest: '<%= jqueryToolbox.folder.dist %>/<%= pkg.name %>.min.js'
  };
};
