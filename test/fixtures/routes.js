/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Ping = require('./components/ping');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var PingHandler = handler(function (req) {
  return <Ping message={req.params.message} />;
});

module.exports = function () {
  return (
    <Route handler={RouteHandler}>
      <Route name='ping' path='/ping/:message' handler={PingHandler} />
    </Route>
  );
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