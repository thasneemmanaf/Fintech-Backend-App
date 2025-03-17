// MongoDB Schema Definition for Invoice
const invoiceSchema = {
  id: {
    type: "string",
    description: "Unique identifier for the invoice",
    required: true,
  },
  companyId: {
    type: "string",
    description: "Reference to the company",
    required: true,
  },
  invoiceNumber: {
    type: "string",
    description: "Invoice reference number",
    required: true,
  },
  amount: {
    type: "number",
    description: "Invoice amount",
    required: true,
  },
  currency: {
    type: "string",
    description: "Invoice currency",
    default: "kr",
    required: true,
  },
  dueDate: {
    type: "date",
    description: "Due date for payment",
    required: true,
  },
  status: {
    type: "string",
    enum: ["pending", "paid", "overdue"],
    description: "Current status of the invoice",
    default: "pending",
    required: true,
  },
  createdAt: {
    type: "date",
    description: "Date when the invoice was created",
    default: "Date.now",
    required: true,
  },
  updatedAt: {
    type: "date",
    description: "Date when the invoice was last updated",
    default: "Date.now",
    required: true,
  },
};

// Collection indexes for optimization
const invoiceIndexes = [
  { key: { id: 1 }, unique: true },
  { key: { companyId: 1 } },
  { key: { dueDate: 1 } },
  { key: { status: 1 } },
];

module.exports = {
  invoiceSchema,
  invoiceIndexes,
};
