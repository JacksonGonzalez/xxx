(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.ArticuloPrecio
   * @description
   * # ArticuloPrecio
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('ArticuloPrecio', [
      'Model',
      ArticuloPrecio
    ]);

  function ArticuloPrecio(
    Model
    ) {
      return new Model('articuloprecio');
  }
})();
