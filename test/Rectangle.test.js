import Rectangle from '../src/Rectangle';

describe.skip('Rectangle', () => {
  test('basics', () => {
    const rect = new Rectangle();
    expect(rect).toBeDefined();
  });
});
