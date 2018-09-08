(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Pago
   * @description
   * # Pago
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Pago', [
      'Model',
      Pago
    ]);

  function Pago(
    Model
    ) {
      return new Model('pago');
  }
})();
