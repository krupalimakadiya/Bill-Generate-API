'use strict';
/**
 * This file modifies the request-response of the app.
 * What should do before request execute and what should do after request execution complete.
 */
const debug = require('debug')('API:RequestResponse');
const Boom = require('boom');
const _ = require('lodash');

exports.trimParams = function (req, res, next) {
  //console.log('req', req)
  //debug('API : %o', Utils.url(req) + req.url);
//  debug('req.method : %o ', req);

  // Trinm query and post parameters
  if (req.query) {
    for (var i in req.query) {
      if (_.isString(req.query[i])) {
        req.query[i] = req.query[i].trim();
      }
    }
  }

  if (req.body) {
    for (i in req.body) {
      if (_.isString(req.body[i])) {
        req.body[i] = req.body[i].trim();
      }
    }
  }
  next();
};

exports.handleSuccess = function (req, res, next) {
  var response = req.session.data || [];
  req.session.destroy();  
  debug('Success response : %o ', response);
  return res.send(response);
};

exports.handleError = function (err, req, res, next) {
  if (!err) {
    return next();
  }
  const errorResponse = {
    error: _.merge({
      stack: err.stack
    }, err.output && err.output.payload ? err.output.payload : err)
  };  
  debug('error response : %o ', errorResponse);
  return res.status(err.output && err.output.statusCode ? err.output.statusCode : 500).json(errorResponse);
};