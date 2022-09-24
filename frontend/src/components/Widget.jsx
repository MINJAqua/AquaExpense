import "../css/Widget.css";
import { useEffect, useState } from "react";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BalanceIcon from '@mui/icons-material/Balance';



const Widget = ({ type, widgetName }) => {
  let data;
  let amount = 100;

  switch(type) {
    case 'account':
      data = {
        title: 'ACCOUNT',
        name: widgetName,
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
        {data.isMoney ? <span className='widget-money'>$ {amount}</span> : null}
        <span className='widget-link'>{data.link}</span>
      </div>
      <div className='right'>
        {data.icon}
      </div>
    </div>
  )
}

export default Widget