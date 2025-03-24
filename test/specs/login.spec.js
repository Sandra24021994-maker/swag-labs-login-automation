//region Pageobjects
const LoginPage = require('../pageobjects/login.page.js'); // Import login page 
const ErrorMessages = require('../pageobjects/loginErrorMessages.js'); // Import login error messages
const credentials = require('../pageobjects/loginCredentials.js'); // Import login credentials
//#endregion 

describe('Swag Labs - Login Page', () => {  

    beforeEach(async () => { 
        // Open the login page before each test
        await LoginPage.open(); 
    });

    it('should log in successfully with valid credentials', async () => { 
        // Log in with valid credentials
        await LoginPage.login(credentials.validUsername, credentials.validPassword);
        
        // Expected result: User should be redirected to the inventory page with the URL containing 'inventory.html'
        const pageUrl = await browser.getUrl();
        await expect(pageUrl).toContain('/inventory.html'); 
    }); 
    
    it('an error message should appear when an invalid username is provided', async () => {
        // Try to log in with an invalid username and valid password 
        await LoginPage.login(credentials.invalidValue, credentials.validPassword); 
        
        // Expected result: Displayed error message indicating that the username and password do not match any user in the service 
        const errorMessage = await LoginPage.getErrorMessage(); 
        await expect(errorMessage).toContain(ErrorMessages.usernameAndPasswordDoNotMatch);
    }); 
    
    it('an error message should appear when an invalid password is provided', async () => {
        // Try to log in with a valid username and an invalid password 
        await LoginPage.login(credentials.validUsername, credentials.invalidValue);  
        
        // Expected result: Displayed error message indicating that the username and password do not match any user in the service 
        const errorMessage = await LoginPage.getErrorMessage();
        await expect(errorMessage).toContain(ErrorMessages.usernameAndPasswordDoNotMatch);
    }); 
    
    it('an error message should appear when the username field is empty', async () => {
        // Try to log in without providing a username, but with a valid password 
        await LoginPage.login(credentials.emptyValue, credentials.validPassword); 

        // Expected result: Displayed error message indicating that the username field is required
        const errorMessage = await LoginPage.getErrorMessage();
        await expect(errorMessage).toContain(ErrorMessages.usernameRequired);
    }); 
    
    it('an error message should appear when the password field is empty', async () => {
        // Try to log in with a valid username, but without providing a password
        await LoginPage.login(credentials.validUsername, credentials.emptyValue); 
        
        // Expected result: Displayed error message indicating that the password field is required
        const errorMessage = await LoginPage.getErrorMessage();
        await expect(errorMessage).toContain(ErrorMessages.passwordRequired);
    }); 
    
    it('an error message should appear when both username and password fields are empty', async () => {
        // Try to log in without providing both a username and a password 
        await LoginPage.login(credentials.emptyValue, credentials.emptyValue); 
        
        // Expected result: Displayed error message indicating that the username is required
        const errorMessage = await LoginPage.getErrorMessage();
        await expect(errorMessage).toContain(ErrorMessages.usernameRequired);
    });  
    
    it('an error message should appear when invalid (case-sensitive) username and valid password are provided', async () => {
        // Try to log in with an invalid username (case-sensitive) and a valid password 
        await LoginPage.login(credentials.invalidUsernameCaseSensitive, credentials.validPassword);  
        
        // Expected result: Displayed error message indicating that the username and password do not match any user in the service
        const errorMessage = await LoginPage.getErrorMessage();
        await expect(errorMessage).toContain(ErrorMessages.usernameAndPasswordDoNotMatch);
    });
    
    it('an error message should appear when valid username and invalid (case-sensitive) password are provided', async () => {
        // Try to log in with a valid username and an invalid (case-sensitive) password
        await LoginPage.login(credentials.validUsername, credentials.invalidPasswordCaseSensitive); 
        
        // Expected result: Displayed error message indicating that the username and password do not match any user in the service
        const errorMessage = await LoginPage.getErrorMessage();
        await expect(errorMessage).toContain(ErrorMessages.usernameAndPasswordDoNotMatch);
    });   
     
    it('an error message should appear when invalid credentials are provided', async () => {
        // Try to log in with invalid credentials
        await LoginPage.login(credentials.invalidValue, credentials.invalidValue); 
        
        // Expected result: Displayed error message indicating that the username and password do not match any user in the service
        const errorMessage = await LoginPage.getErrorMessage();
        await expect(errorMessage).toContain(ErrorMessages.usernameAndPasswordDoNotMatch);
    });

});


