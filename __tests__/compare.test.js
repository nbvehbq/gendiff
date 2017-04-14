import compare from '../src';

const buildPath = name => `./__tests__/__fixtures__/${name}`;

const res =
`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

const rescomplex =
`{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;
describe('Compare tests...', () => {
  it('Compare flat json', () => {
    expect(compare(buildPath('one.json'), buildPath('two.json'), 'complex'))
    .toEqual(res);
  });

  it('Compare flat yaml', () => {
    expect(compare(buildPath('one.yaml'), buildPath('two.yaml'), 'complex'))
    .toEqual(res);
  });

  it('Compare flat ini', () => {
    expect(compare(buildPath('one.ini'), buildPath('two.ini'), 'complex'))
    .toEqual(res);
  });

  it('Compare complex json', () => {
    expect(compare(buildPath('one_complex.json'), buildPath('two_complex.json'), 'complex'))
    .toEqual(rescomplex);
  });

  it('Compare complex yaml', () => {
    expect(compare(buildPath('one_complex.yaml'), buildPath('two_complex.json'), 'complex'))
    .toEqual(rescomplex);
  });

  it('Compare complex ini', () => {
    expect(compare(buildPath('one_complex.ini'), buildPath('two_complex.json'), 'complex'))
    .toEqual(rescomplex);
  });
});
