'use strict';

module.exports = (app) => {
  require('./sign-up')(app);
  require('./log-in')(app);
  require('./park')(app);
};
