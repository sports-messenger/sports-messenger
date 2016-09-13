'use strict';

module.exports = (app) => {
  app.component('logIn', {
    controller: 'AuthController',
    template: require('./log-in-template.html'),
    bindings: {
      baseUrl: '<'
    }
  });
};
