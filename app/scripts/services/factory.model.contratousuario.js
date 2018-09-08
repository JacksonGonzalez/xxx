(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.ContratoUsuario
   * @description
   * # ContratoUsuario
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('ContratoUsuario', [
      'Model',
      ContratoUsuario
    ]);

  function ContratoUsuario(
    Model
    ) {
      return new Model('contratousuario');
  }
})();
