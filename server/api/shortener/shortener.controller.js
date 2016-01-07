/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/shortener/url/all     ->  createFromUrl
 * GET     /api/shortener/newUrl/:newUrl      ->  index
 * POST    /api/shortener              ->  create
 * GET     /api/shortener/:id          ->  show
 * PUT     /api/shortener/:id          ->  update
 * DELETE  /api/shortener/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';

var Shortener = require('./shortener.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of all Shorteners
export function index(req, res) {
  Shortener.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Shortener from the DB
export function show(req, res) {
  Shortener.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Shortener from the DB
export function showByShortUrl(req, res) {
  Shortener.findAsync({short_url:req.params.shortUrl})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Shortener in the DB
export function create(req, res) {
  Shortener.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Gets an original url from API api/shortener/:newUrl and creates a new Shortener in the DB
export function createFromUrl(req, res) {

  if(!req.params || req.params[0].trim().length == 0) {
    var data = {
      error : 'Invalid URL',
      original_url : '',
      short_url : ''
    };
    return res.json(data);
  }

  var url = req.params[0].trim();
  var newShortener = {
    original_url: url,
    short_url: getRandomShortUrl(url)
  }
  
  Shortener.createAsync(newShortener)
    .then(responseWithCreateUrlResult(req, res, 201))
    .catch(handleError(res));
}

// Updates an existing Shortener in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Shortener.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Shortener from the DB
export function destroy(req, res) {
  Shortener.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// The alphanumeric URL id will be generated for a short URL
// ShortId creates amazingly short non-sequential url-friendly unique ids, perfect for url shorteners.
function getRandomShortUrl(url) {
  var shortid = require('shortid');
  return shortid.generate();
}

// Response: {"original_url":"http://www.google.com","short_url":"http://localhost:9000/Ey3tOYwwl"}
function responseWithCreateUrlResult(req, res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      entity = entity.toObject();
      delete entity.__v;
      delete entity._id;
      entity.short_url = 'http://' + req.headers.host + '/' + entity.short_url;
      res.status(statusCode).json(entity);
    }
  };
}