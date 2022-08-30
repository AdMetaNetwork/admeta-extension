export const pushAdCard = () => {
  let div = document.createElement('div')
  const style = 'position: fixed; width: 80px; height: 80px; top: 50px; right: 20px; background: #fec400; z-index: 999;'
  div.setAttribute('style', style)
  div.innerText = 'show ad push'
  document.body.appendChild(div);
}