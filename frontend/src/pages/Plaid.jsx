import React, { useCallback, useState, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
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
const exchangeTokenEndpoint = "http://localhost:8000/api/plaid/exchange";

const PlaidLink = () => {
  const [token, setToken] = useState(null);
  const [accessToken, setAccess_Token] = useState("");
  const navigate = useNavigate();
  const email = localStorage.email;

  // get a link_token from your API when component mounts
  const createLinkToken = async () => {
    try {
      const response = await axios.post("/api/plaid", { email });
      const link_token = response.data.link_token;
      console.log("Your link_token is", link_token);
      setToken(link_token);
    } catch (error) {
      console.log(error, "YOU FAILED TO GET A TOKEN");
    }
  };

  const exchangeToken = async (publicToken) => {
    const email = localStorage.email;
    console.log(publicToken);
    try {
      const response = await axios.post(exchangeTokenEndpoint, {
        publicToken,
        email,
      });
      const responseData = response.data;
      console.log("response data", responseData);

      const access_Token = responseData.access_token;
      setAccess_Token(access_Token);

      navigate('/dashboard')
    } catch (error) {
      console.log(error, "YOU FAILED TO GET ACCESS TOKEN");
    }
  };

  useEffect(() => {
    createLinkToken();
  }, []);

  const onSuccess = useCallback((publicToken, metadata) => {
    //console.log(publicToken);

    exchangeToken(publicToken);
    localStorage.setItem("render", true);
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
