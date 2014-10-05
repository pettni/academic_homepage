angular.module('acadApp')

.controller('PubsCtrl', ['$scope', '$http', '$filter', '$modal',
	function($scope, $http, $filter, $modal) {

	// Remove ands
	var replaceAllButLast = function(string, token) {
		if (string.indexOf(token) == -1) {
			return string;
		}
		var parts = string.split(token);
		return parts.slice(0,-1) + token + parts.slice(-1)
	};

	// Give a nicely formatted bibtex entry
	var setBib = function(pub) {
		var text = '@' + pub.EntryType + '{' + pub.EntryKey
		Object.keys(pub.Fields).forEach(function (key) {
			if (key != 'Abstract' && key !='Author_noand'
				&& key != 'Url' && key != 'Slides') {
				text += ', \n  ' + key + ' = {' + pub.Fields[key] + '}'
		}
	})
		text += '\n}'
		return text;
	};

  	// Read data from bibfile
  	$http({method: 'GET', url: 'data/bibfile.bib'}).
  	success(function(data, status, headers, config) {
	  	// Parse bibtex to JSON
	  	rawbib = data;
	  	var rawjson = angular.fromJson(BibtexParser(data));

	  	// Remove `and' between authors
	  	for (index = 0; index < rawjson.entries.length; ++index) {
	  		rawjson.entries[index].Fields.Author_noand = 
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

	// Open the bibtex modal
	$scope.open = function (pub) {
		var modalInstance = $modal.open({
			templateUrl: 'html/bibmodal.html',
			controller: 'BibModalCtrl',
			size: 'lg',
			resolve: {
				text: function () {
					return setBib(pub);
				}
			}
		});
	};

}])