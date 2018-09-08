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
      image: "images/logo.jpg",
      position: null,
      menu:{
        list: [],
        select: function(idx){
          _.forEach(vm.cuerpo.menu.list, function(item, val){
            if (val === idx) {
              if (idx === vm.cuerpo.position) {
                item.check = false;
                vm.cuerpo.position = '';
              }else {
                item.check = true;
                vm.cuerpo.position = idx;
              }
            }else {
              item.check = false;
              }
          })
          ;
        },
        checkmenu: function(idx, obj){
          _.forEach(obj.sublist, function(item, val){
            if (val === idx) {
              item.check = true;
            }else {
              item.check = false;
            }
          })
          ;
        }
      },
      empresa: $rootScope.blog.titulo
    };

    vm.cuerpo.menu.list=
    [
      {
        name: 'Tienda',
        icon: '',
        sublist:[
          {
            name: 'Ver Tienda',
            sref: ''
          },
          {
            name: 'Configuracion',
            sref: ''
          }
        ]
      },
      {
        name: 'Inventario',
        icon: 'application',
        sublist:[
          {
            name: 'Producto',
            icon: '',
            sref: 'dashboard.producto'
          },
          {
            name: 'Materias Primas',
            icon: '',
            sref: 'dashboard.materiasprimas'
          },
          {
            name: 'Materias Procesadas',
            icon: '',
            sref: 'dashboard.materiaprocesada'
          },
          {
            name: 'Servicios',
            icon: '',
            sref: 'dashboard.servicios'
          },
          {
            name: 'Bodegas',
            icon: '',
            sref: 'dashboard.bodegas'
          },
          {
            name: 'Historial',
            icon: '',
            sref: 'dashboard.historial'
          }
        ],
      },
      {
        name: 'Administracion Contable',
        sublist:[
          {
            name: 'Planes de Administracion',
            icon: '',
            sref: ''
          },
          {
            name: 'Contabilidad',
            icon: '',
            sref: ''
          },
          {
            name: 'Estadisticas',
            icon: '',
            sref: ''
          }
        ]
      },
      {
        name: 'Caja',
        sublist:[
          {
            name: 'Factura',
            icon: '',
            sref: 'dashboard.fasturas'
          },
          {
            name: 'Recibos',
            icon: '',
            sref: 'dashboard.recibos'
          },
          {
            name: 'Compras',
            icon: '',
            sref: 'dashboard.compras'
          },
          {
            name: 'Gastos / Vals',
            icon: '',
            sref: ''
          },
          {
            name: 'Contrato',
            icon: '',
            sref: ''
          },
          {
            name: 'Activos Fijos',
            icon: '',
            sref: ''
          }
        ]
      },
      {
        name: 'Agenda',
        sublist:[
          {
            name: 'Agenda',
            icon: '',
            sref: ''
          },
          {
            name: 'Cadena de Produccion',
            icon: '',
            sref: ''
          },
          {
            name: 'Lista de Agenda',
            icon: '',
            sref: ''
          }
        ]
      },
      {
        name: 'Notas',
        icon: '',
        sublist:[
          {
            name: 'Notas Rapidas',
            icon: '',
            sref: ''
          }
        ]
      },
      {
        name: 'Cadena de Produccion',
        icon: '',
        sublist:[
          {
            name: 'Cadena de Produccion',
            icon: '',
            sref: ''
          }
        ]
      },
      {
        name: 'Bancos',
        icon: '',
        sublist:[
          {
            name: 'Bancos',
            icon: '',
            sref: ''
          }
        ]
      },
      {
        name: 'Archivos',
        sublist:[
          {
            name: 'Galerias / Carpetas',
            icon: '',
            sref: ''
          }
        ]
      },
      {
        name: 'Sprint',
        icon: '',
        sublist:[
          {
            name: 'listas de Actividades',
            icon: '',
            sref: ''
          },
          {
            name: 'Actividades de Cadena de Produccion',
            icon: '',
            sref: ''
          },
          {
            name: 'Estadisticas',
            icon: '',
            sref: ''
          }
        ]
      },
      {
        name: 'Personas',
        sublist:[
          {
            name: 'Clientes',
            icon: '',
            sref: 'dashboard.cliente'
          },
          {
            name: 'Empleados',
            icon: '',
            sref: 'dashboard.empleados'
          },
          {
            name: 'Prospectos',
            icon: '',
            sref: ''
          },
          {
            name: 'Proveedores',
            icon: '',
            sref: ''
          },
          {
            name: 'Nomina',
            icon: '',
            sref: ''
          },
          {
            name: 'Todos',
            icon: '',
            sref: ''
          }
        ]
      },
      {
        name: 'Configuracion',
        sublist:[
          {
            name: 'General',
            icon: '',
            sref: 'dashboard.general'
          },
          {
            name: 'Redes Sociales',
            icon: '',
            sref: ''
          },
          {
            name: 'Sucursales',
            icon: '',
            sref: ''
          },
          {
            name: 'Bodegas',
            icon: '',
            sref: ''
          },
          {
            name: 'ubicacion',
            icon: '',
            sref: 'dashboard.ubicacion'
          }
        ]
      },
      {
        name: 'Papelera',
        icon: '',
        sublist:[
          {
            name: 'Papelera',
            icon: '',
            sref: ''
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
