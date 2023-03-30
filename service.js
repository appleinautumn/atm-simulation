const { loadAccounts, saveAccounts } = require('./db');
const { clearSession, loadSession, saveSession } = require('./session');

const accountDatabase = 'accounts.json';
const sessionDatabase = 'session.json';

/**
 * Logout an account.
 * @returns {string} - The account that is logged out.
 */
const logout = async () => {
  // get current session
  const currentSession = await loadSession();

  // clear session if currentSession exists
  await clearSession();

  return currentSession;
};

/**
 * Login an account.
 * @throws an error if current session exists.
 * @param {string} accountId - The account ID.
 * @returns {object} - The account object.
 */
const login = async (accountId) => {
  // check current session
  const currentSession = await loadSession();

  // throw error if current session is active
  if (currentSession) {
    throw new Error(`Account ${currentSession} is currently logged in.`);
  }

  // get account from the database
  const account = await getAccountById(accountId);

  // save current session
  await saveSession(accountId);

  // if the account doesn't exist, create a new account
  if (!account) {
    await createNewAccount(accountId);

    return {
      name: accountId,
      balance: 0,
    };
  }

  return account;
};

/**
 * Create a new account in the database.
 * @param {string} accountId - The account ID.
 */
const createNewAccount = async (accountId) => {
  // create a new account
  const newAccount = {
    [accountId]: 0,
  };

  // load all accounts from database
  const accounts = await loadAccounts();

  // merge with existing data
  const newData = {
    ...accounts,
    ...newAccount,
  };

  // save
  await saveAccounts(newData);
};

/**
 * Get an account from the database.
 * @param {string} id - The account ID.
 * @returns {object} - The account object. null if not exist.
 */
const getAccountById = async (id) => {
  // load the database
  const accounts = await loadAccounts();

  if (typeof accounts[id] === 'undefined') { // check for undefined because we have to watch out for falsy value "0"
    return null;
  }

  return {
    name: id,
    balance: accounts[id],
  };
};

module.exports = {
  login,
  logout,
};
