// in this file you can append custom step methods to 'I' object
const { loginPage, headerFrag } = inject();

let emailErrorLoc = "#auth-email-missing-alert";
let pwdErrorLoc = "#auth-password-missing-alert";
let credentialErrorLoc = "#auth-warning-message-box";

module.exports = function () {
  return actor({
    // Define custom steps here, use 'this' to access default methods of this.
    // It is recommended to place a general 'login' function here.

    catchError: async function (errorLoc) {
      let errorNum = await this.grabNumberOfVisibleElements(errorLoc);
      if (errorNum > 0) {
        return true;
      }
      return false;
    },

    login: async function (username, password) {
      this.amOnPage("/");
      headerFrag.goToSignIn();
      loginPage.inputEmail(username);
      let isEmailError = await this.catchError(emailErrorLoc);
      if (isEmailError) {
        this.say("There is an error in email page");
        return isEmailError;
      }
      loginPage.inputPassword(password);
      if (!password) {
        this.say("Forgot entering password");
        return true;
      }
      this.waitForNavigation();
      let isCredentialError = await this.catchError(credentialErrorLoc);
      if (isCredentialError) {
        this.say("Your input credential is wrong");
        return isCredentialError;
      }
    },
  });
};
