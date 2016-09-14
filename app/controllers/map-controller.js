'use strict';

module.exports = function(app) {
  app.controller('MapController', ['$scope', 'auth', function($scope, auth) {
    $scope.name = 'World';

    this.token = auth.getToken();
  }]);
};
