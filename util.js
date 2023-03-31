/**
 * Check if an input is a number.
 * @param {any} x - The input.
 * @returns {bool} true if it's a number, else false.
 */
function isNumber(x) {
  if (typeof x === 'number' && !Number.isNaN(x)) {
    return true;
  }
  return false;
}

module.exports = {
  isNumber,
};
