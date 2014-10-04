angular.module('acadApp', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl:'html/main.html'
    })
    .when('/pubs', {
      controller:'PubsCtrl',
      templateUrl:'html/pubs.html'
    })
    .when('/bio', {
      templateUrl:'html/bio.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})