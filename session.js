const fs = require('fs');

const sessionDatabase = 'session.json';

const loadSession = async () => {
  const dataBuffer = await fs.promises.readFile(sessionDatabase);
  return dataBuffer.toString();
};

const clearSession = async () => {
  await fs.promises.writeFile(sessionDatabase, '');
};

const saveSession = async (accountName) => {
  const dataBuffer = await fs.promises.readFile(sessionDatabase);
  const currentSession = dataBuffer.toString();

  if (currentSession === '') {
    await fs.promises.writeFile(sessionDatabase, accountName);
  } else {
    throw new Error(`Account ${currentSession} must logout first`);
  }
};

module.exports = {
  clearSession,
  loadSession,
  saveSession,
};
