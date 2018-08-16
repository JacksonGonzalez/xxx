(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.ArticuloBlog
   * @description
   * # ArticuloBlog
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('ArticuloBlog', [
      'Model',
      ArticuloBlog
    ]);

  function ArticuloBlog(
    Model
    ) {
      return new Model('articuloblog');
  }
})();
