const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const TOKEN_PATH = `${process.cwd()}/credentials/token.json`;
const credentialPath = `${process.cwd()}/credentials/client_secret.json`;

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials) => {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  return new Promise((resolve, reject) => {
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      resolve(oAuth2Client);
    });
  });
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Get the recent email from your Gmail account
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getRecentEmail(auth, queryString) {
  const gmail = google.gmail({ version: "v1", auth });
  return new Promise((resolve, reject) => {
    gmail.users.messages.list(
      {
        auth: auth,
        userId: "me",
        maxResults: 1,
        labelIds: ["INBOX"],
        q: queryString,

      },
      (err, response) => {
        if (err) reject("The API returned an error: " + err);

        // Get the message id which we will need to retreive tha actual message next.
        let message_id;
        try {
          message_id = response["data"]["messages"][0]["id"];
        } catch (error) {
          throw error;
        }
        gmail.users.messages.get(
          { auth: auth, userId: "me", id: message_id },
          function (err, response) {
            if (err) {
              return reject("The API returned an error: " + err);
            }
            resolve(response["data"].snippet);
          }
        );
      }
    );
  });
}

/**
 * Query latest email from 'from: account-update@amazon.com' and get OTP code
 */
exports.getOTPToken = async function () {
  let queryString = "in:inbox from:account-update@amazon.com ";
  const cred = JSON.parse(fs.readFileSync(credentialPath, "utf-8"));
  const auth = await authorize(cred).catch((e) =>
    console("Cannot authorization because of: ", e)
  );
  let otpEmail = await getRecentEmail(auth, queryString).catch((e) =>
    console.log("Cannot read email because of: ", e)
  );
  console.log("OTP Email: ", otpEmail);
  let otpCode = otpEmail
    .match(/(One Time Password \(OTP\):)(.\d{6})/)[2]
    .trim();

  return otpCode;
};