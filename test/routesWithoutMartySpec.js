var marty = require('../index');
var cheerio = require('cheerio');
var http = require('./lib/http');
var expect = require('chai').expect;

describe('Routes without marty', function () {
  var $, res, server;

  beforeEach(function () {
    server = require('./fixtures/server')();
    server.use(marty({
      routes: require('./fixtures/routes')(),
      application: require('./fixtures/application')
    }));

    return server.start();
  });

  afterEach(function () {
    server && server.stop();
  });

  describe('when rendering a component with just props', function () {
    var expectedMessage;

    beforeEach(function () {
      expectedMessage = 'foo';

      return getHtml('ping/' + expectedMessage);
    });

    it('should return a response', function () {
      expect(res.statusCode).to.equal(200);
    });

    it('should render the contents', function () {
      expect($('#pong').text()).to.equal(expectedMessage);
    });
  });

  describe('when the route isn\'t in the router', function () {
    var expectedResult;

    beforeEach(function () {
      expectedResult = { foo: 'bar' };
      server.get('/test', function (req, res) {
        res.json(expectedResult).end();
      });

      return get('test');
    });

    it('should just response the json', function () {
      expect(JSON.parse(res.body)).to.eql(expectedResult);
    });
  });

  describe('when following a redirect', function () {
    beforeEach(function () {
      var options = {
        followRedirect: false
      };
      return get('redirect', options);
    });

    it('should return a 302 status code', function () {
      expect(res.statusCode).to.equal(302);
    });
  });

  function get(route, options) {
    return http(server).get(route, options).then(function (_res) {
      res = _res;

      return res;
    });
  }

  function getHtml(route) {
    return get(route).then(function () {
      $ = cheerio.load(res.body);
    });
  }
});
