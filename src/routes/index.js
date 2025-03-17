const express = require("express");
const router = express.Router();
const companyRoutes = require("./api/companyRoutes");
const cardRoutes = require("./api/cardRoutes");
const transactionRoutes = require("./api/transactionRoutes");

// For demo purpose, we'll bypass authentication
// In a real application, we should use the authenticate middleware
const bypassAuth = (req, res, next) => {
  // Set a mock user
  req.user = {
    id: "user-001",
    name: "Demo User",
    email: "user@example.com",
    role: "user",
  };

  next();
};

// Mount routes and apply the bypass auth middleware
router.use(bypassAuth);

// Mount API routes
router.use("/companies", companyRoutes);
router.use("/", cardRoutes);
router.use("/", transactionRoutes);

module.exports = router;
