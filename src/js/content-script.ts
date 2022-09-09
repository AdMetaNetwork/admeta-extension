import browser from 'webextension-polyfill'
import Messenger from "./messenger";
import { ADMETA_MSG_ACCOUNT, ADMETA_MSG_AD_PUSH, ADMETA_MSG_DOMAIN } from './config'
import { pushAdCard } from './ui'
class ContentScript {

  listenForMessages() {
    browser.runtime.onMessage.addListener((message, sender) => {
      const { type, data } = message;
      this.handleDealMessages(type, data)
    });
  }

  handleDealMessages(type: string, data: any) {
    switch (type) {
      case ADMETA_MSG_AD_PUSH:
        pushAdCard('PICTURE', 'https://admeta.network/', 'https://test-1256754106.cos.ap-nanjing.myqcloud.com/%E6%A8%AA%E7%89%88%E6%B5%B7%E6%8A%A5.png')
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