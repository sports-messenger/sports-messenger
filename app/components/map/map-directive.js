'use strict';

module.exports = (app) => {
  app.directive('googleMap', '$rootScope', '$http', '$log', function($rootScope, $http, $log, lazyLoadApi) {
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

      // Check if latitude and longitude are specified
        if (angular.isDefined(scope.lat) && angular.isDefined(scope.long)) {
        // Loads google map script
          lazyLoadApi.then( initializeMap );
        }
        let fetchParksArray;
        function fetchParks() {
          $http.get(this.baseUrl + '/parks', this.config);
          $http.get(this.baseUrl + '/parks', this.config)
            .then((res) => {
              fetchParksArray = res.data;
            }, (err) => {
              $log.error('error in parkCtrl.getAllParks', err);
            });
        }

      // Initialize the map
        function initializeMap() {
          location = new google.maps.LatLng(scope.lat, scope.long);

          mapOptions = {
            zoom: 12,
            center: location
          };

          map = new google.maps.Map(element[0], mapOptions);

          new google.maps.Marker({
            position: location,
            map: map,
          });
          markerCreator(fetchParks);
        }
        function markerCreator(arr) {
          arr.forEach(function(park) {
            new google.maps.Marker({
              position: new google.maps.LatLng(park.location.xpos, park.location.ypos),
              map: map,
            });
          });
        }
      }
    };
  });
};
