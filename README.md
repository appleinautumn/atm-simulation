# ATM Simulation Microservice

This is a Command Line Interface (CLI) program to simulate an interaction of an ATM with a user.

## Requirements

This project is developed with:

- Node 18

## Services

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

## Database

We're simulating bank account data in the file `accounts.json`. For the session, `session.json`. When running the test, we're using `accounts_test.json` and `session_test.json` instead.

## Testing

To test the service, run

```bash
npm test
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
