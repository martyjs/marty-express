var Marty = require('marty');
var FooQueries = require('../queries/fooQueries');
var FooConstants = require('../constants/fooConstants');

var FooStore = Marty.createStore({
  id: 'foo',
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
        return FooQueries.for(this).getFoo(id);
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
        return FooQueries.for(this).getRemoteFoo(id);
      }
    });
  }
});

module.exports = FooStore;