(function(ng){
  var module = ng.module('Luthor');

  module.controller('LoginController', ['$scope', '$http', function($scope, $http){
    $scope.login = {};
    $scope.checkingStatus = true;

    $http.get('/api/v1/internal')
      .then(function(res){
        $scope.isLoggedIn = true;
        $scope.username = res.data.username;
      }, function(){
        $scope.isLoggedIn = false;
      })
      .finally(function(){
        $scope.checkingStatus = false;
      });

    $scope.doLogin = function(params){
      $scope.checkingStatus = true;
      $http.post('/api/login', params)
        .then(function(res){
          $scope.username = res.data.username;
        }, function(res){
          alert(res.data.message);
          delete $scope.username;
        })
        .finally(function(){
          $scope.checkingStatus = false;
        })
    };

    $scope.doLogout = function () {
      $scope.checkingStatus = true;
      $http.post('/api/logout')
        .then(function(res){
          delete $scope.username;
        }, function(res){
          delete $scope.username;
        })
        .finally(function(){
          $scope.checkingStatus = false;
        })
    };
  }]);
})(angular);