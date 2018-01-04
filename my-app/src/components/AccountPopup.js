import React from 'react';

import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';

const AccountPopup = (props) => {
  return(<Dialog
      title="Add a new account."
      open={props.open}
      onRequestClose={props.closeAccountPopup}
      modal={false}
      >
    </Dialog>
  )
}



export default AccountPopup
