'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
const projectApp = angular.module('projectApp', [require('angular-route'), require('angular-jwt')]);

require('./services')(projectApp);
require('./components')(projectApp);
require('./controllers')(projectApp);

projectApp.run(['$rootScope', ($rs) => {
  $rs.baseUrl = `${__API_URL__}`;
  $rs.httpConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
}]);

projectApp.config(['$routeProvider', ($rp) => {
  $rp
  .when('/home', {
    template: require('./html/home.html')
  })
  .when('/parks/:id', {
    template: require('./html/singlepark.html')
  })
  .when('/map', {
    template: require('./html/map.html')
  })
  .otherwise({
    redirectTo: 'home'
  });
}]);
