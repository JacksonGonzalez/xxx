(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardTodosCtrl
   * @description
   * # DashboardTodosCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardTodosCtrl', [
      '$rootScope',
      DashboardTodos
    ]);

  function DashboardTodos(
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
            blog: $rootScope.blog.id,
            estado: 'activo'
          }
        },
        titulo: 'Todos',
        opciono: ''
      }
    };
    // TODO terminar esto no se va a mostrar
  }
})();
