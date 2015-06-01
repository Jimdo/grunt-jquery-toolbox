module.exports = function(cleanupModules) {
  'use strict';

  return {
    options: {
      separator: '\n\n',
      stripBanners: true,
      banner: '<%= jqueryToolbox.template.banner %>' +
        '<%= jqueryToolbox.template.wrapTop %>',
      footer: '<%= jqueryToolbox.template.wrapBottom %>',
      process: cleanupModules
    },
    src: [
      '<%= jqueryToolbox.files.src.js %>',
    ],
    dest: '<%= jqueryToolbox.folder.dist %>/<%= pkg.name %>.js'
  };
};
