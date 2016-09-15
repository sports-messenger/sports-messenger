'use strict';

module.exports = (app) => {
  app.directive('googleMap', ['$rootScope', '$http', 'lazyLoadApi', function($rootScope, $http, lazyLoadApi) {
    return {
      restrict: 'CA', 
      scope: {
        mapId: '@id',
        lat: '@',
        long: '@'
      },
      link: function(scope, element, attrs) {
        var location = null;
        var map = null;
        var mapOptions = null;

        if (angular.isDefined(scope.lat) && angular.isDefined(scope.long)) {
          lazyLoadApi.then( initializeMap );
        }

        function initializeMap() {
          var location = new google.maps.LatLng(scope.lat, scope.long);
          var image = 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1oXOM.img'
          var mapOptions = {
            zoom: 12,
            center: location,
            icon: image
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
              var marker = new google.maps.Marker({
                position: new google.maps.LatLng(park.location.ypos, park.location.xpos),
                map: map,
                icon: image,
                title: park.name
              });

              var contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '<p id="firstHeading">Location: '+ park.name +'</p>'+
              '<p id="sportsParagraphs">Sports: '+ park.sports +'<p>'+
              '<p id="locationHours">Hours: '+ park.hours +'<p>'+
              '</div>'+
              '</div>';

              var infowindow =  new google.maps.InfoWindow({
                content: contentString
              });

              marker.addListener('mouseover', function() {
                infowindow.open(map, marker);
              });

              marker.addListener('mouseout', function() {
                infowindow.close();
              });
            });
          });

          var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: image,
          });
        }
      }
    };
  }]);
};
