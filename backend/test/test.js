'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const server = require('../server');
const Comment = require('../model/comment');
const Park = require('../model/park');
const User = require('../model/user');

process.env.MONGODB_URI = 'mongodb://localhost/sports-messenger';
process.env.PASSWORD = 'testpass';

// mongoose.connection.db.dropDatabase();

describe('CRUD comment tests', () => {
  beforeEach(function(done){
    new Comment({
      parkId: 'test park id',
      userId: 'test user id',
      text: 'test comment'
    }).save()
    .then((comments) => {
      this.id = comments._id;
      done();
    })
    .catch((err) => console.log(err));
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(done);
  });

  it('should post a poll with a name and choices', function(done){
    request(server)
      .post('/api/comments')
      .auth('admin', 'testpass')
      .send({
        parkId: 'test park id',
        userId: ' test user id',
        text: 'this should be a comment'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.text).to.eql('this should be a comment');
        done();
      });
  });
});
