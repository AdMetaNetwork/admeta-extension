import browser from 'webextension-polyfill'
import Messenger from "./messenger";
import { ADMETA_MSG_AD_PUSH } from './config'
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
        pushAdCard(data.message.callbackLink.includes('youtube') ? 'VIDEO' : 'PICTURE', data.message.callbackLink, data.message.metadata, data.message.id, data.address)
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