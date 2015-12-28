angular.module('acadApp')

.controller('StravaCtrl', ['$scope', '$resource',
	function($scope, $resource) {

		access_token = 'd535a4d826d3a3eb1ca52b404cba7c520b3a4a96';
		athlete = '2211127';
		currrentime = Date.now()/1000;
		time_week = currrentime - 7*24*3600;
		$scope.strava_link = 'https://www.strava.com/athletes/' + athlete;

		var athlete = $resource('https://www.strava.com/api/v3/athletes/:athlete/activities',
			{
				callback: 'JSON_CALLBACK',
				athlete: athlete
			},
			{
				read: {
					method: 'JSONP',
					isArray: true,
					params: {access_token: access_token,
							after: time_week
					}
				}
			}
		)
	
		$scope.cycling_dist = 0;
		$scope.running_dist = 0;
		$scope.total_time = 0;

		athlete.read({}).$promise.then(
			function(activities) {
				for (var i = activities.length - 1; i >= 0; i--) {
					if (activities[i]['type'] == 'Run') {
						$scope.running_dist += activities[i]['distance']
					}
					if (activities[i]['type'] == 'Ride') {
						$scope.cycling_dist += activities[i]['distance']
					}
					$scope.total_time += activities[i]['moving_time'];
				};
			},
			function(error) {

			}
		);

}])
