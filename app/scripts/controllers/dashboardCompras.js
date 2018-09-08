(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardComprasCtrl
   * @description
   * # DashboardComprasCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardComprasCtrl', [
      '$rootScope',
      DashboardCompras
    ]);

  function DashboardCompras(
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
            tipo: 'compra',
            blog: $rootScope.blog.id,
            estado: 'activo'
          }
        },
        titulo: 'Compra',
        opciono: 'compra'
      }
    };
    // vm.cuerpo = {
    //   search: [],
    //   btn:{
    //     crear: crear
    //   }
    // }
    // ;
    // getlist();
    // function getlist() {
    //   vm.cuerpo.search = new Search()(Contrato, 'contrato', {
    //     tipo: 'compras'
    //   },paginate);
    //   // console.log(vm.cuerpo.search);
    // }
    //
    // function crear(ev, obj) {
    //   if (!obj) {
    //     var obj = {};
    //     vm.cuerpo.search.itemselec = {};
    //   }else {
    //       vm.cuerpo.search.seleccionado(obj);
    //       obj=vm.cuerpo.search.itemselec;
    //   }
    //   // console.log(obj);
    //   obj.opciono = 'factura';
    //   $mdDialog.show({
    //     controller: 'ContratoCtrl',
    //     controllerAs: 'contrato',
    //     templateUrl: 'views/Forms/contrato.html',
    //     parent: angular.element(document.body),
    //     locals:{
    //       dialog:obj
    //     },
    //     targetEvent: ev,
    //     clickOutsideToClose:true,
    //     fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
    //   })
    //   .then(function(answer) {
    //
    //   });
    // }

  }
})();
