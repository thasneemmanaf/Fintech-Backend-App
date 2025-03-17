// MongoDB Schema Definition for Card
const cardSchema = {
  id: {
    type: "string",
    description: "Unique identifier for the card",
    required: true,
  },
  companyId: {
    type: "string",
    description: "Reference to the company owning this card",
    required: true,
  },
  cardNumber: {
    type: "string",
    description: "Card number (will be encrypted)",
    required: true,
  },
  cardHolder: {
    type: "string",
    description: "Name of the card holder",
    required: true,
  },
  expiryDate: {
    type: "string",
    description: "Card expiry date (MM/YY)",
    required: true,
  },
  cvv: {
    type: "string",
    description: "Card verification value (will be encrypted)",
    required: true,
  },
  status: {
    type: "string",
    enum: ["active", "inactive", "blocked"],
    description: "Current status of the card",
    default: "inactive",
    required: true,
  },
  limit: {
    type: "number",
    description: "Credit limit for the card",
    required: true,
  },
  currency: {
    type: "string",
    description: "Card currency",
    default: "kr",
    required: true,
  },
  spentAmount: {
    type: "number",
    description: "Amount spent from the credit limit",
    default: 0,
    required: true,
  },
  availableAmount: {
    type: "number",
    description: "Available amount to spend",
    required: true,
  },
  createdAt: {
    type: "date",
    description: "Date when the card was created",
    default: "Date.now",
    required: true,
  },
  updatedAt: {
    type: "date",
    description: "Date when the card was last updated",
    default: "Date.now",
    required: true,
  },
};

// Collection indexes for optimization
const cardIndexes = [
  { key: { id: 1 }, unique: true },
  { key: { companyId: 1 } },
  { key: { cardNumber: 1 }, unique: true },
];

module.exports = {
  cardSchema,
  cardIndexes,
};
