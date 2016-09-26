'use strict';

module.exports = (app) => {
  app.directive('smSinglePark', function() {
    //this probably would have worked really well as a component and would have saved you some syntax
    return {
      controller: 'SingleParkController',
      controllerAs: 'spCtrl',
      template: require('./single-park-template.html'),
      bindToController: true,
      scope: {
        baseUrl: '@',
        config: '=',
      }
    };
  });
};
