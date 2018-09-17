(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardProspectosCtrl
   * @description
   * # DashboardProspectosCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardProspectosCtrl', [
      '$rootScope',
      DashboardProspectos
    ]);

  function DashboardProspectos(
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
            rol: 'prospecto',
            blog: $rootScope.blog.id,
            estado: 'activo'
          }
        },
        titulo: 'Prospectos',
        opciono: 'prospecto'
      }
    };
  }
})();
