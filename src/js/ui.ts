import { POW_IMG_BASE64, CLOSE_IMG_BASE64, PLAY_ICON_BASE64 } from './config'

// https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/IMG_8428.JPG

export const pushAdCard = (type: 'PICTURE' | 'VIDEO', link: string, imgUrl: string) => {
  const ui = document.createElement('div')
  const style = 'position: fixed; width: 508px; height: 343px; top: 80px; right: 80px; background: #18191D; z-index: 9999; border: 1px solid rgba(53, 57, 69, 0.5); border-radius: 20px; padding: 24px; box-sizing: border-box;'
  ui.setAttribute('style', style)

  const img = document.createElement('img');
  img.src = imgUrl
  const imgStyle = 'width: 100%; height: 259px; border-radius: 8px; cursor: pointer;'
  img.setAttribute('style', imgStyle)
  ui.appendChild(img)

  img.addEventListener('click', () => {
    window.open(link)
  })

  const play = document.createElement('div')
  const playStyle = `position: absolute; top: 140px; left: 50%; margin-left: -20px; width: 40px; height: 40px; background: url(${PLAY_ICON_BASE64}) no-repeat center; background-size: cover; cursor: pointer;`
  play.setAttribute('style', playStyle)
  if (type === 'VIDEO') {
    ui.appendChild(play)
  }

  const footer = document.createElement('div')
  const footerStyle = 'width: 100%; height: 36px; padding: 0 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: flex-end; position: absolute; bottom: 0; right: 0;'
  footer.setAttribute('style', footerStyle)
  ui.appendChild(footer)

  let pow = document.createElement('img')
  pow.src = POW_IMG_BASE64
  const powStyle = 'width: 148px; height: 12px;'
  pow.setAttribute('style', powStyle)

  footer.appendChild(pow)

  const close = document.createElement('div')
  const closeStyle = `position: absolute; top: -40px; right: -40px; width: 40px; height: 40px; background: url(${CLOSE_IMG_BASE64}) no-repeat center; background-size: cover; cursor: pointer;`

  close.setAttribute('style', closeStyle)
  ui.appendChild(close)

  close.addEventListener('click', () => {
    document.body.removeChild(ui)
  })

  document.body.appendChild(ui);
}