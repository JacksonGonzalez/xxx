(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dilisapApp.Unidad
   * @description
   * # Unidad
   * Factory in the dilisapApp.
   */
  angular.module('dilisapApp')
    .factory('Unidad', [
      '$q',
      Unidad
    ]);

  function Unidad(
    $q
    )
  {
    var obj = {
      list:[],
      conversion: conversion
    }
    ;
    list();
    return obj;
    function list() {
      var unidad = [
        {
          tipounidad: 'Volumen',
          unidad: [
            {
              unidad: 'litro - lt',
              conversion:{           //litros
                'Metro Cúbico - m3': 0.001,          // metro cubico
                'centimetro Cúbico - cm3': 1000,     // centimetro cubico
                'Milimetro Cúbico - mm3': 1000        //milimitro cubico
              }
            },
            {
              unidad: 'Metro Cúbico - m3',
              conversion:{               // metro cubico
                'centimetro Cúbico - cm3': 1000000,           // centimetro cubico
                'Milimetro Cúbico - mm3': 1000000000,           //milimitro cubico
                'litro - lt': 1000             //litros
              },
            },
            {
              unidad: 'centimetro Cúbico - cm3',
              conversion:{            // centimetro cubico
                'Metro Cúbico - m3': 0.000001,        // metro cubico
                'Milimetro Cúbico - mm3': 1000,         //milimitro cubico
                'litro - lt': 0.001          //litros
              }
            },
            {
              unidad: 'Milimetro Cúbico - mm3',
              conversion:{           //milimitro cubico
                'Metro Cúbico - m3': 0.000001,        // metro cubico
                'centimetro Cúbico - cm3': 1,       // centimetro cubico
                'litro - lt': 0.001         //litros
              }
            }
          ]
        },
        {
          tipounidad: 'unidad',
          unidad:[
            {
              unidad: 'unidad',
              conversion:{
                'unidad': 1
              }
            }
          ]
        }
      ]
      ;
      obj.list = unidad;
    }
    function conversion(query) {
      console.log(query);
      if (query.tipounidad && query.unidad && query.dbunidad && query.cantidad && query.lisunidad) {
        var
          idx = 0,
          idx2 = 0,
          data = '',
          data1 = 0
        ;
        idx = _.findIndex(query.lisunidad, ['unidad', query.dbunidad]);
        if (idx >-1) {
          data = query.lisunidad[idx];
          console.log(data);
          console.log(data.conversion[query.unidad]);
          if (data.conversion[query.unidad]) {
            data1 = data.conversion[query.unidad]*query.cantidad;
          }
        }
        return $q.resolve(data1);
      }
      return $q.reject("error not null");
    }

  }
})();
