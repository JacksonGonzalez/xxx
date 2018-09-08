(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.UsuarioRol
   * @description
   * # UsuarioRol
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('UsuarioRol', [
      'Model',
      UsuarioRol
    ]);

  function UsuarioRol(
    Model
    ) {
      var model = new Model('usuariorol');
      return model;
  }
})();
