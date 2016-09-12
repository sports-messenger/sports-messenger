'use strict';

module.exports = (app) => {
  app.directive('smComment', function() {
    return {
      controller: 'CommentController',
      controllerAs: 'commentCtrl',
      template: require('./comment-template.html'),
      bindToController: true,
      scope: {
        baseUrl: '@',
        config: '=',
        park: '='
      }
    };
  });
};
