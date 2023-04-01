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
    console.log(`Goodbye, ${currentSession}`);
  }
};

const deposit = async (amount) => {
  try {
    const balance = await service.deposit(amount);
    console.log(`Your balance is $${balance}`);
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};

const transfer = async (destination, amount) => {
  try {
    const balance = await service.transfer(destination, amount);
    console.log(
      `Transferred $${amount} to ${destination}. Your balance is $${balance}`,
    );
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};

const withdraw = async (amount) => {
  try {
    const balance = await service.withdraw(amount);
    console.log(`You withdraw $${amount}. Your balance is $${balance}`);
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};

module.exports = {
  deposit,
  login,
  logout,
  transfer,
  withdraw,
};
