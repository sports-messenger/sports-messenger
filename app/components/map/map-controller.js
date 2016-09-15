'use strict';

module.exports = function(app) {
  app.controller('MapController', ['$rootScope', '$window', '$http', '$location', '$log', 'parksMapCombine', MapController]);

  function MapController($scope, $window, $http, $location, $log, parksMapCombine) {
    $scope.name = 'World';
    $scope.serviceArray = [];
    this.location = null;
    this.map = null;
    this.mapOptions = null;
    this.mapElement = document.getElementById('mapParis');
    this.mapPoints = [];
    this.image = 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1oXOM.img';
    this.addressPoint = null;
    this.selectedParks = [];
    this.sports = ['Basketball (Full)', 'Basketball (Half)', 'Soccer', 'Tennis Court (Outdoor)', 'Baseball/Softball'];
    this.distances = [1, 5, 10, 20];

    $scope.$watch(function() {return parksMapCombine.getArray();}, (newArray, oldArray) => {
      if (newArray !== oldArray) {
        $scope.serviceArray = newArray;
        this.mapPoints = $scope.serviceArray;
        this.setNewMap();
      }
    });

    $scope.$watch(function() {return parksMapCombine.getAddressPoint();}, (newPoint, oldPoint) =>{
      if(newPoint !== oldPoint) {
        $scope.addressPoint = newPoint;
        this.addressPoint = $scope.addressPoint;
        this.setNewMap();
      }
    });

    this.initializeMap = function() {
      $log.debug('initializeMap');
      this.location = new google.maps.LatLng(this.lat, this.long);
      this.mapOptions = {zoom: 12, center: this.location, icon: this.image};
      this.map = new google.maps.Map(this.mapElement, this.mapOptions);
      $http.get(this.baseUrl + '/parks', this.config).then((res) => {
        this.mapPoints = res.data;
        this.mapPoints.forEach((park) => {
          let marker = new google.maps.Marker({position: new google.maps.LatLng(park.location.ypos, park.location.xpos), map: this.map, icon: this.image, title: park.name});

          let contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '<p id="firstHeading">Location: '+ park.name +'</p>'+
          '<p id="sportsParagraphs">Sports: '+ park.sports +'</p>'+
          '<p id="locationHours">Hours: '+ park.hours +'</p>'+
          '<p id="parkUrl">Click To View Page</p>' +
          '</div>'+
          '</div>';

          let infoWindow = new google.maps.InfoWindow({content: contentString});

          marker.addListener('mouseover', () => {
            infoWindow.open(this.map, marker);
          });

          marker.addListener('mouseout', () => {
            infoWindow.close();
          });

          marker.addListener('click', () => {
            $location.path(this.baseUrl +'/parks/' + park._id);
          });

        });
      });
    };

    this.setNewMap = function() {
      let newLocation = this.addressPoint;
      this.location = new google.maps.LatLng(newLocation.lat, newLocation.lng);
      this.mapOptions = {zoom: 12, center: this.location, icon: this.image};
      let map = new google.maps.Map(this.mapElement, this.mapOptions);
      let image = 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1oXOM.img';
      this.mapPoints.forEach(function(park) {
        let marker = new google.maps.Marker({position: new google.maps.LatLng(park.location.ypos, park.location.xpos), map: map, icon: image, title: park.name});

        let contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '<p id="firstHeading">Location: '+ park.name +'</p>'+
        '<p id="sportsParagraphs">Sports: '+ park.sports +'</p>'+
        '<p id="locationHours">Hours: '+ park.hours +'</p>'+
        '<p id="parkUrl"><a href="#/parks/' + park._id +'">View Page</a></p>' +
        '</div>'+
        '</div>';

        let infoWindow = new google.maps.InfoWindow({content: contentString});

        marker.addListener('mouseover', () => {
          infoWindow.open(map, marker);
        });

        marker.addListener('mouseout', () => {
          infoWindow.close();
        });

        marker.addListener('click', () => {
          $location.path(this.baseUrl + '/parks/' + park._id);
        });

      });
    };

    // this.token = auth.getToken();
  }
};
