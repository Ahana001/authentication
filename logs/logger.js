const winston = require('winston');
require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
    filename: 'logs/server-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const userLogger = function (route) {
    return winston.createLogger({
        transports: [
            transport],
        format: winston.format.printf(
            (info) => {
                let message = `${info.level.toUpperCase()} | ${[info.timestamp]} |  ${route}.log | ${info.message}`;
                return message;
            })
    });
}

module.exports = userLogger;