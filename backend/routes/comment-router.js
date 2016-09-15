'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('comment:comment-router');

const Comment = require('../model/comment');
const jwtAuth = require('../lib/jwt-auth');

let commentRouter = module.exports = exports = new Router();

commentRouter.get('/comments/park/:id', function(req, res, next){
  debug('GET from /api');
  Comment.find({parkId: req.params.id})
    .then( comments => res.send(comments))
    .catch( err => next(createError(404, err.message)));
});

commentRouter.post('/comments', jsonParser, jwtAuth, function(req, res, next){
  debug('POST REQUEST from /api/comment');
  if (!req.body.parkId)
    return next(createError(400, 'ERROR: comment requires '));
  new Comment(req.body).save().then( comment => {
    res.json(comment);
  }).catch(next);
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
    .populate('comments')
    .then( comments => res.send(comments))
    .catch( err => next(createError(404, err.message)));
});

commentRouter.delete('/comments/:id', jsonParser, function(req, res, next){
  let result;
  debug('PUT /api/comment/:id');
  Comment.findOneAndRemove({_id: req.params.id})
    .then( comment => {
      result = comment;
    })
    .then(() => {
      res.json(result);
    })
    .catch(next);
});
