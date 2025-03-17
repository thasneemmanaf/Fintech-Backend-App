/**
 * Mask sensitive data like card numbers
 * @param {string} cardNumber - Card number to mask
 * @returns {string} Masked card number
 */
const maskCardNumber = (cardNumber) => {
  if (!cardNumber || cardNumber.length < 4) {
    return cardNumber;
  }

  const last4 = cardNumber.slice(-4);
  const masked = "*".repeat(cardNumber.length - 4);

  return masked + last4;
};

module.exports = {
  maskCardNumber,
};
