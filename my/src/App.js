import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './components/Form.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: "",
      media: undefined,
    }
  }

  sendTweet = () => {
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({value: this.state.tweet})
    }).then(res => res.json()).then(res => console.log(res))
    this.setState({tweet: ""});
    console.log("thanks for posting to twitter");
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

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
      <Form onChange={this.handleChange} onClick={this.sendTweet} tweet={this.state.tweet} media={this.state.media}/>
    </div>);
  }
}

export default App;
