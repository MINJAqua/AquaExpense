const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.SECRET,
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

const getAccessToken = asyncHandler(async (req, res) => {
  // const request: ItemPublicTokenExchangeRequest = {
  //   public_token: publicToken,
  // };
  // try {
  //   const response = await plaidClient.itemPublicTokenExchange(request);
  //   const accessToken = response.data.access_token;
  //   const itemId = response.data.item_id;
  // } catch (err) {
  //   // handle error
  // }
});

const getTransactions = asyncHandler(async (req, res) => {
  // const request = {
  //   access_token: accessToken,
  //   start_date: '2018-01-01',
  //   end_date: '2020-02-01'
  // };
  // try {
  //   const response = await client.transactionsGet(request);
  //   let transactions = response.data.transactions;
  //   const total_transactions = response.data.total_transactions;
  //   // Manipulate the offset parameter to paginate
  //   // transactions and retrieve all available data
  //   while (transactions.length < total_transactions) {
  //     const paginatedRequest: TransactionsGetRequest = {
  //       access_token: accessToken,
  //       start_date: '2018-01-01',
  //       end_date: '2020-02-01',
  //       options: {
  //         offset: transactions.length,
  //       },
  //     };
  //     const paginatedResponse = await client.transactionsGet(paginatedRequest);
  //     transactions = transactions.concat(
  //       paginatedResponse.data.transactions,
  //     );
  //   }
  // } catch((err) => {
  //   // handle error
  // }
});

module.exports = { createToken, getTransactions, getAccessToken };
