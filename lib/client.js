'use strict';

var request = require( 'request' );

/**
 * responseCallback
 * @param  {Object} error
 * @param  {Object} response
 * @param  {Object} body
 * @return {Object} JSON Object with data or false when an error occured
 */
function responseCallback(error, response, body) {
  if (error) {
    console.error( 'error', error );
    return false;
  }
  body = JSON.parse( body );
  if (body && body.data) {
    return body.data;
  }
  return body || false;
}

/**
 * conbines request with callback
 * @private
 * @param  {Function} cb Callback Function
 * @return {Function}
 */
function transform(cb) {
  return function() {
    var resp = responseCallback.apply( null, arguments );
    cb( resp );
  };
}

/**
 * detectlanguage http client
 * @param  {Array} options Object with apiKey and SSL-Settings
 * @return {client Instance}
 */
var client = function client(options) {
  this.options = options;
  this.baseUrl = (this.options.useSSL ? 'http' : 'https') + '://ws.detectlanguage.com/0.2';
};

/**
 * client prototype
 * @type {Object}
 */
client.prototype = {

  /**
   * post request
   * @param  {String} endpoint Url
   * @param  {Object} post query data
   * @param  {Function} cb Callback Function
   * @return {void}
   */
  post: function post(endpoint, data, cb) {
    data.key = this.options.apiKey;
    request.post( {
      url: this.baseUrl + endpoint,
      form: data
    },
      transform( cb )
    );
  },

  /**
   * get request
   * @param  {String} endpoint Url (contains query string)
   * @param  {Function} cb Callback Function
   * @return {void}   */
  get: function get(endpoint, cb) {
    request( this.baseUrl + endpoint + '?key=' + this.options.apiKey, transform( cb ) );
  }

};

module.exports = client;
