var Marty = require('marty');
var FooAPI = require('../sources/fooAPI');
var FooConstants = require('../constants/fooConstants');

var FooQueries = Marty.createQueries({
  id: 'FooQueries',
  getFoo: function (id) {
    var self = this;

    return new Promise(function (resolve) {
      setTimeout(function () {
        self.dispatch(FooConstants.RECIEVE_FOO, {
          id: id,
          message: 'bar'
        });
        resolve();
      }, 20);
    });
  },
  getRemoteFoo: function (id) {
    return FooAPI.for(this).getFoo(id).then((function (res) {
      this.dispatch(FooConstants.RECIEVE_FOO, res.body);
    }).bind(this));
  }
});

module.exports = FooQueries;