(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.ExtraCategoria
   * @description
   * # ExtraCategoria
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('ExtraCategoria', [
      'Model',
      ExtraCategoria
    ]);

  function ExtraCategoria(
    Model
    ) {
      return new Model('extracategoria');
  }
})();
