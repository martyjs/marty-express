var React = require('react');
var Router = require('react-router');

module.exports = function (options) {
  options = options || {};

  if (!options.routes) {
    throw new Error('routes is required');
  }

  return function (req, res, next) {
    var Marty = options.marty || require('marty');

    var router = Router.create({
      location: req.url,
      routes: options.routes
    });

    if (!router.match(req.url)) {
      return next();
    }

    router.run(function (Handler) {
      var context = Marty.createContext();
      var createElement = function () {
        return React.createElement(Handler);
      };

      Marty.renderToString(createElement, context).then(function (html) {
        var locals = {};
        locals[options.local || 'body'] = html;
        res.render(options.view || 'index', locals).end();
        context.dispose();
      });
    });
  };
};