'use strict'

angular.module('ng-chess').factory('Settings', function() {
		
	var createDifficulty = function(d, w) {
		d = d || 3
		w = w || 30
		return {depth : d, width: w}
	}
	
	var whiteIsComputer = false
	var blackIsComputer = true
	var difficultyWhite = createDifficulty()
	var difficultyBlack = createDifficulty()
	var personalityWhite
	var personalityBlack
	
	return {
		isWhiteComputer : function() { return whiteIsComputer },
		isBlackComputer : function() { return blackIsComputer },
		setWhiteIsComputer : function(computer) { whiteIsComputer = computer },
		setBlackIsComputer : function(computer) { blackIsComputer = computer },
		getDifficultyWhite : function() { return difficultyWhite },
		getDifficultyBlack : function() { return difficultyBlack },
		setDifficultyWhite : function(d, w) { difficultyWhite = createDifficulty(d, w) },
		setDifficultyBlack : function(d, w) {difficultyBlack = createDifficulty(d, w) },
		getPersonalityWhite : function() { return personalityWhite },
		getPersonalityBlack : function() { return personalityBlack },
		setPersonalityWhite : function(personality) { personalityWhite = personality },
		setPersonalityBlack : function(personality) { personalityBlack = personality }
	}
})