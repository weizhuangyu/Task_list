//应用程序文件
var app = angular.module("app",['ngRoute','ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: "childCtrl1",
            templateUrl: "ScheduleList.html"
        })
        .when('/ScheduleEdit', {
            controller: "childCtrl2",
            templateUrl: "ScheduleEdit.html"
        })
        .otherwise({
            redirectTo: '/'
        });
});