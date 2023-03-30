const { loadAccounts, saveAccounts } = require('./db');
const { clearSession, loadSession, saveSession } = require('./session');
// const { createAccount } = require("./model");

const accountDatabase = 'accounts.json';
const sessionDatabase = 'session.json';

const logout = async () => {
  // get current session
  const currentSession = await loadSession();

  // clear session if currentSession exists
  await clearSession();

  return currentSession;
};

const login = async (accountName) => {
  try {
    // check current session
    const currentSession = await loadSession();

    // throw error if current session is active
    if (currentSession) {
      throw new Error(`Account ${currentSession} is currently logged in.`);
    }

    // get account from the database
    const account = await getAccountById(accountName);
    console.log({ account });

    // save current session
    // await saveSession(accountName);

    // if the account doesn't exist, create a new account
    if (!account) {
      let newAccount = await createNewAccount(accounts, accountName);
      return newAccount;
    }

    return {
      name: accountName,
      balance: accounts[accountName],
    };
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};

const createNewAccount = async (accounts, accountName) => {
  // create a new account
  const newAccount = {
    [accountName]: 0,
  };

  // merge with existing data
  const newData = {
    ...accounts,
    ...newAccount,
  };

  // save
  await saveAccounts(newData);

  return newAccount;
};

const getAccountById = async (id) => {
  // load the database
  const accounts = await loadAccounts();

  return accounts[id] ? { name: id, balance: accounts[id] } : null;

  // console.log("accounts", accounts, ", id", id, ", accounts[id]", accounts[id]);
  // console.log(typeof accounts[id]);

  // // if the account doesn't exist
  // if (typeof accounts[id] === "undefined") {
  //   return {
  //     name: id,
  //     balance: accounts[id],
  //   };
  // }
};

module.exports = {
  login,
  logout,
};
