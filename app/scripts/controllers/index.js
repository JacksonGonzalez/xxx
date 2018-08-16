(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:IndexCtrl
   * @description
   * # IndexCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('IndexCtrl', [
      '$rootScope',
      '$mdSidenav',
      Index
    ]);

  function Index(
    $rootScope,
    $mdSidenav
  ) {
    var
      vm = this,
      list = []
    ;


  }
})();
