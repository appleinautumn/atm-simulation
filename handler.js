const service = require('./service');

const login = async (accountName) => {
  try {
    const account = await service.login(accountName);
    console.log(`Hello ${account.name}. Your balance is ${account.balance}.`);
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};

const logout = async () => {
  const currentSession = await service.logout();

  if (currentSession) {
    console.log(`User ${currentSession} has been logged out.`);
  }
};

const deposit = async (amount) => {
  console.log(amount);
};

const transfer = async (destination, amount) => {
  console.log(destination, amount);
};

const withdraw = async (amount) => {
  console.log(amount);
};

module.exports = {
  deposit,
  login,
  logout,
  transfer,
  withdraw,
};
