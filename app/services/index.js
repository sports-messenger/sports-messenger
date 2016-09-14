'use strict';

module.exports = (app) => {
  require('./lazyLoadApi')(app);
  require('./parks-map-combine')(app);
  require('./auth-service')(app);

};
