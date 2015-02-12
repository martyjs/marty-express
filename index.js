
var React = require('react');

function marty(app, router) {
  app.use(function (req, res) {
    console.log('router url', req.url);
    router.run(req.url, function (Handler) {
      var content = React.renderToString(React.createElement(Handler));
      res.render('main', {content: content});
    });
  });
}

module.exports = marty;