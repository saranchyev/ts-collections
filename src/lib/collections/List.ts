/*
 *-------------------
 * C# List
 *-------------------
 * Properties:
 * [v] Count -> length
 *
 * Methods:
 * [v] * Add(item) - Добавляет объект в конец коллекции List<T>.
 * [v] * AddRange(collection) - Добавляет элементы указанной коллекции в конец списка List<T>.
 * [ ] * AsReadOnly() - Возвращает для текущей коллекции оболочку ReadOnlyCollection<T>, доступную только для чтения.
 * [ ]   BinarySearch(...) - Использует алгоритм двоичного поиска для нахождения определенного элемента в отсортированном списке List<T> или в его части.
 * [v] * Clear() - Удаляет из коллекции List<T> все элементы.
 * [v] * Contains(item) - Определяет, входит ли элемент в коллекцию List<T>.
 * [ ]   ConvertAll(converter) - Преобразует элементы текущего списка List<T> в другой тип и возвращает список преобразованных элементов.
 * [ ]   CopyTo(...) - Копирует список List<T> или его часть в массив.
 * [ ]   EnsureCapacity(capacity) - Гарантирует, что емкость этого списка является по крайней мере указанной capacity.
 * [ ] * Exists(predicate) - Определяет, содержит ли List<T> элементы, удовлетворяющие условиям указанного предиката.
 * [ ] * Find(predicate) - Выполняет поиск элемента, удовлетворяющего условиям указанного предиката, и возвращает первое найденное вхождение в пределах всего списка List<T>.
 * [ ] * FindAll(predicate) - Извлекает все элементы, удовлетворяющие условиям указанного предиката.
 * [ ] * FindIndex(from, to, predicate) - Выполняет поиск элемента, удовлетворяющего условиям указанного предиката, и возвращает отсчитываемый от нуля индекс первого найденного вхождения в пределах всего списка List<T> или его части.
 * [ ]   FindLast(predicate) - Выполняет поиск элемента, удовлетворяющего условиям указанного предиката, и возвращает последнее найденное вхождение в пределах всего списка List<T>.
 * [ ] * FindLastIndex(from, to, predicate) - Выполняет поиск элемента, удовлетворяющего условиям указанного предиката, и возвращает последнее найденное вхождение в пределах всего списка List<T>.
 * [ ] * ForEach(Action<T>) - Выполняет указанное действие с каждым элементом списка List<T>.
 * [v] * GetRange(from, to) - Создает неполную копию диапазона элементов исходного списка List<T>.
 * [ ] * IndexOf(item, from, to) - Возвращает отсчитываемый от нуля индекс первого вхождения значения в списке List<T> или в его части.
 * [v] * Insert(position, item) - Вставляет элемент в коллекцию List<T> по указанному индексу.
 * [v] * InsertRange(position, items) - Вставляет элементы коллекции в список List<T> в позиции с указанным индексом.
 * [ ] * LastIndexOf(item, from, to) - Возвращает отсчитываемый от нуля индекс последнего вхождения значения в списке List<T> или в его части.
 * [v] * Remove(item) - Удаляет первое вхождение указанного объекта из коллекции List<T>.
 * [v] * RemoveAll(predicate) - Удаляет все элементы, удовлетворяющие условиям указанного предиката.
 * [v] * RemoveAt(index) - Удаляет элемент списка List<T> с указанным индексом.
 * [v] * RemoveRange(index, count) - Удаляет диапазон элементов из списка List<T>.
 * [ ] * Reverse() - Изменяет порядок элементов в списке List<T> или в его части на обратный.
 * [ ] * Sort(comparer, [from, to]) - Сортирует элементы или части элементов в списке List<T> с использованием заданного значения или значения по умолчанию IComparer<T> реализации или предоставленного делегата Comparison<T> для сравнения элементов списка.
 * [ ] * ToArray() - Копирует элементы списка List<T> в новый массив.
 * [ ]   TrimExcess() - Задает емкость, равную фактическому числу элементов в списке List<T>, если это число меньше порогового значения.
 * [ ] * TrueForAll - Определяет, все ли элементы списка List<T> удовлетворяют условиям указанного предиката.
 *
 *
 *
 *-------------------
 * JS Array
 *-------------------
 * Properties:
 * [v] * length
 *
 * Methods:
 * [ ] * at(index) - принимает индекс и возвращает элемент массива с данным индексом. В качестве аргумента метод принимает положительные и отрицательные числа. При отрицательном значении отсчёт происходит с конца массива.
 * [ ]   concat(...arrays) - возвращает новый массив, состоящий из массива, на котором он был вызван, соединённого с другими массивами и/или значениями, переданными в качестве аргументов
 * [ ]   copyWithin(target, start, end) - копирует последовательность элементов массива внутри него в позицию, начинающуюся по индексу target
 * [ ] * entries - возвращает новый объект итератора массива Array Iterator, содержащий пары ключ / значение для каждого индекса в массиве.
 * [ ] * every(predicate) - проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции. Возвращает true при пустом массиве
 * [ ] * fill(value, [start, [end]]) - заполняет все элементы массива от начального до конечного индексов одним значением.
 * [ ] * filter(predicate) - создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции
 * [ ] * find(predicate) - возвращает значение первого найденного в массиве элемента, которое удовлетворяет условию переданному в callback функции.  В противном случае возвращается undefined.
 * [ ] * findIndex(predicate) - возвращает индекс в массиве, если элемент удовлетворяет условию проверяющей функции. В противном случае возвращается -1
 * [ ]   flat(depth) - возвращает новый массив, в котором все элементы вложенных подмассивов были рекурсивно "подняты" на указанный уровень depth.
 * [ ]   flatMap(predicate) - сначала применяет функцию к каждому элементу, а затем преобразует полученный результат в плоскую структуру и помещает в новый массив
 * [ ] * forEach(predicate) - выполняет указанную функцию один раз для каждого элемента в массиве
 * [v] * from(iterable[, forEachPredicate]) - создаёт новый экземпляр Array из массивоподобного или итерируемого объекта.
 * [ ]   groupBy(predicate) - возвращает объект, в котором элементы массива сгруппиованны согласно разультату работы предиката
 * [ ]   groupByToMap
 * [v] * includes(item[, fromIndex]) - определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false
 * [ ] * indexOf(item[, fromIndex]) - возвращает первый индекс, по которому данный элемент может быть найден в массиве или -1, если такого индекса нет.
 * [ ]   isArray(obj) - возвращает true, если объект является массивом и false, если он массивом не является.
 * [ ] * join(glue) - объединяет все элементы массива (или массивоподобного объекта) в строку
 * [ ] * keys() - возвращает новый итератор массива Array Iterator, содержащий ключи каждого индекса в массиве.
 * [ ] * lastIndexOf(item, fromIndex) - озвращает последний индекс, по которому данный элемент может быть найден в массиве или -1, если такого индекса нет.
 * [ ] * map(predicate) - создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
 * [ ]   of(...items) - создаёт новый экземпляр массива Array из произвольного числа аргументов, вне зависимости от числа или типа аргумента
 * [ ]   pop
 * [ ]   push
 * [ ] * reduce
 * [ ] * reduceRight
 * [ ] * reverse
 * [ ]   shift
 * [ ]   slice
 * [ ] * some
 * [ ] * sort
 * [ ]   splice
 * [ ]   toLocaleString
 * [ ]   toSource
 * [ ] * toString
 * [ ]   unshift
 * [ ] * values
 * [ ] * @@iterator
 * [ ]   @@toPrimitive
 */


import {Comparer, Predicate} from "../ArrowTypes";

export default class List<T> implements Iterable<T>
{
    private items: T[];


    /**
     * Number of items in the list
     */
    public get length (): number {
        return this.items.length;
    }


    /**
     * Create new list
     * @constructor
     * @param {Iterable} [iterable] An iterable from which to take items and add them to the list
     */
    public constructor(iterable: Iterable<T> = []) {
        this.items = [...iterable];
    }


    /**
     * Add an item to the end of the list
     * @param item
     */
    public add(item: T): void {
        this.items.push(item);
    }


    /**
     * Add multiple items to the end of a listAdd multiple items to the end of a list
     * @param {Iterable} items
     * @throws RangeError - If `items` is not iterable
     */
    public addRange(items: Iterable<T>): void {
        if (!items[Symbol.iterator]) {
            throw new RangeError('Argument "items" must be iterable');
        }
        this.items.push(...items);
    }


    /**
     * Get element by index
     * @param {number} index
     * @throws RangeError - If `index` less than 0 or greater than the length of the list
     */
    public getAt(index: number): T {
        if (index < 0 || index >= this.length) {
            throw new RangeError('Argument "index" cannot be less than 0 or greater than the length of the list');
        }
        return this.items[index];
    }


    /**
     * Returns a new List instance with the elements of the selected range
     * @param indexFrom
     * @param count
     * @throws RangeError - If `indexFrom` less than 0 or greater than the length of the list.
     * @throws RangeError - If `count` less than 1 or greater than the length of the list
     * @throws RangeError - If one or more items in the selected range are outside the bounds of the list
     */
    public getRange(indexFrom: number, count: number): List<T> {
        if (indexFrom < 0 || indexFrom >= this.length) {
            throw new RangeError('Argument "indexFrom" cannot be less than 0 or greater than the length of the list');
        }
        if (count < 1) {
            throw new RangeError('Argument "count" cannot be less than 1');
        }
        if (this.length < indexFrom + count) {
            throw new RangeError('The selected range is outside the range of the list');
        }
        let range: T[] = this.items.slice(indexFrom, indexFrom + count);
        return new List<T>(range);
    }


    /**
     * Sets a new value for the element at the selected position
     * @param index
     * @param value
     * @throws RangeError - If `index` less than 0 or greater than the length of the list.
     */
    public set(index: number, value: T): void {
        if (index < 0 || index >= this.length) {
            throw new RangeError('Argument "indexFrom" cannot be less than 0 or greater than the length of the list');
        }
        this.items[index] = value;
    }


    /**
     * Inserts an item at the selected position
     * @param position
     * @param item
     * @throws RangeError - If `position` less than 0 or greater than the length of the list
     */
    public insert(position: number, item: T): void {
        if (position < 0 || position >= this.items.length) {
            throw new RangeError('Argument "position" cannot be less then 0 ang greater then the length of the list');
        }
        this.items.splice(position, 0, item);
    }


    /**
     * Inserts a range of items at the selected position
     * @param position
     * @param items
     * @throws RangeError - If `position` less than 0 or greater than the length of the list
     * @throws RangeError - If `items` is not iterable
     */
    public insertRange(position: number, items: Iterable<T>): void {
        if (position < 0 || position >= this.items.length) {
            throw new RangeError('Argument "position" cannot be less than 0 ang greater than the length of the list');
        }
        if (!items[Symbol.iterator]) {
            throw new RangeError('Argument "items" must be iterable');
        }
        this.items.splice(position, 0, ...items);
    }


    /**
     * Removes the first occurrence of an element in a list.
     * @param item
     * @return boolean Returns true if the deletion was successful, false otherwise
     */
    public remove(item: T): boolean {
        let index: number = this.items.indexOf(item);
        if (index < 0) {
            return false;
        }

        let deletedItem: T[] = [];
        deletedItem = this.items.splice(index, 1);
        return deletedItem.length === 1;
    }


    /**
     * Removes an element by its index
     * @param index
     * @throws RangeError- If `index` less than 0 or greater than the length of the list
     */
    public removeAt(index: number): void {
        if (index < 0 || index >= this.items.length) {
            throw new RangeError('Argument "index" cannot be less than 0 ang greater than the length of the list');
        }
        this.items.splice(index, 1);
    }


    /**
     * Removes a range of elements from a list
     * @param {number} indexFrom
     * @param {number} count
     * @throws RangeError - If `indexFrom` less than 0 or greater than the length of the list
     * @throws RangeError - If `count` less than 1
     * @throws RangeError - If one or more items in the selected range are outside the bounds of the list
     */
    public removeRange(indexFrom: number, count: number): void {
        if (indexFrom < 0 || indexFrom >= this.items.length) {
            throw new RangeError('Argument "indexFrom" cannot be less than 0 ang greater than the length of the list');
        }
        if (count < 1) {
            throw new RangeError('Argument "count" cannot be less than 1');
        }
        if (this.length < indexFrom + count) {
            throw new RangeError('One or more items in the selected range are outside the bounds of the list');
        }
        this.items.splice(indexFrom, count);
    }


    /**
     * Removes all the elements that match the conditions defined by the specified predicate
     * @param match
     */
    public removeAll(match: Predicate<T>): void {
        for (let i: number = 0; i < this.items.length; i++) {
            if (match(this.items[i])) {
                this.removeAt(i);
                i--;
            }
        }
    }


    /**
     * Removes all items in a list
     */
    public clear(): void {
        this.items = [];
    }


    /**
     * Checks if an element exists in a list
     * @param item
     * @return boolean
     */
    public has(item: T): boolean {
        return this.items.includes(item);
    }


    /**
     * Returns the zero-based index of the first occurrence of a value in the list or in a portion of it
     * @param item
     * @param fromIndex
     * @return number - The first index of the element in the list; -1 if not found
     */
    public indexOf(item: T, fromIndex: number | undefined = undefined): number {
        if (typeof fromIndex === 'number'
            && (fromIndex < 0 || fromIndex >= this.items.length)
        ) {
            throw new RangeError('Argument "fromIndex" cannot be less than 0 ang greater than the length of the list');
        }
        return this.items.indexOf(item, fromIndex);
    }


    /**
     * Returns the zero-based index of the last occurrence of a value in the list or in a portion of it
     * @param item
     * @param fromIndex
     * @return number - The last index of the element in the list; -1 if not found
     * @throws RangeError - If argument "fromIndex" less than 0 or greater than the length of the list
     */
    public lastIndexOf(item: T, fromIndex: number | undefined = undefined): number {
        if (typeof fromIndex === 'number'
            && (fromIndex < 0 || fromIndex >= this.items.length)
        ) {
            throw new RangeError('Argument "fromIndex" cannot be less than 0 ang greater than the length of the list');
        }
        if (fromIndex === undefined) {
            fromIndex = this.items.length - 1;
        }
        return this.items.lastIndexOf(item, fromIndex);
    }


    /**
     * Returns the first found element in the list that matches the condition.
     * @param match
     * @return T|undefined - The first found element in the list or undefined
     */
    public find(match: Predicate<T>): T | undefined {
        return this.items.find(match);
    }


    /**
     Returns the first found element in the list that matches the condition.
     * The search is made from the end of the list.
     * @param match
     * @return T|undefined - The first found element in the list or undefined
     */
    public findLast(match: Predicate<T>): T | undefined {
        return this.items.reverse().find(match);
    }


    /**
     * Returns a new list of all found elements that satisfy the condition
     * @param match
     * @return List<T> - New list with founded items
     */
    public filter(match: Predicate<T>): List<T> {
        let matchedItems: List<T> = new List<T>();
        for (let i: number = 0; i < this.items.length; i++) {
            if (match(this.items[i])) {
                matchedItems.add(this.items[i]);
            }
        }
        return matchedItems;
    }


    public sort(comparator: Comparer<T>): void {

    }


    public forEach(): void {

    }


    public map<R>(fn: (item: T) => R): List<R> {

    }


    public toArray(): T[] {
        return [...this.items];
    }


    public [Symbol.iterator](): Iterator<T> {
        return undefined;
    }
}





