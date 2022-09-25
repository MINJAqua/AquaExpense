import "../css/Widget.css";
import { useEffect, useState } from "react";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BalanceIcon from '@mui/icons-material/Balance';

const Widget = ({ type, account, transactions}) => {
  const accountName = account.name;
  const AccountBalance = account.balances.available || account.balances.current;

  const totalTransactions = () => {
    let count = 0;
    transactions.forEach(transaction => {
      if (transaction.account_id === account.account_id) {
        count++;
      }
    })
    return count;
  };

  let data;
  switch(type) {
    case 'account':
      data = {
        title: 'ACCOUNT',
        name: accountName,
        isMoney: false,
        link: 'See all accounts',
        icon: (
          <AccountBalanceIcon className='widget-icon' style={{
            color: 'crimson',
            backgroundColor: 'rgba(255, 0, 0, 0.2)'
          }}/>
        )
      };
      break;
      case 'transactions':
      data = {
        title: 'TOTAL TRANSACTIONS',
        count: totalTransactions(),
        isMoney: false,
        link: 'See all transactions',
        icon: (
          <CurrencyExchangeIcon className='widget-icon' style={{
            color: 'green',
            backgroundColor: 'rgba(9, 237, 17, 0.2)'
          }}/>
        )
      };
      break;
      case 'balance':
      data = {
        title: 'BALANCE',
        isMoney: true,
        amount: AccountBalance,
        link: 'details',
        icon: (
          <BalanceIcon className='widget-icon' style={{
            color: 'gold',
            backgroundColor: 'rgba(248, 232, 6, 0.3)'
          }}/>
        )
      };
      break;
      defualt:
      break;
  }

  return(
    <div className='widget'>
      <div className='left'>
        <span className='widget-title'>{data.title}</span>
        {data.name ? <span className='widget-name'>{data.name}</span> : null}
        {data.isMoney && data.amount !== null ? <span className='widget-money'>$ {data.amount}</span> : null}
        {data.count !== null ? <span className='widget-transactions'>{data.count}</span> : null}
        <span className='widget-link'>{data.link}</span>
      </div>
      <div className='right'>
        {data.icon}
      </div>
    </div>
  )
}

export default Widget