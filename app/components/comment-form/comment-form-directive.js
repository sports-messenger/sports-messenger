'use strict';

module.exports = (app) => {
  app.directive('smCommentForm', function() {
    return {
      controller: 'CommentFormController',
      controllerAs: 'cfCtrl',
      template: require('./comment-form-template.html'),
      transclude: true,
      scope: {
        commentButtonText: '@',
        saveComment: '&',
        comment: '='
      }
    };
  });
};
