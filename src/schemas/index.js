const { companySchema, companyIndexes } = require("./companySchema");
const { cardSchema, cardIndexes } = require("./cardSchema");
const {
  transactionSchema,
  transactionIndexes,
} = require("./transactionSchema");
const { invoiceSchema, invoiceIndexes } = require("./invoiceSchema");

module.exports = {
  companySchema,
  companyIndexes,
  cardSchema,
  cardIndexes,
  transactionSchema,
  transactionIndexes,
  invoiceSchema,
  invoiceIndexes,
};
