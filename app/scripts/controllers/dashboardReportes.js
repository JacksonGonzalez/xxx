(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name dilisapApp.controller:DashboardReportesCtrl
   * @description
   * # DashboardReportesCtrl
   * Controller of the dilisapApp
   */
  angular.module('dilisapApp')
    .controller('DashboardReportesCtrl',[
      'ArticuloBlog',
      '$rootScope',
      DashboardReportes
    ]);
    function DashboardReportes(
      ArticuloBlog,
      $rootScope
    ) {
      var vm = this;

      vm.cuerpo = {
        inventario:{
          dataPie:[],
          labelsPie:[],
          legendPie: true
        },
        facturas:{
          dataPie:[],
          labelsPie:[],
          legendPie: true
        },
        persona:{
          dataPie:[],
          labelsPie:[],
          legendPie: true
        },
        mensaje:{
          dataPie:[],
          labelsPie:[],
          legendPie: true
        },
        btn:{
          ver: ver
        }
      }
      ;
      getinventario();
      getFactura();
      getPersona();
      getMensajes();
      function getinventario() {
        // console.log(vm.cuerpo);
        ArticuloBlog
          .get('/articuloblog/reportes',{
            blog: $rootScope.blog.id
          })
          .then(function(rta){
            // console.log(rta);
            var
              inventario = vm.cuerpo.inventario
            ;
            inventario.dataPie.push(rta.producto.cantidad || 0);
            inventario.labelsPie.push('Producto');
            inventario.dataPie.push(rta.materiaprima.cantidad || 0);
            inventario.labelsPie.push('Materia Prima');
            inventario.dataPie.push(rta.materiaprocesada.cantidad || 0);
            inventario.labelsPie.push('Materia Procesada');
            inventario.dataPie.push(rta.servicio.cantidad || 0);
            inventario.labelsPie.push('Servicios');
          })
          ;
      }
      function getFactura() {
        ArticuloBlog
          .get('/contrato/reportes',{
            blog: $rootScope.blog.id
          })
          .then(function(rta){
            // console.log(rta);
            var
              facturas = vm.cuerpo.facturas
            ;
            facturas.dataPie.push(rta.factura.total || 0);
            facturas.labelsPie.push('Factura');
            facturas.dataPie.push(rta.recibo.total || 0);
            facturas.labelsPie.push('Recibo');
            facturas.dataPie.push(rta.comprobante.total || 0);
            facturas.labelsPie.push('Comprobante');
            facturas.dataPie.push(rta.compra.total || 0);
            facturas.labelsPie.push('Compra');
            facturas.dataPie.push(rta.gasto.total || 0);
            facturas.labelsPie.push('Gasto');
          })
          ;
      }
      function getPersona() {
        ArticuloBlog
          .get('/usuariorol/reportes',{
            blog: $rootScope.blog.id
          })
          .then(function(rta){
            // console.log(rta);
            var
              persona = vm.cuerpo.persona
            ;
            persona.dataPie.push(rta.usuario.cantidad || 0);
            persona.labelsPie.push('Usuario');
            persona.dataPie.push(rta.vendedor.cantidad || 0);
            persona.labelsPie.push('Vendedor');
            persona.dataPie.push(rta.empleado.cantidad || 0);
            persona.labelsPie.push('Empleado');
            persona.dataPie.push(rta.cliente.cantidad || 0);
            persona.labelsPie.push('Cliente');
            persona.dataPie.push(rta.proveedor.cantidad || 0);
            persona.labelsPie.push('Proveedor');
            persona.dataPie.push(rta.prospecto.cantidad || 0);
            persona.labelsPie.push('Prospectos');
          })
          ;
      }
      function getMensajes() {
          var
            mensaje = vm.cuerpo.mensaje
          ;
          mensaje.dataPie.push(10);
          mensaje.labelsPie.push('Enviados');
          mensaje.dataPie.push(10);
          mensaje.labelsPie.push('Recibidos');
          mensaje.dataPie.push(10);
          mensaje.labelsPie.push('Borrados');
      }
      function ver() {
        console.log("men");
      }
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }

})();
