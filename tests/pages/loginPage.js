const { I, headerFrag } = inject();

module.exports = {
  // insert your locators and methods here
  pageTitleTxt: "Amazon Sign-In",
  emailField: "#ap_email",
  pwdField: "#ap_password",
  continueBtn: "span #continue",
  signInBtn: "#signInSubmit",

  otpField: 'input[name="code"]',
  emailError: "#auth-email-missing-alert",
  pwdError: "#auth-password-missing-alert",

  inputEmail: async function (email) {
    headerFrag.goToSignIn();
    I.seeInTitle(this.pageTitleTxt);
    I.fillField(this.emailField, email);
    I.click(this.continueBtn);
    return await this.catchError(this.emailError);
  },

  inputPassword: async function (pwd) {
    I.waitInUrl("/ap/signin");
    I.fillField(this.pwdField, secret(pwd));
    I.click(this.signInBtn);
    return await this.catchError(this.pwdError);
  },

  catchError: async function (errorLoc) {
    let errorNum = await I.grabNumberOfVisibleElements(errorLoc);
    if (errorNum > 0) {
      return true;
    }
    return false;
  },
};
