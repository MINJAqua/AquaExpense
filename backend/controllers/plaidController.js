const asyncHandler = require("express-async-handler");
const moment = require("moment");
const User = require("../models/userModel");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});
const plaidClient = new PlaidApi(configuration);

const createToken = asyncHandler(async (req, res) => {
  console.log("createToken function has started");
  const { email } = req.body;

  //find user in the database
  const user = await User.findOne({ email });

  //grab the unique id for the user
  const clientUserId = user._id.toString();
  console.log("This is the clientUserId", clientUserId);

  //This request object gets plugged into plaidClient.linkTokenCreate
  const request = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: clientUserId,
    },
    client_name: "Plaid Test App",
    products: ["transactions"],
    language: "en",
    // webhook: "https://webhook.example.com",
    // redirect_uri: "http://localhost:3000",
    country_codes: ["US"],
  };

  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(request);
    console.log("Your new link_token", createTokenResponse.data.link_token);
    res.json({ link_token: createTokenResponse.data.link_token });
  } catch (error) {
    // handle error
    console.log(error);
  }
});

//Finally works and exchanges public token
//stored in out local storage for an access token

const getAccessToken = asyncHandler(async (req, res) => {
  const { email, publicToken } = req.body;
  console.log(req.body);

  const request = {
    public_token: publicToken,
  };

  try {
    const response = await plaidClient.itemPublicTokenExchange(request);
    const responseData = response.data;

    await User.findOneAndUpdate(
      { email: email },
      { access_token: response.data.access_token }
    );

    //console.log(responseData);
    res.send(responseData);
  } catch (error) {
    console.log(error);
  }
});

const getTransactions = asyncHandler(async (req, res) => {
  const access_token = "access-sandbox-132460ac-f669-4234-bce2-235715ee3d84";
  const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");

  const transactionResponse = await plaidClient.transactionsGet({
    access_token: access_token,
    start_date: startDate,
    end_date: endDate,
    options: { count: 10 },
  });
  res.json(transactionResponse.data);
});

module.exports = { createToken, getTransactions, getAccessToken };
