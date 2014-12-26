'use strict';

/**
 * Script's version number
 * @type {String}
 */
var VERSION = '0.0.1';

/**
 * The user's API key
 * @type {[type]}
 */
var apiKey = require( '../apikey' );
var Client = require( './client.js' );
var client = new Client( {
  apiKey: apiKey,
  useSSL: true
} );

/**
 * @description
 * Public Interface for DetectLanguage
 * @type {Object}
 */
var detectLanguage = {

  /**
   * const Version number
   */
  VERSION: VERSION,

  /**
   * detect languages
   * @param  {String|Array} q  Query String either String or String-Array
   * @param  {Function} cb  Callback function
   * @return {void}
   */
  detect: function(q, cb) {
    if (!q) {
      cb('no mathing query', null);
      return false;
    }
    var key = Array.isArray( q ) ? 'q[]' : 'q';
    var data = {};
    data[key] = q;
    client.post( '/detect', data, function(data) {
      cb( data.detections );
    } );
  },

  /**
   * detect language only (to the first match in case of array)
   * @interface for detectLanguage.detect
   * @param  {String|Array} q  Query String either String or String-Array
   * @param  {Function} cb  Callback function
   * @return {void}
   */
  simpleDetect: function(q, cb) {
    this.detect( q, function(detections) {
      detections = detections || [];
      cb( detections[0].language || null );
    } );
  },

  /**
   * get user status
   * @param  {Function} cb  Callback Function
   * @return {void}
   */
  userStatus: function(cb) {
    client.get( '/user/status', cb );
  },

  /**
   * get all languages
   * @param  {Function} cb  Callback Function
   * @return {void}
   */
  languages: function(cb) {
    client.get( '/languages', cb );
  }
};

module.exports = detectLanguage;
