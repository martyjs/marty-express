var React = require('react');
var Router = require('react-router');
var Foo = require('./components/foo');
var Ping = require('./components/ping');
var RemoteFoo = require('./components/remoteFoo');

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;

var App = React.createClass({
  render: function () {
    return (
      <div><RouteHandler /></div>
    );
  }
});

module.exports = function () {
  return (
    <Route name="root" handler={App}>
      <Route name='foo' path='/foo/:id' handler={Foo} />
      <Route name='ping' path='/ping/:message' handler={Ping} />
      <Route name='remote-foo' path='/remote-foo/:id' handler={RemoteFoo} />
      <Redirect from="/redirect" to="root" />
    </Route>
  );
};