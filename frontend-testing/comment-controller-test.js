'use strict';

describe('testing comment controller', function() {
  beforeEach(() => {
    angular.mock.module('projectApp');
    angular.mock.inject(($controller, $httpBackend, $window) => {
      this.commentCtrl = new $controller('CommentController');
      this.$httpBackend = $httpBackend;
      this.$window = $window;
      this.commentCtrl.park = {_id: '55'};
      this.commentCtrl.comments = [{username: 'keiran', parkId: '25', text:'test1', _id: '1'}, {username: 'marshall', parkId: '34', text: 'test2', _id: '2'}, {username: 'tre', parkId: '55', text: 'test3', _id: '3'}, {username: 'dog the bounty hunter', parkId: '55', text: 'test4', _id:'4'}];
      this.commentCtrl.baseUrl = 'http://localhost:3000/api';
      this.commentCtrl.config = {headers: {
        'Accept':'application/json', 'Content-Type':'application/json'
      }};
    });
  });

  it('testing get all comments', () => {
    this.$httpBackend.expectGET('http://localhost:3000/api/comments', {'Accept': 'application/json'})
    .respond(200, [{username: 'marshall', parkId: '34', text: 'test2'}]);
    this.commentCtrl.getAllComments();
    expect(this.commentCtrl.comments.length).toBe(4);
    this.$httpBackend.flush();
  });

  it('testing delete comment', () => {
    this.$httpBackend.expectDELETE('http://localhost:3000/api/comments/2', {'Accept':'application/json'})
    .respond(200, [{username: 'keiran', parkId: '25', text: 'test1'}, {username: 'tre', parkdId:'55', text: 'test3'}]);
    this.commentCtrl.deleteComment({_id:'2'});
    this.$httpBackend.flush();
  });

  it('testing create comment', () => {
    this.$window.localStorage.username = 'Spiderman';
    let newComment = {text: 'testing testing'};
    this.$httpBackend.expectPOST('http://localhost:3000/api/comments', newComment, {'Accept': 'application/json', 'Content-Type':'application/json'})
    .respond(200, [{username: 'Spiderman', parkId:'55', text: 'testing testing'}]);
    this.commentCtrl.createComment(newComment);
    this.$httpBackend.flush();
  });

  it('should return 400', () => {
    let newComment = {text: 'testtesttest'};
    this.$httpBackend.expectPOST('http://localhost:3000/api/comments', newComment, {'Accept': 'application/json', 'Content-Type': 'application/json'})
    .respond(400, 'ERROR: comment requires username');
    this.commentCtrl.createComment(newComment);
    this.$httpBackend.flush();
  });
});
