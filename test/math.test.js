import * as mathUtil from '../src/math';

describe('constrain', () => {
  test('basics', () => {
    expect(mathUtil.constrain(0.5, 0, 1)).toBe(0.5);
    expect(mathUtil.constrain(0, 0, 1)).toBe(0);
    expect(mathUtil.constrain(1, 0, 1)).toBe(1);
    expect(mathUtil.constrain(4, 0, 1)).toBe(1);
    expect(mathUtil.constrain(-4, 0, 1)).toBe(0);
  });
  test('throws', () => {
    expect(()=>{
      mathUtil.constrain(-4, 1, 0);
    }).toThrow();

    expect(()=>{
      mathUtil.constrain('something', 0, 1);
    }).toThrow();
  });
});
