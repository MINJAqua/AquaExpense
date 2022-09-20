const asyncHandler = require("express-async-handler");
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
  try {
    console.log("req.body = ", req.body);
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: req.body.public_token,
    });

    // FOR DEMO PURPOSES ONLY
    // You should really store access tokens in a database that's tied to your
    // authenticated user id.
    console.log(`Exchange response: ${JSON.stringify(exchangeResponse.data)}`);

    res.json("true");
  } catch (err) {
    console.log(err);
  }
});

const getTransactions = asyncHandler(async (req, res) => {
  const access_token = req.session.access_token;
  const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");

  const transactionResponse = await client.transactionsGet({
    access_token: access_token,
    start_date: startDate,
    end_date: endDate,
    options: { count: 10 },
  });
  res.json(transactionResponse.data);
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
