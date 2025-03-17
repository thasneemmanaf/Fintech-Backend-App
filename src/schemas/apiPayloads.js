// API Payload Structures
const apiPayloads = {
  // Company list - minimal data needed for listings
  companyList: {
    success: true,
    data: [
      {
        id: "string",
        name: "string",
        organisationNumber: "string",
        status: "string",
      },
    ],
  },

  // Company detail - full company data
  companyDetail: {
    success: true,
    data: {
      id: "string",
      name: "string",
      organisationNumber: "string",
      status: "string",
      createdAt: "date",
      updatedAt: "date",
    },
  },

  // Dashboard data - optimized to contain exactly what the dashboard needs
  dashboardData: {
    success: true,
    data: {
      company: {
        id: "string",
        name: "string",
      },
      card: {
        id: "string",
        cardHolder: "string",
        cardNumber: "string (masked)",
        expiryDate: "string",
        status: "string",
        limit: "number",
        currency: "string",
        spentAmount: "number",
        availableAmount: "number",
      },
      invoice: {
        id: "string",
        invoiceNumber: "string",
        amount: "number",
        currency: "string",
        dueDate: "string",
        status: "string",
      },
      transactions: [
        {
          id: "string",
          merchant: "string",
          amount: "number",
          currency: "string",
          transactionDate: "string",
          category: "string",
          dataPoints: "number",
        },
      ],
      totalTransactions: "number",
    },
  },

  // Transactions with pagination
  paginatedTransactions: {
    success: true,
    data: {
      items: [
        {
          id: "string",
          merchant: "string",
          amount: "number",
          currency: "string",
          description: "string",
          category: "string",
          transactionDate: "string",
          dataPoints: "number",
        },
      ],
      pagination: {
        total: "number",
        page: "number",
        limit: "number",
        totalPages: "number",
      },
    },
  },

  // Error response structure
  errorResponse: {
    success: false,
    error: {
      message: "string",
      code: "string",
    },
  },
};

module.exports = apiPayloads;
