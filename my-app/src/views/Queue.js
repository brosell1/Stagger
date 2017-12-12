import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';

class Queue extends Component {
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
          It's the muthaflippin' queue!!!!
        </div>
      </div>
    </div>
    );
  };
};

export default Queue
