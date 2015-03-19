var expect = require('chai').expect;
var middleware = require('../index');

describe('LocationStateSource', function () {
  var source, req, Marty;

  beforeEach(function () {
    Marty = require('marty').createInstance();

    middleware({ marty: Marty, routes: [] });

    req = {};

    source = Marty.createStateSource({
      id: 'Location',
      type: 'location',
      context: {
        req: req
      }
    });
  });

  describe('#getLocation()', function () {
    var actualLocation, expectedQuery;

    beforeEach(function () {
      expectedQuery = {
        foo: 'bar',
        baz: 'bam'
      };

      req.url = 'http://foo.com/';
      req.protocol = 'http';
      req.query = expectedQuery;
      req.path = '/foo';
      req.hostname = 'foo.com';

      actualLocation = source.getLocation();
    });

    it('should return the correct url', function () {
      expect(actualLocation.url).to.equal('http://foo.com/');
    });

    it('should return the correct protocol', function () {
      expect(actualLocation.protocol).to.equal('http');
    });

    it('should return the correct query', function () {
      expect(actualLocation.query).to.eql(expectedQuery);
    });

    it('should return the correct path', function () {
      expect(actualLocation.path).to.eql('/foo');
    });

    it('should return the correct hostname', function () {
      expect(actualLocation.hostname).to.eql('foo.com');
    });
  });
});