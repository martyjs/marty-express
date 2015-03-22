var React = require('react');
var Router = require('react-router');
var Foo = require('./components/foo');
var Ping = require('./components/ping');
var RemoteFoo = require('./components/remoteFoo');

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
  render: function () {
    return (
      <div><RouteHandler /></div>
    );
  }
});

module.exports = function () {
  return (
    <Route handler={App}>
      <Route name='foo' path='/foo/:id' handler={routeContainer(Foo)} />
      <Route name='ping' path='/ping/:message' handler={routeContainer(Ping)} />
      <Route name='remote-foo' path='/remote-foo/:id' handler={routeContainer(RemoteFoo)} />
    </Route>
  );
};


function routeContainer(InnerComponent) {
  return React.createClass({
    contextTypes: {
      router: React.PropTypes.func.isRequired
    },
    render: function () {
      var params = this.context.router.getCurrentParams();

      return <InnerComponent {...params} />;
    }
  });
}