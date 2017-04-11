import fs from 'fs';
import path from 'path';

export default (ext, file) => {
  const fullPath = path.isAbsolute(file)
    ? file : path.resolve(process.cwd(), file);
  const buff = fs.readFileSync(fullPath, 'utf8');

  switch (ext) {
    case 'json': return JSON.parse(buff);
    default: return {};
  }
};
