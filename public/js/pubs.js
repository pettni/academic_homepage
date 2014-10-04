angular.module('acadApp')

.controller('PubsCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
	
	var replaceAllButLast = function(string, token) {
		if (string.indexOf(token) == -1) {
			return string;
		}
	    var parts = string.split(token);
	    return parts.slice(0,-1) + token + parts.slice(-1)
	}

	$http({method: 'GET', url: '/data/bibfile.bib'}).
	  success(function(data, status, headers, config) {
	  	// Parse bibtex to JSON
	  	var rawjson = angular.fromJson(BibtexParser(data));

	  	// Remove `and' between authors
	  	for (index = 0; index < rawjson.entries.length; ++index) {
	  	  rawjson.entries[index].Fields.Author = 
	  		replaceAllButLast(rawjson.entries[index].Fields.Author, " and");
	  	}

	  	// Check what kinds of publications we have
	  	$scope.hasConf = $filter('filter')(rawjson, {'EntryType': 'article'}, true);
	  	$scope.hasArticle = $filter('filter')(rawjson, {'EntryType': 'inproceedings'}, true);
	  	$scope.hasTheses = $filter('filter')(rawjson, {'EntryType': 'mastersthesis'}, true);;

	    $scope.pubs = rawjson;
	  }).
	  error(function(data, status, headers, config) {
	    $scope.error = "No publications found";
	  });
}])