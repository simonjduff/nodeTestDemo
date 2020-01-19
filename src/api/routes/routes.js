'use strict';
module.exports = function(app) {
  var home = require('../controllers/homeController');

  // todoList Routes
  app.route('/')
    .get(home.get);

  app.route('/healthcheck')
    .get(home.healthcheck);

  app.route('/databaseCall')
    .get(home.databaseCall);
};