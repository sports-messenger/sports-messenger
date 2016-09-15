'use strict';

module.exports = function(app) {
  app.controller('ParkController', ['$log', '$http', 'parksMapCombine', ParkController]);
};

function ParkController($log, $http, parksMapCombine) {
  this.addressString = null;
  this.addressPoint = null;
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

  this.setNewAddress = function(next, distance) {
    $log.debug('parkCtrl.setNewAddress');
    let formattedString = this.addressString.split(' ').join('+');
    $log.log('formattedString', formattedString);
    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + formattedString + '&key=AIzaSyD6A3QVKo_K60NtkqF7vElOnbvCCxfnfOw').then((res) => {
      $log.log('result from get call to google maps', res);
      this.addressPoint = {lat:res.data.results[0].geometry.location.lat, lng: res.data.results[0].geometry.location.lng};
      $log.log('SetNewAddress AddressPoint', this.addressPoint);
      parksMapCombine.setAddressPoint(this.addressPoint);
    });
    next(distance);
  };

  this.getRadian = function(num) {
    return (num * Math.PI / 180);
  };

  this.getDistance = function(address, park) {
    let radius = 3959;
    let dLat = this.getRadian(park.location.ypos - address.lat);
    let dLon = this.getRadian(park.location.xpos - address.lng);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.getRadian(address.lat) * Math.cos(this.getRadian(park.location.ypos))) *
    Math.sin(dLon / 2) * Math.sin(dLon/ 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = radius * c;
    return d;
  };

  this.setSelectedParks = function(sport) {
    this.selectedParks = [];
    $log.debug('parkCtrl.setSelectedParks');
    this.parks.forEach((park) => {
      park.sports.forEach((index) => {
        if(index === sport) this.selectedParks.push(park);
      });
    });
    parksMapCombine.setArray(this.selectedParks);
  };

  this.setNearbyParks = function(distance) {
    $log.log('distance in setNearbyParks', distance);
    this.selectedParks = [];
    $log.debug('parkCtrl.setNearbyParks');
    $log.log('addressPoint', this.addressPoint);
    this.parks.forEach((park) => {
      let parkDistance = this.getDistance(this.addressPoint, park);
      $log.log('distance from park to location', parkDistance);
      if(distance >= parkDistance) {
        this.selectedParks.push(park);
      }
    });
    $log.log('selectedParks in setNearbyParks', this.selectedParks);
    parksMapCombine.setArray(this.selectedParks);
  };

  this.createPark = function(park) {
    $log.debug('parkCtrl.createPark');
    $http.post(this.baseUrl + '/parks', park, this.config)
    .then((res) => {
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
