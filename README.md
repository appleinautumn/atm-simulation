# ATM simulation microservice

This is a Command Line Interface (CLI) program to simulate an interaction of an ATM with a retail bank.

## Requirements

This project is developed with:

- Node 18

## Services

- `login [name]` - Logs in as this customer and creates the customer if not exist
- `deposit [amount]` - Deposits this amount to the logged in customer
- `withdraw [amount]` - Withdraws this amount from the logged in customer
- `transfer [target] [amount]` - Transfers this amount from the logged in customer to the target customer
- `logout` - Logs out of the current customer

### Login

- Login a user.
- If there's an active session in `session.json`, throw an error if user tries to login.
- Create the user if the user does not exist in `accounts.json`.

### Logout

- Logout the current active session.
- No error if it's done multiple times.

### Deposit

- Makes a deposit for the current active session.
- Throws an error if the amount is not a number.
- Throws an error if the current active session is empty.
- Throws an error if the account does not exist. (For some reason after you login, the account data is missing in the database).

### Transfer

- Makes a transfer from the current active session to the destination account.
- Throws an error if the amount is not a number.
- Throws an error if the current active session is empty.
- Throws an error if the original account does not exist (For some reason after you login, the original account is missing in the database).
- Throws an error if the destination account does not exist (For some reason after you login, the destination account is missing in the database).
- Throws an error if the destination account is the same with the current session (You cannot transfer to yourself).
- Here I make a change with the Transfer function. In the original problem statement, we have "debt" feature. For the purpose of this test let's just keep it simple. If Bob has $30 and transfers $100 to Alice, Bob's balance in the bank will be -$70 and Alice will get +$100 from Bob. So Bob owes money to the bank, not Alice.

### Withdraw

- Makes a withdrawal for the current active session.
- Throws an error if the amount is not a number.
- Throws an error if the current active session is empty.
- Throws an error if the account does not exist. (Defensive programming. For some reason after you login, the account data is lost in the database).
- To be in line with "transfer" method, we allow negative balance.

## Example

```bash
$ node app login Alice
Hello Alice. Your balance is 0.
$ node app deposit 100
Your balance is $100
$ node app login Bob
Error: Account Alice is currently logged in.
$ node app logout
Goodbye, Alice
$ node app login Bob
Hello Bob. Your balance is 0.
$ node app deposit 80
Your balance is $80
$ node app transfer Alice 50
Transferred $50 to Alice. Your balance is $30
$ node app transfer Alice 100
Transferred $100 to Alice. Your balance is $-70
$ node app deposit 30
Your balance is $-40
$ node app logout
Goodbye, Bob
$ node app login Alice
Hello Alice. Your balance is 250.
$ node app transfer Bob 30
Transferred $30 to Bob. Your balance is $220
$ node app logout
Goodbye, Alice
(failed reverse-i-search)`login Bob': node app ^Cgin aa
$ node app login Bob
Hello Bob. Your balance is -10.
$ node app deposit 100
Your balance is $90
$ node app logout
Goodbye, Bob
```

## Database

We're simulating bank account database in the file `accounts.json`. For the session, `session.json`. When running the test, we're using `accounts_test.json` and `session_test.json` instead.

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


  23 passing (50ms)
```
