import _ from 'lodash';

const render = (ast, parent = '') => {
  const res = ast.map((item) => {
    switch (item.type) {
      case 'updated':
        return `Property '${parent}${item.key}' was updated. From '${
          _.isObject(item.beforeValue) ? 'complex value' : item.beforeValue}' to '${
          _.isObject(item.afterValue) ? 'complex value' : item.afterValue}'`;
      case 'added':
        return `Property '${parent}${item.key}' was added with value: '${
          _.isObject(item.afterValue) ? 'complex value' : item.afterValue}'`;
      case 'removed':
        return `Property '${parent}${item.key}' was removed`;
      case 'equal':
        return _.isObject(item.beforeValue) ?
          render(item.beforeValue, `${item.key}.`) : '';
      case 'partially changed':
        return _.isObject(item.beforeValue) ?
          render(item.beforeValue, `${item.key}.`) : '';
      default:
        return 'Unsuportet type';
    }
  });

  return res.filter(item => !!item).join('\n');
};

export default render;
