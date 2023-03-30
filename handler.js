const service = require('./service');
const { isNumber } = require('./util');

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
  try {
    if (!isNumber(amount)) {
      throw new Error('The amount is not a number');
    }

    const balance = await service.deposit(Number(amount));
    console.log(`Your balance is $${balance}`);
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};

const transfer = async (destination, amount) => {
  try {
    if (!isNumber(amount)) {
      throw new Error('The amount is not a number');
    }

    const balance = await service.transfer(destination, Number(amount));
    console.log(`Transferred $${amount} to ${destination}. Your balance is $${balance}`);
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
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
