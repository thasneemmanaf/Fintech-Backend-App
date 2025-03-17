const express = require("express");
const router = express.Router();
const {
  getCompanyTransactions,
} = require("../../controllers/transactionController");
const { authenticate } = require("../../middleware/auth");

/**
 * @swagger
 * /companies/{companyId}/transactions:
 *   get:
 *     summary: Get transactions for a company
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated transactions data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
router.get(
  "/companies/:companyId/transactions",
  authenticate,
  getCompanyTransactions
);

module.exports = router;
