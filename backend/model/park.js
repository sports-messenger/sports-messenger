'use strict';

const mongoose = require('mongoose');
const Comment = require('./comment');
const Promise = require('bluebird');
const createError = require('http-errors');

mongoose.Promise = Promise;

let parkSchema = mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  hours: {type: String, required: true},
  location: {
    xpos: {type: Number, required: true},
    ypos: {type: Number, required: true}
  },
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment', unique: true}],
  sports: Array
});

parkSchema.methods.addComment = function(data) {
  let result;
  return new Promise((resolve, reject) => {
    if(!data.parkId || !data.userId) {
      return reject(createError(400, 'comment requires a userId, listId and date'));
    }
    new Comment(data).save()
      .then((comment) => {
        result = comment;
        this.comments.push(comment._id);
        return this.save();
      })
      .then(() => {
        resolve(result);
      })
      .catch(reject);
  });
};

parkSchema.methods.removeCommentById = function(commentId) {
  return new Promise((resolve, reject) => {
    this.comments.filter((value) => {
      if (value === commentId) return false;
      return true;
    });
    this.save()
    .then(() => {
      return Comment.findByIdAndRemove(commentId);
    })
    .then((comment) => resolve(comment))
    .catch(reject);
  });
};

module.exports = mongoose.model('Park', parkSchema);
