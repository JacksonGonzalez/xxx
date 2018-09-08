(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:ContratoCtrl
   * @description
   * # ContratoCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('ContratoCtrl',[
        'Pago',
        '$scope',
        'Search',
        'dialog',
        'Barrio',
        'Ciudad',
        'Contrato',
        '$mdDialog',
        'UsuarioRol',
        '$rootScope',
        'ArticuloBlog',
        'UsuarioBlog',
        'ContratoUsuario',
        'ContratoArticulo',
        Contrato
      ]);

      function Contrato(
        Pago,
        $scope,
        Search,
        dialog,
        Barrio,
        Ciudad,
        Contrato,
        $mdDialog,
        UsuarioRol,
        $rootScope,
        ArticuloBlog,
        UsuarioBlog,
        ContratoUsuario,
        ContratoArticulo
      ) {
        var
          vm = this
        ;
        vm.cuerpo = {
          logo: $rootScope.blog.logo || "images/logo.jpg",
          opt: _.capitalize(dialog.opciono),
          titulo: _.capitalize(dialog.opciono),
          factura: '',
          detalles:{
            rut: $rootScope.blog.rut ||'1231239',
            empresa: $rootScope.blog.titulo || 'Condiser',
            encargado: $rootScope.user.nombre || 'Eduardo',
            direccion: $rootScope.blog.direccion || 'calle 1',
            pbx: $rootScope.blog.pbx || '5808747',
            nit: $rootScope.blog.nit || '1009991',
          },
          data:{
            fecha: new Date(),
            numero: codigogenerar() || '123',
            usuario:{},
            blog: $rootScope.blog.id,
            blogapi: $rootScope.blog.id,
            creador: $rootScope.user.id,
            tipo: dialog.opciono,
            cajero: $rootScope.user.id,
            total: 0,
            vueltostotal: 0,
            vueltos: 0,
            totalpagar: 0,
            iva: 0.19,
            vendedor:{},
            pago:[],
            disable: dialog.disable
          },
          relacion:{
            // usuario:{},
            // producto:{}
          },
          pago:[
            // {
            //   name: 'Efectivo'
            // },
            // {
            //   name: 'Tarjeta',
            //   tipos:[
            //     {
            //       name: 'Visa'
            //     },
            //     {
            //       name: 'Master Card'
            //     },
            //     {
            //       name: 'Davivienda'
            //     }
            //   ]
            // },
            // {
            //   name: 'Bono'
            // }
          ],
          clone: {
            pago: []
          },
          generar: generar,
          suma: suma,
          producto:{
            search:{
              selected:[]
            },
            itemChange: itemChangeProducto,
            searchText: [],
            searchTextChange: searchTextChange,
            querySearch: getproducto,
            borrar: borrarproducto,
          },
          blurprecio: blurprecio,
          usuario:{
            itemChange: itemChange,
            searchText: '',
            searchTextChange: searchTextChange,
            querySearch: querySearch
          },
          vendedor:{
            itemChange: itemChange,
            searchText: '',
            searchTextChange: searchTextChange,
            querySearch: querySearch
          },
          barrio:{
            searchText: '',
            selectedItem: null,
            search: getbarrio,
          },
          ciudad:{
            searchText: '',
            selectedItem: null,
            search: getciudad,
          },
          btn:{
            disable: true,
            saved: saved,
            close: close
          }
        }
        ;
        getPago();
        function getPago() {
          var
            promises = []
          ;

          promises.push(
            Pago.getquerys({
              limit: -1,
              where:{

              }
            })
            .then(function(rta){
              // console.log(rta);
              rta = rta.list;
              vm.cuerpo.clone.pago = rta;
              var
                data = {}
              ;
              _.forEach(rta, function(item){
                  if (!item.pago) {
                    vm.cuerpo.pago.push(item);
                  }
              })
              ;
              if (dialog) {
                if (dialog.id) {
                  // console.log(dialog);
                  querylist();
                }else {
                  getlist();
                }
              }
            })
          )
          ;
        }
        function getlist() {
          var paginate=1;
          vm.cuerpo.producto.search = new Search()(ArticuloBlog, 'Articulo',{
            where:{
              tipo: 'producto'
            }
          }, paginate);
        }
        function getproducto(idx, opt) {
          console.log(opt);
          var
            txt = vm.cuerpo.producto.searchText[idx],
            query = {}
          ;
          if(_.isString(txt)){
            if(txt.length){
              query.slug = {
                contains: _.kebabCase(txt)
              };
            }
          }
          query.tipo = opt;
          return ArticuloBlog
            .getquerys(query)
            .then(function(rta){
              // console.log(rta);
              return rta.list;
            })
            ;
        }
        function borrarproducto(obj, idx) {
          // console.log(obj, idx);
          // console.log(vm.cuerpo.producto);
          vm.cuerpo.producto.search.seleccionado(obj);
          if (vm.cuerpo.producto.searchText[idx]) {
            vm.cuerpo.producto.searchText.splice(idx);
          }
        }
        function itemChangeProducto(obj, idx) {
          // console.log(obj);
          if (obj.id) {
            if (obj.titulo.id) {
              obj = obj.titulo;
            }else {

            }
            obj.totalprecio = 0;
            obj.check = true;
            vm.cuerpo.producto.search.selected[idx]=obj;
          }
        }
        function blurprecio(obj, idx, opt) {
          // console.log(obj, idx);
          cheking(opt);
          suma();
        }
        function suma() {
          var
            data = 0,
            iva = vm.cuerpo.data.iva
          ;
          _.forEach(vm.cuerpo.producto.search.selected, function(item){
              if (item.id) {
                if (item.precioventa) {
                  item.totalprecio=item.cantidadadquiridad*item.precioventa;
                  data+=item.totalprecio;
                  iva = data*iva;
                }
              }
          })
          ;
          vm.cuerpo.data.total = data;
          vm.cuerpo.data.totalpagar = iva;
          var
            total = 0,
            constin = []
          ;
          _.forEach(vm.cuerpo.pago, function(item, idx) {
            // console.log(item);
            if (item.ids) {
                total+=item.cantidad;
                vm.cuerpo.data.vueltos=total-data;
                vm.cuerpo.data.vueltostotal=total-iva;
                constin.push(item);
            }
          })
          ;
          vm.cuerpo.data.pago=constin;
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
        $scope.$watch(function(){
            return (vm.cuerpo.producto.search.selected && vm.cuerpo.producto.search.selected[0]);
          }, function(list){
            if (list) {
              // console.log(list);
              cheking();
            }
          });
        $scope.$watch(function(){
            return (vm.cuerpo.producto.search.items && vm.cuerpo.producto.search.items[0]);
          },function(list){
            // console.log(list);
            cheking();
          });
        function generar() {
          vm.cuerpo.producto.search.selected.push({
            check: true,
            totalprecio: 0,
            id: codigogenerar()
          })
          ;
        }
        function itemChange(opt) {
          switch (opt) {
            case 'cliente':
              // console.log(vm.cuerpo);
              vm.cuerpo.data.usuario=vm.cuerpo.relacion.usuario;
              break;
            case 'vendedor':
              vm.cuerpo.data.vendedor=vm.cuerpo.relacion.vendedor;
              break;
            default:

          }
        }
        function searchTextChange() {

        }
        function querySearch(opt) {
          var
            txt = '',
            query = {}
          ;
          if (opt) {
            txt = vm.cuerpo.usuario.searchText;
          }else {
            txt = vm.cuerpo.vendedor.searchText;
          }
          if(_.isString(txt)){
            if(txt.length){
              query.slugnombre = {
                contains: _.kebabCase(txt)
              };
            }
          }
          // if ($rootScope.blog.blog) {
          //   query.sucursalblog = $rootScope.blog.blog.id;
          // }else {
          //   query.sucursalblog= $rootScope.blog.id;
          // }
          // query.rol = "";
          return UsuarioRol
            .getquerys(query)
            .then(function(rta){
              console.log(rta);
              // TODO [JOSE]: Terminar lo del Rol
              return rta.list;
            })
            ;
        }
        function getbarrio() {
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
        function getciudad() {
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
        function saved() {
          // console.log(vm.cuerpo.relacion);
          vm.cuerpo.btn.disable = false;
          var
            data = vm.cuerpo.data
          ;
          data.titulo=data.fecha+data.numero;
          data.slug=_.kebabCase(data.titulo);
          data.valor = data.total;
          data.valortotal = data.totalpagar;
          data.cliente = data.usuario;
          if (!data.vendedor.id) {
            data.vendedor=$rootScope.user.id;
          }
          data.producto=vm.cuerpo.producto.search.selected;
          // console.log(data);
          Contrato
          .saved(data)
          ;
        }

        function querylist() {
          getProductos();
          getUsuarios();
          getPagos();

          function getProductos() {
            var
              promises = []
            ;
            dialog.total=dialog.valor;
            dialog.iva = dialog.iva || 0.19;
            dialog.totalpagar = dialog.valortotal;
            dialog.usuario = dialog.cliente;
            dialog.fecha = dialog.createdAt;
            vm.cuerpo.data = dialog;
            // console.log(vm.cuerpo.data);
            promises.push(
              ContratoArticulo
              .getquerys({
                where:{
                  contrato: dialog.id
                }
              })
              .then(function(rta){
                // console.log(rta);
                // console.log(vm.cuerpo);
                rta = rta.list;
                var
                  data = {}
                ;
                _.forEach(rta, function(item){
                  if (item.articuloblog) {
                      data=item.articuloblog;
                      data.cantidadadquiridad = item.cantidad;
                      data.tipounidad = item.tipounidad;
                      data.unidad = item.unidad;
                      data.tipo = item.tipo;
                      vm.cuerpo.producto.search.selected.push(item.articuloblog);
                  }
                })
                ;
                // suma();
              })
            )
            ;
          }
          function getUsuarios() {
            var
              promises = []
            ;
            promises.push(
              ContratoUsuario
              .getquerys({
                where:{
                  contrato: dialog.id
                }
              })
              .then(function(rta){
                // console.log(rta);
                rta = rta.list;
                _.forEach(rta, function(item){
                  if (item.rol.slug === 'cliente') {
                    vm.cuerpo.relacion.usuario = item.usuarioblog;
                  }
                  if (item.rol.slug === 'vendedor') {
                    vm.cuerpo.relacion.vendedor = item.usuarioblog;
                  }
                })
                ;
              })
            )
            ;
          }
          function getPagos() {
            var
              data = []
            ;
            _.forEach(dialog.contratopago, function(item){
              _.forEach(vm.cuerpo.clone.pago, function(val){
                if (item.pago === val.id) {
                  // console.log(val, item);
                  val.ids = true;
                  val.cantidad =  item.valor;
                  val.vueltos = item.vueltos;
                  val.vueltostotal = item.vueltostotal;
                  data.push(val);
                  dialog.vueltos = item.vueltos;
                  dialog.vueltostotal = item.vueltostotal;
                }
              })
              ;
            })
            ;
            dialog.pago=data;
          }
        }

        function close() {
          return $mdDialog.cancel();
        }
        function codigogenerar(){
          // console.log((Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase());
          return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();
        }
        this.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
    }

})();
