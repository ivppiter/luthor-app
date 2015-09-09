(function(ng){
  var module = ng.module('Luthor');

  module.controller('ActivationController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    $scope.activate = {
      username: $routeParams.username,
      token: $routeParams.token
    };
    $scope.doActivation = function(params){
      $http
        .post('/api/activate', params)
        .then(function(res){
          if(res.data.success) {
            location.href = '#/login';
          }
          else{
            alert(res.data.message);
          }
        }, function(res){
          alert(res.data.message);
        })
    };
  }]);
})(angular);