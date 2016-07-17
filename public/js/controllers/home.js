(function() {
  'use strict';

  angular
    .module('app')
    .controller('homeController', homeController);

    homeController.$inject = ['$scope', 'Auth', 'Results'];

    function homeController($scope, Auth, Results) {
      $scope.site = [];
      $scope.getResults = function() {
        var id = {
          searchText: $scope.searchText
        };
        Results.searchResults(id)
        .then(function (data) {
          console.log(data);
          $scope.searchText = '';
          $scope.site = data.data;
          angular.forEach($scope.site, function(value, key) {
            console.log(key + ':' + value);
          });
        });
      }
    }
})();
