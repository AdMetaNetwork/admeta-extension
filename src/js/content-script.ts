import browser from 'webextension-polyfill'
import Messenger from "./messenger";
import { ADMETA_MSG_AD_PUSH, ADMETA_MSG_NFT_PUSH, ADMETA_MSG_NFT_CLAIM } from './config'
import { pushAdCard, pushNftCard, pushClaimCard } from './ui'
import Helper from './helper';
class ContentScript {

  listenForMessages() {
    browser.runtime.onMessage.addListener((message, sender) => {
      const { type, data } = message;
      this.handleDealMessages(type, data)
    });
  }

  getNftHold() {
    const address = localStorage.getItem('ajs_user_id')!.replace(/\"/g, "");
    const pathname = location.pathname
    const p = pathname.split('/')
    console.log(p[p.length - 1], p[p.length - 2])
    const contractaddress = p[p.length - 2]
    const tokenID = p[p.length - 1]
    if (contractaddress && !contractaddress.includes('0x')) {
      return
    }
    Helper.apiCall({
      URI: `https://api.etherscan.io/api`,
      full_url: true,
      method: 'GET',
      params: {
        module: 'account',
        action: 'tokennfttx',
        contractaddress: '0xe361f10965542ee57d39043c9c3972b77841f581',
        apikey: '3S92QDIPUN5FYSNGYKB26USKKVQZ23N764',
        address: address,
        page: '1',
        offset: '10'
      }
    }).then((v) => {
      v.json().then((c) => {
        const isHold = c.result.some((v: any) => { return v.tokenID === tokenID })
        if (isHold) {
          pushClaimCard()
        }
      })
    })
  }

  handleDealMessages(type: string, data: any) {
    switch (type) {
      case ADMETA_MSG_AD_PUSH:
        pushAdCard(data.message.callbackLink.includes('youtube') ? 'VIDEO' : 'PICTURE', data.message.callbackLink, data.message.metadata, data.message.id, data.address)
        break;
      case ADMETA_MSG_NFT_PUSH:
        pushNftCard()
        break;

      case ADMETA_MSG_NFT_CLAIM:
        this.getNftHold();
        break;

      default:
        break;
    }
  }

  listenWebPageMessages() {
    window.addEventListener("message", async function (msg) {
      Messenger.sendMessageToBackground(msg.data.type, msg.data.data)
    })
  }

  init() {
    // Listen for messages from background and run the listener from the map
    this.listenForMessages();

    // Listen for messages from web page
    this.listenWebPageMessages();
  }

}

new ContentScript().init()