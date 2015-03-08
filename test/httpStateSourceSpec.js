var _ = require('lodash');
var sinon = require('sinon');
var marty = require('../index');
var cheerio = require('cheerio');
var http = require('./lib/http');
var expect = require('chai').expect;

describe('HttpStateSource', function () {
  var $, res, server, expectedMessage, expectedHeaders, actualHeaders, handler;

  beforeEach(function () {
    server = require('./fixtures/server')();
    server.use(marty({
      routes: require('./fixtures/routes')()
    }));

    expectedMessage = 'this came from the API';

    handler = sinon.spy(function (req, res) {
      actualHeaders = req.headers;
      res.json({ id: req.params.id, message: expectedMessage });
    });

    server.get('/api/foos/:id', handler);

    return server.start();
  });

  describe('when there is a handler that matches the request', function () {
    var expectedId;

    beforeEach(function () {
      expectedId = 123;
      expectedHeaders = {
        'x-foo': 'Bar',
        'user-agent': 'Mozilla/5.0'
      };

      return getHtml('remote-foo/' + expectedId, {
        headers: expectedHeaders
      });
    });

    it('should return a response', function () {
      expect(res.statusCode).to.equal(200);
    });

    it('should have called the handler', function () {
      expect(handler).to.have.been.calledOnce;
    });

    it('should have propagated the headers', function () {
      var headers = _.pick(actualHeaders, Object.keys(expectedHeaders));

      expect(headers).to.eql(expectedHeaders);
    });

    it('should render the contents', function () {
      expect($('.foo#' + expectedId).text()).to.equal(expectedMessage);
    });
  });

  function get(url, options) {
    return http(server).get(url, options).then(function (_res) {
      res = _res;

      return res;
    });
  }

  function getHtml(url, options) {
    return get(url, options).then(function () {
      $ = cheerio.load(res.body);
    });
  }
});