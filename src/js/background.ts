import browser from 'webextension-polyfill'
import { Account, Domain, ExtStatus, ScanDomain, DataConfig } from "./types";
import Messenger from "./messenger";
import { ADMETA_MSG_ACCOUNT, ADMETA_MSG_AD_PUSH, ADMETA_MSG_DOMAIN, ADMETA_MSG_SWITCH, DOMAIN_CONFIG_URL } from './config'
import Helper from './helper';

class Background {

  // domain config
  private config: DataConfig = default_config;
  // uesr account
  private account: Account = default_account;
  // user setting domains
  private domain: Domain = default_domain;
  // user setting ext switch
  private extStatus: boolean = true;

  // scan_list
  private scanList: ScanDomain[] = []

  constructor() {}

  listenForMessages() {
    browser.runtime.onMessage.addListener((message, sender) => {
      const { type, data } = message;
      this.handleDealMessages(type, data)
    });
  }

  handleDealMessages(type: string, data: any) {
    switch (type) {
      case ADMETA_MSG_ACCOUNT:
        this.saveAccount(data)
        break;

      case ADMETA_MSG_DOMAIN:
        this.saveDomain(data)
        break;

      case ADMETA_MSG_SWITCH:
        this.saveSwitchExt(data)
        break;
    
      default:
        break;
    }
  }

  saveAccount(data: Account) {
    browser.storage.local.set({ account: data.account, balance: data.balance})
    this.account = data
  }

  saveDomain(data: Domain) {
    browser.storage.local.set({ domain: data.domain })
    this.domain = data
  }

  saveSwitchExt(data: ExtStatus) {
    browser.storage.local.set({ ext_status: data.extStatus })
    this.extStatus = data.extStatus
  }

  saveScanDomain(domain: string) {
    if (!domain) {
      return
    }
    const now = new Date().getTime() / 1000
    let time = parseInt(now + '') 
    let scanDomain:ScanDomain[] = this.scanList;
    scanDomain.push({
      time,
      domain
    })

    this.scanList = scanDomain;
  }

  getConfig() {
    const that = this;
      Helper.apiCall({
        URI: DOMAIN_CONFIG_URL,
        method: 'GET',
        full_url: true,
      }).then((v) => {
        v.json().then((c) => {
          that.config = c;
        })
      })
  }

  updateScanDomain() {
    const list = this.scanList
    const config = this.config
    if (list.length >= 2) {
      let prevT = list[list.length - 2].time
      let prevD = list[list.length - 2].domain
      let currT = list[list.length - 1].time
      let name = ''
      let category:string[] = []
      config.products.forEach((item) => {
        if (prevD === item.domain) {
          name = item.name
          category = item.category
        }
      })
      if (currT - prevT >= 10) {
        Helper.apiCall({
          URI: `admeta/updateUserWeb3UsingInfo`, 
          method: 'POST',
          params: {
            walletAddress: this.account.account,
            name,
            domain: prevD,
            usingDuration: currT - prevT,
            accessCount: 100,
            category,
            usageMethod: "domain"
          }
        })
      }
    }
  }

  splitUrl(url: string) {
    if (url === '') {
      return
    }
    const { hostname } = new URL(url)
    if (!this.domain.domain.includes(hostname)) {
      return
    }
    return hostname
  }

  listenTabChange() {
    browser.tabs.onActivated.addListener((l) => {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then((activeTab) => {
          if (this.extStatus) {
            const u = this.splitUrl(activeTab[0].url || '')
            this.saveScanDomain(u || '')
            this.updateScanDomain()
            // TODO ad push card show time
            const p = new URL(activeTab[0].url!)
            
            if (this.domain.domain.includes(p.hostname)) {
              const timer = setTimeout(() => {
                Messenger.sendMessageToContentScript(
                  activeTab[0].id || 0,
                  ADMETA_MSG_AD_PUSH,
                  { message: "show Ad push" }
                );
                clearTimeout(timer)
              }, 8000)
            }
          }
        });
    });
  }

  getBroswerSearch(url: string) {
    // Google Bing Duckduckgo
    if (url.includes('google') || url.includes('bing') || url.includes('duckduckgo')) {
      return Helper.getQueryVariable('q', url)
    }

    // Baidu
    if (url.includes('baidu')) {
      return Helper.getQueryVariable('wd', url)
    }

    return ''
  }

  listenTabUpdate() {
    const that = this
    browser.tabs.onUpdated.addListener(
      function (tabId, changeInfo, tab) {
        if (that.getBroswerSearch(tab.url || '') === 'admeta') {
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

    // Get domain config
    this.getConfig()
  }

}

const default_config: DataConfig = {
  searching_engines: [],
  products: [],
  categories: []
}

const default_account: Account = {
  account: '',
  balance: ''
}

const default_domain: Domain = {
  domain: []
}

new Background().init();