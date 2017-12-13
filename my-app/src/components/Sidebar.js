import React, {Component} from 'react';

import Drawer from 'material-ui/Drawer';

class Sidebar extends Component {

  render() {
    return (
      <Drawer
        open={this.props.drawer}
        width={60}>
        <div className="profilePicture" ></div>
        <div className="profilePicture" ></div>
        <div className="profilePicture" ></div>
      </Drawer>
    );
  };
};

export default Sidebar
