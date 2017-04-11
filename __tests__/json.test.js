import compare from '../src/lib/compare';

const path = name => `./__tests__/assets/${name}`;

test('Compare json', () => {
  expect(compare(path('one.json'), path('two.json')))
  .toEqual(`{
  + host: hexlet.ios
  - host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`);
});
