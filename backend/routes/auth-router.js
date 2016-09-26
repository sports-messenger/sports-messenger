'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const ErrorHandler = require('../lib/error-handler');
const User = require('../model/user');
const BasicHTTP = require('../lib/basic-http');
const authzn = require('../lib/authorization');
const jwt_auth = require('../lib/jwt-auth');

let authRouter = module.exports = exports = Router();

authRouter.post('/signup', jsonParser, (req, res, next) => {
  let newUser = new User();
  console.log(req.body); //should probably get rid of these console.log statements in favor of using the debug package
  newUser.basic.email = req.body.basic.email;
  newUser.username = req.body.username || req.body.basic.email;
  newUser.generateHash(req.body.basic.password)
    .then((tokenData) => {
      newUser.save().then(() => {res.json(tokenData);}, ErrorHandler(400, next));
    }, ErrorHandler(500, next, 'Server Error'));
});

authRouter.get('/login', BasicHTTP, (req, res, next) => {
  let authError = ErrorHandler(401, next, 'Authentication failed.');
  User.findOne({'basic.email': req.auth.email})
    .then((user) => {
      if (!user) return authError(new Error('No Such User'));
      user.comparePassword(req.auth.password)
        .then(res.json.bind(res), authError);
    }, authError);
});
