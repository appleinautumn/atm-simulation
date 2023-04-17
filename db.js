const fs = require('fs');

// the account database
let _accountDatabase;
let _loanDatabase;

/**
 * Initialize account database.
 */
const initDatabase = async (db, loanDb) => {
  _accountDatabase = db;
  _loanDatabase = loanDb;
};

/**
 * Load accounts.
 * @throws an error if the database is not initialized.
 * @returns {object} - All the accounts in a key-value object. On error, return {}
 */
const loadAccounts = async () => {
  if (!_accountDatabase) {
    throw new Error('Database has not been initialized.');
  }

  try {
    const dataBuffer = await fs.promises.readFile(_accountDatabase);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return {};
  }
};

/**
 * Load loan accounts.
 * @throws an error if the database is not initialized.
 * @returns {object} - All the accounts in a key-value object. On error, return {}
 */
const loadLoanAccounts = async () => {
  if (!_loanDatabase) {
    throw new Error('Database has not been initialized.');
  }

  try {
    const dataBuffer = await fs.promises.readFile(_loanDatabase);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return {};
  }
};

/**
 * Save accounts.
 * @throws an error if the database is not initialized.
 */
const saveAccounts = async (data) => {
  if (!_accountDatabase) {
    throw new Error('Database has not been initialized.');
  }

  const dataJSON = JSON.stringify(data);
  await fs.promises.writeFile(_accountDatabase, dataJSON);
};

/**
 * Save loan accounts.
 * @throws an error if the database is not initialized.
 */
const saveLoans = async (data) => {
  if (!_loanDatabase) {
    throw new Error('Database has not been initialized.');
  }

  const dataJSON = JSON.stringify(data);
  await fs.promises.writeFile(_loanDatabase, dataJSON);
};

module.exports = {
  initDatabase,
  loadAccounts,
  loadLoanAccounts,
  saveAccounts,
  saveLoans,
};
