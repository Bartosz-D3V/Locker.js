/*! Locker.js v1.0.0 | (c) 2016-2017 Bartosz-D3V | MIT license (see LICENSE) */var locker=class{constructor(a){if(a!==window.localStorage&&a!==window.sessionStorage)throw new TypeError('Invalid Storage object');else this.storage=a}add(a,b){switch(a=this._parseToString(a),typeof b){case'object':{const c=this._parseToString(b);this.storage.setItem(a,c);break}default:this.storage.setItem(a,b);}}addSafely(a,b){a=this._parseToString(a);const c=this.storage.getItem(a);if(c)throw new ReferenceError('Provided key is already in use');this.add(a,b)}get(a){return a=this._parseToString(a),this.storage.getItem(a)}saveMap(a){const b='[object Map]'===Object.prototype.toString.call(a);if(!b)throw new TypeError('Must be of type Map');for(let[b,c]of a)this.add(b,c)}getMap(){const a=new Map;for(let b=0;b<this.storage.length;b++){let c=this._parseToString(this.storage.key(b)),d=this._parseToString(this.storage.getItem(c));a.set(c,d)}return a}keyExists(a){return!!this.storage.getItem(this._parseToString(a))}valueExists(a){const b=this._parseToString(a);return!!b}clear(){this.storage.clear()}clearSpecified(a){if(!Array.isArray(a))throw new TypeError('Array not provided');for(let b=0;b<a.length;++b)this.storage.removeItem(this._parseToString(a[b]))}size(){return this.storage.length}_parseToString(a){switch(typeof a){case'number':case'object':return JSON.stringify(a);default:return a;}}};export{locker as LocalStorage};
//# sourceMappingURL=Locker.js.js.map
