var React = require('react');
var Router = require('react-router');

module.exports = function (options) {
  options = options || {};

  if (!options.routes) {
    throw new Error('routes is required');
  }

  return function (req, res, next) {
    // var routes = appRoutes(req.app);
    var Marty = options.marty || require('marty');

    // console.log(routes);

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

  // function appRoutes(app) {
  //   var route, routes = [];

  //   app._router.stack.forEach(function (middleware) {
  //     if (middleware.route) {
  //       routes.push(middleware.route);
  //     } else if (middleware.name === 'router') {
  //       middleware.handle.stack.forEach(function (handler) {
  //         route = handler.route;
  //         route && routes.push(route);
  //       });
  //     }
  //   });

  //   return routes;
  // }
};