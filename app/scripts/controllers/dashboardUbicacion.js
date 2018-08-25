(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardUbicacionCtrl
   * @description
   * # DashboardUbicacionCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardUbicacionCtrl', [
      'Departamento',
      '$rootScope',
      '$mdDialog',
      'Search',
      'Barrio',
      'Ciudad',
      'Pais',
      'Tools',
      DashboardUbicacion
    ]);

  function DashboardUbicacion(
    Departamento,
    $rootScope,
    $mdDialog,
    Search,
    Barrio,
    Ciudad,
    Pais,
    Tools
  ) {
    var
      vm = this,
      paginate= 1
    ;
    vm.cuerpo = {
      btn:{
        editar: editar
      },
      barrio:{
        search:[]
      },
      ciudad:{
        search:[]
      },
      departamento:{
        search:[]
      },
      pais:{
        search:[]
      }
    }
    ;
    getList();
    function getList() {
      vm.cuerpo.barrio.search = new Search()(Barrio, 'Barrio',{}, paginate);
      vm.cuerpo.ciudad.search = new Search()(Ciudad, 'Ciudad',{}, paginate);
      vm.cuerpo.departamento.search = new Search()(Departamento, 'Departamento',{}, paginate);
      vm.cuerpo.pais.search = new Search()(Pais, 'Pais',{}, paginate);
    }
    function editar(ev, opt, obj) {
      if (!obj) {
        var obj = {};
      }
      obj.titulo = opt;
      $mdDialog.show({
        controller: 'UbicacionCtrl',
        controllerAs: 'ubicaciones',
        templateUrl: 'views/Forms/ubicacion.html',
        parent: angular.element(document.body),
        locals:{
          dialog:obj
        },
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {

      });
    }
  }
})();
