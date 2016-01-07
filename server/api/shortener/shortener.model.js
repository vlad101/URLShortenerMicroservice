'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ShortenerSchema = new mongoose.Schema({
  original_url: { type : String, required : true },
  short_url: { type : String, required : true, unique: true },
  active: Boolean
});

export default mongoose.model('Shortener', ShortenerSchema);