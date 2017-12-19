import React from 'react';

import Paper from 'material-ui/Paper';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

const stagger = <span style={{
  color: '#536DFE',
  fontFamily: 'Quattrocento, sans-serif',
  fontSize: '2em',
  textShadow: '1px 1px 0 #3F51B5, -1px -1px 0 #3F51B5, 1px -1px 0 #3F51B5, -1px 1px 0 #3F51B5, 1px 1px 0 #3F51B5'
}}>s<span style={{color: '#1de9b6'}}>tag</span>ger<span style={{color: '#1de9b6'}}>.</span>tech</span>

const Header = (props) => {
  return(
    props.page === "login" ? <Paper
    zDepth={2} className="headerBar">
      <h1>
        {stagger}
      </h1>
    </Paper> : <AppBar
      iconElementLeft={<IconButton>{props.drawer === true ? <ChevronLeft /> : <ChevronRight />}</IconButton>}
      className="headerBar"
      title={stagger}
      onLeftIconButtonClick={props.changeDrawer}
    />
  )
}

export default Header
