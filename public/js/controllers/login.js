(function() {
  'use strict';

  angular
    .module('app')
    .controller('loginController', loginController);

    loginController.$inject = ['$scope','Auth', '$state', '$cookies'];

    function loginController($scope,Auth,$state,$cookies) {
      $scope.error = false;
      $scope.login = function () {
        var user = {
          username: $scope.username,
          password: $scope.password
        }
        Auth.login(user)
          .success(function(data) {
            console.log('login successful!');
            $cookies.put('user', data.user.username);
            $cookies.put('userId', data.user._id);
            $state.go('add');
          })
          .error(function () {
            console.log("Error Logging in!");
            $scope.error = true;
            $scope.errorMessage = 'Something went Wrong!';
          });
      }
    }

})();
