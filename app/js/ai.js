'use strict'

angular.module('ng-chess').factory('ChessAI', [function() {
	
	var _ = require('underscore')
	
	const xMin = 0, yMin = 0, xMax = 7, yMax = 7
	
	const defaultValuesForPiece = [50, 95, 95, 125, 240, 5000]
	const pawned = [90, 95, 95, 125, 240, 5000]
	const horse = [40, 120, 75, 125, 240, 5000]
	const missionary = [40, 75, 120, 125, 240, 5000]
	const rookie = [40, 80, 80, 200, 240, 5000]
	const widowmaker = [40, 85, 95, 125, 1000, 5000]
	const officer = [30, 100, 100, 150, 300, 5000]
	
	const personalities = { personality_pawned: pawned, personality_horse: horse, personality_missionary: missionary, personality_rookie: rookie, 
		personality_widowmaker: widowmaker, personality_officer: officer}
	
	var	getValueForPiece = function(piece, x, y, personality) {
		function getValueOfCoordX(coord) {
			if (coord === 3 || coord === 4) return 6
			if (coord === 2 || coord === 5) return 3
			if (coord === 1 || coord === 6) return 1
			return 0
		}
		function getValueOfCoordY(coord) {
			if ( piece === -1 ) return coord
			if ( piece === 1) return 7 - coord
			return getValueOfCoordX(coord)
		}
		return personality[Math.abs(piece) - 1] + getValueOfCoordX(x) + getValueOfCoordY(y)
	}
	
	var evaluateBoard = function(board, personality) {
		var score = 0
		for (var y = yMin; y <= yMax; y++) {
			for (var x = xMin; x <= xMax; x++) {
				if (board[x][y] > 0)
					score += getValueForPiece(board[x][y], x, y, personality)
				if(board[x][y] < 0)
					score -= getValueForPiece(board[x][y], x, y, personality)
			}				
		}
		return score
	}	
		
	var calculateScoreOfTheMove = function(move, personality) {
		var score = evaluateBoard(move.boardAfterMove, personality)
		move.calculatedScore = score
		return score
	}
		
	function AI(black, depth, evalueNBestMoves, personality) {
		
		this.topMoves = function(chess) {
			var moves = chess.allowedMoves
			var that = this
			if (this.black) {
				return _.chain(moves).sortBy(function(move) {
					return calculateScoreOfTheMove(move, that.personality)
				}).first(this.evalueNBestMoves).value()
			} else {				
				return _.chain(moves).sortBy(function(move) {
					return calculateScoreOfTheMove(move, that.personality)
				}).last(this.evalueNBestMoves).value()
			}
		}
		
		this.pickBestMove = function(chess) {
			
			var	topMoves = this.topMoves(chess)
			if (this.depth > 1) {
				var aiOpponent = new AI(!this.black, this.depth - 1, this.evalueNBestMoves, this.personality)
				aiOpponent.notOriginal = true
				_.each(topMoves, function(move) {
					chess.makeMove(move)
					if (chess.allowedMoves.length < 1) {
						move.calculatedScore = aiOpponent.black ? 99999 : -99999
					} else {
						move.calculatedScore = aiOpponent.pickBestMove(chess).calculatedScore
					}
					chess.undoMove()
				})
			}
			return this.black ? _.chain(topMoves).min(function(move) { return move.calculatedScore }).value()
				: _.chain(topMoves).max(function(move) { return move.calculatedScore }).value()
		}
		
		this.playTurn = function(chess) {
			chess.aiTurn = true
			var move = this.pickBestMove(chess)
			if (!move) return
			chess.aiTurn = false
			chess.makeMove(move)
		}
		this.black = black
		this.depth = depth
		this.evalueNBestMoves = evalueNBestMoves
		this.personality = personality
	}
	
	return {
		createAI : function(black, difficulty, personality) {
			return new AI(black, difficulty.depth, difficulty.width, personality ? personality : defaultValuesForPiece)
		},
		getPersonalities : function() {
			return personalities
		}
	}
}])