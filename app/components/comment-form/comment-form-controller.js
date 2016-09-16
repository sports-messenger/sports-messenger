'use strict';

module.exports = function(app) {
  app.controller('CommentFormController', ['$scope', '$log', '$routeParams', '$http',  function($scope, $log, $routeParams, $http) {
    this.ratings = [1, 2, 3 , 4, 5];
    this.comment = $scope.comment || {};
    let id = $routeParams.id;
    this.comment.parkId = id;
    this.commentButtonText = $scope.commentButtonText;
    this.saveComment = $scope.saveComment;
    this.baseUrl = (process.env.API_URL || 'http://localhost:3000') + '/api';

    this.saveCommentAndNull = () => {
      $log.debug('cfCtrl.saveCommentAndNull');
      this.saveComment({comment: this.comment});
      $log.log('cfCtrl.comment', this.comment);
      if(!$scope.comment) this.comment = null;
    };

    this.createComment = function(comment) {
      $log.debug('commentCtrl.createComment');
      $http.post(this.baseUrl + '/comments', comment, this.config)
        .then((res) => {
          $log.log('successfully created comment', res.data);
          this.comments.push(res.data);
          this.park.comments.push(res.data);
        })
        .catch((err) => {
          $log.error('error in commentCtrl.createComment', err);
        });
    };
  }]);
};
