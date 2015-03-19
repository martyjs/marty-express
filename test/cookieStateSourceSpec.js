var sinon = require('sinon');
var expect = require('chai').expect;
var middleware = require('../index');

describe('CookieStateSource', function ( ) {
  var Marty, source, expectedKey, expectedValue, req, res;

  beforeEach(function () {
    Marty = require('marty').createInstance();
    expectedKey = 'foo';

    middleware({ marty: Marty, routes: [] });

    req = { cookies: {} };
    req.cookies[expectedKey] = expectedValue;

    res = {
      cookie: sinon.spy(),
      clearCookie: sinon.spy()
    };

    source = Marty.createStateSource({
      id: 'ServerCookies',
      type: 'cookie',
      context: {
        req: req,
        res: res
      }
    });
  });

  describe('#set()', function () {
    beforeEach(function () {
      source.set(expectedKey, expectedValue);
    });

    it('should set the key in the cookie', function () {
      expect(res.cookie).to.be.calledWith(expectedKey, expectedValue);
    });
  });

  describe('#get()', function () {
    it('should retrieve data under key in cookie', function () {
      expect(source.get(expectedKey)).to.equal(expectedValue);
    });
  });

  describe('#expire()', function () {
    beforeEach(function () {
      source.expire(expectedKey);
    });

    it('should retrieve data under key in cookie', function () {
      expect(res.clearCookie).to.be.calledWith(expectedKey);
    });
  });
});