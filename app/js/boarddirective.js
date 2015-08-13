angular.module('ng-chess').directive('board', ['$window', function($window) {
    return function (scope, element, attrs) {
		var element = element[0]
        element.height = $window.innerHeight
		element.maxHeight = element.height
		element.width = element.height
		element.maxWidth = element.height
    }
}])