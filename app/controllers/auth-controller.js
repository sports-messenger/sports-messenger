'use strict';

module.exports = function(app) {
  app.controller('AuthController', ['$http', '$location', '$window', '$log', function($http, $location, $window, $log) {
    this.signup = function(user) {
      $log.debug('$ctrl.signup');
      $http.post(this.baseUrl + '/signup', user)
      .then((res) => {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
        $location.path('/home');
      }, (err) => {
        $log.error('error in $ctrl.signup', err);
      });
    };

    this.signin = function(user) {
      $http.get(this.baseUrl + '/signin', {
        headers: {
          'Authorization': 'Basic ' + $window.btoa(user.basic.email + ':' + user.basic.password)
        }
      })
      .then((res) => {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
        $location.path('/home');
      }, (err) => {
        $log.error('error in $ctrl.signin', err);
      });
    };
  }]);
};
