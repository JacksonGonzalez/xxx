(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:LoginCtrl
   * @description
   * # LoginCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('LoginCtrl', [
      '$state',
      'Tools',
      Login
    ]);

  function Login(
    $state,
    Tools
  ) {
    var
      vm = this
    ;

    vm.cuerpo = {
      data:{},
      btn:{
        iniciar: iniciar
      }
    }
    ;

    function iniciar() {
      var data = vm.cuerpo.data;
      console.log(data);
      if (data.username && data.password) {
        $state.go("dashboard",{
          token: '12312njkahjkdhas'
        });
      }else {
        Tools.open.toast('Error en Iniciar');
      }
    }
  }
})();
