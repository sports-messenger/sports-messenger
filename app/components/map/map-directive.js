'use strict';

module.exports = (app) => {
  app.directive('googleMap', ['$rootScope', '$http', 'lazyLoadApi', function($rootScope, $http, lazyLoadApi, parkMapCombine) {
    return {
      restrict: 'CA', // restrict by class name
      scope: {
        mapId: '@id', // map ID
        lat: '@', // latitude
        long: '@' // longitude
      },
      link: function(scope, element, attrs) {
        var location = null;
        var map = null;
        var mapOptions = null;
        var mapPoints = [];


      // Check if latitude and longitude are specified
        if (angular.isDefined(scope.lat) && angular.isDefined(scope.long)) {
        // Loads google map script
          lazyLoadApi.then( initializeMap );
        }

      // Initialize the map
        function initializeMap() {
          var location = new google.maps.LatLng(scope.lat, scope.long);

          var mapOptions = {
            zoom: 12,
            center: location
          };

          var map = new google.maps.Map(element[0], mapOptions);

          $http.get(`${__API_URL__}/api` + '/parks', {
            headers: {
              'Content-Type': 'appliction/json',
              'Accept': 'application/json'
            }
          }).then(function(res){
            mapPoints = res.data;
            mapPoints.forEach(function(park) {
              new google.maps.Marker({
                position: new google.maps.LatLng(park.location.ypos, park.location.xpos),
                map: map
              });
            });
          });

          var marker2 = new google.maps.Marker({
            position: location,
            map: map,
            title: 'marker1'
          });
        }
        function setNewMap() {
          location = parkMapCombine.getAddressPoint();
          mapOptions = {zoom: 12, center: location};
          map = new google.maps.Map([element[0], mapOptions]);
          mapPoints = parkMapCombine.getArray();
          mapPoints.forEach(function(park) {
            new google.maps.Marker({position: new google.maps.LatLng(park.location.ypos, park.location.xpos), map: map});
          });
        }

      }
    };
  }]);
};
