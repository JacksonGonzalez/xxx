(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardRecibosCtrl
   * @description
   * # DashboardRecibosCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardRecibosCtrl', [
      '$rootScope',
      DashboardRecibos
    ]);

  function DashboardRecibos(
    $rootScope
  ) {
    var
      vm = this,
      paginate = 1
    ;
    vm.config = {
      data:{},
      config:{
        search:{
          where:{
            tipo: 'recibo',
            blog: $rootScope.blog.id,
            estado: 'activo'
          }
        },
        titulo: 'Recibo',
        opciono: 'recibo'
      }
    };

  }
})();
