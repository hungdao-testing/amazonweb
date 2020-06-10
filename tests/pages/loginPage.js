const { I } = inject();
const gmail = require("../utils/email");
const BasePage = require("./basePage");

class LoginPage extends BasePage {
  #pageTitleTxt = "Amazon Sign-In";
  #emailField = "#ap_email";
  #pwdField = "#ap_password";
  #continueBtn = "span #continue";
  #continueOTPBtn = "#a-autoid-0-announce";
  #signInBtn = "#signInSubmit";
  #otpField = 'input[name="code"]';
  #signInSuccessTxtLoc = '#nav-tools [data-nav-role="signin"] div[class="nav-line-1-container"]';


  constructor(){
    super();
  };

  /**
   *
   * @param {*} email Input email
   */
  inputEmail (email) {
    I.seeInTitle(super.getSelector(this.#pageTitleTxt));
    I.fillField(super.getSelector(this.#emailField), email);
    I.click(super.getSelector(this.#continueBtn));
  };

  /**
   *
   * @param {*} pwd input password
   */
  inputPassword (pwd) {
    I.fillField(super.getSelector(this.#pwdField), secret(pwd));
    I.click(super.getSelector(this.#signInBtn));
  };

  /**
   * Input OTP code fetched from gmail
   */
  async inputToken() {
    //Assert authentication required
    I.seeTextEquals("Authentication required", "h1");
    I.click(super.getSelector(this.#continueBtn));

    //Go to OTP screen
    //1. to handle TimeOut exception: it's better to sleep in 2s
    I.wait(2);
    let token = await gmail.getOTPToken();
    //2. Enter OTP
    I.fillField(super.getSelector(this.#otpField), token);
    I.click(super.getSelector(this.#continueOTPBtn));
  };

  /**
   * Assertion user logs-in to AWS successfully
   */
  verifyLoginSuccessfully() {
    //I.waitForVisible('#nav-logo');
    I.seeTextEquals(`Hello, ${process.env.name}`, super.getSelector(this.#signInSuccessTxtLoc));
  };
}

module.exports = LoginPage;
