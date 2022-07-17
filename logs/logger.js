const winston = require('winston');
require('winston-mongodb');

const userLogger = function (route) {
    return winston.createLogger({
        transports: [
            winston.add(new winston.transports.MongoDB({
                collection: "userlogs",
                db: process.env.MONGO_URI,
                options: { useNewUrlParser: true, useUnifiedTopology: true },
                expireAfterSeconds: 60 * 60 * 24
            }))],
        format:
            winston.format.printf(
                (info) => {
                    let message = `${info.level.toUpperCase()} | ${[info.timestamp]} |  ${route}.log | ${info.message}`;
                    return message;
                })
    });
}

module.exports = userLogger;