import ReactDOM from 'react-dom';
import { FC, useEffect, useState } from "react";
import browser from 'webextension-polyfill'

const Popup: FC = () => {
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')

  useEffect(() => {
    browser.storage.local.get(['account', 'balance']).then(({account, balance}) => {
      setAccount(account)
      setBalance(balance)
    });
  }, [])

  return (
    <div>
      <div>account: {account}</div>
      <div>balance: {balance} <strong style={{color: '#fec400'}}>AMD</strong></div>
    </div>
  )
}

ReactDOM.render(<Popup />, document.getElementById('popup'));