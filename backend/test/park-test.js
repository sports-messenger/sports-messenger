'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const baseUrl = 'localhost:5000/api/parks';
const Park = require('../model/park');

describe('park Crud tests', function() {
  it('should create a park', function(done) {
    request(baseUrl)
      .post('/')
      .send({name:'fakeName', location: {xpos: 7, ypos: 4}})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('fakeName');
        done();
      });
  });

  describe('with a park in db', function() {
    let newPark;
    before(function(done) {
      newPark = new Park({name: 'testName', location: {xpos: 10, ypos: 3}});
      newPark.save().then((parkData) => {
        this.park = parkData;
        done();
      }, (err) => {
        throw err;
      });
    });

    it('should get park with name testName', function(done) {
      request(baseUrl)
        .get('/' + newPark._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.name).to.eql('testName');
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

    it('should update park in db', function(done) {
      newPark.name = 'newName';
      request(baseUrl)
        .put('/' + newPark._id)
        .send({name: 'newName'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should delete park', function(done) {
      request(baseUrl)
        .delete('/' + newPark._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    //nice, way to test edge cases as well
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

    it('should give a bad put request', function(done) {
      request(baseUrl)
      .put('/badid')
      .send({name: 'otherName', location: {xpos: 14, ypos: 9}})
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res.status).to.eql(500);
        done();
      });
    });
  });
});
