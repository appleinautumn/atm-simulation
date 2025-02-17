# ATM Simulation Microservice

This is a Command Line Interface (CLI) program to simulate an interaction of an ATM with a user. It provides basic banking functionality including account management, deposits, withdrawals, and transfers.

## Requirements

This project is developed with:

- Node.js 18 or higher

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Usage

Run the application using the Node.js CLI:

```bash
node app <command> [arguments]
```

### Available Commands

- `login [name]` - Log in the customer and create the customer if not exist
- `deposit [amount]` - Deposit this amount to the logged in customer
- `withdraw [amount]` - Withdraw this amount from the logged in customer
- `transfer [target] [amount]` - Transfer this amount from the logged in customer to the target customer
- `logout` - Log out the logged in customer

### Login

- Login a user.
- If there's an active session in `session.json`, throw an error if user tries to login.
- Create the user if the user does not exist in `accounts.json`.

### Logout

- Logout the current active session.

### Deposit

- Make a deposit for the current active session.
- Throw an error if the amount is not a number.
- Throw an error if the current active session is empty.
- Throw an error if the account does not exist. (For some reason after you login, the account data is missing in the database).

### Transfer

- Make a transfer from the current active session to the destination account.
- Throw an error if the amount is not a number.
- Throw an error if the current active session is empty.
- Throw an error if the original account does not exist (For some reason after you login, the original account is missing in the database).
- Throw an error if the destination account does not exist (If the destination account is missing in the database).
- Throw an error if the destination account is the same with the current session (You cannot transfer to yourself).

### Withdraw

- Make a withdrawal for the current active session.
- Throw an error if the amount is not a number.
- Throw an error if the current active session is empty.
- Throw an error if the account does not exist. (For some reason after you login, the account data is lost in the database).

## Example

```bash
$ node app login Alice
Hello Alice. Your balance is $0.
$ node app deposit 200
Your balance is $200
$ node app withdraw 100
You withdraw $100. Your balance is $100
$ node app login Bob
Error: Account Alice is currently logged in.
$ node app logout
Goodbye, Alice
$ node app login Bob
Hello Bob. Your balance is $0.
$ node app deposit 200
Your balance is $200
$ node app transfer Alice 50
Transferred $50 to Alice. Your balance is $150
$ node app transfer Alice 1000
Error: Your account has not enough balance.
$ node app logout
Goodbye, Bob
$ node app login Alice
Hello Alice. Your balance is $150.
$ node app transfer Alice 100
Error: You cannot transfer to yourself.
$ node app transfer Bob 100
Transferred $100 to Bob. Your balance is $50
$ node app logout
Goodbye, Alice
```

## Database Structure

This application uses JSON files to simulate a database:

- **accounts.json**: Stores all user account data with balances
- **session.json**: Stores the currently active session
- **accounts_test.json**: Test version of accounts database
- **session_test.json**: Test version of session database

## Development

### Linting

To run code linting:

```bash
npm run lint
```

### Testing

To run all tests:

```bash
npm test
```

To run a specific test file:

```bash
NODE_ENV=test mocha --timeout 10000 --exit 'path/to/test.js'
```

Example:

```
$ npm test

> dkatalis-atm@1.0.0 test
> NODE_ENV=test mocha --timeout 10000 --exit './test/**/*.test.js'



  Service Unit Test
    ✔ login
    ✔ throws an error when logging in with existing session still active
    ✔ logout
    ✔ deposit
    ✔ throws an error when making a deposit without login
    ✔ throws an error when making a deposit with an invalid amount
    ✔ transfer
    ✔ throws an error when making a transfer without login
    ✔ throws an error when making a transfer with an invalid amount
    ✔ throws an error when making a transfer to the same account
    ✔ withdraw
    ✔ throws an error when making a withdrawal without login
    ✔ throws an error when making a withdrawal with an invalid amount

  Test isNumber
    ✔ number: 123 should be true
    ✔ string: 'abc' should be false
    ✔ string numeric: '123' should be false
    ✔ boolean: true should be false
    ✔ boolean: false should be false
    ✔ array should be false
    ✔ object should be false
    ✔ NaN should be false
    ✔ null should be false
    ✔ undefined should be false

  Test moneyFormatter
    ✔ zero
    ✔ positive number
    ✔ negative number
    ✔ string to throw error
    ✔ array to throw error
    ✔ object to throw error
    ✔ null to throw error
    ✔ undefined to throw error


  31 passing (43ms)

```

## Project Structure

- `app.js` - Command line interface entry point
- `service.js` - Core business logic for ATM operations
- `db.js` - Database operations for account management
- `session.js` - Session management logic
- `util.js` - Utility functions for validation and formatting
- `test/` - Test suite

## License

ISC
