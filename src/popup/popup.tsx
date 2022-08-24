import ReactDOM from 'react-dom';


function Popup() {
  return <div onClick={() => {
   alert(999)
  }}>hello ext!!!</div>
}


ReactDOM.render(<Popup />, document.getElementById('popup'));