import program from 'commander';
import compare from './compare';

export default () => {
  program
    .version('0.0.1')
    .description('Compares two configuration file and show a difference')
    .option('-f, --format [type]', 'Output format', 'plain')
    .arguments('<first_config> <second_config>')
    .action((first, second) => {
      const diff = compare(first, second, program.type);
      console.log(diff);
    });
  program.parse(process.argv);
};
