(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.ContratoArticulo
   * @description
   * # ContratoArticulo
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('ContratoArticulo', [
      'Model',
      ContratoArticulo
    ]);

  function ContratoArticulo(
    Model
    ) {
      return new Model('contratoarticulo');
  }
})();
