'use strict';

module.exports = function(app) {
  app.controller('MapController', ['$scope', function($scope) {
    $scope.name = 'World';
  }]);
};
