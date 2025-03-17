const companyModel = require("./companyModel");
const cardModel = require("./cardModel");
const invoiceModel = require("./invoiceModel");
const transactionModel = require("./transactionModel");
const logger = require("../config/logger");

/**
 * Get all dashboard data for a company
 * @param {string} companyId - Company ID
 * @returns {Promise<Object>} All dashboard data for the company
 */
const getDashboardData = async (companyId) => {
  try {
    // Get company details
    const company = await companyModel.getCompanyById(companyId);

    // Get company card
    const cards = await cardModel.getCardsByCompanyId(companyId);
    const card = cards.length > 0 ? cards[0] : null;

    // Get latest invoice
    const invoice = await invoiceModel.getInvoiceByCompanyId(companyId);

    // Get latest transactions (first page, limit 3)
    const transactionsData = await transactionModel.getTransactionsByCompanyId(
      companyId,
      1,
      3
    );

    // Return all data
    return {
      company,
      card,
      invoice,
      transactions: transactionsData.items,
      totalTransactions: transactionsData.total,
    };
  } catch (error) {
    logger.error(
      `Error fetching dashboard data for company ${companyId}:`,
      error
    );
    throw error;
  }
};

module.exports = {
  getDashboardData,
};
