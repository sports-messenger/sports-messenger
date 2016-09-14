'use strict';

module.exports = (app) => {
  app.service('lazyLoadApi', function lazyLoadApi($window, $q) {
    function loadScript() {
      console.log('loadScript');
        // use global document since Angular's $document is weak
      var s = document.createElement('script');
      var key = 'AIzaSyD6A3QVKo_K60NtkqF7vElOnbvCCxfnfOw';
      s.src = '//maps.googleapis.com/maps/api/js?key='+key+'&language=en&callback=initMap';
      document.body.appendChild(s);
    }
    var deferred = $q.defer();

    $window.initMap = function() {
      deferred.resolve();
    };

    if ($window.attachEvent) {
      $window.attachEvent('onload', loadScript);
    } else {
      $window.addEventListener('load', loadScript, false);
    }
    return deferred.promise;
  });
};
