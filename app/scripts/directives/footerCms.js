
(function(){
  'use strict';

  /**
   * @ngdoc directive
   * @name wintime.directive:footerCms
   * @description
   * # footerCms
   */
  angular.module('dilisapApp')
    .directive('footerCms', [
      footerCms
    ]);
  function footerCms(
    ) {
    return {
      scope: {
        querylist: '=cmsData',
        config: '=?cmsConfig'
      },
      templateUrl: 'views/templates/footerCms.html',
      restrict: 'E',
      link: function postLink(scope, ele, attrs) {

      }
    };
  }
})();
