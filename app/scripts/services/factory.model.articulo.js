(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Articulo
   * @description
   * # Articulo
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Articulo', [
      'Model',
      Articulo
    ]);

  function Articulo(
    Model
    ) {
      return new Model('articulo');
  }
})();
