(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Blog
   * @description
   * # Blog
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Blog', [
      'Model',
      Blog
    ]);

  function Blog(
    Model
    ) {
      return new Model('blog');
  }
})();
