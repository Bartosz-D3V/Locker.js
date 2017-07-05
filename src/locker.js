'use strict';

/**
 * Extremely light library that makes HTML5 storage usage easier to the edge.
 * No dependencies, no configuration.
 */
export default class {
	/**
	 * Creates a locker
	 * @param {object} storage
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
	 */
	get(key) {
		key = this._parseToString(key);
		return this.storage.getItem(key);
	}

	/**
	 * Saves map as-is into localstorage
	 * @param {Map} map
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
	 * @return {Map} localstorageCopy
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
	 */
	keyExists(key) {
		return !!this.storage.getItem(this._parseToString(key));
	}

	/**
	 * Check whether the given value exists in the window.localStorage
	 * @param {*} value
	 * @return {boolean}
	 */
	valueExists(value) {
		const parsedVal = this._parseToString(value);
		return !!parsedVal;
	}

	/**
	 * Clear the whole window.localStorage
	 */
	clear() {
		this.storage.clear();
	}

	/**
	 * Removes window.localstorage values by keys provide in array
	 * @param {array} arr
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
	 * Return size of localstorage
	 * @return {number}
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
