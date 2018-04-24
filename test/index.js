'use strict';

const bluebirdify = require('../');
const assert = require('assert');
const Bluebird = require('bluebird');

describe('Bluebird Async Wrap', function () {
  class Test {
    async asyncMethod () {
      return true;
    }

    syncMethod () {
      return true;
    }
  }

  it('should wrap async methods in a bluebird Resolve', async function () {
    const test = new Test();

    assert(test.asyncMethod() instanceof Promise, 'asyncMethod is not an instance of Promise');
    assert.strictEqual(test.asyncMethod() instanceof Bluebird, false);

    bluebirdify(Test);

    assert(test.asyncMethod() instanceof Bluebird, 'asyncMethod is not an instance of Bluebird');

    assert(await test.asyncMethod());
    assert(test.syncMethod());
  });
});
