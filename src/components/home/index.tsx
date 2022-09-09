import { FC, useEffect, useState } from "react";
import browser from 'webextension-polyfill'
import Helper from '../../js/helper';
import Logo2 from "../svg/logo2";
import Copy from '../svg/copy'
import Dash from "../svg/dash";
import Setting from "../svg/setting";
import Ext from "../svg/ext";
import Github from "../svg/github";
import Twitter from "../svg/twitter";
import { LINK_HTTP } from "../../js/config";

import './index.css'

const Home: FC = () => {
  const [isOpenExt, setOpenExt] = useState(true)
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')

  useEffect(() => {
    browser.storage.local.get(['ext_status', 'account', 'balance']).then(({ ext_status, account, balance }) => {
      setOpenExt(ext_status)
      setAccount(account || '0x...')
      setBalance(balance || '0')
    }); 
  })

  return (
    <div className="home-content">
      <div className="header">
        <Logo2 />
        <div className="network">
          <div className="status"></div>
          <div className="net-name">Ethereum Mainet</div>
        </div>
      </div>
      <div className="account-wrp">
        <div className="left"></div>
        <div className="right">
          <div className="name">Account1</div>
          <div className="account">
            <div className="address">{Helper.formatAddress(account)}</div>
            <div
              className="copy"
              onClick={() => {
                Helper.copyTextToClipboard(account)
                alert('Copied!')
              }}
            >
              <Copy />
            </div>
          </div>
        </div>
      </div>
      <div className="blance-wrp">
        <div className="t">Total Earnings</div>
        <div className="balance">
          <div className="num">{(Number(balance) / Math.pow(10, 12)).toFixed(2)}</div>
          <div className="unit">AMD</div>
        </div>
      </div>
      <div className="web-btns">
        <div
          className="item"
          onClick={() => {
            Helper.goWeb(`${LINK_HTTP}dashboard`)
          }}
        >
          <Dash />
          <div className="label">Go to dashboard</div>
        </div>
        <div
          className="item"
          onClick={() => {
            Helper.goWeb(`${LINK_HTTP}settings`)
          }}>
          <Setting />
          <div className="label">Settings</div>
        </div>
      </div>
      <div className="switch-wrp">
        <div className="left">
          <Ext />
          <div className="l">Enable/disable AdMeta Extension</div>
        </div>
        <div className="right">
          {
            isOpenExt
              ?
              <div
                className="open"
                onClick={() => {
                  Helper.goWeb(`${LINK_HTTP}settings`)
                }}
              >
                <div className="d"></div>
              </div>
              :
              <div
                className="close"
                onClick={() => {
                  Helper.goWeb(`${LINK_HTTP}settings`)
                }}>
                <div className="d"></div>
              </div>
          }
        </div>
      </div>
      <div className="link-wrp">
        <Twitter
          handleClick={() => {
            Helper.goWeb('https://twitter.com/AdMetaNetwork')
          }}
        />
        <div className="grap"></div>
        <Github
          handleClick={() => {
            Helper.goWeb('https://github.com/AdMetaNetwork')
          }}
        />
      </div>
    </div>
  )
}

export default Home;