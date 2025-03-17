const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const logger = require("../config/logger");
const { NotFoundError } = require("../middleware/errorHandler");

// Path to the JSON data file
const companiesFilePath = path.join(__dirname, "../data/companies.json");

/**
 * Get all companies
 * @param {string} userId - ID of the user to filter companies by (optional)
 * @returns {Promise<Array>} Array of company objects
 */
const getAllCompanies = async (userId = null) => {
  try {
    const data = await fs.readFile(companiesFilePath, "utf8");
    const companies = JSON.parse(data);

    // For the mock data, we'll just return all companies
    return companies;
  } catch (error) {
    logger.error("Error reading companies data:", error);
    throw error;
  }
};

/**
 * Get a company by ID
 * @param {string} id - Company ID
 * @returns {Promise<Object>} Company object
 */
const getCompanyById = async (id) => {
  try {
    const data = await fs.readFile(companiesFilePath, "utf8");
    const companies = JSON.parse(data);

    const company = companies.find((c) => c.id === id);

    if (!company) {
      throw new NotFoundError(`Company with ID ${id} not found`);
    }

    return company;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    logger.error(`Error fetching company with ID ${id}:`, error);
    throw error;
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
};
