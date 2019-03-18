const winston = require('winston');
const { LOG_LEVELS, FILE_ERROR_LOG_PATH, FILE_COMBINED_LOG_PATH } = require('./constants');

const {
  combine,
  timestamp,
  printf,
} = winston.format;

const logFormat = printf(data => `${data.timestamp} [${data.service}] ${data.level}: ${data.message}`);

const logger = winston.createLogger({
  level: LOG_LEVELS.info,
  format: combine(
    timestamp(),
    logFormat,
  ),
  defaultMeta: {
    environment: process.env.NODE_ENV,
  },
  transports: [
    new winston.transports.Console({ level: 'verbose' }),
    new winston.transports.File({ filename: FILE_ERROR_LOG_PATH, level: 'error' }),
    new winston.transports.File({ filename: FILE_COMBINED_LOG_PATH, level: 'verbose' }),
  ],
});

module.exports = ({ level = 'info', message = '', ...meta }) => logger.log({
  level,
  message: message.toString('utf8'),
  ...meta,
});
