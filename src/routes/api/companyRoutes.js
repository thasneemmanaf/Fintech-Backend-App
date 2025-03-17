const express = require("express");
const router = express.Router();
const {
  getCompanies,
  getCompanyById,
  getCompanyDashboard,
} = require("../../controllers/companyController");
const { authenticate } = require("../../middleware/auth");

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get all companies for the authenticated user
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of companies
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Server error
 */
router.get("/", authenticate, getCompanies);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authenticate, getCompanyById);

/**
 * @swagger
 * /companies/{id}/dashboard:
 *   get:
 *     summary: Get dashboard data for a company
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dashboard data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
router.get("/:id/dashboard", authenticate, getCompanyDashboard);

module.exports = router;
