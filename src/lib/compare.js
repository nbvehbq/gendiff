import getFileData from './reader';
import _ from 'lodash';

const getExtension = (file) => file.split('.').pop();

export default (first, second) => {
  const ext = getExtension(first);
  if (ext !== getExtension(second)) {
    return new Error('Can`t compare files with different exstension');
  }
 
  const firstBuff = getFileData(ext, first);
  const secondBuff = getFileData(ext, second);
  const unique = _.union(Object.keys(firstBuff), Object.keys(secondBuff));
  
  const res = unique.reduce((acc, key) => {
    if (!firstBuff[key]) {
	  return [...acc, `+ ${key}: ${secondBuff[key]}`];
	}
	if (!secondBuff[key]) {
	  return [...acc, `- ${key}: ${firstBuff[key]}`];
	}
	if (firstBuff[key] === secondBuff[key]) {
	  return [...acc, `  ${key}: ${firstBuff[key]}`]
	} 
	acc = [...acc, `+ ${key}: ${secondBuff[key]}`];
	return [...acc, `- ${key}: ${firstBuff[key]}`];
  }, []);
  
  return `{\n  ${res.join('\n  ')}\n}`;
};
