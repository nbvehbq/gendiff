//  const render = ast => JSON.stringify(ast, null, '  ');

const render = (ast) => {
  const json = { difference: ast.map((item) => {
    const { type, key, beforeValue, afterValue, children } = item;
    if (children) {
      return { type, key, children: render(children) };
    }
    return { type, key, beforeValue, afterValue };
  }) };

  return JSON.stringify(json, null, '  ');
};

export default render;
