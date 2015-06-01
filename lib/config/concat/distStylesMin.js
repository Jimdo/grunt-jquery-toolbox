module.exports = function() {
  'use strict';

  return {
    options: {
      stripBanners: true,
      banner: '<%= jqueryToolbox.template.bannerMin %>'
    },
    src: '<%= concat.distStyles.src %>',
    dest: '<%= jqueryToolbox.folder.dist %>/<%= pkg.name %>.min.css'
  };
};
