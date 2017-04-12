import _ from 'lodash';
import path from 'path';

import getFileData from './reader';

const makePath = file =>
  (path.isAbsolute(file) ? file : path.resolve(process.cwd(), file));

export default (first, second) => {
  const ext = path.extname(first);
  if (ext !== path.extname(second)) {
    return new Error('Can`t compare files with different exstension');
  }

  const firstBuff = getFileData(ext, makePath(first));
  const secondBuff = getFileData(ext, makePath(second));

  const uniqueKeys = _.union(Object.keys(firstBuff), Object.keys(secondBuff));

  const res = uniqueKeys.reduce((acc, key) => {
    if (!firstBuff[key]) {
      return [...acc, `+ ${key}: ${secondBuff[key]}`];
    }
    if (!secondBuff[key]) {
      return [...acc, `- ${key}: ${firstBuff[key]}`];
    }
    if (firstBuff[key] === secondBuff[key]) {
      return [...acc, `  ${key}: ${firstBuff[key]}`];
    }
    const add = [...acc, `+ ${key}: ${secondBuff[key]}`];
    return [...add, `- ${key}: ${firstBuff[key]}`];
  }, []);

  return `{\n  ${res.join('\n  ')}\n}`;
};
