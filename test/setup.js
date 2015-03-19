process.env['NODE_ENV'] = 'test';

require('babel/register');

var chai = require('chai');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);