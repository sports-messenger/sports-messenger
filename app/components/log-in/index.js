'use strict';

module.exports = (app) => {
  app.component('signIn', {
    controller: 'AuthController',
    template: require('./sign-in-template.html'),
    bindings: {
      baseUrl: '<'
    }
  });
};
