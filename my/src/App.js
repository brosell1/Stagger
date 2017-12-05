import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './components/Form.js';
import Popup from './components/Popup.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        tweet: "",
        media: undefined,
      },
      popup: {
        open: false,
        statusOk: true,
      }
    }
  }

  closePopup = () => {
    this.setState({popup:{open: false}});
  };

  sendTweet = (event) => {
    event.preventDefault();
    var route;
    if(this.state.content.tweet !== '') {
      route = 'text';
    } else {
      console.log('No tweet detected - please add something to either field');
      this.setState({
        popup:{
          open: true,
          statusOk: false,
        },
      });
      return;
    }
    if(this.state.content.media) {
      route = 'media';
    }
    console.log(route);
    fetch('/api/tweet/' + route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.content)
    }).then(res => res.json()).then(res => console.log(res))
    this.setState({
      content:{
        tweet: "",
      },
      popup:{
        open: true,
        statusOk: true,
      },
    });
    console.log("thanks for posting to twitter");
  }

  handleChange = (event) => {
    this.setState({content:{[event.target.name]: event.target.value}})
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
      <Form onChange={this.handleChange} onClick={this.sendTweet} tweet={this.state.content.tweet} media={this.state.content.media}/>
      <Popup open={this.state.popup.open} closePopup={this.closePopup} statusOk={this.state.popup.statusOk}/>
    </div>);
  }
}

export default App;
