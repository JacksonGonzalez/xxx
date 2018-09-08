(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardClientesCtrl
   * @description
   * # DashboardClientesCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardClientesCtrl', [
      'UsuarioRol',
      '$rootScope',
      DashboardClientes
    ]);

  function DashboardClientes(
    UsuarioRol,
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
            rol: 'cliente',
            blog: $rootScope.blog.id,
            estado: 'activo'
          }
        },
        titulo: 'Cliente',
        opciono: 'cliente'
      }
    };
  }
})();
