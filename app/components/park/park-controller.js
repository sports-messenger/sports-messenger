'use strict';

module.exports = function(app) {
  app.controller('ParkController', ['$log', '$http', ParkController]);
};

function ParkController($log, $http) {
  this.parks = [];
  this.selectedParks = [];
  this.sports = ['Basketball (Full)', 'Basketball (Half)', 'Soccer', 'Tennis Court (Outdoor)', 'Baseball/Softball'];
  this.distances = [1, 5, 10, 20];
  this.getAllParks = function() {
    $log.debug('parkCtrl.getAllParks');
    $http.get(this.baseUrl + '/parks', this.config)
    .then((res) => {
      this.parks = res.data;
    }, (err) => {
      $log.error('error in parkCtrl.getAllParks', err);
    });
  };

  this.getSelectedParks = function(sport) {
    this.selectedParks = [];
    $log.debug('parkCtrl.getSelectedParks');
    $log.log('sport argument', sport);
    this.parks.forEach((park) => {
      park.sports.forEach((index) => {
        if(index === sport) this.selectedParks.push(park);
      });
    });
    $log.log('this.parks', this.parks);
    $log.log('this.selectedParks', this.selectedParks);
  };

  this.createPark = function(park) {
    $log.debug('parkCtrl.createPark');
    $http.post(this.baseUrl + '/parks', park, this.config)
    .then((res) => {
      $log.log('successfully created park', res.data);
      this.parks.push(res.data);
    })
    .catch((err) => {
      $log.error('error in parkCtrl.createPark', err);
    });
  };

  this.deletePark = function(park) {
    $log.debug('parkCtrl.deletePark');
    $http.delete(this.baseUrl + '/parks/' + park._id, this.config)
    .then((res) => {
      this.parks.splice(this.parks.indexOf(park), 1);
      $log.log('parkCtrl.deletePark res', res);
    }, (err) => {
      $log.error('error in parkCtrl.deletePark', err);
    });
  };

  this.updatePark = function(park) {
    $log.debug('parkCtrl.updatePark');
    $http.put(this.baseUrl +'/parks/' + park._id, park, this.config)
    .then((res) => {
      park.editing = true;
      $log.log('parkCtrl.updatePark res', res);
    }, (err) => {
      $log.error('error in parkCtrl.updatePark', err);
    });
  };

}
