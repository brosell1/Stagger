import React, {Component} from 'react';
import './App.css';

import Post from './views/Post.js';
import Login from './views/Login.js';
import Queue from './views/Queue.js';
import Sidebar from './components/Sidebar.js';
import Header from './components/Header.js';

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

  methods = {
    changeDrawer: () => {
      this.setState({
        drawer: !this.state.drawer
      })
    },
    closePopup: () => {
      this.setState({popup:{open: false}})
    },
    fakeLogin: () => {
      setTimeout(() => { this.methods.login() }, 400)
    },
    login: () => {
      this.setState({
        page: ''
      })
    },
    handleChange: (event) => {
      this.setState({content:{[event.target.name]: event.target.value}})
    },
    changeView: () => {
      let target = this.state.page === "queue" ? "post" : "queue";
      this.setState({
        page: target
      })
    },
  };

  render() {
    const contentStyle = {  transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };
    if (this.state.drawer) {
      contentStyle.marginLeft = 60;
    }

    return (<div style={contentStyle}>

      <Header
        drawer={this.state.drawer}
        page={this.state.page}
        changeDrawer={this.methods.changeDrawer}
      />
      <Sidebar
        changeDrawer={this.methods.changeDrawer}
        drawer={this.state.drawer}
      />

      {this.state.page === 'login' ? <Login
        login={this.methods.fakeLogin}
      /> : this.state.page === 'queue' ? <Queue
        changeView={this.methods.changeView}
      /> : <Post
        methods={this.methods}
        content={this.state.content}
        open={this.state.popup.open}
        statusOk={this.state.popup.statusOk}
      />}
      <div className="flourish" />
      <div className="gradient" />
    </div>);
  };
};

export default App;
