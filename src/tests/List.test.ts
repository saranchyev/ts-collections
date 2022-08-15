import * as mocha from 'mocha';
import assert from 'assert/strict';

import {List} from '../lib/index';

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

                list.remove(5);
                assert.equal(list.length, 7);

                list.removeAt(0);
                assert.equal(list.length, 6);
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
                    assert.equal(target.getAt(0), 0);
                    assert.equal(target.getAt(1), 1);
                    assert.equal(target.getAt(2), 2);
                    assert.equal(target.getAt(3), 3);
                    assert.equal(target.getAt(4), 4);
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
                assert.equal(list.getAt(0), 0);
                assert.equal(list.getAt(1), 1);
                assert.equal(list.getAt(2), 2);
                assert.equal(list.length, 3);

                list.addRange([3,4,5]);
                assert.equal(list.getAt(3), 3);
                assert.equal(list.getAt(4), 4);
                assert.equal(list.getAt(5), 5);
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
                assert.equal(list.getAt(0), 0);
                assert.equal(list.getAt(1), 1);
                assert.equal(list.getAt(2), 2);
                assert.equal(list.getAt(3), 3);
                assert.equal(list.getAt(4), 4);
            });
            mocha.it('Accepts only values from zero to the length of the list, otherwise throws an error', () => {
                let list = new List<number>([0,1,2,3,4]);
                assert.throws(() => list.getAt(-55));
                assert.throws(() => list.getAt(-1));
                assert.throws(() => list.getAt(5));
                assert.throws(() => list.getAt(10));
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
                assert.throws(() => list.getRange(0, 6));
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

        mocha.describe('set(index, value)', () => {
            mocha.it('Sets a new value for the element at the selected position', () => {
                let list = new List([0,0,2,3,4,5]);
                list.set(1, 1);
                assert.equal(list.getAt(1), 1);
            });
            mocha.it('Throws an error if argument "list" less than 0 or greater than list length', () => {
                let list = new List([0,0,2,3,4,5]);
                assert.throws(() => list.set(-10, 1));
                assert.throws(() => list.set(-1, 1));
                assert.doesNotThrow(() => list.set(0, 1));
                assert.doesNotThrow(() => list.set(5, 1));
                assert.throws(() => list.set(6, 1));
                assert.throws(() => list.set(10, 1));
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
                assert.equal(list.getAt(0), 0);
                assert.equal(list.getAt(3), 999);
                assert.equal(list.getAt(5), 4);

                list.insert(5, 777);
                assert.equal(list.getAt(5), 777);
                assert.equal(list.getAt(6), 4);
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

        mocha.describe('remove(item)', () => {
            mocha.it('Removes the first element found in the list', () => {
                let list = new List([1,0,2,0,3]);

                list.remove(0);
                assert.equal(list.getAt(0), 1);
                assert.equal(list.getAt(1), 2);
                assert.equal(list.getAt(2), 0);
                assert.equal(list.getAt(3), 3);
                assert.throws(() => list.getAt(4));

                list.remove(0);
                assert.equal(list.getAt(0), 1);
                assert.equal(list.getAt(1), 2);
                assert.equal(list.getAt(2), 3);
                assert.throws(() => list.getAt(3));
            });
            mocha.it('Returns true if the deletion was successful, false otherwise', () => {
                let list = new List([1,2,3]);
                assert.equal(list.remove(0), false);
                assert.equal(list.remove(1), true);
                assert.equal(list.remove(2), true);
                assert.equal(list.remove(3), true);
                assert.equal(list.remove(4), false);
                assert.equal(list.remove(5), false);
            });
        });

        mocha.describe('removeAt(index)', () => {
            mocha.it('Removes an element by its index', () => {
                let list = new List([0,1,2,3,4]);
                assert.doesNotThrow(() => list.removeAt(0)); // [1,2,3,4]
                assert.doesNotThrow(() => list.removeAt(2)); // [1,2,4]
                assert.doesNotThrow(() => list.removeAt(2)); // [1,2]
                assert.equal(list.getAt(0), 1);
                assert.equal(list.getAt(1), 2);
                assert.equal(list.length, 2);
            });
            mocha.it('Throws an error if the "index" argument is less than 0 or greater than the index of the last item', () => {
                let list = new List([0,1,2,3,4]);
                assert.throws(() => list.removeAt(-10));
                assert.throws(() => list.removeAt(-1));
                assert.doesNotThrow(() => list.removeAt(0));
                assert.doesNotThrow(() => list.removeAt(list.length - 1));
                assert.throws(() => list.removeAt(list.length));
                assert.throws(() => list.removeAt(10));
            })
        });

        mocha.describe('removeRange(indexFrom, count)', () => {
            mocha.it('Removes selected range from list', () => {
                let list = new List([0,1,2,3,4,5,6,7,8,9]);

                list.removeRange(0, 1); // [1,2,3,4,5,6,7,8,9]
                assert.equal(list.getAt(0), 1);
                assert.equal(list.length, 9);

                list.removeRange(3, 3); // [1,2,3,7,8,9]
                assert.equal(list.getAt(2), 3);
                assert.equal(list.getAt(3), 7);
                assert.equal(list.length, 6);

                list.removeRange(4, 2); // [1,2,3,7]
                assert.equal(list.length, 4);
            });
            mocha.it('Throws an error if argument "indexFrom" is less than 0 or greater than the length of the list', () => {
                let list = new List([0,1,2,3,4]);
                assert.throws(() => list.removeRange(-1, 1));
                assert.throws(() => list.removeRange(-5, 1));
                assert.throws(() => list.removeRange(6, 1));
                assert.throws(() => list.removeRange(10, 1));
            });
            mocha.it('Throws an error if argument "count" less than 1', () => {
                let list = new List([0,1,2,3,4]);
                assert.throws(() => list.removeRange(0, 0));
                assert.throws(() => list.removeRange(1, -1));
                assert.throws(() => list.removeRange(2, -24));
            });
            mocha.it('Throws an error if the selected range is outside the range of the list', () => {
                let list = new List([0,1,2,3,4]);
                assert.throws(() => list.removeRange(0, 10));
                assert.throws(() => list.removeRange(2, 4));
                assert.throws(() => list.removeRange(4, 2));
                assert.doesNotThrow(() => list.removeRange(4, 1)); // [0, 1, 2, 3]
                assert.doesNotThrow(() => list.removeRange(2, 2)); // [0, 1]
            })
        });

        mocha.describe('removeAll(match)', () => {
            mocha.it('Removes all the elements that match the conditions defined by the specified predicate', () => {
                let list = new List([1,1,1,0,1,1,1,0,0,0,1,0,0,1,1]);
                list.removeAll(item => item === 1);
                assert.equal(list.length, 6);
                assert.equal(list.getAt(0), 0);
                assert.equal(list.getAt(1), 0);
                assert.equal(list.getAt(2), 0);
                assert.equal(list.getAt(3), 0);
                assert.equal(list.getAt(4), 0);
                assert.equal(list.getAt(5), 0);
            });
        });

        mocha.describe('clear()', () => {
            mocha.it('Removes all items in a list', () => {
                let list = new List([1,2,3,4,5]);
                list.clear();
                assert.equal(list.length, 0);
                assert.throws(() => list.getAt(0));
            });
        });

        mocha.describe('has(item)', () => {
            mocha.it('Returns true if item exists into list', () => {
                let x = [1,2,3,4,5];
                let list = new List(x);
                assert.equal(list.has(1), true);
                assert.equal(list.has(2), true);
                assert.equal(list.has(3), true);
                assert.equal(list.has(4), true);
                assert.equal(list.has(5), true);
            });
            mocha.it('Returns false if item does not exists into list', () => {
                let list = new List();
                assert.equal(list.has(1), false);
                assert.equal(list.has(2), false);
                assert.equal(list.has(3), false);
                assert.equal(list.has(4), false);
                assert.equal(list.has(5), false);
            })
        });

        mocha.describe('indexOf(item [, fromIndex])', () => {
            //                           0  1  2  3  4  5  6  7  8  9  10  11  12  13  14  15  16
            let list = new List([ 5, 8, 6, 5, 2, 8, 4, 5, 8, 5, 2,  4,  5,  8,  5,  5,  4]);
            mocha.it('Returns the index of the first occurrence of an element', () => {
                assert.equal(list.indexOf(8), 1);
                assert.equal(list.indexOf(2), 4);
                assert.equal(list.indexOf(4), 6);
            });
            mocha.it('If the "fromIndex" argument is passed, then the search starts from this index', () => {
                assert.equal(list.indexOf(8, 3), 5);
                assert.equal(list.indexOf(2, 8), 10);
                assert.equal(list.indexOf(4, 7), 11);
            });
            mocha.it('Returns -1 if item not found', () => {
                assert.equal(list.indexOf(0), -1);
                assert.equal(list.indexOf(1), -1);
                assert.equal(list.indexOf(9), -1);
                assert.equal(list.indexOf(8, list.length-1), -1);
                assert.equal(list.indexOf(2, list.length-1), -1);
                assert.equal(list.indexOf(6, list.length-1), -1);
            });
            mocha.it('Throws an error if argument "fromIndex" less than 0 or greater than the length of the list', () => {
                assert.throws(() => list.indexOf(8, -10));
                assert.throws(() => list.indexOf(8, -1));
                assert.doesNotThrow(() => list.indexOf(8, 0));
                assert.doesNotThrow(() => list.indexOf(8, list.length-1));
                assert.throws(() => list.indexOf(8, list.length));
                assert.throws(() => list.indexOf(8, list.length + 10));
            });
        });

        mocha.describe('lastIndexOf(item [, fromIndex])', () => {
            //                           0  1  2  3  4  5  6  7  8  9  10  11  12  13  14  15  16
            let list = new List([ 5, 8, 6, 5, 2, 8, 4, 5, 8, 5, 2,  4,  5,  8,  5,  5,  4]);
            mocha.it('Returns the index of the first occurrence of the element. The search is made from the end of the list', () => {
                assert.equal(list.lastIndexOf(8), 13);
                assert.equal(list.lastIndexOf(2), 10);
                assert.equal(list.lastIndexOf(4), 16);
            });
            mocha.it('If the "fromIndex" argument is passed, then the search starts from this index', () => {
                assert.equal(list.lastIndexOf(8, 12), 8);
                assert.equal(list.lastIndexOf(2, 8), 4);
                assert.equal(list.lastIndexOf(4, 14), 11);
            });
            mocha.it('Returns -1 if item not found', () => {
                assert.equal(list.lastIndexOf(0), -1);
                assert.equal(list.lastIndexOf(1), -1);
                assert.equal(list.lastIndexOf(9), -1);
                assert.equal(list.lastIndexOf(8, 0), -1);
                assert.equal(list.lastIndexOf(2, 0), -1);
                assert.equal(list.lastIndexOf(6, 0), -1);
            });
            mocha.it('Throws an error if argument "fromIndex" less than 0 or greater than the length of the list', () => {
                assert.throws(() => list.lastIndexOf(8, -10));
                assert.throws(() => list.lastIndexOf(8, -1));
                assert.doesNotThrow(() => list.lastIndexOf(8, 0));
                assert.doesNotThrow(() => list.lastIndexOf(8, list.length-1));
                assert.throws(() => list.lastIndexOf(8, list.length));
                assert.throws(() => list.lastIndexOf(8, list.length + 10));
            });
        });

        mocha.describe('find((item: T) => bool)', () => {
            mocha.it('Returns the first found element in the list that matches the condition', () => {
                let list = new List([
                    "foo",
                    "bar",
                    "baz",
                    "foofoo",
                    "foobar",
                    "foobaz"
                ]);
                assert.equal(list.find(i => /..o/.test(i)), "foo");
                assert.equal(list.find(i => /.a./.test(i)), "bar");
                assert.equal(list.find(i => /.az/.test(i)), "baz");
                assert.equal(list.find(i => /.+b.+/.test(i)), "foobar");
                assert.equal(list.find(i => /.+b.+z/.test(i)), "foobaz");
            });
            mocha.it('Returns undefined if the element is not in the list', () => {
                let list = new List([1,2,3,4,5]);
                assert.equal(list.find(i => i === 0), undefined);
                assert.equal(list.find(i => i === 9), undefined);
                assert.equal(list.find(i => i * 5 === 999), undefined);
            });
        });

        mocha.describe('findLast((item: T) => bool)', () => {
            mocha.it('Returns the first found element in the list that matches the condition', () => {
                let list = new List([
                    "foo",
                    "bar",
                    "baz",
                    "foofoo",
                    "foobar",
                    "foobaz"
                ]);
                assert.equal(list.findLast(i => /..o/.test(i)), "foobaz", "1");
                assert.equal(list.findLast(i => /.ar/.test(i)), "foobar", "2");
                assert.equal(list.findLast(i => /.az/.test(i)), "foobaz", "3");
                assert.equal(list.findLast(i => /.+b.+/.test(i)), "foobaz", "4");
                assert.equal(list.findLast(i => /.+b.+z/.test(i)), "foobaz", "5");
            });
            mocha.it('Returns undefined if the element is not in the list', () => {
                let list = new List([1,2,3,4,5]);
                assert.equal(list.find(i => i === 0), undefined);
                assert.equal(list.find(i => i === 9), undefined);
                assert.equal(list.find(i => i * 5 === 999), undefined);
            });
        });

        mocha.describe('filter((item: T) => bool)', () => {
            mocha.it('Returns a new list of all found elements that satisfy the condition', () => {
                let list: List<string> = new List([
                    "foo",
                    "bar",
                    "baz",
                    "foofoo",
                    "foobar",
                    "foobaz"
                ]);
                let filteredList: List<string> = list.filter(i => /..o/.test(i));
                assert.equal(filteredList.getAt(0), "foo", "1");
                assert.equal(filteredList.getAt(1), "foofoo", "2");
                assert.equal(filteredList.getAt(2), "foobar", "3");
                assert.equal(filteredList.getAt(3), "foobaz", "4");
            });
        });
    });
});
