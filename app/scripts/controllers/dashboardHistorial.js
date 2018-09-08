(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardHistorialCtrl
   * @description
   * # DashboardHistorialCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardHistorialCtrl', [
      '$rootScope',
      'Contrato',
      'Search',
      DashboardHistorialCtrl
    ]);

  function DashboardHistorialCtrl(
    $rootScope,
    Contrato,
    Search
  ) {
    var
      vm = this,
      paginate = 1
    ;
    vm.cuerpo = {
      search: []
    }
    ;
    getlist();
    function getlist() {
      vm.cuerpo.search = new Search()(Contrato, 'Bodega', {
        tipo: 'bodega'
      },paginate);
    }

  }
})();
