const fs = require("fs").promises;
const path = require("path");
const logger = require("../config/logger");
const { NotFoundError } = require("../middleware/errorHandler");

// Path to the JSON data file
const invoicesFilePath = path.join(__dirname, "../data/invoices.json");

/**
 * Get invoice by company ID
 * @param {string} companyId - Company ID
 * @returns {Promise<Object>} Invoice object
 */
const getInvoiceByCompanyId = async (companyId) => {
  try {
    const data = await fs.readFile(invoicesFilePath, "utf8");
    const invoices = JSON.parse(data);

    // Find the most recent pending invoice for the company
    const companyInvoices = invoices
      .filter(
        (invoice) =>
          invoice.companyId === companyId && invoice.status === "pending"
      )
      .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

    if (companyInvoices.length === 0) {
      return null; // No pending invoices
    }

    return companyInvoices[0];
  } catch (error) {
    logger.error(`Error fetching invoice for company ${companyId}:`, error);
    throw error;
  }
};

module.exports = {
  getInvoiceByCompanyId,
};
