/*! lockerjs v1.2.3 | (c) 2016-2017 Bartosz-D3V | MIT license (see LICENSE) */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.bemquery=e.bemquery||{})}(this,function(e){"use strict";var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=function(){function e(e,t){var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{!n&&s.return&&s.return()}finally{if(o)throw i}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=function(){function e(t){r(this,e);if(t!==window.localStorage&&t!==window.sessionStorage)throw new TypeError("Invalid Storage object");if(!this._isSupported(t))throw new ReferenceError("HTML5 Storage is not supported in this environment");this.storage=t}return n(e,[{key:"add",value:function(e,r){switch(e=this._parseToString(e),void 0===r?"undefined":t(r)){case"object":var n=this._parseToString(r);this.storage.setItem(e,n);break;default:this.storage.setItem(e,r)}}},{key:"addSafely",value:function(e,t){if(e=this._parseToString(e),this.storage.getItem(e))throw new ReferenceError("Provided key is already in use");this.add(e,t)}},{key:"get",value:function(e){return e=this._parseToString(e),this.storage.getItem(e)}},{key:"saveMap",value:function(e){if(!("[object Map]"===Object.prototype.toString.call(e)))throw new TypeError("Must be of type Map");var t=!0,r=!1,n=void 0;try{for(var i,a=e[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){var s=o(i.value,2),u=s[0],f=s[1];this.add(u,f)}}catch(e){r=!0,n=e}finally{try{!t&&a.return&&a.return()}finally{if(r)throw n}}}},{key:"getMap",value:function(){for(var e=new Map,t=0;t<this.storage.length;t++){var r=this._parseToString(this.storage.key(t)),n=this._parseToString(this.storage.getItem(r));e.set(r,n)}return e}},{key:"saveSet",value:function(e){if(!("[object Set]"===Object.prototype.toString.call(e)))throw new TypeError("Must be of type Set");var t=!0,r=!1,n=void 0;try{for(var i,a=e.entries()[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){var s=o(i.value,2),u=s[0],f=s[1];this.add(u,f)}}catch(e){r=!0,n=e}finally{try{!t&&a.return&&a.return()}finally{if(r)throw n}}}},{key:"keyExists",value:function(e){return!!this.storage.getItem(this._parseToString(e))}},{key:"valueExists",value:function(e){return!!this._parseToString(e)}},{key:"clear",value:function(){this.storage.clear()}},{key:"clearSpecified",value:function(e){if(!Array.isArray(e))throw new TypeError("Array not provided");for(var t=0;t<e.length;++t)this.storage.removeItem(this._parseToString(e[t]))}},{key:"size",value:function(){return this.storage.length}},{key:"_parseToString",value:function(e){switch(void 0===e?"undefined":t(e)){case"number":case"object":return JSON.stringify(e);default:return e}}},{key:"_isSupported",value:function(e){try{return e.setItem("__test","__test"),e.removeItem("__test"),!0}catch(e){return!1}}}]),e}();e.LocalStorage=i,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=lockerjs.es5.js.map
