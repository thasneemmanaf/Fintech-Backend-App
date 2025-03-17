// MongoDB Schema Definition for Transaction
const transactionSchema = {
  id: {
    type: "string",
    description: "Unique identifier for the transaction",
    required: true,
  },
  companyId: {
    type: "string",
    description: "Reference to the company",
    required: true,
  },
  cardId: {
    type: "string",
    description: "Reference to the card used",
    required: true,
  },
  amount: {
    type: "number",
    description: "Transaction amount",
    required: true,
  },
  currency: {
    type: "string",
    description: "Transaction currency",
    default: "kr",
    required: true,
  },
  description: {
    type: "string",
    description: "Transaction description",
    required: true,
  },
  merchant: {
    type: "string",
    description: "Merchant name",
    required: true,
  },
  category: {
    type: "string",
    description: "Transaction category",
    required: true,
  },
  transactionDate: {
    type: "date",
    description: "Date when the transaction occurred",
    required: true,
  },
  status: {
    type: "string",
    enum: ["pending", "completed", "declined"],
    description: "Current status of the transaction",
    default: "pending",
    required: true,
  },
  dataPoints: {
    type: "number",
    description: "Loyalty points earned from transaction",
    default: 0,
    required: true,
  },
  createdAt: {
    type: "date",
    description: "Date when the transaction was created",
    default: "Date.now",
    required: true,
  },
  updatedAt: {
    type: "date",
    description: "Date when the transaction was last updated",
    default: "Date.now",
    required: true,
  },
};

// Collection indexes for optimization
const transactionIndexes = [
  { key: { id: 1 }, unique: true },
  { key: { companyId: 1 } },
  { key: { cardId: 1 } },
  { key: { transactionDate: -1 } },
  { key: { merchant: 1 } },
  { key: { category: 1 } },
];

module.exports = {
  transactionSchema,
  transactionIndexes,
};
