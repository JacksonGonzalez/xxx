(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Categoria
   * @description
   * # Categoria
   * Factory in the Categoria.
   */
  angular.module('dilisapApp')
    .factory('Categoria', [
      'Model',
      Categoria
    ]);

  function Categoria(
    Model
    ) {
      return new Model('categoria');
  }
})();
