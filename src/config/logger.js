const bunyan = require("bunyan");
const path = require("path");

// Create a bunyan logger
const logger = bunyan.createLogger({
  name: "my-fintech-api",
  streams: [
    {
      level: "info",
      stream: process.stdout, // Log to stdout
    },
  ],
  serializers: bunyan.stdSerializers,
});

module.exports = logger;
