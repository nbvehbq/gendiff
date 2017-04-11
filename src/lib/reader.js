import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (ext, file) => {
  const fullPath = path.isAbsolute(file)
    ? file : path.resolve(process.cwd(), file);
  const buff = fs.readFileSync(fullPath, 'utf8');

  switch (ext) {
    case 'json': return JSON.parse(buff);
    case 'yaml': return yaml.load(buff);
    case 'ini': return ini.parse(buff);
    default: return {};
  }
};
