const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { deposit, login, logout, transfer, withdraw } = require('../../service');
const { initDatabase, saveAccounts } = require('../../db');
const { clearSession, initSession, saveSession } = require('../../session');

chai.use(chaiAsPromised);
const { expect } = chai;

const accountDatabase = 'accounts_test.json';
const sessionDatabase = 'session_test.json';

describe('Service Unit Test', async () => {
  beforeEach(async () => {
    // initialize database
    await initDatabase(accountDatabase);

    // initialize session
    await initSession(sessionDatabase);

    await clearSession();
  });

  it('login', async () => {
    const account = 'andy';
    const currentSession = await login(account);
    expect(currentSession).to.deep.equal({ name: account, balance: 0 });
  });

  it('throws an error when logging in with existing session still active', async () => {
    await saveSession('randomAccount');

    const account = 'anthony';
    await expect(login(account)).to.be.rejected;
  });

  it('logout', async () => {
    const loggedInAccount = 'bobby';
    await saveSession(loggedInAccount);

    const currentSession = await logout();
    expect(currentSession).to.equal(loggedInAccount);
  });

  it('deposit', async () => {
    // existing data
    await saveAccounts({
      boss: {
        balance: 1000
      },
    });

    // boss login
    await login('boss');

    // boss makes a deposit
    const balance = await deposit(1000);

    // expecting final amount to be 2000
    expect(balance).to.equal(2000);
  });

  it('throws an error when making a deposit without login', async () => {
    await expect(deposit(100)).to.be.rejected;
  });

  it('throws an error when making a deposit with an invalid amount', async () => {
    // existing data
    await saveAccounts({
      boss: 1000,
    });

    // boss login
    await login('boss');

    await expect(deposit('asdf')).to.be.rejected;
  });

  it('transfer', async () => {
    // existing data
    await saveAccounts({
      boss: {
        balance: 2000,
      },
      employee1: {
        balance: 100,
      },
      employee2: {
        balance: 200,
      },
    });

    // boss login
    await login('boss');

    // boss transfer money to employee1
    let balance = await transfer('employee1', 600);

    // expecting final amount to be 1400 (2000-600)
    expect(balance).to.equal(1400);

    // boss transfer money to employee2
    balance = await transfer('employee2', 800);

    // expecting final amount to be 600 (1400-800)
    expect(balance).to.equal(600);
  });

  it('throws an error when making a transfer without login', async () => {
    await expect(transfer('john', 100)).to.be.rejected;
  });

  it('throws an error when making a transfer with an invalid amount', async () => {
    // existing data
    await saveAccounts({
      boss: {
        balance: 1000,
      },
      employee1: {
        balance: 100,
      },
    });

    // boss login
    await login('boss');

    await expect(transfer('employee1', 'asdf')).to.be.rejected;
  });

  it('throws an error when making a transfer to the same account', async () => {
    // existing data
    await saveAccounts({
      boss: {
        balance: 1000,
      },
    });

    // boss login
    await login('boss');

    await expect(transfer('boss', 100)).to.be.rejected;
  });

  it('withdraw', async () => {
    // existing data
    await saveAccounts({
      donny: {
        balance: 3000,
      },
    });

    // boss login
    await login('donny');

    // withdraw 1300
    const balance = await withdraw(1300);

    // expecting final amount to be 1700
    expect(balance).to.equal(1700);
  });

  it('throws an error when making a withdrawal without login', async () => {
    await expect(withdraw(100)).to.be.rejected;
  });

  it('throws an error when making a withdrawal with an invalid amount', async () => {
    // existing data
    await saveAccounts({
      boss: {
        balance: 1000,
      },
    });

    // boss login
    await login('boss');

    await expect(withdraw('asdf')).to.be.rejected;
  });
});
