'use strict';

module.exports = (app) => {
  require('./comment-form-controller')(app);
  require('./comment-form-directive')(app);
};
