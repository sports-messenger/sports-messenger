'use strict';

module.exports = (app) => {
  require('./map-controller')(app);
  require('./map-directive')(app);
};
