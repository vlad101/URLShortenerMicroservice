/**
 * Shortener model events
 */

'use strict';

import {EventEmitter} from 'events';
var Shortener = require('./shortener.model');
var ShortenerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ShortenerEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Shortener.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ShortenerEvents.emit(event + ':' + doc._id, doc);
    ShortenerEvents.emit(event, doc);
  }
}

export default ShortenerEvents;
