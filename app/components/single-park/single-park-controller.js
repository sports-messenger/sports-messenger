'use strict';

module.exports = function(app) {
  app.controller('SingleParkController', ['$log', '$http', '$location', SingleParkController]);
};

function SingleParkController($log, $http, $location){
  this.pathId = $location.path();
  this.park = null;

  this.getPark = function() {
    $log.debug('spCtrl.getPark');
    $http.get(this.baseUrl + this.pathId, this.config)
    .then((res) => {
      $log.log('res.data', res.data);
      this.park = res.data;
    }, (err) => {
      $log.error('error in spCtrl.getPark', err);
    });
  };
}
