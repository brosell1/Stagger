import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import QueuedPost from '../components/QueuedPost.js';

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: []
    }
  }
  componentWillMount() {
    fetch('/api/tweet/getQueue').then(res => res.json()).then(res => this.setState({queue: [...res]}));
  }

  render() {
    return(<div>
      <div style={{
        marginTop: '2em',
        textAlign: 'center',
      }}>
        <RaisedButton
          label={"New Post"}
          style={{marginRight:'1em'}}
          onClick={this.props.changeView}
          secondary={true}
        />
        <RaisedButton
          label={"Queue"}
          disabled={true}
        />
        <div>
          {this.state.queue.map(item => <QueuedPost body={item.postContent} time={`${new Date(item.scheduledTime)}`}/>)}
        </div>
      </div>
    </div>
    );
  };
};

export default Queue
