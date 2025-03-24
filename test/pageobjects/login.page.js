const Page = require('./Page'); 

class LoginPage extends Page {  
      
    // Open the Login page
    async open() {
        return super.open('');  
    } 

    //region Locators  
    // Username field
    get usernameField() { return $('#user-name'); }
    // Password field
    get passwordField() { return $('#password'); } 
    // Login button
    get loginButton() { return $('#login-button'); } 
    // Error message container
    get errorMessage() { return $('h3[data-test="error"]'); }  
    //#endregion

    // Login method
    async login(username, password) {
        await this.usernameField.setValue(username);
        await this.passwordField.setValue(password);
        await this.loginButton.click();
    } 
     // Method to get the error message text
     async getErrorMessage() {
        return await this.errorMessage.getText(); // Returns the error message text
    }
}

module.exports = new LoginPage();
