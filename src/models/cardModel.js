const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const logger = require("../config/logger");
const { NotFoundError } = require("../middleware/errorHandler");
const { maskCardNumber } = require("../utils/encryption");

// Path to the JSON data file
const cardsFilePath = path.join(__dirname, "../data/cards.json");

/**
 * Get all cards for a company
 * @param {string} companyId - Company ID
 * @returns {Promise<Array>} Array of card objects
 */
const getCardsByCompanyId = async (companyId) => {
  try {
    const data = await fs.readFile(cardsFilePath, "utf8");
    const cards = JSON.parse(data);

    const companyCards = cards.filter((card) => card.companyId === companyId);

    // Mask sensitive card data
    return companyCards.map((card) => ({
      ...card,
      cardNumber: maskCardNumber(card.cardNumber),
      cvv: "***",
    }));
  } catch (error) {
    logger.error(`Error fetching cards for company ${companyId}:`, error);
    throw error;
  }
};

/**
 * Get a card by ID
 * @param {string} id - Card ID
 * @returns {Promise<Object>} Card object
 */
const getCardById = async (id) => {
  try {
    const data = await fs.readFile(cardsFilePath, "utf8");
    const cards = JSON.parse(data);

    const card = cards.find((c) => c.id === id);

    if (!card) {
      throw new NotFoundError(`Card with ID ${id} not found`);
    }

    // Mask sensitive card data
    return {
      ...card,
      cardNumber: maskCardNumber(card.cardNumber),
      cvv: "***",
    };
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    logger.error(`Error fetching card with ID ${id}:`, error);
    throw error;
  }
};

module.exports = {
  getCardsByCompanyId,
  getCardById,
};
