(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.ActividadArticulo
   * @description
   * # ActividadArticulo
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('ActividadArticulo', [
      'Model',
      ActividadArticulo
    ]);

  function ActividadArticulo(
    Model
    ) {
      return new Model('actividadarticulo');
  }
})();
