import { POW_IMG_BASE64, CLOSE_IMG_BASE64, PLAY_ICON_BASE64, LINK_HTTP, NFT_RECOMMOND } from './config'

// https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/IMG_8428.JPG

export const pushAdCard = (type: 'PICTURE' | 'VIDEO', link: string, imgUrl: string, id: string, address: string) => {
  const ui = document.createElement('div')
  const style = 'position: fixed; width: 300px; height: 170px; top: 80px; right: 80px; background: #18191D; z-index: 9999; border-radius: 20px; overflow: hidden;'
  ui.setAttribute('style', style)

  const img = document.createElement('img');
  img.src = imgUrl
  const imgStyle = 'width: 100%; height: 100%; border-radius: 8px; cursor: pointer;'
  img.setAttribute('style', imgStyle)
  ui.appendChild(img)

  img.addEventListener('click', () => {
    if (type === 'VIDEO') {
      window.open(`${LINK_HTTP}play?video=${encodeURIComponent(link)}&id=${id}&add=${address}`)
    } else {
      window.open(`${link}?id=${id}&add=${address}`)
    }
    document.body.removeChild(ui)
  })

  

  const play = document.createElement('div')
  const playStyle = `position: absolute; top: 50%; margin-top: -10px; left: 50%; margin-left: -10px; width: 20px; height: 20px; background: url(${PLAY_ICON_BASE64}) no-repeat center; background-size: cover; cursor: pointer;`
  play.setAttribute('style', playStyle)
  if (type === 'VIDEO') {
    ui.appendChild(play)
  }

  play.addEventListener('click', () => {
    window.open(`${LINK_HTTP}play?video=${encodeURIComponent(link)}&id=${id}&add=${address}`)
  })

  const footer = document.createElement('div')
  const footerStyle = 'width: 100%; height: 28px; padding: 0 16px; box-sizing: border-box; display: flex; align-items: center; justify-content: flex-end; position: absolute; bottom: -28px; right: 0; background: rgba(29, 31, 38, 0.60); '
  footer.setAttribute('style', footerStyle)
  ui.appendChild(footer)

  let pow = document.createElement('img')
  pow.src = POW_IMG_BASE64
  const powStyle = 'width: 100px; height: 8px;'
  pow.setAttribute('style', powStyle)

  footer.appendChild(pow)

  const close = document.createElement('div')
  const closeStyle = `position: absolute; top: -28px; right: 8px; width: 28px; height: 28px; background: url(${CLOSE_IMG_BASE64}) no-repeat center; background-size: cover; cursor: pointer;`

  close.setAttribute('style', closeStyle)
  ui.appendChild(close)

  close.addEventListener('click', () => {
    document.body.removeChild(ui)
  })

  document.body.appendChild(ui);

  ui.addEventListener('mouseover', () => {
    footer.style.transition = 'bottom .5s'
    footer.style.bottom = '0px'
    close.style.transition = 'top .5s'
    close.style.top = '8px'
  })

  ui.addEventListener('mouseleave', () => {
    footer.style.transition = 'bottom .5s'
    footer.style.bottom = '-28px'
    close.style.transition = 'top .5s'
    close.style.top = '-28px'
  })
}

export const pushNftCard = () => {
  const ui = document.createElement('div')
  const style = 'position: fixed; top: 80px; right: 80px; background: #18191D; z-index: 9999; border: 1px solid rgba(53, 57, 69, 0.5); border-radius: 20px; padding: 24px; box-sizing: border-box; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-gap: 1rem;'
  ui.setAttribute('style', style)

  for (let i = 0; i < NFT_RECOMMOND.length; i++) {
    const imgBox = document.createElement('div')
    const imgBoxSty = 'width: 100px; display: flex; align-items: center; justify-content: center; flex-direction: column; border-radius: 6px; background: #333; padding: 10px 0; cursor: pointer;'
    imgBox.setAttribute('style', imgBoxSty)

    const img = document.createElement('img')
    img.src = NFT_RECOMMOND[i].icon
    const imgSty = 'width: 80px; height: 80px; margin-bottom: 10px; border-radius: 6px;'
    img.setAttribute('style', imgSty)
    imgBox.appendChild(img)

    const text = document.createElement('div')
    text.innerText = NFT_RECOMMOND[i].name
    const textSty = 'color: #fff; font-size: 12px;'
    text.setAttribute('style', textSty)
    imgBox.appendChild(text)

    imgBox.addEventListener('click', () => {
      window.open(NFT_RECOMMOND[i].link, '_blank')
    })

    ui.appendChild(imgBox)
  }

  document.body.appendChild(ui);
}

export const pushClaimCard = () => {
  const ui = document.createElement('div')
  const style = 'position: fixed; top: 80px; right: 80px; background: #18191D; z-index: 9999; border: 1px solid rgba(53, 57, 69, 0.5); border-radius: 20px; padding: 24px; box-sizing: border-box;'
  ui.setAttribute('style', style)

  const btn = document.createElement('div')
  const btnSty = 'display: flex; align-items: center; justify-content: center; width: 200px; height: 40px; cursor: pointer; background: #3772FF; border-radius: 9999px;'
  btn.setAttribute('style', btnSty)

  const text = document.createElement('div')
  text.innerText = 'Go Admeta claim'
  const textSty = 'color: #fff;'
  text.setAttribute('style', textSty)

  btn.appendChild(text)

  btn.addEventListener('click', () => {
    window.open('https://app.admeta.network/ad-display?rd=23nqw343', '_blank')
    document.body.removeChild(ui)
  })

  ui.appendChild(btn)

  document.body.appendChild(ui);
}