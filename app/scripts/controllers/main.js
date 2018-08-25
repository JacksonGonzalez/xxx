(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('MainCtrl',[
      main
    ]);
    function main() {
      var vm = this;

      vm.config={
        data: {},
        config: {}
      }
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }

})();
