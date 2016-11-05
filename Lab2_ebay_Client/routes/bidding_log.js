var winston = require('winston');

var bidding_logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: './bidding_log.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: './exceptions.log', json: false })
  ],
  exitOnError: false
});


module.exports = bidding_logger;
