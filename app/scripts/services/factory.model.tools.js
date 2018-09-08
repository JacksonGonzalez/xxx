(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Tools
   * @description
   * # Tools
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .service('Tools', [
      'UsuarioBlog',
      '$rootScope',
      '$mdDialog',
      '$locale',
      '$mdToast',
      'Usuario',
      '$state',
      'Blog',
      Tools
    ]);

  function Tools(
    UsuarioBlog,
    $rootScope,
    $mdDialog,
    $locale,
    $mdToast,
    Usuario,
    $state,
    Blog
    ) {
    var
      rta = {
        BlogUrl:BlogUrl,
        toast: toast,
        dialog: dialog,
        hide: hide,
        cancel: cancel,
        answer: answer
      }
    ;
    return rta;

    function BlogUrl(urlBackend) {

      if(location.hostname.indexOf('localhost') < 0){
        $rootScope.hostname = location.hostname;
      }else{
        //$rootScope.hostname = 'rentamas.co';
        $rootScope.hostname = location.hostname.replace('localhost', '');
      }
      console.log($rootScope.hostname);

      return Blog
      .getquerys({
        where:{
          // url: $rootScope.hostname+'localhost%9000'
          // url: "condiser.localhost%3A9000"
          or: [
            {
              url: {
                contains: $rootScope.hostname
              }
            },
            {
              host: {
                contains: $rootScope.hostname
              }
            }
          ]
        }
      })
      .then(function(rta){
        console.log(rta);
        if(!rta || _.isEmpty(rta.list)){
          $state.go('dashboard');
        }
        rta = rta.list[0];
        $rootScope.blog = rta;
        if(urlBackend){
          $rootScope.urlFile = urlBackend + '/archivo';
          $rootScope.urlFiles = $rootScope.urlFile + '/download/' + rta.id + '/';
        }
        return UsuarioBlog
         .getquerys({
           where:{
             id:"5b8c5ce5f104f9dc9bc77192"
             // nombre: 'test2',
             // slugapellido: 'men'
           }
         })
         .then(function(rta){
           console.log(rta);
           rta = rta.list[0];
           $rootScope.user=rta;
           // $state.go('dashboard');
         })
         ;
        //console.log($rootScope.blog)
        return $rootScope.blog;
      })
      ;
    }
    function toast(obj) {
      $mdToast.showSimple(obj);
    }
    function dialog(query) {
      return $mdDialog.show({
        controller: query.controller,
        controllerAs: query.controllerAs,
        templateUrl: query.templateUrl,
        parent: angular.element(document.body),
        locals:{
          dialog: query.dialog
        },
        targetEvent: query.ev,
        clickOutsideToClose:true,
        fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
      })
      ;
    }
    function hide() {
      return $mdDialog.hide();
    }

    function cancel() {
      return $mdDialog.cancel();
    }

    function answer(answer) {
      return $mdDialog.hide(answer);
    }
  }
})();
