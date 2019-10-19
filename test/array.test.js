import {average, last, max, min, roll, sum} from '../src/array';

describe('average', () => {
  test('basics', () => {
    expect(average([3, 100, 2, 1])).toBe(26.5);
  });
  test('skips invalid', () => {
    expect(average([3, 100, 2, 1, null], true)).toBe(26.5);
    expect(average([3, 100, 3, null])).toBe(26.5);
  });
  test('handles string', () => {
    expect(average([3, '100', 2, 1], true)).toBe(2);
    expect(average([3, '100', 2, 1], false)).toBe(1.5);
  });
});

describe('last', () => {
  test('basics', () => {
    expect(last([4, 100, 2])).toBe(2);
    expect(last([4, -100, null, undefined])).toBe(undefined);
  });
  test('offset', () => {
    expect(last([4, 6, 100, 8], 1)).toBe(100);
  });
});

describe('max', () => {
  test('basics', () => {
    expect(max([4, 100, 2])).toBe(100);
    expect(max([4, -100, 2])).toBe(4);
  });
  test('handles string', () => {
    expect(max([4, '0', 2])).toBe(4);
  });
  test('handles non numeric', () => {
    expect(max([4, -100, null, undefined, 2])).toBe(4);
  });
  test('handles infinity', () => {
    expect(max([4, Number.POSITIVE_INFINITY, 2])).toBe(Number.POSITIVE_INFINITY);
  });
});

describe('min', () => {
  test('basics', () => {
    expect(min([4, 100, 2])).toBe(2);
    expect(min([4, -100, 2])).toBe(-100);
  });
  test('handles string', () => {
    expect(min([4, '0', 2])).toBe(2);
  });
  test('handles non numeric', () => {
    expect(min([4, -100, null, undefined, 2])).toBe(-100);
  });
  test('handles infinity', () => {
    expect(min([4, Number.NEGATIVE_INFINITY, 2])).toBe(Number.NEGATIVE_INFINITY);
  });
});

describe('roll', () => {
  test('forward', () => {
    const array = [1, 2, 3, 4, 5];
    roll(array);
    expect(array).toEqual([5, 1, 2, 3, 4]);
  });
  test('backward', () => {
    const array = [1, 2, 3, 4, 5];
    roll(array, false);
    expect(array).toEqual([2, 3, 4, 5, 1]);
  });
});

describe('sum', () => {
  test('basics', () => {
    expect(sum([1, 2, 3])).toBe(6);
  });
  test('skips invalid', () => {
    expect(sum([1, 2, 3, null])).toBe(6);
    expect(sum([1, 2, 3, undefined])).toBe(6);
  });
  test('skips string', () => {
    expect(sum([1, 2, 3, '100'])).toBe(6);
  });
});
