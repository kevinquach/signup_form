/**
 * Created by kevinquach on 5/16/14.
 */
angular.module('myApp', [])
    .directive('ensureUnique', ['$http', function($http) {
        return {
            require: 'ngModel',
            link: function(scope, ele, attrs, c) {
                scope.$watch(attrs.ngModel, function() {
                    $http({
                        method: 'POST',
                        url: '/api/check/' + attrs.ensureUnique,
                        data: {'field': attrs.ensureUnique}
                    }).success(function(data, status, headers, cfg) {
                        c.$setValidity('unique', data.isUnique);
                    }).error(function(data, status, headers, cfg) {
                        c.$setValidity('unique', false);
                    });
                });
            }
        };
    }]);