// Karma configuration
// Generated on 2018-07-27

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/sails.io.js/dist/sails.io.js',
      'bower_components/angular-sails/dist/angular-sails.js',
      'bower_components/tinymce/tinymce.js',
      'bower_components/angular-ui-tinymce/src/tinymce.js',
      'bower_components/angular-simple-logger/dist/angular-simple-logger.js',
      'bower_components/leaflet/dist/leaflet-src.js',
      'bower_components/ui-leaflet/dist/ui-leaflet.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-moment/angular-moment.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular-socialshare/dist/angular-socialshare.min.js',
      'bower_components/ngMeta/dist/ngMeta.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/ng-file-upload-shim/ng-file-upload-shim.js',
      'bower_components/ngEmbed/src/ng-embed.js',
      'bower_components/angular-scroll-glue/src/scrollglue.js',
      'bower_components/chart.js/dist/Chart.js',
      'bower_components/angular-chart.js/dist/angular-chart.js',
      'bower_components/angular-youtube-mb/src/angular-youtube-embed.js',
      'bower_components/fullcalendar/dist/fullcalendar.js',
      'bower_components/angular-ui-calendar/src/calendar.js',
      'bower_components/ng-material-datetimepicker/js/angular-material-datetimepicker.js',
      'bower_components/angular-scroll/angular-scroll.js',
      'bower_components/ng-parallax/angular-parallax.min.js',
      'bower_components/angular-google-analytics/dist/angular-google-analytics.min.js',
      'bower_components/humanize-duration/humanize-duration.js',
      'bower_components/angular-timer/dist/angular-timer.js',
      'bower_components/croppie/croppie.js',
      'bower_components/angular-croppie/angular-croppie.js',
      'bower_components/angular-ui-grid/ui-grid.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
