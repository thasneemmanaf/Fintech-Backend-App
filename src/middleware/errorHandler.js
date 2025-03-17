const logger = require("../config/logger");

// Central error handling middleware
const errorHandler = (err, req, res, next) => {
  logger.error(
    {
      err,
      req: {
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        headers: req.headers,
      },
    },
    "Request error"
  );

  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errorCode = err.code || "INTERNAL_ERROR";

  // Handle specific error types
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
    errorCode = "VALIDATION_ERROR";
  } else if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Authentication failed";
    errorCode = "AUTHENTICATION_ERROR";
  } else if (err.name === "ForbiddenError") {
    statusCode = 403;
    message = "Access denied";
    errorCode = "FORBIDDEN_ERROR";
  } else if (err.name === "NotFoundError") {
    statusCode = 404;
    message = "Resource not found";
    errorCode = "NOT_FOUND";
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: errorCode,
    },
  });
};

// Custom error classes
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Authentication failed") {
    super(message, 401, "AUTHENTICATION_ERROR");
    this.name = "UnauthorizedError";
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Access denied") {
    super(message, 403, "FORBIDDEN_ERROR");
    this.name = "ForbiddenError";
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

module.exports = {
  errorHandler,
  AppError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
