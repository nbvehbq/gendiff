import compare from '../src';

const setPath = name => `./__tests__/__fixtures__/${name}`;

const res =
`{
  + host: hexlet.ios
  - host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

describe('JSON tests', () => {
  test('Compare flat json', () => {
    expect(compare(setPath('one.json'), setPath('two.json')))
    .toEqual(res);
  });
});

describe('YAML tests', () => {
  test('Compare flat yaml', () => {
    expect(compare(setPath('one.yaml'), setPath('two.yaml')))
    .toEqual(res);
  });
});

describe('INI tests', () => {
  test('Compare flat ini', () => {
    expect(compare(setPath('one.ini'), setPath('two.ini')))
    .toEqual(res);
  });
});
