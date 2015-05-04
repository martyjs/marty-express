var Marty = require('marty');

module.exports = Marty.createApplication(function () {
  this.register('fooActionCreators', require('./actions/fooActionCreators'));
  this.register('fooQueries', require('./queries/fooQueries'));
  this.register('fooAPI', require('./sources/fooAPI'));
  this.register('fooStore', require('./stores/fooStore'));
});
