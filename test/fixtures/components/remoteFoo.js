var React = require('react');
var Marty = require('marty');
var FooStore = require('../stores/fooStore');

var RemoteFooStateMixin = Marty.createStateMixin({
  listenTo: FooStore,
  getState: function () {
    return {
      foo: FooStore(this).getRemoteFoo(this.props.id)
    };
  }
});

var RemoteFoo = React.createClass({
  mixins: [RemoteFooStateMixin],
  render: function () {
    var body = this.state.foo.when({
      pending: function () {
        return 'pending';
      },
      failed: function (error) {
        return 'error: ' + error.message;
      },
      done: function (foo) {
        return foo.message;
      }
    });

    return <div id={this.props.id} className='foo'>{body}</div>;
  }

});

module.exports = RemoteFoo;