// in this file you can append custom step methods to 'I' object
const { loginPage } = inject();
module.exports = function () {
  return actor({
    // Define custom steps here, use 'this' to access default methods of this.
    // It is recommended to place a general 'login' function here.

    login: async function (username, password) {
      this.amOnPage("/");
      let isEmailError = await loginPage.inputEmail(username);
      if (isEmailError) {
        return isEmailError;
      }
      let isPwdError = loginPage.inputPassword(password);
      if (isPwdError) {
        return isPwdError;
      }
    },
  });
};
