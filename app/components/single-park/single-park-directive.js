'use strict';

module.exports = (app) => {
  app.directive('smSinglePark', function() {
    return {
      controller: 'SingleParkController',
      controllerAs: 'spCtrl',
      template: require('./single-park-template.html'),
      bindToController: true,
      scope: {
        baseUrl: '@',
        config: '=',
        park: '@'
      }
    };
  });
};
