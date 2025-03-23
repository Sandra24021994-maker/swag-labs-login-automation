//region Pageobjects
const LoginPage = require('../pageobjects/login.page.js'); // Import LoginPage 
const ErrorMessages = require('../pageobjects/errorMessages.js'); // Import Error Messages
const credentials = require('../pageobjects/loginCredentials.js'); // Import login credentials
//#endregion 

describe('Swag Labs - Log In Page', () => {   

    beforeEach(async () => { 
        // Open the login page before each test
        await LoginPage.open(); 
    });

    // Successful login
    const successfulLogin = async (username, password) => {
        // Perform login with provided username and password
        await LoginPage.login(username, password);

        // TC1 Expected result: User should be redirected to the inventory page
        const pageUrl = await browser.getUrl();
        await expect(pageUrl).toContain('/inventory.html'); 
    };  

    // Unsuccessful login
    const unsuccessfulLogin = async (tc, username, password) => {
        await LoginPage.login(username, password);
        const errorMessage = await LoginPage.getErrorMessage();

        // Switch case to handle different test case error messages
        switch (tc) {
            case 2: case 3: case 7: case 8: case 9:
                // Expected result: Error message indicating username and password do not match any user in the service
                await expect(errorMessage).toContain(ErrorMessages.usernameAndPasswordDoNotMatch);
                break;

            case 4: case 6:
                // Expected result: Error message indicating the username field is required
                await expect(errorMessage).toContain(ErrorMessages.usernameRequired);
                break;

            case 5:
                // Expected result: Error message indicating the password field is required
                await expect(errorMessage).toContain(ErrorMessages.passwordRequired);
                break;

            default:
                throw new Error(`Test case ${tc} is not defined`);
        }
    };

    //region Test for successful login (with valid credentials)
    it('TC1: should log in successfully with valid credentials', async () => { 
        await successfulLogin(credentials.validUsername, credentials.validPassword);
    });  
    //#endregion

    //region Negative tests
    const negativeTests = [ 
        // TC2: Provided invalid username and valid password
        { tc: 2, username: credentials.invalidValue, password: credentials.validPassword }, 
        // TC3: Provided valid username and invalid password
        { tc: 3, username: credentials.validUsername, password: credentials.invalidValue }, 
        // TC4: Provided only valid password (username not provided)
        { tc: 4, username: credentials.emptyValue, password: credentials.validPassword }, 
        // TC5: Provided only valid username (password not provided)
        { tc: 5, username: credentials.validUsername, password: credentials.emptyValue }, 
        // TC6: Username and password not provided at all
        { tc: 6, username: credentials.emptyValue, password: credentials.emptyValue }, 
        // TC7: Provided invalid case-sensitive username and valid password
        { tc: 7, username: credentials.invalidUsernameCaseSensitive, password: credentials.validPassword }, 
        // TC8: Provided valid username and invalid password (case-sensitive)
        { tc: 8, username: credentials.validUsername, password: credentials.invalidPasswordCaseSensitive }, 
        // TC9: Provided invalid username and invalid password
        { tc: 9, username: credentials.invalidValue, password: credentials.invalidValue },
    ];

    // Run all negative tests
    for (const { tc, username, password } of negativeTests) {
        it(`TC${tc}: should display an error message for invalid login attempt`, async () => {
            await unsuccessfulLogin(tc, username, password);
        });
    }
    //#endregion
});
