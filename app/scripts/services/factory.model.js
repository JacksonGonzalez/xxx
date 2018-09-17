(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Model
   * @description
   * # Model
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Model', [
      '$stateParams',
      '$rootScope',
      '$interval',
      '$sails',
      '$http',
      '$q',
      Model
    ]);

  function Model(
      $stateParams,
      $rootScope,
      $interval,
      $sails,
      $http,
      $q
    ) {
    var
      reconnecting = null,
      onActionModels = [],
      socketConnect = {},
      modelsname = [],
      _querys = {}
    ;
    var
      w = $rootScope.$watch(function() {
      return $stateParams.token;
    }, function(token) {
      if (token) {
        $sails.headers = $sails.headers || {};
        $sails.headers['authorization'] = 'Bearer ' + token;
        $sails.headers['origin'] = location.host;
      }
    });

    $rootScope.saveData = 0;
    $rootScope.hasSaveData = function() {
      return $rootScope.saveData !== 0;
    };

    $rootScope.connected = false;
    $rootScope.connecting = false;
    $rootScope.connectManualConnection = connectManualConnection;
    $rootScope.disconnectManualConnection = disconnectManualConnection;
    $rootScope.stopConnecting = stopConnecting;

    onConnected();

    return function(modelname, forceSocket) {

      modelsname.push(modelname);
      _querys[modelname] = {};
      forceSocket = true;
      var
        lista = [],
        total = -1,
        base = '/' + modelname,
        urlbase = $rootScope.urlBackend,
        selection = [],
        lib = forceSocket ? $sails : $http;

      init();

      connectModelname();

      $rootScope
        .$on('$destroy', function() {
          $sails.off(modelname, onActionModels[modelname]);
          onActionModels[modelname] = null;
          $sails.off('connect', fnConnect);
          $sails.off('disconnect', fnDisconnect);
        });

      return {
        put: putModel,
        get: getModel,
        post: postModel,
        delete: deleteModel,
        getBase: getBaseModel,
        getLista: getListaModel,
        getTotal: getTotalModel,

        counts: countsItem,
        getquerys: querysItem,
        select: selectItem,
        deselect: deselectItem,
        create: createItem,
        actializar: updateItem,
        eliminar: removeItem,
        add: addItem,
        stats: stats,
        setForceSockets: setForceSockets,
        selection: selection,
        getSelection: function() {
          return selection;
        },
        lista: lista
      };

      function stats() {
        return getModel(getBaseModel() + '/stats', {
          blog: $rootScope.blog.id
        });
      }

      function prepare() {
        return $sails
          .get(base + '/count')
          .then(function(rta) {
            total = getDataRta(rta).count;
            return total;
          });
      }

      /**
       * @name getBaseModel
       *
       * @return {string}
       */
      function getBaseModel() {
        return getFullUrl(base);
      }

      /**
       * @name getListaModel
       *
       * @return {Array}
       */
      function getListaModel() {
        return lista;
      }

      /**
       * @name getTotalModel
       *
       * @return {number}
       */
      function getTotalModel() {
        return total;
      }

      /**
       * @name putModel
       *
       * @param url
       * @param query
       * @return {*|Promise|{}}
       */
      function putModel(url, query) {
        return lib
          .put(getFullUrl(url), query)
          .then(function(rta) {
            return getDataRta(rta);
          }, function(err) {
            console.error(err);
            return err;
          });
      }

      /**
       * @name getModel
       *
       * @param uri
       * @param query
       * @return {*|Promise|{}}
       */
      function getModel(uri, query) {
        var
          url = getFullUrl(uri),
          txtQuery = JSON.stringify(query || {}),
          promise = null,
          where = {};

        if (query && !query.where && !query.or) {
          _.forEach(query, function(val, key) {
            if (val) {
              where[key] = val;
            }
          });
          query = {
            where: where
          };
        }

        return init()
          .then(function() {
            promise = (forceSocket ? $sails : (socketConnect[modelname] ? $http : $sails))
              .get(url, query)
              .then(function(rta) {
                socketConnect[modelname] = true;
                return getDataRta(rta, url, txtQuery);
              }, function(err) {
                console.error(err);
              })
              .then(function(list) {
                return list;
              }, function(err) {
                console.error(err);
              });
            return promise;
          });
      }

      /**
       * @name postModel
       *
       * @param url
       * @param query
       * @return {*|Promise|{}}
       */
      function postModel(url, query) {
        startSaveData(url, query);
        if (!query.blog && $rootScope.blog) {
          query.blog = ($rootScope.blog && $rootScope.blog.id) || $rootScope.blog;
        }
        return lib
          .post(getFullUrl(url), query)
          .then(function(rta) {
            stopSaveData(rta);
            return getDataRta(rta);
          }, function(err) {
            console.error(url, query, err);
            stopSaveData(err);
            return err;
          });
      }

      /**
       * @name deleteModel
       *
       * @param url
       * @param query
       * @return {*|Promise|{}}
       */
      function deleteModel(url, query) {
        if (_.isObject(url)) {
          return destruirItem(url);
        }
        var data = {
          id: query.id,
          blog: $rootScope.blog && $rootScope.blog.id
        };
        if (query.blog) {
          data.blog = query.blog.id || query.blog;
          delete query.blog;
        }
        // console.log(getFullUrl(url), query, data)
        if (data.id) {
          return lib
            .delete(getFullUrl(url), data)
            .then(function(rta) {
              // console.log(rta)
              var data = getDataRta(rta);
              $rootScope.$emit('destroyed.' + modelname, data);
              // console.log(modelname);
              $rootScope.$emit('destroyed.' + modelname + '.' + data.id, data);
              return data;
            });
        }
        return $q.reject('not found');
      }

      /**
       * @name countsItem
       * @param query
       * @return {*|Promise|{}}
       */
      function countsItem(query) {
        return lib
          .get(getFullUrl(base + '/count'), query || {})
          .then(function(rta) {
            return getDataRta(rta).count;
          });
      }

      /**
       * @name querysItem
       *
       * @param query
       * @return {*|Promise|{}}
       */
      function querysItem(query) {
        return countsItem(query)
          .then(function(count) {
            return loadList(query, count);
          });

        function loadList(query, count) {
          return getModel(base, query || {})
            .then(function(rta) {
              return {
                count: count,
                list: rta
              };
            }, function(err) {
              return err;
            })
            .then(function(data) {
              return data;
            });
        }
      }

      /**
       * @name destruirItem
       *
       * @param data
       * @return {*|Promise|{}}
       */
      function destruirItem(data) {
        return deleteModel(base, data);
      }

      /**
       * @name createItem
       *
       * @param data
       * @return {*|Promise|{}}
       */
      function createItem(data) {
        return postModel(base, data)
          .then(function(rta) {
            var data = getDataRta(rta);
            console.log(modelname, data);
            $rootScope.$emit('created.' + modelname, data);
            $rootScope.$emit('created.' + modelname + '.' + data.id, data);
            return data;
          });
      }

      /**
       * @name updateItem
       *
       * @param data
       * @return {*|Promise|{}}
       */
      function updateItem(data) {
        var id = data.id;
        return putModel(base + '/' + id, data)
          .then(function(rta) {
            var data = getDataRta(rta);
            $rootScope.$emit('updated.' + modelname, data);
            $rootScope.$emit('updated.' + modelname + '.' + data.id, data);
            return data;
          }, function(err) {
            console.error(err);
            return err;
          });
      }

      /**
       * @name addItem
       *
       * @param elem Elemento donde se asociará el Item
       * @param association Nombre de la asociación
       * @param item Item que se asociará al Elemento
       * @return {*|Promise|{}}
       */
      function addItem(elem, association, item) {
        var _url = [
          base,
          (elem.id || elem),
          association,
          (item.id || item)
        ];
        return postModel(_url.join('/'))
          .then(function(rta) {
            return getDataRta(rta);
          });
      }

      /**
       * @name removeItem
       *
       * @param elem Elemento desde donde se aliminará el Item
       * @param association Nombre de la asociación/colección
       * @param item Item que se eliminará del Elemento
       * @return {*|Promise|{}}
       */
      function removeItem(elem, association, item) {
        console.log(item);
        var
          promises = [],
          _url = [
            base,
            (elem.id || elem),
            association
          ];
          console.log(item);
        if (_.isArray(item)) {
          for (var h = 0; h < item.length; h++) {
            _url[3] = item[h].id || item[h];
            promises
              .push(deleteModel(_url.join('/')));
          }
          console.log(item);
        } else if (_.isObject(item) && item && item.id) {
          console.log(item);
          _url.push(item.id || item);
          promises
            .push(deleteModel(_url.join('/')));
        } else {
          return $q.reject('bad request');
        }

        return $q.all(promises).then(function(rta) {
          _.forEach(promises, function(item, key) {
            console.log(item, key, rta);
            getDataRta(rta[key]);
          });
          return rta;
        });
      }

      function startSaveData() {
        $rootScope.saveData++;
      }

      function stopSaveData() {
        $rootScope.saveData--;
      }

      function getDataRta(rta) {
        return rta.body || rta.data || rta;
      }

      function getFullUrl(url, socket) {
        if (socket || forceSocket) {
          // Si necesito ruta para socket
          return url.replace(urlbase, '');
        }
        if (url.indexOf(urlbase) > -1) {
          return url;
        }
        return urlbase + url;
      }

      /**
       * @name selectItem
       *
       * @param item
       */
      function selectItem(item) {
        selection.push(item);
        //console.log(selection)
      }

      function deselectItem(item) {
        var idx = _.findIndex(selection, ['id', item.id]);
        if (idx > -1) {
          selection.splice(idx, 1);
        }
      }

      function connectModelname() {
        if (!$rootScope.connected) {
          $rootScope.addToClean(
            $rootScope.$on('socketConnected', connectEvents)
          );
        } else {
          connectEvents();
        }

        function connectEvents() {
          return prepare()
            .then(function() {
              lib = forceSocket ? $sails : $http;
              if (onActionModels[modelname]) {
                $sails.off(modelname, onActionModels[modelname]);
                onActionModels[modelname] = null;
              }
              if (onActionModels.authenticated) {
                $sails.off('authenticated', onActionModels.authenticated);
                onActionModels.authenticated = null;
              }
              if (!onActionModels.authenticated) {
                onActionModels.authenticated = $sails.on('authenticated', function(data) {
                  var type = data.type ? data.type + '.' : '';
                  delete data.type;
                  if (type.indexOf('authenticated') > -1) {
                    $rootScope.$emit(type + 'usuario', data);
                  } else {
                    $rootScope.$emit(type + modelname, data);
                  }
                });
              }
              onActionModels[modelname] = $sails.on(modelname, function(msg) {
                var data = msg.data || {
                  id: msg.id
                };
                switch (msg.verb) {
                  case 'created':
                    lista.push(data);
                    break;
                  case 'updated':
                    break;
                  case 'destroyed':
                    break;
                  case 'addedTo':
                    data = {
                      modelname: modelname,
                      attribute: msg.attribute,
                      addedId: msg.addedId,
                      id: msg.id
                    };
                    break;
                  case 'removedFrom':
                    data = {
                      modelname: modelname,
                      attribute: msg.attribute,
                      removedId: msg.removedId,
                      id: msg.id
                    };
                    break;
                }
                if (msg.verb !== 'messaged') {
                  $rootScope.$emit(msg.verb + '.' + modelname, data);
                  $rootScope.$emit(msg.verb + '.' + modelname + '.' + msg.id, data);
                } else {
                  if (data.type) {
                    var type = data.type;
                    delete data.type;
                    $rootScope.$emit(type + '.' + modelname, data);
                    $rootScope.$emit(type + '.' + modelname + '.' + msg.id, data);
                  } else {
                    $rootScope.$emit(msg.verb + '.' + modelname, data);
                    $rootScope.$emit(msg.verb + '.' + modelname + '.' + msg.id, data);
                  }
                }
              });
            });
        }
      }

      function setForceSockets(forceSockets) {
        forceSocket = !!forceSockets;
      }

      function init() {
        return $q.resolve();
      }
    };

    function onConnected() {
      if (!$rootScope.connected && !$rootScope.connecting) {
        $rootScope.connecting = true;
        return $sails.on('connect', fnConnect);
      }
    }

    function fnConnect() {
      $rootScope.connected = true;
      $rootScope.connecting = false;
      $rootScope.$broadcast('socketConnected');
      $sails.on('disconnect', fnDisconnect);
    }

    function fnDisconnect() {
      $rootScope.connected = false;
      $rootScope.connecting = false;
      reconnectSocket();
      $rootScope.$broadcast('socketDisconnected');
    }

    function reconnectSocket() {
      $rootScope.$broadcast('socketReconnecting');
      $rootScope.connecting = true;
      reconnecting = $interval(function() {
        if (!$sails.isConnected()) {
          $sails.reconnect();
        } else {
          $interval.cancel(reconnecting);
          reconnecting = null;
          fnConnect();
          $rootScope.$broadcast('socketReconnected');
        }
      }, 1500);
    }

    function disconnectManualConnection() {
      if ($sails.isConnected()) {
        $sails.disconnect();
      } else {
        connectManualConnection();
      }
    }

    function connectManualConnection() {
      if (!$sails.isConnected() && !$rootScope.connecting) {
        reconnectSocket();
      }
    }

    function stopConnecting() {
      if (reconnecting) {
        $interval.cancel(reconnecting);
      }
    }
  }
})();
