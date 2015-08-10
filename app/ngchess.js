'use strict'

var angular = require('angular')

angular.module('ng-chess', [require('angular-route')])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/chess', {
				templateUrl: './chess.html',
				controller: 'ChessController'
			})
			.otherwise({
				redirectTo: '/chess'
			})
	}])
	
require('./js/chess')
require('./js/pieces')
require('./js/position')
require('./js/ai')
require('./js/chesscontroller')