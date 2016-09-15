'use strict';

module.exports = function(app) {
  app.controller('ParkController', ['$log', '$http', '$rootScope', 'parksMapCombine', ParkController]);
};

function ParkController($log, $http, $scope, parksMapCombine) {
  this.hasAddress = false;
  this.addressString = null;
  this.addressPoint = null;
  $scope.addressPoint = {};
  $scope.serviceArray = [];
  this.parks = [];
  this.selectedParks = [];
  this.sports = ['Basketball (Full)', 'Basketball (Half)', 'Soccer', 'Tennis Court (Outdoor)', 'Baseball/Softball'];
  this.distances = [1, 3, 5, 10];

  $scope.$watch('serviceArray', function(newArray, oldArray) {
    if (newArray !== oldArray) parksMapCombine.setArray(newArray);
  });

  $scope.$watch('addressPoint', function(newPoint, oldPoint) {
    if (newPoint !== oldPoint) parksMapCombine.setAddressPoint(newPoint);
  });

  this.getAllParks = function() {
    $log.debug('parkCtrl.getAllParks');
    $http.get(this.baseUrl + '/parks', this.config)
    .then((res) => {
      this.parks = res.data;
    }, (err) => {
      $log.error('error in parkCtrl.getAllParks', err);
    });
  };

  this.setNewAddress = function() {
    $log.debug('parkCtrl.setNewAddress');
    let formattedString = this.addressString.split(' ').join('+');
    $log.log('formattedString', formattedString);
    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + formattedString + '&key=AIzaSyD6A3QVKo_K60NtkqF7vElOnbvCCxfnfOw').then((res) => {
      this.addressPoint = {lat:res.data.results[0].geometry.location.lat, lng: res.data.results[0].geometry.location.lng};
      parksMapCombine.setAddressPoint(this.addressPoint);
    });
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
    this.selectedParks = [];
    $log.debug('parkCtrl.setNearbyParks');
    this.parks.forEach((park) => {
      let parkDistance = this.getDistance(this.addressPoint, park);
      if(distance >= parkDistance) {
        this.selectedParks.push(park);
      }
    });
    parksMapCombine.setArray(this.selectedParks);
  };

}
