(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardTiendaCtrl
   * @description
   * # DashboardTiendaCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardTiendaCtrl',[
        'Articulo',
        'Search',
        tienda
      ]);

      function tienda(
        Articulo,
        Search
      ) {
        var
          vm = this,
          paginate = 1
        ;
        vm.cuerpo = {
          search:[]
        }
        ;
        getlist();
        function getlist() {
          vm.cuerpo.search = new Search()(Articulo, 'Articulo',{
            limit: 20,
            where:{
              tipo: 'producto'
            }
          }, paginate);
          console.log(vm.cuerpo);
        }
        this.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
    }

})();
