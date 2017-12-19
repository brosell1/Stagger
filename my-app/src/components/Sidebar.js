import React from 'react';

import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add'

const Sidebar = (props) => {
  return (
    <Drawer
      open={props.drawer}
      width={60}>
      <div className="profilePicture" ></div>
      <div className="profilePicture" ></div>
      <div className="profilePicture" ></div>
      <div className="profilePicture" >
        <IconButton onClick={props.openAccountPopup} ><Add /></IconButton>
      </div>
    </Drawer>
  );
};

export default Sidebar
