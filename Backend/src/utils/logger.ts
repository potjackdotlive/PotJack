import { createLogger, format, transports } from 'winston';

// Define log format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.splat(),
  format.json(),
);

// Create the logger instance
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  // defaultMeta: { service: 'blockchain-lottery-backend' },
  transports: [
    // Write all logs to the console
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp, ...metadata }) => {
          let msg = `${timestamp} [${level}]: ${message}`;
          if (Object.keys(metadata).length > 0 && metadata.service) {
            msg += ` ${JSON.stringify(metadata)}`;
          }
          return msg;
        }),
      ),
    }),
  ],
});

// Write all logs with the level 'error' and below to error.log
if (process.env.WRITE_ERRORS_TO_FILE === 'true') {
  logger.add(new transports.File({ filename: 'logs/error.log', level: 'error' }));
}
// Write all logs with level 'info' and below to combined.log
if (process.env.WRITE_LOGS_TO_FILE === 'true') {
  logger.add(new transports.File({ filename: 'logs/combined.log' }));
}

export default logger;
