'use strict'

angular.module('ng-chess').controller('ChessController', ['$scope', '$timeout', '$window', '$location', 'ChessService', 'ChessAI', 'Settings',
		function($scope, $timeout, $window, $location, ChessService, ChessAI, Settings) {
		
	$scope.selectPiece = function(x, y) {
		if (!$scope.gameOver) {
			if (!$scope.chessBoard.selected || $scope.chessBoard.canSetSelected(x, y)) {
				$scope.chessBoard.setSelected(x, y)
			} else if ($scope.chessBoard.isMovable(x, y)) {
				$scope.chessBoard.movePiece($scope.chessBoard.selected, ChessService.createPosition(x, y))
				$scope.checkState()
				if (!$scope.gameOver && ($scope.aiBlack || $scope.aiWhite)) {
					$scope.aiTurn()
				}
			}
		}
	}
	
	$scope.piece = ChessService.getPiece()
		
	$scope.aiTurn = function() {
		$scope.doNotHighlightSelected = true
		$timeout(function() {
			if ($scope.chessBoard.turnOfWhite) $scope.aiWhite.playTurn($scope.chessBoard)
			else $scope.aiBlack.playTurn($scope.chessBoard)
			$scope.checkState()
			return !$scope.gameOver && (($scope.chessBoard.turnOfWhite && $scope.aiWhite) || (!$scope.chessBoard.turnOfWhite && $scope.aiBlack))
		}, 300).then(function(continueGame) {
			if (continueGame) {
				$scope.aiTurn()
			} else {
				$scope.doNotHighlightSelected = false
			}
		})
	}
	
	$scope.checkState = function() {
		$scope.blackPieces = $scope.chessBoard.getBlackPieces()
		$scope.whitePieces = $scope.chessBoard.getWhitePieces()
		$scope.gameOver = $scope.chessBoard.isGameOver()
		if ($scope.gameOver) {
			gameOver()
		}
	}
	
	var gameOver = function() {
		if ($scope.chessBoard.isStaleMate()) {
			$scope.chessOverText = 'Stalemate'
		} else if ($scope.chessBoard.isCheckMate()) {
			$scope.chessOverText = 'Checkmate'
		} else if ($scope.chessBoard.isInsufficientMaterial()) {
			$scope.chessOverText = 'Insufficient material'
		} else if ($scope.chessBoard.isThreefoldRepetition()) {
			$scope.chessOverText = 'Threefold repetition'
		} else if ($scope.chessBoard.isOverMoveLimit()) {
			$scope.chessOverText = 'Move limit reached'
		} else {
			$scope.chessOverText = 'Game over for unknown reason?'
		}
	}
	
	$scope.aiOnBlack = Settings.isBlackComputer()
	$scope.aiOnWhite = Settings.isWhiteComputer()
	$scope.chessBoard = ChessService.getNewChess()
	if ($scope.aiOnBlack) $scope.aiBlack = ChessAI.createAI(true, Settings.getDifficultyBlack(), Settings.getPersonalityBlack())
	if ($scope.aiOnWhite) $scope.aiWhite = ChessAI.createAI(false, Settings.getDifficultyWhite(), Settings.getPersonalityWhite())
		
	$scope.checkState()
	
	if ($scope.aiWhite) {
		$scope.aiTurn()
	}
	
	$scope.restart = function() {
		$scope.gameOver = undefined
		$scope.chessBoard = ChessService.getNewChess()
		if ($scope.aiWhite) {
			$scope.aiTurn()
		}
	}
	
	$scope.toSettings = function() {
		$location.path("settings")
	}
	
}])
