function ServerCookies(req, res) {
  if (!req) {
    throw new Error('req is required');
  }

  if (!res) {
    throw new Error('res is required');
  }

  this.req = req;
  this.res = res;
}

ServerCookies.prototype = {
  get: function(key) {
    if (this.req.cookies) {
      return this.req.cookies[key];
    }

    console.warn(
      'Warning: Could not find cookies in req. Do you have the cookie-parser middleware ' +
      '(https://www.npmjs.com/package/cookie-parser) installed?'
    );
  },
  set: function(key, value, options) {
    this.res.cookie(key, value, options);
  },
  expire: function(key) {
    this.res.clearCookie(key);
  }
}

module.exports = ServerCookies;
