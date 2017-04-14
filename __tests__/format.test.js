import compare from '../src';

const buildPath = name => `./__tests__/__fixtures__/${name}`;

const res =
`Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: 'complex value'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with value: 'complex value'`;

describe('Test formats...', () => {
  it('test plain', () => {
    expect(compare(buildPath('one_complex.json'), buildPath('two_complex.json'), 'plain'))
    .toEqual(res);
  });
});
