var cheerio = require('cheerio');
var http = require('./lib/http');
var expect = require('chai').expect;
var middleware = require('../index');

describe('Routes without marty', function () {
  var $, res, server;

  beforeEach(function () {
    server = require('./fixtures/server')();
    middleware(server, require('./fixtures/router')());

    return server.start();
  });

  afterEach(function () {
    server && server.stop();
  });

  describe('when rendering a component with just props', function () {
    var expectedMessage;

    beforeEach(function () {
      expectedMessage = 'foo';

      return get('ping/' + expectedMessage);
    });

    it('should return a response', function () {
      expect(res.statusCode).to.equal(200);
    });

    it('should render the contents', function () {
      expect($('#message').text()).to.equal(expectedMessage);
    });
  });

  function get(route) {
    return http(server).get(route).then(function (_res) {
      res = _res;
      $ = cheerio.load(_res.body);
    });
  }
});