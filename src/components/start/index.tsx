import { FC } from "react";
import Logo from "../svg/logo";
import Helper from '../../js/helper';
import { LINK_HTTP } from "../../js/config";
import browser from 'webextension-polyfill'

import './index.css'

const Start: FC = () => {
  return (
    <div className="start-content">
      <Logo />
      <div className="start-label">
        <p>New to AdMeta?</p>
        <p>Start from today!</p>
      </div>
      <div 
        className="btn-wrp"
        onClick={() => {
          browser.storage.local.set({ first_install: true })
          Helper.checkOriginIsExist()
        }}
      >
        <div className="btn">Start</div>
      </div>
    </div>
  )
}

export default Start;