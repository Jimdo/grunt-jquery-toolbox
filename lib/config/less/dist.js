module.exports = function() {
  'use strict';

  return {
    src: '<%= jqueryToolbox.files.src.less %>',
    dest: '<%= jqueryToolbox._.folder.tmp %>/build/less/style.css'
  };
};
