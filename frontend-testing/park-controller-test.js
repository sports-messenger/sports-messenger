'use strict';

describe('testing park controller', function() {
  beforeEach(() => {
    angular.mock.module('projectApp');
    angular.mock.inject(($controller, $httpBackend, $rootScope) => {
      this.parkCtrl = new $controller('ParkController');
      this.$httpBackend = $httpBackend;
      this.$scope = $rootScope;
      this.parkCtrl.baseUrl = 'http://localhost:3000/api';
      this.parkCtrl.config = {headers: {
        'Accept':'application/json', 'Content-Type':'application/json'
      }};
      this.parkCtrl.parks = [];
      this.parkCtrl.selectedParks = [];
    });
  });

  it('testing getAllParks', () => {
    this.parkCtrl.parks = [{name: 'test name'}];
    this.$httpBackend.expectGET(this.parkCtrl.baseUrl + '/parks', {'Accept':'application/json'})
    .respond(200, [{name: 'test name'}]);
    this.parkCtrl.getAllParks();
    this.$httpBackend.flush();
  });

  it('testing setSelectedParks', () => {
    this.parkCtrl.parks = [{name: 'name1', sports: ['Soccer']}, {name: 'name2', sports: ['Basketball (Full)']}];
    this.parkCtrl.setSelectedParks('Basketball (Full)');
    expect(this.parkCtrl.selectedParks.length).toBe(1);
    expect(this.parkCtrl.selectedParks[0].name).toBe('name2');
  });

  it('testing setNearbyParks', () => {
    this.parkCtrl.parks = [{name:'Space Needle', location: {xpos: -122.3493, ypos: 47.6205}}, {name: 'Eiffel Tower', location: {xpos: 2.2945, ypos: 48.8584}}, {name: 'Safeco Field', location: {xpos: -122.3319, ypos: 47.5918}}];
    this.parkCtrl.addressPoint = {lat: 47.6647, lng: -122.3976};
    this.parkCtrl.setNearbyParks(20);
    expect(this.parkCtrl.selectedParks.length).toBe(2);
    expect(this.parkCtrl.selectedParks[0].name).toBe('Space Needle');
  });
});
