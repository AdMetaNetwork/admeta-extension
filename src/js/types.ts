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