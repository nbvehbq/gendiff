import _ from 'lodash';
import read from './reader';
import render from './render';

const isObject = item => (typeof item === 'object');

const buildast = (firstBuff, secondBuff, deep = 0) => {
  const keys = _.union(Object.keys(firstBuff), Object.keys(secondBuff));

  const res = keys.reduce((acc, key) => {
    const left = firstBuff[key];
    const right = secondBuff[key];

    if (!left) {
      const value = isObject(right) ? buildast(right, right, deep + 1) : right;
      return [...acc, { key, value, status: '+', deep }];
    }
    if (!right) {
      const value = isObject(left) ? buildast(left, left, deep + 1) : left;
      return [...acc, { key, value, status: '-', deep }];
    }
    if (left === right) {
      const value = isObject(left) ? buildast(left, left, deep + 1) : left;
      return [...acc, { key, value, status: ' ', deep }];
    }
    if (isObject(right) && isObject(left)) {
      const value = buildast(left, right, deep + 1);
      return [...acc, { key, value, status: ' ', deep }];
    }
    const before = isObject(left) ? buildast(left, left, deep + 1) : left;
    const after = isObject(right) ? buildast(right, right, deep + 1) : right;
    return [...acc, { key, value: before, after, status: '=', deep }];
  }, []);

  return res;
};

export default (before, after, type) => render(buildast(read(before), read(after)), type);
