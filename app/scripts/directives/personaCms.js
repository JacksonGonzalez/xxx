
(function(){
  'use strict';

  /**
   * @ngdoc directive
   * @name wintime.directive:personaCms
   * @description
   * # personaCms
   */
  angular.module('dilisapApp')
    .directive('personaCms', [
      'UsuarioRol',
      '$rootScope',
      '$mdDialog',
      'Search',
      'Rol',
      personaCms
    ]);
  function personaCms(
    UsuarioRol,
    $rootScope,
    $mdDialog,
    Search,
    Rol
    ) {
    return {
      scope: {
        querylist: '=cmsData',
        config: '=?cmsConfig'
      },
      templateUrl: 'views/templates/personaCms.html',
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
        scope.personaCms = vm.cuerpo;
        getlist();
        function getlist() {
          if (scope.config.search.where.rol) {
            return Rol
              .getquerys({
                where:{
                  slug: scope.config.search.where.rol
                }
              })
              .then(function(rta){
                // console.log(rta);
                rta = rta.list[0];
                if (rta) {
                  scope.config.search.where.rol= rta.id;
                  list();
                }
              })
              ;
          }else {
            list();
          }
          function list() {
            vm.cuerpo.search = new Search()(UsuarioRol, scope.config.opciono,scope.config.search,paginate, 'usuariorol');
          }
        }

        function crear(ev, obj) {
          if (!obj) {
            var obj = {};
            vm.cuerpo.search.itemselec = {};
          }else {
              // vm.cuerpo.search.seleccionado(obj);
              obj=vm.cuerpo.search.itemselec;
          }
          // console.log(obj);
          obj.opciono = scope.config.opciono ;

          $mdDialog.show({
            controller: 'PersonaCtrl',
            controllerAs: 'persona',
            templateUrl: 'views/Forms/persona.html',
            parent: angular.element(document.body),
            locals:{
              dialog:obj
            },
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
          })
          .then(function(answer) {
            // console.log(answer);
          });
        }
      }
    };
  }
})();
