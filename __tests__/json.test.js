import compare from '../src/lib/compare';

test('json', () => {
  expect(compare('./__tests__/assets/one.json', './__tests__/assets/two.json'))
  .toBe(`{
  + host: hexlet.ios
  - host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`);
});
