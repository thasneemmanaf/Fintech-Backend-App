// MongoDB Schema Definition for Company
const companySchema = {
  id: {
    type: "string",
    description: "Unique identifier for the company",
    required: true,
  },
  name: {
    type: "string",
    description: "Company name",
    required: true,
  },
  organisationNumber: {
    type: "string",
    description: "Official organization registration number",
    required: true,
  },
  status: {
    type: "string",
    enum: ["active", "inactive"],
    description: "Current status of the company",
    default: "active",
    required: true,
  },
  createdAt: {
    type: "date",
    description: "Date when the company was created",
    default: "Date.now",
    required: true,
  },
  updatedAt: {
    type: "date",
    description: "Date when the company was last updated",
    default: "Date.now",
    required: true,
  },
};

// Collection indexes for optimization
const companyIndexes = [
  { key: { id: 1 }, unique: true },
  { key: { organisationNumber: 1 }, unique: true },
];

module.exports = {
  companySchema,
  companyIndexes,
};
