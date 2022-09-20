import React, { useCallback, useState, useEffect } from "react";
import axios from "../axios";
import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from "react-plaid-link";

//use these varibles when making an axios request to avoid long url
const transactionsEndpoint =
  "http://localhost:8000/api/create_link_token/transactions/get";
const accessTokenEndpoint =
  "http://localhost:8000/api/create_link_token/items/public_token/exchange";

const PlaidLink = () => {
  const [token, setToken] = useState(null);
  const email = localStorage.email;

  // get a link_token from your API when component mounts
  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await axios.post("/api/create_link_token", { email });
        const link_token = response.data.link_token;
        console.log("Your link_token is", link_token);
        setToken(link_token);
      } catch (error) {
        console.log(error, "YOU FAILED TO GET A TOKEN");
      }
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback((publicToken, metadata) => {
    //meta data will contain all the information about the accounts you selected
    console.log(publicToken, metadata);

    // After we get our public token, we need to exchange it for an access token
    // before we can make the request to get transactions. Check out the API docs
    // to see how to hit the correct endpoint.
    // https://plaid.com/docs/api/tokens/#itempublic_tokenexchange

    //After we get our access token we need to call an axios request for transactions
    //Check out the API docs to see how to hit the correct endpoint.
    //https://plaid.com/docs/api/products/transactions/#transactionsget
  }, []);

  const config = {
    token,
    onSuccess,
    // onEvent,
    // onExit,
  };

  const {
    open,
    ready,
    // error,
    // exit
  } = usePlaidLink(config);

  return (
    <div>
      <button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </button>
      <div>testing plaid here</div>
    </div>
  );
};
export default PlaidLink;

//DO NOT WORRY ABOUT THESE CALLBACK FUNCTIONS YET

// const onEvent = useCallback((eventName, metadata) => {
//     // log onEvent callbacks from Link
//     // https://plaid.com/docs/link/web/#onevent
//     console.log(eventName, metadata);
// }, []);

// const onExit = useCallback((error, metadata) => {
//     // log onExit callbacks from Link, handle errors
//     // https://plaid.com/docs/link/web/#onexit
//     console.log(error, metadata);
// }, []);
