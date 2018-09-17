(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:PersonaCtrl
   * @description
   * # PersonaCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('PersonaCtrl',[
      'ExtraCategoria',
      'Departamento',
      'UsuarioBlog',
      'UsuarioRol',
      '$rootScope',
      'Categoria',
      '$mdDialog',
      'Usuario',
      'Ciudad',
      'dialog',
      'Extra',
      'Search',
      'Tools',
      '$q',
      Persona
    ]);
    function Persona(
      ExtraCategoria,
      Departamento,
      UsuarioBlog,
      UsuarioRol,
      $rootScope,
      Categoria,
      $mdDialog,
      Usuario,
      Ciudad,
      dialog,
      Extra,
      Search,
      Tools,
      $q
    ) {

      var
        vm = this,
        bis = $rootScope.blog.id
      ;
      if ($rootScope.blog.blog) {
        bis = $rootScope.blog.blog.id;
      }
      // todo de La Hoja de Vida
      vm.cuerpo = {
          logo: 'images/logo.jpg',
          titulo: dialog.opciono,
          data:{
            blog: $rootScope.blog.id,
            blogapi: bis,
            creador: $rootScope.user.id,
            opciono: dialog.opciono,
            estudiossecundarios:{},
            estudiosprimarios:{}
            // ciudadnacimiento:{},
            // departamentonacimiento:{}
          },
          btn:{
            disable: true,
            close: close,
            saved: saved,
            blur: blur,
          },
          disable: true,
          estudios:[{}],
          seminarios:[
            {}
          ],
          experiencia:{
            list:[
              {
                cargo:[],
                funciones:[]
              }
            ],
            agregar: agregar,
            eliminar: eliminar,
          },
          referencia:[
            {}
          ],
          consulta:{
            searchText: '',
            selectedItem: null,
            itemChange: itemChange,
            search: getconsulta,
          },
          departamento:{
            searchText: '',
            selectedItem: null,
            search: getdepartamento,
          },
          ciudad:{
            searchText: '',
            selectedItem: null,
            search: getciudad,
          },
          direccion:{
            searchText: '',
            selectedItem: null,
            search: getciudad,
          },
          cargo:{
            transformChip: transformChip,
            onSelect: onSelect,
            onAdd: onAddcargo,
            onRemove: onRemoveCargo,
            searchText: [],
            selectedItem: [],
            querySearch: searchUsuario
          },
          funciones:{
            transformChip: transformChip,
            onSelect: onSelect,
            onAdd: onAddcargo,
            onRemove: onRemoveCargo,
            searchText: [],
            selectedItem: [],
            querySearch: searchUsuario
          }
      }
      ;
      // console.log(dialog);
      if (dialog.id) {
        listget(dialog);
      }
      if (dialog) {
        if (vm.cuerpo.titulo === 'cliente' || vm.cuerpo.titulo === 'prospecto' || vm.cuerpo.titulo === 'proveedores') {
          vm.cuerpo.disable = false;
        }
      }
      function agregar() {
        vm.cuerpo.experiencia.list.push({
          cargo:[],
          funciones:[]
        })
        ;
      }
      function eliminar(idx, obj) {
        if (vm.cuerpo.experiencia.list[idx]) {
          vm.cuerpo.experiencia.list.splice(idx, 1);
          if (vm.cuerpo.funciones.searchText[idx]) {
            vm.cuerpo.funciones.searchText.splice(idx, 1);
            vm.cuerpo.funciones.selectedItem.splice(idx, 1);
          }
          if (vm.cuerpo.cargo.searchText.splice(idx, 1)) {
            vm.cuerpo.cargo.searchText.splice(idx, 1);
            vm.cuerpo.cargo.selectedItem.splice(idx, 1);
          }
        }
      }
      function getconsulta() {
        var
          txt = vm.cuerpo.consulta.searchText,
          query = {}
        ;
        if(_.isString(txt)){
          if(txt.length){
            query.slugnombre = {
              contains: _.kebabCase(txt)
            };
          }
        }
        query.estado = 'activo';
        // console.log(query);
        return Usuario
          .getquerys(query)
          .then(function(rta){
            // console.log(rta);
            return rta.list;
          })
          ;
      }
      function itemChange(opt, ev) {
        var data = vm.cuerpo.data.nombre;
        // console.log(data);
        if (data) {
          if (data.id) {
            var confirm = $mdDialog.confirm()
            .title('Deseas Exportar los Datos del Usuario?')
            .textContent('Al Seleccionar se Traen Toda La Informacion')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Si!')
            .multiple(true)
            .cancel('No');

            $mdDialog.show(confirm)
            .then(function(ops) {
              if (ops) {
                vm.cuerpo.data = data;
                vm.cuerpo.data.blog = $rootScope.blog.id;
                vm.cuerpo.data.blogapi = bis;
                vm.cuerpo.data.opciono = dialog.opciono;
                vm.cuerpo.data.creador = $rootScope.user.id;
                getExtra(data);
              }
            })
            ;
          }
        }else {
          vm.cuerpo.data.nombre = vm.cuerpo.consulta.searchText;
        }
      }
      function getdepartamento() {
        var
          txt = vm.cuerpo.departamento.searchText,
          query = {}
        ;
        if(_.isString(txt)){
          if(txt.length){
            query.slug = {
              contains: _.kebabCase(txt)
            };
          }
        }
        return Departamento
          .getquerys(query)
          .then(function(rta){
            // console.log(rta);
            return rta.list;
          })
          ;
      }
      function getciudad(opt) {
        var
          txt = '',
          query = {}
        ;
        if (opt) {
          txt = vm.cuerpo.direccion.searchText;
        }else {
          txt = vm.cuerpo.ciudad.searchText;
        }
        if(_.isString(txt)){
          if(txt.length){
            query.slug = {
              contains: _.kebabCase(txt)
            };
          }
        }
        return Ciudad
          .getquerys(query)
          .then(function(rta){
            // console.log(rta);
            return rta.list;
          })
          ;
      }
      function transformChip(obj) {
        // console.log(obj);
      }
      function onSelect(obj) {
        // console.log(obj);
      }
      function onAddcargo(obj, opt, idx, extra) {
        // console.log(obj, opt, extra);
        var
          promises = [],
          data = {}
        ;
        if (obj.id) {
          if (dialog.id) {
            data = {
              extra: extra.id,
              categoria: obj.id,
              tipo: opt
            }
            ;
            // console.log(data);
            add(data);
          }
        }else {
          var
            promises = [],
            data = {
              titulo: obj,
              slug: _.kebabCase(obj),
              categoriaDe: opt,
              codigo: codigogenerar(),
              descripcion: opt+' del persona',
            }
          ;
          promises.push(
            Categoria.create(data)
            .then(function(rta){
              // console.log(rta);
              if (vm.cuerpo.experiencia[idx][opt]) {
                vm.cuerpo.experiencia[idx][opt][vm.cuerpo.experiencia[idx][opt].length-1]=rta;
              }

              Tools.toast(opt+' Agregado');
              if (rta.id) {
                data = {
                  extra: extra.id,
                  categoria: rta.id,
                  tipo: opt
                }
                ;
                add(data);
              }
            })
          )
          ;
        }
        function add(data) {
          if (data.extra && data.categoria && data.tipo) {
            promises.push(
              ExtraCategoria.create(data)
              .then(function(rta){
                // console.log(rta);
                return rta;
              })
            )
            ;
          }
        }
      }
      function onRemoveCargo(obj, opt, extra) {
        // console.log(obj, opt, extra);
        if (obj.id) {
          // console.log(obj);
          return ExtraCategoria
            .eliminar({
              id: obj.id
            })
            .then(function(rta){
              // console.log(rta);
            })
            ;
        }
        $q.all(promises);
      }
      function searchUsuario(idx, opt) {
        // console.log(idx, opt);
        var
          txt = '',
          query = {}
        ;
        if (opt === 'cargo') {
          txt = vm.cuerpo.cargo.searchText[idx];
          query.categoriaDe='cargo';
        }else {
          txt = vm.cuerpo.funciones.searchText[idx];
          query.categoriaDe='funciones';
        }
        if(_.isString(txt)){
          if(txt.length){
            query.slug = {
              contains: _.kebabCase(txt)
            };
          }
        }
        return Categoria
          .getquerys(query)
          .then(function(rta){
            // console.log(rta);
            return rta.list;
          })
          ;
      }
      function blur(obj, opt, idx) {
        var
          data = vm.cuerpo.data,
          clon = vm.cuerpo.clon,
          query = {}
        ;
        // console.log(data, clon);
        // console.log(dialog);
        if (data.id) {
          if (!opt) {
            if (data && clon) {
              if (data[obj] !== clon[obj]) {
                query = {
                  id: data.id
                };
                query[obj]=data[obj];
                if (obj === 'nombre' || obj === 'apellido') {
                  query.slugnombre = _.kebabCase(data.nombre);
                  query.slugapellido = _.kebabCase(data.apellido)
                }
                // console.log(query);
                saved(query);
              }
            }
          }else{
            // console.log(data, '------clon------------<<', clon);
            // console.log(data[opt]);
            var
              promises = [],
              query = {}
            ;
            if (opt === 'estudiosprimarios') {
              query = {
                id: data[opt].id,
                ops: 'editar'
              }
              ;
              query[obj] = data[opt][obj];
              if (query.id) {
                promises.push(
                  UsuarioBlog
                  .saveestudio1(query)
                  .then(function(item){
                    // console.log(item);
                    if (item[0]) {
                        Tools.toast('Actualizado Estudios Primarios ', obj);
                    }
                  })
                )
                ;
              }else {
                if (obj === 'titulo') {
                  var query ={
                    estudiosprimarios:{
                      titulo: data[opt][obj],
                      usuario: dialog.usuario.id,
                      usuarioblog: dialog.usuarioblog.id
                    }
                  }
                  ;
                  // console.log(query);
                  if (query.estudiosprimarios.titulo) {
                    promises.push(
                      UsuarioBlog
                      .saveestudio2(query)
                      .then(function(rta){
                        // console.log(rta);
                        rta = rta[0];
                        if (rta) {
                          data[opt].id = rta.id;
                          vm.cuerpo.data.estudiosprimarios.id = rta.id;
                          // console.log(vm.cuerpo.data);
                          Tools.toast('Actualizado Estudios Primarios ', obj);
                        }
                      })
                    )
                    ;
                  }
                }
              }
            }else if(opt === 'estudiossecundarios'){
              query = {
                id: data[opt].id,
                ops: 'editar'
              }
              ;
              query[obj] = data[opt][obj];
              if (query.id) {
                promises.push(
                  UsuarioBlog
                  .saveestudio2(query)
                  .then(function(item){
                    if (item[0]) {
                      // console.log(item);
                        Tools.toast('Actualizado Estudios Secundarios ', obj);
                    }
                  })
                )
                ;
              }else {
                if (obj === 'titulo') {
                  var query ={
                    estudiossecundarios:{
                      titulo: data[opt][obj],
                      usuario: dialog.usuario.id,
                      usuarioblog: dialog.usuarioblog.id
                    }
                  }
                  ;
                  // console.log(query);
                  if (query.estudiossecundarios.titulo) {
                    promises.push(
                      UsuarioBlog
                      .saveestudio1(query)
                      .then(function(rta){
                        // console.log(rta);
                        rta = rta[0];
                        if (rta) {
                          data[opt].id = rta.id;
                          vm.cuerpo.data.estudiossecundarios.id = rta.id;
                          // console.log(vm.cuerpo.data);
                          Tools.toast('Actualizado Estudios Primarios ', obj);
                        }
                      })
                    )
                    ;
                  }
                }
              }
            }else if (opt === 'estudios') {
              // console.log(vm.cuerpo.estudios, idx);
              var
                data = vm.cuerpo.estudios[idx],
                promises = [],
                query = {}
              ;
              if (data) {
                if (data.id) {
                  //Editar
                  query = {
                    estudios:[
                      {
                        id: data.id,
                        [obj]: data[obj]
                      }
                    ]
                  }
                  ;
                  // console.log(query);
                  promises.push(
                    UsuarioBlog
                    .estudio(query)
                    .then(function(rta){
                      rta = rta[0];
                      if (rta) {
                        // console.log(rta);
                        Tools.toast('Actualizado Estudios');
                      }
                    })
                  )
                  ;
                }else {
                  //Agregar
                  if (data.titulo) {
                    var
                      datos = {
                        estudios:[
                          {
                            titulo: data.titulo,
                            tipo: 'tecnico'
                          }
                        ],
                        estudiossecundarios:{
                          usuario: dialog.usuario.id,
                          usuarioblog: dialog.usuarioblog.id
                        }
                      }
                    ;
                    promises.push(
                      UsuarioBlog
                      .estudio(datos)
                      .then(function(rta) {
                        rta = rta[0];
                        if (rta) {
                          data.id = rta.id;
                          Tools.toast('Agregado Estudios');
                        }
                      })
                    )
                    ;
                  }
                }
              }

            }else if(opt === 'seminarios') {
              var
                data = vm.cuerpo.seminarios[idx],
                promises = [],
                query = {}
              ;
              if (data) {
                if (data.id) {
                  //Editar
                  query = {
                    seminarios:[
                      {
                        id: data.id,
                        [obj]: data[obj]
                      }
                    ]
                  }
                  ;
                  // console.log(query);
                  promises.push(
                    UsuarioBlog
                    .saveseminario(query)
                    .then(function(rta){
                      rta = rta[0];
                      if (rta) {
                        // console.log(rta);
                        Tools.toast('Actualizado Seminarios');
                      }
                    })
                  )
                  ;
                }else {
                  //Agregar
                  if (data.titulo) {
                    var
                      datos = {
                        seminarios:[
                          {
                            titulo: data.titulo
                          }
                        ],
                        estudiossecundarios:{
                          usuario: dialog.usuario.id,
                          usuarioblog: dialog.usuarioblog.id
                        }
                      }
                    ;
                    promises.push(
                      UsuarioBlog
                      .saveseminario(datos)
                      .then(function(rta) {
                        rta = rta[0];
                        if (rta) {
                          data.id = rta.id;
                          Tools.toast('Agregado Seminarios');
                        }
                      })
                    )
                    ;
                  }
                }
              }

            }else if (opt === 'experiencia') {
              var
                data = vm.cuerpo.experiencia.list[idx],
                promises = [],
                query = {}
              ;
              if (data) {
                if (data.id) {
                  //Editar
                  query = {
                    experiencia:[
                      {
                        id: data.id,
                        [obj]: data[obj]
                      }
                    ]
                  }
                  ;
                  // console.log(query);
                  promises.push(
                    UsuarioBlog
                    .saveexperiencia(query)
                    .then(function(rta){
                      rta = rta[0];
                      if (rta) {
                        // console.log(rta);
                        Tools.toast('Actualizado Experiencia');
                      }
                    })
                  )
                  ;
                }else {
                  if (data.titulo) {
                    //Agregar
                    var
                      datos = {
                        experiencia:[
                          {
                            titulo: data.titulo
                          }
                        ],
                        estudiossecundarios:{
                          usuario: dialog.usuario.id,
                          usuarioblog: dialog.usuarioblog.id
                        }
                      }
                    ;
                    promises.push(
                      UsuarioBlog
                      .saveexperiencia(datos)
                      .then(function(rta) {
                        rta = rta[0];
                        if (rta) {
                          data.id = rta.id;
                          Tools.toast('Agregado Experiencia');
                        }
                      })
                    )
                    ;
                  }
                }
              }
            }else if(opt === 'referencia'){
              var
                data = vm.cuerpo.referencia[idx],
                promises = [],
                query = {}
              ;
              if (data) {
                if (data.id) {
                  //Editar
                  query = {
                    referencia:[
                      {
                        id: data.id,
                        [obj]: data[obj]
                      }
                    ]
                  }
                  ;
                  // console.log(query);
                  promises.push(
                    UsuarioBlog
                    .savereferencia(query)
                    .then(function(rta){
                      rta = rta[0];
                      if (rta) {
                        // console.log(rta);
                        Tools.toast('Actualizado Experiencia');
                      }
                    })
                  )
                  ;
                }else {
                  //Agregar
                  if (data.titulo) {
                    var
                      datos = {
                        referencia:[
                          {
                            titulo: data.titulo
                          }
                        ],
                        estudiossecundarios:{
                          usuario: dialog.usuario.id,
                          usuarioblog: dialog.usuarioblog.id
                        }
                      }
                    ;
                    promises.push(
                      UsuarioBlog
                      .savereferencia(datos)
                      .then(function(rta) {
                        rta = rta[0];
                        if (rta) {
                          data.id = rta.id;
                          Tools.toast('Agregado Experiencia');
                        }
                      })
                    )
                    ;
                  }
                }
              }
            }
          }
        }
      }
      function saved(obj) {
        if (!obj) {
          var
            data = vm.cuerpo.data
          ;
          vm.cuerpo.btn.disable = false;
          // console.log(data);
          if (data.email) {
            if (!data.nombre) {
              data.nombre = vm.cuerpo.consulta.searchText;
            }
            data.username = data.username || data.email;
            data.slugnombre = _.kebabCase(data.nombre);
            data.slugapellido = _.kebabCase(data.apellido);
            data.password = data.password || 'root';
            data.confirmation = data.password || 'root';
            data.estudios = vm.cuerpo.estudios;
            data.seminarios = vm.cuerpo.seminarios;
            data.experiencia = vm.cuerpo.experiencia.list;
            data.referencia = vm.cuerpo.referencia;
            if (!data.pis) {
              delete data.id;
              if (data.nombre && data.slugnombre) {
                UsuarioBlog.saved(data)
                .then(function(rta){
                  // console.log(rta);
                  close(rta);
                  Tools.toast('Agregado');
                })
                ;
              }
            }else {
              data.opciono = dialog.opciono;
              // console.log("hey", data);
              UsuarioBlog.addrol(data, data, data.usuario, true);
            }
          }
        }else {
          UsuarioBlog.update(obj);
          Tools.toast('Actualizado');
        }
      }
      // la Venta de Los Roles
      vm.roles = {
        search:[]
      }
      ;
      if (dialog.id) {
        getRol();
      }
      function getRol() {
        var paginate = 1;
        vm.roles.search = new Search()(UsuarioRol, 'Persona',{
          where:{
            usuarioblog: dialog.usuarioblog.id,
            blog: $rootScope.blog.id,
            rol:{
              '!': null
            }
          }
        }, paginate);
      }
      console.log(vm.roles);













      // COnsulta Para Llenar las Casillas
      function listget(dialog, opt) {
        vm.cuerpo.data = dialog.usuarioblog;
        vm.cuerpo.clon = _.clone(dialog.usuarioblog);

        if (opt) {
          vm.cuerpo.data.pis=true;
        }else {
          vm.cuerpo.btn.disable = false;
        }
        var
          promises = []
        ;
        promises.push(
          Departamento
          .getquerys({
            where:{
              id: dialog.usuarioblog.departamentonacimiento
            }
          })
          .then(function(dep){
            dep = dep.list[0];
            if (dep) {
              dialog.usuarioblog.departamentonacimiento = dep;
            }
            return dep;
          })
        )
        ;
        promises.push(
          Ciudad
          .getquerys({
            where:{
              id:dialog.usuarioblog.ciudadnacimiento
            }
          })
          .then(function(cd){
            cd = cd.list[0];
            if (cd) {
              dialog.usuarioblog.ciudadnacimiento = cd;
            }
          })
        )
        ;
        promises.push(
          Ciudad
          .getquerys({
            where:{
              id: dialog.usuarioblog.ciudad
            }
          })
          .then(function(rta){
            rta = rta.list[0];
            if (rta) {
              dialog.usuarioblog.ciudad = rta;
            }
          })
        )
        ;
        getExtra(dialog);
      }
      function getExtra(dialog) {
        var
          men = {},
          promises = []
        ;
        if (dialog.usuarioblog) {
          men = dialog.usuarioblog;
          getmen();
        }else {
          men = dialog;
          promises.push(
            UsuarioBlog
            .getquerys({
              where:{
                usuario: men.id,
                blog: $rootScope.blog.id
              }
            })
            .then(function(rta){
              rta = rta.list[0];
              // console.log(rta);
              if (rta) {
                promises.push(
                  UsuarioRol
                  .getquerys({
                    usuarioblog: rta.id,
                    usuario: men.id,
                    blog: $rootScope.blog.id
                  })
                  .then(function(user){
                    user = user.list[0];
                    if (user) {
                      men = user;
                      dialog = men;
                      // console.log(dialog);
                      return listget(dialog, true);
                    }
                  })
                )
                ;
              }
              return rta;
            })
          )
          ;
        }
        function getmen() {
          vm.cuerpo.estudios = [];
          vm.cuerpo.seminarios = [];
          vm.cuerpo.experiencia.list = [];
          vm.cuerpo.referencia = [];
          // console.log(men);
          if (men.usuarioblog) {
            men = men.usuarioblog;
          }
          promises.push(
            Extra
            .getquerys({
              where:{
                usuarioblog: men.id
              }
            })
            .then(function(extra){
              extra = extra.list;
              // console.log(extra);
              if (extra) {
                men.estudios = [];
                men.experiencia = [];
                men.referencia = [];
                men.seminarios = [];
                _.forEach(extra, function(item){
                  // console.log(item);
                  // if (item.tipo === 'primarios' || item.tipo === 'secundarios') {
                  //   // if (item.fechainicio) {
                  //   //   item.fechainicio = moment(item.fechainicio).format("DD/MM/YYYY");
                  //   // }
                  //   // if (item.fechafinal) {
                  //   //   item.fechafinal = moment(item.fechafinal).format("DD/MM/YYYY");
                  //   // }
                  // }
                  if (item.tipo === 'primarios') {
                    men.estudiosprimarios = item;
                    vm.cuerpo.data.estudiosprimarios = item;
                  }else if(item.tipo === 'secundaria') {
                    // console.log(item);
                    men.estudiossecundarios = item;
                    vm.cuerpo.data.estudiossecundarios = item;
                  }else if(item.tipo === 'seminarios'){
                    men.seminarios = item;
                    vm.cuerpo.seminarios.push(item);
                  }else if (item.tipo === 'experiencia') {
                    men.experiencia.push(item);
                    // console.log(item);
                    if (item.fechainicio && item.fechafinal) {
                      item.encurso = true;
                    }
                    item.cargo = [];
                    item.funciones = [];
                    _.forEach(item.extracategoria, function(categoria){
                      promises.push(
                        Categoria
                        .getquerys({
                          where:{
                            id: categoria.categoria
                          }
                        })
                        .then(function(rta){
                          // console.log(rta);
                          rta = rta.list[0];
                          if (rta) {
                            if (categoria.tipo === 'cargo') {
                              rta.ids = categoria.id;
                              item.cargo.push(rta);
                            }else {
                              rta.ids = categoria.id;
                              item.funciones.push(rta);
                            }
                          }
                        })
                      )
                      ;
                    })
                    ;
                    vm.cuerpo.experiencia.list.push(item);
                  }else if (item.tipo === 'referencia') {
                    men.referencia.push(item);
                    vm.cuerpo.referencia.push(item);
                  }
                  else {
                    // console.log(item, vm.cuerpo);
                    if (item.fechafinal) {
                      item.encurso = true;
                    }
                    men.estudios.push(item);
                    vm.cuerpo.estudios.push(item);
                  }
                })
                ;
              }
            })
          )
          ;
        }
      }
      function codigogenerar(){
        // console.log((Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase());
        return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();
      }
      function close(rta) {
        return $mdDialog.hide(rta);
      }
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }

})();
