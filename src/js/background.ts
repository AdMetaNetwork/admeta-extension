import browser from 'webextension-polyfill'
import { Account } from "./types";
import Messenger from "./messenger";
import { ADMETA_MSG_ACCOUNT, ADMETA_MSG_AD_PUSH } from './config'

class Background {

  listenForMessages() {
    browser.runtime.onMessage.addListener((message, sender) => {
      const { type, data } = message;
      this.handleDealMessages(type, data)
    });
  }

  handleDealMessages(type: string, data: Account) {
    switch (type) {
      case ADMETA_MSG_ACCOUNT:
        this.saveAccount(data)
        break;
    
      default:
        break;
    }
  }

  saveAccount(data: Account) {
    browser.storage.local.set({ account: data.account, balance: data.balance})
  }

  listenTabChange() {
    browser.tabs.onActivated.addListener((l) => {
      console.log(l);
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then((activeTab) => {
          console.log(activeTab);
        });
    });
  }

  listenTabUpdate() {
    browser.tabs.onUpdated.addListener(
      function (tabId, changeInfo, tab) {
        console.log('change url', changeInfo, tabId, tab)
        if (tab.url?.includes('rdx')) {
          Messenger.sendMessageToContentScript(
            tabId,
            ADMETA_MSG_AD_PUSH,
            { message: "show Ad push" }
          );
        }
      }
    );
  }

  init() {
    // Listen for messages from background and run the listener from the map
    this.listenForMessages();

    // Listen for tab change
    this.listenTabChange();

    // Listen for tab update
    this.listenTabUpdate();
  }

}

new Background().init();