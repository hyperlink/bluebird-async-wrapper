'use strict';

const Bluebird = require('bluebird');

function isAsync (fn) {
  return fn.constructor.name === 'AsyncFunction';
}

function bluebirdify (object, ignoreMethods) {
  const properties = Object.getOwnPropertyNames(object);
  for (const property of properties) {
    if (ignoreMethods.includes(property)) {
      continue;
    }

    const originalMethod = object[property];
    if (typeof originalMethod === 'function' && isAsync(originalMethod)) {
      object[property] = function () {
        return Bluebird.resolve(originalMethod.apply(this, arguments));
      };
    }
  }
}

module.exports = function (myClass, ignoreMethods = ['constructor', 'length', 'name', 'prototype']) {
  bluebirdify(myClass, ignoreMethods);
  bluebirdify(myClass.prototype, ignoreMethods);
  return myClass;
};
