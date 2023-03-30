const fs = require('fs');

const accountDatabase = 'accounts.json';

const loadAccounts = async () => {
  try {
    const dataBuffer = await fs.promises.readFile(accountDatabase);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return {};
  }
};

const saveAccounts = async (data) => {
  const dataJSON = JSON.stringify(data);
  await fs.promises.writeFile(accountDatabase, dataJSON);
};

// const saveAccountByName = (accounts, name, balance) => {
//   for (const account in accounts) {
//     if (account.name == name) {
//       account.balance = balance;
//       break;
//     }
//   }

//   fs.promises.writeFile(accountDatabase, accounts);
// };

module.exports = {
  loadAccounts,
  saveAccounts,
};