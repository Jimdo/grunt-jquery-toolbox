describe('myPlugin', function() {
  'use strict';

  it('should exist', function() {
    expect($.fn.myPlugin).toBeDefined();
  });

  it('should be callable', function() {
    expect(function() {
      $.fn.myPlugin();
    }).not.toThrow();
  });

});
