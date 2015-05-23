var React = require('react');

var Ping = React.createClass({
  render: function () {
    return (
      <div id="pong">{this.props.params.message}</div>
    );
  }
});

module.exports = Ping;