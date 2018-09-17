(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:IngredienteCtrl
   * @description
   * # IngredienteCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('IngredienteCtrl',[
      'ActividadArticulo',
      'ActividadUsuario',
      'ArticuloBlog',
      'UsuarioBlog',
      '$rootScope',
      'Actividad',
      '$mdDialog',
      'Unidad',
      'dialog',
      'Tools',
      Ingrediente
    ]);
    function Ingrediente(
      ActividadArticulo,
      ActividadUsuario,
      ArticuloBlog,
      UsuarioBlog,
      $rootScope,
      Actividad,
      $mdDialog,
      Unidad,
      dialog,
      Tools
    ) {
      var
        vm = this,
        blogs = $rootScope.blog.id;
      ;

      vm.cuerpo = {
        list:[
          {
            cantidadblur:cantidadblur,
            articulo:[
              {
                insumos:{
                  searchText:[],
                  itemChange: itemChange,
                  querySearch: querySearch
                },
                cantidadblur:cantidadblur
              }
            ],
            empleado: [],
            usuario:{
              transformChip: transformChip,
              onSelect: onSelect,
              onAdd: onAddcargo,
              onRemove: onRemoveCargo,
              searchText: '',
              selectedItem: null,
              querySearch: searchUsuario
            }
          }
        ],
        logo: 'images/logo.jpg',
        unidad:{
          blurunidad: blurunidad
        },
        generate: function() {
          vm.cuerpo.list.push(
            {
              cantidadblur:cantidadblur,
              articulo:[
                {
                  insumos:{
                    searchText:[],
                    itemChange: itemChange,
                    querySearch: querySearch
                  },
                  cantidadblur:cantidadblur
                }
              ],
              empleado:[],
              usuario:{
                transformChip: transformChip,
                onSelect: onSelect,
                onAdd: onAddcargo,
                onRemove: onRemoveCargo,
                searchText: '',
                selectedItem: null,
                querySearch: searchUsuario
              }
            }
          )
        },
        insumos:{
          searchText:[],
          itemChange: itemChange,
          querySearch: querySearch,
          generate: function(obj) {
            obj.articulo.push(
              {
                insumos:{
                  searchText:[],
                  itemChange: itemChange,
                  querySearch: querySearch
                },
                cantidadblur:cantidadblur
              }
            )
          }
        },
        btn:{
          disable: true,
          blur: blur,
          close: close,
          guardad: guardad,
          eliminar: eliminar
        }
      }
      ;
      if ($rootScope.blog.blog) {
        blogs = $rootScope.blog.blog.id;
      }
      if (dialog) {
        if (dialog.id) {
          if (dialog.fechainicia) {
            dialog.fechainicia = new Date(dialog.fechainicia);
          }
          vm.cuerpo.list[0]=dialog;
          vm.cuerpo.clone = _.clone(dialog);
          getlist(dialog);
        }
      }
      // console.log(dialog);
      function itemChange(obj, idx) {
        // console.log(obj, idx);
        if (obj.titulo) {
          obj.tipounidad = obj.tipounidad || obj.titulo.tipounidad;
          obj.unidad = obj.unidad || obj.titulo.unidad;
          obj.cantidad = obj.cantidad || 1;
          obj.preciocompra = obj.preciocompra || obj.titulo.preciocompra
          blurunidad(obj);
          if (dialog.id) {
            if (!obj.id) {
              var
                data = {
                  articulo:[
                    {
                      articulo: obj.titulo.articulo,
                      titulo: obj.titulo,
                      articuloblog: obj.titulo.id,
                      actividad: dialog.id,
                      cantidad: obj.cantidad,
                      tipounidad: obj.tipounidad,
                      unidad: obj.unidad,
                      preciocompra: obj.preciocompra
                    }
                  ],
                  descripcion: obj.descripcion || 'articulo',
                  creador: $rootScope.user.id,
                  blog: $rootScope.blog.id,
                  blog: blogs,
                 }
                ;
                Actividad
                .articulo(data, dialog)
                .then(function(rta){
                  // console.log(rta);
                  if (rta.id) {
                    Tools.toast("Agregado Ingrediente");
                  }
                })
                ;
            }
          }else {
            suma();
          }
          // console.log(obj, Unidad);
        }
      }
      function blurunidad(obj) {
        if (obj) {
          var
            idx = _.findIndex(Unidad.list, [ 'tipounidad', obj.tipounidad])
          ;
          if (idx >-1) {
              // console.log(Unidad.list[idx]);
              obj.lisunidad = Unidad.list[idx].unidad;
          }
        }
      }
      function querySearch(obj, idx) {
        // console.log(obj);
        var
          txt = obj.insumos.searchText[idx],
          query = {}
        ;
        if(_.isString(txt)){
          if(txt.length){
            query.slug = {
              contains: _.kebabCase(txt)
            };
          }
        }
        query.estado = 'activo';
        query.tipo = ['materiaprima', 'materiprocesada'];
        return ArticuloBlog
          .getquerys(query)
          .then(function(rta){
            // console.log(rta);
            return rta.list;
          })
          ;
      }
      function cantidadblur(obj, obj2, idx, cantidad, opt) {
        // console.log(obj, obj2, idx);
        suma();
        if (dialog) {
          if (dialog.id) {
            if (cantidad) {
              vm.cuerpo.btn.blur(obj, idx, cantidad, opt);
            }
          }
        }
      }
      function transformChip(obj) {

      }
      function onSelect(obj) {

      }
      function onAddcargo(obj) {
        if (obj) {
          if (dialog.id) {
            var
              data ={
                empleado:[
                  {
                    usuario: obj.usuario,
                    id: obj.id,
                    usuarioblog: obj.id
                  }
                ],
                creador: $rootScope.user.id,
                blog: $rootScope.blog.id,
                blogapi: blogs
              }
              ;
              // console.log(data, obj);
              return Actividad
              .empleado(data, dialog)
              .then(function(rta){
                // console.log(rta);
              })
              ;
            ;
          }
        }
      }
      function onRemoveCargo(obj) {
        // console.log(obj);
        if (obj) {
          // console.log(obj);
          if (obj.id) {
            // console.log(ActividadUsuario);
            return Actividad
            .delete('/actividadusuario/'+obj.id, {
              id: obj.id
            })
              .then(function(rta){
                // console.log(rta);
                if (rta.id) {
                  Tools.toast("Eliminado Empleado");
                }
              })
              ;
          }
        }
      }
      function searchUsuario(obj) {
        // console.log(obj);
        var
          txt = obj.usuario.searchText,
          query = {}
        ;
        if(_.isString(txt)){
          if(txt.length){
            query.slugnombre = {
              contains: _.kebabCase(txt)
            };
          }
        }
        return UsuarioBlog
          .getquerys(query)
          .then(function(rta){
            // console.log(rta);
            return rta.list;
          })
          ;
      }
      function suma(opt, obj) {
        var
          suma = 0,
          total = 0,
          totalpr= 0
        ;
        _.forEach(vm.cuerpo.list, function(item){
          _.forEach(item.articulo, function(key){
            if (key.titulo) {
              if (key.titulo.id) {
                if (key.preciocompra && key.cantidad) {
                  suma+=key.cantidad*key.titulo.preciocompra;
                  key.preciocompra = suma;
                  total+= suma;
                  // console.log(total);
                  if (opt && obj) {
                    var
                      data = {
                        id: obj.id,
                        cantidad: obj.cantidad,
                        preciocompra: obj.preciocompra
                      }
                    ;
                    // console.log(data);
                    actuArt(data);
                  }
                }
              }
            }
          })
          ;
          // console.log(item);
          item.costoinsumos = total;
          if (item.costomanual) {
            totalpr+=item.costomanual;
          }
          if (item.costoinsumos) {
            totalpr+=item.costoinsumos;
          }
          item.costototal=totalpr;
          if (opt) {
            var
              data = {
                id: dialog.id,
                costomanual: item.costomanual,
                costoinsumos: item.costoinsumos,
                costototal: totalpr
              }
            ;
            // console.log(data);
            guardad(data);
          }
        })
        ;
      }
      function blur(obj, idx, opt, en) {
        // console.log(obj, idx, opt, en);
        if (dialog) {
          if (dialog.id) {
            var
              data1 = vm.cuerpo.list[0],
              data2 = vm.cuerpo.clone
            ;
            // console.log(data2);
            if (!en) {
              if (data1[opt] !== data2[opt]) {
                // console.log("no son");
                var data = {
                  id: dialog.id
                }
                ;
                data[opt]=data1[opt];
                if (opt === 'finalizo') {
                  desMateria(obj);
                }
                if (opt === 'titulo') {
                  data.slug = _.kebabCase(data.titulo);
                }
                if (opt === 'cantidad' || opt === 'preciocompra' || opt === 'titulo') {
                  suma(true);
                }
                guardad(data);
              }
            }else {
              if (en === 'articulo') {
                var
                  data = {
                    id: obj.id
                  }
                  ;
                  data[opt] = obj[opt];
                  if (data.id) {
                    if (opt === 'titulo' || opt === 'cantidad' || opt === 'preciocompra') {
                      suma(true, obj);
                    }else {
                      actuArt(data);

                    }
                  }
                ;
              }
            }
          }
        }
      }
      function actuArt(data) {
        Actividad
        .articulo(data, '', true)
        .then(function(rta){
          // console.log(rta);
          rta = rta[0];
          if (rta.id) {
            Tools.toast("Actualizado Ingrediente");
          }
        })
        ;
      }
      function desMateria(obj) {
        console.log(obj);
        var
          promises = []
        ;
        _.forEach(obj.articulo, function(item){
          if (item.titulo) {
            if (item.titulo.id) {
              console.log(item);
              var data = {
                tipounidad: item.tipounidad,
                unidad: item.unidad,
                dbunidad: item.mas.articuloblog.unidad,
                cantidad: item.cantidad,
                lisunidad: item.lisunidad
              }
              ;
              Unidad.conversion(data)
              .then(function(rta){
                console.log(rta);
                if (rta) {
                }
              })
              ;
            }
          }
        })
        ;
      }
      function guardad(obj) {
        // console.log(vm.cuerpo.list);
        var
          data = vm.cuerpo.list,
          promises = []
        ;
        if (!obj) {
          _.forEach(data, function(item, val){
            // console.log(item);
            if (item.titulo) {
              item.creador = $rootScope.user.id;
              item.blog = $rootScope.blog.id;
              item.tipo = 'ingrediente';
              item.slug = _.kebabCase(item.titulo);
              item.blogapi = blogs;
              promises.push(
                Actividad
                .saved(item)
                .then(function(rta){
                  // console.log(rta);
                  if (rta) {
                    vm.cuerpo.btn.disable = false;
                    Tools.toast("Agregar Receta");
                    close();
                  }
                  return rta;
                })
              )
              ;
            }else {
              data.splice(val, 1);
            }
          })
          ;
        }else {
          // console.log(obj);
          promises.push(
            Actividad.updates(obj)
            .then(function(rta){
              // console.log(rta);
              rta = rta[0];
              if (rta.id) {
                Tools.toast("Actualizado Informacion");
              }
              return rta;
            })
          )
        }
      }
      function eliminar(obj, idx, opt, prin) {
        // console.log(print);
        if (opt === 'articulo') {
          return ActividadArticulo
          .delete('/actividadarticulo/'+obj.id,{
            id: obj.id
          })
          .then(function(rta){
            // console.log(rta);
            if (rta.id) {
              if (prin.articulo[idx]) {
                prin.articulo.splice(idx, 1);
                Tools.toast("Eliminado Ingrediente");
                suma(true);
              }
            }
          })
          ;
        }
      }
      function getlist(dialog) {
        dialog.empleado = [];
        dialog.articulo = [];
        vm.cuerpo.btn.disable = false;
        var
          promises = []
        ;
        promises.push(
          ActividadArticulo
          .getquerys({
            actividad: dialog.id
          })
          .then(function(rta){
            // console.log(rta);
            rta = rta.list;
            var data = {};
            _.forEach(rta, function(item){
              // console.log(item);
              if (item.articuloblog) {
                data = {
                  id: item.id,
                  titulo: item.articuloblog,
                  cantidad: item.cantidad,
                  tipounidad: item.tipounidad,
                  unidad: item.unidad,
                  preciocompra: item.preciocompra,
                  mas: item,
                  insumos:{
                    searchText:[],
                    itemChange: itemChange,
                    querySearch: querySearch
                  },
                  cantidadblur:cantidadblur
                }
                ;
                itemChange(data);
                dialog.articulo.push(data);
              }
            })
            ;
          })
        )
        ;
        promises.push(
          ActividadUsuario
          .getquerys({
            actividad: dialog.id
          })
          .then(function(rta){
            // console.log(rta);
            rta = rta.list;
            var
              data = {},
              data2 = {}
            ;
             data2 = {
               transformChip: transformChip,
               onSelect: onSelect,
               onAdd: onAddcargo,
               onRemove: onRemoveCargo,
               searchText: '',
               selectedItem: null,
               querySearch: searchUsuario
             };
             dialog.usuario = data2;
             dialog.unidad={
               blurunidad: blurunidad
             }
             dialog.cantidadblur=cantidadblur;
            _.forEach(rta, function(item){
              if (item.usuarioblog) {
                data = {
                  id: item.id,
                  nombre: item.usuarioblog.nombre,
                  mas: item
                }
                dialog.empleado.push(data);
              }
            })
            ;
          })
        )
        ;
      }
      function close() {
        return $mdDialog.cancel();
      }
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }

})();
