'use strict';

// const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('home:server');

const handleError = require('./backend/lib/error-handler');
const authRouter = require('./backend/routes/auth-router');
const commentRouter = require('./backend/routes/comment-router');

const app = express();
const port = process.env.PORT || 3000;
const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost:3000';
process.env.APP_SECRET = 'secret';

mongoose.Promise = Promise;
mongoose.connect(mongoDbUri);

// app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({msg: 'hello'});
});

app.use('/api', authRouter);
app.use('/api', commentRouter);

app.all('*', function(req, res, next){
  debug('Got error: 404');
  next(createError(404, `ERROR: ${req.method} :: ${req.url} is not a route`));
});

app.use(handleError);

app.use(express.static(`${__dirname}/build`));

app.listen(port, function(){
  console.log(`Server up on ${port}`);
  debug(`server up :: ${port}`);
});
