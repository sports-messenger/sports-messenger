'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

let commentSchema = mongoose.Schema({
  listId: String,
  userId: String,
  text: String,
  compRating: Number,
  crowdRating: Number,
  date: Date
});

module.exports = mongoose.model('Comment', commentSchema);
