const { Command } = require('commander');

const { initDatabase } = require('./db');
const { deposit, login, logout, transfer, withdraw } = require('./handler');
const { getSession, initSession } = require('./session');

const program = new Command();

const accountDatabase = 'accounts.json';
const sessionDatabase = 'session.json';

const main = async () => {
  // initialize database
  await initDatabase(accountDatabase);

  // initialize session
  await initSession(sessionDatabase);

  program.name('dkatalis-atm').description('ATM simulation').version('0.8.0');

  program
    .command('login')
    .description('Login user')
    .argument('<account>', 'Account Name')
    .action(login);

  program.command('logout').description('Logout user').action(logout);

  program
    .command('deposit')
    .description('Deposit money')
    .argument('<amount>', 'Amount of money')
    .action(deposit);

  program
    .command('transfer')
    .description('Transfer money to destination account')
    .argument('<account>', 'Destination account')
    .argument('<amount>', 'Amount of money')
    .action(transfer);

  program
    .command('withdraw')
    .description('Withdraw money')
    .argument('<amount>', 'Amount of money')
    .action(withdraw);

  await program.parseAsync(process.argv);
};

main();
