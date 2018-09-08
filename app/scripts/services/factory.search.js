(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Search
   * @description
   * # Search
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Search', [
      'ArticuloPrecio',
      'ArticuloBlog',
      '$rootScope',
      '$mdDialog',
      'Articulo',
      Search
    ]);

  function Search(
    ArticuloPrecio,
    ArticuloBlog,
    $rootScope,
    $mdDialog,
    Articulo
    ) {
      return function(opsiones) {
        var
          hideTotalToast = !!(opsiones && opsiones.hideTotalToast),
          limit = (opsiones && config.limit) || 10
        ;

        return getfil;

        function getfil(Model, modelname, where, paginate) {
          var
            query = {
              page: 1,
              limit: limit,
              where: {}
            },
            vm = this,
            rta ={
              text: '',
              items: [],
              numItems: 0,
              ver: ver,
              selected: [],
              itemselec: {},
              seleccionado: seleccionado,
              restart: restart,
              eliminar: eliminar,
              clearSearch: clearSearch,
              update: update,
              create: create,
              hasSelected: hasSelected,
              scrollpaginate: scrollpaginate,
              scroll: {
                hasView: true,
                offset: 100,
                on: onScroll,
                isEnd: false,
                hasEnd: isEndScroll
              }
            }
            ;
            if(where){
              if (where.limit) {
                query.limit = where.limit;
                delete where.limit;
              }
              if (where.where) {
                if (where.where.limit) {
                  query.limit= where.where.limit;
                  delete where.where.limit;
                }
              }
              query.where = where.where || where;
              query.sort = {
                createdAt: 'desc'
              };
              // query.sort = getQuerySort(where.sort, modelname);
            }
            getquerys();
            return rta;

            function isEndScroll() {
              // console.log(3);
            }
            function onScroll() {
              // console.log(4);
              // if (paginate >= rta.pagination.page) {
              //   rta.pagination.page = base.pagination.page+1;
              //   getlist();
              // }
            }

            function scrollpaginate() {
              paginate=paginate+1;
              // console.log("men", paginate, query);
              query.page=paginate;
              getquerys();

            }
            function cheking(opt) {
              _.forEach(vm.cuerpo.producto.search.items, function(item){
                  _.forEach(vm.cuerpo.producto.search.selected, function(val){
                      if (val.id === item.id) {
                        item.check = true;
                        if (opt) {
                          val.cantidadadquiridad = item.cantidadadquiridad;
                        }else {
                          item.cantidadadquiridad = val.cantidadadquiridad;
                        }
                      }else {
                        // item.check = false;
                      }
                  })
                  ;
              })
              ;
            }
            function getquerys() {
              // console.log(Model, modelname, where, query, paginate);
              return Model
              .getquerys(txtquers(query))
              .then(function(list){
                console.log(txtquers(query));
                // console.log(list);
                rta.numItems = list.count;
                list = list.list;
                if (list) {
                  rta.items = _.unionBy(rta.items || [], list, 'id');
                  if (rta.selected.length) {
                    _.forEach(rta.selected, function(item){
                      _.forEach(rta.items, function(val){
                        if (item.id === val.id) {
                          val.check = true;
                        }
                      })
                      ;
                    })
                    ;
                  }
                }
              })
              ;
            }
            function txtquers(query){
              var quest = _.merge({}, query);
              // console.log(rta.txt);
              if (!_.isString(rta.text) && _.isFunction(rta.text.toString)) {
                rta.text = rta.text.toString();
              }
              if (_.isString(rta.text)) {
                quest.where = quest.where || {};
                quest.where.or = QueryOr();
                // console.log(quest);
                //quest.where = getQueryOr(quest.where)[0];
              } else {
                delete quest.where.or;
              }
              // return query;
              return _.merge({}, quest);
            }
            function QueryOr() {
              // console.log(rta);
              var search = [];
              switch (modelname) {
                case 'Articulo':
                  search.push(
                   {
                    titulo: {
                      contains: rta.txt || ''
                      }
                   },
                   {
                    codigo: {
                      contains: rta.txt || ''
                      }
                   },
                   {
                     estado: {
                       contains: rta.txt || ''
                     }
                   },
                   {
                     preciocompra: {
                       contains: rta.txt || ''
                     }
                   },
                   {
                     precioventa: {
                       contains: rta.txt || ''
                     }
                   }
                 );
                  break;
                  case 'Persona':
                  search.push(
                    {
                      documento:{
                        contains: rta.txt || ''
                      }
                    },
                    {
                      slugnombre:{
                        contains: rta.txt || ''
                      }
                    },
                    {
                      slugapellido:{
                        contains: rta.txt || ''
                      }
                    }
                  )
                  ;
                  break;
                  default:
                    search.push(
                      {
                        titulo:{
                          contains: rta.txt || ''
                        }
                      },
                      {
                        slug:{
                          contains: rta.txt || ''
                        }
                      },
                      {
                        nombre:{
                          contains: rta.txt || ''
                        }
                      }
                    )
                    ;
                    break;
                }
                // console.log(search);
                return search;
            }
            function restart() {
              rta.numItems = 0;
              rta.items = {};
              query.page = 1;
              paginate = 1;
              getquerys();
            }
            function eliminar(ev) {
              // console.log(obj, idx);
              var confirm = $mdDialog.confirm()
              .title('Seguro Deseas Elimiar?')
              .textContent('Al Eliminar Seba Ala Papelera')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Si!')
              .cancel('No');

              $mdDialog.show(confirm)
              .then(function(ops) {
                  // console.log(ops);
                if (ops) {
                  _.forEach(rta.selected,function(obj, idx){
                    var data = {
                      id: obj.id,
                      estado: 'borrado'
                    }
                    ;
                    return Model
                    .actializar(data)
                    .then(function(list){
                      // console.log(list);
                      if (list) {
                        rta.items.splice(idx, 1);
                      }
                    })
                    ;
                  })
                  ;
                }
              })
              ;
            }
            function clearSearch() {

            }
            function update() {

            }
            function create(obj) {
              console.log(obj);
            }
            function hasSelected() {

            }
            function getQuerySort() {

            }
            function seleccionado(obj) {
              console.log(obj);
              if (obj) {
                obj.check = !obj.check;
                obj.title = obj.titulo;
                obj.totalprecio = 0;
                if (obj.check) {
                  rta.itemselec = obj;
                }
                var idx = _.findIndex(rta.selected, ['id', obj.id]);
                // console.log(idx);
                if (idx >-1) {
                  // console.log("elimina");
                  rta.selected.splice(idx, 1);
                }else {
                  // console.log("entra");
                  rta.selected.push(obj);
                }
              }
            }
            function ver(obj, idx, ev) {
              $mdDialog.show({
                controller: 'ShowarticuloCtrl',
                controllerAs: 'showarticulo',
                templateUrl: 'views/Forms/articulo.html',
                parent: angular.element(document.body),
                locals:{
                  dialog:obj
                },
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: this.customFullscreen // Only for -xs, -sm breakpoints.
              })
              .then(function(answer) {

              });
            }
        }
      }
      ;
    }
})();
