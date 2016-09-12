'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

let commentSchema = mongoose.Schema({
  parkId: String,
  userId: String,
  text: String,
  compRating: Number,
  busyRating: Number,
  date: Date
});

module.exports = mongoose.model('Comment', commentSchema);
