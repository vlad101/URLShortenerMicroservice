'use strict';

var express = require('express');
var controller = require('./shortener.controller');

var router = express.Router();

router.get('/newUrl/*', controller.createFromUrl);
router.get('/url/all', controller.index);
router.get('/:id', controller.show);
router.get('/getUrl/:shortUrl', controller.showByShortUrl);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;