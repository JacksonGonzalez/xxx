(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardProveedoresCtrl
   * @description
   * # DashboardEmpleadosCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardProveedoresCtrl', [
      '$rootScope',
      DashboardProveedores
    ]);

  function DashboardProveedores(
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
            rol: 'proveedores',
            blog: $rootScope.blog.id,
            estado: 'activo'
          }
        },
        titulo: 'Proveedores',
        opciono: 'proveedores'
      }
    };
  }
})();
