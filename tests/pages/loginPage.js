const { I, headerFrag } = inject();
const gmail = require('./../utils/email')

let pageTitleTxt = "Amazon Sign-In";
let emailField = "#ap_email";
let pwdField = "#ap_password";
let continueBtn = "span #continue";
let signInBtn = "#signInSubmit";
let otpField = 'input[name="code"]';

module.exports = {
  // insert your locators and methods here

  /**
   * 
   * @param {*} email Input email
   */
  inputEmail: function (email) {
    I.seeInTitle(pageTitleTxt);
    I.fillField(emailField, email);
    I.click(continueBtn);
  },

  /**
   * 
   * @param {*} pwd input password
   */
  inputPassword: function (pwd) {
    I.fillField(pwdField, secret(pwd));
    I.click(signInBtn);
  },

  inputToken: async function(){
    //Assert authentication required
    I.seeTextEquals("Authentication required", "h1");
    I.click(continueBtn);

    //Go to OTP screen
    //1. to handle TimeOut exception: it's better to sleep in 2s
    I.wait(2) 
    let token = await gmail.getOTPToken();
    //2. Enter OTP
    I.fillField(otpField, token);
    I.click(continueBtn)
  }
};
