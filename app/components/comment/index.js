'use strict';

module.exports = (app) => {
  require('./comment-controller')(app);
  require('./comment-directive')(app);
};
