'use strict';

module.exports = (app) => {
  app.directive('googleMap', ['$rootScope', '$http', 'lazyLoadApi', function($rootScope, $http, lazyLoadApi) {
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

      // Initialize the map
        function initializeMap() {
          var location = new google.maps.LatLng(scope.lat, scope.long);

          var mapOptions = {
            zoom: 12,
            center: location,
          };
          var map = new google.maps.Map(element[0], mapOptions);

          $http.get(`${__API_URL__}/api` + '/parks', {
            headers: {
              'Content-Type': 'appliction/json',
              'Accept': 'application/json'
            }
          }).then(function(res){
            console.log(res.data);
            res.data.forEach(function(park) {
              // var newLocation = new google.maps.LatLng(park.location);
              var marker = new google.maps.Marker({
                position: new google.maps.LatLng(park.location.ypos, park.location.xpos),
                map: map
              });
              debugger;
            });
          });
          var marker = new google.maps.Marker({
            position: location,
            map: map,
          });
        }
      }
    };
  }]);
};
