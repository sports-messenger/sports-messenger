'use strict';

module.exports = function(app){
  app.component('deleteToken', {
    controller: 'AuthController',
    template: require('./delete-token-template.html')
  });
};
