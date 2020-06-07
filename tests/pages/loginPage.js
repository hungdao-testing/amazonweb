const { I } = inject();
const gmail = require('./../utils/email')

let pageTitleTxt = "Amazon Sign-In";
let emailField = "#ap_email";
let pwdField = "#ap_password";
let continueBtn = "span #continue";
let continueOTPBtn = "#a-autoid-0-announce";
let signInBtn = "#signInSubmit";
let otpField = 'input[name="code"]';
let signInSuccessTxtLoc = '#nav-tools [data-nav-role="signin"] div[class="nav-line-1-container"]'

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

  /**
   * Input OTP code fetched from gmail
   */
  inputToken: async function(){
    //Assert authentication required
    I.seeTextEquals("Authentication required", "h1");
    I.click(continueBtn);

    //Go to OTP screen
    //1. to handle TimeOut exception: it's better to sleep in 2s
    I.wait(2) 
    let token = await gmail.getOTPToken()
    //2. Enter OTP
    I.fillField(otpField, token);
    I.click(continueOTPBtn)
  },

  /**
   * Assertion user logs-in to AWS successfully
   */
  verifyLoginSuccessfully: function(){
    //I.waitForVisible('#nav-logo');
    I.seeTextEquals(`Hello, ${process.env.name}`, signInSuccessTxtLoc)
  }
};
