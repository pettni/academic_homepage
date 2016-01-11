angular.module('acadApp')

.controller('StravaCtrl', ['$scope', '$resource',
	function($scope, $resource) {

		access_token = 'd535a4d826d3a3eb1ca52b404cba7c520b3a4a96';
		athlete = '2211127';
		currrentime = Date.now()/1000;
		time_week = currrentime - 7*24*3600;
		$scope.strava_link = 'https://www.strava.com/athletes/' + athlete;

		var activities = $resource('https://www.strava.com/api/v3/athletes/:athlete/activities',
			{
				callback: 'JSON_CALLBACK',
				athlete: athlete,
				access_token: access_token
			},
			{
				read: {
					method: 'JSONP',
					isArray: true,
					params: {after: time_week
					}
				}
			}
		);

		var stats = $resource('https://www.strava.com/api/v3/athletes/:athlete/stats',
			{
				callback: 'JSON_CALLBACK',
				athlete: athlete,
				access_token: access_token
			},
			{
				read: {
					method: 'JSONP'
				}
			}
		);
	
		$scope.cycling_week_dist = 0;
		$scope.running_week_dist = 0;
		
		stats.read({}).$promise.then(
			function(response) {
				$scope.cycling_ytd_dist = response['ytd_ride_totals']['distance'];
				$scope.running_ytd_dist = response['ytd_run_totals']['distance'];
			},
			function(error) {
				$scope.ytd=error;
			}
		);

		activities.read({}).$promise.then(
			function(response) {
				for (var i = response.length - 1; i >= 0; i--) {
					if (response[i]['type'] == 'Run') {
						$scope.running_week_dist += response[i]['distance']
					}
					if (response[i]['type'] == 'Ride') {
						$scope.cycling_week_dist += response[i]['distance']
					}
					if (response[i]['type'] == 'VirtualRide') {
						$scope.cycling_week_dist += response[i]['distance']
					}
				}
			},
			function(error) {

			}
		);

}])
