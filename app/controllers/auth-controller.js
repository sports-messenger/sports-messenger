'use strict';

module.exports = function(app) {
  app.controller('AuthController', ['$http', '$location', '$window', '$log', 'auth', function($http, $location, $window, $log, auth) {
    this.hasAccount = false;
    this.signup = function(user) {
      auth.setUser(user);
      $log.debug('$ctrl.signup');
      $http.post(this.baseUrl + '/signup', user)
      .then((res) => {
        auth.setToken(res.data.token);
        $location.path('/map');
      }, (err) => {
        $log.error('error in $ctrl.signup', err);
        $location.path('/home');
      });
    };

    this.login = function(user) {
      auth.setUser(user);
      $http.get(this.baseUrl + '/login', {
        headers: {
          'Authorization': 'Basic ' + $window.btoa(user.basic.email + ':' + user.basic.password)
        }
      })
      .then((res) => {
        auth.setToken(res.data.token);
        $location.path('/map');
      }, (err) => {
        $log.error('error in $ctrl.login', err);
      });
    };

    this.getUser = auth.getUser.bind(auth);
    this.deleteToken = auth.deleteToken.bind(auth);
    this.currentUser = auth.currentUser;
  }]);
};
