(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardServiciosCtrl
   * @description
   * # DashboardServiciosCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardServiciosCtrl', [
      '$rootScope',
      DashboardServiciosCtrl
    ]);

  function DashboardServiciosCtrl(
    $rootScope
  ) {
    var
      vm = this
    ;
    vm.config = {
      data:{
      },
      config:{
        search:{
          where:{
            tipo: 'servicio',
            blog: $rootScope.blog.id,
            estado: 'activo'
          }
        },
        titulo: 'Servicios',
        opciono: 'servicio'
      }
    };
  }
})();
