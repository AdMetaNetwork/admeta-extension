import { FC, useEffect, useState, useMemo } from "react";
import browser from 'webextension-polyfill'
import Helper from '../../js/helper';
import Logo2 from "../svg/logo2";
import Copy from '../svg/copy'
import Dash from "../svg/dash";
import Setting from "../svg/setting";
import Ext from "../svg/ext";
import Github from "../svg/github";
import Twitter from "../svg/twitter";
import { ADMETA_MSG_ACCOUNT, ADMETA_MSG_EXTENISON_CALL_ADDRESS, ADMETA_MSG_SYNCDATA_TO_CONTENT, LINK_HTTP } from "../../js/config";

import './index.css'
import Messenger from "../../js/messenger";

const Home: FC = () => {
  const [isOpenExt, setOpenExt] = useState(true)
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')

  useEffect(() => {
    browser.storage.local.get(['ext_status', 'account', 'balance']).then(({ ext_status, account, balance }) => {
      setOpenExt(ext_status)
      setAccount(account || '')
      setBalance(balance || '0')
    });
  }, [])

  useEffect(() => {
    const syncData = async () => {
      const { tabId } = await Helper.getOriginInfo()
      if (!tabId) return
      const { score } = await browser.storage.local.get(['score'])
      console.log(JSON.stringify({
        AI: 0,
        DID: 0,
        DeFi: 0,
        GameFi: 0,
        Metaverse: 0,
        NFT: 0,
        OnChainData: 0
      }))
      if (JSON.stringify(score) === JSON.stringify({
        AI: 0,
        DID: 0,
        DeFi: 0,
        GameFi: 0,
        Metaverse: 0,
        NFT: 0,
        OnChainData: 0
      })) {
        return
      }

      Messenger.sendMessageToContentScript(tabId, ADMETA_MSG_SYNCDATA_TO_CONTENT, score)
      browser.storage.local.set({
        score: {
          DeFi: 0,
          GameFi: 0,
          NFT: 0,
          Metaverse: 0,
          OnChainData: 0,
          AI: 0,
          DID: 0,
        }
      })
    }

    syncData()

  }, [])

  return (
    <div className="home-content">
      <div className="header">
        <Logo2 />
        <div className="network">
          <div className="status"></div>
          <div
            className="net-name"
            onClick={() => {
              browser.storage.local.set({ pushDate: '' })
            }}
          >Ethereum Sepolia</div>
        </div>
      </div>
      <div className="account-wrp">
        <div className="left"></div>
        <div className="right">
          <div className="name">Account1</div>
          {
            account
              ?
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
              :
              <div
                className="address"
                style={{ color: 'blue' }}
                onClick={async () => {
                  const { tabId } = await Helper.getOriginInfo()
                  await Messenger.sendMessageToContentScript(tabId!, ADMETA_MSG_EXTENISON_CALL_ADDRESS)
                  browser.storage.local.get(['account']).then(({ account }) => {
                    setAccount(account || '')
                  })
                }}
              >Sync Address</div>
          }

        </div>
      </div>
      <div className="blance-wrp">
        <div className="t">Total Earnings</div>
        <div className="balance">
          <div className="num">{balance}</div>
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