import React, {Component} from 'react';
import './App.css';

import Post from './views/Post.js';
import Login from './views/Login.js';
import Queue from './views/Queue.js';
import Sidebar from './components/Sidebar.js';
import Header from './components/Header.js';
import AccountPopup from './components/AccountPopup.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'login',
      drawer: false,
      content: {
        tweet: "",
        media: undefined,
        tags: [],
        date: null,
        time: null,
        timeStamp: Date.now(),
      },
      popup: {
        open: false,
        statusOk: true,
      },
      accountPopup: false,
    };
  };


  resetFields = () => {
    let prevState = this.state.content;
    prevState.tweet = "";
    prevState.tags = [];
    this.setState({
      content: prevState,
      popup:{
        open: true,
        statusOk: true,
      },
    });
    console.log("thanks for posting to twitter");
  }

  postMethods = {
    sendTweet: (event) => {
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
      this.resetFields();
    },
    queueTweet: () => {/* do something */},
    scheduleTweet: (event) => {
      event.preventDefault();
      if(this.state.content.tweet.trim()) {
        fetch('/api/tweet/schedule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.content)
        })
        .then(res => res.json()).then(res => console.log(res))
        this.resetFields();
      } else {
        this.setState({
          popup:{
            open: true,
            statusOk: false,
          },
        });
      };
    },
  }

  methods = {
    changeDrawer: () => {
      this.setState({
        drawer: !this.state.drawer
      })
    },
    closePopup: () => {
      this.setState({popup:{open: false}})
    },
    changeAccountPopup: () => {
      this.setState({accountPopup: !this.state.accountPopup})
    },
    fakeLogin: () => {
      setTimeout(() => { this.methods.login() }, 400)
    },
    login: () => {
      this.setState({
        page: ''
      })
    },
    handleTweetChange: (event) => {
      let prevState = {...this.state.content};
      let val = event.target.value;
      prevState.tweet = val;
      this.setState({content: prevState})
    },
    handleTagsChange: (event) => {
      let prevState = {...this.state.content};
      let val = event.target.value;
      prevState.tags = val;
      this.setState({content: prevState})
    },
    handleDateChange: (event, date) => {
      let prevState = {...this.state.content};
      prevState.date = date;
      this.setState({content: prevState})
    },
    handleTimeChange: (event, time) => {
      let prevState = {...this.state.content};
      prevState.time = time;
      this.setState({content: prevState})
    },
    handleAddChip: (chip) => {
      let prevState = {...this.state.content};
      prevState.tags.push(chip);
      this.setState({content: prevState})
    },
    handleDeleteChip: (deletedChip) => {
      let prevState = {...this.state.content};
      prevState.tags = prevState.tags.filter((c) => c !== deletedChip)
      this.setState({content: prevState})
    },

    handleTimeChangeExt: (event, time) => {
      let prevState = {...this.state.content};
      prevState.timeStamp = Date.parse(new Date(this.state.content.timeStamp).toISOString().slice(0, 10) + (new Date(time).toISOString().slice(10, 19)));
      prevState.time = new Date(time);
      this.setState({content: prevState});
    },

    handleDateChangeExt: (event, date) => {
      let prevState = {...this.state.content};
      prevState.timeStamp = Date.parse((new Date(date).toISOString().slice(0, 10)) + (new Date(this.state.content.timeStamp).toISOString().slice(10, 19)));
      prevState.date = new Date(date);
      this.setState({content: prevState});
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

      <AccountPopup open={this.state.accountPopup} closeAccountPopup={this.methods.changeAccountPopup}/>

      <Header
        drawer={this.state.drawer}
        page={this.state.page}
        changeDrawer={this.methods.changeDrawer}
      />
      <Sidebar
        changeDrawer={this.methods.changeDrawer}
        drawer={this.state.drawer}
        openAccountPopup={this.methods.changeAccountPopup}
      />

      {this.state.page === 'login' ? <Login
        login={this.methods.fakeLogin}
      /> : this.state.page === 'queue' ? <Queue
        changeView={this.methods.changeView}
      /> : <Post
        sendTweet={this.postMethods.scheduleTweet}
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
