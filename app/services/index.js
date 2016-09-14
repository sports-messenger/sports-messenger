'use strict';

module.exports = (app) => {
  require('./lazyLoadApi')(app);
  require('./auth-service')(app);
};
