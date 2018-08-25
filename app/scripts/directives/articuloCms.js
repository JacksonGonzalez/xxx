
(function(){
  'use strict';

  /**
   * @ngdoc directive
   * @name wintime.directive:articuloCms
   * @description
   * # articuloCms
   */
  angular.module('dilisapApp')
    .directive('articuloCms', [
      'ArticuloBlog',
      '$rootScope',
      '$mdSidenav',
      '$mdDialog',
      'Usuario',
      'Search',
      articuloCms
    ]);
  function articuloCms(
    ArticuloBlog,
    $rootScope,
    $mdSidenav,
    $mdDialog,
    Usuario,
    Search
    ) {
    return {
      scope: {
        querylist: '=cmsData',
        config: '=?cmsConfig'
      },
      templateUrl: 'views/templates/articuloCms.html',
      restrict: 'E',
      link: function postLink(scope, ele, attrs) {
        // console.log(scope);
        var
          vm = this
        ;
        vm.cuerpo={
          search: [],
          btn:{
            editar: editar
          }
        }
        ;

        vm.cuerpo = _.merge(vm.cuerpo, scope.config || {});
        scope.articuloCms = vm.cuerpo;
        // console.log(scope);
        get();
        function get() {
          var
            paginate = 1
          ;
          vm.gets = get;
          get();
          function get() {
            vm.cuerpo.search = new Search()(ArticuloBlog, 'Articulo',scope.config.search, paginate);
          }
          // console.log(ArticuloBlog);
        }
        function editar(ev, obj) {
          // console.log(obj);
          if (!obj) {
            var obj = {};
          }
          obj.titulo = scope.config.titulo;
          obj.opciono = scope.config.opciono;
          $mdDialog.show({
            controller: 'ArticuloCtrl',
            controllerAs: 'articulo',
            templateUrl: 'views/Forms/articulo.html',
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
