angular.module('app', ['ionic', "app.controllers", "app.services"])
    .run(function ($ionicPlatform, $localStorage) {
        $localStorage.setArr("recArr", []);
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

        })
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'home'
            })
            .state('recList', {
                url: '/recList',
                templateUrl: 'templates/recList.html',
                controller: 'recList'
            });
        $urlRouterProvider.otherwise('/home');
    });
angular.module("app.controllers", []);
angular.module("app.services", []);