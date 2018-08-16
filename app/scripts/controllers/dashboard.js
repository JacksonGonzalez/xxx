(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardCtrl
   * @description
   * # DashboardCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardCtrl', [
      '$rootScope',
      '$mdSidenav',
      'Search',
      'Usuario',
      Dashboard
    ]);

  function Dashboard(
    $rootScope,
    $mdSidenav,
    Search,
    Usuario
  ) {
    var
      vm = this,
      list = []
    ;

    vm.cuerpo = {
      sidenav:{
        hasOpen: $rootScope.gtsm,
        toggle: toggle,
        close: close,
        open: open,
        closes: closes
      },
      menu:{
        list: []
      }
    };

    vm.cuerpo.menu.list=[
      {
        name: 'Inventario',
        sublist:[
          {
            name: 'producto',
            sref: 'dashboard.producto'
          },
          {
            name: 'materias primas',
            sref: ''
          },
          {
            name: 'servicios',
            sref: ''
          }
        ]
      }
    ]
    ;

    function close(id){
      this.hasOpen = false;
      return $mdSidenav(id).close();
    }
    function closes(id){
      this.hasOpens = false;
      return $mdSidenav(id).toggle();
    }

    function open(id){
      return $mdSidenav(id).open();
    }

    function toggle(id){
      return $mdSidenav(id).toggle();
    }

  }
})();
