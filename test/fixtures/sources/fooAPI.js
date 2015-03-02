var Marty = require('marty');
var FooActionCreators = require('../actions/fooActionCreators');

var FooAPI = Marty.createStateSource({
  id: 'foo',
  type: 'http',
  getFoo: function (id) {
    var self = this;
    return new Promise(function (resolve) {
      setTimeout(function () {
        FooActionCreators.for(self).recieveFoo({
          id: id,
          message: 'bar'
        });
        resolve();
      }, 20);
    });
  },
  getRemoteFoo: function (id) {
    return this.get('/api/foos/' + id).then(function (res) {
      FooActionCreators.for(this).recieveFoo(res.body);
    }.bind(this));
  }
});

module.exports = FooAPI;