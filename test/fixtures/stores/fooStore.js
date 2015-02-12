var Marty = require('marty');
var FooAPI = require('../sources/fooAPI');
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
        return FooAPI(this).getFoo(id);
      }
    });
  }
});

module.exports = FooStore;