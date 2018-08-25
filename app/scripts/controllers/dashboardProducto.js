(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardProductoCtrl
   * @description
   * # DashboardProductoCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardProductoCtrl', [
      '$rootScope',
      DashboardProducto
    ]);

  function DashboardProducto(
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
            tipo: 'producto',
            blog: $rootScope.blog.id,
            estado: 'activo'
          }
        },
        titulo: 'Producto',
        opciono: 'producto'
      }
    };
  }
})();
