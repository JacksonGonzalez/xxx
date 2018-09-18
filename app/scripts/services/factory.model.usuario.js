(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Usuario
   * @description
   * # Usuario
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Usuario', [
      'Model',
      usuario
    ]);

  function usuario(
    Model
    ) {
      var model = new Model('usuario'); 
      return model;
  }
})();
