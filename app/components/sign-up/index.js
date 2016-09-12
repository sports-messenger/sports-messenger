'use strict';

module.exports = (app) => {
  app.component('signUp', {
    controller: 'AuthController',
    template: require('./sign-up-template.html'),
    bindings: {
      baseUrl: '<'
    }
  });
};
