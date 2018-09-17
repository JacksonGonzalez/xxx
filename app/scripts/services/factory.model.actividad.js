(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Actividad
   * @description
   * # Actividad
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Actividad', [
      'ActividadArticulo',
      'ActividadUsuario',
      'Model',
      '$q',
      Actividad
    ]);

  function Actividad(
    ActividadArticulo,
    ActividadUsuario,
    Model,
    $q
    ) {
      var model = new Model('actividad');
      model.saved = saved;
      model.updates = updates;
      model.articulo = articulo;
      model.empleado = empleado;
      return model;

      function saved(query) {
        var
          promises = []
        ;
        console.log(query);
        delete query.cantidadblur;
        delete query.usuario;
        promises.push(
          model.create(query)
          .then(function(rta){
            console.log(rta);
            if (rta.id) {
              articulo(query, rta);
              empleado(query, rta);
            }
            return rta;
          })
        )
        ;
        return $q.all(promises);
      }
      function articulo(query, rta, opt) {
        var
          data = {},
          promises = []
        ;
        if (!opt) {
          _.forEach(query.articulo, function(item) {
            // console.log(item);
            if (item.titulo) {
              if (item.titulo.id) {
                data = {
                  articulo: item.titulo.articulo,
                  articuloblog: item.titulo.id,
                  actividad: rta.id,
                  descripcion: query.descripcion,
                  creador: query.creador,
                  blog: query.blog,
                  blog: query.blogapi,
                  cantidad: item.cantidad,
                  tipounidad: item.tipounidad,
                  unidad: item.unidad,
                  preciocompra: item.preciocompra
                }
                // console.log(data);
                if (data.articuloblog && data.actividad) {
                  // console.log(data);
                  promises.push(
                    ActividadArticulo
                    .create(data)
                    .then(function(rta){
                      // console.log(rta);
                      return rta
                    })
                  )
                  ;
                }
              }
            }
          })
          ;
        }else {
          console.log(query);
          promises.push(
            ActividadArticulo
            .actializar(query)
            .then(function(rta){
              console.log(rta);
              return rta;
            })
          )
          ;
        }
        return $q.all(promises);
      }
      function empleado(query, rta, opt) {
        var
          data = {},
          promises = []
        ;
        if (!opt) {
          _.forEach(query.empleado, function(item){
            if (item.id) {
              data = {
                actividad: rta.id,
                usuario: item.usuario,
                usuarioblog: item.id,
                creador: query.creador,
                descripcion: query.descripcion || 'Empleado',
                blog: query.blog,
                blogapi: query.blogapi
              }
              ;
              // console.log(data);
              if (data.actividad && data.usuarioblog) {
                promises.push(
                  ActividadUsuario
                  .create(data)
                  .then(function(rta){
                    // console.log(rta);
                    return rta;
                  })
                )
                ;
              }
            }
          })
          ;
        }else {

        }
        return $q.all(promises);
      }
      function updates(query) {
        // console.log(query);
        var
          promises = []
        ;
        promises.push(
          model
          .actializar(query)
          .then(function(rta){
            // console.log(rta);
            return rta;
          })
        )
        ;
        return $q.all(promises);
      }
  }
})();
