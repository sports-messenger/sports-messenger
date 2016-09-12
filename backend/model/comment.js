'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

let commentSchema = mongoose.Schema({
  parkId: {type: String, required: true},
  userId: {type: String, required: true},
  text: String,
  compRating: Number,
  busyRating: Number,
  date: Date
});

module.exports = mongoose.model('Comment', commentSchema);
