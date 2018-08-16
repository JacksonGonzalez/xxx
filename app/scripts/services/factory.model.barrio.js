(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Barrio
   * @description
   * # Barrio
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Barrio', [
      'Model',
      Barrio
    ]);

  function Barrio(
    Model
    ) {
      return new Model('barrio');
  }
})();
