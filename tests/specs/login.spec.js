Feature("Login");

Scenario(
  "Verify user could login to system with valid credentials",
  async (I, loginPage) => {
    I.login("learningandworking2017@gmail.com", "Learning+Working2017");
    I.seeTextEquals("Authentication required", "h1"); //temporarily, could not handle get OTP from email
  }
);

Scenario(
  "Verify user could not login to system with invalid email",
  async (I) => {
    let isError = await I.login("", "learningandworking2017");
    I.assertEqual(isError, true);
  }
);

Scenario(
  "Verify user could not login to system with invalid password",
  async (I) => {
    let isError = await I.login("learningandworking2017@gmail.com", "");
    I.assertEqual(isError, true);
  }
);
