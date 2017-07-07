/* global chai */
import Locker from '../src/locker';

const expect = chai.expect;
const assert = chai.assert;

describe('Locker', () => {
	it('is a class', () => {
		expect(Locker).to.be.a('function');
	});

	it('is defined', () => {
		assert.isDefined(new Locker(window.localStorage));
		assert.isDefined(new Locker(window.sessionStorage));
	});

	it('should throw error if storage type was not provided', () => {
		expect(() => {
			new Locker();
		}).to.throw(TypeError, 'Invalid Storage object');
	});

	it('has private method _parseToString', () => {
		expect(Locker.prototype._parseToString).to.be.defined;
		expect(Locker.prototype._parseToString).to.be.a('function');
	});

	it('has private property storage', () => {
		expect(Locker.prototype.storage).to.be.defined;
		expect(Locker.prototype.storage).should.be.an('object');
	});

	describe('public API', () => {
		const locker = new Locker(window.localStorage);
		const lclStr = window.localStorage;
		const mockText = 'Sample text';
		const mockNum = 123456789;
		const mockObj = {
			'name': 'John',
			'surname': 'Test',
		};
		const mockMap = new Map([
			['name', 'John'],
			['surname', 'Test'],
		]);
		const mockArr = ['Number', 2];
		let mockStorage;

		beforeEach(() => {
			window.localStorage.clear();
			mockStorage = {};
			spyOn(lclStr, 'setItem').and.callFake((key, value) => {
				mockStorage[key] = value;
			});
			spyOn(lclStr, 'getItem').and.callFake((key) => {
				return mockStorage[key];
			});
			spyOn(lclStr, 'removeItem').and.callFake((key) => {
				delete mockStorage[key];
			});
			spyOn(lclStr, 'clear').and.callFake(() => {
				for (const prop of Object.getOwnPropertyNames(mockStorage)) {
					delete mockStorage[prop];
				}
			});
		});

		describe('add method', () => {
			it('should add string to localstorage', () => {
				locker.add('1', mockText);
				const lclSrnSize = Object.keys(mockStorage).length;
				expect(lclStr.setItem).to.have.been.called;
				expect(lclSrnSize).to.equal(1);
				expect(lclStr.getItem('1')).to.deep.equal(mockText);
			});

			it('should add number to localstorage', () => {
				locker.add('1', mockNum);
				const lclSrnSize = Object.keys(mockStorage).length;
				expect(lclStr.setItem).to.have.been.called;
				expect(lclSrnSize).to.equal(1);
				expect(lclStr.getItem('1')).to.deep.equal(mockNum);
			});

			it('should add object to localstorage', () => {
				locker.add('1', mockObj);
				const lclSrnSize = Object.keys(mockStorage).length;
				const actualVal = lclStr.getItem('1');
				expect(lclStr.setItem).to.have.been.called;
				expect(lclSrnSize).to.equal(1);
				expect(actualVal).to.deep.equal(JSON.stringify(mockObj));
				expect(actualVal).should.be.an('object');
			});

			it('should add an array to localstorage', () => {
				locker.add('savedArr', mockArr);
				const savedArr = JSON.parse(localStorage.getItem('savedArr'));
				expect(locker.add).to.have.been.called;
				expect(savedArr).to.be.an('array');
				expect(savedArr[0]).to.deep.equal(mockArr[0]);
				expect(savedArr[1]).to.deep.equal(mockArr[1]);
			});

			it('should add a map to localstorage', () => {
				locker.add('1', mockMap);
				const actualVal = lclStr.getItem('1');
				const lclSrnSize = Object.keys(mockStorage).length;
				expect(lclSrnSize).to.equal(1);
				expect(lclStr.setItem).to.have.been.called;
				expect(actualVal).to.deep.equal(JSON.stringify(mockMap));
			});

			it('should add string to localstorage using number as a key', () => {
				locker.add(1, mockText);
				expect(lclStr.setItem).to.have.been.called;
				const lclSrnSize = Object.keys(mockStorage).length;
				expect(lclSrnSize).to.equal(1);
				expect(lclStr.getItem('1')).to.deep.equal(mockText);
			});

			it('should add number to localstorage using number as a key', () => {
				locker.add(1, mockNum);
				expect(lclStr.setItem).to.have.been.called;
				expect(lclStr.getItem('1')).to.deep.equal(mockNum);
			});

			it('should add object to localstorage using number as a key', () => {
				locker.add(1, mockObj);
				expect(lclStr.setItem).to.have.been.called;
				const actualVal = lclStr.getItem('1');
				const lclSrnSize = Object.keys(mockStorage).length;
				expect(lclSrnSize).to.equal(1);
				expect(actualVal).to.deep.equal(JSON.stringify(mockObj));
				expect(actualVal).should.be.an('object');
			});

			it('should add a map to localstorage using number as a key', () => {
				locker.add(1, mockMap);
				expect(lclStr.setItem).to.have.been.called;
				const actualVal = lclStr.getItem('1');
				const lclSrnSize = Object.keys(mockStorage).length;
				expect(lclSrnSize).to.equal(1);
				expect(actualVal).to.deep.equal(JSON.stringify(mockMap));
			});

			it('should add string to localstorage using object as a key', () => {
				const parsedKey = JSON.stringify(mockObj);
				locker.add(mockObj, mockText);
				expect(lclStr.setItem).to.have.been.called;
				const lclSrnSize = Object.keys(mockStorage).length;
				expect(lclSrnSize).to.equal(1);
				expect(lclStr.getItem(parsedKey)).to.deep.equal(mockText);
			});

			it('should add number to localstorage using object as a key', () => {
				const parsedKey = JSON.stringify(mockObj);
				locker.add(mockObj, mockNum);
				expect(lclStr.setItem).to.have.been.called;
				const lclSrnSize = Object.keys(mockStorage).length;
				expect(lclSrnSize).to.equal(1);
				expect(lclStr.getItem(parsedKey)).to.deep.equal(mockNum);
			});

			it('should add object to localstorage using object as a key', () => {
				const parsedKey = JSON.stringify(mockObj);
				locker.add(mockObj, mockObj);
				expect(lclStr.setItem).to.have.been.called;
				const actualVal = lclStr.getItem(parsedKey);
				const lclSrnSize = Object.keys(mockStorage).length;
				expect(lclSrnSize).to.equal(1);
				expect(actualVal).to.deep.equal(JSON.stringify(mockObj));
			});

			it('should add a map to localstorage using object as a key', () => {
				const parsedKey = JSON.stringify(mockObj);
				locker.add(mockObj, mockMap);
				expect(lclStr.setItem).to.have.been.called;
				const actualVal = lclStr.getItem(parsedKey);
				const lclSrnSize = Object.keys(mockStorage).length;
				expect(lclSrnSize).to.equal(1);
				expect(actualVal).to.deep.equal(JSON.stringify(mockMap));
			});
		});
		describe('addSafely method', () => {
			it('should add a value if a key has not been yet used', () => {
				locker.addSafely(21, mockObj);
				expect(lclStr.setItem).to.have.been.called;
				expect(locker._parseToString).to.have.been.called;
				const parsedObj = JSON.parse(lclStr.getItem('21'));
				expect(parsedObj).to.deep.equal(mockObj);
			});
			it('should throw an error if a key has already been used', () => {
				lclStr.setItem('1', JSON.stringify(mockObj));
				expect(() => {
					locker.addSafely(1, mockObj);
				}).to.throw(ReferenceError, 'Provided key is already in use');
			});
		});
		describe('get method', () => {
			it('should return string from localStorage as string', () => {
				lclStr.setItem('1', mockText);
				const actualVal = locker.get(1);
				expect(lclStr.getItem).to.have.been.called;
				expect(actualVal).to.equal(mockText);
				expect(actualVal).to.be.a('string');
			});

			it('should return number from localStorage as number', () => {
				lclStr.setItem('1', mockNum);
				const actualVal = locker.get(1);
				expect(lclStr.getItem).to.have.been.called;
				expect(actualVal).to.equal(mockNum);
				expect(actualVal).to.be.a('number');
			});

			it('should return object from localStorage as object', () => {
				const mockObjStringified = JSON.stringify(mockObj);
				lclStr.setItem('1', mockObjStringified);
				const retrievedObj = locker.get(1);
				expect(lclStr.getItem).to.have.been.called;
				expect(retrievedObj).to.deep.equal(mockObjStringified);
				expect(retrievedObj).should.be.an('object');
			});

			it('should return map from localStorage as map', () => {
				const mockMapStringified = JSON.stringify(mockMap);
				lclStr.setItem('1', mockMapStringified);
				const retrievedObj = locker.get(1);
				expect(lclStr.getItem).to.have.been.called;
				expect(retrievedObj).to.deep.equal(mockMapStringified);
			});
		});
		describe('getMap method', () => {
			it('should returns an empty map if storage is empty', () => {
				const tempMap = locker.getMap();
				expect(tempMap).to.be.empty;
				expect(tempMap).to.be.a('map');
			});
			it('should returns a map with keys and values', () => {
				const actualMap = locker.getMap();
				const actualType = Object.prototype.toString.call(actualMap);
				expect(actualType).to.equal('[object Map]');
			});
		});
		describe('saveMap method', () => {
			it('should throw error if map was not passed', () => {
				expect(() => {
					locker.saveMap(mockObj);
				}).to.throw(TypeError, 'Must be of type Map');
			});

			it('should convert and save map into localstorage', () => {
				locker.saveMap(mockMap);
				const name = locker.get('name');
				const surname = locker.get('surname');
				expect(locker._parseToString).to.have.been.called;
				expect(name).to.deep.equal(mockMap.get('name'));
				expect(surname).to.deep.equal(mockMap.get('surname'));
			});
		});
		describe('keyExists method', () => {
			it('should return true if key exists in localStorage', () => {
				const mockObjStringified = JSON.stringify(mockObj);
				const mockMapStringified = JSON.stringify(mockMap);
				lclStr.setItem('1', mockObjStringified);
				lclStr.setItem('2', mockMapStringified);
				const doesExist = locker.keyExists(1);
				const doesExist2 = locker.keyExists('2');
				expect(lclStr.getItem).to.have.been.called;
				expect(locker._parseToString).to.have.been.called;
				expect(doesExist).to.be.true;
				expect(doesExist2).to.be.true;
			});

			it('should return false if key does not exist in localStorage', () => {
				const doesExist = locker.keyExists(1);
				const doesExist2 = locker.keyExists('1');
				expect(lclStr.getItem).to.have.been.called;
				expect(locker._parseToString).to.have.been.called;
				expect(doesExist).to.be.false;
				expect(doesExist2).to.be.false;
			});
		});
		describe('valueExists method', () => {
			it('should return true if value exists in localStorage', () => {
				const mapParsedToArr = Array.from(mockMap.entries());
				const mockMapStringified = JSON.stringify(mapParsedToArr);
				lclStr.setItem('1', mockMapStringified);
				lclStr.setItem('2', mockText);
				const doesExist = locker.valueExists(mockMap);
				const doesExist2 = locker.valueExists(mockText);
				expect(lclStr.getItem).to.have.been.called;
				expect(lclStr._parseToString).to.have.been.called;
				expect(doesExist).to.be.true;
				expect(doesExist2).to.be.true;
			});
		});
		describe('clear method', () => {
			let lclSrnSize;
			it('should empty the localstorage', () => {
				const mockObjStringified = JSON.stringify(mockObj);
				const mockMapStringified = JSON.stringify(mockMap);
				lclStr.setItem('1', mockObjStringified);
				lclStr.setItem('2', mockMapStringified);
				lclSrnSize = Object.keys(mockStorage).length;
				expect(lclSrnSize).not.to.be.empty;
				locker.clear();
				lclSrnSize = Object.keys(mockStorage).length;
				expect(lclStr.clear).to.have.been.called;
				expect(lclSrnSize).to.be.empty;
			});
		});
		describe('clear specified method', () => {
			let lclSrnSize;

			it('should throw error if array was not provided', () => {
				expect(() => {
					locker.clearSpecified();
				}).to.throw(TypeError, 'Array not provided');
			});

			it('should remove all values provided as an array with keys', () => {
				const keys = [1, 4, 6, '8'];
				lclStr.setItem('1', mockText);
				lclStr.setItem('4', mockText);
				lclStr.setItem('6', mockText);
				lclStr.setItem('8', mockText);
				lclSrnSize = Object.keys(mockStorage).length;
				expect(lclSrnSize).not.to.be.empty;
				locker.clearSpecified(keys);
				lclSrnSize = Object.keys(mockStorage).length;
				expect(locker._parseToString).to.have.been.called;
				expect(lclStr.removeItem).to.have.been.called;
				expect(lclSrnSize).to.be.empty;
			});
		});
		describe('size method', () => {
			it('should return size of the storage', () => {
			});
		});
	});

	describe('private API', () => {
		const locker = new Locker(window.localStorage);

		describe('_parseToString should return a string', () => {
			it('if a string was passed', () => {
				const mockString = 'Sample text';
				const actualVal = locker._parseToString(mockString);
				expect(mockString).to.equal(actualVal);
				expect(actualVal).to.be.a('string');
			});

			it('if a number was passed', () => {
				const mockNum = 123456789;
				const actualVal = locker._parseToString(mockNum);
				expect(JSON.stringify(mockNum)).to.equal(actualVal);
				expect(actualVal).to.be.a('string');
			});

			it('if an object was passed', () => {
				const mockObj = {
					'name': 'John',
					'surname': 'Test',
				};
				const actualVal = locker._parseToString(mockObj);
				expect(JSON.stringify(mockObj)).to.equal(actualVal);
				expect(actualVal).to.be.a('string');
			});

			it('if an array was passed', () => {
				const mockArr = [
					{'name': 'John'},
					{'surname': 'Test'},
				];
				const actualVal = locker._parseToString(mockArr);
				expect(JSON.stringify(mockArr)).to.equal(actualVal);
				expect(actualVal).to.be.a('string');
			});

			it('if a map was passed', () => {
				const mockMap = new Map([
					['name', 'John'],
					['surname', 'Test'],
				]);
				const actualVal = locker._parseToString(mockMap);
				expect(JSON.stringify(mockMap)).to.equal(actualVal);
				expect(actualVal).to.be.a('string');
			});
		});
	});
});
