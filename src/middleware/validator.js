/* validation middleware using AJV
Since we are currently using JSON files for data storage and application is primarily focused on GET requests, 
we don't need validation against request payload, just added it here to use it if we need this in future */
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const { ValidationError } = require("./errorHandler");
const logger = require("../config/logger");

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validate = (schema) => {
  const validateFn = ajv.compile(schema);

  return (req, res, next) => {
    const valid = validateFn(req.body);

    if (!valid) {
      const errors = validateFn.errors
        .map((e) => `${e.instancePath} ${e.message}`)
        .join("; ");

      logger.warn("Validation error", { error: errors, body: req.body });
      return next(new ValidationError(errors));
    }

    next();
  };
};

module.exports = { validate };
