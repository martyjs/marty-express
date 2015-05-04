var marty = require('../index');
var cheerio = require('cheerio');
var http = require('./lib/http');
var expect = require('chai').expect;

describe('Routes with marty', function () {
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

  describe('when rendering a component that needs state', function () {
    var expectedId;

    beforeEach(function () {
      expectedId = 123;

      return getHtml('foo/' + expectedId);
    });

    it('should return a response', function () {
      expect(res.statusCode).to.equal(200);
    });

    it('should render the contents', function () {
      expect($('.foo#' + expectedId).text()).to.equal('bar');
    });
  });

  function get(route) {
    return http(server).get(route).then(function (_res) {
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