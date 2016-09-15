'use strict';

module.exports = (app) => {
  require('./sign-up')(app);
  require('./log-in')(app);
  require('./park')(app);
  require('./map')(app);
  require('./single-park')(app);
  require('./comment')(app);
  require('./comment-form')(app);
  require('./delete-token')(app);
};
