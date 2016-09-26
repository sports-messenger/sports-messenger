// instead of commenting stuff out, just get rid of it
// 'use strict';
//
// describe('testing map controller', function() {
//   beforeEach(() => {
//     angular.mock.module('projectApp');
//     angular.mock.inject(($controller, $httpBackend) => {
//       this.mapCtrl = new $controller('MapController');
//       this.$httpBackend = $httpBackend;
//       this.mapCtrl.baseUrl = 'http://localhost:3000/api';
//       this.mapCtrl.config = {headers: {
//         'Accept':'application/json', 'Content-Type':'application/json'
//       }};
//       this.mapCtrl.getUser = null;
//     });
//   });
//
//   it('testing initializeMap to see if we get data back', () => {
//     this.mapCtrl.mapPoints = [{name:'test name'}];
//     this.$httpBackend.expectGET('http://localhost:3000/api/parks', this.mapCtrl.config)
//     .respond(200, [{name:'test name'}]);
//     this.mapCtrl.initializeMap();
//     this.$httpBackend.flush();
//   });
// });
