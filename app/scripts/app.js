(function(){
  'use strict';

  /**
   * @ngdoc overview
   * @name dilisapApp
   * @description
   * # dilisapApp
   *
   * Main module of the application.
   */
  angular
    .module('dilisapApp', [
      'timer',
      'ngAria',
      'ngMeta',
      'ui.grid',
      'ngSails',
      'ngCookies',
      'ngAnimate',
      'ui.router',
      'duParallax',
      'ngMessages',
      'ngResource',
      'ngSanitize',
      'ngMaterial',
      'ui-leaflet',
      'ui.tinymce',
      'ngFileUpload',
      'ui.bootstrap',
      'angularMoment',
      'luegg.directives',
      'chart.js',
      'ngEmbed',
      'angularCroppie',
      'ngMaterialDatePicker'
    ])
    .config([
      '$stateProvider',
      '$sailsProvider',
      'ngMetaProvider',
      '$mdIconProvider',
      '$locationProvider',
      '$mdThemingProvider',
      '$urlRouterProvider',
      configApp
    ])
    .run([
      '$transitions',
      '$rootScope',
      '$location',
      '$mdMedia',
      'amMoment',
      '$window',
      '$state',
      runApp
    ]);
  var
    urlBackend = null,
    enviroment = '';

  function configApp(
    $stateProvider,
    $sailsProvider,
    ngMetaProvider,
    $mdIconProvider,
    $locationProvider,
    $mdThemingProvider,
    $urlRouterProvider)
    {

    if (location.hostname.indexOf('localhost') < 0) {
      var host = location.host.split('.');
      // urlBackend = 'http://api.' + host[host.length - 2] + '.' + host[host.length - 1];
      urlBackend = "http://192.168.1.8:1400";
      $sailsProvider.enviroment = 'production';
    } else {
      // urlBackend = 'http://192.168.1.8:1400';
      urlBackend = 'http://localhost:1400';
      $sailsProvider.enviroment = 'development';
    }

    enviroment = $sailsProvider.enviroment;
    $sailsProvider.url = urlBackend;

    $sailsProvider.headers = {
      token: null
    };

    configStyle($mdIconProvider, $mdThemingProvider);
    $stateProvider.decorator('data', ngMetaProvider.mergeNestedStateData);
    configRouters($stateProvider, $urlRouterProvider);
  }

  function runApp(
    // momentLocaleEs,
    $transitions,
    $rootScope,
    // Analytics,
    $location,
    $mdMedia,
    amMoment,
    $window,
    $state
  ) {
    //console.log(Analytics, Analytics.configuration, Analytics.getUrl())

    $rootScope.enviroment = enviroment;
    $rootScope.cleanOn = [];
    $rootScope.addToClean = function(func) {
      $rootScope.cleanOn.push(func);
    };

    //$window.ga('create', 'UA-59622137-3', 'auto');

    /*$transitions.onStart({}, function (trans) {
      $rootScope.loading();
      trans.promise.then(function (rta) {
        if ($window.ga) {
          $window.ga('send', 'pageview', $location.path());
        }
      });
    });*/

    $rootScope.ready = function() {
      /*var $scope = _getTopScope();
      $scope.status = 'ready';
      if (!$scope.$$phase) $scope.$apply();*/
      $rootScope.status = 'ready';
      if (!$rootScope.$$phase) {
        $rootScope.$apply();
      }
    };
    $rootScope.loading = function() {
      /*var $scope = _getTopScope();
      $scope.status = 'loading';
      if (!$scope.$$phase) $scope.$apply();*/
      $rootScope.status = 'loading';
      if (!$rootScope.$$phase) {
        $rootScope.$apply();
      }
    };
    //$rootScope.loading();
    // moment.defineLocale('es', momentLocaleEs);
    // amMoment.changeLocale('es');

    if(location.hostname.split('.')[0] === 'email'){
      setTimeout(function(){
        //console.log(location.pathname);
        if(location.pathname.indexOf('mail') < 0){
          $state.go('login', {},$state.params);
        }
      }, 200);
    }

    $rootScope.urlBackend = urlBackend;
    $rootScope.gtsm = $mdMedia('gt-sm');
    $rootScope.addToClean(
      $rootScope.$watch(function() {
        return $mdMedia('gt-sm');
      }, function(newValue) {
        $rootScope.gtsm = newValue;
      })
    );
    $rootScope
      .$on('$destroy', function() {
        _.forEach($rootScope.cleanOn, function(clean) {
          if (_.isFunction(clean)) {
            clean();
          }
        });
      });

    $rootScope.isActiveRoute = function(route, params) {
      params = params || {};
      return $state.includes(route) || $state.is(route);
    };
  }

  function configStyle($mdIconProvider, $mdThemingProvider) {
    var blogname = location.hostname.split('.');
    if (blogname[0] !== 'www' && blogname[0] !== 'email') {
      blogname = blogname[0];
    } else {
      blogname = blogname[1];
    }
    $mdThemingProvider.definePalette('accent', {
        '50': 'f1f8ff',
        '100': 'dbeeff',
        '200': 'c3e2ff',
        '300': 'abd6ff',
        '400': '99ceff',
        '500': '87c5ff',
        '600': '7fbfff',
        '700': '74b8ff',
        '800': '6ab0ff',
        '900': '57a3ff',
        'A100': 'ffffff',
        'A200': 'ffffff',
        'A400': 'fcfdff',
        'A700': 'e2efff',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
          '50',
          '100',
          '200',
          '300',
          '400',
          '500',
          '600',
          '700',
          '800',
          '900',
          'A100',
          'A200',
          'A400',
          'A700'
        ],
        'contrastLightColors': []
      });
      $mdThemingProvider.definePalette('primary', {
        '50': 'e2f0f6',
        '100': 'b8dae9',
        '200': '88c1da',
        '300': '58a8cb',
        '400': '3596c0',
        '500': '1183b5',
        '600': '0f7bae',
        '700': '0c70a5',
        '800': '0a669d',
        '900': '05538d',
        'A100': 'badeff',
        'A200': '87c5ff',
        'A400': '54adff',
        'A700': '3ba1ff',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
          '50',
          '100',
          '200',
          '300',
          'A100',
          'A200',
          'A400',
          'A700'
        ],
        'contrastLightColors': [
          '400',
          '500',
          '600',
          '700',
          '800',
          '900'
        ]
      });
      // $mdThemingProvider.theme('default')
      //   .primaryPalette('primary')
      //   .accentPalette('accent')
      // ;
      $mdThemingProvider.theme('default')
        .primaryPalette('pink')
        .accentPalette('blue')
      ;
      $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
    /*$mdThemingProvider.theme('default')
      .primaryPalette('red')
      .accentPalette('blue-grey')
    ;*/

    $mdIconProvider
      .defaultIconSet('images/mdi.svg');
  }

  function configRouters($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state({
        url: '/',
        name: 'main',
        controllerAs: 'main',
        controller: 'MainCtrl',
        templateUrl: 'views/index.html',
        resolve: {
          Tools: ['Tools', function(Tools) {
            return Tools.BlogUrl(urlBackend);
          }]
        }
      })
      .state({
        url: '/login',
        name: 'login',
        controllerAs: 'login',
        controller: 'LoginCtrl',
        templateUrl: 'views/Login/login.html',
        resolve: {
          Tools: ['Tools', function(Tools) {
            return Tools.BlogUrl(urlBackend);
          }]
        }
      })
      .state({
        url: '/tienda',
        name: 'tienda',
        controllerAs: 'tienda',
        controller: 'DashboardTiendaCtrl',
        templateUrl: 'views/Tienda/index.html',
      })
      .state({
        url: '/carrito',
        name: 'carrito',
        controllerAs: 'carrito',
        controller: 'DashboardCarritoCtrl',
        templateUrl: 'views/Tienda/carrito.html',
      })
      .state({
        url: '/informacion',
        name: 'informacion',
        controllerAs: 'informacion',
        controller: 'DashboardInformacionCtrl',
        templateUrl: 'views/informacion.html',
      })
      .state({
        url: '/dashboard',
        name: 'dashboard',
        controllerAs: 'dashboard',
        controller: 'DashboardCtrl',
        templateUrl: 'views/Dashboard/dashboard.html',
        resolve: {
          Blog: ['Tools', function(Tools) {
            console.log(Tools);
            return Tools.BlogUrl(urlBackend);
          }],
          // user: ['UsuarioBlog', '$stateParams', function (UsuarioBlog, $stateParams) {
          //   console.log(UsuarioBlog);
          //   return UsuarioBlog.authenticate($stateParams.token);
          // }]
        }
      })
      .state({
        url: '/producto',
        name: 'dashboard.producto',
        controllerAs: 'producto',
        controller: 'DashboardProductoCtrl',
        templateUrl: 'views/Dashboard/producto.html',
      })
      .state({
        url: '/materiasprimas',
        name: 'dashboard.materiasprimas',
        controllerAs: 'materiasprimas',
        controller: 'DashboardMateriasPrimasCtrl',
        templateUrl: 'views/Dashboard/materiasprimas.html',
      })
      .state({
        url: '/materiasprimasProcesadas',
        name: 'dashboard.materiaprocesada',
        controllerAs: 'materiaprocesada',
        controller: 'DashboardMateriasProcesadasCtrl',
        templateUrl: 'views/Dashboard/materiaprocesada.html',
      })
      .state({
        url: '/servicios',
        name: 'dashboard.servicios',
        controllerAs: 'servicios',
        controller: 'DashboardServiciosCtrl',
        templateUrl: 'views/Dashboard/servicio.html',
      })
      .state({
        url: '/bodegas',
        name: 'dashboard.bodegas',
        controllerAs: 'bodegas',
        controller: 'DashboardBodegasCtrl',
        templateUrl: 'views/Dashboard/bodegas.html',
      })
      .state({
        url: '/historial',
        name: 'dashboard.historial',
        controllerAs: 'historial',
        controller: 'DashboardHistorialCtrl',
        templateUrl: 'views/Dashboard/historial.html',
      })


      .state({
        url: '/reportes',
        name: 'dashboard.reportes',
        controllerAs: 'reportes',
        controller: 'DashboardReportesCtrl',
        templateUrl: 'views/Dashboard/reportes.html',
      })

      .state({
        url: '/fasturas',
        name: 'dashboard.fasturas',
        controllerAs: 'fasturas',
        controller: 'DashboardFasturasCtrl',
        templateUrl: 'views/Dashboard/fasturas.html',
      })
      .state({
        url: '/recibos',
        name: 'dashboard.recibos',
        controllerAs: 'recibos',
        controller: 'DashboardRecibosCtrl',
        templateUrl: 'views/Dashboard/recibos.html',
      })
      .state({
        url: '/compras',
        name: 'dashboard.compras',
        controllerAs: 'compras',
        controller: 'DashboardComprasCtrl',
        templateUrl: 'views/Dashboard/compras.html',
      })

      .state({
        url: '/ingrediente-de-produccion',
        name: 'dashboard.ingrediente',
        controllerAs: 'ingrediente',
        controller: 'DashboardIngredienteCtrl',
        templateUrl: 'views/Dashboard/ingrediente.html',
      })

      .state({
        url: '/cliente',
        name: 'dashboard.cliente',
        controllerAs: 'clientes',
        controller: 'DashboardClientesCtrl',
        templateUrl: 'views/Dashboard/cliente.html',
      })
      .state({
        url: '/empleados',
        name: 'dashboard.empleados',
        controllerAs: 'empleados',
        controller: 'DashboardEmpleadosCtrl',
        templateUrl: 'views/Dashboard/empleado.html',
      })
      .state({
        url: '/prospectos',
        name: 'dashboard.prospectos',
        controllerAs: 'prospectos',
        controller: 'DashboardProspectosCtrl',
        templateUrl: 'views/Dashboard/prospectos.html',
      })
      .state({
        url: '/proveedores',
        name: 'dashboard.proveedores',
        controllerAs: 'proveedores',
        controller: 'DashboardProveedoresCtrl',
        templateUrl: 'views/Dashboard/proveedores.html',
      })
      .state({
        url: '/todos',
        name: 'dashboard.todos',
        controllerAs: 'todos',
        controller: 'DashboardTodosCtrl',
        templateUrl: 'views/Dashboard/todos.html',
      })

      .state({
        url: '/general',
        name: 'dashboard.general',
        controllerAs: 'general',
        controller: 'DashboardGeneralCtrl',
        templateUrl: 'views/Dashboard/general.html',
      })
      .state({
        url: '/ubicacion',
        name: 'dashboard.ubicacion',
        controllerAs: 'ubicacion',
        controller: 'DashboardUbicacionCtrl',
        templateUrl: 'views/Dashboard/ubicacion.html',
      })
      ;
  }
})();
