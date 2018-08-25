(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardInformacionCtrl
   * @description
   * # DashboardInformacionCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardInformacionCtrl',[
        informacion
      ]);

      function informacion(

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
