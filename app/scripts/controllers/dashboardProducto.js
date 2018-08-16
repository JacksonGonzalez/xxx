(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardProductoCtrl
   * @description
   * # DashboardProductoCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardProductoCtrl', [
      'ArticuloBlog',
      '$rootScope',
      '$mdSidenav',
      '$mdDialog',
      'Usuario',
      'Search',
      DashboardProducto
    ]);

  function DashboardProducto(
    ArticuloBlog,
    $rootScope,
    $mdSidenav,
    $mdDialog,
    Usuario,
    Search
  ) {
    var
      vm = this,
      list = []
    ;
    vm.cuerpo={
      search: [],
      btn:{
        editar: editar
      }
    }
    ;
    vm.editar = editar;
    var
      paginate = 1
    ;
    vm.gets = get;
    get();
    function get() {
      vm.cuerpo.search = new Search()(ArticuloBlog, 'Articulo',{
        tipo: 'producto',
        blog: $rootScope.blog.id,
        estado: 'activo'
      }, paginate);
      paginate+=1;
    }
    console.log(vm.cuerpo);
    // console.log(ArticuloBlog);
    function editar(ev, obj) {
      console.log(obj);
      if (!obj) {
        var obj = {};
      }
      obj.opciono = 'producto';
      $mdDialog.show({
        controller: 'ArticuloCtrl',
        controllerAs: 'articulo',
        templateUrl: 'views/Forms/articulo.html',
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
