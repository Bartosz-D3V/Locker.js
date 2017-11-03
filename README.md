# LockerJS - HTML5 Storage Wrapper

[![Greenkeeper badge](https://badges.greenkeeper.io/Bartosz-D3V/Locker.js.svg)](https://greenkeeper.io/)

_Extremely light library that makes HTML5 storage usage easier to the edge. No dependencies, no configuration._
<br>
<p align="center">
<a href="https://www.npmjs.com/package/lockerjs"><img src="https://img.shields.io/npm/l/express.svg" alt="MIT License"></a>
<a href="https://www.npmjs.com/package/lockerjs"><img src="https://img.shields.io/npm/v/lockerjs.svg" alt="npm version"></a>
<a href="https://travis-ci.org/Bartosz-D3V/Locker.js"><img src="https://travis-ci.org/Bartosz-D3V/Locker.js.svg?branch=master" alt="Build Status"></a>
<a href="https://ci.appveyor.com/project/Bartosz-D3V/locker-js"><img src="https://ci.appveyor.com/api/projects/status/ceq04cukdgoci2eq?svg=true" alt="Build Status"></a>
<a href="https://codecov.io/gh/Bartosz-D3V/Locker.JS">
  <img src="https://codecov.io/gh/Bartosz-D3V/Locker.JS/branch/master/graph/badge.svg" alt="Codecov" />
</a>
<a href="https://david-dm.org/bartosz-d3v/lockerjs" title="dependencies status"><img src="https://david-dm.org/bartosz-d3v/lockerjs/status.svg"/></a>
<a href="https://david-dm.org/bartosz-d3v/lockerjs/?type=dev"><img src="https://david-dm.org/bartosz-d3v/lockerjs/dev-status.svg" alt="devDependency Status"></a>
<a href="https://inch-ci.org/github/Bartosz-D3V/locker.js"><img src="http://inch-ci.org/github/Bartosz-D3V/Locker.JS.svg?branch=master" alt="Inline docs"></a>
</p>


## Installation
### NPM
` npm install --save lockerjs `
### Yarn
` yarn add lockerjs `

## Usage
```js
import Locker from 'lockerjs';

const locker = new Locker(window.localStorage);
// or
const locker = new Locker(window.sessionStorage);
```

## Features


## add
setItem does the job, although it is quite limited as it accepts only String - String values.
By using LockerJS you are no longer limited by value types!
Saving object with key 1 is as easy as:
```js
const myObj = {
    'name': 'John',
    'surname': 'Test',
};
locker.add(1, myObj);
```
Isn't that easy?
You can use _any_ parameter type as your key and value;

### addSafely
Only adds value to specific key if a given key _is not_ already used.
Otherwise throws an error.
```js
locker.addSafely('Key 1', 1); //OK
locker.addSafely('Key 1', 123); //ReferenceError: 'Provided key is already in use'
```

## get
getItem allows you to retrieve text value from storage by passing key, but wouldn't that be great just to pass _any_ parameter type?
Consider this snippet:
```js
locker.get(123);
```
Isn't that as easy as one-two-three?
There's more!
Locker will return you an original value type!
```js
const myArr = [1, 2, 3];
locker.add(1, myArr);
const retrievedArr = locker.get(1);
typeof retrievedArr; // "array"
console.log(retrievedArr); // [1, 2, 3]
```
Of course, same goes for numbers, objects, ES6 Maps etc.
### keyExists
Simply returns _true_ if a given key has been already used, otherwise _false_
```js
locker.add(2, 1234);
locker.keyExists(2) // True
locker.keyExists({'name': 'John'}) // False
```
### valueExists
Simply returns _true_ if a given value has been already used, otherwise _false_.
```js
const mySet = new Set();
mySet.set("Some array", [1, 2, 3]);
locker.add(mySet);
locker.valueExists(mySet); // True
```
### clear
Clear the whole storage
```js
locker.add(1, [1, 2]);
locker.clear(); //Empty
```
### size
Returns the size of the storage
```js
locker.add(12, [1,2]);
locker.size(); //2
```

### clearSpecified
Pass an array of keys that shall be removed and Locker will remove only those entries
```js
const testObj = {
    'name': 'John',
}
locker.add(testObj, "We like this customer!");
locker.add(1, 123);
const keysToRemove = ['1', testObj];
locker.clearSpecified(keysToRemove); // Empty
```
As you have noticed you can mix & match all value types to your preferences.

### saveMap
Convert & copy keys and values from ES6 Map into storage.
```js
const sampleMap = new Map();
map.set(1, 'First entry');
map.set(2, 'Second entry');
locker.clear();
locker.saveMap(sampleMap);
locker.get(1); // 'First entry'
locker.get(2); // 'Second entry'
```

### getMap
If you would like to get a 'backup' of client's storage you can do so by invoking saveMap().
It will construct ES6 Map from storage.
```js
locker.add(1, [1, 2, 3]);
const backup = locker.getMap();
```

# Contributing

## Issues
Please raise any issues using a template inside ./github folder.

## Pull requests
All PRs are more than welcome!
Please run
```
npm test
```
before submitting a merge request.


# License
MIT
