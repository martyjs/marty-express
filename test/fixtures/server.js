var when = require('when');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function () {
  var app = express();
  var port = process.env.PORT || 6896;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.port = port;
  app.set('port', port);
  app.set('view engine', 'ejs');

  app.start = function () {
    return when.promise(function (resolve) {
      app.server = app.listen(0, onStarted);

      function onStarted() {
        app.host = 'http://localhost:' + app.server.address().port;
        resolve();
      }
    });
  };

  app.stop = function () {
    app.server.close();
  };

  return app;
};