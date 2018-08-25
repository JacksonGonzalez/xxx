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
      Unidad
    ]);

  function Unidad(
    )
  {
    var obj = {
      list:[]
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
                'm3': 0.001,          // metro cubico
                'cm3': 1000,     // centimetro cubico
                'mm3': 1000        //milimitro cubico
              }
            },
            {
              unidad: 'Metro Cúbico - m3',
              conversion:{               // metro cubico
                'cm3': 1000000,           // centimetro cubico
                'mm3': 1000000000,           //milimitro cubico
                'lt': 1000             //litros
              },
            },
            {
              unidad: 'centimetro Cúbico - cm3',
              conversion:{            // centimetro cubico
                'm3': 0.000001,        // metro cubico
                'mm3': 1000,         //milimitro cubico
                'lt': 0.001          //litros
              }
            },
            {
              unidad: 'Milimetro Cúbico - mm3',
              conversion:{           //milimitro cubico
                'm3': 0.000001,        // metro cubico
                'cm3': 1,       // centimetro cubico
                'lt': 0.001         //litros
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

  }
})();
