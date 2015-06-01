module.exports = function() {
  'use strict';

  return {
    options: {
      separator: '\n',
      stripBanners: true,
      banner: '<%= jqueryToolbox.template.banner %>'
    },
    src: [
      '<%= less.dist.dest %>',
      '<%= sass.dist.dest %>'
    ],
    dest: '<%= jqueryToolbox.folder.dist %>/<%= pkg.name %>.css'
  };
};
