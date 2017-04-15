import _ from 'lodash';
import read from './reader';
import render from './renders';

const buildast = (firstBuff, secondBuff) => {
  const keys = _.union(Object.keys(firstBuff), Object.keys(secondBuff));

  const res = keys.map((key) => {
    const left = firstBuff[key];
    const right = secondBuff[key];

    if (!left) {
      const afterValue = _.isObject(right) ? buildast(right, right) : right;
      return { key, afterValue, type: 'added' };
    }
    if (!right) {
      const beforeValue = _.isObject(left) ? buildast(left, left) : left;
      return { key, beforeValue, type: 'removed' };
    }
    if (left === right) {
      const beforeValue = _.isObject(left) ? buildast(left, left) : left;
      return { key, beforeValue, afterValue: beforeValue, type: 'equal' };
    }
    if (_.isObject(right) && _.isObject(left)) {
      const beforeValue = buildast(left, right);
      return { key, beforeValue, type: 'partially changed' };
    }
    const before = _.isObject(left) ? buildast(left, left) : left;
    const after = _.isObject(right) ? buildast(right, right) : right;
    return { key, beforeValue: before, afterValue: after, type: 'updated' };
  });

  return res;
};

export default (before, after, type) =>
  render(buildast(read(before), read(after)), type);
