(function() {
  'use strict'

  angular
    .module('app')
    .factory('Results', Results);

    Results.$inject = ['$http'];

    function Results($http) {
      return {
        searchResults: searchResults,
        postSite: postSite
      };

      function searchResults(id) {
        return $http.post('/websites/search', id);
      };

      function postSite(site) {
        return $http.post('/websites/create', site);
      };
    };
})();
