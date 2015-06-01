module.exports = function() {
  'use strict';

  return {
    src: '<%= jqueryToolbox.files.src.sass %>',
    dest: '<%= jqueryToolbox._.folder.tmp %>/build/sass/style.css'
  };
};
