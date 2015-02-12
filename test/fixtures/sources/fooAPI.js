var Marty = require('marty');
var FooActionCreators = require('../actions/fooActionCreators');

var FooAPI = Marty.createStateSource({
  id: 'foo',
  getFoo: function (id) {
    var self = this;
    return new Promise(function (resolve) {
      setTimeout(function () {
        FooActionCreators(self).recieveFoo({
          id: id,
          message: 'bar'
        });
        resolve();
      }, 20);
    });
  }
});

module.exports = FooAPI;