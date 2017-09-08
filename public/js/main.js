angular.module('acadApp', ['ngRoute', 'ui.bootstrap', 'ngResource'])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      controller:'StravaCtrl',
      templateUrl:'html/main.html'
    })
    .when('/pubs', {
      controller:'PubsCtrl',
      templateUrl:'html/pubs.html'
    })
    .when('/bio', {
      templateUrl:'html/bio.html'
    })
    .when('/more', {
      templateUrl:'html/more.html'
    })
    .otherwise({
      redirectTo:'/'
    });

  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('');

})
.controller('mainCtrl', function($scope, $location) {
  var updateButton = function() {
    $scope.button = $location.url();
  };

  $scope.navbarCollapsed = true;

  $scope.$on('$routeChangeStart', updateButton);
})
.filter('floor', function() {
  return function(input) {
    return Math.floor(input);
  };
});