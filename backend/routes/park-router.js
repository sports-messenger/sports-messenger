'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('project:park-router');

const Park = require('../model/park');
const Comment = require('../model/comment');
const jwt_auth = require('../lib/jwt_auth');

let parkRouter = module.exports = exports = new Router();

parkRouter.post('/parks', jsonParser, jwt_auth, function(req, res, next) {
  debug('Post /api/parks');
  if(!req.body.name) return next(createError(400, 'Error: park requires name field'));
  new Park(req.body).save().then((park) => {
    res.json(park);
  }).catch(next);
});

parkRouter.get('/parks', function(req, res, next) {
  debug('Get /api/parks');
  Park.find({})
  .populate('comments')
  .then((parks) => {
    res.send(parks);
  }).catch(next);
});

parkRouter.get('/parks/:id', function(req, res, next) {
  debug('Get /api/parks/:id');
  Park.findOne({_id: req.params.id})
  .populate('comments')
  .then((park) => {
    res.send(park);
  }).catch((err) => {
    next(createError(404, err.message));
  });
});

parkRouter.put('/parks/:id', jsonParser, function(req, res, next) {
  debug('Put /api/parks/:id');
  Park.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((park) => {
    res.send(park)
    .catch(next);
  });
});

parkRouter.delete('/parks/:id', jsonParser, function(req, res, next) {
  let result;
  debug('Delete /api/parks/:id');
  Park.findByIdAndRemove(req.params.id)
    .then((park) => {
      result = park;
      return Comment.remove({parkId: park._id});
    })
    .then(() => {
      res.json(result);
    }).catch(next);
});
