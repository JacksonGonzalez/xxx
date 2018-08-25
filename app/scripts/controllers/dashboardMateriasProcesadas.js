(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardMateriasProcesadasCtrl
   * @description
   * # DashboardMateriasProcesadasCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardMateriasProcesadasCtrl', [
      '$rootScope',
      DashboardMateriasProcesadas
    ]);

  function DashboardMateriasProcesadas(
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
            tipo: 'materiaprocesada',
            blog: $rootScope.blog.id,
            estado: 'activo'
          }
        },
        titulo: 'Materias Primas Procesadas',
        opciono: 'materiaprocesada'
      }
    };
  }
})();
