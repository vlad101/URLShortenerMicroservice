'use strict';

var app = require('../..');
import request from 'supertest';

var newShortener;

describe('Shortener API:', function() {

  describe('GET /api/shortener', function() {
    var shorteners;

    beforeEach(function(done) {
      request(app)
        .get('/api/shortener')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          shorteners = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      shorteners.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/shortener', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/shortener')
        .send({
          name: 'New Shortener',
          info: 'This is the brand new shortener!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newShortener = res.body;
          done();
        });
    });

    it('should respond with the newly created shortener', function() {
      newShortener.name.should.equal('New Shortener');
      newShortener.info.should.equal('This is the brand new shortener!!!');
    });

  });

  describe('GET /api/shortener/:id', function() {
    var shortener;

    beforeEach(function(done) {
      request(app)
        .get('/api/shortener/' + newShortener._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          shortener = res.body;
          done();
        });
    });

    afterEach(function() {
      shortener = {};
    });

    it('should respond with the requested shortener', function() {
      shortener.name.should.equal('New Shortener');
      shortener.info.should.equal('This is the brand new shortener!!!');
    });

  });

  describe('PUT /api/shortener/:id', function() {
    var updatedShortener;

    beforeEach(function(done) {
      request(app)
        .put('/api/shortener/' + newShortener._id)
        .send({
          name: 'Updated Shortener',
          info: 'This is the updated shortener!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedShortener = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedShortener = {};
    });

    it('should respond with the updated shortener', function() {
      updatedShortener.name.should.equal('Updated Shortener');
      updatedShortener.info.should.equal('This is the updated shortener!!!');
    });

  });

  describe('DELETE /api/shortener/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/shortener/' + newShortener._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when shortener does not exist', function(done) {
      request(app)
        .delete('/api/shortener/' + newShortener._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
