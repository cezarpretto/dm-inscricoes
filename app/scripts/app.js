'use strict';

/**
 * @ngdoc overview
 * @name dmInscricoesApp
 * @description
 * # dmInscricoesApp
 *
 * Main module of the application.
 */
angular
  .module('dmInscricoesApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'naif.base64',
    'smart-table',
    'angular-growl',
    'angular-loading-bar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/inscricao/:id_inscricao?', {
        templateUrl: 'views/inscricao.html',
        controller: 'InscricaoCtrl',
        controllerAs: 'inscricao'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/mainAdmin', {
        templateUrl: 'views/mainadmin.html',
        controller: 'MainadminCtrl',
        controllerAs: 'mainAdmin'
      })
      .when('/usuarios', {
        templateUrl: 'views/usuarios.html',
        controller: 'UsuariosCtrl',
        controllerAs: 'usuarios'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('httpInterceptor');
  }])
  .config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel):|data:application\//);
  }]);
