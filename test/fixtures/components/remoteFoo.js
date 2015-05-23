var React = require('react');
var Marty = require('marty');

var RemoteFooStateMixin = Marty.createStateMixin({
  listenTo: 'fooStore',
  getState: function () {
    return {
      foo: this.app.fooStore.getRemoteFoo(this.props.params.id)
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

    return <div id={this.props.params.id} className='foo'>{body}</div>;
  }
});

module.exports = RemoteFoo;