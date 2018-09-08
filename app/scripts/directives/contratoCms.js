
(function(){
  'use strict';

  /**
   * @ngdoc directive
   * @name wintime.directive:contratoCms
   * @description
   * # contratoCms
   */
  angular.module('dilisapApp')
    .directive('contratoCms', [
      '$rootScope',
      '$mdDialog',
      'Contrato',
      'Search',
      contratoCms
    ]);
  function contratoCms(
    $rootScope,
    $mdDialog,
    Contrato,
    Search
    ) {
    return {
      scope: {
        querylist: '=cmsData',
        config: '=?cmsConfig'
      },
      templateUrl: 'views/templates/contratoCms.html',
      restrict: 'E',
      link: function postLink(scope, ele, attrs) {
        var
          vm = this,
          paginate = 1
        ;
        // console.log(scope);
        vm.cuerpo = {
          search: [],
          btn:{
            crear: crear
          }
        }
        ;
        vm.cuerpo = _.merge(vm.cuerpo, scope.config || {});
        scope.contratoCms = vm.cuerpo;
        getlist();
        function getlist() {
          vm.cuerpo.search = new Search()(Contrato, 'contrato',scope.config.search,paginate);
          // console.log(vm.cuerpo.search);
        }

        function crear(ev, obj) {
          if (!obj) {
            var obj = {};
            vm.cuerpo.search.itemselec = {};
          }else {
              vm.cuerpo.search.seleccionado(obj);
              obj=vm.cuerpo.search.itemselec;
          }
          // console.log(obj);
          obj.opciono = scope.config.opciono ;
          if (obj.opciono === 'compra') {
            obj.disable=true;
          }
          $mdDialog.show({
            controller: 'ContratoCtrl',
            controllerAs: 'contrato',
            templateUrl: 'views/Forms/contrato.html',
            parent: angular.element(document.body),
            locals:{
              dialog:obj
            },
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
          })
          .then(function(answer) {

          });
        }

      }
    };
  }
})();
