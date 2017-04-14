const isComplex = item => (item instanceof Array);

const rendercomplex = (ast) => {
  let deep = 0;
  const res = ast.reduce((acc, item) => {
    const stub = '  '.repeat(1 + (2 * item.deep));
    deep = item.deep;
    if (item.status === '=') {
      const add = [
        ...acc, `${stub}+ ${item.key}: ${isComplex(item.after) ?
        rendercomplex(item.after) : item.after}`];
      return [
        ...add, `${stub}- ${item.key}: ${isComplex(item.value) ?
        rendercomplex(item.value) : item.value}`];
    }
    return [...acc, `${stub}${item.status} ${item.key}: ${isComplex(item.value) ?
      rendercomplex(item.value) : item.value}`];
  }, []);

  return `{\n${res.join('\n')}\n${'  '.repeat(deep * 2)}}`;
};

const renderplain = (ast, parent = '') => {
  const res = ast.map((item) => {
    switch (item.status) {
      case '=':
        return `Property '${parent}${item.key}' was updated. From '${
          isComplex(item.value) ? 'complex value' : item.value}' to '${
          isComplex(item.after) ? 'complex value' : item.after}'`;
      case '+':
        return `Property '${parent}${item.key}' was added with value: '${
          isComplex(item.value) ? 'complex value' : item.value}'`;
      case '-':
        return `Property '${parent}${item.key}' was removed`;
      case ' ':
        return isComplex(item.value) ?
          renderplain(item.value, `${item.key}.`) : undefined;
      default:
        return undefined;
    }
  });

  return res.filter(item => !!item).join('\n');
};

const render = (ast, type) => {
  switch (type) {
    case 'plain':
      return renderplain(ast);
    case 'complex':
      return rendercomplex(ast);
    default:
      return new Error('Unsuportet diff format');
  }
};

export default render;
