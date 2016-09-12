'use strict';

module.exports = (app) => {
  app.directive('smPark', function() {
    return {
      controller: 'ParkController',
      controllerAs: 'parkCtrl',
      template: require('./park-template.html'),
      bindToController: true,
      scope: {
        baseUrl: '@',
        config: '='
      }
    };
  });
};
