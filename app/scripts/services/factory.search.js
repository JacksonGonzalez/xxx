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
            rta ={
              text: '',
              items: [],
              numItems: 0,
              selected: [],
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
              query.where = where.where || where;
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

            function getquerys() {
              // console.log(Model, modelname, where, query, paginate);
              return Model
              .getquerys(txtquers(query))
              .then(function(list){
                // console.log(list);
                rta.numItems = list.count;
                list = list.list;
                if (list) {
                  rta.items = _.unionBy(rta.items || [], list, 'id');
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
              getquerys();
            }
            function eliminar(ev, obj, idx) {
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
        }
      }
    }
})();
