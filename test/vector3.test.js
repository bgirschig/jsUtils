import Vector3 from '../src/vector3';

describe('Vector3', () => {
  test('add', () => {
    const v = new Vector3(1, 0, 0);
    v.add(new Vector3(1, 1, 0));
    expect(v).toEqual({x: 2, y: 1, z: 0});
  });
  test('sub', () => {
    const v = new Vector3(1, 0, 0);
    v.sub(new Vector3(2, 1, 0));
    expect(v).toEqual({x: -1, y: -1, z: 0});
  });
  test('mult', () => {
    const v = new Vector3(1, 0, 4);
    v.mult(2);
    expect(v).toEqual({x: 2, y: 0, z: 8});
  });
  test('normalize', () => {
    const v = new Vector3(1, 0, 4);
    v.normalize();
    expect(v.mag).toBeCloseTo(1);
  });
  test('mag', () => {
    const v = new Vector3(1, 1, 0);
    expect(v.mag).toBeCloseTo(Math.sqrt(2));

    v.mag = 3;
    expect(v.mag).toBeCloseTo(3);
    expect(v.x).toBeCloseTo(Math.sqrt(9/2));
    expect(v.y).toBeCloseTo(Math.sqrt(9/2));
    expect(v.z).toBe(0);
  });
  test('constrain', () => {
    const v = new Vector3(2, 2, 0);
    v.constrain(0, 1);
    expect(v.x).toBeCloseTo(Math.sqrt(0.5));
    expect(v.y).toBeCloseTo(Math.sqrt(0.5));
    expect(v.z).toBe(0);
    expect(v.mag).toBeCloseTo(1);
  });
  test('copy', () => {
    const v1 = new Vector3(1, 4, 7);
    const v2 = v1.copy();
    v2.normalize();

    expect(v1).toEqual({x: 1, y: 4, z: 7});
    expect(v2.mag).toBeCloseTo(1);
  });
  test('chaining', () => {
    const v = new Vector3()
        .add(new Vector3(1, 1, 1))
        .sub(new Vector3(1, 0, 1))
        .mult(4);
    expect(v).toEqual({x: 0, y: 4, z: 0});
  });
});
