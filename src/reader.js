import fs from 'fs';
import path from 'path';

import parse from './parser';

const buildPath = file =>
  (path.isAbsolute(file) ? file : path.resolve(process.cwd(), file));

export default (file) => {
  const ext = path.extname(file);
  const buff = fs.readFileSync(buildPath(file), 'utf8');
  return parse(ext, buff);
};
