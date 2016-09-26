'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('comment:comment-router');
const ErrorHandler = require('../lib/error-handler');

const Comment = require('../model/comment');
const jwtAuth = require('../lib/jwt-auth');

let commentRouter = module.exports = exports = new Router();

commentRouter.post('/comments', jsonParser, jwtAuth, function(req, res, next){
  debug('POST REQUEST from /api/comment');
  //great use of debug in all of these routes
  if (!req.body.parkId) return next(createError(400, 'ERROR: comment requires parkId'));
  if (!req.body.username) return next(createError(400, 'ERROR: comment requires username'));
  //instead of filling your code with checks you should make these fields required in your model
  //and rely on the mongoose validations for these things
  new Comment(req.body).save().then((comment) => {
    res.json(comment);
  }).catch(ErrorHandler(409, next, 'Data already exits in database'));
});

commentRouter.get('/comments', function(req, res, next){
  debug('GET from /api/comments');
  Comment.find({})
    .populate('comments')
    .then( comments => res.send(comments)).catch(next);
});

commentRouter.get('/comments/:id', function(req, res, next){
  debug('GET from /api');
  Comment.findOne({_id: req.params.id})
    .then( comments => res.send(comments))
    .catch( err => next(createError(404, err.message)));
});

commentRouter.delete('/comments/:id', function(req, res, next){
  let result;
  debug('PUT /api/comment/:id');
  Comment.findOneAndRemove({_id: req.params.id})
    .then( comment => {
      //not sure exactly what you're doing here, I don't think you need to save this
      //to an outside variable
      result = comment;
    })
    .then(() => {
      res.json(result);
    })
    .catch(next);
});
