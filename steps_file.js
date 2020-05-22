// in this file you can append custom step methods to 'I' object
const dotenv = require("dotenv").config();
const { headerFrag } = inject();

module.exports = function () {
  const pageTitleTxt = "Amazon Sign-In";
  let emailField = "#ap_email";
  let pwdField = "#ap_password";
  let continueBtn = "span #continue";
  let signInBtn = "#signInSubmit";
  let accNameInHeader = "#nav-link-accountList .nav-line-1";

  return actor({
    // Define custom steps here, use 'this' to access default methods of this.
    // It is recommended to place a general 'login' function here.

    login: async function () {
      this.amOnPage("/");
      headerFrag.goToSignIn();
      this.seeInTitle(pageTitleTxt);
      this.fillField(emailField, process.env.email);
      this.click(continueBtn);
      this.waitInUrl("/ap/signin");
      this.fillField(pwdField, secret(process.env.pwd));
      this.click(signInBtn);
      //pause();
      this.waitForElement(accNameInHeader);
      //let welcomeUserStr = await this.grabValueFrom(accNameInHeader);
      this.assertEqual(welcomeUserStr, `Hello, ${process.env.name}`);
    },

    registerAccount: async function () {
      let mailbox = await this.haveNewMailbox();
      console.log(mailbox);
      this.amOnPage("/");
      headerFrag.goToSignIn();
      this.click("#auth-create-account-link");
      this.wait(2);
      this.fillField("#ap_customer_name", `nvg_${mailbox.id}`);
      this.click("#ap_email");
      this.fillField("#ap_email", mailbox.emailAddress);
      this.click("#ap_password");
      this.fillField("#ap_password", secret("12345678x@X"));
      this.click("#ap_password_check");
      this.fillField("#ap_password_check", secret("12345678x@X"));
      this.click("#continue");
      this.wait(3);
      let emails = await this.grabAllEmailsFromMailbox(mailbox);
      console.log(emails);
    },
  });
};
