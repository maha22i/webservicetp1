import { format, LoggerOptions, transports } from 'winston';

const colorizer = format.colorize();
const formatProcess = format((info) => {
  info.process = colorizer.colorize(info.level, `[Nest] ${process.pid}`);
  return info;
});
const formatLevel = format((info) => {
  info.level = colorizer.colorize(info.level, info.level?.toLocaleUpperCase());
  return info;
});
const formatContext = format((info) => {
  info.context = colorizer.colorize(
    'warn',
    info.context ? `[${info.context}]` : ''
  );
  return info;
});
const formatMs = format((info) => {
  info.ms = colorizer.colorize('warn', info.ms);
  return info;
});
const formatMessage = format((info) => {
  info.message = colorizer.colorize(info.level, info.message);
  return info;
});

export const winstonConfig: LoggerOptions = {
  level: 'debug',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      filename: 'rest-api.error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'rest-api.debug.log',
    }),
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'DD/MM/YYYY, HH:mm:ss' }),
        format.ms(),
        formatProcess(),
        formatContext(),
        formatMs(),
        formatMessage(),
        formatLevel(),
        format.printf(
          (info) =>
            `${info.process}  - ${info.timestamp}     ${info.level} ${info.context} ${info.message} ${info.ms}`
        )
      ),
    }),
  ],
};
