var React = require('react');
var Router = require('react-router/build/npm');
var Foo = require('./components/foo');
var Ping = require('./components/ping');
var RemoteFoo = require('./components/remoteFoo');

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var FooHandler = handler(function (req) {
  return <Foo id={req.params.id} />;
});

var PingHandler = handler(function (req) {
  return <Ping message={req.params.message} />;
});

var RemoteFooHandler = handler(function (req) {
  return <RemoteFoo id={req.params.id} />;
});

module.exports = function () {
  return (
    <Route handler={RouteHandler}>
      <Route name='foo' path='/foo/:id' handler={FooHandler} />
      <Route name='ping' path='/ping/:message' handler={PingHandler} />
      <Route name='remote-foo' path='/remote-foo/:id' handler={RemoteFooHandler} />
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