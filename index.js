var React = require('react');
var Router = require('react-router');

function marty(options) {
  return function (req, res, next) {
    var router = Router.create({
      location: req.url,
      routes: options.routes
    });

    if (!router.match(req.url)) {
      return next();
    }

    router.run(function (Handler) {
      var locals = {};
      var body = React.renderToString(React.createElement(Handler));

      locals[options.local || 'body'] = body;
      res.render(options.view || 'index', locals);
    });
  };
}

module.exports = marty;