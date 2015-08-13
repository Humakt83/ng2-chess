'use strict'

var angular = require('angular')

angular.module('ng-chess', [require('angular-route')])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/settings', {
				templateUrl: './settings.html',
				controller: 'SettingsController',
			})
			.when('/chess', {
				templateUrl: './chess.html',
				controller: 'ChessController'
			})
			.otherwise({
				redirectTo: '/settings'
			})
	}])
	
require('./js/settings')
require('./js/chess')
require('./js/pieces')
require('./js/position')
require('./js/ai')
require('./js/chesscontroller')
require('./js/settingscontroller')
require('./js/boarddirective')