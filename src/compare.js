import _ from 'lodash';
import read from './reader';

const fillAst = (firstBuff, secondBuff) => {
  const keys = _.union(Object.keys(firstBuff), Object.keys(secondBuff));

  const res = keys.reduce((acc, key) => {
    if (!firstBuff[key]) {
      return [...acc, { key, value: secondBuff[key], status: '+' }];
    }
    if (!secondBuff[key]) {
      return [...acc, { key, value: firstBuff[key], status: '-' }];
    }
    if (firstBuff[key] === secondBuff[key]) {
      return [...acc, { key, value: firstBuff[key], status: ' ' }];
    }
    const add = [...acc, { key, value: secondBuff[key], status: '+' }];
    return [...add, { key, value: firstBuff[key], status: '-' }];
  }, []);

  return res;
};

const printDiff = (ast) => {
  const res = ast.map(item => `${item.status} ${item.key}: ${item.value}`);
  return `{\n  ${res.join('\n  ')}\n}`;
};

export default (before, after) => printDiff(fillAst(read(before), read(after)));
