var marty = require('../index');
var cheerio = require('cheerio');
var http = require('./lib/http');
var expect = require('chai').expect;

describe.only('HttpStateSource', function () {
  var $, res, server, expectedMessage;

  beforeEach(function () {
    server = require('./fixtures/server')();
    server.use(marty({
      routes: require('./fixtures/routes')()
    }));

    expectedMessage = 'this came from the API';

    server.get('/api/foos/:id', function (req, res) {
      res.json({ id: req.params.id, message: expectedMessage });
    });

    return server.start();
  });

  describe('when there is a handler that matches the request', function () {
    var expectedId;

    beforeEach(function () {
      expectedId = 123;

      return getHtml('remote-foo/' + expectedId);
    });

    it('should return a response', function () {
      expect(res.statusCode).to.equal(200);
    });

    it('should render the contents', function () {
      expect($('.foo#' + expectedId).text()).to.equal(expectedMessage);
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