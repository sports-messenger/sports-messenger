'use strict';

module.exports = function(app) {
  app.controller('SingleParkController', ['$log', '$http', '$location', 'auth',  SingleParkController]);
};

function SingleParkController($log, $http, $location, auth){
  this.pathId = $location.path();
  this.park = null;

  this.getPark = function() {
    auth.getUser();
    $log.debug('spCtrl.getPark');
    $http.get(this.baseUrl + this.pathId, this.config)
    .then((res) => {
      this.park = res.data;
    }, (err) => {
      $log.error('error in spCtrl.getPark', err);
    });
  };

  this.addComment = (comment) => {
    this.comments.push(comment._id);
  };
}
