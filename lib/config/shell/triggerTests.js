module.exports = function() {
  'use strict';

  return {
    command: [
      'list=(<%= jqueryToolbox.folder.src.js %>*)',
      '(sleep 1 && touch ${list[0]}) > /dev/null 2>&1 &'
    ].join('\n')
  };
};
