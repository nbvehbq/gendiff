import program from 'commander';

program
  .version('0.0.1')
  .description('Compares two configuration file and show a difference')
  .option('-f, --format', 'Output format');

program.arguments('<first_config>');
program.arguments('<second_config>');

export default () => { program.parse(process.argv); };
