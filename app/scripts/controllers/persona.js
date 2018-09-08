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
      'Departamento',
      'UsuarioBlog',
      '$rootScope',
      'Categoria',
      '$mdDialog',
      'Usuario',
      'Ciudad',
      'dialog',
      'Tools',
      Persona
    ]);
    function Persona(
      Departamento,
      UsuarioBlog,
      $rootScope,
      Categoria,
      $mdDialog,
      Usuario,
      Ciudad,
      dialog,
      Tools
    ) {

      var
        vm = this,
        bis = $rootScope.blog.id
      ;
      if ($rootScope.blog.blog) {
        bis = $rootScope.blog.blog.id;
      }
      vm.cuerpo = {
          logo: 'images/logo.jpg',
          titulo: dialog.opciono,
          data:{
            blog: $rootScope.blog.id,
            blogapi: bis,
            creador: $rootScope.user.id,
            opciono: dialog.opciono
            // ciudadnacimiento:{},
            // departamentonacimiento:{}
          },
          btn:{
            disable: true,
            close: close,
            saved: saved,
            blur: blur,
          },
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
      console.log(dialog);
      if (dialog.id) {
        listget(dialog);
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
        console.log(query);
        return Usuario
          .getquerys(query)
          .then(function(rta){
            console.log(rta);
            return rta.list;
          })
          ;
      }
      function itemChange(opt, ev) {
        var data = vm.cuerpo.data.nombre;
        console.log(data);
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
              }
            })
            ;
          }
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
        console.log(obj);
      }
      function onSelect(obj) {
        console.log(obj);
      }
      function onAddcargo(obj, opt, idx) {
        console.log(obj, opt);
        var
          promises = []
        ;
        if (obj.id) {
          if (dialog.id) {

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
            })
          )
          ;
        }
      }
      function onRemoveCargo() {

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
      function blur(obj) {
        console.log(obj);
        var
          data = vm.cuerpo.data,
          clon = vm.cuerpo.clon,
          query = {}
        ;
        if (data && clon) {
          if (data[obj] !== clon[obj]) {
            query = {
              id: data.id
            };
            query[obj]=data[obj];
            saved(query);
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
            delete data.id;
            data.username = data.username || data.email;
            data.slugnombre = _.kebabCase(data.nombre);
            data.slugapellido = _.kebabCase(data.apellido);
            data.password = data.password || 'root';
            data.confirmation = data.password || 'root';
            UsuarioBlog.saved(data)
            .then(function(rta){
              // console.log(rta);
              close();
              Tools.toast('Agregado');
            })
            ;
          }
        }else {
          UsuarioBlog.update(obj);
          Tools.toast('Actualizado');
        }
      }
      function listget(dialog) {
        vm.cuerpo.data = dialog.usuarioblog;
        vm.cuerpo.clon = _.clone(dialog);
        vm.cuerpo.btn.disable = false;
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
            if (dep.id) {
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
        );
      }
      function codigogenerar(){
        // console.log((Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase());
        return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();
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
