'use strict'

angular.module('ng-chess').controller('SettingsController', ['$scope', '$location', 'Settings', function($scope, $location, Settings) {
	
	$scope.settings = Settings
	
	$scope.start = function() {
		$location.path('chess')
	}
	
	$scope.togglePlayer = function(white) {
		if (white) {
			Settings.setWhiteIsComputer(!Settings.isWhiteComputer())
		} else {
			Settings.setBlackIsComputer(!Settings.isBlackComputer())
		}
	}
	
}])