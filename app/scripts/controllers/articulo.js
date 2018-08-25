(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:ArticuloCtrl
   * @description
   * # ArticuloCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('ArticuloCtrl', [
      'ArticuloPrecio',
      'ArticuloBlog',
      '$stateParams',
      '$rootScope',
      '$mdDialog',
      'Ubicacion',
      'Articulo',
      'Unidad',
      'Ciudad',
      'Barrio',
      'dialog',
      'Tools',
      '$q',
      ArticuloCtrl
    ]);

  function ArticuloCtrl(
    ArticuloPrecio,
    ArticuloBlog,
    $stateParams,
    $rootScope,
    $mdDialog,
    Ubicacion,
    Articulo,
    Unidad,
    Ciudad,
    Barrio,
    dialog,
    Tools,
    $q
  ) {
    var
      vm = this,
      list = []
    ;
    // console.log(dialog, $stateParams);
    vm.cuerpo={
      btn:{
        close: close,
        guardad: guardad,
        blurdata: blurdata,
        disable: true,
      },
      titulo: dialog.titulo,
      opt: 'Agregar',
      generar: generar,
      list:[{
        listipodeunidad: Unidad.list,
        codigo: codigogenerar(),
        tipo: dialog.opciono,
        estado: 'inactivo',
        blog: $rootScope.blog.id
      }],
      listClone: {},
      unidad:{
        blurunidad: blurunidad
      },
      tinymce:{
        opts:{
          setup: function(editor){
            editor.on('blur', function(ev){
              // console.log(ev)
              console.log("hey");
              // if (vm.data.id && id) {
              //   // Tools.open.toast('Actualizado');
              //   return savePartial('contenido');
              // }
            });
          }
        }
      },
      ciudad:{
        searchText: [],
        selectedItem: null,
        search: getciudad,
      },
      barrio:{
        searchText: [],
        selectedItem: null,
        search: getbarrio,
      },
      ubicacion:{
        list: Ubicacion.listUbicacion
      }
    }
    ;
    // console.log(vm.cuerpo, Ubicacion);
    getubicacion();
    if (dialog) {
      if (dialog.id) {
        vm.cuerpo.opt = 'Editar';
        dialog.listipodeunidad= Unidad.list;
        vm.cuerpo.list[0]=dialog;
        vm.cuerpo.listClone = _.clone(dialog);
        vm.cuerpo.btn.disable = false;
        blurunidad(dialog);
      }
    }
    function getubicacion() {
      return Ubicacion
        .listar()
        .then(function(rta){
          // console.log(rta);
          vm.cuerpo.ubicacion.list = rta;
        });
    }
    function generar() {
      vm.cuerpo.list.push({
        listipodeunidad: Unidad.list,
        codigo: codigogenerar(),
        tipo: dialog.opciono,
        estado: 'inactivo',
      });
    }
    function getciudad(idx) {
      var
        txt = vm.cuerpo.ciudad.searchText[idx],
        query = {}
      ;
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
    function getbarrio(idx) {
      var
        txt = vm.cuerpo.barrio.searchText[idx],
        query = {}
      ;
      if(_.isString(txt)){
        if(txt.length){
          query.slug = {
            contains: _.kebabCase(txt)
          };
        }
      }
      return Barrio
        .getquerys(query)
        .then(function(rta){
          // console.log(rta);
          return rta.list;
        })
        ;
    }
    function blurunidad(obj) {
      if (obj) {
        // console.log(obj);
        if (obj.tipounidad) {
          var idx = _.findIndex(obj.listipodeunidad, ['tipounidad', obj.tipounidad]);
          // console.log(idx);
          if (idx >-1) {
            obj.lisunidad = obj.listipodeunidad[idx].unidad;
          }
        }
      }
    }
    function close() {
      return $mdDialog.cancel();
    }
    function blurdata(obj) {
      // console.log(obj, vm.cuerpo.list[0], vm.cuerpo.listClone);
      if (dialog.id) {
        var
          data = vm.cuerpo.list[0],
          clone = vm.cuerpo.listClone
        ;
        if (data[obj] !== clone[obj] || obj === ['tipounidad']) {
          // console.log("si");
          var query = {
            id: data.id
          }
          ;
          if (obj) {
            query[obj]= data[obj];
          }
          if (obj === 'titulo') {
              query.slug = _.kebabCase(query.titulo);
          }
          articuloupdate(query, obj);
        }
      }
    }
    // console.log($rootScope);
    function guardad(obj) {
      vm.cuerpo.btn.disable = false;
      // console.log(vm.cuerpo.list, $rootScope);
      var promises = [], data;
      _.forEach(vm.cuerpo.list, function(item, idx){
        if (!item.id) {
          if (item.titulo) {
            if ($rootScope.blog.blogapi) {
              item.blogapi = $rootScope.blog.blogapi.id;
            }else {
              item.blogapi = $rootScope.blog.id;
            }
            item.tipounidad = item.tipounidad;
            item.creador = $rootScope.user.id;
            item.slug = _.kebabCase(item.titulo);

            // console.log(item);
            promises.push(Articulo
            .getquerys({
              where:{
                slug: item.slug
              }
            })
            .then(function(rta){
              // console.log(rta);
              rta = rta.list[0];
              if (!rta) {
                return createarticulo(item);
              }else {
                return createdArt(rta, item);
              }
            })
            )
            ;
          }else {
            vm.cuerpo.list.splice(idx, 1);
          }
        }else {
          return articuloupdate(item);
        }
      })
      ;
      $q
      .all(promises)
      .then(function(){
        Tools.toast('Creado Producto');
      })
      ;
    }
    function articuloupdate(obj, item) {
      // console.log(obj);
      var
        promises = []
      ;
      promises.push(
        ArticuloBlog
        .actializar(obj)
        .then(function(rta){
          // console.log(rta);
          Tools.toast('Actualizado Producto "'+item+'"');
          return rta;
        })
      )
      ;
    }
    function createarticulo(item) {
      var promises = [];
      promises.push(
        Articulo.create(item)
        .then(function(rta){
          // console.log(rta);
          createdArt(rta, item);
          return rta;
        }, function(err) {
          console.error(err);
          return err;
        })
      )
      ;
    }
    function createdArt(rta, item) {
      var promises = [];
      if (rta.id) {
        promises.push(
          ArticuloBlog
          .getquerys({
          slug: item.slug,
          blog: $rootScope.blog.blog
        })
        .then(function(em){
          // console.log(em);
          em = em.list[0];
          if (!em) {
            item.articulo = rta.id;
            return createarticuloblog(item);
          }
          return rta;
        }, function(err) {
          console.error(err);
          return err;
        })
        )
        ;
      }
    }
    function createarticuloblog(item) {
      // console.log(item);
      var promises = [];
      promises.push(
        ArticuloBlog
        .create(item)
        // .then(function(rta){
        //   console.log(rta);
        //   return rta;
        // })
      )
      ;
    }
    function createubicacion(item, rta) {
      var promises = [];
      promises.push(
        Ubicacion.create({

        })
      )
      ;

    }
    function codigogenerar(){
      // console.log((Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase());
      return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();
    }

  }
})();
