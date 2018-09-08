(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Contrato
   * @description
   * # Contrato
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Contrato', [
      'ContratoArticulo',
      'ContratoUsuario',
      'ContratoPago',
      '$mdDialog',
      'Model',
      'Tools',
      '$q',
      Contrato
    ]);

  function Contrato(
    ContratoArticulo,
    ContratoUsuario,
    ContratoPago,
    $mdDialog,
    Model,
    Tools,
    $q
    ) {
      var model = new Model('contrato');
      model.saved = saved;
      return model;

      function saved(query) {
        // console.log(query, model);
        var
          promises = []
        ;
        promises.push(
          model.create(query)
          .then(function(rta){
            // console.log(rta);
            if (rta.id) {
              var data = {};
              _.forEach(query.producto, function(item, men){
                if (item.id) {
                  data = {
                    contrato: rta.id,
                    contratotipo: rta.tipo,
                    articulo: item.articulo.id,
                    creador: query.creador,
                    articuloblog: item.id,
                    blog: query.blog,
                    blogapi: query.blogapi,
                    cantidad: item.cantidadadquiridad,
                    tipounidad: item.tipounidad,
                    unidad: item.unidad,
                    tipo: item.tipo
                  }
                  ;
                  promises.push(
                    ContratoArticulo.create(data)
                    .then(function(val){
                      // console.log(val);
                      return val;
                    })
                   )
                  ;
                }else {
                  query.producto.splice(men, 1);
                }
              })
              ;
              if (query.usuario.id) {
                var
                  usuario = {
                    contrato: rta.id,
                    usuarioblog: query.usuario,
                    creador: query.creador,
                    rol: query.usuario.rool || "5b8c71d58e952829481aeaaf",
                    blog: query.blog,
                    blogapi: query.blogapi
                  }
                ;
                promises.push(
                  ContratoUsuario.create(usuario)
                  .then(function(cliente){
                    // console.log(cliente);
                    if (cliente.id) {
                      if (query.vendedor.id) {
                        var
                          vendedor = {
                            contrato: rta.id,
                            usuarioblog: query.vendedor,
                            creador: query.creador,
                            rol: query.vendedor.rool || "5b8c71e28e952829481aeab0",
                            blog: query.blog,
                            blogapi: query.blogapi
                          }
                        ;
                        promises.push(
                          ContratoUsuario.create(vendedor)
                          .then(function(vende){
                            // console.log(vendor);
                            return vende;
                          })
                         )
                        ;
                      }
                    }
                    return cliente;
                  })
                 )
                ;
              }
              _.forEach(query.pago, function(item){
                if (item.id) {
                  var
                    pago = {}
                  ;
                  if (item.titulo === 'Tarjeta') {
                    pago = {
                      pago: item.tipopt || "5b8d7f495f65721cdce86588",
                      valor: item.cantidad || 0,
                      vueltos: query.vueltos,
                      vueltostotal: query.vueltostotal,
                      contrato: rta.id,
                      creador: query.creador,
                      blog: query.blog,
                      blogapi: query.blogapi
                    };
                  }else {
                    pago = {
                      pago: item.id || "5b8c7523d18cac1fe032e080",
                      valor: item.cantidad || 0,
                      vueltos: query.vueltos,
                      vueltostotal: query.vueltostotal,
                      contrato: rta.id,
                      creador: query.creador,
                      blog: query.blog,
                      blogapi: query.blogapi
                    };
                  }
                  promises.push(
                    ContratoPago.create(pago)
                    .then(function(rta){
                      // console.log(rta);
                      return rta;
                    })
                   )
                  ;
                }
              })
              ;
              return $mdDialog.hide();
            }
            return rta;
          })
         )
        ;
        $q
        .all(promises)
        .then(function(rta){
          // console.log(rta);
          Tools.toast(_.capitalize(query.tipo)+" Registrada");
          return rta;
        })
        ;
      }
  }
})();
