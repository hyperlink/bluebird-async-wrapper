'use strict';

const Bluebird = require('bluebird');

function isAsync (fn) {
  return fn.constructor.name === 'AsyncFunction';
}

module.exports = function bluebirdify (myClass, ignoreMethods = ['constructor']) {
  const properties = Object.getOwnPropertyNames(myClass.prototype);
  for (const property of properties) {
    if (ignoreMethods.includes(property)) {
      continue;
    }

    const originalMethod = myClass.prototype[property];
    if (isAsync(originalMethod)) {
      myClass.prototype[property] = function () {
        return Bluebird.resolve(originalMethod.apply(this, arguments));
      };
    }
  }
};
