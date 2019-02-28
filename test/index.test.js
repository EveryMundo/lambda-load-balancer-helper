'use strict';

/* eslint-disable no-unused-expressions */

const {expect}     = require('chai');
const sinon        = require('sinon');

describe('index.js', () => {
  const noop        = () => {};
  // eslint-disable-next-line one-var-declaration-per-line
  let box;

  beforeEach(() => {
    box = sinon.createSandbox();
  });

  afterEach(() => {
    box.restore();
  });

  describe('project', () => {
    context('when lib is loaded', () => {
      it('should export expected keys', () => {
        const lib = require('../');

        const expectedKeys = {
          defaultHeaders: Object,
          errorResponse:  Function,
          okResponse:     Function,
          response:       Function,
        };

        Object.entries(expectedKeys).forEach(([property, type]) => {
          expect(lib).to.have.property(property).to.be.instanceof(type);
        });
      });
    });
  });

  describe('defaultHeaders', () => {
    it('should export expected keys', () => {
      const {defaultHeaders} = require('../');

      const expectedHeaders = {
        'Set-cookie': 'cookies',
        'Content-Type': 'application/json',
      };

      expect(defaultHeaders).to.deep.equal(expectedHeaders);
    });
  });

  describe('#response', () => {
    context('when called with no arguments', () => {
      it('should throw an error', () => {
        const lib = require('../');

        const caller = () => lib.response();

        expect(caller).to.throw(Error, 'Cannot destructure property');
      });
    });

    context('when called only with statusCode 200', () => {
      it('should return expected default object', () => {
        const lib = require('../');

        const expectedKeys = {
          isBase64Encoded: false,
          statusCode: 200,
          statusDescription: '200 Ok',
          headers: lib.defaultHeaders,
          body: '{}',
        };

        const res = lib.response({statusCode: 200});

        expect(res).to.deep.equal(expectedKeys);
      });
    });

    context('when called with statusCode 200 and debug true', () => {
      it('should return expected default object', () => {
        const lib = require('../');

        const expectedKeys = {
          isBase64Encoded: false,
          statusCode: 200,
          statusDescription: '200 Ok',
          headers: lib.defaultHeaders,
          body: JSON.stringify({versions: process.versions}),
        };

        const res = lib.response({statusCode: 200}, true);

        expect(res).to.deep.equal(expectedKeys);
      });
    });
  });

  describe('#errorResponse', () => {
    context('when called with no arguments', () => {
      it('should return expected default object', () => {
        const lib = require('../');

        const expectedKeys = {
          isBase64Encoded: false,
          statusCode: 500,
          statusDescription: '500 Error',
          headers: lib.defaultHeaders,
          body: '{"statusCode":500}',
        };

        const res = lib.errorResponse();

        expect(res).to.deep.equal(expectedKeys);
      });
    });

    context('when called only with a message', () => {
      it('should return expected object with message', () => {
        const lib = require('../');

        const expectedKeys = {
          isBase64Encoded: false,
          statusCode: 500,
          statusDescription: '500 Error',
          headers: lib.defaultHeaders,
          body: '{"statusCode":500,"message":"something happened"}',
        };

        const res = lib.errorResponse('something happened');

        expect(res).to.deep.equal(expectedKeys);
      });
    });

    context('when called with message and debug true', () => {
      it('should return modified object with message', () => {
        const lib = require('../');

        const expectedKeys = {
          isBase64Encoded: false,
          statusCode: 500,
          statusDescription: '500 Error',
          headers: lib.defaultHeaders,
          body: JSON.stringify({
            statusCode: 500,
            message: 'something happened',
            versions: process.versions,
          }),
        };

        const res = lib.errorResponse('something happened', undefined, true);

        expect(res).to.deep.equal(expectedKeys);
      });
    });
  });

  describe('#okResponse', () => {
    context('when called with no arguments', () => {
      it('should return expected default object', () => {
        const lib = require('../');

        const expectedKeys = {
          isBase64Encoded: false,
          statusCode: 200,
          statusDescription: '200 Ok',
          headers: lib.defaultHeaders,
          body: '{"statusCode":200}',
        };

        const res = lib.okResponse();

        expect(res).to.deep.equal(expectedKeys);
      });
    });

    context('when called only with a data', () => {
      it('should return expected object with data', () => {
        const lib = require('../');

        const expectedKeys = {
          isBase64Encoded: false,
          statusCode: 200,
          statusDescription: '200 Ok',
          headers: lib.defaultHeaders,
          body: '{"statusCode":200,"data":"something happened"}',
        };

        const res = lib.okResponse('something happened');

        expect(res).to.deep.equal(expectedKeys);
      });
    });

    context('when called with data and debug true', () => {
      it('should return modified object with data', () => {
        const lib = require('../');

        const expectedKeys = {
          isBase64Encoded: false,
          statusCode: 200,
          statusDescription: '200 Ok',
          headers: lib.defaultHeaders,
          body: JSON.stringify({
            statusCode: 200,
            data: 'something happened',
            versions: process.versions,
          }),
        };

        const res = lib.okResponse('something happened', undefined, true);

        expect(res).to.deep.equal(expectedKeys);
      });
    });
  });
});
