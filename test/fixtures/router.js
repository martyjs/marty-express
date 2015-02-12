/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Ping = require('./components/ping');
var Route = Router.Route;

var PingHandler = handler(function (req) {
  return <Ping message={req.params.message} />;
});

module.exports = function () {
  return Router.create({
    routes: [
      <Route name='ping' path='/ping/:message' handler={PingHandler} />
    ]
  });
};

function handler(createComponent) {
  return React.createClass({
    mixins: [Router.State],
    render: function () {
      var req = {
        params: this.getParams()
      };

      return createComponent(req);
    }
  });
}