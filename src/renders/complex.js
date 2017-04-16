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
  const res = ast.reduce((acc, item) => {
    const stub = '  '.repeat(1 + (2 * level));
    if (item.type === 'updated') {
      const add = [
        ...acc, `${stub}+ ${item.key}: ${_.isObject(item.afterValue) ?
        render(item.afterValue, level + 1) : item.afterValue}`];
      return [
        ...add, `${stub}- ${item.key}: ${_.isObject(item.beforeValue) ?
        render(item.beforeValue, level + 1) : item.beforeValue}`];
    }
    let value;
    if (item.type === 'partially changed') {
      value = item.children;
    } else {
      value = !item.beforeValue ? item.afterValue : item.beforeValue;
    }
    return [...acc, `${stub}${getSymbolByType(item.type)} ${item.key}: ${_.isObject(value) ?
      render(value, level + 1) : value}`];
  }, []);

  return `{\n${res.join('\n')}\n${'  '.repeat(level * 2)}}`;
};

export default render;
