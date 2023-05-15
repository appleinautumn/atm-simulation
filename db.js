const fs = require('fs');

// the account database
let _accountDatabase;

/**
 * Initialize account database.
 */
const initDatabase = async (db) => {
  _accountDatabase = db;
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

module.exports = {
  initDatabase,
  loadAccounts,
  saveAccounts,
};
