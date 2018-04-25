'use strict';

const bluebirdify = require('../');
const assert = require('assert');
const Bluebird = require('bluebird');

describe('Bluebird Async Wrap', function () {
  it('shoud wrap static async methods in a bluebird Resolve', async function () {
    class Test {
      static async asyncMethod () {
        return true;
      }

      static syncMethod () {
        return true;
      }
    }
    assert(Test.asyncMethod() instanceof Promise, 'asyncMethod is not an instance of Promise');
    assert.strictEqual(Test.asyncMethod() instanceof Bluebird, false);

    bluebirdify(Test);

    assert(Test.asyncMethod() instanceof Bluebird, 'asyncMethod is not an instance of Bluebird');

    assert(await Test.asyncMethod());
  });

  it('should return the modified class', function () {
    class Test {}
    assert.strictEqual(bluebirdify(Test), Test);
  });

  it('should wrap async methods in a bluebird Resolve', async function () {
    class Test {
      async asyncMethod () {
        return true;
      }

      syncMethod () {
        return true;
      }
    }

    const test = new Test();

    assert(test.asyncMethod() instanceof Promise, 'asyncMethod is not an instance of Promise');
    assert.strictEqual(test.asyncMethod() instanceof Bluebird, false);

    bluebirdify(Test);

    assert(test.asyncMethod() instanceof Bluebird, 'asyncMethod is not an instance of Bluebird');

    assert(await test.asyncMethod());
    assert(test.syncMethod());
  });
});
