angular.module("app.services")
    .factory('$localStorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setArr: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getArr: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }]);