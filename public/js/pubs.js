angular.module('acadApp')

.controller('PubsCtrl', ['$scope', '$http', function($scope, $http) {
	$http({method: 'GET', url: '/data/bibfile.bib'}).
	  success(function(data, status, headers, config) {
	    $scope.pubs = angular.fromJson(BibtexParser(data));
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
}])