const fs = require("fs").promises;
const path = require("path");
const logger = require("../config/logger");

// Path to the JSON data file
const transactionsFilePath = path.join(__dirname, "../data/transactions.json");

/**
 * Get transactions for a company with pagination
 * @param {string} companyId - Company ID
 * @param {number} page - Page number (starts at 1)
 * @param {number} limit - Number of items per page
 * @returns {Promise<Object>} Paginated transactions data
 */
const getTransactionsByCompanyId = async (companyId, page = 1, limit = 10) => {
  try {
    const data = await fs.readFile(transactionsFilePath, "utf8");
    const transactions = JSON.parse(data);

    // Filter transactions by company ID
    const companyTransactions = transactions
      .filter((transaction) => transaction.companyId === companyId)
      .sort(
        (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
      );

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Return paginated data
    return {
      items: companyTransactions.slice(startIndex, endIndex),
      total: companyTransactions.length,
      page: page,
      limit: limit,
      totalPages: Math.ceil(companyTransactions.length / limit),
    };
  } catch (error) {
    logger.error(
      `Error fetching transactions for company ${companyId}:`,
      error
    );
    throw error;
  }
};

module.exports = {
  getTransactionsByCompanyId,
};
