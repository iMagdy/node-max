const path = require('path');
const pkg = require('../package.json');


module.exports = {
  APP_NAME: pkg.name,

  LOG_LEVELS: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5,
  },

  FILE_ERROR_LOG_PATH: path.resolve(__dirname, '..', 'logs/error.log'),

  FILE_COMBINED_LOG_PATH: path.resolve(__dirname, '..', 'logs/combined.log'),

};
