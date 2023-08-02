import { Runtime } from "webextension-polyfill";

export type IMessage<T> = {
  type: string;
  data: T;
};

export type MessageListener = (
  sender: Runtime.MessageSender,
  data: IMessage<any>
) => any;


export type Account = {
  balance: string,
  account: string
}

export type Domain = {
  domain: string
}

export type Domains = {
  category: string[],
  name: string,
  domain: string
}

export type ExtStatus = {
  extStatus: boolean
}

export type Params = {
  [propName: string]: any;
}

export type ApiInfo<Params> = {
  URI: string,
  method: 'GET' | 'POST',
  params?: Params,
  content_type?: 'application/json' | 'application/x-www-form-urlencoded',
  full_url?: boolean 
}

export type RequestReq<T, K> = {
  method: 'GET' | 'POST',
  headers: T,
  body?: K
}

export type ScanDomain = {
  time: number,
  domain: string
}

export type Products = {
  name: string,
  domain: string,
  category: string[]
}

export type DataConfig = {
  searching_engines: string[],
  categories: string[],
  products: Products[]
}