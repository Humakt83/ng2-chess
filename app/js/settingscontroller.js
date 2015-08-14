'use strict'

angular.module('ng-chess').controller('SettingsController', ['$scope', '$location', 'Settings', 'ChessAI', function($scope, $location, Settings, ChessAI) {
	
	var _ = require('underscore')
	
	$scope.settings = Settings
	
	$scope.difficultyWhite = Settings.getDifficultyWhite()
	$scope.difficultyBlack = Settings.getDifficultyBlack()
	$scope.personalities = ChessAI.getPersonalities()
	$scope.personalityNames = Object.keys($scope.personalities)
	
	$scope.start = function() {
		Settings.setDifficultyWhite($scope.difficultyWhite.depth, $scope.difficultyWhite.width)
		Settings.setDifficultyBlack($scope.difficultyBlack.depth, $scope.difficultyBlack.width)
		$location.path('chess')
	}
	
	$scope.selectPersonality = function(white, personalityName) {
		function setPersonality(method) {
			method(personalityName ? _.propertyOf($scope.personalities)(personalityName) : undefined)
		}
		if (white) setPersonality(Settings.setPersonalityWhite)
		else setPersonality(Settings.setPersonalityBlack)
	}
	
	$scope.togglePlayer = function(white) {
		if (white) {
			Settings.setWhiteIsComputer(!Settings.isWhiteComputer())
		} else {
			Settings.setBlackIsComputer(!Settings.isBlackComputer())
		}
	}
	
}])