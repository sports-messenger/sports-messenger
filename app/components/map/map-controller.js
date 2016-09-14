'use strict';
let fetchParksArray = [];
function fetchParks(array) {
  $http.get(this.baseUrl + '/parks', this.config);
    $http.get(this.baseUrl + '/parks', this.config)
    .then((res) => {
      fetchParksArray = res.data;
    }, (err) => {
      $log.error('error in parkCtrl.getAllParks', err);
    });
  };

  function markerCreator(arr) {
    arr.forEach(function(park) {
      new google.maps.Marker({
        position: new google.maps.LatLng(park.location.xpos, park.location.ypos),
        map: map
      });
    });
  }

  markerCreator(fetchParksArray);
