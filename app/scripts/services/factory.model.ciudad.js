(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.ciudad
   * @description
   * # ciudad
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Ciudad', [
      'Model',
      ciudad
    ]);

  function ciudad(
    Model
    ) {
      return new Model('ciudades');
  }
})();
