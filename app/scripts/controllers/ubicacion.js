(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:UbicacionCtrl
   * @description
   * # UbicacionCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('UbicacionCtrl', [
      'Departamento',
      '$rootScope',
      '$mdDialog',
      'Barrio',
      'Ciudad',
      'dialog',
      'Pais',
      'Tools',
      '$q',
      Ubicacion
    ]);

  function Ubicacion(
    Departamento,
    $rootScope,
    $mdDialog,
    Barrio,
    Ciudad,
    dialog,
    Pais,
    Tools,
    $q
  ) {
    var
      vm = this,
      list = []
    ;
    vm.cuerpo={
      btn:{
        close: close,
        guardad: guardad,
        blurdata: blurdata,
        disable: true,
      },
      titulo: dialog.ops,
      opt: 'Agregar',
      list: [{}],
      generar: generar,
      ciudad:{
        searchText: [],
        selectedItem: null,
        search: getciudad,
      },
      departamento:{
        searchText: [],
        selectedItem: null,
        search: getdepartamento,
      },
      pais:{
        searchText: [],
        selectedItem: null,
        search: getpais,
      },
    }
    ;
    if (dialog) {
      if (dialog.id) {
        vm.cuerpo.opt = 'Editar';
        vm.cuerpo.list[0]=dialog;
        vm.cuerpo.listClone = _.clone(dialog);
        vm.cuerpo.btn.disable = false;
      }
    }
    function generar() {
      vm.cuerpo.list.push({});
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
    function getdepartamento(idx) {
      var
        txt = vm.cuerpo.departamento.searchText[idx],
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
    function getpais(idx) {
      var
        txt = vm.cuerpo.pais.searchText[idx],
        query = {}
      ;
      if(_.isString(txt)){
        if(txt.length){
          query.slug = {
            contains: _.kebabCase(txt)
          };
        }
      }
      return Pais
        .getquerys(query)
        .then(function(rta){
          // console.log(rta);
          return rta.list;
        })
        ;
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
        // console.log(data, clone);
        if (data[obj] !== clone[obj] || obj === ['tipounidad']) {
          // console.log("si");
          var query = {
            id: data.id
          }
          ;
          if (obj) {
            query[obj] = data[obj];
            // if (obj === 'ciudad') {
            //     query.ciudad = data[obj].id;
            // }
            if (obj === 'titulo') {
                query.slug = _.kebabCase(query.titulo);
            }
          }
          guardad(query, obj);
        }
      }
    }
    function guardad(opt, com) {
      // console.log(opt, com);
      var
        libro = null,
        promises = []
      ;
      if (vm.cuerpo.titulo === 'barrio') {
        libro = Barrio;
      }else if (vm.cuerpo.titulo === 'ciudad') {
        libro = Ciudad;
      }else if (vm.cuerpo.titulo === 'departamento') {
        libro = Departamento;
      }else {
        libro = Pais;
      }
      if (!opt) {
        if (libro) {
          _.forEach(vm.cuerpo.list, function(item, idx){
            if (item.titulo) {
              promises.push(
                libro.getquerys({
                  slug: _.kebabCase(item.titulo)
                })
                .then(function(rta){
                  // console.log(rta);
                  rta = rta.list[0];
                  if (!rta) {
                    var data = {
                      titulo: item.titulo,
                      slug: _.kebabCase(item.titulo),
                      descripcion: item.descripcion
                    }
                    ;
                    if (item.ciudad) {
                      data.ciudad= item.ciudad;
                    }
                    if (item.departamento) {
                      data.departamento = item.departamento;
                    }
                    if (item.pais) {
                      data.pais = item.pais;
                    }
                    // console.log(data);
                    promises.push(
                      libro.create(data)
                      .then(function(rta){
                        // console.log(rta);
                        return rta;
                      })
                    )
                    ;
                  }
                  return rta;
                })
              )
              ;
            }else {
              vm.cuerpo.list.splice(idx, 1);
            }
          })
          ;
      }
      $q
      .all(promises)
      .then(function(){
          Tools.toast('Creado '+vm.cuerpo.titulo);
          vm.cuerpo.btn.disable=false;
      })
      ;
    }else {
      console.log(opt);
      promises.push(
        libro.actializar(opt)
        .then(function(rta){
          // console.log(rta);
          if (rta.id) {
            Tools.toast('Actualizado '+com);
          }
        })
      )
      ;
    }
    }
  }
})();
