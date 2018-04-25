# Bluebird Async Wrapper

[![Build Status](https://travis-ci.org/hyperlink/bluebird-async-wrapper.svg?branch=master)](https://travis-ci.org/hyperlink/bluebird-async-wrapper)

Helper to migrate from Bluebird to async/await by wrapping each async method with bluebird Resolve

## Install

```bash
npm install bluebird-async-wrap
```

## Usage

```javascript
const bluebirdify = require('bluebird-async-wrap');

class Test {
 async asyncMethod () {
   return true;
 }

 syncMethod () {
   return true;
 }
}

bluebirdify(Test);

const test = new Test();

test.asyncMethod().tap( v => console.log('this works!'));
```