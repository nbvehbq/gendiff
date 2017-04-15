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

const resplain =
`Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: 'complex value'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with value: 'complex value'`;

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

  it('test plain output', () => {
    expect(compare(buildPath('one_complex.json'),
      buildPath('two_complex.json'), 'plain'))
    .toEqual(resplain);
  });
});
