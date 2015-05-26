var _ = require('lodash');
var Marty = tryRequire('marty');
var React = tryRequire('react');
var Router = tryRequire('react-router');
var ServerCookies = require('./serverCookies');

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

  if (!_.isFunction(options.application)) {
    throw new Error('Must specify application type');
  }

  Marty.CookieStateSource.setCookieFactory(function (app) {
    return new ServerCookies(app.req, app.res);
  });

  Marty.LocationStateSource.setLocationFactory(function (app) {
    return _.pick(app.req, 'url', 'protocol', 'query', 'path', 'hostname');
  });

  Marty.HttpStateSource.addHook({
    id: 'marty-express-http-state-source',
    priority: 0.00000000001,
    before: function (req) {
      var app = this.app;

      if (!app || !app.req) {
        return;
      }

      // Don't change fully qualified urls
      if (!/^https?:\/\//.test(req.url)) {
        req.url = getBaseUrl(app.req) + req.url;
      }

      // Add all headers from original request
      _.extend(req.headers, headers());

      function getBaseUrl(req) {
        return req.protocol + '://' + req.get('host');
      }

      function headers() {
        return _.omit(app.req.headers, HEADERS_TO_IGNORE);
      }
    }
  });

  return function (req, res, next) {
    var router = Router.create({
      location: req.url,
      routes: options.routes,
      onAbort: onAbort
    });

    if (!router.match(req.url)) {
      return next();
    }

    router.run(function (Handler, state) {
      var app = new options.application({
        req: req,
        res: res
      });

      var element = React.createElement(Marty.ApplicationContainer, { app: app },
        React.createElement(Handler, state.params)
      );

      app.renderToString(element, options)
        .then(onRendered)
        .catch(onFailedToRender);

      function onRendered(renderResult) {
        var locals = {};

        locals[options.body || 'body'] = renderResult.htmlBody.trim();
        locals[options.state || 'state'] = renderResult.htmlState.trim();

        res.render(options.view || 'index', locals);

        if (_.isFunction(options.rendered)) {
          options.rendered(_.extend({
            req: req
          }, renderResult));
        }
      }

      function onFailedToRender(error) {
        if (_.isFunction(options.error)) {
          options.error(req, res, next, error);
        } else {
          console.error('Failed to render ' + req.url, error.stack);
          res.sendStatus(500).end();
        }
      }
    });

    function onAbort(abortReason) {
      if (abortReason.constructor.name === 'Redirect') {
        return res.redirect(302, router.makePath(abortReason.to, abortReason.params, abortReason.query));
      }
    }
  };
};

function tryRequire(dep) {
  try {
    return module.parent.require(dep);
  } catch (e) {
    return require(dep);
  }
}