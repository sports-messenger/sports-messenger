'use strict';

module.exports = (app) => {
  require('./sign-up')(app);
  require('./sign-in')(app);
  require('./park')(app);
  require('./map')(app);
  require('./comment')(app);
  require('./comment-form')(app);
};
