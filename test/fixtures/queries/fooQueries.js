var Marty = require('marty');
var FooConstants = require('../constants/fooConstants');

var FooQueries = Marty.createQueries({
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
    return this.app.fooAPI.getFoo(id).then((function (res) {
      this.dispatch(FooConstants.RECIEVE_FOO, res.body);
    }).bind(this));
  }
});

module.exports = FooQueries;