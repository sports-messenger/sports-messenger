'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const baseUrl = 'localhost:5000/api/comments';
const Comment = require('../model/comment');

describe('comment Crud tests', function() {
  it('should create a comment', function(done) {
    request(baseUrl)
      .post('/')
      .send({parkId: '10', userId: '14', username: 'fakeUser'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.parkId).to.eql('10');
        done();
      });
  });

  describe('with a comment in db', function() {
    let newComment;
    before(function(done) {
      newComment = new Comment({parkId: '4', userId:'7', username: 'testUser'});
      newComment.save().then((commentData) => {
        this.comment = commentData;
        done();
      }, (err) => {
        throw err;
      });
    });

    it('should get comment', function(done) {
      request(baseUrl)
        .get('/' + newComment._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.parkId).to.eql('4');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('wrong path on get request', function(done) {
      request(baseUrl)
        .get('/badpath')
        .end((err, res) => {
          expect(err.status).to.eql(404);
          expect(err.message).to.eql('Not Found');
          expect(res).to.have.property('body');
          done();
        });
    });

    it('should delete park', function(done) {
      request(baseUrl)
        .delete('/' + newComment._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('should give bad post request', function(done) {
      request(baseUrl)
        .post('/')
        .end((err, res) => {
          expect(err).to.not.eql(null);
          expect(err.status).to.eql(400);
          expect(err.message).to.eql('Bad Request');
          expect(res.status).to.not.eql(200);
          done();
        });
    });
  });
});
