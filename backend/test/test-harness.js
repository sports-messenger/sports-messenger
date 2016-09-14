'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
process.env.APP_SECRET = 'SecretKey';
require('./test-server');
require('./park-test');
require('./comment-test');

process.on('exit', (code) => {
  mongoose.connection.db.dropDatabase(() => console.log('db dropped ' + code));
});
