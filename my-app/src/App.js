import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import AppBar from 'material-ui/AppBar';

import Post from './views/Post.js'
import Login from './views/Login.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'login',
      content: {
        tweet: "",
        media: undefined,
        tags: "",
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
    })
    .then(res => res.json()).then(res => console.log(res))
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

  login = () => {
    this.setState({
      page: ''
    })
  }

  handleChange = (event) => {
    this.setState({content:{[event.target.name]: event.target.value}})
  }

  render() {
    const stagger = <span style={{
      color: '#536DFE',
      fontFamily: 'Courgette',
      fontSize: '2em',
      textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
    }}>S<span style={{color: '#1de9b6'}}>tag</span>ger</span>

    return (<div className="App">
      {this.state.page === "login" ? <h1 className="headerBar">{stagger}</h1> : <AppBar
        className="headerBar"
        title={stagger}
        // iconClassNameRight="muidocs-icon-navigation-expand-more"
      />}
      {this.state.page === 'login' ? <Login login={this.login}/> : <Post
        onChange={this.handleChange}
        onClick={this.sendTweet}
        tweet={this.state.content.tweet}
        media={this.state.content.media}
        tags={this.state.content.tags}
        open={this.state.popup.open}
        closePopup={this.closePopup}
        statusOk={this.state.popup.statusOk}
      />}
    </div>);
  }
}

export default App;
