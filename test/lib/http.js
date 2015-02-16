var when = require('when');
var request = require('request');

module.exports = function (server) {
  return {
    get: function (path, options) {
      return when.promise(function (resolve, reject) {
        request(server.host + '/' + path, options, function (error, response, body) {
          if (error) {
            reject(error);
          } else {
            response.body = body;
            resolve(response);
          }
        });
      });
    }
  };
};