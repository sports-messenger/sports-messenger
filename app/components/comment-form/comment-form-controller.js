'use strict';

module.exports = function(app) {
  app.controller('CommentFormController', ['$scope', '$log', function($scope, $log) {
    this.ratings = [1, 2, 3 , 4, 5];
    this.comment = $scope.comment || {};
    this.commentButtonText = $scope.commentButtonText;
    this.saveComment = $scope.saveComment;
    this.saveCommentAndNull = () => {
      $log.debug('cfCtrl.saveCommentAndNull');
      this.saveComment({comment: this.comment});
      $log.log('cfCtrl.comment', this.comment);
      if(!$scope.comment) this.comment = null;
    };
  }]);
};
