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
    .when('/more', {
      templateUrl:'html/more.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})
.controller('mainCtrl', function($scope, $location) {
  var updateButton = function() {
    $scope.button = $location.url();
  };

  $scope.$on('$routeChangeStart', updateButton);
})