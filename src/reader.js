import fs from 'fs';

import yaml from 'js-yaml';
import ini from 'ini';

export default (ext, file) => {
  const buff = fs.readFileSync(file, 'utf8');

  switch (ext) {
    case '.json': return JSON.parse(buff);
    case '.yaml': return yaml.load(buff);
    case '.ini': return ini.parse(buff);
    default: return {};
  }
};
