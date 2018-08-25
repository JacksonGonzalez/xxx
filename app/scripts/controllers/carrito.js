(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardCarritoCtrl
   * @description
   * # DashboardCarritoCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardCarritoCtrl',[
        carrito
      ]);

      function carrito(

      ) {
        var
          vm = this
        ;
        vm.cuerpo = {

        }
        ;
        this.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
    }

})();
