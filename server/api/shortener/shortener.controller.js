/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/shortener/urls/all     ->  createFromUrl
 * GET     /api/shortener/:newUrl      ->  index
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

// Creates a new Shortener in the DB
export function create(req, res) {
  Shortener.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Gets an original url from API api/shortener/:newUrl and creates a new Shortener in the DB
export function createFromUrl(req, res) {

  var data = {};

  if(!req.params || !isValidOriginalUrl(req.params[0])) {
    data.error = 'Invalid URL';
    data.original_url = '';
    data.short_url = '';
    return res.json(data);
  } else {
    data.error = '';
    data.original_url = req.params[0];
    data.short_url = null;
    return res.json(data);
  }

  var newShortener = {
    original_url:"www.google.com/123456789",
    short_url: "AB123456789"
  }
  
  Shortener.createAsync(newShortener)
    .then(responseWithResult(res, 201))
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

function isValidOriginalUrl(url) {
  return /^((http|https|ftp?):\/\/)?([w|W]{3}\.)?[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/.test(url);
}