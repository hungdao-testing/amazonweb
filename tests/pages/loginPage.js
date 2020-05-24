const { I, headerFrag } = inject();

let pageTitleTxt = "Amazon Sign-In";
let emailField = "#ap_email";
let pwdField = "#ap_password";
let continueBtn = "span #continue";
let signInBtn = "#signInSubmit";
let otpField = 'input[name="code"]';

module.exports = {
  // insert your locators and methods here

  inputEmail: function (email) {
    I.seeInTitle(pageTitleTxt);
    I.fillField(emailField, email);
    I.click(continueBtn);
  },

  inputPassword: function (pwd) {
    I.fillField(pwdField, secret(pwd));
    I.click(signInBtn);
  },
};
