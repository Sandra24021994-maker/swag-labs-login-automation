 Swag Labs Login Automation
  Automated tests for the login functionality of the Swag Labs e-commerce website using WebdriverIO.

 
Project Structure
- `/test/` → Contains test cases (two diffferent solutions are provided (login.spec.js file and login2.spec.js)
- `/pageobjects/` → Page Object Model (POM) for login functionality
- `loginCredentials.js` → Contains test data (valid and invalid credentials)
- `errorMessages.js` → Stores expected error messages
- `wdio.conf.js` → WebdriverIO configuration

Setup Instructions
- To run the test suite, follow the steps below: 

1. Clone the Repository
First, clone the repository to your local machine:
bash
git clone https://github.com/Sandra24021994-maker/swag-labs-login-automation.git

2. Go to the project directory
(bash):
cd swag-labs-login-automation

3. Install Dependencies
(bash):
npm install

4. Run the Tests
(bash):
npx wdio run wdio.conf.js

 
Test Scenarios Covered
- Successful login with valid credentials
- Error messages for invalid username/password or both
- Empty fields validation
- Case sensitivity checks

 
Technologies Used
- WebdriverIO – Test automation framework
- Node.js – Runtime environment
- Mocha/Chai – Test framework & assertions

 
Author
Sandra Kamdžijaš 
QA Automation Engineer






