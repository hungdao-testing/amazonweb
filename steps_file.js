// in this file you can append custom step methods to 'I' object
const { loginPage, headerFrag } = inject();

let emailErrorLoc = "#auth-email-missing-alert";
let pwdErrorLoc = "#auth-password-missing-alert";
let credentialErrorLoc = "#auth-warning-message-box";
let otpErrorLoc = 'a-alert-content'

module.exports = function () {
  return actor({
    // Define custom steps here, use 'this' to access default methods of this.
    // It is recommended to place a general 'login' function here.

    /**
     * 
     * @param {*} errorLoc Verify if there is error or not.
     * Return true if have error.
     */
    catchError: async function (errorLoc) {
      let errorNum = await this.grabNumberOfVisibleElements(errorLoc);
      if (errorNum > 0) {
        return true;
      }
      return false;
    },

    /**
     * 
     * @param {String} email Input email
     * @param {String} password Input password
     * 
     * The login workflow including checking error.
     */
    login: async function (email, password) {
      this.amOnPage("/");
      headerFrag.goToSignIn();

      //Login screen
      loginPage.inputEmail(email);
      let isEmailError = await this.catchError(emailErrorLoc);
      if (isEmailError) {
        this.say("There is an error in email page");
        return isEmailError;
      }
      if (!password) {
        this.say("Forgot entering password");
        return true;
      }

      //Password screen
      loginPage.inputPassword(password);
      this.waitForNavigation();
      let isCredentialError = await this.catchError(credentialErrorLoc);
      if (isCredentialError) {
        this.say("Your input credential is wrong");
        return isCredentialError;
      }
      
      //OTP screen
      await this.inputToken();
      let isOTPError = await this.catchError(otpErrorLoc);
      if(isOTPError){
        this.say("Something went wrong with your OTP");
        return isOTPError;
      }
      pause()
    },
  });
};
