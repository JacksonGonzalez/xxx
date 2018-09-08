(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.UsuarioBlog
   * @description
   * # UsuarioBlog
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('UsuarioBlog', [
      'Rol',
      'Model',
      'Extra',
      // 'Tools',
      'Usuario',
      'UsuarioRol',
      UsuarioBlog
    ]);

  function UsuarioBlog(
    Rol,
    Model,
    Extra,
    // Tools,
    Usuario,
    UsuarioRol
    ) {
      var model = new Model('usuarioblog');
      model.saved = saved;
      model.update = update;
      return model;
      function saved(query) {
        console.log(query);
        if (!query.id) {
          var
            promises = []
          ;
            return Usuario
            .getquerys({
              where:{
                slugnombre: query.slugnombre,
                documento: query.documento
              }
            })
            .then(function(getusuario){
              getusuario = getusuario.list[0];
              console.log(getusuario);
              if (!getusuario) {
                return addusuario(query);
              }else {
                query.usuario = getusuario.id;
                return getUsuarioBlog(query);
              }
              return getusuario;
            })
            .then(function(){
              nextsave(query);
            })
          ;
        }else {
          $q.reject('Not Found Data');
        }
        function addusuario(query) {
          return Rol
            .getquerys({
              where:{
                slug: 'usuario'
              }
            })
            .then(function(rol){
              rol = rol.list[0];
              if (rol) {
                query.rol = rol.id;
                return Usuario
                .create(query)
                  .then(function(rta){
                    console.log(rta);
                    if (rta.id) {
                      query.usuario = rta.id;
                      return getUsuarioBlog(query);
                    }
                  })
                ;
              }
            })
          ;
        }
        function getUsuarioBlog(query) {
            return model
            .getquerys({
              where:{
                slugnombre: query.slugnombre,
                documento: query.documento,
                blog: query.blog
              }
            })
            .then(function(userblog){
              userblog = userblog.list[0];
              console.log(userblog);
              if (!userblog) {
                return addUsuarioBlog(query);
              }else {
                return addrol(query, userblog, query.usuario);
              }
            })
          ;
        }
        function addUsuarioBlog(query) {
          var
            promises = []
          ;
          promises.push(
            model
            .create(query)
            .then(function(rta){
              console.log(rta);
              if (rta.id) {
                addrol(query, rta, query.usuario);
              }
            })
          )
          ;
        }
        function addrol(query, usuario, rta) {
          console.log(query);
          var
            promises = []
          ;
          promises.push(
            Rol.getquerys({
              where:{
                slug: query.opciono
              }
            })
            .then(function(rol){
              rol = rol.list[0];
              console.log(rol);
              if (rol) {
                addpush(rol, usuario, query, rta);
              }else {
                return Rol
                .create({
                  titulo: query.opciono,
                  slug: _.kebabCase(query.opciono),
                  description: 'Rol '+query.opciono
                })
                .then(function(rol){
                  console.log(rol);
                  if (rol.id) {
                    addpush(rol, usuario, query, rta);
                  }
                })
                ;
              }
            })
          )
          ;
          function addpush(rol, usuario, query, rta) {
            var
              data = {
                usuario: rta,
                usuarioblog: usuario.id,
                creador: query.creador,
                rol: rol.id,
                blog: query.blog,
                slugapellido: usuario.slugapellido,
                slugnombre: usuario.slugnombre,
                documento: usuario.documento
              }
            ;
            console.log(data);
            promises.push(
              UsuarioRol.getquerys({
                where:{
                  usuarioblog: data.usuarioblog,
                  rol: data.rol,
                  blog: query.blog
                }
              })
              .then(function(md){
                md = md.list[0];
                console.log(md);
                if (!md) {
                  promises.push(
                    UsuarioRol.create(data)
                    .then(function(userol){
                      console.log(userol);
                      return userol;
                    })
                  )
                  ;
                }
              })
            )
            ;
          }
        }
        function nextsave(query) {
          console.log(query);
          if (!query.id) {
            // return Extra;
          }else {

          }
        }
      }
      function update(query) {
        var
          promises = []
        ;
        // console.log(query);
        if (query.id) {
          promises.push(
            model.actializar(query)
            .then(function(rta){
              return rta;
            })
          )
          ;
        }
      }
  }
})();
