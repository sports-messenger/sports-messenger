'use strict';

module.exports = (app) => {
  app.directive('googleMap', function($rootScope, lazyLoadApi) {
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
        }
      }
    };
  });
};


//     return {
//       controller: 'MapController',
//       controllerAs: 'mapCtrl',
//       template: require('./map-template.html'),
//       bindToController: true,
//       scope: {
//         baseUrl: '@',
//         config: '='
//       }
//     };
//   });
// };
