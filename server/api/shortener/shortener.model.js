'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ShortenerSchema = new mongoose.Schema({
  original_url: String,
  short_url: String,
  active: Boolean
});

export default mongoose.model('Shortener', ShortenerSchema);
