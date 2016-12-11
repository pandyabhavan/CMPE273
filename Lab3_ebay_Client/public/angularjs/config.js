var ebay = angular.module('ebay', ['ngRoute']);

ebay.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/Home.html"
    })
    .when("/home", {
        templateUrl : "templates/Home.html"
    })
    .when("/login", {
        templateUrl : "templates/login.html"
    })
    .when('/search', {
        templateUrl : "templates/search.html"
    })
    .when('/cart', {
        templateUrl : "templates/cart.html"
    })
    .when('/checkout', {
        templateUrl : "templates/checkout.html"
    })
    .when('/product', {
        templateUrl : "templates/product.html"
    })
    .when('/user/:handle', {
        templateUrl : "templates/profile.html"
    })
    .otherwise({
        redirectTo: '/'
    });
});