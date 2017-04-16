import _ from 'lodash';

const renderValue = value => (_.isObject(value) ? 'complex value' : value);

const render = (ast, parent = '') => {
  const res = ast.map((item) => {
    switch (item.type) {
      case 'updated':
        return `Property '${parent}${item.key}' was updated. From '${
          renderValue(item.beforeValue)}' to '${renderValue(item.afterValue)}'`;
      case 'added':
        return `Property '${parent}${item.key}' was added with value: '${renderValue(item.afterValue)}'`;
      case 'removed':
        return `Property '${parent}${item.key}' was removed`;
      case 'equal':
        return '';
      case 'partially changed':
        return render(item.children, `${item.key}.`);
      default:
        return 'Unsuportet type';
    }
  });

  return res.filter(item => !!item).join('\n');
};

export default render;
