'use strict';

/**
 * Extremely light library that makes HTML5 storage usage easier to the edge.
 * No dependencies, no configuration.
 */
export default class {
	/**
	 * Creates a locker
	 * @param {object} storage
	 * @example
	 * // localStorage
	 * const locker = new Locker(window.localStorage);
	 * // sessionStorage
	 * const locker = new Locker(window.sessionStorage);
	 */
	constructor(storage) {
		if (storage !== window.localStorage &&
			storage !== window.sessionStorage) {
			throw new TypeError('Invalid Storage object');
		} else {
			this.storage = storage;
		}
	}

	/**
	 * Add a value into HTML5 window.localStorage.
	 * @param {*} key
	 * @param {*} value
	 * @example
	 * const myObj = {
	 *     'name': 'John',
	 *     'surname': 'Test',
	 * };
	 */
	add(key, value) {
		key = this._parseToString(key);
		switch (typeof value) {
			case 'object': {
				const parsedVal = this._parseToString(value);
				this.storage.setItem(key, parsedVal);
				break;
			}
			default: {
				this.storage.setItem(key, value);
			}
		}
	}

	/**
	 * Add a value with a given key to the storage if a key is not already used.
	 * Otherwise returns ReferenceError instead of overwriting it;
	 * @param {*} key
	 * @param {*} value
	 * @example
	 * locker.addSafely('Key 1', 1); //OK
	 * locker.addSafely('Key 1', 123); //ReferenceError
	 */
	addSafely(key, value) {
		key = this._parseToString(key);
		const keyExists = this.storage.getItem(key);
		if (keyExists) {
			throw new ReferenceError('Provided key is already in use');
		}
		this.add(key, value);
	}

	/**
	 * Get a value from HTML5 window.localStorage
	 * @param {*} key
	 * @return {*}
	 * @example
	 * locker.get(123);
	 */
	get(key) {
		key = this._parseToString(key);
		return this.storage.getItem(key);
	}

	/**
	 * Saves map as-is into localstorage
	 * @param {Map} map
	 * @example
	 * const sampleMap = new Map();
	 * map.set(1, 'First entry');
	 * map.set(2, 'Second entry');
	 * locker.clear();
	 * locker.saveMap(sampleMap);
	 * locker.get(1); // 'First entry'
	 * locker.get(2); // 'Second entry'
	 */
	saveMap(map) {
		const isMap = Object.prototype.toString.call(map) === '[object Map]';
		if (!isMap) {
			throw new TypeError('Must be of type Map');
		}
		for (let [key, value] of map) {
			this.add(key, value);
		}
	}

	/**
	 * Saves and returns whole storage as map
	 * @return {Map} HTML5 Storage copy
	 * @example
	 * locker.add(1, [1, 2, 3]);
	 * const backup = locker.saveMap();
	 */
	getMap() {
		const mappedStorage = new Map();
		for (let i = 0; i < this.storage.length; i++) {
			let tempKey = this._parseToString(this.storage.key(i));
			let tempVal = this._parseToString(this.storage.getItem(tempKey));
			mappedStorage.set(tempKey, tempVal);
		}
		return mappedStorage;
	}

	/**
	 * Check whether the given key exists in the window.localStorage
	 * @param {*} key
	 * @return {boolean}
	 * @example
	 * locker.add(2, 1234);
	 * locker.keyExists(2) // True
	 * locker.keyExists({'name': 'John'}) // False
	 */
	keyExists(key) {
		return !!this.storage.getItem(this._parseToString(key));
	}

	/**
	 * Check whether the given value exists in the window.localStorage
	 * @param {*} value
	 * @return {boolean}
	 * @example
	 * const mySet = new Set();
	 * mySet.set("Some array", [1, 2, 3]);
	 * locker.add(mySet);
	 * locker.valueExists(mySet); // True
	 */
	valueExists(value) {
		const parsedVal = this._parseToString(value);
		return !!parsedVal;
	}

	/**
	 * Clear the whole window.localStorage
	 * @example
	 * locker.add(1, [1, 2]);
	 * locker.clear(); //Empty
	 */
	clear() {
		this.storage.clear();
	}

	/**
	 * Removes HTML5 Storage values by keys provide in array
	 * @param {array} arr
	 * @example
	 * const testObj = {
	 *     'name': 'John'
	 * }
	 * locker.add(testObj, "We like this customer!");
	 * locker.add(1, 123);
	 * const keysToRemove = ['1', testObj];
	 * locker.clearSpecified(keysToRemove); // Empty
	 */
	clearSpecified(arr) {
		if (!Array.isArray(arr)) {
			throw new TypeError('Array not provided');
		}
		for (let i = 0; i < arr.length; ++i) {
			this.storage.removeItem(this._parseToString(arr[i]));
		}
	}

	/**
	 * Returns the size of the storage
	 * @return {number}
	 * @example
	 * locker.add(12, [1,2]);
	 * locker.size(); //1
	 */
	size() {
		return this.storage.length;
	}

	/**
	 * Parse value to stringified JSON
	 * @param {*} value
	 * @return {string}
	 * @private
	 */
	_parseToString(value) {
		switch (typeof value) {
			case 'number':
			case 'object': {
				return JSON.stringify(value);
			}
			default: {
				return value;
			}
		}
	}
}
