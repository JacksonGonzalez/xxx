(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Extra
   * @description
   * # Extra
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Extra', [
      'Model',
      extra
    ]);

  function extra(
    Model
    ) {
      return new Model('extra');
  }
})();
