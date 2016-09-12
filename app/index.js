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
  .when('/signup', {
    template: require('./html/sign-up.html')
  })
  .when('/signin', {
    template: require('./html/sign-in.html')
  })
  .otherwise({
    redirectTo: 'signup'
  });
}]);
