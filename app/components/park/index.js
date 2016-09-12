'use strict';

module.exports = (app) => {
  require('./park-controller')(app);
  require('./park-directive')(app);
};
