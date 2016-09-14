'use strict';

const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');
const parkRouter = require('../routes/park-router');
const commentRouter = require('../routes/comment-router');

mongoose.connect('mongodb://localhost/test-db');

app.use(morgan('dev'));
app.use('/api/parks', parkRouter);
app.use('/api', commentRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode).json(err.message);
});

app.listen(5000);
