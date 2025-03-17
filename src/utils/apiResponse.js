/**
 * Format success response
 * @param {any} data - Response data
 * @param {number} statusCode - HTTP status code
 * @returns {Object} Formatted response object
 */
const successResponse = (data, statusCode = 200) => {
  return {
    success: true,
    data,
    statusCode,
  };
};

/**
 * Format error response
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @param {number} statusCode - HTTP status code
 * @returns {Object} Formatted error response object
 */
const errorResponse = (message, code = "ERROR", statusCode = 400) => {
  return {
    success: false,
    error: {
      message,
      code,
    },
    statusCode,
  };
};

/**
 * Format paginated response
 * @param {Array} items - Array of items
 * @param {number} total - Total count of items
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @returns {Object} Formatted paginated response
 */
const paginatedResponse = (items, total, page, limit) => {
  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    data: {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    },
  };
};

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse,
};
