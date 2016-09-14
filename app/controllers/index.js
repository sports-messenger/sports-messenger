'use strict';

module.exports = (app) => {
  require('./auth-controller')(app);
  require('./map-controller')(app);
};
