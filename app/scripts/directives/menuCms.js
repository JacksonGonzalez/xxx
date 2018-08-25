
(function(){
  'use strict';

  /**
   * @ngdoc directive
   * @name wintime.directive:menuCms
   * @description
   * # menuCms
   */
  angular.module('dilisapApp')
    .directive('menuCms', [
      menuCms
    ]);
  function menuCms(
    ) {
    return {
      scope: {
        querylist: '=cmsData',
        config: '=?cmsConfig'
      },
      templateUrl: 'views/templates/menuCms.html',
      restrict: 'E',
      link: function postLink(scope, ele, attrs) {

      }
    };
  }
})();
