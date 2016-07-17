(function() {
  'use strict';

  angular
    .module('app')
    .controller('addSiteController', addSiteController);

    addSiteController.$inject = ['Results','$scope','$alert', '$cookies'];

    function addSiteController (Results, $scope, $alert, $cookies) {
      $scope.error = false;
      $scope.formField = null;
      var userId = $cookies.get('userId');

      $scope.addForm = function() {
        var alertSuccess = $alert({
          title: 'Success',
          content: 'New Website has been added',
          container: '#alertContainer',
          type: 'success',
          duration: 6
        });

        var alertFail = $alert({
          title: 'Not Save',
          content: 'New Website has not been added',
          container: '#alertContainer',
          type: 'warning',
          duration: 6
        });

        var add = {
          title: $scope.title,
          url: $scope.url,
          description: $scope.description,
          id: userId
        }
        Results.postSite(add)
          .then(function(data) {
            console.log('New site has been added to DB');
            console.log(data);
            $scope.url = '';
            $scope.description = '';
            $scope.title = '';
            alertSuccess.show();
          })
          .catch(function() {
            console.log('Website failed to save!');
          });
      }
    }

})();
