(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Usuario
   * @description
   * # Usuario
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Usuario', [
      'Model',
      usuario
    ]);

  function usuario(
    Model
    ) {
      var model = new Model('usuario'); 
      model.authenticate = authenticate;
      return model;

      function authenticate(user) {
        return Modelo
          .post(Modelo.getBase() + '/authenticate', user)
          .then(function(rta) {
            return rta;
          }, function(err) {
            return err;
          });
      }
  }
})();
