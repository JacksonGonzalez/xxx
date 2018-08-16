(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Ubicacion
   * @description
   * # Ubicacion
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Ubicacion', [
      'Model',
      Ubicacion
    ]);

  function Ubicacion(
    Model
    ) {
      var model = new Model('ubicacion');
      model.listar = listar;
      model.listUbicacion = [];

      return model;

      function listar() {
        return model
        .getquerys({

        })
        .then(function(rta){
          console.log(rta);
          model.listUbicacion = rta.list;
          return rta.list;
        })
        ;

        // model.create({
        //   titulo: 'c',
        //   slug: 'c',
        //   descripcion: 'posicion c'
        // })
        // .then(function(rta){
        //   console.log(rta);
        // })
      }
  }
})();
