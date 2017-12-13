import React, {Component} from 'react';
import './App.css';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

import Post from './views/Post.js';
import Login from './views/Login.js';
import Queue from './views/Queue.js';
import Sidebar from './components/Sidebar.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'login',
      drawer: false,
      content: {
        tweet: "",
        media: undefined,
        tags: "",
      },
      popup: {
        open: false,
        statusOk: true,
      },
    };
  };

  changeDrawer = () => {
    this.setState({
      drawer: !this.state.drawer
    })
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
    };
    if(this.state.content.media) {
      route = 'media';
    };
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
  };

  fakeLogin = () => {
    setTimeout(() => { this.login() }, 400)
  }

  login = () => {
    this.setState({
      page: ''
    });
  };

  handleChange = (event) => {
    this.setState({content:{[event.target.name]: event.target.value}})
  };

  changeView = () => {
    let target = this.state.page === "queue" ? "post" : "queue";
    this.setState({
      page: target
    });
  };

  render() {
    const contentStyle = {  transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };

    if (this.state.drawer) {
      contentStyle.marginLeft = 60;
    }

    const stagger = <span style={{
      color: '#536DFE',
      fontFamily: 'Courgette',
      fontSize: '2em',
      textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
    }}>S<span style={{color: '#1de9b6'}}>tag</span>ger</span>

    return (<div style={contentStyle} className="App">

      {this.state.page === "login" ? <Paper zDepth={2} className="headerBar"><h1>{stagger}</h1></Paper> : <div>
        <Sidebar
          changeDrawer={this.changeDrawer}
          drawer={this.state.drawer}
        />
        <AppBar
          iconElementLeft={<IconButton>{this.state.drawer === true ? <ChevronLeft /> : <ChevronRight />}</IconButton>}
          iconStyleLeft={{
            color: 'black',
          }}
          className="headerBar"
          title={stagger}
          onLeftIconButtonClick={this.changeDrawer}
        />
      </div>}
      {this.state.page === 'login' ? <Login
        login={this.fakeLogin}
      /> : this.state.page === 'queue' ? <Queue
        changeView={this.changeView}
      /> : <Post
        changeView={this.changeView}
        onChange={this.handleChange}
        onClick={this.sendTweet}
        tweet={this.state.content.tweet}
        media={this.state.content.media}
        tags={this.state.content.tags}
        open={this.state.popup.open}
        closePopup={this.closePopup}
        statusOk={this.state.popup.statusOk}
      />}
      <div className="flourish" />
      <div className="gradient" />
    </div>);
  };
};

export default App;
