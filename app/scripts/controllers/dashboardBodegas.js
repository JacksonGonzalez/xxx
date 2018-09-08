(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardBodegasCtrl
   * @description
   * # DashboardBodegasCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardBodegasCtrl', [
      '$rootScope',
      'Search',
      'Blog',
      DashboardBodegas
    ]);

  function DashboardBodegas(
    $rootScope,
    Search,
    Blog
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
      vm.cuerpo.search = new Search()(Blog, 'Bodega', {
        tipo: 'bodega'
      },paginate);
    }

  }
})();
