import React, { useCallback, useState, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import {
  usePlaidLink,
  //PlaidLinkOnSuccess,
  //PlaidLinkOnEvent,
  //PlaidLinkOnExit,
  //PlaidLinkOptions,
} from "react-plaid-link";
import "../css/SmallPlaid.css";
import { FaChevronRight } from "react-icons/fa";

const SmallPlaidLink = ({ setAccounts, setAccount, setTransactions }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  // get a link_token from your API when component mounts
  useEffect(() => {
    const email = localStorage.email;
    const createLinkToken = async () => {
      try {
        const response = await axios.post("/api/plaid", { email });
        const link_token = response.data.link_token;
        setToken(link_token);
      } catch (error) {
        console.log(error, "YOU FAILED TO GET A TOKEN");
      }
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback(
    (publicToken, metadata) => {
      const exchangeToken = async (publicToken) => {
        const email = localStorage.email;
        try {
          const response = await axios.post("/api/plaid/exchange", {
            publicToken,
            email,
          });
          const responseData = response.data;
          console.log("response data", responseData);
          const transactionsResponse = await axios.get(
            "/api/plaid/transactions",
            { params: { email: email } }
          );
          const userTransactions = transactionsResponse.data;

          setTransactions(userTransactions.transactions);
          setAccounts(userTransactions.accounts);
          setAccount(userTransactions.accounts[0]);

          navigate("/dashboard");
        } catch (error) {
          console.log(error, "YOU FAILED TO GET ACCESS TOKEN");
        }
      };
      exchangeToken(publicToken);
    },
    [navigate, setAccount, setAccounts, setTransactions]
  );

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
    <button
      className="small-plaid-button"
      onClick={() => open()}
      disabled={!ready}
    >
      <span className="small-button-wrapper">
        <span className="small-button-text">Plaid</span>
        <span className="small-button-pic">
          <i className="small-arrow-icon">
            <FaChevronRight />
          </i>
        </span>
      </span>
    </button>
  );
};
export default SmallPlaidLink;

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
