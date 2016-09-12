'use strict';

module.exports = (app) => {
  require('./sign-up')(app);
  require('./sign-in')(app);
  require('./park')(app);
};
