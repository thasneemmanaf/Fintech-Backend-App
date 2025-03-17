const companyModel = require("../models/companyModel");
const dashboardModel = require("../models/dashboardModel");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const logger = require("../config/logger");

/**
 * @desc    Get all companies for the authenticated user
 * @route   GET /api/companies
 * @access  Private
 */
const getCompanies = asyncHandler(async (req, res) => {
  // In a real app, we would get user ID from req.user
  // For now, we'll get all companies
  const userId = req.user ? req.user.id : null;

  const companies = await companyModel.getAllCompanies(userId);

  res.status(200).json(successResponse(companies));
});

/**
 * @desc    Get a company by ID
 * @route   GET /api/companies/:id
 * @access  Private
 */
const getCompanyById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const company = await companyModel.getCompanyById(id);

  res.status(200).json(successResponse(company));
});

/**
 * @desc    Get dashboard data for a company
 * @route   GET /api/companies/:id/dashboard
 * @access  Private
 */
const getCompanyDashboard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const dashboardData = await dashboardModel.getDashboardData(id);

  res.status(200).json(successResponse(dashboardData));
});

module.exports = {
  getCompanies,
  getCompanyById,
  getCompanyDashboard,
};
