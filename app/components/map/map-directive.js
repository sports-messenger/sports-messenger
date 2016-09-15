'use strict';

module.exports = (app) => {
  app.directive('googleMap', function() {
    return {
      controller: 'MapController',
      controllerAs: 'mapCtrl',
      template: require('./map-template.html'),
      restrict: 'CA',
      bindToController: true,
      scope: {
        mapId: '@id',
        lat: '@',
        long: '@',
        baseUrl: '@',
        config: '='
      }
    };
  });
};
