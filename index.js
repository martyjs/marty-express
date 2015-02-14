var React = require('react');
var _ = require('underscore');
var Router = require('react-router');

var HEADERS_TO_IGNORE = [
  'accept',
  'accept-encoding',
  'host',
  'connection'
];

module.exports = function (options) {
  options = options || {};

  if (!options.routes) {
    throw new Error('routes is required');
  }

  var Marty = options.marty || require('marty');
  var HttpStateSource = require('marty/http/stateSource');

  HttpStateSource.use({
    priority: 0.00000000001,
    before: function (req) {
      var context = this.__context;

      if (!context || !context.req) {
        return;
      }

      // Don't change fully qualified urls
      if (!/^https?:\/\//.test(req.url)) {
        req.url = getBaseUrl(context.req) + req.url;
      }

      // Add all headers from original request
      _.extend(req.headers, headers());

      function getBaseUrl(req) {
        return req.protocol + '://' + req.get('host');
      }

      function headers() {
        return _.omit(context.req.headers, HEADERS_TO_IGNORE);
      }
    }
  });

  return function (req, res, next) {
    var router = Router.create({
      location: req.url,
      routes: options.routes
    });

    if (!router.match(req.url)) {
      return next();
    }

    router.run(function (Handler) {
      var context = Marty.createContext(req);
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