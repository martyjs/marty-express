var React = require('react');
var Marty = require('marty');

var FooStateMixin = Marty.createStateMixin({
  listenTo: 'fooStore',
  getState: function () {
    return {
      foo: this.app.fooStore.getFoo(this.props.id)
    };
  }
});

var Foo = React.createClass({
  mixins: [FooStateMixin],
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

module.exports = Foo;