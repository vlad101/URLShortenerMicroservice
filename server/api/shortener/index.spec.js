'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var shortenerCtrlStub = {
  index: 'shortenerCtrl.index',
  show: 'shortenerCtrl.show',
  create: 'shortenerCtrl.create',
  update: 'shortenerCtrl.update',
  destroy: 'shortenerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var shortenerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './shortener.controller': shortenerCtrlStub
});

describe('Shortener API Router:', function() {

  it('should return an express router instance', function() {
    shortenerIndex.should.equal(routerStub);
  });

  describe('GET /api/shortener', function() {

    it('should route to shortener.controller.index', function() {
      routerStub.get
        .withArgs('/', 'shortenerCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/shortener/:id', function() {

    it('should route to shortener.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'shortenerCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/shortener', function() {

    it('should route to shortener.controller.create', function() {
      routerStub.post
        .withArgs('/', 'shortenerCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/shortener/:id', function() {

    it('should route to shortener.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'shortenerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/shortener/:id', function() {

    it('should route to shortener.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'shortenerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/shortener/:id', function() {

    it('should route to shortener.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'shortenerCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
