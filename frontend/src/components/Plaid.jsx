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
import "../css/Plaid.css";
import { FaChevronRight } from "react-icons/fa";

const PlaidLink = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  // get a link_token from your API when component mounts
  useEffect(() => {
    const email = localStorage.email;
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
    createLinkToken();
  }, []);

  const onSuccess = useCallback(
    (publicToken, metadata) => {
      const exchangeToken = async (publicToken) => {
        const email = localStorage.email;
        console.log(publicToken);
        try {
          const response = await axios.post("/api/plaid/exchange", {
            publicToken,
            email,
          });
          const responseData = response.data;
          console.log("response data", responseData);
          navigate("/dashboard");
        } catch (error) {
          console.log(error, "YOU FAILED TO GET ACCESS TOKEN");
        }
      };
      exchangeToken(publicToken);
    },
    [navigate]
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
    <div>
      {console.log(process.env)}
      <button className="plaid-button" onClick={() => open()} disabled={!ready}>
        <span className="button-wrapper">
          <span className="button-text">Connect using Plaid</span>
          <span className="button-pic">
            <i className="arrow-icon">
              <FaChevronRight />
            </i>
          </span>
        </span>
      </button>
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
