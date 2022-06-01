import * as mocha from 'mocha';
import assert from 'assert/strict';

import {List} from '../index';

mocha.describe('List', () => {
    mocha.describe('Properties', () => {
        mocha.describe('length', () => {
            mocha.it('Is readonly property', () => {
                let list = new List<number>();
                assert.throws(() => list.length = 5);
            });

            mocha.it('Initially equal to 0 if nothing is passed to the constructor', () => {
                let list = new List<number>();
                assert.equal(list.length, 0);
            });

            mocha.it('Initially equal to 5 if an array of 5 elements is passed to the constructor', () => {
                let list = new List<number>([1,2,3,4,5]);
                assert.equal(list.length, 5);
            });

            mocha.it('Increases as new elements are added', () => {
                let list = new List<number>([1,2,3,4,5]);
                list.addRange([6,7,8]);
                assert.equal(list.length, 8);

                list.add(9);
                assert.equal(list.length, 9);

                list.insert(0, 0);
                assert.equal(list.length, 10);

                list.insertRange(0, [-3, -2, -1]);
                assert.equal(list.length, 13);
            });

            mocha.it('Decreases when elements are removed', () => {
                let list = new List<number>([1,2,3,4,5,6,7,8,9,10]);
                list.removeRange(0, 2);
                assert.equal(list.length, 8);

                list.remove(0);
                assert.equal(list.length, 7);
            });
        });
    });

    mocha.describe('Methods', () => {
        mocha.describe('constructor(iterable)', () => {
            mocha.it('Creates an empty instance of the class if called without parameters', () => {
                let list = new List<number>();
                assert.equal(list.length, 0, 'length should be equal to 0');
            });

            mocha.it('Creates a non-empty class instance if passed an iterable object', () => {
                let test = <T>(target: List<T>): void => {
                    assert.equal(target.length, 5);
                    assert.equal(target.get(0), 0);
                    assert.equal(target.get(1), 1);
                    assert.equal(target.get(2), 2);
                    assert.equal(target.get(3), 3);
                    assert.equal(target.get(4), 4);
                };

                let list1 = new List<number>([0,1,2,3,4]);
                test<number>(list1);

                let set = new Set<number>([0,1,2,3,4]);
                let list2 = new List<number>(set);
                test<number>(list2);
            });
        });

        mocha.describe('add(item)', () => {
            mocha.it('Can add a new item', () => {
                let list = new List<number>();
                assert.equal(list.length, 0);
                list.add(555);
                assert.equal(list.length, 1);
            });

            mocha.it('Сan add multiple identical elements', () => {
                let list = new List<string>();
                assert.equal(list.length, 0);
                list.add('hello');
                list.add('hello');
                list.add('hello');
                assert.equal(list.length, 3);
            });
        });

        mocha.describe('addRange(iterable)', () => {
            mocha.it('New elements are added to the end of the list', () => {
                let list = new List();
                list.addRange([0,1,2]);
                assert.equal(list.get(0), 0);
                assert.equal(list.get(1), 1);
                assert.equal(list.get(2), 2);
                assert.equal(list.length, 3);

                list.addRange([3,4,5]);
                assert.equal(list.get(3), 3);
                assert.equal(list.get(4), 4);
                assert.equal(list.get(5), 5);
                assert.equal(list.length, 6);
            });

            mocha.it('Accepts any iterable objects', () => {
                let list = new List<string>();

                assert.doesNotThrow(() => list.addRange(['1','2','3']));
                assert.equal(list.length, 3);

                let set = new Set<string>(['4','5','6']);
                assert.doesNotThrow(() => list.addRange(set));
                assert.equal(list.length, 6);

                assert.doesNotThrow(() => list.addRange(set.keys()));
                assert.equal(list.length, 9);

                assert.doesNotThrow(() => list.addRange("qwe"));

                assert.throws(() => list.addRange(123));
                assert.throws(() => list.addRange(true));
                assert.throws(() => list.addRange(undefined));
                assert.throws(() => list.addRange(null));
                assert.throws(() => list.addRange({length:10}));
            });

            mocha.it('Throws an error if argument is not iterable', () => {
                let list = new List<number>();
                assert.throws(() => list.addRange(123));
                assert.throws(() => list.addRange(true));
                assert.throws(() => list.addRange({length:10}));
                assert.throws(() => list.addRange({a: 5, b: 10}));
                assert.throws(() => list.addRange(() => 1+1));
            })
        });

        mocha.describe('get(index)', () => {
            mocha.it('Returns an element by index', () => {
                let list = new List<number>([0,1,2,3,4]);
                assert.equal(list.get(0), 0);
                assert.equal(list.get(1), 1);
                assert.equal(list.get(2), 2);
                assert.equal(list.get(3), 3);
                assert.equal(list.get(4), 4);
            });

            mocha.it('Accepts only values from zero to the length of the list, otherwise throws an error', () => {
                let list = new List<number>([0,1,2,3,4]);
                assert.throws(() => list.get(-55));
                assert.throws(() => list.get(-1));
                assert.throws(() => list.get(5));
                assert.throws(() => list.get(10));
            });
        });

        mocha.describe('getRange(indexFrom, count)', () => {
            mocha.it('Argument "indexFrom" accept only numbers from zero to the length of the list', () => {
                let list = new List<number>([0,1,2,3,4]);
                assert.throws(() => list.getRange(-1, 10));
                assert.throws(() => list.getRange(10, 10));
                assert.doesNotThrow(() => list.getRange(0, 5));
                assert.doesNotThrow(() => list.getRange(2, 2));
            });

            mocha.it('Argument "count" cannot be less then 1', () => {
                let list = new List<number>([0,1,2,3,4]);
                assert.throws(() => list.getRange(0, 0));
                assert.doesNotThrow(() => list.getRange(0, 1));
            });

            mocha.it('Throws an exception if the specified range is outside of the list', () => {
                let list = new List<number>([0,1,2,3,4]);
                assert.throws(() => list.getRange(4, 5));
                assert.throws(() => list.getRange(3, 10));
                assert.doesNotThrow(() => list.getRange(0, 5));
                assert.doesNotThrow(() => list.getRange(2, 2));
                assert.doesNotThrow(() => list.getRange(4, 1));
            });

            mocha.it('Returns a new list instance with the elements of the selected range', () => {
                let range;
                let list = new List<number>([0,1,2,3,4]);

                range = list.getRange(0, 3);
                assert.equal(range instanceof List, true);
                assert.equal(range.get(0), 0);
                assert.equal(range.get(1), 1);
                assert.equal(range.get(2), 2);

                range = list.getRange(2, 2);
                assert.equal(range instanceof List, true);
                assert.equal(range.get(0), 2);
                assert.equal(range.get(1), 3);
            });
        });

        mocha.describe('insert(position, item)', () => {
            mocha.it('Argument "position" accept only number from 0 to the length of the list', () => {
                let list = new List<number>([0,1,2,3,4]);
                assert.throws(() => list.insert(-1, 999));
                assert.throws(() => list.insert(10, 999));
                assert.doesNotThrow(() => list.insert(2, 999));
            });

            mocha.it('Inserts a new item at the selected position', () => {
                let list = new List<number>([0,1,2,3,4]);
                list.insert(3, 999);
                assert.equal(list.get(0), 0);
                assert.equal(list.get(3), 999);
                assert.equal(list.get(5), 4);

                list.insert(5, 777);
                assert.equal(list.get(5), 777);
                assert.equal(list.get(6), 4);
            });
        });

        mocha.describe('insertRange(position, items)', () => {
            mocha.it('Argument "position" accept only number from 0 to the length of the list', () => {
                let list = new List<number>([0,1,2,3,4]);
                assert.throws(() => list.insertRange(-1, [5,6,7]));
                assert.throws(() => list.insertRange(10, [5,6,7]));
                assert.doesNotThrow(() => list.insertRange(4, [5,6,7]));
            });

            mocha.it('Argument "items" accepts any iterable objects', () => {
                let list = new List<string>(['0','1','2']);

                assert.doesNotThrow(() => list.insertRange(0, ['1','2','3']));
                assert.equal(list.length, 6);

                let set = new Set<string>(['4','5','6']);
                assert.doesNotThrow(() => list.insertRange(0, set));
                assert.equal(list.length, 9);

                assert.doesNotThrow(() => list.insertRange(0, set.keys()));
                assert.equal(list.length, 12);

                assert.doesNotThrow(() => list.insertRange(0, "qwe"));

                assert.throws(() => list.insertRange(0, 123));
                assert.throws(() => list.insertRange(0, true));
                assert.throws(() => list.insertRange(0, undefined));
                assert.throws(() => list.insertRange(0, null));
                assert.throws(() => list.insertRange(0, {length:10}));
            });
        });
    });
});
