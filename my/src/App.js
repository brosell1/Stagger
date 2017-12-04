import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

// var Twit = require('twit')
//
// var T = new Twit({
//   consumer_key:         'UhOzvOrUNmsqKZDLoBIaxyZsd',
//   consumer_secret:      'vqNf523ksiozXXfmW5ZbpX3ToGQoUpvEWMhWdjAa4BiVAbrWes',
//   access_token:         '937705103959740416-nhtYwRpoVhFJV8z9SxtoObtJ8Z2pBKm',
//   access_token_secret:  '002FMPPh9ufJvBy63EdcgMF4vWla2ZLRfDtxYdSCEbF7L',
//   timeout_ms:           60*1000,   optional HTTP request timeout to apply to all requests.
// })

function sendTweet() {
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({value: document.getElementById("tweet").value})
  }).then(res => res.json()).then(res => console.log(res))
  // T.post('statuses/update', { status: document.getElementById("tweet").value }, function(err, data, response) {
  //   console.log(data.status);
  // })
}

class App extends Component {
  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit
        <code>src/App.js</code>
        and save to reload.
      </p>
      <input id="tweet"/>
      <button onClick={sendTweet} id="submit">submit</button>
    </div>);
  }
}

export default App;
