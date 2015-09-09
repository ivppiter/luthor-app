(function(ng){
  ng.module('Luthor').config(function($routeProvider){
    $routeProvider
      .when('/login', {
        templateUrl: '/views/login.html'
      })
      .when('/register', {
        templateUrl: '/views/register.html'
      })
      .when('/activate', {
        templateUrl: '/views/activate.html'
      })
      .otherwise({ redirectTo: '/login' });
  });
})(angular);