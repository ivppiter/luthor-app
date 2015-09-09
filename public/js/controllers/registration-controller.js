(function(ng){
  var module = ng.module('Luthor');

  module.controller('RegistrationController', ['$scope', '$http', function($scope, $http){
    $scope.registration = {};
    $scope.performAction = false;

    $scope.doRegistration = function(params){
      $scope.performAction = true;
      $http
        .post('/api/register', params)
        .then(function(res){
          alert('Account created - Check your email');
        }, function(res){
          alert(res.data.message)
        })
        .finally(function(){
          $scope.checkingStatus = false;
        })
    }
  }]);
})(angular);