'use strict';

// const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const createError = require('http-errors');
// const cors = require('cors');
const debug = require('debug')('home:server');

const handleError = require('./lib/error-handler');
const authRouter = require('./routes/auth-router');
const commentRouter = require('./routes/comment-router');

const app = express();
const port = process.env.PORT || 3000;
const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost/home';
process.env.APP_SECRET = 'secret';

mongoose.Promise = Promise;
mongoose.connect(mongoDbUri);

// app.use(morgan('dev'));
// app.use(cors());

app.use('/api', authRouter);
app.use('/api/comments', commentRouter);

// app.all('*', function(req, res, next){
  // debug('Got error: 404');
  // next(createError(404, `ERROR: ${req.method} :: ${req.url} is not a route`));
// });

app.use(handleError);

app.use(express.static(`${__dirname}/build`));

app.listen(port, function(){
  console.log(`Server up on ${port}`);
  debug(`server up :: ${port}`);
});
