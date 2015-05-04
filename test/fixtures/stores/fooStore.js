var Marty = require('marty');
var FooConstants = require('../constants/fooConstants');

var FooStore = Marty.createStore({
  handlers: {
    addFoo: FooConstants.RECIEVE_FOO
  },
  getInitialState: function () {
    return {};
  },
  addFoo: function (foo) {
    this.state[foo.id] = foo;
  },
  getFoo: function (id) {
    return this.fetch({
      id: id,
      locally: function () {
        return this.state[id];
      },
      remotely: function () {
        return this.app.fooQueries.getFoo(id);
      }
    });
  },
  getRemoteFoo: function (id) {
    return this.fetch({
      id: id,
      locally: function () {
        return this.state[id];
      },
      remotely: function () {
        return this.app.fooQueries.getRemoteFoo(id);
      }
    });
  }
});

module.exports = FooStore;