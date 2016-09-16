'use strict';

module.exports = function(app) {
  app.controller('CommentController', ['$log', '$http', '$window','auth', CommentController]);

  function CommentController($log, $http, $window, auth) {
    this.comments = [];
    this.authConfig = {headers: {'Accept': 'application/json', 'Content-Type':'application/json', 'Authorization':'Bearer ' + $window.localStorage.token}};
    this.getAllComments = function() {
      auth.getUser();
      $log.debug('commentCtrl.getAllComments');
      $http.get(this.baseUrl + '/comments', this.config)
        .then((res) => {
          this.comments = res.data.filter((comment) => {
            if(comment.parkId === this.park._id) {
              return comment;
            }
          });
        }, (err) => {
          $log.error('error in commentCtrl.getAllComments', err);
        });
    };

    this.deleteComment = function(comment) {
      $log.debug('commentCtrl.deleteComment');
      $http.delete(this.baseUrl + '/comments/' + comment._id, this.config)
        .then((res) => {
          this.comments.splice(this.comments.indexOf(comment), 1);
        }, (err) => {
          $log.error('error in commentCtrl.deleteComment', err);
        });
    };

    this.createComment = function(comment) {
      $log.log('token in createComment', this.authConfig);
      $log.debug('commentCtrl.createComment');
      comment.parkId = this.park._id;
      comment.username = $window.localStorage.username;
      $http.post(this.baseUrl + '/comments', comment, this.authConfig)
        .then((res) => {
          this.comments.push(res.data);
        })
        .catch((err) => {
          $log.error('error in commentCtrl.createComment', err);
        });
    };
  }
};
