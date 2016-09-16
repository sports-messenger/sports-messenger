'use strict';

module.exports = function(app){
  app.factory('auth', ['$window', 'jwtHelper', '$location', function($window, jwt, $location){
    return {
      currentUser: {},
      getToken: function(options){
        options = options || {};
        if (this.token) return this.token;
        if ($window.localStorage.token) return this.setToken($window.localStorage.token);
        if (!options.noRedirect) $location.path('/home');
      },
      setUser: function(user) {
        $window.localStorage.username = user.basic.email;
        this.username = user.basic.email;
        return user.basic.email;
      },
      setToken: function(token){
        $window.localStorage.token = token;
        this.token = token;
        this.getUser();
        return token;
      },
      getUser: function(){
        let token = this.getToken();
        if (!token)  return $location.path('/home');
        let decoded = jwt.decodeToken(token);
        this.currentUser.username = decoded.username;
        console.log('decoded.username in service.getUser', decoded.username);
        console.log('this in service', this);
        console.log('this.currentUser in service', this.currentUser);
        return this.currentUser;
      },
      deleteToken: function(){
        $window.localStorage.token = '';
        $window.localStorage.username = '';
        this.token = '';
        $location.path('/home');
      }
    };
  }]);
};
