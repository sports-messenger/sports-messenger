'use strict';

module.exports = (app) => {
  require('./single-park-controller')(app);
  require('./single-park-directive')(app);
};
