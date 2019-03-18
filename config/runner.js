const { spawn } = require('child_process');
const pkg = require('../package.json');
const logger = require('../shared/logger');

// Get incoming args (skip first 2 entries)
const args = process.argv.splice(2);

// Assign args to const command
const [command] = args;

// Environment mode:
const IS_PROD = process.env.NODE_ENV === 'production';

/**
 * Utility method to execute shell commands
 * @param {Object} instructions
 * @param {String} instructions.cmd Command to run
 * @param {Array} instructions.opts Command options
 * @param {String} instructions.cwd Path from which the command should run
 * @param {String} instructions.stdio STDIO config, one of inherit (default) | pipe | ignore
 * @returns {Object} Spawned process
 */
const run = async ({
  cmd,
  opts = [],
  cwd = '.',
  stdio = 'inherit',
}) => spawn(cmd, opts, { ...(stdio ? { stdio } : {}), cwd });

/**
 * Available scripts dictionary
 */
const scripts = {

  /**
   * @async build
   * @description Used to build front-end, back-end, and API.
   * This will basically run both nuxt build, and adonis'
   * then puts the outputs in the root build dir
   * @returns void
   */
  build: async () => {
    // greeting
    logger({
      level: 'verbose',
      service: 'front-end-client',
      message: `Building front-end for ${pkg.name}`,
    });

    // spawn the nuxt builder
    const nuxtBuilder = await run({
      cmd: 'npx',
      opts: ['nuxt', 'build'],
      cwd: './client',
      stdio: false,
    });

    // On stdout listener
    nuxtBuilder.stdout.on('data', data => logger({
      level: 'info',
      service: 'front-end-client',
      message: data,
    }));

    // On stderr listener
    nuxtBuilder.stderr.on('data', data => logger({
      level: 'error',
      service: 'front-end-client',
      message: data,
    }));
  },
  start: async () => {
    // greeting
    logger({ level: 'verbose', message: `Running ${pkg.name} ...` });

    // spawn the nuxt builder
    const nuxtRunnerProcess = run({
      cmd: 'npx',
      opts: IS_PROD ? ['nuxt', 'start'] : ['nuxt'],
      cwd: './client',
      stdio: [0, 'pipe', 'pipe'],
    });

    // spawn the nuxt builder
    const apiRunnerProcess = run({
      cmd: 'npx',
      opts: IS_PROD ? ['node', 'server.js'] : ['adonis', 'serve', '--dev', '--watch', '.'],
      cwd: './server',
      stdio: [0, 'pipe', 'pipe'],
    });

    const [nuxtRunner, apiRunner] = await Promise.all([nuxtRunnerProcess, apiRunnerProcess]);

    nuxtRunner.stdout.on('data', data => logger({
      level: 'verbose',
      service: 'front-end-client',
      message: data,
    }));

    nuxtRunner.stderr.on('data', data => logger({
      level: 'error',
      service: 'front-end-client',
      message: data,
    }));

    apiRunner.stdout.on('data', data => logger({
      level: 'verbose',
      service: 'backend-api',
      message: data,
    }));

    apiRunner.stderr.on('data', data => logger({
      level: 'error',
      service: 'backend-api',
      message: data,
    }));
  },
};

const main = async () => {
  if (args.length === 0) {
    process.stderr.write(`[NOT_FOUND_ERROR]: The command ${command || 'you used'} was not found.\n`);
    process.exit(1);
  }
  await scripts[command]();
};

main();
