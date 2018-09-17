(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.ActividadUsuario
   * @description
   * # ActividadUsuario
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('ActividadUsuario', [
      'Model',
      ActividadUsuario
    ]);

  function ActividadUsuario(
    Model
    ) {
      return new Model('actividadusuario');
  }
})();
