const util = require('util');
const spawn = util.promisify(require('child_process').spawn);

const args = process.argv.splice(2);
const [command, options] = args;
const commandNotFoundMessage = `Command ${command || '_'} was not found\n`;

const run = async (cmd, opts, dir = './') => spawn(cmd, opts, { stdio: 'inherit', cwd: dir });

const scripts = {
  build: async () => {
    const { stdout, stderr } = await run('npx', ['nuxt', 'build'], './client');
    if (stderr) {
      process.stderr.write(stderr);
    } else {
      process.stdout.write(stdout);
    }
  },
  start: async () => {
    // process.stdout.write('Starting...');
    // const { stdout, stderr } = await run('npx', ['webpack', '--config', 'config/bundler.js']);
    // if (stderr) {
    //   process.stderr.write(stderr);
    // } else {
    //   process.stdout.write(stdout);
    // }
  },
};

const main = async () => {
  if (args.length === 0) {
    process.stderr.write(commandNotFoundMessage);
    process.exit(1);
  }
  await scripts[command]();
};

main();
