(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Pais
   * @description
   * # Pais
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Pais', [
      'Model',
      Pais
    ]);

  function Pais(
    Model
    ) {
      return new Model('pais');
  }
})();
