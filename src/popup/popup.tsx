import ReactDOM from 'react-dom';
import { FC, useEffect, useState } from "react";
import Start from '../components/start/index'
import Home from '../components/home';
import browser from 'webextension-polyfill'

import './index.css'

const Popup: FC = () => {
  const [isFirstInstall, setFirstInstall] = useState(true)

  useEffect(() => {
    browser.storage.local.get(['first_install']).then(({ first_install }) => {
      setFirstInstall(!!!first_install)
    }); 
  })

  return (
    <div className='admeta-popup'>
      {
        isFirstInstall
          ?
          <Start />
          :
          <Home />
      }
    </div>
  )
}

ReactDOM.render(<Popup />, document.getElementById('popup'));