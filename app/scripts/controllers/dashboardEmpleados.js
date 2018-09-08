(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardEmpleadosCtrl
   * @description
   * # DashboardEmpleadosCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardEmpleadosCtrl', [
      '$rootScope',
      DashboardEmpleados
    ]);

  function DashboardEmpleados(
    $rootScope,
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
            rol: 'empleado',
            blog: $rootScope.blog.id,
            estado: 'activo'
          }
        },
        titulo: 'Empleado',
        opciono: 'empleado'
      }
    };
  }
})();
