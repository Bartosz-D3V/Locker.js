/*! lockerjs v1.2.4 | (c) 2016-2017 Bartosz-D3V | MIT license (see LICENSE) */(function(a,b){'object'==typeof exports&&'undefined'!=typeof module?b(exports):'function'==typeof define&&define.amd?define(['exports'],b):b(a.bemquery=a.bemquery||{})})(this,function(a){'use strict';a.LocalStorage=class{constructor(a){if(a!==window.localStorage&&a!==window.sessionStorage)throw new TypeError('Invalid Storage object');if(this._isSupported(a))this.storage=a;else throw new ReferenceError('HTML5 Storage is not supported in this environment')}add(a,b){switch(a=this._parseToString(a),typeof b){case'object':{const c=this._parseToString(b);this.storage.setItem(a,c);break}default:this.storage.setItem(a,b);}}addSafely(a,b){a=this._parseToString(a);const c=this.storage.getItem(a);if(c)throw new ReferenceError('Provided key is already in use');this.add(a,b)}get(a){return a=this._parseToString(a),this.storage.getItem(a)}saveMap(a){const b='[object Map]'===Object.prototype.toString.call(a);if(!b)throw new TypeError('Must be of type Map');for(let[b,c]of a)this.add(b,c)}getMap(){const a=new Map;for(let b=0;b<this.storage.length;b++){let c=this._parseToString(this.storage.key(b)),d=this._parseToString(this.storage.getItem(c));a.set(c,d)}return a}saveSet(a){const b='[object Set]'===Object.prototype.toString.call(a);if(!b)throw new TypeError('Must be of type Set');for(let[b,c]of a.entries())this.add(b,c)}keyExists(a){return!!this.storage.getItem(this._parseToString(a))}valueExists(a){const b=this._parseToString(a);return!!b}clear(){this.storage.clear()}clearSpecified(a){if(!Array.isArray(a))throw new TypeError('Array not provided');for(let b=0;b<a.length;++b)this.storage.removeItem(this._parseToString(a[b]))}size(){return this.storage.length}_parseToString(a){switch(typeof a){case'number':case'object':return JSON.stringify(a);default:return a;}}_isSupported(a){const b='__test';try{return a.setItem(b,b),a.removeItem(b),!0}catch(a){return!1}}},Object.defineProperty(a,'__esModule',{value:!0})});
//# sourceMappingURL=lockerjs.umd.js.map
