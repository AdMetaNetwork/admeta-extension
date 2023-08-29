import { API, LINK_HTTP } from './config'
import { ApiInfo, RequestReq, Params, Domains } from './types'
import browser from 'webextension-polyfill'
class Helper {
  private static handleGetParams(p: any) {
    let u = ''
    Object.keys(p).forEach((key) => {
      console.log(key, p[key])
      u += `${key}=${p[key]}&`
    })
    u = u.substr(0, u.length - 1);

    return u
  }

  static apiCall(apiInfo: ApiInfo<Params>) {
    let url = apiInfo.full_url ? apiInfo.URI : API + apiInfo.URI;
    const req: RequestReq<any, any> = {
      method: apiInfo.method,
      headers: {
        'Content-Type': apiInfo.content_type || 'application/json',
      },
    };

    switch (apiInfo.method) {
      case 'GET':
        if (apiInfo.params) {
          url = url.concat('?', this.handleGetParams(apiInfo.params));
        }
        break;
      case 'POST':
        req.body = JSON.stringify(apiInfo.params);
        break;
    }
    return fetch(url, req);
  }

  static goWeb(url: string) {
    browser.tabs.create({ url })
  }

  static copyTextToClipboard(text: string) {
    //Create a textbox field where we can insert text to. 
    var copyFrom = document.createElement("textarea");

    //Set the text content to be the text you wished to copy.
    copyFrom.textContent = text;

    //Append the textbox field into the body as a child. 
    //"execCommand()" only works when there exists selected text, and the text is inside 
    //document.body (meaning the text is part of a valid rendered HTML element).
    document.body.appendChild(copyFrom);

    //Select all the text!
    copyFrom.select();

    //Execute command
    document.execCommand('copy');

    //(Optional) De-select the text using blur(). 
    copyFrom.blur();

    //Remove the textbox field from the document.body, so no other JavaScript nor 
    //other elements can get access to this.
    document.body.removeChild(copyFrom);
  }

  static formatAddress = (address: string): string => {
    const str_1 = address.substring(0, 4)
    const str_2 = address.substring(address.length - 4)
    return `${str_1}......${str_2}`
  }

  static getQueryVariable(variable: string, url: string) {
    let query = new URL(url).search.substring(1)
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1]
      }
    }
    return '';
  }

  static isInWhiteList(whiteList: Domains[], url: string) {
    return whiteList.some((v) => {
      return url.includes(v.name.toLowerCase())
    })
  }

  static currentDomainIdx(whiteList: Domains[], url: string) {
    return whiteList.findIndex((v) => {
      return url.includes(v.name.toLowerCase())
    })
  }

  static currentDate() {
    const date = new Date()
    const y = date.getFullYear()
    const d = date.getDay()
    const m = date.getMonth() + 1

    return `${y}-${m}-${d}`
  }

  static async getOriginInfo() {
    const tabs = await browser.tabs.query({})
    const origin = new URL(LINK_HTTP).host
    const exsitIndex = tabs.findIndex((item) => {
      return new URL(item.url!).host === origin
    })

    return {
      tabId: tabs[exsitIndex].id,
      url: tabs[exsitIndex].url
    }
  }

  static async checkOriginIsExist() {
    const tabs = await browser.tabs.query({})
    const origin = new URL(LINK_HTTP).host
    const exsitIndex = tabs.findIndex((item) => {
      return new URL(item.url!).host === origin
    })
    if (exsitIndex !== -1) {
      console.log(exsitIndex, tabs[exsitIndex].url, tabs[exsitIndex].id)
      browser.tabs.update(tabs[exsitIndex].id, { active: true })
    } else {
      browser.tabs.create({ url: LINK_HTTP })
    }
  }

  static getUrlParameter(name: string) {
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

}



export default Helper;