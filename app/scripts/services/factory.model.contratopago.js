(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.ContratoPago
   * @description
   * # ContratoPago
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('ContratoPago', [
      'Model',
      ContratoPago
    ]);

  function ContratoPago(
    Model
    ) {
      return new Model('contratopago');
  }
})();
