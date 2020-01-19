'use strict';
module.exports = function(app) {
  var home = require('../controllers/homeController');
  var climate = require('../controllers/climateController');

  // todoList Routes
  app.route('/')
    .get(home.get);

  app.route('/healthcheck')
    .get(home.healthcheck);

  app.route('/databaseCall')
    .get(home.databaseCall);

  app.route('/climate')
    .post(climate.submitClimate)
  
  app.route('/climate/:id')
    .get(climate.fetchClimate)
};