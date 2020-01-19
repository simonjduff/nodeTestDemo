var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  var bodyParser = require('body-parser')
  app.use(bodyParser.json());

  var routes = require('./routes/routes'); //importing route
  routes(app); //register the route

var server = app.listen(port);

console.log(`Starting API on port ${port}`);

exports.close = (done) => {
  console.log('Shutting down');
  server.close(done);
};