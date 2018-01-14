import React, {Component} from 'react';
import './App.css';

import Post from './views/Post.js';
import Login from './views/Login.js';
import Queue from './views/Queue.js';
import Sidebar from './components/Sidebar.js';
import Header from './components/Header.js';
import AccountPopup from './components/AccountPopup.js'

import antlers from './antlers.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'login',
      drawer: false,
      content: {
        user: '',
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

  componentDidMount() {
    let details = window.location.pathname.slice(1);
    if(details.length > 0) {
      this.setState(prevState => ({
        content: {...prevState.content, user: details},
        page: ''
      }));
    };
  };

  resetFields = () => {
    this.setState(prevState => ({
      content: {
        ...prevState.content,
        tweet: "",
        tags: [],
        date: null,
        time: null,
        media: undefined,
      },
      popup:{
        open: true,
        statusOk: true,
      },
    }));
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
      if(route === 'tweet') {
        fetch('/api/tweet/' + route, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.content)
        })
      } else if (route === 'media') {
        var formData  = new FormData();
        formData.append('content', this.state.content);
        console.log(formData);
        fetch('/api/tweet/media', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: this.state.content,
        }).then(res => res.json().then(res => console.log(res)))
      }
      // .then(res => res.json()).then(res => console.log(res))
      this.resetFields();
    },
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
    logout: () => {
      window.location.pathname = '/';
      this.setState({
        page: 'login',
      })
    },
    autoTag: () => {
      let tags = this.state.content.tags.slice();
      fetch(`/api/nlp?text='${this.state.content.tweet}'`)
      .then(response => {
        if(!response.ok){
          throw Error('error from server')
        }
        return response.json()
      })
      .then(data => {
        if(data.error) {
          throw Error('response error')
        }
        return data;
      })
      .then(data => {
        this.setState((prevState) => ({content: {
          ...prevState.content,
          tags: [...tags, ...data.payload.keywords.map(item => item.text.split(" ").join(""))]
        }}))
      })
      .catch(err => console.error(err));
    },
    handleTweetChange: (event) => {
      const val = event.target.value;
      this.setState((prevState) => ({content: {
        ...prevState.content,
        tweet: val
      }}))
    },
    handleMediaChange: (event) => {
      const val = event.target.value;
      this.setState((prevState) => ({content: {
        ...prevState.content,
        media: val
      }}))
    },
    handleTagsChange: (event) => {
      const val = event.target.value;
      this.setState((prevState) => ({content: {
        ...prevState.content,
        tags: val
      }}));
    },
    handleDateChange: (event, date) => {
      this.setState((prevState) => ({content: {
        ...prevState.content,
        date: date
      }}));
    },
    handleTimeChange: (event, time) => {
      this.setState((prevState) => ({content: {
        ...prevState.content,
        time: time
      }}));
    },
    handleAddChip: (chip) => {
      this.setState((prevState) => ({content: {
        ...prevState.content,
        tags: [...prevState.content.tags.slice(), chip]
      }}))
    },
    handleDeleteChip: (deletedChip) => {
      this.setState((prevState) => ({content: {
        ...prevState.content,
        tags: [...prevState.content.tags.filter((item) => item !== deletedChip)]
      }}))
    },
    handleTimeChangeExt: (event, time) => {
      this.setState((prevState) => ({content: {
        ...prevState.content,
        time: new Date(time),
        timeStamp: Date.parse(new Date(this.state.content.timeStamp).toISOString().slice(0, 10) + (new Date(time).toISOString().slice(10, 19)))
      }}))
    },
    handleDateChangeExt: (event, date) => {
      this.setState((prevState) => ({content: {
        ...prevState.content,
        date: new Date(date),
        timeStamp: Date.parse((new Date(date).toISOString().slice(0, 10)) + (new Date(this.state.content.timeStamp).toISOString().slice(10, 19)))
      }}))
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
        logout={this.methods.logout}
      />
      <Sidebar
        changeDrawer={this.methods.changeDrawer}
        drawer={this.state.drawer}
        openAccountPopup={this.methods.changeAccountPopup}
      />

      {this.state.page === 'login' ? <Login
        login={this.methods.fakeLogin}
        onSuccess={this.onSuccess}
        onFailed={this.onFailed}
      /> : this.state.page === 'queue' ? <Queue
        changeView={this.methods.changeView}
        user={this.state.content.user}
      /> : <Post
        postMethods={this.postMethods}
        methods={this.methods}
        content={this.state.content}
        open={this.state.popup.open}
        statusOk={this.state.popup.statusOk}
      />}
      <div className="bg"><img alt='' src={antlers}/></div>
      <div className="flourish" />
      <div className="gradient" />
    </div>);
  };
};

export default App;
