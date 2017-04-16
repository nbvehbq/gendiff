import _ from 'lodash';

const getSymbolByType = (type) => {
  const symbolmap = new Map([
    ['added', '+'],
    ['removed', '-'],
    ['equal', ' '],
    ['partially changed', ' '],
  ],
  );
  return symbolmap.get(type);
};

const render = (ast, level = 0) => {
  const renderValue = value => (_.isObject(value) ? render(value, level + 1) : value);

  const res = ast.map((item) => {
    const stub = '  '.repeat(1 + (2 * level));

    if (item.type === 'updated') {
      return `${stub}+ ${item.key}: ${renderValue(item.afterValue)}\n${
        stub}- ${item.key}: ${renderValue(item.beforeValue)}`;
    }
    if (item.type === 'added') {
      return `${stub}${getSymbolByType(item.type)} ${item.key}: ${
        renderValue(item.afterValue)}`;
    }
    if (item.type === 'removed' || item.type === 'equal') {
      return `${stub}${getSymbolByType(item.type)} ${item.key}: ${
        renderValue(item.beforeValue)}`;
    }
    if (item.type === 'partially changed') {
      return `${stub}${getSymbolByType(item.type)} ${item.key}: ${
        renderValue(item.children)}`;
    }
    return 'Unsuported type';
  });

  return `{\n${res.join('\n')}\n${'  '.repeat(level * 2)}}`;
};

export default render;
