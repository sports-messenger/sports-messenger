'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
const angularRoute = require('angular-route');
const projectApp = angular.module('projectApp', [angularRoute]);

require('./components')(projectApp);
require('./controllers')(projectApp);

projectApp.run(['$rootScope', ($rs) => {
  $rs.baseUrl = `${__API_URL__}/api`;
  $rs.parkUrl = $rs.baseUrl + '/park';
  $rs.commentUrl = $rs.baseUrl + '/comment';
  $rs.httpConfig = {
    headers: {
      'Content-Type': 'appliction/json',
      'Accept': 'application/json'
    }
  };
}]);
