var Marty = require('marty');

var FooAPI = Marty.createStateSource({
  type: 'http',
  getFoo: function (id) {
    return this.get('/api/foos/' + id);
  }
});

module.exports = FooAPI;