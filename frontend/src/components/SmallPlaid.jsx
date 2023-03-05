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

const SmallPlaidLink = () => {
  const [token, setToken] = useState(null);

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

  const onSuccess = useCallback((publicToken, metadata) => {
    const exchangeToken = async (publicToken) => {
      const email = localStorage.email;
      try {
        const response = await axios.post("/api/plaid/exchange", {
          publicToken,
          email,
        });
        const responseData = response.data;

        const transactionsResponse = await axios.get(
          "/api/plaid/transactions",
          { params: { email: email } }
        );

        const userPlaidAccounts = transactionsResponse.data.accounts.map(
          ({ balances, ...accountData }) => ({
            ...accountData,
            balances: balances.current,
          })
        );

        const userPlaidTransactions =
          transactionsResponse.data.transactions.map(
            ({
              account_id,
              amount,
              iso_currency_code,
              category,
              category_id,
              date,
              name,
              merchant_name,
              pending,
            }) => ({
              account_id,
              amount,
              iso_currency_code,
              category: category[0],
              category_id,
              date,
              name,
              merchant_name,
              pending,
            })
          );

        await axios.post("/api/account/plaidAccount", {
          accounts: userPlaidAccounts,
          email: email,
        });

        await axios.post("/api/expense/plaidExpense", {
          expenses: userPlaidTransactions,
        });

        window.location.reload();
      } catch (error) {
        console.log(error, "YOU FAILED TO GET ACCESS TOKEN");
      }
    };
    exchangeToken(publicToken);
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
