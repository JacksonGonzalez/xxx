
(function(){
  'use strict';

  /**
   * @ngdoc directive
   * @name wintime.directive:searchCms
   * @description
   * # searchCms
   */
  angular.module('dilisapApp')
    .directive('searchCms', [
      searchCms
    ]);
  function searchCms(
    ) {
    return {
      scope: {
        querylist: '=cmsData',
        config: '=?cmsConfig'
      },
      templateUrl: 'views/templates/search.html',
      restrict: 'E',
      link: function postLink(scope, ele, attrs) {

      }
    };
  }
})();
