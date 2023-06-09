const { loadAccounts, saveAccounts } = require('./db');
const { clearSession, loadSession, saveSession } = require('./session');
const { isNumber } = require('./util');

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
    [accountId]: {
      balance: 0,
    },
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

  if (typeof accounts[id] === 'undefined') {
    // check for undefined because we have to watch out for falsy value "0"
    return null;
  }

  return {
    name: id,
    balance: accounts[id].balance,
  };
};

/**
 * Deposit money to currently active account.
 * @param {number} amount - The amount of money to deposit.
 * @returns {number} money - The final amount of money.
 */
const deposit = async (amount) => {
  const amountToDeposit = Number(amount);

  if (!isNumber(amountToDeposit)) {
    throw new Error('The amount is not a number');
  }

  // get current session
  const accountId = await loadSession();
  if (!accountId) {
    throw new Error('You need to login.');
  }

  // load the database
  const accounts = await loadAccounts();

  if (typeof accounts[accountId].balance === 'undefined') {
    throw new Error('The account does not exist.');
  }

  // set the final amount
  const finalAmount = accounts[accountId].balance + amountToDeposit;

  // update the account
  const updatedAccount = {
    [accountId]: {
      balance: finalAmount,
    },
  };

  // merge with existing data
  const newData = {
    ...accounts,
    ...updatedAccount,
  };

  // save
  await saveAccounts(newData);

  return finalAmount;
};

/**
 * Transfer money to specific account from currently active account.
 * @param {string} destinationId - The destination account ID.
 * @param {number} amount - The amount of money to transfer.
 * @returns {number} money - The final amount of the origin account.
 */
const transfer = async (destinationId, amount) => {
  const amountToTransfer = Number(amount);

  if (!isNumber(amountToTransfer)) {
    throw new Error('The amount is not a number');
  }

  // get current session
  const accountId = await loadSession();
  if (!accountId) {
    throw new Error('You need to login.');
  }

  // cannot transfer to yourself
  if (accountId === destinationId) {
    throw new Error('You cannot transfer to yourself.');
  }

  // load the database
  const accounts = await loadAccounts();

  if (typeof accounts[accountId].balance === 'undefined') {
    throw new Error('The origin account does not exist.');
  }

  if (typeof accounts[destinationId] === 'undefined') {
    throw new Error('The destination account does not exist.');
  }

  // calculate origin final amount
  let originFinalAmount = accounts[accountId].balance - amountToTransfer;

  // calculate destination final amount
  let destinationFinalAmount = accounts[destinationId].balance + amountToTransfer;

  // update the respective accounts
  if (originFinalAmount < 0) {
    throw new Error('Your account has not enough balance.')
  }

  const updatedAccounts = {
    [accountId]: {
      balance: originFinalAmount,
    },
    [destinationId]: {
      balance: destinationFinalAmount,
    },
  };

  // merge with existing data
  const newData = {
    ...accounts,
    ...updatedAccounts,
  };

  // save
  await saveAccounts(newData);

  return originFinalAmount;
};

/**
 * Withdraw money from currently active account.
 * @param {number} amount - The amount of money to withdraw.
 * @returns {number} money - The final amount of money.
 */
const withdraw = async (amount) => {
  const amountToWithdraw = Number(amount);

  if (!isNumber(amountToWithdraw)) {
    throw new Error('The amount is not a number');
  }

  // get current session
  const accountId = await loadSession();
  if (!accountId) {
    throw new Error('You need to login.');
  }

  // load the database
  const accounts = await loadAccounts();

  if (typeof accounts[accountId] === 'undefined') {
    throw new Error('The account does not exist.');
  }

  // set the final amount
  const finalAmount = accounts[accountId].balance - amountToWithdraw;

  if (finalAmount < 0) {
    throw new Error('You do not have sufficient balance');
  }

  // update the account
  const updatedAccount = {
    [accountId]: {
      balance: finalAmount
    },
  };

  // merge with existing data
  const newData = {
    ...accounts,
    ...updatedAccount,
  };

  // save
  await saveAccounts(newData);

  return finalAmount;
};

module.exports = {
  login,
  logout,
  deposit,
  transfer,
  withdraw,
};
