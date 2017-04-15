import yaml from 'js-yaml';
import ini from 'ini';

export default (ext, buff) => {
  switch (ext) {
    case '.json': return JSON.parse(buff);
    case '.yaml': return yaml.load(buff);
    case '.ini': return ini.parse(buff);
    default: return new Error('Unsuportet file format');
  }
};
