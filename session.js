const fs = require('fs');

// the session database
let _sessionDatabase;

/**
 * Initialize session database.
 */
const initSession = async (db) => {
  _sessionDatabase = db;
};

/**
 * Load session.
 * @throws an error if the database is not initialized.
 * @returns {string} - The account that is currently logged in.
 */
const loadSession = async () => {
  if (!_sessionDatabase) {
    throw new Error('Session database has not been initialized.');
  }

  const dataBuffer = await fs.promises.readFile(_sessionDatabase);
  return dataBuffer.toString();
};

/**
 * Clear session.
 * @throws an error if the database is not initialized.
 */
const clearSession = async () => {
  if (!_sessionDatabase) {
    throw new Error('Session database has not been initialized.');
  }

  await fs.promises.writeFile(_sessionDatabase, '');
};

/**
 * Save session.
 * @throws an error if the database is not initialized.
 * @throws an error if the current session is still active.
 */
const saveSession = async (accountName) => {
  if (!_sessionDatabase) {
    throw new Error('Session database has not been initialized.');
  }

  const dataBuffer = await fs.promises.readFile(_sessionDatabase);
  const currentSession = dataBuffer.toString();

  if (currentSession === '') {
    await fs.promises.writeFile(_sessionDatabase, accountName);
  } else {
    throw new Error(`Account ${currentSession} must logout first`);
  }
};

module.exports = {
  clearSession,
  initSession,
  loadSession,
  saveSession,
};
