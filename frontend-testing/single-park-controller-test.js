'use strict';

describe('testing single park controller', function() {
  beforeEach(() => {
    angular.mock.module('projectApp');
    angular.mock.inject(($controller, $httpBackend, $location) => {
      this.spCtrl = new $controller('SingleParkController');
      this.$httpBackend = $httpBackend;
      this.spCtrl.park = null;
      this.spCtrl.baseUrl = 'http://localhost:3000/api';
      this.spCtrl.config = {headers: {
        'Accept':'application/json', 'Content-Type':'application/json'
      }};
    });
  });

  it('testing getPark', () => {
    this.spCtrl.pathId = '/parks/34';
    this.spCtrl.park = {name: 'test park', location: {xpos:4, ypos: 7}, _id: '34'};
    this.$httpBackend.expectGET('http://localhost:3000/api/parks/34', {'Accept': 'application/json'})
    .respond(200, [{name: 'test park', location: {xpos: 4, ypos: 7}, _id: '34'}]);
    this.spCtrl.getPark();
    this.$httpBackend.flush();
  });
});
