import renderplain from './plain';
import rendercomplex from './complex';
import renderjson from './json';

export default (ast, type) => {
  switch (type) {
    case 'plain':
      return renderplain(ast);
    case 'complex':
      return rendercomplex(ast);
    case 'json':
      return renderjson(ast);
    default:
      return new Error('Unsuportet diff format');
  }
};
