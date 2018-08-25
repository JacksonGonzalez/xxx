(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:ShowarticuloCtrl
   * @description
   * # ShowarticuloCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('ShowarticuloCtrl',[
      Showarticulo
    ]);
    function Showarticulo() {
      var vm = this;
      
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }

})();
