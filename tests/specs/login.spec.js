Feature("Login").tag("@login");

Before((I) => {
  I.clearCookie();
});

Scenario(
  "Verify user could login to system with valid credentials",
  async (I) => {
    await I.login(process.env.email, process.env.pwd);
  }
).tag("@valid").tag("@smoke")

let accounts = new DataTable(["email", "password", "case"]); //
accounts.add(["", "123456", "Don't enter email"]); // adding records to a table
accounts.add(["buyer.nvg01@gmail.com", "", "Don't enter password"]); // adding records to a table
accounts.add(["buyer.nvg01@gmail.com", "123456", "Incorrect credentials"]); // adding records to a table
Data(accounts)
  .Scenario("Test Login", async (I, current) => {
    I.say(`Verify Login feature in case ${current.case}`);
    let isError = await I.login(current.email, current.password);
    I.assertEqual(isError, true);
  })
  .tag("@invalid");
