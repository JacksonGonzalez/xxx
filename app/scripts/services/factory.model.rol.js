(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Rol
   * @description
   * # Rol
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Rol', [
      'Model',
      Rol
    ]);

  function Rol(
    Model
    ) {
      return new Model('rol');
  }
})();
