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
      '$q',
      'Rol',
      'Model',
      'Extra',
      '$state',
      // 'Tools',
      'Usuario',
      'UsuarioRol',
      'ExtraCategoria',
      UsuarioBlog
    ]);

  function UsuarioBlog(
    $q,
    Rol,
    Model,
    Extra,
    $state,
    // Tools,
    Usuario,
    UsuarioRol,
    ExtraCategoria
    ) {
      var model = new Model('usuarioblog');
      model.authenticate = authenticate;
      model.saved = saved;
      model.update = update;
      model.addrol = addrol;
      model.saveestudio1 = saveestudio1;
      model.saveestudio2 = saveestudio2;
      model.estudio = estudio;
      model.saveseminario = saveseminario;
      model.saveexperiencia = saveexperiencia;
      model.savereferencia = savereferencia;

      return model;
      function authenticate(user) {
        // console.log(user);
        $state.go("dashboard");
        // TODO terminar lo del login
        // return model
        //   .post(model.getBase() + '/authenticate', user)
        //   .then(function(rta) {
        //     console.log(rta);
        //     return rta;
        //   }, function(err) {
        //     return err;
        //   });
      }
      function saved(query) {
        // console.log(query);
        if (!query.estudiosprimarios) {
          query.estudiosprimarios = {};
        }
        if (!query.estudiossecundarios) {
          query.estudiossecundarios = {};
        }
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
              // console.log(getusuario);
              if (!getusuario) {
                return addusuario(query);
              }else {
                if (getusuario.id) {
                  query.usuario = getusuario.id;
                  query.estudiossecundarios.usuario=getusuario.id;
                  query.estudiosprimarios.usuario=getusuario.id;
                  return getUsuarioBlog(query);
                }
              }
              return getusuario;
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
                    // console.log(rta);
                    if (rta.id) {
                      query.usuario = rta.id;
                      query.estudiossecundarios.usuario=query.usuario;
                      query.estudiosprimarios.usuario=query.usuario;
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
              // console.log(userblog);
              if (!userblog) {
                return addUsuarioBlog(query);
              }else {
                if (userblog.id) {
                  query.estudiossecundarios.usuarioblog=userblog.id;
                  query.estudiosprimarios.usuarioblog=userblog.id;
                  return addrol(query, userblog, query.usuario);
                }
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
              // console.log(rta);
              if (rta.id) {
                query.estudiossecundarios.usuarioblog=rta.id;
                query.estudiosprimarios.usuarioblog=rta.id;
                addrol(query, rta, query.usuario);
              }
            })
          )
          ;
        }
      }
      function addrol(query, usuario, rta, opt) {
        // console.log(query);
        if (!opt) {
          nextsave(query);
        }
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
            // console.log(rol);
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
                // console.log(rol);
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
          // console.log(data);
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
              // console.log(md);
              if (!md) {
                promises.push(
                  UsuarioRol.create(data)
                  .then(function(userol){
                    // console.log(userol);
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
        // console.log(query);
        var
          promises = []
        ;
        if (!query.id) {
          if (query.estudiosprimarios.titulo) {
            saveestudio2(query);
          }
          if (query.estudiossecundarios.titulo) {
            saveestudio1(query);
          }
          if (query.estudios.length >=1) {
            estudio(query);
          }
          if (query.seminarios.length >=1) {
            saveseminario(query);
          }
          if (query.experiencia.length >=1) {
            saveexperiencia(query);
          }
          if (query.referencia.length >=1) {
            savereferencia(query);
          }
        }else {

        }
      }
      function saveestudio1(query) {
        var
          promises = []
        ;
        if (!query.ops) {
          if (!query.estudiossecundarios.id) {
            query.estudiossecundarios.tipo = 'secundaria';
            query.estudiossecundarios.slug = _.kebabCase(query.estudiossecundarios.titulo);
            promises.push(Extra
            .create(query.estudiossecundarios)
            // .then(function(rta){
            //   // console.log(rta);
            //   // return rta;
            // })
            )
            ;
          }
        }else {
          // console.log(query);
          return promises=udExtra(query);
        }
        return $q
        .all(promises)
        ;
      }
      function saveestudio2(query) {
        var
          promises = []
        ;
        if (!query.ops) {
          if (!query.estudiosprimarios.id) {
            query.estudiosprimarios.tipo = 'primarios';
            query.estudiosprimarios.slug = _.kebabCase(query.estudiosprimarios.titulo);
            promises.push(Extra
            .create(query.estudiosprimarios)
            )
            ;
          }
        }else{
          return promises=udExtra(query);
        }
        return $q.all(promises);
      }
      function udExtra(query) {
        // console.log(query);
        var
          promises = []
        ;
        delete query.ops;
        promises.push(
          Extra.actializar(query)
          .then(function(rta){
            // console.log(rta);
            return rta;
          })
        )
        ;
        return $q.all(promises);
      }
      function estudio(query) {
        // console.log(query);
        var
          usuario = '',
          usuarioblog = '',
          promises = []
        ;
        _.forEach(query.estudios, function(item, val){
          // console.log(item);
          if (!item.id) {
            if (item.titulo) {
              usuario = query.estudiossecundarios.usuario;
              usuarioblog = query.estudiossecundarios.usuarioblog;
              item.slug = _.kebabCase(item.titulo);
              item.usuario = usuario;
              item.usuarioblog = usuarioblog;
              promises.push(Extra
              .create(item)
              // .then(function(rta){
              //   // console.log(rta);
              //   return rta;
              // })
              )
              ;
            }
          }else {
            promises.push(Extra
            .actializar(item)
            // .then(function(rta){
            //   console.log(rta);
            //   return rta;
            // })
            )
            ;
          }
        })
        ;
        return $q.all(promises);
      }
      function saveseminario(query) {
        var
          usuario = '',
          usuarioblog = '',
          promises = []
        ;
        _.forEach(query.seminarios, function(item){
          if (!item.id) {
            if (item.titulo) {
              usuario = query.estudiossecundarios.usuario;
              usuarioblog = query.estudiossecundarios.usuarioblog;
              item.slug = _.kebabCase(item.titulo);
              item.usuario = usuario;
              item.tipo = 'seminarios';
              item.usuarioblog = usuarioblog;
              promises.push(
                Extra
                .create(item)
                // .then(function(rta){
                //   // console.log(rta);
                // })
              )
              ;
            }
          }else {
            promises.push(Extra
            .actializar(item)
            )
            ;
          }
        })
        ;
        return $q.all(promises);
      }
      function saveexperiencia(query) {
        var
          usuario = '',
          usuarioblog = '',
          promises = []
        ;
        _.forEach(query.experiencia, function(item){
          if (!item.id) {
            if (item.titulo) {
              usuario = query.estudiossecundarios.usuario;
              usuarioblog = query.estudiossecundarios.usuarioblog;
              item.slug = _.kebabCase(item.titulo);
              item.usuario = usuario;
              item.tipo = 'experiencia';
              item.usuarioblog = usuarioblog;
              promises.push(
                Extra
                .create(item)
                .then(function(extra){
                  if (extra.id) {
                    var
                      data = {}
                    ;
                    _.forEach(item.cargo, function(val){
                      data = {
                        extra: extra.id,
                        categoria: val.id,
                        tipo: 'cargo'
                      }
                      ;
                      // console.log(data);
                      if (data.extra && data.categoria && data.tipo) {
                        promises.push(
                          ExtraCategoria.create(data)
                          // .then(function(rta){
                          //   // console.log(rta);
                          // })
                        )
                        ;
                      }
                    })
                    ;
                    _.forEach(item.funciones, function(val){
                      data = {
                        extra: extra.id,
                        categoria: val.id,
                        tipo: 'funciones'
                      }
                      ;
                      // console.log(data);
                      if (data.extra && data.categoria && data.tipo) {
                        promises.push(
                          ExtraCategoria.create(data)
                          // .then(function(rta){
                          //   // console.log(rta);
                          // })
                        )
                        ;
                      }
                    })
                    ;
                  }
                  return extra;
                })
              )
              ;
            }
          }else {
            promises.push(
              Extra
              .actializar(item)
              // .then(function(extra){
              // })
            )
            ;
          }
        })
        ;
        return $q.all(promises);
      }
      function savereferencia(query) {
        var
          usuario = '',
          usuarioblog = '',
          promises = []
        ;
        _.forEach(query.referencia,function(item){
          if (!item.id) {
            if (item.titulo) {
              usuario = query.estudiossecundarios.usuario;
              usuarioblog = query.estudiossecundarios.usuarioblog;
              item.slug = _.kebabCase(item.titulo);
              item.usuario = usuario;
              item.tipo = 'referencia';
              item.usuarioblog = usuarioblog;
              promises.push(
                Extra
                .create(item)
                // .then(function(rta){
                //   console.log(rta);
                // })
              )
              ;
            }
          }else {
            promises.push(
              Extra
              .actializar(item)
              // .then(function(extra){
              // })
            )
            ;
          }
        })
        ;
        return $q.all(promises);
      }
      function update(query) {
        var
          promises = []
        ;
        // console.log(query);
        if (query) {
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
  }
})();
