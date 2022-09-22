import React, { useState, useEffect } from "react";
import axios from "../axios";
import TransactionTable from '../components/TransactionTable';

const Dashboard = () => {
  const [transactions, setTransactions] = useState({});

   useEffect(() => {
    const getTransactions = async () => {
      const email = localStorage.email
      try {
        const transactionsResponse = await axios.get("/api/plaid/transactions", {params: {email: email} });
        const userTransactions = transactionsResponse.data;
        setTransactions(userTransactions);
      } catch (error) {
        console.log(error, "FAILED TO GET ACCESS TOKEN OR TRANSACTIONS");
      }
    }
    getTransactions();
  }, []);

  return (
    <div className='dashboard'>
      <TransactionTable transactions={transactions}/>
    </div>
  )
}

export default Dashboard
