/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Foo = require('./components/foo');
var Ping = require('./components/ping');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var FooHandler = handler(function (req) {
  return <Foo id={req.params.id} />;
});

var PingHandler = handler(function (req) {
  return <Ping message={req.params.message} />;
});

module.exports = function () {
  return (
    <Route handler={RouteHandler}>
      <Route name='foo' path='/foo/:id' handler={FooHandler} />
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