'use strict';

module.exports = function(app) {
  app.controller('CommentController', ['$log', '$http', '$window','auth', CommentController]);

  function CommentController($log, $http, $window, auth) {
    this.comments = [];
    this.getAllComments = function() {
      auth.getUser();
      $log.debug('commentCtrl.getAllComments');
      $http.get(this.baseUrl + '/comments', this.config)
        .then((res) => {
          $log.log('commentCtrl.getAllComments res.data', res.data);
          this.comments = res.data.filter((comment) => {
            if(comment.parkId === this.park._id) {
              return comment;
            }
          });
          $log.log('this.comments', this.comments);
        }, (err) => {
          $log.error('error in commentCtrl.getAllComments', err);
        });
    };

    this.deleteComment = function(comment) {
      $log.debug('commentCtrl.deleteComment');
      $http.delete(this.baseUrl + '/comments/' + comment._id, this.config)
        .then((res) => {
          this.comments.splice(this.comments.indexOf(comment), 1);
          $log.log('commentCtrl.deleteComment res', res);
        }, (err) => {
          $log.error('error in commentCtrl.deleteComment', err);
        });
    };

    this.createComment = function(comment) {
      $log.debug('commentCtrl.createComment');
      $log.log('this.currentUser in createComment', this.currentUser);
      comment.parkId = this.park._id;
      comment.username = $window.localStorage.username;
      $http.post(this.baseUrl + '/comments', comment, this.config)
        .then((res) => {
          $log.log('successfully created comment', res.data);
          this.comments.push(res.data);
        })
        .catch((err) => {
          $log.error('error in commentCtrl.createComment', err);
        });
    };
  }
};
