const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const createToken = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email });
  const clientUserId = user._id;
  const request = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: clientUserId,
    },
    client_name: "Plaid Test App",
    products: ["auth"],
    language: "en",
    webhook: "https://webhook.example.com",
    redirect_uri: "https://domainname.com/oauth-page.html",
    country_codes: ["US"],
  };
  try {
    const createTokenResponse = await client.linkTokenCreate(request);
    response.json(createTokenResponse.data);
  } catch (error) {
    // handle error
  }
});

module.exports = { createToken };
