class Helper {
  apiCall() {
    fetch('http://45.8.133.193:5000/admeta/getUsers', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
}

export default Helper;