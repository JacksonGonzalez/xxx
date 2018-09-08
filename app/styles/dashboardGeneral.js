(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardGeneralCtrl
   * @description
   * # DashboardGeneralCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardGeneralCtrl', [
      'Departamento',
      '$rootScope',
      'Ciudad',
      'Search',
      'Barrio',
      'Pais',
      'Blog',
      DashboardGeneral
    ]);

  function DashboardGeneral(
    Departamento,
    $rootScope,
    Ciudad,
    Search,
    Barrio,
    Pais,
    Blog
  ) {
    var
      vm = this,
      paginate = 1
    ;
    vm.cuerpo = {
      data: {},
      blur: blur,
      pais:{
        searchText: '',
        selectedItem: null,
        search: searchPais,
      },
      departamento:{
        searchText: '',
        selectedItem: null,
        search: searchDepartamento,
      },
      ciudad:{
        searchText: '',
        selectedItem: null,
        search: searchCiudad,
      },
      barrio:{
        searchText: '',
        selectedItem: null,
        search: searchBarrio,
      },
      dilisap:{
        search: []
      }
    }
    ;
    if ($rootScope.blog) {
      console.log($rootScope.blog);
      vm.cuerpo.data = $rootScope.blog;
    }

    getdilisap();
    function getdilisap() {
      vm.cuerpo.dilisap.search = new Search()(Blog, 'blog', {

      }, paginate)
      ;
    }

    function searchPais() {
      var
        txt = vm.cuerpo.pais.searchText,
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
    function searchDepartamento() {
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
    function searchCiudad() {
      var
        txt = vm.cuerpo.ciudad.searchText,
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
    function searchBarrio() {
      var
        txt = vm.cuerpo.barrio.searchText,
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
    function blur(obj) {
      var
        promises = [],
        ops = vm.cuerpo.data,
        data = {}
      ;

      data = {
        id: $rootScope.blog.id
      };
      if (obj) {
        data.obj = ops[obj];
      }
      if (data.id) {
        promises.push(
          Blog.actializar(data)
          .then(function(rta){
            console.log(rta);
          })
        )
        ;
      }
    }

  }
})();
