const transactionModel = require("../models/transactionModel");
const { successResponse, paginatedResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const logger = require("../config/logger");

/**
 * @desc    Get transactions for a company with pagination
 * @route   GET /api/companies/:companyId/transactions
 * @access  Private
 */
const getCompanyTransactions = asyncHandler(async (req, res) => {
  const { companyId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await transactionModel.getTransactionsByCompanyId(
    companyId,
    page,
    limit
  );

  res
    .status(200)
    .json(
      paginatedResponse(result.items, result.total, result.page, result.limit)
    );
});

module.exports = {
  getCompanyTransactions,
};
