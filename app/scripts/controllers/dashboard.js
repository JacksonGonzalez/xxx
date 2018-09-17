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
      // {
      //   name: 'Tienda',
      //   icon: '',
      //   sublist:[
      //     {
      //       name: 'Ver Tienda',
      //       sref: ''
      //     },
      //     {
      //       name: 'Configuracion',
      //       sref: ''
      //     }
      //   ]
      // },
      {
        name: 'Inventario',
        disable: true,
        icon: 'application',
        sublist:[
          {
            name: 'Producto',
            icon: '',
            disable: true,
            sref: 'dashboard.producto'
          },
          {
            name: 'Materias Primas',
            icon: '',
            disable: true,
            sref: 'dashboard.materiasprimas'
          },
          {
            name: 'Materias Procesadas',
            icon: '',
            disable: true,
            sref: 'dashboard.materiaprocesada'
          },
          {
            name: 'Servicios',
            icon: '',
            disable: true,
            sref: 'dashboard.servicios'
          },
          {
            name: 'Bodegas',
            icon: '',
            disable: true,
            sref: 'dashboard.bodegas'
          },
          {
            name: 'Historial',
            icon: '',
            disable: true,
            sref: 'dashboard.historial'
          }
        ],
      },
      {
        name: 'Administracion Contable',
        disable: true,
        sublist:[
          {
            name: 'Planes de Administracion',
            icon: '',
            disable: false,
            sref: ''
          },
          {
            name: 'Contabilidad',
            icon: '',
            disable: false,
            sref: ''
          },
          {
            name: 'Estadisticas',
            icon: '',
            disable: false,
            sref: ''
          }
        ]
      },
      {
        name: 'Caja',
        disable: true,
        sublist:[
          {
            name: 'Factura',
            icon: '',
            disable: true,
            sref: 'dashboard.fasturas'
          },
          {
            name: 'Recibos',
            icon: '',
            disable: true,
            sref: 'dashboard.recibos'
          },
          {
            name: 'Compras',
            icon: '',
            disable: true,
            sref: 'dashboard.compras'
          },
          {
            name: 'Gastos / Vals',
            icon: '',
            disable: false,
            sref: ''
          },
          {
            name: 'Contrato',
            icon: '',
            disable: false,
            sref: ''
          },
          {
            name: 'Activos Fijos',
            icon: '',
            disable: false,
            sref: ''
          }
        ]
      },
      // {
      //   name: 'Agenda',
      //   sublist:[
      //     {
      //       name: 'Agenda',
      //       icon: '',
      //       sref: ''
      //     },
      //     {
      //       name: 'Cadena de Produccion',
      //       icon: '',
      //       sref: ''
      //     },
      //     {
      //       name: 'Lista de Agenda',
      //       icon: '',
      //       sref: ''
      //     }
      //   ]
      // },
      // {
      //   name: 'Notas',
      //   icon: '',
      //   sublist:[
      //     {
      //       name: 'Notas Rapidas',
      //       icon: '',
      //       sref: ''
      //     }
      //   ]
      // },
      {
        name: 'Cadena de Produccion',
        icon: '',
        disable: true,
        sublist:[
          {
            name: 'Ingrediente de Produccion',
            icon: '',
            sref: 'dashboard.ingrediente',
            disable: true
          }
          // {
          //   name: 'Cadena de Produccion',
          //   icon: '',
          //   sref: ''
          // }
        ]
      },
      // {
      //   name: 'Bancos',
      //   icon: '',
      //   sublist:[
      //     {
      //       name: 'Bancos',
      //       icon: '',
      //       sref: ''
      //     }
      //   ]
      // },
      // {
      //   name: 'Archivos',
      //   sublist:[
      //     {
      //       name: 'Galerias / Carpetas',
      //       icon: '',
      //       sref: ''
      //     }
      //   ]
      // },
      // {
      //   name: 'Sprint',
      //   icon: '',
      //   sublist:[
      //     {
      //       name: 'listas de Actividades',
      //       icon: '',
      //       sref: ''
      //     },
      //     {
      //       name: 'Actividades de Cadena de Produccion',
      //       icon: '',
      //       sref: ''
      //     },
      //     {
      //       name: 'Estadisticas',
      //       icon: '',
               // disable: false,
      //       sref: ''
      //     }
      //   ]
      // },
      {
        name: 'Recusos Humanos',
        disable: true,
        sublist:[
          {
            name: 'Clientes',
            icon: '',
            disable: true,
            sref: 'dashboard.cliente'
          },
          {
            name: 'Empleados',
            icon: '',
            disable: true,
            sref: 'dashboard.empleados'
          },
          {
            name: 'Prospectos',
            icon: '',
            disable: true,
            sref: 'dashboard.prospectos'
          },
          {
            name: 'Proveedores',
            icon: '',
            disable: true,
            sref: 'dashboard.proveedores'
          }
          // {
          //   name: 'Todos',
          //   icon: '',
          //   sref: ''
          // }
        ]
      },
      {
        name: 'Configuracion',
        disable: true,
        sublist:[
          {
            name: 'General',
            icon: '',
            disable: true,
            sref: 'dashboard.general'
          },
          {
            name: 'Redes Sociales',
            icon: '',
            disable: false,
            sref: ''
          },
          {
            name: 'Sucursales',
            icon: '',
            disable: false,
            sref: ''
          },
          {
            name: 'Bodegas',
            icon: '',
            disable: false,
            sref: ''
          },
          {
            name: 'ubicacion',
            icon: '',
            disable: true,
            sref: 'dashboard.ubicacion'
          }
        ]
      },
      {
        name: 'Papelera',
        icon: '',
        disable: true,
        sublist:[
          {
            name: 'Papelera',
            icon: '',
            disable: false,
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
