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
      },
      empresa: $rootScope.blog.titulo
    };

    vm.cuerpo.menu.list=
    [
      {
        name: 'Inventario',
        icon: 'application',
        sublist:[
          {
            name: 'Producto',
            sref: 'dashboard.producto'
          },
          {
            name: 'Materias Primas',
            sref: 'dashboard.materiasprimas'
          },
          {
            name: 'Materias Primas Procesadas',
            sref: 'dashboard.materiaprocesada'
          },
          {
            name: 'Servicios',
            sref: 'dashboard.servicios'
          }
        ],
      },
      {
        name: 'Contabilidad',
        sublist:[
          {
            name: 'hola'
          }
        ]
      },
      {
        name: 'Caja',
        sublist:[
          {
            name: 'Factura'
          },
          {
            name: 'Recibos'
          },
          {
            name: 'Compras'
          },
          {
            name: 'Gastos / Vals'
          }
        ]
      },
      {
        name: 'Personas',
        sublist:[
          {
            name: 'Clientes'
          },
          {
            name: 'Empleados'
          },
          {
            name: 'Todos'
          }
        ]
      },
      {
        name: 'Configuracion',
        sublist:[
          {
            name: 'General',
            sref: 'dashboard.general'
          },
          {
            name: 'Redes Sociales'
          },
          {
            name: 'Sucursales'
          },
          {
            name: 'Bodegas'
          },
          {
            name: 'ubicacion',
            sref: 'dashboard.ubicacion'
          }
        ]
      }
    ]
    ;
    // console.log(vm.cuerpo.menu.list);

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
