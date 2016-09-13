'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
const projectApp = angular.module('projectApp', [require('angular-route')]);

require('./components')(projectApp);
require('./controllers')(projectApp);

projectApp.run(['$rootScope', ($rs) => {
  $rs.baseUrl = `${__API_URL__}/api`;
  $rs.httpConfig = {
    headers: {
      'Content-Type': 'appliction/json',
      'Accept': 'application/json'
    }
  };
}]);

projectApp.config(['$routeProvider', ($rp) => {
  $rp
  .when('/parks', {
    template: require('./html/parks.html')
  })
  .when('/home', {
    template: require('./html/home.html')
  })
  .when('/parks/:id', {
    template: require('./components/single-park/single-park-template.html')
  })
  .otherwise({
    redirectTo: 'home'
  });
}]);
