'use strict'

angular.module('ng-chess').controller('SettingsController', ['$scope', '$location', 'Settings', function($scope, $location, Settings) {
	
	$scope.settings = Settings
	
	$scope.difficultyWhite = Settings.getDifficultyWhite()
	$scope.difficultyBlack = Settings.getDifficultyBlack()
	
	$scope.start = function() {
		Settings.setDifficultyWhite($scope.difficultyWhite.depth, $scope.difficultyWhite.width)
		Settings.setDifficultyBlack($scope.difficultyBlack.depth, $scope.difficultyBlack.width)
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