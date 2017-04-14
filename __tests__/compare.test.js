import compare from '../src';

const buildPath = name => `./__tests__/__fixtures__/${name}`;

const res =
`{
  + host: hexlet.ios
  - host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

describe('Compare tests...', () => {
  it('Compare flat json', () => {
    expect(compare(buildPath('one.json'), buildPath('two.json')))
    .toEqual(res);
  });
  
  it('Compare flat yaml', () => {
    expect(compare(buildPath('one.yaml'), buildPath('two.yaml')))
    .toEqual(res);
  });
  
  it('Compare flat ini', () => {
    expect(compare(buildPath('one.ini'), buildPath('two.ini')))
    .toEqual(res);
  });
});

