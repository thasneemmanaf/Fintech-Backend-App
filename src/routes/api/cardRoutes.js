const express = require("express");
const router = express.Router();
const {
  getCompanyCards,
  getCardById,
} = require("../../controllers/cardController");
const { authenticate } = require("../../middleware/auth");

/**
 * @swagger
 * /companies/{companyId}/cards:
 *   get:
 *     summary: Get all cards for a company
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of cards
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
router.get("/companies/:companyId/cards", authenticate, getCompanyCards);

/**
 * @swagger
 * /cards/{id}:
 *   get:
 *     summary: Get a card by ID
 *     tags: [Cards]
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
 *         description: Card data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Card not found
 *       500:
 *         description: Server error
 */
router.get("/cards/:id", authenticate, getCardById);

module.exports = router;
