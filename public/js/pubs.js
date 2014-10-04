

angular.module('acadApp')

.controller('PubsCtrl', ['$scope', '$http', function($scope, $http) {
	
	var replaceAllButLast = function(string, token) {
		if (string.indexOf(token) == -1) {
			return string;
		}
	    var parts = string.split(token);
	    return parts.slice(0,-1) + token + parts.slice(-1)
	}

	$http({method: 'GET', url: '/data/bibfile.bib'}).
	  success(function(data, status, headers, config) {
	  	var rawjson = angular.fromJson(BibtexParser(data));
	  	for (index = 0; index < rawjson.entries.length; ++index) 
	  	{
	  	  rawjson.entries[index].Fields.Author = 
	  		replaceAllButLast(rawjson.entries[index].Fields.Author, " and");
	  	}
	    $scope.pubs = rawjson;
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
}])