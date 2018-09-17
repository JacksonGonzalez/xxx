(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardIngredienteCtrl
   * @description
   * # DashboardIngredienteCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardIngredienteCtrl',[
      'Actividad',
      '$mdDialog',
      'Search',
      DashboardIngrediente
    ]);
    function DashboardIngrediente(
      Actividad,
      $mdDialog,
      Search
    ) {
      var
        vm = this,
        paginate= 1
      ;
      vm.cuerpo = {
        search:[],
        btn:{
          crear
        }
      }
      ;
      get();
      function get() {
        vm.cuerpo.search = new Search()(Actividad, 'ingrediente', {}, paginate);
      }
      function crear(ev, obj) {
        if (!obj) {
          var obj = {};
          vm.cuerpo.search.itemselec = {};
        }else {
            // vm.cuerpo.search.seleccionado(obj);
            obj=vm.cuerpo.search.itemselec;
        }
        $mdDialog.show({
          controller: 'IngredienteCtrl',
          controllerAs: 'ingrediente',
          templateUrl: 'views/Forms/ingrediente.html',
          parent: angular.element(document.body),
          locals:{
            dialog:obj
          },
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          // console.log(answer);
        });
      }
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }

})();
