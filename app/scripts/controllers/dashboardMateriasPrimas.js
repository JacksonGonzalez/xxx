(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardMateriasPrimasCtrl
   * @description
   * # DashboardMateriasPrimasCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardMateriasPrimasCtrl', [
      '$rootScope',
      DashboardMateriasPrimas
    ]);

  function DashboardMateriasPrimas(
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
            tipo: 'materiaprima',
            blog: $rootScope.blog.id,
            estado: 'activo'
          }
        },
        titulo: 'Materias Primas',
        opciono: 'materiaprima'
      }
    };
  }
})();
