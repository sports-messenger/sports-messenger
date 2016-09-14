'use strict';

module.exports = (app) => {
  require('./lazyLoadApi')(app);
  require('./parks-map-combine')(app);
};
