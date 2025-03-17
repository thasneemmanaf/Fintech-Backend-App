const http = require("http");
const app = require("./app");
const logger = require("./config/logger");

// Uncaught exception handler
process.on("uncaughtException", (err) => {
  logger.fatal("Uncaught Exception:", err);
  process.exit(1);
});

// Get port from environment or use default
const PORT = process.env.PORT || 3001;

// Create HTTP server
const server = http.createServer(app);

// Start the server
const startServer = async () => {
  try {
    // Start listening on the specified port
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(
        `API documentation available at http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    logger.fatal("Server startup failed:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.fatal("Unhandled Rejection:", err);
  // Close server and exit process
  server.close(() => process.exit(1));
});

// Start the server
startServer();

// Handle graceful shutdown
const shutdownGracefully = async () => {
  logger.info("Shutting down gracefully...");

  // Close the server
  server.close(async () => {
    logger.info("HTTP server closed");

    try {
      logger.info("Shutdown complete");
      process.exit(0);
    } catch (error) {
      logger.error("Error during shutdown:", error);
      process.exit(1);
    }
  });
};

// Listen for termination signals
process.on("SIGTERM", shutdownGracefully);
process.on("SIGINT", shutdownGracefully);
