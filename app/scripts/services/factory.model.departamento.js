(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Departamento
   * @description
   * # Departamento
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Departamento', [
      'Model',
      Departamento
    ]);

  function Departamento(
    Model
    ) {
      return new Model('departamento');
  }
})();
