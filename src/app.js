const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
const logger = require("./config/logger");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

// Load environment variables
require("dotenv").config();

// Create Express app
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Root route handler
app.get("/", (req, res) => {
  res.send("Fintech API is running. Access API documentation at /api-docs");
});

// Swagger documentation setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fintech API",
      version: "1.0.0",
      description: "API documentation for My Fintech application",
    },
    servers: [
      {
        url: "/api",
        description: "API Server",
      },
    ],
  },
  apis: ["./src/routes/**/*.js"], // Path to the API routes with JSDoc comments
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mount API routes
app.use("/api", routes);

// For any other route, potentially serve the React app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
  });
}

// Global error handling middleware
app.use(errorHandler);

// Handle 404 routes
app.use("*", (req, res) => {
  logger.warn(`Route not found: ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    error: {
      message: "Resource not found",
      code: "NOT_FOUND",
    },
  });
});

module.exports = app;
