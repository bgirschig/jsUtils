/**
 * Array utilities and shortcuts
 * @module array
 * @example
 * import { average } from 'jsUtils/array'
 * const a = average([4,4,6,6]); // 5
 */

/**
 * Rolls an array
 * @example
 * let a = [1,2,3,4];
 * roll(a);
 * console.log(a); // [2,3,4,1]
 * @param {Array<T>} array
 * @param {Boolean} forward if true, rolls array forward, else rolls backwards.
 * @return {Array<T>} The same array, rolled
 */
export function roll(array, forward=true) {
  if (forward == true) array.unshift(array.pop());
  else array.push(array.shift());

  return array;
}

/**
 * @param {Array<T>} array
 * @param {Number} offset Get n-th to last item (default=0)
 * @return {T} the last item of the array
 */
export function last(array, offset = 0) {
  return array[array.length-offset-1];
}

/**
 * @param {Array<Number>} array
 * @return {Number} the highest numeric value found in the array
 */
export function max(array) {
  let max = Number.NEGATIVE_INFINITY;
  for (let i=0; i < array.length; i++) {
    const item = array[i];
    if (typeof item !== 'number') continue;
    if (array[i] > max) max = item;
  }
  return max;
}

/**
 * @param {Array<Number>} array
 * @return {Number} the lowest numeric value found in the array
 */
export function min(array) {
  let min = Number.POSITIVE_INFINITY;
  for (let i=0; i < array.length; i++) {
    const item = array[i];
    if (typeof item !== 'number') continue;
    if (item < min) min = item;
  }
  return min;
}

/**
 * @param {Array<Number>} array
 * @param {Boolean} ignoreInvalid - if true, average is computed only over valid
 * values (ignoring null, undefined, and non numeric values. Default false)
 * @return {Number} the average of the numeric values found in the array
 */
export function average(array, ignoreInvalid=false) {
  let count = 0;
  let total = 0;
  for (let i=0; i < array.length; i++) {
    const item = array[i];
    if (typeof item !== 'number') continue;
    total+=array[i];
    count++;
  }
  if (ignoreInvalid) return total / count;
  else return total / array.length;
}

/**
 * @param {Array<Number>} array
 * @return {Number} the sum of the numeric values in the array
 */
export function sum(array) {
  let total = 0;
  for (let i=0; i<array.length; i++) {
    const item = array[i];
    if (typeof item !== 'number') continue;
    total+=item;
  }
  return total;
}

/**
 * @param {Array} array1
 * @param {Array} array2
 * @return {Boolean} True if array1 and array2 have the same values
 */
export function equals(array1, array2) {
  if (array1.length != array2.length) return false;
  return array1.every((val, idx) => val === array2[idx]);
}
