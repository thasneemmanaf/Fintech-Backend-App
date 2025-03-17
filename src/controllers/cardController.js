const cardModel = require("../models/cardModel");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const logger = require("../config/logger");

/**
 * @desc    Get all cards for a company
 * @route   GET /api/companies/:companyId/cards
 * @access  Private
 */
const getCompanyCards = asyncHandler(async (req, res) => {
  const { companyId } = req.params;

  const cards = await cardModel.getCardsByCompanyId(companyId);

  res.status(200).json(successResponse(cards));
});

/**
 * @desc    Get a card by ID
 * @route   GET /api/cards/:id
 * @access  Private
 */
const getCardById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const card = await cardModel.getCardById(id);

  res.status(200).json(successResponse(card));
});

module.exports = {
  getCompanyCards,
  getCardById,
};
