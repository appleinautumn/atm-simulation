/**
 * Check if an input is a number.
 * @param {any} x - The input.
 * @returns {bool} true if it's a number, else false.
 */
const isNumber = (x) => {
  if (typeof x === 'number' && !Number.isNaN(x)) {
    return true;
  }
  return false;
};

/**
 * Format dollar amount.
 * @param {any} x - The input.
 * @returns {string} The formatted amount.
 */
const moneyFormatter = (x) => {
  if (typeof x === 'number' && !Number.isNaN(x)) {
    const isNegative = x < 0 ? '-' : '';
    return `${isNegative}$${Math.abs(x)}`;
  }
  throw new Error('amount must be number');
};

module.exports = {
  isNumber,
  moneyFormatter,
};
