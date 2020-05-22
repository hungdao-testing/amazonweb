const { I } = inject();

module.exports = {
  // insert your locators and methods here

  otpField: 'input[name="code"]',

  isFirstTimeLogin: function (isOTP) {
    if (isOTP) {
      getOTP();
      return;
    }
    login();
  },
};
