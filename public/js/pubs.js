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

	  	sorted_pubs = [];

	  	pub_search = $filter('filter')(rawjson.entries, {'EntryType': 'article'}, false);
	  	if (pub_search.length) { sorted_pubs.push({ name:'Journal papers', pubs: pub_search}) };

	  	pub_search = $filter('filter')(rawjson.entries, {'EntryType': 'inproceedings'}, false);
	  	if (pub_search.length) { sorted_pubs.push({ name:'Conference proceedings', pubs: pub_search}) };

	  	pub_search = $filter('filter')(rawjson.entries, {'EntryType': 'book'}, false);
	  	if (pub_search.length) { sorted_pubs.push({ name:'Books and chapters', pubs: pub_search}) };

	  	pub_search = $filter('filter')(rawjson.entries, {'EntryType': 'thesis'}, false);
	  	if (pub_search.length) { sorted_pubs.push({ name:'Theses', pubs: pub_search}) };

	  	$scope.sorted_pubs = sorted_pubs

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