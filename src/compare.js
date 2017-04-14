import _ from 'lodash';
import read from './reader';

const isObject = item => (typeof item === 'object');

const fillAst = (firstBuff, secondBuff, deep = 0) => {
  const keys = _.union(Object.keys(firstBuff), Object.keys(secondBuff));

  const res = keys.reduce((acc, key) => {
    const left = firstBuff[key];
    const right = secondBuff[key];

    if (!left) {
      const value = isObject(right) ? fillAst(right, right, deep + 1) : right;
      return [...acc, { key, value, status: '+', deep }];
    }
    if (!right) {
      const value = isObject(left) ? fillAst(left, left, deep + 1) : left;
      return [...acc, { key, value, status: '-', deep }];
    }
    if (left === right) {
      const value = isObject(left) ? fillAst(left, left, deep + 1) : left;
      return [...acc, { key, value, status: ' ', deep }];
    }
    if (isObject(right) && isObject(left)) {
      const value = fillAst(left, right, deep + 1);
      return [...acc, { key, value, status: ' ', deep }];
    }
    let value = isObject(right) ? fillAst(right, right, deep + 1) : right;
    const add = [...acc, { key, value, status: '+', deep }];
    value = isObject(left) ? fillAst(left, left, deep + 1) : left;
    return [...add, { key, value, status: '-', deep }];
  }, []);

  return res;
};

const printDiff = (ast) => {
  const isComplex = item => (item instanceof Array);
  let deep = 0;
  const res = ast.map((item) => {
    const stub = '  '.repeat(1 + (2 * item.deep));
    deep = item.deep;
    return `${stub}${item.status} ${item.key}: ${isComplex(item.value) ?
      printDiff(item.value) : item.value}`;
  });

  return `{\n${res.join('\n')}\n${'  '.repeat(deep * 2)}}`;
};

export default (before, after) => printDiff(fillAst(read(before), read(after)));
